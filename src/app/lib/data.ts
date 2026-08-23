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
 *  - "guided": the real interface of an app that needs a server, built from
 *    that app's own components with its network replaced by fixtures. It runs
 *    for real — every click works — but the data is sample data and nothing
 *    is being computed, so it is labelled differently from "live" everywhere
 *    it appears. A scripted tour plays through it until the visitor takes over.
 *  - "case": a scripted interactive walkthrough component (for apps whose
 *    interface can't be lifted out of their backend at all).
 */
export type ProjectDemo =
  | { kind: "live"; src: string; /** natural render size of the embedded app */ width?: number; height?: number }
  | { kind: "guided"; src: string; width?: number; height?: number }
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
  /**
   * What a `guided` demo really is, in this project's own terms — which parts are
   * the product's code and which are fixtures. Shown under the frame, because the
   * frame is convincing enough that not saying it would be a claim.
   */
  demoNote?: string;
  /**
   * Why the project exists, in someone else's words. Quoted from a primary source
   * with a deep link back to it — short, attributed, and never the whole argument.
   */
  quotes?: {
    text: string;
    speaker: string;
    source: string;
    /** Deep link, timestamped where the source is a video. */
    url: string;
    /** What this project does about it. */
    point: string;
  }[];
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
      "Upload a support call — audio, or a Zoom or Teams recording — and get back a diarized transcript and a structured report: summary, coaching feedback, key topics, emotions, risk words, a 0–5 agent rating and a 0–10 satisfaction score, each one a validated field rather than free text. Those scores roll up into per-company dashboards, and an assistant answers questions grounded in that call's report and full transcript. Built with a six-person team at Tecnológico de Monterrey, where it took first place at Expo Ingenierías 2025; I then rebuilt it to run from a single docker compose on any of six LLM providers — or entirely offline, with local Whisper, when the audio can't leave the building.",
    year: "2025 — 2026",
    role: "AI Product Engineering",
    stack: [
      "Next.js 15",
      "tRPC",
      "Prisma",
      "FastAPI",
      "Postgres",
      "RAG",
      "MCP",
      "Docker",
    ],
    palette: ["#b48de7", "#1d112c"],
    github: "https://github.com/jadrianlg16/howlx",
    demo: { kind: "guided", src: "/demos/howlx/", width: 1280, height: 800 },
    demoNote:
      "This is built from the application's own components — the same navigation bar, call list, report panel and assistant the product renders — with tRPC, authentication and the analysis API swapped for fixtures. Every click works and the tour drives it for real; what it cannot do is think. No model runs, no call is transcribed, and the call it shows was written for this page.",
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
      "Bulk-ingests entire YouTube channels into a local SQLite archive, then answers questions from it — by keyword, by meaning, or through an AI model connected over MCP that reads what was actually said instead of recalling what it once saw. It follows channels and checks them twice a day at an unpredictable hour, keeps the video files so the record outlives the upload, and can transcribe with Whisper when YouTube publishes no captions — keeping both versions rather than overwriting one with the other. A hundred and thirty videos, half a million words, all on one machine.",
    year: "2026",
    role: "AI + Systems Engineering",
    stack: [
      "Python",
      "FastAPI",
      "SQLite FTS5",
      "sqlite-vec",
      "MCP",
      "Ollama",
      "Whisper",
      "React",
      "Docker",
    ],
    palette: ["#8d9be7", "#11152c"],
    github: "https://github.com/jadrianlg16/yt-transcripts",
    demo: { kind: "guided", src: "/demos/transcript-archive/", width: 1280, height: 800 },
    demoNote:
      "This is the archive's own screen — the same library list, search, topic model, digest and transcript pane the running product renders — with one module swapped: the HTTP client answers from a captured snapshot instead of the backend. Every click works. What it cannot do is reach YouTube, so pressing Fetch fails on purpose and says why. The titles, topics, weekly counts and failures are all real, taken from the running archive; the transcript excerpts are quoted from Nate B Jones with a link back to the video.",
    quotes: [
      {
        text: "The problem is not a shortage of information. The problem is a shortage of signal.",
        speaker: "Nate B Jones",
        source: "I Watched 3 Companies Lay Off Their Managers",
        url: "https://youtu.be/zhXgkQ3nYeE?t=234",
        point:
          "Full-text search across every transcript at once, then the passage — not the video.",
      },
      {
        text: "Memory isn't there to save the conversation … memory is an act of active curation.",
        speaker: "Nate B Jones",
        source: "The Missing Orchestration Layer Destroying Teams Right Now",
        url: "https://youtu.be/7HP1jFJ9W1c?t=525",
        point:
          "An archive you shape — follow a channel, keep what matters, drop what doesn't — not a chat history that grows until it's useless.",
      },
      {
        text: "You need to write to infrastructure you manage.",
        speaker: "Nate B Jones",
        source: "Anthropic And OpenAI Are Fighting Over Your Memory",
        url: "https://youtu.be/4KAF72BTyCE?t=1276",
        point:
          "One SQLite file and a Docker compose on your own machine. No account, no API key, nothing leaves the box.",
      },
      {
        text: "Without domain memory, every agent session ends up reinventing a definition of done.",
        speaker: "Nate B Jones",
        source: "Karpathy's Agent Ran 700 Experiments While He Slept",
        url: "https://youtu.be/xnG8h3UnNFI?t=822",
        point:
          "Twelve read-only MCP tools, so the model you already use can answer from the archive instead of guessing.",
      },
    ],
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

