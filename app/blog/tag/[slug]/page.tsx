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
import { blogPosts, getPublishedPosts } from "@/lib/blog-data";

// ISR : revalide toutes les heures → tags se mettent à jour avec les
// nouveaux articles à leur date de publication.
export const revalidate = 3600;

const BASE_URL = "https://krealabs.fr";

/** Slugify un tag pour l'URL */
function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Map slug → tag original (premier match trouvé parmi posts publiés) */
function getOriginalTagFromSlug(slug: string): string | null {
  for (const post of getPublishedPosts()) {
    for (const tag of post.tags) {
      if (slugifyTag(tag) === slug) return tag;
    }
  }
  return null;
}

/** Threshold : on n'expose que les tags présents dans ≥3 articles (évite thin content) */
const MIN_ARTICLES_PER_TAG = 3;

function getIndexableTagSlugs(): string[] {
  const counter = new Map<string, { tag: string; count: number }>();
  // Note : on inclut blogPosts ENTIER ici pour pré-générer les routes statiques
  // de tous les tags qui finiront indexables. Le filtre par date se fait dans
  // le rendu de chaque page (BlogTagPage).
  for (const post of blogPosts) {
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      if (!slug) continue;
      const existing = counter.get(slug);
      if (existing) existing.count++;
      else counter.set(slug, { tag, count: 1 });
    }
  }
  return Array.from(counter.entries())
    .filter(([, v]) => v.count >= MIN_ARTICLES_PER_TAG)
    .map(([slug]) => slug);
}

export const INDEXABLE_TAG_SLUGS = getIndexableTagSlugs();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDEXABLE_TAG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getOriginalTagFromSlug(slug);
  if (!tag) return {};

  const posts = getPublishedPosts().filter((p) =>
    p.tags.some((t) => slugifyTag(t) === slug),
  );

  const isThin = posts.length < MIN_ARTICLES_PER_TAG;

  return {
    title: `${tag} — Articles Krealabs (${posts.length})`,
    description: `${posts.length} article${posts.length > 1 ? "s" : ""} sur "${tag}" écrits par l'équipe Krealabs, agence digitale à Rouen.`,
    alternates: { canonical: `${BASE_URL}/blog/tag/${slug}` },
    robots: isThin ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${tag} — Articles Krealabs`,
      url: `${BASE_URL}/blog/tag/${slug}`,
      type: "website",
    },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getOriginalTagFromSlug(slug);
  if (!tag) notFound();

  const posts = getPublishedPosts().filter((p) =>
    p.tags.some((t) => slugifyTag(t) === slug),
  );
  if (posts.length === 0) notFound();

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: BASE_URL },
          { name: "Blog", url: `${BASE_URL}/blog` },
          {
            name: `Tag : ${tag}`,
            url: `${BASE_URL}/blog/tag/${slug}`,
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
              Tag · {tag}
            </Eyebrow>
            <h1 className="text-display">
              {posts.length} article{posts.length > 1 ? "s" : ""}{" "}
              <em>« {tag} »</em>.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Articles écrits par l&apos;équipe Krealabs couvrant{" "}
              <strong className="text-[var(--foreground)]">{tag}</strong>.
              Retours d&apos;expérience, méthodes, points de vue d&apos;une agence
              digitale à Rouen.
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
            On parle de votre <em>projet</em> ?
          </>
        }
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
