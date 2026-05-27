"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("epcos_cookies_accepted");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("epcos_cookies_accepted", "true");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("epcos_cookies_accepted", "false");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[1000] p-4 md:p-6 pointer-events-none flex justify-center md:justify-end">
      <div 
        className="glass-card p-6 md:p-8 max-w-lg w-full pointer-events-auto transform transition-transform duration-700 translate-y-0"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          borderRadius: "24px"
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white shrink-0">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
              </svg>
            </div>
            <h3 className="text-[#1A1A1A] font-bold text-lg">Sua Privacidade</h3>
          </div>
          
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            Utilizamos cookies para oferecer a melhor experiência, analisar o tráfego do site e personalizar conteúdo. Ao continuar navegando, você concorda com a nossa{" "}
            <Link href="/privacidade" className="text-[#7B2D3B] font-semibold hover:underline">
              Política de Privacidade
            </Link>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button 
              onClick={declineCookies}
              className="px-6 py-3 rounded-full border border-black/10 text-[#6B6B6B] text-sm font-semibold hover:bg-black/5 transition-colors w-full sm:w-auto text-center"
            >
              Recusar
            </button>
            <div className="w-full">
              <MagneticButton 
                theme="dark" 
                onClick={acceptCookies} 
                className="w-full !px-6 !py-3 text-sm font-semibold tracking-wider uppercase"
              >
                Aceitar Cookies
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
