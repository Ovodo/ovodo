"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Hero2 = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  // Start visible so the LCP image is painted immediately on first render
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    // Stagger animations on mount
    const timers = [
      setTimeout(() => setTitleVisible(true), 100),
      setTimeout(() => setDescVisible(true), 400),
      setTimeout(() => setButtonVisible(true), 700),
      setTimeout(() => setImageVisible(true), 300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-auto min-h-[90vh]  mt-[4%] flex flex-col  items-center  justify-end">
      <div className="flex  flex-col sm:flex-row gap-4 sm:gap-8 mt-[0%] w-full items-center md:items-start   justify-between">
        <h1
          className={`text-primary sm:w-1/2  sm:text-[48px] md:text-[56px] max-w-[656px] leading-[1.1] sm:leading-none font-bold transition-all duration-1000 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          Innovative Software Engineer & Blockchain Developer
        </h1>
        <div
          className={`flex  flex-col sm:w-1/2 md:w-max gap-4 sm:gap-8 transition-all duration-1000 ease-out delay-300 ${
            descVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <p className="text-primary text-sm  sm:text-[16px]  md:text-[20px] leading-tight font-light max-w-[620px]">
            I help companies accelerate growth and innovation by building
            scalable, secure, and user-focused digital products. Proven track
            record of increasing efficiency, engagement, and revenue through
            technology.
          </p>
          <div
            className={`flex items-center gap-4 sm:gap-8 transition-all duration-700 ease-out ${
              buttonVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            <Link
              href="/projects"
              className="text-night p-2 md:p-4 hover:scale-105 active:scale-95 text-sm lg:text-base duration-150 bg-primary rounded-[4px]"
            >
              Explore
            </Link>
            {/* <button className='text-primary p-4 bg-transparent duration-150  hover:scale-105 active:scale-95 border-primary border rounded-[4px]'>
              Donate
            </button> */}
          </div>
        </div>
      </div>
      <div
        className={`w-full relative flex item-start justify-end mt-auto  overflow-hidde rounded-md h-[60vh] lg:h-[50vh] transition-all duration-1000 ease-out ${
          imageVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Image
          src="/og/re-og.webp"
          className="object-cover  blur-sm hero-image cursor-pointer duration-500 object-right-bottom rounded-md shadow-sm shadow-primary hover:sm:blur-lg"
          alt="Abstract hero background image with gradients and shapes"
          priority
          fetchPriority="high"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 80vw"
        />
        <div className="w-[35%] relative overflow-hidden hero-image2 rounded-sm   shadow-primary/20 shadow-[_2px_-2px_2px]  h-full">
          <Image
            src={"/og/re-og.webp"}
            className="object-cover backdrop-blur-xl"
            alt="Overlay hero image featuring abstract shapes"
            fill
            sizes="(max-width: 640px) 35vw, (max-width: 1024px) 35vw, 28vw"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero2;
