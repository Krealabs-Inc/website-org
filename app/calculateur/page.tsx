import { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { QuoteCalculator } from "@/components/calculator/quote-calculator";

export const metadata: Metadata = {
  title: "Calculateur de devis — Estimer le prix de votre projet web",
  description:
    "Calculateur gratuit : fourchette de prix réaliste pour un site web, e-commerce, SaaS ou application mobile. Marché normand 2026, basé sur les vrais coûts d'agence.",
  alternates: { canonical: "https://krealabs.fr/calculateur" },
  openGraph: {
    title: "Calculateur de devis web — Krealabs",
    description:
      "Estimez en 4 étapes le prix de votre projet web (vitrine, e-commerce, SaaS, app mobile). Fourchette indicative basée sur le marché normand 2026.",
    url: "https://krealabs.fr/calculateur",
    type: "website",
  },
};

export default function CalculateurPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <div
          aria-hidden
          className="absolute -top-32 left-1/3 size-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, var(--accent), transparent 70%)",
          }}
        />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-6">
              Calculateur · Estimation projet
            </Eyebrow>
            <h1 className="text-display">
              Combien <em>coûte</em>
              <br />
              votre projet web ?
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-3xl">
              En 4 étapes (60 secondes), obtenez une fourchette de prix réaliste
              pour votre projet web — site vitrine, e-commerce, SaaS,
              application mobile, refonte. Basé sur le vrai marché normand
              2026, pas sur une boîte noire.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <Container size="narrow">
          <QuoteCalculator />
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <div className="max-w-3xl">
            <Eyebrow className="mb-6">Comment on calcule ça ?</Eyebrow>
            <h2 className="text-h1 mb-8">
              Transparence <em>totale</em>.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mb-4 leading-relaxed">
              La fourchette de base par type de projet est dérivée des devis
              réels qu&apos;on a chiffrés sur 5 ans à Rouen. Les options
              additionnelles (paiement Stripe, comptes utilisateur,
              intégrations…) sont valorisées au prix marché normand : environ
              600-800 €/jour de dev senior, avec une fourchette qui reflète la
              variance selon la complexité.
            </p>
            <p className="text-body text-[var(--muted-foreground)] mb-4 leading-relaxed">
              Le multiplicateur d&apos;urgence (+20% si &lt; 4 semaines, -5% si
              flexible) reflète le coût opérationnel réel : un projet urgent
              demande de déprioriser d&apos;autres clients ou de mobiliser des
              renforts.
            </p>
            <p className="text-body text-[var(--muted-foreground)] leading-relaxed">
              <strong className="text-[var(--foreground)]">
                Cette estimation n&apos;est pas un devis.
              </strong>{" "}
              Pour un chiffrage précis, on a besoin d&apos;un cadrage (besoins
              exacts, contraintes, intégrations spécifiques). C&apos;est ce
              qu&apos;on fait en premier RDV — gratuit. Pour en savoir plus sur
              nos tarifs, lire notre{" "}
              <a
                href="/blog/prix-site-internet-rouen-2026"
                className="underline underline-offset-2 hover:text-[var(--foreground)]"
              >
                article complet sur les prix des sites internet à Rouen
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            On <em>cadre</em> votre projet ?
          </>
        }
        description="Premier RDV offert pour transformer votre estimation en devis précis. En présentiel à Rouen ou en visio."
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
