"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import TiltWrapper from "./TiltWrapper";

export default function CareersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  // Formspree Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("subject", "Novo Currículo Enviado pelo Site EPCOS");

    try {
      const response = await fetch("https://formspree.io/f/mredrzod", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setIsError(true);
        // Formspree returns an array of errors sometimes
        if (data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors[0].message);
        } else {
          setErrorMessage("Erro desconhecido ao enviar arquivo.");
        }
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage("Erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
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
          {isSuccess ? (
            <div className="glass-card p-8 md:p-12 inline-flex flex-col items-center max-w-2xl mx-auto w-full min-h-[350px] justify-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#1A1A1A]">Currículo Recebido!</h3>
              <p className="text-[#6B6B6B]">Nossa equipe de RH analisará seu perfil em breve. Boa sorte!</p>
            </div>
          ) : (
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

              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 transform-gpu" style={{ transform: "translateZ(35px)" }}>
                {isError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 mb-2 text-center">
                    Erro: {errorMessage}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" required placeholder="Nome Completo" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
                  <input type="email" name="email" required placeholder="Seu melhor E-mail" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
                </div>
                
                <input type="text" name="vaga" required placeholder="Qual vaga te interessa?" className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#7B2D3B] focus:ring-1 focus:ring-[#7B2D3B] transition-all" />
                
                <div className={`w-full bg-white/50 border border-dashed rounded-xl px-4 py-6 text-center transition-colors ${fileName ? 'border-[#7B2D3B] bg-[#7B2D3B]/5' : 'border-black/10 hover:bg-white/80'}`}>
                  <label className="cursor-pointer text-[#7B2D3B] font-semibold flex flex-col items-center gap-2">
                    {fileName ? (
                      <>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="text-[#1A1A1A]">{fileName}</span>
                        <span className="text-xs underline text-[#7B2D3B]">Trocar arquivo</span>
                      </>
                    ) : (
                      <>
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                        </svg>
                        <span>Clique para anexar seu Currículo (PDF)</span>
                      </>
                    )}
                    <input 
                      type="file" 
                      name="attachment" 
                      accept=".pdf,.doc,.docx" 
                      required 
                      className="hidden" 
                      onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                    />
                  </label>
                  {!fileName && <p className="text-xs text-[#9A9A9A] mt-2">Máximo 2MB</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mt-2 w-full inline-flex items-center justify-center px-10 py-4 rounded-full text-white text-sm font-semibold tracking-[2px] uppercase bg-[#1A1A1A] hover:bg-[#7B2D3B] hover:shadow-[0_4px_20px_rgba(123,45,59,0.3)] transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Candidatura"}
                </button>
              </form>
            </div>
          )}
        </TiltWrapper>
      </div>
    </section>
  );
}
