import { ctaFields, definePage } from "./define";

export const GLOSSARY_PAGE = definePage({
  slug: "lexique",
  label: "Lexique (page)",
  fields: {
    eyebrow: { label: "Surtitre ({n} = nombre de définitions)", default: "Lexique · {n} définitions" },
    title: { label: "Titre", default: "Le *web technique* en clair." },
    intro: { label: "Texte", default: "Les termes que nous employons en agence, expliqués simplement : pour comprendre les choix techniques que nous vous proposons.", long: true },
    ...ctaFields("Un projet à *discuter* ?", {"text": "Premier échange offert pour cadrer votre projet - sites, apps, plateformes. On parle technique sans jargon.", "primary": "Prendre rendez-vous"}),
  },
});
