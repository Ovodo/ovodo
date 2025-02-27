"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Hero2 = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 200 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.05, duration: 1, ease: "easeIn" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 2000 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.5, ease: "easeIn" },
    },
  };

  return (
    <section className='w-full h-[80vh]  overflow-x-hidden sm:mt-[15px] md:mt-[30px] flex flex-col items-center justify-between'>
      <motion.div
        className='flex flex-col sm:flex-row gap-4 sm:gap-8 w-full items-center md:items-start justify-between'
        initial='hidden'
        animate='visible'
        variants={textVariants}
      >
        {/* <div className='relative overflow-hidden flex '> */}
        <h1 className='sm:w-1/2 sm:text-[48px] md:text-[56px] flex-1 max-w-[656px] leading-[1.1] sm:leading-none font-bold'>
          Innovative Software Engineer & Blockchain Developer
        </h1>
        {/* </div> */}
        <div className='flex  flex-col sm:w-1/2 md:w-max gap- sm:gap-4'>
          <p className='text-primary text-sm sm:text-[16px] md:text-[18px] leading-tight font-light max-w-[620px]'>
            Welcome to my portfolio! With expertise in JavaScript, Python, and
            blockchain technology, I create impactful solutions that drive
            success.
          </p>
          <div className='flex items-center gap-4 sm:gap-8'>
            <button className='text-night py-3 px-4 hover:scale-105 active:scale-95 duration-150 bg-primary rounded-[4px]'>
              Explore
            </button>
            <button className='text-primary py-3 px-4 bg-transparent duration-150 hover:scale-105 active:scale-95 border-primary border rounded-[4px]'>
              Contact
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className='w-full relative flex item-start justify-end mt-[5%] overflow-hidden rounded-md flex-1'
        initial='hidden'
        animate='visible'
        variants={imageVariants}
      >
        <Image
          src={"/kools.jpg"}
          className='object-cover blur-sm hero-image cursor-pointer duration-500 rounded-md shadow-sm shadow-primary hover:sm:blur-lg'
          alt='hero'
          fill
        />
        <div className='w-[35%] relative overflow-hidden hero-image2 rounded-sm shadow-primary shadow-[_2px_-2px_4px] h-full'>
          <Image
            src={"/kools.jpg"}
            className='object-cover duration-500 transition-all backdrop-blur-xl'
            alt='hero'
            fill
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero2;
