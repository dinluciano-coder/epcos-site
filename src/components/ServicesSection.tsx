"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import TiltWrapper from "./TiltWrapper";

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Cards flying in
    gsap.fromTo(
      cardsRef.current?.children || [],
      { 
        opacity: 0, 
        y: 100, 
        rotationX: -15, 
        transformPerspective: 1000 
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  const services = [
    {
      title: "Projetos Mecânicos Industriais",
      description: "Desenvolvimento de equipamentos, dispositivos e soluções mecânicas sob medida para aumentar a eficiência dos processos industriais.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
    {
      title: "Engenharia Reversa com Scanner 3D",
      description: "Digitalizamos peças e componentes para reconstrução CAD e desenvolvimento de novos projetos mecânicos.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
          <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
          <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
          <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
          <rect x="7" y="7" width="10" height="10" rx="1"></rect>
          <path d="M12 11v2"></path>
        </svg>
      )
    },
    {
      title: "Dispositivos e Soluções Industriais",
      description: "Projetos desenvolvidos para otimizar processos, aumentar a produtividade e melhorar a repetibilidade operacional.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 14.5a3 3 0 0 0-4-4V5a2 2 0 0 0-4 0v10"></path>
          <rect x="2" y="15" width="20" height="7" rx="2"></rect>
          <path d="M18 15v-3a3 3 0 0 0-3-3h-1"></path>
        </svg>
      )
    },
    {
      title: "Suporte Especializado em Engenharia",
      description: "Apoio técnico para avaliação, melhoria e desenvolvimento de soluções industriais.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} id="servicos" className="py-16 md:py-24 section-light relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-[#1A1A1A] tracking-tight">
            Serviços & Soluções
          </h2>
          <p className="text-base md:text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Soluções completas em engenharia e automação para elevar o patamar da sua produção industrial.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {services.map((service, i) => (
            <TiltWrapper key={i} maxTilt={8} className="h-full">
              <div className="glass-card relative overflow-hidden p-6 md:p-10 h-full">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B2D3B] to-[#9A3A4A] opacity-70"></div>
                
                <div className="flex items-start gap-5 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#7B2D3B]/10 flex items-center justify-center text-[#7B2D3B]">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 text-[#1A1A1A] leading-snug">{service.title}</h3>
                    <p className="text-sm md:text-base text-[#6B6B6B] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </TiltWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
