import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getPublishedPosts } from "@/lib/blog-data";

// ISR : revalide toutes les heures → les articles à publication différée
// apparaissent dans la liste catégorie dès leur date prévue.
export const revalidate = 3600;

const BASE_URL = "https://krealabs.fr";

const CATEGORY_META: Record<
  string,
  {
    slug: string;
    name: string;
    title: string;
    description: string;
    intro: string;
  }
> = {
  wordpress: {
    slug: "wordpress",
    name: "WordPress",
    title: "Articles WordPress — Blog Krealabs",
    description:
      "Articles sur WordPress : refonte, sécurité, WooCommerce, headless, SEO. Retours d'expérience d'une agence WordPress à Rouen.",
    intro:
      "Notre cluster d'articles WordPress : développement de thèmes sur mesure, refonte sans perdre le SEO, e-commerce WooCommerce, sécurité, performance et architecture headless. C'est notre spécialité agence.",
  },
  web: {
    slug: "web",
    name: "Web",
    title: "Articles développement web — Blog Krealabs",
    description:
      "Articles sur Next.js, React, TypeScript, Tailwind, Prisma. Retours d'expérience d'une agence digitale à Rouen sur le développement web moderne.",
    intro:
      "Articles techniques sur le développement web moderne : Next.js et son App Router, React Server Components, TypeScript strict, Tailwind 4, Prisma + PostgreSQL. Le stack que nous utilisons au quotidien.",
  },
  mobile: {
    slug: "mobile",
    name: "Mobile",
    title: "Articles applications mobiles — Blog Krealabs",
    description:
      "Articles sur React Native, Expo, notifications push, app store. Retours d'expérience d'une agence mobile à Rouen sur le développement cross-platform.",
    intro:
      "Articles sur le développement d'applications mobiles cross-platform : React Native, Expo Router, notifications push, publication sur App Store et Google Play, OTA updates avec EAS.",
  },
  seo: {
    slug: "seo",
    name: "SEO",
    title: "Articles SEO & performance — Blog Krealabs",
    description:
      "Articles SEO et Core Web Vitals : audit Lighthouse, schema.org, INP, SEO local Rouen et Normandie. Retours d'expérience d'une agence SEO.",
    intro:
      "Articles sur le SEO, les Core Web Vitals, l'audit Lighthouse, le schema.org et le SEO local. Notre objectif : faire ressortir nos clients sur les requêtes qui comptent — notamment en Normandie.",
  },
  outils: {
    slug: "outils",
    name: "Outils",
    title: "Articles outils & DevOps — Blog Krealabs",
    description:
      "Articles sur les outils du quotidien d'une agence : AI coding (Claude, Cursor), GitHub Actions, hébergement (Vercel, OVH, Scaleway).",
    intro:
      "Articles sur les outils que nous utilisons en agence : IA pour le code (Claude, Cursor), CI/CD avec GitHub Actions, choix d'hébergement (Vercel vs OVH vs Scaleway). Retours pratiques.",
  },
};

const CATEGORY_SLUGS = Object.keys(CATEGORY_META);

// Mapping slug URL → nom dans blog-data (case-sensitive)
const SLUG_TO_NAME: Record<string, string> = {
  wordpress: "WordPress",
  web: "Web",
  mobile: "Mobile",
  seo: "SEO",
  outils: "Outils",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_META[slug];
  if (!cat) return {};

  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `${BASE_URL}/blog/category/${slug}` },
    openGraph: {
      title: cat.title,
      description: cat.description,
      url: `${BASE_URL}/blog/category/${slug}`,
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  if (!meta) notFound();

  const categoryName = SLUG_TO_NAME[slug];
  const posts = getPublishedPosts().filter((p) => p.category === categoryName);
  if (posts.length === 0) notFound();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          {
            name: `Catégorie : ${meta.name}`,
            url: `${BASE_URL}/blog/category/${slug}`,
          },
        ]}
      />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Tous les articles
          </Link>
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-6">
              Catégorie · {meta.name}
            </Eyebrow>
            <h1 className="text-display">
              {posts.length} article{posts.length > 1 ? "s" : ""}{" "}
              <em>{meta.name}</em>.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              {meta.intro}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--border)] py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-[var(--background)] hover:bg-[var(--surface)] transition-colors flex flex-col"
              >
                {post.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-caption mb-3">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-h4 mb-3 flex-1">{post.title}</h2>
                  <span className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)] mt-2">
                    Lire l&apos;article
                    <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Vous avez un projet <em>{meta.name}</em> ?
          </>
        }
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}

export { CATEGORY_SLUGS };
