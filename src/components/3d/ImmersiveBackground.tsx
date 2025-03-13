
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Plane } from '@react-three/drei';
import * as THREE from 'three';

// Shader for the wavy background effect
const WaveMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prevTime, setPrevTime] = useState(0);

  // Vertex shader for the wave effect
  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader for wave effect
  const fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      vec2 mouseNorm = mouse / resolution;
      
      // Warping effect based on mouse position and time
      float dist = distance(uv, mouseNorm) * 2.0;
      float waveSin = sin(dist * 10.0 - time * 0.5) * 0.05;
      float waveEffect = waveSin * (1.0 - dist);
      
      // Color gradient based on position
      vec3 color1 = vec3(0.1, 0.3, 0.9); // Blue
      vec3 color2 = vec3(0.5, 0.1, 0.8); // Purple
      vec3 color = mix(color1, color2, uv.y + waveEffect);
      
      // Add ripple effect from mouse
      float rippleStrength = exp(-dist * 4.0) * 0.1;
      color += vec3(rippleStrength);
      
      gl_FragColor = vec4(color, 1.0);
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
      />
    </Plane>
  );
};

// Floating particles effect
const Particles = ({ count = 50 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  // Set up particles
  useEffect(() => {
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        // Random positions
        dummy.position.set(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.9) * 2
        );
        
        // Random scales
        const scale = 0.1 + Math.random() * 0.2;
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [count]);
  
  useFrame((state) => {
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        mesh.current.getMatrixAt(i, dummy.matrix);
        dummy.position.y += Math.sin(state.clock.elapsedTime + i) * 0.003;
        dummy.position.x += Math.cos(state.clock.elapsedTime + i * 0.5) * 0.002;
        dummy.rotation.z += 0.002;
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const ImmersiveBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas className="w-full h-full" dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 2]} />
        <WaveMaterial />
        <Particles count={40} />
        <ambientLight intensity={0.4} />
      </Canvas>
    </div>
  );
};

export default ImmersiveBackground;
