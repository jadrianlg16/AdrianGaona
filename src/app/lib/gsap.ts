"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Every scroll animation on the site is decoration over content that is already
 * readable. Where that isn't true — a word shipped dimmed, an element shipped at
 * opacity 0 — the animation has become load-bearing, and the fix belongs in the
 * markup rather than here.
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
