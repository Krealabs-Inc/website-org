import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket, Layers, TrendingUp, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre histoire — Agence web à Rouen depuis 2020",
  description:
    "Découvrez Krealabs, agence digitale fondée à Rouen en 2020. Notre parcours, nos valeurs, notre méthode artisanale au service des entreprises de Normandie.",
  alternates: { canonical: "https://krealabs.fr/notre-histoire" },
};

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";

const TIMELINE = [
  {
    year: "2020",
    icon: Rocket,
    title: "Création de Krealabs",
    description:
      "Lancement de l'agence à Rouen avec une idée simple : faire du web qui dure, sans intermédiaires.",
  },
  {
    year: "2021",
    icon: Layers,
    title: "Premières applications mobiles",
    description:
      "Spécialisation React Native, premières apps publiées sur l'App Store et le Play Store.",
  },
  {
    year: "2022",
    icon: TrendingUp,
    title: "Premiers SaaS B2B",
    description:
      "Structuration de l'agence, premiers projets SaaS d'envergure pour des PME normandes. Stack Next.js + Postgres adoptée pour les apps custom.",
  },
  {
    year: "2024",
    icon: MapPin,
    title: "Ancrage régional",
    description:
      "Spécialisation SEO local Normandie, accompagnement long terme des PME rouennaises.",
  },
  {
    year: "2025",
    icon: Layers,
    title: "Migration stack moderne",
    description:
      "Adoption de Next.js 16 + React 19 + Server Components sur tous les nouveaux projets. Premières apps publiées sur l'App Store + Play Store en parallèle.",
  },
  {
    year: "2026",
    icon: Rocket,
    title: "Refonte du site Krealabs",
    description:
      "Refonte totale de notre propre site : design system v2, blog enrichi, pages locales (Rouen, Le Havre, Caen, Évreux, Dieppe…), lexique technique, comparateurs, calculateur de devis. La vitrine reflète enfin la rigueur des projets clients.",
  },
];

const TEAM_PREVIEW = [
  {
    name: "Maxime Dubois",
    initials: "MD",
    role: "Co-fondateur · Développeur",
    shortBio:
      "10 ans d'expérience web. Pilote l'architecture technique et la relation client sur les projets Krealabs.",
  },
  {
    name: "Romain Clatot",
    initials: "RC",
    role: "Co-fondateur · Développeur",
    shortBio:
      "Profil back-end et intégrations. Pilote les choix d'architecture serveur, les API et les bases de données sur nos projets.",
  },
];

const VALUES = [
  {
    label: "Transparence",
    title: "Code source partagé",
    description:
      "Vous avez accès au dépôt Git dès le jour 1. Pas de dépendance technique, pas de rétention.",
  },
  {
    label: "Artisanat",
    title: "Pas de copy-paste",
    description:
      "Chaque projet est conçu pour son contexte. Thèmes WordPress custom, applications Next.js sur mesure — pas de template recyclé, pas de page builder bloated.",
  },
  {
    label: "Pérennité",
    title: "Penser long terme",
    description:
      "Code maintenable, documentation à jour, formation incluse. On construit pour 5 ans, pas 6 mois.",
  },
  {
    label: "Proximité",
    title: "Une équipe accessible",
    description:
      "Basés à Rouen, joignables directement. Vous parlez à ceux qui codent — pas à des chefs de projet.",
  },
];

export default function NotreHistoirePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Notre histoire</Eyebrow>
            <h1 className="text-display">
              Une agence <em>artisanale</em>,
              <br />
              ancrée en Normandie.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Depuis 2020, nous construisons des sites web, applications mobiles
              et logiciels sur mesure pour les entreprises de Rouen et de toute
              la Normandie. Pas de promesses creuses, juste du travail propre.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Démarrer une collaboration
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* TIMELINE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Eyebrow number="01" className="mb-6">Parcours</Eyebrow>
              <h2 className="text-h1 mb-6">
                Quatre années de <em>construction</em>.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Une trajectoire mesurée, des choix techniques assumés, une
                clientèle fidèle qui reste avec nous sur la durée.
              </p>
            </div>

            <ol className="lg:col-span-8 relative">
              <div className="absolute left-[1.125rem] top-2 bottom-2 w-px bg-[var(--border)]" aria-hidden />
              {TIMELINE.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.year} className="relative pl-14 pb-12 last:pb-0">
                    <span className="absolute left-0 top-0 size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
                      <Icon className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                    </span>
                    <p className="text-eyebrow text-[var(--accent)] mb-2">{step.year}</p>
                    <h3 className="text-h3 mb-2">{step.title}</h3>
                    <p className="text-body text-[var(--muted-foreground)] max-w-2xl">
                      {step.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      {/* EQUIPE — aperçu */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Eyebrow number="02" className="mb-6">L'équipe</Eyebrow>
              <h2 className="text-h1">
                Deux <em>co-fondateurs</em>, une seule équipe.
              </h2>
            </div>
            <p className="text-body text-[var(--muted-foreground)] max-w-md">
              Pas de chef de projet, pas de sous-traitance. Les deux personnes
              que vous rencontrez sont celles qui codent votre projet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {TEAM_PREVIEW.map((m) => (
              <div key={m.name} className="bg-[var(--background)] p-8 md:p-10">
                <div className="flex items-start gap-5 mb-5">
                  <div className="size-14 shrink-0 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--accent-subtle)] flex items-center justify-center">
                    <span className="text-h4 font-semibold text-[var(--accent)]">{m.initials}</span>
                  </div>
                  <div>
                    <h3 className="text-h3 mb-1">{m.name}</h3>
                    <p className="text-body-sm text-[var(--accent)] font-medium">{m.role}</p>
                  </div>
                </div>
                <p className="text-body text-[var(--muted-foreground)]">{m.shortBio}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/equipe"
              className="inline-flex items-center gap-2 text-body font-medium text-[var(--accent)] hover:opacity-80 transition-opacity"
            >
              Découvrir l'équipe en détail
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* VALUES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Eyebrow number="03" className="mb-6">Valeurs</Eyebrow>
              <h2 className="text-h1">
                Ce qui nous <em>guide</em>.
              </h2>
            </div>
            <p className="text-body text-[var(--muted-foreground)] max-w-md">
              Quatre engagements concrets qui structurent notre façon de
              travailler avec chaque client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-[var(--background)] p-8 md:p-10">
                <p className="text-eyebrow text-[var(--accent)] mb-4">{v.label}</p>
                <h3 className="text-h3 mb-3">{v.title}</h3>
                <p className="text-body text-[var(--muted-foreground)] max-w-md">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            On <em>construit</em> ensemble ?
          </>
        }
      />
    </main>
  );
}
