import { Badge } from "@/components/ui/badge";

const changelog = [
  {
    version: "2.3.0",
    date: "29 Novembre 2024",
    type: "feature",
    items: [
      "Nouveau systeme de blog avec articles detailles et tags",
      "Page 404 personnalisee avec animations",
      "Formulaire de contact ameliore avec upload de fichiers",
      "Integration de l'API d'envoi d'emails pour les demandes",
      "Templates d'emails HTML personnalises",
      "Section clients de confiance avec logos d'entreprises",
    ],
    highlights: [
      "Experience utilisateur completement refondue",
      "Performance amelioree de 30% sur mobile",
    ],
  },
  {
    version: "2.2.0",
    date: "20 Novembre 2024",
    type: "feature",
    items: [
      "Systeme de navigation ameliore avec scroll smooth",
      "Integration de Framer Motion pour animations fluides",
      "Composants UI reutilisables avec Shadcn/ui",
      "Theme toggle avec persistence localStorage",
      "Optimisation des images avec Next.js Image",
      "Support complet du mode sombre sur toutes les pages",
    ],
    highlights: [
      "Interface plus moderne et intuitive",
      "Temps de chargement reduit de 45%",
    ],
  },
  {
    version: "2.1.0",
    date: "15 Novembre 2024",
    type: "feature",
    items: [
      "Nouveau systeme de design avec composants React optimises",
      "Integration de l'IA pour l'optimisation des performances",
      "Dashboard client ameliore avec analytics en temps reel",
      "Support du dark mode sur tous les projets",
      "Systeme de cache intelligent pour API",
      "Monitoring des performances avec Web Vitals",
    ],
    highlights: [
      "Architecture repensee pour plus de scalabilite",
      "Integration IA pour suggestions automatiques",
    ],
  },
  {
    version: "2.0.5",
    date: "3 Novembre 2024",
    type: "fix",
    items: [
      "Correction des problemes de responsive sur mobile",
      "Amelioration des temps de chargement (-40%)",
      "Fix des animations sur Safari et iOS",
      "Resolution des problemes de z-index dans les modals",
      "Correction du scroll horizontal sur petits ecrans",
      "Fix de la compatibilite avec les anciens navigateurs",
    ],
    highlights: [
      "Experience mobile drastiquement amelioree",
      "Compatibilite cross-browser garantie",
    ],
  },
  {
    version: "2.0.0",
    date: "20 Octobre 2024",
    type: "major",
    items: [
      "Migration complete vers Next.js 15 avec App Router",
      "Nouveau systeme de cache pour des performances optimales",
      "Architecture serverless pour une scalabilite infinie",
      "Integration de Stripe pour les paiements securises",
      "API REST complete avec documentation Swagger",
      "Systeme de build avec Turbopack",
      "Support des Server Components React",
      "Middleware pour authentification et autorisation",
    ],
    highlights: [
      "Refonte complete de l'architecture",
      "Performance et SEO optimises au maximum",
      "Securite renforcee avec les dernieres normes",
    ],
  },
  {
    version: "1.9.0",
    date: "5 Octobre 2024",
    type: "feature",
    items: [
      "Nouveau module de gestion des utilisateurs avec roles",
      "Integration de l'authentification OAuth (Google, GitHub)",
      "Systeme de notifications push en temps reel",
      "Export des donnees en CSV/PDF/Excel",
      "Historique des actions utilisateur",
      "Systeme de permissions granulaires",
      "Interface d'administration pour la gestion des roles",
    ],
    highlights: [
      "Gestion utilisateurs professionnelle",
      "Securite et traçabilite renforcees",
    ],
  },
  {
    version: "1.8.3",
    date: "25 Septembre 2024",
    type: "fix",
    items: [
      "Correction critique de la securite CSRF",
      "Fix des problemes de session et timeout",
      "Amelioration de la validation des formulaires",
      "Correction des vulnerabilites XSS",
      "Fix de la gestion des tokens d'authentification",
      "Resolution des problemes de cookies SameSite",
    ],
    highlights: [
      "Securite renforcee sur tous les endpoints",
      "Conformite RGPD assuree",
    ],
  },
  {
    version: "1.8.0",
    date: "10 Septembre 2024",
    type: "feature",
    items: [
      "Interface d'administration completement redesignee",
      "Nouveau systeme de recherche avec filtres avances",
      "Integration de Google Analytics 4 et Tag Manager",
      "Optimisation SEO avancee avec schema.org",
      "Sitemap XML automatique",
      "Meta tags dynamiques par page",
      "Integration de Open Graph pour reseaux sociaux",
      "Support du rich snippets Google",
    ],
    highlights: [
      "SEO optimise pour meilleur classement",
      "Analytics detaillees pour suivi precis",
    ],
  },
  {
    version: "1.7.0",
    date: "1 Septembre 2024",
    type: "feature",
    items: [
      "Nouvelle page d'accueil avec hero section dynamique",
      "Section temoignages clients avec carousel",
      "FAQ interactive avec recherche",
      "Page pricing avec comparateur de formules",
      "Section portfolio avec filtres par categorie",
      "Integration de videos d'illustration",
    ],
    highlights: [
      "Experience visiteur enrichie",
      "Taux de conversion ameliore de 25%",
    ],
  },
  {
    version: "1.6.5",
    date: "20 Aout 2024",
    type: "fix",
    items: [
      "Correction des problemes de chargement des polices",
      "Fix des animations saccadees sur mobile",
      "Resolution des problemes de focus keyboard",
      "Amelioration de l'accessibilite WCAG AA",
      "Correction des contrastes de couleurs",
    ],
    highlights: [
      "Accessibilite conforme aux normes",
      "Performance visuelle optimisee",
    ],
  },
  {
    version: "1.6.0",
    date: "5 Aout 2024",
    type: "feature",
    items: [
      "Systeme de cache Redis pour API",
      "Compression Brotli pour assets statiques",
      "Lazy loading intelligent des images",
      "Code splitting automatique",
      "Preloading des ressources critiques",
      "Service Worker pour mode offline",
    ],
    highlights: [
      "Performance web optimale (score 95+ Lighthouse)",
      "Temps de chargement divise par 2",
    ],
  },
  {
    version: "1.5.0",
    date: "15 Juillet 2024",
    type: "feature",
    items: [
      "Integration de Tailwind CSS v4",
      "Nouveau systeme de theming avec CSS variables",
      "Composants accessibles ARIA",
      "Support du mode high contrast",
      "Animations respectant prefers-reduced-motion",
    ],
    highlights: [
      "Design system moderne et maintenable",
      "Accessibilite au coeur du developpement",
    ],
  },
];

const typeColors: Record<string, string> = {
  major: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  feature: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  fix: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
};

const typeLabels: Record<string, string> = {
  major: "Version majeure",
  feature: "Nouvelle fonctionnalite",
  fix: "Correction",
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors pt-20">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-white/80 mb-4 font-[family-name:var(--font-heading)]">
            Changelog
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto font-[family-name:var(--font-sans)]">
            Suivez l'evolution de nos services et les dernieres ameliorations apportees a nos projets.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#A543F1] via-[#A543F1]/50 to-transparent" />

          <div className="space-y-12">
            {changelog.map((entry, index) => (
              <div
                key={entry.version}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 -ml-2 w-4 h-4 rounded-full bg-[#A543F1] border-4 border-white dark:border-[#030303]" />

                <div className="md:grid md:grid-cols-2 md:gap-8">
                  {/* Left side - Version info */}
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'} mb-4 md:mb-0`}>
                    <div className="inline-block md:block">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-[family-name:var(--font-heading)]">
                        Version {entry.version}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-white/60 mb-3">
                        {entry.date}
                      </p>
                      <Badge className={`${typeColors[entry.type]} border`}>
                        {typeLabels[entry.type]}
                      </Badge>
                    </div>
                  </div>

                  {/* Right side - Changes */}
                  <div className={`${index % 2 === 0 ? 'md:col-start-2' : ''}`}>
                    <div className="bg-gray-50 dark:bg-white/[0.02] p-6 rounded-xl border border-gray-200 dark:border-white/[0.08]">
                      {entry.highlights && entry.highlights.length > 0 && (
                        <div className="mb-4 p-3 bg-[#A543F1]/10 rounded-lg border-l-4 border-[#A543F1]">
                          {entry.highlights.map((highlight, i) => (
                            <p key={i} className="text-sm font-semibold text-[#A543F1] dark:text-[#A543F1]">
                              {highlight}
                            </p>
                          ))}
                        </div>
                      )}
                      <ul className="space-y-3">
                        {entry.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-gray-700 dark:text-white/70"
                          >
                            <span className="text-[#A543F1] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#A543F1]/10 to-[#c5cbf9]/10 p-8 rounded-2xl border border-[#A543F1]/20">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Vous avez une suggestion ?
            </h3>
            <p className="text-gray-600 dark:text-white/60 mb-4">
              Nous sommes toujours a l'ecoute de vos idees pour ameliorer nos services
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#A543F1] text-white hover:bg-[#A543F1]/90 transition-colors font-medium"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
