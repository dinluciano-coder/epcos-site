"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

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
          
          <div className="flex items-center gap-4 ml-2 mr-2 border-l border-black/10 pl-6">
            <a href="https://www.linkedin.com/company/epcos-engenharia-ltda/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-[#7B2D3B] hover:scale-125 hover:-translate-y-1 transition-transform duration-300">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://www.instagram.com/epcos.engenharia/" target="_blank" rel="noopener noreferrer" className="text-[#7B2D3B] hover:scale-125 hover:-translate-y-1 transition-transform duration-300">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>

          <MagneticButton 
            href="https://wa.me/5531992825058"
            target="_blank"
            rel="noopener noreferrer"
            theme="dark"
            className="ml-2 !px-6 !py-2.5"
          >
            Fale Conosco
          </MagneticButton>
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
