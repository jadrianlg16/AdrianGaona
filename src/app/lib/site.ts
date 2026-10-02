/**
 * The site's public origin, used for metadataBase, canonical URLs, Open Graph,
 * the sitemap, robots.txt and JSON-LD.
 *
 * It defaults to the www host because that is the hostname that serves the
 * site; the bare domain does not, so nothing should point search engines or
 * share cards at it. Set NEXT_PUBLIC_SITE_URL to deploy under another domain.
 * Every page is prerendered, so the value is read at build time.
 */
export const DEFAULT_SITE_URL = "https://www.adriangaona.dev";

/**
 * Normalizes a configured site URL to a bare origin (no trailing slash), or
 * returns the default when it is unset or blank. Throws on anything that is
 * not an http(s) origin, so a typo fails the build instead of shipping wrong
 * canonical URLs. A path is rejected because the site links to root-relative
 * paths such as /demos/ and /downloads/.
 */
export function resolveSiteUrl(configured: string | undefined): string {
  const value = configured?.trim();
  if (!value) return DEFAULT_SITE_URL;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be an absolute URL, got "${value}"`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`NEXT_PUBLIC_SITE_URL must use http or https, got "${value}"`);
  }
  if (url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be an origin with no path, got "${value}"`);
  }
  return url.origin;
}

export const SITE_URL = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
