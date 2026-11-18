import { definePage } from "./define";

export const RECRUITMENT = definePage({
  slug: "recrutement",
  label: "Recrutement",
  fields: {
    eyebrow: { label: "Hero · surtitre", default: "Recrutement · Rouen" },
    title: { label: "Hero · titre", default: "Aucun poste ouvert, *pour le moment*." },
    intro: { label: "Hero · texte", default: "L’équipe est au complet aujourd’hui. Si vous développez, designez ou démarrez dans le web et que notre façon de travailler vous parle, écrivez-nous quand même : votre message sera lu.", long: true },
    cta: { label: "Hero · bouton principal", default: "Envoyer ma candidature spontanée" },
    secondary: { label: "Hero · bouton secondaire", default: "Voir avec qui vous travailleriez" },
    pointsIntro: { label: "Points · phrase d’introduction", default: "Le jour où un poste s’ouvrira, vous trouverez ici :" },
    points: { label: "Ce que vous trouverez", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "Vous parlez aux clients", "description": "Pas de chef de projet entre vous et les personnes pour qui vous construisez. Vous comprenez le besoin à la source."}, {"title": "Vous ne faites pas deux fois le même site", "description": "Sites WordPress, applications Next.js, apps mobiles React Native : chaque projet part du besoin du client, pas d’un modèle."}, {"title": "Vous livrez en production", "description": "Votre travail est mis en ligne, utilisé et maintenu. Le code est propre, documenté et remis au client."}] },
    applyEyebrow: { label: "Candidature · surtitre", default: "Candidature spontanée" },
    applyTitle: { label: "Candidature · titre", default: "Vous voulez *vous présenter* quand même ?" },
    applyText1: { label: "Candidature · texte (1)", default: "Écrivez à [contact@krealabs.fr](mailto:contact@krealabs.fr?subject=Candidature%20spontan%C3%A9e) avec quelques lignes sur vous, ce que vous aimez construire et un lien vers votre travail : portfolio, GitHub, site ou projet personnel. Inutile de soigner une lettre de motivation, un projet concret vous présente mieux.", long: true },
    applyText2: { label: "Candidature · texte (2)", default: "Vous êtes une entreprise et vous cherchez plutôt à faire avancer votre projet ? [Parlez-nous de votre besoin](/contact).", long: true },
  },
});
