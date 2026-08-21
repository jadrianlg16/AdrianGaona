import type { Metadata } from "next";
import Link from "next/link";
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

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
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
            {project.demo?.kind === "live" && (
              <a
                href={project.demo.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-bone/35 px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Open the app full screen ↗
              </a>
            )}
          </div>
        </header>

        {/* --- the app itself, where there is one to run ------------------ */}
        {project.demo?.kind === "live" && (
          <section className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Running app — not a screenshot
            </h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-line bg-ink-soft">
              <ProjectDemoFrame
                src={project.demo.src}
                title={`${project.title} — live demo`}
              />
            </div>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
              Interactive · runs entirely in your browser · nothing leaves the page
            </p>
          </section>
        )}

        {/* --- screenshot gallery for the ones that need a backend -------- */}
        {project.images && project.images.length > 0 && (
          <section className="mt-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              From the real product
            </h2>
            <div className="mt-5 grid gap-8">
              {project.images.map((shot) => (
                <figure key={shot.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot.src}
                    alt={`${project.title} — ${shot.caption}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-lg border border-line"
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

        {/* --- specs ------------------------------------------------------ */}
        <section className="mt-16 grid gap-10 border-t border-line pt-12 sm:grid-cols-[auto_1fr] sm:gap-16">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Role
            </h2>
            <p className="mt-3">{project.role}</p>
            <h2 className="mt-8 font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Year
            </h2>
            <p className="mt-3 tabular-nums">{project.year}</p>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
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
