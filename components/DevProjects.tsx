"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const categories = [
  {
    header: "Smart Contracts",
    desc: "Creating robust smart contracts that ensure transparency and trust in transactions.",
    video: "/videos/bounty.mp4",
  },
  {
    header: "DApp Development",
    desc: "Building user-friendly decentralized applications that empower users and streamline processes.",
    video: "/videos/seezus.mp4",
  },
  {
    header: "AI",
    desc: "Building user-friendly decentralized applications that empower users and streamline processes.",
    video: "/videos/sui.mp4",
  },
];

const DevProjects = () => {
  const [currentVideo, setCurrentVideo] = useState(categories[0].video);
  const [active, setActive] = useState(0);
  return (
    <section className='justify-center sm:justify-between gap-8  flex md:flex-row flex-col items-center'>
      <div className='flex flex-col gap-8  md:w-[45%]'>
        <h1 className='text-primary sm:text-[48px] md:text-[56px]  leading-[1.1] sm:leading-none font-bold'>
          Explore My Expertise in Innovative Blockchain Development Projects
        </h1>
        <p className='sm:w-[80%] text-sm sm:text-base'>
          With extensive experience in blockchain technology, I have developed
          various decentralized applications. My projects focus on enhancing
          security and efficiency in digital transactions.
        </p>
        <div className='flex flex-row w-[90vw] sm:w-full py-4 px-1 overflow-x-scroll overflow-y-visible h-max gap-8 justify-start items-start sm:items-center'>
          <div className='flex flex-row gap-8 justify-start items-start h-max sm:items-center'>
            {categories.map((item, index) => (
              <div
                onClick={() => {
                  setCurrentVideo(item.video);
                  setActive(index);
                }}
                onMouseEnter={() => {
                  setCurrentVideo(item.video);
                  setActive(index);
                }}
                className={`flex  ${
                  index == active ? "card" : "card-off"
                } flex-col p-4  mx-auto h-max  my-0 w-[300px] bg-night relative rounded-[8px] cursor-pointer gap-2`}
                key={index.toString()}
              >
                <h4 className='text-lg font-semibold'>{item.header}</h4>
                <p className='text-xs'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentVideo}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className='w-full md:w-[45%] sm:h-[70%]   video bg-primar flex items-center justify-center rounded-xl  '
        >
          <video
            src={currentVideo}
            autoPlay
            loop
            muted
            // className='w-full h-full object-cover'
            className='w-full sm:h-[350px]  object-fit  sm:object-cover cursor-pointer rounded-xl transition-transform duration-500'
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default DevProjects;
