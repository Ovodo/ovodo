"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import React, { FC, useRef } from "react";

type LenisScrollProviderProps = {
  children: any;
};
const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef(null);
  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{ lerp: 0.15, smoothWheel: false }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisScrollProvider;
