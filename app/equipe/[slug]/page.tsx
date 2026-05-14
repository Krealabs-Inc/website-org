import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  Linkedin,
  MapPin,
  Briefcase,
  Globe,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";
import { PersonSchema } from "@/components/seo/person-schema";
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema";
import { TEAM, TEAM_SLUGS, getMember } from "@/lib/team";
import { getPublishedPosts } from "@/lib/blog-data";

const BASE_URL = "https://krealabs.fr";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TEAM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getMember(slug);
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
  const member = getMember(slug);
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
  const otherMembers = TEAM.filter((m) => m.slug !== slug);

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

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" aria-hidden />
        <Container className="relative">
          <Link
            href="/equipe"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] mb-10 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Retour à l&apos;équipe
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl">
            <div className="lg:col-span-4">
              {image ? (
                <div className="relative aspect-square w-full rounded-[var(--radius)] overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
                  <Image
                    src={image}
                    alt={member.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--accent-subtle)] flex items-center justify-center">
                  <span className="text-display text-[var(--accent)] font-semibold">
                    {member.initials}
                  </span>
                </div>
              )}
            </div>

            <div className="lg:col-span-8">
              <Eyebrow dot className="mb-6">
                Membre de l&apos;équipe
              </Eyebrow>
              <h1 className="text-display mb-4">{member.name}</h1>
              <p className="text-body-lg text-[var(--accent)] font-medium mb-6">
                {member.role}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm text-[var(--muted-foreground)] mb-8">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {member.location}
                </span>
                <span aria-hidden className="text-[var(--subtle-foreground)]">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5" />
                  {member.yearsExperience} ans d&apos;expérience
                </span>
              </div>

              <p className="text-body-lg text-[var(--muted-foreground)] leading-relaxed">
                {member.longBio}
              </p>

              {/* Ce que j'aime */}
              <div className="mt-8 border-l-2 border-[var(--accent)] pl-5 py-1">
                <p className="text-caption mb-1.5">Ce que j&apos;aime</p>
                <p
                  className="text-h3 text-[var(--foreground)]"
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

              {/* Social */}
              {sameAs.length > 0 && (
                <div className="mt-10 flex items-center gap-2">
                  {member.github && (
                    <SocialLink
                      href={member.github}
                      label="GitHub"
                      icon={Github}
                    />
                  )}
                  {member.linkedin && (
                    <SocialLink
                      href={member.linkedin}
                      label="LinkedIn"
                      icon={Linkedin}
                    />
                  )}
                  {member.website && (
                    <SocialLink
                      href={member.website}
                      label="Site personnel"
                      icon={Globe}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* EXPERTISE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <Eyebrow number="01" className="mb-6">Expertise</Eyebrow>
              <h2 className="text-h1">
                Domaines de <em>compétence</em>.
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-10">
              <div>
                <p className="text-eyebrow mb-4">Spécialités</p>
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-eyebrow mb-4">Stack quotidienne</p>
                <div className="flex flex-wrap gap-2">
                  {member.stack.map((s) => (
                    <Badge key={s} variant="outline">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-eyebrow mb-4">Sujets d&apos;expertise</p>
                <div className="flex flex-wrap gap-2">
                  {member.knowsAbout.map((s) => (
                    <span
                      key={s}
                      className="text-body-sm px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ARTICLES SIGNÉS — E-E-A-T : preuve d'expertise */}
      {authoredPosts.length > 0 && (
        <section className="section-y border-t border-[var(--border)]">
          <Container>
            <div className="max-w-3xl mb-12">
              <Eyebrow number="02" className="mb-6">
                Articles publiés
              </Eyebrow>
              <h2 className="text-h1">
                {authoredPosts.length} article{authoredPosts.length > 1 ? "s" : ""} sur le blog Krealabs.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {authoredPosts.slice(0, 9).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[var(--background)] hover:bg-[var(--surface)] p-6 transition-colors flex flex-col"
                >
                  <p className="text-caption mb-3">
                    {post.category} · {post.readTime}
                  </p>
                  <h3 className="text-h4 mb-3 flex-1">{post.title}</h3>
                  <span className="inline-flex items-center gap-2 text-body-sm font-medium text-[var(--accent)] mt-auto">
                    Lire l&apos;article
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
            {authoredPosts.length > 9 && (
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link href="/blog">Voir tous les articles</Link>
                </Button>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* AUTRES MEMBRES */}
      {otherMembers.length > 0 && (
        <section className="section-y border-t border-[var(--border)]">
          <Container>
            <div className="max-w-3xl mb-12">
              <Eyebrow number="03" className="mb-6">
                Autres membres
              </Eyebrow>
              <h2 className="text-h2">
                Le reste de l&apos;équipe Krealabs.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {otherMembers.map((other) => (
                <Link
                  key={other.slug}
                  href={`/equipe/${other.slug}`}
                  className="group bg-[var(--background)] hover:bg-[var(--surface)] p-8 flex items-center gap-6 transition-colors"
                >
                  <div className="size-16 shrink-0 rounded-[var(--radius)] overflow-hidden border border-[var(--border)] bg-[var(--surface)] relative">
                    {other.photo ? (
                      <Image
                        src={
                          other.photo.startsWith("http")
                            ? other.photo
                            : other.photo
                        }
                        alt={other.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="size-full flex items-center justify-center text-[var(--accent)] font-semibold">
                        {other.initials}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-h4 mb-1">{other.name}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)]">
                      {other.role}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-[var(--accent)] group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ServiceCta
        title={
          <>
            Travailler avec <em>{member.name.split(" ")[0]}</em> ?
          </>
        }
        description={`Pour discuter d'un projet où ${member.name.split(" ")[0]} pourrait intervenir, contactez-nous — premier échange offert, en présentiel à Rouen ou en visio.`}
        primaryLabel="Prendre rendez-vous"
      />
    </main>
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
