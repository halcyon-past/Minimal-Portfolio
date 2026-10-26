import { SITE_URL } from '../siteConfig.js';

/**
 * Ensures a URL is absolute with the canonical SITE_URL.
 */
export function absoluteUrl(pathOrUrl = '/') {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Format date in YYYY-MM-DD
 */
export function formatDate(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().split('T')[0];
}

/**
 * Token counter approx: 1 token ~= 4 characters
 */
export function countTokens(text = '') {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}

/**
 * Creates markdown link with escaped brackets/parens in label if needed
 */
export function mdLink(text, url) {
  const cleanText = String(text || '').replace(/[[\]]/g, '\\$&');
  return `[${cleanText}](${url})`;
}

/**
 * Formats a markdown heading
 */
export function heading(text, level = 1) {
  const hashes = '#'.repeat(Math.max(1, Math.min(6, level)));
  return `${hashes} ${text}`;
}

/**
 * Formats a bullet list
 */
export function bulletList(items = []) {
  return items
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join('\n');
}

/**
 * Formats a numbered list
 */
export function numberedList(items = []) {
  return items
    .filter(Boolean)
    .map((item, index) => `${index + 1}. ${item}`)
    .join('\n');
}

/**
 * Formats a markdown table
 */
export function table(headers = [], rows = [[]]) {
  if (!headers.length) return '';
  const headerLine = `| ${headers.join(' | ')} |`;
  const separatorLine = `| ${headers.map(() => '---').join(' | ')} |`;
  const rowLines = rows
    .map((row) => `| ${row.map((cell) => String(cell ?? '').replace(/\|/g, '\\|')).join(' | ')} |`)
    .join('\n');
  return `${headerLine}\n${separatorLine}\n${rowLines}`;
}

/**
 * Standard Markdown Page Template
 */
export function formatMarkdownPage({
  title,
  summary,
  canonicalPath = '/',
  lastUpdated = '2026-10-26',
  content = '',
  relatedLinks = []
}) {
  const canonical = absoluteUrl(canonicalPath);
  const sections = [];

  // Title
  sections.push(`# ${title.trim()}`);

  // Summary
  if (summary) {
    sections.push(`> ${summary.trim()}`);
  }

  // Metadata
  sections.push(`Canonical: ${canonical}\nLast updated: ${lastUpdated}`);

  // Main Content
  if (content) {
    sections.push(content.trim());
  }

  // Related
  if (relatedLinks && relatedLinks.length > 0) {
    sections.push(`## Related\n${bulletList(relatedLinks.map((r) => mdLink(r.title, absoluteUrl(r.url))))}`);
  }

  return sections.join('\n\n') + '\n';
}
