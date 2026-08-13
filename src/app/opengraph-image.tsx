import { ImageResponse } from "next/og";

export const alt =
  "Jesús Adrián López Gaona - Software Engineer and AI Systems portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background:
            "radial-gradient(circle at 78% 24%, rgba(79,209,181,.22), transparent 24%), linear-gradient(145deg, #071015 0%, #11191b 58%, #071015 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#9fb2af",
          }}
        >
          <span>AG / PORTFOLIO</span>
          <span>NUEVO LEÓN, MX</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            JESÚS ADRIÁN
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            LÓPEZ GAONA<span style={{ color: "#4fd1b5" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              color: "#4fd1b5",
            }}
          >
            Software engineering / AI systems / business automation
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 21,
            color: "#b8c5c3",
          }}
        >
          <span>Web platforms and AI systems that create momentum.</span>
          <span style={{ color: "#4fd1b5" }}>adriangaona.dev</span>
        </div>
      </div>
    ),
    size
  );
}
