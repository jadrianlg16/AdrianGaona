"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap, useGSAP } from "../lib/gsap";
import { getLenis } from "./SmoothScroll";
import type { Project } from "../lib/data";
import { demoSandbox } from "../lib/sandbox";
import { caseDemos } from "./demos";

/**
 * Full-screen "app window" a project launches into: chrome bar with status,
 * open-in-new-tab for live demos, Esc/backdrop/✕ to close. Live demos load
 * the real embedded app; case demos render their interactive walkthrough.
 *
 * It behaves as a modal dialog: focus moves to the close button on open, Tab
 * cycles inside the window (sentinels at either end catch focus leaving the
 * iframe), and focus returns to the launching button on close. Esc pressed
 * inside an embedded app stays with the app, which may use it for its own
 * dialogs, so the close button is the way out from there.
 */
export function DemoOverlay({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const demo = project.demo!;

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(windowRef.current, {
      scale: 0.96,
      y: 24,
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
    }).to(backdropRef.current, { opacity: 0, duration: 0.22 }, "<0.05");
  }, [onClose]);

  // scroll lock + Esc
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [close]);

  // Focus in on open, back to the launching control on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });
    return () => opener?.focus({ preventScroll: true });
  }, []);

  /** Wraps Tab around the window: `edge` is the sentinel that took focus. */
  const wrapFocus = (edge: "start" | "end") => {
    const focusable = [
      ...(windowRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ?? []),
    ].filter((el) => el.getClientRects().length > 0); // skip what is hidden at this width
    if (!focusable.length) return;
    (edge === "start" ? focusable[focusable.length - 1] : focusable[0]).focus();
  };

  useGSAP(
    () => {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        windowRef.current,
        { scale: 0.94, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: "power3.out", delay: 0.05 }
      );
    },
    { scope: rootRef }
  );

  // Both embedded kinds load a real build in the frame; only "live" has
  // anything running behind it, so the chrome bar labels them apart.
  const embedded = demo.kind === "live" || demo.kind === "guided";
  const chromeLabel =
    demo.kind === "live"
      ? "live · running in your browser"
      : demo.kind === "guided"
        ? "guided demo · real interface, sample data"
        : "interactive walkthrough";
  const CaseDemo = demo.kind === "case" ? caseDemos[demo.id] : null;

  return createPortal(
    <div
      ref={rootRef}
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal
      aria-label={`${project.title} demo`}
    >
      <div
        ref={backdropRef}
        onClick={close}
        className="absolute inset-0 bg-ink/85 backdrop-blur-sm"
      />

      <span tabIndex={0} onFocus={() => wrapFocus("start")} className="sr-only" />
      <div
        ref={windowRef}
        className="absolute inset-2 flex flex-col overflow-hidden rounded-xl border border-line bg-ink-soft shadow-2xl md:inset-6 lg:inset-x-14 lg:inset-y-8"
      >
        {/* chrome bar */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          </div>

          <div className="min-w-0 flex-1 text-center">
            <span className="truncate font-mono text-xs uppercase tracking-widest text-muted">
              {project.title}
              <span className="hidden text-muted/50 sm:inline">
                {" — "}
                {chromeLabel}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {embedded && (
              <a
                href={demo.src}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:border-accent/50 hover:text-accent sm:inline-block"
              >
                Open full ↗
              </a>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close demo"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent sm:h-9 sm:w-9"
            >
              ✕
            </button>
          </div>
        </div>

        {/* content */}
        <div className="relative flex-1 overflow-hidden">
          {embedded ? (
            <iframe
              src={demo.src}
              title={`${project.title} — ${demo.kind === "live" ? "live demo" : "guided demo"}`}
              sandbox={demoSandbox(demo)}
              className="h-full w-full border-0 bg-ink"
            />
          ) : (
            CaseDemo && (
              <div className="h-full overflow-y-auto">
                <CaseDemo variant="full" />
              </div>
            )
          )}
        </div>
      </div>
      <span tabIndex={0} onFocus={() => wrapFocus("end")} className="sr-only" />
    </div>,
    document.body
  );
}
