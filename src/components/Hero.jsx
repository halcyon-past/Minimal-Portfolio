import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurvyTextAnimation from './CurvyTextAnimation';

export default function Hero() {
  const [showIntro, setShowIntro] = useState(true);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Total animation time for intro is ~2.2s before unmounting
    const completeTimer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = '';
    }, 2200);
    
    return () => {
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
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <motion.span 
              className="text-[var(--amethyst)] font-light text-6xl md:text-8xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, y: -50, opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                exit: { duration: 0.4 } 
              }}
              style={{ transformOrigin: 'center' }}
            >
              Welcome!! Discover what's next...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative bg-white cursor-default">
        <div className="container mx-auto px-4 md:px-8 overflow-hidden">
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
