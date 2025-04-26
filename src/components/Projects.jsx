import Gears from './Gears';

export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative py-8 px-4 md:px-8 bg-white md:-mt-32 z-10">
      <div className="container mx-auto relative">
        {/* Add the Gears component */}
        <Gears />
        
        <div className="flex flex-col items-end gap-16 md:w-3/5 ml-auto relative z-10">
          {projects.map((project, index) => (
            <div key={index} className="w-full">
              {/* Project Image */}
              <div className="w-full mb-4">
                <img 
                  src={project.image} 
                  alt={project.alt} 
                  className="w-full h-auto rounded-lg" 
                />
              </div>
              
              {/* Project Title with Index */}
              <div className="mb-3">
                <a href={project.link} className="inline-block" target="_blank" rel="noopener noreferrer">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center border-b border-black pb-1">
                    {String(index + 1).padStart(2, '0')}. {project.title}
                    <span className="ml-2 transform rotate-45 text-xl">↗</span>
                  </h2>
                </a>
              </div>
              
              {/* Project Description */}
              <p className="text-base text-gray-800">
                <span className="font-bold">What is it? </span> — {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

