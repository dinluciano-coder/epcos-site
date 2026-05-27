"use client";

import React, { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  theme?: "light" | "dark";
}

export default function MagneticButton({ children, className = "", onClick, href, theme = "light" }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const contentXTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const contentYTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useGSAP(() => {
    const el = buttonRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    xTo.current = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    contentXTo.current = gsap.quickTo(content, "x", { duration: 0.6, ease: "power3.out" });
    contentYTo.current = gsap.quickTo(content, "y", { duration: 0.6, ease: "power3.out" });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    xTo.current?.(deltaX * 0.35);
    yTo.current?.(deltaY * 0.35);
    contentXTo.current?.(deltaX * 0.2);
    contentYTo.current?.(deltaY * 0.2);
  }, []);

  const handleMouseLeave = useCallback(() => {
    xTo.current?.(0); yTo.current?.(0); contentXTo.current?.(0); contentYTo.current?.(0);
  }, []);

  const isDark = theme === "dark";

  const innerContent = (
    <span ref={contentRef} className="relative z-10 inline-flex items-center gap-2.5" style={{ willChange: "transform" }}>
      <span className="relative flex-shrink-0" style={{ width: 8, height: 8 }}>
        <span className="absolute inset-0 rounded-full" style={{ backgroundColor: isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(123, 45, 59, 0.4)", animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
        <span className="relative block w-full h-full rounded-full" style={{ backgroundColor: isDark ? "#FFFFFF" : "#7B2D3B", boxShadow: isDark ? "0 0 6px rgba(255, 255, 255, 0.6)" : "0 0 6px rgba(123, 45, 59, 0.6)" }} />
      </span>
      <span style={{ fontWeight: 600, fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px", color: isDark ? "#FFFFFF" : "#1A1A1A" }}>
        {children}
      </span>
    </span>
  );

  const buttonStyles: React.CSSProperties = {
    padding: "16px 40px", borderRadius: "50px", 
    border: isDark ? "1px solid rgba(255, 255, 255, 0.2)" : "1px solid rgba(123, 45, 59, 0.3)", 
    background: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(123, 45, 59, 0.06)",
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", cursor: "pointer", willChange: "transform",
    textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
  };

  const Tag = href ? "a" : "button";

  return (
    <>
      <Tag ref={buttonRef as React.Ref<HTMLButtonElement & HTMLAnchorElement>} data-magnetic className={`magnetic-btn group ${isDark ? 'dark-btn' : 'light-btn'} ${className}`}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} href={href} style={buttonStyles}>
        <span className="pointer-events-none absolute inset-0 rounded-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: isDark ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.1))" : "linear-gradient(135deg, rgba(123, 45, 59, 0.15), rgba(123, 45, 59, 0.02), rgba(123, 45, 59, 0.15))",
            backgroundSize: "200% 200%", animation: "gradientShift 3s ease infinite",
          }}
        />
        {innerContent}
      </Tag>
      <style>{`
        .light-btn:hover {
          background: rgba(123, 45, 59, 0.12) !important;
          border-color: rgba(123, 45, 59, 0.5) !important;
          box-shadow: 0 4px 20px rgba(123, 45, 59, 0.1), inset 0 0 30px rgba(123, 45, 59, 0.05) !important;
        }
        .dark-btn:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1), inset 0 0 30px rgba(255, 255, 255, 0.05) !important;
        }
        @keyframes ping { 75%, 100% { transform: scale(2.5); opacity: 0; } }
      `}</style>
    </>
  );
}
