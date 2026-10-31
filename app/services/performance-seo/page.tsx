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
  title: "SEO local Rouen : vos clients vous trouvent sur Google",
  description:
    "Vous apparaissez quand vos clients cherchent votre métier à Rouen. Audit SEO, référencement local et Core Web Vitals par une agence web à Rouen, en Normandie. Résultats mesurés avant/après.",
  alternates: { canonical: "https://krealabs.fr/services/performance-seo" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceResources } from "@/components/services/service-resources";
import { ServiceFAQ } from "@/components/services/service-faq";
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
        eyebrow="Performance & SEO local"
        title={
          <>
            Vos clients vous trouvent
            <br />
            sur Google, à <em>Rouen</em>.
          </>
        }
        description="Vous apparaissez quand vos clients cherchent votre métier, et votre site s'affiche instantanément. Audit technique, Core Web Vitals et SEO local pour les entreprises de Rouen et de Normandie."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Ce qui change pour vous"
        title={
          <>
            Six leviers, un seul <em>objectif</em>.
          </>
        }
        intro="Chaque levier est mesuré avant/après. Les chiffres parlent - vous savez exactement ce que votre investissement rapporte."
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Audit, plan d’action, <em>résultats</em>.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Aucune boîte noire : chaque recommandation vous est expliquée,
                vous décidez, on l’applique. Et tout est mesuré.
              </p>
            </div>
            <ol className="lg:col-span-7 space-y-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="editorial-step">
                  <span className="editorial-ordinal">{String(i + 1).padStart(2, "0")}</span>
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
              Des mesures <em>vérifiables</em>, pas des promesses.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
            {TOOLS.map((t) => (
              <div key={t.name} className="compact-note">
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


      <ServiceResources
        articles={[
          { href: "/blog/seo-local-rouen-guide-pme", kicker: "SEO local", title: "Guide SEO local pour les PME de Rouen et Normandie" },
          { href: "/blog/core-web-vitals-2026-inp", kicker: "Core Web Vitals", title: "Core Web Vitals 2026 : INP a remplacé FID, ce que ça change" },
          { href: "/blog/lighthouse-100-guide-pme", kicker: "Performance", title: "Lighthouse 100/100 : le guide pratique pour PME" },
          { href: "/blog/schema-org-agences-web", kicker: "Données structurées", title: "Schema.org pour agences web : guide balisage complet" },
          { href: "/blog/ai-search-agences-adaptation-2026", kicker: "AI search", title: "AI search : comment les agences web doivent s'adapter en 2026" },
        ]}
      />

      <ServiceCta
        title={
          <>
            Vos clients vous <em>cherchent</em>. Ils vous trouvent ?
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
      "Audit complet en 3 axes : (1) Core Web Vitals via Lighthouse + PageSpeed Insights (LCP, INP, CLS - objectif 90+ sur les 3). (2) Audit SEO technique : crawl du site (Screaming Frog), schema.org, balises, vitesse, mobile-friendliness. (3) Audit sémantique : positions actuelles sur les mots-clés cibles, concurrence locale Rouen / Normandie, opportunités content. Rapport écrit avec recommandations priorisées par impact / effort.",
  },
  {
    question: "Combien coûte un audit SEO + perf complet à Rouen ?",
    answer:
      "Audit standard (jusqu'à 50 pages, 3-5 jours de travail) : 1 500-3 000 €. Audit approfondi avec recommandations et plan d'action (jusqu'à 500 pages, 7-12 jours) : 4 000-8 000 €. Inclus : rapport PDF, debrief en visio ou présentiel, priorisation des actions, accompagnement pendant 2 semaines pour les corrections urgentes.",
  },
  {
    question: "Quels sont les délais visibles sur les positions Google après corrections ?",
    answer:
      "Cas typiques observés : améliorations Core Web Vitals → +5-15% de trafic en 4-8 semaines. Corrections schema.org + technique → +10-30% en 8-16 semaines. Contenu nouveau ciblé local Rouen → +50-200% sur les longues traînes en 6-12 mois. Le SEO est un investissement long terme - pas de gain instantané sauf bugs techniques majeurs.",
  },
  {
    question: "Garantissez-vous la première position sur \"agence web Rouen\" ?",
    answer:
      "Non - et toute agence qui vous garantit la 1ère position ment. Google a 200+ critères de ranking dont seuls une trentaine sont contrôlables côté technique/contenu. Les autres dépendent de l'autorité du domaine (âge, backlinks), de la concurrence locale, du contexte utilisateur. Ce qu'on garantit : application des best practices, mesure transparente, progression continue.",
  },
  {
    question: "Travaillez-vous avec mon agence SEO existante ?",
    answer:
      "Oui, régulièrement. Si votre agence SEO gère déjà le contenu et les liens, vous pouvez nous confier la partie technique (performance, structure, schema). Chacun son terrain, et un point commun chaque trimestre pour avancer dans la même direction.",
  },
  {
    question: "Quels outils utilisez-vous ?",
    answer:
      "Audit technique : Lighthouse, PageSpeed Insights, Screaming Frog, Sitebulb. Monitoring : Search Console (gratuit), Vercel Analytics, Plausible. Sémantique : Ahrefs ou Semrush selon le projet. AI : Claude / GPT pour la rédaction assistée. Pour le netlinking et la veille concurrentielle intensive, on travaille main dans la main avec votre agence de référencement : vous profitez du meilleur des deux.",
  },
];

const FEATURES = [
  {
    icon: Gauge,
    title: "Core Web Vitals",
    description: "Objectif : votre site affiché en moins de 2 secondes sur tous les écrans, sous les seuils de Google (LCP, INP, CLS).",
  },
  {
    icon: Search,
    title: "SEO technique",
    description: "Google comprend et indexe correctement vos pages : Schema.org, sitemap, robots.txt, canonicals, balises.",
  },
  {
    icon: MapPin,
    title: "SEO local Rouen",
    description: "Vous ressortez dans les recherches locales et sur la carte : fiche Google Business Profile, Schema LocalBusiness, citations locales.",
  },
  {
    icon: FileSearch,
    title: "Recherche de mots-clés",
    description: "Vous savez ce que vos clients tapent vraiment dans Google : volume, concurrence et intention des requêtes de votre secteur.",
  },
  {
    icon: TrendingUp,
    title: "Optimisation des contenus",
    description: "Vos pages répondent aux questions de vos clients : titres, structure, maillage interne, réécriture si besoin.",
  },
  {
    icon: LineChart,
    title: "Suivi & reporting",
    description: "Vous voyez chaque mois ce que votre investissement rapporte : positions, trafic organique, conversions.",
  },
];

const STEPS = [
  {
    title: "Audit complet",
    description: "Analyse technique, contenu, profil de liens, performance. Rapport écrit avec priorités chiffrées.",
  },
  {
    title: "Plan d'action",
    description: "Priorisation des chantiers par impact. Vous validez ce qu'on implémente - et dans quel ordre.",
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
