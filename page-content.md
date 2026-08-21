> **Historical snapshot — not the current site.**
>
> This file documents an earlier version of the portfolio (components such as
> `HeroSection.tsx` and `Header.tsx` no longer exist, and the copy below has been
> superseded). It is kept for reference only. The live content lives in
> `src/app/lib/data.ts`; the architecture is described in `README.md`.

# Page Content — Jesús Adrián López Gaona Portfolio

---

## Metadata (layout.tsx)

- **Page Title:** Jesús Adrián López Gaona - Full-Stack Engineer & AI Developer
- **Description:** Computer Science student and multidisciplinary engineer with 5+ years building full-stack applications, AI-powered automation, and secure enterprise systems.
- **Keywords:** Full-Stack Developer, AI Engineer, Python, React, Django, Machine Learning, Nuevo León, Mexico
- **Author:** Jesús Adrián López Gaona
- **Site URL:** https://adriangaona.dev

---

## Header (Header.tsx)

- **Logo / Brand text:** `Jesús Adrián`
- **Nav buttons (desktop & mobile menu):**
  - `home`
  - `about`
  - `projects`
  - `skills`
  - `contact`
- **Mobile:** Hamburger icon (☰) toggles a dropdown with the same nav buttons

---

## Section 1 — Hero (HeroSection.tsx)

- **Section id:** `home`
- **Eyebrow text:** `Hello, I'm`
- **H1:** `Jesús Adrián`
- **H2 / tagline:** `Full-Stack Engineer & AI Developer`
- **Body paragraph:**
  > Computer Science student and multidisciplinary engineer with 5+ years building full-stack applications, AI-powered automation, and secure enterprise systems. Passionate about merging business intelligence with cutting-edge technology.
- **Social icon links:**
  - GitHub → `https://github.com/jadrianlg16`
  - LinkedIn → `#`
  - Email → `mailto:jesus@adriangaona.dev`
- **Scroll-down button:** animated chevron → scrolls to `#about`

---

## Section 2 — About (AboutSection.tsx)

- **Section id:** `about`
- **H2:** `About Me`
- **Photo alt text:** `Jesús Adrián López García`
- **H3:** `Who am I?`
- **Paragraph 1:**
  > I'm a multidisciplinary engineer, accountant, and entrepreneur from Nuevo León, Mexico, with five years of hands-on experience crafting full-stack web applications, AI-powered automation pipelines, and secure back-office systems. Currently pursuing Computer Science at Tecnológico de Monterrey with a 93 average.
- **Paragraph 2:**
  > I thrive in fast-moving, ambiguity-heavy environments and enjoy leading projects end-to-end: from ideation to architecture to deployment. When I'm not coding, you'll find me training for my next half marathon, planning my artisanal panadería, or exploring new cities through immersive cultural experiences.

### Highlight Cards

| Card | Title | Body text |
|------|-------|-----------|
| 💻 | Full-Stack Development | React, Django, FastAPI, and modern cloud architectures |
| 🧠 | AI & Automation | LangChain, RAG pipelines, and on-premises LLM deployments |
| 👥 | Business Leadership | Project management, stakeholder comms, and team coordination |

---

## Section 3 — Projects (ProjectsSection.tsx)

- **Section id:** `projects`
- **H2:** `Featured Projects`
- **Intro paragraph:**
  > A selection of projects spanning enterprise software, AI applications, and innovative solutions. From academic collaborations to individual ventures, each represents unique technical challenges and real-world problem solving.

### Filter Buttons (category tabs)

- `All Projects`
- `Enterprise Software`
- `AI Application`
- `Desktop Application`
- `Mobile Application`
- `IoT Project`
- `Gamification`

### Project Cards

#### 1. HowlX: AI-Powered Customer Service Platform
- **Category:** AI Application
- **Description:** Comprehensive AI-powered platform transforming customer service call recordings into actionable business intelligence. Features automated transcription with OpenAI Whisper, sentiment analysis, risk detection, RAG-based intelligent chat system, and comprehensive analytics dashboard with role-based access control for administrators, supervisors, and consultants.
- **Technologies:** `React` · `Python` · `OpenAI Whisper` · `GPT-4` · `RAG` · `Redis` · `PostgreSQL`
- **Links:** Demo `#` · GitHub `#` *(both placeholders)*

#### 2. Palladium Document Management System
- **Category:** Enterprise Software
- **Description:** Secure, scalable local DMS with ACL permissions, OCR pipeline, and vector search capabilities. Features Docker deployment and industry-grade document handling.
- **Technologies:** `Django` · `React` · `PostgreSQL` · `Apache Solr` · `Docker`
- **Links:** Demo `#` · GitHub `#` *(placeholders)*

#### 3. AI Web Agency Platform
- **Category:** AI Application
- **Description:** Automated platform that crawls SMB websites, analyzes performance metrics, and generates modernized mockups with AI-powered sales outreach.
- **Technologies:** `Next.js` · `Django` · `PostgreSQL` · `OpenAI GPT-4` · `Playwright`
- **Links:** Demo `#` · GitHub `#` *(placeholders)*

#### 4. AI Transcription & Processing Tool
- **Category:** Desktop Application
- **Description:** Python desktop app with Whisper AI for audio transcription, meeting summaries, and interactive Q&A using both cloud and on-premises LLMs.
- **Technologies:** `Python` · `Tkinter` · `OpenAI API` · `Whisper AI` · `LM Studio`
- **Links:** Demo `#` · GitHub `#` *(placeholders)*

#### 5. YConecta iOS App
- **Category:** Mobile Application
- **Description:** iOS prototype connecting individuals with NGOs, facilitating communication and support with companion web platform for updates and feedback.
- **Technologies:** `Swift` · `Flask` · `MongoDB` · `iOS Development`
- **Links:** Demo `#` · GitHub `#` *(placeholders)*

#### 6. Smart Stop IoT System
- **Category:** IoT Project
- **Description:** Intelligent bus stop prototype with automated weather-responsive features to enhance passenger experience and optimize transportation efficiency.
- **Technologies:** `NodeMCU` · `MySQL` · `JavaScript` · `PHP` · `Fusion 360`
- **Links:** Demo `#` · GitHub `#` *(placeholders)*

#### 7. Industrial Safety Training Platform
- **Category:** Gamification
- **Description:** Gamified 2D simulation and web application for Regal Rexnord to improve employee safety training with analytics and user management.
- **Technologies:** `Unity` · `Django` · `React` · `MySQL` · `Game Development`
- **Links:** Demo `#` · GitHub `#` *(placeholders)*

### CTA Button
- **Text:** `View All Projects on GitHub`
- **URL:** `https://github.com/jadrianlg16`

---

## Section 4 — Skills (SkillsSection.tsx)

- **Section id:** `skills`
- **H2:** `Technical Skills`
- **Intro paragraph:**
  > Five years of hands-on experience across full-stack development, AI/ML systems, and enterprise automation. Continuously learning and adapting to new technologies.

### Skill Bars (by category)

| Category | Skill | Level |
|----------|-------|-------|
| Programming | Python | 95% |
| Programming | TypeScript/JavaScript | 90% |
| Frontend | React/Next.js | 88% |
| Backend | Django/FastAPI | 85% |
| Database | PostgreSQL/MongoDB | 82% |
| DevOps | Docker/Kubernetes | 80% |
| AI/ML | LangChain/OpenAI | 85% |
| Search | Apache Solr/Elasticsearch | 78% |
| DevOps | Git/GitHub Actions | 88% |
| Mobile | Swift/iOS Development | 75% |
| Specialized | Unity/Game Development | 70% |
| Domain | Financial Systems | 85% |

### Core Technologies (tag cloud)
`Python` `TypeScript` `JavaScript` `Swift` `C++` `HTML/CSS` `React` `Next.js` `Django` `FastAPI` `Flask` `Unity` `PostgreSQL` `MongoDB` `MySQL` `Apache Solr` `Elasticsearch` `Docker` `GitHub Actions` `OCI` `AWS`

### AI & Automation Stack (tag cloud)
`LangChain` `LangGraph` `OpenAI API` `Whisper AI` `LM Studio` `PyTorch` `Transformers` `FAISS` `Pinecone` `RAG Pipelines` `Vector Databases` `Prompt Engineering` `Fine-tuning` `OCR` `Computer Vision` `NLP`

### Professional Expertise Cards

| Card | Title | Body |
|------|-------|------|
| 🖥️ | Full-Stack Development | End-to-end application development from conception to deployment |
| 🤖 | AI/ML Integration | LLM deployment, RAG systems, and intelligent automation |
| 🏢 | Enterprise Systems | Secure, scalable solutions for business-critical applications |

---

## Section 5 — Contact (ContactSection.tsx)

- **Section id:** `contact`
- **H2:** `Get In Touch`
- **Intro paragraph:**
  > Interested in collaborating on a project or discussing opportunities? I'm always excited to work on innovative solutions that make a real impact.

### Contact Form — "Send Me a Message"

| Field | Label | Placeholder |
|-------|-------|-------------|
| Text input | Name | `Your Name` |
| Email input | Email | `your.email@example.com` |
| Text input | Subject | `Project Inquiry / Collaboration` |
| Textarea (5 rows) | Message | `Tell me about your project or opportunity...` |
| Submit button | — | `Send Message` (+ send icon) |

### Contact Information Panel

- **H3:** `Contact Information`
- **Intro text:** Currently based in Nuevo León, Mexico, with native-level English and Spanish fluency. Open to remote work and relocation opportunities worldwide.
- **Email:** `jesus@adriangaona.dev` / `jadrianlg16@gmail.com`
- **Phone:** `+1 (210) 636-1040`
- **Location:** Nuevo León, Mexico · *Remote & relocation friendly*

### Social Links
- GitHub → `#`
- LinkedIn → `#`
- Email Me → `mailto:jesus@adriangaona.dev`

### Status blurbs
- Available for remote work
- Currently training for SF Half Marathon
- Computer Science @ Tecnológico de Monterrey

---

## Footer (Footer.tsx)

- **Brand text:** `Jesús Adrián López Gaona`
- **Tagline:** `Building innovative solutions with AI and full-stack expertise.`
- **Footer nav links:** `home` · `about` · `projects` · `skills` · `contact`
- **Copyright:** `© 2025 Jesús Adrián López Gaona. All rights reserved.`
- **Sub-line:** `Computer Science Student @ Tecnológico de Monterrey • Nuevo León, Mexico`
- **Scroll-to-top button:** ↑ arrow icon

---

## Notes / Placeholders to Fix

- GitHub link in Hero & Projects CTA → `https://github.com/jadrianlg16`
- LinkedIn link in Hero & Contact → `#`
- GitHub link in Contact → `#`
- All project demo/github links → `#` *(all placeholders)*
- All project images except HowlX use the same `howlx-intro.png` image *(need individual screenshots)*
