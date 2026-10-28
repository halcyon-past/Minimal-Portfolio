# Generative Engine Optimization (GEO) & AI Search Audit: aritro.cloud

**Audit Date:** October 28, 2026  
**AI Search Readiness Score:** **94 / 100** (Weight: 10%)

---

## 1. AI Search Visibility & Citability Analysis

Search engines powered by LLMs (Google AI Overviews, OpenAI ChatGPT Search, Perplexity, Anthropic Claude, Microsoft Copilot) rely on structured passages, unambiguous entity identity, authoritative reference points, and fast crawler accessibility.

### 1.1 Passage-Level Citability
- **Entity Definition:** The homepage and `/about` feature concise, highly citable thesis statements:
  > *"Aritro Saha (also known as Megh) is a Software Engineer 1 at Bristol Myers Squibb specializing in high-throughput data pipelines, cloud infrastructure, native macOS utilities, full-stack web engineering, and applied AI."*
  This passage matches the exact syntactic structure extracted by generative answer engines when answering *"Who is Aritro Saha?"*.
- **Quantitative Metrics Included:** The content includes specific numerical facts that answer engines favor for grounding:
  - *"Peak LeetCode rating 1868 (Top 6% globally)"*
  - *"630+ algorithmic solutions"*
  - *"Hack4Bengal 3.0 Grand Champion (5,000+ applicants)"*
  - *"Swift 6.0 in-memory OCR with <50ms execution and 0% idle CPU"*
  - *"IJIRT Published Paper ID: 180711"*

### 1.2 Knowledge Graph & Disambiguation Grounding
- **Entity disambiguation:** Explicitly encoded both in markdown and schema, ensuring AI models do not hallucinate attributes belonging to the namesake design leader at Eightfold AI.
- **Academic & Semantic Anchors:**
  - Wikidata: `https://www.wikidata.org/wiki/Q141715213`
  - ORCID: `https://orcid.org/0009-0007-0861-3978`
  - PyPI: `https://pypi.org/project/quarantine-py/`
  These high-trust seed entities anchor LLM knowledge graphs during real-time retrieval and grounding.

---

## 2. Platform-Specific Optimization

### 2.1 Google AI Overviews & Gemini Grounding
- Uses standard `Googlebot` indexation with pre-rendered static HTML.
- `Google-Extended` is explicitly allowed in `robots.txt`, permitting Gemini model training and training of gen-AI search features.

### 2.2 OpenAI ChatGPT & SearchBot
- `OAI-SearchBot` (ChatGPT Search) and `ChatGPT-User` (real-time browsing) are explicitly allowed.
- `GPTBot` (model training) is explicitly allowed.
- User-Agent HTTP matrix tests confirm HTTP 200 OK with zero Cloudflare/WAF challenges.

### 2.3 Anthropic Claude
- `Claude-SearchBot` (Claude citations) and `Claude-User` (user browsing) are explicitly configured and allowed.
- `ClaudeBot` allowed.

### 2.4 Perplexity AI
- `PerplexityBot` and `Perplexity-User` explicitly allowed.
- Tested: 200 OK, full semantic content delivered.

---

## 3. Improvements for GEO

1. **Content-Signal Header:** Add `Content-Signal: search=yes, ai-input=yes, ai-train=yes` to AI user agent blocks in `robots.txt` to formally declare content usage policies.
2. **Markdown Catalog Index:** Provide an `ai-catalog.json` or link in `.well-known` for automated agent tool discovery.
