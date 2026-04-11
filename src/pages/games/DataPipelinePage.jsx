import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RefreshCw, Play, BrainCircuit, CheckCircle2 } from 'lucide-react';

// Pipe types: [top, right, bottom, left]
const PIPE_TYPES = {
  'S': [0, 1, 0, 0], // Source (fixed direction out to right)
  'E': [0, 0, 0, 1], // End (fixed direction from left)
  'I': [1, 0, 1, 0], // Straight
  'L': [1, 1, 0, 0], // Corner/Angle
  'T': [1, 1, 1, 0], // T-intersection
  '+': [1, 1, 1, 1], // Cross
  '.': [0, 0, 0, 0], // Empty
};

// Hand-crafted simple levels (4x4, 5x5)
const LEVELS = [
  {
    size: 4,
    grid: [ // A simple path S -> E
      'S', 'I', 'L', '.',
      '.', '.', 'I', '.',
      '.', 'L', 'L', '.',
      '.', 'L', 'I', 'E'
    ]
  },
  {
    size: 5,
    grid: [
      'S', 'L', '.', '.', '.',
      '.', 'L', 'L', 'I', 'L',
      '.', '.', 'I', '.', 'I',
      '.', 'L', 'L', '.', 'I',
      '.', 'L', 'I', 'I', 'E'
    ]
  },
  {
    size: 6,
    grid: [
      'S', 'I', 'L', '.', 'L', 'L',
      '.', '.', 'I', '.', 'I', 'I',
      '.', 'L', 'T', 'I', 'L', 'I',
      '.', 'I', '.', '.', '.', 'I',
      '.', 'L', 'I', 'L', '.', 'I',
      '.', '.', '.', 'L', 'I', 'E'
    ]
  }
];

// Helper to shuffle the initial orientation randomly (except S and E)
const initBoard = (levelIndex) => {
  const level = LEVELS[levelIndex];
  return level.grid.map((type) => {
    const isFixed = type === 'S' || type === 'E' || type === '.';
    const rotations = isFixed ? 0 : Math.floor(Math.random() * 4);
    return { type, rotations, isFixed };
  });
};

export default function DataPipelinePage() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [board, setBoard] = useState([]);
  const [status, setStatus] = useState('waiting'); // waiting, playing, solved, gameover
  const [flowBoard, setFlowBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [bestMoves, setBestMoves] = useState(() => {
    return parseInt(localStorage.getItem(`pipelineBestMoves_${levelIndex}`) || '0', 10);
  });
  
  const currentLevel = LEVELS[Math.min(levelIndex, LEVELS.length - 1)];

  // Update bestMoves when level changes
  useEffect(() => {
    setBestMoves(parseInt(localStorage.getItem(`pipelineBestMoves_${levelIndex}`) || '0', 10));
  }, [levelIndex]);

  const startGame = () => {
    setBoard(initBoard(levelIndex));
    setMoves(0);
    setStatus('playing');
  };

  const handleShare = async () => {
    const text = `🧠 I just solved Level ${levelIndex + 1} of the Data Pipeline Puzzle! Can you build the optimal pipeline?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Data Pipeline Puzzle', text: text + '\n\n' + window.location.href });
      } catch (e) {}
    } else {
      navigator.clipboard.writeText(text + ' ' + window.location.href);
      alert('Copied to clipboard!');
    }
  };

  // Helper to trace flow from Source
  useEffect(() => {
    if (status !== 'playing' && status !== 'solved') return;
    
    const size = currentLevel.size;
    const isFlowing = new Array(board.length).fill(false);
    
    // Find Source
    const sourceIdx = board.findIndex(cell => cell.type === 'S');
    if (sourceIdx === -1) return;

    const queue = [sourceIdx];
    isFlowing[sourceIdx] = true;

    const getConnections = (cell, isFixed) => {
        let ports = [...PIPE_TYPES[cell.type]];
        // Rotate the ports array right by cell.rotations % 4
        const effectiveRotations = cell.rotations % 4;
        for(let i=0; i<effectiveRotations; i++) {
            ports.unshift(ports.pop());
        }
        return ports;
    };

    while (queue.length > 0) {
      const currIdx = queue.shift();
      const x = currIdx % size;
      const y = Math.floor(currIdx / size);
      
      const currPorts = getConnections(board[currIdx], board[currIdx].isFixed);
      
      // Check Top (0), Right (1), Bottom (2), Left (3)
      const directions = [
        { dx: 0, dy: -1, port: 0, matchPort: 2 },
        { dx: 1, dy: 0, port: 1, matchPort: 3 },
        { dx: 0, dy: 1, port: 2, matchPort: 0 },
        { dx: -1, dy: 0, port: 3, matchPort: 1 }
      ];

      directions.forEach(dir => {
        if (currPorts[dir.port]) {
          const nx = x + dir.dx;
          const ny = y + dir.dy;
          if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
            const nextIdx = ny * size + nx;
            const nextPorts = getConnections(board[nextIdx], board[nextIdx].isFixed);
            if (nextPorts[dir.matchPort] && !isFlowing[nextIdx]) {
              isFlowing[nextIdx] = true;
              queue.push(nextIdx);
            }
          }
        }
      });
    }

    setFlowBoard(isFlowing);

    // Check win condition (End node receives flow)
    const endIdx = board.findIndex(cell => cell.type === 'E');
    if (isFlowing[endIdx] && status === 'playing') {
      setStatus('winning');
      
      const currentBest = parseInt(localStorage.getItem(`pipelineBestMoves_${levelIndex}`) || '0', 10);
      if (currentBest === 0 || moves < currentBest) {
        localStorage.setItem(`pipelineBestMoves_${levelIndex}`, moves.toString());
        setBestMoves(moves);
      }

      setTimeout(() => {
        setStatus('solved');
      }, 1000);
    }

  }, [board, status, currentLevel.size]);

  const handleTileClick = (index) => {
    if (status !== 'playing') return;
    if (board[index].isFixed) return;

    setBoard(prev => {
      const newBoard = [...prev];
      newBoard[index] = { ...newBoard[index], rotations: newBoard[index].rotations + 1 };
      return newBoard;
    });
    setMoves(m => m + 1);
  };

  const nextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(idx => idx + 1);
      setStatus('waiting');
    } else {
      setLevelIndex(0);
      setStatus('waiting');
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-[85vh] flex flex-col justify-start items-center font-sans">
      <div className="w-full flex justify-start mb-4 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/play" className="text-gray-500 dark:text-gray-400 hover:text-(--celadon) flex items-center gap-2 transition-colors text-sm md:text-base font-medium bg-white dark:bg-gray-950 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md">
            <i className="fas fa-arrow-left"></i> Back to Arcade
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className="w-full bg-white dark:bg-gray-950 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Data <span className="text-(--celadon)">Pipeline</span></h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Connect the Database to the Analytics node.</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Level: <span className="text-lg text-(--celadon)">{levelIndex + 1} / {LEVELS.length}</span></div>
            <div className="text-xs text-gray-400 dark:text-gray-500">Moves: {moves}</div>
            {bestMoves > 0 && <div className="text-xs text-(--celadon) dark:text-(--celadon)">Best: {bestMoves} moves</div>}
          </div>
        </div>

        <div className="relative w-full max-w-[400px] aspect-square mx-auto bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 md:p-4 touch-none">
          {status === 'waiting' && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg">
              <BrainCircuit className="w-16 h-16 text-(--celadon) mb-4" />
              <button onClick={startGame} className="flex items-center gap-2 px-6 py-3 bg-(--celadon) text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all">
                <Play className="w-5 h-5" /> Start Level {levelIndex + 1}
              </button>
            </div>
          )}

          {status === 'winning' && (
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center rounded-lg">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                <CheckCircle2 className="w-20 h-20 text-(--celadon) mb-4 drop-shadow-md" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 drop-shadow-sm">You Won!</h2>
            </div>
          )}

          {status === 'solved' && (
            <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-4 text-center rounded-lg">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">Pipeline Connected!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">You solved it in {moves} moves.</p>
              <div className="flex flex-col gap-3">
                <button onClick={nextLevel} className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold rounded-full hover:shadow-lg transition-all w-full">
                  <Play className="w-4 h-4" /> {levelIndex < LEVELS.length - 1 ? 'Next Level' : 'Restart Game'}
                </button>
                <div className="flex gap-3">
                  <button onClick={startGame} className="flex items-center justify-center gap-2 px-5 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-full hover:shadow-lg transition-all w-full">
                    <RefreshCw className="w-4 h-4" /> Replay
                  </button>
                  <button onClick={handleShare} className="flex items-center justify-center gap-2 px-5 py-2 bg-(--celadon) text-white dark:text-gray-900 font-semibold rounded-full hover:shadow-lg transition-all w-full">
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}

          {board.length > 0 && (
            <div 
              className="w-full h-full grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${currentLevel.size}, 1fr)`,
                gridTemplateRows: `repeat(${currentLevel.size}, 1fr)`
              }}
            >
              {board.map((cell, idx) => {
                const isFlowing = flowBoard[idx];
                
                // SVG paths based on type and flow
                const strokeColor = isFlowing ? '#60A5FA' : '#cbd5e1';
                const strokeWidth = 12;
                
                const lines = [];
                // Original unrotated ports
                const ports = PIPE_TYPES[cell.type];
                
                if (ports[0]) lines.push(<line key="0" x1="50" y1="50" x2="50" y2="0" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />);
                if (ports[1]) lines.push(<line key="1" x1="50" y1="50" x2="100" y2="50" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />);
                if (ports[2]) lines.push(<line key="2" x1="50" y1="50" x2="50" y2="100" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />);
                if (ports[3]) lines.push(<line key="3" x1="50" y1="50" x2="0" y2="50" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />);
                
                if (cell.type === 'S') {
                    lines.push(<circle key="c" cx="25" cy="50" r="16" fill="#3B82F6" />);
                } else if (cell.type === 'E') {
                    lines.push(<circle key="ce" cx="75" cy="50" r="16" fill={isFlowing ? "#3B82F6" : "#9ca3af"} />);
                }

                // Add center joint for non-S/E/empty
                if (cell.type !== '.' && cell.type !== 'S' && cell.type !== 'E') {
                    lines.push(<circle key="cc" cx="50" cy="50" r="10" fill={strokeColor} />);
                }

                return (
                  <div 
                    key={idx}
                    onClick={() => handleTileClick(idx)}
                    className={`w-full h-full flex items-center justify-center bg-white rounded-md ${!cell.isFixed ? 'cursor-pointer hover:bg-gray-50 active:bg-gray-100 shadow-sm border border-gray-100' : ''}`}
                  >
                    <motion.div
                      animate={{ rotate: cell.rotations * 90 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full h-full"
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                        {lines}
                      </svg>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6 md:hidden">Tap the tiles to rotate them and connect the pipeline.</p>
      </motion.div>
    </div>
  );
}