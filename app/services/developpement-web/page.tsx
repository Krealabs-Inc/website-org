import { Metadata } from "next";
import {
  Globe,
  Database,
  ShoppingCart,
  Server,
  Search,
  RefreshCw,
  Zap,
  Code2,
  GitBranch,
  Cloud,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Développement web à Rouen — Sites & applications",
  description:
    "Création de sites internet, plateformes SaaS et applications métier sur mesure à Rouen. Stack moderne Next.js, React, TypeScript. Architecture scalable, performance native.",
  keywords: [
    "développement web rouen",
    "création site internet rouen",
    "agence next.js rouen",
    "développeur react rouen",
    "site web entreprise normandie",
  ],
  alternates: { canonical: "https://krealabs.fr/services/developpement-web" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";

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
      <ServiceHero
        number="01"
        eyebrow="Service · Développement"
        title={
          <>
            Sites & applications <em>web</em>,
            <br />
            propres et performants.
          </>
        }
        description="Sites vitrines, plateformes SaaS, applications métier sur mesure. Nous concevons et développons des outils digitaux qui durent — propre code, architecture pensée, performance native."
      />

      <ServiceFeatures
        number="01"
        eyebrow="Ce que nous construisons"
        title={
          <>
            Du site vitrine à l'<em>application métier</em>.
          </>
        }
        intro="Notre périmètre couvre l'ensemble des projets web modernes, du marketing au logiciel interne."
        features={FEATURES}
      />

      {/* PROCESS */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Un <em>processus rodé</em>, sans surprise.
              </h2>
              <p className="text-body text-[var(--muted-foreground)]">
                Chaque projet suit ces 4 étapes. Les démos régulières vous
                permettent de réagir tôt — pas de mauvaise surprise à la
                livraison.
              </p>
            </div>
            <ol className="lg:col-span-7 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {STEPS.map((step, i) => (
                <li key={step.title} className="bg-[var(--background)] p-8 grid grid-cols-[auto_1fr] gap-8 items-start">
                  <span className="text-eyebrow text-[var(--accent)] pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-h3 mb-2">{step.title}</h3>
                    <p className="text-body-sm text-[var(--muted-foreground)]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* TECH */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="03" className="mb-6">Stack technique</Eyebrow>
            <h2 className="text-h1">
              Les outils sur lesquels nous <em>misons</em>.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TECH.map((t) => (
              <div key={t.name} className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]">
                <p className="text-caption mb-3">{t.kind}</p>
                <p className="text-h4 mb-2">{t.name}</p>
                <p className="text-body-sm text-[var(--muted-foreground)]">{t.tagline}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceFAQ
        title={
          <>
            Vos questions sur le <em>développement web</em>.
          </>
        }
        items={FAQ}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <NewsletterSignup variant="card" source="services-dev-web" />
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Un site web à <em>concevoir</em> ?
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
      "WordPress excelle pour les sites de contenu (vitrines, blogs, e-commerce simple) où les rédacteurs doivent éditer en autonomie. Next.js est le bon choix dès qu'on parle de SaaS, dashboards, applications métier, sites à très fort trafic, ou expériences UX sur mesure. Notre règle : si l'admin doit publier du contenu plusieurs fois par semaine sans nous solliciter → WordPress. Si l'app est l'outil métier → Next.js.",
  },
  {
    question: "Combien coûte un développement web sur mesure à Rouen ?",
    answer:
      "Pour un site Next.js / React custom : 8 000-25 000 € pour un site institutionnel premium, 25 000-60 000 € pour un MVP SaaS, 60 000-150 000 € pour une plateforme complète. Nos TJM se situent autour de 600-700 €/jour à Rouen (vs 800-1 200 € en agence parisienne équivalente). Premier devis détaillé après cadrage gratuit.",
  },
  {
    question: "Quels sont vos délais sur une plateforme custom ?",
    answer:
      "Un MVP SaaS solide (login, dashboard, 2-3 features) : 6-10 semaines. Une plateforme complète (multi-utilisateurs, paiement, intégrations tierces, mobile responsive) : 12-20 semaines. Les délais varient surtout selon votre vitesse de validation des maquettes et de retour sur les démos hebdomadaires.",
  },
  {
    question: "Que se passe-t-il quand le projet évolue après livraison ?",
    answer:
      "Trois options : (1) Forfait évolutif mensuel pour ~5-15h de dev/mois selon vos besoins. (2) Régie ponctuelle pour les évolutions plus lourdes (refonte section, ajout feature majeure). (3) Vous reprenez la main avec votre équipe interne — le code est propre, documenté, vous appartient. Pas de lock-in.",
  },
  {
    question: "Comment garantissez-vous la qualité du code ?",
    answer:
      "TypeScript strict, tests unitaires sur la logique critique, code review systématique entre nous deux, CI/CD automatisé (lint + tests + déploiement), monitoring production (Sentry, Vercel Analytics). Vous avez accès au dépôt Git dès le jour 1 — tout est transparent.",
  },
  {
    question: "Travaillez-vous avec ma stack actuelle si je veux étendre l'existant ?",
    answer:
      "Oui, fréquemment. On audite votre code, on s'aligne sur vos conventions, et on intègre nos développements dans votre repo. Nous sommes à l'aise avec React, Next.js, Vue, Nuxt, Node.js, Python (Django, FastAPI), PHP (Laravel, Symfony). Si la stack est trop ancienne et bloque la productivité, on vous le dit — et on propose un plan de modernisation incrémental.",
  },
];

const FEATURES = [
  {
    icon: Globe,
    title: "Site vitrine moderne",
    description: "Site institutionnel ou one-page pour PME, indépendants, professions libérales. Optimisé SEO local.",
  },
  {
    icon: Database,
    title: "Application web métier",
    description: "Outil interne, plateforme SaaS, intranet. Conçu autour de vos vrais besoins, pas d'un template.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce sur mesure",
    description: "Boutique en ligne avec moyens de paiement, gestion stocks, suivi commandes. Headless ou intégré.",
  },
  {
    icon: Server,
    title: "API & backend",
    description: "API REST ou GraphQL, base PostgreSQL, authentification. Documentation OpenAPI fournie.",
  },
  {
    icon: Search,
    title: "SEO technique",
    description: "Schema.org, sitemap dynamique, métadonnées, Core Web Vitals. Pensé dès le développement.",
  },
  {
    icon: RefreshCw,
    title: "Refonte de site",
    description: "Migration d'un site Wix, Squarespace, Webflow ou ancien CMS vers la stack adaptée à votre projet — WordPress moderne ou stack JavaScript selon le besoin. SEO préservé.",
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
    description: "Sprints de 1 à 2 semaines, démo à chaque fin de sprint. Accès au dépôt Git dès le jour 1.",
  },
  {
    title: "Mise en ligne & suivi",
    description: "Déploiement, formation, monitoring. Nous restons disponibles pour les évolutions futures.",
  },
];

const TECH = [
  { kind: "Framework", name: "Next.js", tagline: "React production-grade, App Router" },
  { kind: "Langage", name: "TypeScript", tagline: "Typage strict, code maintenable" },
  { kind: "Style", name: "Tailwind CSS", tagline: "Design system rapide, cohérent" },
  { kind: "Données", name: "Prisma + Postgres", tagline: "ORM typé, base relationnelle robuste" },
];
