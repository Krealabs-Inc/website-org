import type { CollectionConfig } from "payload";

import { revalidateContent } from "../../lib/revalidate";

/** The partners shown on /equipe, /equipe/[slug] and as article authors. */
export const Team: CollectionConfig = {
  slug: "team",
  labels: { singular: "Associé", plural: "Équipe" },
  admin: { useAsTitle: "name", group: "Contenus", defaultColumns: ["name", "role", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  hooks: {
    afterChange: [() => revalidateContent("team")],
    afterDelete: [() => revalidateContent("team")],
  },
  fields: [
    { type: "row", fields: [
      { name: "name", label: "Nom", type: "text", required: true },
      { name: "slug", label: "Adresse (slug)", type: "text", required: true, unique: true, admin: { description: "Ex. maxime-dubois → /equipe/maxime-dubois" } },
    ] },
    { type: "row", fields: [
      { name: "role", label: "Rôle", type: "text", required: true },
      { name: "initials", label: "Initiales", type: "text", required: true, maxLength: 3 },
      { name: "order", label: "Ordre d’affichage", type: "number", defaultValue: 0 },
    ] },
    { name: "photo", label: "Photo", type: "upload", relationTo: "media", admin: { description: "Remplace la photo actuelle dès qu’elle est envoyée." } },
    { name: "photoPath", label: "Photo actuelle (chemin)", type: "text", admin: { readOnly: true, description: "Photo d’origine du site, utilisée tant qu’aucune photo n’est envoyée." } },
    { name: "loves", label: "Ce qu’il/elle aime (citation)", type: "text", required: true },
    { name: "background", label: "Parcours avant Krealabs (une ligne)", type: "text", required: true },
    { name: "bio", label: "Bio courte", type: "textarea", required: true },
    { name: "longBio", label: "Bio longue (page profil)", type: "textarea", required: true },
    { type: "row", fields: [
      { name: "location", label: "Ville", type: "text", required: true },
      { name: "yearsExperience", label: "Années d’expérience", type: "text", required: true },
    ] },
    { name: "specialties", label: "Spécialités", type: "text", hasMany: true },
    { name: "stack", label: "Outils au quotidien", type: "text", hasMany: true },
    { name: "knowsAbout", label: "Sujets maîtrisés (SEO)", type: "text", hasMany: true },
    { type: "collapsible", label: "Liens et SEO", admin: { initCollapsed: true }, fields: [
      { type: "row", fields: [
        { name: "github", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "twitter", type: "text" },
        { name: "website", label: "Site perso", type: "text" },
      ] },
      { name: "metaTitle", label: "Titre SEO", type: "text", required: true },
      { name: "metaDescription", label: "Description SEO", type: "textarea", required: true },
    ] },
  ],
};
