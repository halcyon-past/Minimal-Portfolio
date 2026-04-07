import { motion } from 'framer-motion';
import Gears from './Gears';
import LazyImage from './common/LazyImage';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative py-8 px-4 md:px-8 bg-white md:-mt-32 z-10">
      <div className="container mx-auto relative">
        <Gears />  
        <div className="flex flex-col items-end gap-16 md:w-3/5 ml-auto relative z-10">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-full mb-4 overflow-hidden rounded-lg">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <LazyImage 
                    src={project.image} 
                    alt={project.alt} 
                    className="w-full h-auto"
                    blockClass="aspect-video" 
                  />
                </motion.div>
              </div>
              <div className="mb-3">
                <a href={project.link} className="inline-block group" target="_blank" rel="noopener noreferrer">
                  <h2 className="text-2xl md:text-3xl font-medium flex items-center border-b border-black pb-1 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-[-2px] after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
                    {String(index + 1).padStart(2, '0')}. {project.title}
                    <motion.span 
                      className="ml-2 transform text-3xl inline-block"
                      initial={{ x: 0, y: 0 }}
                      whileHover={{ x: 4, y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      ↗︎
                    </motion.span>
                  </h2>
                </a>
              </div>
              <p className="text-base text-gray-800 leading-relaxed">
                <span className="font-medium">What is it? </span> — {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

