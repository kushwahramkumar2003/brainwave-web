import React, { useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Text,
  Float,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import UseCases from "../components/UseCases";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Button from "../components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const BrainParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 10;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005;
      particlesRef.current.rotation.y += 0.001;

      const time = state.clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        particlesRef.current.geometry.attributes.position.array[i3 + 1] +=
          Math.sin(time + positions[i3]) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={(0.05 * viewport.width) / 10}
        color="#8ab4f8"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

const BrainSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.001;
      sphereRef.current.position.y =
        Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Sphere ref={sphereRef} visible args={[1.5, 64, 64]} scale={1.5}>
      <MeshDistortMaterial
        color="#4a90e2"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.8}
        transparent
        opacity={0.9}
      />
    </Sphere>
  );
};

const FloatingText = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Text fontSize={0.5} position={[0, 2.5, 0]} color="#ffffff">
        Brainwave
      </Text>
    </Float>
  );
};

const Scene = () => {
  const { viewport } = useThree();

  return (
    <>
      <BrainSphere />
      <BrainParticles />
      <FloatingText />
      <Stars
        radius={100}
        depth={50}
        count={viewport.width < 768 ? 3000 : 5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const heroElement = heroRef.current;

    gsap.fromTo(
      heroElement,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: heroElement,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main>
        <section
          ref={heroRef}
          className="relative h-screen flex items-center justify-center overflow-hidden max-md:flex max-md:flex-col max-md:gap-4"
        >
          <Canvas className="absolute inset-0" dpr={[1, 2]}>
            <Scene />
          </Canvas>

          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to Brainwave
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your AI-powered second brain for seamless knowledge management
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" text="Get Started" />
            </motion.div>
          </div>
        </section>

        <Features />
        <HowItWorks />
        <UseCases />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
