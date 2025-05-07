import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero2 = () => {
  return (
    <section className="w-full h-[80vh]  sm:mt-[15px] md:mt-[30px]  flex flex-col  items-center  justify-between">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full items-center md:items-start   justify-between">
        <h1 className="text-primary sm:w-1/2  sm:text-[48px] md:text-[56px] max-w-[656px] leading-[1.1] sm:leading-none font-bold">
          Innovative Software Engineer & Blockchain Developer
        </h1>
        <div className="flex  flex-col sm:w-1/2 md:w-max gap-4 sm:gap-8">
          <p className="text-primary text-sm  sm:text-[16px]  md:text-[20px] leading-tight font-light max-w-[620px]">
            I help companies accelerate growth and innovation by building
            scalable, secure, and user-focused digital products. Proven track
            record of increasing efficiency, engagement, and revenue through
            technology.
          </p>
          <div className="flex items-center gap-4 sm:gap-8">
            <Link
              href={"/projects"}
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
      <div className="w-full relative flex item-start justify-end mt-[5%] overflow-hidde rounded-md flex-1">
        <Image
          src={"/rem.webp"}
          className="object-cover  blur-sm hero-image cursor-pointer duration-500 rounded-md shadow-sm shadow-primary hover:sm:blur-lg"
          alt="hero"
          priority
          
          fill
        />
        <div className="w-[35%] relative overflow-hidden hero-image2 rounded-sm   shadow-primary shadow-[_2px_-2px_4px]  h-full">
          <Image
            src={"/rem.webp"}
            className="object-cover backdrop-blur-xl"
            alt="hero"
            priority
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default Hero2;
