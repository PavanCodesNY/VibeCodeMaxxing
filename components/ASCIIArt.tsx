import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface ASCIIArtProps {
  className?: string;
}

export function ASCIIArt({ className = "" }: ASCIIArtProps) {
  const [currentArt, setCurrentArt] = useState(0);

  const asciiArts = [
    `
    ╭─────────────────────────────────────╮
    │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
    │  ░░██╗░░██╗███████╗██╗░░░░░░░░░░░░░ │
    │  ░░██║░░██║██╔════╝██║░░░░░░░░░░░░░ │
    │  ░░███████║█████╗░░██║░░░░░░░░░░░░░ │
    │  ░░██╔══██║██╔══╝░░██║░░░░░░░░░░░░░ │
    │  ░░██║░░██║███████╗███████╗░░░░░░░ │
    │  ░░╚═╝░░╚═╝╚══════╝╚══════╝░░░░░░░ │
    │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
    ╰─────────────────────────────────────╯
    `,
    `
    ╭─────────────────────────────────────╮
    │     ██████╗ ███████╗██╗   ██╗       │
    │     ██╔══██╗██╔════╝██║   ██║       │
    │     ██║  ██║█████╗  ██║   ██║       │
    │     ██║  ██║██╔══╝  ╚██╗ ██╔╝       │
    │     ██████╔╝███████╗ ╚████╔╝        │
    │     ╚═════╝ ╚══════╝  ╚═══╝         │
    ╰─────────────────────────────────────╯
    `,
    `
    ╭─────────────────────────────────────╮
    │   ┌─┐┬─┐┌─┐┌─┐┌┬┐┬┬  ┬┌─┐          │
    │   │  ├┬┘├┤ ├─┤ │ │└┐┌┘├┤           │
    │   └─┘┴└─└─┘┴ ┴ ┴ ┴ └┘ └─┘          │
    │                                     │
    │   ╔╦╗┌─┐┬  ┬┌─┐┬  ┌─┐┌─┐┌─┐┬─┐     │
    │    ║║├┤ └┐┌┘├┤ │  │ │├─┘├┤ ├┬┘     │
    │   ═╩╝└─┘ └┘ └─┘┴─┘└─┘┴  └─┘┴└─     │
    ╰─────────────────────────────────────╯
    `
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentArt((prev) => (prev + 1) % asciiArts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={`font-mono text-xs leading-none select-none ${className}`}
      key={currentArt}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <pre className="text-foreground/60">
        {asciiArts[currentArt]}
      </pre>
    </motion.div>
  );
}