import { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { getProjects } from "@/lib/content/projects";
import { AmbientVideo } from "@/components/media/ambient-video";
import { HorizontalStrip } from "@/components/patterns/horizontal-strip";
import { ProjectCard } from "@/components/projects/project-card";

export const metadata: Metadata = {
  title: "Réalisations d’une agence web à Rouen",
  description: "Leur situation, ce qui a été fait, ce que ça change : ILIASS (UniLaSalle), Main Verte, Pas de Série, Méli-Mélo Studio, Traversia, le concept MBE Bihorel et notre produit Ardoise. Agence web à Rouen, développement web en Normandie.",
  alternates: { canonical: "https://krealabs.fr/clients" },
  openGraph: {
    title: "Des besoins différents, des réponses concrètes — Krealabs, agence web Rouen",
    description: "Cinq réalisations, un concept de refonte et notre propre produit : pour chacun, la situation de départ, ce qui a été fait et ce que ça change.",
    url: "https://krealabs.fr/clients",
    type: "website",
  },
};

export default async function ClientsPage() {
  const projects = await getProjects();
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* The page opens on the strip: the title is its first panel, each card
          leads down to its case study. */}
      <HorizontalStrip
        className="!border-t-0"
        itemClassName="h-[min(64vh,520px)] w-[min(520px,84vw)]"
        intro={
          <>
            <Eyebrow className="mb-7">Réalisations & explorations</Eyebrow>
            <h1 className="text-display">Des besoins différents.<br />Des réponses <em>concrètes.</em></h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-xl">Une plateforme multilingue, des sites vitrines, un site de marque, une boutique, un concept de refonte et notre propre logiciel. Pour chacun : la situation de départ, ce qui a été fait, et ce que ça change. Peut-être un cas proche du vôtre.</p>
          </>
        }
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} total={projects.length} />
        ))}
      </HorizontalStrip>

      <Container>
        <div className="pt-20 pb-4" data-scroll data-reveal="up">
          <Eyebrow className="mb-5">Les fiches en détail</Eyebrow>
          <h2 className="text-h2">Leur situation, ce qui a été fait, <em>ce que ça change.</em></h2>
        </div>
        {projects.map((project, index) => (
          <article id={project.slug} key={project.slug} className="project-case">
            <div className="project-case-heading">
              <div><p className="text-caption mb-4">0{index + 1} · {project.sector}</p><h2 className="text-h1">{project.name}</h2></div>
              {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="home-text-link" aria-label={`Visiter ${project.name} (nouvel onglet)`}>{project.domain}<ArrowUpRight className="size-4" aria-hidden /></a>}
            </div>
            {project.video && (
              <div data-scroll data-reveal="up">
                <AmbientVideo
                  src={project.video.src}
                  poster={project.video.poster}
                  label={`Animation : le projet ${project.name}`}
                  transcript={project.video.transcript}
                />
              </div>
            )}
            <div className="project-case-story" data-scroll data-reveal="up">
              {/* Stays in view while the story beside it is read. */}
              <div className="project-case-aside"><p className="text-caption mb-5">{project.format}</p><h3 className="text-h2">{project.title}</h3></div>
              <div className="space-y-6">
                <p className="text-body text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)] font-medium">La situation.</strong> {project.situation}</p>
                <p className="text-body text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)] font-medium">Ce qui a été fait.</strong> {project.work}</p>
                <p className="text-body text-[var(--muted-foreground)]"><strong className="text-[var(--foreground)] font-medium">Ce que ça change.</strong> {project.result}</p>
                <ul className="project-highlights">{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
          </article>
        ))}

      </Container>
      <ServiceCta title={<>Et votre <em>projet ?</em></>} description="Parlons de votre activité, de vos visiteurs et de ce que votre site doit leur permettre de faire." primaryLabel="Parler de mon projet" />
    </main>
  );
}
