import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Seo from './components/common/Seo';
import PageTransition from './components/common/PageTransition';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';
import CommandPalette from './components/common/CommandPalette';
import { projects } from './data/data';

// Code-split secondary views & arcade games for optimal Core Web Vitals (INP/LCP)
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const GamesCatalogPage = lazy(() => import('./pages/GamesCatalogPage'));
const TypingTestPage = lazy(() => import('./pages/games/TypingTestPage'));
const SnakeGamePage = lazy(() => import('./pages/games/SnakeGamePage'));
const SudokuGamePage = lazy(() => import('./pages/games/SudokuGamePage'));
const DataPipelinePage = lazy(() => import('./pages/games/DataPipelinePage'));
const SpaceInvadersPage = lazy(() => import('./pages/games/SpaceInvadersPage'));
const FlappyBirdPage = lazy(() => import('./pages/games/FlappyBirdPage'));
const TicTacToePage = lazy(() => import('./pages/games/TicTacToePage'));
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center" aria-label="Loading page">
    <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

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
          path="/aritrosaha" 
          element={
            <PageTransition>
              <Seo title="Aritro Saha (aritrosaha) | Software Engineer & Creator" url="/aritrosaha" description="Official verified profile of Aritro Saha (aritrosaha). Software Engineer 1 at Bristol Myers Squibb, Winner of Hack4Bengal 3.0, and creator of Byakugan Scan and SutraKey." />
              <AboutPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/aritro-saha" 
          element={
            <PageTransition>
              <Seo title="Aritro Saha | Software Engineer & Creator" url="/aritrosaha" description="Official verified profile of Aritro Saha. Software Engineer 1 at Bristol Myers Squibb, Winner of Hack4Bengal 3.0, and creator of Byakugan Scan and SutraKey." />
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
        <Route 
          path="/play/space-invaders" 
          element={
            <PageTransition>
              <Seo title="Space Invaders" url="/play/space-invaders" description="Defend your codebase from bugs!" />
              <SpaceInvadersPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play/flappy-bird" 
          element={
            <PageTransition>
              <Seo title="Flappy Bird" url="/play/flappy-bird" description="Navigate the bird through the pipes!" />
              <FlappyBirdPage />
            </PageTransition>
          } 
        />
        <Route 
          path="/play/tictactoe" 
          element={
            <PageTransition>
              <Seo title="Tic Tac Toe" url="/play/tictactoe" description="Beat the AI in this minimalist classic!" />
              <TicTacToePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/projects/:id" 
          element={
            <PageTransition>
              <ProjectDetailsPage />
            </PageTransition>
          } 
        />
        <Route 
          path="*" 
          element={
            <PageTransition>
              <Seo title="404 - Not Found" noindex={true} />
              <NotFoundPage />
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
          <main className="grow pt-16">
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}