import { ArrowDown } from "lucide-react";

import type { Project } from "@/lib/projects";

/**
 * A project in the /clients strip. It links down to the full case study
 * (#slug), which keeps the anchors used from the home and service pages.
 * The name is not a heading: the case study below carries the h2.
 */
export function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <a href={`#${project.slug}`} className="promise-card group">
      <div className="flex items-center justify-between gap-4">
        <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--muted-foreground)]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="text-caption truncate">{project.sector}</span>
      </div>
      <div>
        <p className="text-caption mb-4">{project.format}</p>
        <p className="text-h1">{project.name}</p>
        <p className="text-body text-[var(--muted-foreground)] mt-5 max-w-md">{project.summary}</p>
        <span className="home-text-link mt-8 group-hover:text-[var(--accent)]">
          Voir la fiche
          <ArrowDown className="size-4" aria-hidden />
        </span>
      </div>
    </a>
  );
}
