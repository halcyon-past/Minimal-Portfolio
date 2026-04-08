import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const CODE_WORDS = [
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'break', 'default', 'true', 'false', 'null', 'undefined',
  'class', 'extends', 'super', 'this', 'new', 'import', 'export', 'from', 'as',
  'async', 'await', 'try', 'catch', 'finally', 'throw', 'yield', 'typeof',
  'console.log', 'setTimeout', 'Promise', 'resolve', 'reject', 'then',
  'map', 'filter', 'reduce', 'forEach', 'find', 'includes', 'push', 'pop',
  'useState', 'useEffect', 'useContext', 'useReducer', 'useMemo', 'useRef',
  'def', 'self', 'init', 'pass', 'yield',
  'True', 'False', 'None', 'and', 'or', 'not', 'is', 'in', 'elif',
  'except', 'raise', 'with', 'lambda', 'global', 'assert', 'del', 'print', 
  'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple'
];

const TIME_LIMIT = 30;

function generateWords(count) {
  return Array.from({ length: count }, () => CODE_WORDS[Math.floor(Math.random() * CODE_WORDS.length)]);
}

export default function TypingTestPage() {
  const [words, setWords] = useState([]);
  // Track typed values per word
  const [typedHistory, setTypedHistory] = useState([]);
  const [currentInputValue, setCurrentInputValue] = useState('');
  
  const [status, setStatus] = useState('waiting'); // waiting, playing, finished
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  
  const inputRef = useRef(null);

  useEffect(() => {
    setWords(generateWords(150));
  }, []);

  useEffect(() => {
    let interval;
    if (status === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === 'playing') {
      endGame();
    }
    return () => clearInterval(interval);
  }, [status, timeLeft]);

  const startGame = () => {
    setStatus('playing');
    setTimeLeft(TIME_LIMIT);
    setTypedHistory([]);
    setCurrentInputValue('');
    setWords(generateWords(150));
    inputRef.current?.focus();
  };

  const endGame = () => {
    setStatus('finished');
    
    // Calculate final score
    let correctChars = 0;
    let totalCharsTyped = 0;

    const allTypedWords = [...typedHistory, currentInputValue];
    
    allTypedWords.forEach((typedWord, i) => {
      if (i >= words.length || typedWord.trim() === '') return;
      const targetWord = words[i];
      
      // Count total characters typed
      totalCharsTyped += typedWord.length;
      
      // Count correct characters up to the length of the shortest string
      const minLen = Math.min(typedWord.length, targetWord.length);
      for (let j = 0; j < minLen; j++) {
        if (typedWord[j] === targetWord[j]) {
          correctChars++;
        }
      }
      // Add a space to both total and correct if they finished the word correctly
      if (typedWord === targetWord) {
        correctChars++; 
      }
      totalCharsTyped++; // space bar press
    });

    const timeInMins = TIME_LIMIT / 60;
    setWpm(Math.round((correctChars / 5) / timeInMins));
    setAccuracy(totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 0);
  };

  const handleInputChange = (e) => {
    if (status === 'finished' || status === 'waiting') return;

    const value = e.target.value;
    
    // Check if user hit space
    if (value.endsWith(' ')) {
      // Save current word to history, move to next
      setTypedHistory([...typedHistory, currentInputValue]);
      setCurrentInputValue('');
      
      // Auto-load more words if near the end
      if (typedHistory.length > words.length - 20) {
        setWords((prev) => [...prev, ...generateWords(50)]);
      }
    } else {
      setCurrentInputValue(value);
    }
  };

  // Prevent default scroll behavior for spacebar in some browsers
  const handleKeyDown = (e) => {
    if (e.key === ' ' && currentInputValue === '') {
      e.preventDefault();
    }
  };

  const handleShare = async () => {
    const shareText = `🚀 Just hit ${wpm} WPM with ${accuracy}% accuracy on the Developer Typing Test! ⌨️\n\nCan you code faster? 💻 \nTry to beat my score on Aritro's Portfolio:\nhttps://www.aritro.cloud/play/typing-test`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Developer Typing Test Score\n`,
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Score and link copied to clipboard! Share it with your friends!');
    }
  };

  const currentWordIndex = typedHistory.length;

  return (
    <div 
      className="relative max-w-5xl mx-auto px-4 py-12 md:py-20 min-h-[85vh] flex flex-col justify-start md:justify-center items-center font-sans"
      onClick={() => {
        if (status !== 'finished') inputRef.current?.focus();
      }}
    >
      {/* Back button */}
      <div className="w-full flex justify-start mb-6 relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link 
            to="/play"
            className="text-gray-500 hover:text-[var(--amethyst)] flex items-center gap-2 transition-colors text-sm md:text-base font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md hover:border-[var(--amethyst)]/30"
          >
            <i className="fas fa-arrow-left"></i> Back to Arcade
          </Link>
        </motion.div>
      </div>

      {/* Hidden input for mobile keyboard support and exact tracking */}
      <input
        type="text"
        className="opacity-0 absolute top-0 left-0 w-full h-full -z-10 cursor-default"
        value={currentInputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        autoFocus
      />

      <motion.div 
        className="w-full bg-white rounded-xl shadow-xl border border-gray-200 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Terminal Header */}
        <div className="bg-gray-50 px-4 py-3 flex items-center border-b border-gray-200 relative">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <span className="text-xs text-gray-500 font-mono">bash - dev-speed-test</span>
          </div>
        </div>

        <div className="p-6 md:p-10 text-gray-800 font-mono relative">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1"><span className="text-[var(--amethyst)]">~/</span> Developer Speed Test</h1>
              <p className="text-gray-500 text-sm md:text-base">Type the keywords as fast as you can.</p>
            </div>
            <div className="text-right">
              <div className={`text-4xl md:text-5xl font-bold ${timeLeft <= 5 && status === 'playing' ? 'text-red-500 animate-pulse' : 'text-[var(--amethyst)]'}`}>
                {timeLeft}s
              </div>
            </div>
          </div>

          {status === 'finished' ? (
            <AnimatePresence>
              <motion.div 
                className="text-center py-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">Simulation Complete</h2>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 mb-12">
                  <div className="bg-gray-50 px-10 py-6 rounded-xl flex flex-col min-w-[200px] border-t-2 border-[var(--chrysler-blue)] shadow-sm">
                    <span className="text-gray-500 text-sm uppercase tracking-wider mb-2">Speed</span>
                    <span className="text-5xl md:text-6xl font-bold text-gray-900">{wpm} <span className="text-2xl text-[var(--chrysler-blue)]">WPM</span></span>
                  </div>
                  <div className="bg-gray-50 px-10 py-6 rounded-xl flex flex-col min-w-[200px] border-t-2 border-[#27c93f] shadow-sm">
                    <span className="text-gray-500 text-sm uppercase tracking-wider mb-2">Precision</span>
                    <span className="text-5xl md:text-6xl font-bold text-gray-900">{accuracy}<span className="text-3xl text-[#27c93f]">%</span></span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                    className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors w-full sm:w-auto border border-gray-300"
                  >
                    <i className="fas fa-redo mr-2 text-sm"></i> Try Again
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleShare(); }}
                    className="px-8 py-3.5 bg-[var(--amethyst)] hover:bg-[var(--chrysler-blue)] text-white font-medium rounded-lg shadow-lg shadow-[var(--amethyst)]/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-share-nodes text-sm"></i> Challenge Friends
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="relative text-xl md:text-3xl leading-[1.8] min-h-[160px] md:min-h-[220px]">
              
              {status === 'waiting' && (
                <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-[2px] bg-white/40 rounded-lg">
                  <button 
                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                    className="text-[var(--amethyst)] px-6 py-3 border-2 border-[var(--amethyst)]/50 rounded-lg bg-white/90 font-medium animate-pulse shadow-lg flex items-center gap-3 hover:bg-[var(--amethyst)] hover:text-white transition-colors cursor-pointer"
                  >
                    <i className="fas fa-keyboard"></i> Start Typing
                  </button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-x-4 gap-y-3 opacity-90 blur-[0.3px]">
                {words.slice(Math.max(0, currentWordIndex - 10), currentWordIndex + 25).map((word, wIdx) => {
                  const actualIndex = Math.max(0, currentWordIndex - 10) + wIdx;
                  const isCurrent = actualIndex === currentWordIndex;
                  const isPast = actualIndex < currentWordIndex;
                  
                  let wordColorClass = 'text-gray-400 font-medium';
                  const typedWord = isPast ? typedHistory[actualIndex] : isCurrent ? currentInputValue : '';
                  
                  // Past word coloring (Correct or Wrong word entirely)
                  if (isPast) {
                    wordColorClass = typedWord === word ? 'text-green-600' : 'text-red-500 underline decoration-red-500/50 decoration-2';
                  }

                  return (
                    <div 
                      key={actualIndex} 
                      className={`relative flex ${isCurrent ? 'bg-gray-100 rounded px-1 -mx-1' : ''}`} // highlight box for current word
                    >
                      {/* Base word */}
                      <span className={wordColorClass}>
                        {word.split('').map((char, cIdx) => {
                          let charClass = '';
                          
                          if (isCurrent) {
                            if (cIdx < typedWord.length) {
                              const isCorrect = typedWord[cIdx] === word[cIdx];
                              charClass = isCorrect ? 'text-gray-900' : 'text-red-600 bg-red-100';
                            } else if (cIdx === typedWord.length) {
                              // Next character marker
                              charClass = 'text-gray-500 relative';
                            } else {
                              charClass = 'text-gray-400';
                            }
                          }
                          return (
                            <span key={cIdx} className={charClass}>
                              {char}
                              {/* Blinking cursor */}
                              {isCurrent && cIdx === typedWord.length && (
                                <span className={`absolute -bottom-1 left-0 w-full h-[3px] bg-[var(--amethyst)] animate-pulse`}></span>
                              )}
                            </span>
                          );
                        })}
                        {/* Overflow cursor (typing more chars than the word has) */}
                        {isCurrent && typedWord.length >= word.length && (
                          <span className="text-red-600 bg-red-100 relative">
                            {typedWord.slice(word.length)}
                            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-red-600 animate-pulse"></span>
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}