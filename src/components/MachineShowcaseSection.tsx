"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import ThreeDMachine from "./ThreeDMachine";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";

const projects = [
  {
    type: "A" as const,
    title: "Célula Robótica de Soldagem Automotiva",
    category: "Automação Industrial",
    desc: "Automação completa da linha de montagem com braços robóticos de 6 eixos. Integração de sensores de visão computacional para correção de trajetória em tempo real. Aumento de 40% na velocidade de produção e eliminação de falhas de solda.",
  },
  {
    type: "B" as const,
    title: "Retrofit e Nacionalização de Turbina",
    category: "Engenharia Reversa",
    desc: "Escaneamento 3D metrológico de uma turbina importada danificada. Realizamos o projeto mecânico completo e adequação de materiais para nacionalização da peça, reduzindo o tempo e custo de manutenção da usina em 60%.",
  },
  {
    type: "C" as const,
    title: "Linha de Envase de Alta Performance",
    category: "Projetos Mecânicos",
    desc: "Projeto 3D completo de uma linha de envase asséptica para a indústria farmacêutica. Estrutura 100% em aço inox com esterilização UV integrada. Capacidade projetada e validada virtualmente para 12.000 frascos por hora.",
  }
];

export default function MachineShowcaseSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Stagger text elements appearing
    const sections = gsap.utils.toArray<HTMLElement>(".machine-section");
    
    sections.forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll(".machine-text"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} id="vitrine-3d" className="relative bg-[#050505] text-white py-12 z-20">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          Vitrine de <span className="text-[#7B2D3B]">Engenharia 3D.</span>
        </h2>
        <p className="text-[#9A9A9A] text-lg max-w-2xl mx-auto">
          Projetos gigantes exigem planejamento milimétrico. Visualize nossos modelos de maquinário renderizados em tempo real, exatamente como entregamos nos projetos finais.
        </p>
      </div>

      <div className="flex flex-col">
        {projects.map((proj, i) => {
          // Alternar layout esquerda/direita
          const isEven = i % 2 === 0;
          const sectionRef = useRef<HTMLDivElement>(null);

          return (
            <div 
              key={i} 
              ref={sectionRef}
              className={`machine-section relative min-h-[70vh] flex items-center border-t border-white/5 py-16 overflow-hidden`}
            >
              <div className={`max-w-7xl mx-auto px-6 w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 relative z-10`}>
                
                {/* Text Content */}
                <div className="flex-1 flex flex-col z-10 w-full">
                  <div className="machine-text inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 rounded-full border border-white/10 w-fit backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-[#7B2D3B]"></span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#9A9A9A]">{proj.category}</span>
                  </div>
                  <h3 className="machine-text text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    {proj.title}
                  </h3>
                  <p className="machine-text text-[#9A9A9A] text-lg leading-relaxed max-w-xl">
                    {proj.desc}
                  </p>
                </div>

                {/* 3D Model Container */}
                <div className="flex-1 w-full h-[400px] md:h-[500px] lg:h-[600px] relative pointer-events-none">
                  {/* Decorative background glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-[#7B2D3B]/10 blur-[100px] rounded-full" />
                  
                  <ThreeDMachine containerRef={sectionRef} type={proj.type} />
                </div>
                
              </div>
            </div>
          );
        })}
      </div>

      {/* GLOBAL CANVAS FOR VIEWS (Solves WebGL Context Limit on Mobile) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Canvas eventSource={containerRef as any} className="pointer-events-none" dpr={[1, 2]}>
          <View.Port />
        </Canvas>
      </div>
    </section>
  );
}
