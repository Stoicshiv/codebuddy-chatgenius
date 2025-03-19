
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingAnimationProps {
  isLoading: boolean;
  onComplete?: () => void;
  className?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  isLoading,
  onComplete,
  className
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  
  // Simulate loading process
  useEffect(() => {
    if (!isLoading) return;
    
    let speed = 0.2; // Base speed
    
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        
        // Accelerate as we progress
        if (progress > 0.7) speed = 0.5;
        else if (progress > 0.4) speed = 0.3;
        
        // Update progress
        setProgress(prevProgress => {
          const newProgress = Math.min(prevProgress + speed * deltaTime / 1000, 1);
          
          // Trigger phase changes at specific progress points
          if (newProgress >= 1 && phase < 3) setPhase(3);
          else if (newProgress >= 0.7 && phase < 2) setPhase(2);
          else if (newProgress >= 0.3 && phase < 1) setPhase(1);
          
          return newProgress;
        });
      }
      
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isLoading, progress, phase]);
  
  // Trigger completion callback when loading finishes
  useEffect(() => {
    if (progress >= 1 && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // Wait for exit animation
      
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);
  
  // Track scenes/assets/modules loading visuals
  const getLoadingText = () => {
    switch (phase) {
      case 0: return "Initializing...";
      case 1: return "Loading assets...";
      case 2: return "Preparing experience...";
      case 3: return "Ready!";
      default: return "Loading...";
    }
  };
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center bg-black",
            className
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Central track line */}
          <div className="w-64 h-0.5 bg-gray-800 mb-8 relative">
            {/* Progress indicator */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ ease: "easeOut" }}
            />
            
            {/* Moving element along track */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"
              initial={{ left: '0%' }}
              animate={{ left: `${progress * 100}%` }}
              transition={{ ease: "easeOut" }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-primary blur-md opacity-70 scale-150" />
            </motion.div>
          </div>
          
          {/* Loading text with percentage */}
          <div className="text-center">
            <div className="text-white font-mono mb-2">
              {getLoadingText()}
            </div>
            <div className="text-primary/80 font-mono text-sm">
              {Math.round(progress * 100)}%
            </div>
          </div>
          
          {/* Abstract animated elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-primary rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, Math.random() * 10 + 5, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
