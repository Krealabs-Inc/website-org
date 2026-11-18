import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AmbientVideo } from "@/components/media/ambient-video";
import { Badge } from "@/components/ui/badge";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { EXPERTISE } from "@/lib/page-texts/expertise";
import { Blueprint } from "@/components/expertise/blueprint";
import { Elevation } from "@/components/expertise/elevation";
import { StackTabs } from "@/components/expertise/stack-tabs";

export const metadata: Metadata = {
  title: "Expertise - Savoir-faire & technologies",
  description:
    "Méthodes, savoir-faire et stack technique de l'agence Krealabs à Rouen. Architecture, sécurité, performance, CI/CD, accessibilité - l'ensemble de nos compétences pour réussir vos projets web et mobile.",
  alternates: { canonical: "https://krealabs.fr/expertise" },
  openGraph: {
    title: "Expertise - Savoir-faire & technologies - Krealabs",
    description:
      "Méthodes, savoir-faire et stack technique de l'agence Krealabs à Rouen. Architecture, sécurité, performance, CI/CD, accessibilité - l'ensemble de nos compétences pour réussir vos projets web et mobile.",
    url: "https://krealabs.fr/expertise",
    type: "website",
  },
};

export default async function ExpertisePage() {
  const t = await getPageTexts(EXPERTISE);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="bp-hero-grid" aria-hidden />

        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow dot className="mb-8">{t.eyebrow}</Eyebrow>
            <h1 className="text-display">{rich(t.title)}</h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">{t.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t.heroCta}
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/equipe">{t.heroSecondary}</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Elevation />
          </div>
          </div>
        </Container>
      </section>

      {/* SAVOIR-FAIRE - 6 COMPÉTENCES PHARES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-12" data-scroll data-reveal="up">
            <Eyebrow className="mb-6">{t.videoEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.videoTitle)}</h2>
          </div>
          <div data-scroll data-reveal="up">
            <AmbientVideo
              src="/videos/perso-chantier.mp4"
              poster="/videos/perso-chantier.jpg"
              label="Animation : l’équipe construit un site étape par étape"
              transcript="Votre projet, étape par étape. Un : on cadre ensemble, les blocs du site sont posés. Deux : on dessine votre site. Trois : on le construit, démo après démo. Quatre : le site est en ligne, et on reste là ; une cliente clique sur Demander un devis, la demande est envoyée. Un seul interlocuteur, du devis à la mise en ligne."
            />
          </div>
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-14 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow number="01" className="mb-6">{t.skillsEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.skillsTitle)}</h2>
            </div>
            <p className="text-body text-[var(--muted-foreground)] lg:col-span-5">{t.skillsText}</p>
          </div>
          <Blueprint skills={t.skills.map(({ title, description, points }) => ({ title, description, points: points.split("·").map((p) => p.trim()).filter(Boolean) }))} />
        </Container>
      </section>

      {/* STACK TECHNIQUE DÉTAILLÉE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">{t.stackEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.stackTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">{t.stackText}</p>
          </div>

          <StackTabs categories={STACK_CATEGORIES} />
        </Container>
      </section>

      {/* MÉTHODOLOGIE */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30" aria-hidden />
        <Container className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="03" className="mb-6">{t.methodEyebrow}</Eyebrow>
              <h2 className="text-h1 mb-6">{rich(t.methodTitle)}</h2>
              <p className="text-body text-[var(--muted-foreground)]">{t.methodText}</p>
            </div>

            <ol className="lg:col-span-7 space-y-3">
              {t.method.map((m, i) => (
                <li key={m.title} className="editorial-step">
                  <span className="editorial-ordinal">
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
            <Eyebrow className="mb-6 justify-center">{t.standardsEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.standardsTitle)}</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.standards.map((s) => (
              <Badge key={s.label} variant="outline" className="px-4 py-2 text-body-sm">
                {s.label}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      <PageCta t={t} />
    </main>
  );
}


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


