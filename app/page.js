
import  {AboutSection} from "@/components/about";
import {Partners} from "@/components/partners";
import StrategySection from "@/components/strategy";
import {ProjectsSection} from "@/components/projects";

import {Contact} from "@/components/contact";
import {ProjectsListSectionA} from "@/components/project-list/ProjectSectionA";
import {ProjectsListSectionB} from "@/components/project-list/ProjectSectionB";



const Page = () => {
    return (
        <div>
          <AboutSection/>
            <Partners/>
            <StrategySection/>
            <ProjectsListSectionA/>
            <ProjectsListSectionB/>
            <ProjectsSection/>
            <Contact/>
        </div>
    );
};

export default Page;