"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

export default function ScrollIndicator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: 0,
      y: 20,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 90%", end: "top 60%", scrub: true },
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
      <div className="scroll-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 9L12 15L18 9" stroke="#7B2D3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ fontWeight: 400, fontSize: "12px", textTransform: "uppercase", letterSpacing: "3px", color: "#9A9A9A", userSelect: "none" }}>
        Scroll para explorar
      </span>
    </div>
  );
}
