"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows, RoundedBox, Cylinder } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsapConfig";

// O modelo 3D abstrato do Scanner
function AbstractScannerModel({ scrollTriggerRef }: { scrollTriggerRef: React.RefObject<HTMLDivElement | null> }) {
  const headRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const mainGroupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (!headRef.current || !handleRef.current || !baseRef.current || !mainGroupRef.current || !scrollTriggerRef.current) return;

    // Criamos uma timeline de ScrollTrigger que atua diretamente nos objetos do Three.js
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTriggerRef.current,
        start: "top bottom", // Começa a girar quando entra na tela
        end: "bottom top", 
        scrub: 1, // Suavidade
      }
    });

    // Rotação extra e contínua durante o scroll para ver todos os ângulos
    tl.to(mainGroupRef.current.rotation, { y: Math.PI * 4, ease: "none" }, 0);

  }, [scrollTriggerRef]);

  // Rotação lenta constante
  useFrame(() => {
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y += 0.002;
    }
  });

  const materialDark = new THREE.MeshStandardMaterial({ 
    color: "#1A1A1A", 
    roughness: 0.2, 
    metalness: 0.8 
  });

  const materialAccent = new THREE.MeshStandardMaterial({ 
    color: "#7B2D3B", 
    roughness: 0.1, 
    metalness: 0.9,
    emissive: "#7B2D3B",
    emissiveIntensity: 0.5
  });

  const materialGlass = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    metalness: 0.1,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
  });

  return (
    <group ref={mainGroupRef} position={[0, -0.5, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* CABEÇA DO SCANNER (Câmeras e Sensores) */}
        <group ref={headRef} position={[0, 1.2, 0]}>
          <RoundedBox args={[3, 0.8, 1]} radius={0.2} smoothness={4} material={materialDark} />
          {/* Lentes / Sensores */}
          <Cylinder args={[0.3, 0.3, 1.1, 32]} position={[-1, 0, 0]} rotation={[Math.PI/2, 0, 0]} material={materialGlass} />
          <Cylinder args={[0.3, 0.3, 1.1, 32]} position={[1, 0, 0]} rotation={[Math.PI/2, 0, 0]} material={materialGlass} />
          {/* Laser central */}
          <Cylinder args={[0.1, 0.1, 1.05, 32]} position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]} material={materialAccent} />
        </group>

        {/* CORPO/CABO DO SCANNER */}
        <group ref={handleRef} position={[0, 0, 0]}>
          <Cylinder args={[0.4, 0.3, 2, 32]} position={[0, -0.5, 0]} material={materialDark} />
          {/* Botão/Gatilho */}
          <RoundedBox args={[0.2, 0.4, 0.4]} position={[0, 0, 0.3]} radius={0.05} material={materialAccent} />
        </group>

        {/* BASE DO SCANNER */}
        <group ref={baseRef} position={[0, -1.8, 0]}>
          <RoundedBox args={[2, 0.4, 1.5]} radius={0.1} smoothness={4} material={materialDark} />
          {/* Luzes de status */}
          <mesh position={[-0.5, 0.21, 0.5]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#00ff00" />
          </mesh>
        </group>

      </Float>
    </group>
  );
}

export default function ThreeDScanner({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "200px 0px" }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-[500px] md:h-[700px] absolute -inset-10 md:-inset-20 pointer-events-none z-0">
      {isVisible && (
        <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <AbstractScannerModel scrollTriggerRef={containerRef} />
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={20} blur={2.5} far={10} resolution={512} color="#000000" />
        </Canvas>
      )}
    </div>
  );
}
