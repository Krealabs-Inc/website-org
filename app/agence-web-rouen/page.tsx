import { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Agence web à Rouen — Création de sites & applications",
  description:
    "Krealabs, agence web à Rouen en Normandie. Création de sites internet, applications mobiles et logiciels sur mesure pour les entreprises rouennaises. Devis gratuit sous 24h.",
  keywords: [
    "agence web rouen",
    "agence digitale rouen",
    "création site internet rouen",
    "développement web rouen",
    "agence web normandie",
    "création site internet normandie",
    "agence digitale normandie",
    "développeur rouen",
    "agence rouen",
    "site internet rouen",
  ],
  alternates: { canonical: "https://krealabs.fr/agence-web-rouen" },
  openGraph: {
    title: "Agence web à Rouen — Krealabs",
    description:
      "Agence digitale à Rouen spécialisée dans la création de sites internet, applications mobiles et logiciels sur mesure.",
    url: "https://krealabs.fr/agence-web-rouen",
    type: "website",
  },
};

export default function AgenceWebRouenPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "https://krealabs.fr" },
          { name: "Agence web Rouen", url: "https://krealabs.fr/agence-web-rouen" },
        ]}
      />

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
              Rouen 76000 · Normandie
            </Badge>
            <h1 className="text-display">
              Agence web à <em>Rouen</em>,
              <br />
              au service de la Normandie.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Krealabs est une agence digitale basée à Rouen, spécialisée dans la
              création de sites internet, le développement d'applications mobiles
              et de logiciels sur mesure. Nous accompagnons les PME, startups et
              grandes entreprises de toute la Normandie.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Demander un devis
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Nos services</Link>
              </Button>
            </div>
          </div>

          {/* Stats locales */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {[
              { value: "Rouen", label: "Basés à" },
              { value: "100km", label: "Rayon d'action" },
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
                Pourquoi choisir une <em>agence à Rouen</em> ?
              </h2>
              <p className="text-body-lg text-[var(--muted-foreground)]">
                Travailler avec une agence digitale locale, c'est gagner en
                réactivité, en compréhension de votre marché et en simplicité de
                collaboration.
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

      {/* SERVICES POUR ROUEN */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">Nos services à Rouen</Eyebrow>
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
              Des entreprises <em>rouennaises</em> de tous secteurs.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {SECTORS.map((sector) => (
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
              <p className="text-h4 mb-1">Rouen 76000</p>
              <p className="text-body-sm text-[var(--muted-foreground)]">
                Centre-ville de Rouen, accessible en transports en commun.
              </p>
            </div>

            <div className="bg-[var(--background)] p-8">
              <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-4">
                <Users className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
              </div>
              <p className="text-eyebrow mb-2">Zone d'intervention</p>
              <p className="text-h4 mb-1">Toute la Normandie</p>
              <p className="text-body-sm text-[var(--muted-foreground)]">
                Rouen, Le Havre, Caen, Évreux, Dieppe — et France entière à
                distance.
              </p>
            </div>

            <div className="bg-[var(--background)] p-8">
              <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-4">
                <Building2 className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
              </div>
              <p className="text-eyebrow mb-2">Statut</p>
              <p className="text-h4 mb-1">Agence indépendante</p>
              <p className="text-body-sm text-[var(--muted-foreground)]">
                Équipe interne, pas de sous-traitance offshore.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Démarrons votre projet <em>local</em>.
          </>
        }
        description="Vous êtes basés à Rouen ou en Normandie ? Premier rendez-vous offert pour discuter de votre projet — en présentiel ou en visio, comme vous préférez."
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}

const REASONS = [
  {
    title: "Une équipe joignable",
    description:
      "Vous parlez directement à ceux qui codent votre projet. Pas de service commercial, pas de chef de projet intermédiaire.",
  },
  {
    title: "Une compréhension du marché normand",
    description:
      "Nous connaissons les enjeux des entreprises rouennaises et normandes. Cela se ressent dans nos recommandations stratégiques.",
  },
  {
    title: "Des rendez-vous en présentiel possibles",
    description:
      "Pour les projets stratégiques, nous nous déplaçons à Rouen et en Normandie. Présentiel, visio, asynchrone : à vous de choisir.",
  },
  {
    title: "Un SEO local optimisé",
    description:
      "Schema LocalBusiness, fiche Google Business, citations locales — votre visibilité dans Rouen et la Normandie est notre métier.",
  },
];

const LOCAL_SERVICES = [
  {
    icon: Building2,
    title: "Sites WordPress sur mesure à Rouen",
    description:
      "Notre spécialité : sites WordPress, WooCommerce, thèmes custom, refonte. La majorité de nos clients normands sont sur WordPress.",
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
    description:
      "Apps iOS et Android en React Native, une base de code, deux App Stores. Idéal pour les startups normandes.",
    href: "/services/applications-mobile",
  },
  {
    icon: Search,
    title: "SEO local & référencement Rouen",
    description:
      "Audit, optimisation Core Web Vitals, fiche Google Business, SEO WordPress / général. Pour ressortir devant la concurrence rouennaise.",
    href: "/services/performance-seo",
  },
];

const SECTORS = [
  "Industrie",
  "Immobilier",
  "Santé",
  "Restauration",
  "Commerce",
  "BTP",
  "Services B2B",
  "Associations",
  "Collectivités",
  "Tourisme",
  "Logistique",
  "Cabinet conseil",
];
