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
                className="relative mx-20 flex h-24 min-w-[160px] items-center justify-center transition-all duration-300 group"
              >
                <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-white dark:bg-white/5 p-6 border border-gray-200 dark:border-white/10 group-hover:border-[#A543F1]/50 group-hover:bg-gray-50 dark:group-hover:bg-white/10 transition-all">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={300}
                    height={96}
                    className="h-20 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ objectFit: 'contain', maxWidth: '200px' }}
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
