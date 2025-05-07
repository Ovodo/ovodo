"use client";
// import { ReactLenis } from "@studio-freight/react-lenis";
import React, { FC, useEffect } from "react";
import Lenis from "lenis";

type LenisScrollProviderProps = {
  children: any;
};
const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.025, smoothWheel: true });

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  return <div>{children}</div>;
};

export default LenisScrollProvider;
