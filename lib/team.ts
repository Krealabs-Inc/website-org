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
    role: "Co-fondateur · Développeur full-stack",
    initials: "MD",
    bio: "Co-fondateur de Krealabs. Passionné de développement web depuis 10+ ans, j'aime concevoir des produits digitaux à la fois performants, accessibles et beaux. Mon rôle : architecture technique, suivi des projets et relation client.",
    longBio:
      "Maxime Dubois est co-fondateur et CTO de Krealabs, agence digitale basée à Rouen. Avec plus de 10 ans d'expérience en développement web, il pilote l'architecture technique des projets et la relation client. Diplômé en informatique, il s'est spécialisé sur la stack React / Next.js après plusieurs années sur des projets WordPress et PHP. Il intervient régulièrement sur les choix d'infrastructure (Vercel, Neon, hébergement), les performances (Core Web Vitals, optimisation Lighthouse) et l'accessibilité. Maxime contribue à plusieurs projets open source sur GitHub et écrit régulièrement sur le blog Krealabs autour du SEO, du développement et de l'architecture frontend moderne.",
    location: "Rouen, Normandie",
    yearsExperience: "10+",
    loves: "Concevoir des interfaces où chaque détail compte.",
    photo: "/team/maxime.webp",
    github: "https://github.com/makcimerrr",
    linkedin: "https://www.linkedin.com/in/maxime-dubois-0265a4292/",
    specialties: ["Full-stack", "Architecture", "Suivi client"],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    knowsAbout: [
      "Développement web",
      "Next.js",
      "React",
      "TypeScript",
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
    metaTitle: "Maxime Dubois — Co-fondateur & CTO Krealabs (Rouen)",
    metaDescription:
      "Maxime Dubois, co-fondateur et CTO de Krealabs à Rouen. 10+ ans en développement web, expert Next.js, React, TypeScript et architecture frontend moderne.",
  },
  {
    slug: "romain-clatot",
    name: "Romain Clatot",
    role: "Co-fondateur · Développeur back-end & intégrations",
    initials: "RC",
    bio: "Co-fondateur de Krealabs, basé à Rouen. Profil polyvalent avec une appétence forte pour le back-end, les API et l'intégration de systèmes. Romain pilote les choix d'architecture serveur, les modèles de données et les intégrations tierces sur les projets Krealabs.",
    longBio:
      "Romain Clatot est co-fondateur de Krealabs, agence digitale à Rouen. Spécialisé sur le back-end, les API et l'intégration de systèmes tiers, il pilote les choix d'architecture serveur, les modèles de données relationnels et les intégrations critiques (paiement Stripe, authentification, services externes, intégrations ERP/CRM). Avec 5+ ans d'expérience en développement web, Romain intervient régulièrement sur des stacks Node.js, TypeScript, PHP et Python. Il a une expérience particulière sur les architectures GraphQL et les bases de données PostgreSQL en production. Il accompagne aussi nos clients sur les questions DevOps (CI/CD GitHub Actions, conteneurisation Docker, déploiement multi-environnement).",
    location: "Rouen, Normandie",
    yearsExperience: "5+",
    loves: "Bâtir des API claires et des modèles de données qui tiennent.",
    photo: "https://avatars.githubusercontent.com/u/123472397?v=4",
    github: "https://github.com/CLTRomain",
    linkedin: "https://www.linkedin.com/in/romain-clatot/",
    specialties: ["Back-end & API", "Intégrations", "Bases de données"],
    stack: ["TypeScript", "Node.js", "GraphQL", "PHP", "PostgreSQL", "Docker"],
    knowsAbout: [
      "Développement back-end",
      "API REST",
      "GraphQL",
      "Node.js",
      "TypeScript",
      "PHP",
      "Python",
      "PostgreSQL",
      "MySQL",
      "Prisma",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Stripe",
      "Architecture serveur",
      "Modélisation de données",
      "Agence digitale Rouen",
    ],
    metaTitle: "Romain Clatot — Co-fondateur Krealabs (Rouen)",
    metaDescription:
      "Romain Clatot, co-fondateur de Krealabs à Rouen. Spécialiste back-end, API GraphQL, PostgreSQL et intégrations de systèmes (Stripe, ERP, CRM).",
  },
];

export const TEAM_SLUGS = TEAM.map((m) => m.slug);

export function getMember(slug: string): TeamMember | undefined {
  return TEAM.find((m) => m.slug === slug);
}
