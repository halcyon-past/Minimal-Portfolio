import Gears from './Gears';
import LazyImage from './common/LazyImage';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative py-8 px-4 md:px-8 bg-white md:-mt-32 z-10">
      <div className="container mx-auto relative">
        <Gears />  
        <div className="flex flex-col items-end gap-16 md:w-3/5 ml-auto relative z-10">
          {projects.map((project, index) => (
            <div key={index} className="w-full">
              <div className="w-full mb-4">
                <LazyImage 
                  src={project.image} 
                  alt={project.alt} 
                  className="w-full h-auto rounded-lg"
                  blockClass="aspect-video" 
                />
              </div>
              <div className="mb-3">
                <a href={project.link} className="inline-block" target="_blank" rel="noopener noreferrer">
                  <h2 className="text-2xl md:text-3xl font-medium flex items-center border-b border-black pb-1">
                    {String(index + 1).padStart(2, '0')}. {project.title}
                    <span className="ml-2 transform text-3xl">↗︎</span>
                  </h2>
                </a>
              </div>
              <p className="text-base text-gray-800">
                <span className="font-medium">What is it? </span> — {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

