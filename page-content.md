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
| Site URL | `https://adriangaona.dev` |
| Locale | `en_US` |
| Theme colour | `#071015` |

Also carries the `Person` JSON-LD: name, `alternateName` "Adrián Gaona", job title
"Software Engineer", Nuevo León / MX, the `/images/pfp.webp` avatar, and `sameAs`.

> `sameAs` currently lists **only GitHub**. A LinkedIn URL belongs here — it is how
> a search engine merges scattered profiles into one entity.

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
| `Engineering` / `leverage.` — the H1, split across two animated lines | 72, 77 |
| `Web platforms and AI systems that turn busywork into momentum.` | 86 |
| `Available for work — Nuevo León, MX` | 93 |
| `Onward ↓` | 99 |

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

> The `Evals & Guardrails` chip is the only claim on the site with nothing behind
> it anywhere — no project names an eval, a metric, a test set or an injection.
> Either back it or drop it.

---

## (03) Selected work — `components/Projects.tsx`

| Copy | Line |
|---|---|
| `(03) — Selected work` | 58 |
| `Built to move numbers` — "move" is the serif accent, "numbers" is outlined | 61–62 |
| `Cards marked live run the real app — launch one and use it.` | 69 |

> The section is called "Built to move numbers" and contains no numbers. No user
> counts, hours saved, latency, cost or throughput on any of the nine projects.

Nine cards, all **data** — the `projects` array. Each has `title`, `tagline`,
`description`, `year`, `role`, `stack`, `palette`, and optionally `github`,
`link`, `images`, `demo`. Card order is array order.

| # | Project | Tagline | Card shows | Source |
|---|---|---|---|---|
| 01 | Palladium | Notarial document management system | **gradient** | private |
| 02 | HowlX | Every support call, turned into intelligence | screenshot gallery | private |
| 03 | Transcript Archive | Watch once, search forever | **gradient** | [yt-transcripts](https://github.com/jadrianlg16/yt-transcripts) |
| 04 | Chess Analyzer | A grandmaster engine, running in your tab | **live app** | [chess-analyzer](https://github.com/jadrianlg16/chess-analyzer) |
| 05 | Financial Sim | Uber vs. new car, simulated to the peso | **live app** | [financial-sim](https://github.com/jadrianlg16/financial-sim) |
| 06 | Task Shuffler | Decision fatigue, deleted | **live app** | [task-shuffler](https://github.com/jadrianlg16/task-shuffler) |
| 07 | File Converter | 38 formats, one drop zone | walkthrough | [file-converter](https://github.com/jadrianlg16/file-converter) |
| 08 | GravityDL | A download manager with gravity | walkthrough | deliberately unpublished |
| 09 | Audiobook Studio | Paste a book, press play | walkthrough | private |

So: **three live apps, three scripted walkthroughs, one gallery, two gradients.**
`live` runs the real app in a same-origin iframe. `case` renders a scripted
walkthrough from `components/demos/`, labelled as such on the page.

> **Two cards render a bare gradient, not one.** Palladium is the known gap. The
> other is Transcript Archive — which has a public repo *and* the most technically
> convincing description on the site, and still shows nothing. It is a local
> FastAPI/SQLite tool so it cannot embed, but a screenshot gallery like HowlX's
> would cost an afternoon and it sits at card 03, high in the deck.

---

## (04) How I work — `components/Principles.tsx`

Eyebrow `(04) — How I work` at line 45. Heading `Extraordinary is a habit`
(lines 50–54; "habit" is the serif accent). The four entries are **data** —
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

> This line is the only statement of seniority on the site, and it is the last
> thing before the footer. Everything above it reads as a working professional,
> and the hero says "Available for work". A reader who gets to the bottom has
> already formed the wrong impression.

---

## Footer — `components/Footer.tsx`

`Adrián Gaona.` · `{contact.location}` — currently "Nuevo León, México" · the
`contact.socials` list · `© {year} — adriangaona.dev`. The year is computed.

---

## Project pages — `src/app/work/[slug]/page.tsx`

One page per project at `/work/<slug>`. All content comes from the same
`projects` entry; the page adds only these fixed strings:

`← All work` · `Source on GitHub ↗` · `Visit the live site ↗` ·
`Open the app full screen ↗` · `Running app — not a screenshot` ·
`Interactive · runs entirely in your browser · nothing leaves the page` ·
`From the real product` · `This one needs a server` · `Open the walkthrough →` ·
`Role` · `Year` · `Built with`

> These pages currently add nothing a reader didn't already get from the card.
> The routing, metadata, structured data and share cards are in place; the
> writing is not.

---

## Résumé

Served at `/downloads/adrian-gaona-resume.pdf`. The editable master is
`cv/Jesus_Adrian_Lopez_CV.docx` — see [`cv/README.md`](cv/README.md) for the
export-and-publish loop. Keep the filename stable; `Contact.tsx` links to it.
