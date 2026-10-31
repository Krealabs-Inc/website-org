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

import { ProjectSelection } from "@/components/projects/project-selection";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceResources } from "@/components/services/service-resources";
import { ServiceFAQ } from "@/components/services/service-faq";
import { ServiceSchema } from "@/components/seo/service-schema";

export const metadata: Metadata = {
  title: "Agence WordPress à Rouen - Création, refonte, WooCommerce, SEO",
  description:
    "Agence WordPress à Rouen : vous modifiez vos contenus vous-même, votre site reste rapide et sécurisé. Création sur mesure, refonte, WooCommerce, SEO et maintenance en Normandie, sans page builder.",
  alternates: { canonical: "https://krealabs.fr/services/wordpress" },
  openGraph: {
    title: "Agence WordPress à Rouen - Krealabs",
    description:
      "Vous gérez votre site WordPress vous-même, on s'occupe du reste : création sur mesure, WooCommerce, refonte, SEO, maintenance. Agence web à Rouen, en Normandie.",
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
        eyebrow="Site WordPress sur mesure"
        title={
          <>
            Votre site <em>WordPress</em>,
            <br />
            simple à faire vivre.
          </>
        }
        description="Un site à votre image, des contenus que vous mettez à jour vous-même, et une équipe joignable dès que vous en avez besoin. À Rouen et partout en France."
        primaryCta={{ label: "Parler de mon projet WordPress", href: "/contact?type=devis" }}
      />

      <ProjectSelection
        slugs={["iliass", "main-verte"]}
        eyebrow="Réalisations WordPress"
        title={<>Un même outil.<br />Des besoins <em>très différents.</em></>}
      />

      <ServiceFeatures
        number="01"
        eyebrow="Ce que vous obtenez"
        title={
          <>
            Un site pour votre activité.<br />Une gestion <em>à votre portée.</em>
          </>
        }
        intro="De l'idée à la maintenance, vous avez un seul interlocuteur pour toute la vie de votre site."
        features={FEATURES}
      />

      {/* MÉTHODE */}
      <section className="section-y border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Eyebrow number="02" className="mb-6">Méthode</Eyebrow>
              <h2 className="text-h1 mb-6">
                Un site rapide, que vous <em>maîtrisez</em>.
              </h2>
              <p className="text-body text-[var(--muted-foreground)] mb-6">
                Votre site repose sur un thème sur mesure (PHP, HTML, CSS), avec
                ACF Pro pour vos contenus. Sans Elementor ni Divi, il reste
                rapide, léger et simple à maintenir.
              </p>
              <p className="text-body text-[var(--muted-foreground)]">
                Si votre projet le justifie, il peut passer en{" "}
                <strong className="text-[var(--foreground)] font-medium">
                  headless WordPress
                </strong>{" "}
                : vous gardez l’administration WordPress, et Next.js affiche
                vos pages plus vite à vos visiteurs.
              </p>
            </div>
            <ol className="lg:col-span-7 space-y-3">
              {STEPS.map((step, i) => (
                <li key={step.title} className="editorial-step">
                  <span className="editorial-ordinal">
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
              Des extensions éprouvées au quotidien, choisies pour que votre
              site reste rapide, sûr et sauvegardé.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-0">
            {WP_STACK.map((tool) => (
              <div
                key={tool.name}
                className="compact-note"
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
              Votre secteur, <em>vos besoins</em>.
            </h2>
            <p className="text-body text-[var(--muted-foreground)] mt-6">
              Site vitrine, boutique de PME, média ou site institutionnel :
              WordPress s’adapte à votre activité.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SECTEURS.map((s) => {
              return (
                <div key={s.title} className="editorial-note">
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

      {/* FAQ WORDPRESS - avec FAQPage schema */}
      <ServiceFAQ
        title={
          <>
            Vos questions sur <em>WordPress</em>.
          </>
        }
        items={FAQ.map((item) => ({ question: item.q, answer: item.a }))}
      />


      <ServiceResources
        articles={[
          { href: "/blog/headless-wordpress-nextjs-guide", kicker: "Headless", title: "Headless WordPress avec Next.js : le guide honnête (et quand l'éviter)" },
          { href: "/blog/pourquoi-wordpress-reste-le-bon-choix-2026", kicker: "WordPress", title: "Pourquoi WordPress reste le bon choix en 2026" },
          { href: "/blog/refonte-wordpress-2026-methode-agence-rouen", kicker: "Refonte", title: "Refonte WordPress 2026 : la méthode complète d'une agence à Rouen" },
          { href: "/blog/delais-livraison-site-wordpress", kicker: "Planning", title: "Combien de temps pour livrer un site WordPress ?" },
          { href: "/blog/woocommerce-b2b-erp-tarifs-negocies", kicker: "WooCommerce B2B", title: "WooCommerce B2B : intégrations ERP et tarifs négociés" },
        ]}
      />

      <ServiceCta
        title={
          <>
            Un projet <em>WordPress</em> à lancer ?
          </>
        }
        description="Que ce soit un site vitrine, une boutique WooCommerce, une refonte ou une migration - discutons-en. Le premier échange est offert."
        primaryLabel="Parler de mon projet WordPress"
      />
    </main>
  );
}



const FEATURES = [
  {
    icon: Wrench,
    title: "Création WordPress sur mesure",
    description:
      "Un site rapide et léger, taillé pour vos besoins exacts : thème développé à la main (PHP + ACF Pro), sans page builder.",
  },
  {
    icon: RefreshCw,
    title: "Refonte & migration",
    description:
      "Vous changez de site sans perdre vos positions Google : refonte d'un WordPress existant ou migration depuis Wix, Squarespace, Webflow, Joomla.",
  },
  {
    icon: ShoppingBag,
    title: "WooCommerce e-commerce",
    description:
      "Vous vendez en ligne, de la TPE à plus de 10 000 produits : paiements, stock, livraison, automatisations.",
  },
  {
    icon: Search,
    title: "SEO WordPress",
    description:
      "Vous ressortez vraiment dans Google : audit, Yoast / RankMath, structure, schema.org, Core Web Vitals.",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & sécurité",
    description:
      "Vous n'y pensez plus : mises à jour, sauvegardes, surveillance, sécurité et support, au forfait mensuel.",
  },
  {
    icon: Boxes,
    title: "Plugins & thèmes custom",
    description:
      "Votre site fait exactement ce dont votre métier a besoin : plugins et thèmes sur mesure, documentés et maintenables.",
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
      "Vous validez les maquettes Figma et la structure de vos contenus (types de contenus, champs ACF) avant le code.",
  },
  {
    title: "Développement thème custom",
    description:
      "Thème sur mesure (PHP/HTML/CSS), ACF Pro, extensions choisies et configurées. Rien de superflu.",
  },
  {
    title: "Mise en ligne & formation",
    description:
      "Mise en ligne, sécurisation, cache et CDN. Formation pour que vous soyez autonome, documentation, maintenance si vous la souscrivez.",
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
    a: "Les page builders ajoutent du code superflu (bloat) qui ralentit le site, complique la maintenance et nuit au SEO. Pour les projets exigeants, un thème custom est toujours plus performant, plus léger et plus durable. Pour un site très simple, un page builder peut suffire, mais vous le paierez en vitesse et en maintenance dès que le site grandira.",
  },
  {
    q: "Combien coûte un site WordPress sur mesure ?",
    a: "Cela dépend totalement du projet : vitrine simple (4-6k €), site complexe avec custom post types (8-15k €), WooCommerce (10-20k €), grand projet avec headless (20k+). Vous recevez toujours un devis détaillé après un premier échange gratuit.",
  },
  {
    q: "Faites-vous de la migration depuis Wix/Squarespace/Webflow ?",
    a: "Oui, c'est même un classique : Wix, Squarespace, Webflow ou vieux WordPress vers un WordPress propre. Votre référencement est préservé (redirections 301, structure des URL, métadonnées), sans perte de positionnement Google.",
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
    a: "Oui, votre hébergement actuel convient (OVH, o2switch, Hostinger, AWS ou autre). Si vous voulez changer, on vous conseillera o2switch (FR, RGPD, performant) ou Kinsta (premium WordPress) selon votre site.",
  },
];
