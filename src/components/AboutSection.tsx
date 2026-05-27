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
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } 
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
    <section ref={sectionRef} id="sobre" className="py-20 md:py-28 relative flex items-center bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        
        {/* Left: Text */}
        <div className="flex flex-col z-20">
          <div className="about-text inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/80 rounded-full border border-[rgba(0,0,0,0.06)] shadow-sm w-fit backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#7B2D3B]"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B]">Sobre a EPCOS</span>
          </div>
          <h2 className="about-text text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-[#1A1A1A] tracking-tight leading-tight">
            Engenharia que <br/><span className="text-[#7B2D3B]">Molda o Futuro.</span>
          </h2>
          <p className="about-text text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-lg mb-6">
            Nascemos da necessidade de trazer precisão absoluta para a indústria nacional. Com tecnologia de escaneamento de ponta e projetos mecânicos robustos, somos o parceiro estratégico de grandes corporações.
          </p>
          <p className="about-text text-lg text-[#6B6B6B] leading-relaxed max-w-lg">
            Nossa missão é otimizar sua linha de produção com soluções inteligentes que reduzem custos e maximizam a eficiência operacional.
          </p>
        </div>

        {/* Right: Floating Glass Cards (Parallax) organized in a flex container */}
        <div ref={rightColRef} className="relative flex flex-col items-center lg:items-end gap-6 md:gap-10 pt-10 lg:pt-0 w-full z-10">
          
          {/* Card 1 */}
          <div className="parallax-wrapper w-full max-w-[320px] self-start lg:self-center lg:mr-12">
            <TiltWrapper className="parallax-card">
              <div className="glass-card p-8 h-full">
                <div className="w-12 h-12 rounded-full bg-[#7B2D3B]/10 flex items-center justify-center text-[#7B2D3B] mb-5">
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h4 className="text-2xl font-bold mb-3 text-[#1A1A1A] transform-gpu" style={{ transform: "translateZ(30px)" }}>Agilidade</h4>
                <p className="text-[#6B6B6B] leading-relaxed transform-gpu" style={{ transform: "translateZ(20px)" }}>Entregas ágeis e prototipagem rápida graças aos nossos scanners de precisão absolutos.</p>
              </div>
            </TiltWrapper>
          </div>

          {/* Card 2 */}
          <div className="parallax-wrapper w-full max-w-[360px] self-end lg:-mt-10">
            <TiltWrapper className="parallax-card">
              <div className="glass-card p-10 h-full">
                <div className="w-14 h-14 rounded-full bg-[#7B2D3B]/10 flex items-center justify-center text-[#7B2D3B] mb-6">
                  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                <h4 className="text-3xl font-bold mb-4 text-[#1A1A1A] transform-gpu" style={{ transform: "translateZ(30px)" }}>Qualidade Sub-milimétrica</h4>
                <p className="text-[#6B6B6B] text-lg leading-relaxed transform-gpu" style={{ transform: "translateZ(20px)" }}>Cada projeto passa por um rigoroso controle, garantindo encaixes perfeitos nas máquinas da sua linha.</p>
              </div>
            </TiltWrapper>
          </div>

          {/* Card 3 */}
          <div className="parallax-wrapper w-full max-w-[280px] self-start lg:ml-12 lg:-mt-16">
            <TiltWrapper className="parallax-card">
              <div className="glass-card p-6 h-full">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white mb-4">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h4 className="text-xl font-bold mb-2 text-[#1A1A1A] transform-gpu" style={{ transform: "translateZ(30px)" }}>Time Experiente</h4>
                <p className="text-[#6B6B6B] text-sm transform-gpu" style={{ transform: "translateZ(20px)" }}>Engenheiros de campo com décadas de experiência prática.</p>
              </div>
            </TiltWrapper>
          </div>
          
        </div>
      </div>
    </section>
  );
}
