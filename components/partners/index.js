import React from 'react';
import Image from "next/image";


export const Partners = () => (
    <section id="partners" className="partners section">
        <div className="container" data-aos="zoom-in">
            <div className="partners-wrapper">
                <div className="partner">
                    <Image width={100} height={100} src="/logo.png" alt="Client 1" />
                </div>
                <div className="partner">
                    <Image width={100} height={100} src="/logo2.png" alt="Client 2" />
                </div>
                <div className="partner">
                    <Image width={100} height={100} src="/logo3.jpg" alt="Client 3" />
                </div>
                <div className="partner">
                    <Image width={100} height={100} src="/logo4.png" alt="Client 4" />
                </div>
                <div className="partner">
                    <Image width={100} height={100} src="/logo5.png" alt="Client 5" />
                </div>
            </div>
        </div>
    </section>
);

export default Partners;
