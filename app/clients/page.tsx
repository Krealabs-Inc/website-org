import { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Réalisations d’une agence web à Rouen",
  description: "Leur situation, ce qui a été fait, ce que ça change : ILIASS (UniLaSalle), Main Verte, Pas de Série, Méli-Mélo Studio et le concept MBE Bihorel. Agence web à Rouen, développement web en Normandie.",
  alternates: { canonical: "https://krealabs.fr/clients" },
  openGraph: {
    title: "Des besoins différents, des réponses concrètes — Krealabs, agence web Rouen",
    description: "Quatre réalisations et un concept de refonte : pour chacun, la situation de départ, ce qui a été fait et ce que ça change.",
    url: "https://krealabs.fr/clients",
    type: "website",
  },
};

export default function ClientsPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="project-page-intro">
        <Container>
          <Eyebrow className="mb-7">Réalisations & explorations</Eyebrow>
          <div className="project-page-heading">
            <h1 className="text-display">Des besoins différents.<br />Des réponses <em>concrètes.</em></h1>
            <p className="text-body-lg text-[var(--muted-foreground)]">Une plateforme multilingue, un site vitrine, un site de marque, une boutique et un concept de refonte. Pour chacun : la situation de départ, ce qui a été fait, et ce que ça change. Peut-être un cas proche du vôtre.</p>
          </div>
          <nav aria-label="Les projets" className="project-jump-links">
            {PROJECTS.map((project, index) => <a key={project.slug} href={`#${project.slug}`}><span aria-hidden>0{index + 1}</span>{project.name}</a>)}
          </nav>
        </Container>
      </section>

      <Container>
        {PROJECTS.map((project, index) => (
          <article id={project.slug} key={project.slug} className="project-case">
            <div className="project-case-heading">
              <div><p className="text-caption mb-4">0{index + 1} · {project.sector}</p><h2 className="text-h1">{project.name}</h2></div>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="home-text-link" aria-label={`Visiter ${project.name} (nouvel onglet)`}>Visiter le site<ArrowUpRight className="size-4" aria-hidden /></a>
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={`project-case-media project-media-${project.slug}`} aria-label={`Découvrir le site ${project.name} (nouvel onglet)`}>
              <Image src={project.image} alt={project.imageAlt} fill sizes="(min-width: 1280px) 1216px, 100vw" priority={index === 0} />
              <span className="project-domain">{project.domain}<ArrowUpRight className="size-4" aria-hidden /></span>
            </a>
            <div className="project-case-story">
              <div><p className="text-caption mb-5">{project.format}</p><h3 className="text-h2">{project.title}</h3></div>
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
