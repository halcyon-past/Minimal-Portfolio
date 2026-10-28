import { formatMarkdownPage, bulletList, mdLink, table, absoluteUrl } from './format.js';
import { buildMarkdownHeaders, build404Markdown } from './http.js';
import { SITE_URL, AUTHOR, SOCIAL_PROFILES } from '../siteConfig.js';
import { projects, experience, education, galleryImages, rawGames } from '../../data/portfolioData.js';
import { blogPosts } from '../../data/blogData.js';

const LAST_UPDATED = '2026-10-26';

/**
 * 1. Home Page Renderer (/)
 */
export function renderHomePage() {
  const featuredProjects = projects.filter((p) => p.HomepageVisibility !== false);

  const content = [
    '## Professional Overview',
    AUTHOR.description,
    '',
    'Currently serving as a Software Engineer 1 at **Bristol Myers Squibb** (July 2025 – Present), engineering enterprise-scale data pipelines, cloud architecture, and web applications.',
    '',
    '## Key Achievements & Honors',
    `- **Hack4Bengal 3.0 Winner**: Eastern India's Largest Hackathon (Winner across 5,000+ applicants).`,
    `- **Published Research**: Gesture-controlled computer interfacing and multimodal assistive AI (IJIRT).`,
    `- **Open-Source Author**: Published \`quarantine-py\` fault-tolerance package on PyPI with atomic dead-letter queuing.`,
    '',
    '## Featured Projects',
    bulletList(
      featuredProjects.map((p) => {
        const stack = p.details?.techStack?.slice(0, 4).join(', ') || '';
        return `${mdLink(p.title, absoluteUrl(`/projects/${p.id}`))} — ${p.description} (${stack})`;
      })
    ),
    '',
    '## The Developer Arcade (Aritro Games)',
    'An interactive suite of developer-themed browser mini-games engineered in React:',
    bulletList(
      rawGames.map((g) => `${mdLink(g.title, absoluteUrl(g.path))} — ${g.description}`)
    ),
    '',
    '## Verified Profiles & Knowledge Graph Identities',
    bulletList(
      SOCIAL_PROFILES.map((s) => mdLink(s.name, s.url))
    )
  ].join('\n');

  const related = [
    { title: 'About Aritro Saha (Experience & Education)', url: '/about' },
    { title: 'The Developer Arcade', url: '/play' },
    { title: 'Visual Gallery & Events', url: '/gallery' },
    { title: 'Byakugan Scan (macOS OCR Utility)', url: '/projects/byakugan-scan' },
    { title: 'SutraKey (macOS Media Utility)', url: '/projects/sutrakey' }
  ];

  return formatMarkdownPage({
    title: 'Aritro Saha — Software Engineer 1 at Bristol Myers Squibb',
    summary: 'Official portfolio and project catalog of Aritro Saha, Software Engineer 1 at Bristol Myers Squibb specializing in high-throughput data engineering, cloud systems, and native macOS utilities.',
    canonicalPath: '/',
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: related
  });
}

/**
 * 2. About Page Renderer (/about)
 */
export function renderAboutPage() {
  const expHeaders = ['Role & Organization', 'Duration'];
  const expRows = experience.map((e) => [e.title, e.duration]);

  const eduHeaders = ['Degree / Program', 'Institution', 'Year'];
  const eduRows = education.map((ed) => [ed.title, ed.institution, ed.year]);

  const content = [
    '## Biography',
    'I am a Software Engineer 1 at Bristol Myers Squibb with a deep focus on data science engineering and resilient full-stack systems. I architect and maintain scalable backend services, event-driven streaming pipelines, and high-performance user interfaces.',
    '',
    "I won Hack4Bengal 3.0—Eastern India's largest hackathon—leading rapid full-stack and mobile prototyping under intense competition constraints. When not building software, I explore digital audio signal experiments, beatboxing, and football.",
    '',
    '## Professional Experience',
    table(expHeaders, expRows),
    '',
    '## Education & Academic Foundation',
    table(eduHeaders, eduRows),
    '',
    '## Core Competencies & Technical Skills',
    '- **Languages**: Python (AsyncIO, FastMCP, Pytest), TypeScript, JavaScript (ESM, React 19, Next.js), Swift 6.0 (AppKit, SwiftUI), SQL',
    '- **Cloud & Distributed Data**: Databricks, Apache Spark, Google Cloud Platform (Cloud Run, Pub/Sub), Firebase / Firestore, MongoDB',
    '- **System & Native Engineering**: Apple Neural Engine, Apple Vision Framework, CGEventTap, macOS Menu Bar daemons, WASM',
    '- **AI & Machine Learning**: Google Gemini API, MediaPipe CV, LangGraph, Retrieval-Augmented Generation (RAG)'
  ].join('\n');

  const related = [
    { title: 'Portfolio Home', url: '/' },
    { title: 'The Developer Arcade', url: '/play' },
    { title: 'Engineering & Hackathon Gallery', url: '/gallery' },
    { title: 'Official Resume (PDF)', url: AUTHOR.resumeUrl }
  ];

  return formatMarkdownPage({
    title: 'About Aritro Saha — Software Engineer 1 at Bristol Myers Squibb',
    summary: 'Professional experience, engineering education, hackathon awards, and core technical proficiencies of Aritro Saha.',
    canonicalPath: '/about',
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: related
  });
}

/**
 * 2a. Resume Page Renderer (/resume)
 */
export function renderResumePage() {
  const expHeaders = ['Role & Organization', 'Duration'];
  const expRows = experience.map((e) => [e.title, e.duration]);

  const eduHeaders = ['Degree / Program', 'Institution', 'Year'];
  const eduRows = education.map((ed) => [ed.title, ed.institution, ed.year]);

  const content = [
    '## Professional Overview',
    AUTHOR.description,
    '',
    'Currently serving as a Software Engineer 1 at **Bristol Myers Squibb** (July 2025 – Present), engineering enterprise-scale data pipelines, cloud architecture, and web applications.',
    '',
    '## Official Resume Download',
    `- **Direct PDF Download**: [Download Official Resume (PDF)](${AUTHOR.resumeUrl})`,
    '',
    '## Professional Experience',
    table(expHeaders, expRows),
    '',
    '## Education & Academic Foundation',
    table(eduHeaders, eduRows),
    '',
    '## Key Accolades & Leadership',
    `- **Hack4Bengal 3.0 Grand Champion**: Team Lead & 1st Place Winner out of 5,000+ applicants (PAWsitive animal healthcare triage).`,
    `- **LeetCode Knight**: Peak rating 1868 (Top 6% globally), 630+ algorithmic solutions solved.`,
    `- **Published First Author**: Research on low-latency multimodal computer vision interfaces (IJIRT Paper ID: 180711).`,
    `- **Upstream Core Contributor**: Contributed DuckDB capture engine enhancements to Kestra (kestra-io/plugin-jdbc v2.2.0).`,
    '',
    '## Core Competencies & Technical Skills',
    '- **Languages**: Python (AsyncIO, FastMCP, Pytest), TypeScript, JavaScript (ESM, React 19, Next.js), Swift 6.0 (AppKit, SwiftUI), SQL',
    '- **Cloud & Distributed Data**: Databricks, Apache Spark, Google Cloud Platform (Cloud Run, Pub/Sub), Firebase / Firestore, MongoDB',
    '- **System & Native Engineering**: Apple Neural Engine, Apple Vision Framework, CGEventTap, macOS Menu Bar daemons, WASM',
    '- **AI & Machine Learning**: Google Gemini API, MediaPipe CV, LangGraph, Retrieval-Augmented Generation (RAG)'
  ].join('\n');

  const related = [
    { title: 'Portfolio Home', url: '/' },
    { title: 'About Aritro Saha', url: '/about' },
    { title: 'All Projects', url: '/#projects' },
    { title: 'The Developer Arcade', url: '/play' }
  ];

  return formatMarkdownPage({
    title: 'Resume — Aritro Saha | Software Engineer 1 at Bristol Myers Squibb',
    summary: 'Official resume of Aritro Saha, Software Engineer 1 at Bristol Myers Squibb specializing in high-throughput data engineering, cloud systems, and native macOS utilities.',
    canonicalPath: '/resume',
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: related
  });
}

/**
 * 2b. Aritro Saha Verified Dossier (/aritrosaha and /aritro-saha)
 */
export function renderAritroSahaDossier() {
  const content = [
    '## Verified Entity Overview',
    'Aritro Saha (commonly known online as **aritrosaha** and **halcyon-past**) is an Indian software engineer and open-source systems developer. He currently works as a **Software Engineer 1 at Bristol Myers Squibb (BMS)**, focusing on enterprise data science engineering, high-throughput pipelines, cloud infrastructure, native macOS utilities, and interactive web applications.',
    '',
    '## Entity Disambiguation',
    '> **Important Note**: Aritro Saha (this profile) is the Software Engineer at Bristol Myers Squibb, Hack4Bengal 3.0 Champion, and creator of Byakugan Scan, SutraKey, and Quarantine Python. He is **not** Aritro Saha, the Director of UX Design at Eightfold AI.',
    '',
    '## Author Profile Photo',
    '![Aritro Saha Headshot](https://www.aritro.cloud/aritro-saha.webp)',
    '- Direct verified photo URL: `https://www.aritro.cloud/aritro-saha.webp`',
    '',
    '## Key Achievements & Accolades',
    "- **Hack4Bengal 3.0 Grand Champion**: Team Lead and 1st place winner out of 3,000+ applicants across Eastern India with PAWsitive (animal blood donation & emergency triage platform).",
    '- **Published First Author**: IEEE/IJIRT research on real-time multimodal hand-gesture computer control (Paper ID: 180711).',
    '- **LeetCode Knight**: Peak algorithmic rating of 1868 (Top 6% globally), solving 630+ computational challenges.',
    '- **Upstream Open-Source Contributor**: Kestra core JDBC plugin (`kestra-io/plugin-jdbc` v2.2.0 DuckDB file capture engine).',
    '',
    '## Featured Software & Systems Architecture',
    '- **Byakugan Scan** (`https://byakugan-scan.aritro.cloud`): Native macOS menu bar utility in Swift 6.0 utilizing the Apple Neural Engine and Apple Vision Framework for sub-50ms in-memory screen OCR, QR, and barcode recognition with 0% network overhead.',
    '- **SutraKey** (`https://sutrakey.aritro.cloud`): Shift+Select liquid radial menu for instant media downloading and clean reader-mode document conversion on macOS.',
    '- **OpenWorld Portfolio** (`https://openworld.aritro.cloud`): Interactive 2.5D retro Pokémon-style developer world in Pallet Cloud, engineered with Next.js 16, React 19, and Canvas 2D.',
    '- **Quarantine (quarantine-py)** (`https://pypi.org/project/quarantine-py/`): Zero-dependency Python fault-tolerance library on PyPI providing atomic dead-letter queues and CLI replay for batch data pipelines.',
    '- **Structurify** (`https://structurify.aritro.cloud`): Event-driven B2B SaaS platform using Google Gemini, LangGraph, FastAPI, and GCP Pub/Sub to transform unstructured spreadsheets into strict master schemas.',
    '',
    '## Professional Timeline',
    '- **Software Engineer 1, Bristol Myers Squibb (BMS)** (July 2025 – Present): Enterprise data pipelines, automated clinical data transformations, and cloud workflow systems.',
    '- **Data Science Intern, Bajaj Finserv Health** (Feb 2025 – June 2025): Machine learning models and healthcare data streaming pipelines.',
    '- **Full Stack Developer Intern, Wipro** (Oct 2023 – Dec 2023): Scalable REST APIs and responsive full-stack applications.',
    '',
    '## Education',
    '- **B.Tech in Electronics & Computer Engineering**, Vellore Institute of Technology, Chennai (2021 – 2025)',
    '- **High School**, Birla Bharati, Kolkata (2021)',
    '',
    '## Knowledge Graph & Authority Identifiers',
    bulletList(
      SOCIAL_PROFILES.map((s) => mdLink(s.name, s.url))
    )
  ].join('\n');

  return formatMarkdownPage({
    title: 'Aritro Saha (aritrosaha) — Verified Software Engineer & Open-Source Creator',
    summary: 'Official verified engineering dossier of Aritro Saha (aritrosaha). Software Engineer 1 at Bristol Myers Squibb, Winner of Hack4Bengal 3.0, and creator of Byakugan Scan and SutraKey.',
    canonicalPath: '/aritrosaha',
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: [
      { title: 'Portfolio Home', url: '/' },
      { title: 'About Aritro Saha', url: '/about' },
      { title: 'Featured Projects', url: '/#projects' },
      { title: 'The Developer Arcade', url: '/play' }
    ]
  });
}

/**
 * 3. Gallery Page Renderer (/gallery)
 */
export function renderGalleryPage() {
  const content = [
    '## Visual Storytelling & Hackathon Highlights',
    'A curated photographic chronicle of hackathon victories, developer conferences, engineering setup, and collaborative milestones:',
    '',
    bulletList(
      galleryImages.map((img) => `${img.alt} (${absoluteUrl(img.src)})`)
    ),
    '',
    '## Notable Event Highlights',
    '- **Hack4Bengal 3.0 Grand Finale**: Winners out of 5,000+ applicants for developing PAWsitive.',
    '- **VIT Chennai Campus Tech Fests**: Demonstrating native gesture-controlled computing with GlideConnect.',
    '- **Continuous Collaboration**: Team workshops and hackathon sprints across Eastern India.'
  ].join('\n');

  const related = [
    { title: 'Home', url: '/' },
    { title: 'About Aritro Saha', url: '/about' },
    { title: 'Featured Projects', url: '/#projects' }
  ];

  return formatMarkdownPage({
    title: 'Visual Gallery — Moments & Hackathons | Aritro Saha',
    summary: 'Visual moments, hackathon achievements, and project showcases from Aritro Saha’s engineering journey.',
    canonicalPath: '/gallery',
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: related
  });
}

/**
 * 4. The Arcade Catalog (/play)
 */
export function renderArcadeCatalogPage() {
  const content = [
    '## The Arcade Overview',
    'The Arcade is a suite of responsive, developer-themed games built natively into Aritro Saha’s portfolio. Engineered in React 19 without third-party game engines, each mini-game demonstrates clean state machines, high-frame-rate requestAnimationFrame loops, or algorithmic AI.',
    '',
    '## Games Catalog',
    bulletList(
      rawGames.map((g) => {
        return `${mdLink(g.title, absoluteUrl(g.path))} — **${g.status}** — ${g.description} (Tech: ${g.tech})`;
      })
    ),
    '',
    '## Algorithmic Highlights',
    '- **Minimax AI**: Unbeatable Alpha-Beta decision tree evaluation in Tic Tac Toe.',
    '- **Pathfinding & Graph Isolation**: Breadth-First Search (BFS) connection validation in Data Pipeline Puzzle.',
    '- **Backtracking Search**: Constraint-satisfaction solving engine in Sudoku.',
    '- **Real-Time WPM & Accuracy**: Microsecond keystroke interval computation in Developer Speed Test.'
  ].join('\n');

  const related = rawGames.map((g) => ({ title: g.title, url: g.path })).concat([
    { title: 'Portfolio Home', url: '/' }
  ]);

  return formatMarkdownPage({
    title: 'The Arcade — Developer Games by Aritro Saha',
    summary: 'A collection of minimalist, developer-themed browser games built natively in React by Aritro Saha.',
    canonicalPath: '/play',
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: related
  });
}

/**
 * 5. Individual Game Renderer (/play/:gameId)
 */
export function renderGamePage(gameId) {
  const game = rawGames.find(
    (g) => g.id === gameId || g.path === `/play/${gameId}` || g.path.replace('/play/', '') === gameId
  );

  if (!game) return null;

  const content = [
    '## Game Overview',
    game.overview,
    '',
    '## Technical Implementation',
    `- **Architecture**: ${game.tech}`,
    `- **Status**: ${game.status}`,
    `- **Controls**: Optimized for desktop keyboard & mouse as well as mobile touch screens.`,
    '',
    '## How to Play',
    `Access the live interactive playable game at ${absoluteUrl(game.path)}.`
  ].join('\n');

  const otherGames = rawGames
    .filter((g) => g.id !== game.id)
    .slice(0, 4)
    .map((g) => ({ title: g.title, url: g.path }));

  return formatMarkdownPage({
    title: `${game.title} — Aritro Saha Arcade`,
    summary: game.description,
    canonicalPath: game.path,
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: [{ title: 'All Arcade Games', url: '/play' }, ...otherGames]
  });
}

/**
 * 6. Dynamic Project Renderer (/projects/:id)
 */
export function renderProjectPage(projectId) {
  const project = projects.find(
    (p) => p.id === projectId || p.link === `/projects/${projectId}`
  );

  if (!project) return null;

  const details = project.details || {};
  const overview = details.overview || project.description;
  const features = details.features || [];
  const techStack = details.techStack || [];

  const externalLinks = [];
  if (project.github) externalLinks.push(`- **GitHub Repository**: ${mdLink(project.github, project.github)}`);
  if (details.liveDemo) externalLinks.push(`- **Live Website / Deployment**: ${mdLink(details.liveDemo, details.liveDemo)}`);
  if (details.docs) externalLinks.push(`- **Documentation**: ${mdLink(details.docs, details.docs)}`);
  if (details.pypi) externalLinks.push(`- **PyPI Package**: ${mdLink(details.pypi, details.pypi)}`);
  if (details.researchPaper) externalLinks.push(`- **Published Research Paper**: ${mdLink(details.researchPaper, details.researchPaper)}`);

  const content = [
    '## Project Overview',
    overview,
    '',
    '## Key Engineering Features',
    bulletList(features),
    '',
    '## Technologies & Architecture',
    bulletList(techStack),
    '',
    '## Verified Links & Source Code',
    externalLinks.length ? externalLinks.join('\n') : '- Direct access available upon request.'
  ].join('\n');

  const otherProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3)
    .map((p) => ({ title: p.title, url: `/projects/${p.id}` }));

  return formatMarkdownPage({
    title: `${project.title} — by Aritro Saha`,
    summary: project.description,
    canonicalPath: `/projects/${project.id}`,
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: [{ title: 'All Featured Projects', url: '/#projects' }, ...otherProjects]
  });
}

/**
 * 7. Blog Catalog Renderer (/blog)
 */
export function renderBlogCatalogPage() {
  const content = [
    '## Engineering Notes & Architecture',
    'Technical deep-dives into high-throughput data engineering, native macOS systems, fault-tolerant Python architectures, and modern web performance by Aritro Saha.',
    '',
    '## Published Articles',
    bulletList(
      blogPosts.map((p) => `${mdLink(p.title, absoluteUrl(`/blog/${p.slug}`))} — ${p.excerpt} (${p.readingTime}, ${p.date})`)
    )
  ].join('\n');

  return formatMarkdownPage({
    title: 'Engineering Blog — Systems, Data & Architecture | Aritro Saha',
    summary: 'Technical deep-dives, systems architecture, Apple Silicon OCR engineering, and Python fault-tolerance patterns by Aritro Saha.',
    canonicalPath: '/blog',
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: [
      { title: 'Portfolio Home', url: '/' },
      { title: 'About Aritro Saha', url: '/about' },
      { title: 'All Projects', url: '/#projects' }
    ]
  });
}

/**
 * 8. Dynamic Blog Post Renderer (/blog/:slug)
 */
export function renderBlogPostPage(slug) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const sectionsContent = post.sections
    .map((s) => `## ${s.heading}\n\n${s.content}`)
    .join('\n\n');

  const content = [
    `> Category: ${post.category} | Published: ${post.date} | Reading Time: ${post.readingTime}`,
    '',
    post.excerpt,
    '',
    sectionsContent,
    '',
    '## Tags & Topics',
    post.tags.map((t) => `\`#${t}\``).join(' '),
    '',
    '## Author Profile',
    `**${post.author.name}** — ${post.author.role}. Specialized in distributed systems, Apple Silicon engineering, and resilient batch pipelines.`
  ].join('\n');

  const otherPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ title: p.title, url: `/blog/${p.slug}` }));

  return formatMarkdownPage({
    title: `${post.title} — by Aritro Saha`,
    summary: post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    lastUpdated: post.date,
    content,
    relatedLinks: [{ title: 'Engineering Blog Catalog', url: '/blog' }, ...otherPosts]
  });
}

/**
 * Maps static paths to renderers
 */
const staticRoutes = {
  '/': renderHomePage,
  '/index': renderHomePage,
  '/about': renderAboutPage,
  '/resume': renderResumePage,
  '/aritrosaha': renderAritroSahaDossier,
  '/aritro-saha': renderAritroSahaDossier,
  '/gallery': renderGalleryPage,
  '/blog': renderBlogCatalogPage,
  '/play': renderArcadeCatalogPage,
  '/play/typing-test': () => renderGamePage('typing-test'),
  '/play/data-pipeline': () => renderGamePage('data-pipeline-puzzle'),
  '/play/data-pipeline-puzzle': () => renderGamePage('data-pipeline-puzzle'),
  '/play/snake': () => renderGamePage('minimalist-snake'),
  '/play/minimalist-snake': () => renderGamePage('minimalist-snake'),
  '/play/sudoku': () => renderGamePage('sudoku'),
  '/play/space-invaders': () => renderGamePage('space-invaders'),
  '/play/flappy-bird': () => renderGamePage('flappy-bird'),
  '/play/tictactoe': () => renderGamePage('tictactoe')
};

/**
 * Returns list of all addressable markdown routes
 */
export function listMarkdownRoutes() {
  const routes = [
    {
      path: '/',
      mdPath: '/index.md',
      title: 'Home — Aritro Saha Portfolio',
      description: 'Overview of engineering background, skills, and featured software products.',
      category: 'core'
    },
    {
      path: '/about',
      mdPath: '/about.md',
      title: 'About Aritro Saha',
      description: 'Professional experience at Bristol Myers Squibb, education at VIT Chennai, and awards.',
      category: 'core'
    },
    {
      path: '/resume',
      mdPath: '/resume.md',
      title: 'Resume — Aritro Saha | Software Engineer 1 at Bristol Myers Squibb',
      description: 'Professional experience, education, awards, technical proficiencies, and resume PDF download.',
      category: 'core'
    },
    {
      path: '/aritrosaha',
      mdPath: '/aritrosaha.md',
      title: 'Aritro Saha (aritrosaha) — Official Profile & Dossier',
      description: 'Official biography, engineering background, and projects of Aritro Saha (Megh).',
      category: 'core'
    },
    {
      path: '/gallery',
      mdPath: '/gallery.md',
      title: 'Engineering & Hackathon Gallery',
      description: 'Visual chronicles of hackathon wins and software demonstrations.',
      category: 'core'
    },
    {
      path: '/play',
      mdPath: '/play.md',
      title: 'The Arcade (Aritro Games)',
      description: 'Interactive browser mini-games catalog built in React 19.',
      category: 'arcade'
    }
  ];

  // Arcade sub-routes
  for (const game of rawGames) {
    const normalizedPath = game.path.replace(/\/$/, '');
    routes.push({
      path: normalizedPath,
      mdPath: `${normalizedPath}.md`,
      title: `${game.title} (Arcade)`,
      description: game.description,
      category: 'arcade'
    });
  }

  // Project routes
  for (const project of projects) {
    routes.push({
      path: `/projects/${project.id}`,
      mdPath: `/projects/${project.id}.md`,
      title: `${project.title}`,
      description: project.description,
      category: 'projects'
    });
  }

  // Blog routes
  routes.push({
    path: '/blog',
    mdPath: '/blog.md',
    title: 'Engineering Blog — Systems, Data & Architecture',
    description: 'Technical deep-dives and engineering architecture by Aritro Saha.',
    category: 'blog'
  });
  for (const post of blogPosts) {
    routes.push({
      path: `/blog/${post.slug}`,
      mdPath: `/blog/${post.slug}.md`,
      title: post.title,
      description: post.excerpt,
      category: 'blog'
    });
  }

  return routes;
}

/**
 * Renders the markdown catalog (/api/md/_catalog)
 */
export function renderCatalogMarkdown() {
  const allRoutes = listMarkdownRoutes();
  const headers = ['Route', 'Markdown URL', 'Title', 'Category'];
  const rows = allRoutes.map((r) => [
    r.path,
    absoluteUrl(r.mdPath),
    r.title,
    r.category
  ]);

  const content = [
    '## Overview',
    `This endpoint catalogs all ${allRoutes.length} machine-readable markdown routes available across ${SITE_URL}. Each route provides clean, structured markdown identical in factual content to its canonical HTML counterpart.`,
    '',
    '## Route Catalog',
    table(headers, rows),
    '',
    '## Direct Access Guidelines',
    '- Add `.md` suffix to any public route (e.g., `/about.md`, `/projects/sutrakey.md`).',
    '- Request the route with header `Accept: text/markdown`.',
    '- Call `/api/md/<path>` directly for programmatic agent ingestion.'
  ].join('\n');

  return formatMarkdownPage({
    title: 'Markdown Route Catalog — Aritro Saha Portfolio',
    summary: `Complete index of all ${allRoutes.length} addressable markdown documents on this website.`,
    canonicalPath: '/api/md/_catalog',
    lastUpdated: LAST_UPDATED,
    content,
    relatedLinks: [
      { title: 'LLM Context Summary (/llms.txt)', url: '/llms.txt' },
      { title: 'Full LLM Concatenated Corpus (/llms-full.txt)', url: '/llms-full.txt' },
      { title: 'AI Crawler Policy (/ai.txt)', url: '/ai.txt' }
    ]
  });
}

/**
 * Primary dispatch router function for markdown requests
 */
export function renderMarkdownRoute(rawPath = '/', isNegotiated = false) {
  let cleanPath = (rawPath || '/').trim();

  // Strip /api/md prefix if present
  if (cleanPath.startsWith('/api/md')) {
    cleanPath = cleanPath.slice('/api/md'.length);
  }

  // Special catalog route
  if (cleanPath === '/_catalog' || cleanPath === '_catalog' || cleanPath === '/_catalog.md') {
    const body = renderCatalogMarkdown();
    return {
      status: 200,
      body,
      canonicalPath: '/api/md/_catalog',
      headers: buildMarkdownHeaders({
        body,
        canonicalPath: '/api/md/_catalog',
        isNegotiated
      })
    };
  }

  // Strip .md suffix
  if (cleanPath.endsWith('.md')) {
    cleanPath = cleanPath.slice(0, -3);
  }

  // Normalize leading slash & root aliases
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  if (cleanPath === '/index' || cleanPath === '') {
    cleanPath = '/';
  }

  // 1. Check static route registry
  if (staticRoutes[cleanPath]) {
    const body = staticRoutes[cleanPath]();
    const canonicalPath = cleanPath === '/index' ? '/' : cleanPath;
    return {
      status: 200,
      body,
      canonicalPath,
      headers: buildMarkdownHeaders({
        body,
        canonicalPath,
        isNegotiated
      })
    };
  }

  // 2. Check dynamic project route: /projects/:id
  const projectMatch = cleanPath.match(/^\/projects\/([^/]+)$/);
  if (projectMatch) {
    const projectId = projectMatch[1];
    const body = renderProjectPage(projectId);
    if (body) {
      return {
        status: 200,
        body,
        canonicalPath: `/projects/${projectId}`,
        headers: buildMarkdownHeaders({
          body,
          canonicalPath: `/projects/${projectId}`,
          isNegotiated
        })
      };
    }
  }

  // 3. Check dynamic play route: /play/:gameId
  const playMatch = cleanPath.match(/^\/play\/([^/]+)$/);
  if (playMatch) {
    const gameId = playMatch[1];
    const body = renderGamePage(gameId);
    if (body) {
      return {
        status: 200,
        body,
        canonicalPath: `/play/${gameId}`,
        headers: buildMarkdownHeaders({
          body,
          canonicalPath: `/play/${gameId}`,
          isNegotiated
        })
      };
    }
  }

  // 4. Check dynamic blog route: /blog/:slug
  const blogMatch = cleanPath.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const body = renderBlogPostPage(slug);
    if (body) {
      return {
        status: 200,
        body,
        canonicalPath: `/blog/${slug}`,
        headers: buildMarkdownHeaders({
          body,
          canonicalPath: `/blog/${slug}`,
          isNegotiated
        })
      };
    }
  }

  // Not found
  return build404Markdown(cleanPath);
}
