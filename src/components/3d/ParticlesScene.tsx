
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Floating particles with connections
const Particles = ({ count = 100, distance = 5 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 2 * Math.PI;
      const z = (Math.random() * 2) - 1;
      const r = Math.sqrt(1 - z * z) * distance;
      
      const particle = {
        position: new THREE.Vector3(
          r * Math.cos(t), 
          r * Math.sin(t), 
          z * distance
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        color: new THREE.Color(
          0.5 + Math.random() * 0.5,
          0.5 + Math.random() * 0.5,
          0.5 + Math.random() * 0.5
        )
      };
      temp.push(particle);
    }
    return temp;
  }, [count, distance]);

  useFrame(() => {
    if (!mesh.current) return;

    particles.forEach((particle, i) => {
      // Move particles
      particle.position.add(particle.velocity);
      
      // Bounce off the boundaries
      const bounds = distance + 1;
      ['x', 'y', 'z'].forEach(axis => {
        if (Math.abs(particle.position[axis]) > bounds) {
          particle.velocity[axis] *= -1;
        }
      });
      
      // Update the instancedMesh
      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      
      // Set colors
      mesh.current.setColorAt(i, particle.color);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
};

interface ParticlesSceneProps {
  className?: string;
}

const ParticlesScene: React.FC<ParticlesSceneProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas className="rounded-xl shadow-lg">
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles count={150} distance={4} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default ParticlesScene;
