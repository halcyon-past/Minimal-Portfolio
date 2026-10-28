import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const publicDir = path.join(projectRoot, 'public');

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ ${testName}`);
  } else {
    console.error(`  ❌ FAIL: ${testName} ${details ? `(${details})` : ''}`);
    throw new Error(`Test failed: ${testName}`);
  }
}

function testSitemap() {
  console.log('\n🔍 [1/6] Testing public/sitemap.xml...');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), 'sitemap.xml exists');

  const content = fs.readFileSync(sitemapPath, 'utf8');
  assert(content.startsWith('<?xml'), 'sitemap has valid XML declaration');
  assert(content.includes('<urlset'), 'sitemap contains <urlset>');

  const urlBlocks = content.match(/<url>[\s\S]*?<\/url>/g) || [];
  assert(urlBlocks.length >= 20, `sitemap has at least 20 indexed URLs (found: ${urlBlocks.length})`);

  let lastmodCount = 0;
  let priorityCount = 0;
  let changefreqCount = 0;

  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>(https:\/\/www\.aritro\.cloud[^<]*)<\/loc>/);
    assert(!!locMatch, 'Every <url> has canonical https://www.aritro.cloud <loc>');

    if (/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(block)) lastmodCount++;
    if (/<priority>(0\.\d+|1\.0)<\/priority>/.test(block)) priorityCount++;
    if (/<changefreq>(always|hourly|daily|weekly|monthly|yearly|never)<\/changefreq>/.test(block)) changefreqCount++;
  }

  assert(lastmodCount === urlBlocks.length, 'Every URL entry declares valid <lastmod> date');
  assert(priorityCount === urlBlocks.length, 'Every URL entry declares valid <priority> between 0.1 and 1.0');
  assert(changefreqCount === urlBlocks.length, 'Every URL entry declares valid <changefreq>');
  assert(content.includes('https://www.aritro.cloud/aritrosaha'), 'sitemap contains /aritrosaha');
  assert(content.includes('https://www.aritro.cloud/aritro-saha'), 'sitemap contains /aritro-saha');
}

function testRobotsTxt() {
  console.log('\n🔍 [2/6] Testing public/robots.txt...');
  const robotsPath = path.join(publicDir, 'robots.txt');
  assert(fs.existsSync(robotsPath), 'robots.txt exists');

  const content = fs.readFileSync(robotsPath, 'utf8');
  assert(content.includes('User-agent: *'), 'Declares User-agent: *');
  assert(content.includes('Sitemap: https://www.aritro.cloud/sitemap.xml'), 'Declares canonical XML sitemap location');

  // Verify critical AI search bots are allowed
  const bots = ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'PerplexityBot', 'Bravebot', 'Googlebot'];
  for (const bot of bots) {
    assert(content.includes(`User-agent: ${bot}`), `Explicitly configures ${bot}`);
  }
}

function testIndexNowKey() {
  console.log('\n🔍 [3/6] Testing IndexNow verification key...');
  const keyPath = path.join(publicDir, '1953f9e8941ee7944f2543cb476201b8.txt');
  assert(fs.existsSync(keyPath), 'IndexNow key file exists');

  const stats = fs.statSync(keyPath);
  assert(stats.size === 32, `IndexNow key file is strictly 32 bytes with no trailing newline (found: ${stats.size})`);

  const key = fs.readFileSync(keyPath, 'utf8');
  assert(key === '1953f9e8941ee7944f2543cb476201b8', 'Key file matches expected IndexNow verification token');
}

function testVercelConfig() {
  console.log('\n🔍 [4/6] Testing vercel.json configuration...');
  const vercelPath = path.join(projectRoot, 'vercel.json');
  assert(fs.existsSync(vercelPath), 'vercel.json exists');

  const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  assert(config.cleanUrls === true, 'cleanUrls is enabled');
  assert(config.trailingSlash === false, 'trailingSlash is disabled (prevents duplicate URLs)');

  // Verify security headers
  const rootHeaderRule = (config.headers || []).find((h) => h.source === '/(.*)');
  assert(!!rootHeaderRule, 'Catch-all security header rule is defined');

  const headerKeys = (rootHeaderRule?.headers || []).map((h) => h.key);
  assert(headerKeys.includes('X-Content-Type-Options'), 'X-Content-Type-Options header present');
  assert(headerKeys.includes('X-Frame-Options'), 'X-Frame-Options header present (anti-clickjacking)');
  assert(headerKeys.includes('Referrer-Policy'), 'Referrer-Policy header present');
  assert(headerKeys.includes('Permissions-Policy'), 'Permissions-Policy header present');

  // Verify rewrite rule excludes static file extensions (prevents soft 404s)
  const rewrites = config.rewrites || [];
  const indexRewrite = rewrites.find((r) => r.destination === '/index.html');
  assert(!!indexRewrite, 'SPA fallback rewrite exists');
  assert(!indexRewrite.source.includes('/(.*)'), 'SPA fallback does NOT use blanket /(.*) that breaks 404s for files with extensions');
}

function testPrerenderedDist() {
  console.log('\n🔍 [5/6] Testing pre-rendered dist/ HTML routes & metadata...');
  assert(fs.existsSync(distDir), 'dist/ directory exists (run build first)');

  // Verify 404.html
  const notFoundPath = path.join(distDir, '404.html');
  assert(fs.existsSync(notFoundPath), 'dist/404.html is generated for true HTTP 404 responses');
  const notFoundHtml = fs.readFileSync(notFoundPath, 'utf8');
  assert(notFoundHtml.includes('content="noindex'), 'dist/404.html includes noindex tag');

  // Verify index.html does not have the DOM meta removal script
  const indexPath = path.join(distDir, 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  assert(!indexHtml.includes('document.querySelectorAll(\'meta[data-rh="true"]\').forEach'), 'No dangerous DOM meta wiping script on DOMContentLoaded');

  // Scan all generated HTML routes
  function scanDir(dir) {
    let files = [];
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) files.push(...scanDir(full));
      else if (item.name.endsWith('.html') && item.name !== '404.html') files.push(full);
    }
    return files;
  }

  const htmlFiles = scanDir(distDir);
  assert(htmlFiles.length >= 20, `Pre-rendered at least 20 static HTML routes (found: ${htmlFiles.length})`);

  for (const file of htmlFiles) {
    const rel = path.relative(distDir, file);
    const html = fs.readFileSync(file, 'utf8');

    // Exactly 1 H1
    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
    assert(h1Matches.length === 1, `${rel} has exactly 1 <h1> tag (found: ${h1Matches.length})`);

    // Title tag length
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    assert(!!titleMatch, `${rel} has a <title> tag`);
    const titleLen = titleMatch ? titleMatch[1].trim().length : 0;
    assert(titleLen >= 20 && titleLen <= 75, `${rel} <title> length between 20-75 chars (found: ${titleLen})`);

    // Meta description length <= 165 chars
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    assert(!!descMatch, `${rel} has a meta description`);
    const descLen = descMatch ? descMatch[1].trim().length : 0;
    assert(descLen <= 165, `${rel} meta description is <= 165 chars for optimal SERP snippets (found: ${descLen})`);

    // Canonical tag
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    assert(!!canonicalMatch && canonicalMatch[1].startsWith('https://www.aritro.cloud'), `${rel} has canonical pointing to https://www.aritro.cloud`);

    // JSON-LD validation
    const jsonLdMatch = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
    assert(!!jsonLdMatch, `${rel} has JSON-LD structured data`);
    let parsedJson = null;
    try {
      parsedJson = JSON.parse(jsonLdMatch[1]);
    } catch {
      assert(false, `${rel} JSON-LD parses as valid JSON`);
    }
    assert(!!parsedJson, `${rel} JSON-LD is valid JSON`);

    // Verify sameAs entity links include authority signals on homepage
    if (rel === 'index.html') {
      const personNode = parsedJson['@graph']?.find((n) => n['@type'] === 'Person');
      assert(!!personNode, 'Homepage schema includes Person graph entity');
      const sameAs = personNode?.sameAs || [];
      assert(sameAs.includes('https://www.wikidata.org/wiki/Q141715213'), 'Person schema includes Wikidata authority');
      assert(sameAs.includes('https://orcid.org/0009-0007-0861-3978'), 'Person schema includes ORCID authority');
      assert(sameAs.includes('https://github.com/halcyon-past/aritrosaha'), 'Person schema includes GitHub repository authority');
      assert(sameAs.includes('https://www.producthunt.com/@halcyon_past'), 'Person schema includes Product Hunt authority');
    }
  }
}

function testBundleSize() {
  console.log('\n🔍 [6/6] Testing Core Web Vitals bundle code-splitting...');
  const assetsDir = path.join(distDir, 'assets');
  assert(fs.existsSync(assetsDir), 'dist/assets/ directory exists');

  const jsFiles = fs.readdirSync(assetsDir).filter((f) => f.endsWith('.js'));
  assert(jsFiles.length > 5, `Code-splitting is active with multiple chunks (found: ${jsFiles.length})`);

  let maxChunkSize = 0;
  let largestFile = '';

  for (const js of jsFiles) {
    const size = fs.statSync(path.join(assetsDir, js)).size;
    if (size > maxChunkSize) {
      maxChunkSize = size;
      largestFile = js;
    }
    // Verify no chunk exceeds 500 kB
    assert(size < 500 * 1024, `Chunk ${js} is under 500 kB limit (size: ${(size / 1024).toFixed(1)} kB)`);
  }

  console.log(`  ℹ️  Largest JS chunk: ${largestFile} (${(maxChunkSize / 1024).toFixed(1)} kB)`);
}

function run() {
  console.log('🚀 Running Technical SEO & Architecture Test Suite...\n');
  try {
    testSitemap();
    testRobotsTxt();
    testIndexNowKey();
    testVercelConfig();
    testPrerenderedDist();
    testBundleSize();
    console.log(`\n🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
  } catch (err) {
    console.error(`\n❌ TEST SUITE FAILED: ${err.message}`);
    process.exit(1);
  }
}

run();
