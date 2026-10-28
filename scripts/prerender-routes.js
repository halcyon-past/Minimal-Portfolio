import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-swift.js';
import 'prismjs/components/prism-python.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-json.js';
import 'prismjs/components/prism-yaml.js';
import { projects, galleryImages } from '../src/data/portfolioData.js';
import { blogPosts } from '../src/data/blogData.js';
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
    },
    {
      "@type": "WebApplication",
      "name": "SiliconSync",
      "description": "Real-time AI-generated technology news intelligence engine and aggregator",
      "url": "https://siliconsync.aritro.cloud/"
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
    pageType: 'ProfilePage',
    extraJsonLdNodes: [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/aritrosaha#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Verified Dossier", "item": `${SITE_URL}/aritrosaha` }
        ]
      }
    ],
    articleHtml: `
      <header>
        <h1>Aritro Saha (aritrosaha) — Software Engineer & Open-Source Creator</h1>
        <figure style="margin: 1.5rem 0;">
          <picture>
            <source srcset="${SITE_URL}/aritro-saha.avif" type="image/avif" />
            <img src="${SITE_URL}/aritro-saha.webp" alt="Aritro Saha — Software Engineer 1 at Bristol Myers Squibb & Open-Source Creator" width="400" height="400" fetchpriority="high" style="border-radius: 1rem; max-width: 200px; height: auto;" />
          </picture>
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
    pageType: 'WebPage',
    extraJsonLdNodes: [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/resume#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Resume", "item": `${SITE_URL}/resume` }
        ]
      }
    ],
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
    `
  },
  {
    route: '/about',
    title: 'About Aritro Saha | Software Engineer 1 at Bristol Myers Squibb',
    description: 'Learn about Aritro Saha (Megh), a Software Engineer 1 at Bristol Myers Squibb, VIT Chennai graduate, and Winner of Hack4Bengal 3.0.',
    image: `${SITE_URL}/aritro-saha.webp`,
    pageType: 'AboutPage',
    extraJsonLdNodes: [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/about#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "About", "item": `${SITE_URL}/about` }
        ]
      }
    ],
    articleHtml: `
      <header>
        <h1>About Aritro Saha — Software Engineer 1 at Bristol Myers Squibb</h1>
        <figure style="margin: 1.5rem 0;">
          <picture>
            <source srcset="${SITE_URL}/aritro-saha.avif" type="image/avif" />
            <img src="${SITE_URL}/aritro-saha.webp" alt="Aritro Saha — Software Engineer 1 at Bristol Myers Squibb" width="400" height="400" fetchpriority="high" style="border-radius: 1rem; max-width: 200px; height: auto;" />
          </picture>
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
    pageType: 'ImageGallery',
    articleHtml: `
      <header>
        <h1>Engineering & Hackathon Gallery — Aritro Saha</h1>
        <p>Visual highlights from Hack4Bengal 3.0, VIT Chennai tech showcases, engineering workspaces, and developer conferences.</p>
      </header>
      <main>
        <article>
          <h2>Hackathon Champions & Engineering Moments</h2>
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/gallery#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Gallery", "item": `${SITE_URL}/gallery` }
        ]
      }
    ]
  },
  {
    route: '/play',
    title: 'The Arcade | Aritro Saha - Developer Games',
    description: 'A collection of minimalist, developer-themed games built directly into Aritro Saha\'s portfolio.',
    image: `${SITE_URL}/banner-social.jpg`,
    pageType: 'CollectionPage',
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/play#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` }
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/play/typing-test#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` },
          { "@type": "ListItem", "position": 3, "name": "Developer Speed Test", "item": `${SITE_URL}/play/typing-test` }
        ]
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/play/data-pipeline#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` },
          { "@type": "ListItem", "position": 3, "name": "Data Pipeline Puzzle", "item": `${SITE_URL}/play/data-pipeline` }
        ]
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/play/snake#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` },
          { "@type": "ListItem", "position": 3, "name": "Minimalist Snake", "item": `${SITE_URL}/play/snake` }
        ]
      }
    ]
  },
  {
    route: '/play/sudoku',
    title: 'Sudoku | Aritro Saha Arcade',
    description: 'Play minimalist, ad-free Sudoku online in your browser. Features 3 difficulty levels, pencil notes, real-time error checking, and keyboard shortcuts.',
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/play/sudoku#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` },
          { "@type": "ListItem", "position": 3, "name": "Sudoku", "item": `${SITE_URL}/play/sudoku` }
        ]
      }
    ]
  },
  {
    route: '/play/space-invaders',
    title: 'Space Invaders | Aritro Saha Arcade',
    description: 'Defend production servers from descending bugs in this retro space shooter. Features 60fps HTML5 canvas rendering, shields, and mobile touch controls.',
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/play/space-invaders#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` },
          { "@type": "ListItem", "position": 3, "name": "Space Invaders", "item": `${SITE_URL}/play/space-invaders` }
        ]
      }
    ]
  },
  {
    route: '/play/flappy-bird',
    title: 'Flappy Bird | Aritro Saha Arcade',
    description: 'Navigate the bird through narrow pipe obstacles in this retro arcade classic. Features realistic gravitational physics, mobile touch tap, and high scores.',
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/play/flappy-bird#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` },
          { "@type": "ListItem", "position": 3, "name": "Flappy Bird", "item": `${SITE_URL}/play/flappy-bird` }
        ]
      }
    ]
  },
  {
    route: '/play/tictactoe',
    title: 'Tic Tac Toe | Aritro Saha Arcade',
    description: 'Challenge an unbeatable Minimax AI in classic 3x3 Tic Tac Toe. Features 3 difficulty levels, alpha-beta pruning, move analysis, and touch input.',
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
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/play/tictactoe#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
          { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` },
          { "@type": "ListItem", "position": 3, "name": "Tic Tac Toe", "item": `${SITE_URL}/play/tictactoe` }
        ]
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

function highlightStaticCode(code, language) {
  const cleanLang = (language || 'text').toLowerCase();
  const langMap = {
    js: 'javascript',
    py: 'python',
    sh: 'bash',
    shell: 'bash',
    zsh: 'bash',
    html: 'markup',
    xml: 'markup',
    svg: 'markup',
    yml: 'yaml'
  };
  const targetLang = langMap[cleanLang] || cleanLang;
  const grammar = Prism.languages[targetLang] || Prism.languages.markup || Prism.languages.text;
  if (grammar) {
    try {
      return Prism.highlight(code.trim(), grammar, targetLang);
    } catch {
      // fallback
    }
  }
  return escapeHtml(code.trim());
}

function formatInlineStaticText(text) {
  if (!text) return '';
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part) => {
    if (!part) return '';
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return `<a href="${escapeHtml(url)}" style="color: #8367c7; text-decoration: underline;">${escapeHtml(label)}</a>`;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const code = part.slice(1, -1);
      return `<code style="padding: 0.15rem 0.4rem; border-radius: 0.25rem; background: rgba(131, 103, 199, 0.12); color: #8367c7; border: 1px solid rgba(131, 103, 199, 0.25); font-family: ui-monospace, monospace; font-size: 0.875em; font-weight: 500;">${escapeHtml(code)}</code>`;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const inner = part.slice(2, -2);
      return `<strong>${formatInlineStaticText(inner)}</strong>`;
    }
    return escapeHtml(part);
  }).join('');
}

function renderStaticMarkdownContent(content) {
  if (!content) return '';
  const parts = content.split(/(```[a-z0-9_-]*\n[\s\S]*?```)/gi);
  return parts.map((part) => {
    const trimmed = part.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('```') && trimmed.endsWith('```')) {
      const match = trimmed.match(/^```([a-z0-9_-]*)\n([\s\S]*?)```$/i);
      const lang = (match && match[1]) ? match[1].toLowerCase() : 'text';
      const code = match ? match[2] : trimmed.slice(3, -3);
      const highlighted = highlightStaticCode(code, lang);
      return `
            <div class="code-block" style="margin: 1.5rem 0; background: #0d1117; border: 1px solid #30363d; border-radius: 0.75rem; overflow: hidden; text-align: left;">
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 1rem; background: #161b22; border-bottom: 1px solid #30363d; color: #8b949e; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #ff5f56;"></span>
                  <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #ffbd2e;"></span>
                  <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #27c93f;"></span>
                  <span style="margin-left: 0.5rem; color: #c9d1d9;">${escapeHtml(lang === 'markup' ? 'html' : lang)}</span>
                </div>
                <button type="button" onclick="navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').innerText).then(()=>{this.innerText='Copied!';setTimeout(()=>{this.innerText='Copy'},2000)})" style="background: #21262d; color: #c9d1d9; border: 1px solid #363b42; border-radius: 4px; padding: 3px 10px; font-size: 11px; cursor: pointer; font-family: ui-monospace, monospace;">Copy</button>
              </div>
              <pre style="margin: 0; padding: 1.25rem; overflow-x: auto; background: #0d1117; color: #e6edf3; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.875rem; line-height: 1.6;"><code class="language-${escapeHtml(lang)}">${highlighted}</code></pre>
            </div>`;
    }

    const paragraphs = part.split(/\n\n+/);
    return paragraphs.map((p) => {
      const pTrimmed = p.trim();
      if (!pTrimmed) return '';
      const lines = pTrimmed.split('\n');
      const isNumberedList = lines.every((l) => /^\d+\.\s+/.test(l.trim()));
      if (isNumberedList) {
        return `            <ol style="padding-left: 1.5rem; margin: 1rem 0; line-height: 1.7;">\n${lines.map((l) => `              <li>${formatInlineStaticText(l.replace(/^\d+\.\s+/, ''))}</li>`).join('\n')}\n            </ol>`;
      }
      const isBulletList = lines.every((l) => /^[-*]\s+/.test(l.trim()));
      if (isBulletList) {
        return `            <ul style="padding-left: 1.5rem; margin: 1rem 0; line-height: 1.7;">\n${lines.map((l) => `              <li>${formatInlineStaticText(l.replace(/^[-*]\s+/, ''))}</li>`).join('\n')}\n            </ul>`;
      }
      return `            <p style="margin: 1rem 0; line-height: 1.7;">${formatInlineStaticText(pTrimmed)}</p>`;
    }).filter(Boolean).join('\n');
  }).filter(Boolean).join('\n');
}

function buildRouteHtml(template, { route, title, description, image, articleHtml, extraJsonLdNodes = [], pageType = "WebPage" }) {
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
        "@type": pageType,
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

  const isHome = route === '/' || route === '';
  const is404 = route === '/404';

  const navHeaderHtml = (isHome || is404) ? '' : `
      <nav aria-label="Breadcrumb & Site Navigation" style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 2rem; font-size: 0.9rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(156, 163, 175, 0.2);">
        <a href="${SITE_URL}/" style="font-weight: 600; text-decoration: none;">← Aritro Saha</a>
        <span style="opacity: 0.5;">/</span>
        <a href="${SITE_URL}/about">About</a>
        <a href="${SITE_URL}/resume">Resume</a>
        <a href="${SITE_URL}/play">Arcade</a>
        <a href="${SITE_URL}/gallery">Gallery</a>
        <a href="${SITE_URL}/aritrosaha">Dossier</a>
      </nav>`;

  const footerHtml = (isHome || is404) ? '' : `
      <footer style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid rgba(156, 163, 175, 0.2); font-size: 0.85rem; color: #6b7280; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem;">
        <div>
          <strong>Aritro Saha</strong> — Software Engineer 1 at Bristol Myers Squibb
        </div>
        <div style="display: flex; gap: 1rem;">
          <a href="${SITE_URL}/">Home</a>
          <a href="${SITE_URL}/sitemap.xml">Sitemap</a>
          <a href="${SITE_URL}/llms.txt">llms.txt</a>
          <a href="https://github.com/halcyon-past">GitHub</a>
          <a href="https://linkedin.com/in/aritro-saha">LinkedIn</a>
        </div>
      </footer>`;

  // Replace inner static fallback inside #root
  html = html.replace(
    /(<div id="root">\s*<div[^>]*>)[\s\S]*?(<\/div>\s*<\/div>)/,
    `$1\n${navHeaderHtml}\n${articleHtml}\n${footerHtml}\n      $2`
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

  // Known project screenshot dimensions for explicit width/height and Google Image Search
  const projectImageDimensions = {
    'byakugan-scan': { width: 1376, height: 768 },
    'sutrakey': { width: 1376, height: 768 },
    'openworld-portfolio': { width: 1376, height: 768 },
    'quarantine': { width: 1376, height: 768 },
    'structurify': { width: 1280, height: 754 },
    'luffy-laser-dodge': { width: 1599, height: 940 },
    'glide-connect': { width: 800, height: 533 },
    'pawsitive': { width: 800, height: 533 },
    'eduhelper': { width: 800, height: 533 }
  };

  // 1. Generate static HTML pages for all Projects
  for (const project of projects) {
    const route = `/projects/${project.id}`;
    const title = `${project.title} | Projects by Aritro Saha`;
    const rawDesc = project.description || project.details?.overview || '';
    const description = rawDesc.length > 158 ? `${rawDesc.slice(0, 155).trim()}...` : rawDesc;
    const image = `${SITE_URL}${project.image}`;
    const dims = projectImageDimensions[project.id] || { width: 1200, height: 630 };
    const webpImage = project.image;
    const avifImage = project.image.replace(/\.webp$/i, '.avif');

    const featuresHtml = (project.details?.features || [])
      .map((f) => {
        const [fTitle, ...descParts] = f.includes(':') ? f.split(':') : [f, ''];
        const fDesc = descParts.join(':').trim();
        return `            <section>
              <h3>${escapeHtml(fTitle.trim())}</h3>
              ${fDesc ? `<p>${escapeHtml(fDesc)}</p>` : ''}
            </section>`;
      })
      .join('\n');
    const techList = (project.details?.techStack || [])
      .map((t) => `<li>${escapeHtml(t)}</li>`)
      .join('\n            ');

    const linksList = [
      project.details?.liveDemo ? `<li><strong>Dedicated Official Webpage:</strong> <a href="${project.details.liveDemo}">${project.details.liveDemo}</a></li>` : '',
      project.github ? `<li><strong>Source Code Repository:</strong> <a href="${project.github}">${project.github}</a></li>` : '',
      project.details?.docs ? `<li><strong>Technical Documentation:</strong> <a href="${project.details.docs}">${project.details.docs}</a></li>` : '',
      project.details?.researchPaper ? `<li><strong>Published Research Paper:</strong> <a href="${project.details.researchPaper}">${project.details.researchPaper}</a></li>` : ''
    ].filter(Boolean).join('\n            ');

    const articleHtml = `
        <header>
          <h1>${escapeHtml(project.title)} — by Aritro Saha</h1>
          <p>${escapeHtml(project.description)}</p>
          <figure style="margin: 2rem 0; text-align: center;">
            <picture>
              <source srcset="${SITE_URL}${avifImage}" type="image/avif" />
              <source srcset="${SITE_URL}${webpImage}" type="image/webp" />
              <img 
                src="${SITE_URL}${webpImage}" 
                alt="${escapeHtml(project.alt || `${project.title} Architectural Screenshot & Interface`)}" 
                width="${dims.width}" 
                height="${dims.height}" 
                loading="lazy" 
                decoding="async" 
                style="max-width: 100%; height: auto; border-radius: 0.75rem; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);" 
              />
            </picture>
            <figcaption style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">
              ${escapeHtml(project.alt || `${project.title} Architectural Screenshot & Interface`)}
            </figcaption>
          </figure>
        </header>
        <main>
          <article>
            <h2>Project Overview &amp; Architecture</h2>
            <p>${escapeHtml(project.details?.overview || project.description)}</p>
            
            <h2>Core Features &amp; Capabilities</h2>
${featuresHtml}

            <h2>Technical Specifications &amp; Engineering</h2>
            <section>
              <h3>Engineering Tech Stack</h3>
              <ul>
                ${techList}
              </ul>
            </section>
            <section>
              <h3>Dedicated Webpages &amp; Official Resources</h3>
              <ul>
                ${linksList}
              </ul>
            </section>
          </article>
        </main>`;

    const softwareNode = {
      "@type": ["SoftwareSourceCode", "SoftwareApplication"],
      "@id": `${SITE_URL}${route}#software`,
      "name": project.title,
      "description": project.details?.overview || project.description,
      "url": `${SITE_URL}${route}`,
      "image": `${SITE_URL}${webpImage}`,
      "screenshot": `${SITE_URL}${webpImage}`,
      "codeRepository": project.github,
      "programmingLanguage": project.details?.techStack || [],
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": project.title.includes("macOS") || project.title.includes("Byakugan") || project.title.includes("SutraKey") ? "macOS" : "Web Browser",
      "author": { "@id": `${SITE_URL}/#person` }
    };

    const imageNode = {
      "@type": "ImageObject",
      "@id": `${SITE_URL}${route}#primaryimage`,
      "url": `${SITE_URL}${webpImage}`,
      "contentUrl": `${SITE_URL}${webpImage}`,
      "caption": project.alt || `${project.title} Architectural Screenshot & Interface`,
      "width": dims.width,
      "height": dims.height
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

    const extraNodes = [softwareNode, imageNode, breadcrumbNode];
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

  // 1b. Generate static HTML page for Blog Catalog (/blog)
  {
    const route = '/blog';
    const title = 'Engineering Blog | Aritro Saha — Systems, Data & Architecture';
    const description = 'Technical deep-dives, systems architecture, Apple Silicon OCR engineering, and Python fault-tolerance patterns by Aritro Saha.';
    const image = `${SITE_URL}/banner-social.jpg`;

    const postsHtml = blogPosts.map((post) => `
        <section style="margin-bottom: 2rem; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 1rem;">
          <h2><a href="${SITE_URL}/blog/${post.slug}">${escapeHtml(post.title)}</a></h2>
          <p><strong>Published:</strong> ${post.date} | <strong>Reading Time:</strong> ${post.readingTime} | <strong>Category:</strong> ${escapeHtml(post.category)}</p>
          <p>${escapeHtml(post.excerpt)}</p>
          <p><a href="${SITE_URL}/blog/${post.slug}">Read Full Article →</a></p>
        </section>`).join('\n');

    const articleHtml = `
        <header>
          <h1>Engineering Blog — Systems, Data &amp; Architecture</h1>
          <p>Technical deep-dives, systems architecture, and open-source postmortems by Aritro Saha, Software Engineer 1 at Bristol Myers Squibb.</p>
        </header>
        <main>
          <article>
${postsHtml}
          </article>
        </main>`;

    const breadcrumbNode = {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/blog#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` }
      ]
    };

    const collectionNode = {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/blog#collection`,
      "url": `${SITE_URL}/blog`,
      "name": title,
      "description": description,
      "publisher": { "@id": `${SITE_URL}/#person` }
    };

    const routeHtml = buildRouteHtml(template, {
      route,
      title,
      description,
      image,
      articleHtml,
      extraJsonLdNodes: [collectionNode, breadcrumbNode]
    });

    const outDir = path.join(distDir, 'blog');
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), routeHtml, 'utf-8');
    generatedCount++;
  }

  // 1c. Generate static HTML pages for all Blog Posts (/blog/:slug)
  for (const post of blogPosts) {
    const route = `/blog/${post.slug}`;
    const title = post.seoTitle || `${post.title} | Engineering Blog`;
    const rawDesc = post.excerpt || '';
    const description = rawDesc.length > 158 ? `${rawDesc.slice(0, 155).trim()}...` : rawDesc;
    const image = `${SITE_URL}${post.coverImage}`;

    const sectionsHtml = post.sections.map((s) => `
            <section>
              <h3>${escapeHtml(s.heading)}</h3>
              ${renderStaticMarkdownContent(s.content)}
            </section>`).join('\n');

    const articleHtml = `
        <header>
          <h1>${escapeHtml(post.title)}</h1>
          <p><strong>Published:</strong> ${post.date} | <strong>Category:</strong> ${escapeHtml(post.category)} | <strong>Reading Time:</strong> ${post.readingTime}</p>
          <figure style="margin: 2rem 0; text-align: center;">
            <img 
              src="${SITE_URL}${post.coverImage}" 
              alt="${escapeHtml(post.coverAlt || post.title)}" 
              width="1200" 
              height="630" 
              loading="lazy" 
              decoding="async" 
              style="max-width: 100%; height: auto; border-radius: 0.75rem;" 
            />
            <figcaption style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;">
              ${escapeHtml(post.coverAlt || post.title)}
            </figcaption>
          </figure>
        </header>
        <main>
          <article>
            <h2>Article Overview</h2>
            <p>${escapeHtml(post.excerpt)}</p>
            
            <h2>Deep-Dive Engineering &amp; Architecture</h2>
${sectionsHtml}
            
            <h2>Tags &amp; Architectural Concepts</h2>
            <ul>
              ${post.tags.map((t) => `<li>#${escapeHtml(t)}</li>`).join('\n              ')}
            </ul>
          </article>
        </main>`;

    const breadcrumbNode = {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}${route}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `${SITE_URL}${route}` }
      ]
    };

    const postNode = {
      "@type": "TechArticle",
      "@id": `${SITE_URL}${route}#article`,
      "headline": post.title,
      "description": post.excerpt,
      "url": `${SITE_URL}${route}`,
      "image": image,
      "datePublished": post.date,
      "dateModified": post.date,
      "author": { "@id": `${SITE_URL}/#person` },
      "publisher": { "@id": `${SITE_URL}/#organization` }
    };

    const routeHtml = buildRouteHtml(template, {
      route,
      title,
      description,
      image,
      articleHtml,
      extraJsonLdNodes: [postNode, breadcrumbNode]
    });

    const outDir = path.join(distDir, 'blog', post.slug);
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

  // 5. Generate RSS 2.0 Feed for projects and software tools
  const allFeedItems = [
    ...projects.map((p) => {
      const pubDate = new Date('2026-10-28T00:00:00Z').toUTCString();
      const liveDemoLink = p.details?.liveDemo ? `<p><strong>Official Dedicated Webpage:</strong> <a href="${p.details.liveDemo}">${p.details.liveDemo}</a></p>` : '';
      const githubLink = p.github ? `<p><strong>Source Code Repository:</strong> <a href="${p.github}">${p.github}</a></p>` : '';
      const techStackDesc = p.details?.techStack?.length ? `<p><strong>Tech Stack:</strong> ${p.details.techStack.join(', ')}</p>` : '';
      const categories = (p.details?.techStack || ['Software']).map((t) => `      <category>${escapeHtml(t)}</category>`).join('\n');

      return `    <item>
      <title>${escapeHtml(p.title)} — ${escapeHtml(p.description)}</title>
      <link>${SITE_URL}/projects/${p.id}</link>
      <guid isPermaLink="true">${SITE_URL}/projects/${p.id}</guid>
      <description><![CDATA[
        <p>${escapeHtml(p.details?.overview || p.description)}</p>
        ${liveDemoLink}
        ${githubLink}
        ${techStackDesc}
      ]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${CONTACT_EMAIL} (${escapeHtml(AUTHOR.name)})</author>
${categories}
    </item>`;
    }),
    ...blogPosts.map((b) => {
      const pubDate = new Date(`${b.date}T00:00:00Z`).toUTCString();
      const categories = b.tags.map((t) => `      <category>${escapeHtml(t)}</category>`).join('\n');
      return `    <item>
      <title>${escapeHtml(b.title)}</title>
      <link>${SITE_URL}/blog/${b.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${b.slug}</guid>
      <description><![CDATA[
        <p>${escapeHtml(b.excerpt)}</p>
        <p><strong>Category:</strong> ${escapeHtml(b.category)} | <strong>Reading Time:</strong> ${b.readingTime}</p>
      ]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${CONTACT_EMAIL} (${escapeHtml(AUTHOR.name)})</author>
${categories}
    </item>`;
    }),
    `    <item>
      <title>SiliconSync — Real-Time AI Technology News Engine</title>
      <link>https://siliconsync.aritro.cloud/</link>
      <guid isPermaLink="true">https://siliconsync.aritro.cloud/</guid>
      <description><![CDATA[
        <p>Real-time AI-generated technology news intelligence engine and aggregator that extracts and compiles latest tech breakthroughs from authoritative sources worldwide.</p>
        <p><strong>Official Dedicated Webpage:</strong> <a href="https://siliconsync.aritro.cloud/">https://siliconsync.aritro.cloud/</a></p>
        <p><strong>Tech Stack:</strong> Artificial Intelligence, Next.js, LLM Agents, Real-time Web Extraction</p>
      ]]></description>
      <pubDate>${new Date('2026-10-28T00:00:00Z').toUTCString()}</pubDate>
      <author>${CONTACT_EMAIL} (${escapeHtml(AUTHOR.name)})</author>
      <category>Artificial Intelligence</category>
      <category>Tech News</category>
      <category>LLM</category>
    </item>`
  ];

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeHtml(AUTHOR.name)} — Software Projects &amp; Releases</title>
    <link>${SITE_URL}/</link>
    <description>Official RSS feed of software products, native utilities, and developer projects engineered by ${escapeHtml(AUTHOR.name)}, Software Engineer 1 at Bristol Myers Squibb.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>${CONTACT_EMAIL} (${escapeHtml(AUTHOR.name)})</managingEditor>
    <webMaster>${CONTACT_EMAIL} (${escapeHtml(AUTHOR.name)})</webMaster>
${allFeedItems.join('\n')}
  </channel>
</rss>
`;

  fs.writeFileSync(path.join(publicDir, 'feed.xml'), rssXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'feed.xml'), rssXml, 'utf-8');
  console.log(`✅ Generated RSS feed: public/feed.xml and dist/feed.xml (${allFeedItems.length} items).`);
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
