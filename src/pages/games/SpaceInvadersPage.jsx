import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RefreshCw, Play, Trophy, Rocket, Share2 } from 'lucide-react';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PLAYER_SPEED = 5;
const ALIEN_SPEED = 1;
const LASER_SPEED = 7;
const ALIEN_ROWS = 4;
const ALIEN_COLS = 9;
const ALIEN_SIZE = 22;
const ALIEN_SPACING_X = 35;
const ALIEN_SPACING_Y = 30;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 20;

export default function SpaceInvadersPage() {
  const [status, setStatus] = useState('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('spaceInvadersHighScore') || '0', 10));
  
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const gameState = useRef(null);

  const initGame = () => {
    const aliens = [];
    for (let r = 0; r < ALIEN_ROWS; r++) {
      for (let c = 0; c < ALIEN_COLS; c++) {
        aliens.push({
          x: 40 + c * ALIEN_SPACING_X,
          y: 40 + r * ALIEN_SPACING_Y,
          width: ALIEN_SIZE,
          height: ALIEN_SIZE,
          alive: true,
          type: r % 3 // 0, 1, or 2 for different alien styles
        });
      }
    }
    gameState.current = {
      player: { x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2, y: CANVAS_HEIGHT - 40, width: PLAYER_WIDTH, height: PLAYER_HEIGHT, dx: 0 },
      aliens,
      lasers: [],
      alienLasers: [],
      alienDirection: 1, // 1 for right, -1 for left
      alienSpeed: ALIEN_SPEED,
      keys: {},
      lastShot: 0
    };
  };

  const startGame = () => {
    initGame();
    setScore(0);
    setStatus('playing');
  };

  const handleShare = async () => {
    const currentHighScore = Math.max(score, highScore);
    const text = `🚀 I scored ${score} points in the Space Invaders developer game! Can you beat my high score of ${currentHighScore}?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Space Invaders', text: text + '\n\n' + window.location.href });
      } catch (e) {
        console.error('Share failed', e);
      }
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href);
      alert('Score copied to clipboard!');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }
      
      if (!gameState.current) return;
      gameState.current.keys[e.key] = true;

      // Handle shooting with spacebar
      if (e.key === ' ' && status === 'playing') {
        const now = Date.now();
        if (now - gameState.current.lastShot > 300) {
          gameState.current.lasers.push({
            x: gameState.current.player.x + PLAYER_WIDTH / 2 - 2,
            y: gameState.current.player.y,
            width: 4,
            height: 15
          });
          gameState.current.lastShot = now;
        }
      }
    };

    const handleKeyUp = (e) => {
      if (!gameState.current) return;
      gameState.current.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [status]);

  const update = () => {
    if (status !== 'playing' || !gameState.current) return;
    const state = gameState.current;

    // Player movement
    if (state.keys['ArrowLeft'] || state.keys['a']) {
      state.player.x -= PLAYER_SPEED;
    }
    if (state.keys['ArrowRight'] || state.keys['d']) {
      state.player.x += PLAYER_SPEED;
    }

    // Boundary check player
    if (state.player.x < 0) state.player.x = 0;
    if (state.player.x + state.player.width > CANVAS_WIDTH) state.player.x = CANVAS_WIDTH - state.player.width;

    // Aliens movement
    let hitEdge = false;
    let activeAliens = false;
    
    state.aliens.forEach(alien => {
      if (alien.alive) {
        activeAliens = true;
        alien.x += state.alienSpeed * state.alienDirection;
        if (alien.x <= 0 || alien.x + alien.width >= CANVAS_WIDTH) {
          hitEdge = true;
        }
        
        // Random alien shooting
        // the probability is now evaluated per living alien in each frame update
        if (Math.random() < 0.0005) {
          state.alienLasers.push({
            x: alien.x + alien.width / 2 - 2,
            y: alien.y + alien.height,
            width: 4,
            height: 15
          });
        }
      }
    });

    if (!activeAliens) {
      setStatus('won');
      setScore(s => {
        if (s > highScore) {
          setHighScore(s);
          localStorage.setItem('spaceInvadersHighScore', s.toString());
        }
        return s;
      });
      return;
    }

    if (hitEdge) {
      state.alienDirection *= -1;
      state.alienSpeed += 0.2;
      state.aliens.forEach(alien => {
        if (alien.alive) {
          alien.y += 20;
          if (alien.y + alien.height >= state.player.y) {
            endGame();
          }
        }
      });
    }

    // Player lasers
    for (let i = state.lasers.length - 1; i >= 0; i--) {
      let laser = state.lasers[i];
      laser.y -= LASER_SPEED;
      if (laser.y < 0) {
        state.lasers.splice(i, 1);
        continue;
      }

      // Collision with aliens
      for (let j = 0; j < state.aliens.length; j++) {
        let alien = state.aliens[j];
        if (alien.alive && 
          laser.x < alien.x + alien.width &&
          laser.x + laser.width > alien.x &&
          laser.y < alien.y + alien.height &&
          laser.y + laser.height > alien.y) {
          
          alien.alive = false;
          state.lasers.splice(i, 1);
          setScore(s => s + 10);
          break; // move to next laser
        }
      }
    }

    // Alien lasers
    for (let i = state.alienLasers.length - 1; i >= 0; i--) {
      let alaser = state.alienLasers[i];
      alaser.y += LASER_SPEED / 2;
      if (alaser.y > CANVAS_HEIGHT) {
        state.alienLasers.splice(i, 1);
        continue;
      }

      // Collision with player
      if (alaser.x < state.player.x + state.player.width &&
        alaser.x + alaser.width > state.player.x &&
        alaser.y < state.player.y + state.player.height &&
        alaser.y + alaser.height > state.player.y) {
        endGame();
      }
    }
  };

  const endGame = () => {
    setStatus('gameover');
    setScore(s => {
      if (s > highScore) {
        setHighScore(s);
        localStorage.setItem('spaceInvadersHighScore', s.toString());
      }
      return s;
    });
  };

  const draw = (ctx) => {
    if (!gameState.current) return;
    const state = gameState.current;

    // Clear canvas entirely
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Player Ship (Retro style)
    ctx.fillStyle = '#f43f5e';
    ctx.fillRect(state.player.x, state.player.y + 10, state.player.width, state.player.height - 10); // Base
    ctx.fillRect(state.player.x + state.player.width / 2 - 10, state.player.y + 5, 20, 5); // Mid
    ctx.fillRect(state.player.x + state.player.width / 2 - 2, state.player.y, 4, 5); // Cannon

    // Draw Aliens
    state.aliens.forEach(alien => {
      if (alien.alive) {
        if (alien.type === 0) ctx.fillStyle = '#3b82f6';
        else if (alien.type === 1) ctx.fillStyle = '#22c55e';
        else ctx.fillStyle = '#eab308';
        
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
      }
    });

    // Draw Player Lasers
    ctx.fillStyle = '#f43f5e';
    state.lasers.forEach(laser => {
      ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
    });

    // Draw Alien Lasers
    ctx.fillStyle = '#ffffff';
    state.alienLasers.forEach(laser => {
      ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
    });
  };

  const loop = () => {
    if (status === 'playing') {
      update();
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      draw(ctx);
    }
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (status === 'playing' || status === 'waiting') {
      if (status === 'waiting' && !gameState.current) {
        initGame();
        // Initial draw
        if (canvasRef.current) {
          draw(canvasRef.current.getContext('2d'));
        }
      }
      requestRef.current = requestAnimationFrame(loop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [status]);

  // Touch controls for mobile
  const handleTouchMove = (e, direction) => {
    e.preventDefault();
    if (!gameState.current) return;
    if (direction === 'left') {
      gameState.current.keys['ArrowLeft'] = true;
      gameState.current.keys['ArrowRight'] = false;
    } else if (direction === 'right') {
      gameState.current.keys['ArrowRight'] = true;
      gameState.current.keys['ArrowLeft'] = false;
    } else if (direction === 'stop') {
      gameState.current.keys['ArrowLeft'] = false;
      gameState.current.keys['ArrowRight'] = false;
    }
  };

  const handleTouchShoot = (e) => {
    e.preventDefault();
    if (status === 'playing' && gameState.current) {
      const now = Date.now();
      if (now - gameState.current.lastShot > 300) {
        gameState.current.lasers.push({
          x: gameState.current.player.x + PLAYER_WIDTH / 2 - 2,
          y: gameState.current.player.y,
          width: 4,
          height: 15
        });
        gameState.current.lastShot = now;
      }
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8 md:py-12 min-h-[85vh] flex flex-col justify-start items-center font-sans">
      <div className="w-full flex justify-start mb-4 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/play" className="text-gray-500 dark:text-gray-400 hover:text-rose-500 flex items-center gap-2 transition-colors text-sm md:text-base font-medium bg-white dark:bg-gray-950 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md">
            <i className="fas fa-arrow-left"></i> Back to Arcade
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="w-full bg-white dark:bg-gray-950 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <Rocket className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Space Invaders</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Defend the server from incoming bugs in this classic retro shooter.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Score</span>
              <span className="text-xl font-black text-gray-900 dark:text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{score}</span>
            </div>
            <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1">
                <Trophy className="w-3 h-3 text-yellow-500" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Best</span>
              </div>
              <span className="text-xl font-black text-yellow-600 dark:text-yellow-500" style={{ fontVariantNumeric: 'tabular-nums' }}>{highScore}</span>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] md:aspect-video w-full bg-[#0a0a0a] rounded-lg overflow-hidden flex items-center justify-center border-2 border-gray-800 shadow-inner">
          <canvas 
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="max-w-full max-h-full object-contain"
            style={{ display: status === 'waiting' && !gameState.current ? 'none' : 'block' }}
          />
          
          <AnimatePresence>
            {status === 'waiting' && (
              <motion.div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Rocket className="w-10 h-10 md:w-16 md:h-16 text-rose-500 mb-4 md:mb-6 opacity-80" />
                <button 
                  onClick={startGame}
                  className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 md:px-8 py-2 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all outline-none"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" /> Start Game
                </button>
                <p className="mt-4 md:mt-6 text-gray-400 text-xs md:text-sm font-medium hidden md:block">Use <kbd className="bg-gray-800 px-2 py-1 rounded text-gray-300 border border-gray-700">←</kbd> <kbd className="bg-gray-800 px-2 py-1 rounded text-gray-300 border border-gray-700">→</kbd> to move, <kbd className="bg-gray-800 px-2 py-1 rounded text-gray-300 border border-gray-700">Space</kbd> to shoot</p>
              </motion.div>
            )}

            {status === 'gameover' && (
              <motion.div 
                className="absolute inset-0 bg-red-950/80 backdrop-blur-md flex flex-col items-center justify-center z-10 px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="bg-white dark:bg-gray-900 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-2xl text-center max-w-[280px] md:max-w-sm w-full border border-red-500/30">
                  <h2 className="text-2xl md:text-3xl font-black text-red-600 dark:text-red-500 mb-1 md:mb-2 uppercase tracking-wide">Game Over</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 text-base md:text-lg">Final Score: <span className="font-bold text-gray-900 dark:text-white">{score}</span></p>
                  
                  <div className="flex flex-col gap-2 md:gap-3">
                    <button 
                      onClick={startGame}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg shadow-lg transition-colors outline-none"
                    >
                      <RefreshCw className="w-4 h-4 md:w-5 md:h-5" /> Play Again
                    </button>
                    {score > 0 && (
                      <button 
                        onClick={handleShare}
                        className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm shadow-sm transition-colors outline-none"
                      >
                        <Share2 className="w-4 h-4" /> Share Score
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            {status === 'won' && (
              <motion.div 
                className="absolute inset-0 bg-green-950/80 backdrop-blur-md flex flex-col items-center justify-center z-10 px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="bg-white dark:bg-gray-900 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-2xl text-center max-w-[280px] md:max-w-sm w-full border border-green-500/30">
                  <h2 className="text-2xl md:text-3xl font-black text-green-600 dark:text-green-500 mb-1 md:mb-2 uppercase tracking-wide">Victory!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-6 text-sm md:text-lg">You cleared the bugs!<br/>Final Score: <span className="font-bold text-gray-900 dark:text-white">{score}</span></p>
                  
                  <div className="flex flex-col gap-2 md:gap-3">
                    <button 
                      onClick={startGame}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg shadow-lg transition-colors outline-none"
                    >
                      <RefreshCw className="w-4 h-4 md:w-5 md:h-5" /> Play Again
                    </button>
                    <button 
                      onClick={handleShare}
                      className="w-full flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm shadow-sm transition-colors outline-none"
                    >
                      <Share2 className="w-4 h-4" /> Share Score
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden mt-6 grid grid-cols-2 gap-4 h-20 pointer-events-auto">
          {/* Movement Buttons (Left side) */}
          <div className="grid grid-cols-2 gap-2">
            <button 
              className="bg-gray-100 dark:bg-gray-800 rounded-xl active:bg-gray-200 dark:active:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-700 touch-none select-none text-2xl"
              onTouchStart={(e) => handleTouchMove(e, 'left')}
              onTouchEnd={(e) => handleTouchMove(e, 'stop')}
              onMouseDown={(e) => handleTouchMove(e, 'left')}
              onMouseUp={(e) => handleTouchMove(e, 'stop')}
              onMouseLeave={(e) => handleTouchMove(e, 'stop')}
            >
              ←
            </button>
            <button 
              className="bg-gray-100 dark:bg-gray-800 rounded-xl active:bg-gray-200 dark:active:bg-gray-700 flex items-center justify-center border border-gray-200 dark:border-gray-700 touch-none select-none text-2xl"
              onTouchStart={(e) => handleTouchMove(e, 'right')}
              onTouchEnd={(e) => handleTouchMove(e, 'stop')}
              onMouseDown={(e) => handleTouchMove(e, 'right')}
              onMouseUp={(e) => handleTouchMove(e, 'stop')}
              onMouseLeave={(e) => handleTouchMove(e, 'stop')}
            >
              →
            </button>
          </div>
          
          {/* Shoot Button (Right side) */}
          <button 
            className="bg-rose-500 text-white rounded-xl active:bg-rose-600 flex items-center justify-center font-bold text-lg tracking-widest touch-none select-none shadow-sm"
            onTouchStart={handleTouchShoot}
            onMouseDown={handleTouchShoot}
          >
            FIRE
          </button>
        </div>
      </motion.div>
    </div>
  );
}