import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Smartphone,
  Sparkles,
  Gauge,
  ArrowRight,
  Wrench,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { MotionReveal } from "@/components/animations/motion-reveal";
import { TextHighlighter } from "@/components/animations/text-highlighter";
import { WordRotator } from "@/components/animations/word-rotator";
import { Marquee } from "@/components/animations/marquee";
import { ShimmerButton } from "@/components/animations/shimmer-button";
import { OrganizationSchema } from "@/components/seo/organization-schema";

// Décorations différées — code-splitted, n'entrent pas dans le JS critique.
// Réservent leur emplacement DOM côté SSR; l'animation arrive après hydration.
const ParticlesBg = dynamic(
  () => import("@/components/animations/particles-bg").then((m) => m.ParticlesBg),
  { ssr: false },
);
const NumberTicker = dynamic(
  () => import("@/components/animations/number-ticker").then((m) => m.NumberTicker),
  { ssr: false, loading: () => <span>0</span> },
);
const BorderBeam = dynamic(
  () => import("@/components/animations/border-beam").then((m) => m.BorderBeam),
  { ssr: false },
);

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <OrganizationSchema />
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 size-[640px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />

        <Container className="relative">
          <MotionReveal className="max-w-4xl" direction="up">
            <Eyebrow dot className="mb-8">
              Agence digitale · Studio de développement
            </Eyebrow>

            <h1 className="text-display">
              Vos idées méritent
              <br />
              du code{" "}
              <TextHighlighter>
                <em>à leur hauteur</em>
              </TextHighlighter>
              .
            </h1>

            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Krealabs construit des sites web, des applications mobile et des
              logiciels sur mesure. Du WordPress soigné au Next.js taillé sur
              mesure — on choisit la stack en fonction de votre projet, pas
              l'inverse.
            </p>

            {/* Ligne rotative des expertises */}
            <p className="mt-6 inline-flex items-center gap-2 text-body text-[var(--muted-foreground)]">
              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              Spécialisés en{" "}
              <span className="font-semibold text-[var(--foreground)]">
                <WordRotator
                  words={["WordPress", "WooCommerce", "Next.js", "React Native", "TypeScript", "Python", "SEO local"]}
                />
              </span>
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
          </MotionReveal>

          {/* Stat strip */}
          <MotionReveal delay={0.2} direction="up" className="mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-[var(--background)] px-6 py-8 flex flex-col gap-1"
                >
                  <p className="text-h2 font-medium tracking-[-0.03em]">
                    {s.numeric != null ? (
                      <NumberTicker
                        value={s.numeric}
                        prefix={s.prefix}
                        suffix={s.suffix}
                      />
                    ) : (
                      s.staticValue
                    )}
                  </p>
                  <p className="text-caption">{s.label}</p>
                </div>
              ))}
            </div>
          </MotionReveal>
        </Container>
      </section>

      {/* ========== WORDPRESS — SPÉCIALITÉ HÉROS ========== */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <Container>
          <MotionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <Eyebrow number="01" dot className="mb-6">Spécialité · WordPress</Eyebrow>
                <h2 className="text-h1 mb-6">
                  <em>WordPress</em> à Rouen,
                  <br />
                  c'est notre métier.
                </h2>
                <p className="text-body-lg text-[var(--muted-foreground)] mb-8 max-w-xl">
                  Depuis plus de 10 ans, nous développons des sites WordPress
                  sur mesure : thèmes custom, WooCommerce, refontes, SEO,
                  maintenance, sécurité. La plupart de nos clients sont sur
                  WordPress — et ça nous va parfaitement.
                </p>
                <ul className="space-y-3 mb-10">
                  {WP_HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-body">
                      <CheckCircle2 className="size-5 text-[var(--accent)] mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link href="/services/wordpress">
                      Découvrir l'offre WordPress
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact?type=devis">Demander un devis WP</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative p-8 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
                  <BorderBeam duration={10} size={80} />
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <p className="text-eyebrow">Offre WordPress</p>
                      <Badge>Spécialité</Badge>
                    </div>
                    <div className="space-y-4">
                      {WP_OFFERS.map((o) => {
                        const Icon = o.icon;
                        return (
                          <Link
                            key={o.title}
                            href={o.href}
                            className="group flex items-start gap-4 p-3 rounded-[var(--radius)] hover:bg-[var(--background)] transition-colors"
                          >
                            <div className="size-10 shrink-0 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] flex items-center justify-center">
                              <Icon className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-body font-semibold">{o.title}</p>
                              <p className="text-body-sm text-[var(--muted-foreground)]">
                                {o.description}
                              </p>
                            </div>
                            <ArrowUpRight className="size-4 text-[var(--subtle-foreground)] group-hover:text-[var(--accent)] mt-3 shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </section>

      {/* ========== SERVICES — AUTRES ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <MotionReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl">
                <Eyebrow number="02" className="mb-6">Au-delà de WordPress</Eyebrow>
                <h2 className="text-h1">
                  Polyvalents par <em>choix</em>.
                </h2>
              </div>
              <p className="text-body text-[var(--muted-foreground)] max-w-md">
                On ne se limite pas à WordPress. Quand votre projet l'exige,
                nous concevons des applications sur mesure dans la stack la
                plus adaptée — Next.js, React Native, Python, peu importe.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {SERVICES.map((s) => (
                <ServiceCard key={s.title} {...s} />
              ))}
            </div>
          </MotionReveal>
        </Container>
      </section>

      {/* ========== APPROACH ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <MotionReveal className="lg:col-span-5">
              <Eyebrow number="03" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Une approche <em>artisanale</em>, des résultats mesurables.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Pas de chef de projet intermédiaire, pas de sous-traitance
                anonyme. Vous parlez directement aux personnes qui codent votre
                projet.
              </p>
            </MotionReveal>

            <ol className="lg:col-span-7 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {STEPS.map((step, i) => (
                <MotionReveal
                  key={step.title}
                  delay={i * 0.08}
                  direction="left"
                  distance={20}
                >
                  <li className="bg-[var(--background)] p-8 grid grid-cols-[auto_1fr] gap-8 items-start">
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
                </MotionReveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ========== STACK ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <MotionReveal>
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Eyebrow number="04" className="mb-6 justify-center">
                Stack technique
              </Eyebrow>
              <h2 className="text-h1">
                Les technologies que nous <em>maîtrisons</em>.
              </h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6">
                WordPress et son écosystème, complétés par les outils
                modernes du web et du mobile. On choisit la stack adaptée à
                votre projet, pas l'inverse.
              </p>
            </div>
          </Container>
        </MotionReveal>

        {/* Marquee infinie de la stack */}
        <div className="relative">
          <Marquee duration={40} className="py-6 border-y border-[var(--border)] bg-[var(--surface)]/50">
            {STACK_TAGS.map((tag) => (
              <span
                key={tag}
                className="text-h3 text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors whitespace-nowrap inline-flex items-center gap-3"
              >
                {tag}
                <span aria-hidden className="text-[var(--accent)] text-2xl">·</span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* Cards principales */}
        <Container className="mt-16">
          <MotionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {STACK_CARDS.map((tech) => (
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
          </MotionReveal>
        </Container>
      </section>

      {/* ========== ROUEN — SEO LOCAL ========== */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-50" aria-hidden />
        <ParticlesBg count={30} />

        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <MotionReveal className="lg:col-span-7" direction="right">
              <Eyebrow number="05" dot className="mb-6">Ancrage local</Eyebrow>
              <h2 className="text-h1 mb-6">
                Une agence digitale à{" "}
                <TextHighlighter>
                  <em>Rouen</em>
                </TextHighlighter>
                , au service de la Normandie.
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
            </MotionReveal>

            <MotionReveal className="lg:col-span-5" direction="left" delay={0.1}>
              <div className="p-8 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-eyebrow">Nous trouver</p>
                  <Badge>
                    <span className="size-1.5 rounded-full bg-[var(--success)] motion-safe:animate-pulse" />
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
            </MotionReveal>
          </div>
        </Container>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <MotionReveal>
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
                <ShimmerButton size="lg" asChild>
                  <Link href="/contact">
                    Demander un devis
                    <ArrowRight />
                  </Link>
                </ShimmerButton>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Découvrir nos services</Link>
                </Button>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </section>
    </main>
  );
}

// ============================================================
// DATA
// ============================================================

const STATS = [
  { numeric: 50, suffix: "+", label: "Projets livrés" },
  { numeric: 12, suffix: "", label: "Mois d'autonomie" },
  { numeric: null, staticValue: "< 2s", label: "Temps de chargement" },
  { numeric: 100, suffix: "%", label: "Code maison" },
] as Array<{
  numeric: number | null;
  suffix?: string;
  prefix?: string;
  staticValue?: string;
  label: string;
}>;

const WP_HIGHLIGHTS = [
  "Thèmes custom (pas d'Elementor ni Divi)",
  "WooCommerce sur mesure pour PME",
  "Refonte sans perdre votre SEO",
  "Maintenance, sécurité, performance",
  "Headless WordPress (WP + Next.js) si pertinent",
];

const WP_OFFERS = [
  {
    icon: Wrench,
    title: "Création sur mesure",
    description: "Thème custom, ACF Pro, pas de bloat",
    href: "/services/wordpress",
  },
  {
    icon: ShoppingBag,
    title: "WooCommerce",
    description: "Boutique en ligne complète",
    href: "/services/wordpress",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & sécurité",
    description: "Forfaits mensuels, monitoring",
    href: "/services/wordpress",
  },
];

const SERVICES = [
  {
    icon: Code2,
    eyebrow: "Sur mesure · Polyvalent",
    title: "Développement web custom",
    description:
      "Quand WordPress ne suffit pas : Next.js, React, Python, Node.js. Plateformes SaaS, apps métier, API. La techno suit le projet.",
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
  featured?: boolean;
}

function ServiceCard({ icon: Icon, eyebrow, title, description, href, featured }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group relative bg-[var(--background)] hover:bg-[var(--surface)] p-8 md:p-10 transition-colors duration-200 overflow-hidden"
    >
      {/* Border beam uniquement sur la card featured */}
      {featured && <BorderBeam duration={10} size={80} />}

      <div className="flex items-start justify-between mb-12 relative z-10">
        <div className="size-12 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
          <Icon className="size-5 text-[var(--accent)]" strokeWidth={1.75} />
        </div>
        <ArrowUpRight className="size-5 text-[var(--subtle-foreground)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-eyebrow mb-3 relative z-10">{eyebrow}</p>
      <h3 className="text-h2 mb-3 relative z-10">{title}</h3>
      <p className="text-body text-[var(--muted-foreground)] max-w-md relative z-10">
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

const STACK_TAGS = [
  "WordPress",
  "WooCommerce",
  "ACF Pro",
  "PHP",
  "MySQL",
  "Next.js",
  "React",
  "React Native",
  "TypeScript",
  "Python",
  "Node.js",
  "Tailwind CSS",
  "Prisma",
  "PostgreSQL",
  "GraphQL",
  "Vercel",
  "Figma",
  "Sentry",
  "Cloudflare",
  "WP Rocket",
  "Stripe",
  "Resend",
];

const STACK_CARDS = [
  {
    name: "WordPress",
    tagline: "Notre spécialité historique",
    kind: "CMS",
    href: "/services/wordpress",
  },
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
];
