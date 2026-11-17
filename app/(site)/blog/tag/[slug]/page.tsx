import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getPublishedPosts, getIndexableTagSlugs, getOriginalTagFromSlug, slugifyTag } from "@/lib/content/posts";

// ISR : revalide toutes les heures → tags se mettent à jour avec les
// nouveaux articles à leur date de publication.
export const revalidate = 3600;

const BASE_URL = "https://krealabs.fr";



interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getIndexableTagSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getOriginalTagFromSlug(slug);
  if (!tag) return {};

  const posts = (await getPublishedPosts()).filter((p) =>
    p.tags.some((t) => slugifyTag(t) === slug),
  );

  const isThin = posts.length < 3;

  return {
    title: `${tag} - Articles Krealabs (${posts.length})`,
    description: `${posts.length} article${posts.length > 1 ? "s" : ""} sur "${tag}" écrits par l'équipe Krealabs, agence digitale à Rouen.`,
    alternates: { canonical: `${BASE_URL}/blog/tag/${slug}` },
    robots: isThin ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${tag} - Articles Krealabs`,
      description: `${posts.length} article${posts.length > 1 ? "s" : ""} sur "${tag}" écrits par l'équipe Krealabs, agence digitale à Rouen.`,
      url: `${BASE_URL}/blog/tag/${slug}`,
      type: "website",
    },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = await getOriginalTagFromSlug(slug);
  if (!tag) notFound();

  const posts = (await getPublishedPosts()).filter((p) =>
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
          <ol className="journal-index">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="journal-row group">
                  <span className="journal-meta">{post.date}</span>
                  <span className="journal-cat">{post.category}</span>
                  <span>
                    <span className="journal-row-title">{post.title}</span>
                    <span className="journal-excerpt">{post.excerpt}</span>
                  </span>
                  <span className="journal-meta text-right">{post.readTime}</span>
                </Link>
              </li>
            ))}
          </ol>
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
