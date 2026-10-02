/**
 * Decides, once, whether the hero's snowfall should drop to its lighter tier,
 * from the frame rate it actually achieves.
 *
 * The device check (lib/device.ts) reads pointer type, viewport, core count and
 * memory, and none of those describe the GPU. A budget laptop reporting eight
 * threads and 8 GB still renders like a phone, and Firefox and Safari expose
 * neither deviceMemory nor connection. So once the scene is running, this
 * samples the rendered frame rate for two seconds and compares it with an
 * absolute floor.
 *
 * The floor is absolute on purpose. Comparing against the target rate would
 * misfire on healthy hardware: requestAnimationFrame is quantised to the
 * display, so a 60 Hz screen asked for 45 fps renders every second callback
 * and lands on exactly 30, which is smooth but a third "under target". Below
 * about 24 fps is where motion starts to read as broken, on any display.
 */
export const SMOOTHNESS_FLOOR_FPS = 24;

/** How long the probe samples before it decides. */
export const PROBE_WINDOW_MS = 2000;

export type FrameProbe = {
  /**
   * Report one rendered frame. `gap` is the time since the previous rendered
   * frame and `frameDuration` the interval the loop is currently aiming for.
   * Returns true exactly once, on the frame where the probe finds the rate
   * under the floor; the caller then drops to the lighter tier.
   */
  sample(now: number, gap: number, frameDuration: number): boolean;
  /** True once the probe has decided, or from the start when skipped. */
  readonly done: boolean;
};

/** `skip` is for a device that already starts on the lighter tier. */
export function createFrameProbe({ skip = false }: { skip?: boolean } = {}): FrameProbe {
  let startedAt = 0;
  let frames = 0;
  let done = skip;

  return {
    get done() {
      return done;
    },
    sample(now, gap, frameDuration) {
      if (done) return false;
      // Restart the window on the first frame, which carries shader
      // compilation and would condemn a healthy GPU, and after any long gap,
      // since a backgrounded tab or a busy main thread says nothing about how
      // fast this machine can draw.
      if (startedAt === 0 || gap > frameDuration * 4) {
        startedAt = now;
        frames = 0;
        return false;
      }
      frames += 1;
      const sampled = now - startedAt;
      if (sampled < PROBE_WINDOW_MS) return false;
      done = true;
      return (frames / sampled) * 1000 < SMOOTHNESS_FLOOR_FPS;
    },
  };
}
