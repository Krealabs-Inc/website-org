import { Metadata } from "next";
import {
  Component,
  Workflow,
  Boxes,
  Recycle,
  TestTube2,
  Sparkles,
  Building2,
  LayoutDashboard,
  AppWindow,
} from "lucide-react";

import { TechPage } from "@/components/tech/tech-page";
import { ReactDemo } from "@/components/tech/demos";

export const metadata: Metadata = {
  title: "React à Rouen - Bibliothèque UI moderne",
  description:
    "Développement React à Rouen. Composants réutilisables, écosystème mature, standard de l'industrie. Base de nos applications web et mobiles.",
  alternates: { canonical: "https://krealabs.fr/technologies/react" },
};


const FEATURES = [
  { icon: Component, title: "Composants réutilisables", description: "Une logique d'UI claire, modulaire, testable." },
  { icon: Workflow, title: "Écosystème immense", description: "Des milliers de bibliothèques matures pour tout faire." },
  { icon: Boxes, title: "Standard de l'industrie", description: "Adopté par Meta, Netflix, Airbnb, Shopify. Compétences disponibles." },
  { icon: Recycle, title: "Web + mobile", description: "Même paradigme pour React et React Native. Une seule philosophie." },
  { icon: TestTube2, title: "Testable nativement", description: "Outils de test matures : Vitest, Playwright, React Testing Library." },
  { icon: Sparkles, title: "Hooks modernes", description: "useState, useEffect, hooks customisés. Logique partageable, code clair." },
];

const USE_CASES = [
  { icon: AppWindow, title: "Single Page Applications", description: "Apps web complexes avec navigation côté client fluide." },
  { icon: LayoutDashboard, title: "Tableaux de bord", description: "Interfaces riches en données avec graphiques temps réel." },
  { icon: Building2, title: "Outils internes", description: "Back-offices, CRM, ERP custom, outils métier sur mesure." },
];

export default function ReactPage() {
  return (
    <TechPage
      number="02"
      kind="Technologie · UI"
      title={<>
            <em>React</em> : la bibliothèque
            <br />
            qui a tout changé.
          </>}
      description="L’écosystème UI le plus mature de l’industrie. Composants réutilisables, philosophie déclarative, communauté immense. La base de toutes nos applications web et mobiles."
      demo={<ReactDemo />}
      whyTitle={<>
            Six fondations <em>solides</em>.
          </>}
      reasons={FEATURES.map(({ title, description }) => ({ title, description }))}
      uses={USE_CASES.map(({ title, description }) => ({ title, description }))}
      ctaTitle={<>
            Une app <em>React</em> à construire ?
          </>}
    />
  );
}
