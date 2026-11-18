import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { rich } from "@/components/ui/rich";
import { ServiceFAQ } from "@/components/services/service-faq";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { StudioDemo } from "@/components/studio/studio-section";
import { getPageTexts } from "@/lib/content/pages";
import { STUDIO_PAGE } from "@/lib/page-texts/studio";
import { STUDIO_URL } from "@/lib/studio";

export const metadata: Metadata = {
  title: "KreaStudio - Une maquette gratuite de votre site en quelques minutes",
  description:
    "Décrivez votre projet de site ou d’application en cinq minutes : KreaStudio génère une première maquette à parcourir, avec deux retouches incluses. Gratuit, sans engagement, par l’agence web Krealabs à Rouen.",
  alternates: { canonical: "https://krealabs.fr/studio" },
  openGraph: {
    title: "KreaStudio - Voyez votre site avant de le commander",
    description:
      "Un questionnaire guidé, une maquette générée en quelques minutes, deux retouches incluses. Gratuit et sans engagement.",
    url: "https://krealabs.fr/studio",
    type: "website",
  },
};

/** Every call to action on this page opens the tool itself. */
function StudioButton({ label, className }: { label: string; className?: string }) {
  return (
    <Button size="lg" asChild className={className}>
      <a href={STUDIO_URL} target="_blank" rel="noopener noreferrer">
        {label}
        <ArrowUpRight aria-hidden />
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    </Button>
  );
}

export default async function StudioPage() {
  const t = await getPageTexts(STUDIO_PAGE);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "https://krealabs.fr" },
          { name: "KreaStudio", url: "https://krealabs.fr/studio" },
        ]}
      />

      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Eyebrow dot className="mb-6">{t.eyebrow}</Eyebrow>
              <h1 className="studio-page-title">{rich(t.title)}</h1>
              <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-xl">{t.intro}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <StudioButton label={t.cta} />
                <Button size="lg" variant="outline" asChild>
                  <Link href="#etapes">{t.heroSecondary}</Link>
                </Button>
              </div>
              <p className="mt-6 text-caption">{t.reassurance}</p>
            </div>
            <div className="lg:col-span-6">
              <StudioDemo />
            </div>
          </div>
        </Container>
      </section>

      <section id="etapes" className="section-y scroll-mt-20 border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow className="mb-6">{t.stepsEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.stepsTitle)}</h2>
          </div>
          <ol className="studio-page-steps mt-14" data-scroll data-reveal="stagger">
            {t.steps.map((step, i) => (
              <li key={step.title}>
                <span aria-hidden>{i + 1}</span>
                <p className="text-h4 mt-5">{step.title}</p>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-2">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <StudioButton label={t.cta} />
          </div>
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow className="mb-6">{t.featuresEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.featuresTitle)}</h2>
          </div>
          <ul className="studio-page-features mt-14" data-scroll data-reveal="stagger">
            {t.features.map((f) => (
              <li key={f.title}>
                <p className="text-h4">{f.title}</p>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-2">{f.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-scroll data-reveal="up">
              <Eyebrow className="mb-6">{t.honestEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.honestTitle)}</h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6">{t.honestText}</p>
            </div>
            <div className="studio-page-honest lg:col-span-7" data-scroll data-reveal="up">
              <div>
                <p className="text-body font-medium">Ce qu’elle est</p>
                <ul>
                  {t.honestIs.map((x) => (
                    <li key={x.label}>
                      <Check className="size-4 text-[var(--accent)]" aria-hidden />
                      {x.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-body font-medium">Ce qu’elle n’est pas</p>
                <ul>
                  {t.honestIsNot.map((x) => (
                    <li key={x.label}>
                      <X className="size-4 text-[var(--muted-foreground)]" aria-hidden />
                      {x.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ServiceFAQ eyebrow={t.faqEyebrow} title={rich(t.faqTitle)} items={t.faq} />

      <section className="contact-invitation">
        <Container>
          <div className="contact-invitation-panel" data-scroll data-reveal="up">
            <div className="contact-invitation-copy">
              <Eyebrow className="mb-5">{t.ctaEyebrow}</Eyebrow>
              <h2 className="contact-invitation-title">{rich(t.ctaTitle)}</h2>
              <p className="text-body text-[var(--muted-foreground)] mt-5 max-w-xl">{t.ctaText}</p>
            </div>
            <div className="contact-invitation-actions">
              <StudioButton label={t.cta} className="w-full whitespace-normal text-center" />
              <Button size="lg" variant="outline" asChild className="w-full whitespace-normal text-center">
                <Link href="/contact">
                  {t.ctaSecondary}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
