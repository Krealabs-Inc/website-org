import { Metadata } from "next";
import { Clock, Layers, Target, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Travaux & références — Cas clients",
  description:
    "Trois cas clients réels : UniLaSalle Rouen (réseau social interne WordPress), Main Verte (migration SoLocal vers self-hosted), Meli Melo (e-commerce Next.js + Stripe). Contexte, choix technique, résultat.",
  alternates: { canonical: "https://krealabs.fr/clients" },
};

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceCta } from "@/components/services/service-cta";

interface ClientCase {
  industry: string;
  clientName: string;
  title: string;
  context: string;
  approach: string;
  outcome: string;
  stack: string[];
  duration: string;
}

const CASES: ClientCase[] = [
  {
    industry: "Enseignement supérieur",
    clientName: "UniLaSalle — Campus de Rouen",
    title: "Mini-réseau social interne pour la communauté du campus",
    context:
      "Le campus rouennais d'UniLaSalle, école d'ingénieurs polyvalente, voulait outiller sa communauté étudiante et son personnel avec une plateforme d'échange interne. Pas d'envie de dépendre d'un SaaS externe coûteux, ni de partir sur du custom from scratch trop lourd à maintenir pour leur équipe IT.",
    approach:
      "On a transformé WordPress en plateforme sociale plutôt qu'en blog : profils utilisateurs riches via ACF Pro, fil de publications avec interactions, multilingue FR/EN via Polylang, gestion fine des rôles et de la modération. Le pari : un produit social construit sur une base que l'équipe interne sait déjà administrer au quotidien.",
    outcome:
      "Plateforme déployée pour la communauté du campus, modérée en interne sans renfort externe, et entièrement contrôlée par UniLaSalle. Le choix WordPress + ACF a fait gagner plusieurs mois de roadmap par rapport à une solution custom — et a évité un abonnement SaaS récurrent.",
    stack: ["WordPress", "ACF Pro", "Polylang", "MySQL", "Theme custom"],
    duration: "≈ 3 mois",
  },
  {
    industry: "Artisan / PME locale",
    clientName: "Main Verte — Paysagiste (Eure-et-Loir, 28)",
    title: "Sortie de l'écosystème SoLocal vers WordPress self-hosted",
    context:
      "Cette entreprise de paysagisme du 28 était piégée sur SoLocal (ex-Pages Jaunes) : abonnement mensuel élevé, design daté, SEO local médiocre, et aucun contrôle réel sur le contenu ou les performances. L'objectif : reprendre la main sur leur présence en ligne sans exploser le budget d'une PME artisan.",
    approach:
      "Audit complet du site SoLocal existant, récupération du contenu utile (textes, photos chantiers), refonte sur WordPress self-hosted avec un theme custom léger et un focus SEO local strict : schema LocalBusiness, NAP cohérent sur toutes les pages, contenu structuré par zone d'intervention. Hébergement migré vers une infra autonome.",
    outcome:
      "Fin de l'abonnement SoLocal — économie annuelle directe dès la première année. Présence Google consolidée, performance Lighthouse nettement améliorée vs l'ancien site, et autonomie éditoriale complète pour ajouter chantiers et réalisations sans intervention agence.",
    stack: ["WordPress", "Theme custom", "Schema LocalBusiness", "Hébergement mutualisé", "WP-Rocket"],
    duration: "≈ 5 semaines",
  },
  {
    industry: "E-commerce artisan",
    clientName: "Meli Melo — Crochet fait main",
    title: "Boutique en ligne sur-mesure pour créatrice auto-entrepreneuse",
    context:
      "Une auto-entrepreneuse vendant ses créations crochet faites main voulait sortir des marketplaces (Etsy, Vinted) qui captent une marge importante sur chaque vente. Le défi : une boutique en ligne rapide, légère, qu'elle peut gérer seule — sans la lourdeur de WordPress + WooCommerce pour un catalogue qui reste modeste.",
    approach:
      "Plutôt que WooCommerce, on est partis sur du Next.js avec une base de données dédiée et Stripe en paiement direct. Rendu serveur pour le SEO, performances natives (pas de plugin à charger), back-office sur-mesure pour gérer le catalogue artisanal (photos en vedette, variantes couleur/taille, stock unitaire). Code propre, app rapide, hébergement Vercel à coût quasi nul à ce volume.",
    outcome:
      "Boutique en ligne directe, sans commission marketplace, avec une performance Lighthouse hors-norme pour de l'e-commerce. La créatrice ajoute et met à jour ses pièces depuis le back-office sans intervention extérieure — exactement l'autonomie qu'une TPE artisan recherche, avec une expérience d'achat moderne pour ses clientes.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Vercel"],
    duration: "≈ 3 semaines",
  },
];

export default function ClientsPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-50" aria-hidden />
        <Container className="relative">
          <div className="max-w-4xl">
            <Eyebrow dot className="mb-8">Travaux & références</Eyebrow>
            <h1 className="text-display">
              Trois <em>histoires</em>,
              <br />
              dites en clair.
            </h1>
            <p className="text-body-lg text-[var(--muted-foreground)] mt-8 max-w-2xl">
              Une partie de nos projets reste sous NDA. Voici trois réalisations
              dont nos clients ont accepté qu&apos;on parle — pour donner une
              idée concrète des problèmes qu&apos;on résout, des choix
              techniques qu&apos;on fait, et de ce qu&apos;on livre vraiment.
            </p>
          </div>
        </Container>
      </section>

      {/* APPROACH */}
      <section className="border-t border-[var(--border)] py-12 md:py-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="mb-6">Comment on travaille</Eyebrow>
            <p className="text-body text-[var(--muted-foreground)] leading-relaxed">
              Notre principe : le bon outil pour le bon problème. On ne pousse
              pas Next.js quand WordPress suffit, ni WordPress quand un produit
              custom est inévitable. Sur chaque mission, on commence par
              comprendre la contrainte réelle — budget, équipe interne, durée
              de vie attendue, autonomie souhaitée — puis on choisit la stack
              qui rend le projet <em>maintenable par le client</em> sur la
              durée. Les trois cas ci-dessous illustrent trois compromis très
              différents : un produit social bâti sur WordPress, une migration
              hors d&apos;une plateforme captive, et un e-commerce custom
              Next.js pour TPE artisan.
            </p>
          </div>
        </Container>
      </section>

      {/* CASES */}
      <section className="border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--border)] border-x border-b border-[var(--border)]">
            {CASES.map((c) => (
              <article
                key={c.clientName}
                className="bg-[var(--background)] p-8 md:p-10 flex flex-col gap-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <Badge variant="secondary">{c.industry}</Badge>
                  <span className="text-caption inline-flex items-center gap-1.5 text-[var(--muted-foreground)]">
                    <Clock className="size-3" />
                    {c.duration}
                  </span>
                </div>

                <div>
                  <p className="text-caption mb-2">{c.clientName}</p>
                  <h2 className="text-h3">{c.title}</h2>
                </div>

                <CaseField
                  icon={Target}
                  label="Contexte"
                  body={c.context}
                />
                <CaseField
                  icon={Wrench}
                  label="Approche"
                  body={c.approach}
                />
                <CaseField
                  icon={Layers}
                  label="Résultat"
                  body={c.outcome}
                />

                <div className="pt-6 border-t border-[var(--border)] mt-auto">
                  <p className="text-caption mb-3">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-caption px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted-foreground)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* TESTIMONIAL BLOCK */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow className="mb-8 justify-center">Témoignages</Eyebrow>
            <blockquote className="text-h2 leading-[1.3]">
              <span aria-hidden className="text-[var(--accent)]">«</span>
              {" "}
              Une <em>équipe à taille humaine</em> mais d&apos;un niveau
              technique très élevé. Les délais sont tenus, le code livré est
              propre, et surtout : ils comprennent vraiment notre métier.
              {" "}
              <span aria-hidden className="text-[var(--accent)]">»</span>
            </blockquote>
            <p className="text-caption mt-8">— Directeur produit, SaaS B2B</p>
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Et le <em>prochain</em>, c&apos;est vous ?
          </>
        }
        description="Que votre projet soit ambitieux ou modeste, nous le traitons avec la même exigence. Décrivez-nous votre contexte."
        primaryLabel="Démarrer la conversation"
      />
    </main>
  );
}

function CaseField({
  icon: Icon,
  label,
  body,
}: {
  icon: typeof Target;
  label: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="size-3.5 text-[var(--accent)]" strokeWidth={2} />
        <p className="text-eyebrow">{label}</p>
      </div>
      <p className="text-body-sm text-[var(--muted-foreground)] leading-relaxed">
        {body}
      </p>
    </div>
  );
}
