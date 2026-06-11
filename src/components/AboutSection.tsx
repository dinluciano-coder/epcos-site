"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import TiltWrapper from "./TiltWrapper";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !rightColRef.current) return;

    // Text Elastic Fade in
    gsap.fromTo(
      ".about-text",
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "back.out(1.5)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play reverse play reverse" } 
      }
    );

    const wrappers = document.querySelectorAll(".parallax-wrapper");
    if (wrappers.length === 0) return;

    Array.from(wrappers).forEach((wrapper, i) => {
      const card = wrapper.querySelector(".parallax-card");
      if (!card) return;

      gsap.fromTo(card,
        { opacity: 0, scale: 0.8, y: 80 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          delay: i * 0.15,
          ease: "elastic.out(1, 0.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          },
          onComplete: () => {
            gsap.to(card, {
              y: "-=8",
              duration: 2 + i * 0.5,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
          }
        }
      );

      const speed = i === 1 ? -100 : (i === 0 ? -40 : -70);
      gsap.to(wrapper, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });

  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="py-20 md:py-28 relative flex items-center bg-[#F8F8FA] z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        
        {/* Left: Text */}
        <div className="flex flex-col z-20">
          <div className="about-text inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 rounded-full border border-[rgba(0,0,0,0.06)] shadow-sm w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#7B2D3B]"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B]">Sobre a EPCOS</span>
          </div>
          <h2 className="about-text text-3xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-6 text-[#1A1A1A] tracking-tight leading-tight">
            Soluções de Engenharia para os <span className="text-[#7B2D3B]">Desafios da Sua Operação.</span>
          </h2>
          <p className="about-text text-base md:text-xl text-[#6B6B6B] leading-relaxed max-w-lg mb-6">
            Desenvolvemos projetos mecânicos e soluções industriais sob medida, combinando experiência técnica e tecnologia para transformar necessidades reais em resultados concretos.
          </p>
        </div>

        {/* Right: Floating Glass Cards (Parallax) organized in a flex container */}
        <div ref={rightColRef} className="relative flex flex-col items-center lg:items-end gap-6 md:gap-10 pt-10 lg:pt-0 w-full z-10">
          
          {/* Card 1 */}
          <div className="parallax-wrapper w-full max-w-[320px] self-start lg:self-center lg:mr-12">
            <TiltWrapper className="parallax-card">
              <div className="glass-card p-7 md:p-8 h-full">
                <div className="w-11 h-11 rounded-full bg-[#7B2D3B]/10 flex items-center justify-center text-[#7B2D3B] mb-4">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2 text-[#1A1A1A] transform-gpu" style={{ transform: "translateZ(30px)" }}>Agilidade no Desenvolvimento</h4>
                <p className="text-[#6B6B6B] text-sm leading-relaxed transform-gpu" style={{ transform: "translateZ(20px)" }}>Projetos desenvolvidos com rapidez e eficiência para reduzir prazos e acelerar suas entregas.</p>
              </div>
            </TiltWrapper>
          </div>

          {/* Card 2 */}
          <div className="parallax-wrapper w-full max-w-[320px] self-end lg:-mt-10">
            <TiltWrapper className="parallax-card">
              <div className="glass-card p-7 md:p-8 h-full">
                <div className="w-11 h-11 rounded-full bg-[#7B2D3B]/10 flex items-center justify-center text-[#7B2D3B] mb-4">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2 text-[#1A1A1A] transform-gpu" style={{ transform: "translateZ(30px)" }}>Precisão Técnica</h4>
                <p className="text-[#6B6B6B] text-sm leading-relaxed transform-gpu" style={{ transform: "translateZ(20px)" }}>Soluções projetadas com alto nível de detalhamento para garantir confiabilidade e desempenho.</p>
              </div>
            </TiltWrapper>
          </div>

          {/* Card 3 */}
          <div className="parallax-wrapper w-full max-w-[320px] self-start lg:ml-12 lg:-mt-16">
            <TiltWrapper className="parallax-card">
              <div className="glass-card p-7 md:p-8 h-full">
                <div className="w-11 h-11 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white mb-4">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-2 text-[#1A1A1A] transform-gpu" style={{ transform: "translateZ(30px)" }}>Experiência Industrial</h4>
                <p className="text-[#6B6B6B] text-sm leading-relaxed transform-gpu" style={{ transform: "translateZ(20px)" }}>Equipe especializada com vivência prática no desenvolvimento de soluções para a indústria.</p>
              </div>
            </TiltWrapper>
          </div>
          
        </div>
      </div>
    </section>
  );
}
