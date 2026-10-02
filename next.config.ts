import type { NextConfig } from "next";

/**
 * Applies to every response, the embedded demos included, since they are
 * served from the same origin.
 *
 * script-src keeps 'unsafe-inline' because Next.js inlines its bootstrap
 * scripts, and nonces would need a server render per request on a site that is
 * otherwise fully static. 'wasm-unsafe-eval' lets Stockfish compile its
 * WebAssembly. The tasklists demo loads Google Fonts. frame-ancestors 'self'
 * allows the site to frame its own demos and stops anyone else from framing
 * any page.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-src 'self'",
  "media-src 'self' data: blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // A stray package-lock.json further up the tree makes Next infer the wrong
  // workspace root, which drags unrelated files into the deployment trace.
  // process.cwd() is the project directory for every `next` invocation, so this
  // stays correct on any machine.
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // A demo framed with an opaque-origin sandbox (see src/app/lib/sandbox.ts)
      // fetches its own scripts, stylesheets and fonts in CORS mode, so its
      // files must allow any origin. They are public static assets; this
      // exposes nothing.
      {
        source: "/demos/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },

  // A demo is served at /demos/<id>/ and resolves relative URLs (a service
  // worker, a web manifest) against that trailing slash. Next.js would strip
  // it with a redirect; this turns that off, src/middleware.ts adds the slash
  // to demo URLs instead, and the redirect below keeps stripping it everywhere
  // else.
  skipTrailingSlashRedirect: true,

  async redirects() {
    return [{ source: "/:path((?!demos/).+)/", destination: "/:path", permanent: true }];
  },

  // public/ has no directory-index resolution, so /demos/<id>/ needs an
  // explicit rewrite to the embedded app's index.html (see scripts/build-demos.mjs).
  async rewrites() {
    return [{ source: "/demos/:id/", destination: "/demos/:id/index.html" }];
  },
};

export default nextConfig;
