import React from 'react';
import styles from './Contact.module.css';
export const Contact = () => {
    return (
        <section id="contact" className={`section light-background `}>
            <div className="section-title">
                <h3>For Complaints or Views</h3>
            </div>
            <div className="container" data-aos="fade">
                <div className="row gy-5 gx-lg-5">
                    {/* Info Column */}
                    <div className="col-lg-4" data-aos="fade-up">
                        <div className={styles.info}>
                            <p>
                                We are the Directorate of Climate Change under the Department of Environment,
                                Water, Energy, Natural Resources &amp; Climate Change. For inquiries about projects,
                                grievances, or general information, please reach out below.
                            </p>
                            <div className={styles.infoItem}>
                                <i className="bi bi-geo-alt flex-shrink-0"></i>
                                <div>
                                    <h4>Location:</h4>
                                    <p>County Government of Vihiga,<br />
                                        Department of Environment, Water, Energy, Natural Resources &amp; Climate Change
                                    </p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <i className="bi bi-envelope flex-shrink-0"></i>
                                <div>
                                    <h4>Email:</h4>
                                    <p>directorclimate@vihiga.go.ke</p>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <i className="bi bi-phone flex-shrink-0"></i>
                                <div>
                                    <h4>Call:</h4>
                                    <p>0799116630</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Form Column */}
                    <div className="col-lg-8" data-aos="fade-up">
                        <form action="" method="post" role="form" className={styles.form}>
                            {/* Grievance relates to */}
                            <div className={styles.formGroup} >
                                <label htmlFor="grievance-relates">Grievance relates to:</label>
                                <div id="grievance-relates">
                                    <div className='d-flex align-items-center'>
                                        <input type="radio" name="grievanceRelates" value="Climate Change project"
                                               id="gcp" required/>
                                        <label htmlFor="gcp" className={styles.smallLabel}>Climate Change project</label>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <input type="radio" name="grievanceRelates" value="Ward Committee" id="wc"/>
                                        <label htmlFor="wc" className={styles.smallLabel}>Ward Committee</label>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <input type="radio" name="grievanceRelates" value="County Government" id="cg"/>
                                        <label htmlFor="cg" className={styles.smallLabel}>County Government</label>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <input type="radio" name="grievanceRelates" value="Other" id="other"/>
                                        <label htmlFor="other" className={styles.smallLabel}>Other</label>
                                    </div>
                                </div>
                                <div className={`${styles.formGroup} mt-2`} >
                                    <input type="text" name="otherGrievance" id="otherGrievance"
                                           placeholder="If Other, please describe"/>
                                </div>
                            </div>

                            {/* Details of Person Raising Grievance */}
                            <div className={styles.formGroup} >
                                <label htmlFor="grievanceName">Name</label>
                                <input type="text" name="grievanceName" id="grievanceName" placeholder="Your Name"/>
                            </div>
                            <div className={styles.formGroup} >
                                <label>Gender</label>
                                <div className='d-flex align-items-center'>
                                    <input type="radio" name="grievanceGender" value="Male" id="male" required/>
                                    <label htmlFor="male" className={styles.smallLabel}>Male</label>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <input type="radio" name="grievanceGender" value="Female" id="female"/>
                                    <label htmlFor="female" className={styles.smallLabel}>Female</label>
                                </div>
                            </div>
                            <div className={styles.formGroup} >
                                <label htmlFor="grievanceAge">Age</label>
                                <input type="number" name="grievanceAge" id="grievanceAge" placeholder="Your Age"/>
                            </div>
                            <div className={styles.formGroup} >
                                <label htmlFor="grievanceContact">Contact</label>
                                <input type="text" name="grievanceContact" id="grievanceContact"
                                       placeholder="Your Contact Information"/>
                            </div>

                            {/* Incident Location */}
                            <div className={styles.formGroup} >
                                <label htmlFor="incidentWard">Incident Location - Ward</label>
                                <input type="text" name="incidentWard" id="incidentWard" placeholder="Ward"/>
                            </div>
                            <div className={styles.formGroup} >
                                <label htmlFor="incidentVillage">Incident Location - Village</label>
                                <input type="text" name="incidentVillage" id="incidentVillage" placeholder="Village"/>
                            </div>

                            {/* Brief Description of Grievance */}
                            <div className={styles.formGroup} >
                                <label htmlFor="grievanceDescription">Brief Description of Grievance</label>
                                <textarea className="form-control" name="grievanceDescription" id="grievanceDescription"
                                          placeholder="Describe your grievance" required></textarea>
                            </div>

                            {/* Date of Complaint Submission */}
                            <div className={styles.formGroup} >
                                <label htmlFor="complaintDate">Date of Complaint Submission</label>
                                <input type="date" className="form-control" name="complaintDate" id="complaintDate"
                                       required/>
                            </div>

                            <div className="text-center" >
                                <button type="submit" className={styles.submitBtn}>Send Message</button>
                            </div>
                        </form>
                    </div>
                    {/* End Form Column */}
                </div>
                {/* End Row */}
            </div>
            {/* End Container */}
        </section>
    );
};

export default Contact;
