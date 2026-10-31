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
  title: "Services web à Rouen : sites, apps, SEO",
  description:
    "Agence web à Rouen : un site que vous gérez vous-même, des outils qui vous font gagner du temps, une place dans Google. Développement web en Normandie, un seul interlocuteur du devis à la mise en ligne.",
  alternates: { canonical: "https://krealabs.fr/services" },
  openGraph: {
    title: "Ce qu’on peut faire pour vous - Krealabs, agence web Rouen",
    description:
      "Agence web à Rouen : un site que vous gérez vous-même, des outils qui vous font gagner du temps, une place dans Google. Développement web en Normandie, un seul interlocuteur.",
    url: "https://krealabs.fr/services",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />

        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Services · Agence web Rouen</Eyebrow>
            <h1 className="text-display">
              Un seul <em>interlocuteur</em>,
              <br />
              du devis à la mise en ligne.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Site, application, design ou référencement : vous n’avez pas à
              coordonner plusieurs prestataires. Les personnes que vous
              rencontrez sont celles qui construisent votre projet.
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

      {/* SERVICES GRID */}
      <section className="border-t border-[var(--border)]">
        <Container>
          <div className="service-directory">
            {SERVICES.map((s, index) => (
              <ServiceCard key={s.title} {...s} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* APPROACH BLOCK */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow className="mb-6 justify-center">Ce que vous pouvez attendre</Eyebrow>
            <h2 className="text-h1 mb-6">
              Un <em>cadre clair</em>, aucune surprise.
            </h2>
            <p className="text-body-lg text-[var(--muted-foreground)]">
              Cadrage, design, développement, mise en ligne, suivi : votre
              projet suit des étapes claires. Vous savez à tout moment où il en
              est, et ce qu’il reste à faire.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="editorial-note">
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
    eyebrow: "Site WordPress",
    title: "Vous gérez votre site vous-même",
    description:
      "Un site conçu pour votre activité, une boutique WooCommerce, une refonte qui garde votre place dans Google, puis la maintenance pour que vous n'y pensiez plus. Notre métier historique : thèmes sur mesure, sans page builder.",
    points: [
      "Thème custom + ACF Pro",
      "WooCommerce e-commerce",
      "Maintenance & sécurité",
    ],
    href: "/services/wordpress",
  },
  {
    icon: Code2,
    eyebrow: "Sites & outils sur mesure",
    title: "Vos process tournent sans tableurs",
    description:
      "Espace client, outil métier, plateforme SaaS : un outil construit autour de votre façon de travailler, qui supprime la ressaisie. Next.js, React, Python, Node.js : la technologie s'adapte à votre besoin.",
    points: [
      "Next.js · TypeScript · Python",
      "Architectures scalables",
      "API & intégrations",
    ],
    href: "/services/developpement-web",
  },
  {
    icon: Smartphone,
    eyebrow: "Applications mobiles · iOS & Android",
    title: "Vos clients vous ont dans leur poche",
    description:
      "Une application sur iOS et Android pour le budget d'une seule : une base de code React Native, deux App Stores, une expérience native.",
    points: [
      "React Native · Expo",
      "Publication App Store & Play Store",
      "Notifications push, OTA",
    ],
    href: "/services/applications-mobile",
  },
  {
    icon: Sparkles,
    eyebrow: "Design UI/UX",
    title: "Vos visiteurs passent à l'action",
    description:
      "Des écrans clairs et des parcours évidents : vos visiteurs trouvent ce qu'ils cherchent et vous contactent. Maquettes Figma, design system, accessibilité.",
    points: [
      "Figma · Design systems",
      "Accessibilité WCAG",
      "Prototypage haute fidélité",
    ],
    href: "/services/design-uiux",
  },
  {
    icon: Gauge,
    eyebrow: "Performance & SEO",
    title: "Vos clients vous trouvent sur Google",
    description:
      "Vous apparaissez quand vos clients cherchent votre métier à Rouen, et votre site s'affiche instantanément. Audit Core Web Vitals, SEO local et technique.",
    points: [
      "Core Web Vitals < 2s",
      "SEO local & technique",
      "Audit & plan d'action",
    ],
    href: "/services/performance-seo",
  },
];

function ServiceCard({ eyebrow, title, description, points, href, index }: (typeof SERVICES)[number] & { index: number }) {
  return (
    <Link href={href} className="directory-entry group">
      <span className="editorial-ordinal" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
      <div>
        <p className="text-eyebrow mb-4">{eyebrow}</p>
        <h2 className="text-h2">{title}</h2>
      </div>
      <div>
        <p className="text-body text-[var(--muted-foreground)] mb-5">{description}</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {points.map((point) => <li key={point} className="text-caption">{point}</li>)}
        </ul>
      </div>
      <ArrowUpRight className="directory-arrow size-5" aria-hidden />
    </Link>
  );
}

const COMMITMENTS = [
  {
    label: "Transparence",
    title: "Le code vous appartient",
    description:
      "Vous avez accès au dépôt Git dès le premier jour. Aucune dépendance envers nous.",
  },
  {
    label: "Proximité",
    title: "Vous parlez à ceux qui codent",
    description:
      "À Rouen et joignables directement, sans chef de projet intermédiaire.",
  },
  {
    label: "Pérennité",
    title: "Un site qui dure",
    description:
      "Code maintenable, documentation à jour et formation de votre équipe si besoin.",
  },
];
