import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MotionReveal } from "@/components/animations/motion-reveal";
import { ProjectSelection } from "@/components/projects/project-selection";
import { StackCarousel } from "@/components/ui/stack-carousel";
import { ServiceCta } from "@/components/services/service-cta";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { HeroVolume } from "@/components/home/hero-volume";
import { PromisesStrip, type ClientPromise } from "@/components/home/promises-strip";
import { MethodDepth, type MethodStep } from "@/components/home/method-depth";

export default function HomePage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <OrganizationSchema />

      <HeroVolume />

      <section className="border-t border-[var(--border-strong)]">
        <Container>
          <div className="home-benefits !mt-0 !border-t-0 py-12" data-scroll data-reveal="stagger">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title}>
                <p className="text-body font-medium mb-2">{benefit.title}</p>
                <p className="text-body-sm text-[var(--muted-foreground)]">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <PromisesStrip promises={PROMISES} />

      <ProjectSelection />

      <MethodDepth steps={STEPS} />

      {/* ========== STACK ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <MotionReveal>
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Eyebrow className="mb-6 justify-center">Sous le capot</Eyebrow>
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

        <Container className="mt-16">
          <MotionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STACK_CARDS.map((tech) => (
                <Link key={tech.name} href={tech.href} className="technology-tile group">
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
          <div className="home-local-layout" data-scroll data-reveal="up">
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

const PROMISES: ClientPromise[] = [
  {
    eyebrow: "Site WordPress",
    title: "Vous modifiez votre site vous-même, sans nous appeler.",
    description:
      "Textes, photos, actualités, produits : vous mettez votre site à jour en quelques clics, et il reste rapide, sécurisé et bien référencé.",
    href: "/services/wordpress",
  },
  {
    eyebrow: "Sites et outils sur mesure",
    title: "Vos process tournent sans tableurs ni ressaisie.",
    description:
      "Un espace client, un outil métier ou une plateforme, construit autour de votre façon de travailler.",
    href: "/services/developpement-web",
  },
  {
    eyebrow: "Applications mobiles · iOS & Android",
    title: "Vos clients vous ont dans leur poche.",
    description:
      "Vos services accessibles depuis leur téléphone, avec un parcours pensé pour le mobile.",
    href: "/services/applications-mobile",
  },
  {
    eyebrow: "Design UI/UX",
    title: "Vos visiteurs comprennent et passent à l’action.",
    description:
      "Des écrans clairs et des parcours évidents, de la première impression à la prise de contact.",
    href: "/services/design-uiux",
  },
  {
    eyebrow: "Performance & SEO",
    title: "Vous apparaissez quand vos clients cherchent votre métier.",
    description:
      "Un site rapide et des contenus structurés pour que Google vous montre à ceux qui ont besoin de vous.",
    href: "/services/performance-seo",
  },
];

const STEPS: MethodStep[] = [
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
