import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurvyTextAnimation from './CurvyTextAnimation';

const greetings = ["Hello", "Bonjour", "Ciao", "Namaste", "Nomoshkar", "Welcome"];

export default function Hero() {
  const [showIntro, setShowIntro] = useState(true);
  const [greetingIndex, setGreetingIndex] = useState(0);
  
  useEffect(() => {
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
  }, []);
  
  return (
    <>
      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-gray-900 flex items-center justify-center custom-intro-cursor"
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
                  <span className="inline-block w-2.5 h-2.5 md:w-4 md:h-4 bg-[var(--amethyst)] rounded-full mt-1 md:mt-2"></span>
                  {greetings[greetingIndex]}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative bg-white cursor-default">
        <div className="container mx-auto px-4 md:px-8 overflow-hidden">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: showIntro ? 20 : 0, opacity: showIntro ? 0 : 1 }}
            transition={{ duration: 0.8, delay: showIntro ? 0 : 0.1, ease: "easeOut" }}
            className="mb-6 inline-block"
          >
            <a 
              href="https://siliconsync.aritro.cloud/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-sm md:text-sm font-medium text-[var(--chrysler-blue)] bg-[var(--honeydew)] hover:bg-[var(--amethyst)] hover:text-white border border-[var(--amethyst)]/20 rounded-full transition-all duration-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--amethyst)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--chrysler-blue)]"></span>
              </span>
              Check out my daily AI news blog
              <span>→</span>
            </a>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-medium mb-8 text-gray-900"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: showIntro ? 50 : 0, opacity: showIntro ? 0 : 1 }}
            transition={{ duration: 0.8, delay: showIntro ? 0 : 0.2, ease: "easeOut" }}
          >
            Hi, I'm <span className="text-[var(--amethyst)] font-semibold">Aritro Saha</span>.
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-3xl text-gray-700"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: showIntro ? 30 : 0, opacity: showIntro ? 0 : 1 }}
            transition={{ duration: 0.8, delay: showIntro ? 0 : 0.4, ease: "easeOut" }}
          >
            A <span className="font-medium">versatile</span> <span className="font-medium">full-stack developer</span> and <span className="font-medium">data science engineer</span> focused on creating <span className="font-medium">unique</span> and <span className="bg-[var(--chrysler-blue)] text-[var(--honeydew)] font-medium px-1 rounded">user-centric products</span>, currently working at <span className="font-medium">Bristol Myers Squibb</span>.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 1, delay: showIntro ? 0 : 0.8 }}
        >
          <CurvyTextAnimation />
        </motion.div>
      </section>
    </>
  );
}
