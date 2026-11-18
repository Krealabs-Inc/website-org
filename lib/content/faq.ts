import { unstable_cache } from "next/cache";

import { cms } from "@/lib/cms";
import { FAQ_TOPICS } from "@/payload/collections/faq";

export type FaqGroup = { title: string; items: { question: string; answer: string }[] };

/** /faq questions grouped by topic, in topic order. Cached; refreshed on edit. */
export const getFaqGroups = unstable_cache(
  async (): Promise<FaqGroup[]> => {
    const payload = await cms();
    const res = await payload.find({ collection: "faq", sort: "order", limit: 500, depth: 0 });
    return FAQ_TOPICS.map((title) => ({
      title,
      items: res.docs.filter((d) => d.topic === title).map((d) => ({ question: d.question as string, answer: d.answer as string })),
    })).filter((g) => g.items.length > 0);
  },
  ["content-faq"],
  { tags: ["faq"] },
);
