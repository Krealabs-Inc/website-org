import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Tag, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { ShareButton } from "@/components/blog/share-button";
import { MarkdownText } from "@/components/blog/markdown-text";
import {
  blogPosts,
  frenchDateToISO,
  getPublishedPosts,
  isPostPublished,
} from "@/lib/blog-data";
import { TEAM } from "@/lib/team";

const SITE_URL = "https://krealabs.fr";

// ISR : régénère toutes les heures pour que les articles à publication
// différée deviennent visibles à leur date prévue, même sans visiteur.
export const revalidate = 3600;

// ============================================================
// STATIC PARAMS — un fichier par article publié au build
// ============================================================

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

// ============================================================
// METADATA — OpenGraph, Twitter, canonical par article
// ============================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const isoDate = frenchDateToISO(post.date);
  const isoModified = post.updatedAt
    ? frenchDateToISO(post.updatedAt)
    : isoDate;
  const image = post.image
    ? [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ]
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name, url: `${SITE_URL}/equipe` }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "Krealabs",
      locale: "fr_FR",
      publishedTime: isoDate,
      modifiedTime: isoModified,
      authors: [post.author.name],
      tags: post.tags,
      section: post.category,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@krealabs_",
      site: "@krealabs_",
      images: post.image ? [post.image] : undefined,
    },
  };
}

// ============================================================
// PAGE
// ============================================================

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  // 404 si l'article n'existe pas OU s'il n'est pas encore publié
  if (!post || !isPostPublished(post)) notFound();

  const publishedPosts = getPublishedPosts();
  const url = `${SITE_URL}/blog/${post.slug}`;
  const isoDate = frenchDateToISO(post.date);
  const isoModifiedDate = post.updatedAt
    ? frenchDateToISO(post.updatedAt)
    : isoDate;
  const wasUpdated = post.updatedAt && isoModifiedDate !== isoDate;
  const wordCount =
    post.content.introduction.split(/\s+/).length +
    post.content.sections.reduce(
      (sum, s) => sum + s.content.split(/\s+/).length + (s.code?.split(/\s+/).length ?? 0),
      0,
    ) +
    post.content.conclusion.split(/\s+/).length;

  const relatedPosts = publishedPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  // Si pas assez de related par catégorie, compléter avec d'autres
  const fillRelated =
    relatedPosts.length < 3
      ? publishedPosts.filter((p) => p.slug !== post.slug && !relatedPosts.includes(p)).slice(0, 3 - relatedPosts.length)
      : [];
  const allRelated = [...relatedPosts, ...fillRelated];

  // ===== Schema.org Article =====
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : undefined,
    datePublished: isoDate,
    dateModified: isoModifiedDate,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: (() => {
        const member = TEAM.find((m) => m.name === post.author.name);
        return member ? `${SITE_URL}/equipe/${member.slug}` : `${SITE_URL}/equipe`;
      })(),
    },
    // Référence à l'org émise sur / et /notre-histoire. Pas de duplication.
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount,
    inLanguage: "fr-FR",
  };

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url },
        ]}
      />
      {/* ========== HERO IMAGE + TITLE ========== */}
      <header className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        {/* Background image with overlay */}
        {post.image && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/40 via-[var(--background)]/80 to-[var(--background)]" />
          </div>
        )}

        <Container size="narrow">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
          >
            <ArrowLeft className="size-3.5" />
            Retour au blog
          </Link>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{post.category}</Badge>
              {post.featured && <Badge variant="default">À la une</Badge>}
            </div>

            <h1 className="text-display !leading-[1.05]">{post.title}</h1>

            <p className="text-body-lg text-[var(--muted-foreground)] max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-body-sm text-[var(--muted-foreground)]">
              <time dateTime={isoDate} className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {post.date}
              </time>
              {wasUpdated && (
                <time
                  dateTime={isoModifiedDate}
                  className="inline-flex items-center gap-1.5 text-[var(--accent)]"
                  title="Date de dernière mise à jour"
                >
                  <span className="size-1.5 rounded-full bg-[var(--accent)]" />
                  Mis à jour le {post.updatedAt}
                </time>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[var(--accent)]" />
                {wordCount.toLocaleString("fr-FR")} mots
              </span>
            </div>
          </div>
        </Container>
      </header>

      {/* ========== AUTHOR + SHARE ========== */}
      <section className="border-y border-[var(--border)] bg-[var(--surface)]/40">
        <Container size="narrow">
          <div className="py-5 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/equipe"
              className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="relative size-10 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-body-sm font-semibold text-[var(--foreground)]">
                  {post.author.name}
                </p>
                <p className="text-caption">{post.author.role}</p>
              </div>
            </Link>

            <ShareButton url={url} title={post.title} description={post.excerpt} />
          </div>
        </Container>
      </section>

      {/* ========== ARTICLE CONTENT ========== */}
      <article className="section-y">
        <Container size="narrow">
          {/* Introduction */}
          <p className="text-body-lg text-[var(--foreground)]/90 leading-relaxed mb-12">
            {post.content.introduction}
          </p>

          {/* Sections */}
          {post.content.sections.map((section, index) => (
            <section key={index} className="mb-12 last:mb-0">
              <h2 className="text-h2 mb-6">
                <span className="text-[var(--accent)] mr-3 text-eyebrow align-middle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <p className="text-body-lg text-[var(--muted-foreground)] leading-relaxed">
                {section.content}
              </p>
              {section.code && (
                <pre className="mt-6 overflow-x-auto rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <code className="text-body-sm font-mono text-[var(--foreground)]/90 whitespace-pre">
                    {section.code}
                  </code>
                </pre>
              )}
            </section>
          ))}

          {/* Conclusion — supporte les liens markdown [texte](/url) */}
          <div className="mt-16 p-8 rounded-[var(--radius)] border-l-4 border-[var(--accent)] bg-[var(--accent-subtle)]/30">
            <Eyebrow className="mb-4">En résumé</Eyebrow>
            <p className="text-body-lg text-[var(--foreground)]/90 leading-relaxed">
              <MarkdownText>{post.content.conclusion}</MarkdownText>
            </p>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-3">
            <Tag className="size-4 text-[var(--muted-foreground)]" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author card */}
          <Link
            href="/equipe"
            className="mt-16 group flex items-start gap-5 p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors"
          >
            <div className="relative size-16 rounded-full overflow-hidden border border-[var(--border)] bg-[var(--background)] shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-caption mb-1">Écrit par</p>
              <p className="text-h4 mb-1">{post.author.name}</p>
              <p className="text-body-sm text-[var(--muted-foreground)] mb-3">
                {post.author.role}
              </p>
              <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-[var(--accent)]">
                Découvrir l'équipe
                <ArrowUpRight className="size-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </Link>
        </Container>
      </article>

      {/* ========== RELATED POSTS ========== */}
      {allRelated.length > 0 && (
        <section className="section-y border-t border-[var(--border)]">
          <Container>
            <Eyebrow className="mb-6">Articles similaires</Eyebrow>
            <h2 className="text-h1 mb-12">
              <em>À lire aussi</em>.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allRelated.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors"
                >
                  {related.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background)]">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <Badge variant="secondary" className="w-fit mb-3">
                      {related.category}
                    </Badge>
                    <h3 className="text-h4 mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-body-sm text-[var(--muted-foreground)] line-clamp-2 mb-4 flex-1">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                      <span className="text-caption inline-flex items-center gap-1.5">
                        <Clock className="size-3" />
                        {related.readTime}
                      </span>
                      <ArrowUpRight className="size-4 text-[var(--subtle-foreground)] group-hover:text-[var(--accent)] transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ========== CTA ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <div className="relative overflow-hidden p-8 md:p-12 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-center">
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" aria-hidden />
            <div className="relative">
              <Eyebrow className="mb-6 justify-center">Parlons projet</Eyebrow>
              <h2 className="text-h1 mb-4">
                Un sujet à <em>creuser</em> ensemble ?
              </h2>
              <p className="text-body-lg text-[var(--muted-foreground)] mb-8 max-w-xl mx-auto">
                Si cet article t'a parlé et que tu as un projet en cours (ou
                naissant), écris-nous — premier échange offert.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" asChild>
                  <Link href="/contact">Discuter d'un projet</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/services">Voir nos services</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
