import { useState, useEffect } from 'react';
import CurvyTextAnimation from './CurvyTextAnimation';

export default function Hero() {
  const [introState, setIntroState] = useState('initial');
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const initialTimer = setTimeout(() => {
      setIntroState('intro');
      
      const startTimer = setTimeout(() => {
        setIntroState('transitioning');
        
        const completeTimer = setTimeout(() => {
          setIntroState('complete');
          document.body.style.overflow = '';
        }, 400);
        
        return () => clearTimeout(completeTimer);
      }, 1500);
      
      return () => clearTimeout(startTimer);
    }, 100);
    
    return () => {
      clearTimeout(initialTimer);
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <>
      {/* Intro Animation */}
      {introState !== 'complete' && (
        <div 
          className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-all duration-500 ease-in-out ${
            introState === 'transitioning' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <span 
            className={`text-[var(--amethyst)] font-light text-6xl md:text-8xl transition-all duration-600 transform text-center ${
              introState === 'initial' ? 'scale-0 opacity-0' : 
              introState === 'transitioning' ? 'scale-50 -translate-y-16 -translate-x-8' : 'scale-100 opacity-100'
            }`}
            style={{ transformOrigin: 'center' }}
          >
            Welcome!! Discover what's next...
          </span>
        </div>
      )}
      
      {/* Main Content */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative bg-white cursor-default">
        <div className="container mx-auto px-4 md:px-8">
          <h1 
            className={`text-4xl md:text-6xl font-medium mb-8 text-gray-900 transition-all duration-500 ${
              introState === 'complete' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Hi, I'm <span className="text-[var(--amethyst)] font-semibold">Aritro Saha</span>.
          </h1>
          
          <p 
            className={`text-lg md:text-xl max-w-3xl text-gray-700 transition-opacity duration-500 delay-100 ${
              introState === 'complete' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            A <span className="font-medium">versatile</span> <span className="font-medium">full-stack developer</span> and <span className="font-medium">data science engineer</span> focused on creating <span className="font-medium">unique</span> and <span className="bg-[var(--chrysler-blue)] text-[var(--honeydew)] font-medium px-1 rounded">user-centric products</span>, currently working at <span className="font-medium">Bristol Myers Squibb</span>.
          </p>
        </div>
        
        <div 
          className={`transition-opacity duration-500 delay-200 ${
            introState === 'complete' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CurvyTextAnimation />
        </div>
      </section>
    </>
  );
}
