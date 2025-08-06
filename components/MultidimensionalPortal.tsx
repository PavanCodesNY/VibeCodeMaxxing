import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Portal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  depth: number;
  text: string;
  emerging: boolean;
}

interface MultidimensionalPortalProps {
  texts: string[];
  className?: string;
}

export function MultidimensionalPortal({ texts, className = "" }: MultidimensionalPortalProps) {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [activePortal, setActivePortal] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createPortals = () => {
      const newPortals: Portal[] = texts.map((text, index) => ({
        id: index,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
        depth: Math.random() * 100,
        text,
        emerging: false
      }));
      setPortals(newPortals);
    };

    createPortals();

    // Activate portals randomly
    const activationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * texts.length);
      setActivePortal(randomIndex);
      
      setPortals(prev => prev.map(portal => 
        portal.id === randomIndex 
          ? { ...portal, emerging: true }
          : { ...portal, emerging: false }
      ));

      setTimeout(() => {
        setActivePortal(null);
        setPortals(prev => prev.map(portal => ({ ...portal, emerging: false })));
      }, 3000);
    }, 4000);

    return () => clearInterval(activationInterval);
  }, [texts]);

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
    >
      {portals.map((portal) => (
        <motion.div
          key={portal.id}
          className="absolute"
          style={{
            left: `${portal.x}px`,
            top: `${portal.y}px`,
            transformOrigin: 'center',
          }}
          animate={{
            rotateX: [0, 360, 0],
            rotateY: [0, -360, 0],
            rotateZ: [portal.rotation, portal.rotation + 180, portal.rotation],
            scale: portal.emerging ? [0, 1.5, 1] : [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: portal.emerging ? 3 : 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: portal.id * 0.5
          }}
        >
          {/* Portal ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{
              width: `${portal.size}px`,
              height: `${portal.size}px`,
              borderColor: `hsl(${(portal.depth * 3.6) % 360}, 70%, 50%)`,
              boxShadow: `0 0 ${portal.size/2}px hsl(${(portal.depth * 3.6) % 360}, 70%, 50%)`,
            }}
            animate={{
              borderWidth: portal.emerging ? [2, 8, 2] : [1, 3, 1],
              opacity: portal.emerging ? [0.3, 1, 0.3] : [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Emerging text */}
          {portal.emerging && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center font-mono text-xs whitespace-nowrap"
              style={{
                color: `hsl(${(portal.depth * 3.6) % 360}, 70%, 50%)`,
                textShadow: `0 0 10px hsl(${(portal.depth * 3.6) % 360}, 70%, 50%)`,
              }}
              initial={{ 
                scale: 0, 
                rotateZ: 180, 
                z: -200,
                opacity: 0 
              }}
              animate={{ 
                scale: [0, 2, 1], 
                rotateZ: [180, 0, 0], 
                z: [200, 0, 0],
                opacity: [0, 1, 0.8]
              }}
              transition={{ 
                duration: 3,
                ease: "easeOut"
              }}
            >
              {portal.text}
            </motion.div>
          )}

          {/* Portal vortex effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(from ${portal.rotation}deg, transparent, hsl(${(portal.depth * 3.6) % 360}, 70%, 50%), transparent)`,
              opacity: 0.1,
            }}
            animate={{
              rotate: [0, 360],
              scale: portal.emerging ? [1, 1.5, 1] : [0.5, 1, 0.5],
            }}
            transition={{
              duration: portal.emerging ? 2 : 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}