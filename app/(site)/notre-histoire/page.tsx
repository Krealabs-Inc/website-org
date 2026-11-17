import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket, Layers, TrendingUp, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Notre histoire - Agence web à Rouen depuis 2020",
  description:
    "Découvrez Krealabs, agence digitale fondée à Rouen en 2020. Notre parcours, nos valeurs, notre méthode artisanale au service des entreprises de Normandie.",
  alternates: { canonical: "https://krealabs.fr/notre-histoire" },
  openGraph: {
    title: "Notre histoire - Agence web à Rouen depuis 2020 - Krealabs",
    description:
      "Découvrez Krealabs, agence digitale fondée à Rouen en 2020. Notre parcours, nos valeurs, notre méthode artisanale au service des entreprises de Normandie.",
    url: "https://krealabs.fr/notre-histoire",
    type: "website",
  },
};

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { getTeam } from "@/lib/content/team";
import { YearReel } from "@/components/history/year-reel";

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
      "Chaque projet est conçu pour son contexte. Thèmes WordPress custom, applications Next.js sur mesure - pas de template recyclé, pas de page builder bloated.",
  },
  {
    label: "Pérennité",
    title: "Penser long terme",
    description:
      "Code maintenable, documentation à jour, formation incluse. On construit pour 5 ans, pas 6 mois.",
  },
  {
    label: "Proximité",
    title: "Un contact accessible",
    description:
      "Basé à Rouen, joignable directement. Vous parlez à celui qui code - pas à un chef de projet.",
  },
];

export default async function NotreHistoirePage() {
  const team = await getTeam();
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <OrganizationSchema />
      {/* HERO: the founding year, outlined, behind the promise */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <span className="history-ghost" aria-hidden>2020</span>
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow dot className="mb-8">Notre histoire</Eyebrow>
            <h1 className="text-display">
              Une agence <em>artisanale</em>, ancrée en Normandie.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Depuis 2020, nous construisons des sites web, applications mobiles et logiciels sur mesure pour les entreprises de Rouen et de toute la Normandie. Pas de promesses creuses, juste du travail propre.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Parler de mon projet
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SIGNATURE: the year rolls as the story passes */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-10 max-w-2xl">
            <Eyebrow number="01" className="mb-6">Parcours</Eyebrow>
            <h2 className="text-h1">
              Six années de <em>construction</em>.
            </h2>
          </div>
          <YearReel chapters={TIMELINE.map(({ year, title, description }) => ({ year, title, description }))} />
        </Container>
      </section>

      {/* VALUES: a manifesto, one line each */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <Eyebrow number="02" className="mb-10">Ce qui nous guide</Eyebrow>
          <ol className="manifesto" data-scroll data-reveal="stagger">
            {VALUES.map((v) => (
              <li key={v.title}>
                <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">{v.label}</span>
                <p className="manifesto-line">{v.title}.</p>
                <p className="text-body text-[var(--muted-foreground)] max-w-xl">{v.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* TEAM: a short nod, the full page lives at /equipe */}
      <section className="border-t border-[var(--border)] py-16">
        <Container>
          <Link href="/equipe" className="history-team">
            <span className="flex -space-x-3">
              {team.map((m) => (
                <span key={m.name} className="history-avatar">{m.initials}</span>
              ))}
            </span>
            <span className="text-h3">
              {team.length} associés, et c’est <em>voulu</em>.
            </span>
            <span className="ml-auto inline-flex items-center gap-2 text-body text-[var(--accent)]">
              Rencontrer l’équipe
              <ArrowRight className="size-4" />
            </span>
          </Link>
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
