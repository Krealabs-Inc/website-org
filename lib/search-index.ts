/**
 * Index de recherche côté client pour /api/search ou Cmd+K modal.
 * Compile toutes les pages indexables du site en un tableau Fuse.js.
 *
 * Pré-généré au build via importation de :
 *  - blogPosts (lib/blog-data)
 *  - CITIES (lib/cities)
 *  - SECTORS (lib/sectors)
 *  - COMPARATORS (lib/comparators)
 *  - GLOSSARY (lib/glossary)
 *  - TEAM (lib/team)
 *  + pages statiques codées en dur
 */

import { blogPosts } from "@/lib/blog-data";
import { CITIES } from "@/lib/cities";
import { SECTORS } from "@/lib/sectors";
import { COMPARATORS } from "@/lib/comparators";
import { GLOSSARY } from "@/lib/glossary";
import { TEAM } from "@/lib/team";

export interface SearchItem {
  /** URL de la page */
  url: string;
  /** Titre court à afficher */
  title: string;
  /** Description / preview */
  excerpt: string;
  /** Catégorie pour le groupement visuel */
  category:
    | "Page"
    | "Service"
    | "Article"
    | "Auteur"
    | "Ville"
    | "Secteur"
    | "Comparateur"
    | "Lexique";
  /** Tags pour le SEO interne (optionnel) */
  keywords?: string[];
}

const STATIC_PAGES: SearchItem[] = [
  { url: "/", title: "Accueil", excerpt: "Krealabs, agence digitale à Rouen.", category: "Page" },
  { url: "/notre-histoire", title: "Notre histoire", excerpt: "L'histoire de l'agence Krealabs depuis 2020.", category: "Page" },
  { url: "/equipe", title: "L'équipe", excerpt: "Maxime Dubois et Romain Clatot, co-fondateurs développeurs.", category: "Page" },
  { url: "/expertise", title: "Expertise & savoir-faire", excerpt: "Compétences techniques et secteurs accompagnés.", category: "Page" },
  { url: "/clients", title: "Travaux clients", excerpt: "Études de cas anonymisées de projets Krealabs.", category: "Page" },
  { url: "/faq", title: "FAQ", excerpt: "Questions fréquentes : délais, méthode, tarifs.", category: "Page" },
  { url: "/contact", title: "Contact", excerpt: "Formulaire de demande et coordonnées.", category: "Page" },
  { url: "/changelog", title: "Changelog", excerpt: "Évolutions et nouveautés du site.", category: "Page" },
  { url: "/blog", title: "Blog", excerpt: "Articles techniques et retours d'expérience.", category: "Page" },
  { url: "/comparateur", title: "Comparateurs techniques", excerpt: "Choisir entre 2 stacks.", category: "Page" },
  { url: "/lexique", title: "Lexique du web", excerpt: "Définitions techniques.", category: "Page" },
  { url: "/calculateur", title: "Calculateur de devis", excerpt: "Estimer le prix de votre projet web.", category: "Page" },
];

const SERVICES: SearchItem[] = [
  { url: "/services", title: "Tous nos services", excerpt: "Vue d'ensemble des prestations.", category: "Service" },
  { url: "/services/wordpress", title: "WordPress sur mesure", excerpt: "Spécialité Krealabs : thèmes custom, WooCommerce, refonte.", category: "Service" },
  { url: "/services/developpement-web", title: "Développement web custom", excerpt: "Next.js, React, Python. Plateformes SaaS et outils métier.", category: "Service" },
  { url: "/services/applications-mobile", title: "Applications mobiles", excerpt: "React Native iOS + Android.", category: "Service" },
  { url: "/services/design-uiux", title: "Design UI/UX", excerpt: "Maquettes Figma, design systems.", category: "Service" },
  { url: "/services/performance-seo", title: "Performance & SEO", excerpt: "Audit Core Web Vitals, SEO local.", category: "Service" },
];

export const SEARCH_INDEX: SearchItem[] = [
  ...STATIC_PAGES,
  ...SERVICES,

  // Pages locales
  ...Object.values(CITIES).map((c) => ({
    url: c.path,
    title: `Agence web ${c.cityArticle}`,
    excerpt: c.heroIntro.slice(0, 180),
    category: "Ville" as const,
    keywords: c.keywords,
  })),

  // Programmatic sectors
  ...Object.values(SECTORS).map((s) => ({
    url: `/agence-web-rouen/${s.slug}`,
    title: `Agence web pour ${s.namePlural} à Rouen`,
    excerpt: s.intro.slice(0, 180),
    category: "Secteur" as const,
    keywords: s.keywords,
  })),

  // Comparator pages
  ...Object.values(COMPARATORS).map((c) => ({
    url: `/comparateur/${c.slug}`,
    title: `${c.a.name} vs ${c.b.name}`,
    excerpt: c.description,
    category: "Comparateur" as const,
    keywords: c.keywords,
  })),

  // Lexique
  ...Object.values(GLOSSARY).map((g) => ({
    url: `/lexique/${g.slug}`,
    title: g.term,
    excerpt: g.shortDef,
    category: "Lexique" as const,
    keywords: g.synonyms,
  })),

  // Pages auteur
  ...TEAM.map((m) => ({
    url: `/equipe/${m.slug}`,
    title: m.name,
    excerpt: m.bio,
    category: "Auteur" as const,
  })),

  // Articles blog
  ...blogPosts.map((p) => ({
    url: `/blog/${p.slug}`,
    title: p.title,
    excerpt: p.excerpt,
    category: "Article" as const,
    keywords: p.tags,
  })),
];
