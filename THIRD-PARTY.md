# Third-party software bundled in this repository

The live demos under `public/demos/` are prebuilt static bundles of other
projects (see `scripts/build-demos.mjs` and the README). Those bundles carry
third-party code that is redistributed here, most of it under permissive
licenses recorded in the individual bundles. The items below need explicit
attribution.

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

The remaining demo bundles (`financial-sim`, `tasklists`) and the site itself
use npm dependencies under MIT/ISC/Apache-2.0, with license text retained in
the built output where the upstream package included it.

---

The portfolio's own source code carries no license — all rights reserved.
