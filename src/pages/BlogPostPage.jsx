import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, Share2, User } from 'lucide-react';
import Seo from '../components/common/Seo';
import NotFoundPage from './NotFoundPage';
import BlogContentRenderer from '../components/common/BlogContentRenderer';
import { blogPosts } from '../data/blogData';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": `https://www.aritro.cloud${post.coverImage}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "url": "https://www.aritro.cloud/#person"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Aritro Saha Portfolio",
      "url": "https://www.aritro.cloud/"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.aritro.cloud/blog/${post.slug}`
    }
  };

  return (
    <>
      <Seo 
        title={post.seoTitle || `${post.title} | Engineering Blog`}
        url={`/blog/${post.slug}`}
        description={post.excerpt}
        image={`https://www.aritro.cloud${post.coverImage}`}
        schema={articleSchema}
      />

      <article className="container mx-auto px-4 md:px-8 py-12 md:py-20 min-h-[85vh] font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link to="/" className="hover:text-(--amethyst) transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-(--amethyst) transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-800 dark:text-gray-200 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header */}
          <header className="mb-10">
            <div className="inline-block px-3 py-1 rounded-full bg-(--amethyst)/10 text-(--chrysler-blue) dark:text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-(--amethyst)/20">
              {post.category}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{post.author.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {post.readingTime}
                </span>
              </div>
            </div>
          </header>

          {/* Cover Hero Image */}
          <div className="rounded-2xl overflow-hidden mb-12 shadow-lg border border-gray-200/50 dark:border-gray-800/50">
            <img
              src={post.coverImage}
              alt={post.coverAlt || post.title}
              className="w-full h-auto max-h-[420px] object-cover"
              loading="eager"
            />
          </div>

          {/* Article Content Sections */}
          <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed text-base md:text-lg space-y-8">
            {post.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight pt-4">
                  {section.heading}
                </h2>
                <BlogContentRenderer content={section.content} />
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-500 mr-2 flex items-center gap-1">
              <Tag size={14} /> Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Card Footer */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-(--amethyst)"
            />
            <div className="grow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                Written by {post.author.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Software Engineer 1 at Bristol Myers Squibb. Specializes in enterprise data pipelines, distributed systems, Apple Silicon engineering, and high-performance web applications.
              </p>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-xs font-semibold text-(--amethyst)">
                <Link to="/about" className="hover:underline">About Aritro</Link>
                <Link to="/resume" className="hover:underline">Resume &amp; Experience</Link>
                <a href="https://github.com/halcyon-past" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              </div>
            </div>
          </div>

          {/* Navigation Back */}
          <div className="mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={16} /> Back to all articles
            </Link>
          </div>
        </motion.div>
      </article>
    </>
  );
}
