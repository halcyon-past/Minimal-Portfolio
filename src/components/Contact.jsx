export default function Contact() {
  return (
    <section id="contact" className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-medium mb-8 text-center text-gray-900">
          Get <span className="text-[var(--amethyst)] font-medium">In Touch</span>
        </h2>
        <p className="text-lg text-center mb-8 text-gray-700">
          I'm always open to discussing <span className="font-medium">new projects</span>,{' '}
          <span className="font-medium">creative ideas</span>, or{' '}
          <span className="font-medium">opportunities</span> to be part of your vision.
        </p>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
          <a
            href="mailto:aritrosaha2025@gmail.com"
            className="text-center text-[var(--chrysler-blue)] hover:text-[var(--amethyst)] font-medium"
          >
            Email
          </a>
          <a
            href="https://linkedin.com/in/aritro-saha"
            className="text-center text-[var(--amethyst)] hover:text-[var(--chrysler-blue)] font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/halcyon-past"
            className="text-center text-[var(--celadon)] hover:text-[var(--amethyst)] font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}
