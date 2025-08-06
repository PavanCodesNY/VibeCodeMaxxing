import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
  effect: string;
  delay: number;
}

export function FloatingTextElements() {
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  const creativeTexts = [
    '/* creative */',
    '<innovation/>',
    'function magic()',
    '=> dreams',
    '{ pixels }',
    'async art()',
    'return beauty;',
    '.creativity { ∞ }',
    'export default awesome',
    'import { inspiration }',
    '// TODO: Change the world',
    'const passion = true;',
    'while(coding) { smile }',
    'try { everything }',
    'catch(bugs) { fix }',
    'if(creative) { succeed }',
    'class Genius extends Me',
    'npm install dreams',
    'git commit -m "magic"',
    'yarn add creativity',
  ];

  const effects = [
    'morphing-text',
    'prismatic-text', 
    'laser-scan',
    'digital-dissolve',
    'wireframe-text',
    'static-text',
    'binary-cascade'
  ];

  useEffect(() => {
    const generateFloatingTexts = () => {
      const texts: FloatingText[] = [];
      for (let i = 0; i < 8; i++) {
        texts.push({
          id: i,
          text: creativeTexts[Math.floor(Math.random() * creativeTexts.length)],
          x: Math.random() * 90 + 5, // 5% to 95% of screen width
          y: Math.random() * 90 + 5, // 5% to 95% of screen height
          effect: effects[Math.floor(Math.random() * effects.length)],
          delay: Math.random() * 3
        });
      }
      setFloatingTexts(texts);
    };

    generateFloatingTexts();
    
    // Regenerate floating texts every 30 seconds
    const interval = setInterval(generateFloatingTexts, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {floatingTexts.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute font-mono text-xs text-foreground/20 ${item.effect}`}
          data-text={item.text}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0.2, 0],
            scale: [0, 1, 1.1, 0],
            rotate: [0, 360, -360, 0],
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 50 - 25, Math.random() * 100 - 50, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {item.text}
        </motion.div>
      ))}
    </div>
  );
}