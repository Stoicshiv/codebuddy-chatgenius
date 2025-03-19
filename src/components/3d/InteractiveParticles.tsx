
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

// Interactive particles that respond to cursor movement
const ParticleSystem = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const bufferRef = useRef<THREE.BufferAttribute | null>(null);
  const count = useIsMobile() ? 1000 : 3000;
  
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Random positions within a sphere
      const radius = Math.random() * 4 + 1;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Particle colors (gradients of blue to purple)
      colors[i * 3] = 0.2 + Math.random() * 0.2;     // R
      colors[i * 3 + 1] = 0.3 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
      
      // Random sizes
      sizes[i] = Math.random() * 2 + 0.5;
      
      // Random phase for animation
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, colors, sizes, phases };
  }, [count]);
  
  // Create geometry and set attributes
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    
    bufferRef.current = new THREE.BufferAttribute(
      particlePositions.positions, 
      3
    );
    
    geometry.setAttribute('position', bufferRef.current);
    geometry.setAttribute('color', new THREE.BufferAttribute(particlePositions.colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(particlePositions.sizes, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(particlePositions.phases, 1));
    
    return geometry;
  }, [particlePositions]);
  
  // Update particles position
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (bufferRef.current && particlesRef.current) {
      const positions = bufferRef.current.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Get current position
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Calculate distance from mouse (normalized coordinates)
        const mouseX = (mousePosition.x * 2 - 1) * 5;
        const mouseY = (mousePosition.y * -2 + 1) * 5;
        
        const dx = mouseX - x;
        const dy = mouseY - y;
        const distSq = dx * dx + dy * dy;
        
        // Particles react to mouse proximity
        if (distSq < 4) {
          // Push particles away from cursor
          const factor = 0.01 / Math.max(0.1, distSq);
          positions[i3] -= dx * factor;
          positions[i3 + 1] -= dy * factor;
        }
        
        // Wave-like movement
        const phase = particlePositions.phases[i];
        const freq = 0.5;
        
        positions[i3] += Math.sin(time * freq + phase) * 0.003;
        positions[i3 + 1] += Math.cos(time * freq + phase) * 0.003;
        positions[i3 + 2] += Math.sin(time * freq + phase * 2) * 0.003;
        
        // Apply very slight gravity to center
        const centerAttraction = 0.0001;
        positions[i3] += (0 - positions[i3]) * centerAttraction;
        positions[i3 + 1] += (0 - positions[i3 + 1]) * centerAttraction;
        positions[i3 + 2] += (0 - positions[i3 + 2]) * centerAttraction;
      }
      
      bufferRef.current.needsUpdate = true;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <pointsMaterial
        vertexColors
        size={0.1}
        sizeAttenuation={true}
        transparent
        opacity={0.6}
        alphaTest={0.01}
        depthWrite={false}
      />
      {geometry && <primitive object={geometry} />}
    </points>
  );
};

interface InteractiveParticlesProps {
  className?: string;
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({ className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const isMobile = useIsMobile();
  
  // Track mouse position
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  
  // For mobile, simulate mouse movement
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setMousePosition({
          x: 0.5 + Math.sin(Date.now() * 0.001) * 0.2,
          y: 0.5 + Math.cos(Date.now() * 0.001) * 0.2,
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [isMobile]);
  
  return (
    <div className={`${className} relative`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          alpha: true,
          antialias: true,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
        }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSystem mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default InteractiveParticles;
