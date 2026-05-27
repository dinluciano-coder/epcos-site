"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import TiltWrapper from "./TiltWrapper";

export default function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      ".careers-content",
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="carreiras" className="py-16 relative overflow-x-clip bg-white z-10">
      
      {/* Decorative large text behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02]">
        <h2 className="text-[15vw] font-black leading-none whitespace-nowrap">TALENTOS</h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center careers-content relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A] tracking-tight">
          Trabalhe Conosco
        </h2>
        <p className="text-lg text-[#6B6B6B] mb-12">
          Estamos sempre em busca de mentes brilhantes. Se você é um engenheiro apaixonado por desafios de precisão e tecnologias emergentes, a EPCOS é o seu lugar.
        </p>

        <TiltWrapper maxTilt={8}>
          <div className="glass-card p-8 md:p-12 inline-flex flex-col items-center max-w-2xl mx-auto w-full">
            <svg className="w-12 h-12 text-[#7B2D3B] mb-6 transform-gpu" style={{ transform: "translateZ(30px)" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <h3 className="text-2xl font-bold mb-3 text-[#1A1A1A] transform-gpu" style={{ transform: "translateZ(25px)" }}>Vagas Abertas</h3>
            <p className="text-[#6B6B6B] mb-8 transform-gpu" style={{ transform: "translateZ(20px)" }}>
              Neste momento, avaliamos currículos para o banco de talentos de <strong className="text-[#1A1A1A]">Engenheiro Mecânico Sênior</strong> e <strong className="text-[#1A1A1A]">Especialista em Metrologia 3D</strong>.
            </p>
            <div className="transform-gpu" style={{ transform: "translateZ(35px)" }}>
              <MagneticButton href="mailto:vagas@epcos.com.br">
                Enviar Currículo
              </MagneticButton>
            </div>
          </div>
        </TiltWrapper>
      </div>
    </section>
  );
}
