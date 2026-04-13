import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';
import logo from '/logo.webp';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleProjectsClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setMenuOpen(false);
  };

  return (
    <motion.header 
      className="fixed top-0 w-full z-50 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/75 dark:bg-gray-950/75 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="container mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center z-50 relative">
          <motion.img 
            src={logo} 
            alt="Aritro Saha Logo" 
            className="h-10 w-10 md:h-14 md:w-14 object-contain" 
            width="56"
            height="56"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </Link>
        
        {/* Hamburger button for mobile */}
        <div className="md:hidden z-50 relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
            aria-label="Menu"
          >
            <span className={`bg-gray-900 dark:bg-gray-100 block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${menuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-gray-900 dark:bg-gray-100 block h-0.5 w-6 rounded-sm my-0.5 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-gray-900 dark:bg-gray-100 block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${menuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 font-normal items-center">
          <button onClick={handleProjectsClick} className="relative group text-gray-800 dark:text-gray-200 hover:text-(--amethyst) transition-colors duration-300">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--amethyst) transition-all duration-300 group-hover:w-full"></span>
          </button>
          <Link to="/about" className="relative group text-gray-800 dark:text-gray-200 hover:text-(--amethyst) transition-colors duration-300">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--amethyst) transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/gallery" className="relative group text-gray-800 dark:text-gray-200 hover:text-(--amethyst) transition-colors duration-300">
            Gallery
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--amethyst) transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link to="/play" className="relative group flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-md bg-(--amethyst)/10 text-(--chrysler-blue) dark:text-purple-300 hover:bg-(--amethyst) hover:text-white transition-all duration-300 border border-(--amethyst)/30 shadow-[0_0_10px_var(--amethyst)]/20">
            <i className="fas fa-terminal"></i> Play
          </Link>
          <button 
            onClick={() => setIsDark(!isDark)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'dark' : 'light'}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
        
        {/* Full screen mobile menu - fixed positioning to cover entire viewport */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              className="fixed top-0 left-0 w-full h-[100vh] bg-white dark:bg-gray-950 z-40 flex flex-col justify-center items-center md:hidden"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="flex flex-col space-y-8 text-3xl font-light items-center">
                <motion.button 
                  onClick={handleProjectsClick} 
                  className="relative group hover:text-(--amethyst)"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="block">Projects</span>
                </motion.button>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link 
                    to="/about" 
                    onClick={() => setMenuOpen(false)}
                    className="relative group hover:text-(--amethyst)"
                  >
                    <span className="block">About</span>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    to="/gallery" 
                    onClick={() => setMenuOpen(false)}
                    className="relative group hover:text-(--amethyst)"
                  >
                    <span className="block">Gallery</span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link 
                    to="/play" 
                    onClick={() => setMenuOpen(false)}
                    className="relative group text-(--chrysler-blue) dark:text-purple-300 font-medium flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-terminal"></i> Play Game
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-8"
                >
                  <button 
                    onClick={() => {
                      setIsDark(!isDark);
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  >
                    {isDark ? <Sun size={24} /> : <Moon size={24} />}
                    <span className="text-xl">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
