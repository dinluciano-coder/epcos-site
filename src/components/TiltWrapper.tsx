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
    
    rotateXTo.current = gsap.quickTo(cardRef.current, "rotationX", { duration: 0.5, ease: "power3.out" });
    rotateYTo.current = gsap.quickTo(cardRef.current, "rotationY", { duration: 0.5, ease: "power3.out" });
  }, []);

  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (window.innerWidth < 768) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const normalizedX = (clientX - centerX) / (rect.width / 2);
      const normalizedY = (clientY - centerY) / (rect.height / 2);
      
      rotateXTo.current?.(normalizedY * -maxTilt);
      rotateYTo.current?.(normalizedX * maxTilt);

      rafRef.current = null;
    });
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
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
