"use client";

import { useEffect, useMemo, useState } from "react";
import type { CaseDemoProps } from "./types";

const SEGMENTS = [
  {
    voice: "NARRATOR",
    text: "The lighthouse keeper counted ships the way other people counted sheep.",
  },
  { voice: "ELENA", text: "“You can’t stay up here forever,” Elena said." },
  { voice: "MARCUS", text: "“Watch me,” Marcus answered, and lit the lamp." },
] as const;

const VOICES = ["NARRATOR", "ELENA", "MARCUS"] as const;
const WORD_MS = 300;
const BAR_COUNT = 36;

/** Scripted walkthrough of Audiobook Studio: multi-voice read-along + waveform. */
export function AudiobookDemo({ variant }: CaseDemoProps) {
  const full = variant === "full";
  const [playing, setPlaying] = useState(true);
  const [cursor, setCursor] = useState(0);

  const words = useMemo(
    () =>
      SEGMENTS.flatMap((segment, segmentIndex) =>
        segment.text.split(" ").map((word) => ({ word, segmentIndex }))
      ),
    []
  );

  useEffect(() => {
    if (!playing) return;
    const tick = setInterval(
      () => setCursor((c) => (c + 1) % (words.length + 4)), // +4 = beat of silence
      WORD_MS
    );
    return () => clearInterval(tick);
  }, [playing, words.length]);

  const activeSegment = cursor < words.length ? words[cursor].segmentIndex : -1;
  const seconds = Math.floor((cursor * WORD_MS) / 1000);
  const timestamp = `00:${String(seconds).padStart(2, "0")}`;

  const barHeights = useMemo(
    () => Array.from({ length: BAR_COUNT }, (_, i) => 20 + ((i * 37) % 60)),
    []
  );

  return (
    <div className={`flex h-full w-full flex-col justify-center ${full ? "mx-auto max-w-2xl gap-7 p-8" : "gap-4 p-6"}`}>
      <style>{`@keyframes demo-eq { 0%,100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }`}</style>

      {/* voice chips */}
      <div className="flex flex-wrap gap-2">
        {VOICES.map((voice, i) => (
          <span
            key={voice}
            className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 ${
              activeSegment === i
                ? "border-accent/60 bg-accent/10 text-accent"
                : "border-line text-muted"
            }`}
          >
            ● {voice}
          </span>
        ))}
        <span className="ml-auto self-center font-mono text-[10px] uppercase tracking-widest text-muted">
          ch. 03 / 12
        </span>
      </div>

      {/* read-along text */}
      <p className={`font-serif leading-relaxed ${full ? "text-2xl" : "text-lg"}`}>
        {words.map(({ word }, i) => (
          <span
            key={i}
            className={`transition-colors duration-200 ${
              i === cursor
                ? "text-accent"
                : i < cursor
                  ? "text-bone/90"
                  : "text-bone/30"
            }`}
          >
            {word}{" "}
          </span>
        ))}
      </p>

      {/* waveform + transport */}
      <div className="flex items-center gap-4">
        {full && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-accent/10 text-accent transition-colors hover:bg-accent hover:text-ink"
          >
            {playing ? "❚❚" : "▶"}
          </button>
        )}
        <div className="flex h-10 flex-1 items-center gap-[3px]">
          {barHeights.map((h, i) => (
            <span
              key={i}
              className="w-full flex-1 rounded-full bg-accent/70"
              style={{
                height: `${h}%`,
                transformOrigin: "center",
                animation: playing ? `demo-eq ${0.6 + (i % 5) * 0.13}s ease-in-out ${i * 0.05}s infinite` : "none",
                opacity: playing ? 0.9 : 0.3,
              }}
            />
          ))}
        </div>
        <span className="shrink-0 font-mono text-[10px] text-muted">{timestamp}</span>
      </div>

      {full && (
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted/70">
          UI walkthrough — the real studio renders narration with Kokoro TTS
        </p>
      )}
    </div>
  );
}
