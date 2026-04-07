import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
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
        
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-family-poppins font-normal">
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