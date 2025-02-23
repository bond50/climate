import React from 'react';
import styles from './ProjectsListSection.module.css';

export const ProjectsListSectionA = () => {
    // Data for Section A: County Government Contribution (CCCF 2023/2024)
    const sectionA = [
        { sn: 1, ward: "Central Maragoli", project: "Igogwa Community Water Project" },
        { sn: 2, ward: "Wemilabi", project: "Wandwati Community water project" },
        { sn: 3, ward: "Jepkoyai", project: "Givole Community" },
        { sn: 4, ward: "West Bunyore", project: "Ipali/Mmakhondo" },
        { sn: 5, ward: "Wodanga", project: "Mudungu water project" },
        { sn: 6, ward: "South Maragoli", project: "Rehabilitation of 60 acres of Maragoli Hills Forest" },
    ];


    return (
        <section id='cccf' className={`section`} data-aos="fade-right">
            <div className="section-title">
                <h2 className={styles.subHeader}>A. County Government Contribution (CCCF 2023/2024)</h2>
            </div>
            <div className="container" data-aos="fade-up">
                <table className={styles.table} data-aos="fade-up">
                    <thead>
                    <tr data-aos="fade-up">
                        <th>S/N</th>
                        <th>Ward</th>
                        <th>Project Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sectionA.map((row) => (
                        <tr key={row.sn} data-aos="fade-up">
                            <td>{row.sn}</td>
                            <td>{row.ward}</td>
                            <td>{row.project}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};


