'use client'

import React, { useState } from 'react'
import Script from 'next/script'
import '@/components/contact/Contact.css'
import { submitGrievance } from "@/actions/contact"
import { useActionState } from 'react'

// Helper function to get default value from payload (FormData or object)
const getDefault = (payload, field) => {
    if (payload instanceof FormData) {
        return payload.get(field) || ''
    }
    return (payload && payload[field]) || ''
}

export const Contact = () => {
    const [state, formAction, isPending] = useActionState(submitGrievance, {
        success: false,
        message: null,
    })

    // hCaptcha site key from your env variable
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || 'YOUR_HCAPTCHA_SITEKEY'

    // Initialize local states for form fields
    const initialGrievance = getDefault(state?.payload, 'grievanceRelates') || 'Climate Change project'
    const [selectedGrievance, setSelectedGrievance] = useState(initialGrievance)

    const otherGrievanceDefault = getDefault(state?.payload, 'otherGrievance')
    const [otherVal, setOtherVal] = useState(otherGrievanceDefault)

    const [emailVal, setEmailVal] = useState(getDefault(state?.payload, 'grievanceEmail'))
    const [phoneVal, setPhoneVal] = useState(getDefault(state?.payload, 'grievancePhone'))

    // Handlers
    const handleGrievanceChange = (e) => {
        setSelectedGrievance(e.target.value)
    }

    const handleOtherInputChange = (e) => {
        setOtherVal(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmailVal(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhoneVal(e.target.value)
    }

    return (
        <>
            <Script
                src="https://hcaptcha.com/1/api.js"
                strategy="afterInteractive"
                async
                defer
            />

            <section id="contact" className="contact section light-background">
                <div className="container" data-aos="fade">
                    <div className="row gy-5 gx-lg-5">
                        {/* Information Section */}
                        <div className="col-lg-4">
                            <div className="info">
                                <h3>Contact &amp; Grievance Submission</h3>
                                <p>
                                    The Directorate of Climate Change welcomes your grievances, complaints, or feedback
                                    regarding climate change projects and initiatives.
                                    Please note that providing your personal details is optional and will remain confidential.
                                </p>
                                <div className="info-item d-flex mt-3">
                                    <i className="bi bi-geo-alt flex-shrink-0"></i>
                                    <div>
                                        <h4>Location:</h4>
                                        <p>
                                            County Government of Vihiga<br />
                                            Department of Environment, Water, Energy, Natural Resources &amp; Climate Change<br />
                                            Directorate of Climate Change
                                        </p>
                                    </div>
                                </div>
                                <div className="info-item d-flex mt-3">
                                    <i className="bi bi-envelope flex-shrink-0"></i>
                                    <div>
                                        <h4>Email:</h4>
                                        <p>directorclimate@vihiga.go.ke</p>
                                    </div>
                                </div>
                                <div className="info-item d-flex mt-3">
                                    <i className="bi bi-phone flex-shrink-0"></i>
                                    <div>
                                        <h4>Call:</h4>
                                        <p>+254 799 116 630</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="col-lg-8 form-wrapper">
                            <form action={formAction} className="form">
                                {/* Honeypot field */}
                                <div style={{ display: 'none' }} aria-hidden="true">
                                    <label htmlFor="companyName">Company Name</label>
                                    <input type="text" id="companyName" name="companyName" />
                                </div>

                                <p className="mandatory-note mt-3 text-muted">
                                    Fields marked with <span className="required-asterisk">*</span> are mandatory. Your personal information is optional.
                                </p>

                                {/* Grievance Relates Section */}
                                <div id="grievance-relates" className="form-group">
                                    <label className="label">
                                        Your grievance relates to <span className="required-asterisk">*</span>
                                    </label>
                                    <div className="form-check mt-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="grievanceRelates"
                                            value="Climate Change project"
                                            onChange={handleGrievanceChange}
                                            defaultChecked={initialGrievance === 'Climate Change project'}
                                            required
                                        />
                                        <label className="form-check-label">
                                            Climate Change project
                                        </label>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="grievanceRelates"
                                            value="Ward Committee"
                                            onChange={handleGrievanceChange}
                                            defaultChecked={initialGrievance === 'Ward Committee'}
                                        />
                                        <label className="form-check-label">
                                            Ward Committee
                                        </label>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="grievanceRelates"
                                            value="County Government"
                                            onChange={handleGrievanceChange}
                                            defaultChecked={initialGrievance === 'County Government'}
                                        />
                                        <label className="form-check-label">
                                            County Government
                                        </label>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="grievanceRelates"
                                            value="Other"
                                            onChange={handleGrievanceChange}
                                            defaultChecked={initialGrievance === 'Other'}
                                        />
                                        <label className="form-check-label">
                                            Other
                                        </label>
                                    </div>
                                    {selectedGrievance === 'Other' && (
                                        <div className="form-group mt-3">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="otherGrievance"
                                                id="otherGrievanceInput"
                                                placeholder="Please specify"
                                                required
                                                defaultValue={otherGrievanceDefault}
                                                onChange={handleOtherInputChange}
                                            />
                                        </div>
                                    )}
                                </div>

                                <hr className="line my-4" />

                                {/* Personal Information Section */}
                                <div className="mt-3">
                                    <label className="label">
                                        Personal Information <span className="optional">(optional)</span>
                                    </label>
                                    <div className="row mt-3">
                                        <div className="col-md-6 form-group">
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    name="grievanceGender"
                                                    className="form-check-input"
                                                    value="Male"
                                                    defaultChecked={getDefault(state?.payload, 'grievanceGender') === 'Male'}
                                                />
                                                <label className="form-check-label">
                                                    Male
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    name="grievanceGender"
                                                    className="form-check-input"
                                                    value="Female"
                                                    defaultChecked={getDefault(state?.payload, 'grievanceGender') === 'Female'}
                                                />
                                                <label className="form-check-label">
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 form-group">
                                            <input
                                                type="text"
                                                name="grievanceName"
                                                className="form-control"
                                                placeholder="Your Name"
                                                defaultValue={getDefault(state?.payload, 'grievanceName')}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mt-3 mt-md-0">
                                            <input
                                                type="number"
                                                name="grievanceAge"
                                                className="form-control"
                                                placeholder="Your Age"
                                                defaultValue={getDefault(state?.payload, 'grievanceAge')}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6 form-group">
                                            <input
                                                type="email"
                                                name="grievanceEmail"
                                                className="form-control"
                                                placeholder="Your Email"
                                                defaultValue={getDefault(state?.payload, 'grievanceEmail')}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group mt-3 mt-md-0">
                                            <input
                                                type="text"
                                                name="grievancePhone"
                                                className="form-control"
                                                placeholder="Your phone number"
                                                defaultValue={getDefault(state?.payload, 'grievancePhone')}
                                                onChange={handlePhoneChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Preference Section (conditionally rendered) */}
                                {(emailVal.trim() !== '' || phoneVal.trim() !== '') && (
                                    <>
                                        <hr className="line my-4" />
                                        <div className="mt-3">
                                            <label className="label">
                                                Would you like us to contact you using the details you provided? <span className="required-asterisk">*</span>
                                            </label>
                                            <div className="form-check mt-3">
                                                <input
                                                    type="radio"
                                                    name="contactPreference"
                                                    value="Yes"
                                                    className="form-check-input"
                                                    required
                                                    defaultChecked={getDefault(state?.payload, 'contactPreference') === 'Yes'}
                                                />
                                                <label className="form-check-label">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check mt-3">
                                                <input
                                                    type="radio"
                                                    name="contactPreference"
                                                    value="No"
                                                    className="form-check-input"
                                                    defaultChecked={getDefault(state?.payload, 'contactPreference') === 'No'}
                                                />
                                                <label className="form-check-label">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <hr className="line my-4" />

                                {/* Location Section */}
                                <div className="mt-3">
                                    <label className="label">
                                        Where are you from? <span className="required-asterisk">*</span>
                                    </label>
                                    <div className="row mt-3">
                                        <div className="col-md-6 form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="incidentWard"
                                                placeholder="Incident Location - Ward"
                                                required
                                                defaultValue={getDefault(state?.payload, 'incidentWard')}
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="incidentVillage"
                                                placeholder="Incident Location - Village"
                                                required
                                                defaultValue={getDefault(state?.payload, 'incidentVillage')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <hr className="line my-4" />

                                {/* Date Section */}
                                <div className="form-group mt-3">
                                    <label className="label">
                                        Date <span className="required-asterisk">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="complaintDate"
                                        placeholder="Date"
                                        required
                                        defaultValue={getDefault(state?.payload, 'complaintDate')}
                                    />
                                </div>

                                <hr className="line my-4" />

                                {/* Grievance Description Section */}
                                <div className="form-group mt-3">
                                    <label className="label">
                                        Describe your grievance <span className="required-asterisk">*</span>
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="grievanceDescription"
                                        placeholder="Describe your grievance"
                                        required
                                        defaultValue={getDefault(state?.payload, 'grievanceDescription')}
                                    ></textarea>
                                </div>

                                {/* hCaptcha Widget */}
                                <div className="mt-4 d-flex align-items-center justify-content-center">
                                    <div className="h-captcha" data-sitekey={siteKey}></div>
                                </div>

                                {/* Submission Messages */}
                                <div className="my-3">
                                    {isPending && <div className="loading">Loading</div>}
                                    {state?.message &&
                                        (state.success ? (
                                            <div className="sent-message">{state.message}</div>
                                        ) : (
                                            <div className="error-message">{state.message}</div>
                                        ))
                                    }
                                </div>

                                <div className="text-center mt-3">
                                    <button type="submit" disabled={isPending}>
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
