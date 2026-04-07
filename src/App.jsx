import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Seo from './components/common/Seo';
import { projects } from './data/data';

export default function Portfolio() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-white text-gray-900 font-family-poppins font-normal">
          <Header />
          <div className="flex-grow pt-16">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Seo title="Home" url="/" />
                    <Hero />
                    <Projects projects={projects} />
                  </>
                }
              />
              <Route 
                path="/about" 
                element={
                  <>
                    <Seo title="About Me" url="/about" description="Get to know Aritro Saha, his background in AI and full-stack development, and his professional journey." />
                    <AboutPage />
                  </>
                } 
              />
              <Route 
                path="/gallery" 
                element={
                  <>
                    <Seo title="Gallery" url="/gallery" description="Explore personal moments, events, and projects associated with Aritro Saha." />
                    <GalleryPage />
                  </>
                } 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}