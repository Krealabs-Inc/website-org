"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";
import { blogPosts } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Tous", "WordPress", "Web", "Mobile", "SEO", "Outils"];

export default function BlogPage() {
  const [active, setActive] = useState("Tous");

  const featured = useMemo(
    () => blogPosts.find((p) => p.featured),
    [],
  );
  const list = useMemo(() => {
    const others = blogPosts.filter((p) => p !== featured);
    return active === "Tous" ? others : others.filter((p) => p.category === active);
  }, [active, featured]);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Journal · Krealabs</Eyebrow>
            <h1 className="text-display">
              Notes & <em>réflexions</em>
              <br />
              sur le web moderne.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Articles techniques, retours d'expérience, veille sur les
              technologies que nous utilisons au quotidien chez Krealabs.
            </p>
          </div>
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="border-t border-[var(--border)]">
        <Container>
          <div className="py-8 flex flex-wrap items-center gap-2">
            <Eyebrow className="mr-2 hidden md:inline-flex">Filtrer</Eyebrow>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-body-sm transition-colors",
                  active === cat
                    ? "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-subtle)]"
                    : "bg-[var(--surface)] text-[var(--muted-foreground)] border border-[var(--border)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      {featured && active === "Tous" && (
        <section className="border-t border-[var(--border)]">
          <Container>
            <div className="py-10">
              <Eyebrow number="01" className="mb-6">Article à la une</Eyebrow>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:bg-[var(--surface-hover)] transition-colors"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-[var(--background)]">
                    {featured.image && (
                      <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        priority
                        fetchPriority="high"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                    )}
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4">
                      {featured.category}
                    </Badge>
                    <h2 className="text-h2 mb-4 group-hover:text-[var(--accent)] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-body text-[var(--muted-foreground)] mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-5 text-caption mb-8">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {featured.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5" />
                        {featured.readTime}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)]">
                      Lire l'article
                      <ArrowUpRight className="size-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* GRID */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <Eyebrow number="02" className="mb-8">
            {active === "Tous" ? "Tous les articles" : `Articles · ${active}`}
          </Eyebrow>

          {list.length === 0 ? (
            <p className="text-body text-[var(--muted-foreground)] py-20 text-center">
              Aucun article dans cette catégorie pour l'instant.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors"
                >
                  {post.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background)]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <Badge variant="secondary" className="w-fit mb-4">{post.category}</Badge>
                    <h3 className="text-h4 mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-body-sm text-[var(--muted-foreground)] line-clamp-3 mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                      <span className="text-caption inline-flex items-center gap-1.5">
                        <Clock className="size-3" />
                        {post.readTime}
                      </span>
                      <ArrowUpRight className="size-4 text-[var(--subtle-foreground)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Une question <em>technique</em> ?
          </>
        }
        description="Au-delà des articles, nous sommes disponibles pour répondre à vos questions sur vos projets web et mobile."
        primaryLabel="Nous contacter"
      />
    </main>
  );
}
