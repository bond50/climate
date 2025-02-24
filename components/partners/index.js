import React from 'react';
import Image from "next/image";
import styles from './Partners.module.css'; // Import the module CSS

export const Partners = () => (
    <section id="partners" className={`${styles.partners} section`}>
        <div className="container" data-aos="zoom-in">
            <div className={styles.partnersWrapper}>
                <div className={styles.partner}>
                    <Image width={120} height={120} src="/logo.png" alt="Partner 1" className={styles.partnerImage}/>
                </div>
                <div className={styles.partner}>
                    <Image width={120} height={120} src="/logo2.png" alt="Partner 2" className={styles.partnerImage}/>
                </div>
                <div className={styles.partner}>
                    <Image width={120} height={120} src="/logo3.jpg" alt="Partner 3" className={styles.partnerImage}/>
                </div>
                <div className={styles.partner}>
                    <Image width={120} height={120} src="/logo4.png" alt="Partner 4" className={styles.partnerImage}/>
                </div>
                <div className={styles.partner}>
                    <Image width={120} height={120} src="/logo5.png" alt="Partner 5" className={styles.partnerImage}/>
                </div>
            </div>
        </div>
    </section>
);

export default Partners;