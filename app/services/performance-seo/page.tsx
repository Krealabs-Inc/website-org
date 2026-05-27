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
  alternates: { canonical: "https://krealabs.fr/services/performance-seo" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

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

      <ServiceFAQ
        title={
          <>
            Vos questions sur <em>SEO &amp; performance</em>.
          </>
        }
        items={FAQ}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <NewsletterSignup variant="card" source="services-seo" />
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Besoin d&apos;un <em>audit SEO</em> ?
          </>
        }
      />
    </main>
  );
}

const FAQ = [
  {
    question: "Comment mesurez-vous la performance d'un site ?",
    answer:
      "Audit complet en 3 axes : (1) Core Web Vitals via Lighthouse + PageSpeed Insights (LCP, INP, CLS — objectif 90+ sur les 3). (2) Audit SEO technique : crawl du site (Screaming Frog), schema.org, balises, vitesse, mobile-friendliness. (3) Audit sémantique : positions actuelles sur les mots-clés cibles, concurrence locale Rouen / Normandie, opportunités content. Rapport écrit avec recommandations priorisées par impact / effort.",
  },
  {
    question: "Combien coûte un audit SEO + perf complet à Rouen ?",
    answer:
      "Audit standard (jusqu'à 50 pages, 3-5 jours de travail) : 1 500-3 000 €. Audit approfondi avec recommandations et plan d'action (jusqu'à 500 pages, 7-12 jours) : 4 000-8 000 €. Inclus : rapport PDF, debrief en visio ou présentiel, priorisation des actions, accompagnement pendant 2 semaines pour les corrections urgentes.",
  },
  {
    question: "Quels sont les délais visibles sur les positions Google après corrections ?",
    answer:
      "Cas typiques observés : améliorations Core Web Vitals → +5-15% de trafic en 4-8 semaines. Corrections schema.org + technique → +10-30% en 8-16 semaines. Contenu nouveau ciblé local Rouen → +50-200% sur les longues traînes en 6-12 mois. Le SEO est un investissement long terme — pas de gain instantané sauf bugs techniques majeurs.",
  },
  {
    question: "Garantissez-vous la première position sur \"agence web Rouen\" ?",
    answer:
      "Non — et toute agence qui vous garantit la 1ère position ment. Google a 200+ critères de ranking dont seuls une trentaine sont contrôlables côté technique/contenu. Les autres dépendent de l'autorité du domaine (âge, backlinks), de la concurrence locale, du contexte utilisateur. Ce qu'on garantit : application des best practices, mesure transparente, progression continue.",
  },
  {
    question: "Travaillez-vous avec mon agence SEO existante ?",
    answer:
      "Oui régulièrement. Beaucoup d'entreprises ont déjà une agence SEO pour le contenu/netlinking et nous engagent pour le SEO technique (perf, structure, schema). Cette répartition fonctionne bien : on s'occupe du code, ils s'occupent du content + outreach. On synchronise via des points trimestriels.",
  },
  {
    question: "Quels outils utilisez-vous ?",
    answer:
      "Audit technique : Lighthouse, PageSpeed Insights, Screaming Frog, Sitebulb. Monitoring : Search Console (gratuit), Vercel Analytics, Plausible. Sémantique : Ahrefs ou Semrush selon le projet. AI : Claude / GPT pour la rédaction assistée. Nous ne sommes pas équipés d'outils SEO marketing lourds (Ahrefs Premium 500$/mois) — pour ça, on collabore avec votre agence de référencement.",
  },
];

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
