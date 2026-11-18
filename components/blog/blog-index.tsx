"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageCta } from "@/components/services/page-cta";
import type { PageValues } from "@/lib/page-texts/define";
import type { BLOG_PAGE } from "@/lib/page-texts/blog-page";
import type { BlogPost } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Tous", "WordPress", "Web", "Mobile", "SEO", "Outils"];

/** Blog index (client: section tabs). Articles come from the server page. */
export function BlogIndex({ published, t }: { published: BlogPost[]; t: PageValues<typeof BLOG_PAGE> }) {
  const [active, setActive] = useState("Tous");

  // Filtre par date de publication (articles futurs invisibles)

  const featured = useMemo(
    () => published.find((p) => p.featured),
    [published],
  );
  const list = useMemo(() => {
    const others = published.filter((p) => p !== featured);
    return active === "Tous" ? others : others.filter((p) => p.category === active);
  }, [active, featured, published]);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* MASTHEAD: a journal, not a card grid */}
      <section className="pt-32 md:pt-40">
        <Container>
          <div className="journal-mast">
            <p className="text-caption">{t.mastLeft}</p>
            <h1 className="journal-title">{t.title}</h1>
            <p className="text-caption">{published.length} articles</p>
          </div>
          <p className="text-body-lg text-[var(--muted-foreground)] mx-auto mt-8 max-w-2xl text-center">{t.intro}</p>
          <nav className="journal-tabs" aria-label="Rubriques">
            {CATEGORIES.map((cat) => (
              <button key={cat} type="button" onClick={() => setActive(cat)} aria-pressed={active === cat} className={cn("journal-tab", active === cat && "is-active")}>
                {cat}
              </button>
            ))}
          </nav>
        </Container>
      </section>

      {/* LEAD STORY */}
      {featured && active === "Tous" && (
        <section>
          <Container>
            <Link href={`/blog/${featured.slug}`} className="journal-lead group">
              <div>
                <p className="text-caption">À la une · {featured.category}</p>
                <h2 className="journal-lead-title">{featured.title}</h2>
                <p className="text-body-lg text-[var(--muted-foreground)] mt-6">{featured.excerpt}</p>
                <p className="mt-8 inline-flex items-center gap-4 text-caption">
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                  <span className="inline-flex items-center gap-1.5 text-[var(--accent)]">
                    Lire
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </p>
              </div>
              {featured.image && (
                <div className="journal-lead-image">
                  <Image src={featured.image} alt="" fill priority fetchPriority="high" sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </div>
              )}
            </Link>
          </Container>
        </section>
      )}

      {/* INDEX: the table of contents */}
      <section className="section-y">
        <Container>
          <p className="text-caption mb-4">{active === "Tous" ? "Sommaire" : `Rubrique · ${active}`}</p>
          {list.length === 0 ? (
            <p className="text-body text-[var(--muted-foreground)] py-20 text-center">{t.empty}</p>
          ) : (
            <ol className="journal-index">
              {list.map((post) => (
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
          )}
        </Container>
      </section>

      <PageCta t={t} />
    </main>
  );
}
