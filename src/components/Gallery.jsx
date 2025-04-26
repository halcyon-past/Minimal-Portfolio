import { galleryImages } from '../data/data';
import LazyImage from './common/LazyImage';

export default function Gallery() {
  return (
    <section id="gallery" className="py-16 px-4 md:px-8 bg-white cursor-default">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center text-gray-900">
          My <span className="text-[var(--amethyst)] font-medium">Gallery</span>
        </h2>
        <p className="text-lg text-center mb-8 text-gray-700">
          A glimpse into my world — where <span className="font-medium">creativity</span>, <span className="font-medium">moments</span>, and <span className="font-medium">memories</span> come to life through visual storytelling.
        </p>
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className={`${image.span} relative overflow-hidden rounded-xl border border-gray-200 shadow-sm group transition-all duration-300 hover:shadow-md`}
            >
              <LazyImage 
                src={image.src} 
                alt={image.alt}
                aspectRatio={image.aspectRatio}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(131,103,199,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
