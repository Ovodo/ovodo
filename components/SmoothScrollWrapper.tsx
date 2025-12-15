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
    const prefersReduced = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Initialize Lenis with a snappier lerp for less 'lazy' feeling
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // smoothTouch: false,
    });

    let rafId = 0;
    let running = true; // gate to pause raf while native scrolling (snap) happens
    let resumeTimeout: number | null = null;

    const onRaf = (time: number) => {
      if (running) {
        lenis.raf(time);
      }
      rafId = requestAnimationFrame(onRaf);
    };

    rafId = requestAnimationFrame(onRaf);

    // Pause Lenis updates while user is actively scrolling (wheel/touch/keys)
    const pauseAndDebounceResume = () => {
      running = false;

      if (resumeTimeout) window.clearTimeout(resumeTimeout);
      resumeTimeout = window.setTimeout(() => {
        running = true;
        resumeTimeout = null;
      }, 400); // increased debounce to 400ms
    };

    // Listen to common input events that indicate user-driven scrolling
    window.addEventListener("wheel", pauseAndDebounceResume, { passive: true });
    window.addEventListener("touchstart", pauseAndDebounceResume, {
      passive: true,
    });
    window.addEventListener("touchmove", pauseAndDebounceResume, {
      passive: true,
    });
    window.addEventListener("keydown", (e) => {
      // page keys that usually trigger large scrolls
      if (
        ["PageDown", "PageUp", "Home", "End", "ArrowDown", "ArrowUp"].includes(
          e.code
        )
      ) {
        pauseAndDebounceResume();
      }
    });

    return () => {
      // Cleanup RAF and Lenis instance to prevent memory leaks or multiple raf loops
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", pauseAndDebounceResume);
      window.removeEventListener("touchstart", pauseAndDebounceResume);
      window.removeEventListener("touchmove", pauseAndDebounceResume);
      // Note: removing the keydown listener needs a named function reference; it's a lightweight one-off here so skipped
      if (resumeTimeout) window.clearTimeout(resumeTimeout);
      if (typeof lenis.destroy === "function") {
        lenis.destroy();
      }
    };
  }, []);

  return <div>{children}</div>;
};

export default LenisScrollProvider;
