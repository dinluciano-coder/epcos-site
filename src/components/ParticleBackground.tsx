"use client";

import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  
  // Color lerping state
  const colorRef = useRef({ r: 123, g: 45, b: 59 }); // Start Burgundy
  const targetColorRef = useRef({ r: 123, g: 45, b: 59 });

  const createParticles = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    // Aumentando a quantidade de partículas para um visual mais rico, mantendo a performance
    const count = isMobile ? 60 : 120;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1.5 + Math.random() * 2, // Larger particles
        opacity: 0.15 + Math.random() * 0.35, // Higher opacity
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };

      if (
        particlesRef.current.length === 0 ||
        (w < 768 && particlesRef.current.length > 60) ||
        (w >= 768 && particlesRef.current.length <= 60)
      ) {
        particlesRef.current = createParticles(w, h);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Scroll listener to detect dark/light sections
    const handleScroll = () => {
      // Find element in the middle of the screen
      const el = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      if (el) {
        // Traverse up to find if we are in a dark section
        const isDark = el.closest('[data-theme="dark"]');
        if (isDark) {
          // Target White
          targetColorRef.current = { r: 255, g: 255, b: 255 };
        } else {
          // Target Burgundy
          targetColorRef.current = { r: 123, g: 45, b: 59 };
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    const isMobile = () => sizeRef.current.w < 768;

    const animate = () => {
      frameCountRef.current++;
      if (isMobile() && frameCountRef.current % 2 !== 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Smoothly interpolate colors
      colorRef.current.r += (targetColorRef.current.r - colorRef.current.r) * 0.05;
      colorRef.current.g += (targetColorRef.current.g - colorRef.current.g) * 0.05;
      colorRef.current.b += (targetColorRef.current.b - colorRef.current.b) * 0.05;
      
      const { r, g, b } = colorRef.current;
      const currentRgb = `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`;

      const { w, h } = sizeRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repulsion
        if (dist < 200 && dist > 0) {
          const force = ((200 - dist) / 200) * 2;
          const nx = dx / dist;
          const ny = dy / dist;
          p.x += nx * force;
          p.y += ny * force;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;
      }

      ctx.lineWidth = 1; // Thicker lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15; // More visible lines
            ctx.strokeStyle = `rgba(${currentRgb}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = `rgba(${currentRgb}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
    />
  );
}
