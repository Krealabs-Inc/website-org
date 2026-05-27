import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import { SECTORS, SECTOR_SLUGS, type SectorData } from "@/lib/sectors";

interface PageProps {
  params: Promise<{ secteur: string }>;
}

export async function generateStaticParams() {
  return SECTOR_SLUGS.map((secteur) => ({ secteur }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { secteur } = await params;
  const data = SECTORS[secteur];
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://krealabs.fr/agence-web-rouen/${secteur}`,
    },
    openGraph: {
      title: `${data.title} — Krealabs`,
      description: data.description,
      url: `https://krealabs.fr/agence-web-rouen/${secteur}`,
      type: "website",
    },
  };
}

export default async function AgenceWebRouenSecteurPage({
  params,
}: PageProps) {
  const { secteur } = await params;
  const data: SectorData | undefined = SECTORS[secteur];
  if (!data) notFound();

  const baseUrl = "https://krealabs.fr";

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: baseUrl },
          { name: "Agence web Rouen", url: `${baseUrl}/agence-web-rouen` },
          {
            name: data.title,
            url: `${baseUrl}/agence-web-rouen/${data.slug}`,
          },
        ]}
      />
      <FAQSchema
        items={data.faq.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <div
          aria-hidden
          className="absolute -top-32 left-1/3 size-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />

        <Container className="relative">
          <div className="max-w-4xl">
            <Badge className="mb-6 inline-flex items-center gap-2">
              <MapPin className="size-3" />
              Rouen 76000 · {data.namePlural}
            </Badge>
            <h1 className="text-display">
              Agence web pour <em>{data.namePlural}</em>
              <br />
              à Rouen et en Normandie.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-3xl">
              {data.intro}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Démarrer un projet
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/agence-web-rouen">
                  Voir tous nos services Rouen
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CHALLENGES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="01" className="mb-6">
              Enjeux spécifiques au secteur
            </Eyebrow>
            <h2 className="text-h1">
              Les défis web propres aux <em>{data.namePlural}</em>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {data.challenges.map((c) => (
              <div
                key={c.title}
                className="bg-[var(--background)] p-8 md:p-10"
              >
                <h3 className="text-h3 mb-3">{c.title}</h3>
                <p className="text-body text-[var(--muted-foreground)]">
                  {c.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="02" className="mb-6">
              Ce que nous proposons
            </Eyebrow>
            <h2 className="text-h1">
              Une <em>plateforme web</em> adaptée à votre métier.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {data.features.map((f) => (
              <div
                key={f.title}
                className="bg-[var(--background)] p-8 md:p-10 grid grid-cols-[auto_1fr] gap-6 items-start"
              >
                <CheckCircle2 className="size-5 text-[var(--accent)] mt-1 shrink-0" />
                <div>
                  <h3 className="text-h4 mb-2">{f.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)]">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* STACK RECOMMANDÉE */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30" aria-hidden />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow number="03" className="mb-6">
              Stack technique recommandée
            </Eyebrow>
            <h2 className="text-h2 mb-6">
              Le bon outil pour les <em>{data.namePlural}</em>.
            </h2>
            <p className="text-body-lg text-[var(--muted-foreground)]">
              {data.recommendedStack}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/services/wordpress"
                className="text-body-sm text-[var(--accent)] hover:underline"
              >
                → Notre offre WordPress
              </Link>
              <Link
                href="/services/developpement-web"
                className="text-body-sm text-[var(--accent)] hover:underline"
              >
                → Développement custom
              </Link>
              <Link
                href="/services/performance-seo"
                className="text-body-sm text-[var(--accent)] hover:underline"
              >
                → Performance &amp; SEO
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-12">
            <Eyebrow number="04" className="mb-6">
              Questions fréquentes
            </Eyebrow>
            <h2 className="text-h1">FAQ {data.name} à Rouen.</h2>
          </div>
          <div className="max-w-3xl space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {data.faq.map((q) => (
              <div key={q.question} className="bg-[var(--background)] p-8">
                <h3 className="text-h4 mb-3">{q.question}</h3>
                <p className="text-body text-[var(--muted-foreground)]">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Démarrons votre <em>projet {data.name}</em>.
          </>
        }
        description={`Vous êtes ${data.name === "e-commerce" ? "porteur d'un projet e-commerce" : `gérant ${data.nameLabeled === "les e-commerces" ? "d'un e-commerce" : "d'" + data.nameLabeled.replace("les ", "")}`} à Rouen ou en Normandie ? Premier rendez-vous offert pour cadrer votre projet — en présentiel ou en visio.`}
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
