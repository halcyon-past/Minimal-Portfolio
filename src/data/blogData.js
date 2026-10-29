export const blogPosts = [
  {
    slug: 'swift-vision-ocr-apple-neural-engine',
    title: 'Building Sub-50ms Zero-Disk Screen OCR with Swift 6 & Apple Vision Framework',
    seoTitle: 'Sub-50ms Screen OCR with Swift 6 & Vision | Aritro Saha',
    excerpt: 'How to architect an in-memory macOS screen OCR pipeline using Swift 6, NSPasteboard, and Apple Vision VNRecognizeTextRequest with zero temporary disk writes.',
    date: '2026-10-20',
    category: 'macOS Engineering',
    readingTime: '6 min read',
    coverImage: '/assets/Byakugan-Scan.webp',
    coverAlt: 'Byakugan Scan - Swift 6 Apple Vision OCR on Apple Neural Engine',
    tags: ['Swift 6', 'macOS', 'Apple Vision', 'Neural Engine', 'OCR', 'Performance'],
    author: {
      name: 'Aritro Saha',
      role: 'Software Engineer 1 at Bristol Myers Squibb',
      avatar: '/aritro-saha.webp'
    },
    sections: [
      {
        heading: 'The Disk Bottleneck in Traditional Screenshot OCR Tools',
        content: `Most conventional macOS screen OCR tools execute a naive three-step pipeline: invoke \`screencapture\` to persist a temporary PNG file in \`/tmp/\`, trigger an OCR process on that file, and delete the file. This creates immediate I/O latency, triggers Spotlight indexing daemons, and incurs unnecessary NVMe SSD write wear. In high-frequency workflows, disk latency alone accounts for 80–120ms of overhead.`
      },
      {
        heading: 'Capturing Directly into In-Memory Pasteboard Buffers',
        content: `By leveraging macOS AppKit and \`NSPasteboard\` memory streams, screen selections are captured straight into RAM as an uncompressed \`CGImage\` buffer. Using Swift 6 strict concurrency checks, we transfer this frame directly into Apple Vision framework without a single byte touching disk:

\`\`\`swift
func captureSelectedRegion(rect: CGRect) -> CGImage? {
    guard let displayId = CGMainDisplayID() as CGDirectDisplayID? else { return nil }
    return CGDisplayCreateImage(displayId, rect: rect)
}
\`\`\`

Because zero temporary files are generated, the pipeline executes with sub-millisecond I/O footprint and leaves no residual telemetry or cached artifacts on disk.`
      },
      {
        heading: 'Hardware Acceleration via the Apple Neural Engine (ANE)',
        content: `The optical recognition phase is executed using \`VNRecognizeTextRequest\`. By configuring the request with \`recognitionLevel = .accurate\` and directing execution to the Apple Neural Engine compute device (\`.cpuAndNeuralEngine\`), inference latency is slashed to under 35ms on M-series Apple Silicon:

\`\`\`swift
let request = VNRecognizeTextRequest { request, error in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    let recognizedStrings = observations.compactMap { $0.topCandidates(1).first?.string }
    DispatchQueue.main.async {
        NSPasteboard.general.clearContents()
        NSPasteboard.general.setString(recognizedStrings.join(separator: "\\n"), forType: .string)
    }
}
request.usesLanguageCorrection = true
\`\`\`

The result is true sub-50ms latency from hotkey press to text in clipboard.`
      },
      {
        heading: 'Key Engineering Takeaways for macOS Utilities',
        content: `1. **Avoid File I/O for Ephemeral Data**: Memory buffers through \`CGImage\` and \`NSPasteboard\` offer 10x lower latency than temporary files.
2. **Target the Apple Neural Engine Explicitly**: Modern Apple Silicon provides dedicated ANE compute units that leave CPU cores free for UI responsiveness.
3. **Embrace Swift 6 Strict Concurrency**: Protect shared state in background menu bar utilities by marking capture pipelines with \`@MainActor\` or isolated actors.

To explore the production implementation, Homebrew distribution, and architecture, visit the [Byakugan Scan Project Case Study](https://www.aritro.cloud/projects/byakugan-scan).`
      }
    ]
  },
  {
    slug: 'python-dead-letter-queue-batch-pipelines',
    title: 'Architecting Zero-Crash Batch Data Pipelines with Python Dead-Letter Queues (DLQ)',
    seoTitle: 'Zero-Crash Batch Pipelines with Python DLQ | Aritro Saha',
    excerpt: 'Eliminate pipeline crashes at record #5,247. A deep dive into implementing fault-tolerant Python loops, atomic error serialization, and surgical CLI replays.',
    date: '2026-10-24',
    category: 'Data Engineering',
    readingTime: '8 min read',
    coverImage: '/assets/Quarantine.webp',
    coverAlt: 'Quarantine - Dead-Letter Queues and Fault-Tolerance for Python Loops',
    tags: ['Python', 'Data Engineering', 'Fault Tolerance', 'Dead-Letter Queue', 'Architecture', 'PyPI'],
    author: {
      name: 'Aritro Saha',
      role: 'Software Engineer 1 at Bristol Myers Squibb',
      avatar: '/aritro-saha.webp'
    },
    sections: [
      {
        heading: 'The Fatal Flaw of Unbounded Batch Loops',
        content: `Every data engineer has experienced this nightmare: a batch job ingesting 100,000 records from an upstream ERP or API crashes at record #84,219 due to an unexpected null byte or schema anomaly. The entire 4-hour batch fails, uncommitted database transactions roll back, and on-call engineers must write throwaway scripts to figure out which record broke the process.`
      },
      {
        heading: 'Implementing the In-Process Dead-Letter Queue (DLQ) Pattern',
        content: `While enterprise message brokers like Apache Kafka and AWS SQS provide dead-letter queues, standalone Python batch scripts, Databricks ETL notebooks, and scraping workers traditionally lack built-in DLQ mechanisms. 

To solve this, we architected **quarantine** (available on PyPI as \`quarantine-py\`). It wraps batch loops with atomic isolation:

\`\`\`python
from quarantine import quarantine

@quarantine(halt_after=10, redact_keys=["password", "ssn"])
def process_record(record: dict) -> None:
    # Business logic that might raise unpredictable exceptions
    transform_and_insert(record)
\`\`\`

When an error occurs, the function does not crash the loop. Instead, the failing input, timestamp, exception type, and full traceback are atomically serialized to an isolated \`.quarantine/\` directory on disk.`
      },
      {
        heading: 'Circuit Breakers & Sensitive Credential Redaction',
        content: `A resilient dead-letter queue must distinguish between occasional bad records and systemic upstream outages. 

1. **Circuit Breakers (\`halt_after\`)**: If an upstream database goes offline, isolating 10,000 consecutive items into the DLQ is counterproductive. Quarantine trips a circuit breaker and terminates cleanly if consecutive failures exceed a threshold.
2. **Zero Telemetry Leakage**: Before serializing state to disk, automated regex and key-based masking scrubs sensitive keys (e.g. passwords, API tokens, medical identifiers) to remain HIPAA and GDPR compliant.`
      },
      {
        heading: 'Surgical Replay and Debugging Workflows',
        content: `Isolating failures is only half the battle; recovery is where developer velocity compounds. With a dedicated CLI inspector:

\`\`\`bash
# Inspect quarantined items with formatted tracebacks
quarantine list

# Rerun only the failed records through fixed logic
quarantine retry --all

# Drop straight into pdb post-mortem debugger with the exact failing payload
quarantine debug <record_id>
\`\`\`

By decoupling error handling from core batch pipelines, developers achieve resilient, self-healing batch processing without external infrastructure dependencies.

For complete package documentation, installation guidelines, and source code, visit the [Quarantine Project Case Study](https://www.aritro.cloud/projects/quarantine) or inspect the package directly on [PyPI](https://pypi.org/project/quarantine-py/).`
      }
    ]
  },
  {
    slug: 'instant-navigation-speculation-rules-vite-ssg',
    title: 'Achieving 0ms Perceived Navigation in Vite & React 19 with W3C Speculation Rules',
    seoTitle: 'Instant Navigation in Vite & React 19 SSG | Aritro Saha',
    excerpt: 'How to upgrade traditional SPAs into instant-navigation platforms using modern W3C Speculation Rules, React 19 SSG prerendering, and Core Web Vitals optimization.',
    date: '2026-10-28',
    category: 'Web Architecture',
    readingTime: '5 min read',
    coverImage: '/banner-social.jpg',
    coverAlt: 'W3C Speculation Rules API for Instant Web Navigation',
    tags: ['React 19', 'Vite', 'Speculation Rules', 'Core Web Vitals', 'SSG', 'Performance'],
    author: {
      name: 'Aritro Saha',
      role: 'Software Engineer 1 at Bristol Myers Squibb',
      avatar: '/aritro-saha.webp'
    },
    sections: [
      {
        heading: 'Beyond Traditional Client-Side Routing',
        content: `In standard React Single Page Applications (SPAs), internal page transitions require executing JavaScript route matchers, loading code-split chunks, and updating DOM nodes. While fast, transitions still incur 50–150ms of main thread delay and can trigger Interaction to Next Paint (INP) degradations.`
      },
      {
        heading: 'The Power of the W3C Speculation Rules API',
        content: `The modern W3C Speculation Rules API introduces declarative background prerendering at the browser engine level. Unlike legacy \`<link rel="prerender">\`, speculation rules allow structured JSON configurations specifying match patterns, exclusion rules, and eagerness levels:

\`\`\`html
<script type="speculationrules">
{
  "prerender": [
    {
      "where": {
        "and": [
          { "href_matches": "/*" },
          { "not": { "href_matches": "/assets/*" } },
          { "not": { "href_matches": "/api/*" } }
        ]
      },
      "eagerness": "moderate"
    }
  ]
}
</script>
\`\`\`

With \`"eagerness": "moderate"\`, Chromium browsers detect when a user hovers or moves their cursor toward an internal link and silently render the destination page in an offscreen process.`
      },
      {
        heading: 'Synergy with React 19 Static Site Generation (SSG)',
        content: `Speculation rules deliver maximum impact when paired with pre-rendered static HTML routes. Because every route on this site is pre-rendered at build time with full HTML, CSS, and hydration scripts:
1. The background browser process receives instant 200 OK responses from the edge CDN.
2. The page is completely painted before the user clicks.
3. Upon clicking, the browser swaps the background document into view instantly, achieving a true **0ms perceived navigation duration**.`
      },
      {
        heading: 'Core Web Vitals Impact and Safety Rules',
        content: `1. **Guarding Analytics & Side-Effects**: Use \`document.prerendering\` checks in analytics scripts to avoid logging phantom pageviews before user activation.
2. **Preserving BFCache**: Avoid \`unload\` and \`beforeunload\` event listeners, ensuring that both Forward-Back Cache (BFCache) and speculative prerendering operate at peak efficiency.
3. **Granular Asset Exclusion**: Always exclude heavy asset downloads, audio streams, and API routes from speculation rules matching.

Experience this instant navigation architecture live in our [Developer Arcade](https://www.aritro.cloud/play) and explore our interactive 2.5D retro portfolio at the [OpenWorld Portfolio Project Page](https://www.aritro.cloud/projects/openworld-portfolio).`
      }
    ]
  }
];
