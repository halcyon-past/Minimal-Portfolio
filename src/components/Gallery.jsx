import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/data';
import LazyImage from './common/LazyImage';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section id="gallery" className="py-16 px-4 md:px-8 bg-white dark:bg-gray-950 cursor-default">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center text-gray-900 dark:text-gray-100">
            My <span className="text-(--amethyst) font-medium">Gallery</span>
          </h2>
          <p className="text-lg text-center mb-8 text-gray-700 dark:text-gray-300">
            A glimpse into my world — where <span className="font-medium">creativity</span>, <span className="font-medium">moments</span>, and <span className="font-medium">memories</span> come to life through visual storytelling.
          </p>
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((image, index) => (
              <motion.div 
                key={index} 
                className={`${image.span} relative overflow-hidden rounded-xl border border-gray-200 shadow-sm group transition-all duration-300 hover:shadow-md cursor-pointer`}
                onClick={() => openLightbox(image)}
                layoutId={`gallery-image-${index}`}
              >
                <LazyImage 
                  src={image.src} 
                  alt={image.alt}
                  aspectRatio={image.aspectRatio}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(131,103,199,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white z-[110] bg-black/50 hover:bg-white/20 dark:bg-gray-950/20 p-2 rounded-full transition-colors backdrop-blur-md"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <motion.img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
              layoutId={`gallery-image-${galleryImages.findIndex(img => img === selectedImage)}`}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
