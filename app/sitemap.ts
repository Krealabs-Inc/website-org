import { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog-data";
import { CITIES } from "@/lib/cities";
import { SECTOR_SLUGS } from "@/lib/sectors";
import { TEAM_SLUGS } from "@/lib/team";
import { CATEGORY_SLUGS } from "@/app/blog/category/[slug]/page";
import { INDEXABLE_TAG_SLUGS } from "@/app/blog/tag/[slug]/page";
import { COMPARATOR_SLUGS } from "@/lib/comparators";
import { GLOSSARY_SLUGS } from "@/lib/glossary";

const baseUrl = "https://krealabs.fr";
const now = new Date();

/**
 * Échappe les `&` non-entités pour qu'une URL avec query string
 * (ex: Unsplash `?w=1200&q=80`) reste un XML valide dans <image:loc>.
 * Next.js n'échappe pas automatiquement le contenu de ce champ.
 */
function escapeXmlUrl(url: string): string {
  return url.replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/agence-web-rouen`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notre-histoire`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/equipe`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/clients`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/politique-confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cgv`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/wordpress`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/developpement-web`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/applications-mobile`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/design-uiux`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/performance-seo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];

  const techPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/technologies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/technologies/nextjs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/technologies/react`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/technologies/react-native`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/technologies/typescript`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];

  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Articles de blog individuels — chargés depuis blog-data.ts
  // Inclut images pour Google Images (post.image + OG dynamique)
  const blogArticles: MetadataRoute.Sitemap = getPublishedPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: post.featured ? 0.75 : 0.65,
    images: [
      ...(post.image ? [escapeXmlUrl(post.image)] : []),
      `${baseUrl}/blog/${post.slug}/opengraph-image`,
    ],
  }));

  // Pages locales par ville (Rouen, Le Havre, Caen, Évreux)
  const cityPages: MetadataRoute.Sitemap = Object.values(CITIES)
    .filter((c) => c.slug !== "rouen") // Rouen est déjà dans staticPages
    .map((c) => ({
      url: `${baseUrl}${c.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

  // Pages programmatic SEO /agence-web-rouen/[secteur]
  const sectorPages: MetadataRoute.Sitemap = SECTOR_SLUGS.map((secteur) => ({
    url: `${baseUrl}/agence-web-rouen/${secteur}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Pages auteur individuelles (E-E-A-T)
  const authorPages: MetadataRoute.Sitemap = TEAM_SLUGS.map((slug) => ({
    url: `${baseUrl}/equipe/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // Pages catégorie blog (5 catégories)
  const blogCategoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${baseUrl}/blog/category/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  // Pages tag blog (uniquement tags avec ≥3 articles)
  const blogTagPages: MetadataRoute.Sitemap = INDEXABLE_TAG_SLUGS.map((slug) => ({
    url: `${baseUrl}/blog/tag/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }));

  // Comparator pages (commercial intent élevé)
  const comparatorPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/comparateur`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...COMPARATOR_SLUGS.map((slug) => ({
      url: `${baseUrl}/comparateur/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  // Lexique (definitions courtes pour AI search + long-tail SEO)
  const lexiquePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/lexique`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...GLOSSARY_SLUGS.map((slug) => ({
      url: `${baseUrl}/lexique/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  const conversionPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/calculateur`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
  ];

  return [
    ...staticPages,
    ...authorPages,
    ...cityPages,
    ...sectorPages,
    ...comparatorPages,
    ...lexiquePages,
    ...conversionPages,
    ...servicePages,
    ...techPages,
    ...blogIndex,
    ...blogCategoryPages,
    ...blogTagPages,
    ...blogArticles,
  ];
}
