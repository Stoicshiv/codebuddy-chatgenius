
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImmersiveAnimationProps {
  className?: string;
  type?: 'grid' | 'dots' | 'waves' | 'particles';
  colorScheme?: 'blue' | 'purple' | 'rainbow' | 'green';
  interactive?: boolean;
  visualDepth?: 'subtle' | 'normal' | 'deep';
  transitionIn?: boolean;
}

const ImmersiveAnimation: React.FC<ImmersiveAnimationProps> = ({
  className,
  type = 'grid',
  colorScheme = 'blue',
  interactive = true,
  visualDepth = 'normal',
  transitionIn = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(!transitionIn);

  useEffect(() => {
    if (transitionIn) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [transitionIn]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !interactive) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    // Function to get color based on colorScheme
    const getColor = (alpha = 1) => {
      switch (colorScheme) {
        case 'purple':
          return `rgba(147, 51, 234, ${alpha})`;
        case 'green':
          return `rgba(16, 185, 129, ${alpha})`;
        case 'rainbow':
          const hue = (Date.now() / 50) % 360;
          return `hsla(${hue}, 70%, 60%, ${alpha})`;
        case 'blue':
        default:
          return `rgba(59, 130, 246, ${alpha})`;
      }
    };
    
    // Function to get depth factor based on visualDepth
    const getDepthFactor = () => {
      switch (visualDepth) {
        case 'subtle': return 0.5;
        case 'deep': return 2;
        case 'normal':
        default: return 1;
      }
    };
    
    const depthFactor = getDepthFactor();
    
    // Draw grid animation
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 30;
      const lineWidth = 1;
      
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = getColor(0.3);
      
      // Calculate mouse influence
      const influenceRadius = 150 * depthFactor;
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 2) {
          if (interactive) {
            const dx = x - mousePosition.x;
            const dy = y - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            let offsetY = 0;
            if (distance < influenceRadius) {
              const force = (1 - distance / influenceRadius) * 15 * depthFactor;
              offsetY = Math.sin(distance / 10) * force;
            }
            
            ctx.lineTo(x, y + offsetY);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        
        for (let y = 0; y < canvas.height; y += 2) {
          if (interactive) {
            const dx = x - mousePosition.x;
            const dy = y - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            let offsetX = 0;
            if (distance < influenceRadius) {
              const force = (1 - distance / influenceRadius) * 15 * depthFactor;
              offsetX = Math.sin(distance / 10) * force;
            }
            
            ctx.lineTo(x + offsetX, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
    };
    
    // Draw dots animation
    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const dotSpacing = 30;
      const dotRadius = 1.5;
      
      // Calculate mouse influence
      const influenceRadius = 150 * depthFactor;
      
      for (let x = dotSpacing; x < canvas.width; x += dotSpacing) {
        for (let y = dotSpacing; y < canvas.height; y += dotSpacing) {
          let displayX = x;
          let displayY = y;
          let radius = dotRadius;
          
          if (interactive) {
            const dx = x - mousePosition.x;
            const dy = y - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < influenceRadius) {
              const force = (1 - distance / influenceRadius) * 15 * depthFactor;
              // Push dots away from mouse
              const angle = Math.atan2(dy, dx);
              displayX += Math.cos(angle) * force;
              displayY += Math.sin(angle) * force;
              radius = dotRadius + force / 5;
            }
          }
          
          ctx.beginPath();
          ctx.arc(displayX, displayY, radius, 0, Math.PI * 2);
          ctx.fillStyle = getColor(0.7);
          ctx.fill();
        }
      }
    };
    
    // Draw waves animation
    const drawWaves = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() / 1000;
      const waveCount = 3;
      
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        
        const baseY = canvas.height * (0.3 + (w * 0.2));
        const amplitude = 20 * depthFactor;
        const speed = 0.5 + (w * 0.2);
        const wavelength = 0.01 + (w * 0.002);
        
        for (let x = 0; x < canvas.width; x += 2) {
          let y = baseY + Math.sin(x * wavelength + time * speed) * amplitude;
          
          if (interactive) {
            const dx = x - mousePosition.x;
            const dy = baseY - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influenceRadius = 150 * depthFactor;
            
            if (distance < influenceRadius) {
              const force = (1 - distance / influenceRadius) * 30 * depthFactor;
              y += force * Math.sin(distance / 20 - time);
            }
          }
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = getColor(0.2 + (w * 0.2));
        ctx.lineWidth = 2 + w;
        ctx.stroke();
      }
    };
    
    // Draw particles animation
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() / 1000;
      
      // Generate points in a grid
      const spacing = 40;
      
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          // Calculate oscillation based on time
          const oscillationX = Math.sin(time + x * 0.01) * 5 * depthFactor;
          const oscillationY = Math.cos(time + y * 0.01) * 5 * depthFactor;
          
          let displayX = x + oscillationX;
          let displayY = y + oscillationY;
          let particleSize = 3;
          
          if (interactive) {
            const dx = x - mousePosition.x;
            const dy = y - mousePosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influenceRadius = 150 * depthFactor;
            
            if (distance < influenceRadius) {
              const force = (1 - distance / influenceRadius) * 30 * depthFactor;
              const angle = Math.atan2(dy, dx);
              displayX += Math.cos(angle) * force;
              displayY += Math.sin(angle) * force;
              particleSize += force / 10;
            }
          }
          
          ctx.beginPath();
          ctx.arc(displayX, displayY, particleSize, 0, Math.PI * 2);
          ctx.fillStyle = getColor(0.6);
          ctx.fill();
          
          // Draw connecting lines to nearby particles
          if (interactive) {
            const connectionRadius = 80 * depthFactor;
            // Only connect to next particles (to avoid double connections)
            for (let nx = x + spacing; nx < x + spacing * 2 && nx < canvas.width; nx += spacing) {
              for (let ny = y - spacing; ny < y + spacing * 2 && ny < canvas.height; ny += spacing) {
                if (ny < 0) continue;
                
                const ndx = nx - x;
                const ndy = ny - y;
                const nDistance = Math.sqrt(ndx * ndx + ndy * ndy);
                
                if (nDistance < connectionRadius) {
                  // Calculate neighbor's position with its own oscillation
                  const nOscillationX = Math.sin(time + nx * 0.01) * 5 * depthFactor;
                  const nOscillationY = Math.cos(time + ny * 0.01) * 5 * depthFactor;
                  
                  let nDisplayX = nx + nOscillationX;
                  let nDisplayY = ny + nOscillationY;
                  
                  // Apply same mouse influence to neighbor
                  if (interactive) {
                    const ndxm = nx - mousePosition.x;
                    const ndym = ny - mousePosition.y;
                    const nDistancem = Math.sqrt(ndxm * ndxm + ndym * ndym);
                    const influenceRadius = 150 * depthFactor;
                    
                    if (nDistancem < influenceRadius) {
                      const force = (1 - nDistancem / influenceRadius) * 30 * depthFactor;
                      const angle = Math.atan2(ndym, ndxm);
                      nDisplayX += Math.cos(angle) * force;
                      nDisplayY += Math.sin(angle) * force;
                    }
                  }
                  
                  // Draw line with opacity based on distance
                  const lineOpacity = 1 - (nDistance / connectionRadius);
                  ctx.beginPath();
                  ctx.moveTo(displayX, displayY);
                  ctx.lineTo(nDisplayX, nDisplayY);
                  ctx.strokeStyle = getColor(lineOpacity * 0.3);
                  ctx.lineWidth = lineOpacity * 1.5;
                  ctx.stroke();
                }
              }
            }
          }
        }
      }
    };
    
    // Choose the right drawing function based on type
    const drawAnimation = () => {
      switch (type) {
        case 'dots':
          drawDots();
          break;
        case 'waves':
          drawWaves();
          break;
        case 'particles':
          drawParticles();
          break;
        case 'grid':
        default:
          drawGrid();
          break;
      }
      
      animationFrameRef.current = requestAnimationFrame(drawAnimation);
    };
    
    // Initialize
    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    handleResize();
    drawAnimation();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [type, colorScheme, interactive, visualDepth]);

  return (
    <motion.div 
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0"
      />
    </motion.div>
  );
};

export default ImmersiveAnimation;
