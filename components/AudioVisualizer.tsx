import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export function AudioVisualizer() {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = barsRef.current?.children;
    if (!bars) return;

    const animateBars = () => {
      Array.from(bars).forEach((bar, index) => {
        const height = Math.random() * 60 + 10;
        const delay = Math.random() * 100;
        
        setTimeout(() => {
          (bar as HTMLElement).style.height = `${height}px`;
        }, delay);
      });
    };

    const interval = setInterval(animateBars, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end gap-1 h-16">
      <div ref={barsRef} className="flex items-end gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 bg-foreground rounded-t transition-all duration-150"
            style={{ height: '10px' }}
            initial={{ height: '2px' }}
            animate={{ 
              height: [2, Math.random() * 40 + 10, 2],
              backgroundColor: ['#000', '#333', '#000']
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              delay: i * 0.05
            }}
          />
        ))}
      </div>
    </div>
  );
}