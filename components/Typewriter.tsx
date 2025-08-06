import { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  showCursor?: boolean;
}

export function Typewriter({ 
  texts, 
  speed = 100, 
  deleteSpeed = 50, 
  pauseDuration = 2000,
  className = "",
  showCursor = true 
}: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const targetText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (isTyping && !isDeleting) {
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.substring(0, currentText.length + 1));
        } else {
          setIsTyping(false);
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setIsTyping(true);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isTyping, currentTextIndex, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && <span className="typewriter-cursor"></span>}
    </span>
  );
}