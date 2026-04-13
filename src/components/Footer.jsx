import { useEffect, useState } from 'react';
import { socialMedia } from '../data/data';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [currentUrl, setCurrentUrl] = useState('https://www.aritro.cloud/');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(encodeURIComponent(window.location.href));
    }
  }, []);

  const shareMessage = "I just explored Aritro Saha's Software Engineering Portfolio and Arcade! Check out his projects and play some developer-themed games here: ";

  const shareLinks = [
    {
      name: 'Twitter',
      icon: 'fa-brands fa-x-twitter',
      url: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(shareMessage)}`,
      color: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700',
    },
    {
      name: 'LinkedIn',
      icon: 'fa-brands fa-linkedin-in',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`,
      color: 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30',
    },
    {
      name: 'WhatsApp',
      icon: 'fa-brands fa-whatsapp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}${currentUrl}`,
      color: 'text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 bg-gray-100 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/30',
    }
  ];

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isShareModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isShareModalOpen]);

  return (
    <>
      <footer className="py-8 bg-white dark:bg-gray-950 px-4 md:px-8 border-t border-gray-200 dark:border-gray-800 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Left side: Copyright & Email */}
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <p className="text-gray-700 dark:text-gray-300 font-medium cursor-default">
                © {new Date().getFullYear()} <span className="text-(--amethyst)">Aritro Saha</span>. All rights reserved.
              </p>
              <a
                href="mailto:aritrosaha2025@gmail.com"
                className="text-(--chrysler-blue) hover:text-(--amethyst) font-medium transition-colors duration-300 flex items-center justify-center md:justify-start mt-2"
                aria-label="Email"
              >
                <i className="fas fa-envelope mr-2"></i>
                aritrosaha2025@gmail.com
              </a>
            </div>

            {/* Right side: Socials + Share Button */}
            <div className="flex gap-6 md:gap-8 items-center bg-gray-50 dark:bg-gray-900/50 px-6 py-3 rounded-full border border-gray-100 dark:border-gray-800">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`${social.color} ${social.hoverColor} font-medium transition-transform hover:scale-110 duration-300`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                >
                  <i className={`${social.icon} text-xl md:text-2xl`}></i>
                </a>
              ))}
              
              {/* Divider */}
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-700"></div>

              {/* Share Icon */}
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="text-gray-500 dark:text-gray-400 hover:text-(--amethyst) dark:hover:text-(--amethyst) font-medium transition-transform hover:scale-110 duration-300 focus:outline-none flex items-center justify-center"
                aria-label="Open Share Options"
              >
                <i className="fas fa-share-nodes text-xl md:text-2xl"></i>
              </button>
              
              {/* Visually hidden links so SEO bots and screen readers can crawl them without clicking */}
              <div className="sr-only">
                {shareLinks.map((share, index) => (
                  <a key={`seo-share-${index}`} href={share.url}>
                    Share on {share.name}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* Share Modal Popup */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm cursor-pointer"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden z-10"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Share this page</h3>
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
                  aria-label="Close share modal"
                >
                  <i className="fas fa-xmark text-lg"></i>
                </button>
              </div>
              
              <div className="p-6 grid grid-cols-3 gap-4">
                {shareLinks.map((share, index) => (
                  <a
                    key={index}
                    href={share.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${share.color}`}
                    onClick={() => setTimeout(() => setIsShareModalOpen(false), 200)}
                  >
                    <i className={`${share.icon} text-3xl mb-2`}></i>
                    <span className="text-xs font-medium">{share.name}</span>
                  </a>
                ))}
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-950/50 border-t border-gray-100 dark:border-gray-800 text-center">
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(decodeURIComponent(currentUrl));
                      alert("Link copied to clipboard!");
                    } catch (err) {
                      console.error('Failed to copy!', err);
                    }
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-(--amethyst) uppercase tracking-wider transition-colors flex items-center justify-center w-full focus:outline-none"
                >
                  <i className="fas fa-link mr-2"></i>
                  Copy Link
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
