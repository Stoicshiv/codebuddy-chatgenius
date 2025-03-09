
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

const DNA_PARTICLES = 60;
const RADIUS = 2;
const CURVE_HEIGHT = 6;

const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Mesh[]>([]);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Dynamic rotation based on user interaction
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base rotation speed, faster if hovered
      const rotationSpeed = hovered ? 0.4 : 0.2;
      groupRef.current.rotation.y += delta * rotationSpeed;
      
      // Additional animation if clicked
      if (clicked) {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          Math.sin(state.clock.elapsedTime) * 0.2,
          0.1
        );
      } else {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          0,
          0.1
        );
      }
    }
    
    // Animate particles
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        const t = state.clock.elapsedTime;
        // Pulsating effect
        const scale = 1 + 0.1 * Math.sin(t * 3 + i * 0.2);
        particle.scale.set(scale, scale, scale);
        
        // Glowing effect by changing color intensity
        if (particle.material instanceof THREE.MeshStandardMaterial) {
          particle.material.emissiveIntensity = 0.5 + 0.3 * Math.sin(t * 2 + i * 0.1);
        }
      }
    });
  });

  // Create the particles that form the DNA helix
  const particles = [];
  for (let i = 0; i < DNA_PARTICLES; i++) {
    // Create two strands of DNA
    const t = i / DNA_PARTICLES;
    const angle1 = t * Math.PI * 6; // Strand 1
    const angle2 = t * Math.PI * 6 + Math.PI; // Strand 2 (opposite side)
    
    const x1 = Math.cos(angle1) * RADIUS;
    const z1 = Math.sin(angle1) * RADIUS;
    const y1 = t * CURVE_HEIGHT - CURVE_HEIGHT / 2;
    
    const x2 = Math.cos(angle2) * RADIUS;
    const z2 = Math.sin(angle2) * RADIUS;
    const y2 = t * CURVE_HEIGHT - CURVE_HEIGHT / 2;
    
    // Connecting line between the strands
    const connector = (i % 5 === 0);
    
    particles.push(
      <mesh 
        key={`p1-${i}`} 
        position={[x1, y1, z1]}
        ref={(el) => {
          if (el) particlesRef.current[i*2] = el;
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color('#3e63dd')} 
          emissive={new THREE.Color('#3e63dd')}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    );
    
    particles.push(
      <mesh 
        key={`p2-${i}`} 
        position={[x2, y2, z2]}
        ref={(el) => {
          if (el) particlesRef.current[i*2+1] = el;
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color={new THREE.Color('#e5484d')} 
          emissive={new THREE.Color('#e5484d')}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    );
    
    // Add connecting lines between the strands
    if (connector) {
      particles.push(
        <mesh 
          key={`c-${i}`} 
          position={[(x1+x2)/2, (y1+y2)/2, (z1+z2)/2]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[Math.sqrt((x2-x1)**2 + (z2-z1)**2), 0.05, 0.05]} />
          <meshStandardMaterial 
            color={new THREE.Color('#4cc38a')} 
            emissive={new THREE.Color('#4cc38a')}
            emissiveIntensity={0.3}
            transparent={true}
            opacity={0.8}
          />
          <group rotation={[0, Math.atan2(z2-z1, x2-x1), 0]} />
        </mesh>
      );
    }
  }

  return (
    <group 
      ref={groupRef} 
      scale={clicked ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {particles}
    </group>
  );
};

interface DNASceneProps {
  className?: string;
}

const DNAScene: React.FC<DNASceneProps> = ({ className }) => {
  const [zoom, setZoom] = useState(8);
  
  // Handle zoom effect on scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      setZoom(prev => {
        const newZoom = prev + e.deltaY * 0.01;
        return Math.max(5, Math.min(12, newZoom)); // Limit zoom range
      });
    };
    
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className={className}>
      <Canvas className="rounded-xl shadow-lg">
        <PerspectiveCamera makeDefault position={[0, 0, zoom]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3e63dd" />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow color="#e5484d" />
        
        <DNAHelix />
        
        <OrbitControls 
          enableZoom={true} 
          autoRotate 
          autoRotateSpeed={0.5} 
          zoomSpeed={0.5}
          minDistance={5}
          maxDistance={12}
        />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
};

export default DNAScene;
