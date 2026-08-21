"use client";

import { useEffect, useState } from "react";
import type { CaseDemoProps } from "./types";

type Job = {
  input: string;
  output: string;
  family: string;
  stages: [string, string, string];
};

const JOBS: Job[] = [
  {
    input: "thesis.pdf",
    output: "thesis.docx",
    family: "Documents",
    stages: ["parsing layout", "rebuilding in LibreOffice", "verifying page count"],
  },
  {
    input: "photo.png",
    output: "photo.webp",
    family: "Images",
    stages: ["decoding bitmap", "re-encoding with Pillow", "optimizing size"],
  },
  {
    input: "novel.epub",
    output: "novel.mobi",
    family: "Ebooks",
    stages: ["unpacking spine", "converting with Calibre", "packing metadata"],
  },
  {
    input: "interview.wav",
    output: "interview.mp3",
    family: "Audio",
    stages: ["reading PCM stream", "encoding with ffmpeg", "writing ID3 tags"],
  },
  {
    input: "results.csv",
    output: "results.xlsx",
    family: "Data",
    stages: ["sniffing delimiters", "typing columns", "writing workbook"],
  },
];

const FAMILIES = ["Documents", "Images", "Ebooks", "Audio", "Data"];

type Phase = "drop" | "convert" | "done";

const PHASE_MS: Record<Phase, number> = { drop: 900, convert: 2400, done: 1400 };

/** Scripted walkthrough of the File Converter UI: drop → convert → download. */
export function FileConverterDemo({ variant }: CaseDemoProps) {
  const [jobIndex, setJobIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("drop");
  const [stageIndex, setStageIndex] = useState(0);
  const job = JOBS[jobIndex];

  useEffect(() => {
    const next = setTimeout(() => {
      if (phase === "drop") setPhase("convert");
      else if (phase === "convert") setPhase("done");
      else {
        setJobIndex((i) => (i + 1) % JOBS.length);
        setPhase("drop");
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(next);
  }, [phase, jobIndex]);

  useEffect(() => {
    if (phase !== "convert") {
      setStageIndex(0);
      return;
    }
    const tick = setInterval(
      () => setStageIndex((s) => Math.min(s + 1, 2)),
      PHASE_MS.convert / 3
    );
    return () => clearInterval(tick);
  }, [phase]);

  const full = variant === "full";

  const jumpToFamily = (family: string) => {
    const index = JOBS.findIndex((j) => j.family === family);
    if (index === -1 || index === jobIndex) return;
    setJobIndex(index);
    setPhase("drop");
  };

  return (
    <div className={`flex h-full w-full flex-col justify-center ${full ? "mx-auto max-w-2xl gap-8 p-8" : "gap-4 p-6"}`}>
      {/* family pills */}
      <div className="flex flex-wrap gap-2">
        {FAMILIES.map((family) => (
          <button
            key={family}
            type="button"
            onClick={full ? () => jumpToFamily(family) : undefined}
            tabIndex={full ? 0 : -1}
            className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300
              ${family === job.family ? "border-accent/60 bg-accent/10 text-accent" : "border-line text-muted"}
              ${full ? "hover:border-bone/40 hover:text-bone" : ""}`}
          >
            {family}
          </button>
        ))}
      </div>

      {/* drop zone */}
      <div
        className={`relative rounded-xl border border-dashed transition-colors duration-500 ${
          phase === "convert" ? "border-accent/50" : "border-line"
        } ${full ? "p-10" : "p-6"}`}
      >
        <div className="flex items-center justify-center gap-4">
          {/* input chip */}
          <div
            className={`flex items-center gap-2 rounded-lg border border-line bg-ink px-3 py-2 transition-all duration-700 ${
              phase === "drop" ? "-translate-y-3 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <span className="h-2 w-2 rounded-sm bg-bone/40" />
            <span className="font-mono text-xs text-bone/80">{job.input}</span>
          </div>

          <span className={`text-muted transition-opacity duration-500 ${phase === "drop" ? "opacity-30" : "opacity-100"}`}>
            →
          </span>

          {/* output chip */}
          <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-500 ${
              phase === "done"
                ? "translate-y-0 border-accent/50 bg-accent/10 opacity-100"
                : "translate-y-2 border-line opacity-25"
            }`}
          >
            <span className={`font-mono text-xs ${phase === "done" ? "text-accent" : "text-muted"}`}>
              {phase === "done" ? "✓" : "·"}
            </span>
            <span className={`font-mono text-xs ${phase === "done" ? "text-bone" : "text-muted"}`}>
              {job.output}
            </span>
          </div>
        </div>

        {/* progress */}
        <div className="mt-5 h-px w-full overflow-hidden rounded bg-line">
          <div
            className="h-full bg-accent"
            style={{
              width: phase === "convert" || phase === "done" ? "100%" : "0%",
              transition: phase === "convert" ? `width ${PHASE_MS.convert}ms linear` : "none",
              opacity: phase === "done" ? 0.4 : 1,
            }}
          />
        </div>
        <p className="mt-3 h-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
          {phase === "drop" && "waiting for file…"}
          {phase === "convert" && job.stages[stageIndex]}
          {phase === "done" && "ready to download"}
        </p>
      </div>

      {full && (
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted/70">
          Scripted walkthrough — the real app converts across ~38 formats in Docker
        </p>
      )}
    </div>
  );
}
