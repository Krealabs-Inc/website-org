"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";

// Logos d'entreprises avec leurs URLs
const allLogos = [
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
  },
  {
    name: "GitHub",
    logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  },
  {
    name: "Stripe",
    logo: "https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg?q=80&w=1082"
  },
  {
    name: "Notion",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"
  },
  {
    name: "Figma",
    logo: "https://cdn.sanity.io/images/599r6htc/localized/46a76c802176eb17b04e12108de7e7e0f3736dc6-1024x1024.png"
  },
  {
    name: "Slack",
    logo: "https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png"
  },
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
              <div
                key={company.name}
                className="flex items-center justify-center px-8 py-4"
              >
                <div className="relative h-12 w-32 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
