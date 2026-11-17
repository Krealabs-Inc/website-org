import Link from "next/link";
import { ArrowRight, Building2, Code2, Smartphone, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CityMap } from "@/components/local/city-map";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ServiceCta } from "@/components/services/service-cta";
import type { CityData } from "@/lib/cities";
import { CITY_FAQ } from "@/lib/city-faq";

/**
 * Template réutilisable pour les landing pages locales "Agence web à [Ville]".
 * Toutes les mentions de ville passent par les champs CityData → 0 duplicate
 * content perçu par Google si les CityData diffèrent suffisamment (intro,
 * secteurs, landmarks, cityReason).
 */
export function CityLanding({ city }: { city: CityData }) {
  const baseUrl = "https://krealabs.fr";
  const REASONS = buildReasons(city);
  const LOCAL_SERVICES = buildServices(city);
  const faq = CITY_FAQ[city.slug] ?? [];

  // Service (pas LocalBusiness) : Krealabs est basé à Rouen et DESSERT cette
  // ville. areaServed = la ville, provider = l'org canonique via @id.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}${city.path}#service`,
    name: `Agence web ${city.cityArticle}`,
    serviceType: "Création de site internet, application mobile, SEO",
    url: `${baseUrl}${city.path}`,
    provider: { "@id": `${baseUrl}/#organization` },
    areaServed: { "@type": "City", name: city.name },
  };

  // FAQPage : uniquement si la ville a une FAQ. Le contenu du schema doit
  // correspondre au contenu visible (section FAQ ci-dessous) - policy Google.
  const faqSchema =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${baseUrl}${city.path}#faq`,
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: baseUrl },
          { name: `Agence web ${city.cityArticle}`, url: `${baseUrl}${city.path}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* HERO: the town on the map of the places we serve */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow dot className="mb-8">
                {city.name} {city.postalCode} · {city.department}
              </Eyebrow>
              <h1 className="text-h1 md:text-display">
                Agence web <em>{city.cityArticle}</em>, au service de la {city.region}.
              </h1>
              <p className="text-body-lg text-[var(--muted-foreground)] mt-8">{city.heroIntro}</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Parler de mon projet
                    <ArrowRight />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/equipe">Rencontrer l’équipe</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <CityMap city={city} />
            </div>
          </div>
        </Container>
      </section>

      {/* LANDMARKS: the town's own references, scrolling by */}
      {city.landmarks.length > 0 && (
        <div className="city-ticker" aria-label={`Repères ${city.cityPossessive}`}>
          <ul>
            {[...city.landmarks, ...city.landmarks].map((l, i) => (
              <li key={i} aria-hidden={i >= city.landmarks.length}>
                {l}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* WHY LOCAL */}
      <section className="section-y">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow number="01" className="mb-6">Proximité</Eyebrow>
              <h2 className="text-h1 mb-6">
                Pourquoi une <em>agence locale</em> ?
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">{city.cityReason}</p>
            </div>
            <ol className="city-reasons lg:col-span-7">
              {REASONS.map((r, i) => (
                <li key={r.title}>
                  <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">0{i + 1}</span>
                  <div>
                    <h3 className="text-h4">{r.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)] mt-2">{r.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <Eyebrow number="02" className="mb-6">Nos services {city.cityArticle}</Eyebrow>
          <h2 className="text-h1 mb-12">
            Ce que nous <em>construisons</em> pour vous.
          </h2>
          <ul className="city-services">
            {LOCAL_SERVICES.map((s) => (
              <li key={s.title}>
                <Link href={s.href} className="city-service group">
                  <span className="text-h3">{s.title}</span>
                  <span className="text-body-sm text-[var(--muted-foreground)]">{s.description}</span>
                  <ArrowRight className="size-5 text-[var(--accent)] transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* SECTORS + PRACTICAL: tags beside a business card */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow number="03" className="mb-6">Secteurs</Eyebrow>
              <h2 className="text-h2">
                Des entreprises <em>{city.adjectivePlural}</em> de tous secteurs.
              </h2>
              <ul className="city-tags mt-8">
                {city.topSectors.map((sector) => (
                  <li key={sector}>{sector}</li>
                ))}
              </ul>
            </div>
            <aside className="city-card lg:col-span-5">
              <p className="text-caption">En pratique</p>
              <dl>
                <div>
                  <dt>Localisation</dt>
                  <dd>
                    {city.name} {city.postalCode} · {city.metropole}
                  </dd>
                </div>
                <div>
                  <dt>Rendez-vous</dt>
                  <dd>{city.distanceFromRouen === 0 ? "À Rouen, en visio ou chez vous" : `${city.cityArticle.replace(/^à /, "À ").replace(/^au /, "Au ")}, en visio ou à Rouen`}</dd>
                </div>
                <div>
                  <dt>CCI référente</dt>
                  <dd>{city.cciName}</dd>
                </div>
                <div>
                  <dt>Réponse</dt>
                  <dd>Sous 24h ouvrées</dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      {/* FAQ LOCALE */}
      {faq.length > 0 && (
        <section className="section-y border-t border-[var(--border)]">
          <Container size="narrow">
            <Eyebrow number="04" className="mb-6">Questions fréquentes</Eyebrow>
            <h2 className="text-h1 mb-10">
              Une <em>agence web {city.cityArticle}</em>, en pratique.
            </h2>
            <div className="border-y border-[var(--border)]">
              {faq.map((f) => (
                <details
                  key={f.question}
                  className="group border-b border-[var(--border)] last:border-b-0 py-5"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-body font-medium [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span
                      aria-hidden
                      className="shrink-0 text-h4 leading-none text-[var(--accent)] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-body-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ServiceCta
        title={
          <>
            Démarrons votre projet <em>local</em>.
          </>
        }
        description={`Vous êtes basés ${city.cityArticle} ou en ${city.region} ? Premier rendez-vous offert pour discuter de votre projet - en présentiel ou en visio, comme vous préférez.`}
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}

function buildReasons(city: CityData) {
  return [
    {
      title: "Une équipe joignable",
      description:
        "Vous parlez directement à ceux qui codent votre projet. Pas de service commercial, pas de chef de projet intermédiaire.",
    },
    {
      title: `Une compréhension du marché ${city.adjective}`,
      description: `Nous connaissons les enjeux des entreprises ${city.adjectivePlural} et normandes. Cela se ressent dans nos recommandations stratégiques.`,
    },
    {
      title: "Des rendez-vous en présentiel possibles",
      description: `Pour les projets stratégiques, nous nous déplaçons ${city.cityArticle} et en ${city.region}. Présentiel, visio, asynchrone : à vous de choisir.`,
    },
    {
      title: "Un SEO local optimisé",
      description: `Schema LocalBusiness, fiche Google Business, citations locales sur les annuaires ${city.adjectivePlural} - votre visibilité ${city.cityArticle} et en ${city.region} est notre métier.`,
    },
  ];
}

function buildServices(city: CityData) {
  return [
    {
      icon: Building2,
      title: `Sites WordPress sur mesure ${city.cityArticle}`,
      description: `Notre spécialité : sites WordPress, WooCommerce, thèmes custom, refonte. La majorité de nos clients ${city.adjectivePlural} sont sur WordPress.`,
      href: "/services/wordpress",
    },
    {
      icon: Code2,
      title: "Création de site internet custom",
      description:
        "Quand WordPress ne suffit pas : Next.js, React, Python, Node.js. Plateformes SaaS, outils métier sur mesure.",
      href: "/services/developpement-web",
    },
    {
      icon: Smartphone,
      title: "Développement d'application mobile",
      description: `Apps iOS et Android en React Native, une base de code, deux App Stores. Idéal pour les startups ${city.adjectivePlural}.`,
      href: "/services/applications-mobile",
    },
    {
      icon: Search,
      title: `SEO local & référencement ${city.name}`,
      description: `Audit, optimisation Core Web Vitals, fiche Google Business, SEO WordPress / général. Pour ressortir devant la concurrence ${city.adjective}.`,
      href: "/services/performance-seo",
    },
  ];
}
