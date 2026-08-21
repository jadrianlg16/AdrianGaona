"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { contact } from "../lib/data";
import { Magnetic } from "./Magnetic";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // These are gsap.from() reveals over content that is already in place,
      // so simply not running them leaves the section at its final state.
      if (prefersReducedMotion()) return;

      gsap.from(".contact-heading .clip-line > span", {
        y: "110%",
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 80%" },
      });
      gsap.from(".contact-cta", {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: ".contact-cta", start: "top 88%" },
      });
    },
    { scope: rootRef }
  );


  return (
    <section ref={rootRef} id="contact" className="relative overflow-hidden pt-32 md:pt-44">

      <div className="flex flex-col items-center px-6 py-28 text-center md:py-40">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          (05) — Next chapter
        </p>

        <h2 className="contact-heading font-display type-display-2 font-extrabold uppercase leading-[0.95] tracking-tight">
          <span className="clip-line">
            <span>Let&apos;s build the</span>
          </span>
          <span className="clip-line">
            <span>
              thing that <span className="font-serif italic font-normal normal-case text-accent">moves</span>
            </span>
          </span>
          <span className="clip-line">
            <span>the needle</span>
          </span>
        </h2>

        <div className="contact-cta mt-14 flex flex-col items-center gap-4 sm:flex-row">
          <Magnetic>
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform duration-300 hover:scale-105"
            >
              {contact.email}
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href="/downloads/adrian-gaona-resume.pdf"
              download="Jesus-Adrian-Lopez-Gaona-Resume.pdf"
              className="group inline-flex items-center gap-3 rounded-full border border-bone/35 px-10 py-5 font-mono text-sm font-bold uppercase tracking-widest text-bone transition-colors duration-300 hover:border-accent hover:text-accent"
              aria-label="Download Jesús Adrián López Gaona's résumé as a PDF"
            >
              Download résumé
              <span className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </Magnetic>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-muted">
          Currently open to internships, freelance & ambitious ideas
        </p>
      </div>
    </section>
  );
}
