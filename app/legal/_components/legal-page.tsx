import * as React from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

const otherPages = [
  { label: "Mentions légales", href: "/legal/mentions-legales" },
  { label: "Politique de confidentialité", href: "/legal/politique-confidentialite" },
  { label: "CGV", href: "/legal/cgv" },
];

export function LegalPage({
  eyebrow,
  title,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div
          className="absolute inset-0 bg-grid bg-grid-fade opacity-40"
          aria-hidden
        />
        <Container className="relative">
          <div className="max-w-3xl">
            <Eyebrow dot className="mb-6">
              {eyebrow}
            </Eyebrow>
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-[-0.04em] leading-[0.98]">
              {title}
            </h1>
            <p className="text-caption text-[var(--muted-foreground)] mt-6">
              Dernière mise à jour : {lastUpdated}
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <article
            className="max-w-3xl
              [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:text-[var(--foreground)]
              [&_h3]:text-base [&_h3]:md:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-[var(--foreground)]
              [&_p]:text-body [&_p]:text-[var(--muted-foreground)] [&_p]:mb-4 [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ul]:text-[var(--muted-foreground)] [&_ul]:text-body
              [&_a]:text-[var(--foreground)] [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-[var(--border-strong)] [&_a:hover]:text-[var(--accent)] [&_a:hover]:decoration-[var(--accent)]
              [&_strong]:text-[var(--foreground)] [&_strong]:font-semibold
              [&_em]:italic
              [&_h2:first-child]:mt-0"
          >
            {children}
          </article>

          <aside className="max-w-3xl mt-20 pt-10 border-t border-[var(--border)]">
            <p className="text-caption text-[var(--muted-foreground)] mb-4">
              Autres pages légales
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {otherPages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-body-sm text-[var(--foreground)] underline underline-offset-4 decoration-[var(--border-strong)] hover:decoration-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>
    </main>
  );
}

/**
 * Marqueur visuel pour les valeurs à remplir avant publication.
 * Utiliser : <Placeholder>SIRET</Placeholder>
 */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 mx-0.5 rounded-md bg-[color:rgba(143,153,237,0.12)] border border-[color:rgba(143,153,237,0.3)] text-[var(--accent)] font-mono text-[0.85em] not-italic">
      {`{{${children}}}`}
    </span>
  );
}
