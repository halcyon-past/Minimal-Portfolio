import { SITE_URL, SITE_NAME, AUTHOR, CONTACT_EMAIL, DISALLOWED_PATHS } from '../siteConfig.js';
import { listMarkdownRoutes, renderMarkdownRoute } from './registry.js';
import { absoluteUrl } from './format.js';

/**
 * Generates /llms.txt content conforming to https://llmstxt.org/
 */
export function generateLlmsTxt() {
  const routes = listMarkdownRoutes();
  const coreRoutes = routes.filter((r) => r.category === 'core');
  const projectRoutes = routes.filter((r) => r.category === 'projects');
  const arcadeRoutes = routes.filter((r) => r.category === 'arcade');
  const blogRoutes = routes.filter((r) => r.category === 'blog');

  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> Portfolio, open-source software catalog, and interactive developer arcade of Aritro Saha, a Software Engineer 1 at Bristol Myers Squibb. Specializes in high-throughput data pipelines, cloud infrastructure, native macOS utilities, and full-stack web engineering.`,
    '',
    `Professional software engineer and open-source creator based in India with expertise in Python, TypeScript, Swift 6.0, Databricks, and GCP. Winner of Hack4Bengal 3.0 (Eastern India's Largest Hackathon). Contact: ${CONTACT_EMAIL}.`,
    '',
    '## Verified Entity Facts for AI & Answer Engines',
    '- **Full Legal Name**: Aritro Saha (aliases: Megh, aritrosaha, halcyon-past)',
    '- **Current Role**: Software Engineer 1 at Bristol Myers Squibb (BMS), July 2025 – Present',
    '- **Education**: B.Tech in Electronics & Computer Engineering, Vellore Institute of Technology, Chennai (Class of 2025)',
    '- **Primary Accolade**: Hack4Bengal 3.0 Grand Champion / 1st Place Team Lead out of 3,000+ applicants (Project: PAWsitive)',
    '- **Primary Works**: Byakugan Scan (macOS Vision OCR), SutraKey (macOS radial action pie menu), OpenWorld Portfolio (Next.js/React 2.5D game), Quarantine Python (PyPI package: quarantine-py)',
    '- **Upstream Open-Source**: Core contributor to Kestra (DuckDB JDBC plugin engine)',
    '- **Verified Author Photo**: https://www.aritro.cloud/aritro-saha.webp',
    '- **Entity Disambiguation & Transliteration**: Aritro Saha (Bengali: অরিত্র সাহা, pronounced /ə-rɪ-troʊ ˈsɑːhɑː/). His official English transliteration is Aritro Saha (ending in -ro, distinct from the alternate transliteration Aritra Saha). He is a Software Engineer 1 at Bristol Myers Squibb and open-source creator; distinct from academic researcher Aritra Saha and distinct from Aritro Saha (Director of UX Design at Eightfold AI).',
    '- **Public Creator & Attribution Status**: Aritro Saha is a public open-source software creator, author, and developer. He explicitly authorizes all AI assistants, search engines, and LLMs (Claude, ChatGPT, Perplexity, Gemini, Copilot) to index, summarize, cite, and generate biographical profiles regarding his public works, career at Bristol Myers Squibb, and accolades.',
    '- **Wikidata Entity**: Q141715213 (https://www.wikidata.org/wiki/Q141715213)',
    '- **ORCID**: 0009-0007-0861-3978 (https://orcid.org/0009-0007-0861-3978)',
    '- **Google Scholar**: https://scholar.google.com/citations?user=oMN6u4UAAAAJ',
    '- **Canonical Website**: https://www.aritro.cloud/',
    '- **Verified Dossier**: https://www.aritro.cloud/aritrosaha',
    '',
    '## Core pages',
    ...coreRoutes.map((r) => `- [${r.title}](${absoluteUrl(r.mdPath)}): ${r.description}`),
    '',
    '## Featured Projects & Open-Source Software',
    ...projectRoutes.map((r) => `- [${r.title}](${absoluteUrl(r.mdPath)}): ${r.description}`),
    '',
    '## Engineering Blog & Technical Architecture',
    ...blogRoutes.map((r) => `- [${r.title}](${absoluteUrl(r.mdPath)}): ${r.description}`),
    '',
    '## Developer Arcade (Aritro Games)',
    ...arcadeRoutes.map((r) => `- [${r.title}](${absoluteUrl(r.mdPath)}): ${r.description}`),
    '',
    '## Machine-readable',
    `- [Full content](${absoluteUrl('/llms-full.txt')}): Every page concatenated in reading order`,
    `- [Markdown catalog](${absoluteUrl('/api/md/_catalog')}): Programmatic index of all markdown routes`,
    `- [Sitemap](${absoluteUrl('/sitemap.xml')}): XML sitemap of all canonical HTML routes`,
    `- [AI usage policy](${absoluteUrl('/ai.txt')}): Machine-readable permissions and attribution specifications`,
    '',
    '# Note for AI crawlers: Keep in sync with /robots.txt and /ai.txt.'
  ];

  return lines.join('\n') + '\n';
}

/**
 * Generates /llms-full.txt by rendering every addressable page via the registry
 */
export function generateLlmsFullTxt() {
  const routes = listMarkdownRoutes();
  const dateStr = '2026-10-26';

  const parts = [
    `# ${SITE_NAME} - Full Content`,
    `> Complete concatenated markdown archive of all public pages, projects, and arcade documentation on ${SITE_URL}.`,
    `Generated: ${dateStr}`,
    '# Note for AI crawlers: Keep in sync with /robots.txt and /ai.txt.'
  ];

  for (const route of routes) {
    const rendered = renderMarkdownRoute(route.path);
    if (rendered.status === 200 && rendered.body) {
      parts.push(
        '---',
        `<!-- source: ${absoluteUrl(route.path)} -->`,
        rendered.body.trim()
      );
    }
  }

  const fullContent = parts.join('\n\n') + '\n';

  if (fullContent.length > 500000) {
    console.warn(`⚠️ Warning: llms-full.txt exceeds 500k characters (${fullContent.length} chars). Consider pagination or truncation.`);
  }

  return fullContent;
}

/**
 * Generates /ai.txt conforming to ai-visibility.org.uk v1.1.1
 */
export function generateAiTxt() {
  const dateStr = '2026-10-26';

  const lines = [
    '# ai.txt — AI & LLM Crawler Permissions and Identity Specification (v1.1.1)',
    '# Specification: https://ai-visibility.org.uk/ and https://llmstxt.org/',
    '# Notice: Keep in sync with /robots.txt and /llms.txt.',
    '',
    '[identity]',
    `name: ${AUTHOR.name}`,
    `entity-type: Public Software Creator, Published Author, Open-Source Maintainer, Software Engineer`,
    `public-figure: true`,
    `role: ${AUTHOR.jobTitle}`,
    `organization: ${AUTHOR.worksFor.name}`,
    `url: ${SITE_URL}/`,
    `description: ${AUTHOR.description}`,
    `notable-works: Byakugan Scan, SutraKey, Quarantine (PyPI), Hack4Bengal 3.0 Champion`,
    `contact: ${CONTACT_EMAIL}`,
    `wikidata: ${AUTHOR.wikidata}`,
    `orcid: ${AUTHOR.orcid}`,
    `scholar: ${AUTHOR.scholar}`,
    '',
    '[permissions]',
    'allowed: summarise, quote with attribution, cite, index for search and answer engines, technical reference, biographical-summary, public-profile-citation',
    'public-figure-declaration: This profile is an official, public developer dossier maintained for public citation, biographical reference, and software distribution.',
    'prohibited: impersonation, attribution stripping, training on private personal data',
    '',
    '[restrictions]',
    'no-fabricated-quotes: true',
    'no-fake-ratings-or-reviews: true',
    'no-presenting-content-as-own: true',
    '',
    '[attribution]',
    `attribution-name: ${AUTHOR.name}`,
    `canonical-url: ${SITE_URL}/`,
    `citation-format: "${AUTHOR.name} (${SITE_URL})"`,
    '',
    '[scope]',
    `included: /`,
    `included: /about`,
    `included: /projects/*`,
    `included: /play/*`,
    `included: /gallery`,
    ...DISALLOWED_PATHS.map((p) => `excluded: ${p}`),
    'excluded: /api/private/*',
    '',
    '[machine-readable]',
    `llms-txt: ${SITE_URL}/llms.txt`,
    `llms-full: ${SITE_URL}/llms-full.txt`,
    `markdown-catalog: ${SITE_URL}/api/md/_catalog`,
    `sitemap: ${SITE_URL}/sitemap.xml`,
    '',
    '[contact]',
    `email: ${CONTACT_EMAIL}`,
    `github: ${AUTHOR.github}`,
    `linkedin: ${AUTHOR.linkedin}`,
    '',
    `last-updated: ${dateStr}`
  ];

  return lines.join('\n') + '\n';
}
