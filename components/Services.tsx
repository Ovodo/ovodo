"use client";
import { IconSparkles, IconArrowRight } from "@tabler/icons-react";
import { resume } from "@/app/lib/data";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Services = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([]);
  const headerRef = useRef<HTMLElement>(null);
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
      { threshold: 0.5 },
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resume.services.forEach((_, index) => {
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
      { threshold: 0.2 },
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
    <section
      id="services"
      className="flex overflow-x-hidden h-max flex-col gap-8 lg:gap-14"
    >
      {" "}
      <header
        ref={headerRef}
        className={`flex flex-col gap-2 mb-2 transition-all duration-1000 ease-out ${
          headerVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-10"
        }`}
      >
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
      <div ref={cardsRef} className="flex  flex-col gap-6">
        {resume.services.map((item, index) => (
          <div
            key={item.title}
            className={`panel flex items-center gap-0 overflow-hidden relative min-h-[84px] group hover:shadow-lg transition-all duration-700 ease-out ${
              cardsVisible[index]
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
            style={{ borderLeft: "6px solid var(--accent)" }}
          >
            <div className="flex flex-col min-w-0 w-full py-4 px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-1">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--accent)] text-[var(--background)] flex-shrink-0">
                  <IconSparkles size={16} />
                </span>
                <span className="font-bold text-base sm:text-xl text-[var(--text)]">
                  {item.title}
                </span>
              </div>
              <p className="text-muted text-xs sm:text-sm pl-0.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* View all CTA */}
      <div
        className={`transition-all duration-700 ease-out delay-300 ${
          headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-150 no-underline hover:no-underline group"
        >
          View full service breakdown
          <IconArrowRight
            size={16}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};
export default Services;
