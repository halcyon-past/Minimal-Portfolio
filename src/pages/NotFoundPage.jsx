import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-(--bg-color) text-(--text-color) px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-(--chrysler-blue) to-(--amethyst) mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-(--text-color) opacity-70 max-w-md mx-auto mb-8">
          Woops!! Seems like you're lost.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-(--chrysler-blue) text-white hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 font-medium"
        >
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;