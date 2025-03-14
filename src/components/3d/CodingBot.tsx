
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import { useIsMobile } from '@/hooks/use-mobile';

// Fallback component when 3D can't load
const FallbackBot = () => (
  <div className="text-4xl font-bold text-gradient-future animate-pulse p-6">
    <span className="text-primary">{'<'}</span>
    Coding
    <span className="text-primary">{'/>'}</span>
    Bot
  </div>
);

// 3D Model component
const BotModel = ({ scrollY }: { scrollY: number }) => {
  const botRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [modelError, setModelError] = useState(false);
  
  // Use a free 3D model of a robot
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/robot-playground/model.gltf', undefined, 
    () => {},
    (error) => {
      console.error('Error loading robot model:', error);
      setModelError(true);
    }
  ) || { scene: null };
  
  // Animation based on scroll position
  useEffect(() => {
    if (botRef.current) {
      // Rotate based on scroll position
      botRef.current.rotation.y = scrollY * 2;
      
      // Scale based on scroll
      const scale = 1 + scrollY * 0.2;
      botRef.current.scale.set(scale, scale, scale);
    }
  }, [scrollY]);
  
  // Continuous subtle animation
  useFrame((state) => {
    if (botRef.current) {
      botRef.current.rotation.y += 0.01;
      botRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });
  
  if (modelError) {
    return null; // Will trigger fallback
  }
  
  return (
    <Float
      speed={3} 
      rotationIntensity={0.6} 
      floatIntensity={0.6}
    >
      <group ref={botRef} scale={[0.8, 0.8, 0.8]} position={[0, -1, 0]}>
        {scene && <primitive object={scene} />}
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
    console.error("3D Bot Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface CodingBotProps {
  className?: string;
}

const CodingBot: React.FC<CodingBotProps> = ({ className }) => {
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
        <h2 className="text-4xl font-bold text-gradient-future">
          <span className="text-primary">{'<'}</span>
          Coding
          <span className="text-primary">{'/>'}</span>
          Bot
        </h2>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className} h-60`}
    >
      <ErrorBoundary fallback={<FallbackBot />}>
        <Suspense fallback={<FallbackBot />}>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: 'default',
            }}
          >
            <ambientLight intensity={0.7} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <BotModel scrollY={scrollY} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default CodingBot;
