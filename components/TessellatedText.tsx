import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Triangle {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
  velocity: { x: number; y: number };
  char: string;
  originalX: number;
  originalY: number;
}

interface TessellatedTextProps {
  text: string;
  className?: string;
  triggerEffect?: boolean;
}

export function TessellatedText({ text, className = "", triggerEffect = false }: TessellatedTextProps) {
  const [triangles, setTriangles] = useState<Triangle[]>([]);
  const [isExploded, setIsExploded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const createTriangles = () => {
      const newTriangles: Triangle[] = [];
      const chars = text.split('');
      
      chars.forEach((char, index) => {
        // Create multiple triangles per character
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 15;
          const baseX = index * 30;
          const baseY = 0;
          
          newTriangles.push({
            id: index * 6 + i,
            x: baseX + Math.cos(angle) * radius,
            y: baseY + Math.sin(angle) * radius,
            originalX: baseX + Math.cos(angle) * radius,
            originalY: baseY + Math.sin(angle) * radius,
            size: 8 + Math.random() * 4,
            rotation: Math.random() * 360,
            color: `hsl(${(index * 45 + i * 60) % 360}, 70%, 60%)`,
            velocity: {
              x: (Math.random() - 0.5) * 200,
              y: (Math.random() - 0.5) * 200
            },
            char: i === 0 ? char : '' // Only show character on first triangle
          });
        }
      });
      
      setTriangles(newTriangles);
    };

    createTriangles();
  }, [text]);

  useEffect(() => {
    if (triggerEffect) {
      setIsExploded(true);
      setTimeout(() => setIsExploded(false), 3000);
    }
  }, [triggerEffect]);

  const handleMouseEnter = () => {
    setIsExploded(true);
    setTimeout(() => setIsExploded(false), 3000);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ height: '60px', minWidth: `${text.length * 30}px` }}
    >
      {!isExploded && (
        <motion.span
          className="absolute inset-0 flex items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {text}
        </motion.span>
      )}

      {triangles.map((triangle) => (
        <motion.div
          key={triangle.id}
          className="absolute flex items-center justify-center font-mono text-xs"
          style={{
            width: `${triangle.size}px`,
            height: `${triangle.size}px`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: triangle.color,
            color: 'white',
            textShadow: '0 0 2px rgba(0,0,0,0.8)',
          }}
          animate={isExploded ? {
            x: [triangle.originalX, triangle.originalX + triangle.velocity.x, triangle.originalX],
            y: [triangle.originalY, triangle.originalY + triangle.velocity.y, triangle.originalY],
            rotate: [triangle.rotation, triangle.rotation + 720, triangle.rotation],
            scale: [1, 0.5, 1],
            opacity: [0.8, 0.2, 0.8],
          } : {
            x: triangle.originalX,
            y: triangle.originalY,
            rotate: [triangle.rotation, triangle.rotation + 180, triangle.rotation],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: isExploded ? 3 : 4,
            ease: isExploded ? "easeOut" : "easeInOut",
            repeat: isExploded ? 0 : Infinity,
          }}
        >
          {triangle.char}
        </motion.div>
      ))}

      {/* Tessellation background pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              60deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.02) 10px,
              rgba(0,0,0,0.02) 20px
            ),
            repeating-linear-gradient(
              -60deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.02) 10px,
              rgba(0,0,0,0.02) 20px
            )
          `
        }}
        animate={{
          opacity: isExploded ? [0, 0.5, 0] : [0, 0.1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </div>
  );
}