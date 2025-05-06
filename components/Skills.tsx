"use client";
import React from "react";
import SkillCard from "./SkillCard";
import Link from "next/link";
import { resume } from "../app/lib/data";

const skills = [
  {
    src: "/ts.png",
    header: "TypeScript: JavaScript with Superpowers",
    desc: "JavaScript powers interactive web applications and dynamic content.",
  },
  {
    src: "/rust.png",
    header: "Rust: The highly performant language",
    desc: "The most loved language of 2024. Lets get rusty!!",
  },
  {
    src: "/solidity.svg",
    header: "Solidity: Smart Contracts on Ethereum",
    desc: "The First Smart Contract Language!!.",
  },
  {
    src: "/mov.jpg",
    header: "Move: A Language for Secure Transactions",
    desc: "Move is designed for safe and efficient blockchain applications.",
  },
  {
    src: "/python.png",
    header: "Python: The Versatile Language",
    desc: "Python is known for its simplicity and readability, making it a great choice for beginners and experts alike.",
  },
];

const Skills = () => {
  return (
    <div className="flex flex-col gap-20 py-16" id="skills">
      <div className="flex flex-col gap-8 w-full items-center justify-center">
        {/* <h3 className="text-primary text-xl sm:text-2xl md:text-xl font-bold">
          Skills
        </h3> */}
        <h1 className="text-primary text-[32px] sm:text-[48px] md:text-[56px] leading-[1.1] text-center font-bold">
          Explore My Key Programming Languages
        </h1>
        <p className="text-primary text-sm sm:text-[16px] md:text-[20px] leading-tight font-light max-w-[1000px] text-center">
          As a versatile software engineer, I specialize in a variety of
          programming languages. My expertise spans JavaScript, TypeScript,
          Move, Rust, and Python, enabling me to tackle diverse projects with
          confidence. Each language adds a unique tool to my development
          toolkit, allowing for innovative solutions.
        </p>
      </div>
      <hr
        className="border-primary/20 w-full max-w-8xl mx-auto my-8"
        aria-hidden="true"
      />
      <div className="flex flex-col scrollbar-hide sm:flex-row gap-16 overflow-x-auto py-8 justify-between items-center">
        {skills.map((item, index) => (
          <SkillCard
            href="/projects"
            index={index}
            key={item.src}
            src={item.src}
            header={item.header}
            desc={item.desc}
          />
        ))}
      </div>
      <hr
        className="border-primary/20 w-full max-w-8xl mx-auto my-8 sm:my-12"
        aria-hidden="true"
      />
      {/* Certifications Section */}
      {/* <div className="mt-10 flex flex-col gap-8 items-center w-full">
        <h3 className="text-primary text-2xl font-bold mb-2">Certifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-full">
          {resume.certifications?.map((cert, idx) => (
            <div
              key={idx}
              className="bg-night/80 border border-primary/20 rounded-xl p-6 flex flex-col gap-2 shadow hover:shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary"
              tabIndex={0}
              aria-label={`Certification: ${cert.title}`}
            >
              <h4 className="text-lg font-semibold text-primary">
                {cert.title}
              </h4>
              <span className="text-primary/80 text-sm font-medium">
                {cert.company}
              </span>
              <span className="text-primary/60 text-xs">{cert.dates}</span>
              <ul className="list-disc pl-4 text-primary/80 text-sm font-light">
                {cert.achievements?.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
              {cert.link && (
                <Link
                  href={cert.link}
                  target="_blank"
                  className="text-primary underline text-xs mt-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`View certificate for ${cert.title}`}
                >
                  View Certificate
                </Link>
              )}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Skills;
