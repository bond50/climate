import React from 'react';

const usefulLinks = [
    { label: "Home", url: "#home" },
    { label: "About Climate Change", url: "#about" },
    { label: "Strategic Objectives", url: "#strategy" },
    { label: "Projects", url: "#projects" },
    { label: "Partners", url: "#partners" },
];

const cccfLinks = [
    { label: "CCCF 2023/2024 Projects", url: "#cccf" },
    // { label: "Maragoli Hills Restoration", url: "#projects" },
    // { label: "Juakali Water Project", url: "#projects" },
    // { label: "Evojo Water Project", url: "#projects" },
    // { label: "Buhani Irrigation Water Project", url: "#projects" },
];

const ccriLinks = [
    { label: "FLLoCA CCRI 1 Grant Projects", url: "#flloca" },
    // { label: "Ebukhaya Water Project", url: "#projects" },
    // { label: "Vigina Water Project", url: "#projects" },
    // { label: "Mutave-Jepsesi Bridge", url: "#projects" },
    // { label: "Kegondi Community Water Project", url: "#projects" },
];

const grievanceLinks = [
    { label: "Report a Grievance", url: "#contact" },
    // { label: "Ward Committee", url: "#contact" },
    // { label: "County Government Contacts", url: "#contact" },
    // { label: "Submit Feedback", url: "#contact" },
    // { label: "Directorate of Climate Change", url: "#contact" },
];

const socialLinks = [
    { icon: "bi-twitter", url: "#" },
    { icon: "bi-facebook", url: "#" },
    { icon: "bi-instagram", url: "#" },
    { icon: "bi-linkedin", url: "#" },
];

export const Footer = () => {
    return (
        <footer id="footer" className="footer dark-background">
            <div className="container footer-top">
                <div className="row gy-4">
                    {/* Footer About */}
                    <div className="col-lg-4 col-md-6 footer-about">
                        <a href="#home" className="logo d-flex align-items-center">
                            <span className="sitename">County Government of Vihiga</span>
                        </a>
                        <div className="footer-contact pt-3">
                            <p>Directorate of Climate Change</p>
                            <p>Department of Environment, Water, Energy, Natural Resources &amp; Climate Change</p>
                            <p className="mt-3">
                                <strong>Phone:</strong> <span>0799116630</span>
                            </p>
                            <p>
                                <strong>Email:</strong> <span>directorclimate@vihiga.go.ke</span>
                            </p>
                        </div>
                        <div className="social-links d-flex mt-4">
                            {socialLinks.map((link, index) => (
                                <a key={index} href={link.url}>
                                    <i className={`bi ${link.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div className="col-lg-2 col-md-3 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            {usefulLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CCCF Projects */}
                    <div className="col-lg-2 col-md-3 footer-links">
                        <h4>CCCF Projects</h4>
                        <ul>
                            {cccfLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CCRI Projects */}
                    <div className="col-lg-2 col-md-3 footer-links">
                        <h4>CCRI Projects</h4>
                        <ul>
                            {ccriLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Grievances & Feedback */}
                    <div className="col-lg-2 col-md-3 footer-links">
                        <h4>Grievances</h4>
                        <ul>
                            {grievanceLinks.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url}>{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container text-center mt-4 copyright">
                <p>
                    © {new Date().getFullYear()}{" "}
                    <strong className="px-1 sitename">County Government of Vihiga</strong>{" "}
                    | All Rights Reserved
                </p>
            </div>
        </footer>
    );
};
