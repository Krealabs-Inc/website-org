import type { Metadata } from "next";
import Link from "next/link";
import { Search as SearchIcon, ArrowUpRight } from "lucide-react";
import Fuse from "fuse.js";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { SEARCH_INDEX, type SearchItem } from "@/lib/search-index";

// SSR-only : route SEO pour SearchAction schema (sitelinks search box).
// Pas d'ISR — chaque visite filtre l'index en mémoire.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Recherche",
  description:
    "Rechercher dans le site Krealabs : articles, services, lexique, comparateurs, pages locales.",
  alternates: { canonical: "https://krealabs.fr/search" },
  // Les pages de résultats ne doivent pas peupler l'index Google
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = (q || "").trim();

  const results = query ? runSearch(query) : [];
  const grouped = groupByCategory(results);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 min-h-screen">
      <Container>
        <header className="max-w-3xl mb-12">
          <Eyebrow dot className="mb-6">
            Recherche
          </Eyebrow>
          <h1 className="text-display">
            {query ? (
              <>
                Résultats pour <em>« {query} »</em>
              </>
            ) : (
              <>
                Cherchez <em>quelque chose</em>.
              </>
            )}
          </h1>
          {query && (
            <p className="text-body-lg text-[var(--muted-foreground)] mt-6">
              {results.length === 0
                ? "Aucun résultat. Essayez un autre terme ou parcourez les sections ci-dessous."
                : `${results.length} résultat${results.length > 1 ? "s" : ""} trouvé${results.length > 1 ? "s" : ""}.`}
            </p>
          )}
        </header>

        {/* Form (GET pour rester crawlable) */}
        <form
          action="/search"
          method="get"
          className="mb-12 flex gap-2 max-w-2xl"
          role="search"
        >
          <label className="sr-only" htmlFor="search-input">
            Rechercher
          </label>
          <div className="relative flex-1">
            <SearchIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[var(--muted-foreground)]"
              aria-hidden
            />
            <input
              id="search-input"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Wordpress, Next.js, Rouen, SEO..."
              className="w-full pl-11 pr-4 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] text-body focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-3 rounded-[var(--radius)] bg-[var(--accent)] text-[#0a0a0a] font-medium hover:bg-[var(--accent)]/90 transition-colors"
          >
            Chercher
          </button>
        </form>

        {/* Results */}
        {query && grouped.length > 0 && (
          <div className="space-y-12">
            {grouped.map(([category, items]) => (
              <section key={category}>
                <h2 className="text-h4 mb-5 flex items-baseline gap-3">
                  <span>{category}</span>
                  <span className="text-caption text-[var(--muted-foreground)]">
                    {items.length} résultat{items.length > 1 ? "s" : ""}
                  </span>
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
                  {items.map((item) => (
                    <li key={item.url} className="bg-[var(--background)]">
                      <Link
                        href={item.url}
                        className="group flex items-start justify-between gap-4 p-5 hover:bg-[var(--surface-hover)] transition-colors"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-body font-medium mb-1 group-hover:text-[var(--accent)] transition-colors">
                            {item.title}
                          </p>
                          <p className="text-body-sm text-[var(--muted-foreground)] line-clamp-2">
                            {item.excerpt}
                          </p>
                        </div>
                        <ArrowUpRight className="size-4 text-[var(--muted-foreground)] shrink-0 mt-1 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {/* Fallback / suggestions when no query */}
        {!query && (
          <section className="space-y-8">
            <p className="text-body text-[var(--muted-foreground)] max-w-2xl">
              Vous pouvez aussi parcourir directement les sections du site :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl">
              {SUGGESTIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex items-center justify-between p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Badge variant="outline">{s.badge}</Badge>
                    <span className="text-body-sm font-medium">{s.label}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}

const SUGGESTIONS = [
  { href: "/services", label: "Tous les services", badge: "Service" },
  { href: "/blog", label: "Articles du blog", badge: "Article" },
  { href: "/comparateur", label: "Comparateurs techniques", badge: "Compare" },
  { href: "/lexique", label: "Lexique du web", badge: "Lexique" },
  { href: "/agence-web-rouen", label: "Agence web à Rouen", badge: "Ville" },
  { href: "/clients", label: "Travaux clients", badge: "Page" },
];

function runSearch(query: string): SearchItem[] {
  const fuse = new Fuse(SEARCH_INDEX, {
    keys: [
      { name: "title", weight: 3 },
      { name: "keywords", weight: 2 },
      { name: "excerpt", weight: 1 },
    ],
    threshold: 0.35,
    minMatchCharLength: 2,
    ignoreLocation: true,
  });
  return fuse.search(query, { limit: 30 }).map((r) => r.item);
}

function groupByCategory(items: SearchItem[]): [string, SearchItem[]][] {
  const map = new Map<string, SearchItem[]>();
  for (const item of items) {
    const arr = map.get(item.category) || [];
    arr.push(item);
    map.set(item.category, arr);
  }
  return Array.from(map.entries());
}
