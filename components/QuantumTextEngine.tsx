import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface QuantumState {
  text: string;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  rotation: number;
  dimension: number;
  phase: number;
}

interface QuantumTextEngineProps {
  baseText: string;
  className?: string;
}

export function QuantumTextEngine({ baseText, className = "" }: QuantumTextEngineProps) {
  const [quantumStates, setQuantumStates] = useState<QuantumState[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Create multiple quantum states for the text
    const states: QuantumState[] = [];
    const stateCount = 8;

    for (let i = 0; i < stateCount; i++) {
      states.push({
        text: baseText,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        opacity: 0.1 + Math.random() * 0.3,
        scale: 0.8 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        dimension: i,
        phase: (i / stateCount) * Math.PI * 2
      });
    }

    setQuantumStates(states);

    // Quantum collapse and restoration cycle
    const collapseInterval = setInterval(() => {
      setCollapsed(true);
      setTimeout(() => setCollapsed(false), 1000);
    }, 5000);

    return () => clearInterval(collapseInterval);
  }, [baseText]);

  const handleHover = () => {
    setCollapsed(true);
    setTimeout(() => setCollapsed(false), 500);
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleHover}
      style={{ perspective: '1000px' }}
    >
      {/* Primary text */}
      <motion.span
        className="relative z-10"
        animate={collapsed ? { scale: 1, opacity: 1 } : { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
        transition={{ duration: 0.5 }}
      >
        {baseText}
      </motion.span>

      {/* Quantum states */}
      {!collapsed && quantumStates.map((state, index) => (
        <motion.span
          key={state.dimension}
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            color: `hsl(${(state.dimension * 45) % 360}, 50%, 50%)`,
            filter: `blur(${Math.abs(state.dimension - 4) * 0.5}px)`,
          }}
          animate={{
            x: [state.x, state.x + Math.sin(state.phase) * 20, state.x],
            y: [state.y, state.y + Math.cos(state.phase) * 20, state.y],
            scale: [state.scale, state.scale * 1.1, state.scale],
            rotate: [state.rotation, state.rotation + 30, state.rotation],
            opacity: [state.opacity, state.opacity * 0.5, state.opacity],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
          }}
        >
          {baseText}
        </motion.span>
      ))}

      {/* Quantum field visualization */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)',
            'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%)',
            'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}