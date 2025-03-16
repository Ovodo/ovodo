import { Experience } from "../types";
import Image from "next/image";
import React from "react";
import { IconWorld } from "@tabler/icons-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const ProjectCard = ({ project }: { project: Experience }) => {
  return (
    <div className="flex gap-1 relative w-[22%] h-[350px]  bg-[#152821] rounded-lg  p-1  flex-col">
      {project.image && (
        <Link
          className="w-full   h-[191px]   rounded-lg  relative"
          href={`/projects/${project.company}`}
        >
          <Image
            src={project.image}
            alt={project.company}
            fill
            className="object-cover border-[0.5px] border-opacity-20 border-orange-100 rounded-lg hover:scale-[1.02] transition-transform duration-500 ease-in-out"
          />
        </Link>
      )}
      <div className="flex px-1   flex-1  flex-col justify-around">
        <h6 className="font-semibold text-lg text-res_secondary">
          {project.company}
        </h6>
        <div className="flex gap-1 flex-col">
          {project?.languages?.map((item) => (
            <div key={item} className="flex gap-1 items-center">
              <div
                className={`w-1 animate-pulse rounded-full ${
                  item.toLowerCase().includes("typescript")
                    ? "bg-[#31D1F1]"
                    : item.toLowerCase().includes("idity")
                    ? "bg-stone-600"
                    : item.toLowerCase().includes("javascript")
                    ? "bg-yellow-300"
                    : item.toLowerCase().includes("rust")
                    ? "bg-pink-300"
                    : "bg-violet-400"
                } h-1`}
              />
              <p className="text-xs text-res_primary capitalize">{item}</p>
            </div>
          ))}
        </div>

        <ul className=" flex gap-1">
          {project?.category?.map((item, index) => {
            return (
              <li className="text-[10px]" key={index.toString()}>
                <ReactMarkdown>{`#${item}`}</ReactMarkdown>
              </li>
            );
          })}
        </ul>
      </div>
      <Link
        className="absolute animate-spin bottom-2 right-2"
        href={project.link}
      >
        <IconWorld size={16} stroke={1} color="gray" />
      </Link>
    </div>
  );
};

export default ProjectCard;
