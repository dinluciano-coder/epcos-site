"use client";

import { useRef, useState, useEffect } from "react";
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
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    if (!sectionRef.current) return;
    
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

  // Auto-play logic
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = scannerData.findIndex((item) => item.id === current);
        const nextIndex = (currentIndex + 1) % scannerData.length;
        return scannerData[nextIndex].id;
      });
    }, 4000); // changes every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const activeItem = scannerData.find(item => item.id === activeTab) || scannerData[0];

  return (
    <section ref={sectionRef} id="scanner" className="py-24 relative bg-[#FAFAFA] text-[#1A1A1A] z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 scanner-anim text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white rounded-full border border-[rgba(0,0,0,0.06)] shadow-sm w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B2D3B]"></span>
            <span className="text-[10px] font-bold tracking-widest text-[#6B6B6B] uppercase">Diferencial Tecnológico</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Engenharia Reversa <span className="text-[#7B2D3B]">com Scanner 3D de precisão 0,02 mm.</span>
          </h2>
          <p className="text-[#6B6B6B] text-lg max-w-3xl leading-relaxed">
            Utilizamos escaneamento 3D para transformar peças físicas em modelos digitais precisos, acelerando o desenvolvimento de projetos mecânicos.
          </p>
        </div>

        {/* Accordion Layout */}
        <div 
          className="flex flex-col lg:flex-row gap-2 md:gap-4 h-[430px] md:h-[500px] lg:h-[550px] scanner-anim"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {scannerData.map((item) => {
            const isActive = activeTab === item.id;
            
            return (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-shrink-0 ${
                  isActive ? "flex-grow lg:w-[75%] shadow-xl ring-1 ring-black/5" : "flex-grow-0 lg:w-[6%] h-12 md:h-24 lg:h-full opacity-70 hover:opacity-100"
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
                  {/* Subtle overlay just for contrast on collapsed items */}
                  <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-40'}`}></div>
                </div>

                {/* Vertical Title (for collapsed state on desktop) */}
                <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 -rotate-90 whitespace-nowrap origin-bottom-left text-sm md:text-lg font-bold tracking-widest text-white drop-shadow-md transition-opacity duration-300 ${isActive ? 'opacity-0 hidden lg:block' : 'opacity-100 hidden lg:block'}`}>
                  {item.title}
                </div>
                
                {/* Mobile Collapsed Title */}
                {!isActive && (
                  <div className="lg:hidden absolute inset-0 flex items-center justify-center">
                    <h3 className="text-sm md:text-lg font-bold text-white tracking-widest drop-shadow-lg">{item.title}</h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Text Below Accordion */}
        <div className="mt-8 scanner-anim min-h-[100px] flex flex-col md:flex-row md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-[rgba(0,0,0,0.04)]">
          <div className="md:w-1/3">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{activeItem.title}</h3>
          </div>
          <div className="md:w-2/3 md:border-l md:border-gray-100 md:pl-8">
            <p className="text-[#6B6B6B] text-base md:text-lg leading-relaxed">
              {activeItem.desc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
