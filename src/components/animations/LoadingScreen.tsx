
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small delay before hiding the loading screen
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 1000);
      }, 500);
    }
  }, [progress, onLoadingComplete]);

  return (
    <motion.div 
      className={cn(
        "fixed inset-0 bg-black text-white z-50 flex flex-col items-center justify-center",
        "overflow-hidden"
      )}
      animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-3xl px-4">
        <div className="mb-4 text-lg sm:text-xl font-mono">
          PIXELFORGE
        </div>
        
        <div className="relative h-1 bg-white/20 w-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        
        <div className="mt-2 flex justify-between text-sm font-mono">
          <span>LOADING EXPERIENCE</span>
          <span>{Math.round(progress)}%</span>
        </div>
        
        <div className="mt-8">
          <div ref={trackRef} className="perspective-1000 relative h-32 w-full">
            <div 
              className="absolute inset-0 transform-3d"
              style={{
                transform: `rotateX(60deg) translateZ(0px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-transparent" 
                   style={{
                     backgroundImage: `repeating-linear-gradient(
                       to bottom,
                       rgba(255,255,255,0.1),
                       rgba(255,255,255,0.1) 1px,
                       transparent 1px,
                       transparent 20px
                     )`
                   }}
              />
              
              <motion.div 
                className="absolute inset-0"
                initial={{ backgroundPositionY: '0%' }}
                animate={{ backgroundPositionY: '100%' }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent 19px,
                    rgba(59, 130, 246, 0.7) 19px,
                    rgba(59, 130, 246, 0.7) 20px
                  )`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
