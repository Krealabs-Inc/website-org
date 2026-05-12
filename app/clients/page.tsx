import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Travaux & références — Cas clients",
  description:
    "Quelques cas anonymisés de projets web et mobile réalisés par Krealabs à Rouen et en Normandie. Plateformes SaaS, apps mobiles, sites e-commerce et logiciels métier.",
  alternates: { canonical: "https://krealabs.fr/clients" },
};

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";

interface ClientCase {
  industry: string;
  title: string;
  description: string;
  result: string;
  metric: string;
  confidential?: boolean;
}

const CASES: ClientCase[] = [
  {
    industry: "Immobilier",
    title: "Plateforme de gestion locative",
    description:
      "Outil interne pour une agence immobilière rouennaise : suivi des biens, états des lieux digitaux, génération de baux.",
    result: "Temps de traitement divisé par 3",
    metric: "−65%",
    confidential: true,
  },
  {
    industry: "SaaS B2B",
    title: "Refonte d'un produit SaaS",
    description:
      "Migration d'une stack legacy vers Next.js + TypeScript. UX revue, performances triplées, conversion en hausse.",
    result: "Score Lighthouse passé de 32 à 96",
    metric: "+200%",
    confidential: true,
  },
  {
    industry: "E-commerce",
    title: "Boutique en ligne sur mesure",
    description:
      "Site e-commerce headless pour une marque normande, intégration Stripe + gestion stock, panier optimisé mobile.",
    result: "Taux de conversion mobile doublé",
    metric: "×2",
    confidential: true,
  },
  {
    industry: "Service public",
    title: "Application mobile de signalement",
    description:
      "App React Native pour une collectivité : signalement de problèmes urbains avec géolocalisation et photo.",
    result: "10k+ téléchargements en 6 mois",
    metric: "10k+",
    confidential: true,
  },
];

export default function ClientsPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Travaux & références</Eyebrow>
            <h1 className="text-display">
              Quelques <em>histoires</em>,
              <br />
              beaucoup de discrétion.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              La plupart de nos clients préfèrent que leurs projets restent
              confidentiels. Voici quelques cas anonymisés pour donner un aperçu
              de ce que nous faisons.
            </p>
          </div>
        </Container>
      </section>

      {/* CASES */}
      <section className="border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border-x border-b border-[var(--border)]">
            {CASES.map((c) => (
              <article
                key={c.title}
                className="bg-[var(--background)] p-8 md:p-12 flex flex-col gap-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <Badge variant="secondary">{c.industry}</Badge>
                  {c.confidential && (
                    <span className="text-caption inline-flex items-center gap-1.5">
                      <Lock className="size-3" />
                      Anonymisé
                    </span>
                  )}
                </div>

                <h2 className="text-h2">{c.title}</h2>

                <p className="text-body text-[var(--muted-foreground)] flex-1">
                  {c.description}
                </p>

                <div className="pt-6 border-t border-[var(--border)] flex items-end justify-between gap-4">
                  <div>
                    <p className="text-caption mb-1">Résultat</p>
                    <p className="text-body-sm font-medium">{c.result}</p>
                  </div>
                  <span className="text-[2.5rem] leading-none font-medium tracking-[-0.04em] text-[var(--accent)]">
                    {c.metric}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIAL BLOCK */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow className="mb-8 justify-center">Témoignages</Eyebrow>
            <blockquote className="text-h2 leading-[1.3]">
              <span aria-hidden className="text-[var(--accent)]">«</span>
              {" "}
              Une <em>équipe à taille humaine</em> mais d'un niveau technique
              très élevé. Les délais sont tenus, le code livré est propre, et
              surtout : ils comprennent vraiment notre métier.
              {" "}
              <span aria-hidden className="text-[var(--accent)]">»</span>
            </blockquote>
            <p className="text-caption mt-8">— Directeur produit, SaaS B2B</p>
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Et le <em>prochain</em>, c'est vous ?
          </>
        }
        description="Que votre projet soit ambitieux ou modeste, nous le traitons avec la même exigence. Décrivez-nous votre contexte."
        primaryLabel="Démarrer la conversation"
      />
    </main>
  );
}
