
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FluidAnimationProps {
  className?: string;
  colorPalette?: 'blue' | 'purple' | 'green' | 'orange' | 'rainbow';
  intensity?: 'subtle' | 'normal' | 'intense';
  speed?: 'slow' | 'normal' | 'fast';
  particleDensity?: 'low' | 'medium' | 'high';
  interactiveRadius?: number;
}

const FluidAnimation: React.FC<FluidAnimationProps> = ({ 
  className,
  colorPalette = 'blue',
  intensity = 'normal',
  speed = 'normal',
  particleDensity = 'medium',
  interactiveRadius = 200
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Handle pointer movement
    const handlePointerMove = (e: PointerEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    };

    // Colors based on the selected palette
    const getColorPalette = () => {
      switch (colorPalette) {
        case 'purple':
          return (opacity: number) => `rgba(161, 59, 246, ${opacity})`;
        case 'green':
          return (opacity: number) => `rgba(46, 213, 115, ${opacity})`;
        case 'orange':
          return (opacity: number) => `rgba(255, 159, 67, ${opacity})`;
        case 'rainbow':
          return (opacity: number) => {
            const hue = Math.floor(Math.random() * 360);
            return `hsla(${hue}, 80%, 60%, ${opacity})`;
          };
        case 'blue':
        default:
          return (opacity: number) => `rgba(59, 130, 246, ${opacity})`;
      }
    };
    
    const colorFn = getColorPalette();

    // Animation particles
    const particles: { 
      x: number; 
      y: number; 
      size: number; 
      vx: number; 
      vy: number; 
      color: string;
      originalX: number;
      originalY: number;
    }[] = [];
    
    // Set speed factor based on speed prop
    const getSpeedFactor = () => {
      switch (speed) {
        case 'slow': return 0.5;
        case 'fast': return 2;
        case 'normal':
        default: return 1;
      }
    };
    
    // Set force intensity based on intensity prop
    const getForceIntensity = () => {
      switch (intensity) {
        case 'subtle': return 0.1;
        case 'intense': return 0.35;
        case 'normal':
        default: return 0.2;
      }
    };
    
    // Set particle density based on particleDensity prop
    const getParticleDensity = () => {
      switch (particleDensity) {
        case 'low': return 20000;
        case 'high': return 8000;
        case 'medium':
        default: return 15000;
      }
    };
    
    const speedFactor = getSpeedFactor();
    const forceIntensity = getForceIntensity();
    const density = getParticleDensity();
    
    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      const total = Math.floor(canvas.width * canvas.height / density);
      
      for (let i = 0; i < total; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.2 * speedFactor,
          vy: (Math.random() - 0.5) * 0.2 * speedFactor,
          color: colorFn(Math.random() * 0.3 + 0.2)
        });
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with opacity for trail effect - adjust based on speed
      const clearOpacity = 0.05 + (0.03 * speedFactor);
      ctx.fillStyle = `rgba(0, 0, 0, ${clearOpacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(p => {
        // Calculate distance from pointer
        const dx = pointerRef.current.x - p.x;
        const dy = pointerRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Apply force if close to pointer - with customizable radius
        if (dist < interactiveRadius) {
          const force = (1 - dist / interactiveRadius) * forceIntensity;
          p.vx += dx * force / dist;
          p.vy += dy * force / dist;
        }
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Attraction back to original position (for "memory" effect)
        const homeForce = 0.01 * speedFactor;
        p.vx += (p.originalX - p.x) * homeForce;
        p.vy += (p.originalY - p.y) * homeForce;
        
        // Dampen velocity
        const dampening = 0.98 - (0.01 * speedFactor);
        p.vx *= dampening;
        p.vy *= dampening;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove);
    
    resizeCanvas();
    initParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colorPalette, intensity, speed, particleDensity, interactiveRadius]);

  return (
    <canvas 
      ref={canvasRef} 
      className={cn("fixed inset-0 -z-10 bg-black", className)}
    />
  );
};

export default FluidAnimation;
