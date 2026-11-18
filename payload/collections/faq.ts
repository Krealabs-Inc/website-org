import type { CollectionConfig } from "payload";

import { revalidateContent } from "../../lib/revalidate";

export const FAQ_TOPICS = ["Le projet", "Tarifs & devis", "Technologies & expertise", "Collaboration"] as const;

/** Questions of the /faq page, grouped by topic. */
export const Faq: CollectionConfig = {
  slug: "faq",
  labels: { singular: "Question", plural: "FAQ" },
  admin: { useAsTitle: "question", group: "Contenus", defaultColumns: ["question", "topic", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  hooks: {
    afterChange: [() => revalidateContent("faq")],
    afterDelete: [() => revalidateContent("faq")],
  },
  fields: [
    { name: "question", label: "Question", type: "text", required: true },
    { name: "answer", label: "Réponse", type: "textarea", required: true },
    { type: "row", fields: [
      { name: "topic", label: "Rubrique", type: "select", required: true, options: [...FAQ_TOPICS] },
      { name: "order", label: "Ordre", type: "number", defaultValue: 0 },
    ] },
  ],
};
