import {TableSection} from "@/components/project-list/TableSection";

export const ProjectsListSectionA = () => {
    const sectionA = [
        { sn: 1, ward: "Central Maragoli", project: "Igogwa Community Water Project" },
        { sn: 2, ward: "Wemilabi", project: "Wandwati Community water project" },
        { sn: 3, ward: "Jepkoyai", project: "Givole Community" },
        { sn: 4, ward: "West Bunyore", project: "Ipali/Mmakhondo" },
        { sn: 5, ward: "Wodanga", project: "Mudungu water project" },
        { sn: 6, ward: "South Maragoli", project: "Rehabilitation of 60 acres of Maragoli Hills Forest" },
    ];

    return (
        <TableSection
            title="A. County Government Contribution (CCCF 2023/2024)"
            data={sectionA}
            id="cccf"
        />
    );
};

