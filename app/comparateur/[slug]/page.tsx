import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
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
    keywords: data.keywords,
    alternates: { canonical: `${BASE_URL}/comparateur/${slug}` },
    openGraph: {
      title: `${data.title} — Krealabs`,
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

      {/* HERO */}
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
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Voir le blog
          </Link>

          <div className="max-w-4xl">
            <Eyebrow dot className="mb-6">
              Comparateur · Choix techniques
            </Eyebrow>
            <h1 className="text-display">
              <em>{data.a.name}</em>
              <br />
              <span className="text-[var(--muted-foreground)] text-display-sm align-middle">
                vs
              </span>
              <br />
              <em>{data.b.name}</em>
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-3xl">
              {data.intro}
            </p>
          </div>

          {/* Cards des deux concurrents */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
            <div className="bg-[var(--surface)] p-8">
              <Badge className="mb-4">A</Badge>
              <h2 className="text-h2 mb-2">{data.a.name}</h2>
              <p className="text-body text-[var(--muted-foreground)]">
                {data.a.tagline}
              </p>
            </div>
            <div className="bg-[var(--background)] p-8">
              <Badge variant="outline" className="mb-4">
                B
              </Badge>
              <h2 className="text-h2 mb-2">{data.b.name}</h2>
              <p className="text-body text-[var(--muted-foreground)]">
                {data.b.tagline}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* TABLEAU COMPARATIF */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-12">
            <Eyebrow number="01" className="mb-6">
              Comparaison critère par critère
            </Eyebrow>
            <h2 className="text-h1">
              {data.criteria.length} <em>critères</em> qui font la différence.
            </h2>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden">
            {/* Header — desktop only */}
            <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_auto] bg-[var(--surface)] text-eyebrow border-b border-[var(--border)]">
              <div className="px-6 py-4">Critère</div>
              <div className="px-6 py-4 border-l border-[var(--border)]">
                {data.a.name}
              </div>
              <div className="px-6 py-4 border-l border-[var(--border)]">
                {data.b.name}
              </div>
              <div className="px-6 py-4 border-l border-[var(--border)] w-24 text-center">
                Verdict
              </div>
            </div>
            {data.criteria.map((c, i) => (
              <div
                key={c.label}
                className={`border-b border-[var(--border)] md:grid md:grid-cols-[1fr_2fr_2fr_auto] ${
                  i === data.criteria.length - 1 ? "border-b-0" : ""
                }`}
              >
                {/* Label */}
                <div className="px-5 py-4 md:px-6 md:py-5 text-body-sm font-semibold flex items-center justify-between gap-4 bg-[var(--surface)] md:bg-transparent border-b md:border-b-0 border-[var(--border)]">
                  <span>{c.label}</span>
                  {/* Verdict badge inline on mobile */}
                  <span className="md:hidden shrink-0">
                    {c.winner === "a" && (
                      <span className="inline-flex items-center justify-center size-7 rounded-full bg-[var(--accent)] text-[#0a0a0a] text-body-sm font-bold">
                        A
                      </span>
                    )}
                    {c.winner === "b" && (
                      <span className="inline-flex items-center justify-center size-7 rounded-full bg-[var(--accent)] text-[#0a0a0a] text-body-sm font-bold">
                        B
                      </span>
                    )}
                    {!c.winner && (
                      <Minus className="size-4 text-[var(--muted-foreground)]" />
                    )}
                  </span>
                </div>
                {/* A */}
                <div
                  className={`px-5 py-4 md:px-6 md:py-5 text-body-sm text-[var(--muted-foreground)] md:border-l border-[var(--border)] ${
                    c.winner === "a"
                      ? "bg-[var(--accent-subtle)]/30"
                      : ""
                  }`}
                >
                  <span className="md:hidden inline-flex items-center justify-center size-5 rounded-full bg-[var(--border)] text-[var(--foreground)] text-caption font-bold mr-2 align-middle">
                    A
                  </span>
                  {c.a}
                </div>
                {/* B */}
                <div
                  className={`px-5 py-4 md:px-6 md:py-5 text-body-sm text-[var(--muted-foreground)] md:border-l border-[var(--border)] border-t md:border-t-0 ${
                    c.winner === "b"
                      ? "bg-[var(--accent-subtle)]/30"
                      : ""
                  }`}
                >
                  <span className="md:hidden inline-flex items-center justify-center size-5 rounded-full bg-[var(--border)] text-[var(--foreground)] text-caption font-bold mr-2 align-middle">
                    B
                  </span>
                  {c.b}
                </div>
                {/* Verdict — desktop only (mobile badge is inside label row) */}
                <div className="hidden md:flex px-6 py-5 border-l border-[var(--border)] w-24 items-center justify-center">
                  {c.winner === "a" && (
                    <span className="inline-flex items-center justify-center size-7 rounded-full bg-[var(--accent)] text-[#0a0a0a] text-body-sm font-bold">
                      A
                    </span>
                  )}
                  {c.winner === "b" && (
                    <span className="inline-flex items-center justify-center size-7 rounded-full bg-[var(--accent)] text-[#0a0a0a] text-body-sm font-bold">
                      B
                    </span>
                  )}
                  {!c.winner && (
                    <Minus className="size-4 text-[var(--muted-foreground)]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* USE CASES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-12">
            <Eyebrow number="02" className="mb-6">
              Use case par use case
            </Eyebrow>
            <h2 className="text-h1">
              Quel choix selon <em>votre projet</em>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden">
            {data.useCases.map((uc) => {
              const winner =
                uc.winner === "a" ? data.a.name : data.b.name;
              return (
                <div
                  key={uc.label}
                  className="bg-[var(--background)] p-8 flex flex-col"
                >
                  <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] text-caption font-medium">
                      <CheckCircle2 className="size-3" />
                      Choix : {winner}
                    </span>
                  </div>
                  <h3 className="text-h3 mb-3">{uc.label}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)] mb-4">
                    {uc.description}
                  </p>
                  <p className="text-body-sm text-[var(--foreground)] flex-1">
                    {uc.reasoning}
                  </p>
                </div>
              );
            })}
          </div>
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
                  Discuter de votre projet
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
