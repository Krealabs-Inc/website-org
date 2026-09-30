import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, MapPin, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";
import { MotionReveal } from "@/components/animations/motion-reveal";
import { PersonSchema } from "@/components/seo/person-schema";
import {
  TEAM,
  UPCOMING_TEAM,
  type TeamMember,
  type UpcomingMember,
} from "@/lib/team";

export const metadata: Metadata = {
  title: "L'équipe : les associés derrière Krealabs (Rouen)",
  description:
    "Krealabs, c'est un collectif de trois associés basé à Rouen. Une agence à taille humaine, joignable directement, qui code vos projets de A à Z.",
  alternates: { canonical: "https://krealabs.fr/equipe" },
  openGraph: {
    title: "L'équipe : les associés derrière Krealabs (Rouen)",
    description:
      "Krealabs, c'est un collectif de trois associés basé à Rouen. Une agence à taille humaine, joignable directement, qui code vos projets de A à Z.",
    url: "https://krealabs.fr/equipe",
    type: "website",
  },
};

// TEAM data déplacée dans lib/team.ts (réutilisée par /equipe/[slug]
// et par le markup Article auteur des blog posts).

// =============================================================================
// PAGE
// =============================================================================

export default function EquipePage() {
  const baseUrl = "https://krealabs.fr";
  const hasPending = UPCOMING_TEAM.length > 0;
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <PersonSchema
        persons={TEAM.map((m) => ({
          name: m.name,
          jobTitle: m.role,
          image: m.photo?.startsWith("http") ? m.photo : m.photo ? `${baseUrl}${m.photo}` : undefined,
          url: `${baseUrl}/equipe/${m.slug}`,
          bio: m.bio,
          sameAs: [m.github, m.linkedin, m.twitter].filter(
            (v): v is string => typeof v === "string",
          ),
          knowsAbout: m.knowsAbout,
        }))}
      />
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />

        <Container className="relative">
          <MotionReveal className="max-w-4xl">
            <Eyebrow dot className="mb-8">L'équipe Krealabs</Eyebrow>
            <h1 className="text-display">
              Trois <em>associés</em>,
              <br />
              zéro intermédiaire.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Krealabs, c'est un collectif de trois associés basé à Rouen, qui
              code lui-même vos projets. Pas de chef de projet intermédiaire, pas
              de sous-traitance. Vous parlez directement à ceux qui construisent.
            </p>
          </MotionReveal>
        </Container>
      </section>

      {/* TEAM CARDS */}
      <section className="border-t border-[var(--border)]">
        <Container>
          {/* Deux natures de contenu, deux traitements : les profils publiés
              gardent une colonne large et lisible, les fondateurs encore non
              annoncés forment un rail étroit à côté. La largeur encode donc
              ce qui est réellement publié, au lieu d'empiler trois blocs
              identiques dont deux sont vides. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto gap-px bg-[var(--border)] border-x border-b border-[var(--border)]">
            <div
              className={
                hasPending
                  ? "grid grid-cols-1 gap-px bg-[var(--border)] lg:col-span-8"
                  : "grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--border)] lg:col-span-12"
              }
            >
            {TEAM.map((member, i) => (
              <MotionReveal key={member.name} delay={i * 0.1} className="h-full">
                <article
                  className="group/team relative bg-[var(--background)] p-8 md:p-12 flex flex-col gap-8 hover:bg-[var(--surface)]/40 transition-colors duration-300 overflow-hidden h-full"
                >
                <header className="flex items-start gap-6 relative z-10">
                  <Avatar member={member} />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-h2 mb-1">{member.name}</h2>
                    <p className="text-body text-[var(--accent)] font-medium">
                      {member.role}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-body-sm text-[var(--muted-foreground)]">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {member.location}
                      </span>
                      <span aria-hidden className="text-[var(--subtle-foreground)]">·</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="size-3.5" />
                        {member.yearsExperience} ans d'expérience
                      </span>
                    </div>
                  </div>
                </header>

                <p className="text-body text-[var(--muted-foreground)]">
                  {member.bio}
                </p>

                {/* Ce que j'aime - accent serif italique */}
                <div className="border-l-2 border-[var(--accent)] pl-5 py-1">
                  <p className="text-caption mb-1.5">Ce que j'aime</p>
                  <p
                    className="text-h4 text-[var(--foreground)]"
                    style={{
                      fontFamily: "var(--font-instrument-serif)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    « {member.loves} »
                  </p>
                </div>

                {/* Specialties */}
                <div>
                  <p className="text-eyebrow mb-3">Spécialités</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div>
                  <p className="text-eyebrow mb-3">Stack quotidienne</p>
                  <div className="flex flex-wrap gap-2">
                    {member.stack.map((s) => (
                      <Badge key={s} variant="outline">{s}</Badge>
                    ))}
                  </div>
                </div>

                {/* Socials + lien profil détaillé */}
                <div className="pt-6 border-t border-[var(--border)] flex items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-2">
                    {member.github && (
                      <SocialLink href={member.github} label="GitHub" icon={Github} />
                    )}
                    {member.linkedin && (
                      <SocialLink href={member.linkedin} label="LinkedIn" icon={Linkedin} />
                    )}
                  </div>
                  <Link
                    href={`/equipe/${member.slug}`}
                    className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)] hover:gap-3 transition-all"
                  >
                    Voir le profil
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
                </article>
              </MotionReveal>
            ))}
            </div>

            {hasPending && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-4 gap-px bg-[var(--border)]">
                {UPCOMING_TEAM.map((member, i) => (
                  <MotionReveal
                    key={`upcoming-${i}`}
                    delay={(TEAM.length + i) * 0.1}
                    className="h-full"
                  >
                    <UpcomingCard member={member} />
                  </MotionReveal>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* MANIFESTO */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow className="mb-6 justify-center">Notre manière de travailler</Eyebrow>
            <h2 className="text-h1 mb-8">
              Une agence à <em>taille humaine</em>, par choix.
            </h2>
            <p className="text-body-lg text-[var(--muted-foreground)] mb-12">
              Nous aurions pu grossir, embaucher, sous-traiter. Nous avons fait le
              choix inverse : rester une structure ramassée pour garder la
              maîtrise totale du code et la qualité de la relation client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-[var(--background)] p-8">
                <p className="text-eyebrow text-[var(--accent)] mb-4">{v.label}</p>
                <h3 className="text-h4 mb-3">{v.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            On se <em>rencontre</em> ?
          </>
        }
        description="Premier échange offert, en visio ou en présentiel à Rouen. C'est le meilleur moyen de juger si on est faits pour travailler ensemble."
        primaryLabel="Prendre contact"
      />
    </main>
  );
}

// =============================================================================
// COMPONENTS
// =============================================================================

function Avatar({ member }: { member: TeamMember }) {
  if (member.photo) {
    return (
      <div className="relative size-20 md:size-24 shrink-0 rounded-[var(--radius)] overflow-hidden border border-[var(--border)] bg-[var(--surface)] group-hover/team:border-[var(--accent)] group-hover/team:shadow-[0_0_0_4px_var(--accent-subtle),0_0_24px_var(--accent-subtle)] transition-all duration-300">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="96px"
          priority
          className="object-cover group-hover/team:scale-105 transition-transform duration-500"
        />
      </div>
    );
  }

  return (
    <div className="size-20 md:size-24 shrink-0 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--accent-subtle)] flex items-center justify-center group-hover/team:border-[var(--accent)] group-hover/team:shadow-[0_0_0_4px_var(--accent-subtle),0_0_24px_var(--accent-subtle)] transition-all duration-300">
      <span className="text-h2 font-semibold text-[var(--accent)]">
        {member.initials}
      </span>
    </div>
  );
}

/**
 * Fondateur dont le profil n'est pas encore publié : pas de lien, pas de
 * schema Person, et surtout pas de fausses lignes d'info. Le pointillé et
 * le texte en retrait suffisent à dire que la place est prise mais que le
 * contenu n'est pas là.
 */
function UpcomingCard({ member }: { member: UpcomingMember }) {
  return (
    <article className="relative bg-[var(--background)] p-8 md:p-10 flex flex-col justify-center gap-5 h-full">
      <div className="size-14 rounded-[var(--radius)] border border-dashed border-[var(--border-strong)] flex items-center justify-center">
        <span className="text-h4 text-[var(--subtle-foreground)]">
          {member.initials}
        </span>
      </div>

      <div>
        <h2 className="text-h3 text-[var(--muted-foreground)]">{member.name}</h2>
        <p className="text-body-sm text-[var(--accent)] font-medium mt-1">
          {member.role}
        </p>
      </div>

      <p className="text-body-sm text-[var(--subtle-foreground)]">
        {member.teaser}
      </p>
    </article>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Github;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
    >
      <Icon className="size-4" />
    </a>
  );
}

// =============================================================================
// DATA
// =============================================================================

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
