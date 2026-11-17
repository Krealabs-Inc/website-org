import { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { ServiceCta } from "@/components/services/service-cta";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PersonSchema } from "@/components/seo/person-schema";
import { AmbientVideo } from "@/components/media/ambient-video";
import { TeamWall } from "@/components/team/team-wall";
import { UPCOMING_TEAM } from "@/lib/team";
import { getTeam } from "@/lib/content/team";

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

export default async function EquipePage() {
  const team = await getTeam();
  const baseUrl = "https://krealabs.fr";

  return (
    <main className="team-page bg-[var(--background)] text-[var(--foreground)]">
      <PersonSchema persons={team.map((member) => ({
        name: member.name,
        jobTitle: member.role,
        image: member.photo?.startsWith("http") ? member.photo : member.photo ? `${baseUrl}${member.photo}` : undefined,
        url: `${baseUrl}/equipe/${member.slug}`,
        bio: member.bio,
        sameAs: [member.github, member.linkedin, member.twitter].filter((url): url is string => Boolean(url)),
        knowsAbout: member.knowsAbout,
      }))} />

      {/* HERO: the wall of the four partners */}
      <div id="collectif" className="scroll-mt-28">
        <TeamWall members={team} />
      </div>
      {UPCOMING_TEAM.length > 0 && (
        <Container>
          <div className="team-pending">
            {UPCOMING_TEAM.map((member) => (
              <div key={member.initials} className="editorial-note">
                <p className="text-h4">{member.name}</p>
                <p className="text-body-sm mt-2">{member.role}</p>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-3">{member.teaser}</p>
              </div>
            ))}
          </div>
        </Container>
      )}

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-4" data-scroll data-reveal="up">
              <Eyebrow className="mb-6">Pourquoi ça compte</Eyebrow>
              <h2 className="text-h1">
                Vous parlez à <em>ceux qui codent.</em>
              </h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6">
                Pas de chaîne d’intermédiaires entre votre idée et votre site :
                ce que vous demandez est exactement ce qui est construit.
              </p>
            </div>
            <div className="lg:col-span-8" data-scroll data-reveal="up" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
              <AmbientVideo
                src="/videos/grosse-agence.mp4"
                poster="/videos/grosse-agence.jpg"
                label="Animation : une demande qui se déforme d’intermédiaire en intermédiaire, puis livrée telle quelle chez Krealabs"
                transcript="Dans une grande agence, votre demande passe de main en main. La cliente demande un bouton bleu ; le message passe par le commercial, le chef de projet, le directeur de compte, le comité de validation, la direction artistique et le prestataire, et devient un carrousel rose animé, livré le trimestre prochain. Plus il y a d’intermédiaires, plus le message se perd. Chez Krealabs, 4 associés : vous parlez directement à ceux qui codent. La cliente demande un bouton bleu, c’est noté, et le bouton bleu est livré comme demandé."
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="team-manifesto">
        <Container>
          <div className="team-manifesto-heading">
            <Eyebrow>La même façon de travailler</Eyebrow>
            <h2 className="text-h1">Des parcours différents.<br />Une même <em>exigence.</em></h2>
          </div>
          <p className="text-body-lg text-[var(--muted-foreground)] max-w-2xl mt-8">
            Quatre associés, et c’est voulu : vous gardez les mêmes interlocuteurs du premier échange
            à la mise en ligne, et ceux qui vous écoutent sont ceux qui construisent.
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
