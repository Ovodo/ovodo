"use client";
import React from "react";
import SkillCard from "./SkillCard";
import Link from "next/link";
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
  const handleContactClick = () => {
    const whatsappUrl = "https://wa.me/2348181983519";

    // Change the preferred contact method
    // window.open(whatsappUrl, "_blank");
    window.open(whatsappUrl, "_blank"); // Uncomment if you prefer Telegram
  };
  return (
    <section className="flex flex-col  h-max lg:h-auto justify-center gap-20">
      <div className="flex flex-col sm:flex-row  gap-4 sm:gap-8 w-full items-center md:items-center   justify-between">
        <div className="flex flex-col gap-3">
          <h3 className="text-primary text-xl sm:text-2xl md:text-xl   leading-[1.1] sm:leading-none font-bold">
            Skills
          </h3>
          <h1 className="text-primary text-[32px] sm:text-[48px] md:text-[56px]  leading-[1.1] sm:leading-none font-bold">
            Explore My Key Programming Languages
          </h1>
        </div>
        <p className="text-primary text-sm  sm:text-[16px]  md:text-[20px] leading-tight font-light max-w-[620px]">
          As a versatile software engineer, I specialize in a variety of
          programming languages. My expertise spans JavaScript, TypeScript,
          Move, Rust, and Python, enabling me to tackle diverse projects with
          confidence. Each language adds a unique tool to my development
          toolkit, allowing for innovative solutions.
        </p>
      </div>
      <div>
        <div className="flex flex-col scrollbar-hide sm:flex-row gap-16 overflow-x-scroll py-8 justify-between items-center">
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
        <div className="flex items-center md:mt-8 gap-4 sm:gap-8">
          <Link
            href={"/projects"}
            className="text-night  hover:bg-10 hover:text-primary p-4 hover:scale-105 active:scale-95 duration-150 bg-primary rounded-[12px]"
          >
            Learn More
          </Link>
          <button
            onClick={handleContactClick}
            className="text-primary p-4 bg-transparent duration-150  hover:scale-105 active:scale-95 border-primary border rounded-[12px]"
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
