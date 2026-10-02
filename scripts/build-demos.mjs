/**
 * Builds the embedded demos from their source repos and copies each build into
 * public/demos/<id>/, where the site serves it to a same-origin iframe.
 *
 *   node scripts/build-demos.mjs                         # every demo
 *   node scripts/build-demos.mjs chess tasklists         # some, by id
 *   node scripts/build-demos.mjs chess --src ../my/chess # one, from any checkout
 *   node scripts/build-demos.mjs --install               # npm ci in each source first
 *   node scripts/build-demos.mjs chess --out ./tmp       # write to <out>/<id>/ instead
 *   node scripts/build-demos.mjs --list                  # show where each source is
 *
 * Where each source repo is found, first match wins:
 *   1. --src <path>, relative to the current directory (one demo at a time);
 *   2. demos.local.json in this repo (untracked), mapping a demo id to a repo
 *      checkout, relative to this repo or absolute:
 *        { "chess": "../chess", "tasklists": "/code/task-shuffler" }
 *   3. a sibling checkout named after the GitHub repo, e.g. ../chess-analyzer.
 *
 * The outputs are committed, so the site builds on Vercel and in Docker with no
 * source repos present.
 */
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const portfolioRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LOCAL_CONFIG = join(portfolioRoot, "demos.local.json");

/**
 * `repo` is the GitHub repo name under github.com/jadrianlg16. `project` is
 * the folder inside it that builds the demo (default: the repo root), and
 * `install` lists the folders that need `npm ci` before it can build.
 */
const DEMOS = [
  { id: "chess", repo: "chess-analyzer" },
  { id: "financial-sim", repo: "financial-sim" },
  // VITE_STORAGE=local swaps json-server for the localStorage adapter.
  { id: "tasklists", repo: "task-shuffler", env: { VITE_STORAGE: "local" } },
  // Not the app: demo/ imports the app's own components from web/src with
  // tRPC, auth and the analysis API swapped for fixtures, so it also needs the
  // web app's dependencies. See demo/README.md in that repo.
  { id: "howlx", repo: "howlx", project: "demo", install: ["web", "demo"] },
  // Not the app: demo/ renders the app's own screen from frontend/src with the
  // HTTP client answering from a captured snapshot. See demo/README.md there.
  { id: "transcript-archive", repo: "yt-transcripts", project: "demo" },
];

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

function run(command, cwd, env) {
  // One command string through the shell, so `npm` resolves to npm.cmd on
  // Windows without passing an argument array alongside shell: true.
  const result = spawnSync(command, { cwd, stdio: "inherit", shell: true, env });
  return result.status === 0;
}

function loadLocalConfig() {
  if (!existsSync(LOCAL_CONFIG)) return {};
  let config;
  try {
    config = JSON.parse(readFileSync(LOCAL_CONFIG, "utf8"));
  } catch (error) {
    fail(`demos.local.json is not valid JSON: ${error.message}`);
  }
  for (const [id, path] of Object.entries(config)) {
    if (!DEMOS.some((demo) => demo.id === id)) fail(`demos.local.json: unknown demo "${id}"`);
    if (typeof path !== "string") fail(`demos.local.json: "${id}" must map to a path`);
  }
  return config;
}

function repoDir(demo, flags, localConfig) {
  if (flags.src) return resolve(process.cwd(), flags.src);
  if (localConfig[demo.id]) return resolve(portfolioRoot, localConfig[demo.id]);
  return resolve(portfolioRoot, "..", demo.repo);
}

const { values: flags, positionals: ids } = parseArgs({
  allowPositionals: true,
  options: {
    src: { type: "string" },
    out: { type: "string" },
    install: { type: "boolean", default: false },
    list: { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (flags.help) {
  // The usage text is the comment at the top of this file.
  const header = readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0];
  const lines = header.split(/\r?\n/).slice(1, -1);
  console.log(lines.map((line) => line.replace(/^ \* ?/, "")).join("\n"));
  process.exit(0);
}

const unknown = ids.filter((id) => !DEMOS.some((demo) => demo.id === id));
if (unknown.length > 0) {
  fail(`Unknown demo "${unknown.join(", ")}". Known: ${DEMOS.map((d) => d.id).join(", ")}`);
}
const targets = ids.length > 0 ? DEMOS.filter((demo) => ids.includes(demo.id)) : DEMOS;
if (flags.src && targets.length !== 1) fail("--src takes exactly one demo id");

const localConfig = loadLocalConfig();
const outRoot = flags.out
  ? resolve(process.cwd(), flags.out)
  : join(portfolioRoot, "public", "demos");

if (flags.list) {
  for (const demo of targets) {
    const projectDir = join(repoDir(demo, flags, localConfig), demo.project ?? "");
    const found = existsSync(join(projectDir, "package.json")) ? "found  " : "MISSING";
    console.log(`${demo.id.padEnd(20)} ${found} ${projectDir}`);
  }
  process.exit(0);
}

for (const demo of targets) {
  const repo = repoDir(demo, flags, localConfig);
  const projectDir = join(repo, demo.project ?? "");
  const outDir = join(outRoot, demo.id);

  if (!existsSync(join(projectDir, "package.json"))) {
    fail(
      `${demo.id}: no package.json in ${projectDir}. Check out ${demo.repo} there, ` +
        `or point to it with --src or demos.local.json.`
    );
  }

  for (const folder of demo.install ?? [demo.project ?? "."]) {
    const dir = join(repo, folder);
    if (flags.install) {
      console.log(`\n▶ npm ci in ${dir}`);
      if (!run("npm ci", dir, process.env)) fail(`${demo.id}: npm ci failed in ${dir}`);
    } else if (!existsSync(join(dir, "node_modules"))) {
      fail(`${demo.id}: ${dir} has no node_modules. Run npm ci there, or pass --install.`);
    }
  }

  console.log(`\n▶ Building ${demo.id} from ${projectDir}`);
  const env = { ...process.env, ...(demo.env ?? {}) };
  if (!run(`npm run build -- --base=/demos/${demo.id}/`, projectDir, env)) {
    fail(`${demo.id}: build failed`);
  }

  // A shell that rewrites the base path (Git Bash does, for arguments that
  // look like POSIX paths) produces a bundle that only fails once deployed.
  const distDir = join(projectDir, "dist");
  const html = existsSync(join(distDir, "index.html"))
    ? readFileSync(join(distDir, "index.html"), "utf8")
    : "";
  if (!html.includes(`/demos/${demo.id}/`)) {
    fail(`${demo.id}: dist/index.html does not reference /demos/${demo.id}/`);
  }

  rmSync(outDir, { recursive: true, force: true });
  cpSync(distDir, outDir, { recursive: true });
  console.log(`✓ ${demo.id} → ${relative(process.cwd(), outDir) || outDir}`);
}

console.log(`\nBuilt ${targets.map((demo) => demo.id).join(", ")}.`);
