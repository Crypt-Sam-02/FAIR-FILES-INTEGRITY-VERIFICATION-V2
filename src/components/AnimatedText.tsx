import React from 'react';
import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  speed?: number;
  loop?: boolean;
}

export function AnimatedText({ text, className = '', speed = 50, loop = false }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loop && currentIndex === text.length) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < text.length) {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else if (loop) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Pause at the end
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex(0);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, loop, isDeleting, displayedText.length]);

  return (
    <span className={`${className} inline-block`}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}