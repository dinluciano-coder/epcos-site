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
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
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
      title: "Célula Robótica de Solda",
      category: "Automação",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
      desc: "Automação completa de linha de soldagem automotiva com aumento de 40% na produtividade."
    },
    {
      title: "Retrofit de Torno CNC",
      category: "Engenharia Mecânica",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      desc: "Modernização do maquinário com escaneamento 3D para criação de novas peças de reposição."
    },
    {
      title: "Linha de Envase 4.0",
      category: "Projetos 3D",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
      desc: "Renderização e projeto mecânico de uma nova linha de envase para indústria de bebidas."
    }
  ];

  return (
    <section ref={sectionRef} id="projetos" data-theme="dark" className="py-16 md:py-24 relative bg-[#1A1A1A] text-white rounded-t-[3rem] -mt-10 z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Nossos <span className="text-[#7B2D3B]">Projetos</span>
            </h2>
            <p className="text-[#9A9A9A] text-lg max-w-xl">
              Um portfólio de excelência. Projetos reais renderizados e executados com o estado da arte da engenharia mecânica.
            </p>
          </div>
          <div>
            <MagneticButton theme="dark" href="#contato">Iniciar Projeto</MagneticButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <div key={i} className="project-card-anim h-full">
              <TiltWrapper maxTilt={10} className="h-full">
                <div className="group relative rounded-3xl overflow-hidden glass-card-dark transition-all duration-500 h-full flex flex-col">
                  
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
                    <img 
                      src={proj.image} 
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6 md:p-8 relative z-20 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/90 to-transparent -mt-20 pt-20 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                    <div className="text-xs font-bold tracking-widest text-[#7B2D3B] uppercase mb-2">
                      {proj.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{proj.title}</h3>
                    <p className="text-[#9A9A9A] text-sm leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>

                </div>
              </TiltWrapper>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
