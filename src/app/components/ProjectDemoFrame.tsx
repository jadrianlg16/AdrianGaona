"use client";

import { useEffect, useState } from "react";

/**
 * The embedded apps are the point of this site, but they are not free: the
 * chess bundle alone ships a ~7 MB Stockfish WASM binary. Auto-running that on
 * a phone over cellular is a bad trade — the visitor pays for a desktop-shaped
 * app they can barely interact with on a 375px screen.
 *
 * So: run it immediately where it's affordable, and offer it as a deliberate
 * tap where it isn't. Save-Data is honoured everywhere, on any screen size.
 */
type NetworkInformation = { saveData?: boolean; effectiveType?: string };

const shouldAutoRun = () => {
  if (window.matchMedia("(max-width: 767px)").matches) return false;

  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;

  if (connection?.saveData) return false;
  if (connection?.effectiveType && /^(slow-)?2g$/.test(connection.effectiveType))
    return false;

  return true;
};

export function ProjectDemoFrame({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  // Starts false so the server-rendered markup and the first client render
  // agree; the decision lands in an effect, before anything heavy is fetched.
  const [running, setRunning] = useState(false);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    setRunning(shouldAutoRun());
    setDecided(true);
  }, []);

  if (running) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="h-[70vh] max-h-[760px] min-h-[420px] w-full border-0"
      />
    );
  }

  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-5 px-6 py-14 text-center">
      <p className="max-w-sm text-sm text-muted">
        This is the real app, not a video. It&apos;s a sizeable download and
        built for a bigger screen, so it only starts when you ask it to.
      </p>
      <button
        type="button"
        onClick={() => setRunning(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-6 py-3 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-ink"
      >
        {decided ? "Run the app here" : "Loading…"}
        <span aria-hidden="true">↗</span>
      </button>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted underline-offset-4 hover:text-accent hover:underline"
      >
        Or open it full screen
      </a>
    </div>
  );
}
