import type { Payload, PayloadRequest } from "payload";

import { GLOSSARY } from "../../lib/glossary";

/** Imports the glossary from lib/glossary.ts (original content), once per slug. */
export async function seedGlossary(payload: Payload, req?: PayloadRequest) {
  for (const e of Object.values(GLOSSARY)) {
    const existing = await payload.find({ collection: "glossary", where: { slug: { equals: e.slug } }, limit: 1, req });
    if (existing.docs.length) continue;
    await payload.create({
      req,
      collection: "glossary",
      data: {
        term: e.term,
        slug: e.slug,
        category: e.category as "Web" | "Mobile" | "SEO" | "WordPress" | "Infrastructure",
        shortDef: e.shortDef,
        synonyms: e.synonyms ?? [],
        definition: e.definition,
        whyItMatters: e.whyItMatters,
        ourApproach: e.ourApproach,
        relatedTerms: e.relatedTerms,
        relatedLinks: e.relatedLinks ?? [],
      },
    });
  }
}
