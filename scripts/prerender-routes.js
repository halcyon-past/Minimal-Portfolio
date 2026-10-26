import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projects } from '../src/data/portfolioData.js';
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
  "jobTitle": AUTHOR.jobTitle,
  "description": AUTHOR.description,
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
    "https://orcid.org/0009-0007-0861-3978",
    "https://linkedin.com/in/aritro-saha",
    "https://github.com/halcyon-past",
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
  const markdownUrl = `${SITE_URL}${route === '/' ? '/index.md' : `${route}.md`}`;
  const escapedTitle = escapeHtml(title);
  const escapedDesc = escapeHtml(description);
  const escapedImage = escapeHtml(image);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      personGraphNode,
      organizationGraphNode,
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
    const description = project.details?.overview || project.description;
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
      "@type": "SoftwareSourceCode",
      "@id": `${SITE_URL}${route}#software`,
      "name": project.title,
      "description": project.details?.overview || project.description,
      "url": `${SITE_URL}${route}`,
      "codeRepository": project.github,
      "programmingLanguage": project.details?.techStack || [],
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

  // 2. Generate static HTML pages for core & arcade routes
  for (const page of STATIC_ROUTES) {
    const routeHtml = buildRouteHtml(template, page);
    const outDir = path.join(distDir, page.route.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), routeHtml, 'utf-8');
    generatedCount++;
  }

  console.log(`✅ Pre-rendered ${generatedCount} static HTML routes for web scrapers & bots.`);

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
