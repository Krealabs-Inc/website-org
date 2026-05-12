import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  ShieldCheck,
  Cloud,
  GitBranch,
  Workflow,
  TestTube2,
  Layers,
  Rocket,
  Lock,
  Microscope,
  Boxes,
  Cpu,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "Expertise — Savoir-faire & technologies",
  description:
    "Méthodes, savoir-faire et stack technique de l'agence Krealabs à Rouen. Architecture, sécurité, performance, CI/CD, accessibilité — l'ensemble de nos compétences pour réussir vos projets web et mobile.",
  keywords: [
    "expertise développement web rouen",
    "savoir-faire agence digitale",
    "compétences techniques rouen",
    "stack technique normandie",
    "agence next.js expertise",
  ],
  alternates: { canonical: "https://krealabs.fr/expertise" },
};

export default function ExpertisePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <div
          aria-hidden
          className="absolute -top-32 right-1/4 size-[640px] rounded-full blur-[120px] opacity-15"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />

        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Notre expertise</Eyebrow>
            <h1 className="text-display">
              Savoir-faire <em>technique</em>,
              <br />
              rigueur d'<em>artisan</em>.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Architecture, performance, sécurité, accessibilité — les
              compétences que nous mobilisons sur chaque projet pour livrer du
              code propre, maintenable, et qui dure dans le temps.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Discuter d'un projet
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/equipe">Découvrir l'équipe</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SAVOIR-FAIRE — 6 COMPÉTENCES PHARES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Eyebrow number="01" className="mb-6">Savoir-faire</Eyebrow>
              <h2 className="text-h1">
                Six <em>compétences</em> structurantes.
              </h2>
            </div>
            <p className="text-body text-[var(--muted-foreground)] max-w-md">
              Au-delà du code, ce qui fait la différence sur un projet long
              terme : la manière d'aborder l'architecture, la sécurité et
              l'évolutivité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {COMPETENCES.map((c) => {
              const Icon = c.icon;
              return (
                <article key={c.title} className="bg-[var(--background)] p-8">
                  <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-6">
                    <Icon className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-h4 mb-2">{c.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)] mb-5">
                    {c.description}
                  </p>
                  <ul className="space-y-1.5">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-body-sm">
                        <span className="mt-2 size-1 rounded-full bg-[var(--accent)] shrink-0" />
                        <span className="text-[var(--muted-foreground)]">{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* STACK TECHNIQUE DÉTAILLÉE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">Stack technique</Eyebrow>
            <h2 className="text-h1">
              Les <em>outils</em> que nous maîtrisons.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">
              Une stack moderne, typée, testée. Nous nous tenons à jour avec les
              dernières versions tout en privilégiant la stabilité pour vos
              projets en production.
            </p>
          </div>

          <div className="space-y-12">
            {STACK_CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <div className="flex items-baseline gap-4 mb-6">
                  <h3 className="text-h3">{cat.title}</h3>
                  <span className="text-caption">{cat.items.length} outils</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]"
                    >
                      <p className="text-caption mb-1.5">{item.kind}</p>
                      <p className="text-body font-semibold">{item.name}</p>
                      <p className="text-body-sm text-[var(--muted-foreground)] mt-1">
                        {item.tagline}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* MÉTHODOLOGIE */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30" aria-hidden />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="03" className="mb-6">Méthodologie</Eyebrow>
              <h2 className="text-h1 mb-6">
                Comment nous <em>travaillons</em>.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Quatre principes structurent notre façon de travailler sur
                chaque projet, du devis à la maintenance.
              </p>
            </div>

            <ol className="lg:col-span-7 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {METHODE.map((m, i) => (
                <li key={m.title} className="bg-[var(--background)] p-8 grid grid-cols-[auto_1fr] gap-8 items-start">
                  <span className="text-eyebrow text-[var(--accent)] pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h3 mb-2">{m.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)]">
                      {m.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* CERTIFICATIONS / STANDARDS */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow className="mb-6 justify-center">Standards & conformité</Eyebrow>
            <h2 className="text-h1">
              Conformes aux <em>exigences</em> du métier.
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {STANDARDS.map((s) => (
              <Badge key={s} variant="outline" className="px-4 py-2 text-body-sm">
                {s}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Discutons de votre <em>projet</em>.
          </>
        }
        description="Quelque soit le projet — site, app mobile, logiciel — la première étape est toujours un échange pour comprendre votre contexte."
        primaryLabel="Démarrer la conversation"
      />
    </main>
  );
}

const COMPETENCES = [
  {
    icon: Layers,
    title: "Architecture",
    description: "Concevoir des systèmes qui restent simples à mesure qu'ils grossissent.",
    points: ["Découpage en modules", "API typées", "Migrations progressives"],
  },
  {
    icon: ShieldCheck,
    title: "Sécurité",
    description: "Pratiques OWASP, authentification robuste, gestion des secrets.",
    points: ["OWASP Top 10", "JWT, OAuth 2", "Audits réguliers"],
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Core Web Vitals optimisés, code splitting, cache intelligent.",
    points: ["LCP < 2s", "Bundle analysis", "Edge caching"],
  },
  {
    icon: TestTube2,
    title: "Tests & qualité",
    description: "Tests unitaires, e2e, CI/CD. Le code livré est du code testé.",
    points: ["Vitest, Playwright", "Couverture mesurée", "Tests en CI"],
  },
  {
    icon: GitBranch,
    title: "CI/CD & DevOps",
    description: "Déploiements automatisés, environnements de preview, rollback simple.",
    points: ["GitHub Actions", "Preview branches", "Zero-downtime deploy"],
  },
  {
    icon: Microscope,
    title: "Observabilité",
    description: "Monitoring temps réel, alertes, dashboards. On voit les problèmes avant vos utilisateurs.",
    points: ["Sentry, Vercel Analytics", "Logs structurés", "Alertes Slack"],
  },
];

const STACK_CATEGORIES = [
  {
    title: "WordPress (notre spécialité)",
    items: [
      { kind: "CMS", name: "WordPress", tagline: "Thèmes custom, pas de page builders" },
      { kind: "E-commerce", name: "WooCommerce", tagline: "Boutiques en ligne sur mesure" },
      { kind: "Champs", name: "ACF Pro", tagline: "Champs personnalisés robustes" },
      { kind: "SEO", name: "RankMath / Yoast", tagline: "SEO WordPress avancé" },
      { kind: "Performance", name: "WP Rocket", tagline: "Cache + minify" },
      { kind: "Sécurité", name: "Wordfence", tagline: "Pare-feu + scan malwares" },
      { kind: "Headless", name: "WPGraphQL", tagline: "API GraphQL pour Next.js" },
      { kind: "Langages", name: "PHP · MySQL", tagline: "Fondations WordPress" },
    ],
  },
  {
    title: "Frontend (stack moderne)",
    items: [
      { kind: "Framework", name: "Next.js 16", tagline: "App Router, RSC" },
      { kind: "Bibliothèque", name: "React 19", tagline: "Server Components" },
      { kind: "Langage", name: "TypeScript 5", tagline: "Strict mode" },
      { kind: "Style", name: "Tailwind CSS 4", tagline: "Utility-first" },
      { kind: "Animations", name: "Framer Motion", tagline: "Animations fluides" },
      { kind: "UI primitives", name: "Radix UI", tagline: "Accessible, headless" },
      { kind: "Forms", name: "React Hook Form", tagline: "Performant, typé" },
      { kind: "Data fetching", name: "TanStack Query", tagline: "Cache + sync" },
    ],
  },
  {
    title: "Mobile",
    items: [
      { kind: "Framework", name: "React Native", tagline: "iOS & Android" },
      { kind: "Build", name: "Expo / EAS", tagline: "Build cloud, OTA" },
      { kind: "Navigation", name: "Expo Router", tagline: "File-based routing" },
      { kind: "Storage", name: "MMKV", tagline: "Stockage natif rapide" },
    ],
  },
  {
    title: "Backend & base de données",
    items: [
      { kind: "PHP", name: "Laravel / Symfony", tagline: "Pour les API & apps PHP" },
      { kind: "Python", name: "FastAPI / Django", tagline: "Quand Python est requis" },
      { kind: "Runtime", name: "Node.js / Edge", tagline: "Vercel Functions" },
      { kind: "ORM", name: "Prisma", tagline: "Typage strict DB" },
      { kind: "Base SQL", name: "PostgreSQL / MySQL", tagline: "Neon, Supabase, RDS" },
      { kind: "Auth", name: "NextAuth / Lucia", tagline: "Sessions, OAuth" },
      { kind: "Emails", name: "Resend", tagline: "Transactional emails" },
      { kind: "Paiement", name: "Stripe / WooCommerce", tagline: "Selon stack" },
    ],
  },
  {
    title: "Outils & qualité",
    items: [
      { kind: "Versioning", name: "Git + GitHub", tagline: "Reviews systématiques" },
      { kind: "CI/CD", name: "GitHub Actions", tagline: "Build, test, deploy" },
      { kind: "Tests", name: "Vitest / Playwright", tagline: "Unitaires + e2e" },
      { kind: "Monitoring", name: "Sentry", tagline: "Erreurs en production" },
      { kind: "Analytics", name: "Plausible / GA4", tagline: "Trafic & conversions" },
      { kind: "Hébergement", name: "Vercel / AWS", tagline: "Selon les besoins" },
      { kind: "Design", name: "Figma", tagline: "Design system" },
      { kind: "Documentation", name: "Notion / Linear", tagline: "Suivi projet" },
    ],
  },
];

const METHODE = [
  {
    title: "Cadrage écrit",
    description: "Chaque projet démarre par un brief écrit validé : objectifs, scope, contraintes, planning. Pas de malentendu.",
  },
  {
    title: "Itérations courtes",
    description: "Sprints d'1 à 2 semaines avec démo à chaque fin de cycle. Vous voyez l'avancement, vous orientez le produit.",
  },
  {
    title: "Code source partagé",
    description: "Accès au dépôt Git dès le jour 1. Vous êtes propriétaire de votre code, pas dépendant de nous.",
  },
  {
    title: "Documentation continue",
    description: "README à jour, schémas d'architecture, conventions documentées. Un futur développeur peut prendre la suite.",
  },
];

const STANDARDS = [
  "WCAG 2.1 AA",
  "RGPD",
  "OWASP Top 10",
  "ISO 27001 friendly",
  "Core Web Vitals",
  "Lighthouse 95+",
  "TypeScript strict",
  "ESLint + Prettier",
  "SemVer",
  "Conventional Commits",
];
