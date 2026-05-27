"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

interface ImageShowcaseProps {
  images: string[];
}

export default function ImageShowcase({ images }: ImageShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Auto-slide logic
  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Troca a foto a cada 4 segundos
    return () => clearInterval(interval);
  }, [images]);

  // Parallax Scroll Effect
  useGSAP(() => {
    if (!containerRef.current || !parallaxRef.current) return;

    gsap.fromTo(
      parallaxRef.current,
      { yPercent: -25 },
      {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Começa quando o topo do container bate na base da tela
          end: "bottom top",   // Termina quando a base bate no topo
          scrub: 1.5,          // Suaviza a animação com delay de 1.5s
        }
      }
    );
  }, []);

  if (!images || images.length === 0) return null;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10"
    >
      {/* Container do Parallax - muito maior para o efeito ser super perceptível */}
      <div 
        ref={parallaxRef} 
        className="absolute w-full h-[150%] -top-[25%] left-0"
      >
        {images.map((imgUrl, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Imagem com leve efeito de Zoom Contínuo (Ken Burns) quando ativa */}
              <div 
                className={`w-full h-full transition-transform duration-[4000ms] ease-linear ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`Projeto ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
              
              {/* Gradiente escuro por cima para dar ar premium e destacar se houver texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Indicadores (Pontinhos na base) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, idx) => (
          <div 
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-6 bg-[#7B2D3B]" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
