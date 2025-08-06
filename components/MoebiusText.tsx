import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface MoebiusTextProps {
  text: string;
  className?: string;
}

export function MoebiusText({ text, className = "" }: MoebiusTextProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.02);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const chars = text.split('');

  return (
    <div className={`relative inline-block ${className}`} style={{ perspective: '1000px' }}>
      {chars.map((char, index) => {
        const t = (index / chars.length) * Math.PI * 2 + time;
        
        // Möbius strip parametric equations
        const u = t;
        const v = Math.sin(time * 2 + index * 0.5) * 0.3;
        
        const x = (1 + v/2 * Math.cos(u/2)) * Math.cos(u) * 20;
        const y = (1 + v/2 * Math.cos(u/2)) * Math.sin(u) * 20;
        const z = v/2 * Math.sin(u/2) * 20;
        
        // Rotation based on position on strip
        const rotateX = Math.sin(u/2) * 180;
        const rotateY = u * 180 / Math.PI;
        const rotateZ = Math.cos(u/2) * 90;

        return (
          <motion.span
            key={index}
            className="absolute font-mono"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: 'center',
              color: `hsl(${(t * 50 + index * 30) % 360}, 70%, 60%)`,
              textShadow: `0 0 10px hsl(${(t * 50 + index * 30) % 360}, 70%, 60%)`,
              zIndex: Math.floor(z + 100),
            }}
            animate={{
              x: x,
              y: y,
              rotateX: rotateX,
              rotateY: rotateY,
              rotateZ: rotateZ,
              scale: 1 + Math.sin(time * 3 + index) * 0.3,
            }}
            transition={{
              duration: 0,
              ease: "linear"
            }}
          >
            {char}
          </motion.span>
        );
      })}

      {/* Möbius strip wireframe */}
      <svg 
        className="absolute inset-0 pointer-events-none"
        style={{ width: '200px', height: '200px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <defs>
          <path
            id="moebiusPath"
            d="M 100,100 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
            fill="none"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="1"
          />
        </defs>
        <motion.use
          href="#moebiusPath"
          animate={{
            rotate: time * 30,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
}