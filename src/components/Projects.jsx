export default function Projects({ projects }) {
  return (
    <section id="projects" className="relative py-8 px-4 md:px-8 bg-white md:-mt-32 z-10">
      <div className="container mx-auto">
        <div className="flex flex-col items-end gap-6 md:w-3/4 ml-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition hover:border-gray-300"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img src={project.image} alt={project.alt} className="w-full rounded-lg" />
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${project.color}`}>{project.title}</h3>
              <p className="text-gray-600 mb-4 font-medium">{project.description}</p>
              <a
                href={project.link}
                className={`text-${project.color} hover:text-[var(--amethyst)] font-bold`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
