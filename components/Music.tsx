import React from "react";
import ViewCanvs from "./ViewCanvs";

const Music = () => {
  return (
    <section className="w-full  flex items-center">
      <div className="text-primary w-1/2 flex gap-2 md:gap-4 flex-col">
        <div className="w-[100px] h-[100px] relative">
          <ViewCanvs index={1} textureUrl="/dizz.png" />
        </div>
        <h1 className="text-primary   sm:text-[48px] md:text-[56px] max-w-[656px] leading-[1.1] sm:leading-none font-bold">
          {"My Musical Journey: Instruments I Play"}
        </h1>
        <p className="text-lg font-light">
          {
            "Music is a vital part of my life. I play the guitar, piano, and saxophone, each bringing a unique joy and creativity to my daily routine."
          }
        </p>
      </div>
      <div className="w-1/2 h-full"></div>
    </section>
  );
};

export default Music;
