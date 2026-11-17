import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ServiceCta } from "@/components/services/service-cta";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { DefinedTermSchema } from "@/components/seo/defined-term-schema";
import { getGlossary } from "@/lib/content/glossary";

const BASE_URL = "https://krealabs.fr";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(await getGlossary()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const glossary = await getGlossary();
  const entry = glossary[slug];
  if (!entry) return {};

  return {
    title: `${entry.term} : définition · Lexique web Krealabs`,
    description: entry.shortDef,
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
  const glossary = await getGlossary();
  const entry = glossary[slug];
  if (!entry) notFound();

  const pageUrl = `${BASE_URL}/lexique/${slug}`;
  const related = entry.relatedTerms
    .map((s) => glossary[s])
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

      {/* A dictionary entry */}
      <article className="pt-32 pb-24 md:pt-40">
        <Container size="narrow">
          <Link
            href="/lexique"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-12 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Lexique
          </Link>
          <header className="entry-head">
            <h1 className="entry-term">{entry.term}</h1>
            <p className="entry-gram">
              <span>{entry.category}</span>
              {entry.synonyms && entry.synonyms.length > 0 && <span>Aussi appelé : {entry.synonyms.join(", ")}</span>}
            </p>
            <p className="entry-short">{entry.shortDef}</p>
          </header>

          <ol className="entry-senses">
            <li>
              <p className="entry-label">Définition</p>
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
            </li>
            <li>
              <p className="entry-label">Pourquoi c’est important</p>
              <p className="text-body text-[var(--muted-foreground)] leading-relaxed">{entry.whyItMatters}</p>
            </li>
            <li>
              <p className="entry-label">Chez Krealabs</p>
              <p className="text-body text-[var(--muted-foreground)] leading-relaxed">{entry.ourApproach}</p>
              {entry.relatedLinks && entry.relatedLinks.length > 0 && (
                <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {entry.relatedLinks.map((l) => (
                    <Link key={l.url} href={l.url} className="text-body-sm font-medium text-[var(--accent)] hover:underline underline-offset-4">
                      → {l.label}
                    </Link>
                  ))}
                </p>
              )}
            </li>
          </ol>

          {related.length > 0 && (
            <p className="entry-see">
              <span className="entry-label !mb-0">Voir aussi</span>
              {related.map((r) => (
                <Link key={r.slug} href={`/lexique/${r.slug}`}>
                  {r.term}
                </Link>
              ))}
            </p>
          )}
        </Container>
      </article>

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
