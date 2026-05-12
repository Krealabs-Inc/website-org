import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Technologies — Stack technique Krealabs",
  description:
    "Les technologies que nous utilisons chez Krealabs : Next.js, React, React Native, TypeScript. Stack moderne pour des projets web et mobile maintenables et performants.",
  alternates: { canonical: "https://krealabs.fr/technologies" },
};

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";

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
              nous livrons), mais on s'adapte : Next.js, React Native,
              TypeScript, Python, Node.js — on choisit la techno selon le
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

      <section className="border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border-x border-b border-[var(--border)]">
            {TECHNOLOGIES.map((t) => (
              <Link
                key={t.name}
                href={t.href}
                className="group relative bg-[var(--background)] hover:bg-[var(--surface)] p-8 md:p-12 transition-colors duration-200"
              >
                <div className="flex items-start justify-between mb-12">
                  <span className="text-caption">{t.kind}</span>
                  <ArrowUpRight className="size-6 text-[var(--subtle-foreground)] group-hover:text-[var(--accent)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
                <h2 className="text-h1 mb-4">{t.name}</h2>
                <p className="text-body text-[var(--muted-foreground)] max-w-md mb-8">
                  {t.description}
                </p>
                <ul className="space-y-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-body-sm">
                      <span className="size-1 rounded-full bg-[var(--accent)] shrink-0" />
                      <span className="text-[var(--muted-foreground)]">{p}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
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
