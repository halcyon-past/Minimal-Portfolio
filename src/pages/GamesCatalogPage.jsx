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
            The <span className="text-(--amethyst)">Arcade</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto md:mx-0">
            A small collection of minimalist, developer-themed games built into the portfolio. Take a break and challenge yourself!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
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
    <div className={`relative h-full flex flex-col bg-white dark:bg-[#111111] rounded-xl md:rounded-2xl border ${isAvailable ? 'border-gray-200 dark:border-gray-800 hover:border-(--amethyst)/50 dark:hover:border-(--amethyst)/50 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_30px_-10px_rgba(138,43,226,0.15)] hover:-translate-y-1.5' : 'border-gray-200 dark:border-gray-800 opacity-60'} transition-all duration-500 ease-out overflow-hidden group p-4 md:p-8 z-10`}>
      
      {/* Subtle hover gradient blob overlay */}
      {isAvailable && (
        <div className="absolute -z-10 -inset-px rounded-xl md:rounded-2xl bg-gradient-to-br from-(--amethyst)/0 via-transparent to-(--amethyst)/0 group-hover:from-(--amethyst)/5 dark:group-hover:from-(--amethyst)/10 group-hover:to-transparent transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      )}

      {/* Top right status badge */}
      <div className="absolute top-3 right-3 md:top-5 md:right-5 flex items-center justify-center">
        <span className={`flex items-center gap-1.5 text-[8px] sm:text-xs font-bold uppercase tracking-widest px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-full backdrop-blur-sm border ${isAvailable ? 'bg-(--honeydew)/80 dark:bg-[#1a1a1a]/80 border-(--amethyst)/15 dark:border-gray-800 text-(--chrysler-blue) dark:text-gray-300' : 'bg-gray-50/80 dark:bg-[#1a1a1a]/80 border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-(--amethyst) group-hover:animate-pulse' : 'bg-gray-400 dark:bg-gray-600'}`}></span>
          <span className="hidden sm:inline">{game.status}</span>
          <span className="sm:hidden">{game.status === 'Available' ? 'Ready' : 'Soon'}</span>
        </span>
      </div>

      {/* Icon Area */}
      <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 transition-all duration-500 ease-out ${isAvailable ? 'bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 group-hover:border-(--amethyst)/30 dark:group-hover:border-(--amethyst)/30 group-hover:bg-(--honeydew) dark:group-hover:bg-(--amethyst)/10' : 'bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800'}`}>
        <div className="transform scale-[0.65] md:scale-100 transition-transform duration-500 ease-out group-hover:scale-75 md:group-hover:scale-110 group-hover:-rotate-3 drop-shadow-sm flex justify-center items-center">
          {game.icon}
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-grow z-10">
        <h3 className={`text-base md:text-2xl font-bold mb-1 md:mb-3 ${isAvailable ? 'text-gray-900 dark:text-gray-100 group-hover:text-(--amethyst) dark:group-hover:text-(--amethyst) transition-colors duration-300' : 'text-gray-500 dark:text-gray-500'} line-clamp-1`}>
          {game.title}
        </h3>
        <p className="text-[10px] sm:text-xs md:text-base text-gray-600 dark:text-gray-400 leading-snug md:leading-relaxed mb-3 md:mb-6 line-clamp-3 md:line-clamp-none">
          {game.description}
        </p>
      </div>

      {/* Bottom Area */}
      {isAvailable && (
        <div className="mt-auto pt-3 md:pt-5 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between font-medium z-10 transition-colors duration-300">
          <span className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm md:text-base text-gray-700 dark:text-gray-300 group-hover:text-(--amethyst) dark:group-hover:text-(--amethyst) transition-colors duration-300">
            <span className="hidden sm:inline">Play Game</span>
            <span className="sm:hidden font-bold">Play</span>
            <span className="opacity-0 -translate-x-1 md:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><MousePointerClick className="w-3 h-3 md:w-4 md:h-4" /></span>
          </span>
          <span className="w-6 h-6 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161616] text-gray-500 dark:text-gray-400 flex items-center justify-center group-hover:bg-(--amethyst) group-hover:border-(--amethyst) group-hover:text-white transition-all duration-500 transform group-hover:shadow-[0_0_15px_rgba(138,43,226,0.25)]">
            <Gamepad2 className="w-3 h-3 md:w-5 md:h-5 transform group-hover:scale-110 transition-transform duration-300" />
          </span>
        </div>
      )}
    </div>
  );
}