import { Metadata } from "next";
import {
  Gauge,
  Search,
  MapPin,
  FileSearch,
  TrendingUp,
  LineChart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Performance & SEO à Rouen — Core Web Vitals, référencement local",
  description:
    "Audit SEO, optimisation Core Web Vitals, référencement local Rouen. Améliorez votre visibilité Google et la vitesse de votre site. Agence SEO à Rouen.",
  keywords: [
    "seo rouen",
    "audit seo rouen",
    "référencement local rouen",
    "agence seo normandie",
    "core web vitals optimisation",
    "performance site web rouen",
  ],
  alternates: { canonical: "https://krealabs.fr/services/performance-seo" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceSchema } from "@/components/seo/service-schema";

export default function PerformanceSeoPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceSchema
        name="Audit SEO et optimisation performance"
        description="Audit SEO technique, optimisation Core Web Vitals, référencement local Rouen et Normandie. Schema.org, sitemap, contenus, Lighthouse 95+."
        url="https://krealabs.fr/services/performance-seo"
        serviceType="Audit SEO et optimisation performance web"
        priceRange="€€"
        offers={[
          { name: "Audit Core Web Vitals" },
          { name: "SEO technique" },
          { name: "SEO local Rouen" },
          { name: "Optimisation contenus" },
          { name: "Suivi mensuel" },
        ]}
      />
      <ServiceHero
        number="04"
        eyebrow="Service · Performance & SEO"
        title={
          <>
            Performance, SEO local <em>Rouen</em>,
            <br />
            Core Web Vitals.
          </>
        }
        description="Audit technique, optimisation Core Web Vitals, SEO local pour entreprises de Rouen et Normandie. Tout pour grimper dans Google et offrir une expérience instantanée à vos visiteurs."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Ce que nous mesurons"
        title={
          <>
            Six leviers, un seul <em>objectif</em>.
          </>
        }
        intro="Chaque levier est mesuré avant/après. Les chiffres parlent — vous savez exactement ce que votre investissement rapporte."
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Audit, plan d'action, <em>résultats</em>.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Pas de prestation au noir. Nous expliquons chaque
                recommandation, vous validez, nous implémentons. Toujours
                mesurable.
              </p>
            </div>
            <ol className="lg:col-span-7 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {STEPS.map((step, i) => (
                <li key={step.title} className="bg-[var(--background)] p-8 grid grid-cols-[auto_1fr] gap-8 items-start">
                  <span className="text-eyebrow text-[var(--accent)] pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-h3 mb-2">{step.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="03" className="mb-6">Outils</Eyebrow>
            <h2 className="text-h1">
              Les <em>instruments</em> qu'on utilise.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TOOLS.map((t) => (
              <div key={t.name} className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]">
                <p className="text-caption mb-3">{t.kind}</p>
                <p className="text-h4 mb-2">{t.name}</p>
                <p className="text-body-sm text-[var(--muted-foreground)]">{t.tagline}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Besoin d'un <em>audit SEO</em> ?
          </>
        }
      />
    </main>
  );
}

const FEATURES = [
  {
    icon: Gauge,
    title: "Core Web Vitals",
    description: "LCP, INP, CLS optimisés. Objectif < 2s en LCP, sous le seuil Google sur tous les terminaux.",
  },
  {
    icon: Search,
    title: "SEO technique",
    description: "Schema.org, sitemap dynamique, robots.txt, canonicals, balises meta. Les fondations propres.",
  },
  {
    icon: MapPin,
    title: "SEO local Rouen",
    description: "Schema LocalBusiness, fiche Google Business Profile, citations locales. Visibilité Normandie.",
  },
  {
    icon: FileSearch,
    title: "Recherche de mots-clés",
    description: "Identification des requêtes à fort potentiel pour votre secteur. Volume, concurrence, intention.",
  },
  {
    icon: TrendingUp,
    title: "Optimisation des contenus",
    description: "Titres, balises, structure des pages, maillage interne. Réécriture si nécessaire.",
  },
  {
    icon: LineChart,
    title: "Suivi & reporting",
    description: "Tableau de bord mensuel : positions, trafic organique, conversions. Vous voyez où va l'argent.",
  },
];

const STEPS = [
  {
    title: "Audit complet",
    description: "Analyse technique, contenu, profil de liens, performance. Rapport écrit avec priorités chiffrées.",
  },
  {
    title: "Plan d'action",
    description: "Priorisation des chantiers par impact. Vous validez ce qu'on implémente — et dans quel ordre.",
  },
  {
    title: "Implémentation",
    description: "Corrections techniques, optimisations on-page, schema markup. Mesures avant/après.",
  },
  {
    title: "Suivi mensuel",
    description: "Reporting Google Search Console + Analytics. Recommandations continues sur 3 à 12 mois.",
  },
];

const TOOLS = [
  { kind: "Performance", name: "Lighthouse", tagline: "Audit Core Web Vitals officiel Google" },
  { kind: "Recherche", name: "Ahrefs / Semrush", tagline: "Volume, concurrence, suivi positions" },
  { kind: "Search Console", name: "Google Search Console", tagline: "Indexation, requêtes, problèmes techniques" },
  { kind: "Analytics", name: "GA4 / Plausible", tagline: "Trafic, comportement, conversions" },
];
