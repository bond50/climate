'use server'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import { headers } from 'next/headers'
import { RateLimiterMemory } from 'rate-limiter-flexible'

// Grievance form (rewritten 18 Nov 2026 for the move to the county server "siscom"):
//  * bot check: Cloudflare Turnstile (was hCaptcha), verified server-side with the visitor's IP
//  * e-mail: Resend HTTP API (was SMTP with a mailbox password); no extra dependency
//  * rate limit per REAL visitor IP (was the server's own IP via api.ipify.org: one shared counter)
//  * every user value is HTML-escaped before it goes into the e-mail (was injected raw)
//  * length limits on every field; the "Other" grievance text now reaches the e-mail

const LOGO_PATH = path.join(process.cwd(), 'public', 'logo.png')
const DEFAULT_SUBJECT = 'New Grievance from Anonymous'
const EMAIL_GENERATED_MESSAGE = 'Message received from our contact page'
const EMAIL_GENERATED_LINK = 'https://climate.vihiga.go.ke/#contact'

let logoBase64 = ''
try {
    logoBase64 = fs.readFileSync(LOGO_PATH).toString('base64')
} catch (err) {
    console.error('Error loading logo:', err?.message)
}

// HTML-escape anything a visitor typed before it is placed in the e-mail
const esc = (v) => String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const opt = (max) => z.string().trim().max(max).optional().nullable()

const GrievanceSchema = z.object({
    grievanceRelates: z.string().trim().min(1, { message: 'Grievance relation is required' }).max(200),
    otherGrievance: opt(300),
    grievanceGender: opt(30),
    grievanceAge: opt(30),
    grievancePhone: opt(30),
    grievanceName: opt(120),
    grievanceEmail: z.union([z.literal(''), z.string().trim().email({ message: 'Enter a valid e-mail address' }).max(200)]).optional().nullable(),
    contactPreference: opt(10),
    incidentWard: z.string().trim().min(1, { message: 'Ward is required' }).max(100),
    incidentVillage: z.string().trim().min(1, { message: 'Village is required' }).max(100),
    grievanceDescription: z.string().trim().min(10, { message: 'Description must be at least 10 characters' }).max(5000),
    complaintDate: z.string().trim().min(1, { message: 'Complaint date is required' }).max(40),
}).refine((data) => {
    if ((data.grievanceEmail && data.grievanceEmail.trim() !== '') ||
        (data.grievancePhone && data.grievancePhone.trim() !== '')) {
        return data.contactPreference && data.contactPreference.trim() !== ''
    }
    return true
}, {
    message: 'Contact preference is required when contact details are provided',
    path: ['contactPreference'],
})

// 5 submissions per visitor IP per 10 minutes
const rateLimiter = new RateLimiterMemory({ points: 5, duration: 600 })

// Real visitor IP: Cloudflare puts it in CF-Connecting-IP; Caddy forwards headers unchanged.
async function visitorIp() {
    const h = await headers()
    const cf = h.get('cf-connecting-ip')
    if (cf) return cf.trim()
    const xff = h.get('x-forwarded-for')
    if (xff) return xff.split(',')[0].trim()
    return h.get('x-real-ip') || 'unknown'
}

async function verifyTurnstile(token, ip) {
    const secret = process.env.TURNSTILE_SECRET_KEY
    if (!secret) {
        console.error('TURNSTILE_SECRET_KEY is not set')
        return false
    }
    const body = new URLSearchParams({ secret, response: token })
    if (ip && ip !== 'unknown') body.set('remoteip', ip)
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body,
        signal: AbortSignal.timeout(10000),
    })
    const json = await res.json()
    return json.success === true
}

async function sendMail({ subject, html }) {
    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: process.env.EMAIL_FROM,
            to: (process.env.EMAIL_TO || '').split(',').map((s) => s.trim()).filter(Boolean),
            subject,
            html,
        }),
        signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) {
        const detail = await res.text().catch(() => '')
        throw new Error(`Resend answered ${res.status}: ${detail.slice(0, 200)}`)
    }
}

export async function submitGrievance(_, formData) {
    // 1. Rate limit per real visitor
    const ip = await visitorIp()
    try {
        await rateLimiter.consume(ip)
    } catch {
        return { success: false, message: 'Too many requests, please try again later.' }
    }

    // 2. Honeypot field (humans never fill it)
    const honeyVal = formData.get('companyName')
    if (honeyVal && String(honeyVal).trim() !== '') {
        return { success: false, message: 'Spam detected. Submission blocked.' }
    }

    // 3. Cloudflare Turnstile
    const token = formData.get('cf-turnstile-response')
    if (!token) {
        return { success: false, message: 'Please complete the security check and try again.' }
    }
    try {
        if (!(await verifyTurnstile(String(token), ip))) {
            return { success: false, message: 'Security check failed. Please try again.' }
        }
    } catch (err) {
        console.error('Error verifying Turnstile:', err?.message)
        return { success: false, message: 'Unable to verify the security check. Please try again.' }
    }

    // 4. Validate
    const validated = GrievanceSchema.safeParse({
        grievanceRelates: formData.get('grievanceRelates'),
        otherGrievance: formData.get('otherGrievance'),
        grievanceGender: formData.get('grievanceGender'),
        grievanceAge: formData.get('grievanceAge'),
        grievancePhone: formData.get('grievancePhone'),
        grievanceName: formData.get('grievanceName'),
        grievanceEmail: formData.get('grievanceEmail'),
        contactPreference: formData.get('contactPreference'),
        incidentWard: formData.get('incidentWard'),
        incidentVillage: formData.get('incidentVillage'),
        grievanceDescription: formData.get('grievanceDescription'),
        complaintDate: formData.get('complaintDate'),
    })
    if (!validated.success) {
        const errors = validated.error.flatten().fieldErrors
        const errorMessage = Object.entries(errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join(' | ')
        return {
            errors,
            payload: formData,
            message: errorMessage || 'Missing or invalid fields. Failed to submit grievance.',
        }
    }
    const data = validated.data
    if (data.grievanceRelates === 'Other' && !(data.otherGrievance && data.otherGrievance.trim())) {
        return { payload: formData, message: 'Please describe the grievance in the "Other" field.' }
    }

    // 5. E-mail (all visitor values escaped)
    const d = new Date(data.complaintDate)
    const formattedDate = !isNaN(d.getTime())
        ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(d)
        : 'Invalid date'
    const contact = (data.grievancePhone || data.grievanceEmail)
        ? `<li><strong>Contact Information:</strong> ${esc(data.grievancePhone || 'Not provided')}${data.grievanceEmail ? `, ${esc(data.grievanceEmail)}` : ''}</li>`
        : ''
    const preference = data.contactPreference
        ? `<li><strong>Contact Preference:</strong> ${data.contactPreference === 'Yes'
            ? 'User requested to be contacted using the provided details'
            : 'User does not want to be contacted'}</li>`
        : ''
    // Subject is plain text: strip line breaks so nothing can be appended to the header
    const subjectName = (data.grievanceName || '').replace(/[\r\n]+/g, ' ').slice(0, 120)

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Grievance</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 700px; margin: 20px auto; border: 1px solid #ddd; padding: 30px; border-radius: 8px; }
    .letterhead { text-align: center; margin-bottom: 20px; }
    .letterhead h1 { font-size: 1.8rem; margin: 0; }
    .letterhead p { margin: 0; font-size: 0.95rem; }
    .logo { text-align: center; margin-bottom: 30px; }
    .logo img { max-height: 80px; }
    .detail-list { list-style: none; padding: 0; }
    .detail-list li { padding: 8px 0; border-bottom: 1px solid #eee; }
    .detail-list li strong { min-width: 150px; display: inline-block; }
    .footer { text-align: center; margin-top: 20px; font-size: 0.9rem; color: #777; }
  </style>
</head>
<body>
  <div class="container">
    ${logoBase64 ? `<div class="logo"><img src="data:image/png;base64,${logoBase64}" alt="Organization Logo"></div>` : ''}
    <div class="letterhead">
      <h1>Department of Environment, Water, Energy, Natural Resources &amp; Climate Change</h1>
      <p>Directorate of Climate Change<br>County Government of Vihiga</p>
    </div>
    <h2 style="text-align:center">Grievance Details</h2>
    <ul class="detail-list">
      <li><strong>Relates To:</strong> ${esc(data.grievanceRelates)}</li>
      ${data.otherGrievance && data.otherGrievance.trim() !== '' ? `<li><strong>Other Details:</strong> ${esc(data.otherGrievance)}</li>` : ''}
      ${data.grievanceName ? `<li><strong>Name:</strong> ${esc(data.grievanceName)}</li>` : ''}
      ${data.grievanceGender ? `<li><strong>Gender:</strong> ${esc(data.grievanceGender)}</li>` : ''}
      ${data.grievanceAge ? `<li><strong>Age:</strong> ${esc(data.grievanceAge)}</li>` : ''}
      ${contact}
      ${preference}
      <li><strong>Incident Ward:</strong> ${esc(data.incidentWard)}</li>
      <li><strong>Incident Village:</strong> ${esc(data.incidentVillage)}</li>
      <li><strong>Description:</strong> ${esc(data.grievanceDescription).replace(/\n/g, '<br>')}</li>
      <li><strong>Date of Complaint:</strong> ${esc(formattedDate)}</li>
    </ul>
    <div class="footer">
      <a href="${EMAIL_GENERATED_LINK}" style="text-decoration: none; color: inherit;">${EMAIL_GENERATED_MESSAGE}</a>
    </div>
  </div>
</body>
</html>`

    try {
        await sendMail({ subject: subjectName ? `New Grievance from ${subjectName}` : DEFAULT_SUBJECT, html })
        return { message: 'Grievance submitted successfully!', success: true }
    } catch (error) {
        console.error('Error sending e-mail:', error?.message)
        return { message: 'Failed to submit grievance. Please try again.', success: false }
    }
}
