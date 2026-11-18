import type { CollectionConfig } from "payload";

import { revalidateContent } from "../../lib/revalidate";

export const POST_CATEGORIES = ["WordPress", "Web", "Mobile", "SEO", "Outils"] as const;

/**
 * Blog articles. Text fields keep the site's light markup (**gras**,
 * [lien](/adresse)). An article dated in the future stays hidden until
 * that day (pages revalidate hourly, plus the daily cron).
 */
export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Article", plural: "Articles" },
  admin: { useAsTitle: "title", group: "Contenus", defaultColumns: ["title", "category", "publishedAt", "featured"] },
  access: { read: () => true },
  defaultSort: ["order", "-publishedAt"],
  hooks: {
    afterChange: [() => revalidateContent("posts")],
    afterDelete: [() => revalidateContent("posts")],
  },
  fields: [
    { name: "title", label: "Titre", type: "text", required: true },
    { type: "row", fields: [
      { name: "slug", label: "Adresse (slug)", type: "text", required: true, unique: true, admin: { description: "→ /blog/slug" } },
      { name: "category", label: "Rubrique", type: "select", required: true, options: [...POST_CATEGORIES] },
      { name: "featured", label: "À la une", type: "checkbox", defaultValue: false },
    ] },
    { type: "row", fields: [
      { name: "publishedAt", label: "Date de publication", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" }, description: "Une date future programme l’article." } },
      { name: "updatedOn", label: "Mis à jour le", type: "date", admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" } } },
      { name: "readTime", label: "Temps de lecture", type: "text", required: true, admin: { description: "Ex. 8 min" } },
      { name: "order", label: "Ordre", type: "number", defaultValue: 0, admin: { description: "Position dans la liste (0 = en haut), puis par date." } },
    ] },
    { name: "excerpt", label: "Chapô", type: "textarea", required: true },
    { type: "row", fields: [
      { name: "image", label: "Envoyer une image", type: "upload", relationTo: "media" },
      { name: "imagePath", label: "Image actuelle (chemin)", type: "text", admin: { readOnly: true } },
    ] },
    { name: "introduction", label: "Introduction", type: "textarea", required: true },
    { name: "sections", label: "Sections", type: "array", required: true, fields: [
      { name: "title", label: "Titre", type: "text", required: true },
      { name: "content", label: "Texte", type: "textarea", required: true },
      { name: "code", label: "Bloc de code (optionnel)", type: "code" },
    ] },
    { name: "conclusion", label: "En résumé", type: "textarea", required: true },
    { name: "tags", label: "Mots-clés", type: "text", hasMany: true },
    { name: "author", label: "Auteur", type: "group", fields: [
      { type: "row", fields: [
        { name: "name", label: "Nom", type: "text", required: true, defaultValue: "Maxime Dubois" },
        { name: "role", label: "Rôle", type: "text", required: true, defaultValue: "Fondateur · Krealabs" },
      ] },
      { name: "avatar", label: "Avatar (adresse)", type: "text", required: true, defaultValue: "https://avatars.githubusercontent.com/u/36298487?v=4" },
    ] },
  ],
};
