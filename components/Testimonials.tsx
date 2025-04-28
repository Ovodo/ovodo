import React from "react";
import { IconQuote } from "@tabler/icons-react";

const testimonials = [
  {
    name: " Shachindra Kumar, CEO at Lazarus Network",
    quote:
      "Ovodo delivered our project ahead of schedule and exceeded our expectations. His technical expertise and proactive communication made a real difference to our business results.",
  },
  {
    name: "Brian, CEO at Skyopslabs",
    quote:
      "Working with Ovodo was a game-changer. Our user engagement increased by 30% after his improvements to our platform. Highly recommended!",
  },
];

const Testimonials = () => (
  <section className="flex flex-col gap-8 justify-center py-12 items-center bg-night/80 rounded-xl shadow-lg my-8">
    <h3 className="text-primary text-2xl font-bold flex items-center gap-2">
      <IconQuote className="text-mint" size={32} />
      Testimonials
    </h3>
    <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className="bg-primary/10 border border-mint/30 rounded-lg p-6 max-w-md shadow-md"
        >
          <p className="text-primary text-lg italic mb-4">“{t.quote}”</p>
          <p className="text-mint font-semibold">{t.name}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials;
