import { countTokens, absoluteUrl } from './format.js';
import { SITE_URL } from '../siteConfig.js';

/**
 * Parses an Accept header and determines if text/markdown has a strictly higher
 * quality value (q) than text/html.
 * Wildcard (*\/*) or missing Accept header returns false (HTML gets priority).
 */
export function prefersMarkdown(acceptHeader = '') {
  if (!acceptHeader || typeof acceptHeader !== 'string') return false;

  const entries = acceptHeader.split(',').map((part) => part.trim());
  let markdownQ = 0;
  let htmlQ = 0;

  for (const entry of entries) {
    const [mediaType, ...params] = entry.split(';').map((s) => s.trim().toLowerCase());
    let q = 1.0;

    for (const param of params) {
      if (param.startsWith('q=')) {
        const parsed = parseFloat(param.slice(2));
        if (!isNaN(parsed)) q = parsed;
      }
    }

    if (mediaType === 'text/markdown') {
      markdownQ = Math.max(markdownQ, q);
    } else if (mediaType === 'text/html' || mediaType === 'application/xhtml+xml') {
      htmlQ = Math.max(htmlQ, q);
    }
  }

  // Markdown is served ONLY when text/markdown is explicitly requested with a higher q than text/html
  return markdownQ > 0 && markdownQ > htmlQ;
}

/**
 * Builds standard headers for markdown responses
 */
export function buildMarkdownHeaders({
  body = '',
  canonicalPath = '/',
  isNegotiated = false,
  lastModified = 'Mon, 26 Oct 2026 00:00:00 GMT',
  cacheControl = 'public, s-maxage=3600, stale-while-revalidate=86400'
}) {
  const canonical = absoluteUrl(canonicalPath);
  const tokenCount = countTokens(body);

  const headers = {
    'Content-Type': 'text/markdown; charset=utf-8',
    'X-Markdown-Tokens': String(tokenCount),
    'X-Robots-Tag': 'noindex, follow',
    'Content-Location': canonical,
    'Link': `<${canonical}>; rel="canonical"`,
    'Cache-Control': cacheControl,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Content-Type',
    'Last-Modified': lastModified
  };

  if (isNegotiated) {
    headers['Vary'] = 'Accept';
  }

  return headers;
}

/**
 * Creates a 404 Markdown response
 */
export function build404Markdown(path = '') {
  const title = '404 - Route Not Found';
  const canonical = absoluteUrl(path);
  const body = [
    `# ${title}`,
    '',
    `> The requested path \`${path}\` does not exist or has no markdown representation on this server.`,
    '',
    `Canonical: ${canonical}`,
    `Last updated: 2026-10-26`,
    '',
    '## Available Routes',
    `You can explore the full catalog of available markdown routes at [${SITE_URL}/api/md/_catalog](${SITE_URL}/api/md/_catalog) or view the site overview in [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt).`,
    '',
    '## Related',
    `- [Home](${SITE_URL}/)`,
    `- [About](${SITE_URL}/about)`,
    `- [The Arcade](${SITE_URL}/play)`,
    `- [Markdown Catalog](${SITE_URL}/api/md/_catalog)`
  ].join('\n') + '\n';

  return {
    status: 404,
    body,
    headers: buildMarkdownHeaders({
      body,
      canonicalPath: path || '/404',
      cacheControl: 'no-cache, no-store, must-revalidate'
    })
  };
}

/**
 * Global describedby header advertising /llms.txt, /llms-full.txt, and /ai.txt
 */
export const GLOBAL_DESCRIBEDBY_HEADER = [
  `<${SITE_URL}/llms.txt>; rel="describedby"`,
  `<${SITE_URL}/llms-full.txt>; rel="describedby"`,
  `<${SITE_URL}/ai.txt>; rel="describedby"`
].join(', ');
