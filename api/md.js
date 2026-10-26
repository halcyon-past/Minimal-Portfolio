import { renderMarkdownRoute } from '../src/lib/md/registry.js';
import { generateLlmsTxt, generateLlmsFullTxt, generateAiTxt } from '../src/lib/md/llms.js';
import { prefersMarkdown } from '../src/lib/md/http.js';

export default async function handler(req, res) {
  const method = req.method ? req.method.toUpperCase() : 'GET';

  // OPTIONS Preflight
  if (method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
    return res.status(204).end();
  }

  // Resolve requested path
  let targetPath = req.query?.path || req.url || '/';
  if (Array.isArray(targetPath)) {
    targetPath = targetPath.join('/');
  }
  targetPath = targetPath.split('?')[0];

  // Static machine-readable text files
  if (targetPath === '/llms.txt' || targetPath === 'llms.txt') {
    const text = generateLlmsTxt();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (method === 'HEAD') return res.status(200).end();
    return res.status(200).send(text);
  }

  if (targetPath === '/llms-full.txt' || targetPath === 'llms-full.txt') {
    const text = generateLlmsFullTxt();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (method === 'HEAD') return res.status(200).end();
    return res.status(200).send(text);
  }

  if (targetPath === '/ai.txt' || targetPath === 'ai.txt') {
    const text = generateAiTxt();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (method === 'HEAD') return res.status(200).end();
    return res.status(200).send(text);
  }

  const isNegotiated = prefersMarkdown(req.headers['accept']);
  const result = renderMarkdownRoute(targetPath, isNegotiated);

  for (const [key, value] of Object.entries(result.headers)) {
    res.setHeader(key, value);
  }

  if (method === 'HEAD') {
    return res.status(result.status).end();
  }

  return res.status(result.status).send(result.body);
}
