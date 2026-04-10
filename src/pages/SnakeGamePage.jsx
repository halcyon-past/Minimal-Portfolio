import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RefreshCw, Play, Trophy, Gamepad2 } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const ICONS = ['⚛️', '🚀', '💻', '💡', '🔥'];
const AI_ICON = '🤖';

const generateFood = (snake) => {
  let newFood;
  while (true) {
    const isAi = Math.random() > 0.95; // 5% chance for AI icon
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      icon: isAi ? AI_ICON : ICONS[Math.floor(Math.random() * ICONS.length)],
      type: isAi ? 'ai' : 'normal'
    };
    // eslint-disable-next-line no-loop-func
    const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    if (!onSnake) break;
  }
  return newFood;
};

export default function SnakeGamePage() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 0, y: -1 }); // UP
  const [food, setFood] = useState(() => generateFood([{ x: 10, y: 10 }]));
  const [status, setStatus] = useState('waiting'); // waiting, playing, dying, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighscore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
  });
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  // Ref to hold the current state correctly across intervals without StrictMode double-invocation bugs
  const snakeRef = useRef(snake);
  const dirRef = useRef(direction);
  const foodRef = useRef(food);
  const scoreRef = useRef(score);

  const handleShare = async () => {
    const text = `🐍 I scored ${score} points in the Minimalist Snake developer game! Can you beat my high score of ${highScore}?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Minimalist Snake', text: text + '\n\n' + window.location.href });
      } catch (e) {
        console.error('Share failed', e);
      }
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href);
      alert('Score copied to clipboard!');
    }
  };

  const startGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    snakeRef.current = initialSnake;
    setDirection({ x: 0, y: -1 });
    dirRef.current = { x: 0, y: -1 };
    setScore(0);
    scoreRef.current = 0;
    setSpeed(INITIAL_SPEED);
    const newFood = generateFood(initialSnake);
    setFood(newFood);
    foodRef.current = newFood;
    setStatus('playing');
  };

  const changeDirection = useCallback((newDir) => {
    if (status !== 'playing') return;
    // prevent 180-degree turns
    if (newDir.x !== 0 && dirRef.current.x === -newDir.x) return;
    if (newDir.y !== 0 && dirRef.current.y === -newDir.y) return;
    
    setDirection(newDir);
    dirRef.current = newDir;
  }, [status]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default scrolling for arrow keys so the page doesn't move
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch(e.key) {
        case 'ArrowUp': case 'w': changeDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': case 's': changeDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': case 'a': changeDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': case 'd': changeDirection({ x: 1, y: 0 }); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection]);

  useEffect(() => {
    if (status !== 'playing') return;

    const moveSnake = () => {
      const prevSnake = snakeRef.current;
      const head = { ...prevSnake[0] };
      head.x += dirRef.current.x;
      head.y += dirRef.current.y;

      // Check walls (Wrap around logic disabled - hitting wall ends game)
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setStatus('dying');
        setTimeout(() => setStatus('gameover'), 1000);
        if (scoreRef.current > highScore) {
          setHighscore(scoreRef.current);
          localStorage.setItem('snakeHighScore', scoreRef.current.toString());
        }
        return;
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setStatus('dying');
        setTimeout(() => setStatus('gameover'), 1000);
        if (scoreRef.current > highScore) {
          setHighscore(scoreRef.current);
          localStorage.setItem('snakeHighScore', scoreRef.current.toString());
        }
        return;
      }

      const newSnake = [head, ...prevSnake];

      // Check food
      const currentFood = foodRef.current;
      if (head.x === currentFood.x && head.y === currentFood.y) {
        if (currentFood.type === 'ai') {
          scoreRef.current += 5;
          // Double the size smoothly by adding multiple copies of the current tail
          const tail = prevSnake[prevSnake.length - 1] || head;
          for (let i = 0; i < prevSnake.length; i++) {
            newSnake.push({ ...tail });
          }
        } else {
          scoreRef.current += 1;
        }
        
        setScore(scoreRef.current);
        const nextFood = generateFood(newSnake);
        foodRef.current = nextFood;
        setFood(nextFood);
        setSpeed(s => Math.max(s * 0.95, 60)); // Increase speed gradually
      } else {
        newSnake.pop(); // Remove tail
      }

      snakeRef.current = newSnake;
      setSnake(newSnake);
    };

    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [status, speed, highScore]);

  // Touch swipe support
  const touchStartRef = useRef(null);
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };
  
  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 30) changeDirection({ x: dx > 0 ? 1 : -1, y: 0 });
    } else {
      if (Math.abs(dy) > 30) changeDirection({ x: 0, y: dy > 0 ? 1 : -1 });
    }
    touchStartRef.current = null;
  };

  return (
    <div className="relative max-w-2xl mx-auto px-4 py-8 md:py-12 min-h-[85vh] flex flex-col justify-start items-center font-sans">
      <div className="w-full flex justify-start mb-4 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/play" className="text-gray-500 dark:text-gray-400 hover:text-[#ffbd2e] flex items-center gap-2 transition-colors text-sm md:text-base font-medium bg-white dark:bg-gray-950 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md">
            <i className="fas fa-arrow-left"></i> Back to Arcade
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="w-full bg-white dark:bg-gray-950 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Python <span className="text-[#ffbd2e]">Snake</span></h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Consume Tech and avoid hitting the walls! Robot gives bonus points</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Score: <span className="text-lg text-[#ffbd2e]">{score}</span></div>
            <div className="text-xs text-gray-400 dark:text-gray-500">Best: {highScore}</div>
          </div>
        </div>

        <div 
          className="relative w-full max-w-[450px] mx-auto aspect-square bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {status === 'waiting' && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <Gamepad2 className="w-16 h-16 text-[#ffbd2e] mb-4" />
              <button onClick={startGame} className="flex items-center gap-2 px-6 py-3 bg-[#ffbd2e] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all">
                <Play className="w-5 h-5" /> Start Game
              </button>
              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Swipe or use arrow keys</p>
            </div>
          )}

          {status === 'dying' && (
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                <Trophy className="w-20 h-20 text-red-500 mb-4 drop-shadow-md" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 drop-shadow-sm">Game Over!</h2>
            </div>
          )}

          {status === 'gameover' && (
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Game Over!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">You scored {score} points.</p>
              <div className="flex gap-3">
                <button onClick={startGame} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-full hover:shadow-lg transition-all">
                  <RefreshCw className="w-4 h-4" /> Play Again
                </button>
                <button onClick={handleShare} className="flex items-center gap-2 px-5 py-2.5 bg-[#ffbd2e] text-white dark:text-gray-900 font-semibold rounded-full hover:shadow-lg transition-all">
                  Share Score
                </button>
              </div>
            </div>
          )}

          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isSnake = snake.some(s => s.x === x && s.y === y);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div key={i} className="w-full h-full flex items-center justify-center">
                  {isFood && <span className="text-sm md:text-base leading-none select-none">{food.icon}</span>}
                  {isSnake && (
                    <div className={`w-full h-full ${isHead ? 'bg-[#ffbd2e] rounded-sm scale-90' : 'bg-gray-800 dark:bg-gray-400 scale-75 rounded-sm'} transition-all duration-75`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden relative w-48 h-48 mx-auto mt-6 bg-gray-100 dark:bg-gray-800 rounded-full shadow-inner border border-gray-200 dark:border-gray-800">
          <button 
            className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-14 bg-white dark:bg-gray-950 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-900 active:scale-90 active:bg-gray-200 dark:active:bg-gray-700 transition-all flex items-center justify-center text-gray-700 dark:text-gray-300" 
            onClick={() => changeDirection({ x: 0, y: -1 })}
          >
            <i className="fas fa-chevron-up text-xl"></i>
          </button>
          
          <button 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-14 bg-white dark:bg-gray-950 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-900 active:scale-90 active:bg-gray-200 dark:active:bg-gray-700 transition-all flex items-center justify-center text-gray-700 dark:text-gray-300" 
            onClick={() => changeDirection({ x: 0, y: 1 })}
          >
            <i className="fas fa-chevron-down text-xl"></i>
          </button>
          
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-gray-950 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-900 active:scale-90 active:bg-gray-200 dark:active:bg-gray-700 transition-all flex items-center justify-center text-gray-700 dark:text-gray-300" 
            onClick={() => changeDirection({ x: -1, y: 0 })}
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-gray-950 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-900 active:scale-90 active:bg-gray-200 dark:active:bg-gray-700 transition-all flex items-center justify-center text-gray-700 dark:text-gray-300" 
            onClick={() => changeDirection({ x: 1, y: 0 })}
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </button>

          {/* Center Joystick indent / Score */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-200/80 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] pointer-events-none flex items-center justify-center">
            <span className="text-xl font-bold text-gray-700 dark:text-gray-300">{score}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}