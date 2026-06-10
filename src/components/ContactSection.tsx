"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";
import TiltWrapper from "./TiltWrapper";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Web3Forms Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    const formData = new FormData(e.currentTarget);
    // Adiciona a chave de acesso do Web3Forms
    formData.append("access_key", "d9a863ec-13f1-4027-8fb4-a728d7ff0db3");
    // Assunto personalizado do e-mail
    formData.append("subject", "Novo Contato pelo Site da EPCOS");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
          toggleActions: "play reverse play reverse",
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
          <h2 className="contact-stagger text-3xl md:text-5xl font-bold mb-5 md:mb-6 text-[#1A1A1A] tracking-tight">
            Tem um <span className="text-[#7B2D3B]">desafio industrial?</span>
          </h2>
          <p className="contact-stagger text-base md:text-lg text-[#6B6B6B] mb-10 md:mb-12 max-w-md">
            Nossa equipe está pronta para entender sua necessidade e desenvolver a melhor solução para sua operação.
          </p>

          <div className="contact-stagger space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#7B2D3B] shadow-sm">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <div className="text-sm text-[#9A9A9A]">E-mail</div>
                <div className="font-semibold text-[#1A1A1A]">jackson@epcos.eng.br</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-stagger">
          <TiltWrapper maxTilt={5}>
            {isSuccess ? (
              <div className="glass-card p-8 md:p-12 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                  <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Mensagem Enviada!</h3>
                <p className="text-[#6B6B6B]">Recebemos seu contato com sucesso. Nossa equipe de engenharia retornará em breve.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-[#7B2D3B] font-semibold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form className="glass-card p-8 md:p-12 flex flex-col gap-6" onSubmit={handleSubmit}>
                
                {isError && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100">
                    Ocorreu um erro ao enviar. Por favor, tente novamente.
                  </div>
                )}

                <div className="flex flex-col gap-2 transform-gpu" style={{ transform: "translateZ(10px)" }}>
                  <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Nome</label>
                  <input type="text" name="name" required placeholder="Seu nome completo" className="w-full bg-white/50 border border-black/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
                </div>
                
                <div className="flex flex-col gap-2 transform-gpu" style={{ transform: "translateZ(15px)" }}>
                  <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Empresa / E-mail</label>
                  <input type="email" name="email" required placeholder="seu@email.com" className="w-full bg-white/50 border border-black/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
                </div>

                <div className="flex flex-col gap-2 transform-gpu" style={{ transform: "translateZ(20px)" }}>
                  <label className="text-sm font-semibold text-[#1A1A1A] ml-1">Mensagem</label>
                  <textarea name="message" required placeholder="Como podemos ajudar?" rows={4} className="w-full bg-white/50 border border-black/10 rounded-xl px-5 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all resize-none"></textarea>
                </div>

                {/* Proteção Anti-Spam (Honeypot) exigida pelo Web3Forms */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="mt-4 transform-gpu" style={{ transform: "translateZ(30px)" }}>
                  <MagneticButton 
                    type="submit" 
                    theme="red"
                    disabled={isSubmitting}
                    className="w-full !px-10 !py-4 uppercase text-sm font-semibold tracking-[2px]"
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar Avaliação Técnica"}
                  </MagneticButton>
                </div>
              </form>
            )}
          </TiltWrapper>
        </div>

      </div>
    </section>
  );
}
