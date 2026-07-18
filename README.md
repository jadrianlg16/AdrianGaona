# adriangaona.dev

Personal portfolio with a twist: the project cards don't show screenshots —
**they run the actual apps.** Three of my side projects are compiled to static
bundles, embedded same-origin, and fully usable inside the site; the
server-dependent ones play scripted interactive walkthroughs of their real UI.

## How the live demos work

```
scripts/build-demos.mjs
  └─ for each sibling project (chess, financial-sim, tasklists):
       npm run build -- --base=/demos/<id>/     (in that project's repo)
       copy its dist/ → public/demos/<id>/
```

- The outputs in `public/demos/` are **committed**, so this repo builds and
  deploys standalone (Docker or Vercel) without the sibling repos present.
- `next.config.ts` rewrites `/demos/:id` → `/demos/:id/index.html`, because
  `public/` has no directory-index resolution.
- On a project card, `LivePreview` renders the app in a scaled-down,
  pointer-events-off iframe (lazy-mounted via IntersectionObserver) — a
  genuinely running miniature, not a video. "Launch app" opens `DemoOverlay`,
  a full-screen themed app window with the interactive iframe.
- Apps that need a real backend (File Converter, GravityDL, Audiobook Studio)
  get `components/demos/*` — self-contained scripted walkthroughs, honestly
  labeled as such.

To refresh the embeds after changing a sibling project:

```bash
node scripts/build-demos.mjs            # all
node scripts/build-demos.mjs chess      # one
```

Requirements for an embeddable app: static build, base-path-clean asset URLs
(`import.meta.env.BASE_URL`), no backend. The Task Shuffler embed is built
with `VITE_STORAGE=local` (localStorage persistence, demo seed).

## Site architecture

Next.js 15 (App Router) · Tailwind CSS 4 · GSAP + ScrollTrigger (stacked-deck
project cards, scroll scrub) · Lenis smooth scrolling · three.js particle
field · custom cursor. All content lives in `src/app/lib/data.ts` — projects,
capabilities, principles, contact — components render whatever is there.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000

npm run build && npm start     # production
# or Docker
docker build -t portfolio . && docker run --rm -p 5005:3000 portfolio
```

---

Built by Adrián Gaona — [adriangaona.dev](https://adriangaona.dev)
