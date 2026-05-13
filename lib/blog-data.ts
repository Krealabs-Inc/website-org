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
        "WordPress n'est pas mort, mais il n'est pas non plus la solution universelle. C'est l'outil le plus pragmatique pour 80% des PME et associations, à condition d'être bien fait. Mal fait, c'est l'enfer. La différence se joue sur l'agence qui le pose. Si vous avez un projet WordPress — création, refonte, migration — découvrez notre offre dédiée [WordPress](/services/wordpress) et nos guides sur la [refonte sans perdre le SEO](/blog/refonte-wordpress-sans-perdre-seo) et [WooCommerce vs Shopify pour PME](/blog/woocommerce-vs-shopify-pme). Pour les projets qui sortent du périmètre WP, on couvre aussi la stack moderne ([Next.js, Python, React Native](/services/developpement-web)). Mais pour la plupart des entreprises rouennaises et normandes, WordPress reste la réponse la plus économique et la plus durable.",
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
        "Cette checklist couvre 90% des audits techniques que Google attend. Un site qui passe ces 12 points est solide. Si vous ne savez pas par où commencer, RankMath fait un score SEO interne (>80/100 visé) qui vous oriente vers les principales lacunes. Mais l'œil d'un audit humain reste différent — un consultant SEO trouve souvent des problèmes que les plugins ratent. Allez plus loin avec notre [guide SEO local Rouen](/blog/seo-local-rouen-guide-pme), notre [méthode d'audit Lighthouse](/blog/audit-lighthouse-methode-agence), et notre [checklist sécurité WordPress](/blog/securite-wordpress-checklist-2026). Pour un audit complet de votre site WordPress par nos soins, c'est notre [service WordPress](/services/wordpress) ou [Performance & SEO](/services/performance-seo) qui s'en occupent. Premier diagnostic offert.",
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
      "App Router stabilisé, Turbopack par défaut, Server Components matures, streaming UI maîtrisé. Tour d'horizon complet des nouveautés Next.js 16 et de leur impact concret sur vos projets, avec retour d'expérience d'agence.",
    category: "Web",
    date: "5 mai 2026",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    featured: false,
    author,
    tags: ["Next.js", "React", "App Router", "Turbopack", "Web", "Performance", "Server Components"],
    content: {
      introduction:
        "Next.js 16 marque une étape de maturité pour l'écosystème React. Après plusieurs années de transition de l'ancien pages router vers l'App Router, de migration progressive vers Turbopack, et d'expérimentation autour des Server Components, la version 16 stabilise l'ensemble. Pour la première fois depuis Next.js 13, vous pouvez démarrer un projet sans vous poser la question \"je prends quelle architecture ?\". Voici ce que ces changements signifient concrètement pour vos projets en 2026, avec notre retour d'expérience après plusieurs migrations chez Krealabs et plus de 30 projets en Next.js livrés.",
      sections: [
        {
          title: "Turbopack par défaut, Webpack en retraite",
          content:
            "Turbopack remplace désormais Webpack comme bundler par défaut, en développement comme en production. Les builds sont jusqu'à 5x plus rapides sur les projets de taille moyenne, avec des écarts encore plus marqués sur les gros monorepos (où on observait des temps de cold build de 8-10 minutes, désormais ramenés à 1-2 minutes). Le hot reload est quasi instantané, même sur des bases de code de plusieurs centaines de composants. Concrètement pour une équipe de dev : moins d'attente, plus de focus, et un dev server qui ne crashe plus quand on installe un gros paquet npm. Petit caveat : si vous utilisez un custom webpack.config.js (très rare en 2026), il faut migrer vers la config Turbopack qui est différente — la majorité des cas sont supportés natiment, mais quelques plugins exotiques (analyse de bundle, modules wasm anciens) demandent une adaptation.",
        },
        {
          title: "Server Components stabilisés et par défaut",
          content:
            "Les React Server Components sont maintenant le mode par défaut dans l'App Router. Le code qui ne nécessite pas d'interactivité ne descend plus côté client — moins de JavaScript, donc des pages plus rapides et un meilleur SEO. La frontière entre client et serveur est plus claire grâce à la directive 'use client' explicite. En pratique, on observe sur nos projets une réduction de 40 à 60% du bundle JS livré au navigateur par rapport à un Next.js 13 en pages router. Pour un site contenu (blog, marketing, e-commerce avec interactions limitées), c'est un game-changer pour les Core Web Vitals.",
          code: `// app/page.tsx — composant serveur par défaut
// Pas de useState ni d'event handler côté serveur
export default async function Home() {
  const data = await fetch('https://api.exemple.fr/posts').then(r => r.json())
  return <PostList posts={data} />
}

// Pour de l'interactivité, marquer explicitement client
'use client'
import { useState } from 'react'
export function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false)
  return <button onClick={() => setLiked(!liked)}>...</button>
}`,
        },
        {
          title: "Caching plus prévisible : opt-in par défaut",
          content:
            "Le système de cache historique de Next.js avait surpris pas mal d'équipes (notamment la mise en cache silencieuse des requêtes fetch en production qui a causé pas mal de bugs en 2023-2024). Next.js 16 le rend explicite et opt-in : aucune mise en cache par défaut sur les requêtes fetch, des helpers clairs (revalidateTag, revalidatePath, unstable_cache, et le nouveau 'use cache' au niveau composant) pour piloter la fraîcheur des données. Plus de mauvaises surprises en production. Il faut prendre le temps d'audit son code : sur nos migrations Next.js 14 → 16, on a souvent dû ajouter explicitement du caching où il était implicite avant, sinon on bombarde le serveur de requêtes inutiles.",
          code: `// Mise en cache explicite avec 'use cache'
async function getPosts() {
  'use cache'
  const res = await fetch('https://api.exemple.fr/posts', {
    next: { revalidate: 3600 } // 1h
  })
  return res.json()
}`,
        },
        {
          title: "Streaming UI et Suspense en pratique",
          content:
            "Next.js 16 pousse fortement le streaming SSR via Suspense. Concrètement : votre page peut commencer à s'afficher dès que la partie statique est prête, et les sections qui dépendent de données async se chargent progressivement avec des skeletons en attendant. Pour l'utilisateur, c'est un Time To First Byte (TTFB) divisé par 2 ou 3 sur des pages complexes. Pour Google, c'est un LCP bien plus rapide. La syntaxe est limpide : envelopper la zone async dans un <Suspense fallback={<Skeleton />}> et React Streaming gère la suite. Sur nos projets, on streamse systématiquement les sections \"below the fold\" qui dépendent d'API tierces (recommandations produits, témoignages dynamiques, posts blog).",
          code: `// app/dashboard/page.tsx — streaming via Suspense
export default function Dashboard() {
  return (
    <>
      <Header /> {/* Affiché immédiatement */}
      <Suspense fallback={<RevenueSkeleton />}>
        <RevenueChart /> {/* Async, streamé */}
      </Suspense>
      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders /> {/* Async, streamé */}
      </Suspense>
    </>
  )
}`,
        },
        {
          title: "Performance & SEO : les gains mesurés",
          content:
            "Combinés, ces changements amènent un gain mesurable sur les Core Web Vitals. Sur des projets typiques chez Krealabs : LCP en baisse de 15 à 30% par rapport à Next.js 13/14, INP sous le seuil Google par défaut (< 200ms) grâce à la réduction du JS, CLS quasi nul si on respecte les conventions next/image (width/height obligatoires). Pour le SEO, c'est un atout direct : Google favorise les pages rapides, et avec les Server Components, on a moins de problèmes d'hydration qui pénalisent l'INP. À noter : tous ces gains nécessitent une vraie discipline architecture — un projet Next.js 16 mal codé reste lent. Le framework ne fait pas tout.",
        },
        {
          title: "Migration depuis Next.js 14 ou 15 : la méthode",
          content:
            "Pour un projet en Next.js 14/15, la migration vers 16 vaut le coup mais demande méthode. Étapes : 1) Mettre à jour la dépendance et tester en local. 2) Lire le upgrade guide officiel (changements breaking : caching, certaines API React). 3) Auditer toutes les routes pour identifier les composants qui devraient être Server Components mais ont 'use client' inutilement (gain bundle). 4) Auditer les fetch() pour ajouter explicit caching là où il était implicite. 5) Tester intensivement l'app en local avec NODE_ENV=production. 6) Déployer sur staging et mesurer Core Web Vitals avant/après. La migration d'une app moyenne (50-100 routes) prend 1 à 3 jours selon la dette accumulée.",
        },
        {
          title: "Quand Next.js 16 n'est PAS le bon choix",
          content:
            "Next.js 16 brille pour les sites web modernes, marketing, e-commerce, dashboards et apps SaaS standards. Mais il y a des cas où d'autres outils sont préférables : pour un blog ultra-statique avec contenu en Markdown et zéro interaction, Astro est plus léger. Pour un site WordPress avec écosystème de plugins établi, WordPress reste imbattable (et oui, c'est notre spécialité chez Krealabs). Pour une app temps réel intensive (chat collaboratif, jeux), une stack avec un backend WebSocket dédié (Socket.io, Liveblocks, Convex) est plus adaptée — Next.js peut le faire mais ce n'est pas son terrain natif. Pour du mobile, c'est React Native évidemment, pas Next.js. Bref : Next.js 16 n'est pas une religion, c'est un outil parmi d'autres dans notre boîte à outils.",
        },
      ],
      conclusion:
        "Pour un projet neuf, Next.js 16 est le meilleur choix pour démarrer en 2026 — à condition que le besoin justifie cette stack. Pour un projet en Next.js 14 ou 15, la migration vaut le coup mais demande un audit (notamment du caching et des Server Components vs Client Components). Chez Krealabs, nous l'utilisons sur tous nos projets web qui ne sont pas sur WordPress (SaaS, dashboards, plateformes B2B, sites complexes). Si vous hésitez entre WordPress, Next.js, ou une autre stack pour votre projet, écrivez-nous : on cadre gratuitement le bon outil pour le bon besoin.",
    },
  },
  {
    slug: "react-19-server-components-pratique",
    title: "React 19 et les Server Components en pratique",
    excerpt:
      "React 19 stabilise les Server Components, introduit use() pour les promesses, useOptimistic pour l'UI optimiste, et améliore les Actions. Guide complet pour les utiliser correctement sur un vrai projet, avec retours terrain.",
    category: "Web",
    date: "28 avril 2026",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    featured: false,
    author,
    tags: ["React", "Server Components", "use()", "Actions", "useOptimistic", "Web"],
    content: {
      introduction:
        "React 19 marque la stabilisation des Server Components après 2 ans d'expérimentation, et introduit plusieurs API qui changent la façon d'écrire des applications React. C'est probablement la mise à jour la plus impactante depuis l'arrivée des Hooks en 2019. Voici notre retour d'expérience chez Krealabs après avoir migré une dizaine de projets clients de React 18 vers React 19, avec les pièges classiques, les bonnes pratiques, et les cas où on déconseille de migrer.",
      sections: [
        {
          title: "Server Components : par où commencer",
          content:
            "Tout composant créé dans le dossier app/ d'une app Next.js est par défaut un Server Component. Cela signifie qu'il s'exécute sur le serveur (Node.js ou Edge runtime), accède directement à la base de données ou aux API, et n'envoie que du HTML statique au navigateur. Aucun JavaScript de ce composant n'est descendu côté client. On bascule en Client Component uniquement quand on a besoin d'interactivité (useState, useEffect, onClick, hooks navigateur). La règle d'or : commencez TOUT en Server Component, puis marquez explicitement 'use client' sur les feuilles qui en ont besoin. C'est l'inverse du pattern React 18 où tout était client par défaut.",
        },
        {
          title: "Le pattern composant client/serveur en pratique",
          content:
            "Un pattern qu'on utilise systématiquement chez Krealabs : un composant parent Server qui fetche les données, et passe les props (incluant les fonctions au format Server Actions) à un composant enfant Client qui gère l'interactivité. Ce pattern garde le bundle JS minimal tout en permettant des UI riches.",
          code: `// Server Component (parent)
async function ProductPage({ id }) {
  const product = await db.product.findUnique({ where: { id } })
  return <ProductCard product={product} addToCart={addToCartAction} />
}

// Client Component (enfant)
'use client'
import { useState } from 'react'
export function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1)
  return (
    <form action={addToCart}>
      <input name="qty" value={quantity} />
      <button>Ajouter</button>
    </form>
  )
}`,
        },
        {
          title: "Le hook use() pour les promesses",
          content:
            "React 19 introduit use(), qui permet d'attendre une promesse ou de lire un Context dans un composant. Combiné avec Suspense, cela simplifie drastiquement le data fetching côté client. Le composant qui appelle use() suspendra jusqu'à résolution de la promesse, déclenchant le fallback du <Suspense> parent. C'est plus simple que useEffect + useState + isLoading, et 100% compatible avec le streaming SSR de Next.js.",
          code: `'use client'
import { use, Suspense } from 'react'

export function Post({ promise }) {
  const post = use(promise) // attend la promesse
  return <article>{post.title}</article>
}

// Usage parent (Server Component)
export default function Page() {
  const postPromise = fetch('/api/post/1').then(r => r.json())
  return (
    <Suspense fallback={<Skeleton />}>
      <Post promise={postPromise} />
    </Suspense>
  )
}`,
        },
        {
          title: "Actions et useActionState",
          content:
            "Les Server Actions sont matures : fonctions serveur appelables directement depuis un formulaire client. Plus besoin d'API route REST pour un POST de formulaire simple. Le hook useActionState gère l'état (pending, error, result) de manière idiomatique, et useFormStatus permet d'accéder à l'état de submission depuis un sous-composant. Sur nos formulaires de contact, devis, signup, on utilise ce pattern systématiquement — il remplace toute la boilerplate axios/fetch + useState + try/catch qu'on avait dans les apps React 18.",
          code: `'use client'
import { useActionState } from 'react'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, null)
  return (
    <form action={formAction}>
      <input name="email" />
      <button disabled={pending}>{pending ? 'Envoi…' : 'Envoyer'}</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  )
}`,
        },
        {
          title: "useOptimistic : l'UI qui répond instantanément",
          content:
            "useOptimistic est probablement le hook le plus sous-estimé de React 19. Il permet d'afficher un état \"optimiste\" en attendant la confirmation du serveur. L'utilisateur voit l'effet de son action immédiatement (like, comment, ajout panier), même si la requête prend 500ms à revenir. Si elle échoue, on rollback automatiquement. C'est ce qui donne aux apps modernes ce feeling de fluidité instantanée. Une fois qu'on a goûté, on ne peut plus s'en passer.",
          code: `'use client'
import { useOptimistic } from 'react'

export function LikeButton({ likes, onLike }) {
  const [optimisticLikes, addLike] = useOptimistic(likes, (s) => s + 1)
  return (
    <button onClick={async () => {
      addLike() // UI mise à jour immédiatement
      await onLike() // serveur, peut être lent
    }}>
      ❤️ {optimisticLikes}
    </button>
  )
}`,
        },
        {
          title: "Pièges classiques à éviter",
          content:
            "Premier piège : utiliser 'use client' trop large. Marquer un composant feuille comme client n'a pas d'impact, mais marquer le layout principal force tout l'arbre en client — gaspillage massif du bundle JS. Deuxième piège : appeler une fonction asynchrone côté client en oubliant Suspense — le bug est subtil et coûte cher en debug. Troisième piège : oublier que les Server Components ne peuvent pas être interactifs, et essayer d'y mettre un onClick (erreur de build claire heureusement). Quatrième piège : partager du state entre Server et Client Components — impossible par nature. Pour le state global, utilisez TanStack Query, Zustand côté client, ou la DB côté serveur.",
        },
        {
          title: "Quand utiliser Server vs Client Components",
          content:
            "Heuristique simple : tout ce qui peut être Server Component DOIT l'être. Les Client Components sont réservés à ce qui nécessite : event handlers (onClick, onChange, onSubmit), hooks (useState, useEffect, useRef), API navigateur (localStorage, window, document), bibliothèques third-party qui en ont besoin (Framer Motion, Mapbox, certains UI kits). Pour tout le reste — affichage de données, accès à la DB, fetch externe, calculs serveur — Server Component. Cette discipline divise par 2 à 3 le bundle JS final.",
        },
        {
          title: "Migration React 18 → 19 : la méthode",
          content:
            "Pour les projets Next.js qui sont déjà sur App Router, la migration vers React 19 est généralement transparente : Next.js 16 l'utilise par défaut. Pour un projet Vite ou CRA en React 18, la migration est plus complexe : il faut adopter ou React Server Components (via Vite RSC ou Remix), ou rester en mode classique. Notre conseil : ne pas migrer brutalement si votre app actuelle marche bien. Profitez d'une refonte majeure ou d'un nouveau projet pour adopter React 19. Sur les projets clients existants, on attend qu'un besoin métier justifie le coût de migration.",
        },
      ],
      conclusion:
        "Les Server Components changent le paradigme React de fond en comble. Bien utilisés, ils réduisent le bundle JS de 40 à 60% sur un site type, et permettent un mental model plus simple (le serveur = serveur, le client = client, fini les hacks). Mal utilisés, ils créent une confusion entre données serveur et état client. Investissez du temps dans la formation de l'équipe avant la migration. Chez Krealabs, on a passé environ 2 semaines d'apprentissage en équipe avant de se sentir vraiment à l'aise. Le gain en productivité ensuite est réel.",
    },
  },
  {
    slug: "typescript-5-strict-mode",
    title: "TypeScript en mode strict : pourquoi et comment migrer",
    excerpt:
      "Activer le mode strict de TypeScript intimide. C'est pourtant le meilleur ROI sur la qualité d'une base de code. Méthode de migration progressive sans bloquer l'équipe, et bénéfices mesurés après 5 ans en strict mode chez Krealabs.",
    category: "Web",
    date: "20 avril 2026",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80",
    featured: false,
    author,
    tags: ["TypeScript", "Typage", "Qualité", "Refactoring", "Web", "Strict mode"],
    content: {
      introduction:
        "Le mode strict de TypeScript active une série de checks (strictNullChecks, noImplicitAny, noUncheckedIndexedAccess, etc.) qui transforment radicalement la fiabilité d'une base de code. Encore faut-il pouvoir migrer un projet existant sans bloquer la livraison de features. Chez Krealabs, tous nos projets sont en strict mode depuis 2020, et on a accompagné une douzaine de clients dans la migration de leur base de code non-stricte. Voici ce qu'on a appris : ce que strict change vraiment, comment migrer progressivement, et les bénéfices mesurables qu'on observe après 1-2 ans.",
      sections: [
        {
          title: "Ce que strict change vraiment",
          content:
            "Le mode strict force à gérer explicitement les cas null/undefined (strictNullChecks), les types implicites any (noImplicitAny), les fonctions qui ne couvrent pas tous les cas (strictFunctionTypes), et les méthodes appelées sur des valeurs potentiellement nulles (alwaysStrict). Sur une base de code typique de 50k lignes, l'activation révèle 100 à 500 bugs latents — la plupart silencieux en production : variables undefined dans certains edge cases, propriétés d'objet manquantes, fonctions qui retournent parfois undefined sans que personne ne le sache. Les développeurs qui ont vécu une migration n'imaginent plus revenir en arrière.",
        },
        {
          title: "L'option qui change tout : noUncheckedIndexedAccess",
          content:
            "C'est l'option la moins connue et la plus impactante. Sans elle, `array[0]` est typé comme le type du tableau (T), pas T | undefined. Or, l'index 0 d'un tableau vide est undefined ! Avec noUncheckedIndexedAccess, TypeScript force à vérifier l'existence avant utilisation. C'est verbeux au début mais ça élimine une catégorie entière de bugs `TypeError: Cannot read property X of undefined`.",
          code: `// Sans noUncheckedIndexedAccess
const first = users[0]
console.log(first.name) // Crash si users est vide

// Avec noUncheckedIndexedAccess
const first = users[0]
console.log(first.name) // ❌ TypeScript : first peut être undefined
console.log(first?.name) // ✅ OK
if (first) console.log(first.name) // ✅ OK`,
        },
        {
          title: "Activer progressivement, par dossier",
          content:
            "Pas besoin de tout activer d'un coup. Commencez par noImplicitAny (souvent gérable, force à typer les paramètres), puis strictNullChecks (le plus impactant, force à gérer les null/undefined), puis le reste. Vous pouvez aussi configurer strict par dossier en utilisant plusieurs tsconfig.json avec extends. Sur les projets Next.js, on commence souvent par strict sur les API routes et utilities, puis on étend aux composants UI.",
          code: `// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    // ou progressif :
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}

// tsconfig.strict.json (pour un sous-dossier audité)
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true },
  "include": ["./src/api/**/*", "./src/lib/**/*"]
}`,
        },
        {
          title: "Outils pour la migration automatisée",
          content:
            "ts-migrate de Airbnb automatise une partie (ajoute des annotations `// @ts-expect-error` aux endroits qui posent problème, type les paramètres any en `any` explicite, etc.). Pour les erreurs restantes, utilisez @ts-expect-error avec un commentaire TODO daté, plutôt que @ts-ignore. La différence : @ts-expect-error échoue si l'erreur n'existe plus (force le nettoyage), @ts-ignore est silencieux pour toujours. ESLint avec @typescript-eslint/ban-ts-comment peut interdire @ts-ignore. Combiner avec un fichier `TYPESCRIPT_DEBT.md` qui liste les zones à reprendre.",
        },
        {
          title: "Bénéfices mesurés après 1-2 ans",
          content:
            "Sur les projets clients où on a piloté la migration en 2023-2024, on a mesuré : 1) Réduction de 30 à 50% des bugs de production liés à `undefined` ou `null` (rapport Sentry). 2) Refactorings 3x plus rapides (changer un type propage les erreurs partout, on sait exactement quoi mettre à jour). 3) Onboarding des nouveaux développeurs accéléré (les types servent de documentation vivante). 4) Moins de tests unitaires à écrire pour cas null/undefined (le compilateur les attrape). Coût initial : 2-4 semaines selon la taille du codebase. Retour sur investissement : moins d'un an.",
        },
        {
          title: "Combiner avec Zod et runtime validation",
          content:
            "TypeScript est purement statique : il disparaît à la compilation. Pour valider les données qui ENTRENT dans votre app (API responses, formulaires utilisateur, query params), utilisez une bibliothèque de runtime validation comme Zod, Valibot ou TypeBox. Zod génère le type TypeScript automatiquement à partir du schéma, donc une seule source de vérité. Pattern qu'on utilise chez Krealabs partout : valider les payloads d'API avec Zod, le type est inféré, plus aucun cast manuel.",
          code: `import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
})

type User = z.infer<typeof UserSchema> // Type généré

// Validation runtime
const user = UserSchema.parse(req.body) // Throw si invalide
// user est maintenant typé ET validé`,
        },
        {
          title: "Les libs tierces non-strict : que faire",
          content:
            "Le frein principal à strict mode dans un projet existant : les bibliothèques tierces dont les types sont mal écrits ou pas à jour. Solutions : 1) Préférer les libs maintenues avec des types corrects (TanStack Query, Zod, Prisma — excellents). 2) Pour les libs avec mauvais types, écrire un wrapper typé qui isole l'incohérence. 3) En dernier recours, declare module 'lib-name' pour overrider les types. 4) Contribuer aux types upstream si possible (DefinitelyTyped) — geste citoyen et ça résout pour tout le monde.",
        },
      ],
      conclusion:
        "Tous nos projets Krealabs démarrent en strict mode + noUncheckedIndexedAccess. C'est non négociable : le coût initial est minime, le bénéfice sur 2-3 ans est énorme. Si vous héritez d'une base de code non stricte, la migration vaut largement l'investissement — mais demande du temps dédié, pas seulement quelques heures volées entre deux features. Si vous voulez accompagnement pour migrer votre base de code TypeScript vers strict, c'est exactement le type de mission qu'on adore.",
    },
  },
  {
    slug: "tailwind-4-migration-2026",
    title: "Tailwind CSS 4 : ce qui a changé et comment migrer",
    excerpt:
      "Tailwind 4 abandonne JavaScript pour la configuration au profit de CSS natif, le moteur passe en Rust (Oxide), les perfs sont multipliées par 5-10. Guide de migration complet, pièges concrets, et retour d'expérience après plusieurs migrations en agence.",
    category: "Web",
    date: "12 avril 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80",
    featured: false,
    author,
    tags: ["Tailwind", "CSS", "Design System", "Web", "Migration", "Oxide"],
    content: {
      introduction:
        "Tailwind 4 marque un tournant majeur dans l'histoire de la bibliothèque : la configuration passe de JavaScript (tailwind.config.js) à CSS natif via la directive @theme, le moteur est réécrit en Rust (codename Oxide), et les performances sont multipliées par 5 à 10 sur les gros projets. C'est probablement la mise à jour la plus disruptive depuis l'arrivée de JIT en 2021. Voici ce qu'il faut savoir pour migrer ses projets sans douleur, avec les pièges qu'on a rencontrés sur nos propres migrations chez Krealabs et celles de nos clients.",
      sections: [
        {
          title: "Configuration en CSS via @theme",
          content:
            "Plus de tailwind.config.js. Les tokens (couleurs, espacements, polices, radius, breakpoints) se déclarent directement dans le CSS avec la directive @theme. C'est plus standard (CSS natif), plus accessible aux designers qui ne maîtrisent pas JavaScript, et ça permet aux Server Components de Next.js de lire les tokens sans hack. Sur nos design systems chez Krealabs, la config tient en 50 lignes de CSS pur, fini les fichiers TypeScript de 200 lignes pour configurer Tailwind.",
          code: `@import "tailwindcss";

@theme {
  /* Couleurs */
  --color-accent: #8f99ed;
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;

  /* Typographie */
  --font-sans: "Switzer", system-ui, sans-serif;
  --font-serif: "Instrument Serif", serif;
  --font-mono: "Geist Mono", monospace;

  /* Radius unique */
  --radius: 0.625rem;
  --radius-lg: 1rem;

  /* Breakpoints custom si besoin */
  --breakpoint-3xl: 1920px;
}`,
        },
        {
          title: "Oxide : le moteur Rust qui change tout",
          content:
            "Le nouveau moteur Oxide (écrit en Rust et compilé via lightningcss) scanne et compile en quelques millisecondes même sur de gros projets. Le HMR en dev est quasi instantané : on voit le changement de classe pratiquement en temps réel. Sur nos projets typiques (50-100 routes Next.js), le temps de compile en CI passe de 30s à 3-5s. Sur un monorepo de 300 fichiers, on est passé de 2 minutes à 12 secondes. C'est aussi une bonne nouvelle pour les développeurs sur des machines moins puissantes : le compile Tailwind n'est plus un goulot d'étranglement.",
        },
        {
          title: "Auto-détection des fichiers",
          content:
            "Plus besoin de configurer la propriété 'content' avec des glob patterns. Tailwind 4 scanne automatiquement tous les fichiers de votre projet (sauf .gitignore et node_modules). Cela élimine une source classique de bugs : oublier d'ajouter un dossier au content, et observer des classes qui disparaissent en production sans raison apparente. Si vous avez vraiment besoin d'exclure ou inclure des fichiers spécifiques, la directive @source dans votre CSS permet de surcharger.",
        },
        {
          title: "Nouvelles fonctionnalités CSS",
          content:
            "Tailwind 4 expose plein de nouveautés modernes : container queries natives (@container), color-mix() pour combiner des couleurs (utile pour les hover states), conic-gradient et radial-gradient en utilities, accent-color pour styliser les checkboxes/radios, et un meilleur support des subgrid CSS. La directive @variant permet de créer ses propres variantes (genre @variant hover-and-focus). Le système de couleurs est aussi modernisé avec les color spaces P3 (display-p3) supportés nativement.",
          code: `/* Variantes custom */
@variant hover-and-focus (&:hover, &:focus-visible);

/* Container queries */
<div className="@container">
  <div className="@md:flex @lg:grid-cols-3">...</div>
</div>

/* Color-mix pour hover */
<button className="bg-accent hover:bg-[color-mix(in_oklab,var(--color-accent)_80%,white)]">`,
        },
        {
          title: "Pièges classiques de la migration",
          content:
            "Si vous utilisez @apply massivement, attention : Tailwind 4 le décourage (et il est plus lent qu'avant). Préférez les classes utilitaires inline ou les variantes de composants via cva. Les plugins JavaScript existants (tailwindcss-animate, typography, forms) ne sont pas tous compatibles — vérifier la doc officielle de chacun avant la mise à jour. Le scan automatique de fichiers peut détecter des classes en commentaires ou dans des chaînes de caractères inattendues (logs, JSON) — vérifier que rien n'arrive en prod par erreur. Les modes JIT et Just-In-Time ne sont plus configurables car c'est le mode par défaut.",
        },
        {
          title: "Migration de Tailwind 3 vers 4 : le pas-à-pas",
          content:
            "Étape 1 : `npx @tailwindcss/upgrade` lance l'outil de migration officiel qui convertit tailwind.config.js en @theme et met à jour la plupart des classes obsolètes. Étape 2 : audit manuel des plugins (vérifier compatibilité). Étape 3 : tester en local avec un build production complet pour repérer les classes manquantes. Étape 4 : tester visuellement chaque page critique. Étape 5 : déployer en preview Vercel et comparer avant/après. Comptez 1 jour pour un projet de taille moyenne (50 fichiers), 2-3 jours pour un gros projet avec des plugins custom.",
        },
        {
          title: "Performance build : les chiffres concrets",
          content:
            "Sur le projet Krealabs (~250 fichiers TSX, 35 routes prerendered) : temps de build Tailwind 3 = ~12s, Tailwind 4 = ~1.8s (factor 6.6x). Dev server cold start avec Turbopack : 3-4s contre 8-10s avant. Hot reload : pratiquement imperceptible (<50ms). Sur les projets clients de plus grande taille (1000+ fichiers), les gains sont encore plus marqués. À noter : le CSS final est aussi plus petit (~10-15% en moyenne) grâce à un meilleur tree-shaking et une compression Oxide.",
        },
      ],
      conclusion:
        "Tailwind 4 est plus simple, plus rapide, plus standard. Pour un projet neuf en 2026, c'est un no-brainer (on n'imagine pas commencer en Tailwind 3 maintenant). Pour un projet existant en Tailwind 3, prévoir 1 à 3 jours de migration selon la taille du codebase et la complexité de vos plugins. Si vous voulez accompagnement pour migrer un design system Tailwind 3 → 4 sans casser la prod, c'est le genre de mission qu'on prend chez Krealabs.",
    },
  },
  {
    slug: "prisma-6-postgres-orm",
    title: "Prisma 6 : pourquoi c'est notre ORM de référence",
    excerpt:
      "Prisma offre le meilleur typage TypeScript pour PostgreSQL. Schema lisible, migrations automatiques, requêtes typées de bout en bout, accelerate pour le caching. Pourquoi on l'utilise sur 95% de nos projets, et quand on dévie vers Drizzle ou SQL brut.",
    category: "Web",
    date: "3 avril 2026",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=80",
    featured: false,
    author,
    tags: ["Prisma", "PostgreSQL", "Base de données", "TypeScript", "Web", "ORM"],
    content: {
      introduction:
        "Pour interagir avec une base PostgreSQL en TypeScript en 2026, plusieurs options existent : Drizzle (gagnant en popularité), Kysely (query builder léger), TypeORM (classique mais dépassé), ou requêtes SQL brutes via postgres.js / node-postgres. Notre choix par défaut depuis 4 ans chez Krealabs : Prisma. Voici pourquoi, ce que la version 6 apporte, et les rares cas où on dévie vers autre chose. Article basé sur plus de 30 projets en production utilisant Prisma comme couche d'accès aux données.",
      sections: [
        {
          title: "Schema as source of truth",
          content:
            "Le schema.prisma décrit la structure de la base de manière déclarative dans un DSL spécifique (mais très lisible). Les types TypeScript du client Prisma sont générés automatiquement, les migrations SQL aussi. La duplication entre code applicatif et structure de base est éliminée. Quand vous ajoutez une colonne, vous modifiez le schema, vous régénérez le client (prisma generate), et toutes les références dans votre code TypeScript savent qu'elle existe — type checking + autocomplétion + refactoring serein.",
          code: `// schema.prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String   @db.Text
  status    PostStatus @default(DRAFT)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  tags      Tag[]    @relation("PostTags")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
  @@index([status, createdAt])
}

enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}`,
        },
        {
          title: "Typage strict de bout en bout",
          content:
            "Une requête `prisma.post.findMany({ include: { author: true } })` retourne un type qui inclut l'objet auteur. Si vous omettez `include`, le type le sait : impossible d'accéder à `post.author` par erreur. Refactoring infiniment plus serein. Combinée avec strict mode TypeScript et noUncheckedIndexedAccess, cette discipline élimine pratiquement les erreurs runtime liées aux requêtes DB. Sur nos projets, on ne voit pratiquement jamais d'erreur SQL en production qui ne soit pas une erreur métier — pas une erreur de typage.",
          code: `const posts = await prisma.post.findMany({
  where: { status: 'PUBLISHED' },
  include: { author: { select: { name: true } } },
  orderBy: { createdAt: 'desc' },
  take: 10
})
// posts est typé : Array<{
//   id: string, title: string, ...,
//   author: { name: string }
// }>`,
        },
        {
          title: "Migrations sûres avec Prisma Migrate",
          content:
            "Prisma Migrate génère automatiquement les migrations SQL à partir des changements de schema. Trois commandes pratiques : `prisma migrate dev` pour développer (génère + applique en local), `prisma migrate deploy` pour déployer (applique sans générer, idempotent en CI/CD), `prisma migrate reset` pour tout réinitialiser en dev. Les fichiers SQL générés sont versionnés dans Git, lisibles, et modifiables si besoin (pour ajouter du SQL custom non-supporté par le DSL Prisma).",
        },
        {
          title: "Nouveautés Prisma 6 et 7",
          content:
            "Prisma 6 apporte : meilleure perf sur les gros datasets (jusqu'à 30% plus rapide sur findMany avec relations), support natif de PostgreSQL 16+ (JSON path queries, partitionnement), Prisma Accelerate (caching distribué edge-side, transparent dans le code). Prisma 7 (sortie 2026) introduit le client edge runtime natif (avant on devait passer par Prisma Accelerate), et un meilleur support multi-schema PostgreSQL pour les architectures multi-tenant. Sur les projets serverless (Vercel, Cloudflare Workers), Prisma 7 + Accelerate = stack pratiquement parfaite.",
        },
        {
          title: "Patterns avancés : transactions et middleware",
          content:
            "Pour les opérations multi-table atomiques, Prisma supporte les transactions interactives. Pour ajouter de la logique transversale (logging, soft delete, audit trail), les Prisma Client Extensions (anciennement middleware) permettent d'intercepter les requêtes. Pattern qu'on utilise : un extension qui ajoute automatiquement `userId` aux WHERE des requêtes pour le multi-tenancy, et qui filtre les soft-deleted records.",
          code: `// Soft delete via extension
const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null }
        return query(args)
      },
      async delete({ args, model }) {
        return prisma[model].update({
          where: args.where,
          data: { deletedAt: new Date() }
        })
      },
    },
  },
})`,
        },
        {
          title: "Quand Prisma n'est PAS le bon choix",
          content:
            "Pour des requêtes très complexes (window functions, CTE récursives, requêtes analytiques sur gros datasets), le SQL brut via postgres.js ou pgTyped reste préférable. Prisma supporte $queryRaw / $executeRaw pour ces cas, mais on perd le typage automatique. Sur les projets edge-only (Cloudflare Workers, Vercel Edge), Drizzle peut être un meilleur fit pour la taille du bundle (~30KB Drizzle vs ~150KB Prisma client). Pour les apps qui ont besoin de mapping ORM très custom (héritage avancé, polymorphisme), TypeORM ou Sequelize peuvent être préférables. Pour le SQL pur sans aucune abstraction, postgres.js est l'option la plus directe.",
        },
        {
          title: "Comparaison rapide avec Drizzle (le concurrent montant)",
          content:
            "Drizzle est l'alternative qui monte en 2024-2026. Avantages Drizzle : bundle 5x plus léger, syntaxe SQL-like (moins d'apprentissage pour les DBA), excellent support edge runtime. Avantages Prisma : DSL schema plus lisible, Prisma Studio (UI d'admin gratuit), écosystème plus mature, support Prisma Pulse pour le real-time, et migrations plus robustes. Pour 95% de nos projets, Prisma reste préférable. Pour les apps Cloudflare Workers ultra-optimisées, Drizzle prend l'avantage. On utilise les deux selon le contexte.",
        },
      ],
      conclusion:
        "Prisma 6/7 est mature, performant, et offre une DX (developer experience) inégalée. Pour 95% de nos projets, c'est le bon choix. Combiné avec Next.js et TypeScript, vous avez une stack full-typed du frontend à la base — refactorings sereins, bugs runtime divisés par 5, onboarding accéléré. Si vous démarrez un projet et hésitez entre Prisma, Drizzle, Kysely ou SQL brut, on peut vous aider à cadrer le bon choix selon votre contexte. Premier échange offert.",
    },
  },

  // ===========================================================================
  // CLUSTER MOBILE (3 articles)
  // ===========================================================================
  {
    slug: "react-native-2026-etat-des-lieux",
    title: "React Native en 2026 : où on en est vraiment",
    excerpt:
      "New Architecture par défaut, Expo qui s'impose comme la voie royale, performances proches du natif, écosystème mature. État des lieux honnête de React Native pour les agences et startups en 2026, avec comparaisons Flutter et natif.",
    category: "Mobile",
    date: "30 avril 2026",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    featured: false,
    author,
    tags: ["React Native", "Mobile", "iOS", "Android", "Expo", "Flutter"],
    content: {
      introduction:
        "Cinq ans après les premiers grands déploiements en production (Facebook, Shopify, Discord, Coinbase), React Native a vraiment mûri. La New Architecture est devenue le standard depuis 2024, Expo a redéfini complètement le tooling, et le débat avec Flutter est plus que jamais d'actualité. Cet article fait le point honnête sur où en est RN en 2026 — ses forces, ses limites, et notre position d'agence après plus de 15 apps publiées sur les stores. Si vous hésitez à investir dans React Native pour un projet, vous trouverez ici les éléments factuels pour décider.",
      sections: [
        {
          title: "La New Architecture, enfin par défaut",
          content:
            "Fabric (le nouveau renderer UI) et TurboModules (la nouvelle couche d'interop native) sont activés par défaut depuis React Native 0.75 (mi-2024). Les bénéfices sont concrets et mesurables : démarrage 30% plus rapide en moyenne, animations plus fluides à 120Hz sur les iPhone Pro et certains Android, interopérabilité Swift/Kotlin moins douloureuse, modules natifs qui se chargent plus efficacement. Pour les anciennes apps en architecture legacy (Paper renderer + Bridge), la migration vers la New Arch demande un peu de travail mais l'écosystème est désormais aligné. Sur tous nos nouveaux projets, la New Arch est activée d'emblée.",
        },
        {
          title: "Expo : le tooling de référence en 2026",
          content:
            "Sauf cas très spécifique (besoin natif lourd, app legacy qu'on hérite), Expo est désormais la voie royale pour démarrer un projet React Native. EAS Build pour les builds cloud sans rien installer en local, EAS Update pour les patches OTA (over-the-air sans repasser par les stores), Expo Router pour la navigation file-based moderne, expo-modules pour intégrer du code natif sans avoir à plonger dans Xcode. La complexité native devient pratiquement invisible pour 90% des projets. La promesse marketing « Just Write JavaScript » est presque tenue en 2026.",
        },
        {
          title: "Performance et expérience utilisateur",
          content:
            "Sur des apps standards (e-commerce, productivité, social, B2B), un RN bien fait offre une UX indiscernable d'une app native pour 99% des utilisateurs. Les frame drops, le bête sujet de 2017-2020, sont largement résolus. Sentry et Flipper donnent des outils pro pour monitorer la performance. Les nouvelles primitives Reanimated 4 et Skia pour les animations permettent du UI ultra-poussé. Et avec Hermes (le moteur JavaScript optimisé pour mobile), le démarrage est rapide même sur les vieux Android.",
        },
        {
          title: "L'écosystème en 2026 : matures et fragmentés",
          content:
            "Les bibliothèques essentielles sont matures : React Navigation 7 / Expo Router pour la nav, TanStack Query pour le data fetching, React Native Reanimated 4 pour les animations, react-native-mmkv pour le stockage rapide, react-native-purchases (RevenueCat) pour les achats in-app, react-native-firebase pour la stack Google. Le défi reste la fragmentation : certaines libs sont abandonnées, d'autres sont en concurrence directe (ex: bottom-sheet — 3 libs principales). Notre conseil : démarrez avec les libs maintenues par Expo ou Software Mansion, c'est un signal de pérennité.",
        },
        {
          title: "RN vs Flutter en 2026",
          content:
            "Question récurrente, débat sans fin. Notre position pragmatique : si votre équipe maîtrise déjà React/TypeScript, React Native est le choix évident (compétences transférables, écosystème commun avec le web). Si vous démarrez from scratch et visez exclusivement le mobile avec une équipe néophyte, Flutter peut être plus simple à apprendre (tout est intégré, moins de choix architecturaux). Pour une agence qui couvre web ET mobile, RN gagne par cohérence (mêmes patterns, mêmes composants partageables). Pour des apps très visuelles avec animations custom complexes, Flutter peut être préférable (Skia natif). Sur les performances brutes, c'est match nul en 2026.",
        },
        {
          title: "RN vs Natif Swift/Kotlin",
          content:
            "Le natif reste imbattable pour : apps de jeux ou rendu 3D (Metal/Vulkan direct), apps audio temps réel pro (musicales, broadcast), apps avec ML embarqué lourd (CoreML/MLKit avec models custom), apps qui doivent intégrer des SDK très spécifiques (banking, identité régalienne). Mais le coût en temps de dev est multiplié par 1.8-2.5 (deux équipes au lieu d'une, deux codebases à maintenir). Pour 95% des apps métier B2B, e-commerce, productivité, contenu — React Native est largement suffisant ET plus rapide à livrer. Le choix natif se justifie sur des cas vraiment exigeants.",
        },
        {
          title: "Distribution : publication App Store / Play Store",
          content:
            "Avec EAS Submit, la publication automatisée sur les stores est devenue trivial. Mais attention : les guidelines Apple sont strictes et changent (ex: notification permission, ATT, privacy nutrition labels). Apple n'accepte plus les WebViews lourdes type « app qui n'est qu'un wrapper web ». Pour les apps RN, on est sur du natif réel, donc pas de souci sur ce front. Compter en moyenne 1-3 jours d'aller-retours pour la première soumission. Play Store est plus permissif mais a aussi resserré (data safety, privacy policy obligatoire).",
        },
        {
          title: "Notre stack RN par défaut chez Krealabs",
          content:
            "Pour démarrer un nouveau projet en 2026 : Expo SDK 52+, Expo Router pour la nav, TypeScript strict, TanStack Query pour les API, Zustand pour le state global (ou Jotai), Reanimated 4 pour les animations, expo-secure-store pour les credentials, react-native-mmkv pour le cache local, Sentry pour le monitoring, RevenueCat si in-app purchases, Firebase ou Supabase pour le backend selon besoins. Pour le push : Expo Push si app simple, Firebase Cloud Messaging si segmentation marketing. Ce setup couvre 90% des besoins en une semaine de scaffolding.",
        },
      ],
      conclusion:
        "React Native est l'investissement le plus rationnel pour une PME, startup ou association qui veut être sur iOS et Android sans doubler son équipe. Les arguments anti-RN d'il y a 5 ans sont largement obsolètes. Chez Krealabs, c'est notre stack mobile par défaut, avec quelques exceptions pour les projets très exigeants techniquement. Si vous avez un projet d'app mobile et vous hésitez sur le choix techno (RN, Flutter, natif), parlons-en — premier rendez-vous offert.",
    },
  },
  {
    slug: "expo-router-file-based-mobile",
    title: "Expo Router : le file-based routing débarque sur mobile",
    excerpt:
      "Expo Router apporte sur React Native la navigation file-based qu'on adore dans Next.js. Plus simple, plus prévisible, deep linking auto, layouts imbriqués. Pourquoi c'est devenu notre choix par défaut, et comment migrer depuis React Navigation.",
    category: "Mobile",
    date: "22 avril 2026",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    featured: false,
    author,
    tags: ["Expo Router", "React Native", "Navigation", "Mobile", "Deep linking"],
    content: {
      introduction:
        "Pendant des années, la navigation mobile en React Native passait par React Navigation et sa configuration impérative (un gros fichier JS qui déclare tous les écrans, leurs paramètres, leur hiérarchie). Expo Router change la donne en 2024 : votre arborescence de fichiers définit votre arborescence d'écrans, comme dans Next.js avec son App Router. Sur nos projets Krealabs depuis 2025, Expo Router est devenu notre choix par défaut. Voici pourquoi, comment ça fonctionne en pratique, et les pièges à éviter quand on migre depuis React Navigation.",
      sections: [
        {
          title: "Pourquoi c'est mieux que React Navigation",
          content:
            "Plus besoin de déclarer chaque écran dans un fichier de config. Un fichier `app/home.tsx` crée automatiquement la route `/home`. Les paramètres dynamiques (`app/posts/[id].tsx`) fonctionnent comme attendu. Le deep linking est automatique : si quelqu'un clique sur `exemple.app://posts/123` depuis un email ou une notif push, l'app ouvre directement le bon écran. Plus de routage à déclarer manuellement. La structure du dossier app/ EST l'arborescence de navigation.",
          code: `// Structure de fichiers Expo Router
app/
├── _layout.tsx    // racine (Stack root)
├── (tabs)/        // groupe sans URL (tabs)
│   ├── _layout.tsx
│   ├── index.tsx  // /
│   ├── posts.tsx  // /posts
│   └── profile.tsx
├── posts/
│   ├── [id].tsx   // /posts/:id
│   └── new.tsx    // /posts/new
└── auth/
    ├── login.tsx
    └── signup.tsx`,
        },
        {
          title: "Layouts imbriqués pour Stack, Tabs, Drawer",
          content:
            "Les fichiers `_layout.tsx` définissent les Stack, Tabs ou Drawer pour leur sous-arbre. Comme dans Next.js, on compose des layouts imbriqués selon la profondeur. La logique de header, tab bar et navigation se trouve exactement où on l'attend dans la structure de fichiers. Pour un layout Tabs (Instagram-like), on crée un groupe `(tabs)/_layout.tsx` qui contient `<Tabs>...</Tabs>`. Pour des écrans modaux (auth, paramètres), on les place hors du groupe tabs.",
          code: `// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="posts" options={{ title: 'Posts' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  )
}`,
        },
        {
          title: "Deep linking et universal links",
          content:
            "Le deep linking était traditionnellement un cauchemar à configurer sur React Native (URL schemes custom, intent filters Android, universal links Apple, fallback web). Expo Router gère TOUT cela automatiquement à partir de la structure de fichiers. Configuration en 3 lignes dans app.config.ts : scheme custom + associatedDomains pour iOS + intentFilters pour Android. Et n'importe quel chemin de votre dossier app/ devient un deep link valide. Cas d'usage : campagnes marketing avec liens directs vers une fiche produit, notifications push qui ouvrent un écran spécifique, magic links pour authentification.",
        },
        {
          title: "Typed routes pour la robustesse",
          content:
            "Expo Router intègre depuis 2025 un système de typed routes (similaire à Next.js typedRoutes). En activant l'expérimentation, vous obtenez des types TypeScript autogénérés pour vos routes. Naviguer vers une route inexistante devient une erreur de build, pas un crash runtime. C'est le même esprit que les types Prisma pour la DB : la stack devient end-to-end typed.",
          code: `// app.config.ts
export default {
  expo: {
    experiments: { typedRoutes: true }
  }
}

// Usage : autocomplete + erreurs de build
import { router } from 'expo-router'
router.push('/posts/123') // ✅ OK
router.push('/post/123')  // ❌ Erreur TS — pas de route /post`,
        },
        {
          title: "Migration depuis React Navigation : étape par étape",
          content:
            "Pas urgente : si votre app existante fonctionne bien sur React Navigation, vous pouvez rester. Pour les nouveaux projets, Expo Router est notre choix par défaut depuis 2025. Pour migrer : 1) Mettre à jour vers Expo SDK 50+. 2) Installer expo-router. 3) Créer le dossier app/ avec un _layout.tsx racine. 4) Déplacer un écran à la fois depuis l'ancien NavigationContainer vers app/. 5) Remplacer navigation.navigate() par router.push() ou <Link>. 6) Tester chaque écran. Compter 2-3 jours pour une app de 15-20 écrans. La cohabitation pendant la migration est possible (mixer les deux systèmes temporairement).",
        },
        {
          title: "Cas d'usage avancés : modal, search, web",
          content:
            "Expo Router gère bien les patterns mobile modernes : modals via la propriété `presentation: 'modal'`, recherche globale via un screen layout particulier, gestures de retour Apple/Android natif. Bonus : Expo Router fonctionne aussi sur le WEB (Expo for Web). Vous pouvez déployer la même base de code en app + web responsive — gain massif pour les startups en early stage qui veulent prototyper rapidement avant de décider plateforme cible.",
        },
        {
          title: "Limites et points d'attention",
          content:
            "Pas parfait : 1) L'écosystème de plugins React Navigation est plus large, certaines fonctionnalités exotiques (transitions custom complexes, navigation gesturelle très fine) demandent un peu plus de travail. 2) Le debugger des routes peut être moins ergonomique que celui de Navigation. 3) Pour les apps avec architecture très custom (multi-tenant avec routing dynamique selon le user), il faut un peu plus de gymnastique. Mais ces limites sont marginales pour 95% des projets.",
        },
      ],
      conclusion:
        "Expo Router rapproche le DX mobile et web. Pour les équipes qui font du Next.js le jour et du React Native le soir (comme Krealabs), c'est un gain immédiat — même mental model, mêmes patterns, productivité décuplée. Plus jamais de fichier route.config.ts à 800 lignes. Pour les nouveaux projets, on recommande systématiquement Expo Router. Pour les apps existantes en React Navigation qui marchent bien, la migration n'est pas urgente — décidez selon votre roadmap.",
    },
  },
  {
    slug: "notifications-push-expo-firebase",
    title: "Notifications push mobile : Expo Push vs Firebase Cloud Messaging",
    excerpt:
      "Expo Push est le plus simple, Firebase Cloud Messaging le plus puissant. OneSignal pour la segmentation marketing. Comparatif complet et bonnes pratiques pour les notifications push iOS et Android en 2026.",
    category: "Mobile",
    date: "15 avril 2026",
    readTime: "11 min",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
    featured: false,
    author,
    tags: ["Notifications push", "Expo", "Firebase", "Mobile", "FCM", "OneSignal"],
    content: {
      introduction:
        "Les notifications push sont incontournables dans une app mobile moderne — rétention, engagement, conversions. Pour une app React Native en 2026, trois choix dominent : Expo Push (la solution intégrée Expo, simple et rapide), Firebase Cloud Messaging (FCM, le standard Google avec écosystème complet), et OneSignal (alternative cross-platform avec UX marketing très poussée). Comparatif détaillé pour choisir la bonne solution selon votre contexte, avec retour d'expérience sur 15+ apps Krealabs en production.",
      sections: [
        {
          title: "Expo Push : simple et suffisant",
          content:
            "Si votre app est créée avec Expo (notre cas par défaut), Expo Push est intégré nativement. Récupération du token, envoi via HTTP simple, scheduling basique. Idéal pour 80% des cas : notifications transactionnelles (confirmation commande, message reçu, rappel RDV), notifications éditoriales (nouveau contenu publié, alerte info). Pas besoin de configurer Firebase ou Apple Push Notifications Service (APNs) manuellement — Expo gère tout. Limites : pas de segmentation avancée, pas d'A/B testing, pas d'analytics native (ouvertures, clics).",
          code: `import * as Notifications from 'expo-notifications'

// Récupérer le token unique du device
const { data: token } = await Notifications.getExpoPushTokenAsync({
  projectId: 'votre-project-id'
})

// Envoi serveur depuis votre back-end
await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: token,
    title: 'Nouvelle commande',
    body: 'Votre colis arrive demain !',
    data: { orderId: '12345' } // payload custom
  }),
})`,
        },
        {
          title: "Firebase Cloud Messaging (FCM) : le standard Google",
          content:
            "Si vous avez besoin de : segmentation avancée (topic subscription, conditions complexes), campagnes A/B sur le contenu des push, analytics intégrées (delivery rate, open rate par notification), notifications côté web ET mobile depuis la même infra — FCM est plus complet. La mise en place est plus lourde (config Firebase Console, fichiers GoogleService-Info.plist, intégration native iOS/Android), mais l'outillage est mature. La console Firebase permet aux marketeurs d'envoyer des campagnes sans toucher au code. Coût : gratuit pour des volumes raisonnables, payant au-delà via Firebase Blaze plan.",
        },
        {
          title: "OneSignal : la solution marketing-oriented",
          content:
            "Pour les apps avec besoin de campagnes marketing sophistiquées (e-commerce, médias, fitness), OneSignal mérite le détour. Avantages : dashboard très ergonomique pour les non-techniques, segmentation basée sur les events utilisateurs (a vu produit X, a abandonné panier), automatisations (drip campaigns), templates riches (images, boutons, deep links), A/B testing intégré, analytics avancées. Tarification : gratuit jusqu'à 10k subscribers, puis ~~$9-150/mois selon volume. Plus cher que FCM mais l'UX marketing justifie souvent l'écart sur des projets e-commerce.",
        },
        {
          title: "Permission utilisateur : le moment critique",
          content:
            "Demander la permission de push au mauvais moment = refus définitif (l'utilisateur ne reverra jamais le prompt). Best practice : ne JAMAIS demander à l'ouverture initiale de l'app. Demandez quand l'utilisateur a fait au moins 2-3 actions et comprend la valeur (ex: après inscription, après premier achat, après avoir activé une feature où les push aident). Toujours expliquer le bénéfice AVANT de déclencher le prompt système : un écran custom \"On vous prévient quand votre commande arrive — autoriser les notifications ?\" puis le prompt natif. Taux d'acceptation : 30-50% avec cette technique vs 15-25% si on demande direct.",
          code: `// Pattern recommandé : écran intermédiaire
import * as Notifications from 'expo-notifications'

async function requestPermission() {
  const { status } = await Notifications.requestPermissionsAsync()
  if (status === 'granted') {
    // Récupérer et enregistrer le token côté serveur
    const token = await Notifications.getExpoPushTokenAsync()
    await fetch('/api/save-push-token', {
      method: 'POST',
      body: JSON.stringify({ token: token.data })
    })
  }
}`,
        },
        {
          title: "Notifications riches : images, boutons, deep links",
          content:
            "En 2026, une notification texte simple est rare. Standards : images dans la notification (héro), 1-2 boutons d'action (Marquer comme lu / Répondre), deep link qui ouvre l'app directement sur le bon écran (combiné avec Expo Router = magique). Sur iOS, vous pouvez aussi customiser le son (notification sounds business critical), définir des catégories pour des actions rapides (Apple Watch). Sur Android, supporter Material You theming. Les push complets sont bien plus engageants : taux de clic typique 3-8% sur push simple, 12-25% sur push riche avec image + action.",
        },
        {
          title: "Cas d'usage et patterns",
          content:
            "Notifications transactionnelles (Expo Push parfait) : confirmation commande, livraison, message reçu, rappel RDV. Notifications éditoriales (Expo Push ou FCM) : nouveau contenu, breaking news, mise à jour application. Notifications marketing (OneSignal ou FCM) : promo, drip campaign onboarding, win-back utilisateurs inactifs. Notifications temps réel (FCM avec topic subscription) : sport scores, prix crypto, alertes prix. Pour chaque cas, optimiser le timing : pas de push à 3h du matin sauf urgent vital, respecter les heures locales (timezone-aware scheduling).",
        },
        {
          title: "Notre recommandation pratique",
          content:
            "Démarrez avec Expo Push, c'est suffisant pour 80% des besoins et 0 effort d'intégration. Si vous prévoyez des campagnes marketing sophistiquées dès le départ (e-commerce sérieux, app avec gros budget marketing), envisagez OneSignal d'emblée. Si vous êtes déjà dans l'écosystème Firebase pour d'autres raisons (Crashlytics, Analytics), FCM est cohérent. Migration possible plus tard sans casser l'app — le token push n'est qu'une chaîne, le serveur d'envoi peut être changé sans rebuild client. Notre stack par défaut : Expo Push pour 90% des projets, OneSignal pour les e-commerce avec budget marketing.",
        },
      ],
      conclusion:
        "La meilleure notification push, c'est celle qui arrive ET qui apporte de la valeur. Choisissez la solution la plus simple qui couvre votre cas d'usage actuel — vous gagnerez le temps économisé sur du contenu et l'optimisation du timing, plutôt que sur l'infrastructure. Demander permission au bon moment, formuler des messages clairs, mesurer les open rates : c'est là que se joue le ROI des push. Si vous lancez une app mobile et que vous voulez cadrer la stratégie push dès le départ, parlons-en.",
    },
  },

  // ===========================================================================
  // CLUSTER SEO & PERFORMANCE (4 articles)
  // ===========================================================================
  {
    slug: "core-web-vitals-2026-inp",
    title: "Core Web Vitals 2026 : INP a remplacé FID, ce que ça change vraiment",
    excerpt:
      "Depuis mars 2024, INP (Interaction to Next Paint) remplace FID dans les Core Web Vitals. Plus exigeant, plus représentatif de l'expérience réelle. Méthode complète d'optimisation, outils de mesure, et seuils Google pour le SEO.",
    category: "SEO",
    date: "25 avril 2026",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    featured: false,
    author,
    tags: ["Core Web Vitals", "INP", "Performance", "SEO", "Lighthouse", "LCP", "CLS"],
    content: {
      introduction:
        "Google a remplacé FID (First Input Delay) par INP (Interaction to Next Paint) dans les Core Web Vitals en mars 2024. Sur le papier, c'est juste un nouveau nom. En pratique, beaucoup de sites qui étaient au vert en FID se retrouvent au rouge en INP, et perdent des places dans Google. Voici notre guide complet : ce que mesure vraiment l'INP, comment l'optimiser sur les stacks que nous utilisons chez Krealabs (WordPress, Next.js, React Native Web), et comment monitorer en réel via les bons outils.",
      sections: [
        {
          title: "FID vs INP : la vraie différence",
          content:
            "FID ne mesurait que le délai avant la PREMIÈRE interaction utilisateur sur la page. C'était une métrique très indulgente : une fois la page chargée et la première interaction OK, FID restait bon même si toutes les interactions suivantes étaient catastrophiques. INP, lui, mesure le PIRE délai entre toute interaction et la prochaine peinture pendant TOUTE la session de l'utilisateur. C'est donc beaucoup plus représentatif du ressenti réel — et beaucoup plus dur à passer. Sur nos audits, on voit régulièrement des sites avec FID < 100ms (excellent) mais INP > 500ms (mauvais) à cause de gros handlers React mal optimisés.",
        },
        {
          title: "Les seuils Google et leur impact SEO",
          content:
            "Bon : INP < 200ms. À améliorer : 200-500ms. Mauvais : > 500ms. Pour info complète, LCP < 2.5s, CLS < 0.1, INP < 200ms sont les trois seuils officiels Google. Si un seul est dans le rouge, votre page perd des points dans le classement Google. L'impact n'est pas binaire (votre site ne disparaît pas), mais sur des requêtes concurrentielles, ces signaux peuvent faire la différence entre la 4ème et la 9ème position — donc entre du trafic et pas de trafic.",
        },
        {
          title: "Pourquoi l'INP est si dur à passer",
          content:
            "L'INP punit principalement les apps lourdes en JavaScript. Quand un utilisateur clique, le browser doit : traiter l'event handler JS, mettre à jour l'état React/Vue, rendre le DOM, peindre l'écran. Si une de ces étapes prend plus de 50ms, on cumule rapidement vers 200ms+. Les pièges classiques : handlers onClick qui font des calculs lourds, useState qui déclenche des re-renders en cascade, scripts tiers (analytics, A/B testing, chat) qui bloquent le main thread, scroll handlers non-throttled qui réagissent à chaque pixel.",
        },
        {
          title: "Optimiser l'INP : 3 leviers principaux",
          content:
            "Premièrement : RÉDUIRE LE JS. Sur Next.js, utiliser massivement les Server Components (le JS n'est pas envoyé au client). Code splitting agressif (dynamic imports), lazy loading des modales/onglets. Sur WordPress, supprimer les plugins inutiles (chaque plugin = JS chargé). Deuxièmement : ÉVITER LES LONG TASKS. Toute tâche > 50ms bloque l'INP. Découper avec scheduler.yield() (nouvelle API native) ou requestIdleCallback. Troisièmement : OPTIMISER LES HANDLERS. Debounce/throttle sur les inputs, événements scroll passifs, web workers pour les calculs lourds (recherche full-text, parsing JSON 100k+, etc.).",
          code: `// Découper une tâche longue avec scheduler.yield (Chromium 129+)
async function processLargeList(items) {
  for (const item of items) {
    processItem(item)
    // Laisse le browser respirer entre chaque
    if (navigator.scheduling?.isInputPending()) {
      await scheduler.yield()
    }
  }
}

// Alternative classique : découper en chunks
function processInChunks(items, chunkSize = 50) {
  let i = 0
  function next() {
    const chunk = items.slice(i, i + chunkSize)
    chunk.forEach(processItem)
    i += chunkSize
    if (i < items.length) requestIdleCallback(next)
  }
  next()
}`,
        },
        {
          title: "Cas concrets : où on gagne sur WordPress",
          content:
            "Sur WordPress, les principaux coupables INP sont : Elementor ou Divi (les page builders sont des desastres INP, on en voit régulièrement à 800-1500ms), plugins de chat live (Intercom, Tawk, Crisp injectent un gros JS), plugins de popup (Optinmonster, Sumo), trackers tiers (Hotjar, FullStory). Solutions concrètes : passer à un thème custom (gain typique 300-500ms d'INP), différer le chargement des chats avec setTimeout 3-5s après load, utiliser le delay JS de WP Rocket sur les scripts non critiques. Sur nos audits Krealabs, on fait régulièrement passer un site WordPress de INP 600ms à INP 150ms uniquement en virant les bloatants.",
        },
        {
          title: "Cas concrets : où on gagne sur Next.js / React",
          content:
            "Sur React/Next.js, les coupables typiques : composants client énormes (Tableaux 1000+ lignes, dashboards avec 50 graphiques), useEffect qui se déclenchent en cascade, libraries lourdes chargées eagerly (Moment.js, Lodash entier, Charts.js complet). Solutions : passer un maximum en Server Components, virtualiser les listes longues (react-virtuoso), code splitter les libs lourdes (charts.js → import dynamique), remplacer Moment par date-fns ou dayjs (10x plus léger), tree-shaker Lodash (importer juste lodash/debounce, pas tout lodash). React 19 + Server Components a divisé par 2 nos INP moyens sur des dashboards lourds.",
        },
        {
          title: "Mesurer en réel : Lab vs Field data",
          content:
            "Lighthouse mesure en LAB (conditions contrôlées Chromium headless) — c'est utile mais incomplet. Les vraies données INP qui comptent pour le SEO viennent du FIELD : Chrome User Experience Report (CrUX). Pour y accéder : Google Search Console > Web Vitals (vue agrégée 28 jours), Vercel Analytics (si vous êtes sur Vercel), Speed Insights, ou Real User Monitoring (Sentry Performance, Datadog RUM). Sur les sites à fort trafic, on configure systématiquement Vercel Speed Insights pour avoir le détail par page et identifier les pires offenders.",
        },
        {
          title: "L'avenir : nouvelles métriques en préparation",
          content:
            "Google travaille déjà sur les prochaines métriques Core Web Vitals : possiblement TTFB (Time To First Byte) plus visible, ou une métrique de \"smoothness\" sur les animations de scroll. Notre conseil : ne pas optimiser pour des métriques hypothétiques. Optimiser pour l'expérience utilisateur réelle. Un site qui charge vite, réagit instantanément aux clics, et ne saute pas pendant le chargement — c'est ça qu'on vise. Les métriques Google sont une bonne proxy mais pas le but en soi.",
        },
      ],
      conclusion:
        "L'INP est plus exigeant que le FID, mais c'est tant mieux : il pousse à livrer des sites vraiment fluides. Un site rapide, c'est un meilleur SEO, un meilleur taux de conversion, et un meilleur ressenti utilisateur. Tout est lié. Si votre site galère sur l'INP (>200ms en moyenne), c'est typiquement le genre d'audit qu'on fait chez Krealabs en 1-2 jours : identification des coupables + plan d'action chiffré. Premier diagnostic offert.",
    },
  },
  {
    slug: "seo-local-rouen-guide-pme",
    title: "Guide SEO local pour les PME de Rouen et Normandie",
    excerpt:
      "Comment ressortir dans les recherches \"agence X à Rouen\" et dans le pack local Google ? Schema LocalBusiness, fiche Google Business Profile, citations locales, avis, contenu géolocalisé. Méthode complète et applicable, avec exemples concrets pour PME normandes.",
    category: "SEO",
    date: "10 mai 2026",
    readTime: "17 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
    featured: false,
    author,
    tags: ["SEO local", "Rouen", "Normandie", "Google Business Profile", "Schema.org", "Avis Google", "Pack local"],
    content: {
      introduction:
        "Vous tenez un commerce, un cabinet, un atelier ou une PME à Rouen, au Havre, à Caen ou ailleurs en Normandie. Vos clients potentiels tapent \"votre métier + Rouen\" ou simplement \"votre métier près de moi\" sur Google et leur smartphone. Comment faire pour ressortir dans les premiers résultats — voire mieux, dans le pack local (les 3 résultats avec carte qui apparaissent souvent en haut de la SERP) ? Voici la méthode complète que nous appliquons chez Krealabs pour nos clients normands. Article basé sur 5 ans de pratique SEO local, avec des résultats vérifiables sur les fiches Google de nos clients.",
      sections: [
        {
          title: "Fiche Google Business Profile : la fondation",
          content:
            "C'est LA fondation. Sans fiche Google Business optimisée, oubliez le pack local — peu importe la qualité de votre site web. Trois leviers principaux : 1) Catégorie principale précise (ex: \"Restaurant italien\" plutôt que \"Restaurant\"), avec si pertinent 5-10 catégories secondaires. 2) Informations complètes et exactes : adresse, téléphone, horaires (incluant jours fériés), site web. 3) Photos régulières (mensuelles minimum) — Google détecte les fiches \"vivantes\". 4) Posts Google Business hebdomadaires (event, offre, mise à jour). 5) Réponses systématiques aux avis (positifs comme négatifs, dans les 48h). Une fiche optimisée gagne typiquement 2-4 places dans le pack local en 3 mois.",
        },
        {
          title: "Schema.org LocalBusiness sur votre site",
          content:
            "Sur votre site, ajoutez un balisage JSON-LD de type LocalBusiness (ou plus spécifique : Restaurant, Dentist, ProfessionalService, AutoRepair, etc. — la liste est sur schema.org). Google comprend mieux qui vous êtes, où vous êtes, ce que vous proposez. Inclure obligatoirement : address (avec postalCode et addressRegion), geo (coordinates), telephone, openingHoursSpecification, priceRange, knowsAbout (compétences), areaServed (zones desservies). Pour les multi-établissements, un schéma par établissement avec @id unique.",
          code: `{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://votre-site.fr/#org",
  "name": "Votre Entreprise",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 rue Jeanne d'Arc",
    "addressLocality": "Rouen",
    "postalCode": "76000",
    "addressRegion": "Normandie",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.4431,
    "longitude": 1.0993
  },
  "telephone": "+33 2 35 XX XX XX",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "priceRange": "€€",
  "areaServed": ["Rouen", "Le Havre", "Normandie"]
}`,
        },
        {
          title: "Citations locales : la cohérence NAP",
          content:
            "Plus votre entreprise est mentionnée sur des sites locaux pertinents (annuaires, chambres de commerce, presse locale), plus Google confirme votre légitimité géographique. Le critère clé : la cohérence NAP (Name, Address, Phone) — strictement identique partout. Pas \"SARL Krealabs\" ici et \"Krealabs\" là, pas \"12 r. Jeanne d'Arc\" et \"12 rue Jeanne d'Arc\". Les annuaires à viser pour Rouen et Normandie : Pages Jaunes, Mappy, Bing Places, Apple Maps Connect, Normandinamik, CCI Rouen, annuaires sectoriels (Truspilot pour les services, Doctolib pour les médicaux, TripAdvisor pour les commerces). Compter 10-20 annuaires de qualité, pas 100 annuaires bidons.",
        },
        {
          title: "Contenu géolocalisé : pages locales et longue traîne",
          content:
            "Créez du contenu qui parle explicitement de votre ville et région. Page dédiée \"Métier à Rouen\" (notre exemple : /agence-web-rouen), articles de blog sur des sujets locaux (\"5 entreprises rouennaises qui...\", \"Le marché du XX à Rouen en 2026\"), témoignages clients de la région avec lieu mentionné, FAQ qui mentionnent Rouen/Normandie. Les requêtes longue traîne géolocalisées (\"comment trouver un X à Rouen\", \"prix moyen de X en Normandie\") sont MOINS concurrentielles que les requêtes courtes — c'est là que vous pouvez gagner facilement. Cibler 10-20 mots-clés longue traîne par page, plutôt qu'un mot-clé court trop concurrentiel.",
        },
        {
          title: "Avis Google : le levier sous-estimé",
          content:
            "Le nombre d'avis et leur note moyenne pèsent FORTEMENT dans le classement du pack local. Demandez systématiquement à vos clients satisfaits de laisser un avis — pas \"si vous avez 2 minutes\" mais via un lien direct dans un email de fin de mission ou un QR code en boutique. Cible : 30-50 avis minimum, note 4.5+, fréquence régulière (Google détecte les avis groupés suspects). Répondez à TOUS les avis, positifs comme négatifs (les réponses montrent le sérieux). Pour les avis négatifs, restez factuel et propose une suite hors-Google (\"appelez-nous au... pour qu'on règle ça\"). Les avis sont aussi un signal pour les utilisateurs : 78% lisent les avis avant de contacter.",
        },
        {
          title: "Backlinks locaux : la stratégie",
          content:
            "Au-delà des annuaires, les vrais backlinks locaux pèsent. Sources : presse régionale (Paris-Normandie, Tendance Ouest), blogs locaux thématiques, partenariats avec d'autres entreprises locales (lien réciproque ou mentions), sponsoring d'événements locaux (course Rouen, festivals), CCI/CMA qui listent leurs adhérents avec lien. Un seul backlink de Paris-Normandie vaut souvent 20 backlinks de petits sites. Stratégie de digital PR : trouver l'angle local qui intéresse les journalistes (étude, chiffre régional, événement, prix), et les contacter.",
        },
        {
          title: "Search Console : monitoring du SEO local",
          content:
            "Google Search Console est gratuit et indispensable. Configurer : 1) Rapport Performance, filtrer par requêtes contenant \"Rouen\" ou \"Normandie\" pour voir vos positions locales. 2) Rapport Couverture pour vérifier que vos pages locales sont indexées. 3) Rapport Web Vitals pour la performance (les sites lents tombent dans le pack local aussi). 4) Demander indexation des pages locales prioritaires. À regarder chaque semaine pour identifier les requêtes en hausse et les opportunités. Pour ceux qui veulent aller plus loin, BrightLocal ou Whitespark donnent des outils de monitoring spécifiquement SEO local.",
        },
        {
          title: "Erreurs classiques à éviter",
          content:
            "Sur les audits SEO local qu'on fait, on retrouve toujours les mêmes erreurs. 1) NAP incohérent sur 3-4 annuaires (Google se méfie). 2) Catégorie GMB trop générique. 3) 0 photos sur la fiche GMB depuis 6 mois. 4) Pas de réponse aux avis. 5) Site lent (LCP > 4s) qui pénalise le pack local. 6) Page \"Contact\" sans schema LocalBusiness. 7) Numéro de téléphone non-cliquable sur mobile. 8) Page \"horaires\" séparée de la page contact (pour Google c'est mieux que tout soit sur la même page). Corriger ces 8 points = +30-50% de trafic local typique en 3 mois.",
        },
      ],
      conclusion:
        "Le SEO local est un marathon : 3 à 6 mois pour voir des effets significatifs, 12 mois pour stabiliser. Mais pour une PME qui dépend de sa clientèle locale (Rouen et Normandie), c'est l'investissement marketing le plus rentable — ROI typique 5x à 10x sur un an quand c'est bien fait. Découvrez notre [page dédiée agence web Rouen](/agence-web-rouen) et notre offre [Performance & SEO](/services/performance-seo). Si votre site est sur WordPress, lisez aussi notre [guide d'audit SEO WordPress en 12 points](/blog/audit-seo-wordpress-12-points). Chez Krealabs, on accompagne les entreprises rouennaises et normandes sur ces sujets régulièrement. Premier audit SEO local de votre fiche GMB + site offert.",
    },
  },
  {
    slug: "schema-org-agences-web",
    title: "Schema.org pour agences web : guide balisage complet",
    excerpt:
      "Sitelinks, breadcrumbs, FAQ, services, équipe, reviews : tous les balisages JSON-LD utiles pour une agence web ou digitale. Exemples concrets, validation Rich Results Test, retours d'impact CTR.",
    category: "SEO",
    date: "8 mai 2026",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80",
    featured: false,
    author,
    tags: ["Schema.org", "JSON-LD", "Rich Snippets", "SEO", "Agence web", "Structured Data"],
    content: {
      introduction:
        "Schema.org est le vocabulaire commun que Google, Bing, Yandex et tous les moteurs de recherche utilisent pour comprendre votre site. Pour une agence web ou digitale, c'est l'occasion d'afficher des rich snippets (étoiles, FAQ, fil d'Ariane, événements) qui font la différence dans les résultats de recherche — gain CTR mesurable de 10 à 30%. Voici notre guide complet sur les balisages Schema.org qu'on déploie systématiquement chez Krealabs, avec exemples concrets et retours sur ce qui marche vraiment.",
      sections: [
        {
          title: "ProfessionalService — la fondation pour agences",
          content:
            "Le type ProfessionalService (sous-classe de LocalBusiness) est idéal pour une agence digitale. Il accepte tous les champs utiles : adresse postale, géolocalisation, services proposés, prix range, horaires, contact, zones desservies. À placer sur la home dans un script JSON-LD <type=\"application/ld+json\">. Pour les variantes spécifiques métier, voir les sous-types : Restaurant, Dentist, AutoRepair, etc. Pour une agence web/digitale, ProfessionalService convient parfaitement. Inclure absolument knowsAbout (vos expertises) et areaServed (zones géographiques desservies).",
        },
        {
          title: "BreadcrumbList — fil d'Ariane visible dans Google",
          content:
            "Sur chaque page intérieure, ajoutez un BreadcrumbList pour afficher le chemin de navigation sous le titre dans la SERP Google. Petit effort, vrai impact UX dans les SERP — l'utilisateur voit la hiérarchie de votre site, le contexte de la page. Sur un article de blog, les breadcrumbs montrent \"Accueil > Blog > Catégorie > Titre article\" avec liens cliquables. Mesuré sur nos sites : +5-8% de CTR après mise en place du BreadcrumbList.",
          code: `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://krealabs.fr" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://krealabs.fr/services" },
    { "@type": "ListItem", "position": 3, "name": "Développement web", "item": "https://krealabs.fr/services/developpement-web" }
  ]
}`,
        },
        {
          title: "FAQPage — réponses dans la SERP",
          content:
            "Sur votre page FAQ ou les pages avec questions fréquentes, ajoutez un balisage FAQPage. Google peut afficher directement les questions/réponses sous votre résultat dans la SERP, ce qui augmente considérablement la visibilité et le CTR. Attention en 2026 : Google a restreint le FAQPage rich snippet aux sites \"officiels\" (gouvernement, santé) sur les requêtes très concurrentielles. Mais pour les requêtes long-tail métier (\"comment fonctionne un X\", \"combien coûte un Y\"), ça marche encore très bien. Mesurer dans Search Console : rapport Performance > comparer CTR avant/après.",
          code: `{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Combien coûte un site WordPress sur mesure ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Cela dépend du projet : vitrine simple 4-6k€, WooCommerce 10-20k€..."
    }
  }]
}`,
        },
        {
          title: "Article — pour articles de blog",
          content:
            "Chaque article de blog doit avoir un balisage Article (ou ses sous-types : BlogPosting, NewsArticle, TechArticle). Champs obligatoires : headline, image, author (Person ou Organization), publisher (Organization avec logo), datePublished (ISO 8601), dateModified, mainEntityOfPage. Bonus : wordCount, articleSection, keywords, inLanguage. Cela permet à Google de proposer votre contenu dans Discover, Top Stories, et améliore le snippet (date, auteur affichés). On l'a implémenté sur tous les articles du blog Krealabs.",
        },
        {
          title: "Service — pour vos pages de services",
          content:
            "Sur chaque page service (ex: /services/wordpress, /services/developpement-web), un Service avec serviceType, provider (votre Organization), areaServed, hasOfferCatalog. Aide Google à comprendre que vous proposez ces services concrets dans ces zones. Combiné avec ProfessionalService sur la home, ça structure clairement votre catalogue d'offres pour Google.",
          code: `{
  "@type": "Service",
  "serviceType": "Création de site WordPress",
  "provider": { "@type": "ProfessionalService", "name": "Krealabs" },
  "areaServed": ["Rouen", "Normandie", "France"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      { "@type": "Offer", "name": "Site vitrine WordPress" },
      { "@type": "Offer", "name": "WooCommerce" }
    ]
  }
}`,
        },
        {
          title: "Person — pour pages équipe et auteurs",
          content:
            "Sur votre page équipe (/equipe chez nous), un Person par membre avec name, jobTitle, image, sameAs (liens LinkedIn/GitHub/Twitter), knowsAbout. Sur les articles de blog, l'author dans l'Article schema peut renvoyer vers cette Person. Cela aide Google à construire la \"Knowledge Graph\" autour de votre équipe — les co-fondateurs et experts deviennent plus visibles dans les recherches nominatives.",
        },
        {
          title: "Review et AggregateRating — étoiles dans la SERP",
          content:
            "Pour les agences avec témoignages clients, vous pouvez baliser les avis avec Review et un AggregateRating global (note moyenne, nombre d'avis). En 2026, Google est strict sur l'authenticité : pas de balisage de notes inventées, l'AggregateRating doit pointer sur une page qui affiche réellement les avis. Si fait correctement, les étoiles apparaissent dans la SERP — gain CTR souvent +15-25%. Important : vous ne pouvez baliser les avis QUE s'ils sont sur votre propre site, pas si vous compilez des avis Google externes.",
        },
        {
          title: "Outils de validation et debugging",
          content:
            "Toujours valider vos balisages avant déploiement. Outils essentiels : 1) Google Rich Results Test (search.google.com/test/rich-results) — teste si Google va générer un rich snippet pour votre URL. 2) Schema.org Validator (validator.schema.org) — vérifie la conformité technique au standard. 3) Google Search Console > Améliorations — détecte les erreurs sur l'ensemble du site indexé. 4) Nodejs schema-dts pour TypeScript : typage strict des objets Schema, plus jamais de balisage cassé silencieusement.",
          code: `// schema-dts pour typage strict en TypeScript
import { Person, Article, WithContext } from 'schema-dts'

const articleSchema: WithContext<Article> = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mon article',
  datePublished: '2026-01-15',
  author: { '@type': 'Person', name: 'Maxime Dubois' }
}`,
        },
        {
          title: "Implémentation Next.js : pattern recommandé",
          content:
            "Sur Next.js, le pattern qu'on utilise chez Krealabs : un dossier components/seo/ avec un composant par type de schema (OrganizationSchema, BreadcrumbSchema, ArticleSchema, FAQSchema). Chaque composant rend un <script type=\"application/ld+json\"> avec les données passées en props. Insérés dans le layout ou la page concernée. Pour les types récurrents (BreadcrumbList sur toutes les pages internes), ça devient automatique. Sur WordPress, Yoast et RankMath gèrent la plupart des schemas mais on customise souvent avec du code pour des cas spécifiques (Service, Person).",
        },
      ],
      conclusion:
        "Le balisage Schema.org ne demande pas de gros efforts mais offre un retour clair en visibilité Google. Si vous gérez le site vous-même, des plugins existent (Rank Math, Yoast pour WordPress, le helper officiel pour Next.js). Si vous êtes sur du custom, c'est quelques scripts à ajouter. Sur nos sites clients après mise en place complète : +10 à +30% de CTR organique en moyenne, des positions stables, des rich snippets visibles. Si vous voulez un audit du balisage Schema actuel de votre site et un plan d'enrichissement, on le fait régulièrement chez Krealabs.",
    },
  },
  {
    slug: "audit-lighthouse-methode-agence",
    title: "Audit Lighthouse : la méthode complète qu'on applique en agence",
    excerpt:
      "Un Lighthouse à 50 ne donne pas la même priorité d'actions qu'un à 85. Méthode complète d'audit selon le score, quick wins, chantiers de fond, outils d'investigation, et mise en CI/CD pour ne plus régresser.",
    category: "SEO",
    date: "1 mai 2026",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    featured: false,
    author,
    tags: ["Lighthouse", "Audit", "Performance", "Core Web Vitals", "SEO", "Bundle analysis"],
    content: {
      introduction:
        "Lighthouse donne 4 scores : Performance, Accessibility, Best Practices, SEO. Mais un site à 50 et un site à 85 ne se traitent pas du tout pareil — les actions prioritaires changent radicalement. Voici la méthode complète que nous appliquons chez Krealabs pour cadrer un audit Lighthouse, prioriser les actions selon le score initial, et mesurer les progrès. Article basé sur 50+ audits réalisés ces 3 dernières années, sur des sites WordPress, Next.js, et autres.",
      sections: [
        {
          title: "Le score Lighthouse n'est qu'une vue partielle",
          content:
            "Avant d'attaquer, un point clé : Lighthouse mesure en conditions LAB (Chromium headless, throttling simulé, machine de référence). Les vraies données qui comptent pour Google SEO viennent du FIELD : Chrome User Experience Report (CrUX), accessible via Search Console > Web Vitals ou PageSpeed Insights. Lighthouse est un excellent outil de diagnostic, mais un score Lighthouse à 100 sur un site lent en réalité ne sert à rien — et un score lab à 70 mais avec CrUX au vert suffit largement. Toujours valider lab + field.",
        },
        {
          title: "Site à 30-50 : urgence performance",
          content:
            "Le plus probable sur ce score : images non optimisées (JPG/PNG énormes, pas de WebP), JavaScript énorme (souvent 1-3 MB de scripts tiers), render-blocking CSS, hébergement lent. Trois quick wins qui remontent souvent le score à 70+ en quelques jours : 1) Convertir TOUTES les images en WebP/AVIF avec next/image ou ShortPixel sur WordPress. 2) Code splitting agressif (dynamic imports sur les composants lourds, lazy loading des images below-fold). 3) Minification + Brotli + cache long sur le CDN. Bonus : virer les scripts tiers non critiques (analytics auxiliaires, A/B tests dormants, anciens widgets). Sur les sites WordPress, c'est souvent virer 5-10 plugins inutiles qui apporte le plus.",
        },
        {
          title: "Site à 50-75 : nettoyage des dépendances",
          content:
            "On entre dans le détail. Auditer le bundle JavaScript avec @next/bundle-analyzer pour Next.js ou webpack-bundle-analyzer ailleurs : identifier les dépendances surdimensionnées (Moment.js → date-fns ou dayjs, Lodash entier → import par fonction, Charts.js complet → import dynamique), libs anciennes qui pourraient être natives (Polyfills inutiles en 2026). Traiter le CLS (Cumulative Layout Shift) : réserver l'espace pour les images (width/height obligatoires sur next/image), pour les fonts (font-display: swap + preload), pour les bannières publicitaires (taille fixe en CSS). À ce stade, on optimise aussi les requêtes réseau : préchargement des ressources critiques (rel=preload sur fonts, images LCP, scripts critiques).",
          code: `// Analyse du bundle Next.js
// next.config.ts
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default withBundleAnalyzer({
  // votre config Next existante
})

// Usage : ANALYZE=true npm run build
// Ouvre 2 onglets : client + server bundles
// Cliquez sur les gros blocs pour identifier les "fat" dépendances`,
        },
        {
          title: "Site à 75-90 : optimisation fine",
          content:
            "Préload des polices critiques avec rel=preload + crossorigin, priorité des images above-the-fold (priority sur next/image, fetchpriority=\"high\" sur les LCP candidates), lazy loading agressif sur le below-fold, font-display: swap obligatoire, optimisation des Core Web Vitals (LCP, INP, CLS) au cas par cas. À ce stade, on monitorse aussi les scripts tiers : Google Analytics 4 charge mieux que Universal Analytics, mais reste lourd. Plausible Analytics est plus léger (~3 KB vs ~50 KB pour GA4). Pour les chat widgets (Crisp, Intercom), différer le chargement avec setTimeout 3-5s post-load. C'est là qu'on gagne 5-10 points sans renoncer aux features.",
        },
        {
          title: "Site à 90+ : maintenance et CI",
          content:
            "Le score est bon. L'enjeu devient de ne pas régresser à la prochaine feature développée. Mettre en place : 1) Lighthouse CI en GitHub Actions, qui s'exécute sur chaque pull request et bloque le merge si un score baisse. 2) Vercel Speed Insights ou Sentry Performance pour le monitoring continu (vraies données utilisateurs, pas lab). 3) Audit trimestriel manuel pour vérifier que les chiffres CrUX restent au vert dans Search Console. 4) Process de revue avant chaque déploiement majeur : passer en revue les nouvelles dépendances ajoutées (npm ls --depth=0 + bundle analyzer). C'est de la gestion de patrimoine technique.",
          code: `# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: pull_request
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci && npm run build && npm start &
      - run: npx lhci autorun
        env: { LHCI_GITHUB_APP_TOKEN: \${{ secrets.LHCI_GITHUB_TOKEN }} }`,
        },
        {
          title: "Au-delà du Performance score : Accessibility, Best Practices, SEO",
          content:
            "Le score Performance est le plus surveillé, mais les 3 autres scores Lighthouse comptent aussi. Accessibility : viser 95+ — contrast ratio AA, alt sur toutes les images, labels sur tous les inputs, hierarchy hX correcte. Best Practices : 90+ — HTTPS obligatoire, pas d'erreurs console en prod, images en bonnes dimensions natives. SEO : 95-100 facile à atteindre — meta description présente, robots.txt OK, structured data valide, mobile-friendly. Sur les nouveaux sites Krealabs, on vise systématiquement 95+ sur les 4 scores en condition lab, et CrUX au vert sur 90+% des pages.",
        },
        {
          title: "Outils complémentaires pour aller plus loin",
          content:
            "Lighthouse n'est pas le seul outil de mesure. WebPageTest (webpagetest.org) donne un waterfall ultra-détaillé : on voit chaque requête réseau, son timing, sa priorité. Idéal pour identifier les ressources bloquantes critiques. Chrome DevTools > Performance : profiling JS détaillé pour identifier les long tasks (>50ms) qui plombent l'INP. Chrome DevTools > Coverage : montre le % de CSS/JS non utilisés (à supprimer). Vercel Speed Insights : vraies données utilisateurs sur les sites déployés sur Vercel. Sentry Performance : RUM (Real User Monitoring) cross-stack. Pour les audits sérieux chez Krealabs, on combine ces 4-5 outils, pas seulement Lighthouse.",
        },
        {
          title: "Pièges classiques d'audit Lighthouse",
          content:
            "1) Auditer en mobile sur sa machine de dev pleine puissance : utiliser le throttling mobile + slow 4G en simulation, sinon scores trompeurs. 2) Auditer la home seulement : auditer aussi les pages internes (catégorie, fiche produit, blog), souvent moins optimisées. 3) Optimiser pour le score lab sans valider en field : on a vu des sites passer de 60 à 95 en lab mais sans amélioration réelle pour les utilisateurs (faux gains). 4) Ne pas re-tester après chaque optimisation : tester APRÈS chaque changement, mesurer l'impact, ne pas tout faire en aveugle. 5) Ignorer les warnings non-bloquants Lighthouse : ils signalent souvent des problèmes futurs.",
        },
      ],
      conclusion:
        "Un Lighthouse à 100 n'est pas un objectif en soi. Un site stable à 85-95 avec un INP < 200ms et un LCP < 2s en field data, c'est largement suffisant pour ressortir dans Google. Concentrez-vous sur l'expérience réelle (CrUX) plutôt que sur le score lab. Si vous voulez un audit complet de votre site (Lighthouse + WebPageTest + bundle analysis + plan d'action priorisé), on le réalise régulièrement chez Krealabs sur 1-3 jours selon la taille du site, livré avec un rapport écrit et un échange de débrief.",
    },
  },

  // ===========================================================================
  // CLUSTER OUTILS & MÉTHODES (3 articles)
  // ===========================================================================
  {
    slug: "ai-coding-claude-cursor-agence",
    title: "Coder avec l'IA en agence : ce qui marche vraiment en 2026",
    excerpt:
      "Cursor, Claude Code, GitHub Copilot. Comment on intègre l'IA dans le quotidien d'une agence sans sacrifier la qualité. Retour d'expérience honnête après 2 ans : ce qui marche, ce qui rate, et notre workflow concret.",
    category: "Outils",
    date: "29 avril 2026",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    featured: false,
    author,
    tags: ["IA", "Claude", "Cursor", "GitHub Copilot", "Productivité", "AI Coding"],
    content: {
      introduction:
        "Deux ans après l'arrivée de Cursor et Claude Code dans le quotidien des développeurs, où en sommes-nous vraiment ? Quelle place ces outils prennent-ils dans une agence comme Krealabs ? Cet article est notre retour d'expérience honnête, sans le marketing AI ni le doomerism anti-IA. Avec ce qui marche, ce qui ne marche pas, et ce qui marche trop bien (au point de poser des problèmes). On y partage aussi notre workflow concret, les pièges à éviter, et l'impact sur la formation et le recrutement.",
      sections: [
        {
          title: "Ce que l'IA fait bien aujourd'hui",
          content:
            "Sur certaines tâches, le gain de productivité est massif et indéniable. Boilerplate (composants React, API routes, schémas Prisma) : 30-50% plus rapide. Conversions de format (JSON → TypeScript types, OpenAPI → client TS, screenshots Figma → JSX initial) : presque instantané. Génération de tests unitaires basés sur le code existant : excellent point de départ, à raffiner manuellement ensuite. Refactoring mécanique (renommage de variable transversal, extraction de fonction, conversion class → function component) : impeccable. Explication d'un code legacy obscur (\"qu'est-ce que fait cette fonction de 200 lignes ?\") : très utile. Migration de syntaxe (jQuery → Vanilla JS, JS → TS) : 80% du travail fait par l'IA.",
        },
        {
          title: "Ce que l'IA fait mal (ou plutôt : où il faut rester vigilant)",
          content:
            "Décisions d'architecture : l'IA propose souvent des solutions \"évidentes\" qui marchent mais qui ne sont pas idiomatiques pour votre stack ou qui créent de la dette technique. Équilibrage de la dette technique : l'IA ajoute volontiers du code, rarement elle propose de simplifier ou supprimer. Compréhension fine du contexte métier client : impossible sans long briefing. Sur les API très récentes (Next.js 16, React 19, dernières versions de libs niche), ses connaissances peuvent être en retard de 6-12 mois. Et le pire : l'IA peut HALLUCINER avec confiance — inventer une API qui n'existe pas, citer une doc obsolète, ou produire du code qui compile mais ne fait pas ce qu'on demande. Vigilance obligatoire.",
        },
        {
          title: "Comparaison rapide des outils principaux",
          content:
            "Cursor : excellent éditeur de code basé sur VS Code, intégration agent IA très poussée (peut éditer plusieurs fichiers en autonomie), modèle Anthropic Claude par défaut. ~20-40$/mois pro. Notre outil principal chez Krealabs. Claude Code (CLI) : interface ligne de commande pour interagir avec Claude depuis un terminal, parfait pour les tâches longues ou les automatisations CI. ~20$/mois. GitHub Copilot : autocomplétion in-editor, plus léger, moins agent. Bon complément de Cursor. ~10$/mois. ChatGPT/Claude.ai en interface web : pour les questions ad-hoc, brainstorming, debugging cassé. Free tier + payant. Notre stack quotidienne : Cursor en principal, Claude Code pour les batches lourds (refactoring, génération de tests massive), Copilot en backup sur les machines moins puissantes.",
        },
        {
          title: "Notre workflow Krealabs",
          content:
            "Pair programming avec Cursor / Claude Code pour les tâches concrètes, JAMAIS pour la planification architecturale (cette décision reste humaine, après discussion entre les deux co-fondateurs). Reviews humaines systématiques : tout code généré par IA passe en review avant merge, comme du code humain. Tests automatisés non négociables — si l'IA a produit le code, le test garantit qu'il fait ce qu'il prétend faire. Documentation des prompts : on garde une bibliothèque de prompts efficaces (ex: \"refactor this React class to function component using TypeScript strict, preserving all props and lifecycle behavior\") pour cohérence dans l'équipe.",
          code: `# Notre .cursorrules type (instructions persistantes pour Cursor)
- Stack: Next.js 16, React 19, TypeScript strict, Tailwind 4, Prisma 6
- Always use Server Components by default, 'use client' only when needed
- Use Switzer font via Tailwind --font-sans
- Radius unique : rounded-[var(--radius)] partout
- Pas de page builders sur les sites WordPress, thèmes custom uniquement
- Tests : Vitest unit, Playwright e2e
- Tone : direct, pas de marketing fluff, retour terrain assumé`,
        },
        {
          title: "Impact sur la formation et le recrutement",
          content:
            "Pour un junior, l'IA peut être un piège : générer du code qu'on ne comprend pas, mais qui marche — donc qu'on merge sans apprendre. Risque : devenir un opérateur d'IA plutôt qu'un développeur. Pour un senior, c'est un accélérateur qui amplifie l'expertise existante. La discipline qu'on impose chez Krealabs : on ne merge une pull request que si on saurait l'écrire soi-même — autrement dit, l'IA peut nous faire gagner du temps mais elle ne peut pas remplacer la compréhension. Sur le recrutement : on s'attend à ce que les candidats sachent utiliser l'IA (c'est devenu une compétence essentielle), MAIS on les teste sur leur capacité à juger ce qu'elle produit (qualité code, sécurité, perf).",
        },
        {
          title: "Pièges à éviter absolument",
          content:
            "1) Faire confiance aveuglément à l'IA pour le code de production critique (auth, paiement, données médicales). Toujours review en équipe. 2) Coller du code IA sans comprendre — bombes à retardement futures. 3) Demander à l'IA de générer ce qu'on ne saurait pas vérifier (algorithmique avancée, crypto). 4) Utiliser l'IA pour analyser du code propriétaire client sans accord (RGPD, NDA). 5) Faire générer des tests qui valident le code généré par la même IA — c'est circulaire et n'apporte rien. 6) Croire l'IA quand elle invente du code qui ne compile pas mais a l'air convainquant — toujours essayer en local.",
        },
        {
          title: "L'avenir : agents IA autonomes",
          content:
            "En 2026, on voit émerger des agents plus autonomes : Devin, OpenHands, Claude Agent SDK qui peuvent prendre une tâche complète et l'exécuter de bout en bout (générer code + lancer tests + corriger erreurs + ouvrir PR). C'est puissant pour les tâches répétitives bien cadrées (migrations massives, refactorings cross-codebase, génération de doc). Mais ça nécessite un cadrage humain serré sinon ça dévie. Chez Krealabs, on commence à utiliser ces agents pour des tâches précises comme \"audit cette base de code et lister tous les TODO\" ou \"générer la documentation API\" — mais on reste loin de la full autonomie sur du code de production.",
        },
        {
          title: "Économie : ce que ça coûte vraiment",
          content:
            "Budget AI tools mensuel par développeur chez Krealabs en 2026 : Cursor pro 20$, Claude Code 20$, Copilot 10$, API credits Anthropic pour les batches (~30-50$/mois selon usage). Total : ~80-100$/mois/dev. Comparé au gain de productivité (estimé 30-40% sur les tâches éligibles), c'est rentable instantanément. À noter : l'IA augmente aussi la charge cognitive (revoir code généré, vérifier, débugger) — on n'a pas vraiment 30% de bande passante en plus pour faire plus de projets, mais on délivre des projets de meilleure qualité dans le même temps.",
        },
      ],
      conclusion:
        "L'IA accélère les bons développeurs et masque les faiblesses des mauvais. Chez Krealabs, on l'utilise quotidiennement — et on rend toujours du code qu'on comprend, qu'on a testé et qu'on assume. Si vous démarrez un projet en 2026 sans utiliser l'IA, vous perdez du temps. Si vous l'utilisez sans discipline, vous accumulez de la dette technique invisible. L'équilibre se trouve dans le métier : savoir quand utiliser l'outil et quand ne pas s'en servir. Notre conviction : l'IA est un super junior qui ne dort pas. Comme tout junior, à manager.",
    },
  },
  {
    slug: "github-actions-pme-cicd-zero",
    title: "GitHub Actions pour PME : CI/CD complet en partant de zéro",
    excerpt:
      "Comment mettre en place une CI/CD propre sur un projet web ou mobile sans usine à gaz. Workflows complets à copier-coller, déploiement Vercel/Netlify, sécurité, performance, et patterns avancés selon vos besoins.",
    category: "Outils",
    date: "18 avril 2026",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&q=80",
    featured: false,
    author,
    tags: ["GitHub Actions", "CI/CD", "DevOps", "Outils", "Automatisation", "Vercel"],
    content: {
      introduction:
        "Le CI/CD (intégration et déploiement continus) est un investissement à fort ROI pour une PME ou une startup. GitHub Actions étant intégré à GitHub, pas besoin d'infrastructure externe ni de Jenkins, CircleCI ou GitLab CI à provisionner. Voici un guide complet pour mettre en place une CI/CD professionnelle à partir de zéro, avec les workflows que nous utilisons chez Krealabs sur nos projets clients. Article concret avec du YAML à copier-coller, et évolutions possibles selon votre besoin.",
      sections: [
        {
          title: "Le minimum vital : lint + type-check + tests",
          content:
            "Un job qui tourne à chaque pull request : install des deps, lint ESLint, type-check TypeScript, tests unitaires (Vitest ou Jest). Si une de ces 4 étapes échoue, la PR est bloquée (status check obligatoire dans GitHub branch protection). Cela coûte 0 effort à mettre en place et évite 90% des régressions évidentes. Variables critiques : caching de npm (gain ~30s par run), version Node.js explicite (jamais 'latest', toujours pinné).",
          code: `# .github/workflows/ci.yml
name: CI
on:
  pull_request:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm test`,
        },
        {
          title: "Build & deploy par environnement",
          content:
            "Sur push vers main → déploiement en production. Sur push vers develop → déploiement en staging. Sur chaque PR → preview deployment automatique. Si vous êtes sur Vercel, la plateforme gère TOUT cela nativement (preview deployments par PR, prod sur main, alias staging configurable) — pas besoin d'écrire de workflow GitHub Actions pour le déploiement, juste connecter le repo dans le dashboard Vercel. Pour Netlify : pareil. Pour AWS/OVH/serveur custom : il faut écrire le workflow GitHub Actions de déploiement (rsync + ssh, ou Docker push, etc.).",
        },
        {
          title: "Cache et performance des workflows",
          content:
            "Cacher node_modules, le cache Next.js (.next/cache), les artefacts Playwright/Cypress peut diviser le temps de CI par 3. Sur un workflow de 10 minutes, cela compte vite (et économise du quota GitHub Actions sur les plans payants). Stratégies : cache npm via setup-node action (built-in), cache custom pour .next/cache avec actions/cache@v4 keyé sur package-lock + sources. Pour les tests e2e Playwright, utiliser l'action officielle qui cache les browsers téléchargés (~80 MB économisés par run).",
          code: `# Cache Next.js build
- uses: actions/cache@v4
  with:
    path: |
      .next/cache
      ~/.npm
    key: \${{ runner.os }}-nextjs-\${{ hashFiles('package-lock.json') }}-\${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
    restore-keys: |
      \${{ runner.os }}-nextjs-\${{ hashFiles('package-lock.json') }}-`,
        },
        {
          title: "Sécurité : Dependabot et scans automatiques",
          content:
            "Activer Dependabot dans GitHub repo settings → security & analysis. Il crée automatiquement des PRs pour mettre à jour les dépendances avec failles de sécurité connues. Configurer dependabot.yml pour grouper les updates par catégorie (eviter 50 PRs séparées). Compléter avec : npm audit en CI (mais attention aux faux positifs), Snyk gratuit pour le scan de vulnérabilités, CodeQL natif GitHub pour l'analyse statique du code. Sur les projets clients, on configure tout ça dès le jour 1 — coût zéro, gain de sécurité massif.",
          code: `# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule: { interval: weekly }
    groups:
      next:
        patterns: ["next", "@next/*", "react", "react-dom"]
      dev:
        dependency-type: development
    open-pull-requests-limit: 5`,
        },
        {
          title: "Migrations DB en preview deployments",
          content:
            "Sur les projets avec Prisma + Neon (notre stack DB par défaut), on configure les preview deployments Vercel avec branche DB Neon dédiée par PR. Workflow : 1) PR ouverte → Vercel crée preview + branche DB Neon copiée de prod. 2) GitHub Action lance prisma migrate deploy sur la branche DB. 3) Tests e2e en preview. 4) PR mergée → Vercel deploy prod + GitHub Action lance migrate deploy sur DB prod. Avantage : chaque PR a une vraie DB à elle, on peut tester les migrations en isolation. Aucun risque de polluer la prod.",
        },
        {
          title: "Tests e2e Playwright dans la CI",
          content:
            "Pour les tests end-to-end (Playwright), on les lance UNIQUEMENT sur les PRs vers main (pas sur chaque commit) car ils sont lents. Setup : action officielle microsoft/playwright-github-action qui gère le download des browsers. Variables d'env : BASE_URL pointant vers le preview deployment Vercel. Strategy : lancer e2e sur 3 navigateurs (Chromium, Firefox, WebKit) en parallèle via matrix. Upload des artefacts (screenshots, vidéos) en cas d'échec pour debugger ensuite. Compter 3-8 minutes de test e2e selon le scope.",
        },
        {
          title: "Notifications et reporting",
          content:
            "Intégrer Slack ou Discord pour recevoir les notifications de build : action 8398a7/action-slack ou native Slack pour GitHub. Sur les fails, notification immédiate dans un channel #dev. Sur les déploiements prod réussis, notification dans #releases avec le diff. Reporting des PRs : utiliser GitHub Actions pour poster un commentaire automatique sur chaque PR avec le link preview Vercel + lighthouse score + couverture tests. Pratique pour l'équipe et le client qui suit l'avancement.",
        },
        {
          title: "Patterns avancés : monorepo, matrix, environments",
          content:
            "Pour les monorepos (Turborepo, Nx), configurer le `paths` filter pour ne lancer les checks que sur les packages affectés (gain massif de temps CI). Pour les matrix builds (tester sur plusieurs versions Node 20/22 ou OS Ubuntu/macOS) : la syntaxe matrix de GitHub Actions est élégante. Pour les déploiements multi-environnements (prod, staging, preview, demo), utiliser les GitHub Environments avec secrets séparés et required reviewers pour la prod (sécurité). Sur les projets sérieux, on protège la prod avec required reviewers : 2 personnes doivent approuver la PR avant deploy.",
        },
      ],
      conclusion:
        "Un CI/CD minimal mis en place en 30 minutes vaut mieux qu'un CI/CD parfait jamais déployé. Démarrez petit (lint + tests + auto-deploy), étendez au fur et à mesure de vos besoins (security scan, e2e, monitoring). Chez Krealabs, tous nos projets ont CI dès le premier commit. Si vous voulez accompagnement pour mettre en place une CI/CD propre sur un projet existant, c'est une mission qu'on adore — usuellement 1-2 jours pour un setup complet et formé.",
    },
  },
  {
    slug: "vercel-vs-ovh-hebergement-2026",
    title: "Vercel, OVH, Scaleway, AWS : où héberger son site en 2026",
    excerpt:
      "Le débat de l'hébergement revient à chaque projet. Vercel pour la DX, OVH/o2switch pour WordPress, Scaleway pour la souveraineté française, AWS pour le scale. Comparatif détaillé et grille de décision par profil de projet.",
    category: "Outils",
    date: "8 avril 2026",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    featured: false,
    author,
    tags: ["Hébergement", "Vercel", "OVH", "Scaleway", "AWS", "Cloud", "Souveraineté", "o2switch"],
    content: {
      introduction:
        "À chaque démarrage de projet, la même question revient chez le client : où héberger le site ? Vercel, AWS, un hébergeur français comme OVH ou Scaleway, o2switch pour les WordPress ? La réponse dépend du contexte : type d'app (WordPress vs Next.js), exigences de souveraineté, budget, volume de trafic, équipe DevOps disponible. Voici notre grille de décision chez Krealabs, basée sur les centaines de projets qu'on a vu en production ces dernières années, avec retours d'expérience concrets sur les principaux acteurs.",
      sections: [
        {
          title: "Vercel — la DX maximale pour Next.js",
          content:
            "Pour un projet Next.js (ou React/Vue/Astro), Vercel est imbattable côté expérience développeur. Deploy en un push Git, preview branches automatiques par PR, edge functions, analytics intégrées (Vercel Analytics + Speed Insights), CDN global. Coût raisonnable pour des projets PME : Pro à 20$/mois/dev avec quotas généreux. En revanche : données hébergées principalement aux US (problème RGPD pour certains clients), prix qui grimpe vite si le trafic explose (overage charges sur la bandwidth), et écosystème un peu fermé. Notre choix par défaut pour les projets Next.js sans contrainte de souveraineté.",
        },
        {
          title: "o2switch — le meilleur hébergeur WordPress français",
          content:
            "Pour les sites WordPress (notre spécialité), o2switch est notre recommandation #1 en France. Avantages : performance excellente pour WordPress (PHP optimisé, cache LiteSpeed, OPcache, MySQL bien configuré), support technique réactif et compétent (français), hébergement en France (Auvergne) donc RGPD-friendly, prix très raisonnable (~7€/mois pour un site, illimité en sites). Idéal pour PME et associations qui veulent un hébergement sérieux sans casser la tirelire. Kinsta est l'alternative premium (~35$/mois) pour les sites WordPress qui exigent le top niveau (apps WP critiques, gros trafic).",
        },
        {
          title: "Scaleway et OVH — souveraineté française",
          content:
            "Pour un client sensible à la souveraineté des données (administration, santé, finance, défense), un hébergeur français est presque obligatoire en 2026. Scaleway (Iliad/Free) : très bonne offre cloud (Object Storage, Kubernetes, Postgres managé, Functions), datacenters en France, support correct, prix compétitifs. OVHcloud : leader européen, infrastructure massive, plus complexe à utiliser (UI vieillissante mais robuste). Pour héberger une app Next.js sur ces clouds, il faut maîtriser Docker + Kubernetes ou utiliser leurs offres PaaS naissantes. Coût stable, prévisible, mais DX plus rugueuse. Demande de la compétence DevOps pour bien faire.",
        },
        {
          title: "AWS — la flexibilité maximale pour le scale",
          content:
            "Pour des besoins complexes (multi-régions, services managés AWS spécifiques, gros volumes 100k+ utilisateurs/jour, intégrations IA via Bedrock), AWS reste la référence. Plus de 200 services managés disponibles, écosystème immense, scalabilité quasi-infinie. Coût difficilement prévisible (toujours des services cachés qui s'accumulent), courbe d'apprentissage importante, vendor lock-in si vous utilisez les services proprios. Pertinent pour des projets à fort potentiel de scale (SaaS B2B avec millions d'événements, e-commerce gros volume, plateformes média). Sur ces projets, on dédie du temps DevOps spécifique.",
        },
        {
          title: "Cloudflare — l'option émergente puissante",
          content:
            "Cloudflare s'impose comme une option crédible en 2026 : Workers (compute edge ultra-rapide), Pages (hébergement static + SSR), R2 (S3 compatible sans frais de bande passante), D1 (SQLite serverless), KV / Queues / Durable Objects. Avantages : performance globale, prix imbattables (R2 sans bandwidth fees révolutionne le stockage), édité par une entreprise solide. Inconvénients : Workers ont des contraintes (50ms CPU max, taille bundle 1MB), compatibilité Next.js encore en évolution (mieux qu'avant mais pas aussi mature que Vercel). Notre conseil : à considérer pour les apps statiques + API edge, à laisser pour les apps full-stack lourdes.",
        },
        {
          title: "Le piège : choisir l'hébergement avant l'architecture",
          content:
            "Erreur classique : choisir l'hébergement AVANT d'avoir cadré l'architecture. La bonne séquence : 1) Comprendre le besoin métier (catégorie de site, volumes, contraintes). 2) Choisir la stack technique (WordPress, Next.js, Astro, etc.). 3) Définir les contraintes de l'hébergement (souveraineté, budget mensuel, scaling attendu). 4) Choisir l'hébergeur qui matche. Pas l'inverse. Si vous choisissez l'hébergement d'abord, vous pouvez vous retrouver à compromettre la stack pour s'adapter à l'infra (mauvaise idée).",
        },
        {
          title: "Notre grille de décision finale",
          content:
            "Pour 80% des projets PME que nous accompagnons : SITE WORDPRESS → o2switch (FR, performant, abordable) ou Kinsta (premium). SITE NEXT.JS / REACT → Vercel + Neon (Postgres serverless EU). APP MOBILE BACK-END → Supabase ou Firebase selon préférence. PROJET SOUVERAINETÉ FORTE → Scaleway + Postgres managé Scaleway. PROJET FORT VOLUME / MULTI-RÉGIONS → AWS avec architecture dédiée. PROJET API EDGE GLOBAL → Cloudflare Workers. Cette grille couvre 95% des cas. Les 5% restants sont des hybrides ou des cas exotiques qui demandent une étude spécifique.",
        },
        {
          title: "Coûts comparés sur 3 ans (estimation)",
          content:
            "Pour un site WordPress vitrine PME (~30k visiteurs/mois) : o2switch ~250€/3ans. Kinsta ~1200€/3ans. Pour un site Next.js startup early stage (~100k visiteurs/mois) : Vercel ~720€/3ans (Pro 20$/dev). Scaleway ~600€/3ans (VPS + Postgres managé). AWS variable, souvent 1500-3000€/3ans selon services utilisés. Pour un SaaS B2B (~1M de visiteurs/mois, dashboards, API) : Vercel Enterprise 2000-5000€/an. AWS 3000-8000€/an. Auto-hosted Kubernetes Scaleway/OVH ~1500€/an + temps DevOps. Le coût d'hébergement est rarement la variable décisive en dessous de 10k€/an — c'est le coût total d'opération qui compte.",
        },
        {
          title: "Et la migration entre hébergeurs ?",
          content:
            "Bonne nouvelle : la plupart des stacks modernes (WordPress, Next.js, Docker) sont relativement portables. Mauvaise nouvelle : la migration prend du temps et casse souvent des choses (DNS, certs SSL, jobs cron, variables d'env). Notre conseil : choisir un hébergement avec lequel vous vous voyez rester 3-5 ans minimum. Pour les projets en lock-in fort (Lambda, Cloudflare Workers avec D1 et KV très intégrés), bien évaluer le coût de sortie avant de s'engager. Pour les stacks portables (WordPress sur n'importe quel mutualisé/VPS, Next.js Dockerisé), la migration est moins risquée.",
        },
      ],
      conclusion:
        "Il n'y a pas de mauvais choix entre Vercel, o2switch, Scaleway, AWS — juste un choix adapté à votre contexte. Le coût d'hébergement est rarement la variable la plus importante (en dessous de 10k€/an) — c'est plutôt le coût d'opération sur 3 ans qu'il faut regarder, la portabilité, et la possibilité d'évoluer sans tout réécrire. Si vous hésitez pour votre projet entre 2-3 options, on peut vous aider à cadrer le bon choix selon votre stack et vos contraintes — premier échange offert chez Krealabs.",
    },
  },
];
