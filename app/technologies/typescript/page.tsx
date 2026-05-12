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

export const metadata: Metadata = {
  title: "TypeScript à Rouen — Langage typé pour code maintenable",
  description:
    "Expertise TypeScript à Rouen. Typage strict, refactoring serein, autocomplétion partout. La fondation de tous nos projets web et mobile.",
  alternates: { canonical: "https://krealabs.fr/technologies/typescript" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";

const FEATURES = [
  { icon: ShieldCheck, title: "Typage strict", description: "Les erreurs sont attrapées à la compilation, pas en production." },
  { icon: Bot, title: "Autocomplétion partout", description: "VS Code devient un copilote — pas besoin de relire la doc." },
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
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceHero
        number="04"
        eyebrow="Technologie · Langage"
        title={
          <>
            <em>TypeScript</em> : du code
            <br />
            qui se laisse refactorer.
          </>
        }
        description="Le typage statique au-dessus de JavaScript. Moins de bugs en production, refactoring serein, autocomplétion partout. La fondation de tous nos projets Krealabs."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Pourquoi TypeScript"
        title={
          <>
            Six bénéfices <em>concrets</em>.
          </>
        }
        features={FEATURES}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">Cas d'usage</Eyebrow>
            <h2 className="text-h1">
              Là où TypeScript <em>brille</em>.
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
            Un projet <em>TypeScript</em> à démarrer ?
          </>
        }
      />
    </main>
  );
}
