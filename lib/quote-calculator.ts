/**
 * Calculateur de fourchette de prix pour un projet web.
 * Toutes les valeurs en HT, basées sur le marché normand 2026.
 *
 * Le calcul est volontairement transparent : pas de boîte noire.
 * On veut que le prospect ait une idée réaliste AVANT de prendre RDV.
 */

export type ProjectType =
  | "site-vitrine"
  | "ecommerce"
  | "saas"
  | "app-mobile"
  | "refonte";

export interface ProjectTypeMeta {
  slug: ProjectType;
  label: string;
  shortDescription: string;
  /** Fourchette min/max en € HT */
  baseRange: [number, number];
  /** Délai indicatif typique */
  baseTimelineWeeks: string;
}

export const PROJECT_TYPES: ProjectTypeMeta[] = [
  {
    slug: "site-vitrine",
    label: "Site vitrine / institutionnel",
    shortDescription:
      "Site web de présentation, blog, formulaire de contact. WordPress ou Next.js selon le cas.",
    baseRange: [3500, 7000],
    baseTimelineWeeks: "3-6 semaines",
  },
  {
    slug: "ecommerce",
    label: "Site e-commerce",
    shortDescription:
      "Boutique en ligne avec catalogue, paiement, gestion de stock. WooCommerce ou Shopify selon le profil.",
    baseRange: [8000, 18000],
    baseTimelineWeeks: "5-10 semaines",
  },
  {
    slug: "saas",
    label: "Application SaaS / logiciel métier",
    shortDescription:
      "Plateforme avec login, dashboard, fonctionnalités métier custom. Next.js + Postgres en standard.",
    baseRange: [25000, 70000],
    baseTimelineWeeks: "8-16 semaines",
  },
  {
    slug: "app-mobile",
    label: "Application mobile iOS + Android",
    shortDescription:
      "App native cross-platform en React Native. Une seule base de code pour deux app stores.",
    baseRange: [30000, 80000],
    baseTimelineWeeks: "10-18 semaines",
  },
  {
    slug: "refonte",
    label: "Refonte de site existant",
    shortDescription:
      "Modernisation graphique, performance, SEO, sans repartir de zéro. Migration de contenu incluse.",
    baseRange: [4000, 12000],
    baseTimelineWeeks: "3-8 semaines",
  },
];

export interface Feature {
  slug: string;
  label: string;
  description: string;
  /** Coût additionnel min/max en € HT */
  costRange: [number, number];
  /** Types de projet auxquels cette feature s'applique */
  applicableTo: ProjectType[];
}

export const FEATURES: Feature[] = [
  {
    slug: "multilingue",
    label: "Multilingue (FR + EN minimum)",
    description: "Architecture i18n, traductions, balises hreflang.",
    costRange: [800, 2500],
    applicableTo: ["site-vitrine", "ecommerce", "saas", "refonte"],
  },
  {
    slug: "design-sur-mesure",
    label: "Design 100% sur mesure (vs thème adapté)",
    description: "Maquettes Figma originales, design system custom.",
    costRange: [1500, 4000],
    applicableTo: ["site-vitrine", "ecommerce", "saas", "app-mobile", "refonte"],
  },
  {
    slug: "blog-actu",
    label: "Blog éditorial + Schema Article",
    description: "Module blog avec catégories, tags, schema.org Article.",
    costRange: [500, 1500],
    applicableTo: ["site-vitrine", "ecommerce", "saas", "refonte"],
  },
  {
    slug: "seo-local",
    label: "SEO local approfondi (Rouen / Normandie)",
    description:
      "Schema LocalBusiness, optimisation Google Business, pages géolocalisées.",
    costRange: [800, 2500],
    applicableTo: ["site-vitrine", "ecommerce", "refonte"],
  },
  {
    slug: "paiement-stripe",
    label: "Paiement Stripe (achats one-shot ou abonnements)",
    description:
      "Stripe Checkout, gestion des produits, webhooks, factures.",
    costRange: [1500, 4000],
    applicableTo: ["ecommerce", "saas", "app-mobile"],
  },
  {
    slug: "auth-comptes",
    label: "Comptes utilisateur + authentification",
    description:
      "Inscription, login, OAuth Google/GitHub, gestion sessions sécurisée.",
    costRange: [1200, 3500],
    applicableTo: ["saas", "app-mobile", "ecommerce"],
  },
  {
    slug: "integrations-tierces",
    label: "Intégrations tierces (CRM, ERP, comptabilité…)",
    description:
      "Connexion HubSpot, Pipedrive, Cegid, Sage, etc. via API ou webhooks.",
    costRange: [1500, 6000],
    applicableTo: ["ecommerce", "saas", "site-vitrine"],
  },
  {
    slug: "notifications-push",
    label: "Notifications push (app mobile)",
    description:
      "Setup Firebase Cloud Messaging ou OneSignal, gestion des permissions.",
    costRange: [800, 2500],
    applicableTo: ["app-mobile"],
  },
  {
    slug: "offline-mode",
    label: "Mode offline / synchronisation différée",
    description:
      "PWA ou app native qui marche sans connexion, sync à la reconnection.",
    costRange: [2000, 6000],
    applicableTo: ["saas", "app-mobile"],
  },
  {
    slug: "espace-admin",
    label: "Back-office admin custom (au-delà de WordPress)",
    description:
      "Interface d'administration sur mesure : utilisateurs, données métier, exports.",
    costRange: [3000, 12000],
    applicableTo: ["saas", "ecommerce"],
  },
];

export type Urgency = "flexible" | "normal" | "urgent";

export const URGENCY_MULTIPLIERS: Record<Urgency, { multiplier: number; label: string; description: string }> = {
  flexible: {
    multiplier: 0.95,
    label: "Pas urgent (3 mois +)",
    description: "Vous laissez le temps de bien faire — -5% sur le total.",
  },
  normal: {
    multiplier: 1.0,
    label: "Délai standard (4-8 semaines)",
    description: "Délai confortable pour livrer un travail propre.",
  },
  urgent: {
    multiplier: 1.2,
    label: "Urgent (< 4 semaines)",
    description: "Mobilisation prioritaire de l'équipe — +20% sur le total.",
  },
};

export interface Estimate {
  min: number;
  max: number;
  features: Feature[];
  projectType: ProjectTypeMeta;
  urgency: Urgency;
  timeline: string;
}

/**
 * Calcule la fourchette de prix selon les choix utilisateur.
 * Retourne min/max en € HT + le détail des features sélectionnées.
 */
export function calculateEstimate({
  projectType,
  featureSlugs,
  urgency,
}: {
  projectType: ProjectType;
  featureSlugs: string[];
  urgency: Urgency;
}): Estimate {
  const projectMeta = PROJECT_TYPES.find((p) => p.slug === projectType)!;
  const features = FEATURES.filter((f) => featureSlugs.includes(f.slug));
  const urgencyMeta = URGENCY_MULTIPLIERS[urgency];

  const featuresMin = features.reduce((sum, f) => sum + f.costRange[0], 0);
  const featuresMax = features.reduce((sum, f) => sum + f.costRange[1], 0);

  const totalMin = Math.round(
    (projectMeta.baseRange[0] + featuresMin) * urgencyMeta.multiplier,
  );
  const totalMax = Math.round(
    (projectMeta.baseRange[1] + featuresMax) * urgencyMeta.multiplier,
  );

  return {
    min: totalMin,
    max: totalMax,
    features,
    projectType: projectMeta,
    urgency,
    timeline: projectMeta.baseTimelineWeeks,
  };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
