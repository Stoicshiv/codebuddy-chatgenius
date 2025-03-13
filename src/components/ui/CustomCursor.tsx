
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const isMobile = useIsMobile();
  
  // Skip rendering on mobile devices
  if (isMobile) return null;

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      
      if (cursorRingRef.current) {
        // Add slight delay for trailing effect
        setTimeout(() => {
          cursorRingRef.current!.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }, 100);
      }
    };
    
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    
    // Check for link and button hovers
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add event listeners to all links and buttons
    const links = document.querySelectorAll('a, button, .interactive');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });
    
    // Play sound on click
    const handleClick = () => {
      const clickSound = new Audio('/sounds/click.mp3');
      clickSound.volume = 0.2;
      clickSound.play().catch(() => {
        // Silent catch for browsers that block autoplay
      });
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100 ${
          clicked ? 'scale-50' : ''
        } ${hidden ? 'opacity-0' : 'opacity-100'}`}
      />
      
      {/* Cursor ring */}
      <div
        ref={cursorRingRef}
        className={`fixed left-0 top-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          clicked ? 'scale-150 opacity-20' : ''
        } ${hidden ? 'opacity-0' : 'opacity-100'} ${
          linkHovered ? 'scale-200 bg-primary/10' : ''
        }`}
      />
    </>
  );
};

export default CustomCursor;
