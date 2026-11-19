import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { rich } from "@/components/ui/rich";
import { getPageTexts } from "@/lib/content/pages";
import { CHANGELOG_PAGE } from "@/lib/page-texts/changelog";
import { PageCta } from "@/components/services/page-cta";

export const metadata: Metadata = {
  title: "Changelog - Journal des versions",
  description:
    "Journal des évolutions du site et de l'agence Krealabs depuis sa création le 1er janvier 2025. Versions majeures, nouveautés et étapes au fil du temps.",
  alternates: { canonical: "https://krealabs.fr/changelog" },
  openGraph: {
    title: "Changelog - Journal des versions - Krealabs",
    description:
      "Journal des évolutions du site et de l'agence Krealabs depuis sa création le 1er janvier 2025. Versions majeures, nouveautés et étapes au fil du temps.",
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
    version: "2.3.0",
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
    version: "2.2.0",
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
    version: "2.1.0",
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
    version: "2.0.0",
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

  // ===== 2025 - Création et modernisation de la stack =====
  {
    version: "1.4.0",
    date: "Décembre 2025",
    type: "feature",
    items: [
      "Cadrage de la refonte v2 (audit complet du site existant, definition design system)",
      "Migration des templates emails de HTML vers React",
      "Adoption Vercel Analytics + Search Console DNS verification",
    ],
  },
  {
    version: "1.3.0",
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
    version: "1.2.0",
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
    version: "1.1.0",
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
    version: "1.0.0",
    date: "1er janvier 2025",
    type: "major",
    highlights: ["Création de Krealabs"],
    items: [
      "Création de l'agence à Rouen, le 1er janvier 2025",
      "Choix éditorial : faire du web qui dure, sans intermédiaires, avec un interlocuteur direct",
      "Premier client SaaS migré vers Next.js 15 App Router",
      "Adoption Prisma 6 + Postgres Neon (serverless)",
      "Templates de notifications push (OneSignal + Expo Notifications)",
    ],
  },
];

const typeMeta: Record<EntryType, { label: string; variant: "default" | "secondary" | "success" }> = {
  major: { label: "Version majeure", variant: "default" },
  feature: { label: "Nouveauté", variant: "secondary" },
  fix: { label: "Correction", variant: "success" },
};

export default async function ChangelogPage() {
  const t = await getPageTexts(CHANGELOG_PAGE);
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* HERO: a terminal prompt */}
      <section className="pt-32 pb-12 md:pt-40">
        <Container size="narrow">
          <Eyebrow dot className="mb-8">{t.eyebrow}</Eyebrow>
          <h1 className="text-h1 md:text-display">{rich(t.title)}</h1>
          <p className="text-body-lg text-[var(--muted-foreground)] mt-8">{t.intro.replace("{n}", String(CHANGELOG.length))}</p>
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

      <PageCta t={t} />
    </main>
  );
}
