"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Group {
  title: string;
  items: { question: string; answer: string }[];
}

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** Wraps the matched words in <mark>. */
function Highlight({ text, words }: { text: string; words: string[] }) {
  if (words.length === 0) return <>{text}</>;
  const folded = fold(text);
  const marks: [number, number][] = [];
  for (const w of words) {
    let i = folded.indexOf(w);
    while (i !== -1) {
      marks.push([i, i + w.length]);
      i = folded.indexOf(w, i + w.length);
    }
  }
  if (marks.length === 0) return <>{text}</>;
  marks.sort((a, b) => a[0] - b[0]);
  const out: React.ReactNode[] = [];
  let at = 0;
  marks.forEach(([s, e], k) => {
    if (s < at) return;
    out.push(text.slice(at, s), <mark key={k}>{text.slice(s, e)}</mark>);
    at = e;
  });
  out.push(text.slice(at));
  return <>{out}</>;
}

/**
 * FAQ signature: the search comes first. Typing filters the questions
 * live (accents ignored) and opens the matching answers; nothing found
 * leads straight to asking us.
 */
export function FaqSearch({ groups }: { groups: Group[] }) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string | null>(null);
  const words = useMemo(() => fold(q).split(/\s+/).filter((w) => w.length > 2), [q]);

  const results = groups
    .filter((g) => !group || g.title === group)
    .map((g) => ({
      ...g,
      items: g.items.filter((it) => words.every((w) => fold(`${it.question} ${it.answer}`).includes(w))),
    }))
    .filter((g) => g.items.length > 0);
  const count = results.reduce((n, g) => n + g.items.length, 0);
  const searching = words.length > 0;

  return (
    <div>
      <label className="faq-search">
        <Search className="size-6 shrink-0 text-[var(--accent)]" aria-hidden />
        <span className="sr-only">Rechercher dans les questions</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Posez votre question : délais, prix, WordPress…" autoComplete="off" />
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {[null, ...groups.map((g) => g.title)].map((t) => (
          <button key={t ?? "all"} type="button" aria-pressed={group === t} onClick={() => setGroup(t)} className={cn("faq-chip", group === t && "is-on")}>
            {t ?? "Tout"}
          </button>
        ))}
        <p className="ml-auto text-caption" aria-live="polite">
          {count} réponse{count > 1 ? "s" : ""}
        </p>
      </div>

      {count === 0 ? (
        <div className="faq-empty">
          <p className="text-h3">Pas encore de réponse à cette question.</p>
          <p className="text-body text-[var(--muted-foreground)] mt-3">Posez-la nous directement : nous vous répondons sous 24h ouvrées.</p>
          <Link href="/contact?type=contact" className="mt-6 inline-flex items-center gap-2 text-body font-medium text-[var(--accent)]">
            Poser ma question
            <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 space-y-12">
          {results.map((g) => (
            <section key={g.title}>
              <p className="text-caption mb-3">{g.title}</p>
              <div className="faq-list">
                {g.items.map((it) => (
                  <details key={it.question} open={searching || undefined} className="faq-item">
                    <summary>
                      <span>
                        <Highlight text={it.question} words={words} />
                      </span>
                      <span aria-hidden className="faq-plus">+</span>
                    </summary>
                    <p>
                      <Highlight text={it.answer} words={words} />
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
