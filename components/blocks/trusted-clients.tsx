"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

// Logos d'entreprises avec leurs URLs
const allLogos = [
  {
    name: "Unilasalle",
    logo: "/assets/clients/LOGO_UNILASALLE.png",
    siteUrl: "https://www.unilasalle.fr/"
  },
  {
    name: "Main Verte",
    logo: "/assets/clients/logo-main-vert.png",
    siteUrl: "https://www.main-verte28.fr/"
  },
  {
    name: "Meli Mélo",
    logo: "/assets/clients/logo-meli-melo.svg",
    siteUrl: "https://meli-melo.vercel.app/"
  },
  {
    name: "So'Crochette",
    logo: "/assets/clients/logo-so-crochette.jpg",
    siteUrl: "https://www.socrochette.fr/"
  }
];

export function TrustedClients() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#030303] transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-white/60 mb-2">
            Ils nous font confiance
          </p>
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80">
            Nos clients
          </h2>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="py-12" speed={40}>
            {allLogos.map((company) => (
              <a
                key={company.name}
                href={company.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mx-12 flex h-24 min-w-40 items-center justify-center transition-opacity hover:opacity-100 duration-300"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={300}
                  height={96}
                  className="h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  style={{ objectFit: 'contain', maxWidth: '200px' }}
                />
              </a>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
