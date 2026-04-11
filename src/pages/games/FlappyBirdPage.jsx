import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RefreshCw, Play, Trophy, Bird, Share2 } from 'lucide-react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 500;
const GRAVITY = 0.5;
const JUMP = -7;
const PIPE_SPEED = 3;
const PIPE_WIDTH = 50;
const PIPE_SPACING = 150;
const BIRD_SIZE = 20;

export default function FlappyBirdPage() {
  const [status, setStatus] = useState('waiting');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('flappyBirdHighScore') || '0', 10));
  
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const gameState = useRef(null);

  const initGame = () => {
    // Generate random stars
    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      size: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.3
    }));

    // Generate random clouds
    const clouds = Array.from({ length: 5 }, () => ({
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * (CANVAS_HEIGHT / 2),
      width: Math.random() * 60 + 40,
      height: 20 + Math.random() * 10,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.1 + 0.05
    }));

    gameState.current = {
      bird: { x: 50, y: CANVAS_HEIGHT / 2, width: BIRD_SIZE, height: BIRD_SIZE, velocity: 0 },
      pipes: [], // We will treat these as buildings now
      hasStarted: false, // Wait for first input
      frames: 0,
      scoreAdded: {}, // To keep track of which pipes have been passed
      stars,
      clouds
    };
    setScore(0);
  };

  const startGame = () => {
    initGame();
    setStatus('playing');
  };

  const handleShare = async () => {
    const currentHighScore = Math.max(score, highScore);
    const text = `🐦 I scored ${score} points in the Flappy Bird developer game! Can you beat my high score of ${currentHighScore}?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Flappy Bird', text: text + '\n\n' + window.location.href });
      } catch (e) {
        console.error('Share failed', e);
      }
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href);
      alert('Score copied to clipboard!');
    }
  };

  const jump = () => {
    if (status === 'playing' && gameState.current) {
      if (!gameState.current.hasStarted) {
        gameState.current.hasStarted = true;
      }
      gameState.current.bird.velocity = JUMP;
    } else if (status === 'waiting') {
      startGame();
      // Notice we don't 'jump' immediately; they have to hit it again, or we can jump immediately:
      setTimeout(() => {
        if (gameState.current) {
          gameState.current.hasStarted = true;
          gameState.current.bird.velocity = JUMP;
        }
      }, 0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ([' ', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(requestRef.current);
    };
  }, [status]);

  const endGame = () => {
    setStatus('gameover');
    setScore(s => {
      if (s > highScore) {
        setHighScore(s);
        localStorage.setItem('flappyBirdHighScore', s.toString());
      }
      return s;
    });
  };

  const update = () => {
    if (status !== 'playing' || !gameState.current) return;
    const state = gameState.current;
    
    // Background cloud movement
    if (state.clouds) {
      state.clouds.forEach(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x + cloud.width < 0) {
          cloud.x = CANVAS_WIDTH + Math.random() * 50;
        }
      });
    }

    if (!state.hasStarted) {
      // Idle float
      const idleFrames = state.frames || 0;
      state.bird.y = CANVAS_HEIGHT / 2 + Math.sin(idleFrames * 0.1) * 5;
      state.frames = idleFrames + 1;
      return;
    }

    const { bird, pipes } = state;

    // Bird physics
    bird.velocity += GRAVITY;
    bird.y += bird.velocity;

    // Boundary checks
    if (bird.y + bird.height >= CANVAS_HEIGHT || bird.y < 0) {
      endGame();
      return;
    }

    // Pipe (Building) generation
    if (state.frames % 100 === 0) {
      const topPipeHeight = Math.random() * (CANVAS_HEIGHT - PIPE_SPACING - 100) + 50;
      
      // Generate some windows for the building 
      const bottomBuildingHeight = CANVAS_HEIGHT - (topPipeHeight + PIPE_SPACING);
      
      // Top building windows
      const topWindows = [];
      const numTopRows = Math.floor(topPipeHeight / 30);
      for (let r=0; r<numTopRows; r++) {
         if (Math.random() > 0.3) topWindows.push({y: 10 + r*30, lit: Math.random() > 0.5});
      }
      
      // Bottom building windows
      const bottomWindows = [];
      const numBottomRows = Math.floor(bottomBuildingHeight / 30);
      for (let r=0; r<numBottomRows; r++) {
         if (Math.random() > 0.3) bottomWindows.push({y: topPipeHeight + PIPE_SPACING + 10 + r*30, lit: Math.random() > 0.5});
      }

      pipes.push({
        x: CANVAS_WIDTH,
        topHeight: topPipeHeight,
        passed: false,
        topWindows,
        bottomWindows
      });
    }

    // Pipe movement and collision
    for (let i = pipes.length - 1; i >= 0; i--) {
      let p = pipes[i];
      p.x -= PIPE_SPEED;

      // Check collision
      if (
        bird.x < p.x + PIPE_WIDTH &&
        bird.x + bird.width > p.x &&
        (bird.y < p.topHeight || bird.y + bird.height > p.topHeight + PIPE_SPACING)
      ) {
        endGame();
        return;
      }

      // Check score
      if (p.x + PIPE_WIDTH < bird.x && !p.passed) {
        p.passed = true;
        setScore(s => s + 1);
      }

      // Remove off-screen pipes
      if (p.x + PIPE_WIDTH < 0) {
        pipes.splice(i, 1);
      }
    }

    state.frames++;
  };

  const draw = (ctx) => {
    if (!gameState.current) return;
    const state = gameState.current;

    // Draw Night Sky Background
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#0f172a'); // Very dark blue/slate
    gradient.addColorStop(1, '#1e1b4b'); // Dark indigo/slate
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Stars
    if (state.stars) {
      state.stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw Clouds
    if (state.clouds) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      state.clouds.forEach(cloud => {
        ctx.beginPath();
        // A simple minimalist cloud composed of 3 overlapping circles
        ctx.arc(cloud.x + cloud.width * 0.3, cloud.y + cloud.height * 0.5, cloud.height * 0.8, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.width * 0.7, cloud.y + cloud.height * 0.5, cloud.height * 0.6, 0, Math.PI * 2);
        ctx.arc(cloud.x + cloud.width * 0.5, cloud.y + cloud.height * 0.2, cloud.height, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw Bird
    ctx.fillStyle = '#eab308'; // Yellow
    ctx.beginPath();
    ctx.arc(state.bird.x + state.bird.width / 2, state.bird.y + state.bird.height / 2, state.bird.width / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(state.bird.x + state.bird.width / 2 + 5, state.bird.y + state.bird.height / 2 - 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(state.bird.x + state.bird.width / 2 + 6, state.bird.y + state.bird.height / 2 - 3, 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw beak
    ctx.fillStyle = '#f97316'; // Orange
    ctx.beginPath();
    ctx.moveTo(state.bird.x + state.bird.width / 2 + 8, state.bird.y + state.bird.height / 2);
    ctx.lineTo(state.bird.x + state.bird.width / 2 + 15, state.bird.y + state.bird.height / 2 + 3);
    ctx.lineTo(state.bird.x + state.bird.width / 2 + 8, state.bird.y + state.bird.height / 2 + 6);
    ctx.fill();


    // Draw Buildings (Pipes)
    state.pipes.forEach(p => {
      // Base building color
      ctx.fillStyle = '#1e293b'; // Slate dark building

      // Top building
      ctx.fillRect(p.x, 0, PIPE_WIDTH, p.topHeight);
      // Small rooftop lip at the bottom of the top building
      ctx.fillRect(p.x - 2, p.topHeight - 10, PIPE_WIDTH + 4, 10);
      
      // Bottom building
      const bottomY = p.topHeight + PIPE_SPACING;
      ctx.fillRect(p.x, bottomY, PIPE_WIDTH, CANVAS_HEIGHT - bottomY);
      // Rooftop lip at the top of the bottom building
      ctx.fillRect(p.x - 2, bottomY, PIPE_WIDTH + 4, 10);

      // Draw Windows
      // Top Windows
      if (p.topWindows) {
        p.topWindows.forEach(win => {
          if (win.y < p.topHeight - 15) {
            ctx.fillStyle = win.lit ? '#fbbf24' : '#0f172a'; // lit yellow or unlit dark
            ctx.fillRect(p.x + 10, win.y, 8, 12);
            ctx.fillStyle = (Math.random() > 0.5 && win.lit) ? '#fbbf24' : '#0f172a';
            ctx.fillRect(p.x + 30, win.y, 8, 12);
          }
        });
      }
      
      // Bottom Windows
      if (p.bottomWindows) {
        p.bottomWindows.forEach(win => {
          if (win.y < CANVAS_HEIGHT - 15 && win.y > bottomY + 15) {
            ctx.fillStyle = win.lit ? '#fbbf24' : '#0f172a'; 
            ctx.fillRect(p.x + 10, win.y, 8, 12);
            ctx.fillStyle = (Math.random() > 0.5 && win.lit) ? '#fbbf24' : '#0f172a';
            ctx.fillRect(p.x + 30, win.y, 8, 12);
          }
        });
      }
      
      // Building borders to make them pop against dark sky
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.strokeRect(p.x, 0, PIPE_WIDTH, p.topHeight);
      ctx.strokeRect(p.x, bottomY, PIPE_WIDTH, CANVAS_HEIGHT - bottomY);
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

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8 md:py-12 min-h-[85vh] flex flex-col justify-start items-center font-sans">
      <div className="w-full flex justify-start mb-4 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/play" className="text-gray-500 dark:text-gray-400 hover:text-yellow-500 flex items-center gap-2 transition-colors text-sm md:text-base font-medium bg-white dark:bg-gray-950 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md">
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
              <Bird className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flappy Bird</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Navigate the bird through the pipes</p>
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

        <div 
          className="relative w-full max-w-[400px] mx-auto bg-[#0f172a] rounded-lg overflow-hidden flex items-center justify-center border-2 border-gray-800 shadow-inner"
          style={{ aspectRatio: '4/5' }}
          onTouchStart={(e) => { e.preventDefault(); jump(); }}
          onMouseDown={jump}
        >
          <canvas 
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="w-full h-full object-fill pointer-events-none block"
            style={{ display: status === 'waiting' && !gameState.current ? 'none' : 'block' }}
          />
          
          <AnimatePresence>
            {status === 'waiting' && (
              <motion.div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Bird className="w-10 h-10 md:w-16 md:h-16 text-yellow-400 mb-4 md:mb-6 opacity-90" />
                <button 
                  onClick={(e) => { e.stopPropagation(); startGame(); }}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 md:px-8 py-2 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all outline-none"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" /> Start Game
                </button>
                <p className="mt-4 md:mt-6 text-gray-300 text-xs md:text-sm font-medium">Tap or press <kbd className="bg-gray-800 px-2 py-1 rounded text-gray-200 border border-gray-700">Space</kbd> to flap</p>
              </motion.div>
            )}

            {status === 'gameover' && (
              <motion.div 
                className="absolute inset-0 bg-red-950/80 backdrop-blur-md flex flex-col items-center justify-center z-10 px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="bg-white dark:bg-gray-900 p-4 md:p-8 rounded-xl md:rounded-2xl shadow-2xl text-center max-w-[280px] md:max-w-sm w-full border border-red-500/30" onClick={(e) => e.stopPropagation()}>
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
                        className="w-full flex items-center justify-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold text-sm shadow-sm transition-colors outline-none"
                      >
                        <Share2 className="w-4 h-4" /> Share Score
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}