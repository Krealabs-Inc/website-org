import { Metadata } from "next";
import {
  ShieldCheck,
  Bot,
  GitMerge,
  BookOpenText,
  Wrench,
  TrendingUp,
  Building2,
  Database,
  Layers,
} from "lucide-react";

import { TechPage } from "@/components/tech/tech-page";
import { TypeScriptDemo } from "@/components/tech/demos";

export const metadata: Metadata = {
  title: "TypeScript à Rouen - Langage typé pour code maintenable",
  description:
    "Expertise TypeScript à Rouen. Typage strict, refactoring serein, autocomplétion partout. La fondation de tous nos projets web et mobile.",
  alternates: { canonical: "https://krealabs.fr/technologies/typescript" },
};


const FEATURES = [
  { icon: ShieldCheck, title: "Typage strict", description: "Les erreurs sont attrapées à la compilation, pas en production." },
  { icon: Bot, title: "Autocomplétion partout", description: "VS Code devient un copilote - pas besoin de relire la doc." },
  { icon: GitMerge, title: "Refactoring serein", description: "Renommer une variable propage les changements partout, sans casse." },
  { icon: BookOpenText, title: "Documentation vivante", description: "Les types sont la documentation. Toujours à jour, jamais fausse." },
  { icon: Wrench, title: "Outillage mature", description: "TypeScript Language Server, Prettier, ESLint. Tout marche ensemble." },
  { icon: TrendingUp, title: "Scalable", description: "Plus l'app grossit, plus TypeScript devient indispensable. Bonne dette." },
];

const USE_CASES = [
  { icon: Building2, title: "Applications complexes", description: "SaaS multi-tenant, plateformes B2B, outils métier exigeants." },
  { icon: Layers, title: "API & contrats", description: "Partager les types entre backend et frontend. Zéro erreur d'intégration." },
  { icon: Database, title: "Bases de données typées", description: "Prisma + TypeScript : votre schéma DB devient des types automatiques." },
];

export default function TypescriptPage() {
  return (
    <TechPage
      number="04"
      kind="Technologie · Langage"
      title={<>
            <em>TypeScript</em> : du code
            <br />
            qui se laisse refactorer.
          </>}
      description="Le typage statique au-dessus de JavaScript. Moins de bugs en production, refactoring serein, autocomplétion partout. La fondation de tous nos projets Krealabs."
      demo={<TypeScriptDemo />}
      whyTitle={<>
            Six bénéfices <em>concrets</em>.
          </>}
      reasons={FEATURES.map(({ title, description }) => ({ title, description }))}
      uses={USE_CASES.map(({ title, description }) => ({ title, description }))}
      ctaTitle={<>
            Un projet <em>TypeScript</em> à démarrer ?
          </>}
    />
  );
}
