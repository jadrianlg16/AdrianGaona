import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { DEFAULT_SITE_URL, resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  test("defaults to the www host, never the bare domain", () => {
    assert.equal(DEFAULT_SITE_URL, "https://www.adriangaona.dev");
    assert.equal(resolveSiteUrl(undefined), DEFAULT_SITE_URL);
  });

  test("treats an empty or blank value as unset", () => {
    // Docker passes an unset build arg through as an empty string.
    assert.equal(resolveSiteUrl(""), DEFAULT_SITE_URL);
    assert.equal(resolveSiteUrl("   "), DEFAULT_SITE_URL);
  });

  test("normalizes to a bare origin", () => {
    assert.equal(resolveSiteUrl("https://example.com/"), "https://example.com");
    assert.equal(resolveSiteUrl(" https://Example.COM:443 "), "https://example.com");
    assert.equal(resolveSiteUrl("http://localhost:3000"), "http://localhost:3000");
  });

  test("rejects values that would produce wrong absolute URLs", () => {
    for (const value of [
      "example.com",
      "ftp://example.com",
      "https://example.com/portfolio",
      "https://example.com/?ref=x",
      "https://example.com/#top",
      "https://user:pass@example.com",
    ]) {
      assert.throws(() => resolveSiteUrl(value), /NEXT_PUBLIC_SITE_URL/, value);
    }
  });
});
