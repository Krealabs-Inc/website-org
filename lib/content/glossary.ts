import { unstable_cache } from "next/cache";

import { cms } from "@/lib/cms";
import type { GlossaryEntry } from "@/lib/glossary";

type Doc = Record<string, unknown>;

function toEntry(d: Doc): GlossaryEntry {
  const synonyms = Array.isArray(d.synonyms) ? (d.synonyms as string[]) : [];
  const links = Array.isArray(d.relatedLinks) ? (d.relatedLinks as { label: string; url: string }[]) : [];
  return {
    slug: d.slug as string,
    term: d.term as string,
    shortDef: d.shortDef as string,
    synonyms: synonyms.length ? synonyms : undefined,
    category: d.category as string,
    definition: d.definition as string,
    whyItMatters: d.whyItMatters as string,
    ourApproach: d.ourApproach as string,
    relatedTerms: Array.isArray(d.relatedTerms) ? (d.relatedTerms as string[]) : [],
    relatedLinks: links.length ? links.map(({ label, url }) => ({ label, url })) : undefined,
  };
}

/** Glossary entries keyed by slug. Cached; refreshed when edited in /cms. */
export const getGlossary = unstable_cache(
  async (): Promise<Record<string, GlossaryEntry>> => {
    const payload = await cms();
    const res = await payload.find({ collection: "glossary", sort: "term", limit: 1000, depth: 0 });
    return Object.fromEntries(res.docs.map((d) => [d.slug as string, toEntry(d as unknown as Doc)]));
  },
  ["content-glossary"],
  { tags: ["glossary"] },
);

export async function getGlossaryEntry(slug: string) {
  return (await getGlossary())[slug];
}
