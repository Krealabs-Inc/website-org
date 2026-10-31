import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ServiceCta } from "@/components/services/service-cta";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PersonSchema } from "@/components/seo/person-schema";
import { TEAM, UPCOMING_TEAM, type TeamMember } from "@/lib/team";

export const metadata: Metadata = {
  title: "L'équipe : les associés derrière Krealabs (Rouen)",
  description:
    "Krealabs, c'est un collectif de quatre associés basé à Rouen. Une agence à taille humaine, joignable directement, qui code vos projets de A à Z.",
  alternates: { canonical: "https://krealabs.fr/equipe" },
  openGraph: {
    title: "L'équipe : les associés derrière Krealabs (Rouen)",
    description:
      "Krealabs, c'est un collectif de quatre associés basé à Rouen. Une agence à taille humaine, joignable directement, qui code vos projets de A à Z.",
    url: "https://krealabs.fr/equipe",
    type: "website",
  },
};

export default function EquipePage() {
  const baseUrl = "https://krealabs.fr";
  const teamCount = TEAM.length + UPCOMING_TEAM.length;

  return (
    <main className="team-page bg-[var(--background)] text-[var(--foreground)]">
      <PersonSchema persons={TEAM.map((member) => ({
        name: member.name,
        jobTitle: member.role,
        image: member.photo?.startsWith("http") ? member.photo : member.photo ? `${baseUrl}${member.photo}` : undefined,
        url: `${baseUrl}/equipe/${member.slug}`,
        bio: member.bio,
        sameAs: [member.github, member.linkedin, member.twitter].filter((url): url is string => Boolean(url)),
        knowsAbout: member.knowsAbout,
      }))} />

      <section className="team-intro">
        <Container>
          <div className="team-intro-meta">
            <Eyebrow>Le collectif Krealabs</Eyebrow>
            <span className="text-caption">Rouen, Normandie · Depuis 2020</span>
          </div>
          <div className="team-intro-layout">
            <h1 className="team-headline">Des personnes,<br />derrière chaque <em>projet.</em></h1>
            <div className="team-intro-aside">
              <span className="team-count" aria-hidden>{String(teamCount).padStart(2, "0")}</span>
              <p className="text-caption mb-6">Associés · Un même studio</p>
              <p className="text-body text-[var(--muted-foreground)]">
                Nous sommes les personnes qui conçoivent, développent et suivent votre projet.
                Du premier échange à la mise en ligne, vous nous parlez directement.
              </p>
            </div>
          </div>
          <div className="team-section-marker">
            <a href="#collectif" className="text-caption hover:underline underline-offset-4">L’équipe, au complet</a>
            <span className="text-caption">{String(TEAM.length).padStart(2, "0")} profils à découvrir</span>
          </div>
        </Container>
      </section>

      <section id="collectif" aria-label="Les associés de Krealabs" className="scroll-mt-28">
        <Container>
          <div className="team-gallery">
            {TEAM.map((member, index) => <MemberPortrait key={member.slug} member={member} index={index} />)}
          </div>
          {UPCOMING_TEAM.length > 0 && (
            <div className="team-pending">
              {UPCOMING_TEAM.map((member) => (
                <div key={member.initials} className="editorial-note">
                  <p className="text-h4">{member.name}</p>
                  <p className="text-body-sm mt-2">{member.role}</p>
                  <p className="text-body-sm text-[var(--muted-foreground)] mt-3">{member.teaser}</p>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="team-manifesto">
        <Container>
          <div className="team-manifesto-heading">
            <Eyebrow>La même façon de travailler</Eyebrow>
            <h2 className="text-h1">Des parcours différents.<br />Une même <em>exigence.</em></h2>
          </div>
          <p className="text-body-lg text-[var(--muted-foreground)] max-w-2xl mt-8">
            Une agence à taille humaine, par choix. Nous gardons la maîtrise du code
            et prenons le temps de comprendre les personnes qui nous le confient.
          </p>
          <div className="team-values">
            {VALUES.map((value, index) => (
              <article key={value.title}>
                <span className="text-caption">0{index + 1} / {value.label}</span>
                <h3 className="text-h3 mt-6 mb-4">{value.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        eyebrow="La prochaine rencontre"
        title={<>On fait <em>équipe ?</em></>}
        description="Un premier échange offert, en visio ou autour d’un café à Rouen. Parlons de votre idée et de ce que nous pourrions construire ensemble."
        primaryLabel="Rencontrer le collectif"
        secondaryLabel={null}
      />
    </main>
  );
}

function MemberPortrait({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article className="team-member">
      <Link href={`/equipe/${member.slug}`} className="team-portrait-link" aria-label={`Découvrir le profil de ${member.name}`}>
        <div className="team-portrait" data-member={member.slug}>
          {member.photo ? (
            <Image src={member.photo} alt={`Portrait de ${member.name}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" priority={index < 2} className="team-portrait-image" />
          ) : <span className="team-portrait-initials">{member.initials}</span>}
          <span className="team-portrait-index" aria-hidden>0{index + 1}</span>
          <span className="team-portrait-action" aria-hidden><ArrowUpRight className="size-5" /></span>
        </div>
      </Link>
      <div className="team-member-heading">
        <h2 className="text-h3"><Link href={`/equipe/${member.slug}`}>{member.name}</Link></h2>
        <p className="team-member-role">{member.role}</p>
      </div>
      <p className="team-specialties">{member.specialties.join(" / ")}</p>
      <blockquote className="team-member-quote">« {member.loves} »</blockquote>
      <details className="team-member-details">
        <summary>Parcours & expertises<span className="team-details-plus" aria-hidden>+</span></summary>
        <div className="team-member-details-body">
          <p className="text-body-sm text-[var(--muted-foreground)]">{member.bio}</p>
          <dl className="mt-6 space-y-4 text-body-sm">
            <div><dt className="text-caption mb-2">Au quotidien</dt><dd>{member.stack.join(" · ")}</dd></div>
            <div><dt className="text-caption mb-2">Basé à</dt><dd>{member.location} · {member.yearsExperience} ans d’expérience</dd></div>
          </dl>
        </div>
      </details>
      <div className="team-member-links">
        <Link href={`/equipe/${member.slug}`} className="team-profile-link">Le profil<ArrowUpRight className="size-3.5" aria-hidden /></Link>
        <div className="flex flex-wrap gap-4">
          {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${member.name} (nouvel onglet)`}>GitHub</a>}
          {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${member.name} (nouvel onglet)`}>LinkedIn</a>}
        </div>
      </div>
    </article>
  );
}

const VALUES = [
  {
    label: "Interlocuteur unique",
    title: "Un seul contact",
    description:
      "Pas de chef de projet, pas de commercial, pas de sous-traitant. Vous appelez, nous répondons. Vous écrivez, nous lisons.",
  },
  {
    label: "Polyvalence",
    title: "Du design au déploiement",
    description:
      "Nous couvrons toute la chaîne. Cela limite les frictions, accélère les itérations, et donne une cohérence forte au produit final.",
  },
  {
    label: "Engagement",
    title: "Vos projets, nos signatures",
    description:
      "Chaque projet que nous livrons est signé Krealabs. Notre nom est sur la ligne - la qualité l'est aussi.",
  },
];
