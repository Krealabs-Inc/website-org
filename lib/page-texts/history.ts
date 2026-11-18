import { ctaFields, definePage } from "./define";

export const HISTORY = definePage({
  slug: "notre-histoire",
  label: "Notre histoire",
  fields: {
    eyebrow: { label: "Hero · surtitre", default: "Notre histoire" },
    title: { label: "Hero · titre", default: "Une agence *artisanale*, ancrée en Normandie." },
    intro: { label: "Hero · texte", default: "Depuis 2020, nous construisons des sites web, applications mobiles et logiciels sur mesure pour les entreprises de Rouen et de toute la Normandie. Pas de promesses creuses, juste du travail propre.", long: true },
    cta: { label: "Hero · bouton", default: "Parler de mon projet" },
    timelineEyebrow: { label: "Parcours · surtitre", default: "Parcours" },
    timelineTitle: { label: "Parcours · titre", default: "Six années de *construction*." },
    timeline: { label: "Parcours (une ann\u00e9e par chapitre)", list: { year: { label: "Ann\u00e9e" }, title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"year": "2020", "title": "Création de Krealabs", "description": "Lancement de l'agence à Rouen avec une idée simple : faire du web qui dure, sans intermédiaires."}, {"year": "2021", "title": "Premières applications mobiles", "description": "Spécialisation React Native, premières apps publiées sur l'App Store et le Play Store."}, {"year": "2022", "title": "Premiers SaaS B2B", "description": "Structuration de l'agence, premiers projets SaaS d'envergure pour des PME normandes. Stack Next.js + Postgres adoptée pour les apps custom."}, {"year": "2024", "title": "Ancrage régional", "description": "Spécialisation SEO local Normandie, accompagnement long terme des PME rouennaises."}, {"year": "2025", "title": "Migration stack moderne", "description": "Adoption de Next.js 16 + React 19 + Server Components sur tous les nouveaux projets. Premières apps publiées sur l'App Store + Play Store en parallèle."}, {"year": "2026", "title": "Refonte du site Krealabs", "description": "Refonte totale de notre propre site : design system v2, blog enrichi, pages locales (Rouen, Le Havre, Caen, Évreux, Dieppe…), lexique technique, comparateurs, calculateur de devis. La vitrine reflète enfin la rigueur des projets clients."}] },
    valuesEyebrow: { label: "Valeurs · surtitre", default: "Ce qui nous guide" },
    values: { label: "Valeurs (manifeste)", list: { label: { label: "\u00c9tiquette" }, title: { label: "Phrase" }, description: { label: "Texte", long: true } }, default: [{"label": "Transparence", "title": "Code source partagé", "description": "Vous avez accès au dépôt Git dès le jour 1. Pas de dépendance technique, pas de rétention."}, {"label": "Artisanat", "title": "Pas de copy-paste", "description": "Chaque projet est conçu pour son contexte. Thèmes WordPress custom, applications Next.js sur mesure - pas de template recyclé, pas de page builder bloated."}, {"label": "Pérennité", "title": "Penser long terme", "description": "Code maintenable, documentation à jour, formation incluse. On construit pour 5 ans, pas 6 mois."}, {"label": "Proximité", "title": "Un contact accessible", "description": "Basé à Rouen, joignable directement. Vous parlez à celui qui code - pas à un chef de projet."}] },
    teamLine: { label: "Équipe · phrase (le nombre d’associés est ajouté devant)", default: "associés, et c’est *voulu*." },
    teamLink: { label: "Équipe · lien", default: "Rencontrer l’équipe" },
    ...ctaFields("On *construit* ensemble ?"),
  },
});
