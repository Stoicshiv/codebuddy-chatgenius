
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const markersGroupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.12;
    }
    if (markersGroupRef.current) {
      markersGroupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Create markers on the globe
  const markers = [];
  const markerPositions = [
    { lat: 40.7128, lng: -74.006 },  // New York
    { lat: 51.5074, lng: -0.1278 },  // London
    { lat: 35.6762, lng: 139.6503 }, // Tokyo
    { lat: -33.8688, lng: 151.2093 }, // Sydney
    { lat: 37.7749, lng: -122.4194 }, // San Francisco
    { lat: 48.8566, lng: 2.3522 },   // Paris
  ];

  // Convert lat/lng to 3D position
  const latLngToVector3 = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return new THREE.Vector3(x, y, z);
  };

  markerPositions.forEach((pos, i) => {
    const position = latLngToVector3(pos.lat, pos.lng, 2.1);
    markers.push(
      <mesh key={i} position={[position.x, position.y, position.z]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ff4c4c" emissive="#ff4c4c" emissiveIntensity={0.5} />
      </mesh>
    );
  });

  return (
    <>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#1e5799"
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      
      {/* Continents */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.01, 64, 64]} />
        <meshStandardMaterial 
          color="#2ecc71"
          metalness={0.1}
          roughness={0.6}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* Clouds */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent={true}
          opacity={0.3}
        />
      </mesh>
      
      {/* Location Markers */}
      <group ref={markersGroupRef}>
        {markers}
      </group>
    </>
  );
};

interface GlobeSceneProps {
  className?: string;
}

const GlobeScene: React.FC<GlobeSceneProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas className="rounded-xl shadow-lg">
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

export default GlobeScene;
