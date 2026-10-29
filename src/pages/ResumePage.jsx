import { motion } from 'framer-motion';
import { Download, Building2, GraduationCap, Award, Code2, ExternalLink, Mail, MapPin, Briefcase } from 'lucide-react';
import { experience, education } from '../data/portfolioData';

export default function ResumePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const skills = [
    { category: 'Languages', items: ['Python (AsyncIO, Pytest, FastAPI)', 'TypeScript', 'JavaScript (ESM, React 19, Next.js)', 'Swift 6.0 (AppKit, SwiftUI)', 'SQL'] },
    { category: 'Cloud & Distributed Systems', items: ['Databricks', 'Apache Spark', 'Google Cloud Platform (Cloud Run, Pub/Sub)', 'Firestore', 'MongoDB'] },
    { category: 'Native & Systems Engineering', items: ['Apple Neural Engine', 'Apple Vision Framework', 'CGEventTap', 'macOS Menu Bar Utilities', 'WebAssembly'] },
    { category: 'AI & Data Engineering', items: ['Google Gemini API', 'LangGraph', 'MediaPipe Computer Vision', 'Retrieval-Augmented Generation (RAG)', 'Data Pipelines'] }
  ];

  const highlights = [
    { title: 'Hack4Bengal 3.0 Grand Champion', desc: 'Team Lead & 1st Place Winner out of 5,000+ applicants for PAWsitive animal healthcare triage system.' },
    { title: 'LeetCode Knight', desc: 'Peak contest rating 1868 (Top 6% globally) with 630+ algorithmic solutions solved.' },
    { title: 'Published First Author (IJIRT)', desc: 'Research on low-latency multimodal computer vision interfaces (DOI: 10.64643/IJIRT180711, Paper ID: 180711).' },
    { title: 'Upstream Core Contributor', desc: 'Contributed DuckDB capture engine enhancements to Kestra (kestra-io/plugin-jdbc v2.2.0).' }
  ];

  return (
    <div className="min-h-screen py-24 px-4 md:px-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="border-b border-gray-200 dark:border-gray-800 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                Aritro Saha <span className="text-(--amethyst) text-2xl md:text-3xl font-medium">(Megh)</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 font-medium mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-(--amethyst)" />
                Software Engineer 1 at Bristol Myers Squibb
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> India</span>
                <a href="mailto:aritrosaha2025@gmail.com" className="flex items-center gap-1.5 hover:text-(--amethyst) transition-colors">
                  <Mail className="w-4 h-4" /> aritrosaha2025@gmail.com
                </a>
                <a href="https://linkedin.com/in/aritro-saha" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-(--amethyst) transition-colors">
                  <ExternalLink className="w-4 h-4" /> LinkedIn
                </a>
                <a href="https://github.com/halcyon-past" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-(--amethyst) transition-colors">
                  <ExternalLink className="w-4 h-4" /> GitHub
                </a>
              </div>
            </div>

            {/* Prominent Download Button */}
            <div className="flex items-center">
              <a
                href="/assets/resume/Aritro-Saha-Software-Engineer-Resume.pdf"
                download="Aritro-Saha-Software-Engineer-Resume.pdf"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-(--amethyst) hover:bg-(--chrysler-blue) text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto text-center cursor-pointer group"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download PDF Resume</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Professional Summary */}
        <motion.section variants={itemVariants} className="mb-10">
          <h2 className="text-xl font-bold uppercase tracking-wider text-(--amethyst) mb-3 flex items-center gap-2">
            Professional Summary
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Software Engineer 1 at Bristol Myers Squibb with a deep focus on high-throughput data science engineering, resilient full-stack systems, native macOS utilities, and applied AI. Experienced in building enterprise-grade data pipelines, low-latency client applications, and open-source tooling. Grand Champion of Hack4Bengal 3.0 and published author in multimodal computer vision interfaces.
          </p>
        </motion.section>

        {/* Experience Section */}
        <motion.section variants={itemVariants} className="mb-10">
          <h2 className="text-xl font-bold uppercase tracking-wider text-(--amethyst) mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5" /> Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/40">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{exp.title}</h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{exp.duration}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exp.title.includes('Bristol Myers Squibb') && 'Architecting enterprise software engineering workflows, data analytics pipelines, and automated cloud systems.'}
                  {exp.title.includes('Bajaj Finserv') && 'Developed machine learning models, healthcare analytics data pipelines, and predictive risk scoring algorithms.'}
                  {exp.title.includes('Wipro') && 'Engineered full-stack web applications, REST APIs, and automated UI workflows.'}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section variants={itemVariants} className="mb-10">
          <h2 className="text-xl font-bold uppercase tracking-wider text-(--amethyst) mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" /> Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/40">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{edu.title}</h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{edu.year}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{edu.institution}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Key Accolades & Leadership */}
        <motion.section variants={itemVariants} className="mb-10">
          <h2 className="text-xl font-bold uppercase tracking-wider text-(--amethyst) mb-6 flex items-center gap-2">
            <Award className="w-5 h-5" /> Key Accolades & Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highlights.map((h, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/40">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1">{h.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{h.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Core Technical Competencies */}
        <motion.section variants={itemVariants} className="mb-12">
          <h2 className="text-xl font-bold uppercase tracking-wider text-(--amethyst) mb-6 flex items-center gap-2">
            <Code2 className="w-5 h-5" /> Technical Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((s, i) => (
              <div key={i} className="p-5 rounded-xl border border-gray-100 dark:border-gray-800/80 bg-gray-50/50 dark:bg-gray-900/40">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide text-(--amethyst) mb-3">
                  {s.category}
                </h3>
                <ul className="space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-(--amethyst) mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Footer Navigation Back to Portfolio */}
        <motion.div variants={itemVariants} className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Aritro Saha. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/" className="hover:text-(--amethyst) transition-colors">Home</a>
            <a href="/about" className="hover:text-(--amethyst) transition-colors">About</a>
            <a href="/play" className="hover:text-(--amethyst) transition-colors">Arcade</a>
            <a href="/assets/resume/Aritro-Saha-Software-Engineer-Resume.pdf" className="text-(--amethyst) hover:underline font-medium">Download PDF</a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
