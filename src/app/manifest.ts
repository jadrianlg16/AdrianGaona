import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adrián Gaona - Software Engineer & AI Systems",
    short_name: "Adrián Gaona",
    description:
      "Portfolio of full-stack web platforms, AI systems, and business automation by Jesús Adrián López Gaona.",
    start_url: "/",
    display: "standalone",
    background_color: "#071015",
    theme_color: "#071015",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48 64x64 128x128 256x256",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
