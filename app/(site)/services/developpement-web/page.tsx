import { Metadata } from "next";
import Link from "next/link";
import { Globe, Database, ShoppingCart, Server, Search, RefreshCw, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Développement web Rouen, Normandie - Sites & outils sur mesure",
  description:
    "Développement web en Normandie : un site qui vous amène des clients, des outils métier sans tableurs ni ressaisie. Agence web à Rouen : sites vitrines, SaaS et applications sur mesure.",
  alternates: { canonical: "https://krealabs.fr/services/developpement-web" },
};

import { ProjectSelection } from "@/components/projects/project-selection";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SheetHero } from "@/components/services/dev/sheet-hero";
import { SheetToDashboard } from "@/components/services/dev/sheet-to-dashboard";
import { ServiceMethod } from "@/components/services/service-method";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceResources } from "@/components/services/service-resources";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export default function DeveloppementWebPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceSchema
        name="Développement web sur mesure"
        description="Création de sites web et applications sur mesure à Rouen. Next.js, React, TypeScript, Python, Node.js. Sites vitrines, SaaS, plateformes B2B, API."
        url="https://krealabs.fr/services/developpement-web"
        serviceType="Création de site internet sur mesure"
        priceRange="€€€"
        offers={[
          { name: "Site vitrine moderne" },
          { name: "Application web métier" },
          { name: "E-commerce sur mesure" },
          { name: "API & backend" },
          { name: "Refonte & migration" },
        ]}
      />
      {/* HERO: the shared spreadsheet dissolves behind the promise */}
      <SheetHero>
        <Container className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-10"
          >
            <ArrowLeft className="size-3.5" />
            Retour aux services
          </Link>
          <div className="mx-auto max-w-4xl">
            <span className="flex justify-center">
              <Eyebrow number="01" dot className="mb-8">Développement web sur mesure</Eyebrow>
            </span>
            <h1 className="text-display">
              Vos process tournent
              <br />
              sans <em>tableurs</em> ni ressaisie.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mx-auto mt-8 max-w-2xl">
              Un site vitrine qui vous amène des demandes, une application métier qui automatise vos tâches, une plateforme pour vos clients : un outil construit autour de votre façon de travailler, rapide et fait pour durer.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Parler de mon projet
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Voir toutes les solutions</Link>
              </Button>
            </div>
          </div>
        </Container>
      </SheetHero>

      {/* SIGNATURE: from the spreadsheet to the tool */}
      <SheetToDashboard />

      {/* WHAT YOU GET: a bento grid */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="mb-12 max-w-3xl" data-scroll data-reveal="up">
            <Eyebrow number="03" className="mb-6">Ce que vous obtenez</Eyebrow>
            <h2 className="text-h1">
              Du site vitrine à l’<em>application métier</em>.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">
              Que vous ayez besoin de vous faire connaître ou d’outiller vos équipes, vous trouvez la réponse ici, du site marketing au logiciel interne.
            </p>
          </div>
          <div className="bento" data-scroll data-reveal="stagger">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.title} className="bento-tile">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[var(--accent)]">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-h3">{f.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)] mt-3 max-w-md">{f.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* METHOD: the depth journey, used on this page only */}
      <ServiceMethod
        number="04"
        title={<>Vous voyez votre projet <em>avancer</em>.</>}
        intro={
          <>
            <p>Quatre étapes et des démos régulières : vous réagissez tôt, et rien ne vous surprend à la livraison.</p>
          </>
        }
        steps={STEPS}
      />

      {/* STACK: as a developer reads it, in code */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-scroll data-reveal="up">
              <Eyebrow number="05" className="mb-6">Stack technique</Eyebrow>
              <h2 className="text-h1">
                Des outils éprouvés, pour un site <em>qui dure</em>.
              </h2>
            </div>
            <div className="lg:col-span-7" data-scroll data-reveal="up">
              <div className="dev-code">
                <p className="dev-code-bar">votre-projet / stack.ts</p>
                <ol data-scroll data-reveal="stagger">
                  {TECH.map((tech) => (
                    <li key={tech.name}>
                      <span>
                        <span className="dev-code-key">{tech.name}</span>
                        <span className="dev-code-comment">{"  // "}{tech.tagline}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ProjectSelection
        slugs={["iliass", "meli-melo"]}
        eyebrow="Réalisations"
        title={<>Ce qu’on a livré pour<br /><em>ILIASS et Méli-Mélo.</em></>}
      />

      <ServiceFAQ
        title={
          <>
            Vos questions sur le <em>développement web</em>.
          </>
        }
        items={FAQ}
      />


      <ServiceResources
        articles={[
          { href: "/blog/nextjs-16-app-router-2026", kicker: "Next.js", title: "Next.js 16 : ce qui change vraiment en 2026" },
          { href: "/blog/react-19-production-bilan-1-an", kicker: "React", title: "React 19 en production : bilan honnête après 1 an d'usage" },
          { href: "/blog/typescript-10-patterns-agence", kicker: "TypeScript", title: "TypeScript : 10 patterns qui sauvent le code en agence" },
          { href: "/blog/prisma-6-postgres-orm", kicker: "Base de données", title: "Prisma 6 : pourquoi c'est notre ORM de référence" },
        ]}
      />

      <ServiceCta
        title={
          <>
            Et si on supprimait <em>vos tableurs</em> ?
          </>
        }
      />
    </main>
  );
}

const FAQ = [
  {
    question: "Quand choisir Next.js plutôt que WordPress ?",
    answer:
      "WordPress excelle pour les sites de contenu (vitrines, blogs, e-commerce simple) où les rédacteurs doivent éditer en autonomie. Next.js est le bon choix dès qu'on parle de SaaS, dashboards, applications métier, sites à très fort trafic, ou expériences UX sur mesure. En pratique : si vous publiez du contenu plusieurs fois par semaine en autonomie → WordPress. Si l'application est votre outil métier → Next.js.",
  },
  {
    question: "Combien coûte un développement web sur mesure à Rouen ?",
    answer:
      "Pour un site Next.js / React custom : 8 000-25 000 € pour un site institutionnel premium, 25 000-60 000 € pour un MVP SaaS, 60 000-150 000 € pour une plateforme complète. Le TJM se situe autour de 600-700 €/jour à Rouen (contre 800-1 200 € en agence parisienne équivalente). Vous recevez un devis détaillé après un cadrage gratuit.",
  },
  {
    question: "Quels sont vos délais sur une plateforme custom ?",
    answer:
      "Un MVP SaaS solide (login, dashboard, 2-3 features) : 6-10 semaines. Une plateforme complète (multi-utilisateurs, paiement, intégrations tierces, mobile responsive) : 12-20 semaines. Les délais varient surtout selon votre vitesse de validation des maquettes et de retour sur les démos hebdomadaires.",
  },
  {
    question: "Que se passe-t-il quand le projet évolue après livraison ?",
    answer:
      "Trois options : (1) Forfait évolutif mensuel pour ~5-15h de dev/mois selon vos besoins. (2) Régie ponctuelle pour les évolutions plus lourdes (refonte section, ajout feature majeure). (3) Vous reprenez la main avec votre équipe interne - le code est propre, documenté, vous appartient. Pas de lock-in.",
  },
  {
    question: "Comment garantissez-vous la qualité du code ?",
    answer:
      "Votre code est vérifié à chaque étape : TypeScript strict, tests unitaires sur la logique critique, relecture de code systématique, CI/CD automatisé (lint + tests + déploiement), surveillance en production (Sentry, Vercel Analytics). Vous avez accès au dépôt Git dès le premier jour.",
  },
  {
    question: "Travaillez-vous avec ma stack actuelle si je veux étendre l'existant ?",
    answer:
      "Oui, fréquemment. On audite votre code, on respecte vos conventions, et les nouveaux développements arrivent directement dans votre dépôt. React, Next.js, Vue, Nuxt, Node.js, Python (Django, FastAPI), PHP (Laravel, Symfony) : votre stack a de bonnes chances d'être déjà familière. Si elle est trop ancienne et vous freine, on vous le dit, avec un plan de modernisation progressif.",
  },
];

const FEATURES = [
  {
    icon: Globe,
    title: "Site vitrine moderne",
    description: "Vos prospects vous trouvent et vous contactent. Pour PME, indépendants et professions libérales, optimisé pour le SEO local.",
  },
  {
    icon: Database,
    title: "Application web métier",
    description: "Vos équipes travaillent dans un seul outil, conçu autour de vos vrais besoins : outil interne, plateforme SaaS, intranet.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce sur mesure",
    description: "Vous vendez en ligne avec vos moyens de paiement, votre stock et le suivi de vos commandes. Headless ou intégré.",
  },
  {
    icon: Server,
    title: "API & backend",
    description: "Vos outils se parlent enfin : API REST ou GraphQL, base PostgreSQL, authentification, documentation OpenAPI fournie.",
  },
  {
    icon: Search,
    title: "SEO technique",
    description: "Votre site part avec de bonnes bases pour Google : Schema.org, sitemap, métadonnées, Core Web Vitals, pensés dès le développement.",
  },
  {
    icon: RefreshCw,
    title: "Refonte de site",
    description: "Vous quittez Wix, Squarespace, Webflow ou un ancien CMS sans perdre votre référencement, vers WordPress ou une stack JavaScript selon votre besoin.",
  },
];

const STEPS = [
  {
    title: "Cadrage",
    description: "Premier appel pour comprendre votre métier, vos objectifs, vos contraintes. Brief écrit en sortie.",
  },
  {
    title: "Design",
    description: "Wireframes puis maquettes haute fidélité sur Figma. Vous validez chaque écran avant le développement.",
  },
  {
    title: "Développement",
    description: "Une démo toutes les 1 à 2 semaines et l'accès au dépôt Git dès le premier jour.",
  },
  {
    title: "Mise en ligne & suivi",
    description: "Mise en ligne, formation de votre équipe, surveillance. On reste joignable pour vos évolutions.",
  },
];

const TECH = [
  { kind: "Framework", name: "Next.js", tagline: "Des pages rapides et bien référencées" },
  { kind: "Langage", name: "TypeScript", tagline: "Moins de bugs, des évolutions sereines" },
  { kind: "Style", name: "Tailwind CSS", tagline: "Un design cohérent sur chaque page" },
  { kind: "Données", name: "Prisma + Postgres", tagline: "Vos données bien rangées et fiables" },
];
