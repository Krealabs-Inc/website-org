import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Technologies - Stack technique Krealabs",
  description:
    "Les technologies que nous utilisons chez Krealabs : Next.js, React, React Native, TypeScript. Stack moderne pour des projets web et mobile maintenables et performants.",
  alternates: { canonical: "https://krealabs.fr/technologies" },
  openGraph: {
    title: "Technologies - Stack technique Krealabs",
    description:
      "Les technologies que nous utilisons chez Krealabs : Next.js, React, React Native, TypeScript. Stack moderne pour des projets web et mobile maintenables et performants.",
    url: "https://krealabs.fr/technologies",
    type: "website",
  },
};

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { TechMap } from "@/components/tech/tech-map";

const TECHNOLOGIES = [
  {
    name: "WordPress",
    kind: "CMS · Spécialité",
    description:
      "Notre spécialité historique. Sites sur mesure (thèmes custom, ACF Pro, pas de page builders), WooCommerce, refonte, SEO, maintenance. La majorité de nos clients sont sur WordPress.",
    points: ["Thème custom + ACF", "WooCommerce e-commerce", "Maintenance & sécurité"],
    href: "/services/wordpress",
  },
  {
    name: "Next.js",
    kind: "Framework React",
    description:
      "Le framework React de production. Server Components, App Router, optimisations automatiques. Notre stack moderne pour les projets qui demandent plus que WordPress.",
    points: ["Rendu serveur", "SEO natif", "Performance optimale"],
    href: "/technologies/nextjs",
  },
  {
    name: "React",
    kind: "Bibliothèque UI",
    description:
      "L'écosystème le plus mature pour construire des interfaces utilisateur. Une seule philosophie composant, deux plateformes (web et mobile).",
    points: ["Composants réutilisables", "Écosystème immense", "Standard de l'industrie"],
    href: "/technologies/react",
  },
  {
    name: "React Native",
    kind: "Mobile cross-platform",
    description:
      "Apps natives iOS et Android avec une seule base de code. Performance proche du natif, expérience utilisateur fidèle, time-to-market réduit.",
    points: ["iOS + Android", "Expo / EAS", "OTA updates"],
    href: "/technologies/react-native",
  },
  {
    name: "TypeScript",
    kind: "Langage typé",
    description:
      "Le typage statique au-dessus de JavaScript. Moins de bugs en production, refactoring serein, autocomplétion partout, documentation vivante.",
    points: ["Typage strict", "Refactoring sûr", "Code maintenable"],
    href: "/technologies/typescript",
  },
];

export default function TechnologiesPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Stack technique</Eyebrow>
            <h1 className="text-display">
              Les <em>outils</em> sur lesquels
              <br />
              nous misons.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              WordPress reste notre spécialité (et la majorité des projets que
              nous livrons), mais on s’adapte : Next.js, React Native,
              TypeScript, Python, Node.js - on choisit la techno selon le
              projet, pas selon une chapelle.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Démarrer un projet
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SIGNATURE: how the tools connect */}
      <section className="border-t border-[var(--border)] py-16 hidden md:block">
        <Container>
          <p className="text-caption mb-6">Survolez un outil pour voir avec quoi il travaille.</p>
          <TechMap />
        </Container>
      </section>

      {/* The tools, one row each */}
      <section className="border-t border-[var(--border)]">
        <Container>
          <ul className="tech-rows">
            {TECHNOLOGIES.map((t) => (
              <li key={t.name}>
                <Link href={t.href} className="tech-row group">
                  <span className="text-caption">{t.kind}</span>
                  <span className="text-h2">{t.name}</span>
                  <span className="text-body-sm text-[var(--muted-foreground)]">{t.description}</span>
                  <ArrowUpRight className="size-6 text-[var(--subtle-foreground)] transition-colors group-hover:text-[var(--accent)]" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Une stack à <em>concevoir</em> ?
          </>
        }
        description="Si vous hésitez entre plusieurs technologies pour votre projet, nous pouvons vous accompagner sur le choix."
        primaryLabel="Demander conseil"
      />
    </main>
  );
}
