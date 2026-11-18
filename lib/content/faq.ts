import { unstable_cache } from "next/cache";

import { items } from "@/lib/directus";

/** Topics of the /faq page, in display order. */
export const FAQ_TOPICS = ["Le projet", "Tarifs & devis", "Technologies & expertise", "Collaboration"] as const;

export type FaqGroup = { title: string; items: { question: string; answer: string }[] };

/** /faq questions grouped by topic, in topic order. Cached; refreshed on edit. */
export const getFaqGroups = unstable_cache(
  async (): Promise<FaqGroup[]> => {
    const docs = await items("faq", { sort: "order" });
    return FAQ_TOPICS.map((title) => ({
      title,
      items: docs.filter((d) => d.topic === title).map((d) => ({ question: d.question as string, answer: d.answer as string })),
    })).filter((g) => g.items.length > 0);
  },
  ["content-faq"],
  { tags: ["faq"] },
);
