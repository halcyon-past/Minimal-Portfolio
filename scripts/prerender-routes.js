import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects, galleryImages } from '../src/data/portfolioData.js';
import { listMarkdownRoutes, renderMarkdownRoute, renderCatalogMarkdown } from '../src/lib/md/registry.js';
import { generateLlmsTxt, generateLlmsFullTxt, generateAiTxt } from '../src/lib/md/llms.js';
import { SITE_URL, AUTHOR, CONTACT_EMAIL } from '../src/lib/siteConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const publicDir = path.resolve(__dirname, '../public');

const personGraphNode = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  "name": AUTHOR.name,
  "alternateName": AUTHOR.alternateName,
  "url": `${SITE_URL}/`,
  "image": `${SITE_URL}/aritro-saha.webp`,
  "jobTitle": AUTHOR.jobTitle,
  "description": AUTHOR.description,
  "disambiguatingDescription": AUTHOR.disambiguatingDescription,
  "worksFor": {
    "@type": "Organization",
    "name": AUTHOR.worksFor.name,
    "alternateName": AUTHOR.worksFor.alternateName,
    "url": AUTHOR.worksFor.url
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": AUTHOR.alumniOf.name,
    "alternateName": AUTHOR.alumniOf.alternateName
  },
  "award": AUTHOR.award,
  "hasOccupation": [
    {
      "@type": "Occupation",
      "name": "Software Engineer 1"
    },
    {
      "@type": "Occupation",
      "name": "Open-Source Creator & Software Author"
    }
  ],
  "creator": [
    {
      "@type": "SoftwareApplication",
      "name": "Byakugan Scan",
      "url": "https://byakugan-scan.aritro.cloud"
    },
    {
      "@type": "SoftwareApplication",
      "name": "SutraKey",
      "url": "https://sutrakey.aritro.cloud"
    },
    {
      "@type": "SoftwareSourceCode",
      "name": "Quarantine Python",
      "url": "https://pypi.org/project/quarantine-py/"
    }
  ],
  "knowsAbout": [
    "Software Engineering",
    "Data Science Engineering",
    "Full-Stack Web Development",
    "Python",
    "TypeScript",
    "Swift",
    "React",
    "Next.js",
    "Databricks",
    "Google Cloud Platform",
    "macOS Development",
    "Apple Vision Framework",
    "Artificial Intelligence"
  ],
  "sameAs": [
    "https://scholar.google.com/citations?user=oMN6u4UAAAAJ",
    "https://www.wikidata.org/wiki/Q141715213",
    "https://www.wikidata.org/entity/Q141715213",
    "https://orcid.org/0009-0007-0861-3978",
    "https://linkedin.com/in/aritro-saha",
    "https://github.com/halcyon-past",
    "https://github.com/halcyon-past/aritrosaha",
    "https://news.ycombinator.com/user?id=halcyon-past",
    "https://dev.to/halcyonpast",
    "https://pypi.org/project/quarantine-py/",
    "https://leetcode.com/u/AritroSaha/",
    "https://www.youtube.com/@veripyed",
    "https://instagram.com/halcyon-past",
    "https://siliconsync.aritro.cloud/",
    "https://openworld.aritro.cloud/",
    "https://byakugan-scan.aritro.cloud/",
    "https://sutrakey.aritro.cloud/",
    "https://alternativeto.net/software/byakugan-scan/about/",
    "https://alternativeto.net/software/sutrakey/about/",
    "https://www.producthunt.com/@halcyon_past",
    "https://www.producthunt.com/products/byakugan-scan",
    "https://www.producthunt.com/products/sutrakey",
    "https://quarantine-py.aritro.cloud/",
    "https://structurify.aritro.cloud/",
    "https://onepiece.aritro.cloud/",
    "https://ijirt.org/article?manuscript=180711"
  ]
};

const organizationGraphNode = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "Aritro Saha Portfolio",
  "url": `${SITE_URL}/`,
  "logo": `${SITE_URL}/logo.webp`,
  "sameAs": [
    "https://github.com/halcyon-past",
    "https://linkedin.com/in/aritro-saha",
    "https://www.wikidata.org/wiki/Q141715213"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": CONTACT_EMAIL,
    "contactType": "developer"
  }
};

const authorImageGraphNode = {
  "@type": "ImageObject",
  "@id": `${SITE_URL}/#author-image`,
  "url": `${SITE_URL}/aritro-saha.webp`,
  "contentUrl": `${SITE_URL}/aritro-saha.webp`,
  "name": "Aritro Saha Headshot",
  "caption": "Aritro Saha — Software Engineer 1 at Bristol Myers Squibb & Open-Source Creator",
  "width": 400,
  "height": 400
};

const STATIC_ROUTES = [
  {
    route: '/aritrosaha',
    title: 'Aritro Saha (aritrosaha) | Software Engineer & Creator',
    description: 'Verified portfolio of Aritro Saha (aritrosaha). Software Engineer 1 at Bristol Myers Squibb, Hack4Bengal 3.0 winner, and creator of Byakugan Scan & SutraKey.',
    image: `${SITE_URL}/aritro-saha.webp`,
    articleHtml: `
      <header>
        <h1>Aritro Saha (aritrosaha) — Software Engineer & Open-Source Creator</h1>
        <figure style="margin: 1.5rem 0;">
          <img src="${SITE_URL}/aritro-saha.webp" alt="Aritro Saha — Software Engineer 1 at Bristol Myers Squibb & Open-Source Creator" width="400" height="400" style="border-radius: 1rem; max-width: 200px; height: auto;" />
          <figcaption style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">Aritro Saha (aritrosaha) — Software Engineer & Open-Source Developer</figcaption>
        </figure>
      </header>
      <main>
        <article>
          <div style="background: rgba(59, 130, 246, 0.08); border-left: 4px solid #3b82f6; padding: 1rem; margin-bottom: 1.5rem; border-radius: 0.25rem;">
            <strong>Entity &amp; Name Disambiguation Notice:</strong> This profile represents <strong>Aritro Saha</strong> (Bengali: অরিত্র সাহা), Software Engineer 1 at Bristol Myers Squibb and open-source creator based in India. His official English name is spelled <em>Aritro Saha</em> (distinct from the transliteration <em>Aritra Saha</em>) and he is distinct from <em>Aritro Saha</em>, Director of Product Design at Eightfold AI.
          </div>
          <h2>Identity & Overview</h2>
          <p>Aritro Saha (commonly known online as aritrosaha and halcyon-past) is a Software Engineer 1 at Bristol Myers Squibb specializing in high-throughput enterprise data pipelines, cloud architecture, native macOS utilities, and interactive web systems.</p>
          <h2>Key Accolades & Leadership</h2>
          <ul>
            <li><strong>Hack4Bengal 3.0 Grand Champion</strong> — Team Lead & 1st Place Winner out of 3,000+ applicants (PAWsitive animal healthcare triage).</li>
            <li><strong>LeetCode Knight</strong> — Peak rating 1868 (Top 6% globally), 630+ algorithmic solutions.</li>
            <li><strong>Published First Author</strong> — IJIRT research on low-latency multimodal computer vision interfaces (Paper ID: 180711).</li>
            <li><strong>Upstream Core Contributor</strong> — Kestra (kestra-io/plugin-jdbc v2.2.0, DuckDB file capture engine).</li>
          </ul>
          <h2>Featured Works</h2>
          <ul>
            <li><a href="${SITE_URL}/projects/byakugan-scan">Byakugan Scan</a> — Instant in-memory screen OCR, QR, and barcode scanner for macOS (Swift 6.0, Apple Vision Framework).</li>
            <li><a href="${SITE_URL}/projects/sutrakey">SutraKey</a> — Shift + Select liquid radial menu for instant media & clean document actions on macOS.</li>
            <li><a href="${SITE_URL}/projects/openworld-portfolio">OpenWorld Portfolio</a> — 2.5D retro Pokémon-style developer world in Pallet Cloud.</li>
            <li><a href="${SITE_URL}/projects/quarantine">Quarantine (quarantine-py)</a> — Fault-tolerant Python error isolation & dead-letter queue decorator on PyPI.</li>
          </ul>
          <h2>Career & Education</h2>
          <ul>
            <li><strong>Software Engineer 1, Bristol Myers Squibb</strong> (July 2025 – Present)</li>
            <li><strong>Data Science Intern, Bajaj Finserv Health</strong> (Feb 2025 – June 2025)</li>
            <li><strong>Full Stack Developer Intern, Wipro</strong> (Oct 2023 – Dec 2023)</li>
            <li><strong>B.Tech in Electronics & Computer Engineering</strong> — Vellore Institute of Technology, Chennai (2025)</li>
            <li><strong>High School</strong> — Birla Bharati, Kolkata (2021)</li>
          </ul>
        </article>
      </main>
    `
  },
  {
    route: '/resume',
    title: 'Resume | Aritro Saha — Software Engineer 1 at Bristol Myers Squibb',
    description: 'Official resume of Aritro Saha, Software Engineer 1 at Bristol Myers Squibb. Enterprise data pipelines, cloud architecture, native macOS utilities, and AI.',
    image: `${SITE_URL}/aritro-saha.webp`,
    articleHtml: `
      <header>
        <h1>Aritro Saha (Megh) — Software Engineer 1 Resume</h1>
        <p>Software Engineer 1 at Bristol Myers Squibb specializing in high-throughput data engineering, cloud systems, native macOS utilities, and applied AI.</p>
        <p style="margin: 1rem 0;">
          <a href="/assets/resume/Aritro-Saha-Software-Engineer-Resume.pdf" download="Aritro-Saha-Software-Engineer-Resume.pdf" style="display: inline-block; padding: 0.75rem 1.5rem; background: #7c3aed; color: #ffffff; text-decoration: none; border-radius: 0.5rem; font-weight: 600;">Download Official PDF Resume</a>
        </p>
      </header>
      <main>
        <article>
          <h2>Professional Experience</h2>
          <ul>
            <li><strong>Software Engineer 1, Bristol Myers Squibb</strong> (July 2025 – Present): Enterprise software engineering, scalable cloud architecture, workflow automation, and high-throughput data science pipelines.</li>
            <li><strong>Data Science Intern, Bajaj Finserv Health</strong> (Feb 2025 – June 2025): Machine learning models, healthcare analytics data pipelines, and predictive risk scoring algorithms.</li>
            <li><strong>Full Stack Developer Intern, Wipro</strong> (Oct 2023 – Dec 2023): Full-stack web applications, REST APIs, and automated UI workflows.</li>
          </ul>
          <h2>Education & Academic Foundation</h2>
          <ul>
            <li><strong>B.Tech in Electronics and Computer Engineering</strong> — Vellore Institute of Technology, Chennai (2025)</li>
            <li><strong>High School</strong> — Birla Bharati, Kolkata (2021)</li>
          </ul>
          <h2>Key Accolades & Leadership</h2>
          <ul>
            <li><strong>Hack4Bengal 3.0 Grand Champion</strong> — Team Lead & 1st Place Winner out of 5,000+ applicants (PAWsitive animal healthcare triage).</li>
            <li><strong>LeetCode Knight</strong> — Peak rating 1868 (Top 6% globally), 630+ algorithmic solutions solved.</li>
            <li><strong>Published First Author</strong> — IJIRT research on low-latency multimodal computer vision interfaces (Paper ID: 180711).</li>
            <li><strong>Upstream Core Contributor</strong> — Kestra (kestra-io/plugin-jdbc v2.2.0, DuckDB file capture engine).</li>
          </ul>
          <h2>Core Technical Competencies</h2>
          <ul>
            <li><strong>Languages:</strong> Python (AsyncIO, FastMCP, Pytest), TypeScript, JavaScript (ESM, React 19, Next.js), Swift 6.0 (AppKit, SwiftUI), SQL</li>
            <li><strong>Cloud & Distributed Systems:</strong> Databricks, Apache Spark, Google Cloud Platform (Cloud Run, Pub/Sub), Firebase / Firestore, MongoDB</li>
            <li><strong>System & Native Engineering:</strong> Apple Neural Engine, Apple Vision Framework, CGEventTap, macOS Menu Bar daemons, WebAssembly</li>
            <li><strong>AI & Machine Learning:</strong> Google Gemini API, MediaPipe CV, LangGraph, Retrieval-Augmented Generation (RAG)</li>
          </ul>
        </article>
      </main>
    `,
    extraJsonLdNodes: []
  },
  {
    route: '/about',
    title: 'About Aritro Saha | Software Engineer 1 at Bristol Myers Squibb',
    description: 'Learn about Aritro Saha (Megh), a Software Engineer 1 at Bristol Myers Squibb, VIT Chennai graduate, and Winner of Hack4Bengal 3.0.',
    image: `${SITE_URL}/aritro-saha.webp`,
    articleHtml: `
      <header>
        <h1>About Aritro Saha — Software Engineer 1 at Bristol Myers Squibb</h1>
        <figure style="margin: 1.5rem 0;">
          <img src="${SITE_URL}/aritro-saha.webp" alt="Aritro Saha — Software Engineer 1 at Bristol Myers Squibb" width="400" height="400" style="border-radius: 1rem; max-width: 200px; height: auto;" />
          <figcaption style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">Aritro Saha (Megh) — Software Engineer 1</figcaption>
        </figure>
      </header>
      <main>
        <article>
          <h2>Biography</h2>
          <p>I am a Software Engineer 1 at Bristol Myers Squibb with a focus on data science engineering and full-stack development. I build scalable backend services and user interfaces driven by reliable data pipelines.</p>
          <p>I won Hack4Bengal 3.0—Eastern India's largest hackathon—leading development under tight constraints. Whether architecting event-driven systems or building interactive web games, I focus on shipping software that is resilient, accessible, and fast.</p>
          <h2>Professional Experience</h2>
          <ul>
            <li><strong>Software Engineer 1, Bristol Myers Squibb</strong> (July 2025 – Present)</li>
            <li><strong>Data Science Intern, Bajaj Finserv Health</strong> (Feb 2025 – June 2025)</li>
            <li><strong>Full Stack Developer Intern, Wipro</strong> (Oct 2023 – Dec 2023)</li>
          </ul>
          <h2>Education</h2>
          <ul>
            <li><strong>B.Tech in Electronics and Computer Engineering</strong> — Vellore Institute of Technology, Chennai (2025)</li>
            <li><strong>High School</strong> — Birla Bharati (2021)</li>
          </ul>
        </article>
      </main>
    `
  },
  {
    route: '/gallery',
    title: 'Gallery | Aritro Saha - Software Engineer Portfolio',
    description: 'Explore personal moments, hackathons, events, and projects associated with Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>Engineering & Hackathon Gallery — Aritro Saha</h1>
        <p>Visual highlights from Hack4Bengal 3.0, VIT Chennai tech showcases, engineering workspaces, and developer conferences.</p>
      </header>
      <main>
        <article>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            ${galleryImages.map((img) => `
              <figure style="margin: 0; background: rgba(0,0,0,0.03); border-radius: 0.75rem; overflow: hidden; padding: 0.5rem;">
                <img src="${SITE_URL}${img.src}" alt="${escapeHtml(img.alt)}" loading="lazy" width="600" height="400" style="width: 100%; height: auto; border-radius: 0.5rem; object-fit: cover;" />
                <figcaption style="font-size: 0.875rem; color: #6b7280; padding: 0.5rem 0.25rem 0;">${escapeHtml(img.alt)}</figcaption>
              </figure>
            `).join('\n')}
          </div>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": "ImageGallery",
        "@id": `${SITE_URL}/gallery#gallery`,
        "name": "Aritro Saha Engineering & Hackathon Gallery",
        "description": "Visual highlights from Hack4Bengal 3.0, tech conferences, and software development milestones.",
        "author": { "@id": `${SITE_URL}/#person` },
        "image": galleryImages.map((img) => `${SITE_URL}${img.src}`)
      }
    ]
  },
  {
    route: '/play',
    title: 'The Arcade | Aritro Saha - Developer Games',
    description: 'A collection of minimalist, developer-themed games built directly into Aritro Saha\'s portfolio.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>The Developer Arcade by Aritro Saha</h1>
        <p>A native collection of interactive browser mini-games engineered in React 19 with Framer Motion, requestAnimationFrame canvas loops, and custom sound effects.</p>
      </header>
      <main>
        <article>
          <h2>Interactive Game Catalog</h2>
          <ul>
            <li><a href="${SITE_URL}/play/typing-test">Developer Speed Test</a> — Terminal-style WPM typing speed test with programming language syntax and accuracy tracking.</li>
            <li><a href="${SITE_URL}/play/data-pipeline">Data Pipeline Puzzle</a> — Connect data source nodes to sink endpoints without crossing stream paths. Features level persistence and URL parameters.</li>
            <li><a href="${SITE_URL}/play/snake">Minimalist Snake</a> — Classic Snake collecting tech stack icons with custom mobile touch D-Pad support.</li>
            <li><a href="${SITE_URL}/play/sudoku">Sudoku</a> — Full 9x9 logic puzzle with conflict validation, difficulty modes, and state persistence.</li>
            <li><a href="${SITE_URL}/play/space-invaders">Space Invaders</a> — Defend production infrastructure from incoming software bugs and merge conflicts.</li>
            <li><a href="${SITE_URL}/play/flappy-bird">Flappy Bird</a> — Physics-driven obstacle navigation arcade game with responsive controls.</li>
            <li><a href="${SITE_URL}/play/tictactoe">Tic Tac Toe</a> — Challenge an unbeatable Minimax decision-tree AI agent.</li>
          </ul>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/play#game-list`,
        "name": "Developer Arcade Games Catalog",
        "description": "Collection of interactive developer browser games built in React by Aritro Saha.",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "url": `${SITE_URL}/play/typing-test`, "name": "Developer Speed Test" },
          { "@type": "ListItem", "position": 2, "url": `${SITE_URL}/play/data-pipeline`, "name": "Data Pipeline Puzzle" },
          { "@type": "ListItem", "position": 3, "url": `${SITE_URL}/play/snake`, "name": "Minimalist Snake" },
          { "@type": "ListItem", "position": 4, "url": `${SITE_URL}/play/sudoku`, "name": "Sudoku" },
          { "@type": "ListItem", "position": 5, "url": `${SITE_URL}/play/space-invaders`, "name": "Space Invaders" },
          { "@type": "ListItem", "position": 6, "url": `${SITE_URL}/play/flappy-bird`, "name": "Flappy Bird" },
          { "@type": "ListItem", "position": 7, "url": `${SITE_URL}/play/tictactoe`, "name": "Tic Tac Toe" }
        ]
      }
    ]
  },
  {
    route: '/play/typing-test',
    title: 'Developer Speed Test | Aritro Saha Arcade',
    description: 'Test your coding typing speed with this minimalist terminal-style speed test game by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>Developer Speed Test — Aritro Saha Arcade</h1>
        <p>A minimalist terminal-style typing speed test designed for software developers to test coding cadence, Words Per Minute (WPM), and key accuracy.</p>
      </header>
      <main>
        <article>
          <h2>Game Mechanics & Overview</h2>
          <p>The Developer Speed Test evaluates real-time typing speed and accuracy using curated programming language keywords from Python, TypeScript, React, Go, and SQL rather than arbitrary prose. As you type, the engine evaluates keystroke accuracy, calculating raw WPM, net WPM, and accuracy percentage in real-time.</p>
          <h2>Controls & Instructions</h2>
          <ul>
            <li><strong>Typing:</strong> Type the highlighted code keyword as it appears on the terminal screen.</li>
            <li><strong>Spacebar:</strong> Submit current word and advance to the next token.</li>
            <li><strong>Restart:</strong> Click Restart or hit <code>Tab + Enter</code> to initiate a fresh session.</li>
          </ul>
          <h2>Technical Architecture</h2>
          <p>Built with React state management, fine-grained keyboard event listeners, and accurate delta timing to measure true keystroke cadence without main-thread latency.</p>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": ["VideoGame", "WebApplication"],
        "@id": `${SITE_URL}/play/typing-test#game`,
        "name": "Developer Speed Test",
        "description": "Minimalist terminal-style typing speed test measuring WPM and accuracy on top programming keywords.",
        "gamePlatform": "Web Browser",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any modern web browser",
        "playMode": "SinglePlayer",
        "author": { "@id": `${SITE_URL}/#person` }
      }
    ]
  },
  {
    route: '/play/data-pipeline',
    title: 'Data Pipeline Puzzle | Aritro Saha Arcade',
    description: 'Connect the nodes to build a data pipeline without crossing lines. A logic puzzle for data science engineers by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>Data Pipeline Puzzle — Aritro Saha Arcade</h1>
        <p>A logic puzzle game for data engineers where you rotate pipeline segments to connect data sources to analytical sinks without pipeline deadlocks.</p>
      </header>
      <main>
        <article>
          <h2>Game Mechanics & Rules</h2>
          <p>Inspired by enterprise streaming architectures (Kafka, Pub/Sub, Databricks), players are presented with a matrix of pipe connectors. Rotate pipe segments to establish an unbroken stream connection from source nodes to output sinks before the stream buffer overflows.</p>
          <h2>Features & Level Persistence</h2>
          <ul>
            <li><strong>Level Progression:</strong> Progressively challenging grid layouts with branching streams.</li>
            <li><strong>URL Parameters:</strong> Direct level access supported via <code>?level=N</code> URL parameters.</li>
            <li><strong>State Saving:</strong> Solved levels and progress are stored in localStorage.</li>
          </ul>
          <h2>Controls</h2>
          <p>Click or tap any pipe tile to rotate it 90 degrees clockwise. Complete the circuit to trigger the data flow animation.</p>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": ["VideoGame", "WebApplication"],
        "@id": `${SITE_URL}/play/data-pipeline#game`,
        "name": "Data Pipeline Puzzle",
        "description": "Logic puzzle game where players connect streaming nodes to build data pipelines.",
        "gamePlatform": "Web Browser",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any modern web browser",
        "playMode": "SinglePlayer",
        "author": { "@id": `${SITE_URL}/#person` }
      }
    ]
  },
  {
    route: '/play/snake',
    title: 'Minimalist Snake | Aritro Saha Arcade',
    description: 'Play the classic Snake game collecting tech stack icons on an infinite grid, built by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>Minimalist Snake — Aritro Saha Arcade</h1>
        <p>A developer edition of the classic Snake arcade game featuring smooth 60fps canvas rendering, tech stack food tokens, and full mobile touch controls.</p>
      </header>
      <main>
        <article>
          <h2>Game Rules & Mechanics</h2>
          <p>Navigate the snake across an infinite grid collecting tech stack icons (Python, React, TypeScript). Each consumed icon increases length and score. Eating the bonus AI icon (<code>🤖</code>) grants multiplier points. Crashing into the arena boundary or your own tail ends the run.</p>
          <h2>Controls & Mobile D-Pad</h2>
          <ul>
            <li><strong>Desktop:</strong> Use Arrow Keys or <code>W, A, S, D</code> to steer the snake. Press <code>Space</code> to pause.</li>
            <li><strong>Mobile:</strong> Features an integrated virtual touch D-Pad with directional haptic cues.</li>
          </ul>
          <h2>Technical Architecture</h2>
          <p>Engineered using an HTML5 Canvas 2D render loop powered by <code>requestAnimationFrame</code> with discrete coordinate collision checks for zero input latency.</p>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": ["VideoGame", "WebApplication"],
        "@id": `${SITE_URL}/play/snake#game`,
        "name": "Minimalist Snake — Developer Edition",
        "description": "Classic Snake browser arcade game collecting tech stack tokens with mobile touch controls.",
        "gamePlatform": "Web Browser",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any modern web browser",
        "playMode": "SinglePlayer",
        "author": { "@id": `${SITE_URL}/#person` }
      }
    ]
  },
  {
    route: '/play/sudoku',
    title: 'Sudoku | Aritro Saha Arcade',
    description: 'Play classic Sudoku right inside your browser at Aritro Saha\'s Developer Arcade.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>Sudoku — Aritro Saha Arcade</h1>
        <p>A logic-based 9x9 number-placement puzzle built natively in React with conflict detection, note-taking, and responsive input.</p>
      </header>
      <main>
        <article>
          <h2>Game Objective & Rules</h2>
          <p>Fill the 9x9 grid so that every row, every column, and each of the nine 3x3 subgrids contains all digits from 1 to 9 without repetition. The game validates board state automatically and highlights conflicting cells.</p>
          <h2>Features & Player Tools</h2>
          <ul>
            <li><strong>Candidate Notes:</strong> Toggle pencil mode to record candidate digits in candidate cells.</li>
            <li><strong>Error Highlighting:</strong> Instantly detect duplicate digits in colliding rows, columns, or subgrids.</li>
            <li><strong>Auto-Save:</strong> Game state and timer automatically persist across browser refreshes.</li>
          </ul>
          <h2>Controls</h2>
          <p>Click any cell and use the on-screen numeric keypad or physical keyboard numbers <code>1-9</code>. Use Backspace or Delete to clear a cell.</p>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": ["VideoGame", "WebApplication"],
        "@id": `${SITE_URL}/play/sudoku#game`,
        "name": "Sudoku Logic Puzzle",
        "description": "Classic 9x9 number placement puzzle with candidate notes and conflict detection.",
        "gamePlatform": "Web Browser",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any modern web browser",
        "playMode": "SinglePlayer",
        "author": { "@id": `${SITE_URL}/#person` }
      }
    ]
  },
  {
    route: '/play/space-invaders',
    title: 'Space Invaders | Aritro Saha Arcade',
    description: 'Defend your codebase from incoming bugs in this retro shooter by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>Space Invaders — Aritro Saha Arcade</h1>
        <p>A retro arcade space shooter where you pilot a defender spaceship to protect production servers from descending software bugs.</p>
      </header>
      <main>
        <article>
          <h2>Gameplay & Rules</h2>
          <p>Waves of bugs and merge conflicts descend toward your server cluster. Blast incoming bugs while dodging enemy projectiles and utilizing defensive server shields that absorb incoming fire. As waves clear, enemy march velocity increases.</p>
          <h2>Controls</h2>
          <ul>
            <li><strong>Desktop:</strong> Use <code>Left / Right Arrow</code> or <code>A / D</code> to navigate ship. Press <code>Spacebar</code> to fire laser cannon.</li>
            <li><strong>Mobile:</strong> Dedicated on-screen touch buttons for directional maneuvering and laser firing.</li>
          </ul>
          <h2>Technical Architecture</h2>
          <p>Sprite animation and projectile collision detection computed using a 60fps canvas loop with bounding box intersection algorithms.</p>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": ["VideoGame", "WebApplication"],
        "@id": `${SITE_URL}/play/space-invaders#game`,
        "name": "Space Invaders — Production Bug Defense",
        "description": "Retro arcade space shooter defending production servers from software bugs.",
        "gamePlatform": "Web Browser",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any modern web browser",
        "playMode": "SinglePlayer",
        "author": { "@id": `${SITE_URL}/#person` }
      }
    ]
  },
  {
    route: '/play/flappy-bird',
    title: 'Flappy Bird | Aritro Saha Arcade',
    description: 'Navigate the bird through the pipes in Aritro Saha\'s Developer Arcade.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>Flappy Bird — Aritro Saha Arcade</h1>
        <p>A minimalist obstacle-navigation game engineered with realistic gravitational acceleration and collision detection.</p>
      </header>
      <main>
        <article>
          <h2>Game Mechanics</h2>
          <p>Guide the bird through narrow pipe gaps by timing flap impulses. Gravity constantly pulls the bird downward, requiring precise rhythmic tapping to sustain altitude without colliding with pipes or the ground.</p>
          <h2>Controls</h2>
          <ul>
            <li><strong>Desktop:</strong> Press <code>Spacebar</code> or click anywhere with mouse to flap wings.</li>
            <li><strong>Mobile:</strong> Tap anywhere on touch screen to execute upward flap impulse.</li>
          </ul>
          <h2>Highscore Persistence</h2>
          <p>Personal best scores are tracked in localStorage, allowing players to benchmark their reaction time and endurance over time.</p>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": ["VideoGame", "WebApplication"],
        "@id": `${SITE_URL}/play/flappy-bird#game`,
        "name": "Flappy Bird Arcade",
        "description": "Physics-driven single-tap obstacle navigation arcade game.",
        "gamePlatform": "Web Browser",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any modern web browser",
        "playMode": "SinglePlayer",
        "author": { "@id": `${SITE_URL}/#person` }
      }
    ]
  },
  {
    route: '/play/tictactoe',
    title: 'Tic Tac Toe | Aritro Saha Arcade',
    description: 'Play against a Minimax AI in this minimalist classic by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>Tic Tac Toe (Minimax AI) — Aritro Saha Arcade</h1>
        <p>Challenge an unbeatable algorithmic artificial intelligence in classic 3x3 Tic Tac Toe powered by the Minimax decision tree algorithm.</p>
      </header>
      <main>
        <article>
          <h2>Game Overview & AI Decision Engine</h2>
          <p>This implementation features a recursive Minimax search tree that evaluates all future board states to depth 9. At hard difficulty, the AI plays mathematically optimal moves with alpha-beta pruning, guaranteeing either an AI victory or a forced draw.</p>
          <h2>Difficulty Settings</h2>
          <ul>
            <li><strong>Easy:</strong> Random heuristic moves for relaxed play.</li>
            <li><strong>Medium:</strong> Heuristic blocking with occasional exploratory moves.</li>
            <li><strong>Hard (Unbeatable):</strong> Pure Minimax recursion evaluating all possible board branches.</li>
          </ul>
          <h2>Controls</h2>
          <p>Click or tap any available cell to place your X token. The AI responds within milliseconds.</p>
        </article>
      </main>
    `,
    extraJsonLdNodes: [
      {
        "@type": ["VideoGame", "WebApplication"],
        "@id": `${SITE_URL}/play/tictactoe#game`,
        "name": "Tic Tac Toe — Minimax AI",
        "description": "Tic Tac Toe with an unbeatable Minimax algorithm decision tree artificial intelligence.",
        "gamePlatform": "Web Browser",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any modern web browser",
        "playMode": "SinglePlayer",
        "author": { "@id": `${SITE_URL}/#person` }
      }
    ]
  }
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildRouteHtml(template, { route, title, description, image, articleHtml, extraJsonLdNodes = [] }) {
  const canonicalUrl = `${SITE_URL}${route}`;
  const markdownUrl = `${SITE_URL}${route === '/' ? '/index.md' : `${route}.md`}`;
  const escapedTitle = escapeHtml(title);
  const escapedDesc = escapeHtml(description);
  const escapedImage = escapeHtml(image);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personGraphNode,
      organizationGraphNode,
      authorImageGraphNode,
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "description": description,
        "author": { "@id": `${SITE_URL}/#person` },
        "primaryImageOfPage": { "@id": `${SITE_URL}/#author-image` }
      },
      ...extraJsonLdNodes
    ]
  };

  let html = template;

  // Replace <title>
  html = html.replace(
    /<title[^>]*>.*?<\/title>/s,
    `<title data-rh="true">${escapedTitle}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta data-rh="true" name="description" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" name="description" content="${escapedDesc}" />`
  );

  // Replace ai-summary
  html = html.replace(
    /<meta name="ai-summary" content="[^"]*"\s*\/>/,
    `<meta name="ai-summary" content="${escapedDesc}" />`
  );

  // Replace canonical link
  html = html.replace(
    /<link data-rh="true" rel="canonical" href="[^"]*"\s*\/>/,
    `<link data-rh="true" rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace alternate markdown link
  html = html.replace(
    /<link rel="alternate" type="text\/markdown" href="[^"]*"\s*title="[^"]*"\s*\/>/,
    `<link rel="alternate" type="text/markdown" href="${markdownUrl}" title="Markdown Version" />`
  );

  // Replace OG & Twitter tags
  html = html.replace(
    /<meta data-rh="true" property="og:url" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta data-rh="true" property="og:title" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" property="og:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta data-rh="true" property="og:description" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" property="og:description" content="${escapedDesc}" />`
  );
  html = html.replace(
    /<meta data-rh="true" property="og:image" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" property="og:image" content="${escapedImage}" />`
  );
  html = html.replace(
    /<meta data-rh="true" name="twitter:url" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" name="twitter:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta data-rh="true" name="twitter:title" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" name="twitter:title" content="${escapedTitle}" />`
  );
  html = html.replace(
    /<meta data-rh="true" name="twitter:description" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" name="twitter:description" content="${escapedDesc}" />`
  );
  html = html.replace(
    /<meta data-rh="true" name="twitter:image" content="[^"]*"\s*\/>/,
    `<meta data-rh="true" name="twitter:image" content="${escapedImage}" />`
  );

  // Replace static JSON-LD script
  html = html.replace(
    /<script id="static-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script id="static-json-ld" type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`
  );

  // Replace inner static fallback inside #root
  html = html.replace(
    /(<div id="root">\s*<div[^>]*>)[\s\S]*?(<\/div>\s*<\/div>)/,
    `$1\n${articleHtml}\n      $2`
  );

  return html;
}

function run() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(indexHtmlPath, 'utf-8');
  let generatedCount = 0;

  // 1. Generate static HTML pages for all Projects
  for (const project of projects) {
    const route = `/projects/${project.id}`;
    const title = `${project.title} | Projects by Aritro Saha`;
    const rawDesc = project.description || project.details?.overview || '';
    const description = rawDesc.length > 158 ? `${rawDesc.slice(0, 155).trim()}...` : rawDesc;
    const image = `${SITE_URL}${project.image}`;

    const featuresList = (project.details?.features || [])
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join('\n            ');
    const techList = (project.details?.techStack || [])
      .map((t) => `<li>${escapeHtml(t)}</li>`)
      .join('\n            ');

    const linksList = [
      project.github ? `<li><a href="${project.github}">GitHub Repository</a></li>` : '',
      project.details?.liveDemo ? `<li><a href="${project.details.liveDemo}">Live Website / Package</a></li>` : '',
      project.details?.docs ? `<li><a href="${project.details.docs}">Documentation</a></li>` : '',
      project.details?.researchPaper ? `<li><a href="${project.details.researchPaper}">Published Research Paper</a></li>` : ''
    ].filter(Boolean).join('\n            ');

    const articleHtml = `
        <header>
          <h1>${escapeHtml(project.title)} — by Aritro Saha</h1>
          <p>${escapeHtml(project.description)}</p>
        </header>
        <main>
          <article>
            <h2>Overview</h2>
            <p>${escapeHtml(project.details?.overview || project.description)}</p>
            <h2>Key Features</h2>
            <ul>
            ${featuresList}
            </ul>
            <h2>Tech Stack</h2>
            <ul>
            ${techList}
            </ul>
            <h2>Links</h2>
            <ul>
            ${linksList}
            </ul>
          </article>
        </main>`;

    const softwareNode = {
      "@type": ["SoftwareSourceCode", "SoftwareApplication"],
      "@id": `${SITE_URL}${route}#software`,
      "name": project.title,
      "description": project.details?.overview || project.description,
      "url": `${SITE_URL}${route}`,
      "codeRepository": project.github,
      "programmingLanguage": project.details?.techStack || [],
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": project.title.includes("macOS") || project.title.includes("Byakugan") || project.title.includes("SutraKey") ? "macOS" : "Web Browser",
      "author": { "@id": `${SITE_URL}/#person` }
    };

    const breadcrumbNode = {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}${route}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${SITE_URL}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Projects",
          "item": `${SITE_URL}/#projects`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": project.title,
          "item": `${SITE_URL}${route}`
        }
      ]
    };

    const extraNodes = [softwareNode, breadcrumbNode];
    if (project.id === 'glide-connect') {
      extraNodes.push({
        "@type": "ScholarlyArticle",
        "@id": `${SITE_URL}${route}#research-paper`,
        "headline": "KrishnaVision: A Multimodal Virtual Interface Combining MediaPipe-Hands Optimization and Gemini AI for Context-Aware HCI",
        "name": "KrishnaVision: A Multimodal Virtual Interface Combining MediaPipe-Hands Optimization and Gemini AI for Context-Aware HCI",
        "author": [
          { "@id": `${SITE_URL}/#person` },
          { "@type": "Person", "name": "Rupkatha De" }
        ],
        "datePublished": "2025-06",
        "isPartOf": {
          "@type": "PublicationIssue",
          "issueNumber": "1",
          "volumeNumber": "12",
          "isPartOf": {
            "@type": "Periodical",
            "name": "International Journal of Innovative Research in Technology (IJIRT)",
            "issn": "2349-6002"
          }
        },
        "publisher": {
          "@type": "Organization",
          "name": "International Journal of Innovative Research in Technology (IJIRT)"
        },
        "sameAs": "https://ijirt.org/article?manuscript=180711"
      });
    }

    const routeHtml = buildRouteHtml(template, {
      route,
      title,
      description,
      image,
      articleHtml,
      extraJsonLdNodes: extraNodes
    });

    const outDir = path.join(distDir, 'projects', project.id);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), routeHtml, 'utf-8');
    generatedCount++;
  }

  // 2. Generate static HTML pages for core & arcade routes
  for (const page of STATIC_ROUTES) {
    const routeHtml = buildRouteHtml(template, page);
    const outDir = path.join(distDir, page.route.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), routeHtml, 'utf-8');
    generatedCount++;
  }

  // Generate static dist/404.html for true HTTP 404 responses from Vercel
  const notFoundPage = {
    route: '/404',
    title: '404 - Page Not Found | Aritro Saha',
    description: 'The requested page could not be found. Explore Aritro Saha\'s portfolio, projects, resume, and interactive developer arcade.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header><h1>404 — Page Not Found</h1></header>
      <main><article><p>The page you requested could not be found. Return to the <a href="${SITE_URL}/">homepage</a>, view <a href="${SITE_URL}/aritrosaha">Aritro Saha's profile</a>, or explore <a href="${SITE_URL}/projects/byakugan-scan">projects</a>.</p></article></main>
    `
  };
  let notFoundHtml = buildRouteHtml(template, notFoundPage);
  notFoundHtml = notFoundHtml.replace(
    /<meta name="robots"[^>]*\/>/,
    '<meta name="robots" content="noindex, follow" />'
  );
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  console.log(`✅ Pre-rendered ${generatedCount} static HTML routes + 404.html for web scrapers & bots.`);

  // 3. Pre-render all markdown (.md) documents to dist
  const markdownRoutes = listMarkdownRoutes();
  let mdCount = 0;

  for (const route of markdownRoutes) {
    const rendered = renderMarkdownRoute(route.path);
    if (rendered.status === 200 && rendered.body) {
      const relPath = route.mdPath.replace(/^\//, '');
      const fullPath = path.join(distDir, relPath);
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, rendered.body, 'utf-8');
      mdCount++;
    }
  }

  // Pre-render root index.md as well
  const homeRendered = renderMarkdownRoute('/');
  if (homeRendered.status === 200 && homeRendered.body) {
    fs.writeFileSync(path.join(distDir, 'index.md'), homeRendered.body, 'utf-8');
  }

  // Write catalog to dist/api/md/_catalog
  const catalogBody = renderCatalogMarkdown();
  const catalogDir = path.join(distDir, 'api', 'md');
  fs.mkdirSync(catalogDir, { recursive: true });
  fs.writeFileSync(path.join(catalogDir, '_catalog'), catalogBody, 'utf-8');
  fs.writeFileSync(path.join(catalogDir, '_catalog.md'), catalogBody, 'utf-8');

  console.log(`✅ Pre-rendered ${mdCount} markdown (.md) pages and API catalog to dist.`);

  // 4. Generate fresh llms.txt, llms-full.txt, and ai.txt
  const llmsTxt = generateLlmsTxt();
  const llmsFullTxt = generateLlmsFullTxt();
  const aiTxt = generateAiTxt();

  // Write to public/ so git and dev mode have them
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'ai.txt'), aiTxt, 'utf-8');

  // Write to dist/ as well
  fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'ai.txt'), aiTxt, 'utf-8');

  console.log(`✅ Generated updated llms.txt, llms-full.txt, and ai.txt.`);
}

async function main() {
  run();
  try {
    const { pingIndexNow } = await import('./ping-indexnow.js');
    await pingIndexNow();
  } catch (err) {
    console.warn('IndexNow notification skipped:', err.message);
  }
}

main();
