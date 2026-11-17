import type { CollectionConfig } from "payload";

import { revalidateContent } from "../../lib/revalidate";

/** Case studies shown on /clients and in project selections across the site. */
export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Réalisation", plural: "Réalisations" },
  admin: { useAsTitle: "name", group: "Contenus", defaultColumns: ["name", "sector", "order"] },
  access: { read: () => true },
  defaultSort: "order",
  hooks: {
    afterChange: [() => revalidateContent("projects")],
    afterDelete: [() => revalidateContent("projects")],
  },
  fields: [
    { type: "row", fields: [
      { name: "name", label: "Nom", type: "text", required: true },
      { name: "slug", label: "Identifiant (ancre /clients#…)", type: "text", required: true, unique: true },
      { name: "order", label: "Ordre", type: "number", defaultValue: 0 },
    ] },
    { type: "row", fields: [
      { name: "sector", label: "Secteur", type: "text", required: true },
      { name: "format", label: "Format", type: "text", required: true, admin: { description: "Ex. Site vitrine WordPress, Concept de refonte · Non contractuel" } },
    ] },
    { type: "row", fields: [
      { name: "url", label: "Adresse du site", type: "text" },
      { name: "domain", label: "Domaine affiché", type: "text" },
    ] },
    { name: "title", label: "Titre de l’étude de cas", type: "text", required: true },
    { name: "summary", label: "Résumé (une phrase)", type: "textarea", required: true },
    { name: "situation", label: "La situation", type: "textarea", required: true },
    { name: "work", label: "Ce qui a été fait", type: "textarea", required: true },
    { name: "result", label: "Ce que ça change", type: "textarea", required: true, admin: { description: "Pas de chiffre sans mesure fournie par le client." } },
    { name: "highlights", label: "Points clés", type: "text", hasMany: true },
    { type: "collapsible", label: "Vidéo", admin: { initCollapsed: true }, fields: [
      { type: "row", fields: [
        { name: "video", label: "Envoyer une vidéo (MP4)", type: "upload", relationTo: "media" },
        { name: "poster", label: "Envoyer une image d’aperçu", type: "upload", relationTo: "media" },
      ] },
      { type: "row", fields: [
        { name: "videoPath", label: "Vidéo actuelle (chemin)", type: "text", admin: { readOnly: true } },
        { name: "posterPath", label: "Aperçu actuel (chemin)", type: "text", admin: { readOnly: true } },
      ] },
      { name: "transcript", label: "Transcription de la vidéo", type: "textarea", admin: { description: "Lue par les lecteurs d’écran : décrit tout ce que montre la vidéo." } },
    ] },
  ],
};
