"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import TiltWrapper from "./TiltWrapper";

export default function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    vaga: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMailTo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Candidatura: ${formData.vaga} - ${formData.name}`);
    const body = encodeURIComponent(
      `Olá equipe EPCOS,\n\nMeu nome é ${formData.name} e estou me candidatando à vaga de ${formData.vaga}.\nMeu e-mail de contato é: ${formData.email}\n\n[POR FAVOR, ANEXE SEU CURRÍCULO EM PDF AQUI ANTES DE ENVIAR]\n\nAtenciosamente,\n${formData.name}`
    );
    
    window.location.href = `mailto:dinluciano@gmail.com?subject=${subject}&body=${body}`;
  };
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      ".careers-content",
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="carreiras" className="py-16 relative overflow-x-clip bg-white z-10">
      
      {/* Decorative large text behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02]">
        <h2 className="text-[15vw] font-black leading-none whitespace-nowrap">TALENTOS</h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center careers-content relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A] tracking-tight">
          Trabalhe Conosco
        </h2>
        <p className="text-lg text-[#6B6B6B] mb-12">
          Estamos sempre em busca de mentes brilhantes. Se você é um engenheiro apaixonado por desafios de precisão e tecnologias emergentes, a EPCOS é o seu lugar.
        </p>

        <TiltWrapper maxTilt={8}>
          <div className="glass-card p-8 md:p-12 flex flex-col items-center max-w-2xl mx-auto w-full text-left">
            <div className="w-full text-center">
              <svg className="w-12 h-12 text-[#7B2D3B] mb-6 mx-auto transform-gpu" style={{ transform: "translateZ(30px)" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <h3 className="text-2xl font-bold mb-3 text-[#1A1A1A] transform-gpu" style={{ transform: "translateZ(25px)" }}>Vagas Abertas</h3>
              <p className="text-[#6B6B6B] mb-8 transform-gpu text-center" style={{ transform: "translateZ(20px)" }}>
                Neste momento, avaliamos currículos para o banco de talentos de <strong className="text-[#1A1A1A]">Engenheiro Mecânico Sênior</strong> e <strong className="text-[#1A1A1A]">Especialista em Metrologia 3D</strong>.
              </p>
            </div>

            <form onSubmit={handleMailTo} className="w-full flex flex-col gap-4 transform-gpu" style={{ transform: "translateZ(35px)" }}>
              <div className="bg-blue-50 text-blue-700 p-3 rounded-xl text-sm border border-blue-100 mb-2 text-center">
                Preencha os dados e clique em enviar para abrir seu e-mail já com tudo formatado. <strong>Você anexará o PDF por lá!</strong>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Nome Completo" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Seu melhor E-mail" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
              </div>
              
              <input type="text" name="vaga" value={formData.vaga} onChange={handleInputChange} required placeholder="Qual vaga te interessa?" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />

              <button 
                type="submit" 
                className="mt-4 w-full inline-flex items-center justify-center px-10 py-4 rounded-full text-white text-sm font-semibold tracking-[2px] uppercase bg-[#1A1A1A] hover:bg-[#7B2D3B] hover:shadow-[0_4px_20px_rgba(123,45,59,0.3)] transition-all duration-300"
              >
                Gerar E-mail de Candidatura
              </button>
            </form>
          </div>
        </TiltWrapper>
      </div>
    </section>
  );
}
