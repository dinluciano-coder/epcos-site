"use client";

import React, { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

interface TiltCardProps {
  title: string;
  description: string;
  delay?: number;
}

function TiltCard({ title, description, delay = 0 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  
  const rotateXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const rotateYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const glareXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const glareYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const glareOpacityTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    if (!cardRef.current || !glareRef.current) return;
    
    rotateXTo.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.5, ease: "power3.out" });
    rotateYTo.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.5, ease: "power3.out" });
    
    glareXTo.current = gsap.quickTo(glareRef.current, "x", { duration: 0.5, ease: "power3.out" });
    glareYTo.current = gsap.quickTo(glareRef.current, "y", { duration: 0.5, ease: "power3.out" });
    glareOpacityTo.current = gsap.quickTo(glareRef.current, "opacity", { duration: 0.5, ease: "power3.out" });
    
    // Initial float animation
    gsap.to(cardRef.current, {
      y: "-=15",
      duration: 3 + Math.random(),
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: delay
    });
  }, [delay]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (-1 to 1)
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    // Max rotation in degrees
    const maxRotate = 15;
    
    rotateXTo.current?.(normalizedY * -maxRotate);
    rotateYTo.current?.(normalizedX * maxRotate);
    
    // Move glare opposite to mouse
    glareXTo.current?.(normalizedX * -50);
    glareYTo.current?.(normalizedY * -50);
    glareOpacityTo.current?.(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    rotateXTo.current?.(0);
    rotateYTo.current?.(0);
    glareOpacityTo.current?.(0);
  }, []);

  return (
    <div 
      className="perspective-1000 relative z-10 w-full"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-3xl p-8 md:p-10 flex flex-col justify-start transition-all duration-300 transform-gpu"
        style={{
          background: "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Dynamic Glare Effect */}
        <div 
          ref={glareRef}
          className="absolute inset-0 pointer-events-none opacity-0 mix-blend-overlay"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 60%)",
            width: "200%",
            height: "200%",
            left: "-50%",
            top: "-50%",
            transform: "translateZ(1px)",
          }}
        />

        <div className="relative z-10 transform-gpu" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1A1A] tracking-tight">{title}</h3>
          <p className="text-[#6B6B6B] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GlassCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      ".glass-3d-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
    
    gsap.fromTo(
      ".glass-3d-card-wrapper",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  const features = [
    {
      title: "Precisão Absoluta",
      description: "Captura de dados com margem de erro sub-milimétrica. Qualidade que define o padrão da indústria."
    },
    {
      title: "Integração Fluida",
      description: "Do escaneamento direto para o seu software CAD. Fluxo de trabalho sem interrupções."
    },
    {
      title: "Análise Estrutural",
      description: "Identificação de falhas e otimização de materiais através de escaneamento profundo."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 relative overflow-x-clip bg-[#F0F0F2]">
      
      {/* Decorative background blobs to enhance glass effect on mobile and desktop */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#7B2D3B]/10 to-transparent blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-full md:w-[40rem] h-[500px] bg-white/80 rounded-full blur-[80px] pointer-events-none transform translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 glass-3d-title">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">
            Engenharia de <span className="text-[#7B2D3B]">Excelência</span>
          </h2>
          <p className="mt-6 text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Projetos mecânicos complexos, automação industrial e escaneamento 3D com nível metrológico para garantir máxima performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, i) => (
            <div key={i} className="glass-3d-card-wrapper">
              <TiltCard 
                title={feature.title} 
                description={feature.description} 
                delay={i * 0.2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
