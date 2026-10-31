import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MotionReveal } from "@/components/animations/motion-reveal";
import { TextHighlighter } from "@/components/animations/text-highlighter";
import { WordRotator } from "@/components/animations/word-rotator";
import { ProjectSelection } from "@/components/projects/project-selection";
import { StackCarousel } from "@/components/ui/stack-carousel";
import { ServiceCta } from "@/components/services/service-cta";
import { OrganizationSchema } from "@/components/seo/organization-schema";

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <OrganizationSchema />
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" aria-hidden />
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 size-[640px] rounded-full blur-[120px] opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
        />

        <Container className="relative">
          <MotionReveal className="max-w-4xl" direction="up">
            <Eyebrow dot className="mb-8">
              Agence web à Rouen · Sites, apps et logiciels sur mesure
            </Eyebrow>

            <h1 className="text-display">
              Votre activité mérite
              <br />
              un site qui{" "}
              <TextHighlighter>
                <em>travaille pour vous</em>
              </TextHighlighter>
              .
            </h1>

            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Un site qui vous amène des demandes, une application que vos
              clients gardent, un outil qui remplace vos tableurs. Vous gardez
              la main sur votre projet, de la première idée à la mise en ligne.
            </p>

            {/* Ligne rotative des bénéfices */}
            <p className="mt-6 inline-flex items-center gap-2 text-body text-[var(--muted-foreground)]">
              <span className="size-1.5 rounded-full bg-[var(--accent)]" />
              Pensé pour{" "}
              <span className="font-semibold text-[var(--foreground)]">
                <WordRotator
                  words={["vos clients", "vos ventes", "vos équipes", "votre visibilité", "votre croissance"]}
                />
              </span>
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Parler de mon projet
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#realisations">Voir les réalisations</Link>
              </Button>
            </div>

            <p className="mt-8 text-caption">
              On vous répond sous 24h · Votre devis est gratuit · À Rouen et
              partout en France
            </p>
          </MotionReveal>

          <div className="home-benefits">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title}>
                <p className="text-body font-medium mb-2">{benefit.title}</p>
                <p className="text-body-sm text-[var(--muted-foreground)]">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ProjectSelection />

      {/* ========== WORDPRESS - SPÉCIALITÉ HÉROS ========== */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <Container>
          <MotionReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <Eyebrow number="01" dot className="mb-6">Votre site WordPress</Eyebrow>
                <h2 className="text-h1 mb-6">
                  Vous modifiez <em>votre site</em>
                  <br />
                  vous-même, sans nous appeler.
                </h2>
                <p className="text-body-lg text-[var(--muted-foreground)] mb-8 max-w-xl">
                  Textes, photos, actualités, produits : vous mettez votre site
                  à jour en quelques clics, et il reste rapide, sécurisé et bien
                  référencé. Depuis 2020, c’est ce que nous livrons à
                  la plupart de nos clients, à Rouen et en Normandie.
                </p>
                <ul className="space-y-3 mb-10">
                  {WP_HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-body">
                      <span className="mt-2.5 size-1 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild>
                    <Link href="/services/wordpress">
                      Voir l’offre WordPress
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact?type=devis">Recevoir mon devis WordPress</Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 lg:pt-3">
                <div className="wordpress-offer">
                  <div className="flex items-center justify-between gap-4">
                    <span className="wordpress-offer-label">Offre WordPress</span>
                    <span className="text-sm">Clé en main ↗</span>
                  </div>
                  <div className="flex items-end justify-between gap-5 py-10">
                    <div>
                      <p className="text-h2">Votre site.<br />Vos règles.</p>
                      <p className="mt-3 max-w-56 text-sm opacity-75">Du premier écran à la maintenance, tout est pensé pour vous.</p>
                    </div>
                    <div className="wordpress-mark" aria-hidden>
                      <Image src="/assets/logos/WordPress.svg" alt="" width={64} height={64} />
                    </div>
                  </div>
                  <div className="wordpress-offer-list">
                    {WP_OFFERS.map((offer, index) => {
                      return (
                        <Link key={offer.title} href={offer.href} className="wordpress-offer-row">
                          <span className="font-mono text-xs opacity-60">0{index + 1}</span>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium">{offer.title}</p>
                            <p className="mt-1 text-sm opacity-70">{offer.description}</p>
                          </div>
                          <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                        </Link>
                      );
                    })}
                  </div>
                  <p className="mt-6 text-xs font-mono uppercase tracking-wider opacity-65">Sur mesure · Rapide · Évolutif</p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </section>

      {/* ========== SERVICES - AUTRES ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
            <MotionReveal className="lg:col-span-4 lg:sticky lg:top-28">
              <Eyebrow number="02" className="mb-6">Vos autres besoins</Eyebrow>
              <h2 className="text-h1">Un besoin précis ?<br />Une réponse <em>sur mesure</em>.</h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6 max-w-md">
                Un outil métier, une application mobile, une interface à repenser.
                Vous nous décrivez le problème, on vous propose le format qui le règle.
              </p>
              <Link href="/services" className="home-text-link mt-8">
                Voir toutes les solutions <ArrowRight className="size-4" aria-hidden />
              </Link>
            </MotionReveal>
            <div className="lg:col-span-8 service-index">
              {SERVICES.map((service, index) => (
                <MotionReveal key={service.title} delay={index * 0.06}>
                  <ServiceCard {...service} index={index} />
                </MotionReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="home-method-section">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div><Eyebrow className="mb-5">Votre projet, étape par étape</Eyebrow><h2 className="text-h2">Vous savez toujours <em>où l’on en est.</em></h2></div>
            <Link href="/expertise" className="home-text-link">Comment se passe votre projet<ArrowRight className="size-4" aria-hidden /></Link>
          </div>
          <ol className="home-method-steps">
            {STEPS.map((step, index) => (
              <li key={step.title}><span className="text-caption">0{index + 1}</span><h3 className="text-h4 mt-4 mb-3">{step.title}</h3><p className="text-body-sm text-[var(--muted-foreground)]">{step.description}</p></li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ========== STACK ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <MotionReveal>
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Eyebrow number="04" className="mb-6 justify-center">
                Sous le capot
              </Eyebrow>
              <h2 className="text-h1">
                Des outils solides, <em>choisis pour vous</em>.
              </h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6">
                WordPress pour un site que vous gérez vous-même, Next.js ou
                React Native quand votre projet demande plus. La technologie
                s’adapte à votre besoin, pas l’inverse.
              </p>
            </div>
          </Container>
        </MotionReveal>

        <Container>
          <StackCarousel />
        </Container>

        {/* Cards principales */}
        <Container className="mt-16">
          <MotionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STACK_CARDS.map((tech) => (
                <Link
                  key={tech.name}
                  href={tech.href}
                  className="technology-tile group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-caption">{tech.kind}</span>
                    <ArrowUpRight className="size-4 text-[var(--muted-foreground)]" aria-hidden />
                  </div>
                  <div className="mt-7 mb-5 inline-flex size-12 items-center justify-center rounded-full bg-white p-3">
                    <Image src={`/assets/logos/${tech.logo}`} alt="" width={26} height={26} className="size-7 object-contain" />
                  </div>
                  <p className="text-h4 font-medium">{tech.name}</p>
                  <p className="text-body-sm text-[var(--muted-foreground)] mt-2">{tech.tagline}</p>
                </Link>
              ))}
            </div>
          </MotionReveal>
        </Container>
      </section>

      <section className="home-local-strip">
        <Container>
          <div className="home-local-layout">
            <div><Eyebrow className="mb-5">Rouen, Normandie</Eyebrow><h2 className="text-h2">Proches de vous.<br /><em>Où que vous soyez.</em></h2></div>
            <p className="text-body text-[var(--muted-foreground)]">À Rouen, ailleurs en Normandie ou partout en France : on se voit en visio ou à Rouen, et vous parlez directement aux personnes qui construisent votre projet.</p>
            <Link href="/equipe" className="home-text-link">Voir qui travaille sur votre projet<ArrowRight className="size-4" aria-hidden /></Link>
          </div>
        </Container>
      </section>

      <ServiceCta
        eyebrow="Votre projet"
        title={<>Et si votre idée <em>prenait vie</em> ?</>}
        description="Décrivez votre projet en quelques lignes : on vous répond sous 24h ouvrées avec un premier retour concret."
        primaryLabel="Recevoir mon devis"
        secondaryLabel="Voir ce qu’on peut faire pour vous"
      />
    </main>
  );
}

// ============================================================
// DATA
// ============================================================

const BENEFITS = [
  { title: "Votre site vous appartient", detail: "Vous disposez des accès et du code de votre projet." },
  { title: "Vous gardez la main", detail: "Des contenus administrables et une prise en main accompagnée." },
  { title: "Vous parlez aux développeurs", detail: "Des échanges directs avec les personnes qui réalisent votre site." },
  { title: "Votre site reste suivi", detail: "Maintenance et évolutions : on reste joignable après la mise en ligne." },
];

const WP_HIGHLIGHTS = [
  "Un site qui reflète votre activité, pas un modèle générique",
  "Une boutique en ligne adaptée à vos produits et à votre façon de vendre",
  "Une refonte sans perdre votre place dans Google",
  "Votre site mis à jour, sauvegardé et surveillé après la livraison",
  "Un site qui évolue avec votre activité",
];

const WP_OFFERS = [
  {
    title: "Un site à votre image",
    description: "Des contenus que vous gérez vous-même",
    href: "/services/wordpress",
  },
  {
    title: "Vous vendez en ligne",
    description: "Une boutique WooCommerce complète",
    href: "/services/wordpress",
  },
  {
    title: "Vous n’y pensez plus",
    description: "Maintenance, sécurité et surveillance au mois",
    href: "/services/wordpress",
  },
];

const SERVICES = [
  {
    eyebrow: "Sites et outils sur mesure",
    title: "Vos process tournent sans tableurs ni ressaisie",
    description:
      "Un espace client, un outil métier ou une plateforme, construit autour de votre façon de travailler.",
    href: "/services/developpement-web",
  },
  {
    eyebrow: "Applications mobiles · iOS & Android",
    title: "Vos clients vous ont dans leur poche",
    description:
      "Vos services accessibles depuis leur téléphone, avec un parcours pensé pour le mobile.",
    href: "/services/applications-mobile",
  },
  {
    eyebrow: "Design UI/UX",
    title: "Vos visiteurs comprennent et passent à l’action",
    description:
      "Des écrans clairs et des parcours évidents, de la première impression à la prise de contact.",
    href: "/services/design-uiux",
  },
  {
    eyebrow: "Performance & SEO",
    title: "Vous apparaissez quand vos clients cherchent votre métier",
    description:
      "Un site rapide et des contenus structurés pour que Google vous montre à ceux qui ont besoin de vous.",
    href: "/services/performance-seo",
  },
];

interface ServiceCardProps {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  index: number;
}

function ServiceCard({ eyebrow, title, description, href, index }: ServiceCardProps) {
  return (
    <Link href={href} className="service-index-row">
      <span className="service-index-number" aria-hidden>0{index + 1}</span>
      <div className="min-w-0">
        <div className="mb-3 flex items-center gap-3">
          <p className="text-caption">{eyebrow}</p>
        </div>
        <h3 className="text-h3">{title}</h3>
        <p className="text-body-sm text-[var(--muted-foreground)] mt-3 max-w-lg">{description}</p>
      </div>
      <span className="service-index-arrow"><ArrowUpRight className="size-5" aria-hidden /></span>
    </Link>
  );
}

const STEPS = [
  {
    title: "Cadrage",
    description:
      "Un premier appel pour comprendre votre besoin, vos contraintes et vos objectifs. Sans engagement.",
  },
  {
    title: "Conception",
    description:
      "Vous voyez votre futur site en maquette et vous le validez avant la moindre ligne de code.",
  },
  {
    title: "Développement",
    description:
      "Des démos régulières et l’accès au code dès le premier jour : vous voyez votre projet avancer.",
  },
  {
    title: "Mise en ligne & suivi",
    description:
      "Mise en ligne, formation pour que vous soyez autonome, surveillance. On reste joignable pour la suite.",
  },
];

const STACK_CARDS = [
  {
    name: "WordPress",
    logo: "WordPress.svg",
    tagline: "Vos contenus en autonomie",
    kind: "CMS",
    href: "/services/wordpress",
  },
  {
    name: "Next.js",
    logo: "Next.js.svg",
    tagline: "Des sites très rapides",
    kind: "Framework",
    href: "/technologies/nextjs",
  },
  {
    name: "React Native",
    logo: "React.svg",
    tagline: "Une seule app, iOS et Android",
    kind: "Mobile",
    href: "/technologies/react-native",
  },
  {
    name: "TypeScript",
    logo: "TypeScript.svg",
    tagline: "Moins de bugs en production",
    kind: "Langage",
    href: "/technologies/typescript",
  },
];
