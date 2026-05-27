"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Sobre", href: "#sobre" },
    { name: "Projetos", href: "#projetos" },
    { name: "Tecnologia", href: "#scanner" },
    { name: "Serviços", href: "#servicos" },
    { name: "Carreiras", href: "#carreiras" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[9990] glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#hero" data-magnetic className="relative flex items-center h-full">
          <Image
            src="/logo-epcos.png"
            alt="EPCOS"
            width={120}
            height={44}
            className="object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              data-magnetic
              className="text-sm font-semibold tracking-wide text-[#6B6B6B] hover:text-[#7B2D3B] transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/5531992825058"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="ml-4 px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-sm font-semibold tracking-wide hover:bg-[#7B2D3B] hover:shadow-[0_4px_20px_rgba(123,45,59,0.3)] transition-all duration-300"
          >
            Fale Conosco
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-[#1A1A1A]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-3xl border-b border-black/5 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-6 gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-lg font-medium text-[#1A1A1A] py-2 border-b border-black/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/5531992825058"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3 rounded-full bg-[#7B2D3B] text-white text-center font-semibold text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </header>
  );
}
