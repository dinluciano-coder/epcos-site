"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import TiltWrapper from "./TiltWrapper";

const ProjectCarousel = ({ images, onImageClick }: { images: string[], onImageClick: (img: string) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div 
      className="aspect-[4/3] md:aspect-video lg:aspect-square w-full relative group cursor-zoom-in transform-gpu rounded-3xl overflow-hidden" 
      style={{ transform: "translateZ(30px)" }}
      onClick={() => onImageClick(images[currentIndex])}
    >
      <div className="absolute inset-0 bg-[#7B2D3B]/10 group-hover:bg-transparent transition-all duration-500 z-20 pointer-events-none"></div>
      
      {images.map((img, idx) => (
        <img 
          key={idx}
          src={img} 
          alt={`Project Image ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 scale-105'}`}
        />
      ))}
      
      {/* Carousel Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2 z-30">
          {images.map((_, idx) => (
            <button 
              key={idx} 
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-[#7B2D3B] w-8' : 'bg-white/40 w-2 hover:bg-white/80'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = [
    {
      title: "Projeto de Automação Industrial",
      category: "Célula Robótica",
      images: [
        "/projeto-mecanico-1-a.jpg",
        "/projeto-mecanico-1-b.jpg",
        "/projeto-mecanico-1-c.jpg"
      ],
      desc: "Desenvolvimento completo de células automatizadas, desde a concepção 3D até a validação virtual. Nossos projetos mecânicos garantem precisão estrutural para robótica de alta performance, minimizando ciclos e elevando a produtividade."
    },
    {
      title: "Engenharia de Dispositivos e Dispositivos de Montagem",
      category: "Engenharia Mecânica",
      images: ["/projeto-mecanico-2.jpg"],
      desc: "Projetos de engenharia mecânica focados em dispositivos precisos para montagem e inspeção. Garantimos o dimensionamento exato, escolha de materiais adequados e modelagem CAD detalhada para suportar as linhas mais exigentes."
    },
    {
      title: "Automação e Cinemática Industrial",
      category: "Projetos 3D e Estrutural",
      images: ["/projeto-mecanico-3.jpg"],
      desc: "Layout 3D e detalhamento de sistemas complexos de manufatura. Analisamos a cinemática e a resistência estrutural de cada componente para desenvolver máquinas customizadas que operam 24/7 com extrema estabilidade mecânica e eficiência."
    }
  ];

  return (
    <>
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
                  <TiltWrapper maxTilt={10} className="w-full">
                    {/* Parent Frame (Z=0) */}
                    <div className="relative rounded-3xl glass-card-dark border border-white/5 shadow-2xl transform-gpu" style={{ transformStyle: "preserve-3d" }}>
                      
                      {/* Image Layer (Z=30) - This pops out of the frame! */}
                      <ProjectCarousel images={proj.images} onImageClick={setSelectedImage} />

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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out opacity-0 animate-fade-in"
          style={{ animation: "fadeIn 0.3s forwards" }}
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage} 
              alt="Projeto Ampliado" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl scale-95 animate-scale-up"
              style={{ animation: "scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards" }}
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking the image itself
            />
            <button 
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}} />
        </div>
      )}
    </>
  );
}
