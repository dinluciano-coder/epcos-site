"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import ThreeDScanner from "./ThreeDScanner";
import TiltWrapper from "./TiltWrapper";

export default function ScannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Animate title and badge
    gsap.fromTo(
      ".scanner-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Animate specs stagger
    gsap.fromTo(
      ".spec-item",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".spec-item",
          start: "top 85%",
        },
      }
    );
  }, []);

  const specs = [
    { label: "Precisão", value: "0.02 mm" },
    { label: "Tecnologia", value: "Laser + NIR" },
    { label: "Velocidade", value: "60 fps" },
    { label: "Conexão", value: "Wi-Fi 6" }
  ];

  return (
    <section ref={sectionRef} id="scanner" className="py-16 md:py-24 relative overflow-x-clip bg-[#F8F8FA] z-10 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        
        {/* Left Side: Text and Specs */}
        <div className="flex flex-col z-10">
          <div className="scanner-text inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full border border-[rgba(0,0,0,0.06)] shadow-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-[#7B2D3B]"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B]">Hardware</span>
          </div>
          <h2 className="scanner-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1A1A1A] tracking-tight">
            Creality <span className="text-[#7B2D3B]">Raptor X.</span>
          </h2>
          <p className="scanner-text text-lg text-[#6B6B6B] leading-relaxed mb-10 max-w-lg">
            Equipados com o scanner híbrido de nível metrológico Creality Raptor X. Combinando 41 linhas de laser azul e luz estruturada infravermelha (NIR), garantimos digitalização 3D de peças de qualquer material com precisão absoluta para engenharia reversa.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {specs.map((spec, i) => (
              <div key={i} className="spec-item bg-white p-5 rounded-2xl border border-[rgba(0,0,0,0.04)] shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-semibold text-[#6B6B6B] mb-1">{spec.label}</div>
                <div className="text-2xl font-bold text-[#1A1A1A]">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive 3D Exploding Model */}
        <div className="relative h-[500px] md:h-[700px] w-full flex items-center justify-center">
          
          {/* Glass Pedestal Background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
            <TiltWrapper maxTilt={15} className="w-[80%] h-[120%]">
              <div className="w-full h-full bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-[rgba(255,255,255,0.8)] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transform -rotate-6 scale-95 glass-card" style={{ transform: "rotate(-6deg) scale(0.95) translateZ(40px)" }} />
            </TiltWrapper>
          </div>

          <ThreeDScanner containerRef={sectionRef as React.RefObject<HTMLDivElement>} />
          
        </div>
      </div>
    </section>
  );
}
