import type { ProjectDemo } from "./data";

type FramedDemo = Extract<ProjectDemo, { kind: "live" | "guided" }>;

/** What every demo frame may do: run, submit forms, open links, show dialogs, save exports. */
const BASE = "allow-scripts allow-forms allow-popups allow-modals allow-downloads";

/**
 * The `sandbox` attribute for a demo's iframe.
 *
 * An `isolated` demo gets an opaque origin: it cannot read this page's DOM or
 * storage, and cannot remove its own sandbox. That costs it storage
 * (localStorage throws) and same-origin Web Workers, so only demos that run
 * without them can be isolated.
 *
 * The others need `allow-same-origin`. Together with `allow-scripts` that is
 * not a security boundary, because a same-origin script can reach the parent
 * and lift the sandbox. It only keeps a well-behaved demo from navigating the
 * page around it. Isolating them properly needs a separate origin.
 */
export function demoSandbox(demo: FramedDemo): string {
  return demo.isolated ? BASE : `${BASE} allow-same-origin`;
}
