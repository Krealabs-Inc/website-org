import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { SERVICE_DESIGN } from "@/lib/page-texts/service-design";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export default async function DesignUiUxPage() {
  const t = await getPageTexts(SERVICE_DESIGN);
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
          <Eyebrow number="03" dot className="mb-8">{t.heroEyebrow}</Eyebrow>
          <LetterTitle lines={t.heroTitle.split("\n").map((line) => ({ text: line.replace(/\*/g, ""), accent: line.includes("*") }))} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <p className="text-body-lg text-[var(--muted-foreground)] lg:col-span-6">{t.heroText}</p>
            <div className="flex flex-wrap items-start gap-3 lg:col-span-6 lg:justify-end">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t.heroCta}
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">{t.heroSecondary}</Link>
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
              <Eyebrow number="01" className="mb-5">{t.beforeEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.beforeTitle)}</h2>
            </div>
            <p className="text-body text-[var(--muted-foreground)] max-w-sm">{t.beforeText}</p>
          </div>
          <div data-scroll data-reveal="up">
            <BeforeAfter />
          </div>
        </Container>
      </section>

      <ProjectSelection
        slugs={["pas-de-serie", "mbe-bihorel"]}
        eyebrow={t.projectsEyebrow}
        title={rich(t.projectsTitle)}
      />

      {/* WHAT YOU GET: a design system assembling, one specimen per service */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12 max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow number="02" className="mb-6">{t.featuresEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.featuresTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">{t.featuresText}</p>
          </div>
          <div className="ds-grid" data-scroll data-reveal="stagger">
            {t.features.map((f, i) => (
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
            <Eyebrow number="03" className="mb-6">{t.methodEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.methodTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6 max-w-md">{t.methodText}</p>
          </>
        }
      >
        {t.steps.map((step, i) => (
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
              <Eyebrow number="04" className="mb-6">{t.toolsEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.toolsTitle)}</h2>
            </div>
            <div className="lg:col-span-7" data-scroll data-reveal="up">
              <div className="layers">
                <p className="layers-head">Calques</p>
                <p className="layers-frame">▾ Votre projet</p>
                <ul data-scroll data-reveal="stagger">
                  {t.tools.map((tool) => (
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
        title={rich(t.faqTitle)}
        items={t.faq}
      />


      <PageCta t={t} />
    </main>
  );
}

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
