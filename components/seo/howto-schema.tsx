import type { BlogPost } from "@/lib/blog-data";

/**
 * Auto-détecte si un article est structuré comme un guide HowTo (≥3 sections
 * dont le titre commence par "N. ") et génère le JSON-LD correspondant.
 *
 * Google a déprécié les rich results visuels HowTo en décembre 2023, mais
 * le schema reste utile pour la compréhension sémantique côté Google +
 * citations IA (Perplexity, ChatGPT) qui consomment le markup structuré.
 *
 * Retourne `null` si l'article ne qualifie pas — le composant ne rend rien.
 */
export function HowToSchema({
  post,
  pageUrl,
}: {
  post: BlogPost;
  pageUrl: string;
}) {
  const numberedSections = post.content.sections.filter((s) =>
    /^\d+\.\s/.test(s.title),
  );

  // Threshold : au moins 3 étapes pour parler de "guide"
  if (numberedSections.length < 3) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: post.title,
    description: post.excerpt,
    image: post.image,
    inLanguage: "fr-FR",
    author: {
      "@type": "Person",
      name: post.author.name,
      url: "https://krealabs.fr/equipe",
    },
    publisher: {
      "@type": "Organization",
      name: "Krealabs",
      logo: {
        "@type": "ImageObject",
        url: "https://krealabs.fr/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    step: numberedSections.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.title.replace(/^\d+\.\s*/, ""),
      // text doit être stripped de markdown pour le markup propre
      text: stripMarkdown(s.content).slice(0, 500),
      url: `${pageUrl}#step-${idx + 1}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function stripMarkdown(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
