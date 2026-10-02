import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { createFrameProbe, PROBE_WINDOW_MS, SMOOTHNESS_FLOOR_FPS } from "./frameProbe";

/**
 * Drives the probe the way AlpineScene's tick does: requestAnimationFrame
 * fires after each gap in `displayGaps`, frames closer together than the
 * current frame duration are skipped, and a "degrade" verdict switches the
 * loop to 30 fps.
 */
function run(displayGaps: number[], { targetFps = 45, skip = false } = {}) {
  const probe = createFrameProbe({ skip });
  let frameDuration = 1000 / targetFps;
  let now = 0;
  let lastRender = 0;
  let degraded = 0;
  for (const gapIn of displayGaps) {
    now += gapIn;
    if (now - lastRender < frameDuration) continue;
    const gap = now - lastRender;
    lastRender = now;
    if (probe.sample(now, gap, frameDuration)) {
      degraded += 1;
      frameDuration = 1000 / 30;
    }
  }
  return { degraded: degraded > 0, verdicts: degraded, done: probe.done };
}

const repeat = (n: number, gap: number) => Array.from({ length: n }, () => gap);

describe("frame probe", () => {
  test("a healthy 60 Hz display stays on the full tier", () => {
    // Asked for 45 fps, it renders every second callback: exactly 30 fps.
    assert.equal(run(repeat(400, 16.7)).degraded, false);
  });

  test("a GPU managing ~20 fps drops a tier", () => {
    assert.equal(run(repeat(120, 50)).degraded, true);
  });

  test("~34 fps is under the 45 fps target but smooth, so it stays", () => {
    assert.equal(run(repeat(200, 29.4)).degraded, false);
  });

  test("a tab backgrounded mid-probe is not mistaken for a slow GPU", () => {
    assert.equal(run([...repeat(40, 16.7), 5000, ...repeat(400, 16.7)]).degraded, false);
  });

  test("a slow first frame (shader compile) is not held against it", () => {
    assert.equal(run([900, ...repeat(400, 16.7)]).degraded, false);
  });

  test("a healthy 30 Hz display does not false-positive", () => {
    assert.equal(run(repeat(200, 33.3)).degraded, false);
  });

  test("a genuinely broken ~12 fps drops a tier", () => {
    assert.equal(run(repeat(80, 83)).degraded, true);
  });

  test("a constrained device skips the probe entirely", () => {
    const result = run(repeat(200, 100), { skip: true });
    assert.equal(result.degraded, false);
    assert.equal(result.done, true);
  });

  test("gives its verdict once, after the sampling window", () => {
    const probe = createFrameProbe();
    const verdicts: boolean[] = [];
    for (let now = 0; now <= PROBE_WINDOW_MS * 3; now += 50) verdicts.push(probe.sample(now, 50, 1000 / 45));
    assert.equal(verdicts.filter(Boolean).length, 1);
    assert.equal(probe.done, true);
  });

  test("the floor sits between 23 and 25 fps", () => {
    // Steady frames straight into the probe, with no throttle in between, so
    // these fail if SMOOTHNESS_FLOOR_FPS moves off 24.
    const verdict = (fps: number) => {
      const probe = createFrameProbe();
      const gap = 1000 / fps;
      for (let now = 0; !probe.done; now += gap) {
        if (probe.sample(now, gap, 1000 / 45)) return true;
      }
      return false;
    };
    assert.equal(SMOOTHNESS_FLOOR_FPS, 24);
    assert.equal(verdict(25), false);
    assert.equal(verdict(23), true);
  });
});
