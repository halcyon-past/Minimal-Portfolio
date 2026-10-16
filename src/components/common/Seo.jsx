import { Helmet } from 'react-helmet-async';
import profileImg from '../../assets/profile.webp';
import { projects } from '../../data/data';

export default function Seo({ title, description, url = '/', image = 'https://www.aritro.cloud/banner-social.jpg', type = 'website', noindex = false }) {
  const fullTitle = title === 'Home' || !title 
    ? 'Aritro Saha | Software Engineer & Data Analytics | BMS | Arcade' 
    : `${title} | Aritro Saha - Software Engineer Portfolio`;
  const defaultDescription = "Portfolio of Aritro Saha, a Software Engineer 1 at Bristol Myers Squibb specializing in full-stack web dev, AI, macOS tools, and data analytics.";
  const finalDescription = description || defaultDescription;
  const keywords = "Aritro, Aritro Saha, Aritro BMS, Aritro Software Engineer, Aritro Software Engineer 1, Software Engineer 1, Aritro Developer, Aritro Games, Aritro Arcade, Byakugan Scan, OpenWorld Portfolio, Quarantine Python, Structurify, Software Developer, Portfolio, Full-Stack, React, Node.js, Python, Swift, Databricks, AI, Machine Learning, Bristol Myers Squibb";

  const canonicalUrl = url.startsWith('http') ? url : `https://www.aritro.cloud${url.startsWith('/') ? url : `/${url}`}`;

  // JSON-LD structured data for rich search results & LLM Knowledge Graphs
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.aritro.cloud/#person",
        "name": "Aritro Saha",
        "alternateName": ["Aritro", "Megh", "halcyon-past"],
        "url": "https://www.aritro.cloud/",
        "image": `https://www.aritro.cloud${profileImg}`,
        "jobTitle": "Software Engineer 1",
        "description": "Software Engineer 1 at Bristol Myers Squibb building high-throughput data pipelines, cloud infrastructure, native macOS utilities, and interactive web applications.",
        "worksFor": {
          "@type": "Organization",
          "name": "Bristol Myers Squibb",
          "alternateName": "BMS",
          "url": "https://www.bms.com/"
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Vellore Institute of Technology, Chennai",
          "alternateName": "VIT Chennai"
        },
        "award": "Winner of Hack4Bengal 3.0 (Eastern India's Largest Hackathon)",
        "knowsAbout": [
          "Software Engineering",
          "Data Science Engineering",
          "Full-Stack Web Development",
          "Python",
          "TypeScript",
          "Swift",
          "React",
          "Next.js",
          "Databricks",
          "Google Cloud Platform",
          "macOS Development",
          "Apple Vision Framework",
          "Artificial Intelligence"
        ],
        "sameAs": [
          "https://www.wikidata.org/wiki/Q141715213",
          "https://www.wikidata.org/entity/Q141715213",
          "https://orcid.org/0009-0007-0861-3978",
          "https://linkedin.com/in/aritro-saha",
          "https://github.com/halcyon-past",
          "https://news.ycombinator.com/user?id=halcyon-past",
          "https://dev.to/halcyonpast",
          "https://pypi.org/project/quarantine-py/",
          "https://leetcode.com/u/AritroSaha/",
          "https://www.youtube.com/@veripyed",
          "https://instagram.com/halcyon-past",
          "https://siliconsync.aritro.cloud/",
          "https://openworld.aritro.cloud/",
          "https://byakugan-scan.aritro.cloud/",
          "https://quarantine-py.aritro.cloud/",
          "https://structurify.aritro.cloud/",
          "https://onepiece.aritro.cloud/",
          "https://ijirt.org/article?manuscript=180711"
        ]
      },
      {
        "@type": "ProfilePage",
        "@id": "https://www.aritro.cloud/#profilepage",
        "url": "https://www.aritro.cloud/",
        "name": "Aritro Saha — Software Engineer 1 Portfolio",
        "mainEntity": {
          "@id": "https://www.aritro.cloud/#person"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.aritro.cloud/#website",
        "name": "Aritro Saha Portfolio",
        "url": "https://www.aritro.cloud/",
        "publisher": {
          "@id": "https://www.aritro.cloud/#person"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://www.aritro.cloud/#projects",
        "name": "Software Engineering Projects by Aritro Saha",
        "itemListElement": projects.map((proj, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "SoftwareSourceCode",
            "name": proj.title,
            "description": proj.details?.overview || proj.description,
            "url": `https://www.aritro.cloud${proj.link}`,
            "codeRepository": proj.github,
            "programmingLanguage": proj.details?.techStack || [],
            "author": {
              "@id": "https://www.aritro.cloud/#person"
            }
          }
        }))
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
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" type="text/plain" href="https://www.aritro.cloud/llms.txt" title="LLM Context Summary" />
      <link rel="alternate" type="text/plain" href="https://www.aritro.cloud/llms-full.txt" title="LLM Full Context" />
      <link rel="alternate" type="text/plain" href="https://www.aritro.cloud/ai.txt" title="AI Scraper Policy & Identity" />

      {/* Bidirectional Identity Verification (rel="me") */}
      <link rel="me" href="https://www.wikidata.org/wiki/Q141715213" />
      <link rel="me" href="https://orcid.org/0009-0007-0861-3978" />
      <link rel="me" href="https://github.com/halcyon-past" />
      <link rel="me" href="https://news.ycombinator.com/user?id=halcyon-past" />
      <link rel="me" href="https://dev.to/halcyonpast" />
      <link rel="me" href="https://linkedin.com/in/aritro-saha" />
      <link rel="me" href="https://pypi.org/project/quarantine-py/" />
      <link rel="me" href="https://www.youtube.com/@veripyed" />
      <link rel="me" href="https://leetcode.com/u/AritroSaha/" />
      <link rel="me" href="https://instagram.com/halcyon-past" />
      <link rel="me" href="https://siliconsync.aritro.cloud/" />
      <link rel="me" href="https://openworld.aritro.cloud/" />
      <link rel="me" href="https://byakugan-scan.aritro.cloud/" />
      <link rel="me" href="https://quarantine-py.aritro.cloud/" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
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