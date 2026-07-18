import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // public/ has no directory-index resolution, so /demos/<id>/ needs an
  // explicit rewrite to the embedded app's index.html (see scripts/build-demos.mjs).
  async rewrites() {
    return [
      {
        source: "/demos/:id",
        destination: "/demos/:id/index.html",
      },
      {
        source: "/demos/:id/",
        destination: "/demos/:id/index.html",
      },
    ];
  },
};

export default nextConfig;
