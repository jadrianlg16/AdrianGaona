type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

/**
 * Whether an animation should start on its lighter tier: a touch screen, a
 * viewport under 768 px, 4 or fewer cores, 4 GB or less of memory, or
 * Save-Data on. These are the signals available before anything has rendered;
 * the hero then measures its real frame rate as well (lib/frameProbe.ts).
 */
export function isConstrainedDevice(): boolean {
  const hints = navigator as NavigatorWithHints;
  return (
    window.matchMedia("(pointer: coarse)").matches ||
    window.innerWidth < 768 ||
    navigator.hardwareConcurrency <= 4 ||
    (hints.deviceMemory !== undefined && hints.deviceMemory <= 4) ||
    hints.connection?.saveData === true
  );
}
