# Search Experience Optimization (SXO) Audit: aritro.cloud

**Audit Date:** October 28, 2026  
**SXO Persona Alignment Score:** **90 / 100**

---

## 1. Intent & User Persona Mapping

Search Experience Optimization (SXO) aligns search intent with post-click user experience to eliminate bounce rates, build dwell time, and maximize conversion.

### Persona 1: Tech Recruiter / Talent Acquisition
- **Search Query Examples:** `"Aritro Saha"`, `"Aritro Saha Bristol Myers Squibb"`, `"Aritro Saha software engineer resume"`, `"Aritro Saha VIT Chennai"`
- **User Story:** *"As a recruiter, I want to verify within 5 seconds where Aritro works, his educational pedigree, his core competencies, and immediately download his resume."*
- **SXO Assessment:**
  - Strengths: Current role (Software Engineer 1 at BMS), college (VIT Chennai 2025), and awards (Hack4Bengal 3.0) are immediately visible.
  - Friction Point: The PDF resume is linked, but `robots.txt` blocks the `/assets/resume/` folder, preventing search engines from ranking a resume result. Furthermore, there is no HTML `/resume` page for recruiters on mobile who do not want to download a PDF file to their device.
  - Recommendation: Launch an HTML `/resume` page with structured WorkExperience schema and a prominent PDF download button.

### Persona 2: Engineering Manager / Staff Engineer
- **Search Query Examples:** `"Byakugan Scan"`, `"SutraKey macOS"`, `"quarantine-py PyPI"`, `"high throughput data pipeline Aritro Saha"`
- **User Story:** *"As an engineering leader, I want to inspect technical depth, architecture choices, real code repositories, and verify that projects aren't just toy tutorials."*
- **SXO Assessment:**
  - Strengths: Projects link directly to GitHub, live demos, PyPI packages, and published research. Details describe Swift 6.0 concurrency, Apple Neural Engine memory management, and PyPI packaging.
  - Friction Point: Case study pages lack visual architecture diagrams (e.g. data flow from CGEventTap to Swift AppKit pipeline, or LangGraph state machine).
  - Recommendation: Embed Mermaid architecture diagrams on `/projects/byakugan-scan`, `/projects/sutrakey`, and `/projects/structurify`.

### Persona 3: Developer / Gamer
- **Search Query Examples:** `"developer typing test"`, `"terminal wpm test"`, `"data pipeline puzzle online"`, `"snake game developer edition"`
- **User Story:** *"As a developer browsing tech portfolios, I want to play games seamlessly with smooth controls and responsive design."*
- **SXO Assessment:**
  - Strengths: Extremely engaging mini-games with custom cursor, sound toggle, command palette (`Cmd+K`), and touch D-pads.
  - Friction Point: The game pages have minimal pre-rendered textual context explaining how to play and scoring rules.
  - Recommendation: Provide instructions, controls cheatsheets, and developer notes on each game's pre-rendered route.
