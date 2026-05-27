"use client";

import React, { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

interface TiltWrapperProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltWrapper({ children, className = "", maxTilt = 10 }: TiltWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const rotateXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const rotateYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    
    rotateXTo.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.8, ease: "power3.out" });
    rotateYTo.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.8, ease: "power3.out" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // IMPORTANTE: Medimos a posição do mouse em relação ao container pai (que é estático)
    // Se medirmos o cardRef (que está rotacionando em 3D), o getBoundingClientRect() sofre
    // distorções constantes conforme o card gira, causando o efeito de "trepidação" (jitter)
    if (!containerRef.current) return;
    
    if (window.innerWidth < 768) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);
    
    rotateXTo.current?.(normalizedY * -maxTilt);
    rotateYTo.current?.(normalizedX * maxTilt);
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    rotateXTo.current?.(0);
    rotateYTo.current?.(0);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`perspective-1000 ${className}`} 
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="w-full h-full transform-gpu"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {children}
      </div>
    </div>
  );
}
