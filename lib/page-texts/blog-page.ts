import { ctaFields, definePage } from "./define";

export const BLOG_PAGE = definePage({
  slug: "blog",
  label: "Blog (page)",
  fields: {
    mastLeft: { label: "En-tête · gauche", default: "Krealabs · Rouen" },
    title: { label: "Titre", default: "Le Journal" },
    intro: { label: "Texte", default: "Articles techniques, retours d’expérience et veille sur les outils que nous utilisons chaque jour, pour vous aider à décider en connaissance de cause.", long: true },
    empty: { label: "Rubrique vide", default: "Aucun article dans cette rubrique pour l’instant." },
    ...ctaFields("Une question *technique* ?", {"text": "Au-delà des articles, nous sommes disponibles pour répondre à vos questions sur vos projets web et mobile.", "primary": "Nous contacter"}),
  },
});
