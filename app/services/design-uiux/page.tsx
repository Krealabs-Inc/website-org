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
  title: "Design UI/UX à Rouen - Des interfaces qui font agir vos visiteurs",
  description:
    "Vos visiteurs comprennent et passent à l'action. Design UI/UX par une agence web à Rouen : maquettes Figma, design system, prototypage, accessibilité. Normandie et toute la France.",
  alternates: { canonical: "https://krealabs.fr/services/design-uiux" },
};

import { ProjectSelection } from "@/components/projects/project-selection";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export default function DesignUiUxPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceSchema
        name="Design UI/UX et design system"
        description="Design d'interfaces web et mobile à Rouen. Wireframes, maquettes Figma, design system, prototypage. Interfaces accessibles WCAG, mémorables, pensées pour convertir."
        url="https://krealabs.fr/services/design-uiux"
        serviceType="Design UI/UX"
        priceRange="€€"
        offers={[
          { name: "Audit UX" },
          { name: "Maquettes haute fidélité Figma" },
          { name: "Design system" },
          { name: "Prototypage interactif" },
          { name: "Accessibilité WCAG" },
        ]}
      />
      <ServiceHero
        number="03"
        eyebrow="Design UI/UX"
        title={
          <>
            Vos visiteurs comprennent et <em>passent à l’action</em>.
          </>
        }
        description="Des écrans clairs, des parcours évidents, une interface qui vous ressemble : vos visiteurs trouvent ce qu'ils cherchent et vous contactent. Maquettes, design system et prototypes, accessibles à tous."
      />

      <ProjectSelection
        slugs={["pas-de-serie", "mbe-bihorel"]}
        eyebrow="Deux identités, deux expressions"
        title={<>Une interface doit aussi<br /><em>vous ressembler.</em></>}
      />

      <ServiceFeatures
        layout="list"
        number="01"
        eyebrow="Ce que vous obtenez"
        title={
          <>
            Du <em>brief</em> au design system.
          </>
        }
        intro="Vous recevez un design documenté et réutilisable, pas une simple maquette qu'il faudra interpréter."
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Vous validez <em>chaque étape</em>.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                De l’atelier de cadrage au design system, rien ne passe à
                l’étape suivante sans votre accord.
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
              Testé <em>avant d’être codé</em>.
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
            Vos questions sur le <em>design UI/UX</em>.
          </>
        }
        items={FAQ}
      />


      <ServiceCta
        title={
          <>
            Et si vos visiteurs <em>passaient à l’action</em> ?
          </>
        }
      />
    </main>
  );
}

const FAQ = [
  {
    question: "Travaillez-vous avec un designer dédié ou un dev qui fait du design ?",
    answer:
      "Les deux, selon votre projet. Si votre identité graphique est centrale, un designer UI/UX indépendant de Rouen, partenaire de longue date, rejoint le projet. Si l'efficacité prime (SaaS B2B, outils métier), le design est fait en interne avec une approche utility-first (Tailwind, design systems). Vous nous dites ce dont vous avez besoin, on constitue la bonne équipe.",
  },
  {
    question: "Combien de maquettes au total ?",
    answer:
      "Site vitrine 6-10 pages : 8-15 écrans Figma (desktop + mobile + variantes principales). App mobile MVP : 15-25 écrans. SaaS / plateforme : 25-50 écrans. Toujours en haute fidélité : pour un projet de taille moyenne, vous validez directement des écrans finalisés, plus rapides à juger que des wireframes.",
  },
  {
    question: "Quels délais sur la phase design ?",
    answer:
      "Site vitrine : 2-3 semaines de design avant le démarrage du dev. App mobile MVP : 3-4 semaines. SaaS / plateforme : 4-6 semaines. Ces durées incluent 2-3 cycles de validation avec vous. Le développement ne démarre qu'une fois vos maquettes validées : c'est ce qui évite les corrections en cours de route qui font exploser les budgets.",
  },
  {
    question: "Travaillez-vous avec mes maquettes existantes (Figma, XD, Sketch) ?",
    answer:
      "Oui, sans souci. Si vous avez déjà des maquettes solides (Figma idéalement), on les intègre directement en dev. Si elles ont des problèmes (incohérences, manques, design impossible techniquement), on vous le dit honnêtement et on propose les corrections nécessaires avant de coder.",
  },
  {
    question: "Que se passe-t-il après validation des maquettes ?",
    answer:
      "L'intégration démarre. Votre site reprend la maquette au pixel près : si elle indique 24px de marge, le site aura 24px. Couleurs, espacements et typographies sont extraits de Figma (Tailwind et design tokens) pour garantir la cohérence. Vous vérifiez le résultat avec nous avant la mise en ligne.",
  },
  {
    question: "Concevez-vous des design systems complets ?",
    answer:
      "Oui, pour les clients avec plusieurs produits ou équipes : design system Figma (tokens, composants, variants, documentation) + implémentation côté code (shadcn/ui adapté à votre identité). Compter 6-10 jours de design + 8-15 jours d'implémentation selon la profondeur souhaitée.",
  },
];

const FEATURES = [
  {
    icon: Eye,
    title: "Audit UX",
    description: "Vous savez où vos visiteurs décrochent et quoi corriger en priorité : parcours, frictions, heatmaps, recommandations chiffrées.",
  },
  {
    icon: PenTool,
    title: "Wireframes",
    description: "Vous validez la structure de chaque écran avant de parler couleurs.",
  },
  {
    icon: Figma,
    title: "Maquettes haute fidélité",
    description: "Vous voyez votre site tel qu'il sera, sur mobile comme sur ordinateur, avant le développement.",
  },
  {
    icon: Layers,
    title: "Design system",
    description: "Vos futures pages restent cohérentes : composants documentés, variantes et tokens réutilisables.",
  },
  {
    icon: TestTube2,
    title: "Prototypage interactif",
    description: "Vous testez les parcours en conditions réelles avant le développement, sans allers-retours coûteux.",
  },
  {
    icon: Accessibility,
    title: "Accessibilité WCAG",
    description: "Tous vos visiteurs peuvent utiliser votre site : contrastes, navigation clavier, lecteurs d'écran, conformité AA dès le design.",
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
  { kind: "Design", name: "Figma", tagline: "Vous suivez le design en temps réel" },
  { kind: "Prototyping", name: "Figma Prototype", tagline: "Vous cliquez dans votre futur site" },
  { kind: "Recherche", name: "Maze / Lookback", tagline: "Testé par de vrais utilisateurs" },
  { kind: "Inspiration", name: "Mobbin / Refero", tagline: "Les meilleures pratiques du moment" },
];
