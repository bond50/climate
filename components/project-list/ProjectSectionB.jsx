import React from 'react';
import styles from './ProjectsListSection.module.css';

export const ProjectsListSectionB = () => {


    // Data for Section B: FLLoCA CCRI 1 GRANT PROJECTS
    const sectionB = [
        {sn: 1, ward: "Luanda South", project: "Kayila water project"},
        {sn: 2, ward: "Central Bunyore", project: "Augmentation of Ebukhaya water project"},
        {sn: 3, ward: "Tambua", project: "Mutave-Jepsesi bridge"},
        {sn: 4, ward: "Shiru", project: "Mwala-Kaptik Solar water project"},
        {sn: 5, ward: "Izava Lyaduywa", project: "Vigina Water Project"},
        {sn: 6, ward: "Luanda Township", project: "Ekamanji water project"},
        {sn: 7, ward: "South Maragoli", project: "Rehabilitation of 70 acres of Maragoli Hills"},
        {sn: 8, ward: "Busali", project: "Nadiradi water project"},
        {sn: 9, ward: "West Sabatia", project: "Kegondi community water project"},
    ];

    return (
        <section id='flloca' className={`section light-background  `} data-aos="fade-up">

            <div className="section-title">
                <h3 className={styles.subHeader}>B. FLLoCA CCRI 1 GRANT PROJECTS</h3>
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
                    {sectionB.map((row) => (
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


