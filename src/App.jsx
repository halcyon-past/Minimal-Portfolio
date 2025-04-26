import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { projects } from './data/data';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <Hero />
      <Projects projects={projects} />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}