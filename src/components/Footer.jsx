export default function Footer() {
  return (
    <footer className="py-8 bg-white px-4 md:px-8 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-700">
              © 2025 <span className="text-[var(--amethyst)] font-medium">Aritro Saha</span>. All rights reserved.
            </p>
            <a
              href="mailto:aritrosaha2025@gmail.com"
              className="text-[var(--chrysler-blue)] hover:text-[var(--amethyst)] font-medium transition-colors duration-300 flex items-center mt-2"
              aria-label="Email"
            >
              <i className="fas fa-envelope mr-2"></i>
              aritrosaha2025@gmail.com
            </a>
          </div>
          <div className="flex space-x-8">
            <a
              href="https://linkedin.com/in/aritro-saha"
              className="text-[var(--amethyst)] hover:text-[var(--chrysler-blue)] font-medium transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a
              href="https://instagram.com/halcyon-past"
              className="text-[var(--celadon)] hover:text-[var(--amethyst)] font-medium transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://github.com/halcyon-past"
              className="text-[var(--chrysler-blue)] hover:text-[var(--amethyst)] font-medium transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a
              href="https://www.youtube.com/@veripyed"
              className="text-[var(--tea-green)] hover:text-[var(--amethyst)] font-medium transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
