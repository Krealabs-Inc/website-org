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
  avatar: "https://avatars.githubusercontent.com/u/makcimerrr",
};

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
    featured: true,
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
