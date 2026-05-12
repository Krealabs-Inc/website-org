import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Smartphone,
  Sparkles,
  Gauge,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Background grid + radial fade */}
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 size-[640px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />

        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">
              Agence digitale · Rouen, Normandie
            </Eyebrow>

            <h1 className="text-display">
              Sites web et logiciels{" "}
              <em>sur mesure</em>,
              <br />
              conçus à <em>Rouen</em>.
            </h1>

            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Krealabs est une agence web spécialisée dans la création de sites
              performants, d'applications mobile et de logiciels métier pour les
              entreprises normandes exigeantes.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Démarrer un projet
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Voir nos services</Link>
              </Button>
            </div>

            <p className="mt-8 text-caption">
              Réponse sous 24h · Devis gratuit · Basés à Rouen, intervention en
              France
            </p>
          </div>

          {/* Stat strip */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {[
              { value: "50+", label: "Projets livrés" },
              { value: "12", label: "Mois d'autonomie" },
              { value: "< 2s", label: "Temps de chargement" },
              { value: "100%", label: "Code maison" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[var(--background)] px-6 py-8 flex flex-col gap-1"
              >
                <p className="text-h2 font-medium tracking-[-0.03em]">
                  {s.value}
                </p>
                <p className="text-caption">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <Eyebrow number="01" className="mb-6">Services</Eyebrow>
              <h2 className="text-h1">
                Ce que nous <em>construisons</em>.
              </h2>
            </div>
            <p className="text-body text-[var(--muted-foreground)] max-w-md">
              Du site vitrine à l'application métier, nous concevons et
              développons des outils digitaux qui servent vraiment votre
              activité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </Container>
      </section>

      {/* ========== APPROACH ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Une approche <em>artisanale</em>, des résultats mesurables.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Pas de chef de projet intermédiaire, pas de sous-traitance
                anonyme. Vous parlez directement aux personnes qui codent votre
                projet.
              </p>
            </div>

            <ol className="lg:col-span-7 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {STEPS.map((step, i) => (
                <li
                  key={step.title}
                  className="bg-[var(--background)] p-8 grid grid-cols-[auto_1fr] gap-8 items-start"
                >
                  <span className="text-eyebrow text-[var(--accent)] pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h3 mb-2">{step.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)]">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ========== STACK ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow number="03" className="mb-6 justify-center">
              Stack technique
            </Eyebrow>
            <h2 className="text-h1">
              Les technologies que nous <em>maîtrisons</em>.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">
              Nous travaillons exclusivement avec un écosystème moderne, typé,
              testé. Pas de WordPress legacy, pas de page builders.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {STACK.map((tech) => (
              <Link
                key={tech.name}
                href={tech.href}
                className="group p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-caption">{tech.kind}</span>
                  <ArrowUpRight className="size-4 text-[var(--subtle-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
                </div>
                <p className="text-h4 font-medium">{tech.name}</p>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-1">
                  {tech.tagline}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ========== ROUEN — SEO LOCAL ========== */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-50" aria-hidden />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <Eyebrow number="04" dot className="mb-6">Ancrage local</Eyebrow>
              <h2 className="text-h1 mb-6">
                Une agence digitale à <em>Rouen</em>, au service de la Normandie.
              </h2>
              <p className="text-body-lg text-[var(--muted-foreground)] mb-8 max-w-xl">
                Nous accompagnons les PME, startups et grandes entreprises de
                Rouen, du Havre, Caen et toute la Normandie. Proximité,
                réactivité, accompagnement long terme.
              </p>

              <div className="grid grid-cols-2 gap-4 max-w-md">
                <div className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]">
                  <p className="text-caption mb-1">Localisation</p>
                  <p className="text-h4">Rouen 76000</p>
                </div>
                <div className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]">
                  <p className="text-caption mb-1">Zone d'intervention</p>
                  <p className="text-h4">France entière</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-eyebrow">Nous trouver</p>
                  <Badge>
                    <span className="size-1.5 rounded-full bg-[var(--success)]" />
                    Disponible
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  <p className="text-body">
                    <strong className="font-medium">Krealabs</strong>
                  </p>
                  <p className="text-body-sm text-[var(--muted-foreground)]">
                    Rouen, Normandie
                  </p>
                  <p className="text-body-sm text-[var(--muted-foreground)]">
                    contact@krealabs.fr
                  </p>
                </div>
                <Button asChild className="w-full">
                  <Link href="/contact">
                    Démarrer la discussion
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Eyebrow className="mb-8 justify-center">Parlons projet</Eyebrow>
            <h2 className="text-display">
              Prêt à <em>donner vie</em> à votre idée ?
            </h2>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 mb-10">
              Décrivez-nous votre projet en quelques lignes. Nous revenons vers
              vous sous 24h ouvrées avec un premier retour concret.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Demander un devis
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Découvrir nos services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

// ============================================================
// DATA
// ============================================================

const SERVICES = [
  {
    icon: Code2,
    eyebrow: "Site & application web",
    title: "Développement web",
    description:
      "Sites vitrines, plateformes SaaS, applications métier. Architecture moderne, typage strict, performance native.",
    href: "/services/developpement-web",
  },
  {
    icon: Smartphone,
    eyebrow: "iOS & Android",
    title: "Applications mobiles",
    description:
      "Apps cross-platform en React Native. Une seule base de code, une expérience native sur les deux plateformes.",
    href: "/services/applications-mobile",
  },
  {
    icon: Sparkles,
    eyebrow: "Interfaces & design",
    title: "Design UI/UX",
    description:
      "Maquettes Figma, design system, prototypage. Interfaces accessibles, mémorables, conçues pour convertir.",
    href: "/services/design-uiux",
  },
  {
    icon: Gauge,
    eyebrow: "Vitesse & visibilité",
    title: "Performance & SEO",
    description:
      "Audit Core Web Vitals, optimisation Lighthouse, référencement local Rouen. Tout pour remonter dans Google.",
    href: "/services/performance-seo",
  },
];

interface ServiceCardProps {
  icon: typeof Code2;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}

function ServiceCard({ icon: Icon, eyebrow, title, description, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-[var(--background)] hover:bg-[var(--surface)] p-8 md:p-10 transition-colors duration-200"
    >
      <div className="flex items-start justify-between mb-12">
        <div className="size-12 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center">
          <Icon className="size-5 text-[var(--accent)]" strokeWidth={1.75} />
        </div>
        <ArrowUpRight className="size-5 text-[var(--subtle-foreground)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-eyebrow mb-3">{eyebrow}</p>
      <h3 className="text-h2 mb-3">{title}</h3>
      <p className="text-body text-[var(--muted-foreground)] max-w-md">
        {description}
      </p>
    </Link>
  );
}

const STEPS = [
  {
    title: "Cadrage",
    description:
      "Un premier appel pour comprendre votre besoin, vos contraintes et vos objectifs. Sans engagement.",
  },
  {
    title: "Conception",
    description:
      "Wireframes, design Figma, architecture technique. Vous validez avant qu'on touche au code.",
  },
  {
    title: "Développement",
    description:
      "Sprints courts, démos régulières, code source partagé dès le jour 1. Vous voyez ce qui avance.",
  },
  {
    title: "Mise en ligne & suivi",
    description:
      "Déploiement, formation, monitoring. Nous restons disponibles pour les évolutions futures.",
  },
];

const STACK = [
  {
    name: "Next.js",
    tagline: "Framework React production",
    kind: "Framework",
    href: "/technologies/nextjs",
  },
  {
    name: "React Native",
    tagline: "Apps mobiles cross-platform",
    kind: "Mobile",
    href: "/technologies/react-native",
  },
  {
    name: "TypeScript",
    tagline: "Typage strict, code fiable",
    kind: "Langage",
    href: "/technologies/typescript",
  },
  {
    name: "React",
    tagline: "Interfaces réactives",
    kind: "Bibliothèque",
    href: "/technologies/react",
  },
];
