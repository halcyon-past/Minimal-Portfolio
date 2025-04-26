import CurvyTextAnimation from './CurvyTextAnimation';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative bg-white cursor-default">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-medium mb-8 text-gray-900">
          Hi, I'm <span className="text-[var(--amethyst)] font-semibold">Aritro Saha</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-gray-700">
          A <span className="font-medium">versatile</span> <span className="font-medium">full-stack developer</span> and <span className="font-medium">data science engineer</span> focused on creating <span className="font-medium">unique</span> and <span className="bg-[var(--chrysler-blue)] text-[var(--honeydew)] font-medium px-1 rounded">user-centric products</span>, currently interning at <span className="font-medium">Bajaj Finserv</span>.
        </p>
      </div>
      <CurvyTextAnimation />
    </section>
  );
}
