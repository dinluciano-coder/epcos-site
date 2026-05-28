"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";
import MagneticButton from "./MagneticButton";

// Helper component to split text into individual span characters for the particle effect
const SplitText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <>
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className={`inline-block scatter-wrapper transform-gpu ${className}`} 
          style={{ whiteSpace: "pre" }}
        >
          <span className="inline-block scatter-inner">
            {char}
          </span>
        </span>
      ))}
    </>
  );
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const rotateXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const rotateYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    if (logoRef.current) {
      rotateXTo.current = gsap.quickTo(logoRef.current, "rotationX", { duration: 0.8, ease: "power3.out" });
      rotateYTo.current = gsap.quickTo(logoRef.current, "rotationY", { duration: 0.8, ease: "power3.out" });
      xTo.current = gsap.quickTo(logoRef.current, "x", { duration: 0.8, ease: "power3.out" });
      yTo.current = gsap.quickTo(logoRef.current, "y", { duration: 0.8, ease: "power3.out" });
    }

    // Initial Load Animation for Logo
    gsap.to(logoWrapperRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    // Initial Load Animation for extra elements
    gsap.to([badgeRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.3
    });

    // Initial Load for Title Characters (Matrix/Typewriter style fly-in)
    // Usamos a classe interna (.scatter-inner) para a entrada, evitando conflito com a saída
    gsap.fromTo(".scatter-inner", 
      { opacity: 0, y: 40, rotationX: -90 },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0, 
        stagger: 0.02, 
        duration: 0.8, 
        ease: "back.out(1.5)", 
        delay: 0.3 
      }
    );

    // High-Tech Scroll Animation: Shatter into Particles!
    // Usamos a classe externa (.scatter-wrapper) para a explosão
    gsap.to(".scatter-wrapper", {
      x: () => (Math.random() - 0.5) * 1500, // Espalha muito mais horizontalmente
      y: () => (Math.random() - 0.5) * 1200 - 400, // Voam para cima agressivamente
      z: () => (Math.random() - 0.5) * 1500, // Profundidade extrema
      rotationX: () => (Math.random() - 0.5) * 1080,
      rotationY: () => (Math.random() - 0.5) * 1080,
      rotationZ: () => (Math.random() - 0.5) * 720,
      opacity: 0,
      scale: () => Math.random() * 3, // Alguns pedaços ficam gigantes perto da tela
      filter: "blur(4px)", // Reduzido para não desaparecer tão rápido
      ease: "power2.in", // Começa devagar e acelera (efeito real de explosão)
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", // Dura o tamanho inteiro da tela
        scrub: 1.5,
      }
    });

  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    if (!logoWrapperRef.current) return;

    const rect = logoWrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized distance from center of the logo (-1 to 1)
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    // Efeito magnético e Tilt 3D idêntico aos cards
    rotateXTo.current?.(normalizedY * -20);
    rotateYTo.current?.(normalizedX * 20);
    xTo.current?.(normalizedX * 15);
    yTo.current?.(normalizedY * 15);
  }, []);

  const handleMouseLeave = useCallback(() => {
    rotateXTo.current?.(0);
    rotateYTo.current?.(0);
    xTo.current?.(0);
    yTo.current?.(0);
  }, []);

  return (
    <section 
      id="hero"
      ref={sectionRef} 
      className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-[#7B2D3B]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto w-full" style={{ transformStyle: "preserve-3d" }}>
        
        <div 
          ref={logoWrapperRef} 
          className="mb-2 w-full flex justify-center perspective-1000 z-20"
          style={{ opacity: 0, perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={logoRef} 
            className="transform-gpu p-0 transition-shadow duration-300 rounded-3xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src="/logo-epcos.png"
              alt="EPCOS Engenharia"
              width={480}
              height={165}
              priority
              className="object-contain drop-shadow-[0_15px_30px_rgba(123,45,59,0.1)]"
              style={{ width: "100%", height: "auto", maxWidth: 480, mixBlendMode: "multiply", transform: "translateZ(30px)" }}
            />
          </div>
        </div>

        <div ref={titleGroupRef} className="flex flex-col items-center transform-gpu z-10" style={{ transformStyle: "preserve-3d" }}>
          
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md mb-4 shadow-sm" style={{ opacity: 0, transform: "translateY(20px)" }}>
            <span className="w-2 h-2 rounded-full bg-[#7B2D3B] animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.2em] text-[#1A1A1A] uppercase">
              ENGENHARIA QUE TRANSFORMA A INDÚSTRIA
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black leading-[1.05] tracking-tight mb-4 text-[#1A1A1A] perspective-1000" style={{ transformStyle: "preserve-3d" }}>
            <div className="block">
              <SplitText text="ENGENHARIA QUE" />
            </div>
            <div className="block text-[#7B2D3B]">
              <SplitText text="TRANSFORMA" />
            </div>
            <div className="block">
              <SplitText text="A INDÚSTRIA" />
            </div>
          </h1>

          <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8 mx-auto" style={{ color: "#6B6B6B", opacity: 0, transform: "translateY(20px)" }}>
            Engenharia de precisão com tecnologia de ponta.
            <br className="hidden sm:block" />
            Escaneamento 3D, projetos mecânicos e soluções inteligentes.
          </p>

          <div ref={ctaRef} className="mb-8" style={{ opacity: 0, transform: "translateY(20px)" }}>
            <MagneticButton href="#sobre">
              Conheça a EPCOS
            </MagneticButton>
          </div>
          
        </div>
      </div>

    </section>
  );
}
