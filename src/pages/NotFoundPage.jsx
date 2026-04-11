import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EndlessRunner from '../components/EndlessRunner';

const NotFoundPage = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-(--bg-color) text-(--text-color) px-4">
      <AnimatePresence mode="wait">
        {!showGame ? (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 
              onClick={() => setShowGame(true)}
              className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-(--chrysler-blue) to-(--amethyst) mb-4 cursor-pointer hover:scale-105 transition-transform"
              title="Click me for a surprise!"
            >
              404
            </h1>
            <p className="text-sm opacity-50 mb-4 animate-bounce">
              click on the number for a surprise
            </p>
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
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold text-(--chrysler-blue) mb-4">404 Runner</h2>
            <EndlessRunner />
            <button
              onClick={() => setShowGame(false)}
              className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-(--chrysler-blue) text-(--text-color) hover:bg-(--chrysler-blue) hover:text-white transition-all font-medium"
            >
              Exit Game
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotFoundPage;