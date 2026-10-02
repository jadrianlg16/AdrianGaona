# Third-party software bundled in this repository

The live demos under `public/demos/` are prebuilt static bundles of other
projects (see `scripts/build-demos.mjs` and the README). Those bundles carry
third-party code that is redistributed here, most of it under permissive
licenses recorded in the individual bundles. The items below need explicit
attribution.

## Transcript excerpts — Nate B Jones and Nate Herk

`public/demos/transcript-archive/` ships a snapshot of a personal research
archive: the titles, channel names and short caption excerpts of sixteen videos
by two YouTube creators, used to show what the archive's interface does with a
transcript. In total that is about 90 seconds of one video and six lines each
from fifteen others:

- **Nate B Jones** (*AI News & Strategy Daily*): about 90 seconds of one video,
  which is the demo's featured transcript, and six lines each from five others.
- **Nate Herk** (*Nate Herk | AI Automation*): six lines each from ten videos.

How the sources are credited:

- In the demo's library list, every video shows its title and channel name.
  Opening a video shows its channel and a link to the source video on YouTube,
  and each transcript line links to that moment in the video.
- The demo's footer bar names Nate B Jones and links the featured video. It
  does not name Nate Herk, whose videos are credited only through the channel
  name and source link above.
- The Transcript Archive project page on the site quotes four short passages
  from Nate B Jones, each with a timestamped link back.

These are quotations for illustration and commentary, not a republication of the
work. Every excerpt links to its original video. If a rights holder would rather
they were not here, remove `src/fixtures/archive.json` from the demo project and
rebuild — the interface runs the same on any archive.

## Stockfish 18 — GPL-3.0-or-later

`public/demos/chess/vendor/stockfish/` contains:

- `stockfish-18-lite-single.js`
- `stockfish-18-lite-single.wasm`

These are **unmodified** upstream WebAssembly builds of the Stockfish chess
engine, redistributed under the GNU General Public License version 3. The full
license text is at
[`public/demos/chess/vendor/stockfish/LICENSE`](public/demos/chess/vendor/stockfish/LICENSE).

- Upstream source: <https://github.com/official-stockfish/Stockfish>
- WASM build source: <https://github.com/lichess-org/stockfish.wasm>

Per GPL-3.0 §6, the corresponding source for these binaries is available from
the upstream repositories above. No modifications were made to the engine.

Stockfish runs as a separate Web Worker and communicates with the Chess
Analyzer demo over UCI text messages. It is aggregated with, not linked into,
the rest of this repository's code.

## Chess Analyzer demo

`public/demos/chess/` also bundles [chess.js](https://github.com/jhlywa/chess.js)
(BSD-2-Clause), whose license header is preserved inside the built asset.

## Everything else

The remaining demo bundles (`financial-sim`, `tasklists`, `howlx`,
`transcript-archive`) are built from npm packages under permissive licenses
such as MIT and ISC (React, lucide-react), with license text retained in the
built output where the upstream package included it. The `howlx` bundle also
ships the Alexandria typeface, which is licensed under the SIL Open Font
License 1.1.

The site itself installs its dependencies from npm at build time; they are not
committed here. Most are MIT-licensed. GSAP and `@gsap/react` are distributed
under GSAP's own no-charge
[Standard License](https://gsap.com/standard-license).

---

The portfolio's own source code carries no license — all rights reserved.
