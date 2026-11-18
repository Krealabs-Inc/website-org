import { ctaFields, definePage } from "./define";

export const COMPARATOR = definePage({
  slug: "comparateur",
  label: "Comparateur (page)",
  fields: {
    eyebrow: { label: "Surtitre", default: "Comparateurs · Choix techniques" },
    title: { label: "Titre", default: "Comparer *deux stacks*,\nchoisir la bonne.", long: true },
    intro: { label: "Texte", default: "Les questions qu'on nous pose en boucle : WordPress ou Webflow ? Next.js ou WordPress ? React Native ou Flutter ? On a écrit des comparatifs détaillés pour cadrer ces choix techniques honnêtement, du point de vue d'une agence web normande.", long: true },
    ...ctaFields("Besoin d'*aide* pour choisir ?", {"text": "Premier échange offert pour cadrer la bonne stack selon votre projet, votre équipe et votre budget.", "primary": "Prendre rendez-vous"}),
  },
});
