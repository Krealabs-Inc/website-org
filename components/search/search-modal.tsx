"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";
import Fuse from "fuse.js";

import { cn } from "@/lib/utils";
import { SEARCH_INDEX, type SearchItem } from "@/lib/search-index";

/**
 * Modal de recherche globale Cmd+K (Ctrl+K sur Windows).
 * Fuse.js pour fuzzy match sur title, excerpt, keywords.
 * Index pré-compilé au build, pas de fetch supplémentaire.
 */
export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fuse instance mémorisée (l'index est statique)
  const fuse = useMemo(
    () =>
      new Fuse(SEARCH_INDEX, {
        keys: [
          { name: "title", weight: 3 },
          { name: "keywords", weight: 2 },
          { name: "excerpt", weight: 1 },
        ],
        threshold: 0.35,
        minMatchCharLength: 2,
        ignoreLocation: true,
      }),
    [],
  );

  // Raccourci clavier Cmd+K / Ctrl+K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const cmd = isMac ? e.metaKey : e.ctrlKey;
      if (cmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Focus auto sur l'input quand ouvert
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) {
      setQuery("");
    }
  }, [open]);

  // Bloque le scroll du body quand modal ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query, { limit: 8 }).map((r) => r.item);
  }, [query, fuse]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of results) {
      const arr = map.get(item.category) || [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return Array.from(map.entries());
  }, [results]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Rechercher (Cmd+K)"
        className="fixed bottom-6 left-6 z-[40] size-12 rounded-full bg-[var(--accent)] text-[#0a0a0a] shadow-lg shadow-[var(--accent)]/30 hover:bg-[var(--accent)]/90 transition-colors items-center justify-center hidden md:flex"
      >
        <Search className="size-5" />
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-[90] flex items-start justify-center pt-[10vh] px-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden">
        {/* Header avec input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)]">
          <Search className="size-5 text-[var(--muted-foreground)] shrink-0" />
          <input
            id="search-modal-title"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher sur Krealabs..."
            className="flex-1 bg-transparent text-h4 placeholder:text-[var(--muted-foreground)] focus:outline-none"
          />
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="size-7 rounded-full hover:bg-[var(--surface-hover)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Résultats */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!query.trim() && (
            <div className="p-8 text-center text-body-sm text-[var(--muted-foreground)]">
              <p className="mb-4">
                Cherchez parmi {SEARCH_INDEX.length} pages, articles et
                définitions.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-caption">
                <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--background)]">
                  WordPress
                </span>
                <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--background)]">
                  SEO Rouen
                </span>
                <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--background)]">
                  Next.js
                </span>
                <span className="px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--background)]">
                  Prix
                </span>
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="p-8 text-center text-body-sm text-[var(--muted-foreground)]">
              Aucun résultat pour «&nbsp;{query}&nbsp;».
            </div>
          )}

          {grouped.map(([cat, items]) => (
            <div key={cat} className="border-b border-[var(--border)] last:border-b-0">
              <div className="px-5 py-2 text-eyebrow text-[var(--muted-foreground)] bg-[var(--surface-hover)]/30">
                {cat}
              </div>
              {items.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  onClick={() => setOpen(false)}
                  className="group block px-5 py-3 hover:bg-[var(--surface-hover)] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-body font-medium text-[var(--foreground)] mb-1 truncate">
                        {item.title}
                      </p>
                      <p className="text-body-sm text-[var(--muted-foreground)] line-clamp-1">
                        {item.excerpt}
                      </p>
                    </div>
                    <ArrowRight
                      className={cn(
                        "size-4 text-[var(--muted-foreground)] mt-1 shrink-0 transition-transform",
                        "group-hover:translate-x-0.5 group-hover:text-[var(--accent)]",
                      )}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Footer raccourcis */}
        <div className="px-5 py-3 border-t border-[var(--border)] bg-[var(--surface-hover)]/30 flex items-center justify-between text-caption">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--background)] font-mono text-[10px]">
                Esc
              </kbd>
              fermer
            </span>
          </div>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded border border-[var(--border)] bg-[var(--background)] font-mono text-[10px]">
              ⌘K
            </kbd>
            ouvrir
          </span>
        </div>
      </div>
    </div>
  );
}
