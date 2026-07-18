"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { manifesto } from "../lib/data";

/** The "why" — each word brightens as you scroll through it, like a read-along. */
export function Manifesto() {
  const rootRef = useRef<HTMLElement>(null);
  const words = manifesto.split(" ");

  useGSAP(
    () => {
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
      <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        (01) — The point
      </p>
      <p className="max-w-5xl font-display text-[clamp(1.6rem,4vw,3.4rem)] font-bold leading-[1.25] tracking-tight">
        {words.map((word, i) => (
          <span key={i} className="manifesto-word opacity-15">
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
