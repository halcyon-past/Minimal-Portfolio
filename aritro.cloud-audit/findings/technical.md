# Technical SEO Audit: aritro.cloud

**Audit Date:** October 28, 2026  
**Audited Domain:** `https://www.aritro.cloud` (Apex: `https://aritro.cloud`)  
**Technical SEO Score:** **92 / 100** (Weight: 22%)

---

## 1. Crawlability & Indexability Architecture

### 1.1 Server-Side & Static Pre-Rendering (SSG)
- **Status:** PASS (Excellent)
- **Architecture:** The site uses Vite with custom Static Site Generation (`scripts/prerender-routes.js`). All 21 public application routes are compiled to static HTML files with pre-rendered semantic `<header>`, `<main>`, `<article>`, and `<figure>` content inside `#root`.
- **Crawler Impact:** Search crawlers that do not execute JavaScript (or experience rendering timeouts) immediately receive full page content, navigation links, and JSON-LD structured data. Words in raw initial HTML exceed 470 words on homepage and 1,000+ words on project pages.

### 1.2 HTTP Status Codes & 404 Error Handling
- **Status:** PASS (Strictly Enforced)
- **Findings:**
  - 200 OK verified across all 21 pre-rendered HTML routes.
  - Non-existent route probe (`/claude-seo-404-probe-*` and `/non-existent-page-xyz-123`) returns a **true HTTP 404 status code** with custom 404 HTML body.
  - Zero Soft-404 risk: Vercel does not blanket-rewrite missing assets to `200 OK` on `/index.html`.
  - `dist/404.html` includes `<meta name="robots" content="noindex, follow" />`.

### 1.3 Canonicalization & Redirect Infrastructure
- **Status:** PASS with 1 Recommendation
- **Apex Domain:** `https://aritro.cloud` returns a 1-hop **HTTP 308 Permanent Redirect** to `https://www.aritro.cloud/`.
- **HTTP to HTTPS:** `http://aritro.cloud` and `http://www.aritro.cloud` cleanly redirect with 308 to `https://www.aritro.cloud/`.
- **Trailing Slash:** `trailingSlash: false` in `vercel.json` prevents duplicate URL permutations (e.g., `/about` vs `/about/`).
- **Canonicals:** Self-referencing canonical tags are present on 100% of routes.
- **Finding:** `/aritro-saha` and `/aritrosaha` are both indexed with self-canonicals, despite `/aritro-saha` being a thin 1-sentence placeholder redirecting users to `/aritrosaha`.

### 1.4 Security Headers & TLS Configuration
- **Status:** PASS (A+ Rating)
- **TLS Certificate:** Wildcard certificate `*.aritro.cloud` issued by Let's Encrypt (CN=YR1), verified valid until Jan 10, 2027 GMT.
- **Security Headers Verified:**
  - `Strict-Transport-Security: max-age=63072000` (HSTS enabled with 2-year duration)
  - `X-Content-Type-Options: nosniff` (Prevents MIME-type sniffing)
  - `X-Frame-Options: SAMEORIGIN` (Clickjacking mitigation)
  - `Referrer-Policy: strict-origin-when-cross-origin` (Protects referrer data while allowing analytics)
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()` (Restricts hardware sensor access)

### 1.5 IndexNow Integration
- **Status:** PASS
- **Implementation:** Verification token file `public/1953f9e8941ee7944f2543cb476201b8.txt` is strictly 32 bytes without trailing whitespace or newlines. Ping script `scripts/ping-indexnow.js` notifies IndexNow search engines (Bing, Yandex, Seznam, Naver) of updates instantaneously.

---

## 2. Issues & Opportunities Identified

### Issue 2.1: Non-HTML Text Files Declared in XML Sitemap (Severity: High)
- **Problem:** `public/sitemap.xml` contains:
  ```xml
  <loc>https://www.aritro.cloud/llms.txt</loc>
  <loc>https://www.aritro.cloud/llms-full.txt</loc>
  <loc>https://www.aritro.cloud/ai.txt</loc>
  ```
- **Technical Context:** Standard XML sitemaps under the Sitemaps.org protocol are intended for HTML documents or recognized rich media extensions. Sitemaps containing raw `.txt` files trigger warnings or indexing errors in Google Search Console.
- **Remediation:** Remove plain text files from `sitemap.xml`. AI agents and crawlers discover these via `robots.txt` comments, `<link rel="alternate">` tags, and HTTP `Link: <...>; rel="describedby"` headers.

### Issue 2.2: Disallow /assets/resume/ in robots.txt (Severity: Medium)
- **Problem:** `robots.txt` sets `Disallow: /assets/resume/`.
- **Technical Context:** The resume PDF (`/assets/resume/Aritro-Saha-Software-Engineer-Resume.pdf`) is linked on the homepage. Blocking `/assets/resume/` prevents Googlebot from crawling and indexing the resume text. When recruiters search `"Aritro Saha resume"` or `"Aritro Saha Bristol Myers Squibb resume"`, the portfolio cannot rank a resume result.
- **Remediation:** Create a dedicated, pre-rendered HTML page at `/resume` that contains full resume details (accessible, mobile-friendly, indexed) with a download button pointing to the PDF.

### Issue 2.3: Vercel Static Precedence Over Accept Header Rewrites (Severity: Low)
- **Problem:** When querying `curl -H "Accept: text/markdown" https://www.aritro.cloud/`, HTML is returned instead of Markdown.
- **Technical Context:** Vercel serves static files (`index.html`) prior to evaluating route rewrites that match request headers. Direct markdown extensions (`/index.md`, `/about.md`) function properly.
- **Remediation:** Rely primarily on direct `.md` URLs declared in `<link rel="alternate" type="text/markdown" href="https://www.aritro.cloud/index.md" />`.
