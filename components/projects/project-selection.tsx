import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface ProjectSelectionProps {
  slugs?: string[];
  title?: React.ReactNode;
  eyebrow?: string;
}

export function ProjectSelection({
  slugs,
  title = <>Des projets concrets, <em>à explorer.</em></>,
  eyebrow = "Réalisations & concepts",
}: ProjectSelectionProps) {
  const projects = slugs ? PROJECTS.filter((project) => slugs.includes(project.slug)) : PROJECTS;
  return (
    <section id="realisations" className="project-selection">
      <Container>
        <div className="project-selection-heading">
          <div>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <h2 className="text-h1">{title}</h2>
          </div>
          <Link href="/clients" className="home-text-link">Voir toutes les réalisations<ArrowRight className="size-4" aria-hidden /></Link>
        </div>
        <div className={`project-preview-grid ${projects.length === 2 ? "project-preview-grid-pair" : projects.length > 3 ? "project-preview-grid-expanded" : ""}`}>
          {projects.map((project) => (
            <article key={project.slug}>
              <Link href={`/clients#${project.slug}`} className="project-preview-link">
                <div className={`project-preview-media project-media-${project.slug}`}>
                  <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw" />
                  <span className="project-preview-action" aria-hidden><ArrowRight className="size-5" /></span>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <h3 className="text-h3">{project.name}</h3>
                </div>
                <p className="text-caption mt-2">{project.format}</p>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-4 max-w-lg">{project.summary}</p>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
