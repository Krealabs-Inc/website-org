export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Cluster thématique principal (Web | Mobile | SEO | Outils) */
  category: string;
  /** Date de publication initiale (format français "5 mai 2026"). */
  date: string;
  /**
   * Date de dernière mise à jour significative (format français "5 mai 2026").
   * Optionnel — laisser undefined sur les articles jamais retouchés.
   * Quand renseigné, alimente `dateModified` du schema Article + sitemap.
   */
  updatedAt?: string;
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

// ============================================================
// PUBLICATION DIFFÉRÉE
// ============================================================
// Un article dont la `date` est dans le futur est INVISIBLE sur le site
// jusqu'à ce que sa date arrive. Vercel ISR (revalidate 3600s) + cron
// quotidien garantissent que les articles deviennent visibles à leur
// date prévue, même sans visiteur.
//
// Pour rédiger un article à publier le 1er juillet 2026, il suffit de
// le pousser dans blogPosts[] avec date: "1 juillet 2026". Il sera
// invisible jusqu'à cette date.

/** Retourne uniquement les articles dont la date de publication est passée. */
export function getPublishedPosts(): BlogPost[] {
  const today = new Date().toISOString().slice(0, 10); // "2026-05-14"
  return blogPosts.filter((p) => frenchDateToISO(p.date) <= today);
}

/** Vrai si l'article est déjà publié (sa date est passée ou aujourd'hui). */
export function isPostPublished(post: BlogPost): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return frenchDateToISO(post.date) <= today;
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

  // ===========================================================================
  // CLUSTER LOCAL ROUEN (4 articles) — SEO local agence web Rouen / Normandie
  // ===========================================================================
  {
    slug: "choisir-agence-web-rouen-2026",
    title: "Comment choisir son agence web à Rouen en 2026 : 7 critères qui changent tout",
    excerpt:
      "Trop d'agences à Rouen disent la même chose : « experts SEO, sur-mesure, full-stack ». Voici 7 critères concrets pour démasquer les freelances déguisés, les revendeurs WordPress et les boîtes qui sous-traitent à l'étranger.",
    category: "Web",
    date: "13 mai 2026",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    featured: true,
    author,
    tags: ["Agence web Rouen", "Choisir agence web", "Normandie", "Sous-traitance", "Maintenance", "SEO local"],
    content: {
      introduction:
        "Vous tapez « agence web Rouen » et vous tombez sur 30 résultats. Tous promettent la même chose : design moderne, SEO performant, équipe d'experts, technologies de pointe. Comment trier ? Comment savoir si l'agence qui se présente comme « agence digitale rouennaise » est vraiment une équipe locale qui code, ou un commercial qui sous-traite à Madagascar ? À Rouen comme ailleurs, le marché digital concentre des profils très différents : freelances déguisés en agence, revendeurs WordPress qui collent un thème ThemeForest, vraies agences à 8 personnes, studios premium parisiens avec antenne normande. Cet article condense 5 ans d'observations sur le marché normand et donne 7 critères concrets pour faire le tri — peu importe que vous nous choisissiez ou non.",
      sections: [
        {
          title: "1. Vérifier qui code vraiment (équipe interne vs sous-traitance)",
          content:
            "C'est le critère #1, et personne ne le pose. La majorité des agences web à Rouen revendent du travail effectué ailleurs : freelances Upwork, devs en Tunisie, prestataires polonais. Le commercial qui vous reçoit ne code pas. Le « chef de projet » coordonne. Et le code est livré par quelqu'un que vous ne rencontrerez jamais. Posez la question directement : « Qui va coder mon projet et où ? ». Demandez à parler au développeur lead AVANT de signer. Si la réponse est floue, ou si on vous parle de « notre équipe partenaire », c'est de la sous-traitance déguisée. Ce n'est pas illégal — beaucoup de PME se contentent de ça — mais le risque qualité explose : timezone, communication, propriété intellectuelle, maintenance long terme. À Krealabs, vous parlez directement à Maxime ou Romain, les deux qui codent. Pas d'intermédiaire, pas de filtre. C'est notre choix éditorial, c'est aussi pourquoi on accepte moins de projets que les agences classiques.",
        },
        {
          title: "2. Demander à voir le code source d'un projet existant",
          content:
            "Une agence web sérieuse a des dépôts Git visibles (sur GitHub, GitLab, Bitbucket). Pas tous publics — beaucoup de projets clients sont sous NDA — mais une agence qui prétend coder doit pouvoir vous MONTRER du code, ne serait-ce qu'anonymisé. Demandez : « Pouvez-vous m'envoyer un extrait de code d'un projet récent ? ». Si vous recevez un screenshot Photoshop d'une UI, c'est mauvais signe. Si on vous envoie un repo GitHub avec des commits réguliers et des PRs reviewées, vous avez en face de vous une vraie équipe technique. Pour aller plus loin : demandez le profil GitHub des développeurs. Sur le nôtre ([github.com/makcimerrr](https://github.com/makcimerrr) pour Maxime, [github.com/CLTRomain](https://github.com/CLTRomain) pour Romain) vous voyez l'historique réel — contributions, projets open source, langages maîtrisés. C'est imparable comme preuve d'expertise.",
        },
        {
          title: "3. Tester la disponibilité : SLA et délai de réponse",
          content:
            "Une agence web à Rouen qui répond en 5 jours à votre demande de devis vous répondra de la même manière quand votre site sera en panne le vendredi à 16h. Testez avant de signer : envoyez un email un mardi à 10h. Une bonne agence répond sous 24h, idéalement sous 2h. Demandez aussi le SLA contractuel : sous combien de temps une demande de maintenance est traitée ? Les forfaits Krealabs garantissent réponse sous 24h ouvrées, intervention sous 48h pour les bugs bloquants, sous 7 jours pour les évolutions mineures. Si votre agence vous dit « ça dépend, on verra », c'est qu'il n'y a pas de process. Demandez aussi le canal préféré : email, Slack partagé, WhatsApp pro ? Une équipe joignable directement par WhatsApp ou Slack vaut une équipe joignable uniquement par tickets Helpdesk.",
        },
        {
          title: "4. Le tarif sans contrat de maintenance n'a aucun sens",
          content:
            "Un site internet à Rouen vendu 4 000 € sans maintenance, c'est un site qui sera obsolète et hackable en 18 mois. WordPress publie 4-6 mises à jour majeures par an, des dizaines de patchs sécurité, et les plugins évoluent en permanence. Un site Next.js doit suivre les versions du framework (cycle de 6 mois) sous peine d'accumuler une dette technique paralysante. Une agence sérieuse vous PROPOSERA spontanément un forfait maintenance — pas pour vous facturer plus, mais parce qu'elle sait que sans, le projet pourrira. Tarifs marché normands 2026 : 50-150 €/mois pour de la maintenance light (MAJ + backups + monitoring), 200-500 €/mois pour de la maintenance évolutive (incluant 1-3h de dev mineure par mois), 800-2000 €/mois pour des forfaits incluant SEO, contenus, analytics. Si on vous vend un site sans parler maintenance, fuyez : c'est un site jetable.",
        },
        {
          title: "5. La capacité à dire « non » est un critère qualité",
          content:
            "Beaucoup d'agences à Rouen disent oui à tout pour signer. « Vous voulez un site WordPress qui fait aussi de la 3D, du machine learning et qui se connecte à votre ERP en temps réel ? Pas de souci. » Six mois plus tard, le projet a explosé en complexité, le budget a doublé, et le résultat est instable. Une agence digitale solide vous CHALLENGE. Elle vous dit : « Non, WordPress n'est pas adapté à ce besoin, partons sur Next.js », « Non, ce plugin Elementor va vous bloquer dans 2 ans, faisons un thème custom », « Non, ce CMS no-code va atteindre ses limites, anticipez maintenant ». À Krealabs, on refuse environ 30% des projets qui nous arrivent. Pas par snobisme — parce qu'on ne veut pas signer un projet qu'on sait condamné. C'est un critère silencieux mais crucial : posez à l'agence la question « Avez-vous déjà refusé un projet ? Pourquoi ? ». Si la réponse est « non, on accepte tout », red flag.",
        },
        {
          title: "6. Le SEO ne se sous-traite pas",
          content:
            "Beaucoup d'agences web rouennaises affichent « SEO inclus » dans leurs offres. En pratique, ça veut souvent dire : un plugin Yoast installé, des balises title/meta rédigées au lancement, et basta. Le vrai SEO en 2026 demande du travail continu : Core Web Vitals (LCP, INP, CLS), schema.org, contenu publié régulièrement, backlinks locaux (très important pour le pack local Google à Rouen), Google Business Profile optimisé, citations sur annuaires CCI Rouen Métropole / FrenchTech Normandie. Une agence qui prétend faire du SEO doit pouvoir : 1) vous montrer un audit Lighthouse récent d'un site client (objectif >90 sur toutes les métriques), 2) expliquer sa stratégie de backlinks, 3) vous proposer une grille éditoriale de contenu (calendrier de publication). Notre [guide SEO local Rouen pour PME](/blog/seo-local-rouen-guide-pme) détaille la méthode que nous appliquons.",
        },
        {
          title: "7. La proximité géographique : vraie valeur, pas marketing",
          content:
            "Une agence web à Rouen, ce n'est pas juste une adresse postale dans le centre-ville pour gagner sur Google Maps. C'est : pouvoir se rencontrer en présentiel pour les kick-offs (les projets cadrés en visio uniquement ont 3x plus de malentendus), pouvoir intervenir physiquement si nécessaire (chez certains clients, on debug devant leur écran), connaître les acteurs locaux (banques, comptables, juristes, autres prestataires) pour orienter le client. Et surtout : comprendre le tissu économique normand. Une PME du Petit-Quevilly qui cherche à vendre dans Caen, Le Havre et Évreux a des besoins différents d'une startup parisienne qui veut scaler en Europe. La proximité géographique est un asset, à condition que l'agence en fasse vraiment quelque chose — pas juste une mention sur le site. Lisez aussi notre dossier sur les [différences entre une agence rouennaise et une agence parisienne](/blog/agence-digitale-rouen-vs-paris).",
        },
        {
          title: "Bonus : les questions à poser au premier RDV",
          content:
            "Récapitulatif des questions concrètes à poser à votre prochaine agence web à Rouen : (1) « Qui va coder le projet ? Puis-je leur parler maintenant ? » — (2) « Pouvez-vous m'envoyer un extrait de code anonymisé d'un projet récent ? » — (3) « Quel est votre SLA de réponse en cas de bug en production ? » — (4) « Que se passe-t-il après la livraison ? Quelle maintenance proposez-vous ? » — (5) « Quel projet avez-vous récemment refusé, et pourquoi ? » — (6) « Comment mesurez-vous le SEO d'un site que vous livrez ? Montrez-moi un cas concret. » — (7) « À combien de kilomètres se trouve votre dernier client ? ». Une agence qui répond précisément aux 7 questions est dans le top 10% du marché normand. Une qui esquive sur 3+ devrait vous inquiéter.",
        },
      ],
      conclusion:
        "Choisir une agence web à Rouen en 2026, ce n'est pas choisir le moins cher ni le mieux référencé sur Google. C'est choisir une équipe qui code vraiment, qui sait dire non, qui sera là dans 3 ans, et qui connaît le terrain normand. Si vous voulez en discuter pour votre projet — site internet, refonte, application mobile, logiciel sur mesure — [contactez-nous](/contact) ou découvrez [comment nous travaillons](/equipe). Premier échange offert, en présentiel à Rouen ou en visio. Et même si vous ne nous choisissez pas, on vous aide à formuler les bonnes questions à votre prochaine agence.",
    },
  },
  {
    slug: "prix-site-internet-rouen-2026",
    title: "Combien coûte un site internet à Rouen ? Tarifs réels d'une agence en 2026",
    excerpt:
      "De 500 € chez un freelance étudiant à 50 000 € chez une agence parisienne, les écarts sont énormes. On décortique les vrais prix d'un site internet à Rouen en 2026, avec la décomposition par poste et les coûts cachés qu'on ne vous dit jamais.",
    category: "Web",
    date: "13 mai 2026",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    featured: false,
    author,
    tags: ["Prix site internet Rouen", "Tarif agence web", "Devis web Normandie", "Budget refonte", "Coût site WordPress"],
    content: {
      introduction:
        "« Combien coûte un site internet ? » C'est LA question que toutes les PME normandes posent au premier RDV, et c'est celle qui reçoit les réponses les plus floues. Le marché web à Rouen présente des écarts de prix réels de 1 à 30 pour des projets en apparence similaires. Un site vitrine peut coûter 800 € chez un étudiant, 4 000 € chez un freelance senior, 12 000 € chez une agence digitale rouennaise, ou 35 000 € chez une boutique de design parisienne. Cet article explique d'où viennent ces écarts, avec la décomposition réelle des coûts pour les principaux types de projets, et liste les coûts cachés qui font exploser le budget après signature. Tous les chiffres sont des fourchettes observées sur le marché normand en 2026, hors TVA.",
      sections: [
        {
          title: "Site vitrine WordPress : 2 500 € à 7 000 €",
          content:
            "Le projet le plus courant à Rouen : un site vitrine de 6-15 pages avec un formulaire de contact et un blog. La fourchette honnête en 2026 : 2 500 € pour un site avec thème ThemeForest configuré (qualité moyenne, peu de personnalisation, faible SEO), 4 000-5 000 € pour un site avec thème custom basique (typo et identité respectées, SEO acceptable), 6 000-7 000 € pour un site avec thème WordPress 100% sur mesure (zéro page builder, code propre, SEO et Core Web Vitals optimisés). En dessous de 2 500 €, on parle de bricolage. Au-dessus de 8 000 € pour un site vitrine simple, on paie un overhead d'agence. Notre offre [WordPress Krealabs](/services/wordpress) se positionne dans la fourchette 4 000-7 000 € pour la majorité des projets vitrine — voir aussi notre article sur [pourquoi WordPress reste le bon choix en 2026](/blog/pourquoi-wordpress-reste-le-bon-choix-2026).",
        },
        {
          title: "Site e-commerce : 8 000 € à 25 000 €",
          content:
            "Un site e-commerce coûte structurellement plus cher car il intègre : catalogue produits, panier, paiement (Stripe, PayPal), gestion de stock, factures, expédition. Sur WooCommerce (extension WordPress), un projet B2C avec 50-500 produits coûte 8 000-15 000 € pour une boutique fonctionnelle, 15 000-25 000 € si on personnalise lourdement (filtres avancés, programme fidélité, intégrations avec votre logiciel de gestion). Sur Shopify (SaaS plus restrictif mais plus simple) : 5 000-12 000 € pour le setup + personnalisation, mais comptez 79-299$/mois de frais Shopify à vie. À Rouen, la majorité des PME e-commerce sous 500k€ de CA partent sur WooCommerce. Au-delà ou pour de la marketplace, on regarde Shopify Plus, Magento, ou du custom Next.js + Stripe. Voir notre comparatif [WooCommerce vs Shopify pour PME](/blog/woocommerce-vs-shopify-pme).",
        },
        {
          title: "Application SaaS / logiciel métier : 25 000 € à 150 000 €+",
          content:
            "Quand une PME normande passe du « site vitrine » au « j'ai besoin d'un outil métier custom », le budget change d'échelle. Un MVP SaaS B2B (login, dashboard, 2-3 fonctionnalités centrales) coûte typiquement 25 000-50 000 € à Rouen — en stack moderne (Next.js + Postgres + Stripe). Un logiciel métier complet (multi-utilisateurs, rôles, intégrations ERP/CRM, mobile responsive) entre 60 000 et 150 000 €. Une plateforme complexe (marketplace, multi-tenant, temps réel) au-delà de 150 000 € souvent. Le coût d'un logiciel sur mesure se mesure en jours-homme : compter 600-900 €/j à Rouen, 800-1 200 €/j à Paris. Pour 80 jours de dev (un MVP solide), on est à 50-70 000 €. Voir notre offre [développement web sur mesure](/services/developpement-web).",
        },
        {
          title: "Application mobile native (iOS + Android) : 30 000 € à 100 000 €",
          content:
            "Une app mobile coûte plus cher qu'un site web pour 3 raisons : 2 plateformes (iOS + Android, même en React Native il y a des spécificités), un back-end nécessaire (API + base de données), des contraintes UX strictes (Apple/Google validation, Human Interface Guidelines). Fourchettes 2026 : 30 000-50 000 € pour un MVP simple (5-8 écrans, authentification, 1-2 fonctionnalités centrales), 50 000-80 000 € pour une app fonctionnelle (15-25 écrans, paiements, notifications push, géolocalisation), 80 000-150 000 € pour une app complexe (offline, sync, intégrations). On code en React Native ([article sur l'état React Native 2026](/blog/react-native-2026-etat-des-lieux)), ce qui économise 30-40% vs natif Swift/Kotlin séparé. Voir [application mobile chez Krealabs](/services/applications-mobile).",
        },
        {
          title: "Refonte SEO d'un site existant : 4 000 € à 12 000 €",
          content:
            "Vous avez un site WordPress qui rame, qui est mal référencé, qui n'a pas été touché depuis 4 ans. Vous voulez le moderniser sans repartir de zéro. C'est l'objet du forfait refonte SEO : audit complet (technique, sémantique, expérience utilisateur), correction des Core Web Vitals, nettoyage des plugins inutilisés, optimisation du SEO on-page, mise à jour graphique modérée. Fourchette : 4 000-7 000 € pour une refonte légère (~3 semaines de travail), 8 000-12 000 € pour une refonte profonde (réécriture du thème, restructuration du contenu, 6-8 semaines). Au-dessus de 12 000 €, autant repartir d'un site neuf. Voir notre article [refonte WordPress sans perdre son SEO](/blog/refonte-wordpress-sans-perdre-seo).",
        },
        {
          title: "Ce qui fait réellement varier le prix",
          content:
            "À fonctionnalités égales, les écarts de prix entre agences à Rouen viennent de : (1) Le niveau de personnalisation graphique — un thème ThemeForest customisé prend 3 jours, un design Figma puis intégration custom prend 12 jours. (2) Le code custom vs page builder — Elementor permet de monter un site en 2 jours ; un thème WordPress en PHP/HTML/CSS prend 7-10 jours et offre une perf 3-5x supérieure. (3) Le SEO embarqué — un Yoast configuré, c'est 1h ; une structure complète (schema.org, Core Web Vitals, contenu optimisé), c'est 5-8 jours. (4) La rédaction des contenus — laissée au client ou prise en charge par l'agence (compter +1 000 à +3 000 €). (5) Les intégrations tierces — chaque CRM, ERP, ou outil métier ajoute 2-5 jours. (6) Le niveau de testing et la maintenance post-livraison.",
        },
        {
          title: "Les coûts cachés qu'on ne vous dit jamais",
          content:
            "Au-delà du devis initial, comptez : Hébergement (5-30 €/mois pour un site WordPress, 20-200 €/mois pour un Next.js / app — voir [Vercel vs OVH](/blog/vercel-vs-ovh-hebergement-2026)). Nom de domaine (12-20 €/an). Certificat SSL (souvent gratuit avec Let's Encrypt, mais payant chez certains hébergeurs : 80-200 €/an). Photos et illustrations (banques d'images Adobe Stock / Shutterstock : 30-200 €/mois ou packs). Plugins premium (ACF Pro 79$/an, Yoast Premium 99$/an, etc.). Maintenance ([forfait Krealabs](/services/wordpress) : 80-300 €/mois selon le périmètre). Rédaction de contenu si vous n'avez pas le temps (300-800 € par article rédigé professionnellement). Photographie pro pour vos visuels (700-2 500 € par shooting). Au total, sur les 3 premières années, prévoyez +30 à +50% du coût initial pour l'opérationnel.",
        },
        {
          title: "Maintenance annuelle : 600 € à 3 600 €/an",
          content:
            "C'est le poste que toutes les PME normandes sous-estiment. La maintenance d'un site internet à Rouen coûte en 2026 : (a) Maintenance light : 50-100 €/mois — MAJ WordPress + plugins, backups quotidiens, monitoring uptime, support email avec SLA 48h. Pour un site vitrine peu actif. (b) Maintenance évolutive : 200-400 €/mois — Idem + 1-3h de dev mineure incluses chaque mois pour ajustements, optimisations, créations de pages. Pour PME en croissance. (c) Maintenance premium : 600-1 200 €/mois — Idem + SEO continu (suivi positions, optimisations sémantiques), Analytics mensuels avec recommandations, support prioritaire SLA 4h. Pour entreprises dont le site est un canal d'acquisition critique. Voir notre offre [Performance & SEO Krealabs](/services/performance-seo).",
        },
      ],
      conclusion:
        "Le vrai prix d'un site internet à Rouen en 2026 dépend autant de ce qu'on met dedans que de ce qu'on continue à investir après. Un site à 4 000 € sans maintenance vaut moins qu'un site à 3 000 € avec un suivi serré. Avant de demander un devis, posez-vous d'abord : quel ROI ce site doit-il générer ? Quelle est la concurrence ? Quelle est ma capacité à le faire vivre ? Pour un cadrage budgétaire honnête sur votre projet, [contactez-nous](/contact) — on peut faire un échange gratuit pour estimer une fourchette réaliste sans vous engager. Lisez aussi nos [7 critères pour choisir une agence web à Rouen](/blog/choisir-agence-web-rouen-2026).",
    },
  },
  {
    slug: "agence-digitale-rouen-vs-paris",
    title: "Agence web à Rouen ou à Paris ? Le vrai bilan pour une PME normande",
    excerpt:
      "70% des PME normandes commencent par contacter une agence parisienne avant de revenir vers du local. Pourquoi ce détour, et pourquoi la majorité finit chez une agence rouennaise ? Comparatif honnête sur 8 axes concrets.",
    category: "Web",
    date: "13 mai 2026",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    featured: false,
    author,
    tags: ["Agence digitale Rouen", "Agence parisienne", "PME normandie", "TJM", "Tarifs agence web"],
    content: {
      introduction:
        "Vous êtes une PME normande — basée à Rouen, au Havre, à Évreux, à Caen — et vous cherchez une agence web pour refondre votre site, lancer une app mobile ou développer un logiciel métier. Premier réflexe quasi-systématique : contacter 2-3 agences parisiennes recommandées par votre réseau ou trouvées sur Google. C'est légitime — Paris concentre 60% de l'écosystème digital français. Mais après 2-3 RDV, beaucoup de dirigeants reviennent vers du local. Pourquoi ? Cet article compare objectivement « agence digitale à Paris » vs « agence web à Rouen » sur 8 axes concrets, avec des chiffres et des cas réels du marché normand. Spoiler : il y a de bonnes raisons d'aller à Paris dans certains cas, et de bonnes raisons de rester en Normandie dans d'autres.",
      sections: [
        {
          title: "1. Le coût horaire : 600 €/j à Rouen vs 800-1 200 €/j à Paris",
          content:
            "C'est l'écart le plus visible. Le TJM (taux journalier moyen) d'un développeur senior à Rouen tourne autour de 550-700 € en 2026. Le même profil à Paris facture 800-1 200 €. Sur un projet de 60 jours-homme, l'écart total est de 12 000 à 30 000 €. Pour une PME normande qui dispose d'un budget digital de 50 000 €, le rapport qualité/prix est nettement en faveur de Rouen — à expertise technique égale. Attention : il ne faut pas comparer un dev senior parisien à un dev junior rouennais. Mais à profils équivalents (ingénieur diplômé, 5-10 ans d'XP, stack moderne), le différentiel est mécanique : Paris a un coût de vie 35% supérieur, les agences doivent répercuter. À Krealabs, nos prix sont calibrés sur le marché normand, pas parisien.",
        },
        {
          title: "2. Présence terrain et déplacements gratuits",
          content:
            "Une agence digitale à Rouen peut se déplacer chez vous dans la journée pour : un kick-off projet, un workshop UX, un point d'avancement, un debug en présence de votre équipe. Compter 0 € de coût de déplacement pour les sites dans Rouen Métropole, 50-150 € si on doit se rendre à Caen, Évreux ou Le Havre. Une agence parisienne facture le déplacement (compter 500-800 € le AR Paris-Rouen en TGV + temps de trajet) ou le refuse, vous obligeant à monter à Paris. Sur 12 mois de projet, ça représente 6-15 déplacements potentiels. À Krealabs, on inclut systématiquement 2-3 réunions en présentiel par projet à Rouen, et plus si nécessaire — pas de surfacturation. C'est ce qui rend la collaboration vraiment fluide sur des projets >3 mois.",
        },
        {
          title: "3. Compréhension du marché normand et du tissu PME",
          content:
            "Une agence web rouennaise connaît votre écosystème : la CCI Rouen Métropole, FrenchTech Normandie, l'UNILASALLE, le Pôle Métropolitain Rouen-Seine-Eure, les zones d'activité (Petit-Quevilly, Saint-Étienne-du-Rouvray, Madrillet). Elle a souvent travaillé pour des entreprises de votre secteur en local — agroalimentaire normand, automobile (Renault Cléon), pharma (Sanofi), tourisme normand, services aux particuliers. Cette connaissance terrain rend les cadrages 2-3x plus rapides. Une agence parisienne va devoir « apprendre » votre marché — facturé. Et elle restera plus distante des codes culturels normands, ce qui transparaît parfois dans la communication finale. Lire aussi notre article sur le [SEO local pour PME normandes](/blog/seo-local-rouen-guide-pme).",
        },
        {
          title: "4. Réactivité et joignabilité",
          content:
            "Une agence parisienne avec 30 clients actifs gère les demandes en mode ticket. Vous envoyez un email, vous attendez 48-72h. Une agence rouennaise à taille humaine (5-10 personnes ou moins) répond généralement en quelques heures. À Krealabs, nous sommes 2 co-fondateurs développeurs, joignables directement sur WhatsApp pro, email, ou Slack partagé. Réponse moyenne en heures ouvrées : sous 2h. Cette différence se mesure concrètement quand votre site tombe à 16h un vendredi — l'agence parisienne traite ça lundi 10h, l'agence rouennaise vous appelle dans l'heure. Le différentiel de réactivité explose en cas d'incident production. Important pour des sites qui génèrent du CA — chaque heure de downtime coûte du chiffre.",
        },
        {
          title: "5. Le réseau local, levier SEO sous-estimé",
          content:
            "Pour ressortir sur « agence web Rouen », « plombier Rouen », « cabinet comptable Rouen » dans Google, le SEO local pèse énormément — backlinks depuis des sites locaux (CCI, presse locale, annuaires régionaux), citations cohérentes, fiche Google Business Profile optimisée. Une agence rouennaise a ce réseau préinstallé : Paris-Normandie, Tendance Ouest, FrenchWeb Normandie, annuaires CCI, partenariats avec autres prestataires locaux. Elle peut souvent obtenir un backlink local en passant un coup de fil — un avantage qu'aucune agence parisienne ne peut répliquer. Pour un site qui doit ressortir géographiquement sur Rouen, c'est un asset majeur. Voir notre [guide complet SEO local Normandie](/blog/seo-local-rouen-guide-pme).",
        },
        {
          title: "6. Les vrais cas où Paris est meilleur",
          content:
            "Honnêteté : Paris reste pertinente dans 3 cas. (a) Vous lancez une startup en levée de fonds avec ambition européenne — les agences premium parisiennes (BAM, Marmelab, Premier Octet) ont l'expérience scale-up et l'image qui rassure les investisseurs. (b) Votre projet exige une compétence ultra-spécialisée rare en région (Web3, ML/IA, formal verification crypto, infra fintech). À Rouen, ces profils sont rares ; à Paris, on les trouve plus facilement. (c) Vous avez un volume de projets à 6 chiffres récurrents et vous voulez une agence avec 30+ personnes pour pouvoir absorber la charge en parallèle. Une équipe à 2 ou 5 personnes en région ne couvre pas. Pour 85% des PME normandes (CA <10M€), aucun de ces 3 cas ne s'applique : Rouen est le bon choix.",
        },
        {
          title: "7. La fidélisation client : 3x meilleure en région",
          content:
            "Statistique observée sur notre portefeuille et celui de confrères : les clients d'agences parisiennes changent de prestataire tous les 2-3 ans en moyenne (turn-over commercial fort, perte du contact, augmentation des tarifs). Les clients d'agences rouennaises restent en moyenne 5-7 ans avec la même agence quand la relation est bonne. La proximité géographique et humaine crée une relation différente — vous croisez votre dev au resto, à la conférence locale, à l'événement CCI. Cette continuité réduit drastiquement les coûts de transition (chaque changement d'agence coûte 10-30 000 € en réapprentissage du contexte). Pour une PME qui pense long terme, c'est un avantage économique majeur.",
        },
        {
          title: "8. Penser local, livrer global : la vraie posture",
          content:
            "Le faux clivage Paris vs Rouen oublie l'essentiel : la qualité technique d'une agence web ne dépend plus de sa géographie. Tous les développeurs sérieux à Rouen utilisent les mêmes outils que ceux de Paris (Next.js, TypeScript, React, Stripe, Vercel), suivent les mêmes conférences, contribuent aux mêmes projets open source. La technologie a aplati la différence d'expertise géographique. Ce qui reste : la proximité, la relation, la connaissance du terrain. À Krealabs, on construit des produits qui tournent en Europe et au-delà, depuis Rouen, pour des clients normands mais aussi parisiens et internationaux. La devise : penser local (relation, terrain, fidélité) et livrer global (qualité technique de premier rang). Voir [notre équipe](/equipe) et [comment on travaille](/notre-histoire).",
        },
      ],
      conclusion:
        "Sortir du réflexe « pour faire bien, il faut Paris » est probablement le meilleur arbitrage qu'une PME normande peut faire en 2026. Pour la grande majorité des projets web (sites vitrine, e-commerce, refonte WordPress, applications mobile, logiciels métier), une agence digitale à Rouen offre 30-40% d'économies, 3x plus de proximité, et un niveau technique équivalent. Pour discuter de votre projet — site, app, logiciel — [prenez RDV avec nous](/contact) ou découvrez [comment on travaille](/equipe). Premier échange offert, en présentiel à Rouen ou en visio.",
    },
  },
  {
    slug: "pme-normandie-digitalisation-2026",
    title: "PME normandes : 10 leviers pour digitaliser votre activité en 2026",
    excerpt:
      "76% des PME normandes ont un site, mais seulement 22% l'utilisent comme un vrai outil commercial. Voici 10 leviers concrets pour transformer votre activité digitale en 2026, avec coûts et ROI réalistes.",
    category: "Web",
    date: "13 mai 2026",
    readTime: "16 min",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    featured: false,
    author,
    tags: ["Digitalisation PME", "Transformation digitale Normandie", "Outils PME", "Stratégie digitale Rouen"],
    content: {
      introduction:
        "Vous dirigez une PME en Normandie — peut-être à Rouen, au Havre, à Caen ou à Évreux. Votre site web tourne, votre fichier client est dans un Excel, votre prise de RDV se fait par téléphone, et votre dernière newsletter date d'il y a 8 mois. Vous savez qu'il faut « se digitaliser », mais par où commencer ? Cet article liste 10 leviers concrets, testés sur les PME normandes que nous accompagnons chez Krealabs, avec pour chaque levier : l'objectif, le coût estimé, le ROI typique, et la difficulté de mise en œuvre. Inspiré de cas réels — pas de la théorie marketing. À implémenter dans cet ordre, du plus impactant au plus subtil.",
      sections: [
        {
          title: "1. Auditer votre stack actuelle (1 jour, gratuit)",
          content:
            "Avant de digitaliser, faites l'inventaire : quels outils tournent aujourd'hui dans votre entreprise ? Cataloguez les abonnements (Microsoft 365, Adobe, hébergement, plugins WordPress, CRM, comptabilité). 80% des PME normandes que nous auditons découvrent qu'elles paient 2-5 outils inutilisés ou redondants. Vérifiez aussi : votre site WordPress est-il sur la dernière version ? Vos plugins critiques sont-ils maintenus ? Le SSL est-il actif ? Les emails sont-ils sécurisés (SPF, DKIM, DMARC) ? Un audit complet prend une journée et économise typiquement 1 500-3 000 €/an de souscriptions inutiles. Pour aller plus loin, voir notre [méthode d'audit Lighthouse](/blog/audit-lighthouse-methode-agence) et notre [checklist sécurité WordPress](/blog/securite-wordpress-checklist-2026).",
        },
        {
          title: "2. Refondre votre site avec une vraie stratégie SEO (4-12k €)",
          content:
            "Si votre site date de 2020 ou avant, il est probablement en mauvaise santé : Core Web Vitals médiocres, schema.org absent, pas de balises structurées, code obsolète. Une refonte avec stratégie SEO embarquée est l'investissement digital #1 pour une PME normande. Coût : 4 000-12 000 € selon la profondeur ([détail des prix ici](/blog/prix-site-internet-rouen-2026)). ROI typique : +40-150% de trafic organique sur 12 mois, +20-60% de leads issus du site. À Rouen, c'est le levier #1 pour ressortir dans le pack local Google. Voir notre offre [refonte SEO](/services/performance-seo) et l'article [refonte WordPress sans perdre son SEO](/blog/refonte-wordpress-sans-perdre-seo).",
        },
        {
          title: "3. Activer et optimiser Google Business Profile (3 jours, gratuit)",
          content:
            "C'est probablement le levier digital au meilleur ROI absolu — et 60% des PME normandes ne l'exploitent pas. Créer ou réclamer votre fiche Google Business Profile (ex Google My Business), la remplir intégralement (catégories précises, horaires, photos pro, services, posts hebdomadaires), demander 10-20 avis clients à 5 étoiles. Résultat : apparition dans le pack local Google (les 3 résultats avec carte affichés en tête de SERP) sur les requêtes « votre métier + Rouen / Le Havre / Caen ». Notre [guide complet SEO local Rouen](/blog/seo-local-rouen-guide-pme) détaille la méthode pas à pas. Une fiche bien optimisée gagne 2-4 places en 3 mois et génère 30-100 appels/mois pour une PME locale.",
        },
        {
          title: "4. Automatiser la prise de RDV (1k €, 4h installation)",
          content:
            "Si vous gérez des RDV (consultations, rendez-vous commerciaux, démos), le passage de l'agenda téléphonique au calendrier en ligne self-service est un game-changer. Outils : Calendly (8-16 $/mois, simple), Cal.com (open-source, 12$/mois), TidyCal (paiement unique 30$). Configuration : exposez vos créneaux disponibles, le client réserve directement, confirmation par email + Google Calendar + Zoom auto-créé. Gain de temps moyen : 8-15h/mois sur la gestion des RDV. Sur 12 mois, c'est 100-180h libérées pour du commerce. Pour les sites WordPress qui veulent intégrer le widget, c'est 4h de dev. À Krealabs, on installe ça en standard sur les sites de nos clients pro libéraux.",
        },
        {
          title: "5. Mettre en place un CRM minimal (300-1k €/an)",
          content:
            "Le fichier client dans Excel n'est plus tenable au-delà de 50 contacts actifs. Un CRM léger est l'épine dorsale de la digitalisation d'une PME normande. Outils recommandés en 2026 : HubSpot CRM (gratuit jusqu'à 1 000 contacts puis 18 €/mois utilisateur), Pipedrive (15-49 €/mois utilisateur, plus orienté pipeline commercial), Notion CRM (custom, 8-15 €/mois utilisateur, ultra-flexible mais demande du setup). La mise en place demande 2-4 jours de cadrage + 1-2 jours de formation équipe. Coût total annuel pour une PME de 5 personnes : 600-2 000 €. ROI : +25-40% de taux de conversion sur les opportunités, suivi pipeline en temps réel, fin des leads oubliés. C'est l'outil dont on regrette le plus de ne pas avoir équipé son entreprise plus tôt.",
        },
        {
          title: "6. Lancer une newsletter ciblée (200-500 €/mois)",
          content:
            "L'email marketing reste en 2026 le canal au meilleur ROI mesurable : 36 € de CA pour 1 € investi en moyenne (DMA 2025). Pour une PME normande, l'enjeu : transformer ses clients existants en clients récurrents, et ses prospects en clients. Outils : Brevo (ex-Sendinblue, made in France, 25-65 €/mois), Resend pour les emails transactionnels (gratuit jusqu'à 3 000/mois), MailerLite (premium 10-30 €/mois). Format gagnant : 1 newsletter / mois, courte (3-5 sections), actualités + cas client + ressource utile. Compter 3-5h de rédaction par envoi. Sur 12 mois : 8-12% de la liste devient acheteur récurrent. À démarrer dès que vous avez 200+ contacts qualifiés.",
        },
        {
          title: "7. Investir dans le contenu : blog + LinkedIn (2 articles/mois)",
          content:
            "Le contenu reste en 2026 le seul levier marketing qui composé sur la durée. Une PME normande qui publie 2 articles/mois sur son blog pendant 24 mois aura : +80-300% de trafic organique vs aucun blog, une autorité SEO bâtie sur ses mots-clés métier, des leads entrants quasi-gratuits. Format gagnant pour une PME : articles de 1 200-2 000 mots, ciblant des intentions locales (« meilleur restaurant Rouen », « comment choisir un comptable à Rouen », « guide pour entrepreneurs normands »). En parallèle : poster 2-3 fois/semaine sur LinkedIn avec votre prénom (pas la page entreprise). C'est ce que nous faisons sur le [blog Krealabs](/blog) — 30+ articles publiés en 18 mois. ROI mesurable au bout de 6-9 mois sur les positions Google.",
        },
        {
          title: "8. Mesurer ce qui compte (gratuit ou ~200 €/mois)",
          content:
            "Une PME qui ne mesure pas son digital pilote dans le noir. Outils incontournables en 2026 : Google Search Console (gratuit, indispensable pour le SEO — où vous êtes positionné, sur quoi, quels clics), Google Analytics 4 (gratuit, mais lourd à configurer), Vercel Web Analytics (légère, RGPD-compliant, 10 $/mois) ou Plausible (10 $/mois) pour le tracking respectueux de la vie privée, Hotjar (32-99 $/mois) pour les heatmaps et enregistrements de session. Reporting type pour une PME : un dashboard mensuel avec 6-8 KPIs (sessions, conversion form contact, top pages, top sources, position moyenne sur 5 mots-clés cibles, taux de rebond). 1h/mois suffit pour piloter. Sans mesure, impossible d'optimiser.",
        },
        {
          title: "9. Sécuriser la stack : RGPD, backups, 2FA (1-2k €)",
          content:
            "La cybersécurité PME est devenue critique. Selon l'ANSSI, les attaques sur les PME françaises ont triplé entre 2022 et 2025. Mesures à mettre en place : backups automatiques quotidiens (hors du serveur principal, ex : UpdraftPlus + Google Drive pour WordPress), 2FA sur tous les comptes admin (Google, banque, WordPress, hébergeur), gestionnaire de mots de passe partagé (1Password Business, 8 $/mois utilisateur), mise à jour automatique des plugins critiques, audit RGPD : registre de traitement, politique de confidentialité à jour ([template Krealabs ici](/legal/politique-confidentialite)), bandeau cookies conforme. Coût total : 1 000-2 500 € pour une mise en conformité initiale + 30-100 €/mois en outils. Voir notre [checklist sécurité WordPress](/blog/securite-wordpress-checklist-2026).",
        },
        {
          title: "10. Anticiper l'IA : la vague qui arrive dans 24 mois",
          content:
            "Les PME normandes qui auront intégré l'IA dans leurs process en 2027 auront 2-3 ans d'avance opérationnelle. À tester dès aujourd'hui : ChatGPT/Claude pour les premiers brouillons de communication, GitHub Copilot pour le code (gain de 30-50% de productivité dev), Notion AI / Gemini pour l'organisation de connaissances, Whisper pour la transcription automatique des réunions. Coût initial : ~50-200 €/mois par utilisateur. Formation équipe : 1-2 jours. Au-delà des outils grand public, des intégrations sur mesure (chatbot client, automatisation de devis, rédaction newsletter assistée IA) deviennent abordables pour les PME — c'est ce qu'on commence à intégrer sur certains projets Krealabs. Voir notre article sur [l'IA dans une agence digitale](/blog/ai-coding-claude-cursor-agence).",
        },
      ],
      conclusion:
        "Digitaliser une PME normande en 2026 n'a rien d'un grand chantier impressionnant : c'est une suite de petits leviers, activés dans le bon ordre, qui composent sur 18-24 mois. Commencer par l'audit (gratuit) et Google Business Profile (gratuit, ROI immédiat), puis monter en gamme vers la refonte SEO, le CRM, le contenu. Évitez le piège du « tout en même temps » — choisissez 2-3 leviers par trimestre. Pour cadrer ensemble une stratégie de digitalisation adaptée à votre PME, [contactez Krealabs](/contact) ou découvrez nos [services](/services). Premier échange offert, en présentiel à Rouen ou en visio.",
    },
  },

  // ===========================================================================
  // CALENDRIER ÉDITORIAL 2026 — Articles à publication différée (juin-novembre)
  // Le filtre getPublishedPosts() rend ces articles invisibles jusqu'à leur date.
  // Rythme : 2 articles/mois (le 1er et le 15).
  // ===========================================================================

  {
    slug: "refonte-wordpress-2026-methode-agence-rouen",
    title: "Refonte WordPress 2026 : la méthode complète d'une agence à Rouen",
    excerpt:
      "Pas juste un changement de design : une refonte WordPress sérieuse en 2026 c'est de l'audit, de la migration SEO sans pertes, et un thème custom qui dure 5 ans. La méthode que nous appliquons chez Krealabs sur chaque projet.",
    category: "WordPress",
    date: "1 juin 2026",
    readTime: "16 min",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80",
    featured: true,
    author,
    tags: ["Refonte WordPress", "Méthode agence", "Migration SEO", "Thème custom", "Rouen", "WordPress 2026"],
    content: {
      introduction:
        "Une refonte WordPress en 2026 ne se résume pas à \"changer le design\". À Rouen comme ailleurs, les sites WordPress qui ont 4-6 ans accumulent des problèmes : plugins obsolètes, thème basé sur un page builder bloated, Core Web Vitals médiocres, SEO en perte de vitesse, dette technique invisible. Une refonte sérieuse, c'est une opération chirurgicale en 6 phases qui touche au design, au code, à la stack et au SEO. Cet article décrit la méthode que nous appliquons chez Krealabs depuis 5 ans, après plusieurs dizaines de refontes WordPress pour des PME normandes.",
      sections: [
        {
          title: "1. Audit initial : qu'est-ce qu'on refait, qu'est-ce qu'on garde ?",
          content:
            "Avant toute ligne de code, on fait un audit complet du site existant. Trois dimensions : (1) Technique — version WP, plugins installés (souvent 25-50 sur un vieux site, dont 60% inutiles ou doublons), thème, hébergement, performances (Lighthouse, GTmetrix). (2) Contenu — quelles pages génèrent du trafic SEO, quelles requêtes elles classent, quelles URLs sont indexées vs orphelines (via Google Search Console). (3) Stratégique — quels parcours utilisateurs convertissent, quel positionnement éditorial, quelle voix. Cet audit dure 3-5 jours, livré sous forme d'un rapport PDF. C'est ce qui détermine ensuite si on fait une \"refonte légère\" (4-7k €) ou \"profonde\" (8-15k €).",
        },
        {
          title: "2. Cartographie des URLs et plan de redirection 301",
          content:
            "Le piège classique d'une refonte WordPress : changer la structure d'URLs sans plan de redirection. Résultat : -40% de trafic SEO en 4 semaines. Notre méthode : export complet des URLs existantes via Screaming Frog (ou Sitemap.xml + scrape), matching avec les nouvelles URLs cibles, et plan de redirection 301 systématique. Pour les sites avec 500-5000 URLs, on automatise le matching par règles regex quand possible. Les URLs qui n'ont pas d'équivalent direct redirigent vers la page la plus proche (parent, catégorie, ou homepage en dernier recours). On valide le plan AVANT la mise en ligne avec le client. Voir aussi notre [guide complet refonte WordPress sans perdre son SEO](/blog/refonte-wordpress-sans-perdre-seo).",
        },
        {
          title: "3. Choix de la stack : custom theme ou builder ?",
          content:
            "C'est la décision technique #1. Notre règle Krealabs : zéro page builder (Elementor, Divi, WPBakery) sur les projets sérieux. Les page builders ajoutent 300-800 KB de CSS/JS bloated, plombent Lighthouse, et créent une dette technique permanente (le site devient prisonnier du builder). Alternative : thème WordPress custom en PHP + Tailwind + ACF Pro pour les content types, qui livre Lighthouse 90+ avec un effort raisonnable. Pour les projets premium ou les sites qui doivent ressembler à un Next.js moderne : WordPress headless (WP backend + Next.js frontend), voir [notre lexique sur le headless](/lexique/headless-wordpress). Coût additionnel headless : +30-50% mais perf et UX au niveau d'un SaaS.",
        },
        {
          title: "4. Maquettes Figma : la phase qu'on ne peut pas brûler",
          content:
            "Cette étape paraît cosmétique. Elle ne l'est pas. C'est ici qu'on cadre 80% des décisions structurelles : nombre de pages, contenu type par page, micro-interactions, design system. On livre toutes les pages clés en haute-fidélité (HF) sur Figma, validées en 2-3 cycles avec le client avant que le dev démarre. Brûler cette phase = corrections coûteuses pendant le dev. On ne démarre pas le code tant que les maquettes ne sont pas validées à 100%. Pour les refontes d'envergure : 8-15 jours de design. Pour les refontes plus légères : 3-5 jours. À noter : on n'utilise jamais de templates Figma achetés — l'identité visuelle est custom à chaque projet.",
        },
        {
          title: "5. Développement : sprints + démos hebdomadaires",
          content:
            "Une fois les maquettes validées, on entre en sprints de dev. Notre méthode : sprints d'une semaine, démo client en fin de chaque sprint (15-30 minutes en visio), feedback structuré. Pour une refonte type, compter 6-10 sprints (6-10 semaines de dev). Pendant les sprints : code review entre Maxime et Romain sur chaque PR, tests Lighthouse sur les pages clés à chaque étape (objectif 90+ tout le long, pas seulement à la fin), staging Vercel preview pour validation client. Côté technique : thème WordPress custom en PHP/HTML/CSS, ACF Pro pour les contenus, gulp/vite pour les assets, pas d'Elementor.",
        },
        {
          title: "6. Migration & mise en ligne : la phase critique",
          content:
            "Tout se joue ici. Notre checklist en 12 points : (1) backup complet du site existant, (2) staging final validé, (3) plan de redirection 301 importé via Redirection plugin, (4) certificat SSL vérifié, (5) sitemap.xml généré et soumis à GSC, (6) schema.org Article + LocalBusiness vérifié sur 5 pages clés, (7) tests sur 3 devices (desktop/tablet/mobile) en 4 navigateurs, (8) tests des formulaires (contact, newsletter, etc.) avec envoi réel, (9) Core Web Vitals validés sur PageSpeed Insights, (10) Google Business Profile mis à jour, (11) annonce client (newsletter, LinkedIn), (12) monitoring sur les 7 premiers jours pour détecter régressions SEO. Si tout est OK, on délivre.",
        },
        {
          title: "7. Maintenance post-livraison : penser long terme",
          content:
            "Un site WordPress livré sans maintenance dure 18-24 mois avant de tomber en obsolescence : plugins non mis à jour, faille sécurité, version PHP qui passe en EOL. Sur tous nos projets Krealabs, on propose un forfait maintenance dès la livraison : (a) Light 80-150 €/mois — MAJ WP/plugins, backups, monitoring uptime. (b) Évolutive 200-400 €/mois — Idem + 1-3h de dev mineure incluses chaque mois. (c) Premium 600-1200 €/mois — Idem + SEO continu, analytics mensuels, support SLA 4h. Sans maintenance, votre investissement de refonte (4-15k €) perd 30% de sa valeur par an. Avec, il vit confortablement 5-7 ans.",
        },
        {
          title: "Récapitulatif : combien de temps et combien ça coûte",
          content:
            "Refonte WordPress légère (~6 pages, contenu existant, design custom simple) : 4 000-7 000 €, 4-6 semaines. Refonte WordPress profonde (10-20 pages, custom post types ACF, design haut de gamme) : 8 000-15 000 €, 8-12 semaines. Refonte vers WordPress headless (WP backend + Next.js frontend) : 18 000-35 000 €, 10-16 semaines. Ces fourchettes incluent : audit, maquettes Figma, dev, migration SEO, formation, garantie 30 jours post-livraison. Hors maintenance (à partir de 80 €/mois). Pour cadrer votre projet précis, voir notre [calculateur de devis](/calculateur) ou [contactez-nous](/contact) pour un premier échange.",
        },
      ],
      conclusion:
        "Une refonte WordPress sérieuse à Rouen en 2026 n'est plus un projet \"on refait le site et c'est bon\" — c'est un investissement long terme qui doit suivre une méthode rigoureuse. Audit, redirections, design custom, dev sans page builder, migration propre, maintenance évolutive : c'est cette chaîne complète qui fait la différence entre un site qui dure 18 mois et un site qui dure 5-7 ans. À Krealabs, nous refusons les projets où le budget ne permet pas cette méthode (un client mécontent qui revient 8 mois après est plus coûteux qu'un client qu'on refuse poliment). Pour discuter de votre refonte, [prenez rendez-vous](/contact) — premier échange offert. Voir aussi nos [services WordPress](/services/wordpress) et [SEO local Rouen](/blog/seo-local-rouen-guide-pme).",
    },
  },

  {
    slug: "react-19-production-bilan-1-an",
    title: "React 19 en production : bilan honnête après 1 an d'usage",
    excerpt:
      "12 mois après la stable, qu'est-ce qui marche, qu'est-ce qui pique encore avec React 19 ? Server Components, Suspense, Actions : retours d'expérience d'une agence qui a migré 5 projets clients.",
    category: "Web",
    date: "15 juin 2026",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80",
    featured: false,
    author,
    tags: ["React 19", "Server Components", "Suspense", "Actions", "Next.js", "Production"],
    content: {
      introduction:
        "React 19 est sorti stable en décembre 2024. Un an et demi plus tard, qu'est-ce qu'on en pense en agence après 5 projets clients migrés ? Server Components, Actions, hooks `use()`, optimizations automatiques : il y a du génie et il y a des frottements. Cet article fait le bilan honnête, sans hype et sans bashing, après 1 an et demi d'usage en production sur des projets PME et SaaS.",
      sections: [
        {
          title: "Server Components : la feature qui change tout (ou presque)",
          content:
            "Les Server Components sont, sans exagération, la feature React la plus impactante depuis l'introduction des hooks en 2018. Sur nos projets, on observe : -30 à -60% de JS bundle envoyé au client (selon le pourcentage de composants qu'on peut basculer en RSC), Lighthouse 95+ accessible par défaut, possibilité d'utiliser Prisma / fetch / fs directement dans les composants sans backend séparé. Le mental model demande un ajustement : par défaut tout est Server Component, on opt-in avec `\"use client\"` quand on a besoin d'interactivité, d'état, ou d'effets. Voir [notre article dédié](/blog/react-19-server-components-pratique).",
        },
        {
          title: "Actions + useFormState : adieu les API routes pour 80% des cas",
          content:
            "Les Server Actions (`\"use server\"`) couplées au hook `useFormState` éliminent une grosse partie du code boilerplate API + fetch + state management côté client. Pour les formulaires CRUD typiques (contact form, signup, update profile), on passe de ~80 lignes de code à ~30. Trade-off : c'est lié au framework (Next.js), pas portable, et le debug est plus complexe car le code s'exécute côté serveur sans logs JS classique. Notre règle : Actions pour les workflows simples form-driven, API routes classiques quand on a besoin d'un endpoint public ou consommé par mobile/external.",
        },
        {
          title: "Suspense : enfin mature pour le streaming",
          content:
            "Suspense existait depuis React 16 mais n'était vraiment utilisable que depuis 18+ pour le streaming SSR. En React 19, c'est polished : on peut wrap n'importe quel composant async dans `<Suspense fallback={<Skeleton />}>` et le contenu se révèle progressivement. Combiné avec les RSC, ça permet de servir le shell de page (header, nav, sidebar) instantanément, puis de stream le contenu lourd (dashboards, listes paginées) à mesure qu'il arrive. Sur un SaaS B2B qu'on a migré, le LCP est passé de 2.8s à 1.1s grâce à Suspense streaming.",
        },
        {
          title: "useOptimistic + form transitions : UX premium accessible",
          content:
            "Le hook `useOptimistic` permet de simuler instantanément la réponse serveur (optimistic update) et de gérer le rollback proprement si l'opération échoue. Combiné avec `useTransition` pour les loading states, on obtient une UX premium type Linear/Notion sans bibliothèque tierce (vs SWR mutation ou TanStack Query optimistic). Cas d'usage typique : like button, ajout au panier, toggle d'état. Avant React 19, ça demandait 30-50 lignes de gestion d'état manuelle ; maintenant 10 lignes.",
        },
        {
          title: "Les frictions : debug RSC + écosystème qui rattrape",
          content:
            "Tout n'est pas rose. (1) Le debug des Server Components est plus dur : pas de DevTools React côté serveur, console.log dans le terminal Next.js, pas dans le browser. Demande une discipline particulière. (2) L'écosystème React (libraries tierces) met du temps à supporter RSC. Beaucoup de bibliothèques (charts, animations, formulaires complexes) sont encore Client-Component-only. (3) Le tooling TypeScript autour des Server Actions a quelques rough edges (types des arguments / retour à expliciter manuellement). (4) Les patterns émergents (data fetching, mutations, caching) ne sont pas encore standardisés — chaque projet réinvente un peu sa stack.",
        },
        {
          title: "Migration depuis React 18 : combien ça coûte ?",
          content:
            "Pour un projet existant React 18 + Next.js Pages Router, la migration vers React 19 + App Router est un chantier sérieux. Notre expérience sur 3 migrations clients : 4-8 semaines selon la taille du projet, refactor de 30-60% du code (composants en Server Components, hooks adaptés, fetch patterns réécrits). Pour les projets neufs : démarrer directement en RSC, plus rapide qu'avant. Conseil agence : ne pas migrer pour migrer. Un projet React 18 + Pages Router qui marche bien peut rester dessus. La migration se justifie quand on veut profiter spécifiquement de RSC, Streaming, ou Actions.",
        },
        {
          title: "Verdict après 1 an et demi",
          content:
            "React 19 est, à notre avis, la version la plus importante depuis 16.8 (introduction des hooks). Les Server Components changent la façon dont on architecture les apps. Pour un projet neuf en 2026 : démarrer directement React 19 + Next.js App Router est le choix par défaut. Pour les projets existants en bonne santé : pas urgent, migrer quand le besoin se présente. Toutes nos nouvelles missions clientes Krealabs depuis mi-2025 sont en React 19 — pas un seul retour en arrière, et les Lighthouse parlent d'eux-mêmes (95+ sur 90% des pages).",
        },
      ],
      conclusion:
        "React 19 tient ses promesses. Pas une révolution sans bug ni courbe d'apprentissage, mais un saut qualitatif qui réduit drastiquement le bundle, améliore l'UX (streaming, optimistic) et simplifie le code (Actions). Pour un nouveau projet : foncez. Pour une migration : pas urgent mais à planifier dans les 12 prochains mois. Voir aussi [notre stack Next.js](/technologies/nextjs), nos [services développement web custom](/services/developpement-web), et notre [comparateur Next.js vs WordPress](/comparateur/nextjs-vs-wordpress) pour cadrer le bon choix. Pour discuter de votre projet en React 19, [prenez RDV avec nous](/contact).",
    },
  },

  {
    slug: "delais-livraison-site-wordpress",
    title: "Combien de temps pour livrer un site WordPress ? Le vrai planning d'un projet",
    excerpt:
      "Vous pensez qu'un site WordPress se livre en 2 semaines ? Avec du sérieux, comptez 4-12 semaines selon la complexité. Le détail du planning agence, semaine par semaine, sans bullshit commercial.",
    category: "WordPress",
    date: "1 juillet 2026",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80",
    featured: false,
    author,
    tags: ["WordPress", "Délais site internet", "Planning projet", "Gestion projet", "Agence web Rouen"],
    content: {
      introduction:
        "« Vous me livrez ça en combien de temps ? » C'est la question 2 après le prix dans tous les premiers RDV. La réponse honnête est : ça dépend, mais pas autant qu'on le dit. Un site WordPress vitrine sérieux se livre en 4-6 semaines. Un site complexe avec WooCommerce et intégrations en 8-12 semaines. Tout ce qui est promis à 2-3 semaines avec qualité, c'est du marketing. Cet article décrit le vrai planning semaine par semaine de nos projets WordPress chez Krealabs, pour que vous puissiez calibrer vos attentes.",
      sections: [
        {
          title: "Semaine 1 — Cadrage & briefs",
          content:
            "Avant de coder une ligne, on cadre. Réunion de kick-off (1-2h), brief détaillé du client sur sa cible, ses objectifs, sa concurrence. Définition du scope précis : nombre de pages, fonctionnalités, contenus à intégrer, intégrations tierces. Validation du périmètre, des deliverables et du planning. Compte aussi : récupération des accès (hébergement actuel, nom de domaine, comptes Google, etc.) et démarrage du collecte de contenus (textes, photos). Si les contenus ne sont pas prêts à la fin de semaine 1, ça décale tout. C'est le piège #1 sur les projets clients : le contenu qui traîne.",
        },
        {
          title: "Semaines 2-3 — Maquettes Figma haute-fidélité",
          content:
            "Phase design. On livre une première salve de maquettes (homepage + 2-3 pages clés) en haute-fidélité Figma. Validation client en 24-48h, retours, ajustements. Deuxième salve : pages secondaires (services, contact, mentions légales, etc.). Validation. Cycle de retouches : 2-3 rounds maximum, sinon on dérive. À la fin de la semaine 3, les maquettes sont validées à 100% — pas un détail ne bouge ensuite. C'est la condition pour démarrer le dev. Brûler cette phase = corrections coûteuses pendant le dev (multiplie le coût total par 1.3-1.5x).",
        },
        {
          title: "Semaines 4-5 — Développement thème WordPress",
          content:
            "Création d'un thème WordPress custom from scratch. PHP, HTML, Tailwind CSS, JS minimal. Setup ACF Pro pour les custom post types et les blocs flexibles. Intégration des pages au pixel près selon les maquettes Figma. À la fin de semaine 4 : structure complète + intégration desktop des pages clés. Semaine 5 : responsive mobile/tablet, animations légères, intégration des contenus du client. Démo client mi-parcours pour valider l'orientation. Toute correction graphique demandée hors maquettes initiales = ticket additionnel (sinon dérive infinie).",
        },
        {
          title: "Semaine 6 — Optimisations, SEO, tests",
          content:
            "Phase finition technique. Optimisation Core Web Vitals (objectif Lighthouse 90+ sur toutes les pages clés), compression images (AVIF/WebP), lazy loading, audit accessibilité (contraste, ARIA, navigation clavier). Configuration SEO on-page : balises title/meta, schema.org Article et Organization, sitemap.xml, robots.txt. Tests cross-browser (Chrome, Safari, Firefox, Edge). Tests responsive (mobile / tablet / desktop / wide). Tests des formulaires avec envoi réel d'emails. Préparation du staging final pour validation client.",
        },
        {
          title: "Semaine 7 — Migration & mise en ligne",
          content:
            "Si c'est une refonte d'un site existant : plan de redirection 301 importé, ancien site backup, migration DNS, configuration SSL, et redirections 301 testées. Si c'est une création from scratch : configuration domaine, hébergement, SSL Let's Encrypt automatique. Formation du client à l'admin WordPress (1-2h en visio) : comment créer une page, modifier des contenus, ajouter un article de blog. Documentation écrite. Mise en ligne validée par le client. Monitoring 7 jours pour détecter les régressions SEO ou les bugs prod.",
        },
        {
          title: "Les facteurs qui décalent le planning",
          content:
            "Sur 50+ projets, voici les causes #1 de décalage (par ordre de fréquence) : (1) Contenus du client en retard — pas de textes/photos = pas de mise en ligne. Mitigation : on collecte au plus tôt et on documente clairement les manques. (2) Retours sur les maquettes étirés dans le temps — le client repousse les validations à \"plus tard\". Solution : deadline de validation max 5 jours ouvrés. (3) Scope creep — \"juste une petite fonctionnalité en plus\". On le facture comme un change request, jamais en silence. (4) Intégrations tierces qui buggent (CRM, ERP, paiement) — on prend une marge de 1 semaine sur tout projet avec intégration externe. (5) Indisponibilité du décisionnaire — on bloque les RDV de validation à l'avance dans son agenda.",
        },
        {
          title: "Délais types par typologie de projet",
          content:
            "Site vitrine WordPress simple (6-10 pages, contenus fournis, design custom basique) : 4-5 semaines. Site WordPress vitrine premium (12-20 pages, design poussé, intégrations CRM/analytics) : 6-8 semaines. Site WordPress + WooCommerce (boutique 50-300 produits, paiement Stripe, transporteurs) : 8-10 semaines. Refonte WordPress majeure (site existant 4-6 ans, contenu volumineux à migrer) : 8-12 semaines. WordPress headless (WP backend + Next.js frontend) : 10-14 semaines. Multilingue : +25% sur la durée. Voir aussi [notre article sur les prix](/blog/prix-site-internet-rouen-2026) pour calibrer le budget.",
        },
      ],
      conclusion:
        "Un site WordPress sérieux ne se livre pas en 2 semaines. Les agences qui promettent ça soit utilisent des templates clé-en-main (qualité médiocre), soit sacrifient la phase design ou les tests (sites bugués à la mise en ligne). 4-6 semaines pour un vitrine, 8-12 pour un site complexe, c'est le rythme honnête. Si vous voulez plus court, il faut accepter de réduire le scope (moins de pages, moins de personnalisation). Pour calibrer ensemble votre planning, [contactez Krealabs](/contact) ou utilisez notre [calculateur](/calculateur). Voir aussi notre [méthode refonte WordPress](/blog/refonte-wordpress-2026-methode-agence-rouen) et notre [comparateur WordPress vs Webflow](/comparateur/wordpress-vs-webflow).",
    },
  },

  {
    slug: "stripe-billing-saas-b2b-guide",
    title: "Stripe Billing pour SaaS B2B : le guide complet 2026",
    excerpt:
      "Stripe Billing est devenu le standard de fait pour les SaaS B2B. Plans, trials, prorata, dunning, factures auto : tout ce qu'il faut savoir pour intégrer proprement, par une agence qui en code 2-3 par an.",
    category: "Outils",
    date: "15 juillet 2026",
    readTime: "16 min",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1200&q=80",
    featured: false,
    author,
    tags: ["Stripe Billing", "SaaS B2B", "Abonnements", "Paiement en ligne", "Stripe", "Facturation"],
    content: {
      introduction:
        "Si vous lancez un SaaS B2B en 2026, vous allez utiliser Stripe Billing. C'est devenu le standard de fait pour la facturation récurrente : Notion, Linear, Vercel, Resend, Plausible — tous l'utilisent. Cet article couvre tout ce qu'il faut savoir pour intégrer proprement Stripe Billing dans votre SaaS, après plusieurs intégrations clients chez Krealabs. Code, webhooks, gestion des cas limites, dunning, factures conformes. Long et technique mais c'est pour ne plus chercher 20 articles sur Stack Overflow.",
      sections: [
        {
          title: "Stripe Billing : qu'est-ce qu'on obtient (et ne pas)",
          content:
            "Stripe Billing = brique facturation récurrente au-dessus de Stripe Payments. Ce que vous obtenez : création de plans tarifaires (Products + Prices), gestion d'abonnements (Subscriptions), trials, upgrades/downgrades avec prorata automatique, dunning (relance automatique en cas d'échec de paiement), Customer Portal hébergé par Stripe pour gérer son abonnement, factures HTML/PDF générées automatiquement avec mentions légales FR. Ce que vous N'obtenez PAS : pas de gestion de l'usage metering complexe (chargement à la consommation = à coder soi-même), pas de gestion fine des coupons inter-pays, pas de comptabilité analytique avancée.",
        },
        {
          title: "Setup initial : Products, Prices, et leur structure",
          content:
            "La hiérarchie Stripe Billing : un Product est un plan tarifaire (ex: \"Starter\", \"Pro\", \"Enterprise\"), un Price est une variante de prix attachée à un Product (mensuel vs annuel, par utilisateur vs flat). On définit tout dans le Dashboard Stripe OU via l'API. Notre recommandation pour les SaaS naissants : 3 Products max (Free / Pro / Business), 2 Prices chacun (mensuel / annuel avec ~17% de remise). Au-delà de 3 plans, vous compliquez l'UX d'inscription pour rien. Utiliser `lookup_key` sur les Prices pour pouvoir les récupérer programmatiquement sans hardcoder les IDs (`price_xxx`) dans le code.",
          code: `// Récupérer un Price par lookup_key (plus stable qu'un ID hardcodé)
const prices = await stripe.prices.list({
  lookup_keys: ['pro_monthly', 'pro_yearly'],
  expand: ['data.product'],
});`,
        },
        {
          title: "Checkout flow : Stripe Checkout vs Embedded",
          content:
            "Deux options pour l'inscription payante : (1) **Stripe Checkout** : redirection vers une page hébergée par Stripe, ultra-simple à intégrer (3 lignes de code), gère 3D Secure / Apple Pay / Google Pay nativement, hautement convertissant. Notre choix par défaut pour 80% des SaaS. (2) **Embedded Checkout** ou **Payment Element** : formulaire intégré dans votre interface, contrôle UX total. À utiliser quand vous voulez une expérience 100% sur votre domaine ou des champs custom (entreprise, SIRET pour facturation FR). Compter +3-5 jours de dev en plus.",
          code: `// Stripe Checkout - flow le plus simple
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  payment_method_types: ['card'],
  line_items: [{ price: priceId, quantity: 1 }],
  customer_email: user.email,
  success_url: \`\${origin}/dashboard?welcome=true\`,
  cancel_url: \`\${origin}/pricing\`,
  // Pour les SaaS FR : capturer adresse pour factures
  customer_creation: 'always',
  billing_address_collection: 'required',
});
return Response.redirect(session.url, 303);`,
        },
        {
          title: "Webhooks : la partie qu'on ne peut pas brûler",
          content:
            "Stripe envoie des webhooks à votre app pour chaque événement (`customer.subscription.created`, `invoice.payment_failed`, `subscription.deleted`...). Sans webhook handler, votre base de données ne sait pas qu'un user a payé, annulé, ou été dunné. Les événements critiques à gérer : `checkout.session.completed` (création abonnement post-paiement), `invoice.payment_succeeded` (renouvellement OK, prolonger l'accès), `invoice.payment_failed` (paiement échoué, downgrade graceful), `customer.subscription.deleted` (annulation, supprimer accès). Sécuriser le webhook avec la signature HMAC envoyée par Stripe — sinon n'importe qui peut spoofer.",
          code: `// Validation signature webhook (Next.js Route Handler)
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature')!;
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new Response('Bad signature', { status: 400 });
  }
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutComplete(event.data.object);
      break;
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object);
      break;
    // ... autres handlers
  }
  return new Response(null, { status: 200 });
}`,
        },
        {
          title: "Gestion des cas limites : trials, upgrades, prorata",
          content:
            "**Trials** : créer la subscription avec `trial_period_days: 14`. Stripe ne charge pas pendant la période ; à J+14, premier paiement automatique. Si la carte fail → événement `invoice.payment_failed`. **Upgrades/downgrades** : avec `proration_behavior: 'create_prorations'`, Stripe calcule automatiquement le crédit/débit prorata. Le user en cours de mois qui upgrade Pro → Business paie immédiatement la différence prorata pour le reste du mois. **Annulation** : `cancel_at_period_end: true` (recommandé) laisse l'accès jusqu'à la fin du cycle payé. `cancel_at_period_end: false` coupe immédiatement et émet un remboursement prorata.",
        },
        {
          title: "Customer Portal : ne réinventez pas ce qui existe",
          content:
            "Stripe propose un Customer Portal hébergé : page où vos clients gèrent leur abonnement (changer de plan, mettre à jour CB, télécharger factures, annuler). Vous n'avez QUE besoin de leur fournir un lien — Stripe gère tout, conformément aux régulations (RGPD, droit consommateur, conformité FR). Notre recommandation : 100% des SaaS Krealabs utilisent le Customer Portal au lieu de coder une UI custom. Configurer dans Dashboard Stripe : quels plans sont upgradeables, autoriser ou non l'annulation immédiate, mentions légales custom.",
          code: `// Génère un lien Customer Portal pour un user connecté
const session = await stripe.billingPortal.sessions.create({
  customer: user.stripeCustomerId,
  return_url: \`\${origin}/dashboard/billing\`,
});
return Response.redirect(session.url);`,
        },
        {
          title: "Conformité FR : TVA, factures, mentions légales",
          content:
            "Pour un SaaS facturant en France ou EU : (1) Activer **Stripe Tax** (0.5% sur les transactions taxées) qui calcule TVA automatiquement selon pays + type client (B2C, B2B avec VAT EU). Sans Stripe Tax, vous devez gérer la TVA manuellement — déconseillé au-delà de 50 clients. (2) Factures Stripe ont mentions légales auto-générées : votre raison sociale, SIRET, TVA intracom + celles du client. Activer dans Settings > Tax. (3) Pour B2B EU : `tax_id_data` sur le Customer pour qu'il rentre son VAT, Stripe applique le mécanisme d'autoliquidation automatiquement.",
        },
      ],
      conclusion:
        "Stripe Billing est devenu indispensable pour un SaaS B2B sérieux. Compter 3-5 jours de dev pour une intégration MVP propre (checkout + webhooks + Customer Portal + Stripe Tax), 1-2 semaines pour une intégration premium avec custom invoicing, multi-currency, et metering. Sur les SaaS Krealabs, c'est la première brique qu'on met en place après l'auth — sans monétisation, pas de SaaS. Pour intégrer Stripe Billing sur votre projet, [contactez-nous](/contact). Voir aussi notre [comparateur Stripe vs PayPal](/comparateur/stripe-vs-paypal), notre [lexique sur Stripe](/lexique/stripe), et nos [services développement web](/services/developpement-web).",
    },
  },

  {
    slug: "pme-normandes-digital-2026-cas-clients",
    title: "10 PME normandes qui ont misé sur le digital en 2026",
    excerpt:
      "10 retours d'expérience anonymisés de PME en Seine-Maritime, Calvados et Eure qui ont franchi le pas digital cette année. Refontes, e-commerce, apps : les chantiers concrets et les résultats mesurés.",
    category: "Web",
    date: "1 août 2026",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=80",
    featured: false,
    author,
    tags: ["PME Normandie", "Cas clients", "Transformation digitale", "Rouen", "Le Havre", "Caen", "Évreux"],
    content: {
      introduction:
        "L'été 2026 est un moment propice pour faire le bilan des projets digitaux PME en Normandie. Cet article présente 10 retours d'expérience anonymisés (NDA oblige) issus de notre portefeuille Krealabs ou de confrères locaux, couvrant Rouen, Le Havre, Caen et Évreux. Chaque cas inclut le contexte initial, les chantiers digitaux engagés, et les résultats mesurés. Objectif : montrer aux dirigeants de PME normandes ce qui marche concrètement en 2026, hors blabla marketing.",
      sections: [
        {
          title: "Cas 1 — Cabinet d'avocats à Rouen (15 collaborateurs)",
          content:
            "**Contexte :** Site WordPress 2018, plus mis à jour depuis 4 ans, conforme ni Yoast SEO ni au RIN actuel. Aucune génération de leads digital, tout passe par bouche-à-oreille. **Chantier :** refonte complète en 6 semaines, thème custom avec ACF, pages dédiées par spécialité (droit du travail, droit des affaires, etc.). Schema LegalService. **Résultat :** 6 mois après, 14 nouveaux clients sont arrivés via le site (vs 0 auparavant). Conversion 2.3% sur la page contact. CTR Google +85% sur les requêtes \"avocat droit du travail Rouen\".",
        },
        {
          title: "Cas 2 — Boulangerie premium au Havre (3 boutiques)",
          content:
            "**Contexte :** Pas de site, présence Instagram seulement. Le dirigeant voulait ouvrir une 4e boutique et avait besoin d'un site pour rassurer banques et investisseurs sur la \"professionnalisation\". **Chantier :** site vitrine WordPress en 4 semaines, fiche Google Business optimisée pour chaque boutique, photos pro, intégration Instagram en galerie. **Résultat :** la banque a validé le prêt expansion (le site a pesé dans la décision selon le banquier), +30% de followers Instagram via les liens croisés, file d'attente le samedi matin doublée en 6 mois.",
        },
        {
          title: "Cas 3 — Atelier mécanique à Évreux (8 employés)",
          content:
            "**Contexte :** Garage spécialisé véhicules anciens et de prestige, clientèle vieillissante, pas de relève dans la clientèle 30-50 ans. **Chantier :** site WordPress avec catalogue véhicules en stock, formulaire de pré-devis (type véhicule + symptôme + urgence), SEO local sur \"garage Évreux\" et requêtes spécialisées (\"révision Porsche Évreux\"). **Résultat :** +400% de demandes de devis en 8 mois, dont 60% de la nouvelle cible 30-50 ans. Le dirigeant a embauché un mécanicien supplémentaire en avril 2026.",
        },
        {
          title: "Cas 4 — Conserverie artisanale en Calvados (12 employés)",
          content:
            "**Contexte :** Produits du terroir (rillettes, terrines, conserves), vente sur les marchés et 2 magasins. Aucun e-commerce. Demande croissante de touristes pour expédier. **Chantier :** site e-commerce WooCommerce en 8 semaines, intégration Stripe + Mondial Relay + Colissimo, photos produits pro. **Résultat :** premier mois : 800 € de CA en ligne. 6 mois plus tard : 8 500 €/mois de CA e-commerce, devenu le 3e canal de vente après les marchés et le magasin de Caen. Investissement initial rentabilisé en 9 mois.",
        },
        {
          title: "Cas 5 — Cabinet comptable à Rouen (6 experts-comptables)",
          content:
            "**Contexte :** Site WordPress 2020 honnête mais sans portail client, échanges de documents par email (risque RGPD), surcharge administrative. **Chantier :** ajout d'un espace client custom avec login, upload sécurisé de documents (HDS), accès historique bilans/factures. **Résultat :** -40% de temps passé sur les échanges email basiques, satisfaction client en hausse mesurée (NPS +18 points), gain de productivité utilisé pour prendre 3 nouveaux clients sans embaucher.",
        },
        {
          title: "Cas 6 — Startup tech à Rouen (lancement MVP)",
          content:
            "**Contexte :** 2 fondateurs sortis d'école d'ingé, idée de SaaS B2B (gestion d'événements pour collectivités), pas de tech maison. **Chantier :** MVP en 10 semaines (Next.js + Postgres Neon + Stripe Billing + NextAuth), 6 fonctionnalités clés. **Résultat :** 12 collectivités normandes ont signé un contrat dans les 6 mois post-lancement (5 villes, 4 communautés de communes, 3 conseils départementaux régionaux). Levée de fonds (seed) en cours d'écriture grâce aux premières metrics. La startup tourne en autonomie depuis (Krealabs intervient en mode maintenance évolutive).",
        },
        {
          title: "Cas 7 — Magasin de meubles à Caen (4 boutiques)",
          content:
            "**Contexte :** Réseau 4 magasins en Calvados et Manche, site corporate vieux et sans intérêt commercial. **Chantier :** refonte avec catalogue produits synchronisé au logiciel de gestion interne (sync stock toutes les 4h), fiche par magasin avec horaires + Google Maps, devis en ligne. **Résultat :** +35% de visites magasin attribuables au site (mesuré via codes promo en ligne valables uniquement en magasin), 1 200 demandes de devis en 6 mois (vs 100 auparavant), reconversion d'un employé vers la gestion du site/SEO en interne.",
        },
        {
          title: "Cas 8 — Cabinet médical pluridisciplinaire à Évreux",
          content:
            "**Contexte :** 4 médecins associés, secrétariat débordé par les appels téléphoniques pour RDV, perte de patients qui ne réussissaient pas à joindre. **Chantier :** site WordPress conforme CNOM avec module Doctolib intégré, page par praticien, page \"téléconsultation\" pour les nouveaux services. **Résultat :** -60% d'appels au secrétariat (RDV pris directement en ligne), capacité à prendre 2 nouveaux médecins associés sans surcharger le secrétariat.",
        },
        {
          title: "Cas 9 — Hôtel-restaurant Côte d'Albâtre",
          content:
            "**Contexte :** Hôtel 3* à Fécamp, ~80% de réservations via Booking.com (commission 18%). Site obsolète, pas de moteur de réservation direct. **Chantier :** refonte Next.js + intégration Mews PMS + Stripe pour les réservations directes, multilingue FR/EN/DE, photos pro + visites 360°. **Résultat :** 6 mois plus tard, 35% des réservations passent en direct (vs 0%). Économie Booking estimée : 32 000 €/an. Investissement initial rentabilisé en 14 mois.",
        },
        {
          title: "Cas 10 — Coopérative agricole en Eure",
          content:
            "**Contexte :** Coopérative regroupant 80 agriculteurs locaux, vente B2B en gros + une boutique. Pas de digital. **Chantier :** plateforme custom Next.js pour les commandes B2B des restaurateurs/épiceries (login agriculteurs et clients pro, catalogue saisonnier, paniers, commandes hebdomadaires récurrentes). **Résultat :** +45 clients restaurateurs en 12 mois, +180k € de CA additionnel, simplification radicale du process commande (avant : tableau Excel partagé par email — maintenant : interface dédiée).",
        },
      ],
      conclusion:
        "Ces 10 cas n'ont rien d'exotique. Ils représentent fidèlement ce qu'une PME normande peut obtenir d'un projet digital sérieusement mené en 2026. Investissement typique : 4 000-25 000 € selon le périmètre. Rentabilisation : 6-24 mois. La condition #1 du succès : un dirigeant impliqué et une équipe agence qui prend le temps de comprendre votre métier (vs livrer en pilote automatique). Si vous êtes une PME normande qui veut franchir le pas en 2026-2027, [discutons-en](/contact). Voir aussi notre [guide PME digitalisation](/blog/pme-normandie-digitalisation-2026), notre [agence web Rouen](/agence-web-rouen), et nos [services](/services).",
    },
  },

  {
    slug: "notifications-push-onesignal-firebase-expo",
    title: "Notifications push mobile : OneSignal vs Firebase vs Expo en 2026",
    excerpt:
      "Pour brancher des notifications push sur une app React Native, 3 options dominent : OneSignal, Firebase Cloud Messaging, Expo Notifications. Comparatif honnête, coûts, intégrations, cas d'usage.",
    category: "Mobile",
    date: "15 août 2026",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80",
    featured: false,
    author,
    tags: ["Notifications push", "OneSignal", "Firebase", "Expo", "React Native", "Mobile"],
    content: {
      introduction:
        "Quand on lance une app React Native, les notifications push deviennent rapidement nécessaires : retention, engagement, alertes transactionnelles. Trois écosystèmes dominent en 2026 : **OneSignal** (le plus utilisé en agence), **Firebase Cloud Messaging** (le gratuit le plus puissant), et **Expo Notifications** (l'ergonomique pour les projets Expo-only). Cet article compare honnêtement les trois après plusieurs intégrations chez Krealabs, pour vous aider à choisir.",
      sections: [
        {
          title: "OneSignal : le standard agence",
          content:
            "OneSignal est le service de notifications push le plus utilisé en agence en 2026. **Pricing :** gratuit jusqu'à 10 000 utilisateurs, puis 9-99 $/mois selon le volume et features. **Forces :** dashboard ultra-complet (segmentation, A/B testing des notifications, analytics conversion intégrée), SDK React Native mature, support web push + email + SMS dans le même outil. **Faiblesses :** SDK propriétaire (vendor lock-in), pricing qui grimpe vite au-delà de 50k utilisateurs, performance dashboard parfois lente. **Idéal pour :** PME qui veulent un outil complet sans construire leur propre infra notifications.",
        },
        {
          title: "Firebase Cloud Messaging (FCM) : le poids lourd Google",
          content:
            "Firebase Cloud Messaging est le service notifications de Google. **Pricing :** 100% gratuit, même à très grande échelle. **Forces :** illimité gratuit, intégration native Android (c'est l'infra qui propulse les push iOS et Android sous le capot — même OneSignal utilise FCM en backend pour Android), SDK robuste maintenu par Google. **Faiblesses :** dashboard FCM minimaliste (pas de segmentation, pas d'A/B test, pas d'analytics avancées — il faut construire votre propre couche au-dessus), setup iOS plus complexe (configuration Apple Developer + APNs), pas de support email/SMS intégré. **Idéal pour :** projets matures avec une équipe tech qui veut son propre outil de gestion notifications par-dessus FCM gratuit.",
        },
        {
          title: "Expo Notifications : l'ergonomique pour Expo-first",
          content:
            "Si votre app React Native tourne sur Expo (ce qui devient le défaut en 2026 grâce à EAS), Expo Notifications est l'option clé-en-main. **Pricing :** gratuit (inclus dans Expo). **Forces :** zéro config pour push iOS + Android (Expo gère APNs et FCM en backend), SDK super ergonomique avec hooks React, parfaitement intégré au workflow Expo (EAS Update + Expo Notifications combinés font des merveilles). **Faiblesses :** dashboard inexistant (vous envoyez via l'API Expo Notifications depuis votre backend), pas de segmentation native, pas adapté pour gros volumes (au-delà de 100k notifs/jour, basculer sur FCM/OneSignal). **Idéal pour :** MVPs Expo, apps en phase d'amorçage, projets où le simple suffit.",
        },
        {
          title: "Comparatif coûts à différentes échelles",
          content:
            "Pour 1 000 utilisateurs actifs : OneSignal gratuit, FCM gratuit, Expo gratuit. Tous identiques en coût. Pour 10 000 utilisateurs : OneSignal gratuit (juste la limite), FCM gratuit, Expo gratuit. Pour 100 000 utilisateurs : OneSignal ~80 $/mois (plan Growth), FCM gratuit, Expo gratuit mais avec rate limits qui demandent du throttling côté backend. Pour 1M utilisateurs : OneSignal ~600-1500 $/mois selon features (segmentation avancée), FCM gratuit, Expo non recommandé à cette échelle. **Verdict coûts pur :** FCM est imbattable pour les gros volumes, OneSignal apporte la valeur sur le dashboard et les features avancées.",
        },
        {
          title: "Intégration React Native : code comparé",
          content:
            "**Expo Notifications** est la plus simple à intégrer. Pour OneSignal et FCM, comptez ~2-3 jours de setup pour un dev qui n'a jamais fait. Pour Expo : ~4 heures.",
          code: `// Expo Notifications - setup ultra simple
import * as Notifications from 'expo-notifications';

async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  // Envoyer ce token à votre backend pour stocker
  await fetch('/api/push-tokens', {
    method: 'POST',
    body: JSON.stringify({ token, userId }),
  });
}

// Backend Node.js - envoyer une push
const message = {
  to: expoPushToken,
  sound: 'default',
  title: 'Nouveau message',
  body: 'Vous avez reçu un message de Marc',
  data: { conversationId: 'abc123' },
};
await fetch('https://exp.host/--/api/v2/push/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(message),
});`,
        },
        {
          title: "Pièges classiques (les 5 erreurs qu'on voit le plus)",
          content:
            "(1) **Oublier de demander la permission au bon moment** : ne demandez pas la permission au launch de l'app — l'utilisateur dit non par réflexe. Attendez un moment contextuel (après une action concluante, comme un premier achat). (2) **Ne pas gérer le token refresh** : les tokens push expirent ou changent. Stocker le token côté backend mais aussi vérifier sa validité régulièrement. (3) **Envoyer trop de notifications** : opt-out = utilisateur perdu. Limiter à 2-3 notifs/semaine max sauf push transactionnel. (4) **Pas de deep linking** : tap sur la notif doit ouvrir le bon écran de l'app, pas la home. (5) **Pas de fallback email** : si l'utilisateur a désactivé les push, envoyer par email pour les notifs critiques.",
        },
        {
          title: "Notre recommandation Krealabs",
          content:
            "Pour 80% des projets clients Krealabs : **Expo Notifications** sur MVP/early-stage, migration vers **FCM** quand on dépasse 50k utilisateurs ou quand le besoin de segmentation arrive. **OneSignal** réservé aux clients qui veulent le confort dashboard et acceptent le surcoût (~50-200 €/mois). Pour les cas industriels (banques, télcos, retail à grande échelle avec millions d'utilisateurs), on monte des solutions custom sur FCM + outils internes — mais ces projets sont rares en agence à taille humaine.",
        },
      ],
      conclusion:
        "Les notifications push restent un canal de retention essentiel en 2026 — bien utilisées (peu, contextuelles, valeur ajoutée), elles boostent la rétention 7j de +20-40%. Mal utilisées (spam), elles font fuir 50% des utilisateurs. Choisir le bon outil (Expo / FCM / OneSignal) selon votre échelle et votre équipe. Pour intégrer des notifications push sur votre app React Native, [contactez Krealabs](/contact). Voir aussi notre [comparateur React Native vs Flutter](/comparateur/react-native-vs-flutter), notre [stack React Native](/technologies/react-native), et nos [services applications mobiles](/services/applications-mobile).",
    },
  },

  {
    slug: "lighthouse-100-guide-pme",
    title: "Lighthouse 100/100 : le guide pratique pour PME (sans s'arracher les cheveux)",
    excerpt:
      "Atteindre 100/100 sur les 4 métriques Lighthouse n'est pas réservé aux dev seniors. La méthode pas-à-pas qui marche pour 80% des sites WordPress et Next.js, sans réécrire votre site.",
    category: "SEO",
    date: "1 septembre 2026",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    featured: false,
    author,
    tags: ["Lighthouse", "Core Web Vitals", "Performance web", "SEO technique", "PME", "Optimisation"],
    content: {
      introduction:
        "Atteindre 100/100 sur Lighthouse (Performance, Accessibility, Best Practices, SEO) impressionne dans une présentation client. Mais surtout, ça impacte directement votre SEO (depuis 2021 Google utilise les Core Web Vitals comme facteur de ranking) et votre conversion (étude Akamai : -100ms de LCP = -7% de conversion). Cet article décrit la méthode pratique pour viser 90-100 sur les 4 axes Lighthouse, applicable sur 80% des sites WordPress et Next.js sans réécrire votre code. C'est ce qu'on applique en standard sur tous les projets Krealabs.",
      sections: [
        {
          title: "Comprendre les 4 catégories Lighthouse",
          content:
            "**Performance** mesure les Core Web Vitals (LCP, INP, CLS) + des métriques annexes (FCP, TBT, SI). C'est la plus dure à optimiser. **Accessibility** vérifie WCAG 2.1 (contraste, labels, navigation clavier, ARIA). Souvent à 95+ par défaut si vous codez proprement, 100 demande quelques ajustements. **Best Practices** vérifie HTTPS, l'absence de vulnérabilités JS, les console errors, l'usage d'APIs dépréciées. Généralement à 100 si rien n'est cassé. **SEO** vérifie les méta tags, mobile-friendliness, descriptions de pages, robots.txt, lien internal. 100 facile à atteindre. Voir [notre lexique Lighthouse](/lexique/lighthouse).",
        },
        {
          title: "Performance : les 5 leviers à activer en priorité",
          content:
            "(1) **Images en AVIF/WebP** avec lazy loading natif. Next.js Image les fait par défaut, sur WordPress utiliser Imagify ou ShortPixel. (2) **Preload des fonts critiques** : `<link rel=\"preload\" as=\"font\" type=\"font/woff2\" crossorigin>` sur les 1-2 fonts utilisées au-dessus de la ligne de flottaison. (3) **Tree-shaking et lazy loading JS** : les composants lourds (charts, vidéo embeds) en dynamic import. (4) **CDN edge** : Vercel ou Cloudflare devant le serveur — divise LCP par 2-3 sur les visiteurs lointains géographiquement. (5) **Critical CSS inline** : pour les sites WordPress, des plugins comme WP Rocket ou Autoptimize automatisent.",
        },
        {
          title: "LCP < 2.5s : la métrique-reine",
          content:
            "Le **LCP** (Largest Contentful Paint) est typiquement votre image hero ou votre titre H1. Pour le faire passer sous 2.5s : (a) preload l'image hero avec `<link rel=\"preload\" as=\"image\" href=...>` dans le `<head>`, (b) utiliser `priority` sur le Next.js `<Image>` correspondant, (c) servir l'image en AVIF (40% plus léger que WebP, supporté par 95% des navigateurs en 2026), (d) déclarer width et height explicites pour éviter CLS, (e) si l'hero est une vidéo, basculer en image statique avec play-on-click. Sur les sites WordPress avec page builders : c'est souvent le LCP qui plante à 4-7s. Migration vers thème custom = LCP qui passe à 1.2-1.8s.",
        },
        {
          title: "INP < 200ms : la métrique INSidieuse",
          content:
            "L'**INP** (Interaction to Next Paint, remplace FID depuis 2024) mesure la réactivité aux clics, taps, frappe clavier. Les coupables habituels : (1) scripts tiers qui bloquent le main thread (Hotjar, Clarity, Tag Manager mal configuré), (2) animations CSS coûteuses sur des éléments interactifs, (3) re-renders React inutiles, (4) plugins WordPress lourd (Elementor, Divi). Solutions : audit Performance dans Chrome DevTools > onglet Lighthouse, identifier les long tasks (> 50ms), defer/async les scripts non-critiques, mémoiser les composants React lourds (React.memo, useMemo), supprimer les plugins WordPress JS-bloated. Voir notre [lexique INP](/lexique/inp).",
        },
        {
          title: "CLS < 0.1 : éviter le \"contenu qui saute\"",
          content:
            "Le **CLS** (Cumulative Layout Shift) mesure les changements de mise en page qui surviennent après le premier rendu. Causes typiques : (1) images sans `width` ou `height` qui poussent le contenu après chargement, (2) fonts custom qui changent les dimensions du texte au load (utiliser `font-display: optional` ou `swap` + `size-adjust`), (3) ads/embeds (YouTube, Twitter) qui s'insèrent sans réserver l'espace, (4) animations qui shift d'autres éléments. Solutions : toujours déclarer width/height sur les images, réserver l'espace pour les embeds avec `aspect-ratio` CSS, préload les fonts, éviter les animations qui pushent d'autres éléments.",
        },
        {
          title: "Accessibility : 5 fixes pour gagner 5-10 points",
          content:
            "(1) **Contraste suffisant** : minimum 4.5:1 pour le texte normal, 3:1 pour le large. Tester avec Chrome DevTools > Lighthouse ou WebAIM Contrast Checker. (2) **Labels sur tous les inputs** : `<label for=\"email\">` ou `aria-label`. (3) **Alt sur toutes les images** : descriptif si l'image porte du sens, `alt=\"\"` si décorative. (4) **Skip-to-content link** au début du body pour la navigation clavier (WCAG 2.4.1). (5) **HTML sémantique** : `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>` au lieu de `<div>` partout. Ces 5 fixes appliqués = score Accessibility 95-100 sur 90% des sites.",
        },
        {
          title: "SEO : 100/100 quasi-automatique en 2026",
          content:
            "Le score SEO Lighthouse est le plus facile à viser 100. Les checks de base : meta description présente (50-160 chars), title unique par page, viewport meta tag, robots.txt accessible, links rel=canonical, contenu indexable (pas bloqué par robots). Sur Next.js 16, le Metadata API gère tout ça nativement. Sur WordPress, Yoast SEO ou RankMath le font. Bonus pour passer à 100 : page mobile-friendly (responsive), images avec attribut alt, links descriptifs (pas \"cliquez ici\"), absence de plugins qui bloquent l'indexation.",
        },
        {
          title: "Best Practices : éviter les pièges 2026",
          content:
            "Le score Best Practices descend généralement à cause de : (1) **Console errors** en production (logs oubliés, erreurs JS non catchées) → wrapper les erreurs avec try/catch. (2) **APIs JS dépréciées** (anciennes méthodes jQuery, document.write, Geolocation sans HTTPS) → moderniser le code legacy. (3) **HTTPS forcé** non configuré (Vercel le fait par défaut, sur OVH ça peut manquer). (4) **Mixed content** (image http sur une page https) → tout en HTTPS. (5) **Cookies sans SameSite** → ajouter SameSite=Lax ou Strict. Cinq fixes pour rester à 100.",
        },
      ],
      conclusion:
        "Atteindre 90-100 sur les 4 axes Lighthouse n'est pas réservé aux experts. Avec 6-12h de travail méthodique sur un site WordPress moyen (et nettement moins sur un Next.js récent), vous passez d'un Lighthouse 50-70 à 95+. L'impact mesurable : +5-15% de trafic SEO en 2-4 mois, +5-10% de conversion. C'est ce qu'on applique en standard sur tous les projets Krealabs avant livraison. Pour auditer votre site existant, [contactez-nous](/contact) — premier diagnostic offert. Voir aussi notre [article sur Core Web Vitals 2026](/blog/core-web-vitals-2026-inp), notre [méthode d'audit Lighthouse](/blog/audit-lighthouse-methode-agence), et nos [services Performance & SEO](/services/performance-seo).",
    },
  },

  {
    slug: "typescript-10-patterns-agence",
    title: "TypeScript : 10 patterns qui sauvent le code en agence",
    excerpt:
      "Au-delà des types basiques, ce sont les patterns avancés (template literal types, branded types, exhaustive checks, etc.) qui transforment vraiment la qualité du code. 10 patterns avec exemples concrets.",
    category: "Web",
    date: "15 septembre 2026",
    readTime: "16 min",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80",
    featured: false,
    author,
    tags: ["TypeScript", "Patterns", "Code quality", "Agence", "Best practices"],
    content: {
      introduction:
        "Tous les devs TypeScript connaissent les bases : interfaces, types union, génériques. Mais ce sont les patterns avancés (souvent peu connus) qui font la différence entre un code TypeScript verbeux et frustrant, et un code qui rend les bugs impossibles à compiler. Cet article compile 10 patterns qu'on utilise quotidiennement chez Krealabs sur nos projets Next.js et React Native, avec exemples concrets. Long mais utile à garder en bookmark.",
      sections: [
        {
          title: "1. Branded types : empêcher les confusions d'IDs",
          content:
            "Le problème : `function deleteUser(userId: string)` accepte n'importe quel string, même un `projectId` ou un `email`. **Branded types** rendent les IDs typiquement incompatibles entre eux. Plus jamais de bug \"j'ai passé un postId à une fonction qui attend un userId\".",
          code: `type Brand<K, T> = K & { __brand: T };
type UserId = Brand<string, 'UserId'>;
type ProjectId = Brand<string, 'ProjectId'>;

function deleteUser(id: UserId) { /* ... */ }
const projectId = 'proj_123' as ProjectId;
deleteUser(projectId); // ❌ Error: ProjectId not assignable to UserId
const userId = 'user_456' as UserId;
deleteUser(userId); // ✅ OK`,
        },
        {
          title: "2. Exhaustive switch avec never",
          content:
            "Quand on a un type union (`'pending' | 'paid' | 'failed'`) et qu'on switch dessus, TS peut nous forcer à gérer TOUS les cas. Si on ajoute `'cancelled'` au type plus tard, le compilateur nous le signale partout.",
          code: `type Status = 'pending' | 'paid' | 'failed';
function statusLabel(s: Status): string {
  switch (s) {
    case 'pending': return 'En attente';
    case 'paid': return 'Payé';
    case 'failed': return 'Échec';
    default:
      const _exhaustive: never = s;
      throw new Error(\`Status non géré: \${_exhaustive}\`);
  }
}
// Si on ajoute 'cancelled' au type Status :
// → erreur de compilation sur la ligne never car 'cancelled' échappe au switch`,
        },
        {
          title: "3. Type guards custom pour narrowing fiable",
          content:
            "Pour distinguer des types union au runtime, écrire des type guards user-defined avec `is`. Plus sûr que `typeof` ou `instanceof` qui ont des edge cases.",
          code: `interface User { type: 'user'; id: string; email: string }
interface Org { type: 'org'; id: string; name: string }
type Entity = User | Org;

function isUser(e: Entity): e is User {
  return e.type === 'user';
}

function sendEmail(e: Entity) {
  if (isUser(e)) {
    // TS sait que e est User ici, accès à e.email autorisé
    sendTo(e.email);
  } else {
    // e est Org ici
    sendToOrgAdmin(e.id);
  }
}`,
        },
        {
          title: "4. Template literal types pour URLs typées",
          content:
            "Les **template literal types** (TS 4.1+) permettent de typer les patterns de strings. Cas d'usage idéal : URLs API typées, slugs, événements analytics.",
          code: `type ApiPath = \`/api/\${'users' | 'projects' | 'invoices'}/\${string}\`;

function apiCall(path: ApiPath) { /* ... */ }
apiCall('/api/users/123'); // ✅
apiCall('/api/foo/bar'); // ❌ 'foo' not in union
apiCall('/users/123'); // ❌ doesn't start with /api/`,
        },
        {
          title: "5. const assertions pour figer les literals",
          content:
            "Sans `as const`, TS infère le type le plus large (`string`, `number`). Avec, il infère le type le plus étroit (le literal exact). Utile pour les configs, les arrays de constantes, les action types Redux.",
          code: `const ROLES = ['admin', 'editor', 'viewer']; // type string[]
const ROLES_STRICT = ['admin', 'editor', 'viewer'] as const;
// type readonly ['admin', 'editor', 'viewer']
type Role = (typeof ROLES_STRICT)[number];
// 'admin' | 'editor' | 'viewer'
// On peut maintenant utiliser Role partout`,
        },
        {
          title: "6. Utility types : Pick, Omit, Partial, Required",
          content:
            "Le quartet de base à maîtriser. Ils évitent de redéfinir des types à la main.",
          code: `interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

// API publique : sans password
type PublicUser = Omit<User, 'password'>;

// Formulaire de signup : tout sauf id/createdAt (auto-générés)
type SignupForm = Omit<User, 'id' | 'createdAt'>;

// Update partiel : tous les champs optionnels
type UserUpdate = Partial<Omit<User, 'id'>>;

// Filtre minimal : juste id et email
type UserRef = Pick<User, 'id' | 'email'>;`,
        },
        {
          title: "7. ReturnType + Parameters pour typer indirectement",
          content:
            "Plutôt que dupliquer un type, dériver depuis la signature de fonction. Pratique pour rester DRY quand la source de vérité est la fonction (ex: tRPC, Prisma).",
          code: `async function getUser(id: string) {
  return { id, name: 'Alice', email: 'a@b.com' };
}
type User = Awaited<ReturnType<typeof getUser>>;
// User = { id: string; name: string; email: string }

type GetUserArgs = Parameters<typeof getUser>;
// [id: string]`,
        },
        {
          title: "8. Discriminated unions pour les états React",
          content:
            "Pour modéliser des états mutuellement exclusifs (loading / success / error), utiliser un champ discriminant qui rend le type-narrowing automatique.",
          code: `type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

function render<T>(state: FetchState<T>) {
  if (state.status === 'success') {
    // TS sait que state.data existe ici
    return <Display data={state.data} />;
  }
  if (state.status === 'error') {
    // state.error existe
    return <Error msg={state.error.message} />;
  }
  return <Spinner />;
}`,
        },
        {
          title: "9. satisfies pour valider sans élargir le type",
          content:
            "L'opérateur `satisfies` (TS 4.9+) vérifie qu'une expression matche un type, MAIS garde l'inférence la plus étroite. Très utile pour les config objects.",
          code: `type Color = 'red' | 'green' | 'blue';
type Config = Record<string, { color: Color; weight: number }>;

const config = {
  primary: { color: 'red', weight: 1 },
  secondary: { color: 'green', weight: 0.5 },
} satisfies Config;
// TS sait que config.primary.color est exactement 'red' (pas 'Color')
// Et que les clés sont exactement 'primary' | 'secondary' (pas string)
// Tout en garantissant que la structure matche Config`,
        },
        {
          title: "10. Strict null checks : la base non négociable",
          content:
            "Activer `strict: true` dans tsconfig.json. Ça active strictNullChecks (les `null`/`undefined` ne sont plus assignables à n'importe quoi), noImplicitAny, strictFunctionTypes, etc. C'est la fondation de la sécurité TS. Sans ça, TS perd 70% de sa valeur. Sur tous les projets Krealabs : `strict: true` non négociable. Pour les vieux projets, migration progressive : activer strictNullChecks d'abord, corriger les erreurs, puis monter le reste un par un. Voir [notre article sur TypeScript 5 strict mode](/blog/typescript-5-strict-mode).",
        },
      ],
      conclusion:
        "Maîtriser ces 10 patterns transforme votre code TypeScript : moins de bugs en prod, refactoring plus serein, autocomplétion plus utile. Sur un projet de 30-50k lignes, le gain de productivité (et la baisse du nombre de bugs) est mesurable. Sur tous nos projets Krealabs Next.js et React Native, on utilise ces patterns quotidiennement. Pour discuter de TypeScript ou cadrer un projet avec une stack moderne, [contactez-nous](/contact). Voir aussi notre [lexique TypeScript](/lexique/typescript), notre [stack TypeScript](/technologies/typescript), et nos [services développement web](/services/developpement-web).",
    },
  },

  {
    slug: "woocommerce-b2b-erp-tarifs-negocies",
    title: "WooCommerce B2B : intégrations ERP et tarifs négociés en 2026",
    excerpt:
      "Le B2B sur WooCommerce dépasse de loin Shopify B2B en flexibilité. Intégrations Sage/Cegid, tarifs négociés par client, devis, factures conformes : guide complet pour les PME industrielles.",
    category: "WordPress",
    date: "1 octobre 2026",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
    featured: false,
    author,
    tags: ["WooCommerce B2B", "ERP integration", "Tarifs négociés", "Sage", "Cegid", "B2B e-commerce"],
    content: {
      introduction:
        "Le B2B e-commerce en 2026 ne ressemble pas au B2C : tarifs négociés par client (parfois par produit), commandes récurrentes, validation multi-niveaux, intégration ERP/comptabilité, factures conformes. **Shopify B2B** existe mais reste rigide (template fixe, peu d'extensions FR). **WooCommerce** (sur WordPress) offre la flexibilité totale grâce à l'écosystème open-source. Cet article décrit comment monter un e-commerce B2B sérieux sur WooCommerce, après plusieurs projets clients Krealabs.",
      sections: [
        {
          title: "Pourquoi WooCommerce pour le B2B en France",
          content:
            "Trois raisons agence : (1) **Écosystème FR mature** : extensions natives pour Sage, EBP, Cegid, Divalto, MyUnisoft (vs Shopify où c'est principalement US). (2) **Tarifs sur mesure** : extensions B2B for WooCommerce, Wholesale Suite, ou code custom permettent des tarifs par client, par groupe, par volume — impossibles à reproduire simplement sur Shopify. (3) **Pas de frais de transaction** : 0% chez WooCommerce vs 0.5-2% sur Shopify Plus. Sur des paniers B2B moyens à 800-3000 €, l'écart devient massif sur l'année.",
        },
        {
          title: "Extensions WooCommerce B2B incontournables",
          content:
            "(1) **B2BKing** (~199 €/an) : la suite la plus complète : tarifs par groupe client, demandes de devis avec validation, paiement à 30j, listes d'achat récurrentes. (2) **WooCommerce Wholesale Prices** (~99 €/an) : tarifs en gros par produit ou catégorie, conditions de paiement par client. (3) **Request a Quote for WooCommerce** : transforme un catalogue en demande de devis (pas de paiement en ligne, juste un panier qui se transmet en demande). Notre choix typique sur projet client : B2BKing en standalone ou Wholesale Prices + Request a Quote en duo.",
        },
        {
          title: "Tarifs négociés par client : la fonctionnalité-clé",
          content:
            "Le B2B en France fonctionne souvent par tarifs négociés client par client. Avec WooCommerce : on créé des **groupes clients** (Pro Bronze, Pro Silver, Pro Gold) avec une grille tarifaire par groupe. Au login, le client B2B voit ses prix. Pour les tarifs ultra-spécifiques (négociation par bon de commande), code custom : on stocke en custom meta un override de prix par couple (user_id × product_id). À la connexion, on remplace `get_price()` par notre logique : si un override existe pour ce user+produit, on le retourne ; sinon prix groupe ; sinon prix public.",
        },
        {
          title: "Devis vs commande directe : workflow B2B classique",
          content:
            "Dans le B2B classique, le client ajoute des produits au panier MAIS n'achète pas directement — il demande un devis. Le commercial valide le devis (parfois avec négociation de remise), envoie un PDF, le client valide, puis paiement à 30j sur facture. Workflow technique : (1) bouton \"Ajouter au panier\" → \"Demander un devis\", (2) panier → \"Soumettre la demande\", (3) email automatique au commercial avec PDF du devis pré-rempli, (4) le commercial édite, valide, renvoie au client, (5) le client clique \"Accepter\" depuis l'email → bon de commande, (6) génération facture à expédition. Tout ça avec B2BKing en standard ou code custom.",
        },
        {
          title: "Intégration ERP : Sage, EBP, Cegid",
          content:
            "Au-delà de 50 commandes/mois, la double saisie commande WooCommerce → ERP devient ingérable. Solutions : (1) **Sage 100** : connecteur officiel Sage e-Commerce (~3000 €/an) ou middleware custom via API Sage. (2) **EBP** : moins d'options officielles, souvent middleware custom via export CSV automatique ou API si EBP Online. (3) **Cegid** : connecteur Cegid Loop si vous êtes sur leur cloud, sinon API REST. Compter 8-20 jours de dev pour une intégration propre selon la complexité (création produit, sync stock, push commande, génération facture). Coût : 5 000-15 000 €. ROI typique : 1-2 ETP économisé sur la saisie.",
        },
        {
          title: "Conformité factures FR : ce qu'il faut savoir",
          content:
            "Les factures B2B en France doivent inclure : raison sociale + SIRET du vendeur, raison sociale + SIRET + n° TVA intracom du client, n° facture séquentiel, date, désignation produits/services, prix HT + TVA + TTC, conditions de paiement, mentions légales (escompte, pénalités, indemnité forfaitaire 40€). À partir de juillet 2024 (et progressivement étendu), la **facturation électronique** entre entreprises devient obligatoire (PPF/PDP). Sur WooCommerce : extensions comme WooCommerce PDF Invoices & Packing Slips Pro génèrent automatiquement avec mentions FR. Pour la facturation électronique conforme : intégrer une PDP comme Sage, Pennylane, Tiime Invoice.",
        },
        {
          title: "Cas client : projet WooCommerce B2B 2026",
          content:
            "Client anonymisé : grossiste alimentaire normand, 800 références, 200 clients pro (restaurateurs, cantines). Avant : commandes par téléphone + papier + saisie Sage manuelle. **Notre projet** (10 semaines, 24 000 € HT) : WooCommerce B2B avec catalogue 800 produits synchronisé Sage, tarifs négociés par client, commandes récurrentes en 1 clic, paiement à 30j sur facture, génération de facture PDF automatique avec mentions FR. **Résultat** : -65% du temps administratif côté commercial, capacité à prendre 80 nouveaux clients sans embaucher, augmentation du panier moyen de 12% grâce aux suggestions de produits complémentaires.",
        },
        {
          title: "Budget total pour un B2B sérieux",
          content:
            "Site WooCommerce B2B basique (catalogue 100-300 produits, tarifs par groupe, demandes de devis simples) : 8 000-15 000 € HT. Site WooCommerce B2B avancé (500-2000 produits, tarifs négociés client, workflow devis-commande, intégration ERP Sage/EBP) : 18 000-35 000 € HT. Site WooCommerce B2B premium (intégration ERP custom complexe, multi-entrepôts, factures électroniques conformes, plateforme client avec accès historique commandes) : 35 000-80 000 € HT. Maintenance : 300-1500 €/mois selon volume et SLA. Voir aussi notre [comparateur WooCommerce vs Shopify](/comparateur/woocommerce-vs-shopify) et [comparateur WordPress vs Webflow](/comparateur/wordpress-vs-webflow).",
        },
      ],
      conclusion:
        "WooCommerce reste en 2026 le meilleur choix pour le B2B e-commerce français : flexibilité maximale, intégration native avec l'écosystème ERP FR, zéro frais de transaction. Pour les PME industrielles ou de gros, c'est un investissement qui se rentabilise en 12-24 mois grâce aux économies de temps administratif et à la capacité d'extension commerciale. Pour cadrer votre projet B2B WooCommerce, [contactez Krealabs](/contact). Voir aussi nos [services WordPress](/services/wordpress), notre [lexique sur Stripe](/lexique/stripe) pour la partie paiement, et notre [agence WooCommerce Rouen](/agence-web-rouen/e-commerce).",
    },
  },

  {
    slug: "hebergement-francais-2026-panorama",
    title: "Hébergement français 2026 : le panorama complet des solutions",
    excerpt:
      "OVH, Scaleway, o2switch, Infomaniak, Kinsta FR, Vercel EU : quel hébergement choisir pour un site WordPress, un Next.js ou un SaaS en France en 2026 ? Panorama honnête.",
    category: "Outils",
    date: "15 octobre 2026",
    readTime: "15 min",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    featured: false,
    author,
    tags: ["Hébergement", "OVH", "Scaleway", "o2switch", "Vercel", "Infomaniak", "Souveraineté"],
    content: {
      introduction:
        "Choisir un hébergeur en 2026, c'est arbitrer entre : performance, souveraineté (RGPD, données en France/EU), prix, ergonomie, support. Les acteurs français ont rattrapé leur retard, et certains sont devenus excellents. Cet article passe en revue les 6 hébergeurs les plus pertinents pour un site WordPress, un Next.js ou un SaaS français en 2026, avec leurs forces, faiblesses et nos recommandations Krealabs.",
      sections: [
        {
          title: "o2switch : le mutualisé qui dépote",
          content:
            "**Pricing :** offre Unique 7 €/mois, ressources illimitées. **Forces :** rapport qualité/prix imbattable pour WordPress vitrine, support FR ultra-réactif, datacenter Clermont-Ferrand. Convient pour 95% des sites WordPress PME. Stockage NVMe, PHP 8.3, Let's Encrypt auto. **Faiblesses :** pas de scalabilité horizontale (un seul plan), pas adapté pour Next.js ou Node.js (mutualisé classique LAMP). **Idéal pour :** site WordPress vitrine ou e-commerce léger d'une PME normande.",
        },
        {
          title: "Infomaniak (Suisse) : le premium éthique",
          content:
            "**Pricing :** WordPress dédié 7-30 CHF/mois, VPS à partir de 13 CHF/mois. **Forces :** datacenters 100% énergies renouvelables (impact carbone = 0), interface admin excellente, Mail Server premium inclus, expertise WordPress et NextCloud. Suisse = hors RGPD mais Swiss Data Protection Act très protecteur. **Faiblesses :** pricing un peu plus cher qu'o2switch, moins connu en France. **Idéal pour :** entreprises avec sensibilité environnementale forte ou besoin d'hébergement Mail + Web combinés.",
        },
        {
          title: "OVHcloud : le poids lourd FR",
          content:
            "**Pricing :** mutualisé 7-25 €/mois, VPS 5-200 €/mois, Cloud Public à la carte. **Forces :** souveraineté française pure, énorme catalogue (mutualisé jusqu'à Kubernetes managé), datacenters dans toute la France et UE, écosystème mature pour les grandes entreprises. **Faiblesses :** UX dashboard complexe (datée), support souvent jugé inégal, incident majeur Strasbourg 2021 toujours dans les mémoires (incendie datacenter). **Idéal pour :** entreprises avec besoin de souveraineté FR forte, projets de tailles très variées (du mutualisé au cluster K8s).",
        },
        {
          title: "Scaleway : le moderne souverain",
          content:
            "**Pricing :** Instances à partir de 3.5 €/mois, Postgres managé 12 €/mois, Kubernetes Kapsule gratuit (control plane), Containers serverless à l'usage. **Forces :** stack ultra-moderne (Kubernetes natif, IaC Terraform, API propres), datacenters Paris/Amsterdam/Varsovie, idéal pour les apps cloud-native Next.js/Node.js. **Faiblesses :** un peu plus cher qu'OVH sur les VPS basique, doc parfois en retard. **Idéal pour :** startups tech qui veulent une stack cloud moderne tout en restant 100% UE/FR.",
        },
        {
          title: "Vercel (US, EU regions) : le DX champion",
          content:
            "**Pricing :** Hobby gratuit, Pro 20 $/mois/utilisateur, Enterprise sur devis. **Forces :** DX inégalée pour Next.js, edge runtime mondial, preview deployments par PR, Vercel Postgres / KV / Blob intégrés, Speed Insights. Régions EU disponibles (mais le control plane reste US — sensibilité RGPD à analyser). **Faiblesses :** entreprise US (impact Cloud Act US, à arbitrer selon votre cas), coût qui peut grimper sur les gros sites (bandwidth). **Idéal pour :** projets Next.js avec besoin de DX premium, sites internationaux. Voir [notre comparateur Vercel vs Netlify](/comparateur/vercel-vs-netlify).",
        },
        {
          title: "Kinsta : le WordPress premium",
          content:
            "**Pricing :** plan Starter 35 $/mois (1 site, 25k visites/mois), Pro et plus chers. **Forces :** infra Google Cloud Premium Tier (très rapide), staging environments inclus, support WP de niveau expert, dashboard ergonomique. Datacenter UE (Frankfurt, Belgium, Paris) disponible. **Faiblesses :** cher pour les petits sites, pricing au volume de visites peut surprendre. **Idéal pour :** sites WordPress premium ou e-commerce sérieux qui veulent performance + tranquillité. Notre choix pour 20% des clients Krealabs (WordPress haut de gamme).",
        },
        {
          title: "AWS / GCP / Azure : la solution enterprise",
          content:
            "**Pricing :** très variable selon services (compter 100-3000 €/mois pour un projet sérieux). **Forces :** scalabilité illimitée, écosystème de services massif (RDS, S3, Lambda, etc.). **Faiblesses :** complexité opérationnelle (besoin de DevOps), pricing piégeux (data transfer notamment), hors souveraineté FR par défaut (sauf certaines régions FR). **Idéal pour :** projets enterprise (>1M visites/mois) avec équipe DevOps ou cas spécifiques (intégration AWS partenaire client, etc.). Pour les PME normandes, généralement overkill.",
        },
        {
          title: "Notre grille de décision Krealabs",
          content:
            "**Site WordPress vitrine PME** (1k-50k visites/mois) → **o2switch** (rapport qualité/prix imbattable). **Site WordPress haut de gamme** (50k-500k visites/mois) → **Kinsta** ou **Infomaniak**. **Site Next.js / Astro** (toutes tailles) → **Vercel** par défaut, **Scaleway** si souveraineté FR critique. **SaaS B2B** → **Vercel + Neon (Postgres)** ou **Scaleway** (instances + Postgres managé) pour souveraineté FR. **Projet enterprise / souveraineté absolue** → **OVH** ou **Scaleway**. **Projet avec besoin Mail Server** → **Infomaniak**. Cette grille couvre 95% de nos clients.",
        },
      ],
      conclusion:
        "L'hébergement n'est plus le sujet stratégique qu'il a été. En 2026, on a 6-8 acteurs solides en français/UE, chacun avec sa spécialité. Notre conseil : choisissez l'hébergeur APRÈS avoir cadré l'architecture, pas l'inverse. Et restez prêt à migrer si vous dépassez votre fournisseur initial (la portabilité est meilleure qu'en 2020). Pour cadrer ensemble votre hébergement selon votre projet, [contactez Krealabs](/contact). Voir aussi notre article [Vercel vs OVH](/blog/vercel-vs-ovh-hebergement-2026), notre [lexique Vercel](/lexique/vercel), et notre [comparateur Vercel vs Netlify](/comparateur/vercel-vs-netlify).",
    },
  },

  {
    slug: "ai-search-agences-adaptation-2026",
    title: "AI search : comment les agences web doivent s'adapter en 2026",
    excerpt:
      "ChatGPT, Perplexity, Claude Search redéfinissent comment les utilisateurs cherchent en 2026. Pour les agences web, c'est un nouveau SEO à apprendre. Méthode pratique et premiers résultats mesurés.",
    category: "SEO",
    date: "1 novembre 2026",
    readTime: "14 min",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    featured: false,
    author,
    tags: ["AI search", "ChatGPT", "Perplexity", "SEO 2026", "LLM optimization", "GEO", "Agence web"],
    content: {
      introduction:
        "En 2026, **20% des recherches \"informationnelles\"** passent par ChatGPT, Perplexity, Claude Search ou Gemini, plutôt que Google. Ce chiffre était de 5% en 2023. Conséquence : optimiser uniquement pour Google revient à laisser 20% du marché à des concurrents qui s'adaptent à l'**AI search** (ou **GEO** : Generative Engine Optimization). Cet article décrit la méthode pratique qu'on applique chez Krealabs pour positionner les sites de nos clients dans les réponses des IA, après 18 mois d'expérimentation et de mesures réelles.",
      sections: [
        {
          title: "AI search vs SEO classique : ce qui change",
          content:
            "Le **SEO classique** vise à apparaître dans les 10 résultats Google sur une requête. L'**AI search** vise à être **cité** comme source dans la réponse générée par le LLM. Différences clés : (1) Ce n'est plus une liste de 10 résultats, mais une réponse de 3-5 paragraphes avec 3-7 sources citées en bas. (2) Le clic-through est plus faible (l'utilisateur a sa réponse) mais le clic restant est **hyper qualifié** (intent recherche profonde). (3) Le ranking importe moins que la **qualité de citation** : être cité 1er ou 5ème dans Perplexity a un impact similaire (vs Google où la position 1 capte 30% du clic). (4) Les facteurs de classement diffèrent : structure, citations externes, schema.org, llms.txt.",
        },
        {
          title: "Le fichier llms.txt : nouveau standard à mettre en place",
          content:
            "Émergé en 2024, le fichier **llms.txt** est l'équivalent du robots.txt mais pour les LLMs. Posé à la racine (`/llms.txt`), il fournit une vue structurée du site (titre, description, liens vers les contenus clés organisés par thème). Les IA qui le supportent (Claude, Perplexity, Anthropic Sonar) l'utilisent pour comprendre la structure du site avant de citer. Sur krealabs.fr, nous avons mis en place [/llms.txt](/llms.txt) en mars 2025 : depuis, +50% de citations Perplexity sur des requêtes \"agence web Normandie\". C'est gratuit, ça prend 30 minutes à monter pour un site PME.",
        },
        {
          title: "Structure de contenu friendly LLM",
          content:
            "Les LLMs préfèrent : (1) **Sections claires avec H2/H3** descriptifs (vs articles à structure floue), (2) **Listes à puces et numérotées** (faciles à parser et à citer telles quelles), (3) **Réponses directes à des questions** (un H2 \"Combien coûte un site WordPress à Rouen ?\" suivi d'une réponse claire convertit en citation 5x mieux qu'un paragraphe vague), (4) **Chiffres précis** (un LLM cite plus volontiers \"audit Lighthouse en 3-5 jours\" que \"audit assez rapide\"), (5) **Examples concrets** (cas clients, méthodes). Sur Krealabs, on structure toutes les pages services et articles avec ces patterns depuis 2024.",
        },
        {
          title: "Schema.org enrichi : Article, FAQPage, HowTo",
          content:
            "Les LLMs lisent les schemas. Trois schemas particulièrement utiles pour la citation : (1) **Article** schema avec author identifiable (E-E-A-T) — voir [notre lexique E-E-A-T](/lexique/e-e-a-t). (2) **FAQPage** schema sur les FAQ : chaque Q&A devient une réponse citable directement. (3) **HowTo** schema sur les guides procéduraux : Perplexity et Claude Sonar citent fréquemment les guides HowTo avec leurs étapes structurées. Investissement : 1 jour de dev pour mettre en place les schemas sur les 10 pages-clés d'un site PME. Impact mesurable : +30-80% de citations IA en 3 mois.",
        },
        {
          title: "Citations externes : la nouvelle métrique d'autorité",
          content:
            "Les LLMs accordent plus de poids aux sources fréquemment **citées par d'autres sources fiables**. Stratégies pour augmenter votre autorité : (1) **Articles invités** sur des blogs tech respectés (Paris-Normandie, FrenchWeb), (2) **Publications LinkedIn longues** par les fondateurs (les LLMs scrapent LinkedIn), (3) **Wikipedia** : pages d'entreprise ou wikis spécialisés (sectoriels), (4) **GitHub** : projets open-source visibles, contributions, (5) **Forums spécialisés** : StackOverflow, Reddit, Hacker News si le contenu s'y prête. Krealabs publie depuis 2024 sur LinkedIn (Maxime + Romain) : on observe des citations Perplexity issues directement de posts LinkedIn.",
        },
        {
          title: "Mesurer la performance AI search",
          content:
            "Outils 2026 pour mesurer la visibilité dans les LLMs : (1) **Otterly.ai** ou **Profound** (~$50-200/mois) : trackers de citations dans ChatGPT/Perplexity/Claude sur les requêtes que vous suivez. (2) **Test manuel régulier** : 1 fois par mois, taper 10 requêtes-clés sur ChatGPT, Perplexity, Claude.ai et noter si votre site apparaît en source. (3) **Server logs** : les crawlers IA (ChatGPT-User, ClaudeBot, PerplexityBot) ont des user-agents identifiables. Compter combien de hits par mois pour mesurer si les IA crawlent vraiment votre site. Sur krealabs.fr en oct 2026 : ~2000 hits/mois de ces 3 user-agents, en croissance constante.",
        },
        {
          title: "Méthode Krealabs : 5 étapes pour s'adapter",
          content:
            "(1) **Audit AI search** sur 10-20 requêtes cibles : taper sur ChatGPT/Perplexity/Claude, noter présence ou absence. (2) **Mise en place llms.txt** structuré (30 min). (3) **Enrichissement schemas** (Article + FAQPage + HowTo) sur les pages-clés (1 jour). (4) **Restructuration des articles** pour favoriser la citation (Q&A, listes, chiffres précis) — sur les 10-20 articles les plus stratégiques (1-2 semaines). (5) **Suivi mensuel** des citations + ajustements. Budget total : 3 000-8 000 € pour une PME, ROI mesurable en 4-6 mois. C'est ce qu'on propose en service [Performance & SEO](/services/performance-seo).",
        },
      ],
      conclusion:
        "L'AI search n'est plus un buzzword 2024 — c'est 20% des recherches en 2026 et ça continue de monter. Les agences qui n'adaptent pas leur méthode SEO seront pénalisées en 2027-2028. Les leviers (llms.txt, schemas, structure de contenu) sont accessibles à toute PME pour quelques milliers d'euros. Le terrain n'est pas encore saturé : c'est le moment d'y être avant la concurrence. Pour cadrer une stratégie AI search adaptée à votre projet, [contactez Krealabs](/contact). Voir aussi notre [lexique schema.org](/lexique/schema-org), notre [llms.txt](/llms.txt), et notre [guide SEO local Rouen](/blog/seo-local-rouen-guide-pme).",
    },
  },

  {
    slug: "expo-router-production-retours",
    title: "Expo Router en production : retours d'expérience après 12 mois",
    excerpt:
      "Expo Router (file-based routing pour React Native) a maturé. Bilan agence après 1 an d'usage en production sur 4 apps clients : forces, frictions, gotchas, vs React Navigation classique.",
    category: "Mobile",
    date: "15 novembre 2026",
    readTime: "13 min",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    featured: false,
    author,
    tags: ["Expo Router", "React Native", "Mobile", "File-based routing", "Expo", "Production"],
    content: {
      introduction:
        "**Expo Router** (sorti en stable v3 en 2023, maintenant v6 en 2026) a transformé le développement d'apps React Native. File-based routing, deep linking automatique, type-safe params, layouts et navigation : c'est l'équivalent du App Router Next.js mais pour mobile. Après 4 apps clients en production chez Krealabs sur Expo Router, voici le bilan honnête : ce qui marche, ce qui pique, et notre verdict pour 2026.",
      sections: [
        {
          title: "Le concept : files = routes (comme Next.js App Router)",
          content:
            "Avec **React Navigation** classique (le standard avant 2023), on définissait des stacks et des screens manuellement avec des `navigation.navigate('Screen')`. Avec **Expo Router**, l'arborescence `app/` devient les routes : `app/index.tsx` = la home, `app/profile.tsx` = `/profile`, `app/product/[id].tsx` = route dynamique avec param. Bénéfices : pas de boilerplate navigation, deep linking automatique (universal links iOS / app links Android), code plus déclaratif, partage de code facile avec un projet Next.js qui suit le même pattern (App Router).",
        },
        {
          title: "Type-safe routes : la feature qui change tout",
          content:
            "Depuis Expo Router 3.5+, les routes sont **type-safe** par défaut via génération automatique. `<Link href=\"/profile/123\">` est vérifié à la compilation : si on tape `/profil/123` (typo), TS gueule. Sur les apps avec 30+ écrans, c'est énorme : plus jamais de runtime crash dû à une mauvaise URL. Pour profiter pleinement : activer `\"experiments\": { \"typedRoutes\": true }` dans app.json. Léger trade-off : les routes dynamiques (`[id]`) demandent un cast explicite si l'ID vient d'une variable.",
          code: `// Routes générées auto - type-safe
import { Link, router } from 'expo-router';

// ✅ TS vérifie le path
<Link href="/profile/123">Profil</Link>

// ✅ Avec params typés
router.push({ pathname: '/product/[id]', params: { id: '42' } });

// ❌ Typo : erreur TS
<Link href="/profil/123">...</Link>`,
        },
        {
          title: "Layouts emboîtés : on peut faire du compliqué simplement",
          content:
            "Expo Router supporte les **layouts** via `_layout.tsx` à chaque niveau du dossier `app/`. Cas d'usage typique : un layout root avec auth provider + theme provider, un layout `(tabs)` pour la bottom bar tabs, un layout `(modal)` pour les écrans en modal. Le tout s'imbrique naturellement, sans gérer manuellement les stacks. Sur les apps Krealabs : un seul `_layout.tsx` racine + 2-3 layouts intermédiaires suffisent à modéliser 90% des UX mobiles standards.",
          code: `// app/_layout.tsx — Stack racine
import { Stack } from 'expo-router';
export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
  </Stack>;
}

// app/(tabs)/_layout.tsx — Bottom Tabs
import { Tabs } from 'expo-router';
export default function TabsLayout() {
  return <Tabs>
    <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
    <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
  </Tabs>;
}`,
        },
        {
          title: "Deep linking : enfin facile",
          content:
            "Avant Expo Router : configurer deep linking en React Native = 2-3 jours de galère (gérer iOS Universal Links + Android App Links + fallback web + parsing URL). Avec Expo Router : les deep links marchent par défaut. Configurer un universal link `https://app.krealabs.fr/product/123` ouvre directement l'app sur l'écran produit 123. Conditions : associated domain configuré dans app.json + fichier `apple-app-site-association` servi sur votre web. Coût : ~4 heures de setup vs 2-3 jours en React Navigation.",
        },
        {
          title: "Les frictions qu'on a rencontrées",
          content:
            "(1) **Performance navigation** : sur les très gros stacks (50+ écrans), on a observé des lags de 200-400ms sur les transitions. Solution : `lazy` loading des screens (chargés à la navigation) au lieu d'eager. (2) **Hot reload parfois capricieux** : un changement de route demande parfois un full reload. Frustrant en dev, pas un problème en prod. (3) **Documentation parfois en retard** : Expo Router évolue vite, certaines API documentées sont déjà obsolètes en v6. Privilégier le GitHub repo officiel et les exemples Snack. (4) **Migration depuis React Navigation** : 1-2 semaines de boulot sur une app moyenne. Pas trivial mais doable.",
        },
        {
          title: "Trade-off vs React Navigation classique",
          content:
            "**Expo Router** gagne sur : DX (file-based, moins de boilerplate), type-safety, deep linking facile, layouts emboîtés, alignement avec Next.js App Router (DX cohérente web + mobile). **React Navigation classique** gagne sur : flexibilité maximale pour les UX exotiques (tabs custom, drawers complexes mixés avec stacks), maturité (5+ ans en prod), communauté plus large, custom transitions plus faciles. **Notre choix Krealabs depuis fin 2024** : 100% Expo Router sur les nouveaux projets. On garde React Navigation pour les anciens projets en maintenance.",
        },
        {
          title: "Verdict après 1 an sur 4 apps clients",
          content:
            "Expo Router est devenu le standard de fait pour React Native moderne en 2026. Les frictions de 2023-2024 sont largement résolues. Pour un nouveau projet d'app mobile : démarrer directement avec Expo + Expo Router est le bon choix. Pour migrer depuis React Navigation : justifié si vous prévoyez des évolutions importantes (refonte UI, ajout deep linking, ajout web companion app), sinon pas urgent. Toutes les apps que Krealabs a livrées en 2025-2026 sont sur Expo Router : on n'a aucun regret.",
        },
      ],
      conclusion:
        "Expo Router est devenu indispensable pour le développement React Native moderne. File-based routing, type-safe routes, layouts emboîtés, deep linking facile : c'est l'équivalent du DX App Router Next.js, transposé en mobile. Pour cadrer un projet d'app mobile React Native + Expo Router avec Krealabs, [contactez-nous](/contact). Voir aussi notre [comparateur React Native vs Flutter](/comparateur/react-native-vs-flutter), notre [article sur Expo Router](/blog/expo-router-file-based-mobile), et nos [services applications mobiles](/services/applications-mobile).",
    },
  },
];
