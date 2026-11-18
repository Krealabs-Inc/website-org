import { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { CALCULATOR } from "@/lib/page-texts/calculator";
import { PageCta } from "@/components/services/page-cta";
import { QuoteCalculator } from "@/components/calculator/quote-calculator";

export const metadata: Metadata = {
  title: "Calculateur de devis - Estimer le prix de votre projet web",
  description:
    "Estimez gratuitement le prix de votre site web, e-commerce, SaaS ou application mobile en 60 secondes. Une fourchette réaliste, basée sur les tarifs d'une agence web à Rouen et le marché normand 2026.",
  alternates: { canonical: "https://krealabs.fr/calculateur" },
  openGraph: {
    title: "Calculateur de devis web - Krealabs",
    description:
      "Estimez en 4 étapes le prix de votre projet web (vitrine, e-commerce, SaaS, app mobile). Fourchette indicative basée sur le marché normand 2026.",
    url: "https://krealabs.fr/calculateur",
    type: "website",
  },
};

export default async function CalculateurPage() {
  const t = await getPageTexts(CALCULATOR);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <Container>
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-6">{t.eyebrow}</Eyebrow>
            <h1 className="text-display">{rich(t.title)}</h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">{t.intro}</p>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <QuoteCalculator />
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <div className="max-w-3xl">
            <Eyebrow className="mb-6">{t.methodEyebrow}</Eyebrow>
            <h2 className="text-h1 mb-8">{rich(t.methodTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mb-4 leading-relaxed">{rich(t.methodText1)}</p>
            <p className="text-body text-[var(--muted-foreground)] mb-4 leading-relaxed">{rich(t.methodText2)}</p>
            <p className="text-body text-[var(--muted-foreground)] leading-relaxed">{rich(t.methodText3)}</p>
          </div>
        </Container>
      </section>

      <PageCta t={t} />
    </main>
  );
}
