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

export const metadata: Metadata = {
  title: "React à Rouen — Bibliothèque UI moderne",
  description:
    "Développement React à Rouen. Composants réutilisables, écosystème mature, standard de l'industrie. Base de nos applications web et mobiles.",
  alternates: { canonical: "https://krealabs.fr/technologies/react" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";

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
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceHero
        number="02"
        eyebrow="Technologie · UI"
        title={
          <>
            <em>React</em> : la bibliothèque
            <br />
            qui a tout changé.
          </>
        }
        description="L'écosystème UI le plus mature de l'industrie. Composants réutilisables, philosophie déclarative, communauté immense. La base de toutes nos applications web et mobiles."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Pourquoi React"
        title={
          <>
            Six fondations <em>solides</em>.
          </>
        }
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">Cas d'usage</Eyebrow>
            <h2 className="text-h1">
              Là où React <em>excelle</em>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {USE_CASES.map((u) => {
              const Icon = u.icon;
              return (
                <div key={u.title} className="bg-[var(--background)] p-8">
                  <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-6">
                    <Icon className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-h4 mb-2">{u.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)]">{u.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Une app <em>React</em> à construire ?
          </>
        }
      />
    </main>
  );
}
