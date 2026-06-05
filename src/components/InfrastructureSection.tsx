"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

const infraData = [
  {
    id: "eng",
    title: "Engenharia Mecânica",
    desc: "Um ambiente projetado para a alta performance técnica. Nossas estações de trabalho de última geração suportam simulações complexas e modelagens CAD pesadas, garantindo que nossos engenheiros tenham as melhores ferramentas do mercado para criar os seus projetos com zero margem de erro.",
    image: "/infra-eng.png",
  },
  {
    id: "meeting",
    title: "Sala de Reuniões",
    desc: "Onde as grandes ideias tomam forma. Uma infraestrutura completa para alinhar escopos, apresentar projetos em grandes telas e tomar decisões críticas de engenharia com você, nosso cliente. Conforto, privacidade e foco total no seu negócio.",
    image: "/infra-meeting.png",
  },
  {
    id: "metrology",
    title: "Sala de Escaneamento 3D",
    desc: "Equipamentos de ponta e iluminação controlada para máxima precisão metrológica. Nosso laboratório é dedicado à engenharia reversa e inspeção de peças complexas, entregando nuvens de pontos e malhas 3D com precisão micrométrica.",
    image: "/infra-metrology.png",
  }
];

export default function InfrastructureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>(infraData[0].id);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      ".infra-anim",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="infraestrutura" className="py-24 relative bg-[#050505] text-white z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 infra-anim">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 rounded-full border border-white/10 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B2D3B]"></span>
            <span className="text-[10px] font-bold tracking-widest text-[#9A9A9A] uppercase">Instalações Físicas</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            Nossa <span className="text-[#7B2D3B]">Infraestrutura</span>
          </h2>
          <p className="text-[#9A9A9A] text-lg max-w-2xl">
            Estrutura física de ponta preparada para receber grandes desafios da engenharia. Da concepção no CAD até a engenharia reversa de alta precisão.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-[600px] infra-anim">
          {infraData.map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 ${
                  isActive ? "flex-grow lg:w-[60%] shadow-2xl ring-1 ring-white/10" : "flex-grow-0 lg:w-[15%] h-24 lg:h-full opacity-60 hover:opacity-100"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className={`object-cover transition-transform duration-1000 ${isActive ? 'scale-100' : 'scale-110'}`}
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-60'}`}></div>
                </div>

                {/* Content */}
                <div className={`absolute bottom-0 left-0 w-full p-8 md:p-12 transition-all duration-700 flex flex-col justify-end h-full ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 lg:opacity-100'}`}>
                  
                  {/* Vertical Title (for collapsed state on desktop) */}
                  {!isActive && (
                    <div className="hidden lg:block absolute bottom-12 left-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap origin-bottom-left text-xl font-bold tracking-widest text-white/80">
                      {item.title}
                    </div>
                  )}

                  {/* Active Content */}
                  <div className={`transition-all duration-500 delay-200 ${isActive ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4 hidden lg:block'}`}>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h3>
                    <p className="text-[#CCCCCC] text-base md:text-lg max-w-xl leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                {/* Mobile Collapsed Title */}
                {!isActive && (
                  <div className="lg:hidden absolute inset-0 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white drop-shadow-md">{item.title}</h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
