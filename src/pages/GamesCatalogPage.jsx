import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MousePointerClick, Gamepad2 } from 'lucide-react';
import { GAMES } from '../data/data';

export default function GamesCatalogPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 min-h-[85vh] font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
            The <span className="text-[var(--amethyst)]">Arcade</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 dark:text-gray-500 max-w-2xl mx-auto md:mx-0">
            A small collection of minimalist, developer-themed games built into the portfolio. Take a break and challenge yourself!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {GAMES.map((game, index) => {
            const isAvailable = game.status === 'Available';
            
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {isAvailable ? (
                  <Link 
                    to={game.path}
                    className="block h-full"
                  >
                    <GameCard game={game} isAvailable={isAvailable} />
                  </Link>
                ) : (
                  <div className="h-full cursor-not-allowed">
                    <GameCard game={game} isAvailable={isAvailable} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function GameCard({ game, isAvailable }) {
  return (
    <div className={`relative h-full flex flex-col bg-white rounded-2xl border ${isAvailable ? 'border-[var(--amethyst)]/20 hover:border-[var(--amethyst)] hover:shadow-xl hover:shadow-[var(--amethyst)]/10' : 'border-gray-200 opacity-70'} shadow-sm transition-all duration-300 overflow-hidden group p-6 md:p-8`}>
      
      {/* Top right status badge */}
      <div className="absolute top-4 right-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isAvailable ? 'bg-[var(--honeydew)] text-[var(--chrysler-blue)]' : 'bg-gray-100 text-gray-500'}`}>
          {game.status}
        </span>
      </div>

      {/* Icon Area */}
      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-6 mt-2 transition-transform duration-500 ${isAvailable ? 'bg-[var(--honeydew)] group-hover:scale-110 group-hover:rotate-3' : 'bg-gray-50'}`}>
        {game.icon}
      </div>

      {/* Text Area */}
      <div className="flex-grow">
        <h3 className={`text-2xl font-bold mb-3 ${isAvailable ? 'text-gray-900 group-hover:text-[var(--amethyst)] transition-colors' : 'text-gray-500'}`}>
          {game.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 dark:text-gray-500 leading-relaxed mb-6">
          {game.description}
        </p>
      </div>

      {/* Bottom Area */}
      {isAvailable && (
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[var(--chrysler-blue)] font-medium">
          <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
            Play Game <MousePointerClick className="w-4 h-4" />
          </span>
          <span className="w-8 h-8 rounded-full bg-[var(--amethyst)]/10 flex items-center justify-center group-hover:bg-[var(--amethyst)] group-hover:text-white transition-colors">
            <Gamepad2 className="w-4 h-4" />
          </span>
        </div>
      )}
    </div>
  );
}