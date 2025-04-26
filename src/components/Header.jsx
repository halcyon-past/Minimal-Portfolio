import { useState } from 'react';
import logo from '/logo.png'; // Corrected alias path

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-gray-200/50 bg-white/75 backdrop-blur-md">
      <nav className="container mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img src={logo} alt="Aritro Saha Logo" className="md:h-14 h-10" />
        </a>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-900">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#work" className="hover:text-[var(--amethyst)]">Projects</a>
          <a href="#about" className="hover:text-[var(--amethyst)]">About</a>
          <a href="#contact" className="hover:text-[var(--amethyst)]">Contact</a>
        </div>
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 shadow-md">
            <div className="flex flex-col space-y-4">
              <a href="#work" className="hover:underline" onClick={() => setMenuOpen(false)}>Projects</a>
              <a href="#about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
