import { useRef, useEffect } from 'react';

export default function CurvyTextAnimation() {
  const curvedTextRef = useRef(null);

  useEffect(() => {
    if (curvedTextRef.current) {
      let animationId;
      let position = 0;
      const animate = () => {
        position -= 0.1;
        if (position <= -100) {
          position += 100;
        }
        if (curvedTextRef.current) {
          const textPath = curvedTextRef.current.querySelector('textPath');
          if (textPath) {
            textPath.setAttribute('startOffset', `${position}%`);
          }
        }
        animationId = requestAnimationFrame(animate);
      };
      animationId = requestAnimationFrame(animate);
      return () => {
        cancelAnimationFrame(animationId);
      };
    }
  }, []);

  return (
    <div className="w-full h-64 mt-12 relative overflow-hidden" ref={curvedTextRef}>
      <svg viewBox="0 0 1000 300" className="w-full h-full">
        <path
          id="curve"
          d="M-400,150 C100,0 400,300 900,150 S1900,0 1400,150"
          fill="transparent"
        />
        <text className="text-8xl md:text-6xl font-bold">
          <textPath xlinkHref="#curve" startOffset="0%">
            <tspan style={{ fill: 'var(--chrysler-blue)' }} className="font-bold">explore my projects ↓ </tspan>
            <tspan style={{ fill: 'var(--amethyst)' }} className="font-bold">explore my projects ↓ </tspan>
            <tspan style={{ fill: '#6b7280' }} className="font-bold">explore my projects ↓ </tspan>
            <tspan style={{ fill: '#9ca3af' }} className="font-bold">explore my projects ↓ </tspan>
            {/* ...repeat as needed... */}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
