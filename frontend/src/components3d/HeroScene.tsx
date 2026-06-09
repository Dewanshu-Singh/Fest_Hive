'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial, Environment } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useState, useRef } from 'react';
import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ParticleSwarm(props: any) {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 10 }) as Float32Array);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#d4af37"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  const shapes = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (shapes.current) {
      shapes.current.rotation.y = state.clock.elapsedTime * 0.1;
      shapes.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={shapes}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 2, -5]} rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#6b21a8" wireframe />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4, -2, -2]} rotation={[0.2, 0.8, 0]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial color="#d4af37" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, -4, -6]} rotation={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 bg-background">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#d4af37" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#6b21a8" />
        <ParticleSwarm />
        <FloatingShapes />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
