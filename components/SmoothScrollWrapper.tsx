"use client";
// import { ReactLenis } from "@studio-freight/react-lenis";
import React, { FC, useEffect } from "react";
import Lenis from "lenis";

type LenisScrollProviderProps = {
  children: any;
};
const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    // Respect reduced motion preferences
    // const prefersReduced = matchMedia(
    //   "(prefers-reduced-motion: reduce)"
    // ).matches;
    // if (prefersReduced) return;

    // Initialize Lenis with a snappier lerp for less 'lazy' feeling
    // const lenis = new Lenis({
    //   lerp: 0.01,
    //   smoothWheel: true,
    //   smoothTouch: false,
    // });

    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return <div>{children}</div>;
};

export default LenisScrollProvider;
