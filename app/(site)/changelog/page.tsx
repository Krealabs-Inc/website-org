import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ServiceCta } from "@/components/services/service-cta";

export const metadata: Metadata = {
  title: "Changelog - Journal des versions",
  description:
    "Journal des évolutions du site et de l'agence Krealabs depuis la création en 2020. Versions majeures, nouveautés et étapes au fil du temps.",
  alternates: { canonical: "https://krealabs.fr/changelog" },
  openGraph: {
    title: "Changelog - Journal des versions - Krealabs",
    description:
      "Journal des évolutions du site et de l'agence Krealabs depuis la création en 2020. Versions majeures, nouveautés et étapes au fil du temps.",
    url: "https://krealabs.fr/changelog",
    type: "website",
  },
};

type EntryType = "major" | "feature" | "fix";

interface Entry {
  version: string;
  date: string;
  type: EntryType;
  items: string[];
  highlights?: string[];
}

const CHANGELOG: Entry[] = [
  // ===== 2026 - La grande refonte =====
  {
    version: "3.3.0",
    date: "Mai 2026",
    type: "major",
    highlights: [
      "Newsletter Resend + calculateur de devis interactif",
      "Speed Insights + cookie consent + recherche Cmd+K",
    ],
    items: [
      "Newsletter Resend complète (DB + Audience + welcome + unsubscribe one-click RFC 8058)",
      "Calculateur de devis multi-étapes connecté au pipeline contact",
      "Recherche globale Cmd+K (Fuse.js, ~110 entrées indexées)",
      "Cookie consent banner RGPD avec animation slide-up",
      "Vercel Speed Insights pour le real user monitoring",
      "Skip-to-content link (accessibilité WCAG 2.4.1)",
      "A/B testing middleware (puis renommé proxy avec Next.js 16)",
      "12 articles blog programmés pour les 6 prochains mois (ISR + cron quotidien)",
      "OG images dynamiques pour comparateurs, lexique, calculateur, villes, secteurs",
    ],
  },
  {
    version: "3.2.0",
    date: "Mai 2026",
    type: "feature",
    highlights: ["SEO local boost massif", "AI search ready"],
    items: [
      "+5 villes Normandie : Dieppe, Fécamp, Bayeux, Cherbourg, Granville (9 villes au total)",
      "+18 secteurs programmatic SEO sous /agence-web-rouen/[secteur]",
      "Cluster blog Rouen : 4 nouveaux articles ciblés SEO local",
      "Lexique technique 21 termes (DefinedTerm schema pour AI search)",
      "Comparateurs : WordPress vs Webflow, WooCommerce vs Shopify, Next.js vs WP, RN vs Flutter + 3 autres",
      "Author E-E-A-T : pages auteur dédiées /equipe/[slug] avec Person schema enrichi",
      "FAQ schema sur les 5 pages services",
      "HowTo schema auto-injecté sur les articles guides numérotés",
      "llms.txt à la racine + IndexNow + GitHub Action auto-ping",
      "Headers sécurité CSP report-only + COOP + HSTS preload",
      "Sitemap passé de 44 à ~110 URLs",
    ],
  },
  {
    version: "3.1.0",
    date: "Mai 2026",
    type: "feature",
    highlights: ["Pages légales conformes", "Footer cinématique"],
    items: [
      "Pages Mentions légales, Politique de confidentialité, CGV (conformes GIE)",
      "Footer refondu : curtain reveal façon motion-footer (clip-path + position fixed)",
      "Wordmark XXL avec scintillement + empilement de calques + parallax framer-motion",
      "Sparkles overlay (desktop + motion-safe)",
      "4 templates emails React refondus (contact admin/visiteur, waitlist admin/visiteur, newsletter welcome)",
      "Logo Krealabs intégré dans tous les emails (apple-touch-icon)",
    ],
  },
  {
    version: "3.0.0",
    date: "Mai 2026",
    type: "major",
    highlights: ["Refonte totale du site Krealabs"],
    items: [
      "Migration vers email Resend (domaine krealabs.fr vérifié, DKIM + SPF)",
      "Refonte complète du frontend autour d'un design system unifié",
      "Geist + Instrument Serif Italic comme typographies signatures, Switzer auto-hébergée pour l'UI",
      "Suppression du système de paiement Stripe au profit d'un formulaire de contact qualifiant",
      "OG image dynamique sur tous les blogs et pages auteur",
      "Optimisation Core Web Vitals : Lighthouse 95+ sur 90% des pages",
      "Color officielle Krealabs (#8F99ED) appliquée partout",
    ],
  },

  // ===== 2025 - Modernisation stack =====
  {
    version: "2.8.0",
    date: "Décembre 2025",
    type: "feature",
    items: [
      "Cadrage de la refonte v3 (audit complet du site existant, definition design system)",
      "Migration des templates emails de HTML vers React",
      "Adoption Vercel Analytics + Search Console DNS verification",
    ],
  },
  {
    version: "2.7.0",
    date: "Septembre 2025",
    type: "feature",
    highlights: ["SEO technique avancé"],
    items: [
      "Schema.org enrichi : Organization, Article, BreadcrumbList, FAQPage, Person",
      "Sitemap.xml automatique avec priorités par typologie",
      "Migration vers next/og pour les OG images dynamiques",
      "Robots.txt structuré + Open Graph cohérent partout",
    ],
  },
  {
    version: "2.6.0",
    date: "Juin 2025",
    type: "major",
    highlights: ["Next.js 16 + React 19 partout"],
    items: [
      "Migration de tous nos projets actifs vers Next.js 16",
      "Adoption React 19 + Server Components par défaut",
      "Turbopack stable en dev (vs Webpack)",
      "Refactor pour profiter des Server Actions",
    ],
  },
  {
    version: "2.5.0",
    date: "Mars 2025",
    type: "feature",
    highlights: ["Performance Lighthouse 95+"],
    items: [
      "Optimisation Core Web Vitals sur tous les projets clients : LCP < 2s, INP < 200ms",
      "Migration des images vers AVIF/WebP avec lazy loading natif",
      "Preload des fonts critiques (Switzer)",
      "Audit accessibilité WCAG 2.1 AA",
    ],
  },
  {
    version: "2.4.0",
    date: "Janvier 2025",
    type: "feature",
    items: [
      "Premier client SaaS migré vers Next.js 15 App Router",
      "Adoption Prisma 6 + Postgres Neon (serverless)",
      "Templates de notifications push (OneSignal + Expo Notifications)",
    ],
  },

  // ===== 2024 - Existant historique =====
  {
    version: "2.3.0",
    date: "29 novembre 2024",
    type: "feature",
    highlights: ["Expérience utilisateur refondue", "Performance +30% sur mobile"],
    items: [
      "Système de blog avec articles détaillés et tags",
      "Page 404 personnalisée",
      "Formulaire de contact avec upload de fichiers",
      "API d'envoi d'emails",
      "Templates d'emails HTML personnalisés",
    ],
  },
  {
    version: "2.2.0",
    date: "20 novembre 2024",
    type: "feature",
    highlights: ["Interface plus moderne", "Chargement réduit de 45%"],
    items: [
      "Navigation améliorée avec scroll smooth (Lenis)",
      "Animations Framer Motion fluides",
      "Composants UI réutilisables Radix",
      "Theme toggle avec persistance localStorage",
      "Optimisation des images via Next.js Image",
    ],
  },
  {
    version: "2.0.0",
    date: "20 octobre 2024",
    type: "major",
    highlights: ["Architecture refondue", "Performance et SEO optimisés"],
    items: [
      "Migration complète vers Next.js 15 avec App Router",
      "Nouveau système de cache pour des performances optimales",
      "Architecture serverless pour une scalabilité infinie",
      "API REST complète",
      "Build via Turbopack",
      "Support des Server Components",
    ],
  },
  {
    version: "1.9.0",
    date: "5 octobre 2024",
    type: "feature",
    items: [
      "Module de gestion des utilisateurs admin avec rôles",
      "Authentification OAuth (Google, GitHub)",
      "Notifications push temps réel",
      "Export des données en CSV/PDF/Excel",
      "Historique des actions utilisateur",
    ],
  },
  {
    version: "1.8.0",
    date: "10 septembre 2024",
    type: "feature",
    highlights: ["SEO optimisé"],
    items: [
      "Interface d'administration redesignée",
      "Système de recherche avec filtres avancés",
      "Intégration Google Analytics 4",
      "Optimisation SEO avec schema.org",
      "Sitemap XML automatique",
    ],
  },

  // ===== 2023 - Refonte interne =====
  {
    version: "1.5.0",
    date: "Mars 2023",
    type: "feature",
    items: [
      "Refonte interne du site Krealabs v1 (passage de WordPress à Next.js)",
      "Premier blog technique publié",
      "Mise en place d'une stratégie SEO long-termiste",
    ],
  },

  // ===== 2022 - Premier SaaS =====
  {
    version: "1.2.0",
    date: "Octobre 2022",
    type: "feature",
    items: [
      "Stack Next.js + Postgres adoptée pour les apps custom",
      "Mise en place CI/CD GitHub Actions sur tous les projets",
      "Premiers tests E2E (Playwright)",
    ],
  },
  {
    version: "1.0.0",
    date: "Avril 2022",
    type: "major",
    highlights: ["Premier SaaS B2B livré"],
    items: [
      "Premier projet SaaS B2B d'envergure livré à un client normand",
      "Adoption Stripe Billing pour les abonnements",
      "Structuration commerciale et juridique de l'agence",
    ],
  },

  // ===== 2021 - Mobile =====
  {
    version: "0.8.0",
    date: "Septembre 2021",
    type: "feature",
    items: [
      "Spécialisation WooCommerce (premier projet e-commerce sérieux)",
      "Premières intégrations Stripe Payments + transporteurs FR (Colissimo, Mondial Relay)",
    ],
  },
  {
    version: "0.5.0",
    date: "Mars 2021",
    type: "feature",
    highlights: ["Premières apps mobiles"],
    items: [
      "Spécialisation React Native",
      "Première app publiée sur l'App Store et le Play Store",
      "Setup du compte Apple Developer + Google Play Console",
    ],
  },

  // ===== 2020 - Création =====
  {
    version: "0.2.0",
    date: "Juin 2020",
    type: "feature",
    items: [
      "Premier site WordPress client livré (PME normande)",
      "Mise en place du forfait maintenance WordPress (forfait Light)",
    ],
  },
  {
    version: "0.1.0",
    date: "Janvier 2020",
    type: "major",
    highlights: ["Lancement de Krealabs"],
    items: [
      "Création de l'agence à Rouen par Maxime Dubois",
      "Choix éditorial : faire du web qui dure, sans intermédiaires, avec un interlocuteur direct",
      "Premier site krealabs.fr (WordPress, refondu plus tard)",
    ],
  },
];

const typeMeta: Record<EntryType, { label: string; variant: "default" | "secondary" | "success" }> = {
  major: { label: "Version majeure", variant: "default" },
  feature: { label: "Nouveauté", variant: "secondary" },
  fix: { label: "Correction", variant: "success" },
};

export default function ChangelogPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO: a terminal prompt */}
      <section className="pt-32 pb-12 md:pt-40">
        <Container size="narrow">
          <Eyebrow dot className="mb-8">Journal des versions</Eyebrow>
          <h1 className="text-h1 md:text-display">
            Ce qui <em>évolue</em>, version après version.
          </h1>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-8">
            L’historique de Krealabs depuis 2020 : lancements, migrations techniques, livraisons et évolutions du site. {CHANGELOG.length} versions.
          </p>
        </Container>
      </section>

      {/* LOG: like a git history, newest first */}
      <section className="pb-24">
        <Container size="narrow">
          <div className="gitlog">
            <p className="gitlog-cmd">
              <span>$</span> git log --graph krealabs
            </p>
            <ol>
              {CHANGELOG.map((entry, i) => (
                <li key={entry.version} className={`gitlog-entry is-${entry.type}`}>
                  <span className="gitlog-node" aria-hidden />
                  <p className="gitlog-head">
                    <span className="gitlog-tag">v{entry.version}</span>
                    {i === 0 && <span className="gitlog-head-ref">HEAD</span>}
                    <span className="gitlog-date">{entry.date}</span>
                    <span className="gitlog-type">{typeMeta[entry.type].label}</span>
                  </p>
                  {entry.highlights && entry.highlights.length > 0 && (
                    <h2 className="gitlog-title">{entry.highlights.join(" · ")}</h2>
                  )}
                  <ul className="gitlog-items">
                    {entry.items.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <ServiceCta
        title={
          <>
            Une <em>suggestion</em> ?
          </>
        }
        description="Vous avez une idée d'amélioration ou une demande spécifique ? Nous sommes à l'écoute."
        primaryLabel="Nous écrire"
      />
    </main>
  );
}
