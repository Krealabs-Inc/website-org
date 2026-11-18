import { Metadata } from "next";
import Link from "next/link";
import { Globe, Database, ShoppingCart, Server, Search, RefreshCw, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Développement web Rouen, Normandie - Sites & outils sur mesure",
  description:
    "Développement web en Normandie : un site qui vous amène des clients, des outils métier sans tableurs ni ressaisie. Agence web à Rouen : sites vitrines, SaaS et applications sur mesure.",
  alternates: { canonical: "https://krealabs.fr/services/developpement-web" },
};

import { ProjectSelection } from "@/components/projects/project-selection";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SheetHero } from "@/components/services/dev/sheet-hero";
import { SheetToDashboard } from "@/components/services/dev/sheet-to-dashboard";
import { ServiceMethod } from "@/components/services/service-method";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { SERVICE_DEV } from "@/lib/page-texts/service-dev";
import { ServiceResources } from "@/components/services/service-resources";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export default async function DeveloppementWebPage() {
  const t = await getPageTexts(SERVICE_DEV);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceSchema
        name="Développement web sur mesure"
        description="Création de sites web et applications sur mesure à Rouen. Next.js, React, TypeScript, Python, Node.js. Sites vitrines, SaaS, plateformes B2B, API."
        url="https://krealabs.fr/services/developpement-web"
        serviceType="Création de site internet sur mesure"
        priceRange="€€€"
        offers={[
          { name: "Site vitrine moderne" },
          { name: "Application web métier" },
          { name: "E-commerce sur mesure" },
          { name: "API & backend" },
          { name: "Refonte & migration" },
        ]}
      />
      {/* HERO: the shared spreadsheet dissolves behind the promise */}
      <SheetHero>
        <Container className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Retour aux services
          </Link>
          <div className="mx-auto max-w-4xl">
            <span className="flex justify-center">
              <Eyebrow number="01" dot className="mb-8">{t.heroEyebrow}</Eyebrow>
            </span>
            <h1 className="text-display">{rich(t.heroTitle)}</h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mx-auto mt-8 max-w-2xl">{t.heroText}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  {t.heroCta}
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">{t.heroSecondary}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </SheetHero>

      {/* SIGNATURE: from the spreadsheet to the tool */}
      <SheetToDashboard />

      {/* WHAT YOU GET: a bento grid */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12 max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow number="03" className="mb-6">{t.featuresEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.featuresTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">{t.featuresText}</p>
          </div>
          <div className="bento" data-scroll data-reveal="stagger">
            {t.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <article key={f.title} className="bento-tile">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[var(--accent)]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-h3">{f.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)] mt-3 max-w-md">{f.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* METHOD: the depth journey, used on this page only */}
      <ServiceMethod
        number="04"
        title={rich(t.methodTitle)}
        intro={<p>{t.methodText}</p>}
        steps={t.steps}
      />

      {/* STACK: as a developer reads it, in code */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-scroll data-reveal="up">
              <Eyebrow number="05" className="mb-6">{t.stackEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.stackTitle)}</h2>
            </div>
            <div className="lg:col-span-7" data-scroll data-reveal="up">
              <div className="dev-code">
                <p className="dev-code-bar">votre-projet / stack.ts</p>
                <ol data-scroll data-reveal="stagger">
                  {t.stack.map((tech) => (
                    <li key={tech.name}>
                      <span>
                        <span className="dev-code-key">{tech.name}</span>
                        <span className="dev-code-comment">{"  // "}{tech.tagline}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProjectSelection
        slugs={["iliass", "meli-melo"]}
        eyebrow={t.projectsEyebrow}
        title={rich(t.projectsTitle)}
      />

      <ServiceFAQ
        title={rich(t.faqTitle)}
        items={t.faq}
      />


      <ServiceResources
        articles={[
          { href: "/blog/nextjs-16-app-router-2026", kicker: "Next.js", title: "Next.js 16 : ce qui change vraiment en 2026" },
          { href: "/blog/react-19-production-bilan-1-an", kicker: "React", title: "React 19 en production : bilan honnête après 1 an d'usage" },
          { href: "/blog/typescript-10-patterns-agence", kicker: "TypeScript", title: "TypeScript : 10 patterns qui sauvent le code en agence" },
          { href: "/blog/prisma-6-postgres-orm", kicker: "Base de données", title: "Prisma 6 : pourquoi c'est notre ORM de référence" },
        ]}
      />

      <PageCta t={t} />
    </main>
  );
}

/** Tile icons, in the order of the editable features. */
const FEATURE_ICONS = [Globe, Database, ShoppingCart, Server, Search, RefreshCw];
