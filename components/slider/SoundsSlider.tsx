"use client";

import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import {
  AiOutlinePlayCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import "./slider.css";

interface SlideItem {
  image: string;
  description: string;
}

interface SliderProps {
  name: SlideItem[];
  button: React.ReactNode;
  Header: string;
}

const Slider: React.FC<SliderProps> = ({ name, button, Header }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideLength = name.length;

  const autoscroll = true;
  const intervalTime = 6000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoscroll) {
      const slideInterval = setInterval(nextSlide, intervalTime);
      return () => clearInterval(slideInterval);
    }
    // eslint-disable-next-line
  }, [currentSlide]);

  return (
    <>
      <Typography marginBottom={2} className="flex items-start" variant="h5">
        {Header}
      </Typography>
      <div className="slider">
        {name.map((slide, index) => {
          return (
            <div
              className={index === currentSlide ? "slide current " : "slide"}
              key={index}
            >
              {index === currentSlide && (
                <>
                  <div className="imagecontainer border-4 relative w-[100%] h-80 md:w-full md:h-full">
                    <AiOutlineArrowLeft
                      className="arrow  prev "
                      onClick={prevSlide}
                    />
                    <AiOutlineArrowRight
                      className="arrow next "
                      onClick={nextSlide}
                    />
                    <img src={slide.image} className="" alt="drums" />
                    <div className="button-div pb-1 px-2 items-center">
                      <div className="player  animate-bounce hover:text-[32px] transition-all ease-in duration-500 cursor-pointer hover:rotate-180  shadow-sm  shadow-amber-500 rounded-[50%] ">
                        <AiOutlinePlayCircle className="" />
                      </div>
                      <div className="butt px-4 shadow-sm  border-2 shadow-amber-500 lg:shadow-md  lg:shadow-amber-500">
                        {button}
                      </div>
                    </div>
                  </div>
                  <div className="content">
                    <h5>{slide.description}</h5>
                    <hr color="green" />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Slider;
