import { ImageResponse } from "next/og";
import { projects } from "../../lib/data";

export const alt = "Project — Jesús Adrián López Gaona";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * Per-project share card. Each project's own `palette` drives the glow, so a
 * link pasted into a DM or an application form unfurls as that project rather
 * than as the generic site card.
 */
export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return new ImageResponse(<div style={{ background: "#071015" }} />, size);
  }

  const [glow] = project.palette;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#e9e7e2",
          background: `radial-gradient(circle at 80% 20%, ${glow}38, transparent 30%), linear-gradient(145deg, #071015 0%, #11191b 58%, #071015 100%)`,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 21,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#9fb2af",
          }}
        >
          <span>AG / {project.role}</span>
          <span>{project.year}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: project.title.length > 16 ? 76 : 96,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            {project.title}
            <span style={{ color: glow }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 34,
              color: glow,
              lineHeight: 1.2,
            }}
          >
            {project.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#b8c5c3",
          }}
        >
          <span>{project.stack.slice(0, 5).join("  ·  ")}</span>
          <span style={{ color: "#4fd1b5" }}>adriangaona.dev</span>
        </div>
      </div>
    ),
    size
  );
}
