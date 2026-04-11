import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy, Cpu, User, Play, Settings } from 'lucide-react';
import PageTransition from '../../components/common/PageTransition';

const PythonLogo = ({ className }) => (
  <svg viewBox="0 0 110 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#3776AB" d="M54.7,12.7c-21.7,0-20.7,9.4-20.7,9.4l0,9.9h21.2v3.1H32.6C22.6,35.1,20,41,20,53.3c0,12.3,2.2,18.8,11.5,18.8h5.3v-9c0-10.4,8.6-18.9,18.9-18.9h20.5V31.3C76.2,20.8,69.5,12.7,54.7,12.7z M46.4,22.2c2.1,0,3.8,1.7,3.8,3.8c0,2.1-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8S44.3,22.2,46.4,22.2z"/>
    <path fill="#FFD43B" d="M55.3,97.3c21.7,0,20.7-9.4,20.7-9.4l0-9.9H54.8v-3.1h22.6c10,0,12.6-5.9,12.6-18.2c0-12.3-2.2-18.8-11.5-18.8h-5.3v9.2c0,10.2-8.6,18.7-18.9,18.7H33.8V79C33.8,89.5,40.5,97.3,55.3,97.3z M63.6,87.8c-2.1,0-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C67.4,86,65.7,87.8,63.6,87.8z"/>
  </svg>
);

const JavaLogo = ({ className }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#E76F00" d="M68.5,88.7c-9.1,5.5-22.7,5.7-34.1,2C47.4,98.6,60,95.5,68.5,88.7z"/>
    <path fill="#5382A1" d="M71.7,78.2c-15.5-2.2-22.6,3.3-33.1,3.5C26.5,82.1,19.2,74.8,25.4,68c-10,5.8-0.9,15.6,12.1,17C49.9,86.4,59.3,77.5,71.7,78.2z"/>
    <path fill="#5382A1" d="M78.6,66c-17.7-1.4-23.9,6-35.4,7.2c-14.7,1.4-19.9-6-16.1-13c-7.9,8-2.6,18,11.8,18C51,88,61.9,76.5,78.6,66z"/>
    <path fill="#E76F00" d="M65.7,53.4C63.2,46.7,55,42.7,51.6,35c-3.1-6.9-0.8-10.8,0.7-14.8c1.3-3.6-2.5-6.9-5.1-4c-6.8,7.7-1.3,16.5,2.4,23.3C52.9,45.4,60.6,48.1,65.7,53.4z"/>
    <path fill="#E76F00" d="M54.1,64.2c-1-5-6-7.8-8.2-12.8c-2-4.5-0.1-8,0.8-11.4c0.8-2.8-2.3-5-4.4-2.5c-4.9,5.7-0.9,13.6,1.4,18.9C45.2,60.3,50,62,54.1,64.2z"/>
    <path fill="#5382A1" d="M85.7,85.2c1.7,3,3,7.9-1.9,8.5c-8.9,1.2-13.6-4.5-9.3-6.5c-7,3.5,6.1,11,14.6,7C94.2,91.8,87.8,85.6,85.7,85.2z"/>
  </svg>
);

export default function TicTacToePage() {
  const [status, setStatus] = useState('config'); // 'config', 'playing', 'ended'
  const [board, setBoard] = useState(Array(9).fill(null)); // 'Python' or 'Java'
  const [userPlays, setUserPlays] = useState('Python'); // Chosen by user
  const [currentTurn, setCurrentTurn] = useState('Python'); 
  const [difficulty, setDifficulty] = useState('hard');
  const [winner, setWinner] = useState(null);
  
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const calculateWinner = (squares) => {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    if (!squares.includes(null)) return 'Draw';
    return null;
  };

  const aiPlays = userPlays === 'Python' ? 'Java' : 'Python';

  useEffect(() => {
    if (status === 'playing' && currentTurn === aiPlays && !winner) {
        const aiMoveTimer = setTimeout(() => {
            makeAIMove();
        }, 800 + Math.random() * 400); // More seamless, ~1 second thinking delay
        return () => clearTimeout(aiMoveTimer);
    }
  }, [currentTurn, winner, difficulty, status, aiPlays]);

  useEffect(() => {
      if (winner && status === 'playing') {
          setStatus('ended');
      }
  }, [winner, status]);

  const startGame = () => {
    setBoard(Array(9).fill(null));
    // Randomize who goes first
    const goFirst = Math.random() > 0.5 ? 'Python' : 'Java';
    setCurrentTurn(goFirst);
    setWinner(null);
    setStatus('playing');
  };

  const openConfig = () => {
      setStatus('config');
  };

  const makeAIMove = () => {
    const squares = [...board];
    let bestMove;
    
    if (difficulty === 'easy') {
        const availableMoves = squares.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
        bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
        bestMove = minimax(squares, aiPlays).index;
    }

    if (bestMove !== undefined && bestMove !== null) {
        squares[bestMove] = aiPlays;
        setBoard(squares);
        setCurrentTurn(userPlays); // switch back to user
        setWinner(calculateWinner(squares));
    }
  };

  const minimax = (newBoard, player) => {
    const availSpots = newBoard.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);

    const calcWin = calculateWinner(newBoard);
    if (calcWin === userPlays) return { score: -10 };
    else if (calcWin === aiPlays) return { score: 10 };
    else if (availSpots.length === 0) return { score: 0 };

    const moves = [];

    for (let i = 0; i < availSpots.length; i++) {
        const move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;

        if (player === aiPlays) {
            const result = minimax(newBoard, userPlays);
            move.score = result.score;
        } else {
            const result = minimax(newBoard, aiPlays);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = null;
        moves.push(move);
    }

    let bestMove;
    if (player === aiPlays) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
  };

  const handleClick = (i) => {
    if (board[i] || winner || currentTurn !== userPlays || status !== 'playing') return;

    const squares = [...board];
    squares[i] = userPlays;
    setBoard(squares);
    setCurrentTurn(aiPlays);
    setWinner(calculateWinner(squares));
  };

  const getWinMessage = () => {
    if (winner === userPlays) return `${userPlays} prevailed against the AI.`;
    if (winner === aiPlays) return `${aiPlays} outsmarted you this time.`;
    return "A perfectly played stalemate.";
  };

  return (
    <PageTransition>
      <div className="relative max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-[85vh] flex flex-col justify-start items-center font-sans mt-16 md:mt-20">
        
        <div className="w-full flex justify-start mb-4 relative z-10">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/play" className="text-gray-500 dark:text-gray-400 hover:text-purple-500 flex items-center gap-2 transition-colors text-sm md:text-base font-medium bg-white dark:bg-gray-950 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md">
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
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Tic Tac <span className="text-purple-500">Toe</span></h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Can you battle the AI? You are {userPlays}, AI is {aiPlays}.</p>
                </div>
                {status !== 'config' && (
                    <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Difficulty: <span className="text-lg text-purple-500">{difficulty}</span></div>
                    </div>
                )}
            </div>

            <div className="flex justify-center mb-6">
                {status === 'playing' && !winner && (
                    <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTurn}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`text-xl font-semibold px-4 py-1 inline-flex items-center justify-center gap-2 rounded-full border ${
                        currentTurn === userPlays ? 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400' : 'bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400'
                        }`}
                    >
                        {currentTurn === userPlays ? (
                            <>{userPlays === 'Python' ? <PythonLogo className="w-5 h-5" /> : <JavaLogo className="w-5 h-5" />} Your Turn</>
                        ) : (
                            <>{aiPlays === 'Python' ? <PythonLogo className="w-5 h-5" /> : <JavaLogo className="w-5 h-5" />} AI is thinking...</>
                        )}
                    </motion.div>
                    </AnimatePresence>
                )}
                {status === 'config' && (
                    <div className="h-[36px]"></div> /* Placeholder to prevent layout shift */
                )}
            </div>

            <div className={`relative w-full max-w-sm mx-auto bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 md:p-4 touch-none mb-4 ${status !== 'config' ? 'aspect-square' : ''}`}>
                
                {status === 'config' ? (
                    <div className="flex flex-col items-center justify-center rounded-lg py-4">
                      <Cpu className="w-12 h-12 text-purple-500 mb-4 drop-shadow-md" />
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">Settings</h2>
                      
                      <div className="w-full mb-4">
                          <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block text-center">Character</label>
                          <div className="flex gap-2 justify-center">
                              <button onClick={() => setUserPlays('Python')} className={`flex flex-col items-center gap-2 px-6 py-4 rounded-lg font-bold border-2 transition-colors w-1/2 ${userPlays === 'Python' ? 'bg-blue-500/20 border-blue-500 text-blue-600 dark:text-blue-400' : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-blue-500/30'}`}>
                                  <PythonLogo className="w-8 h-8" /> <span>Python</span>
                              </button>
                              <button onClick={() => setUserPlays('Java')} className={`flex flex-col items-center gap-2 px-6 py-4 rounded-lg font-bold border-2 transition-colors w-1/2 ${userPlays === 'Java' ? 'bg-orange-500/20 border-orange-500 text-orange-600 dark:text-orange-400' : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-orange-500/30'}`}>
                                  <JavaLogo className="w-8 h-8" /> <span>Java</span>
                              </button>
                          </div>
                      </div>

                      <div className="w-full mb-6">
                          <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block text-center">Difficulty</label>
                          <div className="flex gap-2 justify-center">
                              <button onClick={() => setDifficulty('easy')} className={`px-4 py-3 flex-1 rounded-lg font-bold border-2 transition-colors ${difficulty === 'easy' ? 'bg-purple-500/20 border-purple-500 text-purple-600 dark:text-purple-400' : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-purple-500/30'}`}>
                                  Easy
                              </button>
                              <button onClick={() => setDifficulty('hard')} className={`px-4 py-3 flex-1 rounded-lg font-bold border-2 transition-colors ${difficulty === 'hard' ? 'bg-purple-500/20 border-purple-500 text-purple-600 dark:text-purple-400' : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-purple-500/30'}`}>
                                  Hard
                              </button>
                          </div>
                      </div>

                      <button onClick={startGame} className="flex items-center justify-center gap-2 px-8 py-3 bg-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all w-full max-w-[200px]">
                        <Play className="w-5 h-5" /> Play Now
                      </button>
                    </div>
                ) : (
                    <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2">
                        {board.map((cell, idx) => (
                            <motion.div
                                key={idx}
                                onClick={() => handleClick(idx)}
                                className={`w-full h-full bg-white dark:bg-gray-800 border-2 dark:border-gray-700 rounded-lg flex items-center justify-center font-bold overflow-hidden p-4 md:p-6
                                    ${!cell && !winner && currentTurn === userPlays && status === 'playing' ? 'cursor-pointer border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750 hover:shadow-md' : ''}
                                    ${cell ? 'shadow-inner border-gray-100 dark:border-gray-750' : ''}
                                `}
                                whileHover={!cell && !winner && currentTurn === userPlays && status === 'playing' ? { scale: 0.95 } : {}}
                                whileTap={!cell && !winner && currentTurn === userPlays && status === 'playing' ? { scale: 0.9 } : {}}
                            >
                                {cell === 'Python' && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="w-full h-full drop-shadow-md flex items-center justify-center"
                                    >
                                        <PythonLogo className="w-full h-full opacity-90" />
                                    </motion.div>
                                )}
                                {cell === 'Java' && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: 45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="w-full h-full drop-shadow-md flex items-center justify-center"
                                    >
                                        <JavaLogo className="w-full h-full opacity-90" />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {status === 'ended' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-lg z-10 p-4"
                    >
                        <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-xl shadow-2xl text-center w-full max-w-[300px] border border-purple-500/30 flex flex-col items-center">
                            {winner === userPlays ? (
                                <><Trophy className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 mx-auto mb-4" />
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">You Win!</h2></>
                            ) : winner === aiPlays ? (
                                <><Cpu className="w-12 h-12 md:w-16 md:h-16 text-orange-500 mx-auto mb-4" />
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">AI Wins!</h2></>
                            ) : (
                                <><User className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">Draw!</h2></>
                            )}
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">{getWinMessage()}</p>
                            
                            <div className="flex flex-col gap-3 w-full">
                                <button
                                    onClick={startGame}
                                    className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors shadow-md"
                                >
                                    <RefreshCw className="w-4 h-4 md:w-5 md:h-5" /> Play Again
                                </button>
                                <button
                                    onClick={openConfig}
                                    className="w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Settings className="w-4 h-4 md:w-5 md:h-5" /> Settings
                                </button>
                            </div>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
