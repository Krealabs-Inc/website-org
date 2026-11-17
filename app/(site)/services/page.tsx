import { Metadata } from "next";
import {
  Code2,
  Smartphone,
  Sparkles,
  Gauge,
  Wrench,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceSwitchboard } from "@/components/services/switchboard";

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
      {/* SWITCHBOARD: the page opens straight on the five needs */}
      <section className="pt-32 pb-20 md:pt-40">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow dot className="mb-6">Services · Agence web Rouen</Eyebrow>
              <h1 className="text-h1 md:text-display max-w-3xl">
                De quoi avez-vous <em>besoin</em> ?
              </h1>
            </div>
            <p className="text-body text-[var(--muted-foreground)] max-w-sm">
              Un seul interlocuteur du devis à la mise en ligne : les personnes que vous rencontrez construisent votre projet.
            </p>
          </div>
          <ServiceSwitchboard services={SERVICES.map(({ eyebrow, title, description, href }) => ({ eyebrow, title, description, href }))} />
        </Container>
      </section>

      {/* COMMITMENTS: three short lines */}
      <section className="border-t border-[var(--border)] py-16">
        <Container>
          <ul className="sw-commit">
            {COMMITMENTS.map((c) => (
              <li key={c.title}>
                <span className="text-caption text-[var(--accent)]">{c.label}</span>
                <span className="text-h4">{c.title}</span>
                <span className="text-body-sm text-[var(--muted-foreground)]">{c.description}</span>
              </li>
            ))}
          </ul>
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
