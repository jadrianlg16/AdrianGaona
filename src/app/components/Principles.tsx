"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { principles } from "../lib/data";

/** The operating system: how the work gets done. */
export function Principles() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".principles-heading .clip-line > span", {
        y: "110%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".principles-heading", start: "top 80%" },
      });

      gsap.utils.toArray<HTMLElement>(".principle-row").forEach((row) => {
        gsap.from(row, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="principles"
      className="bg-ink-soft px-6 py-32 md:px-12 md:py-44"
    >
      <p className="mb-10 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        (04) — How I work
      </p>

      <h2 className="principles-heading mb-20 font-display text-[clamp(2.5rem,7vw,6rem)] font-extrabold uppercase leading-[0.95] tracking-tight md:mb-28">
        <span className="clip-line">
          <span>Extraordinary</span>
        </span>
        <span className="clip-line">
          <span>
            is a <span className="font-serif normal-case text-accent">habit</span>
          </span>
        </span>
      </h2>

      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {principles.map((p) => (
          <div key={p.index} className="principle-row border-t border-line pt-8">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-sm text-accent">{p.index}</span>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
                {p.title}
              </h3>
            </div>
            <p className="mt-4 max-w-lg leading-relaxed text-bone/65 md:pl-12">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
