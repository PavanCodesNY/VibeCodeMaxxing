import { Button } from "./ui/button";
import { ArrowDown, Terminal, Code, Zap } from "lucide-react";
import { Typewriter } from "./Typewriter";
import { AnimatedText } from "./AnimatedText";
import { ASCIIArt } from "./ASCIIArt";
import { AudioVisualizer } from "./AudioVisualizer";
import { InteractiveCode } from "./InteractiveCode";
import { Terminal as TerminalComponent } from "./Terminal";
import { QuantumTextEngine } from "./QuantumTextEngine";
import { MultidimensionalPortal } from "./MultidimensionalPortal";
import { TessellatedText } from "./TessellatedText";
import { MoebiusText } from "./MoebiusText";
import { motion } from 'motion/react';
import { useState } from 'react';

export function Hero() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const professions = [
    "Creative Developer",
    "Digital Architect", 
    "Code Artist",
    "UI Wizard",
    "Tech Innovator",
    "Design Engineer",
    "Problem Solver",
    "Pixel Perfectionist"
  ];

  const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden">
      {/* Animated background grid with matrix effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-foreground/20 flex items-center justify-center text-xs font-mono"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                delay: i * 0.01,
                repeat: Infinity,
                repeatDelay: Math.random() * 10
              }}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating ASCII art */}
      <motion.div
        className="absolute top-10 left-10 z-10"
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <ASCIIArt />
      </motion.div>

      {/* Audio visualizer */}
      <motion.div
        className="absolute top-20 right-20 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <AudioVisualizer />
      </motion.div>

      <div className="text-center space-y-12 px-6 z-10 relative">
        <div className="space-y-8">
          {/* Animated greeting */}
          <AnimatedText delay={0.2} className="font-mono text-sm tracking-widest uppercase text-muted-foreground">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &lt;
            </motion.span>
            <QuantumTextEngine baseText="Hello World" className="quantum-morph" />
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              /&gt;
            </motion.span>
          </AnimatedText>
          
          {/* Main name with retro effect */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight glitch relative scanlines"
              whileHover={{ 
                textShadow: "0 0 20px rgba(0,0,0,0.5)",
                scale: 1.02
              }}
            >
              <TessellatedText text="Alex Johnson" className="holographic" />
            </motion.h1>
            
            {/* Glitch overlay effect */}
            <motion.h1 
              className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tight text-red-500 opacity-0"
              animate={{ 
                opacity: [0, 0.3, 0],
                x: [0, 2, -2, 0],
                y: [0, -1, 1, 0]
              }}
              transition={{ 
                duration: 0.1, 
                repeat: Infinity,
                repeatDelay: Math.random() * 5 + 2
              }}
            >
              Alex Johnson
            </motion.h1>
          </motion.div>
          
          {/* Enhanced typewriter section */}
          <div className="text-2xl md:text-4xl font-mono font-light h-20 flex items-center justify-center relative">
            <motion.span
              className="matrix-text"
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              I am a
            </motion.span>
            <span className="ml-6 text-foreground relative">
              <Typewriter 
                texts={professions}
                speed={80}
                deleteSpeed={40}
                pauseDuration={1500}
              />
              {/* Typewriter background effect */}
              <motion.div
                className="absolute inset-0 bg-foreground/10 blur-xl -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </div>
        </div>
        
        <AnimatedText delay={1.2} duration={1}>
          <div className="space-y-10">
            {/* Enhanced description with interactive elements */}
            <motion.p 
              className="text-lg max-w-3xl mx-auto text-muted-foreground leading-relaxed font-sans relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Crafting <TessellatedText text="beautiful" className="font-serif italic underline-animate cursor-pointer" triggerEffect={false} /> digital experiences through 
              <motion.span 
                className="font-mono bg-muted px-2 py-1 mx-1 rounded cursor-pointer hover:bg-foreground hover:text-background transition-colors static-text"
                data-text="code"
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowCode(!showCode)}
              >
                code
              </motion.span> and {" "}
              <span className="underline-animate cursor-pointer digital-dissolve" data-text="design">design</span>. 
              Passionate about <MoebiusText text="minimalism" className="prismatic-text wireframe-text" />, functionality, and user-centered solutions.
            </motion.p>
            
            {/* Interactive buttons with enhanced effects */}
            <motion.div 
              className="flex gap-6 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button 
                  onClick={scrollToAbout}
                  className="bg-foreground text-background hover:bg-foreground/90 font-mono tracking-wider px-8 py-3 pulse-glow"
                >
                  <span className="mr-2">./explore</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  onClick={() => setShowTerminal(!showTerminal)}
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background font-mono tracking-wider px-8 py-3 group"
                >
                  <Terminal className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>terminal</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background font-mono tracking-wider px-8 py-3 group"
                >
                  <Code className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>download CV</span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Interactive panels */}
            {showTerminal && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="max-w-2xl mx-auto"
              >
                <TerminalComponent />
              </motion.div>
            )}

            {showCode && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.9 }}
                className="max-w-2xl mx-auto"
              >
                <InteractiveCode />
              </motion.div>
            )}
          </div>
        </AnimatedText>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        onClick={scrollToAbout}
      >
        <motion.div
          className="flex flex-col items-center space-y-2"
          whileHover={{ scale: 1.1 }}
        >
          <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            scroll
          </span>
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full hover:bg-muted/50 border border-foreground/20"
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating decorative elements with creative effects */}
      <motion.div
        className="absolute top-20 left-10 font-mono text-xs text-muted-foreground/50 float-animation ink-blot"
        style={{ animationDelay: '0s' }}
      >
        [creative]
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-10 font-mono text-xs text-muted-foreground/50 float-animation wireframe-text"
        style={{ animationDelay: '1s' }}
      >
        {"{innovative}"}
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-5 font-mono text-xs text-muted-foreground/50 float-animation laser-scan"
        style={{ animationDelay: '2s' }}
      >
        &lt;/portfolio&gt;
      </motion.div>

      {/* Multidimensional portals */}
      <motion.div
        className="absolute top-1/3 left-1/4"
        style={{ animationDelay: '3s' }}
        animate={{ 
          rotate: [0, 360],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <MultidimensionalPortal 
          texts={["code", "create", "dream", "build"]}
          className="text-xs text-muted-foreground/30"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/3 font-mono text-xs text-muted-foreground/30 float-animation"
        style={{ animationDelay: '4s' }}
        animate={{ 
          x: [0, 20, -20, 0],
          y: [0, -10, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <QuantumTextEngine baseText="design" className="quantum-morph" />
      </motion.div>

      {/* Lightning bolt decoration */}
      <motion.div
        className="absolute top-1/3 right-1/4 text-foreground/20"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Zap className="w-8 h-8" />
      </motion.div>
    </section>
  );
}