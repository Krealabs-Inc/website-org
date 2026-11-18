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
import { PromisesStrip } from "@/components/home/promises-strip";
import { MethodDepth } from "@/components/home/method-depth";
import { AmbientVideo } from "@/components/media/ambient-video";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { HOME } from "@/lib/page-texts/home";

export default async function HomePage() {
  const t = await getPageTexts(HOME);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <OrganizationSchema />

      <HeroVolume t={t} />

      <section className="border-t border-[var(--border-strong)]">
        <Container>
          <div className="home-benefits !mt-0 !border-t-0 py-12" data-scroll data-reveal="stagger">
            {t.benefits.map((benefit) => (
              <div key={benefit.title}>
                <p className="text-body font-medium mb-2">{benefit.title}</p>
                <p className="text-body-sm text-[var(--muted-foreground)]">{benefit.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-4" data-scroll data-reveal="up">
              <Eyebrow className="mb-6">{t.demandsEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.demandsTitle)}</h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6">{t.demandsText}</p>
            </div>
            <div className="lg:col-span-8" data-scroll data-reveal="up" style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
              <AmbientVideo
                src="/videos/perso-demandes.mp4"
                poster="/videos/perso-demandes.jpg"
                label="Animation : une cliente débordée par ses demandes, qui finissent toutes au même endroit"
                transcript="Une journée comme les autres. Les demandes arrivent de partout : mails, documents, téléphone, post-it, tableurs. Un membre de l’équipe arrive avec un ordinateur : on vous construit un site qui les rassemble, et toutes les demandes arrivent au même endroit. Et vous retrouvez du temps pour votre métier. Moins de tableurs, plus de temps pour vous."
              />
            </div>
          </div>
        </Container>
      </section>

      <PromisesStrip promises={t.promises} intro={{ eyebrow: t.promisesEyebrow, title: t.promisesTitle, text: t.promisesText, link: t.promisesLink }} />

      <ProjectSelection eyebrow={t.projectsEyebrow} title={rich(t.projectsTitle)} />

      <MethodDepth steps={t.steps} eyebrow={t.methodEyebrow} title={t.methodTitle} />

      {/* ========== STACK ========== */}
      <section className="section-y border-t border-[var(--border)]">
        <MotionReveal>
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Eyebrow className="mb-6 justify-center">{t.stackEyebrow}</Eyebrow>
              <h2 className="text-h1">{rich(t.stackTitle)}</h2>
              <p className="text-body text-[var(--muted-foreground)] mt-6">{t.stackText}</p>
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
            <div><Eyebrow className="mb-5">{t.localEyebrow}</Eyebrow><h2 className="text-h2">{rich(t.localTitle)}</h2></div>
            <p className="text-body text-[var(--muted-foreground)]">{t.localText}</p>
            <Link href="/equipe" className="home-text-link">{t.localLink}<ArrowRight className="size-4" aria-hidden /></Link>
          </div>
        </Container>
      </section>

      <ServiceCta
        eyebrow={t.ctaEyebrow}
        title={rich(t.ctaTitle)}
        description={t.ctaText}
        primaryLabel={t.ctaPrimary}
        secondaryLabel={t.ctaSecondary}
      />
    </main>
  );
}

// ============================================================
// DATA
// ============================================================




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
