"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { useApp } from "./AppProvider";

/**
 * Opening sequence: counter climbs to 100 while the name reveals,
 * then the curtain wipes up and hands off to the hero intro.
 */
export function Preloader() {
  const { setLoaded } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setLoaded(true);
        setDone(true);
        return;
      }

      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.to(".pre-line > span", {
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.2,
      })
        .to(
          counter,
          {
            value: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
              }
            },
          },
          "<"
        )
        .to(".pre-line > span", {
          y: "-110%",
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.in",
        })
        .to(
          rootRef.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1,
            ease: "power4.inOut",
            onStart: () => setLoaded(true),
          },
          "-=0.25"
        );
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-end justify-between bg-ink p-6 md:p-12"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="font-display text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-[1.05] tracking-tight">
        <span className="clip-line pre-line">
          <span className="translate-y-full">Adrián</span>
        </span>
        <span className="clip-line pre-line">
          <span className="translate-y-full">Gaona<span className="text-accent">.</span></span>
        </span>
      </div>
      <span
        ref={counterRef}
        className="font-mono text-sm text-muted tabular-nums md:text-base"
      >
        000
      </span>
    </div>
  );
}
