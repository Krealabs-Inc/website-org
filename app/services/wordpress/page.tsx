import { Metadata } from "next";
import {
  Wrench,
  RefreshCw,
  ShoppingBag,
  Search,
  ShieldCheck,
  Boxes,
  Cable,
  Building2,
  Stethoscope,
  UtensilsCrossed,
  Briefcase,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceFAQ } from "@/components/services/service-faq";
import { NewsletterSignup } from "@/components/newsletter/newsletter-signup";
import { ServiceSchema } from "@/components/seo/service-schema";

export const metadata: Metadata = {
  title: "Agence WordPress à Rouen — Création, refonte, WooCommerce, SEO",
  description:
    "Agence WordPress à Rouen et en Normandie. Création sur mesure, refonte, WooCommerce, SEO, maintenance et sécurité WordPress. Thèmes custom, plugins développés sur mesure, pas de page builders.",
  alternates: { canonical: "https://krealabs.fr/services/wordpress" },
  openGraph: {
    title: "Agence WordPress à Rouen — Krealabs",
    description:
      "Spécialistes WordPress en Normandie : création sur mesure, WooCommerce, refonte, SEO, maintenance. Du thème custom au headless WordPress.",
    url: "https://krealabs.fr/services/wordpress",
    type: "website",
  },
};

export default function WordpressPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <ServiceSchema
        name="Création de site WordPress sur mesure"
        description="Agence WordPress à Rouen : création, refonte, WooCommerce, SEO, maintenance, sécurité. Thèmes custom (pas de page builders), plugins développés à la main, headless WordPress quand pertinent."
        url="https://krealabs.fr/services/wordpress"
        serviceType="Création de site WordPress"
        priceRange="€€"
        offers={[
          { name: "Création WordPress sur mesure", description: "Thème custom, ACF Pro, pas de page builders" },
          { name: "Refonte & migration", description: "Migration Wix/Squarespace/Webflow vers WordPress propre" },
          { name: "WooCommerce e-commerce", description: "Boutiques en ligne complètes" },
          { name: "SEO WordPress", description: "Audit, optimisation Yoast/RankMath, Core Web Vitals" },
          { name: "Maintenance & sécurité", description: "Forfaits mensuels, monitoring, durcissement" },
          { name: "Plugins & thèmes custom", description: "Développement WP sur mesure" },
          { name: "Headless WordPress", description: "WP back + Next.js front" },
        ]}
      />
      <ServiceHero
        number="01"
        eyebrow="Spécialité · WordPress"
        title={
          <>
            Agence <em>WordPress</em> à Rouen,
            <br />
            depuis la cr&#233;ation jusqu'au headless.
          </>
        }
        description="WordPress est notre spécialité historique. Création sur mesure, refonte, WooCommerce, SEO, maintenance et sécurité. Thèmes custom, plugins développés à la main — pas de page builders, pas de templates génériques."
        primaryCta={{ label: "Discuter de mon projet WordPress", href: "/contact?type=devis" }}
      />

      {/* Stats WordPress */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)]/40">
        <Container>
          <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-h2 font-semibold tracking-[-0.03em] text-[var(--accent)]">
                  {s.value}
                </p>
                <p className="text-caption mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ServiceFeatures
        number="01"
        eyebrow="Notre offre WordPress"
        title={
          <>
            Du <em>thème custom</em> au <em>headless</em>.
          </>
        }
        intro="Six prestations qui couvrent l'ensemble du cycle de vie d'un projet WordPress, de l'idée à la maintenance long terme."
        features={FEATURES}
      />

      {/* MÉTHODE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Pas de <em>page builder</em>, du vrai WordPress.
              </h2>
              <p className="text-body text-[var(--muted-foreground)] mb-6">
                Nous développons des thèmes sur mesure (PHP, HTML, CSS) avec
                ACF Pro pour les contenus dynamiques. Pas d'Elementor, pas de
                Divi, pas de bloat. Des sites rapides, légers, faciles à
                maintenir.
              </p>
              <p className="text-body text-[var(--muted-foreground)]">
                Quand le projet le justifie, on passe en{" "}
                <strong className="text-[var(--foreground)] font-medium">
                  headless WordPress
                </strong>{" "}
                : WP comme back-office CMS, Next.js en front pour la
                performance et l'expérience utilisateur.
              </p>
            </div>
            <ol className="lg:col-span-7 space-y-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
              {STEPS.map((step, i) => (
                <li key={step.title} className="bg-[var(--background)] p-8 grid grid-cols-[auto_1fr] gap-8 items-start">
                  <span className="text-eyebrow text-[var(--accent)] pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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

      {/* STACK WORDPRESS */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mb-16">
            <Eyebrow number="03" className="mb-6">Stack WordPress</Eyebrow>
            <h2 className="text-h1">
              Les outils qui font la <em>différence</em>.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">
              Une sélection rigoureuse d'extensions et d'outils que nous
              utilisons quotidiennement sur les projets WordPress sérieux.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {WP_STACK.map((tool) => (
              <div
                key={tool.name}
                className="p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)]"
              >
                <p className="text-caption mb-1.5">{tool.kind}</p>
                <p className="text-body font-semibold">{tool.name}</p>
                <p className="text-body-sm text-[var(--muted-foreground)] mt-1">
                  {tool.tagline}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTEURS */}
      <section className="section-y border-t border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-dot opacity-30" aria-hidden />
        <Container className="relative">
          <div className="max-w-3xl mb-16">
            <Eyebrow number="04" className="mb-6">Secteurs accompagnés</Eyebrow>
            <h2 className="text-h1">
              WordPress, c'est pour <em>tout le monde</em>.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">
              Du site vitrine au site e-commerce de PME, en passant par les
              plateformes média et les sites institutionnels. WordPress
              s'adapte à pratiquement tous les besoins.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] rounded-[var(--radius)] overflow-hidden">
            {SECTEURS.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-[var(--background)] p-8">
                  <div className="size-10 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center mb-6">
                    <Icon className="size-4 text-[var(--accent)]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-h4 mb-2">{s.title}</h3>
                  <p className="text-body-sm text-[var(--muted-foreground)]">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FAQ WORDPRESS — avec FAQPage schema */}
      <ServiceFAQ
        title={
          <>
            Tout savoir sur nos projets <em>WordPress</em>.
          </>
        }
        items={FAQ.map((item) => ({ question: item.q, answer: item.a }))}
      />

      <section className="section-y border-t border-[var(--border)]">
        <Container size="narrow">
          <NewsletterSignup variant="card" source="services-wordpress" />
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Un projet <em>WordPress</em> à lancer ?
          </>
        }
        description="Que ce soit un site vitrine, une boutique WooCommerce, une refonte ou une migration — discutons-en. Le premier échange est offert."
        primaryLabel="Démarrer mon projet WordPress"
      />
    </main>
  );
}

const STATS = [
  { value: "100+", label: "Projets web livrés" },
  { value: "10+ ans", label: "Expérience WordPress" },
  { value: "WooCommerce", label: "Expert e-commerce" },
  { value: "< 2s", label: "Temps de chargement" },
];

const FEATURES = [
  {
    icon: Wrench,
    title: "Création WordPress sur mesure",
    description:
      "Thème développé à la main (PHP custom + ACF Pro), pas de page builders. Site rapide, léger, conforme à vos besoins exacts.",
  },
  {
    icon: RefreshCw,
    title: "Refonte & migration",
    description:
      "Refonte d'un WordPress existant ou migration depuis Wix, Squarespace, Webflow, Joomla. SEO préservé, redirections 301 propres.",
  },
  {
    icon: ShoppingBag,
    title: "WooCommerce e-commerce",
    description:
      "Boutiques en ligne WooCommerce sur mesure : paiements, stock, livraison, automatisations. De la TPE à 10k+ produits.",
  },
  {
    icon: Search,
    title: "SEO WordPress",
    description:
      "Audit complet, optimisation Yoast / RankMath, structure, schema.org, Core Web Vitals. Pour ressortir vraiment dans Google.",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & sécurité",
    description:
      "Forfaits mensuels : mises à jour, backups, monitoring, durcissement sécurité, support technique. Tranquillité long terme.",
  },
  {
    icon: Boxes,
    title: "Plugins & thèmes custom",
    description:
      "Développement de plugins et thèmes WordPress sur mesure pour vos besoins métier spécifiques. Code propre, documenté, maintenable.",
  },
];

const STEPS = [
  {
    title: "Audit & cadrage",
    description:
      "Compréhension de votre métier, objectifs, contraintes. Audit du site existant si refonte. Brief écrit validé.",
  },
  {
    title: "Maquettes & contenus",
    description:
      "Maquettes Figma haute fidélité. Structure éditoriale, taxonomies, custom post types, champs ACF. Tout est cadré avant le code.",
  },
  {
    title: "Développement thème custom",
    description:
      "Thème WordPress sur mesure (PHP/HTML/CSS), intégration ACF Pro, plugins choisis et configurés. Pas de bloat.",
  },
  {
    title: "Mise en ligne & formation",
    description:
      "Déploiement, sécurisation, configuration cache/CDN. Formation à l'admin WP. Documentation. Maintenance si forfait souscrit.",
  },
];

const WP_STACK = [
  { kind: "Champs", name: "ACF Pro", tagline: "Champs personnalisés robustes" },
  { kind: "SEO", name: "RankMath", tagline: "Préféré à Yoast en 2026" },
  { kind: "Cache", name: "WP Rocket", tagline: "Performance immédiate" },
  { kind: "Sécurité", name: "Wordfence", tagline: "Pare-feu + scan malwares" },
  { kind: "Backups", name: "UpdraftPlus", tagline: "Sauvegardes automatisées" },
  { kind: "E-commerce", name: "WooCommerce", tagline: "Standard du e-commerce WP" },
  { kind: "Formulaires", name: "Gravity Forms", tagline: "Formulaires avancés + intégrations" },
  { kind: "Page builder ?", name: "Aucun", tagline: "Thème custom uniquement" },
  { kind: "Hébergement", name: "o2switch / Kinsta", tagline: "Spécialisé WordPress" },
  { kind: "CDN", name: "Cloudflare", tagline: "Cache global + DDoS" },
  { kind: "Headless", name: "WPGraphQL", tagline: "API GraphQL pour Next.js" },
  { kind: "Monitoring", name: "ManageWP", tagline: "Multi-sites monitoring" },
];

const SECTEURS = [
  {
    icon: Building2,
    title: "Entreprises & institutionnels",
    description: "Sites vitrines corporate, PME, professions libérales, cabinets. Structure et SEO solides.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce & artisans",
    description: "Boutiques WooCommerce pour producteurs locaux, artisans, créateurs, retailers, marketplaces.",
  },
  {
    icon: Stethoscope,
    title: "Santé & professions réglementées",
    description: "Sites pour médecins, cabinets dentaires, ostéopathes. Conformité RGPD, prise de RDV, contenus.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restauration & hôtellerie",
    description: "Sites restaurants, hôtels, gîtes en Normandie. Menus dynamiques, réservation, photos.",
  },
  {
    icon: Briefcase,
    title: "Cabinet conseil & services B2B",
    description: "Sites pour cabinets, agences, consultants. Présentation expertise, études de cas, ressources.",
  },
  {
    icon: Cable,
    title: "Média & contenus",
    description: "Blogs éditoriaux, magazines, plateformes de contenu, newsletters. Performance + SEO contenu.",
  },
];

const FAQ = [
  {
    q: "Pourquoi pas Elementor, Divi ou un page builder ?",
    a: "Les page builders ajoutent du code superflu (bloat) qui ralentit le site, complique la maintenance et nuit au SEO. Pour les projets exigeants, un thème custom est toujours plus performant, plus léger et plus durable. Pour des sites très simples sans contraintes, un page builder peut suffire — mais c'est rarement notre choix.",
  },
  {
    q: "Combien coûte un site WordPress sur mesure ?",
    a: "Cela dépend totalement du projet : vitrine simple (4-6k €), site complexe avec custom post types (8-15k €), WooCommerce (10-20k €), grand projet avec headless (20k+). Nous fournissons systématiquement un devis détaillé après un premier échange gratuit.",
  },
  {
    q: "Faites-vous de la migration depuis Wix/Squarespace/Webflow ?",
    a: "Oui, c'est même un classique. Nous migrons régulièrement des sites Wix, Squarespace, Webflow ou vieux WordPress vers une stack WP propre, en préservant le SEO (redirections 301, structure URL, métadonnées). Sans perte de positionnement Google.",
  },
  {
    q: "Le \"headless WordPress\", c'est quoi ?",
    a: "C'est utiliser WordPress comme back-office uniquement (les rédacteurs continuent d'utiliser l'interface WP qu'ils connaissent), pendant que le site visible côté client tourne sur une stack moderne (Next.js / React). On obtient le meilleur des deux : l'ergonomie WP pour l'édition + la performance native de Next.js pour les visiteurs.",
  },
  {
    q: "Quels forfaits de maintenance proposez-vous ?",
    a: "Trois niveaux : maintenance corrective (mises à jour + backups + monitoring), maintenance évolutive (corrective + 2-4h de modifications/mois), maintenance premium (évolutive + SLA réactif + audit trimestriel). Tarifs sur devis selon volume de sites et exigences.",
  },
  {
    q: "Travaillez-vous avec des hébergements existants ?",
    a: "Oui. Nous nous adaptons à votre hébergement actuel (OVH, o2switch, Hostinger, AWS, ou autre). Si vous voulez changer, nous recommandons o2switch (FR, RGPD, performant) ou Kinsta (premium WordPress) selon votre profil de site.",
  },
];
