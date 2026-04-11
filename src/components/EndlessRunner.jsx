import React, { useEffect, useRef, useState, useCallback } from 'react';
import dinoImgSrc from '../assets/sprites/dino.webp';
import barrelImgSrc from '../assets/sprites/barrel.webp';
import ticketImgSrc from '../assets/sprites/ticket.webp';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 300;
const GROUND_Y = 295; // Baseline at the very bottom
const DINO_SIZE = 120;
const OBSTACLE_SIZE = 90;
const DINO_GROUND_Y = GROUND_Y - DINO_SIZE;
const BARREL_Y = GROUND_Y - OBSTACLE_SIZE;
const TICKET_Y = 60; 

const GRAVITY = 0.8;
const JUMP_POWER = -16; 
const INITIAL_SPEED = 7; 

const EndlessRunner = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('runnerHighScore')) || 0);

  const gameState = useRef({
    frames: 0,
    speed: INITIAL_SPEED,
    dino: { x: 40, y: DINO_GROUND_Y, width: DINO_SIZE, height: DINO_SIZE, velocityY: 0, isGrounded: true },
    obstacles: [],
  });

  const images = useRef({ dino: null, barrel: null, ticket: null });

  useEffect(() => {
    const dinoImg = new Image();
    dinoImg.src = dinoImgSrc;
    const barrelImg = new Image();
    barrelImg.src = barrelImgSrc;
    const ticketImg = new Image();
    ticketImg.src = ticketImgSrc;

    dinoImg.onload = () => (images.current.dino = dinoImg);
    barrelImg.onload = () => (images.current.barrel = barrelImg);
    ticketImg.onload = () => (images.current.ticket = ticketImg);
  }, []);

  const jump = useCallback(() => {
    if (gameState.current.dino.isGrounded && !gameOver) {
      gameState.current.dino.velocityY = JUMP_POWER;
      gameState.current.dino.isGrounded = false;
    }
    if (gameOver) {
      resetGame();
    }
  }, [gameOver]);

  const resetGame = () => {
    gameState.current = {
      frames: 0,
      speed: INITIAL_SPEED,
      dino: { x: 40, y: DINO_GROUND_Y, width: DINO_SIZE, height: DINO_SIZE, velocityY: 0, isGrounded: true },
      obstacles: [],
    };
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Draw initial state when not playing
    if (!isPlaying && !gameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (images.current.dino && images.current.dino.complete) {
        ctx.drawImage(images.current.dino, 40, DINO_GROUND_Y, DINO_SIZE, DINO_SIZE);
      } else {
        ctx.fillStyle = '#888';
        ctx.fillRect(40, DINO_GROUND_Y, DINO_SIZE, DINO_SIZE); // Placeholder dino
      }
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(canvas.width, GROUND_Y);
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    
    if (!isPlaying) return;
    
    let animationId;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const state = gameState.current;

      // Update score
      if (state.frames % 10 === 0) {
        setScore(s => {
          const newScore = s + 1;
          if (newScore % 50 === 0) state.speed += 0.5; // increase difficulty steadily
          return newScore;
        });
      }

      state.dino.velocityY += GRAVITY;
      state.dino.y += state.dino.velocityY;

      // Ground collision
      if (state.dino.y >= DINO_GROUND_Y) {
        state.dino.y = DINO_GROUND_Y;
        state.dino.velocityY = 0;
        state.dino.isGrounded = true;
      }

      // Draw dino
      if (images.current.dino && images.current.dino.complete) {
        ctx.drawImage(images.current.dino, state.dino.x, state.dino.y, state.dino.width, state.dino.height);
      } else {
        ctx.fillStyle = '#555';
        ctx.fillRect(state.dino.x, state.dino.y, state.dino.width, state.dino.height);
      }

      // Handle Obstacles
      if (state.frames % Math.max(60, Math.floor(120 - state.speed * 5)) === 0) {
        const type = Math.random() > 0.5 ? 'barrel' : 'ticket';
        state.obstacles.push({
          x: canvas.width,
          y: type === 'barrel' ? BARREL_Y : TICKET_Y,
          width: OBSTACLE_SIZE,
          height: OBSTACLE_SIZE,
          type
        });
      }

      for (let i = state.obstacles.length - 1; i >= 0; i--) {
        const obs = state.obstacles[i];
        obs.x -= state.speed;

        // Draw obstacle
        const img = images.current[obs.type];
        if (img && img.complete) {
          ctx.drawImage(img, obs.x, obs.y, OBSTACLE_SIZE, OBSTACLE_SIZE); 
        } else {
          ctx.fillStyle = obs.type === 'barrel' ? '#8B4513' : '#FFD700';
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        }

        // Collision detection AABB (with slight hitbox forgiveness)
        const hitMargin = 15;
        if (
          state.dino.x + hitMargin < obs.x + obs.width - hitMargin &&
          state.dino.x + state.dino.width - hitMargin > obs.x + hitMargin &&
          state.dino.y + hitMargin < obs.y + obs.height - hitMargin &&
          state.dino.y + state.dino.height - hitMargin > obs.y + hitMargin
        ) {
          setGameOver(true);
          setIsPlaying(false);
          setScore(s => {
            if (s > highScore) {
              setHighScore(s);
              localStorage.setItem('runnerHighScore', s);
            }
            return s;
          });
          cancelAnimationFrame(animationId);
          return; // Exit game loop
        }

        // Remove offscreen obstacles
        if (obs.x + obs.width < 0) {
          state.obstacles.splice(i, 1);
        }
      }

      // Ground Line
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(canvas.width, GROUND_Y);
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 4;
      ctx.stroke();

      state.frames++;
      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, highScore]);

  // Click handler on canvas
  const handleCanvasClick = (e) => {
    e.preventDefault();
    if (!isPlaying && !gameOver) {
      resetGame();
    } else {
      jump();
    }
  };

  const handleCanvasTouch = (e) => {
    e.preventDefault();
    if (!isPlaying && !gameOver) {
      resetGame();
    } else {
      jump();
    }
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-5xl px-2 sm:px-4 relative z-10 my-8">
      <div className="flex justify-between w-full max-w-[1000px] mb-2 text-lg sm:text-xl md:text-2xl text-(--text-color) font-mono opacity-80 z-20 px-2">
        <div>Score: {String(score).padStart(5, '0')}</div>
        <div>HI: {String(highScore).padStart(5, '0')}</div>
      </div>
      
      <div className="relative w-full max-w-[1000px] rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-(--text-color) border-opacity-20 bg-(--bg-color)">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="w-full h-full cursor-pointer touch-none"
          onClick={handleCanvasClick}
          onTouchStart={handleCanvasTouch}
          style={{ imageRendering: 'pixelated', outline: 'none', objectFit: 'contain', aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}` }}
        />
        
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="animate-pulse font-mono text-[14px] sm:text-lg md:text-xl lg:text-2xl opacity-60 text-(--text-color)">
              Press Space or Tap to Start
            </span>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-(--bg-color) bg-opacity-80 pb-4 pointer-events-none">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold text-(--text-color) mb-2">GAME OVER</span>
            <span className="font-mono text-[14px] sm:text-lg md:text-xl lg:text-2xl opacity-80 text-(--text-color) animate-pulse mt-2 lg:mt-4">
              Tap to restart
            </span>
          </div>
        )}
      </div>
      <p className="text-xs sm:text-sm md:text-base opacity-50 mt-4 text-center pb-8">
        Jump over the barrels, avoid the flying tickets!
      </p>
    </div>
  );
};

export default EndlessRunner;
