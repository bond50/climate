import React from 'react';
import Link from "next/link";
import Image from "next/image";
export const Header = () => (
    <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">

            <Link href="#home" className="logo d-flex align-items-center">
                 <Image src="/logo.png" className='img-fluid' alt="" width={100} height={100} priority/>
                <h1 className="sitename">Climate change</h1>
            </Link>

            <nav id="navmenu" className="navmenu">
                <ul>
                    <li>
                        <Link href="#about" className="active">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="#partners" >
                            Partners
                        </Link>
                    </li>

                    <li>
                        <Link href="#strategy">Objectives</Link>
                    </li>
                    <li>
                        <Link href="#cccf">CCCF 2023/2024</Link>
                    </li>
                    <li>
                        <Link href="#flloca">FLLoCA CCRI projects</Link>
                    </li>
                    <li>
                        <Link href="#projects" >
                            Projects
                        </Link>
                    </li>



                    <li>
                        <Link href="#contact">Contact</Link>
                    </li>
                </ul>
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

        </div>
    </header>
);


