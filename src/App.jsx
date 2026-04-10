import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import TypingTestPage from './pages/games/TypingTestPage';
import GamesCatalogPage from './pages/GamesCatalogPage';
import SnakeGamePage from './pages/games/SnakeGamePage';
import SudokuGamePage from './pages/games/SudokuGamePage';
import DataPipelinePage from './pages/games/DataPipelinePage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Seo from './components/common/Seo';
import PageTransition from './components/common/PageTransition';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';
import CommandPalette from './components/common/CommandPalette';
import { projects } from './data/data';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Seo title="Home" url="/" />
              <Hero />
              <Projects projects={projects.filter(project => project.HomepageVisibility !== false)} />
            </PageTransition>
          }
        />
        <Route 
          path="/about" 
          element={
            <PageTransition>
              <Seo title="About Me" url="/about" description="Get to know Aritro Saha, his background in AI and full-stack development, and his professional journey." />
              <AboutPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/gallery" 
          element={
            <PageTransition>
              <Seo title="Gallery" url="/gallery" description="Explore personal moments, events, and projects associated with Aritro Saha." />
              <GalleryPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play" 
          element={
            <PageTransition>
              <Seo title="The Arcade" url="/play" description="A collection of minimalist, developer-themed games built directly into my portfolio. Take a break and challenge yourself!" />
              <GamesCatalogPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play/typing-test" 
          element={
            <PageTransition>
              <Seo title="Developer Speed Test" url="/play/typing-test" description="Test your coding typing speed with this minimalist terminal-style speed test game!" />
              <TypingTestPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play/snake" 
          element={
            <PageTransition>
              <Seo title="Minimalist Snake" url="/play/snake" description="Play the classic Snake game but you collect tech stacks instead of apples!" />
              <SnakeGamePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play/sudoku" 
          element={
            <PageTransition>
              <Seo title="Sudoku" url="/play/sudoku" description="Play classic Sudoku right inside your browser!" />
              <SudokuGamePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play/data-pipeline" 
          element={
            <PageTransition>
              <Seo title="Data Pipeline Puzzle" url="/play/data-pipeline" description="Connect the nodes to build a data pipeline without crossing lines. A logic puzzle for data science engineers." />
              <DataPipelinePage />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function Portfolio() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollProgress />
        <CustomCursor />
        <CommandPalette />
        <ScrollToTop />
        
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-family-poppins font-normal">
          <Header />
          <main className="flex-grow pt-16">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}