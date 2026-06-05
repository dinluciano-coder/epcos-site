"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import TiltWrapper from "./TiltWrapper";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      ".project-card-anim",
      { opacity: 0, scale: 0.9, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
        onComplete: () => {
          gsap.to(".project-card-anim", {
            y: -10,
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            stagger: {
              each: 0.3,
              from: "start"
            }
          });
        }
      }
    );
  }, []);

  const projects = [
    {
      title: "Projeto de Automação Industrial",
      category: "Célula Robótica",
      image: "/projeto-mecanico-1.jpg",
      desc: "Desenvolvimento completo de células automatizadas, desde a concepção 3D até a validação virtual. Nossos projetos mecânicos garantem precisão estrutural para robótica de alta performance, minimizando ciclos e elevando a produtividade."
    },
    {
      title: "Engenharia de Dispositivos e Dispositivos de Montagem",
      category: "Engenharia Mecânica",
      image: "/projeto-mecanico-2.jpg",
      desc: "Projetos de engenharia mecânica focados em dispositivos precisos para montagem e inspeção. Garantimos o dimensionamento exato, escolha de materiais adequados e modelagem CAD detalhada para suportar as linhas mais exigentes."
    },
    {
      title: "Sistemas de Movimentação e Esteiras Inteligentes",
      category: "Projetos 3D e Estrutural",
      image: "/projeto-mecanico-3.jpg",
      desc: "Layout 3D e detalhamento de sistemas complexos de manufatura. Analisamos a cinemática e a resistência de cada componente para criar linhas de envase e esteiras que operam 24/7 com extrema estabilidade mecânica."
    }
  ];

  return (
    <section ref={sectionRef} id="projetos" data-theme="dark" className="py-16 md:py-24 relative bg-[#1A1A1A] text-white rounded-t-[3rem] -mt-10 z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Nossos <span className="text-[#7B2D3B]">Projetos</span>
            </h2>
            <p className="text-[#9A9A9A] text-lg max-w-xl">
              Um portfólio de excelência. Projetos mecânicos rigorosos, renderizados e desenvolvidos com o estado da arte da engenharia para a indústria 4.0.
            </p>
          </div>
          <div>
            <MagneticButton theme="dark" href="#contato">Iniciar Projeto</MagneticButton>
          </div>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((proj, i) => (
            <div key={i} className={`project-card-anim flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
              
              {/* Quadro da Imagem */}
              <div className="w-full lg:w-1/2">
                <TiltWrapper maxTilt={5} className="w-full">
                  <div className="relative rounded-3xl overflow-hidden glass-card-dark border border-white/5 shadow-2xl">
                    <div className="aspect-[4/3] md:aspect-video lg:aspect-square w-full relative group">
                      <div className="absolute inset-0 bg-[#7B2D3B]/10 group-hover:bg-transparent transition-all duration-500 z-10 pointer-events-none"></div>
                      <img 
                        src={proj.image} 
                        alt={proj.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </TiltWrapper>
              </div>

              {/* Texto ao lado */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 rounded-full border border-white/10 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B2D3B]"></span>
                  <span className="text-[10px] font-bold tracking-widest text-[#9A9A9A] uppercase">{proj.category}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{proj.title}</h3>
                <p className="text-[#9A9A9A] text-lg leading-relaxed">
                  {proj.desc}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
