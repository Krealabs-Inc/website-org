import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import {
  COMPARATORS,
  COMPARATOR_SLUGS,
  type ComparatorData,
} from "@/lib/comparators";

const BASE_URL = "https://krealabs.fr";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPARATOR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPARATORS[slug];
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `${BASE_URL}/comparateur/${slug}` },
    openGraph: {
      title: `${data.title} - Krealabs`,
      description: data.description,
      url: `${BASE_URL}/comparateur/${slug}`,
      type: "article",
    },
  };
}

export default async function ComparatorPage({ params }: PageProps) {
  const { slug } = await params;
  const data: ComparatorData | undefined = COMPARATORS[slug];
  if (!data) notFound();
  const score = {
    a: data.criteria.filter((c) => c.winner === "a").length,
    b: data.criteria.filter((c) => c.winner === "b").length,
    tie: data.criteria.filter((c) => !c.winner || c.winner === "tie").length,
  };

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: BASE_URL },
          { name: "Comparateurs", url: `${BASE_URL}/comparateur` },
          { name: data.title, url: `${BASE_URL}/comparateur/${slug}` },
        ]}
      />
      <FAQSchema items={data.faq} />

      {/* HERO: split screen, the two tools face to face */}
      <section className="pt-28 md:pt-32">
        <Container>
          <Link
            href="/comparateur"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Tous les comparatifs
          </Link>
        </Container>
        <div className="vs-split">
          <div className="vs-side is-a">
            <p className="text-caption">A</p>
            <h1 className="vs-name">
              {data.a.name}
              <span className="sr-only"> ou {data.b.name} : le comparatif</span>
            </h1>
            <p className="text-body text-[var(--muted-foreground)] mt-3">{data.a.tagline}</p>
            <p className="vs-score">{score.a}</p>
          </div>
          <span className="vs-seam" aria-hidden>vs</span>
          <div className="vs-side is-b">
            <p className="text-caption">B</p>
            <p className="vs-name" aria-hidden>{data.b.name}</p>
            <p className="text-body text-[var(--muted-foreground)] mt-3">{data.b.tagline}</p>
            <p className="vs-score">{score.b}</p>
          </div>
        </div>
        <Container size="narrow">
          <p className="text-caption text-center mt-4">
            Critères gagnés sur {data.criteria.length}
            {score.tie > 0 ? ` · ${score.tie} à égalité` : ""}
          </p>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-10 text-center">{data.intro}</p>
        </Container>
      </section>

      {/* DUELS: one row per criterion, the marker leans toward the winner */}
      <section className="section-y">
        <Container>
          <Eyebrow number="01" className="mb-6">Critère par critère</Eyebrow>
          <h2 className="text-h1 mb-12">
            {data.criteria.length} <em>duels</em>.
          </h2>
          <ol className="duels">
            {data.criteria.map((c) => (
              <li key={c.label} data-scroll className={`duel is-${c.winner ?? "tie"}`}>
                <p className="duel-a">{c.a}</p>
                <div className="duel-mid">
                  <p className="duel-label">{c.label}</p>
                  <span className="duel-track" aria-hidden>
                    <span className="duel-dot" />
                  </span>
                  <p className="duel-verdict">
                    {c.winner === "a" ? `Avantage ${data.a.name}` : c.winner === "b" ? `Avantage ${data.b.name}` : "Égalité"}
                  </p>
                </div>
                <p className="duel-b">{c.b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* USE CASES: if you..., choose... */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <Eyebrow number="02" className="mb-6">Selon votre projet</Eyebrow>
          <ul className="vs-cases">
            {data.useCases.map((uc) => (
              <li key={uc.label}>
                <p className="text-caption">Si votre projet est…</p>
                <h3 className="text-h3 mt-2">{uc.label}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-2">{uc.description}</p>
                <p className="vs-pick">
                  → {uc.winner === "a" ? data.a.name : data.b.name}
                </p>
                <p className="text-body-sm mt-2">{uc.reasoning}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* VERDICT */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30" aria-hidden />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow number="03" className="mb-6">
              Notre verdict
            </Eyebrow>
            <h2 className="text-h1 mb-8">
              {data.a.name} ou {data.b.name} <em>?</em>
            </h2>
            <p className="text-body-lg text-[var(--muted-foreground)] leading-relaxed">
              {data.verdict}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  Parler de mon projet
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Voir nos services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-12">
            <Eyebrow number="04" className="mb-6">
              Questions fréquentes
            </Eyebrow>
            <h2 className="text-h1">FAQ {data.a.name} vs {data.b.name}.</h2>
          </div>
          <div className="max-w-3xl space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {data.faq.map((q) => (
              <details
                key={q.question}
                className="group bg-[var(--background)] open:bg-[var(--surface)] transition-colors"
              >
                <summary className="cursor-pointer list-none px-8 py-5 flex items-center justify-between gap-4">
                  <span className="text-h4">{q.question}</span>
                  <span
                    aria-hidden
                    className="text-h3 text-[var(--accent)] group-open:rotate-45 transition-transform shrink-0"
                  >
                    +
                  </span>
                </summary>
                <p className="px-8 pb-6 text-body text-[var(--muted-foreground)]">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* AUTRES COMPARATEURS */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-12">
            <Eyebrow number="05" className="mb-6">
              Autres comparaisons
            </Eyebrow>
            <h2 className="text-h2">
              Voir d&apos;autres <em>choix techniques</em>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {COMPARATOR_SLUGS.filter((s) => s !== slug).map((s) => {
              const other = COMPARATORS[s];
              return (
                <Link
                  key={s}
                  href={`/comparateur/${s}`}
                  className="group bg-[var(--background)] hover:bg-[var(--surface)] p-8 flex flex-col gap-3 transition-colors"
                >
                  <p className="text-caption">Comparateur</p>
                  <h3 className="text-h4 flex-1">
                    {other.a.name} vs {other.b.name}
                  </h3>
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
            Toujours <em>indécis</em> ?
          </>
        }
        description="Premier échange offert pour cadrer le bon choix technique selon votre projet, votre équipe, votre budget. En présentiel à Rouen ou en visio."
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
