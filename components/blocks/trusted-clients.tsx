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
    logo: "/assets/clients/logo-meli-melo.png",
    siteUrl: "https://www.melimelo-boutique.fr/"
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
          <Marquee pauseOnHover className="[--duration:40s]">
            {allLogos.map((company) => (
              <a
                key={company.name}
                href={company.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-4"
              >
                <div className="relative h-12 w-32 flex items-center justify-center">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={200}
                    height={48}
                    className="max-h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </a>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
