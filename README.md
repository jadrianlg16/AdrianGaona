# adriangaona.dev

**A portfolio where the projects run instead of being described.**

This is the source of [www.adriangaona.dev](https://www.adriangaona.dev), the
portfolio of Adrián Gaona, a software engineer in Nuevo León, Mexico. It is
written for the person reviewing the work: most projects can be opened and
used right on the page, so a reviewer can check the claims in a couple of
minutes instead of cloning repos. Apps that need no server run for real in the
browser. Apps that need one show their real interface on sample data, and the
site says which is which.

![Homepage of adriangaona.dev: the hero headline "Engineering leverage" over a snowy mountain](docs/screenshot.jpg)

| Live demo: the real Chess Analyzer, with Stockfish running in the browser | Guided demo: the real HowlX interface on sample data, with a scripted tour |
|---|---|
| ![Chess Analyzer open in the demo overlay, showing the board and three engine lines](docs/demo-live.jpg) | ![HowlX open in the demo overlay, mid-tour, showing the upload dialog and the tour controls](docs/demo-guided.jpg) |

## Contents

- [What's on the site](#whats-on-the-site)
- [How the demos work](#how-the-demos-work)
- [Engineering highlights](#engineering-highlights)
- [Tech stack and design decisions](#tech-stack-and-design-decisions)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Rebuilding the demos](#rebuilding-the-demos)
- [Checks](#checks)
- [Configuration](#configuration)
- [Limitations](#limitations)
- [License](#license)
- [Author](#author)

## What's on the site

- **Five embedded apps** built from their own repos and served from this one:

  | Project | Demo | Source |
  |---|---|---|
  | Chess Analyzer | [live](https://www.adriangaona.dev/demos/chess/) | [chess-analyzer](https://github.com/jadrianlg16/chess-analyzer) |
  | Financial Sim | [live](https://www.adriangaona.dev/demos/financial-sim/) | [financial-sim](https://github.com/jadrianlg16/financial-sim) |
  | Task Shuffler (the app calls itself *done.*) | [live](https://www.adriangaona.dev/demos/tasklists/) | [task-shuffler](https://github.com/jadrianlg16/task-shuffler) |
  | HowlX | [guided](https://www.adriangaona.dev/demos/howlx/) | [howlx](https://github.com/jadrianlg16/howlx) |
  | Transcript Archive | [guided](https://www.adriangaona.dev/demos/transcript-archive/) | [yt-transcripts](https://github.com/jadrianlg16/yt-transcripts) |

- **Scripted walkthroughs** for apps whose interface can't run without its
  backend: File Converter ([source](https://github.com/jadrianlg16/file-converter)),
  GravityDL and Audiobook Studio.
- **A page per project** at `/work/<slug>`, for example
  [/work/chess-analyzer](https://www.adriangaona.dev/work/chess-analyzer) or
  [/work/howlx](https://www.adriangaona.dev/work/howlx), with its own share
  image and structured data, so a single project can be sent to a single person.
- **A downloadable résumé** at `/downloads/adrian-gaona-resume.pdf`.

## How the demos work

```text
source repos, checked out beside this one
  │   node scripts/build-demos.mjs
  │   (runs `npm run build -- --base=/demos/<id>/` in each, copies dist/)
  ▼
public/demos/<id>/          committed static bundles, one folder per app
  │   next.config.ts rewrites /demos/<id> and /demos/<id>/ to index.html
  ▼
same-origin <iframe>
  ├─ DemoOverlay        full-screen app window launched from the homepage
  └─ ProjectDemoFrame   on-page frame on /work/<slug>
```

Each demo has one of three kinds, declared per project in
[`src/app/lib/data.ts`](src/app/lib/data.ts):

- **live**: the app's real production build, running entirely in the browser.
  In the chess demo, Stockfish really is computing in the visitor's tab.
- **guided**: an app that needs a server, rebuilt from its own components with
  the network layer swapped for fixtures. Every click works and a scripted tour
  plays until the visitor takes over. The data is a fixture: a call written for
  the demo in HowlX, a captured snapshot of the real archive in Transcript Archive.
- **case**: a scripted walkthrough component in
  [`src/app/components/demos/`](src/app/components/demos/), for apps whose
  interface can't be separated from their backend.

## Engineering highlights

- **The demos are the real builds, committed.**
  [`scripts/build-demos.mjs`](scripts/build-demos.mjs) builds each source repo
  with its base path set to `/demos/<id>/` and copies the output into
  `public/demos/`. Committing the output means Vercel and Docker build this repo
  on its own, with no sibling repos present.
  [`next.config.ts`](next.config.ts) adds the rewrite that `public/` lacks:
  `/demos/<id>/` serves that app's `index.html`.
- **Honest labels are part of the type.** `ProjectDemo` in
  [`src/app/lib/data.ts`](src/app/lib/data.ts) is a union of `live`, `guided`
  and `case`, and every surface labels them from it: the
  [`DemoOverlay.tsx`](src/app/components/DemoOverlay.tsx) title bar reads
  "live · running in your browser", "guided demo · real interface, sample data" or
  "interactive walkthrough". Guided demos also carry a `demoNote` that the project
  page prints under the frame, saying which parts are product code and which are
  fixtures.
- **On project pages, heavy demos wait until they are affordable.** The chess
  bundle ships a ~7 MB Stockfish WebAssembly binary.
  [`ProjectDemoFrame.tsx`](src/app/components/ProjectDemoFrame.tsx) starts a demo
  automatically only on screens 768 px and wider, and waits for a tap when
  Save-Data is on or the connection reports 2G.
- **Project pages are built for sharing.**
  [`src/app/work/[slug]/page.tsx`](src/app/work/%5Bslug%5D/page.tsx) prerenders
  one page per project with a canonical URL and `SoftwareApplication` +
  `BreadcrumbList` JSON-LD.
  [`opengraph-image.tsx`](src/app/work/%5Bslug%5D/opengraph-image.tsx) renders a
  share card per project from that project's color palette.
- **The 3D hero degrades instead of stuttering.**
  [`AlpineScene.tsx`](src/app/components/AlpineScene.tsx) starts on a lighter
  tier on constrained devices (touch screens, viewports under 768 px, 4 or fewer
  cores, 4 GB or less memory, or Save-Data). Elsewhere it measures the real frame
  rate for two seconds and, under 24 fps, drops to 30 fps and fewer particles.
  [`scripts/check-frame-probe.mjs`](scripts/check-frame-probe.mjs) replays
  synthetic frame timings against that rule.

## Tech stack and design decisions

| Choice | Why |
|---|---|
| Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 | Every route is prerendered at build time, including one page and one share image per project. Metadata, sitemap, robots and manifest are file-based. |
| GSAP + ScrollTrigger, Lenis | Scroll-driven motion and smooth scrolling. Lenis is stopped while a demo overlay is open, so the page underneath doesn't scroll. |
| three.js | The snowfall over the hero image, with the adaptive quality tiers above. |
| Same-origin iframes for demos | Each app keeps its own build, dependencies and CSS, so no app can break another or the site. The same URL also opens full-screen in a new tab. |
| One content file | Projects (with their demo kinds), capabilities, principles and contact details live in `src/app/lib/data.ts`. Adding a project is an entry there, plus its demo bundle or walkthrough component if it has one. |

## Project structure

```text
scripts/
  build-demos.mjs          builds the source repos into public/demos/<id>/
  check-frame-probe.mjs    replays frame timings against the hero's quality rule
public/
  demos/                   committed bundles: chess, financial-sim, tasklists,
                           howlx, transcript-archive
  images/                  hero art, profile photo, HowlX screenshots
  downloads/               résumé PDF
src/app/
  lib/data.ts              projects and their demo kinds, capabilities, contact
  components/
    DemoOverlay.tsx        the full-screen app window every demo opens in
    ProjectDemoFrame.tsx   the on-page demo frame on /work/<slug>
    AlpineScene.tsx        three.js hero with adaptive quality
    demos/                 scripted walkthroughs (kind "case")
  work/[slug]/
    page.tsx               per-project page with JSON-LD
    opengraph-image.tsx    per-project share image
  layout.tsx, page.tsx     site shell and homepage
  sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx
next.config.ts             /demos/<id>/ → index.html rewrite
THIRD-PARTY.md             third-party code and content inside public/demos/
Dockerfile
```

## Getting started

**Prerequisites:** Node.js 20.9 or newer and npm 10. Docker is optional.

```bash
git clone https://github.com/jadrianlg16/AdrianGaona.git && cd AdrianGaona
npm ci
npm run dev        # http://localhost:3000
```

The demos are already built and committed, so they work straight away at
`/demos/<id>/`.

**Production build:**

```bash
npm run build
npm start          # http://localhost:3000
```

`npm run dev` and `npm run build` share the `.next/` folder. If you used the dev
server after building, run `npm run build` again before `npm start`.

**Docker:**

```bash
docker build -t portfolio .
docker run --rm -p 3000:3000 portfolio
```

## Rebuilding the demos

Only needed after changing one of the source projects:

```bash
node scripts/build-demos.mjs          # all five
node scripts/build-demos.mjs chess    # one, by id
```

Each source repo must be checked out at the relative path listed in `DEMOS` at
the top of [`scripts/build-demos.mjs`](scripts/build-demos.mjs), with its
dependencies installed (`npm ci` in that repo). An app can be embedded if it
builds to static files, uses base-path-relative asset URLs
(`import.meta.env.BASE_URL`) and needs no backend. The script builds Task
Shuffler with `VITE_STORAGE=local`, which swaps its JSON server for
`localStorage`.

## Checks

There is no unit-test suite. These are the checks:

```bash
npm run lint                        # ESLint, Next.js core-web-vitals + TypeScript rules
npm run build                       # production build, includes the type check
node scripts/check-frame-probe.mjs  # hero quality rule against synthetic frame timings
```

## Configuration

The site reads no environment variables of its own.

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `3000` | Port for `npm start`, read by Next.js. The Dockerfile sets it to `3000`. |

## Limitations

- **The demos are desktop-first.** The apps were built for desktop screens, so on
  phones the project page asks before loading one.
- **Guided demos and walkthroughs don't compute anything.** In the HowlX demo no
  model runs and no call is transcribed. In the Transcript Archive demo, Fetch
  fails on purpose because there is no backend to reach YouTube. The
  walkthroughs are scripted re-creations of each app's flow, not the app itself.
- **Rebuilding needs the source repos side by side.** The Transcript Archive
  demo's source (`demo/` in yt-transcripts) is not on that repo's public default
  branch yet, so its committed bundle can't be rebuilt from public code today.
- **Nothing checks that a committed bundle still matches its source.** Rebuild
  after changing a source project.
- **The site URL is a constant.** `siteUrl` is repeated in `layout.tsx`,
  `sitemap.ts`, `robots.ts` and `work/[slug]/page.tsx`. Change all four to host
  the site under another domain.
- **Analytics only work on Vercel.** Elsewhere, including the Docker image, the
  Vercel Analytics script request returns 404. The site still works.

## License

Copyright © 2026 Adrián Gaona. All rights reserved. The source is public so it
can be read and evaluated; no license is granted to reuse or redistribute it.

The demo bundles in `public/demos/` contain third-party code under its own
licenses, listed in [THIRD-PARTY.md](THIRD-PARTY.md). The one with copyleft
terms is **Stockfish 18** (GPL-3.0-or-later), shipped unmodified in
`public/demos/chess/vendor/stockfish/` with its
[license text](public/demos/chess/vendor/stockfish/LICENSE). It runs as a
separate Web Worker and is not linked into the site's code.

## Author

**Adrián Gaona** · [adriangaona.dev](https://www.adriangaona.dev) · [LinkedIn](https://www.linkedin.com/in/jesus-lopez-95762b2b6) · [GitHub](https://github.com/jadrianlg16)
