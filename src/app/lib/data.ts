/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT — edit everything here, no need to touch components.
 *
 * PROJECTS: replace the placeholder entries below with your real work.
 *  - `image` is optional. Drop a file in /public/projects/ and set
 *    image: "/projects/my-shot.png" — the card will show it instead of the
 *    generated gradient visual.
 *  - `palette` drives the gradient visual + card glow when no image is set.
 * ---------------------------------------------------------------------------
 */

/**
 * Interactive demo attached to a project card.
 *  - "live": the real app, built statically and served same-origin from
 *    public/demos/<id>/ (see scripts/build-demos.mjs). Renders as a live
 *    mini-preview on the card and a fully interactive app window on launch.
 *  - "case": a scripted interactive walkthrough component (for apps that
 *    need a real backend and can't run on a static host).
 */
export type ProjectDemo =
  | { kind: "live"; src: string; /** natural render size of the embedded app */ width?: number; height?: number }
  | { kind: "case"; id: "file-converter" | "gravitydl" | "audiobook" };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  year: string;
  role: string;
  stack: string[];
  palette: [string, string];
  link?: string;
  /** public repo URL — the card shows a GitHub link when set */
  github?: string;
  image?: string;
  /**
   * Real screenshots, shown as an auto-advancing gallery in the card visual.
   * Use for apps that need a backend and so can't run as a `live` demo.
   * Takes precedence over `image`.
   */
  images?: { src: string; caption: string; width: number; height: number }[];
  demo?: ProjectDemo;
};

export const projects: Project[] = [
  {
    slug: "palladium",
    title: "Palladium",
    tagline: "Notarial document management system",
    description:
      "A digital platform for notarial offices to organize documents, manage case workflows, and keep critical client files easy to find.",
    year: "2026",
    role: "Product Engineering",
    stack: ["Document Management", "Workflow Automation", "Web Platform"],
    palette: ["#8dd1e7", "#11252c"],
  },
  {
    slug: "howlx",
    title: "HowlX",
    tagline: "Every support call, turned into intelligence",
    description:
      "Upload a customer service call and get back a transcript, a sentiment read, key topics, and coaching feedback — then watch it roll up into per-company dashboards. An AI assistant sits beside every call to answer questions and draft follow-ups. Built with a six-person team at Tecnológico de Monterrey, where it took first place at Expo Ingenierías 2025 in the Technology for Business Entrepreneurship category.",
    year: "2025",
    role: "AI Product Engineering",
    stack: [
      "Next.js 15",
      "tRPC",
      "Prisma",
      "FastAPI",
      "RAG",
      "Gemini",
      "Postgres",
    ],
    palette: ["#b48de7", "#1d112c"],
    images: [
      { src: "/images/howlx/landing.webp", caption: "Landing — silent observers, powerful insights", width: 1220, height: 880 },
      { src: "/images/howlx/home.webp", caption: "Call workspace — transcript, AI report, assistant", width: 1600, height: 680 },
      { src: "/images/howlx/dashboard.webp", caption: "Dashboard — satisfaction and call volume by company", width: 700, height: 540 },
      { src: "/images/howlx/logs.webp", caption: "Logs — searchable history with role-based access", width: 870, height: 860 },
      { src: "/images/howlx/devices.webp", caption: "AI Tools — client insight, feedback manager, deep analysis", width: 1600, height: 691 },
    ],
  },
  {
    slug: "transcript-archive",
    title: "Transcript Archive",
    tagline: "Watch once, search forever",
    description:
      "Bulk-ingests entire YouTube channels into a local SQLite archive with full-text search, then serves the whole library to an AI model over MCP so it can answer from what was actually said instead of what it remembers. Reads the channel page grid directly to get past YouTube's 15-video RSS ceiling, skips anything already archived before spending a request, and backs off when YouTube starts throttling.",
    year: "2026",
    role: "AI + Systems Engineering",
    stack: ["Python", "FastAPI", "SQLite FTS5", "MCP", "Ollama", "React", "Docker"],
    palette: ["#8d9be7", "#11152c"],
    github: "https://github.com/jadrianlg16/yt-transcripts",
  },
  {
    slug: "chess-analyzer",
    title: "Chess Analyzer",
    tagline: "A grandmaster engine, running in your tab",
    description:
      "Analysis board running Stockfish 18 as WebAssembly in a Web Worker — evaluation bar, principal variations, and move-by-move review with zero servers. The demo below is the real app; the engine is thinking in your browser right now.",
    year: "2026",
    role: "Design + Engineering",
    stack: ["React", "TypeScript", "chess.js", "Stockfish WASM", "Vite"],
    palette: ["#e78de4", "#2c112b"],
    github: "https://github.com/jadrianlg16/chess-analyzer",
    demo: { kind: "live", src: "/demos/chess/", width: 1280, height: 800 },
  },
  {
    slug: "financial-sim",
    title: "Financial Sim",
    tagline: "Uber vs. new car, simulated to the peso",
    description:
      "A decision engine that models financing, depreciation, fuel, and earnings month by month — then charts the verdict. Built to answer one real question with numbers instead of vibes. Fully client-side; this is the live app.",
    year: "2025",
    role: "Product + Engineering",
    stack: ["React", "Recharts", "Vite"],
    palette: ["#8de78d", "#112c11"],
    github: "https://github.com/jadrianlg16/financial-sim",
    demo: { kind: "live", src: "/demos/financial-sim/", width: 1280, height: 800 },
  },
  {
    slug: "task-shuffler",
    title: "Task Shuffler",
    tagline: "Decision fatigue, deleted",
    description:
      "Tell it how much time you have and it picks what you should do next — weighted shuffle across categories with time filters and an archive. Running live in your browser, persisting to localStorage.",
    year: "2026",
    role: "Design + Engineering",
    stack: ["React 19", "Zustand", "Tailwind 4", "shadcn/ui"],
    palette: ["#e7a18d", "#2c1711"],
    github: "https://github.com/jadrianlg16/task-shuffler",
    demo: { kind: "live", src: "/demos/tasklists/", width: 1280, height: 800 },
  },
  {
    slug: "file-converter",
    title: "File Converter",
    tagline: "38 formats, one drop zone",
    description:
      "Drag any document, image, ebook, dataset, or audio file and convert across five format families — Pandoc, LibreOffice, Calibre, ffmpeg, and Pillow orchestrated behind one Flask API with page-fidelity verification for Word exports.",
    year: "2026",
    role: "Systems Engineering",
    stack: ["Python", "Flask", "Pandoc", "LibreOffice", "ffmpeg", "Docker"],
    palette: ["#e78db0", "#2c111b"],
    github: "https://github.com/jadrianlg16/file-converter",
    demo: { kind: "case", id: "file-converter" },
  },
  {
    slug: "gravitydl",
    title: "GravityDL",
    tagline: "A download manager with gravity",
    description:
      "Queue-based YouTube downloader: paste a link, pick format and quality, watch live progress stream in over SSE, and browse an offline library backed by SQLite. Express + yt-dlp doing the heavy lifting.",
    year: "2026",
    role: "Full-stack Engineering",
    stack: ["Node.js", "Express", "yt-dlp", "SQLite", "SSE"],
    palette: ["#e7d58d", "#2c2711"],
    demo: { kind: "case", id: "gravitydl" },
  },
  {
    slug: "audiobook-studio",
    title: "Audiobook Studio",
    tagline: "Paste a book, press play",
    description:
      "A pipeline that turns raw text into a genre-aware, multi-voice audiobook with word-level read-along highlighting — character voices assigned automatically, narration rendered by pluggable TTS engines.",
    year: "2025",
    role: "AI + Audio Engineering",
    stack: ["Python", "Kokoro TTS", "FastAPI", "Docker Compose", "React"],
    palette: ["#c3e78d", "#212c11"],
    demo: { kind: "case", id: "audiobook" },
  },
];

export const capabilities = [
  {
    index: "01",
    title: "Web Engineering",
    description:
      "Full-stack products that feel fast and never get in the way. From design system to database, built to be maintained — not just launched.",
    items: ["Next.js / React", "TypeScript", "Django / FastAPI", "PostgreSQL", "Design Systems"],
  },
  {
    index: "02",
    title: "AI Systems",
    description:
      "LLM agents, retrieval pipelines, and automation that actually ships. AI applied where it compounds: removing repetitive work and sharpening decisions.",
    items: ["LLM Agents", "RAG Pipelines", "Claude / OpenAI APIs", "Evals & Guardrails", "Python"],
  },
  {
    index: "03",
    title: "Business Solutions",
    description:
      "Software in service of the P&L. Internal tools, process automation, and analytics that give teams their hours back and make the numbers visible.",
    items: ["Process Automation", "Internal Tools", "Analytics & Dashboards", "Systems Design"],
  },
];

export const principles = [
  {
    index: "01",
    title: "Discipline",
    text: "Extraordinary is not a moment — it's a practice. Show up daily, keep the streak, do the boring reps that make the impressive things possible.",
  },
  {
    index: "02",
    title: "Clarity",
    text: "Order beats chaos. Clear systems, clear code, clear communication. If it can't be explained simply, it isn't finished.",
  },
  {
    index: "03",
    title: "Ownership",
    text: "The whole problem, not just the ticket. Understand the business, question the spec, and take responsibility for the outcome — not the output.",
  },
  {
    index: "04",
    title: "Craft",
    text: "Measure twice, ship once. From woodworking to software: the details nobody notices are the reason everything feels right.",
  },
];

export const manifesto =
  "I'm Adrián — a computer science engineer who treats software as a lever. I build web platforms and AI systems that erase repetitive work, sharpen decisions, and give businesses their time back. Most software adds features. The work I care about adds momentum.";

export const contact = {
  email: "jesus@adriangaona.dev",
  location: "Nuevo León, México",
  socials: [
    { label: "GitHub", href: "https://github.com/jadrianlg16" },
  ],
};

