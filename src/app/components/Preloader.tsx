"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { useApp } from "./AppProvider";
import { BlizzardCanvas } from "./BlizzardCanvas";

/**
 * Once the whiteout has played, it stays played for the rest of the tab's
 * session. The people most likely to reload are the ones furthest along —
 * someone coming back for a second look, or a live demo — and making them
 * wait out the 1.9s crossing again is a toll on exactly the wrong visitor.
 * Session-scoped, so a genuinely new visit still gets the full entrance.
 */
const SEEN_KEY = "ag:whiteout-crossed";

const hasCrossedBefore = () => {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    // Private mode / storage disabled — fall through to the full intro.
    return false;
  }
};

const rememberCrossing = () => {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* nothing to do; the intro simply plays again next time. */
  }
};

// Runs before paint on the client, so a returning visitor never sees a frame
// of the whiteout. Falls back to useEffect during SSR, where it is a no-op.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

  /** Explicit opt-out. A jump cut is what someone pressing "skip" is asking for. */
  const skip = () => {
    rememberCrossing();
    setLoaded(true);
    setDone(true);
  };

  const syncProgress = () => {
    const value = Math.round(progressValue.current.value);
    if (!counterRef.current) return;
    counterRef.current.textContent = String(value).padStart(3, "0");
    counterRef.current.setAttribute("aria-valuenow", String(value));
  };

  useIsomorphicLayoutEffect(() => {
    if (hasCrossedBefore()) {
      setLoaded(true);
      setDone(true);
      return;
    }

    // The scene almost never wins its race — three.js is dynamically imported,
    // so `sceneReady` lands late and the old 6s fallback became the normal path,
    // not the exception. Measured cold: the whiteout cleared at ~6.4s against a
    // 191ms DOMContentLoaded. These caps put the worst case at 2.6s, and the
    // skip control below makes even that opt-out.
    const minimumTimer = window.setTimeout(() => setMinimumElapsed(true), 1_200);
    const fallbackTimer = window.setTimeout(() => setForcedReady(true), 2_600);
    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [setLoaded]);

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
      // Checked before the ready gate, not after. Someone who asked for less
      // motion was previously still held for the full 1.9–6s wait and only
      // spared the fade — they were charged for the animation they opted out of.
      if (prefersReducedMotion()) {
        progressValue.current.value = 100;
        syncProgress();
        rememberCrossing();
        setLoaded(true);
        setDone(true);
        return;
      }

      if (!ready) return;

      gsap.killTweensOf(progressValue.current);
      gsap.killTweensOf(progressRef.current);

      const timeline = gsap.timeline({
        onComplete: () => {
          rememberCrossing();
          setDone(true);
        },
      });
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
        {/* The HUD sits on a near-white whiteout, so it is set in ink rather
            than bone. Bone at 55–75% on that field measured around 1.3:1 —
            the first thing a visitor saw was text they may not have been able
            to read, and a mint progress bar at roughly 1.03:1. */}
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/70 md:text-xs">
          <span>AG / Alpine approach</span>
          <span className="flex items-center gap-5">
            <span className="hidden sm:inline">Whiteout crossing</span>
            <button
              type="button"
              onClick={skip}
              className="pointer-events-auto -m-2 inline-flex min-h-11 items-center p-2 tracking-[0.28em] text-ink underline-offset-4 transition-opacity hover:underline focus-visible:underline focus-visible:outline-none"
            >
              Skip ↴
            </button>
          </span>
        </div>

        <div className="flex items-end justify-between gap-6 font-mono uppercase">
          <p className="text-[10px] tracking-[0.28em] text-ink/70 md:text-xs">
            Visibility / near zero
          </p>

          <div className="w-40 sm:w-56">
            <div className="mb-3 flex items-end justify-between">
              <span className="text-[9px] tracking-[0.24em] text-ink/60">
                Conditions
              </span>
              <span
                ref={counterRef}
                role="progressbar"
                aria-label="Loading portfolio"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={0}
                className="text-xl tabular-nums text-ink"
              >
                000
              </span>
            </div>
            <div className="h-px overflow-hidden bg-ink/20">
              <span
                ref={progressRef}
                className="block h-full origin-left bg-ink"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
