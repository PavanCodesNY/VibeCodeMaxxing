import { Button } from "./ui/button";
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          className="font-mono tracking-wider"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-muted-foreground">&lt;</span>
          <span className="font-serif font-medium">AJ</span>
          <span className="text-muted-foreground">/&gt;</span>
        </motion.div>
        
        <div className="hidden md:flex gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection(item.id)}
                className="hover:bg-muted font-mono text-sm tracking-wide relative group"
              >
                <span className="relative z-10">{item.label.toLowerCase()}</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Mobile menu indicator */}
        <motion.div 
          className="md:hidden"
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="icon" className="font-mono">
            ≡
          </Button>
        </motion.div>
      </nav>
    </motion.header>
  );
}