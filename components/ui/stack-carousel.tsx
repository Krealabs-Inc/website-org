"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useState } from "react";

const technologies: { name: string; category: string; logo?: string; initials?: string }[] = [
  { name: "WordPress", category: "CMS", logo: "WordPress.svg" },
  { name: "WooCommerce", category: "E-commerce", logo: "WooCommerce.svg" },
  { name: "ACF Pro", category: "Champs sur mesure", initials: "ACF" },
  { name: "MySQL", category: "Base de données", logo: "MySQL.svg" },
  { name: "Next.js", category: "Framework", logo: "Next.js.svg" },
  { name: "React", category: "Interface", logo: "React.svg" },
  { name: "React Native", category: "Mobile", logo: "React.svg" },
  { name: "TypeScript", category: "Langage", logo: "TypeScript.svg" },
  { name: "Python", category: "Langage", logo: "Python.svg" },
  { name: "Node.js", category: "Backend", logo: "Node.js.svg" },
  { name: "Tailwind CSS", category: "Styles", logo: "Tailwind-CSS.svg" },
  { name: "PHP", category: "Langage", logo: "PHP.svg" },
  { name: "Prisma", category: "Données", initials: "Pr" },
  { name: "PostgreSQL", category: "Base de données", logo: "PostgresSQL.svg" },
  { name: "GraphQL", category: "API", logo: "GraphQL.svg" },
  { name: "Figma", category: "Design", logo: "Figma.svg" },
  { name: "Vercel", category: "Déploiement", logo: "Vercel.svg" },
  { name: "Sentry", category: "Monitoring", initials: "Se" },
  { name: "Cloudflare", category: "Infrastructure", logo: "Cloudflare.svg" },
  { name: "WP Rocket", category: "Performance", initials: "WP" },
  { name: "Stripe", category: "Paiement", initials: "St" },
  { name: "Resend", category: "Email", initials: "Re" },
];

export function StackCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <div className="stack-carousel" role="region" aria-label="Nos technologies">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-eyebrow">Du CMS à l’application sur mesure</p>
        <button
          type="button"
          className="stack-carousel-toggle inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-body-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          aria-label={paused ? "Reprendre le défilement des technologies" : "Mettre en pause le défilement des technologies"}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? <Play className="size-3.5" aria-hidden /> : <Pause className="size-3.5" aria-hidden />}
          {paused ? "Reprendre" : "Pause"}
        </button>
      </div>
      <div
        className="stack-carousel-viewport rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        tabIndex={0}
        role="group"
        aria-label="Technologies : défilement en pause au survol et au clavier. Sur mobile, faites glisser la liste."
      >
        <div className="stack-carousel-track" data-paused={paused}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="stack-carousel-list" aria-hidden={copy === 1 ? true : undefined}>
              {technologies.map((tech) => (
                <li key={tech.name} className="stack-carousel-card">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white p-2.5">
                    {tech.logo ? (
                      <Image src={`/assets/logos/${tech.logo}`} alt="" width={28} height={28} className="size-7 object-contain" />
                    ) : (
                      <span className="text-sm font-semibold text-[#101226]" aria-hidden>{tech.initials}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-body font-medium whitespace-nowrap">{tech.name}</p>
                    <p className="text-body-sm text-[var(--muted-foreground)]">{tech.category}</p>
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
