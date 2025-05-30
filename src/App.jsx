import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { projects } from './data/data';

export default function Portfolio() {
  return (
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
                  <Hero />
                  <Projects projects={projects} />
                </>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}