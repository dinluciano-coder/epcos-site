"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import TiltWrapper from "./TiltWrapper";

const challenges = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Equipamentos sem desenho técnico",
    description: "Recriamos a documentação técnica completa a partir da peça física, via engenharia reversa.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Peças obsoletas ou importadas",
    description: "Desenvolvemos a solução nacional para substituir componentes fora de linha ou de difícil importação.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Desenvolvimento de dispositivos especiais",
    description: "Projetamos ferramentas, gabaritos e dispositivos sob medida para o seu processo produtivo.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Adequações e melhorias em máquinas existentes",
    description: "Analisamos e projetamos modificações para aumentar a eficiência, segurança e vida útil do seu maquinário.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Engenharia reversa para fabricação e reposição de componentes",
    description: "Digitalizamos e reconstruímos modelos CAD de peças para fabricação local ou reposição em série.",
  },
];

export default function HowWeHelpSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".help-anim",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="como-ajudamos" className="py-20 md:py-28 relative bg-[#F8F8FA] z-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="help-anim text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-white rounded-full border border-[rgba(0,0,0,0.06)] shadow-sm w-fit mx-auto">
            <span className="w-2 h-2 rounded-full bg-[#7B2D3B]"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B]">Nosso Foco</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight mb-4">
            Como Podemos Ajudar{" "}
            <span className="text-[#7B2D3B]">Sua Operação?</span>
          </h2>
          <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Atendemos os desafios mais comuns da indústria com soluções de engenharia desenvolvidas para cada necessidade.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {challenges.map((item, i) => (
            <TiltWrapper key={i} maxTilt={8} className="help-anim h-full">
              <div
                className="glass-card group relative h-full overflow-hidden p-6 md:p-8 flex flex-col gap-3 transition-all duration-300 transform-gpu"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7B2D3B] to-[#9A3A4A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="transform-gpu" style={{ transform: "translateZ(30px)" }}>
                  {/* Icon */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#7B2D3B]/10 flex items-center justify-center text-[#7B2D3B] flex-shrink-0 mb-3">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] mb-1.5 md:mb-2 leading-snug">{item.title}</h3>
                    <p className="text-xs md:text-sm text-[#6B6B6B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            </TiltWrapper>
          ))}

          {/* CTA Card */}
          <TiltWrapper maxTilt={5} className="help-anim md:col-span-2 lg:col-span-1 h-full">
            <div 
              className="relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between gap-4 bg-[#1A1A1A] text-white h-full transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#7B2D3B]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="transform-gpu" style={{ transform: "translateZ(20px)" }}>
                <h3 className="text-xl font-bold mb-2">Tem outro desafio?</h3>
                <p className="text-[#9A9A9A] text-sm leading-relaxed">
                  Nossa equipe de engenharia está pronta para avaliar sua situação e propor a melhor solução.
                </p>
              </div>
              <div className="transform-gpu" style={{ transform: "translateZ(30px)" }}>
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 bg-[#7B2D3B] text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#9A3A4A] transition-colors w-fit"
                >
                  Falar com Nossa Engenharia
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </TiltWrapper>
        </div>

      </div>
    </section>
  );
}
