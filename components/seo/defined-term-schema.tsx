import type { GlossaryEntry } from "@/lib/glossary";

/**
 * Schema.org DefinedTerm pour les pages /lexique/[slug].
 * Signale à Google et aux LLMs (Perplexity, ChatGPT) qu'on définit
 * un terme technique → favorise les citations en réponses IA.
 */
export function DefinedTermSchema({
  entry,
  pageUrl,
}: {
  entry: GlossaryEntry;
  pageUrl: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": pageUrl,
    name: entry.term,
    description: entry.shortDef,
    alternateName: entry.synonyms,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      "@id": "https://krealabs.fr/lexique",
      name: "Lexique web Krealabs",
    },
    url: pageUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
