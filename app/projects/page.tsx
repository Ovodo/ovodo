"use client";
import { useState } from "react";
import { resume } from "../lib/data";
import ProjectCard from "@/components/ProjectCard";

const Projects = () => {
  // --------------------------------------------VARIABLES
  const [search, setSearch] = useState("");

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className="flex flex-col">
      <div
        id="search"
        className="flex flex-row self-end max-w-[300px] h-[48px] items-center relative border rounded-[8px] border-primary"
      >
        <input
          placeholder="search / filter by"
          className="bg-transparent focus:outline-none opacity-90 w-full h-full p-2 text-primary"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="flex pb-[5vh] lg:flex-row flex-col mt-12 justify-start lg:flex-wrap gap-14">
        {resume.projects
          .filter((item) =>
            search
              ? item.company.toLowerCase().includes(search.toLowerCase()) ||
                item.category?.some((cat) =>
                  cat.toLowerCase().includes(search.toLowerCase())
                ) ||
                item.languages?.some((lang) =>
                  lang.toLowerCase().includes(search.toLowerCase())
                )
              : true
          )
          .slice(0, 6)
          .map((item, index) => (
            <ProjectCard key={index.toString()} project={item} />
          ))}
      </div>
    </div>
  );
};
export default Projects;
