"use client";
import React, { useMemo, useState } from "react";
// import ProjectCard from "./ProjectCard";
import { resume } from "../app/lib/data";
import dynamic from "next/dynamic";
const CardSkeleton = () => (
  <div className="flex gap-1 relative w-full lg:w-[22%] h-[400px] bg-[#152821] rounded-lg p-3 flex-col shadow-md animate-pulse border border-white/5">
    <div className="w-full h-[191px] rounded-lg bg-white/5" />
    <div className="mt-3 h-4 w-2/3 rounded bg-white/10" />
    <div className="mt-2 h-3 w-1/2 rounded bg-white/8" />
    <div className="mt-4 flex gap-2">
      <div className="h-3 w-12 rounded-full bg-white/10" />
      <div className="h-3 w-10 rounded-full bg-white/8" />
    </div>
    <div className="mt-auto h-8 w-20 rounded bg-white/6" />
  </div>
);

const ProjectCard = dynamic(() => import("@/components/ProjectCard"), {
  ssr: false,
  loading: () => <CardSkeleton />,
});

const FILTERS = ["All", "Blockchain", "Full Stack", "AI"];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const projects = useMemo(
    () => resume.projects.filter((p) => p.title && p.company),
    []
  );
  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) =>
      p.category?.some((cat) =>
        cat.toLowerCase().includes(active.toLowerCase())
      )
    );
  }, [active, projects]);
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
      <div className="flex flex-wrap gap-8 justify-start min-h-[440px]">
        {filtered.length === 0 ? (
          <div className="flex w-full items-center justify-center text-muted-foreground">
            <div className="flex items-center gap-3 rounded-full bg-black/40 px-4 py-2 border border-white/5">
              <span className="h-4 w-4 rounded-full border-2 border-accent/70 border-t-transparent animate-spin" />
              <span className="text-sm">Loading projects…</span>
            </div>
          </div>
        ) : (
          filtered.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
