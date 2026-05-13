/**
 * Lexique technique web Krealabs.
 * Pages /lexique/[slug] courtes (400-700 mots) qui définissent les termes
 * techniques que les clients nous demandent en RDV. Optimisé pour :
 *  - AI search (ChatGPT, Perplexity citent volontiers les définitions claires)
 *  - Long-tail SEO ("c'est quoi headless WordPress", "définition Core Web Vitals")
 *  - Citations sur schema.org DefinedTerm
 */

export interface GlossaryEntry {
  slug: string;
  term: string;
  shortDef: string;
  /** Synonymes / variations courantes pour le SEO + le markup */
  synonyms?: string[];
  /** Catégorie : Web, Mobile, SEO, WordPress, Infrastructure */
  category: string;
  /** Définition longue, ~300-500 mots, peut contenir markdown léger (gras) */
  definition: string;
  /** Pourquoi c'est important côté business / projet */
  whyItMatters: string;
  /** Comment Krealabs aborde ce sujet sur les projets clients */
  ourApproach: string;
  /** Termes liés (slugs) pour cross-linking */
  relatedTerms: string[];
  /** Liens internes vers articles, services ou cases */
  relatedLinks?: { label: string; url: string }[];
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  "headless-wordpress": {
    slug: "headless-wordpress",
    term: "Headless WordPress",
    shortDef:
      "Architecture où WordPress sert uniquement de back-office CMS, sans afficher de site web côté visiteur. Le front-end est rendu par un framework moderne séparé (Next.js, Astro, Gatsby).",
    synonyms: ["WordPress découplé", "WordPress decoupled", "WP headless"],
    category: "WordPress",
    definition:
      "Le **headless WordPress** sépare le back-office (où les rédacteurs créent et éditent du contenu) du front-end (le site web public que voient les visiteurs). WordPress garde son interface admin familière et expose les contenus via une API REST ou GraphQL (avec le plugin WPGraphQL). Un framework moderne — typiquement **Next.js**, Astro ou Gatsby — consomme cette API et génère un site web haute performance. Cette approche combine le meilleur des deux mondes : l'ergonomie WordPress pour l'équipe édito + la rapidité native de Next.js pour les visiteurs.",
    whyItMatters:
      "Pour les sites WordPress qui souffrent de performances médiocres (Lighthouse <70, LCP >3s), le headless est souvent la meilleure réponse sans devoir abandonner WordPress. Les rédacteurs continuent d'utiliser WordPress comme avant. Les visiteurs accèdent à un site 3-5x plus rapide. Le SEO en bénéficie directement (Core Web Vitals 95+ accessibles).",
    ourApproach:
      "Chez Krealabs, on déploie WordPress headless quand 3 conditions sont réunies : (1) le client a une équipe éditoriale active qui veut garder WordPress, (2) il y a un besoin de performance/UX moderne, (3) le budget permet le double travail (WP backend + Next.js frontend). Notre stack typique : WordPress + WPGraphQL en backend, Next.js + Vercel en frontend.",
    relatedTerms: ["wpgraphql", "next-js", "core-web-vitals"],
    relatedLinks: [
      { label: "Notre offre WordPress", url: "/services/wordpress" },
      {
        label: "Pourquoi WordPress reste le bon choix en 2026",
        url: "/blog/pourquoi-wordpress-reste-le-bon-choix-2026",
      },
    ],
  },

  "core-web-vitals": {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    shortDef:
      "Trois métriques de performance web mesurées par Google qui notent la qualité d'expérience utilisateur : LCP (Largest Contentful Paint), INP (Interaction to Next Paint) et CLS (Cumulative Layout Shift).",
    synonyms: ["CWV", "Web Vitals", "Métriques Google"],
    category: "SEO",
    definition:
      "Les **Core Web Vitals** (CWV) sont les 3 métriques de performance que Google utilise officiellement comme facteur de classement SEO depuis 2021. **LCP** (Largest Contentful Paint) mesure la vitesse de chargement du plus gros élément visible (objectif < 2.5s). **INP** (Interaction to Next Paint, remplace FID depuis mars 2024) mesure la réactivité aux interactions utilisateur (objectif < 200ms). **CLS** (Cumulative Layout Shift) mesure la stabilité visuelle pendant le chargement (objectif < 0.1). Un site est considéré comme \"passing CWV\" quand ces 3 métriques sont dans le vert sur 75% des sessions utilisateur réelles.",
    whyItMatters:
      "Les Core Web Vitals impactent directement le SEO Google depuis 2021 (Page Experience Update). Un site avec des CWV mauvais perd des positions face à un concurrent équivalent qui passe. Au-delà du SEO, l'impact business est mesurable : +100ms de LCP = -7% de conversion en moyenne (étude Akamai). C'est l'une des optimisations au meilleur ROI possible.",
    ourApproach:
      "Sur tous nos projets clients, nous visons Lighthouse 90+ sur les 3 métriques au lancement. Méthode : image optimization (AVIF/WebP, lazy loading, dimensions explicites), preload des fonts critiques, suppression du JavaScript inutile, hébergement edge (Vercel ou CDN Cloudflare), audit régulier avec WebPageTest et PageSpeed Insights. Nous monitorons en continu via Vercel Speed Insights ou Plausible.",
    relatedTerms: ["lighthouse", "schema-org", "lcp", "inp"],
    relatedLinks: [
      {
        label: "Article complet : Core Web Vitals & INP 2026",
        url: "/blog/core-web-vitals-2026-inp",
      },
      {
        label: "Notre service Performance & SEO",
        url: "/services/performance-seo",
      },
    ],
  },

  "schema-org": {
    slug: "schema-org",
    term: "Schema.org (données structurées)",
    shortDef:
      "Vocabulaire standardisé créé par Google, Microsoft, Yahoo et Yandex pour décrire le contenu d'une page web aux moteurs de recherche. Permet d'obtenir des rich snippets (étoiles, FAQ, breadcrumbs, etc.) dans les SERPs.",
    synonyms: ["JSON-LD", "Structured Data", "Données structurées", "Microdata"],
    category: "SEO",
    definition:
      "**Schema.org** est un vocabulaire de markup partagé entre tous les moteurs de recherche pour décrire structurellement le contenu d'une page (article, produit, événement, recette, personne, organisation, etc.). Le format moderne utilisé est **JSON-LD** : un script JSON inclus dans la balise `<head>` de la page. Google utilise ces données pour générer des **rich snippets** (résultats enrichis) : étoiles d'évaluation, FAQ déroulantes, fil d'Ariane, image de recette, etc. Présence dans les SERPs : +30 à +50% de CTR mesuré sur les pages avec rich snippets.",
    whyItMatters:
      "Le schema.org n'est plus optionnel en 2026 — il est attendu par défaut par Google. Pour un site agence, les schemas les plus rentables sont : **Organization/ProfessionalService** (Knowledge Panel), **Article** sur les blog posts, **FAQPage** sur les FAQ (rich snippets accordéon), **BreadcrumbList** (fil d'Ariane dans SERP), **Person** sur les auteurs (E-E-A-T), **AggregateRating** quand on a des avis vérifiés.",
    ourApproach:
      "Sur tous nos projets Krealabs, nous injectons 5-7 schemas par page selon le type : Organization sitewide, Article + BreadcrumbList + HowTo sur les guides, FAQPage sur les FAQ services, Person sur les pages auteur (/equipe/[slug]). Tests systématiques sur le Rich Results Test de Google + Schema.org Validator avant mise en prod.",
    relatedTerms: ["seo-local", "core-web-vitals", "e-e-a-t"],
    relatedLinks: [
      {
        label: "Article : Schema.org pour agences web",
        url: "/blog/schema-org-agences-web",
      },
    ],
  },

  "seo-local": {
    slug: "seo-local",
    term: "SEO local",
    shortDef:
      "Ensemble de techniques pour ressortir dans les résultats de recherche Google géolocalisés (pack local avec carte, recherches \"métier + ville\", recherches mobile à proximité).",
    synonyms: ["Référencement local", "Local SEO", "Pack local Google"],
    category: "SEO",
    definition:
      "Le **SEO local** vise à positionner un site dans les résultats Google qui ont une intention géographique : recherches type \"agence web Rouen\", \"plombier près de moi\", ou la position du visiteur détectée. La cible #1 est le **pack local** : les 3 résultats affichés avec une carte en haut de la page de résultats, qui captent ~50% des clics sur les requêtes locales. Les 3 piliers du SEO local : (1) **Google Business Profile** complet et actif (catégorie précise, photos, posts, avis), (2) **Schema.org LocalBusiness** sur le site, (3) **Citations** cohérentes (nom + adresse + téléphone identiques) sur les annuaires régionaux (CCI, presse locale, FrenchTech).",
    whyItMatters:
      "Pour une PME locale (cabinet, commerce, agence, artisan), le SEO local est généralement le levier digital au meilleur ROI. Un commerce dans le pack local sur sa catégorie capte 30-100 leads/mois supplémentaires. À l'inverse, ne pas y être = invisibilité quasi-totale sur les recherches locales mobiles.",
    ourApproach:
      "Notre méthode SEO local pour les PME de Normandie : (1) audit fiche Google Business + optimisation catégories/photos/posts, (2) Schema LocalBusiness/ProfessionalService sur le site, (3) pages géolocalisées (`/agence-web-rouen`, `/agence-web-le-havre`, etc.), (4) campagne d'avis Google clients (objectif 20+ avis 4.5★+), (5) backlinks locaux (CCI, presse régionale). Objectif typique : top 3 pack local sous 6 mois.",
    relatedTerms: ["schema-org", "google-business-profile"],
    relatedLinks: [
      { label: "Guide SEO local Rouen pour PME", url: "/blog/seo-local-rouen-guide-pme" },
      { label: "Agence web à Rouen", url: "/agence-web-rouen" },
    ],
  },

  "acf-pro": {
    slug: "acf-pro",
    term: "ACF Pro (Advanced Custom Fields)",
    shortDef:
      "Plugin WordPress de référence pour créer des champs personnalisés et des contenus structurés. Permet de transformer WordPress en CMS sur mesure sans toucher au code PHP.",
    synonyms: ["Advanced Custom Fields Pro", "ACF"],
    category: "WordPress",
    definition:
      "**ACF Pro** (Advanced Custom Fields, version payante par WP Engine) est le plugin WordPress qui permet de définir des **champs personnalisés** structurés associés aux pages, articles ou types de contenu. Concrètement, on peut créer un type \"Étude de cas\" avec des champs typés (texte, image, gallery, lien, repeater, group, flexible content), puis afficher ces champs dans le thème PHP avec des fonctions simples. ACF Pro est devenu un standard de fait dans les agences WordPress : 80%+ des sites WP custom sérieux l'utilisent. Coût : 79 $/an pour 1 site, 249 $/an unlimited.",
    whyItMatters:
      "Sans ACF, créer un site WordPress avec des contenus structurés (au-delà des Pages et Articles natifs) demande du code PHP custom. ACF rend ce travail trivial pour le dev et donne une interface admin propre à l'éditeur. Sans ACF, on retombe sur les page builders (Elementor, Divi) qui ajoutent du bloat de code et plombent les Core Web Vitals.",
    ourApproach:
      "Sur tous nos projets WordPress custom, ACF Pro est installé en standard. Notre méthode : (1) définir tous les content types avec ACF (custom post types + champs structurés), (2) coder le thème PHP qui les affiche, (3) zéro page builder, zéro shortcode magique. Résultat : sites avec Lighthouse 90+, faciles à maintenir, propres en édition.",
    relatedTerms: ["custom-post-type", "wordpress-thème-custom"],
    relatedLinks: [
      { label: "Notre service WordPress", url: "/services/wordpress" },
    ],
  },

  "custom-post-type": {
    slug: "custom-post-type",
    term: "Custom Post Type (CPT)",
    shortDef:
      "Type de contenu personnalisé créé dans WordPress, distinct des Pages et Articles natifs. Permet de gérer des contenus métiers spécifiques (produits, événements, témoignages, équipe) avec leur propre admin.",
    synonyms: ["CPT", "Type de contenu personnalisé", "Custom Post Types"],
    category: "WordPress",
    definition:
      "Un **Custom Post Type** (CPT) est un type de contenu créé dans WordPress en plus des deux types natifs : **Pages** et **Articles**. WordPress permet de créer autant de CPT que nécessaire pour modéliser le métier du site : \"Produits\" pour un e-commerce, \"Événements\" pour une asso, \"Membres de l'équipe\" pour un cabinet, \"Études de cas\" pour une agence. Chaque CPT a son propre menu dans l'admin, ses propres permaliens, ses propres taxonomies (catégories custom) et ses propres templates dans le thème.",
    whyItMatters:
      "Sans CPT, on serait obligé de tout stocker dans les Articles, ce qui rendrait l'admin chaotique au-delà de 50 contenus. Avec CPT + ACF Pro, on construit un vrai CMS sur mesure pour le client : l'admin WordPress devient un outil métier intuitif. C'est ce qui fait la différence entre un \"site WordPress\" et un \"outil métier sur WordPress\".",
    ourApproach:
      "Chez Krealabs, nous créons systématiquement les CPT nécessaires au métier du client. Exemple récent : pour un cabinet d'architecte, CPT \"Projet\" avec champs ACF (typologie, surface, ville, photos, plans), CPT \"Membre équipe\" (poste, diplôme, photo), CPT \"Récompense\". L'admin devient un outil métier, pas juste un blog.",
    relatedTerms: ["acf-pro", "wordpress-thème-custom"],
  },

  "core-web-vitals-lcp": {
    slug: "core-web-vitals-lcp",
    term: "LCP (Largest Contentful Paint)",
    shortDef:
      "Métrique Core Web Vitals mesurant le temps de chargement du plus gros élément visible à l'écran (image, vidéo, titre). Objectif Google : < 2.5 secondes sur 75% des sessions.",
    synonyms: ["Largest Contentful Paint", "Plus grande peinture de contenu"],
    category: "SEO",
    definition:
      "Le **LCP** (Largest Contentful Paint) est l'une des 3 Core Web Vitals officielles de Google. Il mesure le **temps écoulé entre le début du chargement et le moment où le plus gros élément visible à l'écran est affiché**. Ce plus gros élément est typiquement : image hero, vidéo, bloc de texte H1, image de fond. Objectif Google pour passer en \"Good\" : LCP < 2.5 secondes sur 75% des visites réelles. \"Needs improvement\" entre 2.5 et 4s. \"Poor\" au-delà de 4s. Mesuré dans Search Console > Expérience > Core Web Vitals (données field réelles).",
    whyItMatters:
      "Un LCP > 4s sur mobile = pénalité SEO directe Google + taux de rebond doublé (étude Akamai). Améliorer le LCP de 1s = +10-20% de conversion mesurée sur l'e-commerce.",
    ourApproach:
      "Pour atteindre un LCP < 2s : (1) preload de l'image hero (`<link rel=\"preload\">`), (2) format AVIF/WebP avec dimensions explicites, (3) CDN edge (Vercel/Cloudflare), (4) suppression du JS bloquant le rendu, (5) fonts inline ou self-hosted avec `font-display: swap`. Sur les sites WordPress hérités, on remplace Elementor/Divi qui plombent le LCP par un thème custom.",
    relatedTerms: ["core-web-vitals", "inp"],
  },

  "inp": {
    slug: "inp",
    term: "INP (Interaction to Next Paint)",
    shortDef:
      "Métrique Core Web Vitals qui mesure la réactivité du site aux interactions utilisateur (clic, tap, frappe clavier). Remplace officiellement FID depuis mars 2024. Objectif Google : < 200ms.",
    synonyms: ["Interaction to Next Paint", "Réactivité"],
    category: "SEO",
    definition:
      "L'**INP** (Interaction to Next Paint) est la métrique Core Web Vitals qui remplace officiellement FID (First Input Delay) depuis mars 2024. Elle mesure le **temps écoulé entre une interaction utilisateur** (clic, tap, frappe) **et le rafraîchissement visuel suivant**. Contrairement à FID qui ne mesurait que la première interaction, INP capture la **plus mauvaise interaction** sur l'ensemble de la session (au 98ème percentile). Objectif Google : INP < 200ms sur 75% des visites. \"Poor\" au-delà de 500ms.",
    whyItMatters:
      "L'INP révèle des problèmes que FID cachait : long tasks JavaScript pendant l'utilisation du site, scripts tiers (analytics, chat, A/B testing) qui bloquent le thread principal, animations CSS lourdes. C'est désormais le critère le plus difficile à passer pour les sites WordPress avec beaucoup de plugins.",
    ourApproach:
      "Pour passer INP en vert : (1) audit des long tasks dans Lighthouse > Performance, (2) suppression ou défer des scripts non essentiels (chat, A/B testing), (3) lazy loading des composants React/JS lourds, (4) éviter les re-renders inutiles (React.memo, useMemo), (5) hot paths sur le main thread déplacés en Web Workers si nécessaire. Sur les sites WordPress : suppression des plugins JS-lourd (Elementor, popups, sliders bloatés).",
    relatedTerms: ["core-web-vitals", "core-web-vitals-lcp"],
  },

  "wpgraphql": {
    slug: "wpgraphql",
    term: "WPGraphQL",
    shortDef:
      "Plugin WordPress gratuit qui expose le contenu WordPress via une API GraphQL. Permet de construire des sites headless avec Next.js, Gatsby ou Astro tout en gardant WordPress comme back-office.",
    category: "WordPress",
    definition:
      "**WPGraphQL** est un plugin WordPress open-source qui transforme une installation WordPress en serveur GraphQL. Il expose nativement tous les contenus WP (posts, pages, custom post types ACF, taxonomies, users, médias) via une API GraphQL flexible et fortement typée. Avantage sur la REST API native WordPress : queries précises (on demande exactement les champs dont on a besoin, vs over-fetching REST), schema introspectable (intégration IDE), extensions pour ACF Pro (acf-to-wpgraphql), Yoast, WooCommerce, etc. Devenu standard de fait pour les setups WordPress headless modernes.",
    whyItMatters:
      "Sans GraphQL, faire du headless WordPress avec la REST native demande beaucoup de plomberie côté frontend. WPGraphQL transforme WordPress en backend moderne en quelques heures d'installation/config. Permet aussi à un dev React/Next.js non-WP de travailler en autonomie sur le frontend, sans connaître PHP.",
    ourApproach:
      "Sur nos projets WordPress headless, WPGraphQL est installé par défaut, avec l'extension acf-to-wpgraphql pour exposer les champs ACF. Caching avec Redis ou Object Cache Pro pour la performance. Frontend Next.js qui consomme l'API en SSR (Server Components Next.js 13+) pour bénéficier de l'ISR (Incremental Static Regeneration) tout en gardant l'éditorial dynamique.",
    relatedTerms: ["headless-wordpress", "acf-pro", "next-js"],
  },

  "next-js": {
    slug: "next-js",
    term: "Next.js",
    shortDef:
      "Framework React de référence pour la production : rendu côté serveur (SSR), génération statique (SSG), App Router, Server Components, optimisations automatiques. Créé et maintenu par Vercel.",
    synonyms: ["NextJS", "Framework Next"],
    category: "Web",
    definition:
      "**Next.js** est le framework React le plus utilisé en production en 2026. Maintenu par **Vercel**, il fournit nativement : Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR), Server Components (depuis 13.0), App Router (depuis 13.0), optimisation automatique des images, fonts, scripts, code splitting agressif, edge runtime. Versions clés : 13 (App Router + Server Components), 14 (turbopack stable), 15 (React 19), 16 (2026, performances accrues). Pour la majorité des projets React modernes (sites institutionnels, SaaS, e-commerce headless), Next.js est devenu le défaut.",
    whyItMatters:
      "Avec Next.js, on obtient sans configuration des sites avec Lighthouse 95+, un SEO solide (vs un SPA React classique qui souffre côté SEO), un déploiement edge mondial via Vercel, et une DX excellente pour les équipes dev. Pour les projets institutionnels haute exigence ou les SaaS B2B, Next.js est devenu un standard de fait.",
    ourApproach:
      "Krealabs code en Next.js sur 100% des projets non-WordPress (sites custom, SaaS, dashboards, plateformes). Stack typique : Next.js 16 + TypeScript strict + Tailwind 4 + Prisma + Postgres Neon + déploiement Vercel. Pour les projets WordPress qui demandent plus de perf, on combine WordPress headless + Next.js frontend.",
    relatedTerms: ["headless-wordpress", "react-server-components", "vercel"],
    relatedLinks: [
      { label: "Notre stack Next.js", url: "/technologies/nextjs" },
      {
        label: "Article : Next.js 16 et App Router",
        url: "/blog/nextjs-16-app-router-2026",
      },
    ],
  },

  "react-server-components": {
    slug: "react-server-components",
    term: "React Server Components (RSC)",
    shortDef:
      "Composants React qui s'exécutent côté serveur et envoient au navigateur uniquement leur résultat HTML, sans JavaScript. Réduisent drastiquement la taille du bundle JS et améliorent les Core Web Vitals.",
    synonyms: ["RSC", "Server Components"],
    category: "Web",
    definition:
      "Les **React Server Components** (RSC) sont une innovation React majeure introduite stable dans React 19 (2024) et largement adoptée via **Next.js App Router**. Contrairement aux composants React classiques (qui s'exécutent dans le navigateur), un RSC s'exécute **uniquement côté serveur** : son JavaScript ne traverse jamais le réseau. Le client reçoit uniquement le HTML final + un payload léger pour les Client Components imbriqués. Résultat : bundles JS divisés par 2 à 10, Time-to-Interactive amélioré, possibilité d'utiliser des dépendances Node-only (database, fs, secret keys) directement dans le composant.",
    whyItMatters:
      "Les RSC changent la donne pour les sites haute performance : on retrouve la légèreté d'un site statique classique tout en gardant la DX de React. Pour un site avec beaucoup de pages éditoriales et peu d'interactivité, le bundle JS peut tomber sous 50KB (vs 200-500KB pour un SPA React classique). Impact direct sur LCP, INP, et Lighthouse.",
    ourApproach:
      "Chez Krealabs, nous adoptons les RSC par défaut sur tous les nouveaux projets Next.js depuis 2024. Règle simple : tout est Server Component sauf si on a explicitement besoin de useState, useEffect, ou d'un event handler — alors on isole en Client Component (`\"use client\"`). Résultat : Lighthouse 95+ accessible sans optimisation manuelle.",
    relatedTerms: ["next-js", "core-web-vitals"],
    relatedLinks: [
      {
        label: "Article : React 19 Server Components en pratique",
        url: "/blog/react-19-server-components-pratique",
      },
    ],
  },

  "typescript": {
    slug: "typescript",
    term: "TypeScript",
    shortDef:
      "Langage de programmation développé par Microsoft qui ajoute un système de types statiques au-dessus de JavaScript. Devenu standard de fait pour le développement web professionnel en 2026.",
    synonyms: ["TS"],
    category: "Web",
    definition:
      "**TypeScript** est un langage open-source créé par Microsoft qui se compile en JavaScript pur. Il ajoute des **types statiques** : on déclare le type des variables, paramètres de fonction, retours, objets, etc. Le compilateur vérifie la cohérence à la compilation et signale les erreurs avant l'exécution. Bénéfices mesurables : (1) ~15% moins de bugs en production (étude Airbnb), (2) refactoring sûr (renommer une variable propage les erreurs), (3) autocomplétion VS Code parfaite, (4) documentation vivante via les types. Adoption massive : Microsoft, Google, Airbnb, Stripe, et 90%+ des nouvelles startups tech codent en TypeScript depuis 2022.",
    whyItMatters:
      "Sur un projet de plus de 5000 lignes ou avec une équipe de plus de 2 devs, TypeScript devient indispensable. Sans types, le refactoring devient risqué et la dette technique explose. Sur les projets Krealabs (typiquement 10-50k lignes), TypeScript est non négociable.",
    ourApproach:
      "100% de nos projets sont en TypeScript strict (mode strict activé : strictNullChecks, noImplicitAny, etc.). Aucune utilisation de `any` sans justification documentée. Types partagés entre frontend et backend via packages internes ou tRPC selon le cas.",
    relatedTerms: ["next-js", "react-server-components"],
    relatedLinks: [
      { label: "TypeScript chez Krealabs", url: "/technologies/typescript" },
      {
        label: "Article : TypeScript 5 strict mode",
        url: "/blog/typescript-5-strict-mode",
      },
    ],
  },

  "lighthouse": {
    slug: "lighthouse",
    term: "Lighthouse (audit Google)",
    shortDef:
      "Outil d'audit automatique open-source de Google qui note un site sur 4 axes : Performance, Accessibility, Best Practices, SEO. Score de 0 à 100, intégré dans Chrome DevTools et PageSpeed Insights.",
    synonyms: ["Audit Lighthouse", "Google Lighthouse"],
    category: "SEO",
    definition:
      "**Lighthouse** est l'outil d'audit web officiel de Google, intégré dans Chrome DevTools (onglet Lighthouse) et accessible publiquement via **PageSpeed Insights** (pagespeed.web.dev). Il évalue une URL sur 4 catégories : **Performance** (Core Web Vitals + métriques annexes), **Accessibility** (WCAG, contraste, labels), **Best Practices** (HTTPS, vulnérabilités JS, console errors), **SEO** (metadata, mobile-friendly, schema, internal linking). Chaque catégorie est notée de 0 à 100. Un score de 90+ sur les 4 catégories est considéré comme excellent.",
    whyItMatters:
      "Lighthouse est utilisé par Google pour évaluer les Core Web Vitals (Performance), qui sont un facteur de classement SEO direct depuis 2021. C'est aussi la référence des clients qui font leur due diligence technique sur une agence. Un site livré par Krealabs doit afficher Lighthouse 90+ au lancement, sinon nous remboursons (engagement contractuel).",
    ourApproach:
      "Lighthouse audit avant livraison de chaque projet. Score minimal : 90 sur les 4 axes. Si un score est en dessous, on identifie les opportunités (rapport Lighthouse les liste) et on corrige avant livraison. En production, monitoring continu via Vercel Speed Insights pour détecter les régressions.",
    relatedTerms: ["core-web-vitals", "core-web-vitals-lcp", "inp"],
    relatedLinks: [
      {
        label: "Article : Méthode d'audit Lighthouse",
        url: "/blog/audit-lighthouse-methode-agence",
      },
    ],
  },

  "e-e-a-t": {
    slug: "e-e-a-t",
    term: "E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)",
    shortDef:
      "Cadre d'évaluation Google qui note la qualité d'un contenu et de son auteur : Experience (vécu), Expertise (compétence), Authoritativeness (autorité), Trustworthiness (confiance). Critère SEO clé depuis 2022.",
    synonyms: ["EEAT", "E-A-T"],
    category: "SEO",
    definition:
      "**E-E-A-T** est le cadre d'évaluation qualité utilisé par Google et ses évaluateurs humains pour scorer les contenus web. Les 4 piliers : **Experience** (l'auteur a-t-il une expérience vécue du sujet ?), **Expertise** (compétence technique sur le sujet), **Authoritativeness** (reconnu comme autorité par d'autres sources ?), **Trustworthiness** (transparence, sources fiables, mentions légales claires). Très important pour les contenus YMYL (Your Money or Your Life) : santé, finance, juridique. Google a ajouté le \"Experience\" en décembre 2022, en plus du E-A-T historique.",
    whyItMatters:
      "Sur les requêtes compétitives, Google favorise désormais les contenus signés par des auteurs identifiables avec une autorité reconnue dans leur domaine. Un blog anonyme ou pseudonyme se positionne mal sur les requêtes \"informationnelles\" compétitives en 2026.",
    ourApproach:
      "Sur tous nos projets blogs/contenus, nous mettons en place : (1) pages auteur dédiées avec bio, photo, expertise, contributions externes, (2) schema Person enrichi avec sameAs (GitHub, LinkedIn), knowsAbout, (3) byline systématique avec lien vers la page auteur, (4) mentions légales et coordonnées transparentes. Sur Krealabs.fr, voir nos pages [/equipe/maxime-dubois](/equipe/maxime-dubois) et [/equipe/romain-clatot](/equipe/romain-clatot).",
    relatedTerms: ["schema-org", "core-web-vitals"],
  },

  "stripe": {
    slug: "stripe",
    term: "Stripe (paiement en ligne)",
    shortDef:
      "Plateforme de paiement en ligne leader mondial. Permet d'accepter les cartes bancaires, virements SEPA, Apple Pay, Google Pay, etc. directement sur un site ou une app, avec une commission ~1.4% + 0.25€.",
    synonyms: ["Stripe Payments"],
    category: "Infrastructure",
    definition:
      "**Stripe** est la plateforme de paiement en ligne la plus utilisée par les développeurs en 2026. Elle expose une API claire et bien documentée pour accepter les paiements par carte bancaire, virement SEPA, Apple Pay, Google Pay, prélèvement automatique, et 40+ moyens de paiement locaux dans 50+ pays. Commissions standard : **1.4% + 0.25€** par transaction en Europe (cartes EU), 2.9% + 0.25€ pour les cartes internationales. SDKs officiels pour Node.js, Python, PHP, Ruby, Java, .NET. Stripe Checkout (page de paiement hébergée), Stripe Elements (intégration custom), Stripe Connect (marketplace), Stripe Billing (abonnements).",
    whyItMatters:
      "Stripe est devenu le standard de fait : intégration en quelques heures vs des semaines avec les processeurs bancaires traditionnels. Pour un MVP SaaS ou une boutique en ligne, c'est le choix par défaut. Concurrents notables : Adyen (entreprise), Mollie (Europe), Paddle (digital products avec gestion TVA mondiale).",
    ourApproach:
      "Stripe est notre processor de paiement par défaut chez Krealabs : intégrations Stripe Payments sur les sites e-commerce custom, Stripe Billing sur les SaaS B2B, Stripe Connect pour les marketplaces. Compter ~3-5 jours de dev pour une intégration Stripe propre avec webhooks, gestion des erreurs, comptabilité.",
    relatedTerms: ["next-js"],
  },
};

export const GLOSSARY_SLUGS = Object.keys(GLOSSARY);

export function getEntry(slug: string): GlossaryEntry | undefined {
  return GLOSSARY[slug];
}

export function getCategoryEntries(category: string): GlossaryEntry[] {
  return Object.values(GLOSSARY).filter((e) => e.category === category);
}
