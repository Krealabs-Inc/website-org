import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "Changelog — Journal des versions",
  description:
    "Journal des évolutions du site et des outils Krealabs. Versions majeures, nouveautés et corrections au fil du temps.",
  alternates: { canonical: "https://krealabs.fr/changelog" },
};

type EntryType = "major" | "feature" | "fix";

interface Entry {
  version: string;
  date: string;
  type: EntryType;
  items: string[];
  highlights?: string[];
}

const CHANGELOG: Entry[] = [
  {
    version: "3.0.0",
    date: "Mai 2026",
    type: "major",
    highlights: ["Refonte totale du site", "Nouveau design system v2"],
    items: [
      "Refonte complète du frontend autour d'un design system unifié",
      "Migration vers Geist + Instrument Serif comme typographies signatures",
      "Suppression du système de paiement Stripe au profit d'un formulaire de contact",
      "Optimisation SEO local Rouen et Normandie",
      "Performance Core Web Vitals optimisées",
    ],
  },
  {
    version: "2.3.0",
    date: "29 novembre 2024",
    type: "feature",
    highlights: ["Expérience utilisateur refondue", "Performance +30% sur mobile"],
    items: [
      "Système de blog avec articles détaillés et tags",
      "Page 404 personnalisée",
      "Formulaire de contact avec upload de fichiers",
      "API d'envoi d'emails",
      "Templates d'emails HTML personnalisés",
    ],
  },
  {
    version: "2.2.0",
    date: "20 novembre 2024",
    type: "feature",
    highlights: ["Interface plus moderne", "Chargement réduit de 45%"],
    items: [
      "Navigation améliorée avec scroll smooth",
      "Animations Framer Motion fluides",
      "Composants UI réutilisables Radix",
      "Theme toggle avec persistance localStorage",
      "Optimisation des images Next.js Image",
    ],
  },
  {
    version: "2.0.0",
    date: "20 octobre 2024",
    type: "major",
    highlights: ["Architecture refondue", "Performance et SEO optimisés"],
    items: [
      "Migration complète vers Next.js 15 avec App Router",
      "Nouveau système de cache pour des performances optimales",
      "Architecture serverless pour une scalabilité infinie",
      "API REST complète",
      "Build via Turbopack",
      "Support des Server Components",
    ],
  },
  {
    version: "1.9.0",
    date: "5 octobre 2024",
    type: "feature",
    items: [
      "Module de gestion des utilisateurs avec rôles",
      "Authentification OAuth (Google, GitHub)",
      "Notifications push temps réel",
      "Export des données en CSV/PDF/Excel",
      "Historique des actions utilisateur",
    ],
  },
  {
    version: "1.8.0",
    date: "10 septembre 2024",
    type: "feature",
    highlights: ["SEO optimisé"],
    items: [
      "Interface d'administration redesignée",
      "Système de recherche avec filtres avancés",
      "Intégration Google Analytics 4",
      "Optimisation SEO avec schema.org",
      "Sitemap XML automatique",
    ],
  },
];

const typeMeta: Record<EntryType, { label: string; variant: "default" | "secondary" | "success" }> = {
  major: { label: "Version majeure", variant: "default" },
  feature: { label: "Nouveauté", variant: "secondary" },
  fix: { label: "Correction", variant: "success" },
};

export default function ChangelogPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow dot className="mb-8">Journal des versions</Eyebrow>
            <h1 className="text-display">
              Ce qui <em>évolue</em>,
              <br />
              ce qui s'améliore.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Notes de version de l'agence et de nos outils. Nous publions ici
              chaque évolution significative.
            </p>
          </div>
        </Container>
      </section>

      {/* ENTRIES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <ol className="relative space-y-12">
            <div
              aria-hidden
              className="absolute left-[0.625rem] top-3 bottom-3 w-px bg-[var(--border)]"
            />
            {CHANGELOG.map((entry) => {
              const meta = typeMeta[entry.type];
              return (
                <li key={entry.version} className="relative pl-10">
                  <span
                    className="absolute left-0 top-2 size-5 rounded-full bg-[var(--background)] border border-[var(--border-strong)] flex items-center justify-center"
                  >
                    <span className="size-2 rounded-full bg-[var(--accent)]" />
                  </span>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="text-h3">
                      v{entry.version}
                    </h2>
                    <span className="text-caption">{entry.date}</span>
                    <Badge variant={meta.variant}>{meta.label}</Badge>
                  </div>

                  {entry.highlights && entry.highlights.length > 0 && (
                    <div className="mb-4 p-4 rounded-[var(--radius)] border border-[var(--accent-subtle)] bg-[var(--accent-subtle)]/30">
                      <ul className="space-y-1">
                        {entry.highlights.map((h, i) => (
                          <li key={i} className="text-body-sm font-medium text-[var(--accent)]">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <ul className="space-y-2">
                    {entry.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-body-sm text-[var(--muted-foreground)]">
                        <span className="mt-2 size-1 rounded-full bg-[var(--subtle-foreground)] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Une <em>suggestion</em> ?
          </>
        }
        description="Vous avez une idée d'amélioration ou une demande spécifique ? Nous sommes à l'écoute."
        primaryLabel="Nous écrire"
      />
    </main>
  );
}
