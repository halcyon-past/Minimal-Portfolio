import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const SITE_URL = 'https://www.aritro.cloud';

const personGraphNode = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  "name": "Aritro Saha",
  "alternateName": ["Aritro", "Megh", "halcyon-past"],
  "url": `${SITE_URL}/`,
  "jobTitle": "Software Engineer 1",
  "description": "Software Engineer 1 at Bristol Myers Squibb building high-throughput data pipelines, cloud infrastructure, native macOS utilities, and interactive web applications.",
  "worksFor": {
    "@type": "Organization",
    "name": "Bristol Myers Squibb",
    "alternateName": "BMS",
    "url": "https://www.bms.com/"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Vellore Institute of Technology, Chennai",
    "alternateName": "VIT Chennai"
  },
  "award": "Winner of Hack4Bengal 3.0 (Eastern India's Largest Hackathon)",
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
    "https://www.wikidata.org/wiki/Q141715213",
    "https://www.wikidata.org/entity/Q141715213",
    "https://linkedin.com/in/aritro-saha",
    "https://github.com/halcyon-past",
    "https://pypi.org/project/quarantine-py/",
    "https://leetcode.com/u/AritroSaha/",
    "https://www.youtube.com/@veripyed",
    "https://instagram.com/halcyon-past",
    "https://siliconsync.aritro.cloud/",
    "https://openworld.aritro.cloud/",
    "https://byakugan-scan.aritro.cloud/",
    "https://quarantine-py.aritro.cloud/",
    "https://structurify.aritro.cloud/",
    "https://onepiece.aritro.cloud/",
    "https://ijirt.org/article?manuscript=180711"
  ]
};

const PROJECTS = [
  {
    id: 'byakugan-scan',
    title: 'Byakugan Scan',
    description: 'Instant, in-memory screen OCR, QR code, and barcode recognition utility for macOS',
    image: '/assets/Byakugan-Scan.webp',
    github: 'https://github.com/halcyon-past/byakugan-scan',
    liveDemo: 'https://byakugan-scan.aritro.cloud',
    docs: 'https://byakugan-scan.aritro.cloud/support',
    techStack: ['Swift 6.0', 'AppKit', 'SwiftUI', 'Apple Vision Framework', 'Neural Engine', 'macOS 14+', 'Homebrew Cask'],
    overview: 'Byakugan Scan is a native macOS menu bar utility for instant, in-memory screen OCR, QR code, and barcode recognition. Unlike conventional screenshot OCR tools that write temporary image files to disk and trigger Spotlight or media analysis daemons, Byakugan Scan captures selected screen regions directly into NSPasteboard memory as a CGImage buffer and processes them on the Apple Neural Engine in under 50ms—with zero temporary files, zero network calls, and zero external Swift package dependencies.',
    features: [
      'Zero-Disk In-Memory Pipeline: Captures screen selections straight into RAM via NSPasteboard and runs Apple Vision requests (VNRecognizeTextRequest and VNDetectBarcodesRequest) on the Neural Engine in under 50ms.',
      '60/120Hz Custom AppKit Overlay: Smooth multi-display selection reticle with customizable theme accents (Byakugan Violet, Tenseigan Cyan, Sharingan Crimson, Sage Emerald, Nine-Tails Amber) and adjustable backdrop dimming.',
      'Multi-Language OCR & Barcode Decoding: Supports automatic language detection across 13+ languages alongside QR, MicroQR, EAN-8/13, UPC-E, Code 128/39/93, PDF417, Aztec, and Data Matrix symbologies.',
      'Floating HUD & Contextual Actions: Frosted-glass HUD toast displaying character/word counts and one-click actions to open URLs, compose emails, or dial phone numbers without cluttering Notification Center.',
      'URL Scheme Automation & Local History: Deep-link automation via byakugan:// for Raycast, Alfred, and Shortcuts, plus a searchable local scan history with category filters and pinning.'
    ]
  },
  {
    id: 'openworld-portfolio',
    title: 'OpenWorld Portfolio',
    description: 'Interactive 2.5D retro Pokémon-inspired open-world developer portfolio set in Pallet Cloud',
    image: '/assets/OpenWorld-Portfolio.webp',
    github: 'https://github.com/halcyon-past/openworld-portfolio',
    liveDemo: 'https://openworld.aritro.cloud/',
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas 2D', 'Web Audio API', 'Web Speech API'],
    overview: 'OpenWorld Portfolio is an interactive, retro Pokémon-inspired 2.5D open-world developer portfolio set in Pallet Cloud. Built completely from scratch with Next.js 16, React 19, and native HTML5 Canvas 2D without third-party game engines, it features interactive buildings, a high-definition Mega Jumbotron TV, a turn-based Pokémon battle arena against Gym Leader Aritro at the Silicon Gym, a Poké Mart skill shopping cart with rich HTML mail requisitions, and an instant-toggle Executive Recruiter Dossier.',
    features: [
      'Custom 2.5D Canvas Engine: Delivers hardware-accelerated 60 FPS rendering with Painter\'s algorithm depth sorting, dynamic elevation plateaus, and procedural GBA-styled wild grass with random developer encounters.',
      'Silicon Gym & Turn-Based Boss Battle: Authentic GBA-style Pokémon battle arena featuring Gym Leader Aritro (Lv. 99), a tactical 4-action decision menu, elemental animations, 8 inspectable Gym Badges, and a Master Ball recruit sequence.',
      'Poké Mart Tech Stack & Graphical Requisitions: Interactive skill catalog partitioned across Languages, Cloud, Backend, and AI, allowing recruiters to add capabilities to a cart, compose inquiries, and dispatch authentic Pokémon airmail-styled requisitions directly via email or rich clipboard export.',
      'Interactive Town Landmarks & World Exploration: Explore Pallet Cloud landmarks including rotating project previews on the Mega Jumbotron TV, Innovation Pokédex Center, AI Research Lab with LeetCode Knight stats, developer arcade minigames, and animated wildlife.',
      'Executive Recruiter Dossier Mode: Instant one-click toggle between the 2.5D game world and an executive portfolio dossier view, featuring direct resume access, enterprise highlights, and URL hash navigation.'
    ]
  },
  {
    id: 'quarantine',
    title: 'Quarantine',
    description: 'Zero-dependency dead-letter queue and fault-tolerance library for Python loops',
    image: '/assets/Quarantine.webp',
    github: 'https://github.com/halcyon-past/quarantine',
    liveDemo: 'https://pypi.org/project/quarantine-py/',
    docs: 'https://quarantine-py.aritro.cloud',
    techStack: ['Python 3.9+', 'PyPI', 'AsyncIO', 'CLI', 'Dead-Letter Queue', 'Fault Tolerance', 'Pytest'],
    overview: 'quarantine is an open-source, zero-dependency Python library that brings dead-letter queue resilience to regular loops and batch data pipelines. When processing thousands of records (e.g., CSV ingestion, scraping, API syncing), an unexpected exception at item #5,247 no longer crashes the entire multi-hour run. quarantine safely isolates the failing item, captures the error and full execution state to disk, and keeps the loop running.',
    features: [
      'Zero-Crash Decorators: Wrap any sync or async function with @quarantine or iterate with shield() to set aside failures without interrupting the pipeline.',
      'Atomic On-Disk Isolation: Serializes failed inputs, exceptions, and full tracebacks atomically to disk (.quarantine/) without requiring external message brokers.',
      'Surgical Replays & Interactive Debugging: Rerun only failed items using quarantine retry or drop straight into pdb with the exact failing input using quarantine debug.',
      'Circuit Breakers & Sensitive Redaction: Automatic circuit breaker tripping via halt_after to prevent cascading external outages, plus built-in key/regex redaction for secrets.',
      'Local Web UI & Observability: Built-in CLI commands and a local web dashboard to inspect tracebacks, track recovery stats, and integrate into CI/CD pipelines.'
    ]
  },
  {
    id: 'structurify',
    title: 'Structurify',
    description: 'AI-powered SaaS that transforms messy spreadsheet data into a clean master schema',
    image: '/assets/Structurify.webp',
    github: 'https://github.com/halcyon-past/Structurify',
    liveDemo: 'https://structurify.aritro.cloud',
    techStack: ['Next.js 14', 'React', 'TailwindCSS', 'Firebase', 'FastAPI', 'Python', 'LangGraph', 'Google Gemini', 'Google Cloud Platform'],
    overview: 'Structurify is a production-ready, event-driven B2B SaaS platform that turns unstructured CSV and XLSX files into a standardized schema using Google Gemini, with a serverless fan-out architecture on GCP for resilient, scalable processing.',
    features: [
      'Strict Schema Enforcement: Enforces exact JSON and Excel structure with reliable type-casting and validation.',
      'Sandbox Preview Mode: Lets users validate the first 10 rows before launching a full job.',
      'Auto-Clean Mode: Infers schema from headers and normalizes capitalization, whitespace, and date formats automatically.',
      'Serverless Fan-Out Pipeline: Uses Pub/Sub, Cloud Run workers, and a LangGraph map-reduce flow to process large jobs without blocking the API.',
      'Real-Time Observability: Streams job progress, audit logs, and secure download links through Firestore-backed live updates.'
    ]
  },
  {
    id: 'luffy-laser-dodge',
    title: 'Luffy Laser Dodge',
    description: 'Interactive 3D reflex game dodging laser beams using actual head movements via webcam',
    image: '/assets/luffy-laser-dodge.webp',
    github: 'https://github.com/halcyon-past/Luffy-Laser-Dodge',
    liveDemo: 'https://onepiece.aritro.cloud/',
    techStack: ['React', 'Vite', 'React Three Fiber', 'Three.js', 'MediaPipe AI', 'WebAssembly', 'WebRTC (Legacy)', 'Python FastAPI (Legacy)'],
    overview: 'Luffy Laser Dodge is an interactive, browser-based 3D reflex game where you use your actual head movements via webcam to dodge laser beams shot by Kuma! The game seamlessly melds computer vision with 3D web rendering to create a unique physically interactive experience—all running 100% locally in your browser.',
    features: [
      'Real-Time AI Head Tracking: Uses Google\'s MediaPipe via WebAssembly (WASM) to detect face and lean angles instantly.',
      'Dynamic 3D Scene: Powered by Three.js and @react-three/fiber with fully rigged 3D models with bone-level procedural animation.',
      '100% Client-Side Processing: Webcam data is processed entirely on the local GPU/CPU for zero latency and absolute privacy.',
      'Legacy WebRTC Support: Originally built with a WebRTC + Python FastAPI backend for heavy AI inference, later migrated to WASM for zero-latency serverless deployment.'
    ]
  },
  {
    id: 'glide-connect',
    title: 'GlideConnect',
    description: 'Virtual Mouse Control using Gesture Recognition and Voice Assistant',
    image: '/assets/GlideConnect.webp',
    github: 'https://github.com/halcyon-past/Glide-Connect',
    researchPaper: 'https://ijirt.org/article?manuscript=180711',
    techStack: ['Python 3.9', 'MediaPipe', 'OpenCV', 'Google Gemini API', 'PyAutoGUI', 'PyCAW'],
    overview: 'A Final Year Project for VIT, this project demonstrates a novel way to control a computer interface using hand gestures and voice commands. It leverages MediaPipe for real-time gesture recognition, integrates a custom voice assistant named Krishna, and incorporates generative AI (using Google Gemini) for enhanced query responses.',
    features: [
      'Cursor Control: Move the mouse pointer using hand movements.',
      'Click Operations: Perform left, right, and double clicks with specific finger gestures.',
      'System Controls: Adjust system volume and screen brightness using pinch gestures.',
      'Voice Assistant (Krishna): Launch gesture recognition, Google search, file navigation, and enter Divine Mode.',
      'Divine Mode (GenAI): Leverage Google Gemini Flash for generative AI responses including screenshot analysis.'
    ]
  },
  {
    id: 'pawsitive',
    title: 'PAWsitive',
    description: 'Centralized Platform for Pet Healthcare',
    image: '/assets/Pawsitive.webp',
    github: 'https://github.com/halcyon-past/PAW-sitive',
    liveDemo: 'https://www.bepawsitive.xyz',
    techStack: ['React', 'Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Node.js', 'Kinde Auth', 'UploadThing', 'Callchimp.AI'],
    overview: 'PAWsitive is a comprehensive web application designed to help pet owners find blood donors, veterinary clinics, and rescue centers with ease. Built at Hack4Bengal, Eastern India\'s Largest Hackathon.',
    features: [
      'Blood Donors & Vet Clinics Directory: Search and filter based on specific criteria.',
      'Rescue Centers Directory: Access a directory of rescue centers with ambulance services.',
      'Registration Portals: Register as a blood donor, veterinary clinic, rescue center, or event host.',
      'Voice Assistant: Customer support and educational resources via Callchimp.AI.',
      'AI Chatbot: Gemini powered AI chatbot to tackle animal-related queries.'
    ]
  }
];

const STATIC_ROUTES = [
  {
    route: '/about',
    title: 'About Aritro Saha | Software Engineer 1 at Bristol Myers Squibb',
    description: 'Learn about Aritro Saha (Megh), a Software Engineer 1 at Bristol Myers Squibb, VIT Chennai graduate, and Winner of Hack4Bengal 3.0.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>About Aritro Saha — Software Engineer 1 at Bristol Myers Squibb</h1>
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
        <h1>Gallery — Aritro Saha</h1>
      </header>
      <main>
        <article>
          <p>Visual gallery featuring moments from Hack4Bengal 3.0, engineering events, and project showcases by Aritro Saha.</p>
        </article>
      </main>
    `
  },
  {
    route: '/play',
    title: 'The Arcade | Aritro Saha - Developer Games',
    description: 'A collection of minimalist, developer-themed games built directly into Aritro Saha\'s portfolio.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `
      <header>
        <h1>The Developer Arcade by Aritro Saha</h1>
      </header>
      <main>
        <article>
          <p>Interactive browser-based games engineered natively in React by Aritro Saha:</p>
          <ul>
            <li><a href="${SITE_URL}/play/typing-test">Developer Speed Test</a> — Terminal-style WPM typing speed test for programmers.</li>
            <li><a href="${SITE_URL}/play/data-pipeline">Data Pipeline Puzzle</a> — Connect data nodes without crossing pipelines.</li>
            <li><a href="${SITE_URL}/play/snake">Minimalist Snake</a> — Python developer edition of classic Snake.</li>
            <li><a href="${SITE_URL}/play/sudoku">Sudoku</a> — Classic number placement logic puzzle.</li>
            <li><a href="${SITE_URL}/play/space-invaders">Space Invaders</a> — Defend the server from incoming bugs.</li>
            <li><a href="${SITE_URL}/play/flappy-bird">Flappy Bird</a> — Classic obstacle navigation game.</li>
            <li><a href="${SITE_URL}/play/tictactoe">Tic Tac Toe</a> — Play against an unbeatable Minimax AI agent.</li>
          </ul>
        </article>
      </main>
    `
  },
  {
    route: '/play/typing-test',
    title: 'Developer Speed Test | Aritro Saha Arcade',
    description: 'Test your coding typing speed with this minimalist terminal-style speed test game by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `<header><h1>Developer Speed Test — Aritro Saha Arcade</h1></header><main><article><p>Test your coding typing speed (WPM and accuracy) with programming keywords in this terminal-style typing game built by Aritro Saha.</p></article></main>`
  },
  {
    route: '/play/data-pipeline',
    title: 'Data Pipeline Puzzle | Aritro Saha Arcade',
    description: 'Connect the nodes to build a data pipeline without crossing lines. A logic puzzle for data science engineers by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `<header><h1>Data Pipeline Puzzle — Aritro Saha Arcade</h1></header><main><article><p>A logic puzzle game for data science engineers where you connect source and sink nodes without crossing pipelines.</p></article></main>`
  },
  {
    route: '/play/snake',
    title: 'Minimalist Snake | Aritro Saha Arcade',
    description: 'Play the classic Snake game collecting tech stack icons on an infinite grid, built by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `<header><h1>Minimalist Snake — Aritro Saha Arcade</h1></header><main><article><p>The Python developer edition of classic Snake where you collect tech stack icons.</p></article></main>`
  },
  {
    route: '/play/sudoku',
    title: 'Sudoku | Aritro Saha Arcade',
    description: 'Play classic Sudoku right inside your browser at Aritro Saha\'s Developer Arcade.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `<header><h1>Sudoku — Aritro Saha Arcade</h1></header><main><article><p>Classic logic-based number placement puzzle built in React by Aritro Saha.</p></article></main>`
  },
  {
    route: '/play/space-invaders',
    title: 'Space Invaders | Aritro Saha Arcade',
    description: 'Defend your codebase from incoming bugs in this retro shooter by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `<header><h1>Space Invaders — Aritro Saha Arcade</h1></header><main><article><p>Retro arcade shooter where you defend production servers from incoming software bugs.</p></article></main>`
  },
  {
    route: '/play/flappy-bird',
    title: 'Flappy Bird | Aritro Saha Arcade',
    description: 'Navigate the bird through the pipes in Aritro Saha\'s Developer Arcade.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `<header><h1>Flappy Bird — Aritro Saha Arcade</h1></header><main><article><p>Navigate through the pipes in this classic arcade game built by Aritro Saha.</p></article></main>`
  },
  {
    route: '/play/tictactoe',
    title: 'Tic Tac Toe | Aritro Saha Arcade',
    description: 'Play against a Minimax AI in this minimalist classic by Aritro Saha.',
    image: `${SITE_URL}/banner-social.jpg`,
    articleHtml: `<header><h1>Tic Tac Toe (Minimax AI) — Aritro Saha Arcade</h1></header><main><article><p>Challenge an unbeatable Minimax algorithm AI in Tic Tac Toe.</p></article></main>`
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
  const escapedTitle = escapeHtml(title);
  const escapedDesc = escapeHtml(description);
  const escapedImage = escapeHtml(image);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personGraphNode,
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "description": description,
        "author": { "@id": `${SITE_URL}/#person` }
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

  // Replace canonical link
  html = html.replace(
    /<link data-rh="true" rel="canonical" href="[^"]*"\s*\/>/,
    `<link data-rh="true" rel="canonical" href="${canonicalUrl}" />`
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

  // 1. Generate static pages for all Projects
  for (const project of PROJECTS) {
    const route = `/projects/${project.id}`;
    const title = `${project.title} | Projects by Aritro Saha`;
    const description = project.overview || project.description;
    const image = `${SITE_URL}${project.image}`;

    const featuresList = project.features
      .map((f) => `<li>${escapeHtml(f)}</li>`)
      .join('\n            ');
    const techList = project.techStack
      .map((t) => `<li>${escapeHtml(t)}</li>`)
      .join('\n            ');

    const linksList = [
      project.github ? `<li><a href="${project.github}">GitHub Repository</a></li>` : '',
      project.liveDemo ? `<li><a href="${project.liveDemo}">Live Website / Package</a></li>` : '',
      project.docs ? `<li><a href="${project.docs}">Documentation</a></li>` : '',
      project.researchPaper ? `<li><a href="${project.researchPaper}">Published Research Paper</a></li>` : ''
    ].filter(Boolean).join('\n            ');

    const articleHtml = `
        <header>
          <h1>${escapeHtml(project.title)} — by Aritro Saha</h1>
          <p>${escapeHtml(project.description)}</p>
        </header>
        <main>
          <article>
            <h2>Overview</h2>
            <p>${escapeHtml(project.overview)}</p>
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
      "@type": "SoftwareSourceCode",
      "@id": `${SITE_URL}${route}#software`,
      "name": project.title,
      "description": project.overview,
      "url": `${SITE_URL}${route}`,
      "codeRepository": project.github,
      "programmingLanguage": project.techStack,
      "author": { "@id": `${SITE_URL}/#person` }
    };

    const routeHtml = buildRouteHtml(template, {
      route,
      title,
      description,
      image,
      articleHtml,
      extraJsonLdNodes: [softwareNode]
    });

    const outDir = path.join(distDir, 'projects', project.id);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), routeHtml, 'utf-8');
    generatedCount++;
  }

  // 2. Generate static pages for core & arcade routes
  for (const page of STATIC_ROUTES) {
    const routeHtml = buildRouteHtml(template, page);
    const outDir = path.join(distDir, page.route.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), routeHtml, 'utf-8');
    generatedCount++;
  }

  console.log(`✅ Pre-rendered ${generatedCount} static HTML routes for LLM & non-JS web scrapers.`);
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
