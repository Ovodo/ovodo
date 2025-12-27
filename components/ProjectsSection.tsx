"use client";
import React, { useState } from "react";
// import ProjectCard from "./ProjectCard";
import { resume } from "../app/lib/data";
import dynamic from "next/dynamic";
const ProjectCard = dynamic(() => import("@/components/ProjectCard"), {
  ssr: false,
});

const FILTERS = ["All", "Blockchain", "Full Stack", "AI"];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const projects = resume.projects.filter((p) => p.title && p.company);
  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) =>
          p.category?.some((cat) =>
            cat.toLowerCase().includes(active.toLowerCase())
          )
        );
  return (
    <div className="py-16" id="projects">
      <h2 className="text-primary text-3xl font-bold mb-8 text-center">
        Featured Projects
      </h2>
      <div className="flex gap-4 justify-center mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-1 rounded-full border text-sm font-semibold transition-all duration-150 ${
              active === f
                ? "bg-primary text-night border-primary scale-105"
                : "bg-night text-primary border-primary/30 hover:scale-105"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-8 justify-start">
        {filtered.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
