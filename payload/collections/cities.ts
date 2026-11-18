import type { CollectionConfig } from "payload";

import { revalidateContent } from "../../lib/revalidate";

/** Local landing pages (/agence-web-rouen, /agence-web-caen…). */
export const Cities: CollectionConfig = {
  slug: "cities",
  labels: { singular: "Ville", plural: "Villes" },
  admin: { useAsTitle: "name", group: "Pages locales", defaultColumns: ["name", "postalCode", "distanceFromRouen"] },
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidateContent("cities")],
    afterDelete: [() => revalidateContent("cities")],
  },
  fields: [
    { type: "row", fields: [
      { name: "name", label: "Ville", type: "text", required: true },
      { name: "slug", label: "Identifiant", type: "text", required: true, unique: true, admin: { readOnly: true } },
      { name: "path", label: "Adresse de la page", type: "text", required: true, admin: { readOnly: true } },
    ] },
    { type: "row", fields: [
      { name: "cityArticle", label: "« à Caen »", type: "text", required: true },
      { name: "cityPossessive", label: "« de Caen »", type: "text", required: true },
      { name: "adjective", label: "Adjectif", type: "text", required: true },
      { name: "adjectivePlural", label: "Adjectif pluriel", type: "text", required: true },
    ] },
    { name: "heroIntro", label: "Introduction", type: "textarea", required: true },
    { name: "cityReason", label: "Pourquoi une agence locale (texte)", type: "textarea", required: true },
    { name: "landmarks", label: "Repères (bandeau défilant)", type: "text", hasMany: true },
    { name: "topSectors", label: "Secteurs", type: "text", hasMany: true },
    { name: "zonesActivite", label: "Quartiers / zones", type: "text", hasMany: true },
    { name: "faq", label: "Questions fréquentes", type: "array", fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Réponse", type: "textarea", required: true },
    ] },
    { type: "collapsible", label: "Données de la ville", admin: { initCollapsed: true }, fields: [
      { type: "row", fields: [
        { name: "postalCode", label: "Code postal", type: "text", required: true },
        { name: "department", label: "Département", type: "text", required: true },
        { name: "region", label: "Région", type: "text", required: true },
        { name: "inseeCode", label: "Code INSEE", type: "text", required: true },
      ] },
      { type: "row", fields: [
        { name: "population", label: "Population", type: "text", required: true },
        { name: "metropole", label: "Agglomération", type: "text", required: true },
        { name: "distanceFromRouen", label: "Distance de Rouen (km)", type: "number", required: true },
      ] },
      { type: "row", fields: [
        { name: "lat", label: "Latitude", type: "number", required: true },
        { name: "lng", label: "Longitude", type: "number", required: true },
      ] },
    ] },
    { type: "collapsible", label: "SEO", admin: { initCollapsed: true }, fields: [
      { name: "title", label: "Titre SEO", type: "text", required: true },
      { name: "description", label: "Description SEO", type: "textarea", required: true },
      { name: "keywords", label: "Mots-clés", type: "text", hasMany: true },
    ] },
  ],
};
