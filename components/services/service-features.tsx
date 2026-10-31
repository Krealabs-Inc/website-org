import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { type LucideIcon } from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  eyebrow: string;
  number: string;
  /** Titre avec balises <em> autorisées */
  title: React.ReactNode;
  intro?: string;
  features: FeatureItem[];
  /** 2 ou 3 colonnes sur desktop */
  columns?: 2 | 3;
  layout?: "columns" | "list";
}

export function ServiceFeatures({
  eyebrow,
  number,
  title,
  intro,
  features,
  columns = 3,
  layout = "columns",
}: ServiceFeaturesProps) {
  const colClass = columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <section className="section-y border-t border-[var(--border)]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <Eyebrow number={number} className="mb-6">{eyebrow}</Eyebrow>
            <h2 className="text-h1">{title}</h2>
          </div>
          {intro && (
            <p className="text-body text-[var(--muted-foreground)] max-w-md">
              {intro}
            </p>
          )}
        </div>

        <div className={layout === "list" ? "service-feature-list" : `grid grid-cols-1 ${colClass} gap-x-10 gap-y-0`}>
          {features.map((feature, index) => (
            <article key={feature.title} className="editorial-entry">
              <span className="editorial-ordinal" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-h4 mb-3">{feature.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
