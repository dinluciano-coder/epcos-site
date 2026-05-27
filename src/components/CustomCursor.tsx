"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "@/lib/gsapConfig";

const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const dotX = useRef(0);
  const dotY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);
  const glowX = useRef(0);
  const glowY = useRef(0);

  const magneticTargetX = useRef(0);
  const magneticTargetY = useRef(0);
  const isMagnetic = useRef(false);

  const isClicking = useRef(false);
  const rafId = useRef<number>(0);

  const animate = useCallback(() => {
    const targetX = isMagnetic.current ? magneticTargetX.current : mouseX.current;
    const targetY = isMagnetic.current ? magneticTargetY.current : mouseY.current;

    dotX.current = mouseX.current;
    dotY.current = mouseY.current;

    ringX.current = lerp(ringX.current, targetX, 0.12);
    ringY.current = lerp(ringY.current, targetY, 0.12);

    glowX.current = lerp(glowX.current, mouseX.current, 0.06);
    glowY.current = lerp(glowY.current, mouseY.current, 0.06);

    if (dotRef.current) {
      gsap.set(dotRef.current, { x: dotX.current, y: dotY.current, xPercent: -50, yPercent: -50 });
    }
    if (ringRef.current) {
      gsap.set(ringRef.current, { x: ringX.current, y: ringY.current, xPercent: -50, yPercent: -50 });
    }
    if (glowRef.current) {
      gsap.set(glowRef.current, { x: glowX.current, y: glowY.current, xPercent: -50, yPercent: -50 });
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsMounted(true);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.current = cx; mouseY.current = cy;
    dotX.current = cx; dotY.current = cy;
    ringX.current = cx; ringY.current = cy;
    glowX.current = cx; glowY.current = cy;

    const onMouseMove = (e: MouseEvent) => { mouseX.current = e.clientX; mouseY.current = e.clientY; };
    const onMouseDown = () => { isClicking.current = true; ringRef.current?.classList.add("clicking"); dotRef.current?.classList.add("clicking"); };
    const onMouseUp = () => { isClicking.current = false; ringRef.current?.classList.remove("clicking"); dotRef.current?.classList.remove("clicking"); };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Checar se estamos passando o mouse sobre uma área com tema dark ou fundo escuro
      if (target.closest('[data-theme="dark"], .bg-\\[\\#050505\\], .bg-\\[\\#1A1A1A\\]')) {
        dotRef.current?.classList.add("cursor-light");
        ringRef.current?.classList.add("cursor-light");
      } else {
        dotRef.current?.classList.remove("cursor-light");
        ringRef.current?.classList.remove("cursor-light");
      }
    };

    const onMagneticEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      isMagnetic.current = true;
      magneticTargetX.current = rect.left + rect.width / 2;
      magneticTargetY.current = rect.top + rect.height / 2;
      ringRef.current?.classList.add("hovering");
      dotRef.current?.classList.add("hovering");
    };
    const onMagneticMove = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      magneticTargetX.current = rect.left + rect.width / 2;
      magneticTargetY.current = rect.top + rect.height / 2;
    };
    const onMagneticLeave = () => {
      isMagnetic.current = false;
      ringRef.current?.classList.remove("hovering");
      dotRef.current?.classList.remove("hovering");
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", onMouseOver);

    const magneticEls = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    magneticEls.forEach(el => {
      el.addEventListener("mouseenter", onMagneticEnter);
      el.addEventListener("mousemove", onMagneticMove);
      el.addEventListener("mouseleave", onMagneticLeave);
    });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onMouseOver);
      magneticEls.forEach(el => {
        el.removeEventListener("mouseenter", onMagneticEnter);
        el.removeEventListener("mousemove", onMagneticMove);
        el.removeEventListener("mouseleave", onMagneticLeave);
      });
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  if (!isMounted) return null;

  return (
    <>
      <div ref={glowRef} className="cursor-glow" style={{ position: "fixed", pointerEvents: "none", zIndex: 9997, willChange: "transform" }} />
      <div ref={ringRef} className="cursor-ring" style={{ position: "fixed", pointerEvents: "none", zIndex: 9998, willChange: "transform" }} />
      <div ref={dotRef} className="cursor-dot" style={{ position: "fixed", pointerEvents: "none", zIndex: 9999, willChange: "transform" }} />
    </>
  );
}
