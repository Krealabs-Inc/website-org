import { ctaFields, definePage } from "./define";

export const TEAM_PAGE = definePage({
  slug: "equipe",
  label: "Équipe",
  fields: {
    title: { label: "Titre (le mur de portraits)", default: "L’équipe qui *construit* votre projet." },
    band: { label: "Chiffres \u00e0 c\u00f4t\u00e9 du titre", list: { value: { label: "Chiffre" }, label: { label: "Libell\u00e9" } }, default: [{"value": "4", "label": "associés"}, {"value": "1", "label": "seul interlocuteur"}, {"value": "2020", "label": "à Rouen"}, {"value": "100 %", "label": "du code vous appartient"}] },
    whyEyebrow: { label: "Pourquoi · surtitre", default: "Pourquoi ça compte" },
    whyTitle: { label: "Pourquoi · titre", default: "Vous parlez à *ceux qui codent.*" },
    whyText: { label: "Pourquoi · texte", default: "Pas de chaîne d’intermédiaires entre votre idée et votre site : ce que vous demandez est exactement ce qui est construit.", long: true },
    valuesEyebrow: { label: "Engagements · surtitre", default: "La même façon de travailler" },
    valuesTitle: { label: "Engagements · titre", default: "Des parcours différents.\nUne même *exigence.*", long: true },
    valuesText: { label: "Engagements · texte", default: "Quatre associés, et c’est voulu : vous gardez les mêmes interlocuteurs du premier échange à la mise en ligne, et ceux qui vous écoutent sont ceux qui construisent.", long: true },
    values: { label: "Engagements", list: { label: { label: "\u00c9tiquette" }, title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"label": "Interlocuteur unique", "title": "Un seul contact", "description": "Pas de chef de projet, pas de commercial, pas de sous-traitant. Vous appelez, nous répondons. Vous écrivez, nous lisons."}, {"label": "Polyvalence", "title": "Du design au déploiement", "description": "Nous couvrons toute la chaîne. Cela limite les frictions, accélère les itérations, et donne une cohérence forte au produit final."}, {"label": "Engagement", "title": "Vos projets, nos signatures", "description": "Chaque projet que nous livrons est signé Krealabs. Notre nom est sur la ligne - la qualité l'est aussi."}] },
    ...ctaFields("On fait *équipe ?*", {"eyebrow": "La prochaine rencontre", "text": "Un premier échange offert, en visio ou autour d’un café à Rouen. Parlons de votre idée et de ce que nous pourrions construire ensemble.", "primary": "Rencontrer le collectif", "secondary": ""}),
  },
});
