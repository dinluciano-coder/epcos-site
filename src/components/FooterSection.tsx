"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsapConfig";
import { useGSAP } from "@gsap/react";

export default function FooterSection() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ctaRef.current) return;

    gsap.fromTo(
      ctaRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <footer ref={footerRef} id="footer" data-theme="dark" className="bg-[#1A1A1A] text-white pt-24 pb-12 relative overflow-x-clip">
      
      {/* Background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#7B2D3B]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top CTA */}
        <div ref={ctaRef} className="flex flex-col items-center text-center mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            Pronto para <span className="text-[#7B2D3B]">transformar</span><br />sua produção?
          </h2>
          
          <a 
            href="https://wa.me/5531992825058"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="inline-flex items-center justify-center px-10 py-4 rounded-full text-sm font-semibold tracking-[2px] uppercase transition-all duration-300"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            }}
          >
            Fale com um Engenheiro
          </a>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand Col */}
          <div>
            <div className="mb-6 flex items-baseline gap-1.5">
              <span className="text-3xl font-black tracking-tighter text-white">EPCOS</span>
              <span className="text-xl font-light tracking-[0.2em] text-[#7B2D3B]">ENGENHARIA</span>
            </div>
            <p className="text-[#9A9A9A] leading-relaxed max-w-sm">
              Soluções avançadas em automação industrial, escaneamento 3D e engenharia mecânica de precisão para elevar o nível da sua indústria.
            </p>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navegação</h4>
            <ul className="space-y-4 text-[#9A9A9A]">
              <li><a href="#hero" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#scanner" className="hover:text-white transition-colors">Tecnologias</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#projetos" className="hover:text-white transition-colors">Projetos</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contato</h4>
            <ul className="space-y-4 text-[#9A9A9A]">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#7B2D3B] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href="mailto:jackson@epcos.eng.br" className="hover:text-white transition-colors">jackson@epcos.eng.br</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#7B2D3B] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="https://wa.me/5531992825058" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">(31) 9 9282-5058</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#7B2D3B] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Avenida Teotônio Parreira Coelho, 805<br/>Jardim da Cidade - Betim/MG</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-6 text-sm text-[#6B6B6B]">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-center md:text-left">© 2026 EPCOS Engenharia. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/company/epcos-engenharia-ltda/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/epcos.engenharia/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
          <p className="text-[#9A9A9A] text-center w-full pb-4">
            Desenvolvido por <strong className="text-white font-medium">Luciano Diniz</strong>
          </p>
        </div>
        
      </div>
    </footer>
  );
}
