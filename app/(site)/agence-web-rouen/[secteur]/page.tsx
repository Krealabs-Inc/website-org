import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectorSitemap } from "@/components/local/sector-sitemap";
import { ServiceCta } from "@/components/services/service-cta";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { FAQSchema } from "@/components/seo/faq-schema";
import type { SectorData } from "@/lib/sectors";
import { getSectors } from "@/lib/content/local";

interface PageProps {
  params: Promise<{ secteur: string }>;
}

export async function generateStaticParams() {
  return Object.keys(await getSectors()).map((secteur) => ({ secteur }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { secteur } = await params;
  const data = (await getSectors())[secteur];
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `https://krealabs.fr/agence-web-rouen/${secteur}`,
    },
    openGraph: {
      title: `${data.title} - Krealabs`,
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
  const data: SectorData | undefined = (await getSectors())[secteur];
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

      {/* HERO: the site we would build for this trade */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <Link
            href="/agence-web-rouen"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Agence web à Rouen
          </Link>
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow dot className="mb-8">Rouen 76000 · {data.namePlural}</Eyebrow>
              <h1 className="text-h1 md:text-display">
                Agence web pour <em>{data.namePlural}</em> à Rouen et en Normandie.
              </h1>
              <p className="text-body-lg text-[var(--muted-foreground)] mt-8">{data.intro}</p>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Parler de mon projet
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <SectorSitemap name={data.name} pages={data.features.map((f) => f.title)} />
            </div>
          </div>
        </Container>
      </section>

      {/* CHALLENGES: cards to swipe through */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow number="01" className="mb-6">Vos enjeux</Eyebrow>
              <h2 className="text-h1">
                Ce qui compte pour les <em>{data.namePlural}</em>.
              </h2>
            </div>
            <p className="text-caption">Faites défiler →</p>
          </div>
        </Container>
        <ol className="sector-swipe" tabIndex={0} aria-label="Enjeux du secteur">
          {data.challenges.map((c, i) => (
            <li key={c.title}>
              <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--accent)]">Enjeu 0{i + 1}</span>
              <h3 className="text-h3 mt-4">{c.title}</h3>
              <p className="text-body text-[var(--muted-foreground)] mt-4">{c.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FEATURES: the pages of the plan, explained */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Eyebrow number="02" className="mb-6">Ce que nous proposons</Eyebrow>
              <h2 className="text-h1">
                Un site <em>pensé pour votre métier</em>.
              </h2>
            </div>
            <dl className="sector-features lg:col-span-8">
              {data.features.map((f) => (
                <div key={f.title}>
                  <dt className="text-h4">{f.title}</dt>
                  <dd className="text-body-sm text-[var(--muted-foreground)]">{f.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* STACK: a recommendation, written as one */}
      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <Eyebrow number="03" className="mb-6">Notre recommandation</Eyebrow>
          <blockquote className="sector-quote">{data.recommendedStack}</blockquote>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/services/wordpress" className="contact-pill hover:text-[var(--foreground)]">Notre offre WordPress</Link>
            <Link href="/services/developpement-web" className="contact-pill hover:text-[var(--foreground)]">Développement sur mesure</Link>
            <Link href="/services/performance-seo" className="contact-pill hover:text-[var(--foreground)]">Performance &amp; SEO</Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <Eyebrow number="04" className="mb-6">Questions fréquentes</Eyebrow>
          <h2 className="text-h1 mb-10">Vos questions, {data.namePlural}.</h2>
          <div className="border-y border-[var(--border)]">
            {data.faq.map((q) => (
              <details key={q.question} className="group border-b border-[var(--border)] last:border-b-0 py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-body font-medium [&::-webkit-details-marker]:hidden">
                  {q.question}
                  <span aria-hidden className="shrink-0 text-h4 leading-none text-[var(--accent)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-3 leading-relaxed">{q.answer}</p>
              </details>
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
        description={`Vous êtes ${data.name === "e-commerce" ? "porteur d'un projet e-commerce" : `gérant ${data.nameLabeled === "les e-commerces" ? "d'un e-commerce" : "d'" + data.nameLabeled.replace("les ", "")}`} à Rouen ou en Normandie ? Premier rendez-vous offert pour cadrer votre projet - en présentiel ou en visio.`}
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
