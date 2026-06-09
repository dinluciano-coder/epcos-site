export default function MobileContactBar() {
  const address = "Avenida Teotônio Parreira Coelho, 805, Jardim da Cidade - Betim/MG";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050505] border-t border-white/10 z-[60] pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        
        {/* Ligar */}
        <a 
          href="tel:+5531992825058" 
          className="flex flex-col items-center justify-center w-full h-full text-[#9A9A9A] hover:text-white active:text-white transition-colors"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="text-[10px] mt-1 font-medium">Ligar</span>
        </a>

        {/* E-mail */}
        <a 
          href="mailto:jackson@epcos.eng.br" 
          className="flex flex-col items-center justify-center w-full h-full text-[#9A9A9A] hover:text-white active:text-white transition-colors"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span className="text-[10px] mt-1 font-medium">E-mail</span>
        </a>

        {/* WhatsApp */}
        <a 
          href="https://wa.me/5531992825058" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-full h-full text-[#9A9A9A] hover:text-white active:text-white transition-colors"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span className="text-[10px] mt-1 font-medium">WhatsApp</span>
        </a>

        {/* Rota */}
        <a 
          href={mapUrl} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center w-full h-full text-[#9A9A9A] hover:text-white active:text-white transition-colors"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-[10px] mt-1 font-medium">Rota</span>
        </a>

      </div>
    </div>
  );
}
