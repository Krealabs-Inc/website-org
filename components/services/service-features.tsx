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
}

export function ServiceFeatures({
  eyebrow,
  number,
  title,
  intro,
  features,
  columns = 3,
}: ServiceFeaturesProps) {
  const colClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3";
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

        <div className={`grid grid-cols-1 ${colClass} gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden`}>
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="bg-[var(--background)] p-8">
                <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-6">
                  <Icon className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                </div>
                <h3 className="text-h4 mb-2">{f.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
