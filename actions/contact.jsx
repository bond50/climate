'use server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { RateLimiterMemory } from 'rate-limiter-flexible'

// Constants
const LOGO_PATH = path.join(process.cwd(), 'public', 'logo.png')
const DEFAULT_SUBJECT = 'New Grievance from Anonymous'
const EMAIL_GENERATED_MESSAGE = 'Message received from our contact page'
const EMAIL_GENERATED_LINK = 'https://climate.vihiga.go.ke/#contact'
const LETTERHEAD_TEXT = `County Government of Vihiga  
Department of Environment, Water, Energy, Natural Resources & Climate Change  
Directorate of Climate Change`

// Load logo from the public folder and convert it to base64
let logoBase64 = ''
try {
    const logoData = fs.readFileSync(LOGO_PATH)
    logoBase64 = logoData.toString('base64')
} catch (err) {
    console.error('Error loading logo:', err)
}

// Zod validation schema
const GrievanceSchema = z.object({
    grievanceRelates: z.string().min(1, { message: 'Grievance relation is required' }),
    grievanceGender: z.string().optional().nullable(),
    grievanceAge: z.string().optional().nullable(),
    grievancePhone: z.string().optional().nullable(),
    grievanceName: z.string().optional().nullable(),
    grievanceEmail: z.string().optional().nullable(),
    contactPreference: z.string().optional().nullable(),
    incidentWard: z.string().min(1, { message: 'Ward is required' }),
    incidentVillage: z.string().min(1, { message: 'Village is required' }),
    grievanceDescription: z.string().min(10, { message: 'Description must be at least 10 characters' }),
    complaintDate: z.string().min(1, { message: 'Complaint date is required' })
}).refine((data) => {
    if (
        (data.grievanceEmail && data.grievanceEmail.trim() !== '') ||
        (data.grievancePhone && data.grievancePhone.trim() !== '')
    ) {
        return data.contactPreference && data.contactPreference.trim() !== ''
    }
    return true
}, {
    message: 'Contact preference is required when contact details are provided',
    path: ['contactPreference']
})

// Rate limiter: 5 submissions per IP per 60 seconds
const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 60
})

export async function submitGrievance(_, formData) {
    // 1. Rate limiting
    // (You may enhance IP extraction as needed.)
    let ipAddress = 'unknown-ip'
    try {
        const res = await fetch('https://api.ipify.org/?format=json', { method: 'GET' })
        if (res.ok) {
            const jsonData = await res.json()
            ipAddress = jsonData.ip || 'unknown-ip'
        }
    } catch (error) {
        console.error('Error fetching IP:', error)
    }
    try {
        await rateLimiter.consume(ipAddress)
    } catch (err) {
        return {
            success: false,
            message: 'Too many requests, please try again later.'
        }
    }

    // 2. Honeypot
    const honeyVal = formData.get('companyName')
    if (honeyVal && honeyVal.trim() !== '') {
        return {
            success: false,
            message: 'Spam detected. Submission blocked.'
        }
    }

    // 3. hCaptcha verification
    const hCaptchaToken = formData.get('h-captcha-response')
    if (!hCaptchaToken) {
        return {
            success: false,
            message: 'hCaptcha token missing. Please try again.'
        }
    }
    const hcaptchaSecret = process.env.HCAPTCHA_SECRET
    try {
        const verifyRes = await fetch('https://hcaptcha.com/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: hcaptchaSecret || '',
                response: hCaptchaToken.toString()
            })
        })
        const verifyJson = await verifyRes.json()
        if (!verifyJson.success) {
            return {
                success: false,
                message: 'hCaptcha validation failed. Please try again.'
            }
        }
    } catch (err) {
        console.error('Error verifying hCaptcha:', err)
        return {
            success: false,
            message: 'Unable to verify hCaptcha. Please try again.'
        }
    }

    // 4. If "Other" was selected, override with the otherGrievance value
    const rawGrievance = formData.get('grievanceRelates')
    const grievanceRelatesFinal = rawGrievance === 'Other' ? formData.get('otherGrievance') : rawGrievance

    // 5. Validate using Zod
    const validatedFields = GrievanceSchema.safeParse({
        grievanceRelates: grievanceRelatesFinal,
        grievanceGender: formData.get('grievanceGender'),
        grievanceAge: formData.get('grievanceAge'),
        grievancePhone: formData.get('grievancePhone'),
        grievanceName: formData.get('grievanceName'),
        grievanceEmail: formData.get('grievanceEmail'),
        contactPreference: formData.get('contactPreference'),
        incidentWard: formData.get('incidentWard'),
        incidentVillage: formData.get('incidentVillage'),
        grievanceDescription: formData.get('grievanceDescription'),
        complaintDate: formData.get('complaintDate')
    })

    if (!validatedFields.success) {
        const errors = validatedFields.error.flatten().fieldErrors
        const errorMessage = Object.entries(errors)
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join(' | ')
        return {
            errors,
            payload: formData,
            message: errorMessage || 'Missing or invalid fields. Failed to submit grievance.'
        }
    }

    // 6. Send email via nodemailer
    const data = validatedFields.data
    const complaintDateObj = new Date(data.complaintDate)
    const formattedDate = complaintDateObj instanceof Date && !isNaN(complaintDateObj.getTime())
        ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(complaintDateObj)
        : 'Invalid date'

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.SMTP_TO,
            subject: `New Grievance from ${data.grievanceName || DEFAULT_SUBJECT}`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Grievance</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 700px; margin: 20px auto; border: 1px solid #ddd; padding: 30px; border-radius: 8px; }
    .letterhead { text-align: center; margin-bottom: 20px; }
    .letterhead h1 { font-size: 1.8rem; margin: 0; }
    .letterhead p { margin: 0; font-size: 0.95rem; white-space: pre-line; }
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
    <div class="logo">
      <img src="data:image/png;base64,${logoBase64}" alt="Organization Logo" aria-label="Organization Logo">
    </div>
    <div class="letterhead">
      <h1>Department of Environment, Water, Energy, Natural Resources & Climate Change</h1>
      <p>Directorate of Climate Change<br>County Government of Vihiga</p>
    </div>
    <h2 class="text-center mb-4">Grievance Details</h2>
    <ul class="detail-list">
      <li><strong>Relates To:</strong> ${data.grievanceRelates}</li>
      ${data.otherGrievance && data.otherGrievance.trim() !== '' ? `<li><strong>Other Details:</strong> ${data.otherGrievance}</li>` : ''}
      ${data.grievanceName ? `<li><strong>Name:</strong> ${data.grievanceName}</li>` : ''}
      ${data.grievanceGender ? `<li><strong>Gender:</strong> ${data.grievanceGender}</li>` : ''}
      ${data.grievanceAge ? `<li><strong>Age:</strong> ${data.grievanceAge}</li>` : ''}
      ${
                (data.grievancePhone || data.grievanceEmail)
                    ? `<li><strong>Contact Information:</strong> ${data.grievancePhone || 'Not provided'} ${data.grievanceEmail ? `, ${data.grievanceEmail}` : ''}</li>`
                    : ''
            }
      ${
                data.contactPreference
                    ? `<li><strong>Contact Preference:</strong> ${
                        data.contactPreference === 'Yes'
                            ? 'User requested to be contacted using the provided details'
                            : 'User does not want to be contacted'
                    }</li>`
                    : ''
            }
      <li><strong>Incident Ward:</strong> ${data.incidentWard}</li>
      <li><strong>Incident Village:</strong> ${data.incidentVillage}</li>
      <li><strong>Description:</strong> ${data.grievanceDescription}</li>
      <li><strong>Date of Complaint:</strong> ${formattedDate}</li>
    </ul>
    <div class="footer">
      <a href="${EMAIL_GENERATED_LINK}" target="_blank" style="text-decoration: none; color: inherit;">${EMAIL_GENERATED_MESSAGE}</a>
    </div>
  </div>
</body>
</html>
`
        })
        return {
            message: 'Grievance submitted successfully!',
            success: true
        }
    } catch (error) {
        console.error('Error sending email:', error)
        return {
            message: 'Failed to submit grievance. Please try again.',
            success: false
        }
    }
}
