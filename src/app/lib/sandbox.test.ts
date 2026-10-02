import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { projects } from "./data";
import { demoSandbox } from "./sandbox";

const tokens = (value: string) => value.split(" ");

describe("demoSandbox", () => {
  test("an isolated demo never gets allow-same-origin", () => {
    const sandbox = tokens(demoSandbox({ kind: "live", src: "/demos/x/", isolated: true }));
    assert.ok(sandbox.includes("allow-scripts"));
    assert.ok(!sandbox.includes("allow-same-origin"));
  });

  test("a shared-origin demo keeps the same capabilities plus allow-same-origin", () => {
    const shared = tokens(demoSandbox({ kind: "guided", src: "/demos/x/" }));
    const isolated = tokens(demoSandbox({ kind: "guided", src: "/demos/x/", isolated: true }));
    assert.deepEqual(shared.filter((t) => t !== "allow-same-origin"), isolated);
  });

  test("Financial Sim is the isolated demo", () => {
    const isolated = projects
      .filter((p) => p.demo && p.demo.kind !== "case" && p.demo.isolated)
      .map((p) => p.slug);
    assert.deepEqual(isolated, ["financial-sim"]);
  });
});
