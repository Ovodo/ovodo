"use client";
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconBrandTelegram,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

const Contact = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState<boolean[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.5 }
    );

    const buttonsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            [0, 1, 2, 3].forEach((index) => {
              setTimeout(() => {
                setButtonsVisible((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150);
            });
          } else {
            setButtonsVisible([]);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (buttonsRef.current) buttonsObserver.observe(buttonsRef.current);

    return () => {
      if (headerRef.current) headerObserver.unobserve(headerRef.current);
      if (buttonsRef.current) buttonsObserver.unobserve(buttonsRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center py-[10vh] lg:mb-[15vh] justify-center">
      <div
        ref={headerRef}
        className={`flex flex-col gap-4 sm:gap-8 w-full items-center justify-between transition-all duration-1000 ease-out ${
          headerVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-primary text-[32px] sm:text-[48px] text-center md:text-[56px] leading-[1.1] font-bold">
          Let&apos;s Connect
        </h1>
        <p className="text-primary text-base sm:text-lg text-center md:text-xl leading-tight font-light max-w-[700px]">
          Interested in collaborating, hiring, or just want to chat about
          blockchain and full stack development? Reach out and let’s build
          something amazing together!
        </p>
      </div>
      <div
        ref={buttonsRef}
        className="flex flex-wrap gap-4 justify-center mt-4"
      >
        <a
          href="mailto:ovodo@ovd.dev"
          className={`flex items-center gap-2 text-night bg-primary px-5 py-3 rounded-lg font-semibold text-lg shadow hover:scale-105 transition-all duration-700 ease-out ${
            buttonsVisible[0]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <IconMail size={22} /> Email
        </a>
        <a
          href="https://linkedin.com/in/ovodo"
          target="_blank"
          className={`flex items-center gap-2 text-primary border border-primary px-5 py-3 rounded-lg font-semibold text-lg hover:bg-primary hover:text-night transition-all duration-700 ease-out ${
            buttonsVisible[1]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <IconBrandLinkedin size={22} /> LinkedIn
        </a>
        <a
          href="https://github.com/ovodo"
          target="_blank"
          className={`flex items-center gap-2 text-primary border border-primary px-5 py-3 rounded-lg font-semibold text-lg hover:bg-primary hover:text-night transition-all duration-700 ease-out ${
            buttonsVisible[2]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <IconBrandGithub size={22} /> GitHub
        </a>
        <a
          href="https://t.me/ovdizzle"
          target="_blank"
          className={`flex items-center gap-2 text-primary border border-primary px-5 py-3 rounded-lg font-semibold text-lg hover:bg-primary hover:text-night transition-all duration-700 ease-out ${
            buttonsVisible[3]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <IconBrandTelegram size={22} /> Telegram
        </a>
      </div>
    </div>
  );
};

export default Contact;
