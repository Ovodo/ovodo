"use client";
import HeaderText from "@/components/cv/HeaderText";
import JobBox from "@/components/cv/JobBox";
import TopSection from "@/components/cv/TopSection";
import React from "react";
import { resume } from "@/lib/frontend";
import { Experience } from "@/types";
import { Rubik } from "next/font/google";
import { IconMoon, IconSun } from "@tabler/icons-react";

const jobs: Experience[] = resume.experience;

const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
  style: ["normal"],
});

// Ensures document <html> has the right theme class on mount
const ThemeContainer = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldDark = stored ? stored === "dark" : prefersDark;
      const root = document.documentElement;
      if (shouldDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } catch {}
  }, []);
  return <>{children}</>;
};

const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState<boolean>(false);
  React.useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };
  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs bg-white/80 dark:bg-night/80 backdrop-blur border-res_primary dark:border-gray-600 text-res_primary dark:text-gray-100 shadow-sm hover:bg-white dark:hover:bg-night"
      aria-label="Toggle theme"
    >
      {isDark ? <IconSun size={14} /> : <IconMoon size={14} />}
      <span>{isDark ? "Light" : "Dark"} mode</span>
    </button>
  );
};

const CV = () => {
  return (
    <div style={rubik.style}>
      {/* Theme toggle (easily hide by adding 'hidden' to the wrapper div) */}
      <div className="cv-theme-toggle hidden fixed top-3 left-1/2 -translate-x-1/2 z-20">
        <ThemeToggle />
      </div>
      <ThemeContainer>
        <div className="bg-white dark:bg-night p-[5vw] w-full h-max text-res_primary dark:text-gray-100">
          <TopSection />
          <div className="grid mt-[7vh] gap-20 grid-cols-[1.8fr,1fr]">
            {/* column 1 */}
            <div className="flex flex-col gap-16  ">
              <div>
                <HeaderText title="Experience" />
                <div className="flex flex-col mt-9 gap-12">
                  {jobs.map((item, index) => {
                    return <JobBox key={index.toString()} job={item} />;
                  })}
                </div>
              </div>
              <div>
                <HeaderText title="Education" />
                <div className="flex flex-col gap-6">
                  {resume.education.map((item, index) => {
                    return <JobBox key={index.toString()} job={item} />;
                  })}
                </div>
              </div>
              <div>
                <HeaderText title="Hobbies" />
                <div className="grid grid-cols-1  gap-2">
                  {resume.hobbies.map((item) => (
                    <p
                      key={item}
                      className="border-b font-medium border-b-res_primary/70 dark:border-b-gray-500 p-2"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {/* column 2 */}
            <div className="flex flex-col gap-32">
              <div>
                <HeaderText title="Summary" />
                <p className="">{resume.summary}</p>
              </div>

              <div>
                <HeaderText title="Certification" />
                <div className="flex flex-col gap-1">
                  {resume.certifications.map((item, index) => (
                    <JobBox key={index.toString()} job={item} />
                  ))}
                </div>
              </div>
              <div>
                <HeaderText title="Skills" />
                <div className="grid grid-cols-4  gap-2">
                  {resume.skills.map((item) => (
                    <p
                      key={item}
                      className="border-b font-medium border-b-res_primary/70 dark:border-b-gray-500 p-2"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div className="mt-16">
                <HeaderText title="Projects" />
                <div className="flex  flex-col mt-9 gap-12">
                  {resume.projects.map((item, index) => (
                    <JobBox key={index.toString()} job={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeContainer>
    </div>
  );
};

export default CV;
