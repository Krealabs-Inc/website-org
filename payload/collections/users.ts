import type { CollectionConfig } from "payload";

/** People who can sign in to the content admin (/cms). */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  auth: true,
  admin: { useAsTitle: "email", group: "Réglages" },
  fields: [{ name: "name", label: "Nom", type: "text" }],
};
