import { definePage } from "./define";

export const CONTACT = definePage({
  slug: "contact",
  label: "Contact",
  fields: {
    eyebrow: { label: "Surtitre", default: "Votre devis gratuit" },
    title: { label: "Titre", default: "Un premier retour *concret*, sous 24h." },
    intro: { label: "Texte", default: "Quelques questions, une à la fois. Deux minutes suffisent.", long: true },
    directLabel: { label: "Colonne · titre des coordonnées", default: "Ou directement" },
    nextLabel: { label: "Colonne · titre des étapes", default: "Ensuite" },
    next: { label: "Ce qui se passe ensuite", list: { title: { label: "Titre" }, text: { label: "Texte", long: true } }, default: [{"title": "Premier retour sous 24h ouvrées", "text": "Un avis honnête sur la faisabilité, y compris si nous ne sommes pas la bonne équipe pour vous."}, {"title": "Rendez-vous de cadrage offert", "text": "30 à 45 minutes, en visio ou à Rouen. Vous repartez avec un besoin clarifié et une idée du planning."}, {"title": "Devis détaillé à prix fixe", "text": "Sous 5 jours ouvrés : périmètre, livrables, jalons, prix engageant."}] },
    studioLabel: { label: "Maquette en ligne · surtitre", default: "Pas encore prêt à en parler ?" },
    studioTitle: { label: "Maquette en ligne · titre", default: "Voyez d’abord votre site en maquette" },
    studioText: { label: "Maquette en ligne · texte", long: true, default: "Avec KreaStudio, décrivez votre projet et recevez une première maquette en quelques minutes. Gratuit, sans rendez-vous." },
    promises: { label: "Engagements (pastilles)", list: { label: { label: "Texte" } }, default: [{"label": "Sans engagement"}, {"label": "NDA sur demande"}, {"label": "Données utilisées uniquement pour vous répondre"}] },
  },
});
