# Full Website SEO Audit: aritro.cloud

**Target URL:** `https://www.aritro.cloud` (Apex: `https://aritro.cloud`)  
**Audit Date:** October 28, 2026  
**Auditor:** Claude SEO Multi-Platform Specialist Engine  
**Overall SEO Health Score:** **91 / 100 (Tier 1: High Quality)**

---

## Executive Summary

A comprehensive, multi-category SEO audit of `https://www.aritro.cloud` was performed evaluating technical architecture, content quality, on-page optimization, Schema.org structured data, performance, mobile UX, AI search readiness (GEO), and agent UX.

The website represents an exceptionally well-engineered software developer portfolio and interactive engineering catalog. Key architectural strengths include:
1. **Pre-Rendered Static HTML:** All 21 public application routes are pre-rendered into static HTML, providing immediate sub-second content delivery to search engines without requiring client-side JavaScript execution.
2. **Robust Entity Resolution:** A comprehensive Schema.org `@graph` binds the author (`#person`) to 24 authoritative registries, including Wikidata (Q141715213), ORCID, GitHub, and LeetCode, with explicit entity disambiguation.
3. **Advanced AI Search & Agent Readiness:** Full compliance with `llms.txt`, `llms-full.txt`, and `ai.txt` specifications; flawless 100% P0 agentic pass rate across GPTBot, ClaudeBot, and PerplexityBot.
4. **Strong Security & Technical Standards:** Let's Encrypt TLS valid through 2027, HSTS, strict security headers, and true HTTP 404 error responses.

The audit identified several high-impact optimization opportunities, particularly around XML sitemap cleanup, keyword cannibalization consolidation between profile slugs, internal linking equity from the homepage fallback, and rich schema additions for arcade games.

---

## Category Score Card

| Category | Weight | Score | Weighted Contribution |
|---|---|---|---|
| **Technical SEO** | 22% | **92 / 100** | 20.24 |
| **Content Quality & E-E-A-T** | 23% | **89 / 100** | 20.47 |
| **On-Page SEO** | 20% | **90 / 100** | 18.00 |
| **Schema / Structured Data** | 10% | **91 / 100** | 9.10 |
| **Performance & Core Web Vitals** | 10% | **91 / 100** | 9.10 |
| **AI Search Readiness (GEO)** | 10% | **94 / 100** | 9.40 |
| **Images & Visual Assets** | 5% | **88 / 100** | 4.40 |
| **Total SEO Health Score** | **100%** | **91 / 100** | **90.71 / 100** |

---

## Top 5 Key Findings

1. **XML Sitemap Lists Non-HTML Plain Text Files (High):** `public/sitemap.xml` lists `/llms.txt`, `/llms-full.txt`, and `/ai.txt` inside the standard `<urlset>`. Sitemaps are designed for canonical HTML documents or media. Google Search Console will flag plain text files as crawling anomalies.
2. **Homepage Pre-Rendered Fallback Omits Internal Navigation to Key Pages (High):** While the pre-rendered HTML fallback of `dist/index.html` links to all 8 projects and `/play`, it completely omits links to `/about`, `/gallery`, and `/aritrosaha`. Search crawlers that evaluate raw static HTML see these pages as orphaned from the primary root.
3. **Keyword Cannibalization between `/aritrosaha` and `/aritro-saha` (High):** Both `/aritrosaha` (rich 1,174-word profile) and `/aritro-saha` (1-sentence redirect stub) are indexed in `sitemap.xml` with self-referencing canonicals, causing search engines to split ranking authority on branded queries.
4. **Resumes Blocked in `robots.txt` from Search Engines (Medium):** `robots.txt` explicitly disallows `/assets/resume/`. While protecting against scrapers, it prevents recruiters searching `"Aritro Saha resume"` from discovering the resume on search engines. There is no alternative indexable HTML `/resume` page.
5. **Pre-rendered Arcade & Gallery Pages Lack Depth (Medium):** Pre-rendered static HTML fallbacks for `/gallery` (no images or captions) and `/play/*` (single-sentence descriptions) appear thin to web crawlers prior to client-side React hydration.

---

## Top 5 Quick Wins

1. **Clean XML Sitemap:** Remove `/llms.txt`, `/llms-full.txt`, and `/ai.txt` from `public/sitemap.xml` (keep them referenced in `robots.txt` and HTTP `Link:` headers).
2. **Consolidate Profile Slugs:** Configure a 301 permanent redirect from `/aritro-saha` to `/aritrosaha` in `vercel.json` (or set the canonical to `/aritrosaha`).
3. **Compress Favicon:** Re-generate `public/favicon.ico` from 285 KB down to < 20 KB using PNG compression, and declare an SVG vector favicon in `<head>`.
4. **Add Missing Open Graph Tags:** Add `<meta property="og:site_name" content="Aritro Saha Portfolio" />` and `<meta property="og:locale" content="en_US" />` in `index.html`.
5. **Synchronize `.well-known/ai.txt`:** Overwrite `public/.well-known/ai.txt` with the updated v1.1.1 specification currently in `public/ai.txt`.

---

## Detailed Category Audits

### 1. Technical SEO (Score: 92/100)
- **Crawlability:** Flawless status codes across all 21 pre-rendered routes. Pre-rendering ensures 100% of body text and metadata are accessible to crawlers without executing JavaScript.
- **Indexability & 404s:** Custom 404 page returns a strict HTTP 404 status code with `<meta name="robots" content="noindex, follow" />`. Soft-404 tests pass completely.
- **Apex & SSL:** `https://aritro.cloud` returns a 308 redirect to `https://www.aritro.cloud/`. Let's Encrypt wildcard certificate is valid through January 2027.
- **Security Headers:** HSTS (63,072,000s), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and strict Permissions-Policy are enforced via `vercel.json`.
- **IndexNow:** Verified 32-byte key file present; submission script pingable.

### 2. Content Quality & E-E-A-T (Score: 89/100)
- **Algorithmic Quality Engine:** Evaluated by `content_quality.py` with an overall score of **94/100** (0% filler, 0% AI patterns, 0.902 information density).
- **E-E-A-T Signals:** Verified professional roles at Bristol Myers Squibb and Bajaj Finserv Health; grand championship at Hack4Bengal 3.0; first-author publication in IJIRT (Paper ID: 180711); top 6% globally on LeetCode.
- **Entity Disambiguation:** Dedicated banner and Schema.org description distinguish Aritro from his namesake at Eightfold AI.

### 3. On-Page SEO (Score: 90/100)
- **Title Tags:** Every route features a unique, keyword-rich title between 20 and 75 characters.
- **Meta Descriptions:** Every route has an engaging meta description under 165 characters.
- **Heading Hierarchy:** Strict single `<h1>` tag followed by logical `<h2>` sections on every pre-rendered route.
- **Internal Linking:** Internal links connect projects and games; needs navigation links from the homepage fallback to `/about`, `/gallery`, and `/aritrosaha`.

### 4. Schema & Structured Data (Score: 91/100)
- **Current Graph:** Multi-node Schema.org `@graph` uniting `Person`, `Organization`, `WebPage`, `ProfilePage`, `ImageObject`, and `SoftwareSourceCode`.
- **Opportunities:** Adding `VideoGame` and `WebApplication` schema to the 7 arcade games, `ImageGallery` schema to `/gallery`, and `ScholarlyArticle` schema to the GlideConnect project page.

### 5. Performance & Core Web Vitals (Score: 91/100)
- **TTFB:** Sub-120ms from Vercel Edge CDN.
- **LCP & FCP:** Pre-rendered HTML renders initial content in < 1.2s.
- **Code-Splitting:** 15 modular chunks; largest vendor chunk is 262 kB (React 19).
- **Opportunity:** Favicon file size reduction from 285 KB to < 20 KB.

### 6. AI Search Readiness & GEO (Score: 94/100)
- **Agent Matrix:** GPTBot, OAI-SearchBot, Claude-SearchBot, and PerplexityBot receive identical 200 OK responses with zero WAF blocks.
- **llms.txt Compliance:** Both `llms.txt` (5.4 KB) and `llms-full.txt` (42.6 KB) follow specifications.
- **Agent UX:** 100/100 score; 0 unnamed interactive elements, 7 semantic landmarks.
- **Opportunity:** Add `Content-Signal:` headers to `robots.txt` and synchronize `/.well-known/ai.txt`.

### 7. Images & Visual Assets (Score: 88/100)
- **Formats:** All project images and personal photos are converted to lightweight WebP.
- **CLS Prevention:** Explicit dimensions (400x400) declared on headshot assets.
- **Opportunity:** Ensure `/gallery` static HTML fallback pre-renders all 8 images with `<figure>` and `<figcaption>` elements.
