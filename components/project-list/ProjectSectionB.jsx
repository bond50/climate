import React from 'react';
import styles from './ProjectsListSection.module.css';
import {TableSection} from "@/components/project-list/TableSection";

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
        <TableSection
            title="B. FLLoCA CCRI 1 GRANT PROJECTS"
            data={sectionB}
            className={'light-background'}
            id="flloca"
        />
    );
};


