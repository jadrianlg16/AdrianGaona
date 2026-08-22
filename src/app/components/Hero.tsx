"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { useApp } from "./AppProvider";

const AlpineScene = dynamic(
  () => import("./AlpineScene").then((module) => module.AlpineScene),
  { ssr: false }
);

export function Hero() {
  const { loaded } = useApp();
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!loaded) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(".hero-line > span, .hero-fade", { y: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.55 });
      tl.to(".hero-line > span", {
        y: 0,
        duration: 1.7,
        stagger: 0.16,
        ease: "power3.out",
      }).to(
        ".hero-fade",
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.14, ease: "power2.out" },
        "-=1"
      );

      // headline drifts up and fades as the story scrolls on
      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: rootRef, dependencies: [loaded] }
  );

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <AlpineScene />
      {/* readability scrim over the alpine storm */}
      <div className="hero-scrim pointer-events-none absolute inset-0" />

      <div className="hero-content hero-copy-shadow relative z-10 px-5 pb-10 pt-28 sm:px-6 sm:pb-14 md:px-12 md:pb-20">
        <p className="hero-fade mb-5 max-w-md translate-y-4 font-mono text-xs uppercase tracking-[0.22em] text-bone/85 opacity-0 md:mb-6 md:text-sm md:tracking-[0.25em]">
          Adrián Gaona — Field Notes
        </p>

        <h1 className="hero-title font-display font-extrabold uppercase leading-[0.92] tracking-tight">
          <span className="clip-line hero-line">
            <span className="translate-y-full">Engineering</span>
          </span>
          <span className="clip-line hero-line">
            <span className="translate-y-full">
              <span className="font-serif italic font-normal normal-case tracking-normal text-accent">
                leverage
              </span>
              <span className="text-stroke">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-7 flex flex-col gap-5 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-6">
          <p className="hero-fade max-w-md translate-y-4 text-balance text-base leading-relaxed text-bone opacity-0 md:text-lg">
            Web platforms and AI systems that turn busywork into momentum.
          </p>
          {/* The only statement of level used to be the last line before the
              footer, while this badge said "Available for work" — so a reader
              spent the whole page assuming a working professional and had that
              corrected at the very bottom. Saying it in the first seconds costs
              nothing and stops the profile collapsing on arrival. */}
          <div className="hero-fade flex translate-y-4 items-start gap-3 font-mono text-xs uppercase tracking-widest text-bone opacity-0">
            <span className="relative mt-1 flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="md:text-right">
              Open to internships &amp; freelance
              <span className="mt-1 block tracking-[0.18em] text-bone/60">
                Final-year B.Eng. · Dec 2026 · Nuevo León, MX
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-6 right-6 z-10 hidden translate-y-4 font-mono text-xs uppercase tracking-widest text-muted opacity-0 md:right-12 md:block">
        Onward ↓
      </div>
    </section>
  );
}
