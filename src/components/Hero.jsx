import CurvyTextAnimation from './CurvyTextAnimation';

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative bg-white cursor-default">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
          Hi, I'm <span className="text-[var(--amethyst)] font-bold">Aritro Saha</span>.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl text-gray-700">
          A <span className="font-semibold">versatile</span> <span className="font-semibold">full-stack developer</span> and <span className="font-semibold">data science engineer</span> focused on creating <span className="font-semibold">unique</span> and <span className="bg-[var(--chrysler-blue)] text-[var(--honeydew)] font-bold px-1 rounded">user-centric products</span>, currently interning at <span className="font-semibold">Bajaj Finserv</span>.
        </p>
      </div>
      <CurvyTextAnimation />
    </section>
  );
}
