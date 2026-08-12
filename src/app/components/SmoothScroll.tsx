"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";

let lenisInstance: Lenis | null = null;

/** Grab the active Lenis instance (e.g. for programmatic scrollTo from the nav). */
export const getLenis = () => lenisInstance;

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    const useNativeScroll = window.matchMedia(
      "(pointer: coarse), (prefers-reduced-motion: reduce)"
    ).matches;
    if (useNativeScroll) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
