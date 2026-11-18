import { ctaFields, definePage } from "./define";

export const TECH_NEXTJS = definePage({
  slug: "tech-nextjs",
  label: "Technologie · Next.js",
  fields: {
    kind: { label: "Hero · surtitre", default: "Technologie · Web" },
    title: { label: "Hero · titre", default: "*Next.js* : le framework\nReact de production.", long: true },
    description: { label: "Hero · texte", default: "Un socle technique pour les sites et applications qui ont besoin de fonctionnalités sur mesure. Nous l’utilisons quand le projet demande davantage qu’un site de présentation.", long: true },
    heroCta: { label: "Hero · bouton", default: "Parler de mon projet" },
    whyEyebrow: { label: "Raisons · surtitre", default: "Pourquoi" },
    whyTitle: { label: "Raisons · titre", default: "Six raisons de *miser* dessus." },
    reasons: { label: "Raisons", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "SEO natif", "description": "Rendu serveur, métadonnées dynamiques, sitemap auto. Des contenus accessibles aux moteurs de recherche."}, {"title": "Performance extrême", "description": "Code splitting, lazy loading, image optimization. Chargement des ressources adapté aux pages."}, {"title": "Déploiement simple", "description": "Vercel en un clic, ou Docker / AWS / OVH selon vos contraintes."}, {"title": "CDN global", "description": "Pages distribuées dans le monde, latence minimale partout."}, {"title": "Server Components", "description": "Logique serveur dans le composant. Moins de JS côté client."}, {"title": "App Router", "description": "Layouts imbriqués, loading states élégants, parallel routes."}] },
    usesEyebrow: { label: "Cas d’usage · surtitre", default: "Cas d’usage" },
    uses: { label: "Cas d’usage", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "Sites éditoriaux & vitrines", "description": "Sites institutionnels, blogs, magazines. Une base adaptée à une stratégie de référencement."}, {"title": "E-commerce performant", "description": "Boutiques rapides avec checkout fluide, intégrations Stripe/Mollie."}, {"title": "Plateformes SaaS", "description": "Applications full-stack avec auth, base de données et API intégrées."}] },
    ...ctaFields("Un projet *Next.js* à lancer ?"),
  },
});
