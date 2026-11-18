import type { CollectionConfig } from "payload";

import { revalidateContent } from "../../lib/revalidate";

/** Terms of the /lexique dictionary. */
export const Glossary: CollectionConfig = {
  slug: "glossary",
  labels: { singular: "Définition", plural: "Lexique" },
  admin: { useAsTitle: "term", group: "Contenus", defaultColumns: ["term", "category"] },
  access: { read: () => true },
  defaultSort: "term",
  hooks: {
    afterChange: [() => revalidateContent("glossary")],
    afterDelete: [() => revalidateContent("glossary")],
  },
  fields: [
    { type: "row", fields: [
      { name: "term", label: "Terme", type: "text", required: true },
      { name: "slug", label: "Adresse (slug)", type: "text", required: true, unique: true, admin: { description: "→ /lexique/slug" } },
      { name: "category", label: "Catégorie", type: "select", required: true, options: ["Web", "Mobile", "SEO", "WordPress", "Infrastructure"] },
    ] },
    { name: "shortDef", label: "Définition courte", type: "textarea", required: true },
    { name: "synonyms", label: "Aussi appelé", type: "text", hasMany: true },
    { name: "definition", label: "Définition détaillée", type: "textarea", required: true, admin: { description: "**mot** pour mettre en gras." } },
    { name: "whyItMatters", label: "Pourquoi c’est important", type: "textarea", required: true },
    { name: "ourApproach", label: "Chez Krealabs", type: "textarea", required: true },
    { name: "relatedTerms", label: "Termes liés (slugs)", type: "text", hasMany: true },
    { name: "relatedLinks", label: "Liens utiles", type: "array", fields: [
      { type: "row", fields: [
        { name: "label", label: "Texte", type: "text", required: true },
        { name: "url", label: "Adresse", type: "text", required: true },
      ] },
    ] },
  ],
};
