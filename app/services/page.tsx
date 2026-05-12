import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Smartphone,
  Sparkles,
  Gauge,
  ArrowRight,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Agence web à Rouen : développement web, applications mobiles, design UI/UX, performance & SEO. Quatre expertises, une seule équipe pour vos projets digitaux en Normandie.",
  alternates: { canonical: "https://krealabs.fr/services" },
};

export default function ServicesIndexPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />

        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Services · Krealabs Rouen</Eyebrow>
            <h1 className="text-display">
              Quatre <em>expertises</em>,
              <br />
              un seul interlocuteur.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Du design à la mise en production, nous couvrons l'ensemble de la
              chaîne digitale. Pas de sous-traitance, pas d'intermédiaires :
              l'équipe que vous rencontrez est celle qui code votre projet.
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

      {/* SERVICES GRID */}
      <section className="border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border-x border-b border-[var(--border)]">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </Container>
      </section>

      {/* APPROACH BLOCK */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow className="mb-6 justify-center">Notre engagement</Eyebrow>
            <h2 className="text-h1 mb-6">
              Un <em>cadre clair</em>, des livrables précis.
            </h2>
            <p className="text-body-lg text-[var(--muted-foreground)]">
              Tous nos projets suivent la même méthodologie : cadrage, design,
              développement itératif, mise en ligne, suivi. Vous savez à tout
              moment où nous en sommes — et combien il reste à faire.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="bg-[var(--background)] p-8">
                <p className="text-eyebrow text-[var(--accent)] mb-4">
                  {c.label}
                </p>
                <h3 className="text-h4 mb-2">{c.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <ServiceCta
        title={
          <>
            Une idée ? <em>Parlons-en.</em>
          </>
        }
      />
    </main>
  );
}

// =================================================================

const SERVICES = [
  {
    icon: Wrench,
    eyebrow: "Spécialité · WordPress",
    title: "Sites WordPress sur mesure",
    description:
      "Notre métier historique : création WordPress sur mesure, WooCommerce, refonte, SEO, maintenance, sécurité. Thèmes custom (pas de page builders), plugins développés à la main.",
    points: [
      "Thème custom + ACF Pro",
      "WooCommerce e-commerce",
      "Maintenance & sécurité",
    ],
    href: "/services/wordpress",
  },
  {
    icon: Code2,
    eyebrow: "Sur mesure · Polyvalent",
    title: "Développement web custom",
    description:
      "Quand WordPress ne suffit pas : Next.js, React, Python, Node.js. Plateformes SaaS, apps métier, API. La techno s'adapte au projet.",
    points: [
      "Next.js · TypeScript · Python",
      "Architectures scalables",
      "API & intégrations",
    ],
    href: "/services/developpement-web",
  },
  {
    icon: Smartphone,
    eyebrow: "iOS & Android",
    title: "Applications mobiles",
    description:
      "Apps cross-platform en React Native. Une seule base de code, deux App Stores. Expérience native, déploiement maîtrisé.",
    points: [
      "React Native · Expo",
      "Publication App Store & Play Store",
      "Notifications push, OTA",
    ],
    href: "/services/applications-mobile",
  },
  {
    icon: Sparkles,
    eyebrow: "Interfaces & design",
    title: "Design UI/UX",
    description:
      "Wireframes, maquettes Figma, design system, prototypes interactifs. Des interfaces accessibles, mémorables, pensées pour convertir.",
    points: [
      "Figma · Design systems",
      "Accessibilité WCAG",
      "Prototypage haute fidélité",
    ],
    href: "/services/design-uiux",
  },
  {
    icon: Gauge,
    eyebrow: "Visibilité & vitesse",
    title: "Performance & SEO",
    description:
      "Audit Core Web Vitals, optimisation Lighthouse, SEO local Rouen. Tout pour grimper dans Google et offrir une expérience instantanée.",
    points: [
      "Core Web Vitals < 2s",
      "SEO local & technique",
      "Audit & plan d'action",
    ],
    href: "/services/performance-seo",
  },
];

function ServiceCard({
  icon: Icon,
  eyebrow,
  title,
  description,
  points,
  href,
}: (typeof SERVICES)[number]) {
  return (
    <Link
      href={href}
      className="group relative bg-[var(--background)] hover:bg-[var(--surface)] p-8 md:p-12 transition-colors duration-200"
    >
      <div className="flex items-start justify-between mb-12">
        <div className="size-14 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
          <Icon className="size-6 text-[var(--accent)]" strokeWidth={1.5} />
        </div>
        <ArrowUpRight className="size-6 text-[var(--subtle-foreground)] group-hover:text-[var(--accent)] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
      </div>
      <p className="text-eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-h2 mb-4">{title}</h2>
      <p className="text-body text-[var(--muted-foreground)] max-w-md mb-8">
        {description}
      </p>
      <ul className="space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-body-sm">
            <span className="size-1 rounded-full bg-[var(--accent)] shrink-0" />
            <span className="text-[var(--muted-foreground)]">{p}</span>
          </li>
        ))}
      </ul>
    </Link>
  );
}

const COMMITMENTS = [
  {
    label: "Transparence",
    title: "Code source partagé",
    description:
      "Vous avez accès au dépôt Git dès le jour 1. Aucune dépendance ni rétention.",
  },
  {
    label: "Proximité",
    title: "Une équipe accessible",
    description:
      "Basés à Rouen, joignables directement. Pas de chef de projet intermédiaire.",
  },
  {
    label: "Pérennité",
    title: "Pensé pour durer",
    description:
      "Code maintenable, documentation à jour, formation à votre équipe si besoin.",
  },
];
