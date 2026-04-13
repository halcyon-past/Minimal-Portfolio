import { Helmet } from 'react-helmet-async';
import profileImg from '../../assets/profile.webp';

export default function Seo({ title, description, url, image = 'https://www.aritro.cloud/banner-social.jpg', type = 'website' }) {
  const fullTitle = `${title} | Aritro Saha`;
  const defaultDescription = "Portfolio of Aritro Saha, a Software Engineer specializing in full-stack web dev, AI, and data analytics. Explore my interactive developer arcade and projects.";
  const finalDescription = description || defaultDescription;
  const keywords = "Aritro, Aritro Saha, Aritro BMS, Aritro Software Engineer, Aritro Developer, Aritro Games, Aritro Arcade, Software Developer, Portfolio, Full-Stack, React, Node.js, Python, Databricks, AI, Machine Learning, Developer Arcade, Snake Game, Data Pipeline Puzzle, Web Development, Data Science, Bristol Myers Squibb";

  // JSON-LD structured data for rich search results (Person and WebSite)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Aritro Saha",
        "alternateName": "Aritro",
        "url": "https://www.aritro.cloud/",
        "image": `https://www.aritro.cloud${profileImg}`,
        "jobTitle": "Software Engineer",
        "worksFor": {
          "@type": "Organization",
          "name": "Bristol Myers Squibb",
          "alternateName": "BMS"
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
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Aritro Saha" />
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