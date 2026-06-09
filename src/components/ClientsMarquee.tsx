"use client";

import React from "react";
import Image from "next/image";

// Placeholder data - to be replaced once the 13 logos are uploaded
const TEMP_LOGOS = Array.from({ length: 11 }).map((_, i) => ({
  id: i,
  name: `Cliente ${i + 1}`,
  src: `/logos/logo-${i + 1}.png`,
}));

// We duplicate the array to create a seamless infinite scroll loop
const MARQUEE_ITEMS = [...TEMP_LOGOS, ...TEMP_LOGOS];

export default function ClientsMarquee() {
  return (
    <section className="relative w-full bg-white py-12 overflow-hidden flex flex-col justify-center">
      
      {/* Title */}
      <div className="w-full text-center mb-8">
        <p className="text-[#6B6B6B] text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
          Empresas que confiam na nossa Engenharia
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full overflow-hidden">
        
        {/* Left/Right Fading Gradients (White) */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] min-w-max items-center">
          {MARQUEE_ITEMS.map((logo, index) => (
            <div 
              key={`${logo.id}-${index}`} 
              className="flex items-center justify-center w-[110px] md:w-[170px] h-[60px] md:h-[80px] mx-6 md:mx-10 group"
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={170}
                  height={80}
                  className="object-contain w-full h-full transition-all duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                // Temporary Placeholder UI
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200 transition-all duration-500 group-hover:scale-110">
                  <span className="text-gray-400 text-xs font-semibold">{logo.name}</span>
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
