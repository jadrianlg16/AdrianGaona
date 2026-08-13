import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://adriangaona.dev/sitemap.xml",
    host: "https://adriangaona.dev",
  };
}
