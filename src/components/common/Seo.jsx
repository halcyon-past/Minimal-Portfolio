import { Helmet } from 'react-helmet-async';
import { projects } from '../../data/data';
import { SITE_URL, CONTACT_EMAIL, AUTHOR } from '../../lib/siteConfig';

export default function Seo({ 
  title, 
  description, 
  aiSummary,
  url = '/', 
  image = 'https://www.aritro.cloud/banner-social.jpg', 
  type = 'website', 
  noindex = false 
}) {
  const fullTitle = title === 'Home' || !title 
    ? 'Aritro Saha | Software Engineer & Data Analytics | BMS | Arcade' 
    : `${title} | Aritro Saha - Software Engineer Portfolio`;
  const defaultDescription = "Portfolio of Aritro Saha, a Software Engineer 1 at Bristol Myers Squibb specializing in full-stack web dev, AI, macOS tools, and data analytics.";
  const finalDescription = description || defaultDescription;
  const finalAiSummary = aiSummary || finalDescription;
  const keywords = "Aritro, Aritro Saha, Aritro BMS, Aritro Software Engineer, Aritro Software Engineer 1, Software Engineer 1, Aritro Developer, Aritro Games, Aritro Arcade, Byakugan Scan, SutraKey, OpenWorld Portfolio, Quarantine Python, Structurify, Software Developer, Portfolio, Full-Stack, React, Node.js, Python, Swift, Databricks, AI, Machine Learning, Bristol Myers Squibb";

  const canonicalUrl = url.startsWith('http') ? url : `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
  const fullImage = image?.startsWith('http') ? image : `${SITE_URL}${image?.startsWith('/') ? image : `/${image}`}`;
  
  // Calculate markdown URL for alternate link tag
  let cleanPath = url.split('?')[0].replace(/\/$/, '');
  if (!cleanPath || cleanPath === '') cleanPath = '/index';
  if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
  const markdownUrl = `${SITE_URL}${cleanPath}.md`;

  // Dynamic breadcrumb & route-specific schema generation
  const extraNodes = [];
  const normalizedPath = url.split('?')[0].replace(/\/$/, '') || '/';

  if (normalizedPath !== '/' && normalizedPath !== '') {
    const breadcrumbItems = [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` }
    ];

    if (normalizedPath.startsWith('/projects/')) {
      breadcrumbItems.push(
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": `${SITE_URL}/#projects` },
        { "@type": "ListItem", "position": 3, "name": title?.replace(/\s*\|.*$/, '') || 'Project', "item": canonicalUrl }
      );
    } else if (normalizedPath.startsWith('/play/')) {
      breadcrumbItems.push(
        { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` },
        { "@type": "ListItem", "position": 3, "name": title?.replace(/\s*\|.*$/, '') || 'Game', "item": canonicalUrl }
      );
      extraNodes.push({
        "@type": ["VideoGame", "WebApplication"],
        "@id": `${canonicalUrl}#game`,
        "name": title?.replace(/\s*\|.*$/, '') || 'Developer Game',
        "description": finalDescription,
        "gamePlatform": "Web Browser",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Any modern web browser",
        "playMode": "SinglePlayer",
        "author": { "@id": `${SITE_URL}/#person` }
      });
    } else if (normalizedPath === '/play') {
      breadcrumbItems.push(
        { "@type": "ListItem", "position": 2, "name": "Arcade", "item": `${SITE_URL}/play` }
      );
    } else if (normalizedPath === '/about') {
      breadcrumbItems.push(
        { "@type": "ListItem", "position": 2, "name": "About", "item": `${SITE_URL}/about` }
      );
    } else if (normalizedPath === '/resume') {
      breadcrumbItems.push(
        { "@type": "ListItem", "position": 2, "name": "Resume", "item": `${SITE_URL}/resume` }
      );
    } else if (normalizedPath === '/gallery') {
      breadcrumbItems.push(
        { "@type": "ListItem", "position": 2, "name": "Gallery", "item": `${SITE_URL}/gallery` }
      );
    } else if (normalizedPath === '/aritrosaha') {
      breadcrumbItems.push(
        { "@type": "ListItem", "position": 2, "name": "Verified Dossier", "item": `${SITE_URL}/aritrosaha` }
      );
    }

    if (breadcrumbItems.length > 1) {
      extraNodes.push({
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": breadcrumbItems
      });
    }
  }

  // JSON-LD structured data for rich search results & LLM Knowledge Graphs
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": AUTHOR.name,
        "alternateName": AUTHOR.alternateName,
        "url": `${SITE_URL}/`,
        "image": `${SITE_URL}/aritro-saha.webp`,
        "jobTitle": AUTHOR.jobTitle,
        "description": AUTHOR.description,
        "disambiguatingDescription": AUTHOR.disambiguatingDescription,
        "worksFor": {
          "@type": "Organization",
          "name": AUTHOR.worksFor.name,
          "alternateName": AUTHOR.worksFor.alternateName,
          "url": AUTHOR.worksFor.url
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": AUTHOR.alumniOf.name,
          "alternateName": AUTHOR.alumniOf.alternateName
        },
        "award": AUTHOR.award,
        "creator": [
          {
            "@type": "SoftwareApplication",
            "name": "Byakugan Scan",
            "url": "https://byakugan-scan.aritro.cloud"
          },
          {
            "@type": "SoftwareApplication",
            "name": "SutraKey",
            "url": "https://sutrakey.aritro.cloud"
          },
          {
            "@type": "SoftwareSourceCode",
            "name": "Quarantine Python",
            "url": "https://pypi.org/project/quarantine-py/"
          },
          {
            "@type": "WebApplication",
            "name": "SiliconSync",
            "description": "Real-time AI-generated technology news intelligence engine and aggregator",
            "url": "https://siliconsync.aritro.cloud/"
          }
        ],
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
          "https://scholar.google.com/citations?user=oMN6u4UAAAAJ",
          "https://www.wikidata.org/wiki/Q141715213",
          "https://www.wikidata.org/entity/Q141715213",
          "https://orcid.org/0009-0007-0861-3978",
          "https://linkedin.com/in/aritro-saha",
          "https://github.com/halcyon-past",
          "https://github.com/halcyon-past/aritrosaha",
          "https://news.ycombinator.com/user?id=halcyon-past",
          "https://dev.to/halcyonpast",
          "https://pypi.org/project/quarantine-py/",
          "https://leetcode.com/u/AritroSaha/",
          "https://www.youtube.com/@veripyed",
          "https://instagram.com/halcyon-past",
          "https://siliconsync.aritro.cloud/",
          "https://openworld.aritro.cloud/",
          "https://byakugan-scan.aritro.cloud/",
          "https://sutrakey.aritro.cloud/",
          "https://alternativeto.net/software/byakugan-scan/about/",
          "https://alternativeto.net/software/sutrakey/about/",
          "https://www.producthunt.com/@halcyon_past",
          "https://www.producthunt.com/products/byakugan-scan",
          "https://www.producthunt.com/products/sutrakey",
          "https://quarantine-py.aritro.cloud/",
          "https://structurify.aritro.cloud/",
          "https://onepiece.aritro.cloud/",
          "https://ijirt.org/article?manuscript=180711"
        ]
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "Aritro Saha Portfolio",
        "url": `${SITE_URL}/`,
        "logo": `${SITE_URL}/logo.webp`,
        "sameAs": [
          "https://github.com/halcyon-past",
          "https://github.com/halcyon-past/aritrosaha",
          "https://linkedin.com/in/aritro-saha",
          "https://www.wikidata.org/wiki/Q141715213"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "email": CONTACT_EMAIL,
          "contactType": "developer"
        }
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        "url": `${SITE_URL}/`,
        "name": "Aritro Saha — Software Engineer 1 Portfolio",
        "mainEntity": {
          "@id": `${SITE_URL}/#person`
        }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": "Aritro Saha Portfolio",
        "url": `${SITE_URL}/`,
        "publisher": {
          "@id": `${SITE_URL}/#person`
        }
      },
      {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#author-image`,
        "url": `${SITE_URL}/aritro-saha.webp`,
        "contentUrl": `${SITE_URL}/aritro-saha.webp`,
        "name": "Aritro Saha Headshot",
        "caption": "Aritro Saha — Software Engineer 1 at Bristol Myers Squibb & Open-Source Creator",
        "width": 400,
        "height": 400
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects`,
        "name": "Software Engineering Projects by Aritro Saha",
        "itemListElement": projects.map((proj, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "SoftwareSourceCode",
            "name": proj.title,
            "description": proj.details?.overview || proj.description,
            "url": `${SITE_URL}${proj.link}`,
            "codeRepository": proj.github,
            "programmingLanguage": proj.details?.techStack || [],
            "author": {
              "@id": `${SITE_URL}/#person`
            }
          }
        }))
      },
      ...extraNodes
    ]
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Aritro Saha" />
      <meta name="ai-summary" content={finalAiSummary} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" type="text/markdown" href={markdownUrl} title="Markdown Version" />
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms.txt`} title="LLM Context Summary" />
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/llms-full.txt`} title="LLM Full Context" />
      <link rel="alternate" type="text/plain" href={`${SITE_URL}/ai.txt`} title="AI Scraper Policy & Identity" />
      <link rel="alternate" type="application/rss+xml" href={`${SITE_URL}/feed.xml`} title="Aritro Saha Software Projects & Releases" />

      {/* Bidirectional Identity Verification (rel="me") */}
      <link rel="me" href="https://scholar.google.com/citations?user=oMN6u4UAAAAJ" />
      <link rel="me" href="https://www.wikidata.org/wiki/Q141715213" />
      <link rel="me" href="https://orcid.org/0009-0007-0861-3978" />
      <link rel="me" href="https://github.com/halcyon-past" />
      <link rel="me" href="https://github.com/halcyon-past/aritrosaha" />
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
      <link rel="me" href="https://sutrakey.aritro.cloud/" />
      <link rel="me" href="https://quarantine-py.aritro.cloud/" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
