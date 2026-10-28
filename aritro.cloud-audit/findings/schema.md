# Schema & Structured Data Audit: aritro.cloud

**Audit Date:** October 28, 2026  
**Structured Data Score:** **91 / 100** (Weight: 10%)

---

## 1. Current Schema Graph Implementation

The website employs a structured `@graph` JSON-LD format generated dynamically across all static routes via `scripts/prerender-routes.js`.

### 1.1 Existing Schema Entities Verified
1. **`Person` (`https://www.aritro.cloud/#person`):**
   - `name`: "Aritro Saha"
   - `alternateName`: ["Megh", "aritrosaha", "halcyon-past"]
   - `jobTitle`: "Software Engineer 1"
   - `worksFor`: `Organization` ("Bristol Myers Squibb")
   - `alumniOf`: `CollegeOrUniversity` ("Vellore Institute of Technology, Chennai")
   - `award`: "Winner of Hack4Bengal 3.0"
   - `disambiguatingDescription`: Clear distinction from the namesake Director of Product Design at Eightfold AI.
   - `knowsAbout`: 13 distinct technology entities.
   - `sameAs`: 24 authoritative external profiles including Wikidata, ORCID, GitHub, LeetCode, PyPI, LinkedIn, YouTube, ProductHunt, and AlternativeTo.

2. **`Organization` (`https://www.aritro.cloud/#organization`):**
   - Brand entity representing the portfolio with logo, contact point, and official sameAs links.

3. **`WebPage` (`{canonicalUrl}#webpage`):**
   - Unique URL, name, description, author reference (`#person`), and primary image reference (`#author-image`).

4. **`ProfilePage` (`https://www.aritro.cloud/#profilepage`):**
   - Implemented on the homepage with `mainEntity` pointing to `#person`.

5. **`SoftwareSourceCode` (`{canonicalUrl}#software`):**
   - Implemented on all 8 project pages (`/projects/*`) with `codeRepository`, `programmingLanguage`, and `author`.

---

## 2. Validation Status

- **JSON Syntax:** Valid (0 syntax errors, verified by `scripts/test-seo.js`).
- **Entity Resolution:** All node identifiers use standard `#fragment` URI notation referencing the canonical domain (`https://www.aritro.cloud/#person`).
- **Rich Result Test Compliance:** Pass. No required fields missing on `Person`, `WebPage`, or `SoftwareSourceCode`.

---

## 3. Schema Expansion Opportunities

### 3.1 Missing `VideoGame` / `WebApplication` on Arcade Routes (Medium Severity)
The 7 games under `/play/*` represent browser-based interactive web applications. Adding `VideoGame` schema enables rich interactive cards in Google:
```json
{
  "@type": "VideoGame",
  "@id": "https://www.aritro.cloud/play/snake#game",
  "name": "Minimalist Snake — Developer Edition",
  "description": "Python-inspired Snake browser game where developers collect tech stack icons on an infinite grid.",
  "gamePlatform": "Web Browser",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Any modern web browser",
  "author": { "@id": "https://www.aritro.cloud/#person" },
  "playMode": "SinglePlayer",
  "genre": ["Arcade", "Puzzle"]
}
```

### 3.2 Missing `ImageGallery` on `/gallery` (Low Severity)
`/gallery` showcases real hackathon and engineering moments. Marking it with `ImageGallery` structured data and linking individual `ImageObject` entries will assist Google Images in cataloging the photo series:
```json
{
  "@type": "ImageGallery",
  "@id": "https://www.aritro.cloud/gallery#gallery",
  "name": "Aritro Saha Engineering & Hackathon Gallery",
  "description": "Visual highlights from Hack4Bengal 3.0, tech conferences, and software development milestones.",
  "author": { "@id": "https://www.aritro.cloud/#person" }
}
```

### 3.3 Missing `ScholarlyArticle` on `/projects/glide-connect` (Low Severity)
The GlideConnect project page discusses published academic research. Incorporating `ScholarlyArticle` schema signals academic authority:
```json
{
  "@type": "ScholarlyArticle",
  "@id": "https://www.aritro.cloud/projects/glide-connect#paper",
  "headline": "Virtual Mouse Control Using Hand Gesture Recognition and Voice Assistant",
  "author": { "@id": "https://www.aritro.cloud/#person" },
  "publisher": {
    "@type": "Organization",
    "name": "International Journal of Innovative Research in Technology (IJIRT)"
  },
  "sameAs": "https://ijirt.org/article?manuscript=180711"
}
```
