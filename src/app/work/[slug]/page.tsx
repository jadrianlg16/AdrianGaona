import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "../../lib/data";
import { Footer } from "../../components/Footer";
import { ProjectDemoFrame } from "../../components/ProjectDemoFrame";

const siteUrl = "https://adriangaona.dev";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return { title: "Project not found" };
  }

  // The card description is written for a reader mid-scroll; as a meta
  // description it needs to stand alone, so lead with what the thing is.
  const description = `${project.tagline}. ${project.description}`.slice(0, 300);

  return {
    title: `${project.title} — ${project.tagline}`,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.tagline}`,
      description,
      url: `${siteUrl}/work/${project.slug}`,
      siteName: "Adrián Gaona",
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.tagline}`,
      description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((entry) => entry.slug === slug);
  const project = projects[index];

  if (!project) notFound();

  const previous = projects[index - 1];
  const next = projects[index + 1];
  const [glow] = project.palette;
  const demo = project.demo;
  /** Both of these load a real build in a frame; only one has a server. */
  const embedded = demo && (demo.kind === "live" || demo.kind === "guided") ? demo : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    alternativeHeadline: project.tagline,
    description: project.description,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    dateCreated: project.year,
    url: `${siteUrl}/work/${project.slug}`,
    author: {
      "@type": "Person",
      name: "Jesús Adrián López Gaona",
      url: siteUrl,
    },
    keywords: project.stack.join(", "),
    ...(project.github ? { codeRepository: project.github } : {}),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${siteUrl}/#work` },
      {
        "@type": "ListItem",
        position: 2,
        name: project.title,
        item: `${siteUrl}/work/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([schema, breadcrumbs]).replace(/</g, "\\u003c"),
        }}
      />

      <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-10 md:px-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
        >
          ← All work
        </Link>

        <header className="mt-14 border-b border-line pb-12">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
            {project.role} · {project.year}
          </p>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] tracking-tight text-balance md:text-7xl">
            {project.title}
          </h1>

          <p
            className="mt-6 font-serif text-2xl italic leading-snug md:text-3xl"
            style={{ color: glow }}
          >
            {project.tagline}
          </p>

          <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-bone/85 md:text-lg">
            {project.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink transition-transform duration-300 hover:scale-105"
              >
                Source on GitHub ↗
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-bone/35 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Visit the live site ↗
              </a>
            )}
            {embedded && (
              <a
                href={embedded.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-bone/35 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {embedded.kind === "live"
                  ? "Open the app full screen ↗"
                  : "Open the demo full screen ↗"}
              </a>
            )}
          </div>
        </header>

        {/* --- the app itself, where there is one to run ------------------ */}
        {demo?.kind === "live" && (
          <section className="mt-16">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-bone">
              Running app — not a screenshot
            </h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-line bg-ink-soft">
              <ProjectDemoFrame
                src={demo.src}
                title={`${project.title} — live demo`}
              />
            </div>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
              Interactive · runs entirely in your browser · nothing leaves the page
            </p>
          </section>
        )}

        {/* --- the real interface, minus the server it needs -------------- */}
        {demo?.kind === "guided" && (
          <section className="mt-16">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-bone">
              The real interface, without the server behind it
            </h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-line bg-ink-soft">
              <ProjectDemoFrame
                src={demo.src}
                title={`${project.title} — guided demo`}
                blurb="The product's own interface, running on sample data. It's a sizeable download and built for a bigger screen, so it only starts when you ask it to."
                runLabel="Play the demo here"
              />
            </div>
            {/* Said plainly, because the frame is convincing enough that not
                saying it would be a claim. */}
            {project.demoNote && (
              <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-bone/70">
                {project.demoNote}
              </p>
            )}
          </section>
        )}

        {/* --- screenshot gallery for the ones that need a backend -------- */}
        {project.images && project.images.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-bone">
              From the real product
            </h2>
            <div className="mt-5 grid gap-8">
              {project.images.map((shot) => (
                <figure key={shot.src}>
                  <Image
                    src={shot.src}
                    alt={`${project.title} — ${shot.caption}`}
                    width={shot.width}
                    height={shot.height}
                    sizes="(min-width: 768px) 1024px, 100vw"
                    className="h-auto w-full rounded-lg border border-line"
                  />
                  <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
                    {shot.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {project.demo?.kind === "case" && (
          <section className="mt-16 rounded-lg border border-line bg-ink-soft p-8">
            <h2 className="font-display text-2xl font-semibold">
              This one needs a server
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              It can&apos;t run inside a static page, so there&apos;s a guided
              walkthrough of the real interface on the home page instead —
              honestly labelled, no pretending.
            </p>
            <Link
              href="/#work"
              className="mt-6 inline-flex font-mono text-xs uppercase tracking-[0.18em] text-accent hover:underline"
            >
              Open the walkthrough →
            </Link>
          </section>
        )}

        {/* --- the case for it, in somebody else's words ------------------ */}
        {project.quotes && project.quotes.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-bone">
              Why it exists
            </h2>
            <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {project.quotes.map((quote) => (
                <figure key={quote.url} className="bg-ink-soft p-6">
                  <blockquote
                    className="font-serif text-lg italic leading-snug"
                    style={{ color: glow }}
                  >
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                    {quote.speaker} ·{" "}
                    <a
                      href={quote.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                    >
                      {quote.source} ↗
                    </a>
                  </figcaption>
                  <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-bone/80">
                    {quote.point}
                  </p>
                </figure>
              ))}
            </div>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
              Quoted from the archive itself · every link is timestamped
            </p>
          </section>
        )}

        {/* --- specs ------------------------------------------------------ */}
        <section className="mt-16 grid gap-10 border-t border-line pt-12 sm:grid-cols-[auto_1fr] sm:gap-16">
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-bone">
              Role
            </h2>
            <p className="mt-3">{project.role}</p>
            <h2 className="mt-8 font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Year
            </h2>
            <p className="mt-3 tabular-nums">{project.year}</p>
          </div>
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-bone">
              Built with
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tool) => (
                <li
                  key={tool}
                  className="border border-line px-3 py-1.5 font-mono text-xs text-muted"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- keep moving ------------------------------------------------ */}
        <nav className="mt-16 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:justify-between">
          {previous ? (
            <Link
              href={`/work/${previous.slug}`}
              className="group font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
            >
              ← {previous.title}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="group font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent sm:text-right"
            >
              {next.title} →
            </Link>
          )}
        </nav>
      </main>

      <Footer />
    </>
  );
}
