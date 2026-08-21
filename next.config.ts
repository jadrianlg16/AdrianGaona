import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json further up the tree makes Next infer the wrong
  // workspace root, which drags unrelated files into the deployment trace.
  // process.cwd() is the project directory for every `next` invocation, so this
  // stays correct on any machine.
  outputFileTracingRoot: process.cwd(),

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
