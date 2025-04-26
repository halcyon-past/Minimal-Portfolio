import { socialMedia } from '../data/data';

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
              className="text-[var(--chrysler-blue)] hover:text-[var(--amethyst)] font-medium transition-colors duration-300 flex items-center mt-2 justify-center"
              aria-label="Email"
            >
              <i className="fas fa-envelope mr-2"></i>
              aritrosaha2025@gmail.com
            </a>
          </div>
          <div className="flex space-x-8">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={`${social.color} ${social.hoverColor} font-medium transition-colors duration-300`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
              >
                <i className={`${social.icon} text-2xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
