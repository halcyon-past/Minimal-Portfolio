import { Helmet } from 'react-helmet-async';

export default function Seo({ title, description, url, image = 'https://www.aritro.cloud/logo.png', type = 'website' }) {
  const fullTitle = `${title} | Aritro Saha`;
  const defaultDescription = "Portfolio of Aritro Saha, a Software Developer specializing in full-stack development, data science, and AI. Discover my projects, experience, and skills.";
  const finalDescription = description || defaultDescription;

  // JSON-LD structured data for rich search results (Person and WebSite)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Aritro Saha",
        "url": "https://www.aritro.cloud/",
        "image": "https://www.aritro.cloud/logo.png",
        "jobTitle": "Software Developer",
        "worksFor": {
          "@type": "Organization",
          "name": "Bristol Myers Squibb"
        },
        "sameAs": [
          "https://linkedin.com/in/aritro-saha",
          "https://github.com/halcyon-past",
          "https://leetcode.com/u/AritroSaha/",
        ]
      },
      {
        "@type": "WebSite",
        "name": "Aritro Saha Portfolio",
        "url": "https://www.aritro.cloud/"
      }
    ]
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <link rel="canonical" href={`https://www.aritro.cloud${url}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`https://www.aritro.cloud${url}`} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`https://www.aritro.cloud${url}`} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}