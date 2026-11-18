import { ctaFields, definePage } from "./define";

export const TECH_REACT = definePage({
  slug: "tech-react",
  label: "Technologie · React",
  fields: {
    kind: { label: "Hero · surtitre", default: "Technologie · UI" },
    title: { label: "Hero · titre", default: "*React* : la bibliothèque\nqui a tout changé.", long: true },
    description: { label: "Hero · texte", default: "L’écosystème UI le plus mature de l’industrie. Composants réutilisables, philosophie déclarative, communauté immense. La base de toutes nos applications web et mobiles.", long: true },
    heroCta: { label: "Hero · bouton", default: "Parler de mon projet" },
    whyEyebrow: { label: "Raisons · surtitre", default: "Pourquoi" },
    whyTitle: { label: "Raisons · titre", default: "Six fondations *solides*." },
    reasons: { label: "Raisons", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "Composants réutilisables", "description": "Une logique d'UI claire, modulaire, testable."}, {"title": "Écosystème immense", "description": "Des milliers de bibliothèques matures pour tout faire."}, {"title": "Standard de l'industrie", "description": "Adopté par Meta, Netflix, Airbnb, Shopify. Compétences disponibles."}, {"title": "Web + mobile", "description": "Même paradigme pour React et React Native. Une seule philosophie."}, {"title": "Testable nativement", "description": "Outils de test matures : Vitest, Playwright, React Testing Library."}, {"title": "Hooks modernes", "description": "useState, useEffect, hooks customisés. Logique partageable, code clair."}] },
    usesEyebrow: { label: "Cas d’usage · surtitre", default: "Cas d’usage" },
    uses: { label: "Cas d’usage", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "Single Page Applications", "description": "Apps web complexes avec navigation côté client fluide."}, {"title": "Tableaux de bord", "description": "Interfaces riches en données avec graphiques temps réel."}, {"title": "Outils internes", "description": "Back-offices, CRM, ERP custom, outils métier sur mesure."}] },
    ...ctaFields("Une app *React* à construire ?"),
  },
});
