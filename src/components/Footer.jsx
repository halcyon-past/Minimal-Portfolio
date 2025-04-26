export default function Footer() {
  return (
    <footer className="py-8 bg-white px-4 md:px-8 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-700 mb-4 md:mb-0">
            © 2025 <span className="text-[var(--amethyst)] font-bold">Aritro Saha</span>. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com/in/aritro-saha"
              className="text-[var(--amethyst)] hover:text-[var(--chrysler-blue)] font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/halcyon-past"
              className="text-[var(--celadon)] hover:text-[var(--amethyst)] font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://github.com/halcyon-past"
              className="text-[var(--chrysler-blue)] hover:text-[var(--amethyst)] font-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
