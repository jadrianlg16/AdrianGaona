import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import { config, middleware } from "./middleware";

test("adds the trailing slash to a demo URL, keeping the query", () => {
  const response = middleware(new NextRequest("https://example.com/demos/tasklists?x=1"));
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://example.com/demos/tasklists/?x=1");
});

test("lets a demo URL that already has the slash through", () => {
  const response = middleware(new NextRequest("https://example.com/demos/tasklists/"));
  assert.equal(response.headers.get("location"), null);
  assert.equal(response.headers.get("x-middleware-next"), "1");
});

test("only runs on demo entry URLs, not their assets", () => {
  assert.equal(config.matcher, "/demos/:id");
});
