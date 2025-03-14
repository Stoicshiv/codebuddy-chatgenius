
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImmersiveSceneProps {
  className?: string;
  isActive?: boolean;
  onClose?: () => void;
}

const ImmersiveScene: React.FC<ImmersiveSceneProps> = ({ 
  className, 
  isActive = false,
  onClose 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sections] = useState([
    { id: 'web', title: 'WEB DEVELOPMENT', color: 'from-blue-500/20 to-blue-700/20' },
    { id: 'mobile', title: 'MOBILE APPS', color: 'from-purple-500/20 to-purple-700/20' },
    { id: 'design', title: 'UI/UX DESIGN', color: 'from-pink-500/20 to-pink-700/20' },
    { id: 'ai', title: 'AI INTEGRATION', color: 'from-green-500/20 to-green-700/20' }
  ]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate relative position (0 to 1)
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Auto-advance sections every 5 seconds
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % sections.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isActive, sections.length]);

  // Calculate transform based on mouse position
  const getTransform = () => {
    const maxTilt = 5; // degrees
    const rotateX = (0.5 - mousePos.y) * maxTilt;
    const rotateY = (mousePos.x - 0.5) * maxTilt;
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed inset-0 flex items-center justify-center z-50 bg-black",
        className
      )}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white z-10 text-2xl"
      >
        ×
      </button>
      
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ 
          perspective: '1000px',
        }}
      >
        {/* Background grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            transform: `translateZ(-100px) ${getTransform()}`,
          }}
        />
        
        {/* Dynamic background gradient */}
        <motion.div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30",
            sections[activeSection].color
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        />
        
        {/* Content sections */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative transform-gpu"
            style={{ transform: getTransform() }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                className="absolute top-0 left-0 w-full text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: activeSection === index ? 1 : 0,
                  y: activeSection === index ? 0 : 50
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-white text-6xl md:text-8xl font-bold mb-6">
                  {section.title}
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
                  Experience cutting-edge {section.title.toLowerCase()} solutions
                  tailored to your unique business needs.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Navigation dots */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                activeSection === index ? "bg-white scale-125" : "bg-white/30"
              )}
              onClick={() => setActiveSection(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ImmersiveScene;
