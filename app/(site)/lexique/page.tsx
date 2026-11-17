import { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { GLOSSARY, GLOSSARY_SLUGS } from "@/lib/glossary";

export const metadata: Metadata = {
  title: "Lexique du web - Définitions techniques",
  description:
    "Lexique technique web : headless WordPress, Core Web Vitals, schema.org, SEO local, Next.js, TypeScript, Lighthouse, E-E-A-T... Définitions claires par une agence web à Rouen.",
  alternates: { canonical: "https://krealabs.fr/lexique" },
  openGraph: {
    title: "Lexique du web - Définitions techniques - Krealabs",
    description:
      "Lexique technique web : headless WordPress, Core Web Vitals, schema.org, SEO local, Next.js, TypeScript, Lighthouse, E-E-A-T... Définitions claires par une agence web à Rouen.",
    url: "https://krealabs.fr/lexique",
    type: "website",
  },
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const initial = (term: string) => term.normalize("NFD").replace(/[\u0300-\u036f]/g, "").charAt(0).toUpperCase();

export default function LexiqueIndexPage() {
  const entries = GLOSSARY_SLUGS.map((s) => GLOSSARY[s]).sort((a, b) => a.term.localeCompare(b.term, "fr"));
  const letters = new Map<string, typeof entries>();
  for (const e of entries) {
    const l = /[A-Z]/.test(initial(e.term)) ? initial(e.term) : "#";
    letters.set(l, [...(letters.get(l) ?? []), e]);
  }

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HEAD */}
      <section className="pt-32 pb-12 md:pt-40">
        <Container>
          <Eyebrow dot className="mb-6">Lexique · {entries.length} définitions</Eyebrow>
          <h1 className="text-display">
            Le <em>web technique</em> en clair.
          </h1>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
            Les termes que nous employons en agence, expliqués simplement : pour comprendre les choix techniques que nous vous proposons.
          </p>
        </Container>
      </section>

      {/* DICTIONARY: letters on a rail, entries beside */}
      <section className="border-t border-[var(--border)] pb-24">
        <Container>
          <div className="dict">
            <nav className="dict-rail" aria-label="Aller à la lettre">
              {ALPHABET.map((l) =>
                letters.has(l) ? (
                  <a key={l} href={`#lettre-${l}`}>{l}</a>
                ) : (
                  <span key={l} aria-hidden>{l}</span>
                ),
              )}
            </nav>
            <div>
              {[...letters.entries()].map(([letter, items]) => (
                <section key={letter} id={`lettre-${letter}`} className="dict-letter scroll-mt-24" aria-label={`Lettre ${letter}`}>
                  <p className="dict-initial" aria-hidden>{letter}</p>
                  <ul>
                    {items.map((entry) => (
                      <li key={entry.slug}>
                        <Link href={`/lexique/${entry.slug}`} className="dict-entry group">
                          <span className="dict-term">{entry.term}</span>
                          <span className="dict-cat">{entry.category}</span>
                          <span className="dict-def">{entry.shortDef}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Un projet à <em>discuter</em> ?
          </>
        }
        description="Premier échange offert pour cadrer votre projet - sites, apps, plateformes. On parle technique sans jargon."
        primaryLabel="Prendre rendez-vous"
      />
    </main>
  );
}
