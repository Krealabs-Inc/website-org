import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ServiceCta } from "@/components/services/service-cta";
import { PersonSchema } from "@/components/seo/person-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { getTeam } from "@/lib/content/team";
import { getPublishedPosts } from "@/lib/blog-data";

const BASE_URL = "https://krealabs.fr";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getTeam()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = await getTeam();
  const member = team.find((m) => m.slug === slug);
  if (!member) return {};

  const image = member.photo?.startsWith("http")
    ? member.photo
    : member.photo
      ? `${BASE_URL}${member.photo}`
      : undefined;

  return {
    title: member.metaTitle,
    description: member.metaDescription,
    alternates: { canonical: `${BASE_URL}/equipe/${slug}` },
    openGraph: {
      title: member.metaTitle,
      description: member.metaDescription,
      url: `${BASE_URL}/equipe/${slug}`,
      type: "profile",
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const team = await getTeam();
  const member = team.find((m) => m.slug === slug);
  if (!member) notFound();

  const image = member.photo?.startsWith("http")
    ? member.photo
    : member.photo
      ? `${BASE_URL}${member.photo}`
      : undefined;

  const sameAs = [member.github, member.linkedin, member.twitter, member.website]
    .filter((v): v is string => Boolean(v));

  // Articles signés par cet auteur (E-E-A-T : preuve d'expertise)
  const authoredPosts = getPublishedPosts().filter((p) => p.author.name === member.name);

  // Autre(s) membre(s) de l'équipe pour cross-link
  const otherMembers = team.filter((m) => m.slug !== slug);
  const index = team.findIndex((m) => m.slug === slug);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <PersonSchema
        persons={[
          {
            name: member.name,
            jobTitle: member.role,
            image,
            url: `${BASE_URL}/equipe/${member.slug}`,
            bio: member.longBio,
            sameAs,
            knowsAbout: member.knowsAbout,
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: BASE_URL },
          { name: "L'équipe", url: `${BASE_URL}/equipe` },
          { name: member.name, url: `${BASE_URL}/equipe/${member.slug}` },
        ]}
      />

      {/* PORTRAIT: an interview-style spread */}
      <section className="pt-28 md:pt-32">
        <Container>
          <Link
            href="/equipe"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <ArrowLeft className="size-4" />
            L’équipe
          </Link>
          <div className="profile-head">
            <h1 className="profile-name">{member.name}</h1>
            <p className="profile-role">
              {member.role}
              <span>
                {String(index + 1).padStart(2, "0")} / {String(team.length).padStart(2, "0")}
              </span>
            </p>
          </div>
          <div className="profile-spread">
            <div className="profile-photo">
              {member.photo ? (
                <Image src={member.photo} alt={`Portrait de ${member.name}`} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              ) : (
                <span className="team-portrait-initials">{member.initials}</span>
              )}
            </div>
            <div>
              <blockquote className="profile-quote">« {member.loves} »</blockquote>
              <p className="profile-bio">{member.longBio}</p>
              <p className="mt-6 text-caption">
                {member.location} · {member.yearsExperience} ans d’expérience
              </p>
              {sameAs.length > 0 && (
                <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                  {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" className="profile-link">GitHub ↗<span className="sr-only"> (nouvel onglet)</span></a>}
                  {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">LinkedIn ↗<span className="sr-only"> (nouvel onglet)</span></a>}
                  {member.website && <a href={member.website} target="_blank" rel="noopener noreferrer" className="profile-link">Site personnel ↗<span className="sr-only"> (nouvel onglet)</span></a>}
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* SPEC SHEET */}
      <section className="section-y">
        <Container>
          <dl className="profile-sheet">
            <div>
              <dt>Spécialités</dt>
              <dd>{member.specialties.join(" · ")}</dd>
            </div>
            <div>
              <dt>Au quotidien</dt>
              <dd>{member.stack.join(" · ")}</dd>
            </div>
            <div>
              <dt>Sujets</dt>
              <dd>{member.knowsAbout.join(" · ")}</dd>
            </div>
          </dl>
        </Container>
      </section>

      {/* SIGNED ARTICLES */}
      {authoredPosts.length > 0 && (
        <section className="section-y border-t border-[var(--border)]">
          <Container>
            <p className="text-caption mb-4">
              {authoredPosts.length} article{authoredPosts.length > 1 ? "s" : ""} signé{authoredPosts.length > 1 ? "s" : ""} sur le blog
            </p>
            <ol className="journal-index">
              {authoredPosts.slice(0, 9).map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="journal-row group">
                    <span className="journal-meta">{post.date}</span>
                    <span className="journal-cat">{post.category}</span>
                    <span>
                      <span className="journal-row-title">{post.title}</span>
                    </span>
                    <span className="journal-meta text-right">{post.readTime}</span>
                  </Link>
                </li>
              ))}
            </ol>
            {authoredPosts.length > 9 && (
              <Link href="/blog" className="profile-link mt-6 inline-block">Tous les articles →</Link>
            )}
          </Container>
        </section>
      )}

      {/* THE OTHER PARTNERS */}
      {otherMembers.length > 0 && (
        <section className="section-y border-t border-[var(--border)]">
          <Container>
            <p className="text-caption mb-6">Les autres associés</p>
            <ul className="profile-others">
              {otherMembers.map((other) => (
                <li key={other.slug}>
                  <Link href={`/equipe/${other.slug}`} className="profile-other group">
                    <span className="profile-other-photo">
                      {other.photo ? (
                        <Image src={other.photo} alt="" fill sizes="(max-width: 768px) 50vw, 20vw" className="object-cover" />
                      ) : (
                        <span className="team-portrait-initials">{other.initials}</span>
                      )}
                    </span>
                    <span className="text-h4 mt-4 block">{other.name}</span>
                    <span className="text-body-sm text-[var(--muted-foreground)]">{other.role}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <ServiceCta
        eyebrow="La prochaine rencontre"
        title={<>Parlons de <em>votre projet</em>.</>}
        description={`Premier échange offert, en visio ou à Rouen, avec ${member.name.split(" ")[0]} et le reste de l’équipe.`}
        primaryLabel="Parler de mon projet"
        secondaryLabel={null}
      />
    </main>
  );
}
