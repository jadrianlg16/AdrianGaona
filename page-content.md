# Page Content — adriangaona.dev

Every word on the site, in the order a visitor meets it, with where each one
lives. Two kinds of copy:

- **Data** — lives in [`src/app/lib/data.ts`](src/app/lib/data.ts). Change it
  there and the components render whatever is there. No JSX involved.
- **Hardcoded** — lives inside a component's JSX. Line numbers are given, but
  they drift as the file changes; search the string itself if it has moved.

Anything not listed here isn't copy — it's structure.

---

## Metadata — `src/app/layout.tsx`

| Field | Value |
|---|---|
| Title | Jesús Adrián López Gaona \| Software Engineer & AI Systems |
| Title template | `%s \| Adrián Gaona` |
| Description | Software engineer in Nuevo León, Mexico, building full-stack web platforms, AI systems, and business automation with Next.js, React, Python, and Django. |
| Site URL | `https://www.adriangaona.dev`, from `src/app/lib/site.ts` (override with `NEXT_PUBLIC_SITE_URL`) |
| Locale | `en_US` |
| Theme colour | `#071015` |

Also carries the `Person` JSON-LD: name, `alternateName` "Adrián Gaona", job title
"Software Engineer", Nuevo León / MX, the `/images/pfp.webp` avatar, and `sameAs`,
which lists the GitHub and LinkedIn profiles from `contact.socials` in `data.ts`.

Social share cards are generated, not written: `src/app/opengraph-image.tsx` for
the site, `src/app/work/[slug]/opengraph-image.tsx` per project.

---

## Preloader — `components/Preloader.tsx`

The whiteout crossing. Plays once per browser session, capped at 2.6s, skippable.

| Copy | Line |
|---|---|
| `AG / Alpine approach` | 208 |
| `Whiteout crossing` *(hidden below `sm`)* | 210 |
| `Skip ↴` | 216 |
| `Visibility / near zero` | 223 |
| `Conditions` | 229 |
| `000` → `100` counter | progressbar, labelled "Loading portfolio" |

---

## Navigation — `components/Nav.tsx`

Logo `AG©`. Links: **About**, **Work**, **Principles**, **Contact** — defined in
the `links` array at the top of the file, not in `data.ts`. Desktop also shows a
live Monterrey clock (`MTY 00:00`). Below `md` the links collapse behind
**Menu ≡** / **Close ✕**, and the mobile panel adds **Résumé ↓**.

---

## Hero — `components/Hero.tsx`

| Copy | Line |
|---|---|
| `Adrián Gaona — Field Notes` | 67 |
| `Engineering` / `leverage.` — the H1, split across two animated lines | 78, 83 |
| `Web platforms and AI systems that turn busywork into momentum.` | 92 |
| `Open to internships & freelance` + `Final-year B.Eng. · Dec 2026 · Nuevo León, MX` | 103, 105 |
| `Onward ↓` | 113 |

"leverage" is the serif accent word. The hero image is
`/images/alpine-penguin-hero-v2.webp`, with a three.js snowfield over it.

---

## (01) The point — `components/Manifesto.tsx`

Eyebrow `(01) — The point` at line 40. Screen-reader heading: "About Adrián Gaona".

The paragraph itself is **data** — `manifesto` in `data.ts`:

> I'm Adrián — a computer science engineer who treats software as a lever. I build
> web platforms and AI systems that erase repetitive work, sharpen decisions, and
> give businesses their time back. Most software adds features. The work I care
> about adds momentum.

Each word brightens as you scroll through it.

---

## (02) What I do — `components/Capabilities.tsx`

Eyebrow `(02) — What I do` at line 40. Screen-reader heading: "Software
engineering capabilities". The three entries are **data** — `capabilities`:

**01 · Web Engineering** — Full-stack products that feel fast and never get in the
way. From design system to database, built to be maintained — not just launched.
`Next.js / React` · `TypeScript` · `Django / FastAPI` · `PostgreSQL` · `Design Systems`

**02 · AI Systems** — LLM agents, retrieval pipelines, and automation that actually
ships. AI applied where it compounds: removing repetitive work and sharpening
decisions.
`LLM Agents` · `RAG Pipelines` · `Claude / OpenAI APIs` · `Evals & Guardrails` · `Python`

**03 · Business Solutions** — Software in service of the P&L. Internal tools,
process automation, and analytics that give teams their hours back and make the
numbers visible.
`Process Automation` · `Internal Tools` · `Analytics & Dashboards` · `Systems Design`

---

## (03) Selected work — `components/Projects.tsx`

| Copy | Line |
|---|---|
| `(03) — Selected work` | 59 |
| `Built to actually run` — "actually" is the serif accent, "run" is outlined | 64–68 |
| `Cards marked live run the real app — launch one and use it.` | 73 |

Eleven cards, all **data** — the `projects` array. Each has `title`, `tagline`,
`description`, `year`, `role`, `stack`, `palette`, and optionally `github`,
`images`, `demo`. Card order is array order.

| # | Project | Tagline | Card shows | Source |
|---|---|---|---|---|
| 01 | Palladium | Notarial document management system | **gradient** | private |
| 02 | HowlX | Every support call, turned into intelligence | **guided demo** + gallery | [howlx](https://github.com/jadrianlg16/howlx) |
| 03 | Transcript Archive | Watch once, search forever | **guided demo** | [yt-transcripts](https://github.com/jadrianlg16/yt-transcripts) |
| 04 | Learning Tutor | A tutor that asks before it tells | **gallery** | [learning-tutor](https://github.com/jadrianlg16/learning-tutor) |
| 05 | Aurum | Every figure computed, every rule cited | **gallery** | [aurum](https://github.com/jadrianlg16/aurum) |
| 06 | Chess Analyzer | A grandmaster engine, running in your tab | **live app** | [chess-analyzer](https://github.com/jadrianlg16/chess-analyzer) |
| 07 | Financial Sim | Uber vs. new car, simulated to the peso | **live app** | [financial-sim](https://github.com/jadrianlg16/financial-sim) |
| 08 | Task Shuffler | Decision fatigue, deleted | **live app** | [task-shuffler](https://github.com/jadrianlg16/task-shuffler) |
| 09 | File Converter | 38 formats, one drop zone | walkthrough | [file-converter](https://github.com/jadrianlg16/file-converter) |
| 10 | GravityDL | A download manager with gravity | walkthrough | deliberately unpublished |
| 11 | Audiobook Studio | Paste a book, press play | walkthrough | [audiobook-studio](https://github.com/jadrianlg16/audiobook-studio) |

So: **three live apps, two guided demos, three scripted walkthroughs, two
screenshot galleries, one gradient.** `live` runs the real app in a same-origin
iframe. `guided` runs the product's own interface with its network replaced by
fixtures — real UI, sample data, labelled as such everywhere it appears. `case` renders a scripted
walkthrough from `components/demos/`, also labelled. A card with no `demo` but
with `images` shows them as an auto-advancing gallery badged "Product
screenshots"; the screenshots live in `public/images/<slug>/`.

---

## (04) How I work — `components/Principles.tsx`

Eyebrow `(04) — How I work` at line 45. Heading `Extraordinary is a habit`
(lines 55–59; "habit" is the serif accent). The four entries are **data** —
`principles`:

**01 · Discipline** — Extraordinary is not a moment — it's a practice. Show up
daily, keep the streak, do the boring reps that make the impressive things possible.

**02 · Clarity** — Order beats chaos. Clear systems, clear code, clear
communication. If it can't be explained simply, it isn't finished.

**03 · Ownership** — The whole problem, not just the ticket. Understand the
business, question the spec, and take responsibility for the outcome — not the output.

**04 · Craft** — Measure twice, ship once. From woodworking to software: the
details nobody notices are the reason everything feels right.

---

## (05) Next chapter — `components/Contact.tsx`

| Copy | Line |
|---|---|
| `(05) — Next chapter` | 41 |
| `Let's build the thing that moves the needle` — "moves" is the serif accent | 46–54 |
| Email button — renders `contact.email` | data |
| `Download résumé` → `/downloads/adrian-gaona-resume.pdf` | 78 |
| `Currently open to internships, freelance & ambitious ideas` | 87 |

---

## Footer — `components/Footer.tsx`

`Adrián Gaona.` · `{contact.location}` — currently "Nuevo León, México" · the
`contact.socials` links, **GitHub** and **LinkedIn** · `© {year} — adriangaona.dev`.
The year is computed.

---

## Project pages — `src/app/work/[slug]/page.tsx`

One page per project at `/work/<slug>`. All content comes from the same
`projects` entry. Two fields appear only here, not on the card: `demoNote`
(under a guided demo, saying what is product code and what is a fixture) and
`quotes` (the "Why it exists" section, used by Transcript Archive). The page
adds these fixed strings:

`← All work` · `Source on GitHub ↗` ·
`Open the app full screen ↗` / `Open the demo full screen ↗` ·
`Running app — not a screenshot` ·
`Interactive · runs entirely in your browser · nothing leaves the page` ·
`The real interface, without the server behind it` · `Play the demo here` ·
`From the real product` · `This one needs a server` · `Open the walkthrough →` ·
`Why it exists` · `Quoted from the archive itself · every link is timestamped` ·
`Role` · `Year` · `Built with`

The on-page demo frame (`components/ProjectDemoFrame.tsx`) adds `Run the app
here` and its explanation when it waits for a tap.

---

## Résumé

Served at `/downloads/adrian-gaona-resume.pdf`. The editable master is
`cv/Jesus_Adrian_Lopez_CV.docx` — see [`cv/README.md`](cv/README.md) for the
export-and-publish loop. Keep the filename stable; `Contact.tsx` links to it.
