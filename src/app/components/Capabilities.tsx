"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { capabilities } from "../lib/data";

export function Capabilities() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".capability-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".cap-reveal"), {
          y: 48,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
        gsap.from(row, {
          "--line-scale": 0,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: row, start: "top 85%" },
        } as gsap.TweenVars);
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="px-6 py-24 md:px-12 md:py-36">
      <h2 className="sr-only">Software engineering capabilities</h2>
      <p className="mb-16 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        (02) — What I do
      </p>

      <div>
        {capabilities.map((cap) => (
          <div
            key={cap.index}
            style={{ "--line-scale": 1 } as React.CSSProperties}
            className="capability-row group relative grid gap-6 py-12 md:grid-cols-12 md:gap-8 md:py-16
              before:absolute before:left-0 before:top-0 before:h-px before:w-full before:origin-left
              before:scale-x-[var(--line-scale)] before:bg-line"
          >
            <span className="cap-reveal font-mono text-sm text-accent md:col-span-1">
              {cap.index}
            </span>
            <h3 className="cap-reveal font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-none tracking-tight transition-colors duration-300 group-hover:text-accent md:col-span-5">
              {cap.title}
            </h3>
            <p className="cap-reveal max-w-md leading-relaxed text-bone/70 md:col-span-4">
              {cap.description}
            </p>
            <ul className="cap-reveal flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-muted md:col-span-2">
              {cap.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
