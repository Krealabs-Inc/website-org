import { Metadata } from "next";
import {
  Eye,
  PenTool,
  Figma,
  Layers,
  Accessibility,
  TestTube2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Design UI/UX à Rouen — Interfaces & design system",
  description:
    "Design UI/UX à Rouen : wireframes, maquettes Figma, design system, prototypage. Interfaces accessibles, mémorables, pensées pour convertir. Agence digitale Normandie.",
  keywords: [
    "design ui ux rouen",
    "designer figma rouen",
    "design system normandie",
    "maquette site web rouen",
    "ux designer rouen",
  ],
  alternates: { canonical: "https://krealabs.fr/services/design-uiux" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";

export default function DesignUiUxPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceHero
        number="03"
        eyebrow="Service · Design"
        title={
          <>
            Des <em>interfaces</em> qui se distinguent.
          </>
        }
        description="Wireframes, maquettes haute fidélité, design system, prototypage interactif. Nous concevons des interfaces accessibles, mémorables et pensées pour convertir."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Ce que nous livrons"
        title={
          <>
            Du <em>brief</em> au design system.
          </>
        }
        intro="Un design rigoureux, documenté, réutilisable — pas une simple maquette qu'il faudra interpréter."
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Un <em>parcours</em> en quatre temps.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Du discovery au design system. Chaque étape est validée
                explicitement avant de passer à la suivante.
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
              Notre <em>boîte à outils</em>.
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
            Un projet à <em>maquetter</em> ?
          </>
        }
      />
    </main>
  );
}

const FEATURES = [
  {
    icon: Eye,
    title: "Audit UX",
    description: "Analyse de votre site/app existant : parcours, friction, heatmaps, recommandations chiffrées.",
  },
  {
    icon: PenTool,
    title: "Wireframes",
    description: "Squelettes basse fidélité de chaque écran. On valide la structure avant la déco.",
  },
  {
    icon: Figma,
    title: "Maquettes haute fidélité",
    description: "Designs finalisés sur Figma : typographie, couleurs, espacements, états, mobile et desktop.",
  },
  {
    icon: Layers,
    title: "Design system",
    description: "Bibliothèque de composants documentée, variantes, tokens. Réutilisable pour les évolutions futures.",
  },
  {
    icon: TestTube2,
    title: "Prototypage interactif",
    description: "Prototype navigable Figma pour tester les flows avant le développement. Économie de temps massive.",
  },
  {
    icon: Accessibility,
    title: "Accessibilité WCAG",
    description: "Contrastes, navigation clavier, lecteurs d'écran. Conformité AA dès la phase design.",
  },
];

const STEPS = [
  {
    title: "Discovery",
    description: "Atelier de cadrage : utilisateurs cibles, objectifs business, contraintes techniques. Brief design écrit.",
  },
  {
    title: "Wireframes",
    description: "Structure des écrans en basse fidélité. Validation des parcours utilisateur clés.",
  },
  {
    title: "Maquettes finales",
    description: "Design haute fidélité Figma, états, animations, version responsive. Validation écran par écran.",
  },
  {
    title: "Design system",
    description: "Documentation Figma + tokens, prêts à transformer en code. Handoff propre vers les développeurs.",
  },
];

const TOOLS = [
  { kind: "Design", name: "Figma", tagline: "Outil principal, collaboration temps réel" },
  { kind: "Prototyping", name: "Figma Prototype", tagline: "Navigation, animations, interactions" },
  { kind: "Recherche", name: "Maze / Lookback", tagline: "Tests utilisateurs distants, validés" },
  { kind: "Inspiration", name: "Mobbin / Refero", tagline: "Veille UI/UX continue" },
];
