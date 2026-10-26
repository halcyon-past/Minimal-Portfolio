import { listMarkdownRoutes, renderMarkdownRoute } from '../src/lib/md/registry.js';
import { generateLlmsTxt, generateLlmsFullTxt, generateAiTxt } from '../src/lib/md/llms.js';
import { prefersMarkdown } from '../src/lib/md/http.js';
import { projects, rawGames } from '../src/data/portfolioData.js';
import { SITE_URL } from '../src/lib/siteConfig.js';

// Explicit list of known non-content routes with reasons
const EXPLICIT_SKIPPED_ROUTES = {
  '*': 'Wildcard client-side 404 route - intentionally handled by 404 markdown response',
  '/404': 'Error page - not an indexed content route',
  '/.well-known/mcp.json': 'Skipped - no MCP server is operated on this domain'
};

function verifyAllRoutesHaveRenderers() {
  console.log('🔍 Checking route coverage in markdown registry...');

  // 1. Gather all routes from App.jsx and data sources
  const expectedRoutes = [
    '/',
    '/about',
    '/gallery',
    '/play',
    ...rawGames.map((g) => g.path),
    ...projects.map((p) => `/projects/${p.id}`)
  ];

  const registeredRoutes = listMarkdownRoutes();
  const registeredPaths = new Set(registeredRoutes.map((r) => r.path));

  let failed = false;

  for (const expected of expectedRoutes) {
    if (!registeredPaths.has(expected)) {
      if (EXPLICIT_SKIPPED_ROUTES[expected]) {
        console.log(`   ⏭️ Skipped expected route ${expected} (${EXPLICIT_SKIPPED_ROUTES[expected]})`);
      } else {
        console.error(`   ❌ Missing markdown renderer for public route: ${expected}`);
        failed = true;
      }
    } else {
      // Test rendering
      const result = renderMarkdownRoute(expected);
      if (result.status !== 200 || !result.body) {
        console.error(`   ❌ Route ${expected} failed to render valid markdown! (status: ${result.status})`);
        failed = true;
      } else {
        // Check required template elements
        const body = result.body;
        const hasHeading = /^#\s+.+/m.test(body);
        const hasCanonical = /Canonical:\s+https?:\/\//.test(body);
        const hasLastUpdated = /Last updated:\s+\d{4}-\d{2}-\d{2}/.test(body);

        if (!hasHeading || !hasCanonical || !hasLastUpdated) {
          console.error(`   ❌ Route ${expected} failed format specification (missing heading, canonical, or last-updated).`);
          failed = true;
        }

        // Check required headers
        const headers = result.headers;
        if (!headers['Content-Type']?.includes('text/markdown')) {
          console.error(`   ❌ Route ${expected} missing text/markdown Content-Type.`);
          failed = true;
        }
        if (!headers['X-Markdown-Tokens']) {
          console.error(`   ❌ Route ${expected} missing X-Markdown-Tokens header.`);
          failed = true;
        }
        if (headers['X-Robots-Tag'] !== 'noindex, follow') {
          console.error(`   ❌ Route ${expected} missing X-Robots-Tag: noindex, follow header.`);
          failed = true;
        }
      }
    }
  }

  if (failed) {
    throw new Error('Route verification failed. See errors above.');
  }

  console.log(`✅ All ${expectedRoutes.length} public app routes are covered by markdown renderers.`);
}

function verifyContentNegotiation() {
  console.log('🔍 Checking Content Negotiation (q-value evaluation)...');

  // Should return true for text/markdown
  if (!prefersMarkdown('text/markdown')) {
    throw new Error('prefersMarkdown failed for plain "text/markdown"');
  }

  // Should return true if markdown has higher q
  if (!prefersMarkdown('text/html;q=0.8, text/markdown;q=0.9')) {
    throw new Error('prefersMarkdown failed when markdown q > html q');
  }

  // Should return false when HTML has higher q
  if (prefersMarkdown('text/html, text/markdown;q=0.5')) {
    throw new Error('prefersMarkdown should return false when html q > markdown q');
  }

  // Should return false for standard browser accept
  if (prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')) {
    throw new Error('prefersMarkdown should return false for browser accept header');
  }

  // Should return false for */* or missing
  if (prefersMarkdown('*/*') || prefersMarkdown('')) {
    throw new Error('prefersMarkdown should return false for */* or empty string');
  }

  console.log('✅ Content negotiation correctly favors HTML on browsers & wildcard, and Markdown when requested.');
}

function verify404Markdown() {
  console.log('🔍 Checking 404 Markdown handling...');
  const result = renderMarkdownRoute('/this-does-not-exist');
  if (result.status !== 404) {
    throw new Error(`Expected 404 status, got ${result.status}`);
  }
  if (!result.body.includes('# 404 - Route Not Found')) {
    throw new Error('404 body does not contain expected markdown');
  }
  if (!result.headers['Content-Type']?.includes('text/markdown')) {
    throw new Error('404 response must be text/markdown');
  }
  console.log('✅ 404 routes return status 404 with clean markdown body.');
}

function verifyLlmsTxtFiles() {
  console.log('🔍 Checking llms.txt, llms-full.txt, and ai.txt generation...');
  const llms = generateLlmsTxt();
  if (!llms.includes('# Aritro Saha Portfolio') || !llms.includes('## Core pages')) {
    throw new Error('llms.txt generation invalid');
  }

  const full = generateLlmsFullTxt();
  if (!full.includes('# Aritro Saha Portfolio - Full Content') || full.length < 5000) {
    throw new Error(`llms-full.txt generation invalid or too short (${full.length} chars)`);
  }

  const ai = generateAiTxt();
  if (!ai.includes('[identity]') || !ai.includes('[permissions]') || !ai.includes('[attribution]')) {
    throw new Error('ai.txt generation invalid');
  }

  console.log(`✅ llms.txt, llms-full.txt (${full.length} chars), and ai.txt generated cleanly.`);
}

function run() {
  console.log('🚀 Running AI Markdown & LLM Route Verification Tests...\n');
  try {
    verifyAllRoutesHaveRenderers();
    verifyContentNegotiation();
    verify404Markdown();
    verifyLlmsTxtFiles();
    console.log('\n🎉 ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error(`\n❌ TEST FAILURE: ${err.message}`);
    process.exit(1);
  }
}

run();
