import { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PersonSchema } from "@/components/seo/person-schema";
import { AmbientVideo } from "@/components/media/ambient-video";
import { TeamWall } from "@/components/team/team-wall";
import { PageCta } from "@/components/services/page-cta";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { TEAM_PAGE } from "@/lib/page-texts/team-page";
import { UPCOMING_TEAM } from "@/lib/team";
import { getTeam } from "@/lib/content/team";
import { withTeamCount, withTeamCountAll } from "@/lib/team-count";

export async function generateMetadata(): Promise<Metadata> {
  const n = (await getTeam()).length;
  const description = withTeamCount(
    "Krealabs, c'est un collectif de {nombre} associé{s} basé à Rouen. Une agence à taille humaine, joignable directement, qui code vos projets de A à Z.",
    n,
  );
  return {
    title: "L'équipe : les associés derrière Krealabs (Rouen)",
    description,
    alternates: { canonical: "https://krealabs.fr/equipe" },
    openGraph: {
      title: "L'équipe : les associés derrière Krealabs (Rouen)",
      description,
      url: "https://krealabs.fr/equipe",
      type: "website",
    },
  };
}

export default async function EquipePage() {
  const team = await getTeam();
  // Texts may mention the team size: {n}, {nombre}, {Nombre}, {s}.
  const t = withTeamCountAll(await getPageTexts(TEAM_PAGE), team.length);
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

      {/* HERO: the wall of the partners */}
      <div id="collectif" className="scroll-mt-28">
        <TeamWall members={team} title={t.title} band={t.band} />
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
              <Eyebrow className="mb-6">{t.whyEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.whyTitle)}</h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6">{t.whyText}</p>
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
            <Eyebrow>{t.valuesEyebrow}</Eyebrow>
            <h2 className="text-h1">{rich(t.valuesTitle)}</h2>
          </div>
          <p className="text-body-lg text-[var(--muted-foreground)] max-w-2xl mt-8">{t.valuesText}</p>
          <div className="team-values">
            {t.values.map((value, index) => (
              <article key={value.title}>
                <span className="text-caption">0{index + 1} / {value.label}</span>
                <h3 className="text-h3 mt-6 mb-4">{value.title}</h3>
                <p className="text-body-sm text-[var(--muted-foreground)]">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <PageCta t={t} />
    </main>
  );
}

