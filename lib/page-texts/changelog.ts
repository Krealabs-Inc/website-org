import { ctaFields, definePage } from "./define";

export const CHANGELOG_PAGE = definePage({
  slug: "changelog",
  label: "Changelog (page)",
  fields: {
    eyebrow: { label: "Surtitre", default: "Journal des versions" },
    title: { label: "Titre", default: "Ce qui *évolue*, version après version." },
    intro: { label: "Texte ({n} = nombre de versions)", default: "L’historique de Krealabs depuis sa création, le 1er janvier 2025 : lancements, migrations techniques, livraisons et évolutions du site. {n} versions.", long: true },
    ...ctaFields("Une *suggestion* ?", {"text": "Vous avez une idée d'amélioration ou une demande spécifique ? Nous sommes à l'écoute.", "primary": "Nous écrire"}),
  },
});
