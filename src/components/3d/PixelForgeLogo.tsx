
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text3D, Float, PerspectiveCamera } from '@react-three/drei';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

// Simplified fallback when 3D can't load
const FallbackLogo = () => (
  <div className="text-4xl font-bold text-gradient-future animate-pulse p-6">
    PixelForge
  </div>
);

// Logo 3D model component
const LogoModel = ({ scrollY }: { scrollY: number }) => {
  // Change the ref type from Mesh to Group to match what we're attaching it to
  const textGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [fontError, setFontError] = useState(false);
  
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
  
  // Handle potential font loading errors
  useEffect(() => {
    // Check if fonts/Inter_Bold.json actually exists
    fetch('/fonts/Inter_Bold.json')
      .then(response => {
        if (!response.ok) {
          console.error('Font file not found:', response.status);
          setFontError(true);
        }
      })
      .catch(error => {
        console.error('Error loading font:', error);
        setFontError(true);
      });
  }, []);

  // If there's a font error, render a simple 3D text
  if (fontError) {
    return (
      <mesh>
        <boxGeometry args={[3, 1, 0.2]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    );
  }
  
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
    >
      <group ref={textGroupRef}>
        <Text3D
          font="/fonts/Inter_Bold.json"
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

// Error boundary for catching 3D rendering errors
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("3D Logo Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

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
      <ErrorBoundary fallback={<FallbackLogo />}>
        <Suspense fallback={<FallbackLogo />}>
          <Canvas
            dpr={[1, 1.5]} // Reduced from [1, 2] for better performance
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: 'default', // Changed from high-performance to default
            }}
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <LogoModel scrollY={scrollY} />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default PixelForgeLogo;
