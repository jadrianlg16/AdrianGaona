import { NextResponse, type NextRequest } from "next/server";

/**
 * Sends /demos/<id> to /demos/<id>/. An embedded app resolves relative URLs,
 * such as its service worker, against the trailing slash. This runs in
 * middleware because route matching in next.config.ts ignores a trailing
 * slash, so a redirect there would also match /demos/<id>/ and loop. It reads
 * request.url rather than nextUrl, which drops the slash when serialized.
 */
export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  if (url.pathname.endsWith("/")) return NextResponse.next();
  url.pathname = `${url.pathname}/`;
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: "/demos/:id" };
