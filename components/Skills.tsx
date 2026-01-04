"use client";
import { skills } from "@/app/lib/const";
import SkillCard from "./SkillCard";
import { useEffect, useRef, useState } from "react";

const Skills = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
          } else {
            setHeaderVisible(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skills.forEach((_, index) => {
              setTimeout(() => {
                setCardsVisible((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            });
          } else {
            setCardsVisible([]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const headerEl = headerRef.current;
    const cardsEl = cardsRef.current;

    if (headerEl) headerObserver.observe(headerEl);
    if (cardsEl) cardsObserver.observe(cardsEl);

    return () => {
      if (headerEl) headerObserver.unobserve(headerEl);
      if (cardsEl) cardsObserver.unobserve(cardsEl);
    };
  }, []);

  return (
    <div
      className="flex flex-col  h-full overflow-y-clip pt-10 pb-2 justify-between gap-10 "
      id="skills"
    >
      <div
        ref={headerRef}
        className={`flex flex-col gap-8 w-full  mx-auto items-center justify-center transition-all duration-1000 ease-out ${
          headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* <h3 className="text-primary text-xl sm:text-2xl md:text-xl font-bold">
          Skills
        </h3> */}
        <h1 className="text-primary text-2xl sm:text-3xl md:text-[56px] leading-[1.1] text-center whitespace-pre-wrap font-bold">
          Explore My Key Programming Languages
        </h1>
        <p className="text-primary text-sm sm:text-[16px] md:text-[20px] leading-tight font-light whitespace-pre-wrap max-w-full lg:max-w-[1000px] text-center">
          As a versatile software engineer, I specialize in a variety of
          programming languages. My expertise spans across JavaScript,
          TypeScript, Move, Rust, and Python, enabling me to tackle diverse
          projects with confidence. Each language adds a unique tool to my
          development toolkit, allowing for innovative solutions.
        </p>
      </div>
      <hr
        className="border-primary/20 w-full max-w-8xl mx-auto"
        aria-hidden="true"
      />
      <div
        ref={cardsRef}
        className="flex flex-row gap-4   h-full  px-4  lg:px-0 max-w-[88vw] lg:gap-16 overflow-x-auto justify-between items-center"
      >
        {skills.map((item, index) => (
          <div
            key={item.src}
            className={`transition-all w-[90vw] lg:w-[25vw] duration-700 ease-out ${
              cardsVisible[index]
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
            }`}
          >
            <SkillCard
              href="/projects"
              index={index}
              src={item.src}
              header={item.header}
              desc={item.desc}
            />
          </div>
        ))}
      </div>
      {/* <hr
        className="border-primary/20 w-full max-w-8xl mx-auto"
        aria-hidden="true"
      /> */}
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
