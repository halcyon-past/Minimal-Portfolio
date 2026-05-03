import React from 'react';
import { Keyboard, BrainCircuit, Gamepad2, Grid3X3, Rocket, Bird, Swords } from 'lucide-react';

export const projects = [
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
    description: 'Virtual Mouse Control using Gesture Recognition and Voice Assistant',
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
      researchPaper: 'https://ijirt.org/article?manuscript=180711'
    }
  },
  {
    id: 'pawsitive',
    title: 'PAWsitive',
    description: 'Centralized Platfrom for Pet Healthcare',
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
  },
  {
    id: 'eduhelper',
    title: 'EduHelper',
    description: 'AI Assistant to Chat with PDFs',
    image: '/assets/Eduhelper.webp',
    alt: 'EduHelper learning platform interface',
    link: '/projects/eduhelper',
    github: 'https://github.com/halcyon-past/EDUHELPER',
    color: 'text-(--celadon)',
    HomepageVisibility: true,
    details: {
      overview: 'This Streamlit application allows users to upload PDF files and ask questions based on their content. The application utilizes the Google Generative AI API for text embedding and question answering.',
      features: [
        'Extract text from uploaded PDF files.',
        'Split text into smaller chunks for efficient embedding and retrieval.',
        'Create a vector store (FAISS index) using Google Generative AI Embeddings.',
        'Conversational chain for QA using the Google Generative AI Chat model.'
      ],
      techStack: ['Python', 'Streamlit', 'PyPDF2', 'LangChain', 'Google Generative AI', 'FAISS'],
      liveDemo: 'https://eduprovider.streamlit.app/'
    }
  },
];

export const experience = [
  { title: 'Associate Software Developer, Bristol Myers Squibb', duration: 'July 2025 - Present' },
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
    icon: 'fab fa-linkedin',
    color: 'text-(--amethyst)',
    hoverColor: 'hover:text-(--chrysler-blue)',
    ariaLabel: 'LinkedIn'
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/halcyon-past',
    icon: 'fab fa-instagram',
    color: 'text-(--celadon)',
    hoverColor: 'hover:text-(--amethyst)',
    ariaLabel: 'Instagram'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/halcyon-past',
    icon: 'fab fa-github',
    color: 'text-(--chrysler-blue)',
    hoverColor: 'hover:text-(--amethyst)',
    ariaLabel: 'GitHub'
  },
  {
    platform: 'YouTube',
    url: 'https://www.youtube.com/@veripyed',
    icon: 'fab fa-youtube',
    color: 'text-(--tea-green)',
    hoverColor: 'hover:text-(--amethyst)',
    ariaLabel: 'YouTube'
  }
];

export const galleryImages = [
  { 
    src: '/assets/gallery/image1.webp', 
    alt: 'Gallery Image 1', 
    span: 'col-span-2 row-span-1', 
    aspectRatio: 'aspect-[3/2]' 
  },
  { 
    src: '/assets/gallery/image7.webp', 
    alt: 'Gallery Image 7', 
    span: 'col-span-1 row-span-2', 
    aspectRatio: 'aspect-[2/3]' 
  },
  { 
    src: '/assets/gallery/image3.webp', 
    alt: 'Gallery Image 3', 
    span: 'col-span-1 row-span-1', 
    aspectRatio: 'aspect-square' 
  },
  { 
    src: '/assets/gallery/image5.webp', 
    alt: 'Gallery Image 5', 
    span: 'col-span-3 row-span-1', 
    aspectRatio: 'aspect-[3/1]' 
  },
  { 
    src: '/assets/gallery/image4.webp', 
    alt: 'Gallery Image 4', 
    span: 'col-span-1 row-span-1', 
    aspectRatio: 'aspect-square' 
  },
  { 
    src: '/assets/gallery/image8.webp', 
    alt: 'Gallery Image 8', 
    span: 'col-span-2 row-span-1', 
    aspectRatio: 'aspect-[3/2]' 
  },
  { 
    src: '/assets/gallery/image2.webp', 
    alt: 'Gallery Image 2', 
    span: 'col-span-2 row-span-1', 
    aspectRatio: 'aspect-[3/2]' 
  },
  { 
    src: '/assets/gallery/image6.webp', 
    alt: 'Gallery Image 6', 
    span: 'col-span-2 row-span-1', 
    aspectRatio: 'aspect-[3/2]' 
  },
];

export const GAMES = [
  {
    id: 'typing-test',
    title: 'Developer Speed Test',
    description: 'Test your coding typing speed with this minimalist terminal-style speed test game. Features top programming keywords!',
    icon: <Keyboard className="w-8 h-8 md:w-10 md:h-10 text-(--chrysler-blue)" />,
    path: '/play/typing-test',
    status: 'Available',
    color: 'var(--chrysler-blue)'
  },
  {
    id: 'data-pipeline-puzzle',
    title: 'Data Pipeline Puzzle',
    description: 'Connect the nodes to build a data pipeline without crossing lines. A logic puzzle for data science engineers.',
    icon: <BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-(--celadon)" />,
    path: '/play/data-pipeline',
    status: 'Available',
    color: 'text-(--celadon)'
  },
  {
    id: 'minimalist-snake',
    title: 'Minimalist Snake',
    description: 'The Python developer edition of the classic game. Collect tech stack icons on an infinite grid.',
    icon: <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-[#ffbd2e]" />,
    path: '/play/snake',
    status: 'Available',
    color: 'text-[#ffbd2e]'
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Classic logic-based number placement puzzle.',
    icon: <Grid3X3 className="w-8 h-8 md:w-10 md:h-10 text-(--amethyst)" />,
    path: '/play/sudoku',
    status: 'Available',
    color: 'text-(--amethyst)'
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    description: 'Defend the server from incoming bugs in this classic retro shooter.',
    icon: <Rocket className="w-8 h-8 md:w-10 md:h-10 text-rose-500" />,
    path: '/play/space-invaders',
    status: 'Available',
    color: 'text-rose-500'
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    description: 'Navigate the bird through the pipes in this challenging arcade classic.',
    icon: <Bird className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />,
    path: '/play/flappy-bird',
    status: 'Available',
    color: 'text-yellow-500'
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'Play against an AI in this classic game. Can you beat the Minimax algorithm?',
    icon: <Swords className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />,
    path: '/play/tictactoe',
    status: 'Available',
    color: 'text-purple-500'
  }
];
