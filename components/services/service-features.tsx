import { type LucideIcon } from "lucide-react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { HorizontalStrip } from "@/components/patterns/horizontal-strip";

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
  /** Conservés pour compatibilité : la bande horizontale remplace la grille. */
  columns?: 2 | 3;
  layout?: "columns" | "list";
}

function FeatureCard({ feature, index, total }: { feature: FeatureItem; index: number; total: number }) {
  const Icon = feature.icon;
  return (
    <article className="promise-card">
      <div className="flex items-center justify-between">
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[var(--accent)]">
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--muted-foreground)]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div>
        <h3 className="text-h2">{feature.title}</h3>
        <p className="text-body text-[var(--muted-foreground)] mt-5 max-w-md">{feature.description}</p>
      </div>
    </article>
  );
}

/** What the client gets, as a horizontal strip of cards (Défilement). */
export function ServiceFeatures({ eyebrow, number, title, intro, features }: ServiceFeaturesProps) {
  return (
    <HorizontalStrip
      itemClassName="h-[min(56vh,440px)] w-[min(440px,82vw)]"
      intro={
        <>
          <Eyebrow number={number} className="mb-6">{eyebrow}</Eyebrow>
          <h2 className="text-h1">{title}</h2>
          {intro && <p className="text-body text-[var(--muted-foreground)] mt-6 max-w-md">{intro}</p>}
        </>
      }
    >
      {features.map((feature, i) => (
        <FeatureCard key={feature.title} feature={feature} index={i} total={features.length} />
      ))}
    </HorizontalStrip>
  );
}
