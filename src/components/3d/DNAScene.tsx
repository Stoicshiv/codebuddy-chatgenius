
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const DNA_PARTICLES = 60;
const RADIUS = 2;
const CURVE_HEIGHT = 6;

const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
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
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={new THREE.Color('#3e63dd')} />
      </mesh>
    );
    
    particles.push(
      <mesh 
        key={`p2-${i}`} 
        position={[x2, y2, z2]}
        ref={(el) => {
          if (el) particlesRef.current[i*2+1] = el;
        }}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={new THREE.Color('#e5484d')} />
      </mesh>
    );
    
    // Add connecting lines between the strands
    if (connector) {
      particles.push(
        <mesh key={`c-${i}`} position={[(x1+x2)/2, (y1+y2)/2, (z1+z2)/2]}>
          <boxGeometry args={[Math.sqrt((x2-x1)**2 + (z2-z1)**2), 0.05, 0.05]} />
          <meshStandardMaterial color={new THREE.Color('#4cc38a')} />
          <group rotation={[0, Math.atan2(z2-z1, x2-x1), 0]} />
        </mesh>
      );
    }
  }

  return (
    <group ref={groupRef}>
      {particles}
    </group>
  );
};

interface DNASceneProps {
  className?: string;
}

const DNAScene: React.FC<DNASceneProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas className="rounded-xl shadow-lg">
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <DNAHelix />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default DNAScene;
