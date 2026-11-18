import { ctaFields, definePage } from "./define";

export const FAQ_PAGE = definePage({
  slug: "faq",
  label: "FAQ (page)",
  fields: {
    eyebrow: { label: "Surtitre", default: "Questions fréquentes" },
    title: { label: "Titre", default: "Votre question a sûrement *sa réponse*." },
    ...ctaFields("Une autre *question* ?", {"text": "Vous ne trouvez pas votre réponse ? Écrivez-nous directement, nous revenons vers vous sous 24h.", "primary": "Poser ma question"}),
  },
});
