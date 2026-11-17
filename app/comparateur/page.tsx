import { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { COMPARATORS, COMPARATOR_SLUGS } from "@/lib/comparators";

export const metadata: Metadata = {
  title: "Comparateurs techniques - Choisir entre 2 stacks",
  description:
    "Comparateurs neutres : WordPress vs Webflow, WooCommerce vs Shopify, Next.js vs WordPress, React Native vs Flutter. Le bilan d'une agence web à Rouen.",
  alternates: { canonical: "https://krealabs.fr/comparateur" },
  openGraph: {
    title: "Comparateurs techniques - Choisir entre 2 stacks - Krealabs",
    description:
      "Comparateurs neutres : WordPress vs Webflow, WooCommerce vs Shopify, Next.js vs WordPress, React Native vs Flutter. Le bilan d'une agence web à Rouen.",
    url: "https://krealabs.fr/comparateur",
    type: "website",
  },
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

      {/* MATCHUPS: each comparison as a face-off */}
      <section className="border-t border-[var(--border)] pb-24">
        <Container>
          <ul className="vs-list">
            {COMPARATOR_SLUGS.map((slug) => {
              const comp = COMPARATORS[slug];
              return (
                <li key={slug}>
                  <Link href={`/comparateur/${slug}`} className="vs-row group">
                    <span className="vs-row-a">{comp.a.name}</span>
                    <span className="vs-row-mid">vs</span>
                    <span className="vs-row-b">{comp.b.name}</span>
                    <span className="vs-row-desc">{comp.description}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
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
