import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const ScrollSection = ({
  children,
  className = '',
  delay = 0,
  duration = 900, 
  direction = 'up', 
}) => {
  const [ref, isVisible] = useScrollReveal();

  const getDirectionStyles = () => {
    switch (direction) {
      case 'left':
        return isVisible
          ? 'translate-x-0 opacity-100 scale-100 rotate-0'
          : '-translate-x-16 opacity-0 scale-95 -rotate-1';
      case 'right':
        return isVisible
          ? 'translate-x-0 opacity-100 scale-100 rotate-0'
          : 'translate-x-16 opacity-0 scale-95 rotate-1';
      case 'down':
        return isVisible
          ? 'translate-y-0 opacity-100 scale-100 rotate-0'
          : '-translate-y-16 opacity-0 scale-95 -rotate-1';
      case 'fade':
        return isVisible
          ? 'opacity-100 scale-100 blur-0'
          : 'opacity-0 scale-[0.98] blur-sm';
      case 'spin':
        return isVisible
          ? 'translate-y-0 opacity-100 scale-100 rotate-0'
          : 'translate-y-10 opacity-0 scale-90 rotate-6';
      case 'up':
      default:
        return isVisible
          ? 'translate-y-0 opacity-100 scale-100 rotate-0'
          : 'translate-y-16 opacity-0 scale-95 rotate-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: DOUGH_EASE,
      }}
      className={`transition-all will-change-[transform,opacity,filter] ${getDirectionStyles()} ${className}`}
    >
      {children}
    </div>
  );
};