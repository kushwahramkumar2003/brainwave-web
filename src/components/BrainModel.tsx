import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Brain() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime / 4) / 8;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Sphere args={[1.5, 128, 128]} ref={meshRef}>
      <MeshDistortMaterial
        color="#4FD1C5"
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.5}
        metalness={0.5}
      />
    </Sphere>
  );
}

export function BrainModel() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Brain />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
