export const projects = [
  {
    id: 'byakugan-scan',
    title: 'Byakugan Scan',
    description: 'Instant, in-memory screen OCR, QR code, and barcode scanner for macOS built with Swift 6.0 and Apple Vision Framework. Zero telemetry, sub-50ms hotkeys.',
    image: '/assets/Byakugan-Scan.webp',
    github: 'https://github.com/halcyon-past/byakugan-scan',
    alt: 'Byakugan Scan - Instant In-Memory OCR & QR Scanner for macOS',
    link: '/projects/byakugan-scan',
    color: 'text-violet-500',
    HomepageVisibility: true,
    details: {
      overview: 'Byakugan Scan is a native macOS menu bar utility for instant, in-memory screen OCR, QR code, and barcode recognition. Unlike conventional screenshot OCR tools that write temporary image files to disk and trigger Spotlight or media analysis daemons, Byakugan Scan captures selected screen regions directly into NSPasteboard memory as a CGImage buffer and processes them on the Apple Neural Engine in under 50ms—with zero temporary files, zero network calls, and zero external Swift package dependencies.',
      features: [
        'Zero-Disk In-Memory Pipeline: Captures screen selections straight into RAM via NSPasteboard and runs Apple Vision requests (VNRecognizeTextRequest and VNDetectBarcodesRequest) on the Neural Engine in under 50ms.',
        '60/120Hz Custom AppKit Overlay: Smooth multi-display selection reticle with customizable theme accents (Byakugan Violet, Tenseigan Cyan, Sharingan Crimson, Sage Emerald, Nine-Tails Amber) and adjustable backdrop dimming.',
        'Multi-Language OCR & Barcode Decoding: Supports automatic language detection across 13+ languages alongside QR, MicroQR, EAN-8/13, UPC-E, Code 128/39/93, PDF417, Aztec, and Data Matrix symbologies.',
        'Floating HUD & Contextual Actions: Frosted-glass HUD toast displaying character/word counts and one-click actions to open URLs, compose emails, or dial phone numbers without cluttering Notification Center.',
        'URL Scheme Automation & Local History: Deep-link automation via byakugan:// for Raycast, Alfred, and Shortcuts, plus a searchable local scan history with category filters and pinning.'
      ],
      techStack: ['Swift 6.0', 'AppKit', 'SwiftUI', 'Apple Vision Framework', 'Neural Engine', 'macOS 14+', 'Homebrew Cask'],
      liveDemo: 'https://byakugan-scan.aritro.cloud',
      docs: 'https://byakugan-scan.aritro.cloud/support',
      articleUrl: 'https://www.aritro.cloud/blog/swift-vision-ocr-apple-neural-engine'
    }
  },
  {
    id: 'sutrakey',
    title: 'SutraKey',
    description: 'Instant Shift+Select radial pie menu for video, audio, and clean document actions on macOS',
    image: '/assets/SutraKey.webp',
    github: 'https://github.com/halcyon-past/SutraKey',
    alt: 'SutraKey - Instant Text-to-Media & Document Actions for macOS',
    link: '/projects/sutrakey',
    color: 'text-amber-500',
    HomepageVisibility: true,
    details: {
      overview: 'SutraKey (सूत्र) is a native, lightweight macOS utility designed as an invisible thread connecting text selection to instant media and document actions. When you hold Shift and select any URL or text, an under-cursor radial pie menu smoothly appears, letting you download videos, extract high-bitrate audio, pull clean subtitles, scrape gallery images, or generate ad-free reader-mode PDFs directly into ~/Downloads—with 0% idle CPU and zero background bloat.',
      features: [
        'Exclusive Shift + Select Trigger: Uses CGEventTap with bitwise modifier evaluation (NSEvent.modifierFlags) ensuring the radial menu only summons when Shift is exclusively held, completely avoiding interference with standard Command, Option, or Control shortcuts.',
        '60 FPS Under-Cursor Radial Menu: A frameless, transparent, non-activating NSPanel with 5 radial slices (Video MP4 via yt-dlp+ffmpeg, 320kbps MP3 Audio, Clean Subtitles, High-Res Image Gallery, Reader-Mode Clean PDF via offscreen WKWebView) and a dead-zone center for instant flick-cancelling.',
        'Ephemeral Menu Bar Presence: Remains 100% invisible when idle; dynamically surfaces a monochrome progress indicator in the macOS menu bar only during active conversion tasks and auto-vanishes 1.5s after completion.',
        'Frosted Glass Toast HUD: Native floating status notifications with macOS .ultraThinMaterial blur displaying transfer speeds, ETA, and one-click "Show in Finder" buttons.',
        'Strict Sandboxed Output & Security: Strictly confines all downloads to ~/Downloads with automatic path-traversal guards (--no-exec, --restrict-filenames).'
      ],
      techStack: ['Swift 6.0', 'AppKit', 'SwiftUI', 'CGEventTap', 'macOS 14+ Sonoma', 'yt-dlp', 'ffmpeg', 'Homebrew Cask'],
      liveDemo: 'https://sutrakey.aritro.cloud',
      docs: 'https://sutrakey.aritro.cloud'
    }
  },
  {
    id: 'openworld-portfolio',
    title: 'OpenWorld Portfolio',
    description: 'Interactive 2.5D retro Pokémon-inspired open-world developer portfolio set in Pallet Cloud',
    image: '/assets/OpenWorld-Portfolio.webp',
    github: 'https://github.com/halcyon-past/openworld-portfolio',
    alt: 'OpenWorld Portfolio - 2.5D Retro RPG Developer Portfolio',
    link: '/projects/openworld-portfolio',
    color: 'text-sky-500',
    HomepageVisibility: true,
    details: {
      overview: 'OpenWorld Portfolio is an interactive, retro Pokémon-inspired 2.5D open-world developer portfolio set in Pallet Cloud. Built completely from scratch with Next.js 16, React 19, and native HTML5 Canvas 2D without third-party game engines, it features interactive buildings, a high-definition Mega Jumbotron TV, a turn-based Pokémon battle arena against Gym Leader Aritro at the Silicon Gym, a Poké Mart skill shopping cart with rich HTML mail requisitions, and an instant-toggle Executive Recruiter Dossier.',
      features: [
        'Custom 2.5D Canvas Engine: Delivers hardware-accelerated 60 FPS rendering with Painter\'s algorithm depth sorting, dynamic elevation plateaus, and procedural GBA-styled wild grass with random developer encounters.',
        'Silicon Gym & Turn-Based Boss Battle: Authentic GBA-style Pokémon battle arena featuring Gym Leader Aritro (Lv. 99), a tactical 4-action decision menu, elemental animations, 8 inspectable Gym Badges, and a Master Ball recruit sequence.',
        'Poké Mart Tech Stack & Graphical Requisitions: Interactive skill catalog partitioned across Languages, Cloud, Backend, and AI, allowing recruiters to add capabilities to a cart, compose inquiries, and dispatch authentic Pokémon airmail-styled requisitions directly via email or rich clipboard export.',
        'Interactive Town Landmarks & World Exploration: Explore Pallet Cloud landmarks including rotating project previews on the Mega Jumbotron TV, Innovation Pokédex Center, AI Research Lab with LeetCode Knight stats, developer arcade minigames, and animated wildlife.',
        'Executive Recruiter Dossier Mode: Instant one-click toggle between the 2.5D game world and an executive portfolio dossier view, featuring direct resume access, enterprise highlights, and URL hash navigation.'
      ],
      techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'HTML5 Canvas 2D', 'Web Audio API', 'Web Speech API'],
      liveDemo: 'https://openworld.aritro.cloud/',
      articleUrl: 'https://www.aritro.cloud/blog/instant-navigation-speculation-rules-vite-ssg'
    }
  },
  {
    id: 'quarantine',
    title: 'Quarantine',
    description: 'Zero-dependency dead-letter queue and fault-tolerance library on PyPI. Wrap Python loops with @quarantine to isolate errors without crashing batch jobs.',
    image: '/assets/Quarantine.webp',
    github: 'https://github.com/halcyon-past/quarantine',
    alt: 'Quarantine - Dead-letter queues for Python loops',
    link: '/projects/quarantine',
    color: 'text-rose-500',
    HomepageVisibility: true,
    details: {
      overview: 'quarantine is an open-source, zero-dependency Python library that brings dead-letter queue resilience to regular loops and batch data pipelines. When processing thousands of records (e.g., CSV ingestion, scraping, API syncing), an unexpected exception at item #5,247 no longer crashes the entire multi-hour run. quarantine safely isolates the failing item, captures the error and full execution state to disk, and keeps the loop running.',
      features: [
        'Zero-Crash Decorators: Wrap any sync or async function with @quarantine or iterate with shield() to set aside failures without interrupting the pipeline.',
        'Atomic On-Disk Isolation: Serializes failed inputs, exceptions, and full tracebacks atomically to disk (.quarantine/) without requiring external message brokers.',
        'Surgical Replays & Interactive Debugging: Rerun only failed items using quarantine retry or drop straight into pdb with the exact failing input using quarantine debug.',
        'Circuit Breakers & Sensitive Redaction: Automatic circuit breaker tripping via halt_after to prevent cascading external outages, plus built-in key/regex redaction for secrets.',
        'Local Web UI & Observability: Built-in CLI commands and a local web dashboard to inspect tracebacks, track recovery stats, and integrate into CI/CD pipelines.'
      ],
      techStack: ['Python 3.9+', 'PyPI', 'AsyncIO', 'CLI', 'Dead-Letter Queue', 'Fault Tolerance', 'Pytest'],
      pypi: 'https://pypi.org/project/quarantine-py/',
      liveDemo: 'https://pypi.org/project/quarantine-py/',
      docs: 'https://quarantine-py.aritro.cloud',
      articleUrl: 'https://www.aritro.cloud/blog/python-dead-letter-queue-batch-pipelines'
    }
  },
  {
    id: 'structurify',
    title: 'Structurify',
    description: 'AI-powered SaaS that transforms messy spreadsheet data into a clean master schema',
    image: '/assets/Structurify.webp',
    github: 'https://github.com/halcyon-past/Structurify',
    alt: 'Structurify data transformation dashboard',
    link: '/projects/structurify',
    color: 'text-(--celadon)',
    HomepageVisibility: true,
    details: {
      overview: 'Structurify is a production-ready, event-driven B2B SaaS platform that turns unstructured CSV and XLSX files into a standardized schema using Google Gemini, with a serverless fan-out architecture on GCP for resilient, scalable processing.',
      features: [
        'Strict Schema Enforcement: Enforces exact JSON and Excel structure with reliable type-casting and validation.',
        'Sandbox Preview Mode: Lets users validate the first 10 rows before launching a full job.',
        'Auto-Clean Mode: Infers schema from headers and normalizes capitalization, whitespace, and date formats automatically.',
        'Serverless Fan-Out Pipeline: Uses Pub/Sub, Cloud Run workers, and a LangGraph map-reduce flow to process large jobs without blocking the API.',
        'Real-Time Observability: Streams job progress, audit logs, and secure download links through Firestore-backed live updates.'
      ],
      techStack: ['Next.js 14', 'React', 'TailwindCSS', 'Firebase', 'FastAPI', 'Python', 'LangGraph', 'Google Gemini', 'Google Cloud Platform'],
      liveDemo: 'https://structurify.aritro.cloud'
    }
  },
  {
    id: 'luffy-laser-dodge',
    title: 'Luffy Laser Dodge',
    description: 'Interactive 3D reflex game dodging laser beams using actual head movements via webcam',
    image: '/assets/luffy-laser-dodge.webp',
    alt: 'Luffy Laser Dodge',
    link: '/projects/luffy-laser-dodge',
    github: 'https://github.com/halcyon-past/Luffy-Laser-Dodge',
    color: 'text-[#ffbd2e]',
    HomepageVisibility: true,
    details: {
      overview: 'Luffy Laser Dodge is an interactive, browser-based 3D reflex game where you use your actual head movements via webcam to dodge laser beams shot by Kuma! The game seamlessly melds computer vision with 3D web rendering to create a unique physically interactive experience—all running 100% locally in your browser.',
      features: [
        'Real-Time AI Head Tracking: Uses Google\'s MediaPipe via WebAssembly (WASM) to detect face and lean angles instantly.',
        'Dynamic 3D Scene: Powered by Three.js and @react-three/fiber with fully rigged 3D models with bone-level procedural animation.',
        '100% Client-Side Processing: Webcam data is processed entirely on the local GPU/CPU for zero latency and absolute privacy.',
        'Legacy WebRTC Support: Originally built with a WebRTC + Python FastAPI backend for heavy AI inference, later migrated to WASM for zero-latency serverless deployment.'
      ],
      techStack: ['React', 'Vite', 'React Three Fiber', 'Three.js', 'MediaPipe AI', 'WebAssembly', 'WebRTC (Legacy)', 'Python FastAPI (Legacy)'],
      liveDemo: 'https://onepiece.aritro.cloud/'
    }
  },
  {
    id: 'glide-connect',
    title: 'GlideConnect',
    description: 'Virtual mouse control platform using MediaPipe hand-gesture recognition and Google Gemini voice assistant. Published in peer-reviewed IJIRT research.',
    image: '/assets/GlideConnect.webp',
    alt: 'GlideConnect platform interface',
    link: '/projects/glide-connect',
    github: 'https://github.com/halcyon-past/Glide-Connect',
    color: 'text-(--chrysler-blue)',
    HomepageVisibility: true,
    details: {
      overview: 'A Final Year Project for VIT, this project demonstrates a novel way to control a computer interface using hand gestures and voice commands. It leverages MediaPipe for real-time gesture recognition, integrates a custom voice assistant named Krishna, and incorporates generative AI (using Google Gemini) for enhanced query responses.',
      features: [
        'Cursor Control: Move the mouse pointer using hand movements.',
        'Click Operations: Perform left, right, and double clicks with specific finger gestures.',
        'System Controls: Adjust system volume and screen brightness using pinch gestures.',
        'Voice Assistant (Krishna): Launch gesture recognition, Google search, file navigation, and enter Divine Mode.',
        'Divine Mode (GenAI): Leverage Google Gemini Flash for generative AI responses including screenshot analysis.'
      ],
      techStack: ['Python 3.9', 'MediaPipe', 'OpenCV', 'Google Gemini API', 'PyAutoGUI', 'PyCAW'],
      liveDemo: '',
      researchPaper: 'https://doi.org/10.64643/IJIRT180711',
      doi: '10.64643/IJIRT180711',
      wikidata: 'https://www.wikidata.org/wiki/Q141911674',
      zenodo: 'https://zenodo.org/records/23758525',
      paperTitle: 'KrishnaVision: A Multimodal Virtual Interface Combining MediaPipe-Hands Optimization and Gemini AI for Context-Aware HCI'
    }
  },
  {
    id: 'pawsitive',
    title: 'PAWsitive',
    description: 'Centralized pet healthcare platform connecting blood donors, vet clinics, and rescue centers (Winner of Hack4Bengal 3.0)',
    image: '/assets/Pawsitive.webp',
    alt: 'Pawsitive pet healthcare platform interface',
    link: '/projects/pawsitive',
    github: 'https://github.com/halcyon-past/PAW-sitive',
    color: 'text-(--amethyst)',
    HomepageVisibility: true,
    details: {
      overview: 'PAWsitive is a comprehensive web application designed to help pet owners find blood donors, veterinary clinics, and rescue centers with ease. Built at Hack4Bengal, Eastern India\'s Largest Hackathon.',
      features: [
        'Blood Donors & Vet Clinics Directory: Search and filter based on specific criteria.',
        'Rescue Centers Directory: Access a directory of rescue centers with ambulance services.',
        'Registration Portals: Register as a blood donor, veterinary clinic, rescue center, or event host.',
        'Voice Assistant: Customer support and educational resources via Callchimp.AI.',
        'AI Chatbot: Gemini powered AI chatbot to tackle animal-related queries.'
      ],
      techStack: ['React', 'Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Node.js', 'Kinde Auth', 'UploadThing', 'Callchimp.AI'],
      liveDemo: 'https://www.bepawsitive.xyz'
    }
  }
];

export const experience = [
  { title: 'Software Engineer 1, Bristol Myers Squibb', duration: 'July 2025 - Present' },
  { title: 'Data Science Intern, Bajaj Finserv Health', duration: 'Feb 2025 - June 2025' },
  { title: 'Full Stack Developer Intern, Wipro', duration: 'Oct 2023 - Dec 2023' },
];

export const education = [
  { title: 'B.Tech in Electronics and Computer Engineering', institution: 'Vellore Institute of Technology, Chennai', year: '2025' },
  { title: 'High School', institution: 'Birla Bharati', year: '2021' },
];

export const socialMedia = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/aritro-saha',
    icon: 'linkedin',
    color: 'text-[#0a66c2]',
    hoverColor: 'hover:text-[#004182]',
    ariaLabel: 'LinkedIn'
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/halcyon-past',
    icon: 'instagram',
    color: 'text-[#e4405f]',
    hoverColor: 'hover:text-[#c13584]',
    ariaLabel: 'Instagram'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/halcyon-past',
    icon: 'github',
    color: 'text-gray-900 dark:text-gray-100',
    hoverColor: 'hover:text-black dark:hover:text-white',
    ariaLabel: 'GitHub'
  },
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com/@veripyed',
    icon: 'youtube',
    color: 'text-[#ff0000]',
    hoverColor: 'hover:text-[#cc0000]',
    ariaLabel: 'YouTube'
  }
];

export const galleryImages = [
  { 
    src: '/assets/gallery/image1.webp', 
    alt: 'Gallery Image 1 - Hack4Bengal 3.0 Winner Celebration', 
    span: 'col-span-2 row-span-1', 
    aspectRatio: 'aspect-[3/2]' 
  },
  { 
    src: '/assets/gallery/image7.webp', 
    alt: 'Gallery Image 7 - Engineering Workspace and Hardware Setup', 
    span: 'col-span-1 row-span-2', 
    aspectRatio: 'aspect-[2/3]' 
  },
  { 
    src: '/assets/gallery/image3.webp', 
    alt: 'Gallery Image 3 - Tech Presentation at VIT Chennai', 
    span: 'col-span-1 row-span-1', 
    aspectRatio: 'aspect-square' 
  },
  { 
    src: '/assets/gallery/image5.webp', 
    alt: 'Gallery Image 5 - Collaborative Hackathon Sprint', 
    span: 'col-span-3 row-span-1', 
    aspectRatio: 'aspect-[3/1]' 
  },
  { 
    src: '/assets/gallery/image4.webp', 
    alt: 'Gallery Image 4 - Hack4Bengal Developer Showcase', 
    span: 'col-span-1 row-span-1', 
    aspectRatio: 'aspect-square' 
  },
  { 
    src: '/assets/gallery/image8.webp', 
    alt: 'Gallery Image 8 - Conference and Industry Engagement', 
    span: 'col-span-2 row-span-1', 
    aspectRatio: 'aspect-[3/2]' 
  },
  { 
    src: '/assets/gallery/image2.webp', 
    alt: 'Gallery Image 2 - Campus Tech Fest VIT Chennai', 
    span: 'col-span-2 row-span-1', 
    aspectRatio: 'aspect-[3/2]' 
  },
  { 
    src: '/assets/gallery/image6.webp', 
    alt: 'Gallery Image 6 - Team Collaboration Session', 
    span: 'col-span-2 row-span-1', 
    aspectRatio: 'aspect-[3/2]' 
  },
];

export const rawGames = [
  {
    id: 'typing-test',
    title: 'Developer Speed Test',
    description: 'Test your coding typing speed with this minimalist terminal-style speed test game. Features top programming keywords!',
    path: '/play/typing-test',
    status: 'Available',
    color: 'var(--chrysler-blue)',
    iconName: 'Keyboard',
    tech: 'React, Custom WPM & Accuracy Engine, Timer Hook',
    overview: 'A retro terminal-style typing speed test tailored specifically for software engineers. Measures Gross and Net Words Per Minute (WPM), character accuracy, and keystroke timing using syntax snippets from JavaScript, Python, Swift, and Rust.'
  },
  {
    id: 'data-pipeline-puzzle',
    title: 'Data Pipeline Puzzle',
    description: 'Connect the nodes to build a data pipeline without crossing lines. A logic puzzle for data science engineers.',
    path: '/play/data-pipeline',
    status: 'Available',
    color: 'text-(--celadon)',
    iconName: 'BrainCircuit',
    tech: 'React, BFS Pathfinding, Grid Geometry',
    overview: 'An interactive graph connectivity puzzle modeled after distributed data pipelines (like Spark, Airflow, and Databricks). Connect ingestion sources to storage sinks without allowing pipelines to overlap or deadlock.'
  },
  {
    id: 'minimalist-snake',
    title: 'Minimalist Snake',
    description: 'The Python developer edition of the classic game. Collect tech stack icons on an infinite grid.',
    path: '/play/snake',
    status: 'Available',
    color: 'text-[#ffbd2e]',
    iconName: 'Gamepad2',
    tech: 'React, HTML5 Canvas / Grid, Game Loop',
    overview: 'A modern, clean reimagining of the classic Snake game where the snake grows by collecting popular languages and tools across Python, React, Swift, and Docker.'
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Classic logic-based number placement puzzle.',
    path: '/play/sudoku',
    status: 'Available',
    color: 'text-(--amethyst)',
    iconName: 'Grid3X3',
    tech: 'React, Backtracking Solver, Board Generator',
    overview: 'A minimalist 9x9 Sudoku implementation equipped with an on-demand backtracking validation engine and conflict detection.'
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    description: 'Defend the server from incoming bugs in this classic retro shooter.',
    path: '/play/space-invaders',
    status: 'Available',
    color: 'text-rose-500',
    iconName: 'Rocket',
    tech: 'React, requestAnimationFrame Game Loop, Collision Detection',
    overview: 'A retro arcade shooter where your ship defends production cloud infrastructure from descending waves of bugs, 500 errors, and memory leaks.'
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    description: 'Navigate the bird through the pipes in this challenging arcade classic.',
    path: '/play/flappy-bird',
    status: 'Available',
    color: 'text-yellow-500',
    iconName: 'Bird',
    tech: 'React, 2D Gravity Physics, Box-Model Collision',
    overview: 'A physics-driven browser mini-game implementing smooth acceleration, jump impulses, and real-time pipe bounding-box collision detection.'
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'Play against an AI in this classic game. Can you beat the Minimax algorithm?',
    path: '/play/tictactoe',
    status: 'Available',
    color: 'text-purple-500',
    iconName: 'Swords',
    tech: 'React, Recursive Minimax Algorithm with Alpha-Beta Pruning',
    overview: 'A classic 3x3 Tic Tac Toe game powered by an unbeatable recursive Minimax algorithm that evaluates game trees to ensure the AI never loses.'
  }
];
