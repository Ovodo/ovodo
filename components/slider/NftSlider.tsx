"use client";

import { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./slider.css";
import { Nftdata } from "./Nftdata";

const Sliders: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideLength = Nftdata.length;

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
    <div className="slider">
      <AiOutlineArrowLeft className="arrow  prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {Nftdata.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <>
                <div>
                  <img src={slide.image} alt="drums" />
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
      <div className="butt">
        <h6>Non-Fungibles</h6>
      </div>
    </div>
  );
};

export default Sliders;
