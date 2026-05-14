import { getPublishedPosts, frenchDateToISO } from "@/lib/blog-data";
import { TEAM } from "@/lib/team";

const BASE_URL = "https://krealabs.fr";

/**
 * Flux RSS 2.0 pour le blog Krealabs.
 * URL : https://krealabs.fr/blog/feed.xml
 *
 * Utilisé par :
 *  - Lecteurs RSS (Feedly, Inoreader, NetNewsWire)
 *  - AI crawlers et agrégateurs de contenu
 *  - IFTTT / Zapier / n8n pour automatiser des republications
 *
 * Cache : 1 heure côté CDN, 5 minutes côté browser.
 */
export async function GET() {
  const items = getPublishedPosts()
    .slice()
    .sort((a, b) => frenchDateToISO(b.date).localeCompare(frenchDateToISO(a.date)))
    .slice(0, 50) // limite à 50 articles dans le flux
    .map((post) => {
      const member = TEAM.find((m) => m.name === post.author.name);
      const authorEmail = "contact@krealabs.fr";
      const isoDate = frenchDateToISO(post.date);
      const pubDate = new Date(isoDate).toUTCString();
      const url = `${BASE_URL}/blog/${post.slug}`;
      const description = escapeXml(post.excerpt);
      const categories = post.tags
        .map((t) => `      <category>${escapeXml(t)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${authorEmail} (${escapeXml(post.author.name)})</author>
      <dc:creator><![CDATA[${post.author.name}]]></dc:creator>
${categories}
      ${post.image ? `<enclosure url="${escapeXmlAttr(post.image)}" type="image/jpeg" />` : ""}
      ${member ? `<atom:link rel="author" href="${BASE_URL}/equipe/${member.slug}" />` : ""}
    </item>`;
    })
    .join("\n");

  const lastBuildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog Krealabs — Agence web à Rouen</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Articles techniques, retours d'expérience et veille sur les technologies web modernes par l'équipe Krealabs.</description>
    <language>fr-FR</language>
    <copyright>© Krealabs ${new Date().getFullYear()}</copyright>
    <managingEditor>contact@krealabs.fr (Krealabs)</managingEditor>
    <webMaster>contact@krealabs.fr (Krealabs)</webMaster>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Next.js — krealabs.fr</generator>
    <image>
      <url>${BASE_URL}/apple-touch-icon.png</url>
      <title>Krealabs</title>
      <link>${BASE_URL}</link>
      <width>180</width>
      <height>180</height>
    </image>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeXmlAttr(s: string): string {
  return escapeXml(s);
}
