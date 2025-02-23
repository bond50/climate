'use client'
import {useState} from 'react';

import styles from '@/components/projects/ProjectsSection.module.css'

const projects = [
    {
        id: 1,
        title: "EBUKHAYA WATER PROJECT",
        location: "Central Bunyore ward / NorthEast Bunyore Ward",
        date: "2022/2023",
        objective:
            "To enhance the community’s capacity to adopt to climate change through promotion of access to clean and safe water for consumption in the Central Bunyore and North East Bunyore ward through adaptation of climate smart water supply.",
        scope: [
            "Spring source",
            "Elevated steel tank",
            "Pumping system",
            "Pipeline network of assorted sizes",
            "Erection of sign posts",
            "Storage tanks"
        ],
        benefits: "Serving 300 households",
        image: "/image1.jpg"
    },
    {
        id: 2,
        title: "BUHANI IRRIGATION WATER PROJECT",
        location: "Mungoma ward",
        date: "2021/2022",
        objective:
            "To improve livelihoods in Buhani village through increased food production in the context of Climate Change",
        scope: [
            "Rehabilitation of weir intake",
            "Construction of the masonry tank",
            "Falling lines to the farms",
            "Planting bamboo and water friendly species at intake",
            "Provision of yard taps",
            "Protection of 2 water springs",
            "Fencing of lands around the intake weirs"
        ],
        benefits: "Serving 100 households",
        image: "/image2.jpg"
    },
    {
        id: 3,
        title: "KIMOGOI/SHIKOMOLI WATER PROJECT",
        location: "Gisambai ward",
        date: "2022/2023",
        objective:
            "To increase community resilience against Climate Change through promoting access to clean and safe water for the community members in Gisambai ward",
        scope: [
            "Construction of intake",
            "Rising main",
            "Solar pumping unit",
            "Masonry tanks",
            "Distribution lines",
            "Treatment works"
        ],
        benefits: "Serving 100 households",
        image: "/image3.jpg"
    },
    {
        id: 4,
        title: "KAPTECH WATER PROJECT",
        location: "Muhudu ward",
        date: "2022/2023",
        objective:
            "To Enhance community capacity to adopt to the exacerbated effects of climate change through provision of sufficient clean and safe water",
        scope: [
            "Borehole source",
            "Solar pumping unit",
            "Elevated storage tanks",
            "Rising main",
            "Distribution mains",
            "Last mile connectivity",
            "Environmental conservation component"
        ],
        benefits: "Serving 960 households",
        image: "/image4.jpg"
    },
    {
        id: 5,
        title: "SOUTH MARAGOLI APICULTURE PROJECT",
        location: "South Maragoli Ward",
        date: "2022/2023",
        objective: "Diversify livelihoods through alternative source of income",
        scope: [
            "Community mobilization",
            "Group registration and training",
            "Site selection",
            "Apiary design and development",
            "Purchase of materials and equipment",
            "Installation, training and operationalizing"
        ],
        benefits: "Serving 200 households",
        image: "/image5.jpg"
    },
    {
        id: 6,
        title: "MUGOGO WATER PROJECT",
        location: "North Maragoli Ward",
        date: "2022/2023",
        objective:
            "Improve the livelihood of the community in order to enhance their capacity to adapt to the effects of climate change",
        scope: [
            "Spring source protection",
            "Sump construction, Solar pumping unit",
            "Elevated storage tanks",
            "Rising mains to elevated storage tanks",
            "Distribution mains",
            "Last mile connectivity",
            "Environmental conservation component"
        ],
        benefits: "Serving 192 households",
        image: "/image6.jpg"
    },
    {
        id: 7,
        title: "EVOJO WATER PROJECT",
        location: "Chavakali Ward",
        date: "2022/2023",
        objective:
            "To increase community resilience against climate change through promoting access to clean and safe piped water for the community members in Chavakali",
        scope: [
            "Existing borehole at Evojo primary school",
            "Solar pumping unit",
            "Elevated storage tank",
            "Rising main",
            "Distribution lines",
            "Last mile connectivity",
            "Environmental conservation component"
        ],
        benefits: "Serving 150 households",
        image: "/image7.jpg"
    },
    {
        id: 8,
        title: "JUAKALI WATER PROJECT",
        location: "Mwibona Ward",
        date: "2021/2022",
        objective:
            "To enhance the community’s capacity to adopt to climate change through promotion of access to clean and safe water in Mwibona ward through adoption of climate smart water supply scheme",
        scope: [
            "Installation of solar pumping system",
            "PVC rising main",
            "Laying of pipeline trench",
            "Erection of water storage tanks",
            "Steel tower 6m high",
            "Piping distribution mains",
            "Last mile connectivity"
        ],
        benefits: "Serving 150 households",
        image: "/image3.jpg"
    },
    {
        id: 9,
        title: "GIVOLE WATER PROJECT",
        location: "Jepkoyai Ward",
        date: "2023/2024",
        objective:
            "To enhance ability of community members to adopt to the effects of climate change through provision of safe and clean water",
        scope: [
            "Water from the source will gravitate to treatment works where it will be treated",
            "Pumped using solar pumping unit",
            "Masonry storage unit tank uphill",
            "Last mile connectivity"
        ],
        benefits: "Serving 150 households",
        image: "/image8.jpg"
    },
    {
        id: 10,
        title: "MUDUNGU WATER PROJECT",
        location: "Wodanga Ward",
        date: "2023/2024",
        objective:
            "To build the resilience of the community to have access to water during the prolonged dry season",
        scope: [
            "Borehole drilling at Mudungu Primary",
            "Solar pumping system, Elevated storage tank",
            "Rising main",
            "Distribution main",
            "Last mile connectivity"
        ],
        benefits: "Serving 240 households",
        image: "/image9.jpg"
    },
    {
        id: 11,
        title: "IPALI/MMAKHONDO WATER PROJECT",
        location: "West Bunyore Ward",
        date: "2023/2024",
        objective:
            "To enhance adaptation to climate change through adequate supply of clean and safe water to the community",
        scope: [
            "Spring source protection",
            "Collection chamber known as the water sump",
            "Solar pumping unit",
            "Rising main",
            "Elevated storage tanks",
            "Distribution mains",
            "Last mile connectivity",
            "Environmental conservation component"
        ],
        benefits: "Serving households",
        image: "/image1.jpg"
    },
    {
        id: 12,
        title: "WANDWATI WATER PROJECT",
        location: "Wemilabi Ward",
        date: "2023/2024",
        objective:
            "Enhancing the resilience of community members against the effects of climate change through conservation and distribution of water",
        scope: [
            "Spring source protection",
            "Collection chamber known as the water sump",
            "Solar pumping unit",
            "Rising main",
            "Elevated storage tank, Distribution mains and the last mile connectivity",
            "Environmental conservation component"
        ],
        benefits: "Serving 200 households",
        image: "/image4.jpg"
    },
    {
        id: 13,
        title: "MARAGOLI HILLS RESTORATION",
        location: "South Maragoli Ward",
        date: "2023/2024",
        objective:
            "To restore the ecosystem through rehabilitation of degraded catchment areas",
        scope: ["Planting and maintaining 60 acres of Maragoli hills degraded ecosystem"],
        benefits: "Serving 200 households",
        image: "/image4.jpg"
    },
    {
        id: 14,
        title: "IGOGWA WATER PROJECT",
        location: "Central Maragoli Ward",
        date: "2023/2024",
        objective:
            "Increase community flexibility against climate change impact through promoting access to clean and safe piped water in Central Maragoli ward",
        scope: [
            "Fencing of intake works",
            "Construction of water treatment chamber",
            "Construction of a sump",
            "Elevated storage tanks at Kidundu",
            "Rising main from the elevated",
            "Distribution lines"
        ],
        benefits: "",
        image: "/image5.jpg"
    }
];

export const ProjectsSection = () => {
    const [openProjectId, setOpenProjectId] = useState(null);

    const toggleProject = (id) => {
        setOpenProjectId((prevId) => (prevId === id ? null : id));
    };

    return (
        <section id="projects" className='section '>
            <div className="container" data-aos="fade-up">
                <div className='section-title'>
                    <h2>
                        Investment Projects
                    </h2>
                    <p >Vihiga County Climate change Fund Investments projects</p>

                </div>

                <div className={styles.cardContainer}>
                    {projects.map((project) => (
                        <div key={project.id} className={styles.card} data-aos="fade-up">
                            <img
                                src={project.image}
                                alt={project.title}
                                className={styles.cardImage}
                            />
                            <div className={styles.cardBody}>
                                <h5 className={styles.cardTitle}>
                                    {project.title.toLocaleLowerCase()}
                                </h5>
                                <p className={styles.cardText}>
                                    <strong>Location:</strong> {project.location}
                                </p>
                                <p className={styles.cardText}>
                                    <strong>Date:</strong> {project.date}
                                </p>
                                <button
                                    className={styles.toggleBtn}
                                    onClick={() => toggleProject(project.id)}
                                >
                                    {openProjectId === project.id ? 'Hide Details' : 'View Details'}
                                    <span
                                        className={`${styles.toggleIcon} ${
                                            openProjectId === project.id ? styles.rotate : ''
                                        }`}
                                    >
                    ▼
                  </span>
                                </button>
                                <div
                                    className={`${styles.collapsible} ${
                                        openProjectId === project.id ? styles.show : ''
                                    }`}
                                >
                                    <p className={styles.cardText}>
                                        <strong>Objective:</strong> {project.objective}
                                    </p>
                                    <p className={styles.cardText}>
                                        <strong>Scope:</strong>
                                    </p>
                                    <ul className={styles.detailsList}>
                                        {project.scope.map((item, index) => (
                                            <li key={index} className={styles.detailsListItem}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    {project.benefits && (
                                        <p className={styles.cardText}>
                                            <strong>Benefits:</strong> {project.benefits}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};




