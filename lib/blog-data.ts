export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
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

export const blogPosts: BlogPost[] = [
  {
    slug: "next-js-15-performance",
    title: "Next.js 15 : Les nouvelles fonctionnalites qui changent tout",
    excerpt: "Decouvrez comment Next.js 15 revolutionne le developpement web avec ses nouveaux outils de performance et son systeme de cache ameliore.",
    category: "Developpement",
    date: "15 Novembre 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    featured: true,
    author: {
      name: "Maxime Dubois",
      role: "Lead Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    },
    tags: ["Next.js", "React", "Performance", "Web"],
    content: {
      introduction: "Next.js 15 apporte des ameliorations majeures en termes de performance et d'experience developpeur. Dans cet article, nous allons explorer les fonctionnalites les plus importantes et comment elles peuvent transformer votre workflow de developpement.",
      sections: [
        {
          title: "Le nouveau systeme de cache",
          content: "Next.js 15 introduit un systeme de cache completement repense qui ameliore drastiquement les performances. Le cache est maintenant plus intelligent et sait exactement quand invalider les donnees.",
          code: `// Exemple de configuration du cache
export const revalidate = 3600; // Cache pendant 1 heure

export async function getData() {
  const res = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 }
  });
  return res.json();
}`,
        },
        {
          title: "Turbopack en production",
          content: "Turbopack, le successeur de Webpack ecrit en Rust, est maintenant stable en production. Les temps de build sont reduits de 70% en moyenne, ce qui accelere considerablement le processus de deploiement.",
        },
        {
          title: "Server Actions ameliorees",
          content: "Les Server Actions sont maintenant plus puissantes et plus faciles a utiliser. Elles permettent d'ecrire du code serveur directement dans vos composants React sans avoir besoin de creer des routes API separees.",
          code: `'use server'

export async function submitForm(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');

  // Traitement cote serveur
  await saveToDatabase({ name, email });

  return { success: true };
}`,
        },
        {
          title: "Optimisation des images",
          content: "Le composant Image a ete optimise pour charger les images encore plus rapidement. Le lazy loading est maintenant plus intelligent et anticipe le scroll de l'utilisateur.",
        },
      ],
      conclusion: "Next.js 15 represente une evolution majeure du framework. Avec ces nouvelles fonctionnalites, le developpement d'applications web performantes n'a jamais ete aussi accessible. Nous recommandons fortement la migration pour tous vos projets.",
    },
  },
  {
    slug: "design-system-react",
    title: "Creer un Design System evolutif avec React",
    excerpt: "Guide complet pour construire un design system modulaire et maintenable pour vos projets React.",
    category: "Design",
    date: "10 Novembre 2024",
    readTime: "12 min",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    featured: false,
    author: {
      name: "Sophie Martin",
      role: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    tags: ["Design System", "React", "UI/UX", "Components"],
    content: {
      introduction: "Un design system bien concu est la cle d'une application coherente et facile a maintenir. Decouvrons ensemble comment creer un design system evolutif avec React et TypeScript.",
      sections: [
        {
          title: "Les fondations : tokens de design",
          content: "Tout design system commence par la definition de tokens : couleurs, espacements, typographie. Ces tokens servent de source de verite unique pour toute l'application.",
          code: `// design-tokens.ts
export const colors = {
  primary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    500: '#A543F1',
    900: '#4c1d95',
  },
  neutral: {
    50: '#fafafa',
    900: '#171717',
  },
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
};`,
        },
        {
          title: "Composants atomiques",
          content: "Suivez la methodologie Atomic Design pour organiser vos composants. Commencez par les atomes (boutons, inputs) puis progressez vers les molecules et organismes.",
          code: `// Button.tsx
import { colors, spacing } from './design-tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children
}: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      style={{
        backgroundColor: colors.primary[500],
        padding: spacing[size],
      }}
    >
      {children}
    </button>
  );
}`,
        },
        {
          title: "Documentation avec Storybook",
          content: "Storybook est essentiel pour documenter et tester vos composants en isolation. Chaque composant devrait avoir ses stories avec tous ses variants.",
        },
        {
          title: "Tests et accessibilite",
          content: "Un bon design system inclut des tests automatises et respecte les normes d'accessibilite WCAG. Utilisez jest-axe pour verifier l'accessibilite de vos composants.",
        },
      ],
      conclusion: "Un design system est un investissement a long terme qui ameliore la coherence, la vitesse de developpement et la qualite globale de vos applications. Prenez le temps de bien le concevoir des le debut.",
    },
  },
  {
    slug: "optimisation-core-web-vitals",
    title: "Optimiser vos Core Web Vitals pour un meilleur SEO",
    excerpt: "Techniques avancees pour ameliorer les performances de votre site et booster votre referencement naturel.",
    category: "Performance",
    date: "5 Novembre 2024",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    featured: true,
    author: {
      name: "Thomas Laurent",
      role: "Performance Engineer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    },
    tags: ["Performance", "SEO", "Web Vitals", "Optimization"],
    content: {
      introduction: "Les Core Web Vitals sont devenus un facteur de ranking crucial pour Google. Comprendre et optimiser ces metriques est essentiel pour ameliorer votre SEO et l'experience utilisateur.",
      sections: [
        {
          title: "Comprendre les Core Web Vitals",
          content: "Les Core Web Vitals mesurent trois aspects cles : LCP (Largest Contentful Paint) pour le chargement, FID (First Input Delay) pour l'interactivite, et CLS (Cumulative Layout Shift) pour la stabilite visuelle.",
        },
        {
          title: "Optimiser le LCP",
          content: "Pour ameliorer le LCP, optimisez vos images, utilisez un CDN, implementez le preloading des ressources critiques, et reduisez le temps de reponse du serveur.",
          code: `<!-- Preload des ressources critiques -->
<link rel="preload" as="image" href="/hero-image.webp" />

<!-- Image optimisee avec Next.js -->
<Image
  src="/hero-image.webp"
  alt="Hero"
  width={1200}
  height={600}
  priority
  quality={85}
/>`,
        },
        {
          title: "Reduire le FID",
          content: "Minimisez l'execution de JavaScript, divisez le code en chunks plus petits, et utilisez le lazy loading pour les composants non-critiques.",
          code: `// Lazy loading de composants
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <Skeleton /> }
);`,
        },
        {
          title: "Eliminer le CLS",
          content: "Reservez l'espace pour les images et les ads, evitez d'inserer du contenu au-dessus du contenu existant, et utilisez les attributs width et height sur les medias.",
        },
      ],
      conclusion: "L'optimisation des Core Web Vitals est un processus continu. Utilisez des outils comme Lighthouse et PageSpeed Insights pour monitorer vos progres et identifier les opportunites d'amelioration.",
    },
  },
  {
    slug: "react-native-expo-2024",
    title: "React Native et Expo : Le duo gagnant en 2024",
    excerpt: "Pourquoi React Native avec Expo reste le meilleur choix pour developper des applications mobiles cross-platform.",
    category: "Mobile",
    date: "1 Novembre 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    featured: false,
    author: {
      name: "Julie Rousseau",
      role: "Mobile Developer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    tags: ["React Native", "Expo", "Mobile", "Cross-platform"],
    content: {
      introduction: "En 2024, React Native avec Expo continue de dominer le developpement mobile cross-platform. Decouvrons pourquoi ce duo reste imbattable pour creer des applications mobiles modernes.",
      sections: [
        {
          title: "Expo SDK 50 : Les nouveautes",
          content: "Expo SDK 50 apporte des ameliorations majeures : support complet de React Native 0.73, nouveau systeme de build, et integration amelioree avec les API natives.",
        },
        {
          title: "Developpement accelere",
          content: "Avec Expo Go et le hot reload, vous pouvez tester vos modifications instantanement sur un appareil reel. Le gain de temps est considerable par rapport au developpement natif.",
          code: `// Configuration Expo simple
{
  "expo": {
    "name": "MyApp",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "plugins": [
      "expo-router"
    ]
  }
}`,
        },
        {
          title: "EAS Build et Updates",
          content: "EAS (Expo Application Services) revolutionne le processus de build et de deploiement. Les updates OTA permettent de pousser des corrections sans passer par les stores.",
        },
        {
          title: "Performance native",
          content: "Contrairement aux idees recues, React Native offre des performances quasi-natives grace au nouveau moteur Hermes et a l'architecture Fabric.",
        },
      ],
      conclusion: "React Native et Expo forment un ecosysteme mature et puissant. Que vous soyez startup ou grande entreprise, ce stack technologique vous permettra de livrer des applications mobiles de qualite rapidement.",
    },
  },
  {
    slug: "typescript-tips-2024",
    title: "10 astuces TypeScript pour un code plus robuste",
    excerpt: "Decouvrez les meilleures pratiques TypeScript pour ecrire un code type-safe et maintenable.",
    category: "Developpement",
    date: "28 Octobre 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
    featured: false,
    author: {
      name: "Alexandre Dupont",
      role: "Senior Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    },
    tags: ["TypeScript", "Best Practices", "Code Quality"],
    content: {
      introduction: "TypeScript est devenu incontournable dans l'ecosysteme JavaScript. Voici 10 astuces pour tirer le meilleur parti du typage statique et ecrire du code plus sur.",
      sections: [
        {
          title: "Utilisez 'unknown' au lieu de 'any'",
          content: "Le type 'unknown' est une alternative plus sure a 'any'. Il force la verification de type avant utilisation.",
          code: `// Mauvais
function processValue(value: any) {
  return value.toUpperCase();
}

// Bon
function processValue(value: unknown) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  throw new Error('Expected string');
}`,
        },
        {
          title: "Type Guards personnalises",
          content: "Creez des type guards pour des verifications de type reutilisables et type-safe.",
          code: `interface User {
  id: string;
  name: string;
}

function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
  );
}`,
        },
        {
          title: "Utility Types",
          content: "Maitrisez les utility types comme Partial, Pick, Omit, et Record pour manipuler les types efficacement.",
          code: `interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Ne garder que certains champs
type UserPreview = Pick<User, 'id' | 'name'>;

// Rendre tous les champs optionnels
type PartialUser = Partial<User>;

// Exclure des champs
type UserWithoutAge = Omit<User, 'age'>;`,
        },
        {
          title: "Const Assertions",
          content: "Utilisez 'as const' pour des types litteraux plus precis.",
          code: `// Type: string[]
const colors1 = ['red', 'blue', 'green'];

// Type: readonly ['red', 'blue', 'green']
const colors2 = ['red', 'blue', 'green'] as const;`,
        },
      ],
      conclusion: "Ces astuces TypeScript vous aideront a ecrire du code plus robuste et maintenable. Le typage statique peut sembler verbeux au debut, mais il previent de nombreux bugs en production.",
    },
  },
  {
    slug: "ia-developpement-web",
    title: "L'IA au service du developpement web",
    excerpt: "Comment l'intelligence artificielle transforme notre facon de coder et d'optimiser les applications web.",
    category: "IA",
    date: "20 Octobre 2024",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    featured: true,
    author: {
      name: "Marie Lefevre",
      role: "AI Specialist",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80",
    },
    tags: ["IA", "AI", "Development", "Automation"],
    content: {
      introduction: "L'intelligence artificielle revolutionne le developpement web. Des assistants de code aux outils d'optimisation automatique, decouvrons comment l'IA ameliore notre productivite et la qualite de nos applications.",
      sections: [
        {
          title: "Assistants de code IA",
          content: "GitHub Copilot, Claude Code et d'autres assistants IA accelerent considerablement le developpement en suggerant du code contextuel et en automatisant les taches repetitives.",
        },
        {
          title: "Optimisation automatique",
          content: "Les outils bases sur l'IA peuvent analyser votre code et suggerer des optimisations de performance, detecter les vulnerabilites de securite, et identifier le code mort.",
          code: `// L'IA peut suggerer des optimisations comme :

// Avant
const result = array.filter(x => x > 10).map(x => x * 2);

// Apres (optimise)
const result = array.reduce((acc, x) => {
  if (x > 10) acc.push(x * 2);
  return acc;
}, []);`,
        },
        {
          title: "Generation de tests automatique",
          content: "L'IA peut generer des suites de tests completes en analysant votre code, couvrant les cas limites que vous auriez pu manquer.",
        },
        {
          title: "Accessibilite amelioree",
          content: "Des outils IA analysent vos interfaces et suggerent des ameliorations d'accessibilite, generent des alt texts pertinents, et verifient le contraste des couleurs.",
        },
        {
          title: "L'avenir : AI-First Development",
          content: "Nous nous dirigeons vers un paradigme ou l'IA sera integree a chaque etape du cycle de developpement, de la conception a la production.",
        },
      ],
      conclusion: "L'IA n'est pas la pour remplacer les developpeurs, mais pour les augmenter. En adoptant ces outils intelligemment, nous pouvons nous concentrer sur les aspects creatifs et strategiques du developpement web.",
    },
  },
];
