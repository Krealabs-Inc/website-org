import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SEO local Rouen : vos clients vous trouvent sur Google",
  description:
    "Vous apparaissez quand vos clients cherchent votre métier à Rouen. Audit SEO, référencement local et Core Web Vitals par une agence web à Rouen, en Normandie. Résultats mesurés avant/après.",
  alternates: { canonical: "https://krealabs.fr/services/performance-seo" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Gauges } from "@/components/services/seo/gauges";
import { SerpClimb } from "@/components/services/seo/serp-climb";
import { LoadRace } from "@/components/services/seo/load-race";
import { Checklist } from "@/components/services/seo/checklist";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { SERVICE_SEO } from "@/lib/page-texts/service-seo";
import { ServiceResources } from "@/components/services/service-resources";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export default async function PerformanceSeoPage() {
  const t = await getPageTexts(SERVICE_SEO);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceSchema
        name="Audit SEO et optimisation performance"
        description="Audit SEO technique, optimisation Core Web Vitals, référencement local Rouen et Normandie. Schema.org, sitemap, contenus, Lighthouse 95+."
        url="https://krealabs.fr/services/performance-seo"
        serviceType="Audit SEO et optimisation performance web"
        priceRange="€€"
        offers={[
          { name: "Audit Core Web Vitals" },
          { name: "SEO technique" },
          { name: "SEO local Rouen" },
          { name: "Optimisation contenus" },
          { name: "Suivi mensuel" },
        ]}
      />
      {/* HERO: the scores we aim for, filling up */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Retour aux services
          </Link>
          <div className="grid grid-cols-1 items-end gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow number="04" dot className="mb-8">{t.heroEyebrow}</Eyebrow>
              <h1 className="text-display">{rich(t.heroTitle)}</h1>
              <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-xl">{t.heroText}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
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
            <div className="lg:col-span-5">
              <Gauges />
            </div>
          </div>
        </Container>
      </section>

      {/* SIGNATURE: your site climbing a results page */}
      <SerpClimb />

      {/* SPEED: two pages racing */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12" data-scroll data-reveal="up">
            <div className="lg:col-span-7">
              <Eyebrow number="02" className="mb-6">{t.speedEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.speedTitle)}</h2>
            </div>
            <p className="text-body text-[var(--muted-foreground)] lg:col-span-5">{t.speedText}</p>
          </div>
          <LoadRace />
        </Container>
      </section>

      {/* WHAT YOU GET: written as the report you receive */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12 max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow number="03" className="mb-6">{t.featuresEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.featuresTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">{t.featuresText}</p>
          </div>
          <div className="report" data-scroll data-reveal="up">
            <div className="report-head">
              <span>Rapport · Leviers travaillés</span>
              <span>Mesuré par</span>
            </div>
            {t.features.map((f) => (
              <div key={f.title} className="report-row">
                <h3 className="text-h4">{f.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">{f.description}</p>
                <span className="report-metric">{f.metric}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* METHOD: a checklist ticking itself */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32" data-scroll data-reveal="up">
                <Eyebrow number="04" className="mb-6">{t.methodEyebrow}</Eyebrow>
                <h2 className="text-h1">{rich(t.methodTitle)}</h2>
                <p className="text-body text-[var(--muted-foreground)] mt-6">{t.methodText}</p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <Checklist steps={t.steps} />
            </div>
          </div>
        </Container>
      </section>

      {/* TOOLS */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-12" data-scroll data-reveal="up">
            <Eyebrow number="05" className="mb-6">{t.toolsEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.toolsTitle)}</h2>
          </div>
          <div className="tool-tabs" data-scroll data-reveal="stagger">
            {t.tools.map((tool) => (
              <div key={tool.name}>
                <p className="text-caption mb-3">{tool.kind}</p>
                <p className="text-h4 mb-2">{tool.name}</p>
                <p className="text-body-sm text-[var(--muted-foreground)]">{tool.tagline}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceFAQ
        title={rich(t.faqTitle)}
        items={t.faq}
      />


      <ServiceResources
        articles={[
          { href: "/blog/seo-local-rouen-guide-pme", kicker: "SEO local", title: "Guide SEO local pour les PME de Rouen et Normandie" },
          { href: "/blog/core-web-vitals-2026-inp", kicker: "Core Web Vitals", title: "Core Web Vitals 2026 : INP a remplacé FID, ce que ça change" },
          { href: "/blog/lighthouse-100-guide-pme", kicker: "Performance", title: "Lighthouse 100/100 : le guide pratique pour PME" },
          { href: "/blog/schema-org-agences-web", kicker: "Données structurées", title: "Schema.org pour agences web : guide balisage complet" },
          { href: "/blog/ai-search-agences-adaptation-2026", kicker: "AI search", title: "AI search : comment les agences web doivent s'adapter en 2026" },
        ]}
      />

      <PageCta t={t} />
    </main>
  );
}
