import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RefreshCw, Play, Trophy, Gamepad2 } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const ICONS = ['🍎'];

const generateFood = (snake) => {
  let newFood;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      icon: ICONS[Math.floor(Math.random() * ICONS.length)]
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
  const [status, setStatus] = useState('waiting'); // waiting, playing, gameover
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
    const text = `🐍 I scored ${score} in the Minimalist Snake developer game! Can you beat my high score of ${highScore}?`;
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
      switch(e.key) {
        case 'ArrowUp': case 'w': changeDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': case 's': changeDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': case 'a': changeDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': case 'd': changeDirection({ x: 1, y: 0 }); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
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
        setStatus('gameover');
        if (scoreRef.current > highScore) {
          setHighscore(scoreRef.current);
          localStorage.setItem('snakeHighScore', scoreRef.current.toString());
        }
        return;
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setStatus('gameover');
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
        scoreRef.current += 1;
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
          <Link to="/play" className="text-gray-500 hover:text-[#ffbd2e] flex items-center gap-2 transition-colors text-sm md:text-base font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md">
            <i className="fas fa-arrow-left"></i> Back to Arcade
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="w-full bg-white rounded-xl shadow-xl border border-gray-200 p-4 md:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Python <span className="text-[#ffbd2e]">Snake</span></h1>
            <p className="text-sm text-gray-500">Eat apples and avoid hitting the walls!</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">Score: <span className="text-lg text-[#ffbd2e]">{score}</span></div>
            <div className="text-xs text-gray-400">Best: {highScore}</div>
          </div>
        </div>

        <div 
          className="relative w-full aspect-square bg-gray-50 border-2 border-gray-200 rounded-lg overflow-hidden touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {status === 'waiting' && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <Gamepad2 className="w-16 h-16 text-[#ffbd2e] mb-4" />
              <button onClick={startGame} className="flex items-center gap-2 px-6 py-3 bg-[#ffbd2e] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all">
                <Play className="w-5 h-5" /> Start Game
              </button>
              <p className="mt-4 text-xs text-gray-500">Swipe or use arrow keys</p>
            </div>
          )}

          {status === 'gameover' && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Game Over!</h2>
              <p className="text-gray-600 mb-6">You ate {score} apples.</p>
              <div className="flex gap-3">
                <button onClick={startGame} className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-full hover:shadow-lg transition-all">
                  <RefreshCw className="w-4 h-4" /> Play Again
                </button>
                <button onClick={handleShare} className="flex items-center gap-2 px-5 py-2.5 bg-[#ffbd2e] text-white font-semibold rounded-full hover:shadow-lg transition-all">
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
                    <div className={`w-full h-full ${isHead ? 'bg-[#ffbd2e] rounded-sm scale-90' : 'bg-gray-800 scale-75 rounded-sm'} transition-all duration-75`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden mt-6 grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
          <div />
          <button className="bg-gray-100 p-4 rounded-xl active:bg-gray-200" onClick={() => changeDirection({ x: 0, y: -1 })}><i className="fas fa-chevron-up"></i></button>
          <div />
          <button className="bg-gray-100 p-4 rounded-xl active:bg-gray-200" onClick={() => changeDirection({ x: -1, y: 0 })}><i className="fas fa-chevron-left"></i></button>
          <button className="bg-gray-100 p-4 rounded-xl active:bg-gray-200" onClick={() => changeDirection({ x: 0, y: 1 })}><i className="fas fa-chevron-down"></i></button>
          <button className="bg-gray-100 p-4 rounded-xl active:bg-gray-200" onClick={() => changeDirection({ x: 1, y: 0 })}><i className="fas fa-chevron-right"></i></button>
        </div>
      </motion.div>
    </div>
  );
}