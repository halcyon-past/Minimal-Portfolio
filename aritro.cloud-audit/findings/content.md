# Content Quality & E-E-A-T Audit: aritro.cloud

**Audit Date:** October 28, 2026  
**Content Quality Score:** **89 / 100** (Weight: 23%)  
**Algorithmic Quality Engine Score:** **94 / 100** (0% Filler, 0% AI cliches, 0.902 Information Density)

---

## 1. Executive Content Assessment

Aritro Saha's website demonstrates outstanding technical depth, strong informational density, and high-quality first-party signals. The writing avoids generic marketing fluff, filler sentences, and common AI boilerplate phrasing.

### 1.1 E-E-A-T Breakdown (Experience, Expertise, Authoritativeness, Trustworthiness)

| Pillar | Signals on Site | Evidence / Status |
|---|---|---|
| **Experience** | Real enterprise engineering, healthcare data pipelines, native Swift macOS apps | <ul><li>Software Engineer 1, Bristol Myers Squibb (July 2025 - Present)</li><li>Data Science Intern, Bajaj Finserv Health (Feb 2025 - June 2025)</li><li>Full Stack Developer Intern, Wipro (Oct 2023 - Dec 2023)</li></ul> |
| **Expertise** | Concrete implementation details, algorithms, architectural decisions | <ul><li>Native macOS apps (Swift 6.0, Apple Vision Framework, CGEventTap)</li><li>Python libraries (quarantine-py dead-letter queue on PyPI)</li><li>LeetCode Knight (Top 6% worldwide, peak 1868, 630+ problems)</li></ul> |
| **Authoritativeness** | Peer-reviewed research, hackathon championships, upstream open-source | <ul><li>Hack4Bengal 3.0 Grand Champion (out of 5,000+ applicants)</li><li>Published First Author, IJIRT (Paper ID: 180711) on multimodal assistive AI</li><li>Core contributor to Kestra (kestra-io/plugin-jdbc v2.2.0 DuckDB engine)</li></ul> |
| **Trustworthiness** | Verified cryptographic & semantic entity connections | <ul><li>Wikidata Q141715213 entry linked bidirectionally via `rel="me"`</li><li>ORCID 0009-0007-0861-3978 academic registry linked</li><li>Direct contact email, GitHub, LinkedIn, and LeetCode profiles verified</li></ul> |

---

## 2. Entity Disambiguation Analysis

### Disambiguation Notice
A critical asset on the site is the explicit disambiguation banner:
> *"This profile represents Aritro Saha, Software Engineer 1 at Bristol Myers Squibb and open-source creator based in India. He is not Aritro Saha, Director of Product Design at Eightfold AI."*

This is also encoded in Schema.org via `disambiguatingDescription`. This eliminates knowledge graph confusion in Google Knowledge Graph, Perplexity, and OpenAI ChatGPT when distinguishing between the two individuals.

---

## 3. Thin Content & Cannibalization Findings

### 3.1 Keyword Cannibalization: `/aritrosaha` vs `/aritro-saha` (High Severity)
- **Problem:** There are two distinct URLs indexed:
  1. `https://www.aritro.cloud/aritrosaha`: Full dossier (1,174 words) with biography, awards, projects, career history, and schema.
  2. `https://www.aritro.cloud/aritro-saha`: A doorway page (908 words including template boilerplate, but only 1 sentence of unique body text):
     > *"Official canonical dossier for Aritro Saha. Please see https://www.aritro.cloud/aritrosaha for the primary profile."*
  3. Both pages declare **self-referencing canonical tags** and both are listed in `sitemap.xml`.
- **Search Impact:** Google's algorithms detect near-identical titles and meta tags, with one page having thin text pointing to the other. This triggers keyword cannibalization and dilutes the ranking potential of the `/aritrosaha` entity landing page.
- **Action Required:** Either 301 redirect `/aritro-saha` to `/aritrosaha`, set canonical on `/aritro-saha` to `/aritrosaha`, or replicate the full profile content onto `/aritro-saha`.

### 3.2 Arcade Games Prerendered Descriptions (Medium Severity)
- **Problem:** Pages under `/play/*` (e.g., `/play/snake`, `/play/data-pipeline`, `/play/typing-test`, `/play/space-invaders`, `/play/sudoku`, `/play/flappy-bird`, `/play/tictactoe`) pre-render only one sentence each into static HTML (e.g., ~30-40 words).
- **Search Impact:** To search engine crawlers evaluating text-to-code ratios and content depth, these pages appear as thin content stubs.
- **Action Required:** Expand each arcade route's pre-rendered HTML in `scripts/prerender-routes.js` to include:
  - Game mechanics & rules
  - Keyboard & mobile touch controls guide
  - Architecture breakdown (e.g. Minimax decision tree depth for Tic Tac Toe, BFS pathfinding or state loops for Snake)
  - Developer tips and challenge goals (200-300 words per game).
