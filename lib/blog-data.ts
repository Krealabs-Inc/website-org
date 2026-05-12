export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Cluster thématique principal (Web | Mobile | SEO | Outils) */
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      code?: string;
    }[];
    conclusion: string;
  };
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
}

const author = {
  name: "Maxime Dubois",
  role: "Co-fondateur · Krealabs",
  avatar: "https://avatars.githubusercontent.com/u/36298487?v=4",
};

// ============================================================
// HELPER : date française → ISO 8601 pour Schema.org Article
// ============================================================

const FR_MONTHS: Record<string, string> = {
  janvier: "01",
  février: "02",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  août: "08",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  décembre: "12",
  decembre: "12",
};

/** Convertit "5 mai 2026" en "2026-05-05" pour les balises ISO 8601 */
export function frenchDateToISO(frenchDate: string): string {
  const normalized = frenchDate.toLowerCase().replace(/[^\w\sàâéèêîôûç]/g, "");
  const match = normalized.match(/(\d{1,2})\s+([a-zàâéèêîôûç]+)\s+(\d{4})/i);
  if (!match) return new Date().toISOString().split("T")[0];
  const [, day, month, year] = match;
  const monthNum = FR_MONTHS[month] ?? "01";
  return `${year}-${monthNum}-${day.padStart(2, "0")}`;
}

// =============================================================================
// CLUSTERS THÉMATIQUES
// =============================================================================
// Web      → Next.js, React, TypeScript, Tailwind, Prisma
// Mobile   → React Native, Expo, notifications push
// SEO      → Core Web Vitals, SEO local, schema.org, Lighthouse
// Outils   → AI coding, CI/CD, hébergement
// =============================================================================

export const blogPosts: BlogPost[] = [
  // ===========================================================================
  // CLUSTER WORDPRESS (5 articles) — Spécialité agence
  // ===========================================================================
  {
    slug: "pourquoi-wordpress-reste-le-bon-choix-2026",
    title: "Pourquoi WordPress reste le bon choix en 2026",
    excerpt:
      "Beaucoup de blogs tech ont enterré WordPress. Pourtant, 43% du web tourne encore dessus en 2026. Tour d'horizon honnête de ses forces, ses limites, et pourquoi c'est notre spécialité d'agence.",
    category: "WordPress",
    date: "11 mai 2026",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80",
    featured: true,
    author,
    tags: ["WordPress", "CMS", "Stratégie", "Choix techno", "PME"],
    content: {
      introduction:
        "Si vous suivez la presse tech, vous avez peut-être lu que WordPress était dépassé, lent, ou que tout le monde passait à Next.js. La réalité est différente : en 2026, WordPress propulse toujours 43% des sites web mondiaux, et la majorité de nos clients chez Krealabs sont sur cette stack. Pas par défaut, par choix. Voici, sans langue de bois, pourquoi WordPress reste pertinent pour la plupart des PME, où il échoue, et comment éviter les pièges classiques. Cet article est notre position d'agence après plus de 10 ans à livrer des projets WordPress de qualité.",
      sections: [
        {
          title: "WordPress en chiffres en 2026",
          content:
            "Commençons par les faits. Selon W3Techs (mars 2026), WordPress alimente 43,2% de l'ensemble des sites web sur Internet, soit 65% des sites construits avec un CMS. Aucun autre outil n'approche ces parts. Shopify suit avec ~5%, Wix ~4%, Squarespace ~3%. La croissance se stabilise mais la base installée est immense, et l'écosystème compte plus de 60 000 plugins gratuits, 11 000 thèmes, des dizaines de milliers d'agences spécialisées partout dans le monde. Cela signifie une chose pour vous : trouver un partenaire WordPress en cas de besoin reste facile, les coûts de migration ou de maintenance sont prévisibles, et les compétences sont disponibles sur le marché.",
        },
        {
          title: "Quand WordPress reste imbattable",
          content:
            "Site vitrine institutionnel pour PME, blog éditorial avec rédaction régulière, e-commerce TPE/PME via WooCommerce, site multilingue (WPML/Polylang), plateformes média ou magazines — sur ces cas d'usage, WordPress n'a pratiquement aucun concurrent au même rapport qualité/coût/délai. Une équipe non-technique peut gérer les contenus quotidiennement sans solliciter le développeur. Les rédacteurs aiment l'éditeur Gutenberg, qui a énormément progressé depuis 2024 avec le Full Site Editing. Les marketeurs apprécient les intégrations natives avec les outils SEO (Yoast, RankMath), email (Mailchimp, Brevo), analytics (GA4, Plausible) et CRM (HubSpot, Salesforce). Bref : WordPress reste l'outil le plus universel pour les sites où le contenu est central.",
        },
        {
          title: "Le mythe de WordPress lent",
          content:
            "« WordPress c'est lent. » C'est l'argument numéro un des détracteurs. Il est faux dans l'absolu, vrai dans la pratique pour beaucoup de sites. La différence ? La qualité de la construction. Un WordPress bien fait — thème custom léger, hébergement spécialisé (o2switch, Kinsta, WP Engine), cache (WP Rocket), CDN (Cloudflare), images optimisées (WebP/AVIF) — peut tenir des Core Web Vitals au top, comparable à un site Next.js bien construit. Un WordPress mal fait — thème Divi/Elementor avec 200 plugins, hébergement mutualisé bas de gamme, 0 optimisation — sera effectivement lent. Le problème n'est pas WordPress, c'est l'exécution.",
          code: `// Optimisations critiques sur un projet WP performant
// 1. Thème custom sans page builder
// 2. WP Rocket : cache pages, minify CSS/JS, lazyload
// 3. WebP Express : conversion JPG/PNG en WebP à la volée
// 4. Cloudflare CDN : cache global + image resize
// 5. Hébergement spécialisé : PHP 8.3+, OPcache, MySQL 8`,
        },
        {
          title: "Les vrais inconvénients à connaître",
          content:
            "Soyons honnêtes, WordPress a aussi ses limites. L'admin est lourde sur les gros catalogues (WooCommerce 50k+ produits commence à souffrir). La sécurité demande une attention continue : mises à jour, monitoring, durcissement — ce n'est pas plug-and-forget. Les plugins varient en qualité : certains sont des bombes à retardement (abandon, conflits, vulnérabilités). L'écosystème est verrouillé sur PHP, ce qui peut paraître démodé face à TypeScript/Rust/Go. Pour des apps web complexes type SaaS multi-tenants ou outils temps réel (chat, collaboration live), WordPress n'est pas adapté — c'est là que les frameworks modernes comme Next.js entrent en jeu.",
        },
        {
          title: "WordPress vs Wix, Squarespace, Webflow",
          content:
            "Comparons avec les concurrents directs en 2026. Wix et Squarespace offrent une UX d'édition très simple mais vous êtes prisonnier : impossible d'exporter votre site, contraintes de design lourdes, scaling limité au-delà de 50 pages, SEO bridé. Webflow est plus puissant et permet du custom code, mais reste un SaaS propriétaire — abonnement à vie obligatoire, et la migration est complexe si vous voulez sortir. WordPress, lui, vous donne propriété complète du code, des données, et du contenu. Vous pouvez changer d'hébergeur en 30 minutes, changer d'agence sans perdre un seul fichier. C'est la différence open-source vs SaaS — et pour un projet long-terme, ça compte énormément.",
        },
        {
          title: "Le futur : Headless WordPress + Block Editor",
          content:
            "WordPress n'est pas immobile. Le Block Editor (Gutenberg) avec Full Site Editing transforme l'expérience d'édition vers quelque chose de plus moderne et flexible. Mais le vrai virage stratégique, c'est le headless : utiliser WordPress comme back-office CMS (où vos rédacteurs continuent leur travail dans l'interface qu'ils connaissent) et un frontend en Next.js qui consomme WP via REST API ou WPGraphQL. On obtient les performances natives de Next.js, l'ergonomie d'édition WordPress, et la flexibilité maximum. Chez Krealabs, on déploie de plus en plus de projets sur cette architecture pour les clients qui veulent le meilleur des deux mondes.",
          code: `// Exemple : récupérer les articles WP dans Next.js via WPGraphQL
const QUERY = gql\`
  query GetPosts {
    posts(first: 10) {
      nodes {
        title
        excerpt
        slug
        featuredImage { node { sourceUrl } }
      }
    }
  }
\`;`,
        },
        {
          title: "Comment bien choisir un partenaire WordPress",
          content:
            "Le choix de l'agence pèse plus que le choix du CMS. Quelques signaux à regarder : utilise-t-elle un thème custom (pas un Divi/Elementor recyclé) ? Code-t-elle ses plugins métier ou n'achète-t-elle que des plugins premium ? Propose-t-elle un forfait maintenance/sécurité crédible ? Vous donne-t-elle accès au dépôt Git du thème ? Documente-t-elle ses choix dans un README ? Si la réponse est non sur la moitié des points, fuyez : vous tombez sur un assembleur de page builder qui vous laissera face à un site impossible à faire évoluer dans 2 ans. Les bons partenaires WP sont rares mais existent — ils traitent WordPress comme un projet de développement sérieux, pas comme du clic-glisse.",
        },
      ],
      conclusion:
        "WordPress n'est pas mort, mais il n'est pas non plus la solution universelle. C'est l'outil le plus pragmatique pour 80% des PME et associations, à condition d'être bien fait. Mal fait, c'est l'enfer. La différence se joue sur l'agence qui le pose. Si vous avez un projet WordPress — création, refonte, migration — et que vous voulez un partenaire qui assume cette stack et la fait bien, parlons-en. Et si votre projet sort du périmètre WP, on a aussi la stack moderne pour ça : Next.js, React Native, Python. Mais pour la plupart des entreprises rouennaises et normandes, WordPress reste la réponse la plus économique et la plus durable.",
    },
  },
  {
    slug: "refonte-wordpress-sans-perdre-seo",
    title: "Refonte WordPress : ne perdez pas votre SEO",
    excerpt:
      "Une refonte mal pilotée peut faire perdre 30 à 80% du trafic organique. Méthode complète pour refondre un site WordPress en préservant votre positionnement Google — checklist agence.",
    category: "WordPress",
    date: "9 mai 2026",
    readTime: "16 min",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
    featured: false,
    author,
    tags: ["WordPress", "Refonte", "SEO", "Redirections 301", "Migration"],
    content: {
      introduction:
        "Vous avez un site WordPress qui fonctionne, qui a accumulé du trafic organique au fil des années, et vous voulez le refondre — design daté, performance médiocre, structure devenue ingérable. Le risque #1 d'une refonte : tout casser côté SEO et voir vos positions Google s'effondrer pendant des mois. Nous avons piloté des dizaines de refontes WordPress chez Krealabs, certaines avec gain de trafic immédiat (+30% en 2 mois), d'autres où le client avait fait n'importe quoi avant et où on a dû réparer (perte de 50% pour rattraper sur 6 mois). Voici la méthode que nous appliquons systématiquement pour éviter le second scénario.",
      sections: [
        {
          title: "Avant tout : audit SEO complet de l'existant",
          content:
            "On ne peut pas préserver ce qu'on ne mesure pas. Première étape : un audit SEO exhaustif de votre site actuel. Exporter toutes les données de Google Search Console (URLs indexées, requêtes, positions moyennes, CTR), faire tourner Screaming Frog SEO Spider pour cartographier l'ensemble du site (status codes, profondeur, redirections internes, balises meta), récupérer les analytics (GA4 ou autre) pour identifier les pages à fort trafic. À la fin de cette étape, on a une photo précise de ce qui marche, ce qui draine du trafic, et ce qu'il faut absolument préserver. C'est notre référence de comparaison après la refonte.",
        },
        {
          title: "Cartographier les URLs existantes",
          content:
            "Exporter la liste complète des URLs du site actuel, avec leur trafic Search Console des 12 derniers mois et leurs backlinks principaux (via Ahrefs ou Semrush). Identifier le top 50 des pages à fort trafic — ce sont elles qu'il faut protéger absolument. Pour chacune, noter : URL actuelle, titre, meta description, contenu principal, redirections sortantes éventuelles, backlinks pointant vers elle. Cette liste devient votre Bible de migration. À chaque URL doit correspondre une URL équivalente dans le nouveau site, soit identique (idéal), soit redirigée 301 vers la nouvelle URL pertinente.",
          code: `# Export Screaming Frog : Internal URLs (CSV)
# Colonnes critiques :
- Address (URL actuelle)
- Status Code (200, 301, 404, etc.)
- Title 1
- Meta Description 1
- H1-1
- Word Count
- Crawl Depth
- Indexability`,
        },
        {
          title: "Définir le plan de redirections 301",
          content:
            "Pour chaque URL qui change, il faut une redirection 301 (permanente) vers la nouvelle URL. Pas de 302, pas de chaînes de redirections (301 → 301 → 301 c'est catastrophique pour le SEO). Le plan de redirections doit être documenté dans un fichier (CSV ou tableur partagé) avec source → destination. Implémentation : via plugin (Redirection, Rank Math Redirections), via le .htaccess directement, ou via les règles serveur si Nginx. Tester chaque redirection après mise en ligne avec un outil comme HTTPstatus.io ou simplement curl en CLI.",
          code: `# .htaccess WordPress — exemples de redirections 301
Redirect 301 /ancien-blog/article-1 https://exemple.fr/blog/nouveau-titre-article
Redirect 301 /services-anciens/web-design https://exemple.fr/services/design-uiux

# Pattern matching pour migrations massives
RedirectMatch 301 ^/blog/category/([a-z-]+)$ https://exemple.fr/blog/?categorie=$1`,
        },
        {
          title: "Préserver la structure des URLs (slug history)",
          content:
            "Idéalement, gardez la même structure de permaliens (`/blog/%postname%/` par exemple). Si vous devez la changer, faites-le UNE fois, jamais en cours de route. Pour WordPress, le plugin « Permalink Manager Pro » permet de gérer les URLs custom et leurs historiques de redirections, particulièrement utile pour les boutiques WooCommerce avec catégories produits. Erreur classique à éviter : changer de `?p=ID` vers `/postname/` sans plan de redirection — perte massive de SEO sur l'ancien format.",
        },
        {
          title: "Migration des contenus, taxonomies et métadonnées",
          content:
            "Si vous changez de thème mais gardez WordPress, c'est simple : tous les contenus restent. Si vous migrez depuis un autre CMS (Wix, Squarespace, Joomla, Drupal), c'est plus complexe. Outils utiles : WP All Import Pro pour les imports massifs depuis CSV/XML, Migrate DB Pro pour copier une DB entre environnements, FG Joomla to WordPress pour les migrations Joomla. Critique : récupérer les métadonnées SEO existantes (Title, meta description, balise canonical, schema markup) et les transférer dans Yoast/RankMath sur le nouveau site. Sans ça, Google voit un site complètement neuf et redémarre l'indexation à zéro.",
        },
        {
          title: "Préserver les balises Title, meta et schema",
          content:
            "Les balises Title et meta description sont vos cartes de visite dans Google. Sur chaque page principale (home, services, catégories, top articles), gardez les Titles existants — ils ont été indexés et fonctionnent. Vous pouvez les optimiser, mais ne les remplacez pas radicalement sans raison. Pour le schema.org (balisages JSON-LD : Article, Product, FAQPage, BreadcrumbList, LocalBusiness), refaites-les sur le nouveau site avec les mêmes informations. RankMath et Yoast génèrent du schema automatiquement, mais customisez-le pour vos cas spécifiques.",
        },
        {
          title: "Performance + Core Web Vitals : où la refonte aide",
          content:
            "C'est l'opportunité numéro un d'une refonte : passer d'un Lighthouse score de 40 à 90+. Sur un site WordPress refondu, viser obligatoirement : LCP < 2,5s, INP < 200ms, CLS < 0.1. Comment ? Thème custom (vs Divi/Elementor), WP Rocket configuré agressivement (cache + critical CSS + delay JS), Cloudflare en frontal, conversion automatique images en WebP, hébergement spécialisé. Mesurer avant/après via Google PageSpeed Insights et la Search Console (rapport Web Vitals). Une amélioration significative de la vitesse peut faire monter vos positions de plusieurs places sur les requêtes concurrentielles.",
        },
        {
          title: "Tests pré-production : staging et contrôles",
          content:
            "Avant la mise en ligne, le nouveau site doit tourner en staging (sous-domaine genre `staging.exemple.fr`) avec un `robots.txt: Disallow: /` pour bloquer l'indexation. Réaliser : audit Screaming Frog complet du staging, vérification de chaque template (home, page service, single article, catégorie, contact, 404), tests des formulaires, vérification des redirections 301 (curl chaque URL ancien format), Lighthouse sur les pages principales, tests utilisateurs courts. Critique : le staging doit être identique à la prod, mêmes plugins, même version PHP, mêmes images.",
        },
        {
          title: "Mise en ligne et monitoring post-lancement",
          content:
            "Bascule prod : pendant les 48h critiques après, surveiller toutes les heures via Search Console (rapport Couverture, erreurs d'exploration). Lancer un crawl Screaming Frog sur la prod pour vérifier que tout est OK. Soumettre le nouveau sitemap.xml dans Search Console. Forcer l'indexation des pages les plus importantes via URL Inspection. Surveiller : positions sur top 20 requêtes, trafic Google Analytics, vitesse Core Web Vitals (CrUX data). Si une régression apparaît, on a 7 jours pour rétablir avant que Google ne re-fixe ses positions à la baisse — d'où l'importance du suivi rapproché.",
        },
        {
          title: "Pièges classiques à éviter absolument",
          content:
            "Trois erreurs que nous voyons trop souvent : 1) Mettre en ligne sans plan de redirections — résultat 50% de 404 et chute SEO immédiate. 2) Changer la structure des permaliens sans réfléchir — les ID changent, les anciennes URLs deviennent inaccessibles. 3) Désindexer le staging trop tard ou pas du tout — Google indexe les deux versions, contenu dupliqué, sanction. Une refonte mal préparée coûte plus cher que la refonte elle-même en perte de trafic. Prenez le temps de l'audit en amont.",
        },
      ],
      conclusion:
        "Une refonte WordPress n'est jamais juste un redesign : c'est un chantier SEO autant que graphique. Méthode rigoureuse + outils corrects + monitoring serré = positions préservées voire améliorées. Si vous avez un projet de refonte WordPress et que vous voulez sécuriser le SEO, c'est exactement notre métier — on intervient sur des refontes de PME normandes, mais aussi à distance partout en France. Un premier audit SEO de votre site actuel est offert pour cadrer le périmètre.",
    },
  },
  {
    slug: "woocommerce-vs-shopify-pme",
    title: "WooCommerce vs Shopify : que choisir pour une PME ?",
    excerpt:
      "Le choix entre WooCommerce et Shopify divise. Pour qui choisir quoi ? Comparatif équilibré sur les coûts réels, la personnalisation, le SEO, le scaling, après 10 ans de projets e-commerce.",
    category: "WordPress",
    date: "7 mai 2026",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&q=80",
    featured: false,
    author,
    tags: ["WooCommerce", "Shopify", "E-commerce", "Comparatif", "WordPress"],
    content: {
      introduction:
        "Vous lancez ou refondez une boutique en ligne. Entre WooCommerce (WordPress) et Shopify, le débat fait rage sur Reddit, dans les groupes Facebook e-commerce, et sur les blogs spécialisés. La vérité ? Aucune des deux solutions n'est universellement supérieure. Chacune a son terrain de jeu. Voici notre lecture détaillée après 10 ans à voir les deux en production chez nos clients normands et au-delà. L'objectif de cet article : vous aider à choisir sereinement selon votre contexte spécifique, sans dogmatisme.",
      sections: [
        {
          title: "Le verdict rapide selon votre profil",
          content:
            "Si vous avez besoin de lancer rapidement une boutique simple, sans devs internes, avec moins de 500 produits et un budget total limité : Shopify. Si vous voulez la maîtrise totale, des intégrations métier sur mesure, un budget mensuel récurrent maîtrisé, ou un site contenu+e-commerce mixte : WooCommerce. Pour les boutiques de niche très techniques (configurateurs produits complexes, B2B avec catalogues spécifiques, multilingue lourd) : WooCommerce gagne presque toujours. Pour le dropshipping ou les marques DTC à fort volume marketing : Shopify a l'avantage de son écosystème app store. Ces grandes lignes étant posées, regardons en détail.",
        },
        {
          title: "Coûts réels : la grosse surprise",
          content:
            "Shopify affiche 29$/mois pour le plan Basic, 79$ pour le Shopify, 299$ pour l'Advanced. Mais les vrais coûts dérapent vite : commission paiement (2,9% + 0,30$ avec Shopify Payments, plus si Stripe externe), apps premium (compter 50-200$/mois cumulé), thème premium (200-350$), domaine. Total réel pour une PME : 200-500$/mois minimum. WooCommerce : hébergement spécialisé (15-50€/mois), domaine (10€/an), extensions premium type Stripe Pro/WP Rocket/Yoast Pro (200-400€/an au total). Pas de commission sur vos ventes (sauf frais Stripe/PayPal standards). Total : 30-100€/mois en moyenne, beaucoup plus prévisible.",
        },
        {
          title: "Personnalisation : niveau de liberté",
          content:
            "Shopify utilise Liquid comme moteur de templates et a ouvert son frontend depuis Hydrogen (Next.js + React). Vous pouvez personnaliser la plupart des choses, mais certaines parties restent fermées (logique panier, fonctionnement checkout sur les plans inférieurs). WooCommerce, c'est du WordPress et du PHP — donc une personnalisation à 100%. Modifier le tunnel d'achat, créer des types de produits custom, intégrer un PIM externe, automatiser des règles métier complexes : tout est possible sans contrainte. La contrepartie : ça demande un développeur compétent. Avec Shopify, vous pouvez aller plus loin avec moins de code.",
          code: `// WooCommerce : hook pour modifier le prix selon une logique custom
add_filter('woocommerce_get_price_html', function($price, $product) {
    if (is_user_logged_in() && get_user_role() === 'wholesale') {
        $wholesale_price = $product->get_meta('_wholesale_price');
        return wc_price($wholesale_price);
    }
    return $price;
}, 10, 2);`,
        },
        {
          title: "Performance et vitesse",
          content:
            "Shopify est hébergé sur leur infrastructure mondiale et gère automatiquement le scaling, CDN, cache, etc. Vous n'avez rien à faire — site relativement rapide par défaut. WooCommerce dépend de votre hébergement : sur un hébergement mutualisé à 5€/mois, c'est lent. Sur un Kinsta ou WP Engine spécialisé, c'est aussi rapide que Shopify. Sur un VPS bien configuré avec Cloudflare en frontal, on peut faire mieux que Shopify (latence édge optimisée). Bref : WooCommerce demande plus d'effort de setup performance, mais permet d'aller plus loin si on s'en occupe.",
        },
        {
          title: "SEO : avantage WooCommerce",
          content:
            "Sur le SEO, WooCommerce a un avantage clair grâce à WordPress et ses plugins SEO matures (Yoast, RankMath). Contrôle total des URLs, des balises canonical, des breadcrumbs, du schema Product avec données complexes (variants, reviews, availability). Shopify gère le SEO basique correctement mais a des limites : URLs forcées en /products/, /collections/, schema généré automatiquement mais peu customisable, contrôle limité sur les meta dynamiques. Pour des boutiques où le SEO est central (niche, longue traîne, contenu+commerce), WooCommerce est préférable. Pour des boutiques où le trafic vient surtout des ads et du marketing, Shopify suffit largement.",
        },
        {
          title: "Stock & catalogue : limites des deux solutions",
          content:
            "Shopify limite à 100 variantes par produit, 100 collections automatiques par boutique, et a des limites de performance au-delà de 5000-10000 produits sur les plans inférieurs (besoin de Shopify Plus à partir de 2300$/mois pour scaler vraiment). WooCommerce monte plus haut nativement : on peut tenir 50k+ produits sur un hébergement solide, avec des optimisations DB (indexs MySQL, requêtes optimisées, cache produits). Pour les grandes boutiques (15k+ SKUs), WooCommerce + hébergement managé spécialisé devient le choix le plus économique. Shopify Plus reste pertinent pour les marques internationales avec gros volume de transactions, mais c'est une autre catégorie de prix.",
        },
        {
          title: "Extensions tierces : deux philosophies",
          content:
            "Shopify a un App Store très bien rangé avec ~10 000 apps, principalement payantes (abonnements mensuels qui s'accumulent). Qualité globale élevée, support souvent réactif, intégration native fluide. WooCommerce a 6000+ extensions, mix de gratuit et payant. Qualité variable, certaines abandonnées, parfois conflits entre plugins. La différence philosophique : Shopify pousse l'écosystème vers le payant récurrent (revenue model SaaS), WooCommerce permet beaucoup gratuitement mais demande un développeur pour intégrer proprement. Pour une PME sans dev interne, l'app store Shopify est plus accessible. Pour un budget contraint, WooCommerce reste imbattable.",
        },
        {
          title: "Paiements et frais",
          content:
            "Shopify Payments (powered by Stripe) impose 2,9% + 0,30$ par transaction sur le plan Basic, dégressif sur les plans supérieurs. Si vous utilisez un autre processeur (Stripe direct, PayPal, Mollie), Shopify ajoute une commission supplémentaire (0,5 à 2%) pour vous pénaliser. WooCommerce ne prend AUCUNE commission sur vos ventes — vous payez uniquement les frais standard de votre processeur (Stripe : 1,4-2,9% selon le marché européen). Pour une boutique qui fait 100k€/an de CA, la différence cumulée représente facilement 500 à 2000€ par an.",
        },
        {
          title: "B2B et fonctionnalités métier complexes",
          content:
            "Pour le B2B (catalogues par client, tarifs négociés, devis avant achat, comptes pro multi-utilisateurs, demandes de quote), WooCommerce a un écosystème mature : B2B for WooCommerce, WooCommerce Memberships, WooCommerce Subscriptions, Gravity Forms pour les devis personnalisés. Shopify a B2B intégré depuis 2024, mais c'est encore moins flexible que WooCommerce. Pour un wholesale, distributeur, marché de niche industriel — WooCommerce est presque toujours le choix. Pour B2C standard, Shopify peut suffire.",
        },
        {
          title: "Notre recommandation finale",
          content:
            "Pour les PME normandes que nous accompagnons (artisans, retailers locaux, producteurs, marques DTC, B2B technique), nous recommandons WooCommerce dans 80% des cas. Pour les raisons suivantes : coûts long-terme plus bas, pas de commission sur les ventes, intégration avec un site WordPress existant (contenu + e-commerce), maîtrise totale sur les évolutions, écosystème français mature (transporteurs Colissimo/Chronopost, comptables, etc.). Pour les 20% restants — démarrage très rapide, équipe non-technique, focus sur ads et pas SEO — Shopify reste un choix pertinent. La pire option, c'est de choisir au hasard ou pour mauvaises raisons.",
        },
      ],
      conclusion:
        "Il n'y a pas de mauvais outil entre WooCommerce et Shopify — il y a juste des bons et des mauvais alignements avec votre projet. Si vous hésitez encore, écrivez-nous : on fait un état des lieux gratuit de votre contexte (catalogue, budget, équipe, objectifs SEO) et on vous oriente vers la bonne solution même si ce n'est pas la nôtre. Chez Krealabs, on développe et maintient des boutiques WooCommerce depuis 2014, et on a aussi piloté des migrations Shopify → WooCommerce et inversement. L'expertise se mesure à savoir dire « non, ce n'est pas pour vous » quand c'est le cas.",
    },
  },
  {
    slug: "audit-seo-wordpress-12-points",
    title: "Audit SEO WordPress : 12 points techniques à vérifier",
    excerpt:
      "Votre WordPress est-il vraiment optimisé pour Google ? La méthode d'audit que nous appliquons en agence avant chaque projet SEO — 12 points concrets, mesurables, actionnables.",
    category: "WordPress",
    date: "6 mai 2026",
    readTime: "18 min",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
    featured: false,
    author,
    tags: ["SEO WordPress", "Audit", "Core Web Vitals", "RankMath", "Yoast"],
    content: {
      introduction:
        "Vous avez un site WordPress, mais le trafic organique stagne ou baisse. Avant de vous lancer dans une stratégie de contenu coûteuse, vérifiez d'abord que les fondations techniques sont saines. Un site WordPress mal configuré peut neutraliser tous les efforts de contenu et de netlinking. Voici la checklist d'audit SEO WordPress que nous appliquons chez Krealabs avant chaque mission. 12 points concrets, chacun mesurable, chacun actionnable, en moins de 4h d'analyse pour un site de taille moyenne.",
      sections: [
        {
          title: "1. Indexabilité : robots.txt, noindex, sitemap.xml",
          content:
            "Premier réflexe : vérifier que votre site EST indexable. Le robots.txt ne bloque pas les pages critiques, les meta robots sur les pages importantes ne contiennent pas `noindex`, le sitemap.xml est généré et soumis dans Search Console. Sur WordPress, RankMath et Yoast génèrent automatiquement le sitemap (`/sitemap_index.xml`). Vérifier dans Search Console le rapport Couverture : combien d'URLs indexées vs soumises ? Idéalement >90%. Si <70%, il y a un problème : pages dupliquées, faible qualité (thin content), erreurs de crawl, ou meta noindex non voulu.",
        },
        {
          title: "2. Vitesse & Core Web Vitals",
          content:
            "Depuis 2021, les Core Web Vitals influencent directement le classement Google. Mesurer : LCP (Largest Contentful Paint, viser < 2,5s), INP (Interaction to Next Paint, viser < 200ms — a remplacé FID en mars 2024), CLS (Cumulative Layout Shift, viser < 0,1). Outils : PageSpeed Insights (Google), Lighthouse en local, et surtout le rapport Core Web Vitals de Search Console (données réelles utilisateurs via CrUX). Sur WordPress, les leviers principaux : caching (WP Rocket), images WebP, suppression de plugins inutiles, hébergement performant, CDN Cloudflare.",
          code: `// Mesurer le LCP via la Web Vitals JS API
import { onLCP } from 'web-vitals';

onLCP((metric) => {
  console.log('LCP:', metric.value);
  // Envoyer à Google Analytics si nécessaire
});`,
        },
        {
          title: "3. Structure d'URLs et permaliens",
          content:
            "Les permaliens WordPress doivent suivre le format `/%postname%/` (Settings > Permalinks). Évitez les structures avec `?p=ID`, dates dans l'URL inutiles, ou hiérarchies profondes. Pour les catégories, désactiver le prefixe `/category/` si inutile (via plugin ou code). URL idéale : `exemple.fr/agence-web-rouen` plutôt que `exemple.fr/blog/2024/03/agence-web-rouen`. Le poids SEO d'un mot-clé dans l'URL n'est plus déterminant en 2026, mais une URL claire reste un facteur de CTR dans les SERPs.",
        },
        {
          title: "4. Balises Title et meta description",
          content:
            "Chaque page importante doit avoir : un Title unique de 50-60 caractères incluant le mot-clé principal, une meta description de 140-160 caractères avec CTA, des balises Open Graph et Twitter Card. Sur WordPress, RankMath ou Yoast permet de cadrer ces meta page par page. Audit : Screaming Frog peut crawler le site et lister tous les Titles/meta — identifier les pages avec Title manquant, dupliqué, ou trop long/court. Critique pour le CTR organique dans Google.",
        },
        {
          title: "5. Schema.org : Article, Product, FAQ, LocalBusiness",
          content:
            "Le balisage schema.org permet d'afficher des rich snippets dans Google (étoiles produits, FAQ déroulantes, breadcrumbs, dates articles, prix). RankMath et Yoast gèrent les schemas standard (Article, BreadcrumbList) automatiquement. Pour les sites e-commerce, ajouter Product schema sur les fiches WooCommerce (note moyenne, prix, disponibilité). Pour les sites locaux, LocalBusiness schema sur la home et page contact. Pour les FAQ : FAQPage schema. Tester avec l'outil Rich Results Test de Google pour valider.",
          code: `// Exemple : Schema FAQPage à ajouter via Yoast/RankMath
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Combien coûte un site WordPress ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "..."
    }
  }]
}`,
        },
        {
          title: "6. Mobile-friendliness et responsive",
          content:
            "Depuis 2021, Google utilise l'indexation mobile-first : c'est la version mobile de votre site qui est crawlée et indexée. Vérifier : que toutes les pages s'affichent correctement sur mobile (Chrome DevTools, simulation iPhone/Android), que le mobile menu est accessible, que les boutons sont assez grands (44x44px minimum), que la lisibilité reste bonne (16px minimum sur texte courant). Tester avec l'outil Mobile-Friendly Test de Google. WordPress en thème custom géré correctement = mobile-first natif. Page builders type Divi peuvent générer du mobile cassé sans qu'on s'en rende compte.",
        },
        {
          title: "7. SSL/HTTPS et redirections",
          content:
            "Le HTTPS est obligatoire depuis 2018 (Google le considère comme facteur de classement, et les navigateurs marquent les sites HTTP comme « non sécurisé »). Vérifier : certificat SSL valide (Let's Encrypt ou autre), redirection 301 systématique de HTTP vers HTTPS, mixed content corrigé (toutes les ressources internes en HTTPS). Sur WordPress : `home_url` et `site_url` en HTTPS, plugin Really Simple SSL pour gérer les cas tordus, ou règle .htaccess pour la redirection.",
        },
        {
          title: "8. Maillage interne : catégories, tags, related",
          content:
            "Le maillage interne (liens internes entre les pages de votre site) est sous-estimé. Il distribue le « jus SEO » aux pages importantes et aide Google à comprendre la structure. Sur WordPress : utiliser correctement les catégories et tags, ajouter manuellement des liens dans le contenu vers vos pages piliers, mettre en place des « related posts » sur les articles de blog. Outil utile : Screaming Frog peut mesurer le nombre de liens internes vers chaque URL — vos pages cibles SEO devraient avoir >10 liens internes pointant vers elles.",
        },
        {
          title: "9. Optimisation des images",
          content:
            "Les images représentent souvent 60-80% du poids d'une page WordPress. Trois leviers : 1) Compression — utiliser ShortPixel ou Imagify pour compresser automatiquement à l'upload. 2) Format WebP/AVIF — convertir tous les JPG/PNG en WebP via WebP Express ou un plugin similaire. 3) Lazy loading — natif depuis WordPress 5.5 (`loading=\"lazy\"` sur les images hors viewport). Bonus : alt text systématique sur chaque image (accessibilité + SEO).",
        },
        {
          title: "10. Contenu dupliqué et balises canonical",
          content:
            "Google pénalise (légèrement) le contenu dupliqué. Sur WordPress, ça arrive avec : catégories vs tags affichant les mêmes articles, pages d'archives auteur/date, paramètres URL multiples (filtres WooCommerce). Solution : balises canonical pointant vers l'URL principale. Yoast et RankMath le gèrent automatiquement, mais vérifier les cas particuliers. Pour les paramètres URL, configurer dans Search Console les paramètres à ignorer (panneau Paramètres > Paramètres URL).",
        },
        {
          title: "11. Backlinks et autorité du domaine",
          content:
            "Hors-page mais critique : combien de sites externes pointent vers votre WordPress ? Avec quelle qualité ? Outils : Ahrefs, Semrush ou Moz pour mesurer le Domain Rating / Authority. Sur WordPress, vérifier qu'aucun backlink n'est cassé (lien externe pointant vers une URL 404 sur votre site = perte). Plugin Broken Link Checker peut identifier ces cas. Stratégie de netlinking long terme : digital PR, articles invités, citations locales (pour SEO local). Cela ne s'audite pas, ça se construit dans la durée.",
        },
        {
          title: "12. Outils essentiels à mettre en place",
          content:
            "Sans monitoring, vous naviguez à l'aveugle. Outils gratuits indispensables : Google Search Console (positions, requêtes, erreurs d'exploration, Core Web Vitals), Google Analytics 4 ou Plausible (trafic, comportement, conversions), Bing Webmaster Tools (5% du marché mais moins concurrentiel). Outils payants utiles : Ahrefs ou Semrush (suivi positions, analyse concurrence, backlinks — 99$/mois), Screaming Frog SEO Spider (audit on-page, 200€/an). Sur WordPress même : RankMath Pro ou Yoast Premium pour les fonctions SEO avancées.",
        },
      ],
      conclusion:
        "Cette checklist couvre 90% des audits techniques que Google attend. Un site qui passe ces 12 points est solide. Si vous ne savez pas par où commencer, RankMath fait un score SEO interne (>80/100 visé) qui vous oriente vers les principales lacunes. Mais l'œil d'un audit humain reste différent — un consultant SEO trouve souvent des problèmes que les plugins ratent. Si vous voulez un audit complet de votre site WordPress, on en réalise régulièrement pour nos clients normands à un tarif raisonnable, avec rapport écrit et plan d'action chiffré.",
    },
  },
  {
    slug: "securite-wordpress-checklist-2026",
    title: "Sécurité WordPress : la checklist agence en 12 points",
    excerpt:
      "WordPress propulse 43% du web : c'est aussi la cible #1 des bots et hackers. 12 actions concrètes pour sécuriser un site WordPress en 2026, sans tomber dans la paranoïa.",
    category: "WordPress",
    date: "4 mai 2026",
    readTime: "16 min",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    featured: false,
    author,
    tags: ["Sécurité WordPress", "Wordfence", "Maintenance", "WAF", "Hardening"],
    content: {
      introduction:
        "WordPress est attaqué en permanence — pas parce qu'il est mal sécurisé, mais parce qu'il propulse 43% du web : la surface d'attaque est immense. Les bots scannent en continu des millions de sites à la recherche de versions obsolètes, mots de passe faibles, plugins vulnérables. La majorité des compromissions WordPress n'a rien à voir avec des hackers ciblés : ce sont des attaques automatisées qui frappent au hasard. La bonne nouvelle : 90% des risques se neutralisent avec une bonne hygiène. Voici notre checklist complète, appliquée sur tous nos forfaits de maintenance Krealabs.",
      sections: [
        {
          title: "1. Mises à jour : noyau, plugins, thèmes",
          content:
            "Le vecteur d'attaque #1 sur WordPress, c'est un plugin obsolète avec faille connue. La majorité des compromissions exploite des vulnérabilités publiées depuis plus de 6 mois — donc patchées, mais sur des sites qui n'ont pas mis à jour. Stratégie : activer les mises à jour automatiques pour les versions mineures (WP, plugins, thèmes), valider manuellement les versions majeures (qui peuvent casser des choses). Outils de monitoring : ManageWP ou MainWP centralisent les MAJ sur plusieurs sites. Plugin recommandé : Easy Updates Manager pour le contrôle fin par type.",
          code: `// wp-config.php — activer auto-update du core
define('WP_AUTO_UPDATE_CORE', true);

// Pour les plugins (avec précaution)
add_filter('auto_update_plugin', '__return_true');

// Mais idéalement : centraliser avec ManageWP
// et tester avant les majeures`,
        },
        {
          title: "2. Authentification : 2FA et mots de passe forts",
          content:
            "Tous les comptes administrateurs doivent : avoir un mot de passe complexe (16+ caractères, gestionnaire type 1Password/Bitwarden), avoir la 2FA activée (TOTP via Google Authenticator/Authy), ne PAS s'appeler `admin` (changer le username défaut). Plugin recommandé : Two Factor Authentication (Plugin Vault) ou WP 2FA. Pour les rôles : limiter les comptes admin au strict nécessaire. Un rédacteur n'a pas besoin du rôle Administrator, juste Editor ou Author. Auditer régulièrement la liste des utilisateurs et supprimer les comptes inactifs.",
        },
        {
          title: "3. Limiter les tentatives de login",
          content:
            "Les attaques par brute-force sur `/wp-login.php` représentent l'essentiel du trafic malveillant sur un WordPress non protégé. Plugins recommandés : Limit Login Attempts Reloaded (gratuit) ou Wordfence (qui inclut cette fonction). Configuration typique : 4 tentatives échouées = blocage IP 20 minutes, 10 échecs = blocage 24h. Variante : whitelister les IPs admin si vous travaillez depuis IPs fixes. Pour aller plus loin : ajouter un reCAPTCHA v3 sur le formulaire de login.",
        },
        {
          title: "4. Cacher /wp-admin et /wp-login.php",
          content:
            "Tous les bots ciblent `/wp-admin/` et `/wp-login.php`. Changer ces URLs est une protection par obscurité — pas une vraie sécurité, mais ça élimine 95% des attaques automatisées. Plugin recommandé : WPS Hide Login (renomme en `/secret-login-url`). Important : ne pas perdre l'URL custom (la stocker dans le gestionnaire de mots de passe), et garder une redirection ou une page d'erreur 404 sur l'ancienne URL. Combiné avec la 2FA, ça réduit drastiquement la surface d'attaque.",
        },
        {
          title: "5. Permissions fichiers et durcissement wp-config",
          content:
            "Les permissions Unix doivent être correctes : 644 pour les fichiers, 755 pour les dossiers, 600 ou 640 pour `wp-config.php` (le plus sensible). Désactiver l'édition de fichiers depuis l'admin WP (impossible pour un attaquant qui obtient un accès admin de modifier du code via l'interface) :",
          code: `// wp-config.php — durcissement standard

// Empêcher l'édition de fichiers depuis l'admin
define('DISALLOW_FILE_EDIT', true);

// Empêcher l'installation/màj de plugins via l'admin
// (à activer seulement si CI/CD ou déploiement Git)
define('DISALLOW_FILE_MODS', false);

// Changer les clés et sels d'authentification
// Générer via https://api.wordpress.org/secret-key/1.1/salt/
define('AUTH_KEY', '...');
define('SECURE_AUTH_KEY', '...');
// ... et les 6 autres clés`,
        },
        {
          title: "6. Désactivation XML-RPC et REST API publique",
          content:
            "XML-RPC est une vieille API WordPress utilisée pour les pingbacks, l'application mobile WordPress, etc. Si vous ne l'utilisez pas (cas le plus courant), désactivez-la : c'est un vecteur d'attaque récurrent (amplification DDoS, brute-force via xmlrpc.php). Plugin Disable XML-RPC ou règle .htaccess. La REST API WordPress (`/wp-json/`) est utile mais expose par défaut la liste des utilisateurs (`/wp-json/wp/v2/users`) — utile pour un attaquant pour trouver les usernames. Restreindre via plugin Disable REST API ou code custom pour ne laisser passer que les endpoints nécessaires.",
        },
        {
          title: "7. WAF : Cloudflare, Sucuri, Wordfence",
          content:
            "Un Web Application Firewall filtre les requêtes malveillantes AVANT qu'elles n'atteignent WordPress. Trois options crédibles : Cloudflare (gratuit en version basic, WAF avancé en payant ~20$/mois), Sucuri (~200$/an, spécialisé WP), Wordfence (gratuit + payant ~99$/an pour le WAF avancé). Cloudflare en frontal est notre recommandation #1 — il offre CDN + DDoS protection + WAF + analytics. Configurer les règles : bloquer les bots malveillants connus, geo-blocking si vous ne servez qu'un marché (FR/EU), rate limiting agressif sur `/wp-login.php`.",
        },
        {
          title: "8. Sauvegardes : fréquence, lieu, restauration testée",
          content:
            "Sauvegarde = la dernière ligne de défense. Critères : fréquence adaptée (quotidienne pour un site actif, hebdomadaire pour un site vitrine), stockage offsite (Amazon S3, Backblaze, Google Drive — PAS sur le même serveur), rétention 30+ jours, restauration TESTÉE régulièrement (un backup non testé n'est pas un backup). Plugins recommandés : UpdraftPlus (gratuit + Premium 70$/an), BackWPup (open-source), BlogVault (payant mais excellent). Tester la restauration au moins une fois par trimestre sur un staging.",
        },
        {
          title: "9. Monitoring et alerting",
          content:
            "Détecter une compromission rapidement = limiter les dégâts. Outils : Wordfence (alerte si fichiers core modifiés, nouveaux plugins suspects, comptes admin créés), Sucuri SiteCheck (scan quotidien), ManageWP (monitoring uptime + sécurité). Configurer alertes par email/Slack sur événements critiques : nouveau compte admin créé, fichier core modifié, plugin ajouté, downtime > 5 min. Plus tôt vous détectez, plus tôt vous réagissez — souvent la différence entre 1h de réparation et 48h de catastrophe.",
        },
        {
          title: "10. SSL/TLS bien configuré",
          content:
            "HTTPS oui, mais bien fait. Vérifier : version TLS 1.2 minimum (idéalement 1.3 only), certificat valide pas seulement présent, HSTS activé (Strict-Transport-Security header), pas de mixed content (toutes ressources internes en HTTPS), redirect 301 systématique HTTP→HTTPS. Outil de test : SSL Labs (ssllabs.com/ssltest) — viser score A ou A+. Sur WordPress : plugin Really Simple SSL pour automatiser, ou configurer manuellement dans Nginx/Apache.",
        },
        {
          title: "11. Choisir un hébergement WordPress-friendly",
          content:
            "Un hébergement mutualisé bas de gamme (OVH Perso, 1&1 IONOS basic) = WordPress vulnérable par construction. Caractéristiques d'un bon hébergement WP : PHP 8.2+ avec OPcache, MySQL 8 ou MariaDB 10.6+, isolation entre comptes (pas de neighbor risk), monitoring sécurité par l'hébergeur, sauvegardes automatiques quotidiennes, support réactif. Recommandations : o2switch (français, RGPD, ~7€/mois — excellent pour PME), Kinsta (premium WordPress géré, 35$/mois), WP Engine (US premium, 30$/mois), AWS Lightsail (technique, 5$/mois). Éviter : les revendeurs cPanel à 2€/mois.",
        },
        {
          title: "12. Plan d'incident : que faire en cas de compromission",
          content:
            "Si malgré tout vous êtes compromis : 1) Couper l'accès au site (page maintenance), 2) Faire un backup complet de l'état compromis (pour forensics), 3) Restaurer depuis backup sain antérieur à la compromission, 4) Changer TOUS les mots de passe (admin WP, FTP, DB, hébergeur), 5) Régénérer les clés/sels wp-config, 6) Scanner avec Wordfence + Sucuri, 7) Identifier le point d'entrée (plugin vulnérable ?) et patcher, 8) Re-monter, 9) Soumettre Google Search Console si Google a flaggé le site, 10) Surveillance renforcée 30 jours. Un incident bien géré = downtime 4-8h. Mal géré = client perdu, SEO détruit, semaines de récupération.",
        },
      ],
      conclusion:
        "La sécurité WordPress n'est pas une option, c'est une discipline continue. Tous nos forfaits de maintenance Krealabs incluent cette checklist appliquée et monitorée. Si vous gérez votre site vous-même, cette liste vous donne le minimum à mettre en place. Si vous voulez déléguer — pour vous concentrer sur votre métier plutôt que sur les patchs sécurité du dimanche soir — nos forfaits maintenance commencent à un tarif raisonnable et couvrent l'ensemble. Parlons-en si vous voulez dormir tranquille.",
    },
  },

  // ===========================================================================
  // CLUSTER WEB (5 articles)
  // ===========================================================================
  {
    slug: "nextjs-16-app-router-2026",
    title: "Next.js 16 : ce qui change vraiment en 2026",
    excerpt:
      "App Router stabilisé, Turbopack par défaut, Server Components matures. Tour d'horizon des nouveautés Next.js 16 et de leur impact concret sur vos projets.",
    category: "Web",
    date: "5 mai 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    featured: false,
    author,
    tags: ["Next.js", "React", "App Router", "Turbopack", "Web", "Performance"],
    content: {
      introduction:
        "Next.js 16 marque une étape de maturité pour l'écosystème React. Après plusieurs années de transition de l'ancien pages router vers l'App Router, et de migration progressive vers Turbopack, la version 16 stabilise l'ensemble. Voici ce que ces changements signifient concrètement pour vos projets en 2026.",
      sections: [
        {
          title: "Turbopack par défaut",
          content:
            "Turbopack remplace désormais Webpack comme bundler par défaut, en développement comme en production. Les builds sont jusqu'à 5x plus rapides sur les projets de taille moyenne. Le hot reload est quasi instantané, même sur des bases de code de plusieurs centaines de composants. Concrètement : moins d'attente, plus de focus.",
        },
        {
          title: "Server Components stabilisés",
          content:
            "Les React Server Components sont maintenant le mode par défaut dans l'App Router. Le code qui ne nécessite pas d'interactivité ne descend plus côté client — moins de JavaScript, donc des pages plus rapides et un meilleur SEO. La frontière entre client et serveur est plus claire grâce à la directive use client explicite.",
          code: `// app/page.tsx — composant serveur par défaut
export default async function Home() {
  const data = await fetch('https://api.exemple.fr/posts').then(r => r.json())
  return <PostList posts={data} />
}`,
        },
        {
          title: "Caching plus prévisible",
          content:
            "Le système de cache historique de Next.js avait surpris pas mal d'équipes. Next.js 16 le rend explicite et opt-in : aucune mise en cache par défaut sur les requêtes fetch, des helpers clairs (revalidateTag, revalidatePath, unstable_cache) pour piloter la fraîcheur des données. Plus de mauvaises surprises en production.",
        },
        {
          title: "Performance & SEO",
          content:
            "Combinés, ces changements amènent un gain mesurable sur les Core Web Vitals : LCP en baisse de 15 à 30% sur les sites typiques, INP sous le seuil Google par défaut, CLS quasi nul si on respecte les conventions image. Pour le SEO, c'est un atout direct : Google favorise les pages rapides.",
        },
      ],
      conclusion:
        "Pour un projet neuf, Next.js 16 est le meilleur choix pour démarrer en 2026. Pour un projet en Next.js 14 ou 15, la migration vaut le coup mais demande un audit (notamment du caching). Chez Krealabs nous l'utilisons sur tous nos nouveaux projets web.",
    },
  },
  {
    slug: "react-19-server-components-pratique",
    title: "React 19 et les Server Components en pratique",
    excerpt:
      "React 19 stabilise les Server Components, introduit use() pour les promesses, et améliore les actions. Comment les utiliser correctement sur un vrai projet.",
    category: "Web",
    date: "28 avril 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    featured: false,
    author,
    tags: ["React", "Server Components", "use()", "Actions", "Web"],
    content: {
      introduction:
        "React 19 marque la stabilisation des Server Components et introduit plusieurs API qui changent la façon d'écrire des applications. Voici notre retour d'expérience après avoir migré plusieurs projets clients.",
      sections: [
        {
          title: "Server Components : par où commencer",
          content:
            "Tout composant créé dans le dossier app/ est par défaut un Server Component. Cela signifie qu'il s'exécute sur le serveur, accède directement à la base de données, et n'envoie que du HTML au navigateur. On bascule en client uniquement quand on a besoin d'interactivité (useState, useEffect, onClick).",
        },
        {
          title: "Le hook use() pour les promesses",
          content:
            "React 19 introduit use(), qui permet d'attendre une promesse ou de lire un Context dans un composant. Combiné avec Suspense, cela simplifie drastiquement le data fetching côté client.",
          code: `'use client'
import { use } from 'react'

export function Post({ promise }) {
  const post = use(promise) // attend la promesse
  return <article>{post.title}</article>
}`,
        },
        {
          title: "Actions et useActionState",
          content:
            "Les Server Actions sont matures : fonctions serveur appelables directement depuis un formulaire client. Plus besoin d'API route pour un POST de formulaire simple. Le hook useActionState gère l'état (pending, error) de manière idiomatique.",
        },
        {
          title: "Pièges à éviter",
          content:
            "Premier piège : utiliser 'use client' trop large. Marquer un composant feuille comme client n'a pas d'impact, marquer le layout principal force tout l'arbre en client. Deuxième piège : appeler une fonction asynchrone côté client en oubliant Suspense. Le bug est subtil et coûte cher en debug.",
        },
      ],
      conclusion:
        "Les Server Components changent le paradigme React. Bien utilisés, ils réduisent le bundle JS de 40 à 60% sur un site type. Mal utilisés, ils créent une confusion entre données serveur et état client. Investissez du temps dans la formation de l'équipe avant la migration.",
    },
  },
  {
    slug: "typescript-5-strict-mode",
    title: "TypeScript en mode strict : pourquoi et comment migrer",
    excerpt:
      "Activer le mode strict de TypeScript intimide. Mais c'est le meilleur ROI sur la qualité d'une base de code. Méthode de migration progressive sans bloquer l'équipe.",
    category: "Web",
    date: "20 avril 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80",
    featured: false,
    author,
    tags: ["TypeScript", "Typage", "Qualité", "Refactoring", "Web"],
    content: {
      introduction:
        "Le mode strict de TypeScript active une série de checks (strictNullChecks, noImplicitAny, etc.) qui transforment radicalement la fiabilité d'une base de code. Encore faut-il pouvoir migrer un projet existant sans bloquer la livraison de features.",
      sections: [
        {
          title: "Ce que strict change vraiment",
          content:
            "Le mode strict force à gérer explicitement les cas null/undefined, les types implicites any, et les fonctions qui ne couvrent pas tous les cas. Sur une base de code typique, cela révèle 100 à 500 bugs latents — la plupart silencieux en production.",
        },
        {
          title: "Activer progressivement",
          content:
            "Pas besoin de tout activer d'un coup. Commencez par noImplicitAny (souvent gérable), puis strictNullChecks (le plus impactant), puis le reste. Configurez par dossier via tsconfig si nécessaire.",
          code: `// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    // ou progressif :
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}`,
        },
        {
          title: "Outils pour la migration",
          content:
            "ts-migrate de Airbnb automatise une partie. Pour les erreurs restantes, utilisez @ts-expect-error avec un commentaire TODO daté, plutôt que @ts-ignore. Cela permet de tracker la dette et de la résorber progressivement en sprint.",
        },
      ],
      conclusion:
        "Tous nos projets Krealabs démarrent en strict mode. C'est non négociable : le coût initial est minime, le bénéfice sur 2-3 ans est énorme. Si vous héritez d'une base de code non stricte, la migration vaut largement l'investissement.",
    },
  },
  {
    slug: "tailwind-4-migration-2026",
    title: "Tailwind CSS 4 : ce qui a changé et comment migrer",
    excerpt:
      "Tailwind 4 abandonne JavaScript pour la configuration au profit de CSS natif. Plus rapide, plus standard. Guide de migration et pièges à éviter.",
    category: "Web",
    date: "12 avril 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    featured: false,
    author,
    tags: ["Tailwind", "CSS", "Design System", "Web", "Migration"],
    content: {
      introduction:
        "Tailwind 4 marque un tournant majeur : la configuration passe de JavaScript à CSS natif via @theme, le moteur est réécrit en Rust (Oxide), et les performances sont multipliées par 5 à 10. Voici ce qu'il faut savoir pour migrer ses projets.",
      sections: [
        {
          title: "Configuration en CSS via @theme",
          content:
            "Plus de tailwind.config.js. Les tokens (couleurs, espacements, polices) se déclarent directement dans le CSS avec la directive @theme. Plus standard, plus accessible aux designers.",
          code: `@import "tailwindcss";

@theme {
  --color-accent: #b06cff;
  --font-sans: "Switzer", system-ui, sans-serif;
  --radius: 0.625rem;
}`,
        },
        {
          title: "Oxide : un moteur Rust",
          content:
            "Le nouveau moteur scanne et compile en quelques millisecondes même sur de gros projets. Le HMR en dev est quasi instantané. Sur nos projets typiques, le temps de compile en CI passe de 30s à 4s.",
        },
        {
          title: "Pièges de la migration",
          content:
            "Si vous utilisez @apply massivement, attention : Tailwind 4 le décourage. Préférez les classes utilitaires inline ou les variantes de composants. Les plugins JavaScript existants ne sont pas tous compatibles — vérifiez avant la mise à jour.",
        },
      ],
      conclusion:
        "Tailwind 4 est plus simple, plus rapide, plus standard. Pour un projet neuf, c'est un no-brainer. Pour un projet existant en Tailwind 3, prévoir 1 à 2 jours de migration selon la taille du codebase.",
    },
  },
  {
    slug: "prisma-6-postgres-orm",
    title: "Prisma 6 : pourquoi c'est notre ORM de référence",
    excerpt:
      "Prisma offre le meilleur typage TypeScript pour PostgreSQL. Schema lisible, migrations automatiques, requêtes typées de bout en bout. Pourquoi on l'utilise sur tous nos projets.",
    category: "Web",
    date: "3 avril 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=80",
    featured: false,
    author,
    tags: ["Prisma", "PostgreSQL", "Base de données", "TypeScript", "Web"],
    content: {
      introduction:
        "Pour interagir avec une base PostgreSQL en TypeScript, plusieurs options existent : Drizzle, Kysely, TypeORM, ou requêtes SQL brutes. Notre choix par défaut depuis 3 ans : Prisma. Voici pourquoi, et quand on dévie.",
      sections: [
        {
          title: "Schema as source of truth",
          content:
            "Le schema.prisma décrit la structure de la base de manière déclarative. Les types TypeScript du client sont générés automatiquement, les migrations SQL aussi. La duplication entre code et base est éliminée.",
          code: `model Post {
  id        String   @id @default(cuid())
  title     String
  content   String   @db.Text
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}`,
        },
        {
          title: "Typage strict de bout en bout",
          content:
            "Une requête prisma.post.findMany({ include: { author: true } }) retourne un type qui inclut l'objet auteur. Si vous omettez include, le type le sait : impossible d'accéder à post.author par erreur. Refactoring infiniment plus serein.",
        },
        {
          title: "Quand Prisma n'est pas le bon choix",
          content:
            "Pour des requêtes très complexes (window functions, CTE récursives) ou des besoins de performance critiques, le SQL brut via le pool postgres reste préférable. Prisma supporte les raw queries pour ces cas. Sur les projets edge-only (Cloudflare Workers), Drizzle peut être un meilleur fit pour la taille du bundle.",
        },
      ],
      conclusion:
        "Prisma 6 est mature, performant, et offre une DX (developer experience) inégalée. Pour 95% de nos projets, c'est le bon choix. Combiné avec Next.js et TypeScript, vous avez une stack full-typed du frontend à la base.",
    },
  },

  // ===========================================================================
  // CLUSTER MOBILE (3 articles)
  // ===========================================================================
  {
    slug: "react-native-2026-etat-des-lieux",
    title: "React Native en 2026 : où on en est vraiment",
    excerpt:
      "New Architecture par défaut, Expo qui s'impose comme la voie royale, performances proches du natif. État des lieux de React Native pour les agences en 2026.",
    category: "Mobile",
    date: "30 avril 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    featured: false,
    author,
    tags: ["React Native", "Mobile", "iOS", "Android", "Expo"],
    content: {
      introduction:
        "Cinq ans après les premiers grands déploiements en production (Facebook, Shopify), React Native a mûri. La New Architecture est devenue le standard, Expo a redéfini le tooling, et le débat avec Flutter est plus que jamais d'actualité. Notre position d'agence sur le sujet.",
      sections: [
        {
          title: "La New Architecture, enfin par défaut",
          content:
            "Fabric (le nouveau renderer) et TurboModules sont activés par défaut depuis 2025. Les bénéfices sont concrets : démarrage 30% plus rapide, animations plus fluides à 120Hz sur les iPhone récents, interopérabilité Swift/Kotlin moins douloureuse.",
        },
        {
          title: "Expo : le tooling de référence",
          content:
            "Sauf cas spécifique (besoin natif lourd, app legacy), Expo est désormais la voie royale. EAS Build pour les builds cloud, EAS Update pour les patches OTA, Expo Router pour la navigation file-based. La complexité native devient invisible pour 90% des cas.",
        },
        {
          title: "RN ou Flutter ?",
          content:
            "Question récurrente. Notre position : si votre équipe maîtrise déjà React/TypeScript, RN est le choix évident. Si vous démarrez from scratch et visez exclusivement le mobile avec une équipe néophyte, Flutter peut être plus simple. Pour une agence qui couvre web et mobile, RN gagne par cohérence.",
        },
        {
          title: "Limites à connaître",
          content:
            "Les apps très graphiques (jeux, vidéo avancée) restent mieux servies en natif Swift/Kotlin. Les apps avec beaucoup de threads natifs (audio temps réel, ML embarqué) aussi. Pour le reste — 95% des apps métier, e-commerce, productivité — RN est largement suffisant.",
        },
      ],
      conclusion:
        "React Native est l'investissement le plus rationnel pour une PME ou une startup qui veut être sur iOS et Android sans doubler son équipe. Chez Krealabs, c'est notre stack mobile par défaut.",
    },
  },
  {
    slug: "expo-router-file-based-mobile",
    title: "Expo Router : le file-based routing débarque sur mobile",
    excerpt:
      "Expo Router apporte sur React Native la navigation file-based qu'on adore dans Next.js. Plus simple, plus prévisible, optimisé pour le mobile.",
    category: "Mobile",
    date: "22 avril 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    featured: false,
    author,
    tags: ["Expo Router", "React Native", "Navigation", "Mobile"],
    content: {
      introduction:
        "Pendant des années, la navigation mobile en React Native passait par React Navigation et sa configuration impérative. Expo Router change la donne : votre arborescence de fichiers définit votre arborescence d'écrans, comme dans Next.js.",
      sections: [
        {
          title: "Pourquoi c'est mieux",
          content:
            "Plus besoin de déclarer chaque écran dans un fichier de config. Un fichier app/home.tsx crée automatiquement la route /home. Les paramètres dynamiques (app/posts/[id].tsx) fonctionnent comme attendu. Le deep linking est automatique.",
          code: `// Structure de fichiers Expo Router
app/
├── _layout.tsx    // racine
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx  // /
│   ├── posts.tsx  // /posts
│   └── profile.tsx
└── posts/
    └── [id].tsx   // /posts/:id`,
        },
        {
          title: "Layouts imbriqués",
          content:
            "Les fichiers _layout.tsx définissent les Stack, Tabs ou Drawer. Comme dans Next.js, on compose des layouts imbriqués selon la profondeur. La logique de header, tab bar et navigation se trouve où on l'attend.",
        },
        {
          title: "Migration depuis React Navigation",
          content:
            "Pas urgente. Si votre app existante fonctionne bien, restez sur React Navigation. Pour les nouveaux projets, Expo Router est notre choix par défaut depuis 2025. Le mental model est cohérent avec Next.js — gain de productivité pour les équipes full-stack.",
        },
      ],
      conclusion:
        "Expo Router rapproche le DX mobile et web. Pour les équipes qui font du Next.js le jour et du React Native le soir, c'est un gain immédiat. Plus jamais de fichier route.config.ts à 800 lignes.",
    },
  },
  {
    slug: "notifications-push-expo-firebase",
    title: "Notifications push : Expo Push vs Firebase, lequel choisir",
    excerpt:
      "Expo Push est le plus simple, Firebase Cloud Messaging le plus puissant. Comparatif pratique pour choisir la bonne solution selon votre stack mobile.",
    category: "Mobile",
    date: "15 avril 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
    featured: false,
    author,
    tags: ["Notifications push", "Expo", "Firebase", "Mobile", "FCM"],
    content: {
      introduction:
        "Les notifications push sont incontournables dans une app mobile moderne. Pour une app React Native, deux choix dominent : Expo Push (la solution intégrée) et Firebase Cloud Messaging (FCM). Comment choisir ?",
      sections: [
        {
          title: "Expo Push : simple et suffisant",
          content:
            "Si votre app est créée avec Expo, Expo Push est intégré nativement. Récupération du token, envoi via HTTP simple, scheduling basique. Idéal pour 80% des cas (notifications transactionnelles, rappels).",
          code: `import * as Notifications from 'expo-notifications'
const { data: token } = await Notifications.getExpoPushTokenAsync()

// Envoi serveur (via fetch sur https://exp.host/--/api/v2/push/send)
await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  body: JSON.stringify({ to: token, title: 'Hello', body: 'Bienvenue' }),
})`,
        },
        {
          title: "Firebase Cloud Messaging : pour aller plus loin",
          content:
            "Si vous avez besoin de segmentation avancée, de campagnes A/B, d'analytics intégrées, ou de notifications côté web aussi, FCM est plus complet. La mise en place est plus lourde mais l'outillage est mature.",
        },
        {
          title: "Notre recommandation",
          content:
            "Démarrez avec Expo Push, c'est suffisant pour 80% des besoins et 0 effort d'intégration. Si vous prévoyez des campagnes marketing sophistiquées dès le départ, FCM se justifie. Migration possible plus tard sans casser l'app.",
        },
      ],
      conclusion:
        "La meilleure notification push, c'est celle qui arrive. Choisissez la solution la plus simple qui couvre votre cas d'usage actuel. Vous gagnerez le temps économisé sur du contenu plutôt que de l'infrastructure.",
    },
  },

  // ===========================================================================
  // CLUSTER SEO & PERFORMANCE (4 articles)
  // ===========================================================================
  {
    slug: "core-web-vitals-2026-inp",
    title: "Core Web Vitals 2026 : INP a remplacé FID, voici ce que ça change",
    excerpt:
      "Depuis mars 2024, INP (Interaction to Next Paint) remplace FID dans les Core Web Vitals. Plus exigeant, plus représentatif de l'expérience réelle. Méthode d'optimisation.",
    category: "SEO",
    date: "25 avril 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    featured: false,
    author,
    tags: ["Core Web Vitals", "INP", "Performance", "SEO", "Lighthouse"],
    content: {
      introduction:
        "Google a remplacé FID (First Input Delay) par INP (Interaction to Next Paint) dans les Core Web Vitals. Sur le papier, c'est juste un nouveau nom. En pratique, beaucoup de sites qui étaient verts en FID se retrouvent rouges en INP. On t'explique pourquoi et comment corriger.",
      sections: [
        {
          title: "FID vs INP : la vraie différence",
          content:
            "FID ne mesurait que le délai avant la première interaction. INP mesure le pire délai entre toute interaction et la prochaine peinture pendant toute la session. Beaucoup plus représentatif du ressenti réel — et beaucoup plus dur à passer.",
        },
        {
          title: "Seuils Google",
          content:
            "Bon : < 200ms. À améliorer : 200-500ms. Mauvais : > 500ms. Pour info, LCP < 2.5s, CLS < 0.1, et INP < 200ms sont les seuils officiels. Si un seul est rouge, votre page perd des points dans le classement Google.",
        },
        {
          title: "Optimiser l'INP",
          content:
            "Trois leviers principaux. Premièrement : réduire le JS au maximum (Server Components, code splitting, lazy loading). Deuxièmement : éviter les long tasks (découper avec scheduler.yield ou requestIdleCallback). Troisièmement : optimiser les event handlers (debounce, throttle, web workers pour les calculs lourds).",
          code: `// Découper une tâche longue avec scheduler.yield
async function processLargeList(items) {
  for (const item of items) {
    processItem(item)
    if (navigator.scheduling?.isInputPending()) {
      await scheduler.yield()
    }
  }
}`,
        },
        {
          title: "Mesurer en réel",
          content:
            "Lighthouse mesure en lab — c'est utile mais incomplet. Google Search Console et Vercel Analytics donnent l'INP réel de vos utilisateurs (CrUX). C'est cette mesure-là qui compte pour le SEO.",
        },
      ],
      conclusion:
        "L'INP est plus exigeant que le FID, mais c'est tant mieux : il pousse à livrer des sites vraiment fluides. Un site rapide, c'est un meilleur SEO, un meilleur taux de conversion, et un meilleur ressenti utilisateur. Tout est lié.",
    },
  },
  {
    slug: "seo-local-rouen-guide-pme",
    title: "Guide SEO local pour les PME de Rouen et Normandie",
    excerpt:
      "Comment ressortir dans les recherches \"agence X à Rouen\" ? Schema LocalBusiness, fiche Google Business Profile, citations locales. Méthode complète et applicable.",
    category: "SEO",
    date: "10 mai 2026",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    featured: true,
    author,
    tags: ["SEO local", "Rouen", "Normandie", "Google Business", "Schema.org"],
    content: {
      introduction:
        "Vous tenez un commerce, un cabinet ou une PME à Rouen. Vos clients potentiels tapent \"votre métier + Rouen\" sur Google. Comment faire pour ressortir dans les premiers résultats — voire dans le pack local (les 3 résultats avec carte) ? Voici la méthode que nous appliquons chez Krealabs pour nos clients normands.",
      sections: [
        {
          title: "Fiche Google Business Profile",
          content:
            "C'est la fondation. Sans fiche Google Business optimisée, oubliez le pack local. Catégorie précise, adresse correcte, horaires complets, photos régulières, réponses aux avis. Mettre à jour au moins une fois par mois avec un post.",
        },
        {
          title: "Schema.org LocalBusiness",
          content:
            "Sur votre site, ajoutez un balisage JSON-LD de type LocalBusiness (ou plus spécifique : Restaurant, Dentist, ProfessionalService). Google comprend mieux qui vous êtes, où vous êtes, ce que vous proposez.",
          code: `{
  "@type": "ProfessionalService",
  "name": "Krealabs",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Rouen",
    "postalCode": "76000",
    "addressRegion": "Normandie"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 49.4431, "longitude": 1.0993 }
}`,
        },
        {
          title: "Citations locales",
          content:
            "Plus votre entreprise est mentionnée sur des sites locaux pertinents (annuaires, chambres de commerce, presse locale), plus Google confirme votre légitimité géographique. Visez la cohérence : NAP (Name, Address, Phone) identique partout.",
        },
        {
          title: "Contenu géolocalisé",
          content:
            "Créez du contenu qui parle de votre ville et région. Page dédiée \"Métier à Rouen\", articles de blog sur des sujets locaux, témoignages clients de la région. Les requêtes longue traîne géolocalisées sont moins concurrentielles.",
        },
        {
          title: "Avis Google",
          content:
            "Le nombre d'avis et leur note moyenne pèsent fortement dans le pack local. Demandez systématiquement à vos clients satisfaits de laisser un avis (lien direct dans un email de fin de mission). Répondez à tous les avis, positifs comme négatifs.",
        },
      ],
      conclusion:
        "Le SEO local est un marathon : 3 à 6 mois pour voir des effets significatifs. Mais pour une PME qui dépend de sa clientèle locale, c'est l'investissement marketing le plus rentable. Chez Krealabs, nous accompagnons les entreprises rouennaises sur ces sujets — n'hésitez pas à nous contacter pour un audit.",
    },
  },
  {
    slug: "schema-org-agences-web",
    title: "Schema.org pour les agences web : balisage complet",
    excerpt:
      "Sitelinks, breadcrumbs, FAQ, services, équipe : tous les balisages JSON-LD utiles pour une agence web ou digitale, avec exemples concrets.",
    category: "SEO",
    date: "8 mai 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
    featured: false,
    author,
    tags: ["Schema.org", "JSON-LD", "Rich Snippets", "SEO", "Agence web"],
    content: {
      introduction:
        "Schema.org est le vocabulaire commun que Google, Bing et Yandex utilisent pour comprendre votre site. Pour une agence web, c'est l'occasion d'afficher des rich snippets (étoiles, FAQ, fil d'Ariane) qui font la différence dans les résultats de recherche.",
      sections: [
        {
          title: "ProfessionalService — la fondation",
          content:
            "Le type ProfessionalService (sous-classe de LocalBusiness) est idéal pour une agence. Il accepte tous les champs utiles : adresse, géolocalisation, services, prix, horaires, contact. À placer sur la home dans un script JSON-LD.",
        },
        {
          title: "BreadcrumbList — le fil d'Ariane",
          content:
            "Sur chaque page intérieure, ajoutez un BreadcrumbList pour afficher le chemin de navigation sous le titre dans Google. Petit effort, vrai impact UX dans les SERP.",
          code: `{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://krealabs.fr" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://krealabs.fr/services" }
  ]
}`,
        },
        {
          title: "FAQPage — pour les pages FAQ",
          content:
            "Sur votre page FAQ, ajoutez un balisage FAQPage. Google peut afficher directement les questions/réponses dans la SERP, ce qui augmente considérablement le taux de clic.",
        },
        {
          title: "Article — pour les articles de blog",
          content:
            "Chaque article doit avoir un balisage Article avec author, datePublished, image. Cela permet à Google de proposer votre contenu dans Discover, Top Stories, etc.",
        },
      ],
      conclusion:
        "Le balisage Schema.org ne demande pas de gros efforts mais offre un retour clair en visibilité. Si vous gérez le site vous-même, des plugins existent (Rank Math, Yoast). Si vous êtes sur du custom (Next.js, par exemple), c'est quelques scripts à ajouter — voir notre implémentation open source sur GitHub.",
    },
  },
  {
    slug: "audit-lighthouse-methode-agence",
    title: "Audit Lighthouse : la méthode qu'on applique en agence",
    excerpt:
      "Un Lighthouse à 50 ne donne pas la même priorité d'actions qu'un à 85. Méthode complète d'audit selon le score, avec quick wins et chantiers de fond.",
    category: "SEO",
    date: "1 mai 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    featured: false,
    author,
    tags: ["Lighthouse", "Audit", "Performance", "Core Web Vitals", "SEO"],
    content: {
      introduction:
        "Lighthouse donne 4 scores : Performance, Accessibility, Best Practices, SEO. Mais un site à 50 et un site à 85 ne se traitent pas du tout pareil. Voici la méthode que nous appliquons chez Krealabs pour cadrer un audit, prioriser les actions, et mesurer les progrès.",
      sections: [
        {
          title: "Site à 30-50 : urgence performance",
          content:
            "Le plus probable : images non optimisées, JS énorme, render-blocking CSS. Trois quick wins : convertir les images en WebP/AVIF avec next/image, code splitting, minification + brotli sur le CDN. Ces 3 actions remontent souvent le score à 70+ en quelques jours.",
        },
        {
          title: "Site à 50-75 : nettoyage des dépendances",
          content:
            "On entre dans le détail. Auditer le bundle JavaScript (webpack-bundle-analyzer), identifier les dépendances surdimensionnées (Moment.js, Lodash entier), traiter les CLS (réserver l'espace pour les images, les fonts, les ads).",
          code: `// Analyse du bundle Next.js
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer({})`,
        },
        {
          title: "Site à 75-90 : optimisation fine",
          content:
            "Préload des polices critiques, priorité des images above-the-fold, lazy loading agressif, font-display: swap, optimisation des Core Web Vitals (LCP, INP, CLS) au cas par cas. C'est là qu'on gagne 5-10 points sans renoncer aux features.",
        },
        {
          title: "Site à 90+ : maintenance",
          content:
            "Le score est bon. L'enjeu devient de ne pas régresser. CI Lighthouse en pull request, alerting si un score baisse, audit trimestriel. C'est de la gestion de patrimoine technique.",
        },
      ],
      conclusion:
        "Un Lighthouse à 100 n'est pas un objectif en soi. Un site stable à 85-95 avec un INP < 200ms et un LCP < 2s, c'est largement suffisant pour ressortir dans Google. Concentrez-vous sur l'expérience réelle (CrUX) plutôt que sur le score lab.",
    },
  },

  // ===========================================================================
  // CLUSTER OUTILS & MÉTHODES (3 articles)
  // ===========================================================================
  {
    slug: "ai-coding-claude-cursor-agence",
    title: "Coder avec l'IA en agence : ce qui marche en 2026",
    excerpt:
      "Cursor, Claude Code, Copilot. Comment on intègre l'IA dans le quotidien d'une agence sans sacrifier la qualité. Retour d'expérience après 2 ans.",
    category: "Outils",
    date: "29 avril 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    featured: false,
    author,
    tags: ["IA", "Claude", "Cursor", "Copilot", "Productivité"],
    content: {
      introduction:
        "Deux ans après l'arrivée de Cursor et Claude Code dans le quotidien des développeurs, où en sommes-nous ? Quelle place ces outils prennent-ils dans une agence comme Krealabs ? Retour d'expérience honnête, avec ce qui marche, ce qui ne marche pas, et ce qui marche trop bien.",
      sections: [
        {
          title: "Ce que l'IA fait bien",
          content:
            "Boilerplate, conversions de format (JSON → TypeScript), génération de tests unitaires basés sur le code existant, refactoring mécanique (renommage, extraction de fonction), explication d'un code legacy obscur. Sur ces tâches, gain de productivité réel : 30 à 50%.",
        },
        {
          title: "Ce que l'IA fait mal (ou plutôt, où il faut rester vigilant)",
          content:
            "Décisions d'architecture, équilibrage de la dette technique, compréhension fine du contexte métier client. L'IA propose souvent du code qui marche mais qui n'est pas idiomatique pour votre stack. Et sur les API récentes (Next.js 16, React 19), ses connaissances peuvent être en retard.",
        },
        {
          title: "Notre workflow Krealabs",
          content:
            "Pair programming avec Cursor / Claude Code pour les tâches concrètes, jamais pour la planification architecturale. Reviews humaines systématiques (tout code AI passe en review). Tests automatisés non négociables — si l'IA a produit le code, le test garantit qu'il fait ce qu'il prétend.",
        },
        {
          title: "Impact sur la formation",
          content:
            "Pour un junior, l'IA peut être un piège : générer du code qu'on ne comprend pas. Pour un senior, c'est un accélérateur. La discipline d'agence : on ne mergeune pull request que si on saurait l'écrire soi-même.",
        },
      ],
      conclusion:
        "L'IA accélère les bons développeurs et masque les faiblesses des mauvais. Chez Krealabs, on l'utilise quotidiennement — et on rend toujours du code qu'on comprend, qu'on a testé et qu'on assume.",
    },
  },
  {
    slug: "github-actions-pme-cicd-zero",
    title: "GitHub Actions pour PME : CI/CD à partir de zéro",
    excerpt:
      "Comment mettre en place une CI/CD propre sur un projet web ou mobile sans usine à gaz. Workflow minimal à copier-coller, avec extensions selon vos besoins.",
    category: "Outils",
    date: "18 avril 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&q=80",
    featured: false,
    author,
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Outils", "Automatisation"],
    content: {
      introduction:
        "Le CI/CD (intégration et déploiement continus) est un investissement à fort ROI pour une PME. GitHub Actions étant intégré à GitHub, pas besoin d'infrastructure externe. Voici un workflow minimal qui couvre 90% des besoins d'un projet web ou mobile.",
      sections: [
        {
          title: "Le minimum vital : lint + test",
          content:
            "Un job qui tourne à chaque pull request : npm ci, lint, type-check, tests. Si un de ces 4 étapes échoue, la PR est bloquée. Cela coûte 0 effort à mettre en place et évite 90% des régressions.",
          code: `# .github/workflows/ci.yml
name: CI
on: pull_request
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test`,
        },
        {
          title: "Build & deploy par environnement",
          content:
            "Sur push vers main, déploiement en production (Vercel, Netlify, AWS). Sur push vers develop, déploiement en staging. Sur chaque PR, preview deployment automatique (Vercel le fait nativement, sinon GitHub Actions + Cloudflare Pages).",
        },
        {
          title: "Cache et performance",
          content:
            "Cacher node_modules, le cache Next.js, et les artefacts Playwright peut diviser le temps de CI par 3. Sur un workflow de 10 minutes, cela compte vite.",
        },
        {
          title: "Au-delà : les extras qui valent le coup",
          content:
            "Vérification de coverage minimum, scan de sécurité (Dependabot, Snyk), validation des migrations DB en preview, tests e2e Playwright sur les PR critiques. Mais pas la peine de tout activer dès le jour 1 — commencez petit.",
        },
      ],
      conclusion:
        "Un CI/CD minimal mis en place en 30 minutes vaut mieux qu'un CI/CD parfait jamais déployé. Démarrez petit, étendez au fur et à mesure. Chez Krealabs, tous nos projets ont CI dès le premier commit.",
    },
  },
  {
    slug: "vercel-vs-ovh-hebergement-2026",
    title: "Vercel ou OVH : où héberger en 2026 ?",
    excerpt:
      "Le débat de l'hébergement revient à chaque projet. Vercel pour la DX, OVH pour le coût et la souveraineté. Comment choisir selon votre contexte.",
    category: "Outils",
    date: "8 avril 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    featured: false,
    author,
    tags: ["Hébergement", "Vercel", "OVH", "Cloud", "Souveraineté"],
    content: {
      introduction:
        "À chaque démarrage de projet, la même question revient : Vercel, AWS, ou un hébergeur français comme OVH ou Scaleway ? La réponse dépend du contexte. Notre grille de décision chez Krealabs.",
      sections: [
        {
          title: "Vercel — la DX maximale",
          content:
            "Pour un projet Next.js, Vercel est imbattable côté expérience développeur. Deploy en un push Git, preview branches automatiques, edge functions, analytics intégrées. Coût raisonnable pour des projets PME (Pro à 20$/mois/dev). En revanche : données hébergées hors UE par défaut, prix qui grimpe vite si le trafic explose.",
        },
        {
          title: "OVH / Scaleway — souveraineté française",
          content:
            "Pour un client sensible à la souveraineté des données (administration, santé, finance), un hébergeur français est presque obligatoire. Coût stable, prévisible, mais DX plus rugueuse. Demande de la compétence DevOps pour bien faire.",
        },
        {
          title: "AWS — la flexibilité maximale",
          content:
            "Pour des besoins complexes (multi-régions, services managés AWS spécifiques, gros volumes), AWS reste la référence. Coût difficilement prévisible, courbe d'apprentissage importante. Pertinent pour des projets à fort potentiel de scale.",
        },
        {
          title: "Notre recommandation",
          content:
            "Pour 80% des projets PME que nous accompagnons : Vercel pour le front Next.js + Neon (Postgres serverless) pour la base. Pour les projets exigeants en souveraineté : Scaleway + Postgres managé Scaleway. Pour les projets à fort scale : AWS, mais on prévoit du temps DevOps dédié.",
        },
      ],
      conclusion:
        "Il n'y a pas de mauvais choix, juste un choix adapté à votre contexte. Le coût d'hébergement est rarement la variable la plus importante — c'est plutôt le coût d'opération sur 3 ans qu'il faut regarder. Et la possibilité d'évoluer sans tout réécrire.",
    },
  },
];
