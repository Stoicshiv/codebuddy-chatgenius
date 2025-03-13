
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Float, PerspectiveCamera, useScroll } from '@react-three/drei';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

// Logo 3D model component
const LogoModel = ({ scrollY }: { scrollY: number }) => {
  // Change the ref type from Mesh to Group to match what we're attaching it to
  const textGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Animation based on scroll position
  useEffect(() => {
    if (textGroupRef.current) {
      // Rotate based on scroll position
      textGroupRef.current.rotation.x = scrollY * 0.2;
      textGroupRef.current.rotation.y = scrollY * 0.5;
      
      // Scale based on scroll
      const scale = 1 + scrollY * 0.3;
      textGroupRef.current.scale.set(scale, scale, scale);
      
      // Move camera based on scroll
      camera.position.z = 5 - scrollY * 2;
    }
  }, [scrollY, camera]);
  
  // Continuous subtle animation
  useFrame((state) => {
    if (textGroupRef.current) {
      textGroupRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
    >
      <group ref={textGroupRef}>
        <Text3D
          font="/fonts/Inter_Bold.json" // You need to add this font
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          PixelForge
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#1d4ed8"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </Text3D>
      </group>
    </Float>
  );
};

interface PixelForgeLogoProps {
  className?: string;
}

const PixelForgeLogo: React.FC<PixelForgeLogoProps> = ({ className }) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how much of the element is in view (0 to 1)
      const visiblePercentage = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - Math.max(0, rect.top)) / 
          (viewportHeight + rect.height)
        )
      );
      
      setScrollY(visiblePercentage);
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Simplified version for mobile
  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className={`relative ${className} h-40 flex items-center justify-center`}
      >
        <h2 className="text-4xl font-bold text-gradient-future">PixelForge</h2>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className} h-60`}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <LogoModel scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default PixelForgeLogo;
