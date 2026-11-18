import type { CollectionConfig } from "payload";

import { revalidateContent } from "../../lib/revalidate";

const pairs = (name: string, label: string, a: string, b: string) => ({
  name,
  label,
  type: "array" as const,
  fields: [
    { name: a, label: a === "title" ? "Titre" : "Question", type: "text" as const, required: true },
    { name: b, label: b === "description" ? "Texte" : "Réponse", type: "textarea" as const, required: true },
  ],
});

/** Trade pages under /agence-web-rouen/[secteur]. */
export const Sectors: CollectionConfig = {
  slug: "sectors",
  labels: { singular: "Secteur", plural: "Secteurs (Rouen)" },
  admin: { useAsTitle: "namePlural", group: "Pages locales" },
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidateContent("sectors")],
    afterDelete: [() => revalidateContent("sectors")],
  },
  fields: [
    { type: "row", fields: [
      { name: "slug", label: "Adresse (slug)", type: "text", required: true, unique: true, admin: { description: "→ /agence-web-rouen/slug" } },
      { name: "name", label: "Nom (singulier)", type: "text", required: true },
      { name: "namePlural", label: "Pluriel", type: "text", required: true },
      { name: "nameLabeled", label: "Avec article", type: "text", required: true, admin: { description: "Ex. les restaurants" } },
    ] },
    { name: "intro", label: "Introduction", type: "textarea", required: true },
    pairs("challenges", "Enjeux", "title", "description"),
    pairs("features", "Ce que nous proposons", "title", "description"),
    { name: "recommendedStack", label: "Notre recommandation", type: "textarea", required: true },
    pairs("faq", "Questions fréquentes", "question", "answer"),
    { type: "collapsible", label: "SEO", admin: { initCollapsed: true }, fields: [
      { name: "title", label: "Titre SEO", type: "text", required: true },
      { name: "description", label: "Description SEO", type: "textarea", required: true },
      { name: "keywords", label: "Mots-clés", type: "text", hasMany: true },
    ] },
  ],
};
