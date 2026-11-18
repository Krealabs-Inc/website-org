import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ProjectSelection } from "@/components/projects/project-selection";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import { Button } from "@/components/ui/button";
import { EditorDemo } from "@/components/services/wordpress/editor-demo";
import { LiveEdit } from "@/components/services/wordpress/live-edit";
import { TimelineTrace } from "@/components/services/wordpress/timeline-trace";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { SERVICE_WORDPRESS } from "@/lib/page-texts/service-wordpress";
import { ServiceResources } from "@/components/services/service-resources";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export const metadata: Metadata = {
  title: "Agence WordPress à Rouen - Création, refonte, WooCommerce, SEO",
  description:
    "Agence WordPress à Rouen : vous modifiez vos contenus vous-même, votre site reste rapide et sécurisé. Création sur mesure, refonte, WooCommerce, SEO et maintenance en Normandie, sans page builder.",
  alternates: { canonical: "https://krealabs.fr/services/wordpress" },
  openGraph: {
    title: "Agence WordPress à Rouen - Krealabs",
    description:
      "Vous gérez votre site WordPress vous-même, on s'occupe du reste : création sur mesure, WooCommerce, refonte, SEO, maintenance. Agence web à Rouen, en Normandie.",
    url: "https://krealabs.fr/services/wordpress",
    type: "website",
  },
};

export default async function WordpressPage() {
  const t = await getPageTexts(SERVICE_WORDPRESS);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceSchema
        name="Création de site WordPress sur mesure"
        description="Agence WordPress à Rouen : création, refonte, WooCommerce, SEO, maintenance, sécurité. Thèmes custom (pas de page builders), plugins développés à la main, headless WordPress quand pertinent."
        url="https://krealabs.fr/services/wordpress"
        serviceType="Création de site WordPress"
        priceRange="€€"
        offers={[
          { name: "Création WordPress sur mesure", description: "Thème custom, ACF Pro, pas de page builders" },
          { name: "Refonte & migration", description: "Migration Wix/Squarespace/Webflow vers WordPress propre" },
          { name: "WooCommerce e-commerce", description: "Boutiques en ligne complètes" },
          { name: "SEO WordPress", description: "Audit, optimisation Yoast/RankMath, Core Web Vitals" },
          { name: "Maintenance & sécurité", description: "Forfaits mensuels, monitoring, durcissement" },
          { name: "Plugins & thèmes custom", description: "Développement WP sur mesure" },
          { name: "Headless WordPress", description: "WP back + Next.js front" },
        ]}
      />
      {/* HERO: an editor that writes and publishes on its own */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Retour aux services
          </Link>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow number="01" dot className="mb-8">{t.heroEyebrow}</Eyebrow>
              <h1 className="text-display">{rich(t.heroTitle)}</h1>
              <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-xl">{t.heroText}</p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link href="/contact?type=devis">
                    {t.heroCta}
                    <ArrowRight />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">{t.heroSecondary}</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <EditorDemo />
            </div>
          </div>
        </Container>
      </section>

      {/* SIGNATURE: you edit, your site follows */}
      <LiveEdit />

      {/* WHAT YOU GET: a table of contents */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-14 max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow number="02" className="mb-6">{t.featuresEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.featuresTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">{t.featuresText}</p>
          </div>
          <ol className="wp-toc" data-scroll data-reveal="stagger">
            {t.features.map((f, i) => (
              <li key={f.title}>
                <span className="wp-toc-number">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h3">{f.title}</h3>
                <p className="text-body text-[var(--muted-foreground)]">{f.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <ProjectSelection
        slugs={["iliass", "main-verte"]}
        eyebrow={t.projectsEyebrow}
        title={rich(t.projectsTitle)}
      />

      {/* METHOD: a timeline drawn by the scroll */}
      <TimelineTrace
        heading={
          <>
            <Eyebrow number="03" className="mb-6">{t.methodEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.methodTitle)}</h2>
            <div className="text-body text-[var(--muted-foreground)] mt-6 space-y-4">
              <p>{rich(t.methodText1)}</p>
              <p>{rich(t.methodText2)}</p>
            </div>
          </>
        }
        steps={t.steps}
      />

      {/* STACK: as WordPress shows it, a list of plugins */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start" data-scroll data-reveal="up">
              <Eyebrow number="04" className="mb-6">{t.stackEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.stackTitle)}</h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6">{t.stackText}</p>
            </div>
            <ul className="wp-plugins lg:col-span-8" data-scroll data-reveal="stagger">
              {t.stack.map((tool) => {
                const none = tool.name === "Aucun";
                return (
                  <li key={tool.name}>
                    <div className="min-w-0">
                      <p className="text-body font-semibold">
                        {none ? "Page builder" : tool.name}
                        <span className="text-caption ml-3">{none ? "Jamais installé" : tool.kind}</span>
                      </p>
                      <p className="text-body-sm text-[var(--muted-foreground)] mt-1">{tool.tagline}</p>
                    </div>
                    <span className={`wp-plugin-switch ${none ? "is-off" : ""}`} role="img" aria-label={none ? "Désactivé" : "Activé"} />
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* SECTEURS */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30" aria-hidden />
        <Container className="relative">
          <div className="max-w-3xl mb-16" data-scroll data-reveal="up">
            <Eyebrow number="05" className="mb-6">{t.sectorsEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.sectorsTitle)}</h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">{t.sectorsText}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-scroll data-reveal="stagger">
            {t.sectors.map((s) => {
              return (
                <div key={s.title} className="editorial-note">
                  <h3 className="text-h4 mb-2">{s.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)]">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FAQ WORDPRESS - avec FAQPage schema */}
      <ServiceFAQ
        title={rich(t.faqTitle)}
        items={t.faq}
      />


      <ServiceResources
        articles={[
          { href: "/blog/headless-wordpress-nextjs-guide", kicker: "Headless", title: "Headless WordPress avec Next.js : le guide honnête (et quand l'éviter)" },
          { href: "/blog/pourquoi-wordpress-reste-le-bon-choix-2026", kicker: "WordPress", title: "Pourquoi WordPress reste le bon choix en 2026" },
          { href: "/blog/refonte-wordpress-2026-methode-agence-rouen", kicker: "Refonte", title: "Refonte WordPress 2026 : la méthode complète d'une agence à Rouen" },
          { href: "/blog/delais-livraison-site-wordpress", kicker: "Planning", title: "Combien de temps pour livrer un site WordPress ?" },
          { href: "/blog/woocommerce-b2b-erp-tarifs-negocies", kicker: "WooCommerce B2B", title: "WooCommerce B2B : intégrations ERP et tarifs négociés" },
        ]}
      />

      <PageCta t={t} />
    </main>
  );
}
