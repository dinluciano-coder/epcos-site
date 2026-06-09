"use client";

import React from "react";
import Image from "next/image";

// Placeholder data - to be replaced once the 13 logos are uploaded
const TEMP_LOGOS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  name: `Cliente ${i + 1}`,
  src: `/logos/logo-${i + 1}.png`,
}));

// We duplicate the array to create a seamless infinite scroll loop
const MARQUEE_ITEMS = [...TEMP_LOGOS, ...TEMP_LOGOS];

export default function ClientsMarquee() {
  return (
    <section className="relative w-full bg-[#050505] py-8 border-y border-white/5 overflow-hidden flex flex-col justify-center">
      
      {/* Title */}
      <div className="w-full text-center mb-6">
        <p className="text-[#6B6B6B] text-xs font-bold tracking-[0.2em] uppercase">
          Empresas que confiam na nossa Engenharia
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full overflow-hidden">
        
        {/* Left/Right Fading Gradients */}
        <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] min-w-max">
          {MARQUEE_ITEMS.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="flex items-center justify-center w-[120px] md:w-[180px] h-[60px] mx-4 md:mx-8 group"
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={150}
                  height={60}
                  className="object-contain w-full h-full grayscale opacity-40 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                />
              ) : (
                // Temporary Placeholder UI
                <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-lg border border-white/10 grayscale opacity-40 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:bg-white/10 group-hover:scale-110">
                  <span className="text-white/40 text-xs font-semibold">{logo.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
}
