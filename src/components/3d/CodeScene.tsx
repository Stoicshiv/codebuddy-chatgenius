
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera } from '@react-three/drei';
import { Color } from 'three';
import * as THREE from 'three';

const CodeObjects = () => {
  const boxRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.x += delta * 0.2;
      boxRef.current.rotation.y += delta * 0.3;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.3;
      torusRef.current.rotation.y += delta * 0.2;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={boxRef} position={[-1.5, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={new Color('#3e63dd')} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh ref={torusRef} position={[1.5, 0, 0]}>
          <torusGeometry args={[0.7, 0.3, 16, 100]} />
          <meshStandardMaterial color={new Color('#4cc38a')} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={sphereRef} position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial color={new Color('#e5484d')} metalness={0.5} roughness={0.2} />
        </mesh>
      </Float>
    </>
  );
};

interface CodeSceneProps {
  className?: string;
}

const CodeScene: React.FC<CodeSceneProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas className="rounded-xl shadow-lg">
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <CodeObjects />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default CodeScene;
