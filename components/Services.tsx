"use client";
import { IconSparkles } from "@tabler/icons-react";
import { resume } from "@/app/lib/data";

const Services = () => {
  // Animation variants must be serializable objects, not functions
  // const cardVariants = {
  //   hidden: { opacity: 0, y: 40 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.7, type: "spring", bounce: 0.3 },
  //   },
  //   hover: {
  //     scale: 1.04,
  //     boxShadow: "0 4px 32px 0 rgba(79,178,134,0.15)",
  //     transition: { duration: 0.3 },
  //   },
  // };

  return (
    <section id="services" className="flex flex-col gap-8 lg:gap-14">
      {" "}
      <header className="flex flex-col gap-2 mb-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3 text-[var(--text)]">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--accent)] text-[var(--background)] mr-1">
            <IconSparkles size={22} />
          </span>
          <span>Services</span>
        </h2>
        <p className="text-muted text-base sm:text-lg max-w-2xl">
          I provide expert solutions tailored to your needs across these
          categories:
        </p>
      </header>
      <div className="flex flex-col gap-6">
        {resume.services.map((item) => (
          <div
            key={item.title}
            className="panel flex items-center gap-0 overflow-hidden relative min-h-[84px] group hover:shadow-lg transition-all duration-200"
            style={{ borderLeft: "6px solid var(--accent)" }}
          >
            <div className="flex flex-col min-w-0 w-full py-4 px-6">
              <div className="flex items-center gap-3 mb-1">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--accent)] text-[var(--background)]">
                  <IconSparkles size={16} />
                </span>
                <span className="font-bold text-lg sm:text-xl text-[var(--text)]">
                  {item.title}
                </span>
              </div>
              <p className="text-muted text-sm sm:text-base pl-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Services;
