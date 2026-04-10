import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, PenTool, Eraser, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// A valid seed Sudoku board
const seedBoard = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const generateBoard = () => {
  let solved = seedBoard.map(row => [...row]);
  
  // Shuffle numbers uniformly 1-9
  let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  nums.sort(() => Math.random() - 0.5);

  solved = solved.map(row => row.map(cell => nums[cell - 1]));

  // Create puzzle by removing cells
  let puzzle = solved.map(row => [...row]);
  let removedCells = 0;
  while (removedCells < 45) { // Medium difficulty ~ 45 missing
    let r = Math.floor(Math.random() * 9);
    let c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removedCells++;
    }
  }

  return {
    solved,
    puzzle: puzzle.map((row, r) => 
      row.map((val, c) => ({
        row: r,
        col: c,
        val: val,
        isInitial: val !== 0,
        notes: []
      }))
    )
  };
};

export default function SudokuGamePage() {
  const [gameState, setGameState] = useState({ puzzle: [], solved: [] });
  const [selectedCell, setSelectedCell] = useState(null);
  const [notesMode, setNotesMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [errors, setErrors] = useState(0);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('sudoku_save_state');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setGameState(parsed.gameState);
        setTimer(parsed.timer);
        setErrors(parsed.errors);
        setIsPlaying(false); // Paused when loaded from save
        return;
      } catch (e) {
        console.error("Failed to parse saved Sudoku state", e);
      }
    }
    initGame();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && !won && !lost) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, won, lost]);

  useEffect(() => {
    if (errors >= 10) {
      setLost(true);
      setIsPlaying(false);
    }
  }, [errors]);

  // Save game state
  useEffect(() => {
    if (gameState.puzzle.length > 0) {
      if (won || lost) {
        localStorage.removeItem('sudoku_save_state');
      } else {
        localStorage.setItem('sudoku_save_state', JSON.stringify({
          gameState,
          timer,
          errors
        }));
      }
    }
  }, [gameState, timer, errors, won, lost]);

  const initGame = () => {
    const { puzzle, solved } = generateBoard();
    setGameState({ puzzle, solved });
    setSelectedCell(null);
    setNotesMode(false);
    setIsPlaying(true);
    setTimer(0);
    setErrors(0);
    setWon(false);
    setLost(false);
    localStorage.removeItem('sudoku_save_state');
  };

  const handleCellClick = (r, c) => {
    if (!isPlaying || lost) return;
    setSelectedCell({ r, c });
  };

  const handleNumberInput = useCallback((num) => {
    if (!isPlaying || !selectedCell || won || lost) return;

    const { r, c } = selectedCell;
    const currentCell = gameState.puzzle[r][c];

    if (currentCell.isInitial) return;

    if (!notesMode) {
      if (currentCell.val !== num && gameState.solved[r][c] !== num) {
        setErrors(err => err + 1);
      }
    }

    setGameState(prev => {
      const newPuzzle = prev.puzzle.map(row => row.map(cell => ({ ...cell, notes: [...cell.notes] })));
      const cell = newPuzzle[r][c];

      if (notesMode) {
        if (cell.val !== 0) return prev; // Cannot add notes to filled cell
        if (cell.notes.includes(num)) {
          cell.notes = cell.notes.filter(n => n !== num);
        } else {
          cell.notes.push(num);
          cell.notes.sort();
        }
      } else {
        if (cell.val === num) {
          cell.val = 0; // Erase if same
        } else {
          cell.val = num;
        }
      }

      return { ...prev, puzzle: newPuzzle };
    });

    checkWin();
  }, [isPlaying, selectedCell, notesMode, gameState, won, lost]);

  const eraseCell = () => {
    if (!isPlaying || !selectedCell || won || lost) return;
    const { r, c } = selectedCell;
    if (gameState.puzzle[r][c].isInitial) return;

    setGameState(prev => {
      const newPuzzle = prev.puzzle.map(row => row.map(cell => ({ ...cell })));
      newPuzzle[r][c].val = 0;
      newPuzzle[r][c].notes = [];
      return { ...prev, puzzle: newPuzzle };
    });
  };

  const checkWin = () => {
    setTimeout(() => {
      setGameState(prev => {
        const isWon = prev.puzzle.every(row => row.every(cell => cell.val === prev.solved[cell.row][cell.col]));
        if (isWon && !won) {
          setWon(true);
          setIsPlaying(false);
        }
        return prev;
      });
    }, 0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '1' && e.key <= '9') {
        handleNumberInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        eraseCell();
      } else if (e.key === 'n') {
        setNotesMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumberInput, eraseCell]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070707] py-6 md:py-20 px-2 md:px-8 font-sans flex flex-col items-center overflow-x-hidden">
      
      <div className="max-w-4xl w-full flex justify-start mb-4 relative z-10 px-2 lg:px-0">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/play" className="text-gray-500 dark:text-gray-400 hover:text-[var(--amethyst)] flex items-center gap-2 transition-colors text-sm md:text-base font-medium bg-white dark:bg-[#111111] px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md">
            <ArrowLeft size={16} /> Back to Arcade
          </Link>
        </motion.div>
      </div>

      <div className="max-w-4xl w-full flex flex-col h-full justify-center">
        {/* Header Area */}
        <div className="flex justify-between items-center mb-4 md:mb-6 max-w-xl mx-auto md:mx-0 w-full md:max-w-none px-2 lg:px-0">
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold dark:text-gray-100 mb-0.5 md:mb-1 text-[var(--chrysler-blue)]">Sudoku</h1>
            <p className="text-xs md:text-sm dark:text-gray-400">Errors: {errors}/10</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-lg md:text-xl font-mono text-gray-700 dark:text-gray-300">{formatTime(timer)}</span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 md:p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              disabled={won || lost}
            >
              {isPlaying ? <Pause size={18} className="dark:text-white" /> : <Play size={18} className="dark:text-white" />}
            </button>
            <button
              onClick={initGame}
              className="p-1.5 md:p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              <RotateCcw size={18} className="dark:text-white" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-10 items-center md:items-start justify-center w-full">
          {/* Board */}
          <div className="w-full max-w-[340px] md:max-w-xl flex-shrink-0">
            <div className="bg-white dark:bg-[#111111] p-1 md:p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 relative">
          {!isPlaying && !won && !lost && (
            <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
              <button 
                onClick={() => setIsPlaying(true)}
                className="bg-[var(--amethyst)] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#8656cd] transition"
              >
                Resume Game
              </button>
            </div>
          )}
          {won && (
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
              <Check size={48} className="text-[var(--honeydew)] mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">You Won!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Time: {formatTime(timer)}</p>
              <button 
                onClick={initGame}
                className="bg-[var(--amethyst)] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-[#8656cd] transition"
              >
                Play Again
              </button>
            </div>
          )}
          {lost && (
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-3xl font-bold text-red-500 dark:text-red-400 mb-2">Game Over!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">You've made 10 errors.</p>
              <button 
                onClick={initGame}
                className="bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition"
              >
                Try Again
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-9 gap-[1px] bg-gray-300 dark:bg-gray-600 border-2 border-gray-400 dark:border-gray-500 rounded">
            {gameState.puzzle.map((row, rIndex) => (
              row.map((cell, cIndex) => {
                const isSelected = selectedCell?.r === rIndex && selectedCell?.c === cIndex;
                const isSameCol = selectedCell?.c === cIndex;
                const isSameRow = selectedCell?.r === rIndex;
                const isSameBlock = selectedCell 
                  && Math.floor(rIndex / 3) === Math.floor(selectedCell.r / 3)
                  && Math.floor(cIndex / 3) === Math.floor(selectedCell.c / 3);
                
                const isHighlighted = isSameRow || isSameCol || isSameBlock;
                const isSameValue = selectedCell && cell.val !== 0 && cell.val === gameState.puzzle[selectedCell.r][selectedCell.c].val;
                
                const isWrong = cell.val !== 0 && !cell.isInitial && cell.val !== gameState.solved[rIndex][cIndex];

                // Block borders
                let borderClasses = "";
                if (cIndex % 3 === 2 && cIndex !== 8) borderClasses += " border-r-2 border-r-gray-400 dark:border-r-gray-500";
                if (rIndex % 3 === 2 && rIndex !== 8) borderClasses += " border-b-2 border-b-gray-400 dark:border-b-gray-500";

                return (
                  <div
                    key={`${rIndex}-${cIndex}`}
                    onClick={() => handleCellClick(rIndex, cIndex)}
                    className={`
                      aspect-square flex justify-center items-center cursor-pointer text-lg md:text-xl font-medium sm:font-bold transition-colors
                      ${cell.isInitial ? 'text-gray-900 dark:text-gray-100' : 'text-[var(--amethyst)]'}
                      ${isWrong ? 'text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30' : ''}
                      ${isSelected ? 'bg-[var(--honeydew)] dark:bg-[var(--amethyst)]/40' : 
                        isSameValue ? 'bg-[var(--celeste)] dark:bg-[var(--amethyst)]/20' :
                        isHighlighted ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-[#111111]'}
                      ${borderClasses}
                    `}
                  >
                    {cell.val !== 0 ? (
                      cell.val
                    ) : (
                      <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-[2px]">
                        {[1,2,3,4,5,6,7,8,9].map(n => (
                          <div key={n} className="flex items-center justify-center text-[8px] md:text-[10px] text-gray-400 leading-none">
                            {cell.notes.includes(n) ? n : ''}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ))}
          </div>
        </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 md:gap-4 w-full max-w-[340px] md:max-w-none md:w-64 pt-0 flex-shrink-0">
          <div className="flex justify-between md:flex-col gap-2 md:gap-4 px-1 md:px-0">
            <button
              onClick={() => setNotesMode(!notesMode)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-full text-sm md:text-base font-medium transition-colors ${notesMode ? 'bg-[var(--chrysler-blue)] text-white shadow-md' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
            >
              <PenTool size={16} /> {notesMode ? 'Notes (ON)' : 'Notes (OFF)'}
            </button>
            <button
              onClick={eraseCell}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-full text-sm md:text-base font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              <Eraser size={16} /> Erase
            </button>
          </div>
          
          <div className="grid grid-cols-9 md:grid-cols-3 gap-1 md:gap-1.5 mt-1 px-1 md:px-0 mb-6 md:mb-0">
            {[1,2,3,4,5,6,7,8,9].map(num => (
              <button
                key={num}
                onClick={() => handleNumberInput(num)}
                className="h-10 md:h-auto md:aspect-square flex items-center justify-center text-lg md:text-3xl font-semibold bg-white dark:bg-[#111111] border border-gray-200 dark:border-gray-800 rounded-md md:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-[var(--amethyst)] transition-colors dark:text-white shadow-sm"
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        
        </div>
      </div>
    </div>
  );
}
