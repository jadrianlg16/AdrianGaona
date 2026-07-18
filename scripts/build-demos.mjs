/**
 * Build sibling side-projects as embeddable demos and copy them into
 * public/demos/<id>/, where the showcase iframes them same-origin.
 *
 * Usage:
 *   node scripts/build-demos.mjs           # build every demo
 *   node scripts/build-demos.mjs chess     # build one demo
 *
 * The outputs are committed, so the portfolio keeps building standalone
 * (Docker/Vercel) without the sibling repos present.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const portfolioRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const DEMOS = [
  { id: "chess", project: "../chess" },
  { id: "financial-sim", project: "../../tools/financial-sim" },
  // VITE_STORAGE=local swaps json-server for the localStorage adapter.
  { id: "tasklists", project: "../../tools/tasklists", env: { VITE_STORAGE: "local" } },
];

const only = process.argv[2];
const targets = only ? DEMOS.filter((d) => d.id === only) : DEMOS;
if (targets.length === 0) {
  console.error(`Unknown demo "${only}". Known: ${DEMOS.map((d) => d.id).join(", ")}`);
  process.exit(1);
}

for (const demo of targets) {
  const projectDir = resolve(portfolioRoot, demo.project);
  const distDir = join(projectDir, "dist");
  const outDir = join(portfolioRoot, "public", "demos", demo.id);

  if (!existsSync(projectDir)) {
    console.error(`✗ ${demo.id}: project not found at ${projectDir}`);
    process.exit(1);
  }

  console.log(`\n▶ Building ${demo.id} (${projectDir})`);
  const result = spawnSync("npm", ["run", "build", "--", `--base=/demos/${demo.id}/`], {
    cwd: projectDir,
    stdio: "inherit",
    shell: true,
    env: { ...process.env, ...(demo.env ?? {}) },
  });
  if (result.status !== 0) {
    console.error(`✗ ${demo.id}: build failed`);
    process.exit(result.status ?? 1);
  }

  rmSync(outDir, { recursive: true, force: true });
  cpSync(distDir, outDir, { recursive: true });
  console.log(`✓ ${demo.id} → public/demos/${demo.id}`);
}

console.log("\nAll demos built.");
