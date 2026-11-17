import type { Payload, PayloadRequest } from "payload";

import { FAQ_GROUPS } from "../../lib/faq";

/** Imports the /faq questions from lib/faq.ts, once per question. */
export async function seedFaq(payload: Payload, req?: PayloadRequest) {
  let order = 0;
  for (const group of FAQ_GROUPS) {
    for (const item of group.items) {
      order += 1;
      const existing = await payload.find({ collection: "faq", where: { question: { equals: item.question } }, limit: 1, req });
      if (existing.docs.length) continue;
      await payload.create({
        req,
        collection: "faq",
        data: { question: item.question, answer: item.answer, topic: group.title as "Le projet", order },
      });
    }
  }
}
