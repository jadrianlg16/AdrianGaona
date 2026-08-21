"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseDemoProps } from "./types";

type Video = { title: string; format: string; size: string; duration: string };

const VIDEOS: Video[] = [
  { title: "Lo-fi beats to focus to", format: "MP3 · audio", size: "48 MB", duration: "1:02:11" },
  { title: "How jet engines work", format: "MP4 · 1080p", size: "212 MB", duration: "14:36" },
  { title: "Marathon training, explained", format: "MP4 · 720p", size: "96 MB", duration: "21:04" },
  { title: "The physics of orbital gravity", format: "MP4 · 1080p", size: "154 MB", duration: "9:48" },
];

const DEMO_URL = "youtube.com/watch?v=dQw4…";

type QueueItem = { video: Video; progress: number; done: boolean; key: number };

/** Scripted walkthrough of GravityDL: paste → queue → live progress → library. */
export function GravityDLDemo({ variant }: CaseDemoProps) {
  const [typed, setTyped] = useState(0);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const nextVideo = useRef(0);
  const nextKey = useRef(0);
  const full = variant === "full";

  const enqueue = useCallback(() => {
    const video = VIDEOS[nextVideo.current % VIDEOS.length];
    nextVideo.current += 1;
    const key = nextKey.current++;
    setTyped(0);
    setQueue((q) => [...q.slice(-3), { video, progress: 0, done: false, key }]);
  }, []);

  // typewriter on the URL bar, then auto-enqueue
  useEffect(() => {
    if (typed < DEMO_URL.length) {
      const t = setTimeout(() => setTyped((n) => n + 1), 40);
      return () => clearTimeout(t);
    }
    const t = setTimeout(enqueue, 700);
    return () => clearTimeout(t);
  }, [typed, enqueue]);

  // advance download progress
  useEffect(() => {
    const tick = setInterval(() => {
      setQueue((q) =>
        q.map((item) => {
          if (item.done) return item;
          const progress = Math.min(item.progress + 2 + Math.random() * 5, 100);
          return { ...item, progress, done: progress >= 100 };
        })
      );
    }, 120);
    return () => clearInterval(tick);
  }, []);

  const active = queue.filter((item) => !item.done);
  const library = queue.filter((item) => item.done);

  return (
    <div className={`flex h-full w-full flex-col justify-center ${full ? "mx-auto max-w-2xl gap-6 p-8" : "gap-3 p-6"}`}>
      {/* URL bar */}
      <div className="flex items-center gap-2">
        <div className="flex h-9 flex-1 items-center overflow-hidden rounded-lg border border-line bg-ink px-3">
          <span className="truncate font-mono text-xs text-bone/70">
            {DEMO_URL.slice(0, typed)}
            <span className="animate-pulse text-accent">▍</span>
          </span>
        </div>
        <button
          type="button"
          onClick={full ? enqueue : undefined}
          tabIndex={full ? 0 : -1}
          className={`h-9 rounded-lg border border-accent/50 bg-accent/10 px-3 font-mono text-[10px] uppercase tracking-widest text-accent transition-colors ${
            full ? "hover:bg-accent hover:text-ink" : ""
          }`}
        >
          Download
        </button>
      </div>

      {/* queue */}
      <div className="space-y-2">
        {active.length === 0 && (
          <p className="px-1 font-mono text-[10px] uppercase tracking-widest text-muted/60">
            queue idle — waiting for link
          </p>
        )}
        {active.map((item) => (
          <div key={item.key} className="rounded-lg border border-line bg-ink p-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="truncate text-xs text-bone/85">{item.video.title}</span>
              <span className="shrink-0 font-mono text-[10px] text-muted">{item.video.format}</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded bg-line">
                <div
                  className="h-full rounded bg-accent transition-[width] duration-150 ease-linear"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <span className="w-9 text-right font-mono text-[10px] text-accent">
                {Math.floor(item.progress)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* library */}
      <div>
        <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-muted">
          Library · offline
        </p>
        <div className="space-y-1.5">
          {library.length === 0 && (
            <p className="px-1 font-mono text-[10px] text-muted/50">empty — downloads land here</p>
          )}
          {library.slice(-3).map((item) => (
            <div
              key={item.key}
              className="flex items-baseline justify-between gap-3 rounded-lg border border-line/60 px-3 py-2"
            >
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="shrink-0 font-mono text-[10px] text-accent">✓</span>
                <span className="truncate text-xs text-bone/70">{item.video.title}</span>
              </span>
              <span className="shrink-0 font-mono text-[10px] text-muted">
                {item.video.size} · {item.video.duration}
              </span>
            </div>
          ))}
        </div>
      </div>

      {full && (
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted/70">
          Scripted walkthrough — the real app streams progress over SSE from yt-dlp
        </p>
      )}
    </div>
  );
}
