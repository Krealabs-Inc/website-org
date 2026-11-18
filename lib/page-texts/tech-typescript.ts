import { ctaFields, definePage } from "./define";

export const TECH_TYPESCRIPT = definePage({
  slug: "tech-typescript",
  label: "Technologie · TypeScript",
  fields: {
    kind: { label: "Hero · surtitre", default: "Technologie · Langage" },
    title: { label: "Hero · titre", default: "*TypeScript* : du code\nqui se laisse refactorer.", long: true },
    description: { label: "Hero · texte", default: "Le typage statique au-dessus de JavaScript. Moins de bugs en production, refactoring serein, autocomplétion partout. La fondation de tous nos projets Krealabs.", long: true },
    heroCta: { label: "Hero · bouton", default: "Parler de mon projet" },
    whyEyebrow: { label: "Raisons · surtitre", default: "Pourquoi" },
    whyTitle: { label: "Raisons · titre", default: "Six bénéfices *concrets*." },
    reasons: { label: "Raisons", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "Typage strict", "description": "Les erreurs sont attrapées à la compilation, pas en production."}, {"title": "Autocomplétion partout", "description": "VS Code devient un copilote - pas besoin de relire la doc."}, {"title": "Refactoring serein", "description": "Renommer une variable propage les changements partout, sans casse."}, {"title": "Documentation vivante", "description": "Les types sont la documentation. Toujours à jour, jamais fausse."}, {"title": "Outillage mature", "description": "TypeScript Language Server, Prettier, ESLint. Tout marche ensemble."}, {"title": "Scalable", "description": "Plus l'app grossit, plus TypeScript devient indispensable. Bonne dette."}] },
    usesEyebrow: { label: "Cas d’usage · surtitre", default: "Cas d’usage" },
    uses: { label: "Cas d’usage", list: { title: { label: "Titre" }, description: { label: "Texte", long: true } }, default: [{"title": "Applications complexes", "description": "SaaS multi-tenant, plateformes B2B, outils métier exigeants."}, {"title": "API & contrats", "description": "Partager les types entre backend et frontend. Zéro erreur d'intégration."}, {"title": "Bases de données typées", "description": "Prisma + TypeScript : votre schéma DB devient des types automatiques."}] },
    ...ctaFields("Un projet *TypeScript* à démarrer ?"),
  },
});
