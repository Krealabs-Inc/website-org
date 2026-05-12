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

export const metadata: Metadata = {
  title: "L'équipe — 2 co-fondateurs à Rouen",
  description:
    "Découvrez l'équipe Krealabs : 2 co-fondateurs développeurs basés à Rouen. Une équipe à taille humaine, joignable directement, qui code vos projets de A à Z.",
  keywords: [
    "équipe krealabs",
    "co-fondateurs rouen",
    "développeurs rouen",
    "agence digitale équipe normandie",
  ],
  alternates: { canonical: "https://krealabs.fr/equipe" },
};

// =============================================================================
// TEAM DATA — édite ici pour mettre à jour les profils
// =============================================================================

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  location: string;
  /** Années d'expérience (string pour permettre "10+", "5+", etc.) */
  yearsExperience: string;
  /** Ce que la personne aime faire — rendu en italique serif (phrase courte) */
  loves: string;
  photo?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  specialties: string[];
  stack: string[];
}

const TEAM: TeamMember[] = [
  {
    name: "Maxime Dubois",
    role: "Co-fondateur · Développeur",
    initials: "MD",
    bio: "Co-fondateur de Krealabs. Passionné de développement web depuis 10+ ans, j'aime concevoir des produits digitaux à la fois performants, accessibles et beaux. Mon rôle : architecture technique, suivi des projets et relation client.",
    location: "Rouen, Normandie",
    yearsExperience: "10+",
    loves: "Concevoir des interfaces où chaque détail compte.",
    photo: "/team/maxime.jpg",
    github: "https://github.com/makcimerrr",
    linkedin: "https://www.linkedin.com/in/maxime-dubois-0265a4292/",
    specialties: ["Full-stack", "Architecture", "Suivi client"],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
  },
  {
    name: "Romain Clatot",
    role: "Co-fondateur · Développeur",
    initials: "RC",
    bio: "Co-fondateur de Krealabs, basé à Rouen. Profil polyvalent avec une appétence forte pour le back-end, les API et l'intégration de systèmes. Romain pilote les choix d'architecture serveur, les modèles de données et les intégrations tierces (paiement, auth, services externes) sur les projets Krealabs.",
    location: "Rouen, Normandie",
    yearsExperience: "5+",
    loves: "Bâtir des API claires et des modèles de données qui tiennent.",
    photo: "https://avatars.githubusercontent.com/u/123472397?v=4",
    github: "https://github.com/CLTRomain",
    linkedin: "https://www.linkedin.com/in/romain-clatot/",
    specialties: ["Back-end & API", "Intégrations", "Bases de données"],
    stack: ["TypeScript", "Node.js", "GraphQL", "PHP", "PostgreSQL", "Docker"],
  },
];

// =============================================================================
// PAGE
// =============================================================================

export default function EquipePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />

        <Container className="relative">
          <MotionReveal className="max-w-4xl">
            <Eyebrow dot className="mb-8">L'équipe Krealabs</Eyebrow>
            <h1 className="text-display">
              Deux <em>développeurs</em>,
              <br />
              une seule équipe.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Krealabs c'est avant tout deux co-fondateurs basés à Rouen, qui
              codent eux-mêmes vos projets. Pas de chef de projet intermédiaire,
              pas de sous-traitance. Vous parlez directement à ceux qui
              construisent.
            </p>
          </MotionReveal>
        </Container>
      </section>

      {/* TEAM CARDS */}
      <section className="border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border-x border-b border-[var(--border)]">
            {TEAM.map((member, i) => (
              <MotionReveal key={member.name} delay={i * 0.1}>
                <article
                  className="group/team relative bg-[var(--background)] p-8 md:p-12 flex flex-col gap-8 hover:bg-[var(--surface)]/40 transition-colors duration-300 overflow-hidden h-full"
                >
                <header className="flex items-start gap-6 relative z-10">
                  <Avatar member={member} />
                  <div className="flex-1 min-w-0">
                    <p className="text-caption mb-2">
                      Membre {String(i + 1).padStart(2, "0")}
                    </p>
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

                {/* Ce que j'aime — accent serif italique */}
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

                {/* Socials */}
                {(member.github || member.linkedin || member.twitter) && (
                  <div className="pt-6 border-t border-[var(--border)] flex items-center gap-2 relative z-10">
                    {member.github && (
                      <SocialLink href={member.github} label="GitHub" icon={Github} />
                    )}
                    {member.linkedin && (
                      <SocialLink href={member.linkedin} label="LinkedIn" icon={Linkedin} />
                    )}
                  </div>
                )}
                </article>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* MANIFESTO */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow className="mb-6 justify-center">Notre manière de travailler</Eyebrow>
            <h2 className="text-h1 mb-8">
              Une équipe à <em>taille humaine</em>, par choix.
            </h2>
            <p className="text-body-lg text-[var(--muted-foreground)] mb-12">
              Nous aurions pu grossir, embaucher, sous-traiter. Nous avons fait
              le choix inverse : rester deux pour garder la maîtrise totale du
              code et la qualité de la relation client.
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
    label: "Petite équipe",
    title: "Deux et c'est tout",
    description:
      "Pas de chef de projet, pas de commercial, pas de sous-traitant. Vous nous appelez, nous répondons. Vous nous écrivez, nous lisons.",
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
      "Chaque projet que nous livrons est signé Krealabs. Notre nom est sur la ligne — la qualité l'est aussi.",
  },
];
