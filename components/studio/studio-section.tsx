import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { rich } from "@/components/ui/rich";
import { STUDIO_URL } from "@/lib/studio";

export type StudioTexts = {
  studioEyebrow: string;
  studioTitle: string;
  studioText: string;
  studioSteps: { title: string; description: string }[];
  studioCta: string;
  studioMore: string;
  studioNote: string;
};

/**
 * Home: what KreaStudio is, in the visitor's words. The illustration shows
 * the exchange itself, a few answers going in and a site coming out.
 */
export function StudioSection({ t }: { t: StudioTexts }) {
  return (
    <section id="studio" className="studio-entry section-y border-t border-[var(--border)]">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6" data-scroll data-reveal="up">
            <Eyebrow dot className="mb-6">{t.studioEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.studioTitle)}</h2>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-6 max-w-xl">{t.studioText}</p>

            <ol className="studio-steps mt-10">
              {t.studioSteps.map((step, i) => (
                <li key={step.title}>
                  <span aria-hidden>{i + 1}</span>
                  <div>
                    <p className="text-body font-medium">{step.title}</p>
                    <p className="text-body-sm text-[var(--muted-foreground)] mt-1">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button size="lg" asChild>
                  <a href={STUDIO_URL} target="_blank" rel="noopener noreferrer">
                    {t.studioCta}
                    <ArrowUpRight aria-hidden />
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </Button>
                <Link href="/studio" className="home-text-link">
                  {t.studioMore}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
              <p className="mt-5 text-caption">{t.studioNote}</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <StudioDemo />
          </div>
        </div>
      </Container>
    </section>
  );
}

const BRIEF = [
  { label: "Votre activité", value: "Boulangerie à Rouen" },
  { label: "Votre objectif", value: "Recevoir des commandes" },
  { label: "L’ambiance", value: "Chaleureuse" },
];

const PRODUCTS = ["Pains", "Viennoiseries", "Sur commande"];

/** Decorative: the steps beside it say the same thing in words. */
export function StudioDemo() {
  return (
    <div className="studio-demo" aria-hidden data-scroll data-reveal="up">
      <div className="sd-brief">
        <p className="sd-caption">Vos réponses</p>
        <ul>
          {BRIEF.map((b, i) => (
            <li key={b.label} className="sd-block" style={{ "--i": i } as React.CSSProperties}>
              <span>{b.label}</span>
              {b.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="sd-screen sd-block" style={{ "--i": 4 } as React.CSSProperties}>
        <div className="sd-bar">
          <i /><i /><i />
          <span>votre-maquette</span>
        </div>
        <div className="sd-nav">
          <b>Le Fournil de Jeanne</b>
          <span>Accueil</span>
          <span>Nos pains</span>
          <span>Contact</span>
        </div>
        <div className="sd-hero">
          <div>
            <p className="sd-title sd-block" style={{ "--i": 6 } as React.CSSProperties}>
              Du pain frais, <em>chaque matin.</em>
            </p>
            <p className="sd-text sd-block" style={{ "--i": 7 } as React.CSSProperties}>
              Commandez la veille, passez le prendre à l’ouverture.
            </p>
            <span className="sd-button sd-block" style={{ "--i": 8 } as React.CSSProperties}>Commander</span>
          </div>
          <div className="sd-photo sd-block" style={{ "--i": 7 } as React.CSSProperties} />
        </div>
        <div className="sd-cards">
          {PRODUCTS.map((p, i) => (
            <div key={p} className="sd-block" style={{ "--i": 9 + i } as React.CSSProperties}>
              <i />
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
