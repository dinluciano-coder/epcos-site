"use client";

import React from "react";
import Image from "next/image";

const LOGOS = [
  { id: 1,  name: "Cliente 1",   src: "/logos/logo-1.png" },
  { id: 2,  name: "Cliente 2",   src: "/logos/logo-2.png" },
  { id: 3,  name: "Cliente 3",   src: "/logos/logo-3.png" },
  { id: 4,  name: "Cliente 4",   src: "/logos/logo-4.png" },
  { id: 5,  name: "Cliente 5",   src: "/logos/logo-5.png" },
  { id: 6,  name: "Cliente 6",   src: "/logos/logo-6.png" },
  { id: 7,  name: "Cliente 7",   src: "/logos/logo-7.png" },
  { id: 8,  name: "Cliente 8",   src: "/logos/logo-8.png" },
  { id: 9,  name: "Cliente 9",   src: "/logos/logo-9.png" },
  { id: 10, name: "NOV",         src: "/logos/logo-nov.png" },
  { id: 11, name: "ReciclaBR",   src: "/logos/logo-reciclabr.png" },
];

// Duplicate for seamless infinite scroll
const MARQUEE_ITEMS = [...LOGOS, ...LOGOS];

export default function ClientsMarquee() {
  return (
    <section className="relative w-full bg-white py-12 overflow-hidden flex flex-col justify-center">

      {/* Title */}
      <div className="w-full text-center mb-8 px-4">
        <p className="text-[#6B6B6B] text-xs md:text-sm font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase">
          Algumas das empresas que confiam na nossa engenharia.
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full overflow-hidden">

        {/* Left/Right Fading Gradients */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] min-w-max items-center">
          {MARQUEE_ITEMS.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex items-center justify-center w-[110px] md:w-[160px] h-[56px] md:h-[72px] mx-5 md:mx-10 group flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={72}
                className="object-contain w-full h-full transition-all duration-500 ease-out group-hover:scale-110"
              />
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 36s linear infinite;
        }
      `}} />
    </section>
  );
}
