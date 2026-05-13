import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { COMPARATORS, COMPARATOR_SLUGS } from "@/lib/comparators";

export const metadata: Metadata = {
  title: "Comparateurs techniques — Choisir entre 2 stacks · Krealabs",
  description:
    "Comparateurs neutres : WordPress vs Webflow, WooCommerce vs Shopify, Next.js vs WordPress, React Native vs Flutter. Le bilan d'une agence web à Rouen.",
  alternates: { canonical: "https://krealabs.fr/comparateur" },
};

export default function ComparatorIndexPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-6">
              Comparateurs · Choix techniques
            </Eyebrow>
            <h1 className="text-display">
              Comparer <em>deux stacks</em>,
              <br />
              choisir la bonne.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-3xl">
              Les questions qu&apos;on nous pose en boucle : WordPress ou
              Webflow ? Next.js ou WordPress ? React Native ou Flutter ? On a
              écrit des comparatifs détaillés pour cadrer ces choix
              techniques honnêtement, du point de vue d&apos;une agence web
              normande.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
            {COMPARATOR_SLUGS.map((slug) => {
              const comp = COMPARATORS[slug];
              return (
                <Link
                  key={slug}
                  href={`/comparateur/${slug}`}
                  className="group bg-[var(--background)] hover:bg-[var(--surface)] p-8 md:p-10 flex flex-col gap-6 transition-colors"
                >
                  <p className="text-eyebrow text-[var(--accent)]">
                    Comparateur
                  </p>
                  <div>
                    <h2 className="text-h2 mb-2">
                      {comp.a.name} <em>vs</em> {comp.b.name}
                    </h2>
                    <p className="text-body text-[var(--muted-foreground)]">
                      {comp.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    <span className="text-caption px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]">
                      {comp.a.tagline}
                    </span>
                    <span className="text-caption px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--surface)]">
                      {comp.b.tagline}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)] mt-2">
                    Lire le comparatif
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Besoin d&apos;<em>aide</em> pour choisir ?
          </>
        }
        description="Premier échange offert pour cadrer la bonne stack selon votre projet, votre équipe et votre budget."
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
