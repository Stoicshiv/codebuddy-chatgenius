
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ImmersiveCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}

const ImmersiveCard: React.FC<ImmersiveCardProps> = ({ 
  children,
  className,
  intensity = 'medium'
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Scale rotation factor based on intensity
    const intensityFactor = 
      intensity === 'subtle' ? 5 :
      intensity === 'strong' ? 15 : 10;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * intensityFactor;
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * intensityFactor;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  // For mobile, don't add hover effects
  if (isMobile) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl transition-all duration-300",
          "bg-white/10 backdrop-blur-md border border-white/20",
          "shadow-lg",
          className
        )}
      >
        <div className="relative p-6">
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300 transform-gpu",
        "bg-white/10 backdrop-blur-md border border-white/20",
        "hover:shadow-xl",
        isHovered ? 'z-10' : 'z-0',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(125deg, #7928CA, #FF0080)',
          filter: 'blur(15px)',
          transform: 'translateZ(-10px)',
        }}
      />
      
      {/* Glint effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          transform: `translateX(${isHovered ? '100%' : '-100%'}) skewX(-20deg)`,
          transition: 'transform 0.7s ease-in-out',
        }}
      />
      
      {/* Content container with 3D transform */}
      <div 
        className="relative p-6"
        style={{ transform: 'translateZ(20px)' }}
      >
        {children}
      </div>
    </div>
  );
};

export default ImmersiveCard;
