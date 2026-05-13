import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { DefinedTermSchema } from "@/components/seo/defined-term-schema";
import { GLOSSARY, GLOSSARY_SLUGS, getEntry } from "@/lib/glossary";

const BASE_URL = "https://krealabs.fr";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GLOSSARY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};

  return {
    title: `${entry.term} : définition · Lexique web Krealabs`,
    description: entry.shortDef,
    keywords: [
      entry.term.toLowerCase(),
      `${entry.term.toLowerCase()} définition`,
      `qu'est-ce que ${entry.term.toLowerCase()}`,
      ...(entry.synonyms?.map((s) => s.toLowerCase()) || []),
    ],
    alternates: { canonical: `${BASE_URL}/lexique/${slug}` },
    openGraph: {
      title: `${entry.term} : définition`,
      description: entry.shortDef,
      url: `${BASE_URL}/lexique/${slug}`,
      type: "article",
    },
  };
}

export default async function LexiquePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const pageUrl = `${BASE_URL}/lexique/${slug}`;
  const related = entry.relatedTerms
    .map((s) => GLOSSARY[s])
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: BASE_URL },
          { name: "Lexique", url: `${BASE_URL}/lexique` },
          { name: entry.term, url: pageUrl },
        ]}
      />
      <DefinedTermSchema entry={entry} pageUrl={pageUrl} />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <Link
            href="/lexique"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Lexique
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Eyebrow dot>Lexique · Définition</Eyebrow>
              <Badge variant="outline">{entry.category}</Badge>
            </div>
            <h1 className="text-display mb-6">{entry.term}</h1>
            {entry.synonyms && entry.synonyms.length > 0 && (
              <p className="text-body text-[var(--muted-foreground)] mb-8 italic">
                Aussi appelé :{" "}
                {entry.synonyms.map((s, i) => (
                  <span key={s}>
                    «&nbsp;{s}&nbsp;»{i < entry.synonyms!.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            <p className="text-body-lg text-[var(--foreground)] leading-relaxed">
              {entry.shortDef}
            </p>
          </div>
        </Container>
      </section>

      {/* Définition longue */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow number="01" className="mb-6">
              Définition détaillée
            </Eyebrow>
            <div
              data-speakable
              className="text-body text-[var(--muted-foreground)] leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{
                __html: entry.definition.replace(
                  /\*\*([^*]+)\*\*/g,
                  '<strong class="text-[var(--foreground)] font-semibold">$1</strong>',
                ),
              }}
            />
          </div>
        </Container>
      </section>

      {/* Pourquoi c'est important */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30" aria-hidden />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow number="02" className="mb-6">
              Pourquoi c&apos;est important
            </Eyebrow>
            <p className="text-body-lg text-[var(--muted-foreground)] leading-relaxed">
              {entry.whyItMatters}
            </p>
          </div>
        </Container>
      </section>

      {/* Notre approche */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow number="03" className="mb-6">
              Notre approche chez Krealabs
            </Eyebrow>
            <p className="text-body-lg text-[var(--muted-foreground)] leading-relaxed">
              {entry.ourApproach}
            </p>
            {entry.relatedLinks && entry.relatedLinks.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {entry.relatedLinks.map((l) => (
                  <Link
                    key={l.url}
                    href={l.url}
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)] hover:gap-3 transition-all"
                  >
                    → {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Termes liés */}
      {related.length > 0 && (
        <section className="section-y border-t border-[var(--border)]">
          <Container>
            <div className="max-w-3xl mb-12">
              <Eyebrow number="04" className="mb-6">
                Termes liés
              </Eyebrow>
              <h2 className="text-h2">
                Continuer dans le <em>lexique</em>.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/lexique/${r.slug}`}
                  className="group bg-[var(--background)] hover:bg-[var(--surface)] p-6 flex flex-col gap-3 transition-colors"
                >
                  <Badge variant="outline" className="self-start">
                    {r.category}
                  </Badge>
                  <h3 className="text-h4">{r.term}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)] flex-1">
                    {r.shortDef.slice(0, 120)}…
                  </p>
                  <span className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)] mt-2">
                    Lire la définition
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ServiceCta
        title={
          <>
            Discuter de votre <em>projet</em> ?
          </>
        }
        description="Si ce terme fait écho à un projet ou une question concrète, on peut en discuter. Premier échange offert."
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
