"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { useApp } from "./AppProvider";
import { BlizzardCanvas } from "./BlizzardCanvas";

/**
 * Renders the real alpine hero beneath a short whiteout. The storm is a canvas
 * particle field with directional wind and a moving curl force, then the veil
 * clears as the normal hero snow and copy take over.
 */
export function Preloader() {
  const { sceneReady, setLoaded } = useApp();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const progressValue = useRef({ value: 0 });
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [forcedReady, setForcedReady] = useState(false);
  const [done, setDone] = useState(false);
  const ready = (sceneReady && minimumElapsed) || forcedReady;

  const syncProgress = () => {
    const value = Math.round(progressValue.current.value);
    if (!counterRef.current) return;
    counterRef.current.textContent = String(value).padStart(3, "0");
    counterRef.current.setAttribute("aria-valuenow", String(value));
  };

  useEffect(() => {
    const minimumTimer = window.setTimeout(() => setMinimumElapsed(true), 1_900);
    const fallbackTimer = window.setTimeout(() => setForcedReady(true), 6_000);
    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useGSAP(
    () => {
      gsap.set(progressRef.current, { scaleX: 0 });
      gsap.to(progressValue.current, {
        value: 88,
        duration: 2.2,
        ease: "power2.out",
        onUpdate: syncProgress,
      });
      gsap.to(progressRef.current, {
        scaleX: 0.88,
        duration: 2.2,
        ease: "power2.out",
      });
      gsap.from(".whiteout-intro__hud", {
        opacity: 0,
        y: 8,
        duration: 0.7,
        ease: "power3.out",
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
          duration: 0.46,
          ease: "power3.inOut",
          onUpdate: syncProgress,
        })
        .to(
          progressRef.current,
          { scaleX: 1, duration: 0.46, ease: "power3.inOut" },
          "<"
        )
        .to(
          ".whiteout-intro__hud",
          { opacity: 0, y: -6, duration: 0.28, ease: "power2.in" },
          "-=0.06"
        )
        .to(
          ".whiteout-intro__wash",
          { opacity: 0.98, duration: 0.4, ease: "power2.in" },
          "-=0.05"
        )
        .addLabel("clear")
        .set(rootRef.current, { pointerEvents: "none" }, "clear")
        .call(() => setLoaded(true), [], "clear+=0.12")
        .to(
          ".whiteout-intro__canvas, .whiteout-intro__sheet",
          {
            opacity: 0,
            duration: 1.6,
            stagger: 0.06,
            ease: "power2.inOut",
          },
          "clear"
        )
        .to(
          ".whiteout-intro__wash",
          { opacity: 0, duration: 1.85, ease: "power2.inOut" },
          "clear+=0.08"
        )
        .to(
          rootRef.current,
          { opacity: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        );
    },
    { scope: rootRef, dependencies: [ready] }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="whiteout-intro fixed inset-0 z-[100] overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Preparing the alpine portfolio"
    >
      <div className="whiteout-intro__wash absolute inset-0" />
      <BlizzardCanvas />
      <div className="whiteout-intro__sheet whiteout-intro__sheet--high absolute" />
      <div className="whiteout-intro__sheet whiteout-intro__sheet--low absolute" />

      <div className="whiteout-intro__hud relative z-20 flex h-full flex-col justify-between p-6 md:p-12">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone/75 md:text-xs">
          <span>AG / Alpine approach</span>
          <span>Whiteout crossing</span>
        </div>

        <div className="flex items-end justify-between gap-6 font-mono uppercase">
          <p className="text-[10px] tracking-[0.28em] text-bone/65 md:text-xs">
            Visibility / near zero
          </p>

          <div className="w-40 sm:w-56">
            <div className="mb-3 flex items-end justify-between">
              <span className="text-[9px] tracking-[0.24em] text-bone/55">
                Conditions
              </span>
              <span
                ref={counterRef}
                role="progressbar"
                aria-label="Loading portfolio"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={0}
                className="text-xl tabular-nums text-bone"
              >
                000
              </span>
            </div>
            <div className="h-px overflow-hidden bg-bone/25">
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
