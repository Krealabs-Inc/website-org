/**
 * Source unique pour les profils membres de l'équipe Krealabs.
 * Utilisé par /equipe (liste), /equipe/[slug] (pages individuelles
 * pour le E-E-A-T Google) et par le schema Article (auteur des blog posts).
 */

export interface TeamMember {
  /** Slug URL : "maxime-dubois" → /equipe/maxime-dubois */
  slug: string;
  /** Nom affiché : "Maxime Dubois" */
  name: string;
  /** Rôle / titre */
  role: string;
  /** Initiales pour avatar fallback */
  initials: string;
  /** Bio courte (200-300 chars) pour les cartes et le markup */
  bio: string;
  /** Bio longue pour la page profil individuelle (E-E-A-T) */
  longBio: string;
  /** Ville + région */
  location: string;
  /** Années d'expérience (string pour "10+", "5+", etc.) */
  yearsExperience: string;
  /** Phrase serif italique : ce que la personne aime faire */
  loves: string;
  /** URL absolue ou relative au domaine */
  photo?: string;
  /** Liens externes (sameAs schema) */
  github?: string;
  linkedin?: string;
  twitter?: string;
  /** Site perso éventuel */
  website?: string;
  /** Spécialités (chips affichées dans la carte) */
  specialties: string[];
  /** Stack technique (chips) */
  stack: string[];
  /** Sujets sur lesquels la personne fait autorité (Person.knowsAbout schema) */
  knowsAbout: string[];
  /** Métadonnées SEO de la page profil individuelle */
  metaTitle: string;
  metaDescription: string;
}

export const TEAM: TeamMember[] = [
  {
    slug: "maxime-dubois",
    name: "Maxime Dubois",
    role: "Fondateur · Développeur full-stack",
    initials: "MD",
    bio: "Fondateur de Krealabs. Passionné de développement web depuis 10+ ans, j'aime concevoir des produits digitaux à la fois performants, accessibles et beaux. Mon rôle : architecture technique, développement, suivi des projets et relation client.",
    longBio:
      "Maxime Dubois est le fondateur et développeur de Krealabs, agence digitale basée à Rouen. Avec plus de 10 ans d'expérience en développement web, il pilote l'architecture technique des projets, le développement et la relation client, de la conception au déploiement. Diplômé en informatique, il s'est spécialisé sur la stack React / Next.js après plusieurs années sur des projets WordPress et PHP. Il intervient sur l'ensemble de la chaîne : front-end, back-end, API, bases de données, infrastructure (Vercel, Neon, hébergement), performances (Core Web Vitals, optimisation Lighthouse) et accessibilité. Maxime contribue à plusieurs projets open source sur GitHub et écrit régulièrement sur le blog Krealabs autour du SEO, du développement et de l'architecture frontend moderne.",
    location: "Rouen, Normandie",
    yearsExperience: "10+",
    loves: "Concevoir des interfaces où chaque détail compte.",
    photo: "/team/maxime.webp",
    github: "https://github.com/makcimerrr",
    linkedin: "https://www.linkedin.com/in/maxime-dubois-0265a4292/",
    specialties: ["Full-stack", "Architecture", "Suivi client"],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
    knowsAbout: [
      "Développement web",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "API REST",
      "WordPress",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Architecture web",
      "Performance web",
      "Core Web Vitals",
      "SEO technique",
      "Accessibilité web (RGAA, WCAG)",
      "Vercel",
      "Stripe",
      "Hébergement web",
      "Agence digitale Rouen",
    ],
    metaTitle: "Maxime Dubois - Fondateur & développeur Krealabs (Rouen)",
    metaDescription:
      "Maxime Dubois, fondateur et développeur full-stack de Krealabs à Rouen. 10+ ans en développement web, expert Next.js, React, TypeScript et architecture frontend moderne.",
  },
  {
    slug: "thibaud-masurel",
    name: "Thibaud Masurel",
    role: "Associé · Développeur back-end",
    initials: "TM",
    bio: "Associé chez Krealabs. Ancien éducateur sportif reconverti dans le développement, formé à Zone01 Rouen. J'aime le back-end et l'algorithmique : API, modèles de données, logique métier et performances.",
    longBio:
      "Thibaud Masurel est associé et développeur chez Krealabs, à Rouen. Après plusieurs années comme éducateur sportif (BPJEPS APT, formation Sport Santé au CREPS de Nantes, BAFD), il se reconvertit dans le développement web et rejoint en 2025 la formation Zone01 Rouen, centrée sur Go et l'algorithmique. Il y développe des applications web en Go (serveur HTTP, templates, consommation d'API REST), un algorithme de recherche de chemin optimal sur graphe (Lem-in), un moteur de jeu 2D en JavaScript vanilla et TeamUp Hub, une plateforme de gestion pour associations sportives en React, Node.js et Prisma. Chez Krealabs, il intervient surtout côté serveur : API, bases de données, logique métier et performances.",
    location: "Rouen, Normandie",
    yearsExperience: "1+",
    loves: "Optimiser un algorithme jusqu'à ce qu'il devienne simple et rapide.",
    photo: "/team/thibaud.jpg",
    github: "https://github.com/ThMasurel",
    linkedin: "https://www.linkedin.com/in/thibaud-masurel-90b960380/",
    specialties: ["Back-end", "Go", "Algorithmique"],
    stack: ["Go", "JavaScript", "React", "Node.js", "Prisma", "Docker"],
    knowsAbout: [
      "Développement web",
      "Go",
      "JavaScript",
      "React",
      "Node.js",
      "API REST",
      "SQL",
      "Prisma",
      "Docker",
      "Tailwind CSS",
      "Algorithmique",
      "Théorie des graphes",
    ],
    metaTitle: "Thibaud Masurel - Associé & développeur back-end Krealabs (Rouen)",
    metaDescription:
      "Thibaud Masurel, associé et développeur back-end chez Krealabs à Rouen. Formé à Zone01, spécialisé en Go, API REST et algorithmique.",
  },
  {
    slug: "paul-bouqueret",
    name: "Paul Bouqueret",
    role: "Associé · Développeur web",
    initials: "PB",
    bio: "Associé chez Krealabs. Formé au développement web à Zone01 Rouen Normandie, je travaille sur toute la chaîne d'un projet, du serveur en Go à l'interface, avec un goût particulier pour les fonctionnalités temps réel.",
    longBio:
      "Paul Bouqueret est associé et développeur chez Krealabs, à Rouen. Il s'est formé au développement web à Zone01 Rouen Normandie, une formation intensive par projets centrée sur Go, JavaScript et l'algorithmique. Il y a notamment conçu, avec Thibaud Masurel, un forum temps réel en single page application : back-end Go, API REST et WebSockets, base SQLite sans ORM, sessions sécurisées par cookies HttpOnly et mots de passe hachés avec bcrypt, front-end en JavaScript vanilla. Chez Krealabs, il participe au développement des projets clients, côté serveur comme côté interface.",
    location: "Rouen, Normandie",
    yearsExperience: "1+",
    loves: "Voir une application réagir en direct, sans rechargement.",
    linkedin: "https://www.linkedin.com/in/paulbouqueret/",
    github: "https://github.com/pbouqueret",
    specialties: ["Full-stack", "Go", "Temps réel"],
    stack: ["Go", "JavaScript", "SQLite", "WebSockets", "HTML/CSS", "Git"],
    knowsAbout: [
      "Développement web",
      "Go",
      "JavaScript",
      "API REST",
      "WebSockets",
      "SQLite",
      "SQL",
      "Sécurité web",
      "Single Page Application",
    ],
    metaTitle: "Paul Bouqueret - Associé & développeur web Krealabs (Rouen)",
    metaDescription:
      "Paul Bouqueret, associé et développeur web chez Krealabs à Rouen. Formé à Zone01, spécialisé en Go, JavaScript, API REST et applications temps réel.",
  },
];

export const TEAM_SLUGS = TEAM.map((m) => m.slug);

export function getMember(slug: string): TeamMember | undefined {
  return TEAM.find((m) => m.slug === slug);
}

/**
 * Fondateurs dont le profil public n'est pas encore publié.
 * Volontairement séparés de TEAM : pas de page /equipe/[slug], pas de
 * schema Person, pas d'entrée sitemap ni de résultat de recherche tant
 * que les informations réelles ne sont pas renseignées.
 */
export interface UpcomingMember {
  /** Libellé affiché à la place du nom */
  name: string;
  /** Rôle affiché */
  role: string;
  /** Placeholder d'avatar */
  initials: string;
  /** Phrase affichée à la place de la bio */
  teaser: string;
}

export const UPCOMING_TEAM: UpcomingMember[] = [];
