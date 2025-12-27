"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    name: " Shachindra Kumar, CEO at Lazarus Network",
    quote:
      "Ovodo delivered our project ahead of schedule and exceeded our expectations. His technical expertise and proactive communication made a real difference to our business results.",
  },
  {
    name: "John Ikibie, CEO at Edusoul",
    quote:
      "Working with Ovodo was a game-changer. Our user engagement increased by 30% after his improvements to our platform. Highly recommended!",
  },
];

const Testimonials = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([false, false]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTitleVisible(true);
          } else {
            setTitleVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonials.forEach((_, index) => {
              setTimeout(() => {
                setCardsVisible((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200);
            });
          } else {
            setCardsVisible([false, false]);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) titleObserver.observe(titleRef.current);
    if (cardsRef.current) cardsObserver.observe(cardsRef.current);

    return () => {
      if (titleRef.current) titleObserver.unobserve(titleRef.current);
      if (cardsRef.current) cardsObserver.unobserve(cardsRef.current);
    };
  }, []);

  return (
    <section className="flex flex-col gap-8 justify-center py-12 items-center bg-night/80 rounded-xl shadow-lg my-8">
      <h3
        ref={titleRef}
        className={`text-primary text-2xl font-bold flex items-center gap-2 transition-all duration-1000 ease-out ${
          titleVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <IconQuote className="text-mint" size={32} />
        Testimonials
      </h3>
      <div
        ref={cardsRef}
        className="flex flex-col md:flex-row gap-8 w-full justify-center"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`bg-primary/10 border border-mint/30 rounded-lg p-6 max-w-md shadow-md transition-all duration-700 ease-out ${
              cardsVisible[i]
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-95"
            }`}
          >
            <p className="text-primary text-lg italic mb-4">“{t.quote}”</p>
            <p className="text-mint font-semibold">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
