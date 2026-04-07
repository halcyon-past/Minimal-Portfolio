import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Gears from './Gears';
import LazyImage from './common/LazyImage';

function TiltCard({ project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full mb-4 rounded-lg relative perspective-1000"
    >
      <div 
        className="w-full overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
        style={{ transform: "translateZ(30px)" }}
      >
        <LazyImage 
          src={project.image} 
          alt={project.alt} 
          className="w-full h-auto"
          blockClass="aspect-video" 
        />
      </div>
    </motion.div>
  );
}

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
              <TiltCard project={project} />
              
              <div className="mb-3 mt-6">
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

