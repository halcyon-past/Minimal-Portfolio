import { renderMarkdownRoute, listMarkdownRoutes } from '../src/lib/md/registry.js';
import { generateLlmsTxt, generateLlmsFullTxt, generateAiTxt } from '../src/lib/md/llms.js';
import { prefersMarkdown, GLOBAL_DESCRIBEDBY_HEADER } from '../src/lib/md/http.js';

export function viteMarkdownPlugin() {
  const handler = (req, res, next) => {
    const rawUrl = req.url || '/';
    const [pathname] = rawUrl.split('?');
    const method = req.method ? req.method.toUpperCase() : 'GET';

    // 1. OPTIONS Preflight
    if (method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
      res.statusCode = 204;
      res.end();
      return;
    }

    // 2. Dynamic Machine-Readable Text Endpoints
    if (pathname === '/llms.txt') {
      const content = generateLlmsTxt();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.statusCode = 200;
      if (method === 'HEAD') {
        res.end();
      } else {
        res.end(content);
      }
      return;
    }

    if (pathname === '/llms-full.txt') {
      const content = generateLlmsFullTxt();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.statusCode = 200;
      if (method === 'HEAD') {
        res.end();
      } else {
        res.end(content);
      }
      return;
    }

    if (pathname === '/ai.txt') {
      const content = generateAiTxt();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.statusCode = 200;
      if (method === 'HEAD') {
        res.end();
      } else {
        res.end(content);
      }
      return;
    }

    // 3. Direct backend URL (/api/md/*)
    if (pathname.startsWith('/api/md')) {
      const routeResult = renderMarkdownRoute(pathname, false);
      for (const [key, val] of Object.entries(routeResult.headers)) {
        res.setHeader(key, val);
      }
      res.statusCode = routeResult.status;
      if (method === 'HEAD') {
        res.end();
      } else {
        res.end(routeResult.body);
      }
      return;
    }

    // 4. .md URL suffix (/pricing.md, /index.md, /projects/sutrakey.md, /does-not-exist.md)
    if (pathname.endsWith('.md')) {
      const routeResult = renderMarkdownRoute(pathname, false);
      for (const [key, val] of Object.entries(routeResult.headers)) {
        res.setHeader(key, val);
      }
      res.statusCode = routeResult.status;
      if (method === 'HEAD') {
        res.end();
      } else {
        res.end(routeResult.body);
      }
      return;
    }

    // 5. Content Negotiation: Accept: text/markdown
    // Exclusions: static assets, sitemap, robots, vite internal paths
    const isExcluded = (
      pathname.startsWith('/@') ||
      pathname.startsWith('/src/') ||
      pathname.startsWith('/node_modules/') ||
      pathname.startsWith('/assets/') ||
      pathname.startsWith('/.well-known/') ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      pathname.includes('.')
    );

    if (!isExcluded && prefersMarkdown(req.headers['accept'])) {
      // Check if requested path is an addressable content route
      const cleanPath = pathname.replace(/\/$/, '') || '/';
      const addressableRoutes = listMarkdownRoutes();
      const isContentRoute = addressableRoutes.some((r) => r.path === cleanPath);

      if (isContentRoute) {
        const routeResult = renderMarkdownRoute(cleanPath, true);
        for (const [key, val] of Object.entries(routeResult.headers)) {
          res.setHeader(key, val);
        }
        res.statusCode = routeResult.status;
        if (method === 'HEAD') {
          res.end();
        } else {
          res.end(routeResult.body);
        }
        return;
      }
    }

    // 6. Global Link describedby header for standard responses
    const originalSetHeader = res.setHeader.bind(res);
    res.setHeader = function (key, value) {
      if (String(key).toLowerCase() === 'content-type' && String(value).includes('text/html')) {
        originalSetHeader('Link', GLOBAL_DESCRIBEDBY_HEADER);
      }
      return originalSetHeader(key, value);
    };

    next();
  };

  return {
    name: 'vite-plugin-markdown-routes',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}
