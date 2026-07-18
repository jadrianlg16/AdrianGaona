"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { useApp } from "./AppProvider";
import { ParticleField } from "./ParticleField";

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

      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(".hero-line > span", {
        y: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
      }).to(
        ".hero-fade",
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
        "-=0.7"
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
      className="relative flex h-[100svh] flex-col justify-end overflow-hidden"
    >
      <ParticleField />
      {/* readability scrim over the particle field */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />

      <div className="hero-content relative z-10 px-6 pb-14 md:px-12 md:pb-20">
        <p className="hero-fade mb-6 max-w-md translate-y-4 font-mono text-xs uppercase tracking-[0.25em] text-muted opacity-0 md:text-sm">
          Adrián Gaona — Software & AI Systems
        </p>

        <h1 className="font-display text-[clamp(3.2rem,11vw,10.5rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
          <span className="clip-line hero-line">
            <span className="translate-y-full">Engineering</span>
          </span>
          <span className="clip-line hero-line">
            <span className="translate-y-full">
              <span className="font-serif normal-case tracking-normal text-accent">
                leverage
              </span>
              <span className="text-stroke">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md translate-y-4 text-balance text-base leading-relaxed text-bone/80 opacity-0 md:text-lg">
            Web platforms and AI systems that turn busywork into momentum —
            built with discipline, shipped with care.
          </p>
          <div className="hero-fade flex translate-y-4 items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted opacity-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for work — Nuevo León, MX
          </div>
        </div>
      </div>

      <div className="hero-fade absolute bottom-6 right-6 z-10 hidden translate-y-4 font-mono text-xs uppercase tracking-widest text-muted opacity-0 md:right-12 md:block">
        Scroll ↓
      </div>
    </section>
  );
}
