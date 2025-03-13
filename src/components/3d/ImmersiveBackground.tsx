
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

// Simplified background for mobile devices
const SimplifiedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-900/20 via-indigo-900/20 to-purple-900/20" />
  )
};

// Shader for the wavy background effect
const WaveMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Vertex shader for the wave effect
  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader for wave effect - simplified for performance
  const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      vec2 mouseNorm = mouse / resolution;
      
      // Simplified warping effect based on time only
      float waveSin = sin(uv.y * 10.0 - time * 0.3) * 0.03;
      
      // Color gradient based on position
      vec3 color1 = vec3(0.1, 0.3, 0.9); // Blue
      vec3 color2 = vec3(0.5, 0.1, 0.8); // Purple
      vec3 color = mix(color1, color2, uv.y + waveSin);
      
      gl_FragColor = vec4(color, 0.7);
    }
  `;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: window.innerHeight - event.clientY // Invert Y for Three.js coordinate system
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      // Update shader uniforms
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.mouse.value.set(mousePosition.x, mousePosition.y);
      materialRef.current.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <Plane args={[2, 2]} position={[0, 0, -1]}>
      <shaderMaterial 
        ref={materialRef} 
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          mouse: { value: new THREE.Vector2(mousePosition.x, mousePosition.y) }
        }}
        transparent={true}
      />
    </Plane>
  );
};

// Reduced number of particles for better performance
const Particles = ({ count = 20 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const matrix = new THREE.Matrix4();
  
  // Set up particles
  useEffect(() => {
    if (mesh.current) {
      // Create a temporary object to manipulate
      const temp = new THREE.Object3D();
      
      for (let i = 0; i < count; i++) {
        // Random positions
        temp.position.set(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.9) * 2
        );
        
        // Random scales
        const scale = 0.05 + Math.random() * 0.1;
        temp.scale.set(scale, scale, scale);
        
        // Update matrix and set
        temp.updateMatrix();
        mesh.current.setMatrixAt(i, temp.matrix);
      }
      
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      const temp = new THREE.Object3D();
      
      for (let i = 0; i < count; i++) {
        mesh.current.getMatrixAt(i, matrix);
        
        // Extract position, apply animation, and update
        temp.position.setFromMatrixPosition(matrix);
        temp.rotation.y = state.clock.elapsedTime * 0.1 + i;
        temp.position.y += Math.sin(state.clock.elapsedTime + i) * 0.002;
        temp.updateMatrix();
        
        mesh.current.setMatrixAt(i, temp.matrix);
      }
      
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
};

// ThreeScene: The actual 3D scene component wrapped in error boundaries
const ThreeScene = () => {
  return (
    <Canvas className="w-full h-full" dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 2]} />
      <WaveMaterial />
      <Particles count={20} />
      <ambientLight intensity={0.4} />
    </Canvas>
  );
};

// Main component with conditional rendering based on device
const ImmersiveBackground: React.FC = () => {
  const isMobile = useIsMobile();
  
  // On mobile devices, render simplified version
  if (isMobile) {
    return <SimplifiedBackground />;
  }
  
  // Error boundary component to catch Three.js errors
  const ErrorFallback = () => {
    return <SimplifiedBackground />;
  };
  
  // Try to render ThreeScene, fallback to simplified version on error
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <React.Suspense fallback={<SimplifiedBackground />}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <ThreeScene />
        </ErrorBoundary>
      </React.Suspense>
    </div>
  );
};

// Simple error boundary component
class ErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }> {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ImmersiveBackground;
