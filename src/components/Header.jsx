import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '/logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Aritro Saha Logo" className="md:h-14 h-10" />
        </Link>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-900">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className="hidden md:flex space-x-6">
          <button onClick={handleProjectsClick} className="hover:text-[var(--amethyst)]">
            Projects
          </button>
          <Link to="/about" className="hover:text-[var(--amethyst)]">About</Link>
          <Link to="/contact" className="hover:text-[var(--amethyst)]">Contact</Link>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 shadow-md">
            <div className="flex flex-col space-y-4">
              <button onClick={handleProjectsClick} className="hover:underline">
                Projects
              </button>
              <Link to="/about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
