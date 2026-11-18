"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";

import { Container } from "@/components/ui/container";
import { closest } from "@/lib/site-routes";

/**
 * The 404 as a compass: the address that failed, crossed out, then the
 * three real pages closest to it. `search` shows the ⌘K shortcut, only
 * where the site's search modal is mounted.
 */
export function Compass({ search = true }: { search?: boolean }) {
  const path = usePathname() ?? "/";
  const hits = closest(path);
  const openSearch = () =>
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true, bubbles: true }));
  return (
    <main className="nf-compass bg-[var(--background)] text-[var(--foreground)]">
      <Container size="narrow">
        <p className="nf-address" aria-label="Adresse demandée">
          <span className="text-[var(--subtle-foreground)]">krealabs.fr</span>
          <span className="nf-address-path">{path}</span>
          <span className="nf-address-code">404</span>
        </p>
        <h1 className="text-display mt-10">
          Cette adresse ne mène <em>nulle part</em>.
        </h1>
        <p className="text-body-lg text-[var(--muted-foreground)] mt-6 max-w-xl">
          Un lien ancien, une faute de frappe, une page déplacée. Voici celles qui ressemblent le plus à ce que vous cherchiez.
        </p>
        <ol className="nf-hits">
          {hits.map((h, i) => (
            <li key={h.href} style={{ "--i": i } as React.CSSProperties}>
              <Link href={h.href} className="nf-hit">
                <span className="text-caption">{i === 0 ? "Le plus proche" : `Piste ${i + 1}`}</span>
                <span className="text-h3">{h.label}</span>
                <span className="nf-hit-href">{h.href}</span>
                <ArrowRight className="nf-hit-arrow size-5" aria-hidden />
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          {search && (
            <button type="button" onClick={openSearch} className="nf-search">
              <Search className="size-4" aria-hidden />
              Chercher sur le site
              <kbd>⌘K</kbd>
            </button>
          )}
          <Link href="/" className="home-text-link">
            Retour à l’accueil
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </main>
  );
}
