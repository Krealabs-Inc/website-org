import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Building2,
  Users,
  Code2,
  Smartphone,
  Search,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
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
  // correspondre au contenu visible (section FAQ ci-dessous) — policy Google.
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

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <div
          aria-hidden
          className="absolute -top-32 left-1/3 size-[640px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />

        <Container className="relative">
          <div className="max-w-4xl">
            <Badge className="mb-6 inline-flex items-center gap-2">
              <MapPin className="size-3" />
              {city.name} {city.postalCode} · {city.region}
            </Badge>
            <h1 className="text-display">
              Agence web <em>{city.cityArticle}</em>,
              <br />
              au service de la {city.region}.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              {city.heroIntro}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Démarrer un projet
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/equipe">Voir l&apos;équipe</Link>
              </Button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {[
              { value: "2", label: "Co-fondateurs · développeurs" },
              { value: `${city.distanceFromRouen} km`, label: city.distanceFromRouen === 0 ? "Centre-ville" : "De notre QG Rouen" },
              { value: "< 24h", label: "Délai de réponse" },
              { value: "5 ans", label: "D'expérience locale" },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--background)] px-6 py-8 flex flex-col gap-1">
                <p className="text-h3 font-medium tracking-[-0.025em]">{s.value}</p>
                <p className="text-caption">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* POURQUOI UNE AGENCE LOCALE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="01" className="mb-6">Proximité</Eyebrow>
              <h2 className="text-h1 mb-6">
                Pourquoi choisir une <em>agence {city.cityArticle}</em> ?
              </h2>
              <p className="text-body-lg text-[var(--muted-foreground)] mb-6">
                Travailler avec une agence digitale locale, c&apos;est gagner en
                réactivité, en compréhension de votre marché et en simplicité de
                collaboration.
              </p>
              <p className="text-body text-[var(--muted-foreground)]">
                {city.cityReason}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {REASONS.map((r) => (
                <div key={r.title} className="bg-[var(--background)] p-8 grid grid-cols-[auto_1fr] gap-6 items-start">
                  <CheckCircle2 className="size-5 text-[var(--accent)] mt-1 shrink-0" />
                  <div>
                    <h3 className="text-h4 mb-2">{r.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)]">
                      {r.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES POUR LA VILLE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">Nos services {city.cityArticle}</Eyebrow>
            <h2 className="text-h1">
              Ce que nous <em>construisons</em> pour vous.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {LOCAL_SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.title}
                  href={s.href}
                  className="group bg-[var(--background)] hover:bg-[var(--surface)] p-8 md:p-10 transition-colors"
                >
                  <div className="size-12 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-6">
                    <Icon className="size-5 text-[var(--accent)]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-h3 mb-3">{s.title}</h3>
                  <p className="text-body text-[var(--muted-foreground)] mb-4">
                    {s.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)]">
                    En savoir plus
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTEURS */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-40" aria-hidden />
        <Container className="relative">
          <div className="max-w-3xl mb-16">
            <Eyebrow number="03" className="mb-6">Secteurs accompagnés</Eyebrow>
            <h2 className="text-h1">
              Des entreprises <em>{city.adjectivePlural}</em> de tous secteurs.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">
              {city.name} concentre un tissu économique varié. Voici les secteurs
              que nous avons accompagnés ou que nous savons cadrer.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {city.topSectors.map((sector) => (
              <div
                key={sector}
                className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-center"
              >
                <p className="text-body-sm font-medium">{sector}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* INFOS PRATIQUES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            <div className="bg-[var(--background)] p-8">
              <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-4">
                <MapPin className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
              </div>
              <p className="text-eyebrow mb-2">Localisation</p>
              <p className="text-h4 mb-1">
                {city.name} {city.postalCode}
              </p>
              <p className="text-body-sm text-[var(--muted-foreground)]">
                {city.department} · {city.metropole}
              </p>
            </div>

            <div className="bg-[var(--background)] p-8">
              <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-4">
                <Users className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
              </div>
              <p className="text-eyebrow mb-2">Zone d&apos;intervention</p>
              <p className="text-h4 mb-1">Toute la {city.region}</p>
              <p className="text-body-sm text-[var(--muted-foreground)]">
                Rouen, Le Havre, Caen, Évreux, Dieppe — et France entière à
                distance.
              </p>
            </div>

            <div className="bg-[var(--background)] p-8">
              <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-4">
                <Building2 className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
              </div>
              <p className="text-eyebrow mb-2">CCI référente</p>
              <p className="text-h4 mb-1">{city.cciName}</p>
              <p className="text-body-sm text-[var(--muted-foreground)]">
                Krealabs est inscrit auprès de la {city.cciName}.
              </p>
            </div>
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
        description={`Vous êtes basés ${city.cityArticle} ou en ${city.region} ? Premier rendez-vous offert pour discuter de votre projet — en présentiel ou en visio, comme vous préférez.`}
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
      description: `Schema LocalBusiness, fiche Google Business, citations locales sur les annuaires ${city.adjectivePlural} — votre visibilité ${city.cityArticle} et en ${city.region} est notre métier.`,
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
