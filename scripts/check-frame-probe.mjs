/**
 * Checks the adaptive-quality probe in components/AlpineScene.tsx.
 *
 * The state machine is mirrored here rather than imported, because in the
 * component it is a closure inside a WebGL effect that cannot run in Node.
 * If you change the probe there, change it here too.
 *
 * The case worth keeping: a 60Hz display asked for 45fps renders every second
 * rAF callback and lands on exactly 30fps. That is healthy, not slow. An
 * earlier version compared against targetFps and would have degraded quality
 * for every desktop visitor — hence the absolute floor.
 *
 *   node scripts/check-frame-probe.mjs
 */
const SMOOTHNESS_FLOOR_FPS = 24;

function runProbe(frameGaps, { targetFps = 45, constrained = false } = {}) {
  let frameDuration = 1000 / targetFps;
  let probeStartedAt = 0;
  let probeFrames = 0;
  let probeDone = constrained;
  let degraded = false;

  let now = 0;
  let lastRender = 0;

  for (const gapIn of frameGaps) {
    now += gapIn;
    if (now - lastRender < frameDuration) continue; // throttle gate
    const gap = now - lastRender;
    lastRender = now;

    if (probeDone) continue;
    if (probeStartedAt === 0 || gap > frameDuration * 4) {
      probeStartedAt = now;
      probeFrames = 0;
      continue;
    }
    probeFrames += 1;
    const sampled = now - probeStartedAt;
    if (sampled < 2000) continue;
    probeDone = true;
    if ((probeFrames / sampled) * 1000 < SMOOTHNESS_FLOOR_FPS) {
      degraded = true;
      frameDuration = 1000 / 30;
    }
  }
  return { degraded, probeDone, probeFrames };
}

const rep = (n, v) => Array.from({ length: n }, () => v);

const cases = [
  {
    name: "healthy 60Hz display, hits the 45fps target",
    gaps: rep(400, 16.7),
    expectDegraded: false,
  },
  {
    name: "struggling GPU at ~20fps",
    gaps: rep(120, 50),
    expectDegraded: true,
  },
  {
    name: "borderline ~34fps (just above the 75% floor)",
    gaps: rep(200, 29.4),
    expectDegraded: false,
  },
  {
    name: "healthy, but tab backgrounded 5s mid-probe",
    gaps: [...rep(40, 16.7), 5000, ...rep(400, 16.7)],
    expectDegraded: false,
  },
  {
    name: "slow first frame (shader compile) then healthy",
    gaps: [900, ...rep(400, 16.7)],
    expectDegraded: false,
  },
  {
    name: "healthy 30Hz display (rare, but must not false-positive)",
    gaps: rep(200, 33.3),
    expectDegraded: false,
  },
  {
    name: "genuinely broken ~12fps",
    gaps: rep(80, 83),
    expectDegraded: true,
  },
  {
    name: "already constrained — probe never runs",
    gaps: rep(200, 100),
    opts: { constrained: true },
    expectDegraded: false,
  },
];

let failures = 0;
for (const c of cases) {
  const result = runProbe(c.gaps, { targetFps: 45, ...(c.opts ?? {}) });
  const ok = result.degraded === c.expectDegraded;
  if (!ok) failures += 1;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${c.name}\n        degraded=${result.degraded} (expected ${c.expectDegraded}), framesSampled=${result.probeFrames}`
  );
}
console.log(failures === 0 ? "\nAll probe cases passed." : `\n${failures} FAILED`);
process.exit(failures === 0 ? 0 : 1);
