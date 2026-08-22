"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 768px) and (min-height: 501px) and (prefers-reduced-motion: no-preference)",
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
        });
      return () => media.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} id="work" className="relative">
      <div className="px-6 pb-8 pt-24 md:px-12 md:pt-36">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          (03) — Selected work
        </p>
        {/* Was "Built to move numbers", under which there was not a single
            number — no users, hours, latency or cost on any of the nine. A
            heading should promise what the section can actually show, and what
            this one shows is working software you can open right here. */}
        <h2 className="font-display type-display-2 font-extrabold uppercase leading-none tracking-tight">
          Built to{" "}
          <span className="font-serif italic font-normal normal-case text-accent">
            actually
          </span>{" "}
          <span className="text-stroke">run</span>
        </h2>
        {/* Was "real apps running on this page", which is only true on a wide
            screen — the card previews are hidden below md, so on a phone the
            copy promised something the visitor could not see. Launching still
            runs the real app on every device, so that is what it claims now. */}
        <p className="mt-6 max-w-md font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Cards marked <span className="text-accent">live</span> run the real
          app — launch one and use it.
        </p>
      </div>

      {projects.map((project, i) => (
        <div
          key={project.slug}
          className="project-wrapper min-h-[100svh] md:h-[100svh]"
        >
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
    <article className="project-sticky relative flex min-h-[100svh] items-center px-4 py-4 md:sticky md:top-0 md:h-[100svh] md:px-10 md:py-0">
      <div
        className="project-card relative grid min-h-[calc(100svh-2rem)] w-full grid-rows-1 overflow-hidden rounded-2xl
          border border-line bg-ink-soft md:h-[88svh] md:min-h-0 md:grid-cols-2 md:grid-rows-1 md:will-change-transform"
      >
        {/* ambient glow keyed to the project palette */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(80% 60% at 75% 30%, ${project.palette[0]}33, transparent 70%)`,
          }}
        />

        {/* copy */}
        <div className="project-copy relative z-10 flex flex-col justify-between p-5 sm:p-7 md:p-12">
          <div className="flex items-baseline justify-between font-mono text-sm text-muted">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span>{project.year}</span>
          </div>

          <div>
            <h3 className="font-display type-display-3 font-bold uppercase leading-none tracking-tight">
              {project.title}
            </h3>
            <p className="mt-3 font-serif italic text-xl text-bone/80 md:text-2xl">
              {project.tagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-bone/70 sm:mt-6 sm:text-base sm:text-bone/60">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-8">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-5 sm:pt-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {project.role}
            </span>
            <span className="flex items-center gap-4">
            {/* Deep link: lets a single project be sent to a single person,
                and gives the route an internal link so it gets crawled. */}
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              Details →
            </Link>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
              >
                GitHub ↗
              </a>
            )}
            {demo ? (
              <button
                type="button"
                onClick={() => onLaunch(project)}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-ink sm:px-5 sm:text-sm"
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
        <div className="project-visual relative hidden overflow-hidden md:block">
          {demo ? (
            <DemoVisual project={project} onLaunch={onLaunch} />
          ) : project.images?.length ? (
            <ShotGallery
              shots={project.images}
              title={project.title}
              palette={project.palette}
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} — ${project.tagline}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <GeneratedVisual project={project} index={index} />
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Screenshot gallery for projects that need a real backend and so can't run as
 * a `live` demo. Auto-advances, pauses on hover/focus, and stays put entirely
 * when the visitor prefers reduced motion.
 */
function ShotGallery({
  shots,
  title,
  palette,
}: {
  shots: NonNullable<Project["images"]>;
  title: string;
  palette: Project["palette"];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || shots.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % shots.length),
      4200
    );
    return () => window.clearInterval(id);
    // `active` is a dep so a manual dot click restarts the dwell timer
  }, [paused, shots.length, active]);

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(160deg, ${palette[1]} 0%, #0c0c0a 75%)`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {shots.map((shot, i) => (
        <Image
          key={shot.src}
          src={shot.src}
          alt={`${title} — ${shot.caption}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          // the whole set is small; eager-loading avoids a pop-in on advance
          priority={i === 0}
          aria-hidden={i !== active}
          className={`object-contain px-4 py-14 transition-opacity duration-700 lg:px-6 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* badge */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-line bg-ink/80 px-3 py-1.5 backdrop-blur-sm">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Product screenshots
        </span>
      </div>

      {/* caption */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4">
        <p
          key={active}
          className="rounded-lg border border-line bg-ink/80 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-bone/70 backdrop-blur-sm"
        >
          {shots[active]!.caption}
        </p>
      </div>

      {/* dots */}
      {shots.length > 1 && (
        <div className="absolute right-4 top-4 flex gap-1.5">
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${shot.caption}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-accent" : "w-1.5 bg-bone/30 hover:bg-bone/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
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
