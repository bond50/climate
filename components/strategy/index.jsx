import React from 'react';
import styles from '@/components/strategy/StrategySection.module.css';

const StrategySection = () => (
    <section id="strategy" className="section light-background ">
        <div className="section-title text-center mb-5" data-aos="fade-down">
            <h2>Directorate Strategic Objectives</h2>
        </div>
        <div className="container">
            <div className="row">

                <div className="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="300">
                    <div className={styles.card}>
                        <h5 className={styles.cardTitle}>Strategic Goals of the Directorate</h5>
                        <ul className={styles.list}>
                            <li className={styles.listItem} data-aos="fade-up" data-aos-delay="0">
                                Strengthening Climate Change Governance at all levels
                            </li>
                            <li className={styles.listItem} data-aos="fade-up" data-aos-delay="100">
                                Community Empowerment and Capacity Building for enhanced climate action
                            </li>
                            <li className={styles.listItem} data-aos="fade-up" data-aos-delay="200">
                                Locally-Led Adaptation and Resilience Projects
                            </li>
                            <li className={styles.listItem} data-aos="fade-up" data-aos-delay="300">
                                To promote sustainable utilization of renewable energy.
                            </li>
                            <li className={styles.listItem} data-aos="fade-up" data-aos-delay="400">
                                To strengthen climate resilience and enhance adaptation and mitigation strategies in Vihiga County.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Vision Card */}
                <div className="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="100">
                    <div className={styles.card}>
                        <h5 className={styles.cardTitle}>Vision</h5>
                        <p className={styles.cardText}>
                            To be a global leader in building resilience of communities against climate change.
                        </p>
                    </div>
                </div>
                {/* Mission Card */}
                <div className="col-lg-4 mb-4" data-aos="fade-up" data-aos-delay="200">
                    <div className={styles.card}>
                        <h5 className={styles.cardTitle}>Mission</h5>
                        <p className={styles.cardText}>
                            To foster and undertake intervention that strengthen capacity and build resilience of communities against climate change.
                        </p>
                    </div>
                </div>
                {/* Strategic Goals Card */}
            </div>
        </div>
    </section>
);

export default StrategySection;
