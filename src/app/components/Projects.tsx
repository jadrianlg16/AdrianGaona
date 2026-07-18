"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { projects, type Project } from "../lib/data";
import { LivePreview } from "./LivePreview";
import { DemoOverlay } from "./DemoOverlay";
import { caseDemos } from "./demos";

/**
 * Stacked-deck showcase: each project is a full-viewport sticky card.
 * As the next card scrolls over, the current one scales back and dims —
 * a physical "flipping through the portfolio" feel.
 *
 * Cards with a `demo` are alive: the visual half runs the real embedded app
 * (or a scripted walkthrough) in miniature, and Launch opens it full-screen
 * in the DemoOverlay app window.
 */
export function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  useGSAP(
    () => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".project-wrapper");
      wrappers.forEach((wrapper, i) => {
        const next = wrappers[i + 1];
        if (!next) return;
        const card = wrapper.querySelector(".project-card");
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="work" className="relative">
      <div className="px-6 pb-8 pt-24 md:px-12 md:pt-36">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          (03) — Selected work
        </p>
        <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold uppercase leading-none tracking-tight">
          Built to <span className="font-serif normal-case text-accent">move</span>{" "}
          <span className="text-stroke">numbers</span>
        </h2>
        <p className="mt-6 max-w-md font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Cards marked <span className="text-accent">live</span> are real apps
          running on this page — launch one and use it.
        </p>
      </div>

      {projects.map((project, i) => (
        <div key={project.slug} className="project-wrapper h-[100svh]">
          <ProjectCard project={project} index={i} onLaunch={setOpenProject} />
        </div>
      ))}

      {openProject && (
        <DemoOverlay project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onLaunch,
}: {
  project: Project;
  index: number;
  onLaunch: (project: Project) => void;
}) {
  const demo = project.demo;

  return (
    <article className="sticky top-0 flex h-[100svh] items-center px-4 md:px-10">
      <div
        className="project-card relative grid h-[88svh] w-full grid-rows-[auto_1fr] overflow-hidden rounded-2xl
          border border-line bg-ink-soft will-change-transform md:grid-cols-2 md:grid-rows-1"
      >
        {/* ambient glow keyed to the project palette */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(80% 60% at 75% 30%, ${project.palette[0]}33, transparent 70%)`,
          }}
        />

        {/* copy */}
        <div className="relative z-10 flex flex-col justify-between p-7 md:p-12">
          <div className="flex items-baseline justify-between font-mono text-sm text-muted">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span>{project.year}</span>
          </div>

          <div>
            <h3 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold uppercase leading-none tracking-tight">
              {project.title}
            </h3>
            <p className="mt-3 font-serif text-xl text-bone/80 md:text-2xl">
              {project.tagline}
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-bone/60">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {project.role}
            </span>
            <span className="flex items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                GitHub ↗
              </a>
            )}
            {demo ? (
              <button
                type="button"
                onClick={() => onLaunch(project)}
                data-cursor="hover"
                className="group inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-5 py-2.5 font-mono text-sm uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-ink"
              >
                {demo.kind === "live" ? "Launch app" : "Play demo"}
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </button>
            ) : (
              project.link && (
                <a
                  href={project.link}
                  className="group inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-bone transition-colors hover:text-accent"
                >
                  View case
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              )
            )}
            </span>
          </div>
        </div>

        {/* visual: live mini-app, walkthrough, image, or generated gradient */}
        <div className="relative hidden overflow-hidden md:block">
          {demo ? (
            <DemoVisual project={project} onLaunch={onLaunch} />
          ) : project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={`${project.title} — ${project.tagline}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <GeneratedVisual project={project} index={index} />
          )}
        </div>
      </div>
    </article>
  );
}

/** The living half of a demo card: miniature app + status badge + launch hit-area. */
function DemoVisual({
  project,
  onLaunch,
}: {
  project: Project;
  onLaunch: (project: Project) => void;
}) {
  const demo = project.demo!;
  const CasePreview = demo.kind === "case" ? caseDemos[demo.id] : null;

  return (
    <div className="group absolute inset-0">
      {demo.kind === "live" ? (
        <LivePreview
          src={demo.src}
          width={demo.width}
          height={demo.height}
          title={project.title}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${project.palette[1]} 0%, #0c0c0a 70%)`,
          }}
        >
          {CasePreview && <CasePreview variant="preview" />}
        </div>
      )}

      {/* status badge */}
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
        {demo.kind === "live" ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Live — real app
            </span>
          </>
        ) : (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Interactive walkthrough
          </span>
        )}
      </div>

      {/* launch hit-area */}
      <button
        type="button"
        onClick={() => onLaunch(project)}
        data-cursor="hover"
        aria-label={`Launch ${project.title} demo`}
        className="absolute inset-0 flex items-end justify-end bg-transparent p-5 transition-colors duration-300 hover:bg-ink/20"
      >
        <span className="translate-y-2 rounded-full border border-accent/60 bg-ink/85 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-accent opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {demo.kind === "live" ? "Click to use it ↗" : "Play walkthrough ↗"}
        </span>
      </button>
    </div>
  );
}

/** Placeholder art until real screenshots are added in lib/data.ts. */
function GeneratedVisual({ project, index }: { project: Project; index: number }) {
  const [a, b] = project.palette;
  return (
    <div
      className="relative h-full w-full"
      style={{
        background: `linear-gradient(160deg, ${b} 0%, #0c0c0a 60%)`,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-3xl"
        style={{
          background: `radial-gradient(40% 40% at 60% 40%, ${a}55, transparent 70%),
            radial-gradient(35% 35% at 30% 70%, ${a}2e, transparent 70%)`,
        }}
      />
      {/* oversized index as graphic element */}
      <span
        className="absolute -right-6 bottom-0 select-none font-display text-[16rem] font-extrabold leading-none opacity-15"
        style={{ color: a }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="absolute inset-6 rounded-xl border border-white/10" />
    </div>
  );
}
