
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FluidAnimationProps {
  className?: string;
}

const FluidAnimation: React.FC<FluidAnimationProps> = ({ className }) => {
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

    // Animation particles
    const particles: { x: number; y: number; size: number; vx: number; vy: number; color: string }[] = [];
    
    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      const total = Math.floor(canvas.width * canvas.height / 15000);
      
      for (let i = 0; i < total; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          color: `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.2})`
        });
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with opacity for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particles.forEach(p => {
        // Calculate distance from pointer
        const dx = pointerRef.current.x - p.x;
        const dy = pointerRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Apply force if close to pointer
        if (dist < 200) {
          const force = (1 - dist / 200) * 0.2;
          p.vx += dx * force / dist;
          p.vy += dy * force / dist;
        }
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;
        
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
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={cn("fixed inset-0 -z-10 bg-black", className)}
    />
  );
};

export default FluidAnimation;
