"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { useApp } from "./AppProvider";

/**
 * Alpine whiteout sequence. The first phase advances while the hero image and
 * WebGL renderer initialize; the final sweep only runs once the scene is ready.
 */
export function Preloader() {
  const { sceneReady, setLoaded } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressValue = useRef({ value: 0 });
  const [forcedReady, setForcedReady] = useState(false);
  const [done, setDone] = useState(false);
  const ready = sceneReady || forcedReady;

  const syncProgress = () => {
    const value = Math.round(progressValue.current.value);
    if (counterRef.current) {
      counterRef.current.textContent = String(value).padStart(3, "0");
      counterRef.current.setAttribute("aria-valuenow", String(value));
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(() => setForcedReady(true), 6_000);
    return () => window.clearTimeout(timeout);
  }, []);

  useGSAP(
    () => {
      gsap.set(progressRef.current, { scaleX: 0 });
      gsap.to(progressValue.current, {
        value: 82,
        duration: 1.9,
        ease: "power2.out",
        onUpdate: syncProgress,
      });
      gsap.to(progressRef.current, {
        scaleX: 0.82,
        duration: 1.9,
        ease: "power2.out",
      });
      gsap.fromTo(
        ".loader-contour",
        { strokeDashoffset: 380, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.42,
          duration: 2.2,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
      gsap.from(".loader-copy", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      if (!ready) return;
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        progressValue.current.value = 100;
        syncProgress();
        setLoaded(true);
        setDone(true);
        return;
      }

      gsap.killTweensOf(progressValue.current);
      gsap.killTweensOf(progressRef.current);

      const timeline = gsap.timeline({ onComplete: () => setDone(true) });
      timeline
        .to(progressValue.current, {
          value: 100,
          duration: 0.55,
          ease: "power3.inOut",
          onUpdate: syncProgress,
        })
        .to(
          progressRef.current,
          { scaleX: 1, duration: 0.55, ease: "power3.inOut" },
          "<"
        )
        .to(".loader-status", {
          opacity: 0,
          y: -8,
          duration: 0.3,
          ease: "power2.in",
        })
        .to(".loader-whiteout", {
          xPercent: 225,
          duration: 0.85,
          ease: "power4.inOut",
          onStart: () => setLoaded(true),
        })
        .to(
          rootRef.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.9,
            ease: "power4.inOut",
          },
          "-=0.45"
        );
    },
    { scope: rootRef, dependencies: [ready] }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="alpine-loader fixed inset-0 z-[100] overflow-hidden bg-ink"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="alpine-loader__sky absolute inset-0" />

      <svg
        className="absolute inset-x-0 bottom-0 h-[72%] w-full"
        viewBox="0 0 1200 620"
        preserveAspectRatio="none"
        aria-hidden
      >
        {[
          "M-40 596 C150 432 250 508 390 350 C520 202 665 438 790 226 C912 20 1055 246 1240 96",
          "M-50 620 C155 458 275 540 414 376 C546 222 682 466 810 248 C930 46 1080 260 1250 126",
          "M-70 640 C170 486 294 570 442 404 C570 260 710 494 836 286 C958 82 1102 286 1270 156",
          "M-90 656 C190 520 322 602 468 438 C602 300 742 526 864 326 C988 126 1136 318 1290 194",
          "M-110 676 C214 552 350 632 498 470 C632 342 770 558 894 366 C1018 168 1160 346 1310 232",
        ].map((path, index) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke={index === 0 ? "#4fd1b5" : "#e9e7e2"}
            strokeWidth={index === 0 ? 1.5 : 1}
            strokeDasharray="380"
            className="loader-contour"
          />
        ))}
      </svg>

      <div className="loader-whiteout absolute inset-y-0 -left-[85%] w-[90%]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
        <div className="loader-copy flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone/65 md:text-xs">
          <span>AG / Alpine system 01</span>
          <span className="loader-status">Preparing weather</span>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div className="loader-copy">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-accent md:text-xs">
              Field conditions / loading
            </p>
            <p className="font-display text-[clamp(2.8rem,8vw,8rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.07em]">
              Into the
              <span className="block font-serif font-normal normal-case tracking-normal text-accent">
                unknown.
              </span>
            </p>
          </div>

          <div className="loader-copy w-full md:w-60">
            <div className="mb-3 flex items-end justify-between font-mono uppercase">
              <span className="text-[10px] tracking-[0.24em] text-bone/50">
                Snowpack
              </span>
              <span
                ref={counterRef}
                role="progressbar"
                aria-label="Loading portfolio"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={0}
                className="text-2xl tabular-nums text-bone"
              >
                000
              </span>
            </div>
            <div className="h-px overflow-hidden bg-bone/20">
              <span
                ref={progressRef}
                className="block h-full origin-left bg-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
