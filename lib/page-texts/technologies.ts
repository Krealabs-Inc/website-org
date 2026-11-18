import { ctaFields, definePage } from "./define";

export const TECHNOLOGIES = definePage({
  slug: "technologies",
  label: "Technologies (index)",
  fields: {
    eyebrow: { label: "Hero · surtitre", default: "Stack technique" },
    title: { label: "Hero · titre", default: "Les *outils* sur lesquels\nnous misons.", long: true },
    intro: { label: "Hero · texte", default: "WordPress reste notre spécialité (et la majorité des projets que nous livrons), mais on s’adapte : Next.js, React Native, TypeScript, Python, Node.js - on choisit la techno selon le projet, pas selon une chapelle.", long: true },
    cta: { label: "Hero · bouton", default: "Démarrer un projet" },
    mapHint: { label: "Carte · consigne", default: "Survolez un outil pour voir avec quoi il travaille." },
    tools: { label: "Outils (une ligne chacun ; adresse = page li\u00e9e)", list: { name: { label: "Nom" }, kind: { label: "Cat\u00e9gorie" }, description: { label: "Texte", long: true }, href: { label: "Adresse" } }, default: [{"name": "WordPress", "kind": "CMS · Spécialité", "description": "Notre spécialité historique. Sites sur mesure (thèmes custom, ACF Pro, pas de page builders), WooCommerce, refonte, SEO, maintenance. La majorité de nos clients sont sur WordPress.", "href": "/services/wordpress"}, {"name": "Next.js", "kind": "Framework React", "description": "Le framework React de production. Server Components, App Router, optimisations automatiques. Notre stack moderne pour les projets qui demandent plus que WordPress.", "href": "/technologies/nextjs"}, {"name": "React", "kind": "Bibliothèque UI", "description": "L'écosystème le plus mature pour construire des interfaces utilisateur. Une seule philosophie composant, deux plateformes (web et mobile).", "href": "/technologies/react"}, {"name": "React Native", "kind": "Mobile cross-platform", "description": "Apps natives iOS et Android avec une seule base de code. Performance proche du natif, expérience utilisateur fidèle, time-to-market réduit.", "href": "/technologies/react-native"}, {"name": "TypeScript", "kind": "Langage typé", "description": "Le typage statique au-dessus de JavaScript. Moins de bugs en production, refactoring serein, autocomplétion partout, documentation vivante.", "href": "/technologies/typescript"}] },
    ...ctaFields("Une stack à *concevoir* ?", {"text": "Si vous hésitez entre plusieurs technologies pour votre projet, nous pouvons vous accompagner sur le choix.", "primary": "Demander conseil"}),
  },
});
