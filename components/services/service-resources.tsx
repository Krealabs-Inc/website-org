import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface ResourceLink {
  href: string;
  title: string;
  /** Petit label de contexte (catégorie / type) */
  kicker?: string;
}

interface ServiceResourcesProps {
  /** Titre de section, balises <em> autorisées */
  title?: React.ReactNode;
  eyebrow?: string;
  articles: ResourceLink[];
}

/**
 * Section "Pour aller plus loin" sur les pages services — câble le hub
 * (page service) vers ses spokes (articles blog). Complète le maillage
 * hub-and-spoke et fait découvrir la profondeur éditoriale depuis les
 * pages commerciales.
 */
export function ServiceResources({
  title = (
    <>
      Pour aller <em>plus loin</em>
    </>
  ),
  eyebrow = "Ressources",
  articles,
}: ServiceResourcesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="section-y border-t border-[var(--border)]">
      <Container>
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h2 className="text-h1 mb-10">{title}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
          {articles.map((a) => (
            <li key={a.href} className="bg-[var(--background)]">
              <Link
                href={a.href}
                className="group flex items-start justify-between gap-4 p-6 hover:bg-[var(--surface-hover)] transition-colors h-full"
              >
                <div className="min-w-0">
                  {a.kicker && (
                    <p className="text-caption mb-1.5">{a.kicker}</p>
                  )}
                  <p className="text-body font-medium group-hover:text-[var(--accent)] transition-colors">
                    {a.title}
                  </p>
                </div>
                <ArrowUpRight className="size-4 shrink-0 mt-1 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
