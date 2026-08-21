"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { manifesto } from "../lib/data";

/** The "why" — each word brightens as you scroll through it, like a read-along. */
export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  const words = manifesto.split(" ");

  useGSAP(
    () => {
      // The words ship readable and are dimmed here, at runtime, so the
      // read-along is an enhancement rather than a prerequisite. Shipping them
      // at opacity .15 meant the statement of who he is never appeared if GSAP
      // failed to load, and stayed at 1.5:1 for anyone who asked for less motion.
      if (prefersReducedMotion()) return;

      gsap.set(".manifesto-word", { opacity: 0.15 });
      gsap.to(".manifesto-word", {
        opacity: 1,
        ease: "none",
        stagger: 0.6,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="about" className="relative px-6 py-32 md:px-12 md:py-48">
      <h2 className="sr-only">About Adrián Gaona</h2>
      <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        (01) — The point
      </p>
      <p className="max-w-5xl font-display type-display-4 font-bold leading-[1.25] tracking-tight">
        {words.map((word, i) => (
          <span key={i} className="manifesto-word">
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
