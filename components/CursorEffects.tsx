import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface CursorTrail {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export function CursorEffects() {
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const trailId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: CursorTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailId.current++,
        timestamp: Date.now()
      };

      setTrails(prev => [...prev, newTrail].slice(-15)); // Keep only last 15 trails
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const cleanupTrails = () => {
      const now = Date.now();
      setTrails(prev => prev.filter(trail => now - trail.timestamp < 2000));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    const cleanupInterval = setInterval(cleanupTrails, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      clearInterval(cleanupInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {trails.map((trail, index) => {
        const age = Date.now() - trail.timestamp;
        const opacity = Math.max(0, 1 - age / 2000);
        const scale = Math.max(0.2, 1 - age / 2000);

        return (
          <motion.div
            key={trail.id}
            className="absolute"
            style={{
              left: trail.x,
              top: trail.y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: opacity * 0.6,
              scale: scale,
              rotate: index * 45
            }}
            transition={{ duration: 0.1 }}
          >
            {/* Different shapes for different trail positions */}
            {index % 4 === 0 && (
              <div className={`w-2 h-2 border border-foreground/40 ${isClicking ? 'bg-foreground/20' : ''}`} 
                   style={{ transform: 'rotate(45deg)' }} />
            )}
            {index % 4 === 1 && (
              <div className={`w-3 h-1 bg-foreground/40 ${isClicking ? 'bg-foreground/60' : ''}`} />
            )}
            {index % 4 === 2 && (
              <div className={`w-2 h-2 rounded-full bg-foreground/40 ${isClicking ? 'bg-foreground/60' : ''}`} />
            )}
            {index % 4 === 3 && (
              <div className="w-3 h-3 relative">
                <div className={`absolute inset-0 border border-foreground/40 ${isClicking ? 'border-foreground/60' : ''}`} 
                     style={{ 
                       clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                     }} />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}