"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

const scannerData = [
  {
    id: "step1",
    title: "Varredura Física",
    desc: "Captura inicial da nuvem de pontos com nosso scanner 3D de alta precisão a laser.",
    image: "/scanner-accordion-1.jpg",
  },
  {
    id: "step2",
    title: "Nuvem de Pontos",
    desc: "Processamento dos dados brutos com redução de ruído e alinhamento espacial milimétrico.",
    image: "/scanner-accordion-2.jpg",
  },
  {
    id: "step3",
    title: "Malha e Otimização",
    desc: "Limpeza e preenchimento de lacunas para gerar a geometria sólida base para a engenharia.",
    image: "/scanner-accordion-3.jpg",
  },
  {
    id: "step4",
    title: "Análise de Tolerância",
    desc: "Inspeção visual em mapa de cores comparando a peça escaneada com os limites rigorosos do CAD original.",
    image: "/scanner-accordion-4.jpg",
  },
  {
    id: "step5",
    title: "Reconstrução CAD",
    desc: "Modelagem parametrizada final (NURBS), pronta para fabricação, usinagem CNC ou impressão 3D.",
    image: "/scanner-accordion-5.jpg",
  }
];

export default function ScannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>(scannerData[0].id);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
    // Animate texts
    gsap.fromTo(
      ".scanner-anim",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="scanner" className="py-24 relative bg-white text-[#1A1A1A] z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 scanner-anim text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white rounded-full border border-[rgba(0,0,0,0.06)] shadow-sm w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B2D3B]"></span>
            <span className="text-[10px] font-bold tracking-widest text-[#6B6B6B] uppercase">Diferencial Tecnológico</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Engenharia Reversa <span className="text-[#7B2D3B]">de Alta Fidelidade.</span>
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-3xl leading-relaxed">
            Integramos a metrologia 3D diretamente aos nossos projetos mecânicos. Isso nos permite digitalizar o seu chão de fábrica e projetar soluções de automação e peças de reposição com encaixe perfeito, minimizando paradas e maximizando a eficiência da sua indústria.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-[400px] md:h-[500px] lg:h-[550px] scanner-anim">
          {scannerData.map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 ${
                  isActive ? "flex-grow lg:w-[75%] shadow-2xl ring-1 ring-black/5" : "flex-grow-0 lg:w-[6%] h-24 lg:h-full opacity-80 hover:opacity-100"
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
                  {/* Gradient Overlay for text readability (dark gradient at bottom) */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-40'}`}></div>
                </div>

                {/* Content */}
                <div className={`absolute bottom-0 left-0 w-full p-6 md:p-10 transition-all duration-700 flex flex-col justify-end h-full ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 lg:opacity-100'}`}>
                  
                  {/* Vertical Title (for collapsed state on desktop) */}
                  {!isActive && (
                    <div className="hidden lg:block absolute bottom-12 left-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap origin-bottom-left text-lg font-bold tracking-widest text-white/90 drop-shadow-md">
                      {item.title}
                    </div>
                  )}

                  {/* Active Content */}
                  <div className={`transition-all duration-500 delay-200 text-white ${isActive ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4 hidden lg:block'}`}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg">{item.title}</h3>
                    <p className="text-white/90 text-sm md:text-base max-w-lg leading-relaxed drop-shadow">
                      {item.desc}
                    </p>
                  </div>
                </div>
                
                {/* Mobile Collapsed Title */}
                {!isActive && (
                  <div className="lg:hidden absolute inset-0 flex items-center justify-center">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">{item.title}</h3>
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
