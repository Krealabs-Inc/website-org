/**
 * Pages comparator /comparateur/[slug] : comparaisons côté agence sur
 * les choix techniques que les prospects nous posent en boucle.
 * Cible : intention commerciale forte ("X vs Y") + signal d'expertise.
 */

export interface Criterion {
  label: string;
  a: string;
  b: string;
  winner?: "a" | "b" | "tie";
}

export interface UseCase {
  label: string;
  description: string;
  winner: "a" | "b";
  reasoning: string;
}

export interface ComparatorData {
  slug: string;
  a: { name: string; tagline: string };
  b: { name: string; tagline: string };
  title: string;
  description: string;
  intro: string;
  criteria: Criterion[];
  useCases: UseCase[];
  verdict: string;
  faq: { question: string; answer: string }[];
  keywords: string[];
}

export const COMPARATORS: Record<string, ComparatorData> = {
  "wordpress-vs-webflow": {
    slug: "wordpress-vs-webflow",
    a: { name: "WordPress", tagline: "CMS open-source · 43% du web" },
    b: { name: "Webflow", tagline: "Builder visuel SaaS premium" },
    title: "WordPress vs Webflow : quel CMS choisir en 2026 ?",
    description:
      "Comparatif WordPress vs Webflow pour 2026 : prix, SEO, flexibilité, écosystème, propriété du code. Le bilan honnête d'une agence web qui utilise les deux.",
    intro:
      "WordPress et Webflow occupent deux philosophies différentes du web : WordPress est le CMS open-source historique qui propulse 43% du web, Webflow est un builder visuel SaaS premium adopté par les agences créatives et les startups. Lequel choisir pour votre site en 2026 ? Cette page compare les deux honnêtement, du point de vue d'une agence web rouennaise qui utilise les deux selon le projet.",
    criteria: [
      {
        label: "Prix de démarrage",
        a: "Gratuit. Hébergement à partir de 5 €/mois (o2switch, OVH). Coût total minimal pour un site simple : 200 €/an.",
        b: "À partir de 14 $/mois (plan Basic). Plan Site CMS : 23 $/mois. Plan agence : 49 $/mois. Coût annuel typique : 168-588 $.",
        winner: "a",
      },
      {
        label: "Flexibilité & personnalisation",
        a: "Quasi-illimitée. Accès au code, 60 000+ plugins, thèmes custom illimités, intégrations API tierces sans contrainte.",
        b: "Visuelle uniquement (drag & drop). Pas d'accès au code serveur. Custom code limité à du HTML/JS dans des embeds. Plus structurant mais moins libre.",
        winner: "a",
      },
      {
        label: "Vitesse de prototypage",
        a: "Lent au début (thème custom = 5-10 jours dev). Page builders permettent des sites en 1-2 jours mais avec dette technique.",
        b: "Très rapide. Un designer non-dev peut sortir un site fonctionnel en 2-5 jours. Vrai avantage pour les agences créatives.",
        winner: "b",
      },
      {
        label: "SEO technique",
        a: "Excellent avec un thème custom + Yoast/RankMath. Contrôle total du markup, schema.org, robots.txt, etc.",
        b: "Bon par défaut. SEO panel intégré. Mais moins de contrôle fin sur le markup généré que sur WordPress custom.",
        winner: "a",
      },
      {
        label: "Performance & Core Web Vitals",
        a: "Variable selon le thème. Thème custom optimisé = 90+ Lighthouse facile. Thèmes premium / page builders = souvent 50-70.",
        b: "Bonne par défaut (Webflow optimise les assets). Moins de leviers manuels possibles si on veut pousser le score.",
      },
      {
        label: "Propriété du code & lock-in",
        a: "Votre code, votre serveur, votre BDD. Aucun lock-in. Vous pouvez migrer sur n'importe quel hébergement.",
        b: "Hébergement et code propriétaire Webflow. Si vous arrêtez de payer, le site disparaît. Lock-in fort.",
        winner: "a",
      },
      {
        label: "E-commerce",
        a: "WooCommerce (gratuit, extensible, custom illimité). Stack standard du e-commerce open-source.",
        b: "Webflow Ecommerce (limité à 500-3000 produits selon plan). Pas adapté aux gros catalogues.",
        winner: "a",
      },
      {
        label: "Écosystème agence & talents",
        a: "Énorme. Trouver un dev WordPress sénior en France : facile. Communauté massive, formations, docs riches.",
        b: "En croissance mais beaucoup plus petit. Trouver un Webflow Expert sénior : plus rare et plus cher.",
        winner: "a",
      },
    ],
    useCases: [
      {
        label: "Site vitrine pour PME normande (5-15 pages)",
        description: "Site avec contenu éditorial régulier, géré par l'équipe interne sans dev.",
        winner: "a",
        reasoning:
          "WordPress + thème custom léger : meilleur rapport qualité/prix sur 5 ans. ACF Pro pour des content types simples à éditer. La PME paie 5-20 €/mois d'hébergement et garde la main complète.",
      },
      {
        label: "Site portfolio d'une agence créative ou d'un freelance",
        description: "Mise à jour visuelle fréquente, animations soignées, esthétique premium.",
        winner: "b",
        reasoning:
          "Webflow excelle ici : le designer édite seul, animations Lottie/IX intégrées, pas besoin de dev pour iterer sur le design. Le surcoût mensuel est rentabilisé par l'autonomie du designer.",
      },
      {
        label: "Site e-commerce 100-2000 produits",
        description: "Boutique en ligne avec gestion de stock, paiements, intégrations comptables.",
        winner: "a",
        reasoning:
          "WooCommerce sur WordPress est le standard incontesté. Webflow Ecommerce est trop limité (max 3000 produits, extensions B2B inexistantes). Pour de l'e-commerce sérieux, WP gagne.",
      },
    ],
    verdict:
      "Pour 80% des PME normandes que nous accompagnons : WordPress reste le bon choix. Plus flexible, moins cher sur 5 ans, écosystème massif, propriété du code. Webflow brille pour les agences créatives qui veulent itérer vite sur le design sans dev, ou pour des sites portfolio à fort enjeu visuel. Si vous hésitez sur votre projet, contactez-nous — premier échange offert pour cadrer le bon choix.",
    faq: [
      {
        question: "Peut-on migrer de Webflow vers WordPress (ou inverse) ?",
        answer:
          "Oui dans les deux sens, mais avec du travail. Webflow → WordPress demande de re-coder le thème custom (le HTML Webflow exporté n'est pas du WP), et de migrer les contenus CMS via CSV. Compter 3-6 semaines. WordPress → Webflow demande de réimplémenter les fonctionnalités custom qui n'ont pas d'équivalent natif Webflow. Compter 2-5 semaines selon la complexité.",
      },
      {
        question: "Webflow est-il vraiment plus rapide à mettre en place ?",
        answer:
          "Pour un dev qui maîtrise WordPress, non — un thème custom WordPress se développe en 5-10 jours et offre plus de flexibilité. Pour un designer ou un non-dev, oui largement : un site Webflow simple sort en 3-5 jours sans backend dev. Le critère vitesse dépend donc de qui code.",
      },
      {
        question: "Comment ressortir sur Google avec Webflow ?",
        answer:
          "Webflow expose un SEO panel correct : title/meta, alt, sitemap automatique, schema.org basique. Pour des stratégies SEO avancées (custom schema, structures de données complexes, optimisations Core Web Vitals fines), WordPress avec un thème custom offre plus de leviers techniques. À budget équivalent, WP sur SEO technique gagne.",
      },
      {
        question: "Krealabs travaille-t-il sur Webflow ?",
        answer:
          "Notre spécialité est WordPress (la majorité de nos clients) et Next.js (pour les apps custom et SaaS). Nous n'avons pas de partenariat Webflow Expert, donc nous orientons les projets purement Webflow vers nos confrères agences créatives qui en ont fait leur cœur de métier.",
      },
    ],
    keywords: [
      "wordpress vs webflow",
      "webflow ou wordpress",
      "wordpress webflow comparatif",
      "choisir wordpress webflow",
      "agence wordpress webflow rouen",
    ],
  },

  "woocommerce-vs-shopify": {
    slug: "woocommerce-vs-shopify",
    a: { name: "WooCommerce", tagline: "Open-source · sur WordPress" },
    b: { name: "Shopify", tagline: "SaaS clé en main e-commerce" },
    title: "WooCommerce vs Shopify : quel e-commerce en 2026 ?",
    description:
      "Comparatif WooCommerce vs Shopify pour PME e-commerce : prix, fonctionnalités, contrôle, intégrations. Le bilan d'une agence WordPress à Rouen.",
    intro:
      "WooCommerce et Shopify dominent le marché e-commerce mondial. WooCommerce est une extension gratuite open-source de WordPress (~28% du e-commerce mondial). Shopify est un SaaS payant clé en main (~10% du marché, leader sur les boutiques mid-market). Lequel choisir pour votre boutique en 2026 ? Cette page compare les deux côté agence, après plusieurs années à intégrer les deux selon les projets clients.",
    criteria: [
      {
        label: "Coût mensuel (boutique 200-1000 produits)",
        a: "Hébergement 15-50 €/mois. Plugins essentiels (Stripe, transporteurs, etc.) ~100 €/an. Soit ~30-70 €/mois tout compris.",
        b: "Plan Basic 39 $/mois. Plan standard 105 $/mois. Plan Advanced 399 $/mois. + apps tierces 20-100 $/mois. Soit 60-400+ $/mois.",
        winner: "a",
      },
      {
        label: "Frais de transaction",
        a: "0%. Vous gardez 100% des marges, hors commission du processor de paiement (Stripe ~1.4-2.5%).",
        b: "2% sur Basic, 1% sur Standard, 0.5% sur Advanced. + commissions Stripe/Shopify Payments standard. Pénalisant à grande échelle.",
        winner: "a",
      },
      {
        label: "Personnalisation visuelle",
        a: "Quasi-illimitée. Thème custom WordPress = liberté totale. Tous les composants éditables, design system custom.",
        b: "Thème Liquid (langage propriétaire). Customisation poussée possible avec un dev senior, mais structure plus rigide.",
        winner: "a",
      },
      {
        label: "Personnalisation fonctionnelle",
        a: "Tout est possible (open-source). Hooks/filters WP pour modifier le comportement à n'importe quelle étape (panier, checkout, factures).",
        b: "Possible mais via les Apps Shopify ou les hooks Shopify. Plus limité pour les workflows métier exotiques.",
        winner: "a",
      },
      {
        label: "Time-to-market initial",
        a: "2-6 semaines pour un site WooCommerce custom propre (thème + plugins config).",
        b: "1-4 semaines pour un Shopify avec thème acheté + customisations légères. Plus rapide pour démarrer.",
        winner: "b",
      },
      {
        label: "Sécurité & maintenance",
        a: "À votre charge. MAJ WordPress + plugins régulières. Backups, audit sécurité, SSL. Compter 100-300 €/mois en maintenance.",
        b: "Géré par Shopify (PCI-DSS, mises à jour auto). 0 charge mentale technique. C'est l'argument fort du SaaS.",
        winner: "b",
      },
      {
        label: "Scalabilité (volume commandes)",
        a: "Très bonne si bien hébergé (Kinsta, Cloudways). Quelques cas de PME normandes à 200k €/an sans problème.",
        b: "Excellente. Shopify Plus tient des sites à 100M $/an sans tomber. Infra mondiale CDN.",
        winner: "b",
      },
      {
        label: "Catalogue de produits",
        a: "Illimité. Variations infinies. Custom attributes, taxonomies riches via ACF.",
        b: "Limité à 100 variants par produit. Suffisant pour la plupart, gênant pour les configurateurs B2B.",
        winner: "a",
      },
    ],
    useCases: [
      {
        label: "PME normande, 500-2000 produits, équipe interne dev/IT",
        description: "Boutique avec workflows métier (B2B, devis, comptabilité française).",
        winner: "a",
        reasoning:
          "WooCommerce sur WordPress permet d'intégrer Sage, EBP, Cegid et tous les outils français nativement. Frais de transaction 0% qui font gagner 5-15k €/an sur un CA de 500k €. Customisation totale pour les workflows métier B2B.",
      },
      {
        label: "Startup D2C française, 50-300 SKUs, growth-focused",
        description: "Marque qui veut scaler vite, expérience client soignée, multi-canal.",
        winner: "b",
        reasoning:
          "Shopify excelle pour la growth : Shopify Inbox, intégrations marketing natives (Meta Ads, TikTok, Google Shopping), Shop Pay qui boost conversion. La rapidité d'itération en growth justifie largement le coût SaaS.",
      },
      {
        label: "E-commerce B2B avec catalogue complexe ou ERP interne",
        description: "Variantes infinies, tarifs négociés par client, intégration ERP métier.",
        winner: "a",
        reasoning:
          "WooCommerce gagne sur la flexibilité B2B : grilles tarifaires par client, devis dans le funnel, intégrations ERP (Sage, Cegid, Divalto) faciles via plugins ou custom. Shopify B2B reste plus rigide.",
      },
    ],
    verdict:
      "Notre règle agence : pour 70% des PME normandes (CA <2M €, équipe technique ou agence dédiée), WooCommerce est le meilleur choix. Pour les startups D2C en hypercroissance ou les marques sans équipe technique, Shopify gagne. Au-delà de 5M € de CA ou pour des opérations multi-pays, Shopify Plus devient une option à étudier. Voir aussi notre article détaillé [WooCommerce vs Shopify pour PME](/blog/woocommerce-vs-shopify-pme).",
    faq: [
      {
        question: "Peut-on migrer de Shopify à WooCommerce ?",
        answer:
          "Oui. La migration prend 4-8 semaines selon le catalogue : export Shopify (CSV produits + clients + commandes), import dans WooCommerce, ré-implémentation des Apps en plugins ou code custom, transfert des thèmes/designs. Compter 8-20 k€ selon la complexité. Le ROI se mesure sur 12-24 mois grâce à l'économie de frais de transaction et d'abonnement.",
      },
      {
        question: "Shopify est-il vraiment plus simple pour démarrer ?",
        answer:
          "Pour un non-tech, oui largement. Inscription, choix d'un thème, ajout des produits, configuration paiement : un solo entrepreneur peut sortir une boutique fonctionnelle en 1 weekend. WooCommerce demande de l'aide technique ou une agence dès le début, mais offre 10x plus de marge de manœuvre ensuite.",
      },
      {
        question: "Quels sont les frais cachés Shopify ?",
        answer:
          "Au-delà de l'abonnement Shopify : (1) Apps tierces 20-100 $/mois (transporteurs, comptabilité, marketing) → compter +100-300 $/mois. (2) Thèmes premium 200-400 $ une fois. (3) Domain 14 $/an. (4) Frais de transaction 0.5-2% sur les ventes (hors Shopify Payments). (5) Migrations / customisations chez un Shopify Expert : 80-150 €/h.",
      },
      {
        question: "Krealabs intervient-il sur Shopify ?",
        answer:
          "Notre spécialité historique est WordPress + WooCommerce. Nous intervenons aussi sur Shopify pour les clients qui ont fait ce choix, mais notre force est davantage sur le custom code et l'intégration aux outils français qu'on retrouve plus naturellement dans l'écosystème WordPress.",
      },
    ],
    keywords: [
      "woocommerce vs shopify",
      "shopify ou woocommerce",
      "woocommerce shopify comparatif",
      "choisir e-commerce 2026",
      "agence woocommerce shopify",
    ],
  },

  "nextjs-vs-wordpress": {
    slug: "nextjs-vs-wordpress",
    a: { name: "Next.js", tagline: "Framework React moderne · Vercel" },
    b: { name: "WordPress", tagline: "CMS · 43% du web" },
    title: "Next.js vs WordPress : quand choisir l'un ou l'autre ?",
    description:
      "Comparatif Next.js vs WordPress pour PME et startups en 2026 : performance, coûts, équipe, écosystème. Le bilan d'une agence rouennaise.",
    intro:
      "Next.js et WordPress ne sont pas tout à fait des concurrents : ce sont deux outils pour deux problèmes différents. WordPress reste le meilleur CMS du marché pour les sites de contenu éditorial. Next.js est le framework de référence pour construire des SaaS, des outils métier et des sites haute performance. Cette page compare honnêtement quand choisir l'un ou l'autre — un sujet qu'on traite plusieurs fois par semaine en agence à Rouen.",
    criteria: [
      {
        label: "Type de projet adapté",
        a: "SaaS, dashboards, applications métier, sites institutionnels haute performance, e-commerce headless premium.",
        b: "Sites éditoriaux, blogs, sites vitrine, boutiques WooCommerce, sites avec mise à jour fréquente par non-tech.",
      },
      {
        label: "Autonomie de l'équipe non-tech",
        a: "Limitée. L'admin doit passer par un CMS headless (Sanity, Contentful) ou par un dev pour publier du contenu.",
        b: "Excellente. WordPress admin = standard, tous les éditeurs comprennent l'interface. Aucune dépendance technique pour publier.",
        winner: "b",
      },
      {
        label: "Performance brute (Core Web Vitals)",
        a: "Top tier. Server Components, streaming, image optimization native, edge runtime. Lighthouse 95+ accessible.",
        b: "Variable. Thème custom optimisé → 90+. Thèmes premium / page builders → souvent 50-70. Demande plus d'effort.",
        winner: "a",
      },
      {
        label: "Coût total de possession (3 ans)",
        a: "Plus élevé : dev custom plus cher (TJM senior), hébergement Vercel 20-100 $/mois, maintenance évolutive 200-800 €/mois.",
        b: "Plus bas pour les sites éditoriaux : hébergement 5-30 €/mois, plugins gratuits/peu chers, maintenance 80-300 €/mois.",
        winner: "b",
      },
      {
        label: "Écosystème de talents (France)",
        a: "Croissant. Devs React/Next.js plus rares et plus chers (TJM 600-1000 €). Profil senior recherché.",
        b: "Massif. Devs WordPress disponibles partout, TJM 350-700 €. Trouver une agence WP en France : 1000+ options.",
        winner: "b",
      },
      {
        label: "Sécurité par défaut",
        a: "Excellente. Pas de plugins tiers à patcher, surface d'attaque limitée, frameworks modernes auditeés.",
        b: "Demande de la maintenance. Plugins tiers = vecteur d'attaque #1. Hygiène stricte requise (MAJ, 2FA, WAF).",
        winner: "a",
      },
      {
        label: "Time-to-market initial",
        a: "4-12 semaines pour un MVP solide. Plus long car tout est custom.",
        b: "2-6 semaines pour un site WP custom propre. Plus rapide à démarrer.",
        winner: "b",
      },
      {
        label: "Scalabilité (trafic + features)",
        a: "Excellente nativement. Edge runtime, serverless functions, CDN intégré, streaming. Architecture moderne.",
        b: "Bonne avec un hébergement adapté (Kinsta, Cloudways). Demande plus d'effort à scaler au-delà de 1M visites/mois.",
        winner: "a",
      },
    ],
    useCases: [
      {
        label: "Site vitrine PME normande (5-20 pages, blog mensuel)",
        description: "Contenu éditorial régulier mis à jour par l'équipe interne.",
        winner: "b",
        reasoning:
          "WordPress sur ce use case bat Next.js sur tous les axes pertinents : moins cher à mettre en place, autonomie de l'équipe sur le contenu, écosystème SEO mature (Yoast/RankMath), maintenance accessible à n'importe quelle agence. Next.js serait un sur-investissement.",
      },
      {
        label: "MVP SaaS B2B (dashboard, multi-tenant, API)",
        description: "Login, espace utilisateur, workflows métier, intégrations Stripe/Auth.",
        winner: "a",
        reasoning:
          "Next.js est conçu pour ça : Server Components pour l'isolation tenant, API Routes pour les webhooks, NextAuth/Clerk pour l'auth, edge runtime pour la perf globale. WordPress ferait l'affaire en bricolant mais avec une dette technique énorme.",
      },
      {
        label: "Site institutionnel haute performance (banque, assurance, grand groupe)",
        description: "Image de marque forte, animations soignées, internationalisation, scale élevé.",
        winner: "a",
        reasoning:
          "Next.js gagne par sa flexibilité technique : i18n natif, contrôle fin du DOM pour les animations Framer Motion, Core Web Vitals 95+ exigés par les marques premium. Un CMS headless (Sanity, Storyblok) en backend donne l'autonomie éditoriale.",
      },
    ],
    verdict:
      "Notre règle agence simple : si l'admin doit publier du contenu plusieurs fois par mois sans nous solliciter → WordPress. Si l'application EST l'outil métier → Next.js. Pour 70% des PME normandes, WordPress reste le bon choix. Pour les SaaS, les sites premium et les outils internes, Next.js. Pour les cas hybrides (besoin éditorial fort + UX moderne), on combine : Next.js front + WordPress headless backend.",
    faq: [
      {
        question: "Peut-on combiner Next.js et WordPress (headless) ?",
        answer:
          "Oui, c'est même une stack qu'on apprécie pour les projets premium : WordPress backend (CMS familier pour l'équipe édito) + Next.js frontend (performance + UX moderne). On expose les contenus WP via REST API ou GraphQL (WPGraphQL), et Next.js les consomme côté serveur. Compter 2-4 semaines de dev en plus vs WordPress traditionnel, pour un Lighthouse 95+ et une vraie autonomie front/back.",
      },
      {
        question: "Combien coûte un projet Next.js vs WordPress ?",
        answer:
          "Site vitrine WordPress custom : 4-7 k€. Site Next.js institutionnel équivalent : 12-25 k€. SaaS Next.js MVP : 25-60 k€. La différence vient du TJM (Next.js senior +30% vs WordPress senior) et du temps de dev (tout est custom en Next.js vs réutilisation de plugins en WP).",
      },
      {
        question: "Krealabs maîtrise-t-il les deux ?",
        answer:
          "Oui, c'est notre proposition. Maxime intervient majoritairement sur Next.js / React / TypeScript, Romain sur le back-end Node.js / PHP / Postgres et l'intégration. Nous travaillons sur les deux stacks quotidiennement et orientons le client vers la bonne option selon le projet, pas selon nos préférences techniques.",
      },
    ],
    keywords: [
      "next.js vs wordpress",
      "nextjs ou wordpress",
      "nextjs wordpress comparatif",
      "choisir nextjs wordpress",
      "agence next.js wordpress rouen",
    ],
  },

  "react-native-vs-flutter": {
    slug: "react-native-vs-flutter",
    a: { name: "React Native", tagline: "Meta · JS · multi-plateforme" },
    b: { name: "Flutter", tagline: "Google · Dart · multi-plateforme" },
    title: "React Native vs Flutter : quel framework mobile en 2026 ?",
    description:
      "React Native vs Flutter : comparatif 2026 pour PME et startups. Performance, écosystème, coûts, time-to-market. Bilan d'une agence mobile à Rouen.",
    intro:
      "React Native et Flutter dominent le développement mobile cross-platform en 2026. Les deux permettent de coder une fois et déployer sur iOS et Android. Mais les philosophies divergent : React Native s'appuie sur l'écosystème React/JS, Flutter sur Dart et son propre rendering engine. Lequel choisir pour votre projet d'app mobile ? Cette page compare honnêtement, du point de vue d'une agence rouennaise qui code des apps React Native depuis 5 ans.",
    criteria: [
      {
        label: "Performance UI",
        a: "Très bonne. Architecture New Architecture (Fabric + TurboModules) depuis 0.74. Performance proche du natif pour 95% des cas.",
        b: "Excellente. Rendering Skia natif, 120 fps en standard, animations ultra-fluides. Avantage Flutter sur les apps visuellement complexes.",
        winner: "b",
      },
      {
        label: "Écosystème & librairies",
        a: "Massif. NPM, intégration avec tout l'écosystème JS (Stripe, Firebase, Analytics, OneSignal, etc.). Profite de l'inertie React.",
        b: "En croissance. Pub.dev compte 30k+ packages. Moins riche que NPM mais largement suffisant pour 99% des besoins.",
        winner: "a",
      },
      {
        label: "Talents disponibles (France)",
        a: "Pool énorme. Tout dev React peut passer à React Native en 1-2 semaines. Recruter ou trouver une agence : très facile.",
        b: "Plus rare. Dart est un langage de niche, demande une formation dédiée. Devs Flutter senior plus chers.",
        winner: "a",
      },
      {
        label: "Time-to-market initial",
        a: "Rapide si l'équipe vient de React. Setup Expo : MVP fonctionnel en 4-6 semaines pour une app simple.",
        b: "Rapide pour un dev natif converti. Setup Flutter SDK + Dart à apprendre. MVP simple en 5-8 semaines.",
        winner: "a",
      },
      {
        label: "OTA updates (push de patchs sans App Store)",
        a: "Excellent avec Expo EAS Update. Déployer une correction de bug ou un changement UX en 5 minutes.",
        b: "Possible avec ShoreBird (payant) ou code push limité. Moins mature qu'Expo.",
        winner: "a",
      },
      {
        label: "Cohérence visuelle iOS / Android",
        a: "Hybride : composants natifs par défaut → look natif différent sur chaque OS. Doit ajuster manuellement pour identique.",
        b: "Uniforme : Flutter dessine sa propre UI → identique iOS/Android. Avantage si vous voulez exactement la même app sur les deux.",
        winner: "b",
      },
      {
        label: "Web & Desktop",
        a: "React Native for Web fonctionne, mais maturité variable. Pas le cas d'usage principal.",
        b: "Flutter for Web et Flutter Desktop officiels. Vraie ambition multi-plateforme. Pour partager du code mobile + web : Flutter gagne.",
        winner: "b",
      },
      {
        label: "Support & gouvernance",
        a: "Meta + Microsoft + Expo + communauté massive. Microsoft pousse fort sur Windows/desktop.",
        b: "Google + Canonical (Linux). Google a réduit l'investissement Flutter en 2024 (équipe réduite), inquiétude communauté.",
        winner: "a",
      },
    ],
    useCases: [
      {
        label: "App mobile MVP pour startup française",
        description: "Login, dashboard, paiement Stripe, notifications push. Time-to-market critique.",
        winner: "a",
        reasoning:
          "React Native avec Expo gagne sur le time-to-market et la facilité de recruter. OTA updates avec EAS Update permettent d'itérer ultra vite après le lancement. Stripe SDK officiel React Native est mature.",
      },
      {
        label: "App grand public avec UX premium et animations complexes",
        description: "Application visuellement riche, transitions soignées, expérience identique iOS/Android.",
        winner: "b",
        reasoning:
          "Flutter gagne sur la perf UI brute et la cohérence visuelle. Si l'app doit avoir des animations 120 fps complexes et un look identique pixel-perfect sur iOS et Android, Flutter est mieux outillé.",
      },
      {
        label: "App utilisée en parallèle d'un site web existant React/Next.js",
        description: "Réutilisation maximale du code et des composants entre web et mobile.",
        winner: "a",
        reasoning:
          "React Native partage 70-80% de la logique métier avec un site React/Next.js (hooks, contexts, API clients). Code marketing-ready et économies réelles. Flutter demanderait de tout réécrire en Dart.",
      },
    ],
    verdict:
      "Notre choix agence en 2026 reste React Native pour 90% des projets clients : écosystème React qui converge avec leur stack web existante, recrutement plus simple, OTA updates puissantes via Expo. Flutter brille pour les apps grand public avec UX premium identique iOS/Android, ou les besoins multi-plateformes (mobile + web + desktop). À noter : la réduction d'investissement Google sur Flutter en 2024 nous rend prudents sur la trajectoire à 5 ans.",
    faq: [
      {
        question: "Combien coûte une app mobile en React Native vs Flutter ?",
        answer:
          "Le différentiel de coût est faible : MVP simple 30-50 k€ dans les deux cas, app complète 50-100 k€. Le vrai écart vient du TJM (Flutter senior ~10-15% plus cher en France) et du time-to-market (RN gagne 2-3 semaines en moyenne grâce à Expo).",
      },
      {
        question: "L'app React Native est-elle vraiment moins performante ?",
        answer:
          "Plus depuis 2023. La New Architecture (Fabric + TurboModules) a comblé l'écart pour 95% des cas. Pour des apps avec animations très complexes (jeux 2D, dashboards 60+ widgets temps réel), Flutter garde un avantage mesurable. Pour 99% des apps métier ou startups, la performance est indiscernable.",
      },
      {
        question: "Krealabs développe-t-il aussi en Flutter ?",
        answer:
          "Nous codons en React Native + Expo, qui est notre stack mobile principale. Pour un projet Flutter, nous orientons vers nos partenaires spécialisés Dart/Flutter — ou nous le faisons en équipe étendue si c'est strictement nécessaire. Notre maîtrise est davantage sur l'écosystème React/JS.",
      },
    ],
    keywords: [
      "react native vs flutter",
      "flutter ou react native",
      "react native flutter comparatif",
      "choisir framework mobile",
      "agence mobile rouen react native",
    ],
  },
};

export const COMPARATOR_SLUGS = Object.keys(COMPARATORS);
