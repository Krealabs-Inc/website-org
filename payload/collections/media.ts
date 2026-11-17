import type { CollectionConfig } from "payload";

/**
 * Images and files used on the site. Stored on Vercel Blob in production
 * (see payload.config.ts), on disk in development.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Média", plural: "Médias" },
  admin: { group: "Contenus" },
  access: { read: () => true },
  upload: {
    mimeTypes: ["image/*", "video/mp4", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 480 },
      { name: "card", width: 960 },
      { name: "hero", width: 1920 },
    ],
  },
  fields: [
    {
      name: "alt",
      label: "Texte alternatif",
      type: "text",
      required: true,
      admin: { description: "Décrit l’image pour les lecteurs d’écran et Google." },
    },
  ],
};
