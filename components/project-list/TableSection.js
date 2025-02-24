import React from 'react';
import styles from './ProjectsListSection.module.css';

export const TableSection = ({ title, data, id,className }) => {
    return (
        <section id={id} className={`section ${className}` } data-aos="fade-up">
            <div className="section-title">
                <h2 className={styles.subHeader}>{title}</h2>
            </div>
            <div className="container">
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Ward</th>
                        <th>Project Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row) => (
                        <tr key={row.sn}>
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