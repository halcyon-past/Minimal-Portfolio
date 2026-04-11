import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Layers, Target, Code2, BookOpen } from 'lucide-react';
import { projects } from '../data/data';
import PageTransition from '../components/common/PageTransition';
import Seo from '../components/common/Seo';
import NotFoundPage from './NotFoundPage';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  
  // Directly pull project out on render - it's synchronous!
  const project = projects?.find(
    (p) => p.id === id || p.link === `/projects/${id}`
  ) || 'not-found';

  // Debugging view
  if (project === 'not-found') {
    return <NotFoundPage />;
  }

  return (
    <PageTransition>
      <Seo 
        title={`${project.title} | Projects`} 
        description={project.details?.overview || project.description}
        image={project.image}
      />
      
      <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-16 mt-16 md:mt-24 transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[var(--text-color)] dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 ${project.color} bg-clip-text`}>
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light mb-6">
                {project.description}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-900 border border-transparent dark:bg-white text-white dark:text-gray-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium"
                >
                  <i className="fab fa-github text-xl mr-2"></i>
                  View Source
                </a>
              )}
              {project.details?.liveDemo && (
                <a 
                  href={project.details.liveDemo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-transparent border-2 border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white text-[var(--text-color)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Live Demo
                </a>
              )}
              {project.details?.researchPaper && (
                <a 
                  href={project.details.researchPaper} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-medium"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Research Paper
                </a>
              )}
            </motion.div>
          </div>

          {/* Project Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
            className="lg:col-span-7"
          >
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl dark:shadow-none border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 aspect-video">
              <img 
                src={project.image} 
                alt={project.alt} 
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 dark:border-gray-800 pt-16">
          {/* Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Target className={`w-6 h-6 ${project.color.replace('text-', '')}`} />
              </div>
              <h2 className="text-3xl font-bold">Overview</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {project.details?.overview}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 h-fit"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Code2 className={`w-6 h-6 ${project.color.replace('text-', '')}`} />
              <h3 className="text-xl font-bold">Tech Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(project.details?.techStack || []).map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 text-sm rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 mt-8 border-t border-gray-200 dark:border-gray-800 pt-16"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Layers className={`w-6 h-6 ${project.color.replace('text-', '')}`} />
              </div>
              <h2 className="text-3xl font-bold">Key Features</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(project.details?.features || []).map((feature, index) => {
                const [title, ...descParts] = feature.includes(':') ? feature.split(':') : [feature, ''];
                const description = descParts.join(':').trim();
                
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-[var(--chrysler-blue)] transition-colors">
                      {description ? title : feature}
                    </h3>
                    {description && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {description}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetailsPage;