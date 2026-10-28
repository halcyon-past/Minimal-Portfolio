import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, BookOpen } from 'lucide-react';
import Seo from '../components/common/Seo';
import { blogPosts } from '../data/blogData';

export default function BlogCatalogPage() {
  return (
    <>
      <Seo 
        title="Engineering Blog | Aritro Saha — Systems, Data & Architecture"
        url="/blog"
        description="Technical deep-dives, systems architecture, Apple Silicon OCR engineering, and Python fault-tolerance patterns by Aritro Saha."
      />
      
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 min-h-[85vh] font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-(--amethyst)/10 text-(--chrysler-blue) dark:text-purple-300 text-sm font-medium mb-4 border border-(--amethyst)/20">
              <BookOpen size={16} /> Technical Notes &amp; Architecture
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              Engineering <span className="text-(--amethyst)">Blog</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0">
              Deep-dives into high-throughput data engineering, native macOS systems, fault-tolerant Python architectures, and modern web performance.
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-(--amethyst)/50 dark:hover:border-(--amethyst)/50 hover:shadow-[0_12px_30px_-10px_rgba(138,43,226,0.15)] transition-all duration-300 overflow-hidden"
              >
                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                  {/* Thumbnail / Cover */}
                  <div className="h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-900 relative">
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-medium">
                      {post.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col grow">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {post.readingTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-(--amethyst) transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 grow">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-(--amethyst) mt-auto pt-2">
                      Read article <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
