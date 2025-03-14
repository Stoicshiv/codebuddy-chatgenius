
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'gradient1' | 'gradient2' | 'gradient3' | 'gradient4' | 'gradient5';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  withParticles?: boolean;
  withShapes?: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'gradient1',
  intensity = 'medium',
  className,
  withParticles = false,
  withShapes = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  // Values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  
  // Get gradient based on variant
  const getGradient = () => {
    switch(variant) {
      case 'gradient1':
        return 'bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20';
      case 'gradient2':
        return 'bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-teal-900/20';
      case 'gradient3':
        return 'bg-gradient-to-br from-orange-900/20 via-amber-900/20 to-yellow-900/20';
      case 'gradient4':
        return 'bg-gradient-to-br from-red-900/20 via-rose-900/20 to-pink-900/20';
      case 'gradient5':
        return 'bg-gradient-to-br from-cyan-900/20 via-sky-900/20 to-blue-900/20';
      default:
        return 'bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20';
    }
  };
  
  // Get intensity class
  const getIntensity = () => {
    switch(intensity) {
      case 'subtle':
        return 'opacity-30';
      case 'medium':
        return 'opacity-50';
      case 'strong':
        return 'opacity-70';
      default:
        return 'opacity-50';
    }
  };

  return (
    <div ref={containerRef} className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Background gradient */}
      <motion.div
        className={cn("fixed inset-0 -z-10", getGradient(), getIntensity())}
        style={{ 
          y: y1,
          scale,
          opacity
        }}
      />
      
      {/* Animated shapes */}
      {withShapes && (
        <>
          <motion.div
            className="fixed top-1/4 -left-20 w-60 h-60 rounded-full bg-blue-500/20 blur-3xl -z-5"
            style={{ 
              y: y2,
              x: useTransform(scrollYProgress, [0, 1], [0, 100]),
              rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
            }}
          />
          <motion.div
            className="fixed bottom-1/4 -right-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl -z-5"
            style={{ 
              y: y1,
              x: useTransform(scrollYProgress, [0, 1], [0, -100]),
              rotate: useTransform(scrollYProgress, [0, 1], [0, -45]),
            }}
          />
          <motion.div
            className="fixed top-1/2 left-1/4 w-40 h-40 rounded-full bg-primary/10 blur-3xl -z-5"
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [0, -150]),
              scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
              opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.8, 0.3]),
            }}
          />
        </>
      )}
      
      {/* Render children */}
      {children}
    </div>
  );
};

export default AnimatedBackground;
