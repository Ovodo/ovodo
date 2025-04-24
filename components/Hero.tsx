import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="w-full h-[80vh]  flex flex-col sm:flex-row items-center  justify-between">
      <div className="flex flex-col gap-4 sm:gap-8 w-full sm:w-1/2  justify-between">
        <h1 className="text-primary text-[32px] sm:text-[48px] md:text-[56px] max-w-[656px] leading-[1.1] sm:leading-none font-bold">
          Delivering Measurable Results in Full-Stack & Blockchain Engineering
        </h1>
        <div className="flex flex-col gap-4 sm:gap-8">
          <p className="text-primary text-sm sm:text-[16px] md:text-[20px] font-light max-w-[690px] text-wrap">
            I help companies accelerate growth and innovation by building
            scalable, secure, and user-focused digital products. Proven track
            record of increasing efficiency, engagement, and revenue through
            technology.
          </p>
          <div className="flex items-center gap-4 sm:gap-8">
            <button className="text-night p-4 hover:scale-105 active:scale-95 duration-150 bg-primary rounded-[12px]">
              Explore
            </button>
            <button className="text-primary p-4 bg-transparent duration-150  hover:scale-105 active:scale-95 border-primary border rounded-[12px]">
              Donate
            </button>
          </div>
        </div>
      </div>
      <div className="w-full sm:w-1/2 relative flex item-center overflow-hidden rounded-md  h-[55%]  sm:h-full">
        <Image
          src={"/kools.jpg"}
          className="object-cover  hover:blur-sm hero-image cursor-pointer duration-500 rounded-md shadow-sm shadow-primary md:blur-xl"
          alt="hero"
          fill
        />
        <div className="w-[50%] relative overflow-hidden m-auto rounded-sm   shadow-primary shadow-[_2px_-2px_4px]  md:h-[60%]">
          <Image
            src={"/kools.jpg"}
            className="object-cover backdrop-blur-xl"
            alt="hero"
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
