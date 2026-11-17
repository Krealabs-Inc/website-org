import { Metadata } from "next";
import Link from "next/link";
import {
  Eye,
  PenTool,
  Figma,
  Layers,
  Accessibility,
  TestTube2,
  ArrowLeft,
  ArrowRight,
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
import { Button } from "@/components/ui/button";
import { HorizontalStrip } from "@/components/patterns/horizontal-strip";
import { LetterTitle } from "@/components/services/design/letter-title";
import { BeforeAfter } from "@/components/services/design/before-after";
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
      {/* HERO: letters snapping into place on the grid, no 3D */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden />
        <Container className="relative">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Retour aux services
          </Link>
          <Eyebrow number="03" dot className="mb-8">Design UI/UX</Eyebrow>
          <LetterTitle lines={[{ text: "Vos visiteurs comprennent" }, { text: "et passent à l’action.", accent: true }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <p className="text-body-lg text-[var(--muted-foreground)] lg:col-span-6">
              Des écrans clairs, des parcours évidents, une interface qui vous ressemble : vos visiteurs trouvent ce qu’ils cherchent et vous contactent. Maquettes, design system et prototypes, accessibles à tous.
            </p>
            <div className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:justify-end">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Parler de mon projet
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Voir toutes les solutions</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SIGNATURE: wireframe vs final design, dragged or scrolled */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-scroll data-reveal="up">
            <div>
              <Eyebrow number="01" className="mb-5">Avant / après</Eyebrow>
              <h2 className="text-h1">
                De la structure <em>à l’émotion.</em>
              </h2>
            </div>
            <p className="text-body text-[var(--muted-foreground)] max-w-sm">
              Glissez la poignée : la même page, en fil de fer puis en maquette finale. Exemple fictif.
            </p>
          </div>
          <div data-scroll data-reveal="up">
            <BeforeAfter />
          </div>
        </Container>
      </section>

      <ProjectSelection
        slugs={["pas-de-serie", "mbe-bihorel"]}
        eyebrow="Deux identités, deux expressions"
        title={<>Une interface doit aussi<br /><em>vous ressembler.</em></>}
      />

      {/* WHAT YOU GET: a design system assembling, one specimen per service */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12 max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow number="02" className="mb-6">Ce que vous obtenez</Eyebrow>
            <h2 className="text-h1">
              Du <em>brief</em> au design system.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">
              Vous recevez un design documenté et réutilisable, pas une simple maquette qu’il faudra interpréter.
            </p>
          </div>
          <div className="ds-grid" data-scroll data-reveal="stagger">
            {FEATURES.map((f, i) => (
              <article key={f.title} className="ds-tile">
                <div className="ds-specimen" aria-hidden>
                  <Specimen index={i} />
                </div>
                <div className="ds-body">
                  <h3 className="text-h4">{f.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)] mt-2">{f.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* METHOD: the horizontal strip, used on this page only */}
      <HorizontalStrip
        intro={
          <>
            <Eyebrow number="03" className="mb-6">Méthode</Eyebrow>
            <h2 className="text-h1">Vous validez <em>chaque étape</em>.</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6 max-w-md">
              De l’atelier de cadrage au design system, rien ne passe à l’étape suivante sans votre accord.
            </p>
          </>
        }
      >
        {STEPS.map((step, i) => (
          <article key={step.title} className="promise-card">
            <span className="font-[family-name:var(--font-geist-mono)] text-5xl text-[var(--accent)]">0{i + 1}</span>
            <div>
              <h3 className="text-h2">{step.title}</h3>
              <p className="text-body text-[var(--muted-foreground)] mt-5 max-w-md">{step.description}</p>
            </div>
          </article>
        ))}
      </HorizontalStrip>

      {/* TOOLS: as Figma shows them, a layers panel */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-scroll data-reveal="up">
              <Eyebrow number="04" className="mb-6">Outils</Eyebrow>
              <h2 className="text-h1">
                Testé <em>avant d’être codé</em>.
              </h2>
            </div>
            <div className="lg:col-span-7" data-scroll data-reveal="up">
              <div className="layers">
                <p className="layers-head">Calques</p>
                <p className="layers-frame">▾ Votre projet</p>
                <ul data-scroll data-reveal="stagger">
                  {TOOLS.map((tool) => (
                    <li key={tool.name}>
                      <span className="layers-icon" />
                      <span className="font-medium">{tool.name}</span>
                      <span className="text-body-sm text-[var(--muted-foreground)]">{tool.tagline}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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

/** A small visual for each service, like a page of a design system. */
function Specimen({ index }: { index: number }) {
  switch (index) {
    case 0: // Audit: where attention goes
      return (
        <span className="relative block h-24 w-40 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)]">
          <span className="absolute left-6 top-4 size-10 rounded-full bg-[#e57373] opacity-50 blur-md" />
          <span className="absolute right-6 bottom-3 size-8 rounded-full bg-[#e3a56f] opacity-50 blur-md" />
        </span>
      );
    case 1: // Wireframes
      return (
        <span className="grid h-24 w-40 gap-2 rounded-lg border border-dashed border-[var(--subtle-foreground)] p-3">
          <span className="rounded border border-dashed border-[var(--subtle-foreground)]" />
          <span className="grid grid-cols-2 gap-2">
            <span className="rounded border border-dashed border-[var(--subtle-foreground)]" />
            <span className="rounded border border-dashed border-[var(--subtle-foreground)]" />
          </span>
        </span>
      );
    case 2: // High fidelity: colour and type
      return (
        <>
          {["#8f99ed", "#f6f1ea", "#b4485c", "#3f6b55"].map((c) => (
            <span key={c} className="size-10 rounded-full border border-[var(--border-strong)]" style={{ background: c }} />
          ))}
          <span className="ml-2 font-[family-name:var(--font-instrument-serif)] text-4xl italic">Aa</span>
        </>
      );
    case 3: // Design system: components
      return (
        <span className="flex flex-col items-start gap-2">
          <span className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-[var(--accent-foreground)]">Bouton</span>
          <span className="rounded-md border border-[var(--border-strong)] px-3 py-1.5 text-xs text-[var(--muted-foreground)]">Champ</span>
          <span className="rounded-full bg-[var(--accent-subtle)] px-2.5 py-1 text-[10px] text-[var(--accent)]">Badge</span>
        </span>
      );
    case 4: // Prototype: a click path
      return (
        <svg width="160" height="96" viewBox="0 0 160 96" fill="none">
          <rect x="4" y="18" width="44" height="60" rx="6" stroke="currentColor" opacity="0.4" />
          <rect x="112" y="18" width="44" height="60" rx="6" stroke="currentColor" opacity="0.4" />
          <path d="M48 48 C 75 20, 90 76, 112 48" stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M104 44 l8 4 l-8 4" stroke="var(--accent)" strokeWidth="2" />
        </svg>
      );
    default: // Accessibility: contrast checked
      return (
        <span className="flex items-center gap-4">
          <span className="rounded-lg bg-[var(--foreground)] px-4 py-2 text-2xl font-semibold text-[var(--background)]">Aa</span>
          <span className="rounded-full bg-[rgba(127,181,154,0.15)] px-3 py-1 text-xs font-semibold text-[#7fb59a]">AA ✓</span>
        </span>
      );
  }
}
