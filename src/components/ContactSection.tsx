"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import TiltWrapper from "./TiltWrapper";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      ".contact-stagger",
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0,
        stagger: 0.15,
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
    <section ref={sectionRef} id="contato" className="py-16 md:py-24 relative bg-[#F8F8FA] z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="contact-stagger inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full border border-[rgba(0,0,0,0.06)] shadow-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-[#7B2D3B]"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B]">Fale Conosco</span>
          </div>
          <h2 className="contact-stagger text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A] tracking-tight">
            Vamos construir o próximo <span className="text-[#7B2D3B]">padrão</span> juntos.
          </h2>
          <p className="contact-stagger text-lg text-[#6B6B6B] mb-12 max-w-md">
            Envie sua mensagem. Retornaremos rapidamente com as melhores soluções de engenharia para o seu negócio.
          </p>

          <div className="contact-stagger space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#7B2D3B] shadow-sm">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <div className="text-sm text-[#9A9A9A]">E-mail</div>
                <div className="font-semibold text-[#1A1A1A]">contato@epcos.com.br</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-stagger">
          <TiltWrapper maxTilt={5}>
            <form className="glass-card p-8 md:p-12 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2 transform-gpu" style={{ transform: "translateZ(10px)" }}>
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Nome</label>
                <input type="text" placeholder="Seu nome completo" className="w-full bg-white/50 border border-black/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
              </div>
              
              <div className="flex flex-col gap-2 transform-gpu" style={{ transform: "translateZ(15px)" }}>
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Empresa</label>
                <input type="text" placeholder="Nome da sua empresa" className="w-full bg-white/50 border border-black/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
              </div>

              <div className="flex flex-col gap-2 transform-gpu" style={{ transform: "translateZ(20px)" }}>
                <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Mensagem</label>
                <textarea placeholder="Como podemos ajudar?" rows={4} className="w-full bg-white/50 border border-black/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all resize-none"></textarea>
              </div>

              <div className="mt-4 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                <MagneticButton className="w-full">
                  Enviar Mensagem
                </MagneticButton>
              </div>
            </form>
          </TiltWrapper>
        </div>

      </div>
    </section>
  );
}
