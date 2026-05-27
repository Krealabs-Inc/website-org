import { getPublishedPosts, frenchDateToISO } from "@/lib/blog-data";

const BASE_URL = "https://krealabs.fr";

/**
 * /llms-full.txt — variante "full-text" de la convention llms.txt.
 * Expose le contenu complet des articles du blog en markdown, pour que les
 * crawlers IA (ChatGPT, Claude, Perplexity, Gemini) puissent ingérer la
 * matière éditoriale sans re-crawler chaque URL.
 *
 * Cache long côté CDN (1h) car le contenu ne change pas souvent.
 */
export async function GET() {
  const posts = getPublishedPosts()
    .slice()
    .sort((a, b) =>
      frenchDateToISO(b.date).localeCompare(frenchDateToISO(a.date)),
    );

  const header = `# Krealabs — Contenu intégral du blog

> Agence digitale à Rouen. Articles techniques et retours d'expérience sur
> WordPress, Next.js, React Native, SEO et performance web.
>
> Pour la table des matières et les liens principaux du site, voir
> ${BASE_URL}/llms.txt
>
> Ce fichier expose le full-text des ${posts.length} articles publiés à des
> fins de citation par les assistants IA. Licence : citation autorisée avec
> attribution à Krealabs et lien vers l'URL source.
>
> Dernière génération : ${new Date().toISOString()}

---

`;

  const body = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const isoDate = frenchDateToISO(post.date);
      const isoUpdated = post.updatedAt
        ? frenchDateToISO(post.updatedAt)
        : isoDate;
      const updatedLine =
        post.updatedAt && isoUpdated !== isoDate
          ? `\n- Mis à jour : ${isoUpdated}`
          : "";

      const sections = post.content.sections
        .map((s) => `### ${s.title}\n\n${s.content.trim()}`)
        .join("\n\n");

      return `## ${post.title}

- URL : ${url}
- Auteur : ${post.author.name} (${post.author.role})
- Catégorie : ${post.category}
- Tags : ${post.tags.join(", ")}
- Publié : ${isoDate}${updatedLine}

${post.excerpt}

${post.content.introduction.trim()}

${sections}

${post.content.conclusion.trim()}

---
`;
    })
    .join("\n");

  return new Response(header + body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
