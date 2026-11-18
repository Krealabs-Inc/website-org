import { ctaFields, definePage } from "./define";

export const SERVICES_INDEX = definePage({
  slug: "services",
  label: "Services (index)",
  fields: {
    eyebrow: { label: "Surtitre", default: "Services · Agence web Rouen" },
    title: { label: "Titre", default: "De quoi avez-vous *besoin* ?" },
    intro: { label: "Texte d’introduction", long: true, default: "Un seul interlocuteur du devis à la mise en ligne : les personnes que vous rencontrez construisent votre projet." },
    services: {
      label: "Les cinq besoins",
      list: { eyebrow: { label: "Surtitre" }, title: { label: "Titre" }, description: { label: "Texte", long: true }, href: { label: "Lien (adresse)" } },
      default: [
        { eyebrow: "Site WordPress", title: "Vous gérez votre site vous-même", description: "Un site conçu pour votre activité, une boutique WooCommerce, une refonte qui garde votre place dans Google, puis la maintenance pour que vous n'y pensiez plus. Notre métier historique : thèmes sur mesure, sans page builder.", href: "/services/wordpress" },
        { eyebrow: "Sites & outils sur mesure", title: "Vos process tournent sans tableurs", description: "Espace client, outil métier, plateforme SaaS : un outil construit autour de votre façon de travailler, qui supprime la ressaisie. Next.js, React, Python, Node.js : la technologie s'adapte à votre besoin.", href: "/services/developpement-web" },
        { eyebrow: "Applications mobiles · iOS & Android", title: "Vos clients vous ont dans leur poche", description: "Une application sur iOS et Android pour le budget d'une seule : une base de code React Native, deux App Stores, une expérience native.", href: "/services/applications-mobile" },
        { eyebrow: "Design UI/UX", title: "Vos visiteurs passent à l'action", description: "Des écrans clairs et des parcours évidents : vos visiteurs trouvent ce qu'ils cherchent et vous contactent. Maquettes Figma, design system, accessibilité.", href: "/services/design-uiux" },
        { eyebrow: "Performance & SEO", title: "Vos clients vous trouvent sur Google", description: "Vous apparaissez quand vos clients cherchent votre métier à Rouen, et votre site s'affiche instantanément. Audit Core Web Vitals, SEO local et technique.", href: "/services/performance-seo" },
      ],
    },
    commitments: {
      label: "Engagements",
      list: { label: { label: "Étiquette" }, title: { label: "Titre" }, description: { label: "Texte", long: true } },
      default: [
        { label: "Transparence", title: "Le code vous appartient", description: "Vous avez accès au dépôt Git dès le premier jour. Aucune dépendance envers nous." },
        { label: "Proximité", title: "Vous parlez à ceux qui codent", description: "À Rouen et joignables directement, sans chef de projet intermédiaire." },
        { label: "Pérennité", title: "Un site qui dure", description: "Code maintenable, documentation à jour et formation de votre équipe si besoin." },
      ],
    },
    ...ctaFields("Une idée ? *Parlons-en.*"),
  },
});
