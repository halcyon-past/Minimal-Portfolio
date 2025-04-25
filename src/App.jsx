import { useState, useEffect, useRef } from 'react';
import profileImage from './assets/profile.jpg';
import glideConnectImage from './assets/GlideConnect.jpeg';
import pawsitiveImage from './assets/Pawsitive.png';
import eduHelperImage from './assets/Eduhelper.png';
import logo from '/logo.png';

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const curvedTextRef = useRef(null);

  useEffect(() => {
    if (curvedTextRef.current) {
      let animationId;
      let position = 0;
      const animate = () => {
        position -= 0.1;
        if (position <= -100) {
          position += 100;
        }
        if (curvedTextRef.current) {
          const textPath = curvedTextRef.current.querySelector('textPath');
          if (textPath) {
            textPath.setAttribute('startOffset', `${position}%`);
          }
        }
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
      return () => {
        cancelAnimationFrame(animationId);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <header className="fixed top-0 w-full z-50 border-b border-gray-200/50 bg-white/75 backdrop-blur-md">
        <nav className="container mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
          <a href="#" className="flex items-center">
            <img src={logo} alt="Aritro Saha Logo" className="md:h-14 h-10" />
          </a>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-900">
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#work" className="hover:text-[var(--amethyst)]">Projects</a>
            <a href="#about" className="hover:text-[var(--amethyst)]">About</a>
            <a href="#contact" className="hover:text-[var(--amethyst)]">Contact</a>
          </div>
          {menuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white p-4 shadow-md">
              <div className="flex flex-col space-y-4">
                <a href="#work" className="hover:underline" onClick={() => setMenuOpen(false)}>Projects</a>
                <a href="#about" className="hover:underline" onClick={() => setMenuOpen(false)}>About</a>
                <a href="#contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</a>
              </div>
            </div>
          )}
        </nav>
      </header>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative bg-white  cursor-default">
        <div className="container mx-auto px-4 md:px-8 ">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">Hi, I'm <span className="text-[var(--amethyst)] font-bold">Aritro Saha</span>.</h1>
          <p className="text-lg md:text-xl max-w-3xl text-gray-700">
            A <span className="font-semibold">versatile</span> <span className="font-semibold">full-stack developer</span> and <span className="font-semibold">data science engineer</span> focused on creating <span className="font-semibold">unique</span> and <span className="bg-[var(--chrysler-blue)] text-[var(--honeydew)] font-bold px-1 rounded">user-centric products</span>, currently interning at <span className="font-semibold">Bajaj Finserv</span>.
          </p>
        </div>
        <div className="w-full h-64 mt-12 relative overflow-hidden" ref={curvedTextRef}>
          <svg viewBox="0 0 1000 300" className="w-full h-full">
            <path
              id="curve"
              d="M-400,150 C100,0 400,300 900,150 S1900,0 1400,150"
              fill="transparent"
            />
            <text className="text-8xl md:text-6xl font-bold">
              <textPath xlinkHref="#curve" startOffset="0%">
                <tspan style={{ fill: 'var(--chrysler-blue)' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: 'var(--amethyst)' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: '#6b7280' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: '#9ca3af' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: 'var(--chrysler-blue)' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: 'var(--amethyst)' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: '#6b7280' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: '#9ca3af' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: 'var(--chrysler-blue)' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: 'var(--amethyst)' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: '#6b7280' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: '#9ca3af' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: 'var(--chrysler-blue)' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: 'var(--amethyst)' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: '#6b7280' }} className="font-bold">explore my projects ↓ </tspan>
                <tspan style={{ fill: '#9ca3af' }} className="font-bold">explore my projects ↓ </tspan>
              </textPath>
            </text>
          </svg>
        </div>
      </section>
      <section id="work" className="relative py-8 px-4 md:px-8 bg-white md:-mt-32 z-10">
        <div className="container mx-auto">
          <div className="flex flex-col items-end gap-6 md:w-3/4 ml-auto">
            <div className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition hover:border-gray-300">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img 
                  src={glideConnectImage} 
                  alt="GlideConnect platform interface" 
                  className="w-full rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--chrysler-blue)]">GlideConnect</h3>
              <p className="text-gray-600 mb-4 font-medium">Computer Vision, <span className="font-semibold">Desktop GUI</span></p>
              <a href="https://github.com/halcyon-past/Glide-Connect" className="text-[var(--chrysler-blue)] hover:text-[var(--amethyst)] font-bold" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
            <div className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition hover:border-gray-300">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img 
                  src={pawsitiveImage} 
                  alt="Pawsitive pet adoption app interface" 
                  className="w-full rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--amethyst)]">Pawsitive</h3>
              <p className="text-gray-600 mb-4 font-medium">Web Development, <span className="font-semibold">Pet Healthcare Platform</span></p>
              <a href="https://github.com/halcyon-past/PAW-sitive" className="text-[var(--amethyst)] hover:text-[var(--chrysler-blue)] font-bold" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
            <div className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition hover:border-gray-300">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img 
                  src={eduHelperImage} 
                  alt="EduHelper learning platform interface" 
                  className="w-full rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--celadon)]">EduHelper</h3>
              <p className="text-gray-600 mb-4 font-medium">Streamlit and ML Application, <span className="font-semibold">Learning Platform</span></p>
              <a href="https://github.com/halcyon-past/EDUHELPER" className="text-[var(--celadon)] hover:text-[var(--amethyst)] font-bold" target="_blank" rel="noopener noreferrer">View Project →</a>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="py-16 bg-white px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-12">
            <div className="md:w-1/3 mb-8 md:mb-0 text-center">
              <div className="inline-block p-1 rounded-full bg-gradient-to-br from-[var(--chrysler-blue)] via-[var(--amethyst)] to-[var(--celadon)] mb-4">
                <img 
                  src={profileImage} 
                  alt="Aritro Saha profile picture" 
                  className="w-48 h-48 rounded-full border border-gray-200 object-cover"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">About <span className="text-[var(--amethyst)] font-bold">Me</span></h2>
            </div>
            <div className="md:w-1/2 text-gray-700">
              <p className="mb-4 text-lg">
                I’m a final-year <span className="font-semibold text-[var(--amethyst)]">B.Tech student</span> and a passionate <span className="font-semibold text-[var(--chrysler-blue)]">full stack developer</span> with a strong footing in <span className="font-semibold text-[var(--amethyst)]">data science</span>. Currently interning at <span className="font-semibold">Bajaj Finserv</span> as a <span className="font-semibold text-[var(--tea-green)]">Data Science Intern</span>, I enjoy bridging the gap between backend logic and user-facing design while also exploring the power of data to drive smart decisions.
              </p>
              <p className="mb-4 text-lg">
                I’ve had the privilege of winning <span className="font-semibold text-[var(--chrysler-blue)]">Hack4Bengal 3.0</span>—Eastern India’s largest hackathon—where I led the charge on building impactful tech under pressure. Whether it's crafting <span className="font-semibold text-[var(--amethyst)]">scalable web apps</span> or building <span className="font-semibold text-[var(--tea-green)]">predictive models</span>, I thrive at the intersection of code, creativity, and real-world problem solving.
              </p>
              <p className="mb-4 text-lg">
                When I’m not coding, you’ll find me <span className="font-semibold text-[var(--amethyst)]">beatboxing</span>, <span className="font-semibold text-[var(--chrysler-blue)]">playing football</span>, or chasing my next creative outlet.
              </p>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-[var(--chrysler-blue)]">Experience</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold">Associate Software Developer, Bristol Myers Squibb</h4>
                    <p className="text-gray-700">Joining Soon</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Data Science Intern, Bajaj Finserv Health</h4>
                    <p className="text-gray-700">Feb 2025 - Present</p>
                  </div>
                  <div>
                    <h4 className="font-bold">Full Stack Developer Intern, Wipro</h4>
                    <p className="text-gray-700">Oct 2023 - Dec 2023</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-[var(--chrysler-blue)]">Education</h3>
                <div>
                  <h4 className="font-bold">B.Tech in Electronics and Computer Engineering</h4>
                  <p className="text-gray-700">Vellore Institute of Technology, Chennai, 2025</p>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold">High School</h4>
                  <p className="text-gray-700">Birla Bharati, 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="py-16 px-4 md:px-8 bg-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">Get <span className="text-[var(--amethyst)] font-bold">In Touch</span></h2>
          <p className="text-lg text-center mb-8 text-gray-700">
            I'm always open to discussing <span className="font-semibold">new projects</span>, <span className="font-semibold">creative ideas</span>, or <span className="font-semibold">opportunities</span> to be part of your vision.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="mailto:aritrosaha2025@gmail.com" className="text-center text-[var(--chrysler-blue)] hover:text-[var(--amethyst)] font-bold">
              Email
            </a>
            <a href="https://linkedin.com/in/aritro-saha" className="text-center text-[var(--amethyst)] hover:text-[var(--chrysler-blue)] font-bold" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/halcyon-past" className="text-center text-[var(--celadon)] hover:text-[var(--amethyst)] font-bold" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </div>
        </div>
      </section>
      <footer className="py-8 bg-white px-4 md:px-8 border-t border-gray-200">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 mb-4 md:mb-0">© 2025 <span className="text-[var(--amethyst)] font-bold">Aritro Saha</span>. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="https://linkedin.com/in/aritro-saha" className="text-[var(--amethyst)] hover:text-[var(--chrysler-blue)] font-bold" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://instagram.com/halcyon-past" className="text-[var(--celadon)] hover:text-[var(--amethyst)] font-bold" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://github.com/halcyon-past" className="text-[var(--chrysler-blue)] hover:text-[var(--amethyst)] font-bold" target="_blank" rel="noopener noreferrer">Github</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}