import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getProjects } from "@/lib/content/projects";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

interface ProjectSelectionProps {
  slugs?: string[];
  title?: React.ReactNode;
  eyebrow?: string;
}

// Projects read as an editorial index, like the services list: client
// photos and banners clashed with the site's own visual language.
export async function ProjectSelection({
  slugs,
  title = <>Des projets concrets, <em>à explorer.</em></>,
  eyebrow = "Réalisations & concepts",
}: ProjectSelectionProps) {
  const all = await getProjects();
  const projects = slugs ? all.filter((project) => slugs.includes(project.slug)) : all;
  return (
    <section id="realisations" className="project-selection">
      <Container>
        <div className="project-selection-heading" data-scroll data-reveal="up">
          <div>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <h2 className="text-h1">{title}</h2>
          </div>
          <Link href="/clients" className="home-text-link">Voir toutes les réalisations<ArrowRight className="size-4" aria-hidden /></Link>
        </div>
        <div className="service-index" data-scroll data-reveal="stagger">
          {projects.map((project, index) => (
            <Link key={project.slug} href={`/clients#${project.slug}`} className="service-index-row">
              <span className="service-index-number" aria-hidden>0{index + 1}</span>
              <div className="min-w-0">
                <p className="text-caption mb-3">{project.sector} · {project.format}</p>
                <h3 className="text-h3">{project.name}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-3 max-w-lg">{project.summary}</p>
              </div>
              <span className="service-index-arrow"><ArrowUpRight className="size-5" aria-hidden /></span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
