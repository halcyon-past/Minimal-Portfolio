# XML Sitemap Audit: aritro.cloud

**Audit Date:** October 28, 2026  
**Sitemap URL:** `https://www.aritro.cloud/sitemap.xml`  
**Sitemap Score:** **88 / 100**

---

## 1. Discovery & Validation Analysis

Running `sitemap_discovery.py https://www.aritro.cloud --json` confirmed:
- `robots.txt` properly declares: `Sitemap: https://www.aritro.cloud/sitemap.xml`
- Sitemap status: HTTP 200 OK
- Valid XML syntax declaration with namespace `http://www.sitemaps.org/schemas/sitemap/0.9`
- Total `<url>` entries: **24**

---

## 2. Complete URL Inventory Breakdown

| Category | Count | Example URLs | Priority Range |
|---|---|---|---|
| **Core Landing** | 4 | `/`, `/about`, `/aritrosaha`, `/aritro-saha` | 0.85 – 1.0 |
| **Project Case Studies** | 8 | `/projects/byakugan-scan`, `/projects/sutrakey`, `/projects/openworld-portfolio`, `/projects/quarantine`, etc. | 0.8 – 0.9 |
| **Arcade & Games** | 8 | `/play`, `/play/typing-test`, `/play/data-pipeline`, `/play/snake`, etc. | 0.6 – 0.8 |
| **Visual Gallery** | 1 | `/gallery` | 0.7 |
| **Plain Text Files (Anomaly)** | 3 | `/llms.txt`, `/llms-full.txt`, `/ai.txt` | 0.9 |

---

## 3. Issues & Recommended Actions

### Issue 3.1: Plain Text URLs in Standard Sitemap (High Severity)
- Lines 130–146 declare:
  ```xml
  <url>
    <loc>https://www.aritro.cloud/llms.txt</loc>
    <lastmod>2026-10-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.aritro.cloud/llms-full.txt</loc>
    <lastmod>2026-10-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.aritro.cloud/ai.txt</loc>
    <lastmod>2026-10-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ```
- **Impact:** Google Search Console flags non-HTML URLs in standard sitemaps as errors. These text files are already referenced in HTTP Link headers and `robots.txt`.
- **Fix:** Remove `/llms.txt`, `/llms-full.txt`, and `/ai.txt` from `sitemap.xml`.

### Issue 3.2: Duplicate Slug Indexation (`/aritro-saha`)
- `/aritro-saha` is currently indexed in the sitemap alongside `/aritrosaha`.
- **Fix:** If `/aritro-saha` is converted to a 301 redirect or canonicalized to `/aritrosaha`, remove it from `sitemap.xml` so only the canonical URL is submitted.
