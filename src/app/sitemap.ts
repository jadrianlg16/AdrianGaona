import type { MetadataRoute } from "next";
import { projects } from "./lib/data";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      // Deliberately below the home page: these are entry points for shared
      // links, not competitors with the root for the name query.
      priority: 0.8,
    })),
  ];
}
