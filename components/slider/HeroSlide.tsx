"use client";

import React, { useEffect, useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import "./heroSlide.css";
import { background } from "./Sliderdata";

interface HeroSlideProps {
  name?: string;
}

const HeroSlide: React.FC<HeroSlideProps> = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideLength = background.length;

  const autoscroll = true;
  const intervalTime = 6000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft = slider.scrollLeft;
    }
  };

  function auto() {
    const slider = document.getElementById("slider");
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + slider.clientWidth;
    }
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoscroll) {
      auto();
    }
    // Interval cleanup is handled in the original
    // eslint-disable-next-line
  }, [currentSlide]);

  return (
    <div
      style={{
        display: "block",
        overflow: "hidden",
        position: "relative",
      }}
      className="heroSlide flex items-center h-[250px] max-w-[1200px] mx-auto mb-5"
    >
      <div
        id="slider"
        style={{ borderRadius: 10 }}
        className="w-full h-full flex  flex-nowrap overflow-x-scroll scroll scroll-smooth whitespace-nowrap"
      >
        {background.map((entry, index) => (
          <a key={index} className="grid grid-cols-[660px] mr-[2px]  ">
            <div
              style={{
                backgroundImage: `url(${background[index]})`,
              }}
              className=""
            ></div>
          </a>
        ))}
      </div>

      <BiArrowToLeft onClick={prevSlide} className="arr left " />
      <BiArrowToRight onClick={nextSlide} className="arr right " />
    </div>
  );
};

export default HeroSlide;
