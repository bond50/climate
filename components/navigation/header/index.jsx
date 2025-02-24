'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export const Header = () => {
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    const toggleMobileNav = () => {
        setMobileNavActive((prev) => !prev);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setMobileNavActive(false);
    };

    // Array of navigation links
    const navLinks = [
        { href: "#about", label: "About" },
        { href: "#partners", label: "Partners" },
        { href: "#strategy", label: "Objectives" },
        { href: "#cccf", label: "CCCF 2023/2024" },
        { href: "#flloca", label: "FLLoCA CCRI projects" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" }
    ];

    return (

        <>
            <div className={`${styles.topbar} d-flex align-items-center`}>
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className={`${styles['contact-info']} d-flex align-items-center`}>
                        <i className="bi bi-envelope d-flex align-items-center"><a
                            href="mailto:directorclimate@vihiga.go.ke">directorclimate@vihiga.go.ke</a></i>
                        <i className="bi bi-phone d-flex align-items-center ms-4"><span>+254 799 116 630</span></i>
                    </div>
                </div>
            </div>

            <header id="header" className={`${styles.header} d-flex align-items-center sticky-top`}>


                <div
                    className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                    <Link href="#home" className={`${styles.logo} d-flex align-items-center`}>
                        <Image
                            src="/logo.png"
                            className={styles.logoImage}
                            alt="Climate Change Logo"
                            width={60}
                            height={60}
                            priority
                        />
                        <h1 className={styles.siteName}>Climate Change</h1>
                    </Link>
                    <nav id="navmenu" className={styles.navmenu}>
                        {/* Mobile toggle button */}
                        <button
                            className={`${styles.mobileNavToggle} ${mobileNavActive ? styles.mobileNavToggleActive : ''} d-xl-none`}
                            onClick={toggleMobileNav}
                            aria-label="Toggle navigation"
                        >
                            <i className={mobileNavActive ? "bi bi-x" : "bi bi-list"}></i>
                        </button>
                        {/* Mobile nav overlay */}
                        <div className={`${styles.navLinks} ${mobileNavActive ? styles.activeNav : ''}`}>
                            <ul>
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            onClick={() => handleLinkClick(link.href)}
                                            className={`${styles.navLink} ${activeLink === link.href ? styles.active : ''}`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

        </>
    );
};
