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

export const UPCOMING_TEAM: UpcomingMember[] = [
  {
    name: "SOON",
    role: "Fondateur",
    initials: "?",
    teaser:
      "Profil en cours de préparation. Nom, rôle détaillé et parcours seront publiés ici prochainement.",
  },
  {
    name: "SOON",
    role: "Fondateur",
    initials: "?",
    teaser:
      "Profil en cours de préparation. Nom, rôle détaillé et parcours seront publiés ici prochainement.",
  },
];
