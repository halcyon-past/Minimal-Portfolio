import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '/logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Prevent body scroll when menu is open
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
    }, 100); // Delay to ensure navigation completes
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-200/50 bg-white/75 backdrop-blur-md">
      <nav className="container mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center z-50 relative">
          <img src={logo} alt="Aritro Saha Logo" className="md:h-14 h-10" />
        </Link>
        
        {/* Hamburger button for mobile */}
        <div className="md:hidden z-50 relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
            aria-label="Menu"
          >
            <span className={`bg-gray-900 block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${menuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-gray-900 block h-0.5 w-6 rounded-sm my-0.5 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-gray-900 block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${menuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 font-normal">
          <button onClick={handleProjectsClick} className="hover:text-[var(--amethyst)] transition-colors duration-300">
            Projects
          </button>
          <Link to="/about" className="hover:text-[var(--amethyst)] transition-colors duration-300">About</Link>
          <Link to="/gallery" className="hover:text-[var(--amethyst)] transition-colors duration-300">Gallery</Link>
        </div>
        
        {/* Full screen mobile menu - fixed positioning to cover entire viewport */}
        <div 
          className={`fixed top-0 left-0 w-full h-full bg-white z-40 transition-transform duration-500 ease-in-out transform ${menuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden`}
          style={{height: '100vh'}}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-col space-y-8 text-2xl font-light">
              <button 
                onClick={handleProjectsClick} 
                className={`relative overflow-hidden group transition-transform duration-300 transform ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '150ms' }}
              >
                <span className="block">Projects</span>
                <span className="h-0.5 w-0 bg-[var(--amethyst)] absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
              </button>
              
              <Link 
                to="/about" 
                onClick={() => setMenuOpen(false)}
                className={`relative overflow-hidden group transition-transform duration-300 transform ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '250ms' }}
              >
                <span className="block">About</span>
                <span className="h-0.5 w-0 bg-[var(--amethyst)] absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              <Link 
                to="/gallery" 
                onClick={() => setMenuOpen(false)}
                className={`relative overflow-hidden group transition-transform duration-300 transform ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
                style={{ transitionDelay: '350ms' }}
              >
                <span className="block">Gallery</span>
                <span className="h-0.5 w-0 bg-[var(--amethyst)] absolute bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
