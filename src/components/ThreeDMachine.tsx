"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

interface ThreeDMachineProps {
  containerRef: React.RefObject<HTMLElement | null>;
  type: "A" | "B" | "C";
}

function MachineGeometry({ type, containerRef }: ThreeDMachineProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Scroll animation
  useGSAP(() => {
    if (!containerRef.current || !groupRef.current) return;

    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2.5,
      x: Math.PI * 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, [containerRef]);

  // Metallic Material
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#2a2a2a",
    metalness: 0.9,
    roughness: 0.15,
    envMapIntensity: 2,
  }), []);

  const highlightMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#7B2D3B",
    metalness: 0.7,
    roughness: 0.3,
  }), []);

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        
        {type === "A" && (
          // Célula Robótica Estilizada (Braços e juntas)
          <group scale={1.2}>
            {/* Base */}
            <mesh position={[0, -1.5, 0]} material={material}>
              <cylinderGeometry args={[1.5, 2, 0.5, 32]} />
            </mesh>
            {/* Eixo Principal */}
            <mesh position={[0, 0, 0]} material={material}>
              <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
            </mesh>
            {/* Junta 1 */}
            <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]} material={highlightMaterial}>
              <cylinderGeometry args={[0.7, 0.7, 1.2, 32]} />
            </mesh>
            {/* Braço secundário */}
            <mesh position={[1, 1.5, 0]} rotation={[0, 0, Math.PI / 4]} material={material}>
              <boxGeometry args={[2.5, 0.4, 0.4]} />
            </mesh>
            {/* Cabeça do robô */}
            <mesh position={[2, 2.5, 0]} material={material}>
              <boxGeometry args={[1, 1, 1]} />
            </mesh>
            {/* Laser / Ferramenta */}
            <mesh position={[2, 2.5, 0.6]} rotation={[Math.PI / 2, 0, 0]} material={highlightMaterial}>
              <coneGeometry args={[0.3, 1, 16]} />
            </mesh>
          </group>
        )}

        {type === "B" && (
          // Turbina / Eixo Rotativo (Retrofit)
          <group scale={1.5}>
            {/* Carcaça externa */}
            <mesh material={material} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.5, 0.4, 32, 64]} />
            </mesh>
            <mesh material={highlightMaterial} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.2, 0.1, 16, 64]} />
            </mesh>
            {/* Eixo central */}
            <mesh material={material} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 4, 32]} />
            </mesh>
            {/* Pás da turbina */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <mesh key={i} position={[0, 0, 0]} rotation={[0, (i * Math.PI) / 4, 0]} material={material}>
                <boxGeometry args={[2.8, 0.1, 0.5]} />
              </mesh>
            ))}
          </group>
        )}

        {type === "C" && (
          // Linha de Envase / Estrutura Complexa
          <group scale={1.3}>
            {/* Plataforma */}
            <mesh position={[0, -1, 0]} material={material}>
              <boxGeometry args={[4, 0.2, 2]} />
            </mesh>
            {/* Esteira */}
            <mesh position={[0, -0.7, 0]} material={highlightMaterial}>
              <boxGeometry args={[4.2, 0.1, 1]} />
            </mesh>
            {/* Pilares */}
            <mesh position={[-1.5, 0.5, -0.8]} material={material}>
              <cylinderGeometry args={[0.15, 0.15, 3, 16]} />
            </mesh>
            <mesh position={[1.5, 0.5, -0.8]} material={material}>
              <cylinderGeometry args={[0.15, 0.15, 3, 16]} />
            </mesh>
            {/* Cabeçotes de Envase */}
            {[-1, 0, 1].map((x) => (
              <group key={x} position={[x, 1, 0]}>
                <mesh material={material}>
                  <boxGeometry args={[0.5, 0.8, 0.5]} />
                </mesh>
                <mesh position={[0, -0.5, 0]} material={highlightMaterial}>
                  <cylinderGeometry args={[0.1, 0.05, 0.5, 16]} />
                </mesh>
                {/* Garrafa sendo preenchida */}
                <mesh position={[0, -1.3, 0]} material={new THREE.MeshPhysicalMaterial({ color: "#fff", transmission: 0.9, opacity: 1, transparent: true, roughness: 0.1 })}>
                  <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
                </mesh>
              </group>
            ))}
          </group>
        )}

      </Float>
    </group>
  );
}

export default function ThreeDMachine({ containerRef, type }: ThreeDMachineProps) {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "400px" } // Mount well before it comes into view to prevent pop-in
    );
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full absolute inset-0">
      {isVisible && (
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
          {/* Iluminação de Estúdio Industrial */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, 10, -5]} intensity={1} color="#7B2D3B" />
          <spotLight position={[0, 5, 0]} intensity={2} angle={0.6} penumbra={0.5} color="#ffffff" />
          
          {/* Reflexos HDRI */}
          <Environment preset="city" />

          {/* Modelo 3D */}
          <MachineGeometry type={type} containerRef={containerRef} />

          {/* Sombra de Contato para ancorar no chão */}
          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        </Canvas>
      )}
    </div>
  );
}
