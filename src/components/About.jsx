import profileImage from '../assets/profile.jpg';
import { experience, education } from '../data/data';
import LazyImage from './common/LazyImage';

export default function About() {
  return (
    <section id="about" className="py-16 bg-white px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-12">
          <div className="md:w-1/3 mb-8 md:mb-0 text-center">
            <div className="inline-block p-1 rounded-full bg-gradient-to-br from-[var(--chrysler-blue)] via-[var(--amethyst)] to-[var(--celadon)] mb-4">
              <LazyImage
                src={profileImage}
                alt="Aritro Saha profile picture"
                className="w-48 h-48 rounded-full border border-gray-200 object-cover"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-medium mb-4 text-gray-900 cursor-default">
              About <span className="text-[var(--amethyst)] font-medium">Me</span>
            </h2>
          </div>
          <div className="md:w-1/2 text-gray-700 cursor-default">
            <p className="mb-4 text-lg">
              I'm a final-year <span className="font-medium text-[var(--amethyst)]">B.Tech student</span> and a passionate <span className="font-medium text-[var(--chrysler-blue)]">full stack developer</span> with a strong footing in <span className="font-medium text-[var(--amethyst)]">data science</span>. Currently interning at <span className="font-medium">Bajaj Finserv</span> as a <span className="font-medium text-[var(--tea-green)]">Data Science Intern</span>, I enjoy bridging the gap between backend logic and user-facing design while also exploring the power of data to drive smart decisions.
            </p>
            <p className="mb-4 text-lg">
              I've had the privilege of winning <span className="font-medium text-[var(--chrysler-blue)]">Hack4Bengal 3.0</span>—Eastern India's largest hackathon—where I led the charge on building impactful tech under pressure. Whether it's crafting <span className="font-medium text-[var(--amethyst)]">scalable web apps</span> or building <span className="font-medium text-[var(--tea-green)]">predictive models</span>, I thrive at the intersection of code, creativity, and real-world problem solving.
            </p>
            <p className="mb-4 text-lg">
              When I'm not coding, you'll find me <span className="font-medium text-[var(--amethyst)]">beatboxing</span>, <span className="font-medium text-[var(--chrysler-blue)]">playing football</span>, or chasing my next creative outlet.
            </p>
            <div className="mt-12">
              <h3 className="text-xl font-medium mb-4 text-[var(--chrysler-blue)]">Experience</h3>
              <div className="space-y-4">
                {experience.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-gray-700">{item.duration}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4 text-[var(--chrysler-blue)]">Education</h3>
              <div className="space-y-4">
                {education.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-gray-700">{item.institution}, {item.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
