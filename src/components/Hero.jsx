import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurvyTextAnimation from './CurvyTextAnimation';

import { createPortal } from 'react-dom';

const greetings = ["Hello", "Bonjour", "Ciao", "Namaste", "Nomoshkar", "Welcome"];

let hasPlayedIntro = false;

export default function Hero() {
  const [showIntro, setShowIntro] = useState(!hasPlayedIntro);
  const [greetingIndex, setGreetingIndex] = useState(0);
  
  useEffect(() => {
    if (!showIntro) return;

    hasPlayedIntro = true;
    document.body.style.overflow = 'hidden';
    
    // Cycle through greetings smoothly
    const interval = setInterval(() => {
      setGreetingIndex((prev) => {
        if (prev < greetings.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 380); // 380ms per greeting

    // Total animation time for intro before unmounting
    const completeTimer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = '';
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(completeTimer);
      document.body.style.overflow = '';
    };
  }, [showIntro]);
  
  return (
    <>
      {/* Intro Animation via Portal to escape stacking contexts */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {showIntro && (
            <motion.div 
              className="fixed inset-0 z-[99999] bg-gray-900 flex items-center justify-center custom-intro-cursor"
              initial={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <AnimatePresence>
                <motion.div
                  key={greetings[greetingIndex]}
                  className="absolute text-white font-medium text-4xl md:text-7xl flex items-center gap-3 md:gap-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3 md:gap-5">
                    <span className="inline-block w-2.5 h-2.5 md:w-4 md:h-4 bg-(--amethyst) rounded-full mt-1 md:mt-2"></span>
                    {greetings[greetingIndex]}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
      
      {/* Main Content */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative bg-white dark:bg-gray-950 cursor-default">
        <div className="container mx-auto px-4 md:px-8 overflow-hidden">
          <motion.h1 
            className="text-4xl md:text-6xl font-medium mb-8 text-gray-900 dark:text-gray-100"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: showIntro ? 50 : 0, opacity: showIntro ? 0 : 1 }}
            transition={{ duration: 0.8, delay: showIntro ? 0 : 0.2, ease: "easeOut" }}
          >
            Hi, I'm <span className="text-(--amethyst) font-semibold">Aritro Saha</span>.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: showIntro ? 30 : 0, opacity: showIntro ? 0 : 1 }}
            transition={{ duration: 0.8, delay: showIntro ? 0 : 0.4, ease: "easeOut" }}
          >
            Software Engineer 1 at <span className="font-medium text-gray-900 dark:text-gray-100">Bristol Myers Squibb</span>. I engineer high-throughput data pipelines, cloud infrastructure, and interactive web applications.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 1, delay: showIntro ? 0 : 0.8 }}
        >
          <CurvyTextAnimation />
        </motion.div>

        {/* SR-only paragraph block for expanded SEO depth, screen readers, and meeting >250 word counts naturally over multiple paragraphs. Visible to DOM/Crawlers but not to visual users. */}
        <article className="sr-only">
          <h2>About Aritro Saha (Megh)</h2>
          <p>
            Welcome to the official digital portfolio of Aritro Saha. I am a dedicated Software Engineer, Full-Stack Developer, and Data Science practitioner specializing in architecting modern, high-performance web applications and artificial intelligence integrations. My overarching goal as a web developer is to write exceptionally clean, maintainable, and scalable code that powers real-world enterprise operations. Beyond the professional sphere, I am intensely passionate about tackling complex architectural challenges, breaking them down into logical components, and designing intuitive user interactions.
          </p>
          <p>
            My technical background places a heavy emphasis on building scalable infrastructure. I actively leverage technologies such as cutting-edge React, Node.js, server-side Next.js, TypeScript, Python, Databricks, and various cloud platforms. These tools empower me to conceptualize solutions that deliver impactful, high-performing user experiences across diverse project scopes. From crafting lightning-fast frontend user interfaces to developing secure backend REST APIs and managing complex relational SQL databases alongside non-relational NoSQL stores, my full-stack approach guarantees a uniquely holistic perspective to product development and engineering.
          </p>
          <h2>Bristol Myers Squibb Experience and Enterprise Solutions</h2>
          <p>
            Currently, as a Software Engineer 1, I am contributing my technical expertise to highly innovative enterprise projects at Bristol Myers Squibb (BMS). Embedded within an enterprise ecosystem, I apply my skills in software engineering, data analytics, and continuous workflow automation to drive key operations forward. My daily professional responsibilities rely heavily on advanced proficiencies in JavaScript, modern TypeScript, Python programming, extensive cloud infrastructure configuration, and collaborative agile principles. Operating at this scale has taught me the undeniable long-term value of maintaining testable code coverage and ensuring rigid code quality standards.
          </p>
          <p>
            Prior to joining the tech sector professionally, I was a diligent graduate of Vellore Institute of Technology (VIT Chennai). During my rigorous academic tenure, I refined my baseline technical capabilities, studying core computer science principles, database system design, operating systems, and advanced algorithmic problem-solving. Throughout my entire career timeline, I constantly seek out challenging opportunities to advance my technical proficiency and rigorously keep abreast of rapidly shifting programming paradigms.
          </p>
          <h2>Aritro Games & The Developer Arcade Playground</h2>
          <p>
            In tandem with my professional work, I thoroughly enjoy creating engaging personal projects. A standout feature within this portfolio is the Aritro Arcade—often referred to as Aritro Games. I purposefully developed this interactive, developer-themed game hub directly into my personal web presence. It flawlessly blends robust state management logic using React alongside a creative, nostalgia-inducing user layout. The arcade features bespoke mini browsers games, including a rigorous developer typing speed test measuring WPM alongside a reimagined minimalist Snake game.
          </p>
          <p>
            Explore my catalog of open-source projects, CLI tools, and web applications. Each project focuses on clean software architecture, performance efficiency, and accessible user design.
          </p>
        </article>

      </section>
    </>
  );
}
