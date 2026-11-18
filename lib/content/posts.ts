import { unstable_cache } from "next/cache";

import { items, mediaUrl } from "@/lib/directus";
import type { BlogPost } from "@/lib/blog-data";

type Doc = Record<string, unknown>;
const opt = (v: unknown) => (typeof v === "string" && v ? v : undefined);

/** "2026-05-05T12:00:00Z" → "5 mai 2026", the format the blog uses. */
function toFrenchDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
}

function toPost(d: Doc): BlogPost {
  const author = { name: d.author_name as string, role: d.author_role as string, avatar: d.author_avatar as string };
  const sections = Array.isArray(d.sections) ? (d.sections as Record<string, string>[]) : [];
  return {
    slug: d.slug as string,
    title: d.title as string,
    excerpt: d.excerpt as string,
    category: d.category as string,
    date: toFrenchDate(d.publishedAt as string),
    updatedAt: opt(d.updatedOn) ? toFrenchDate(d.updatedOn as string) : undefined,
    readTime: d.readTime as string,
    image: mediaUrl(d.image) ?? opt(d.imagePath) ?? "",
    featured: Boolean(d.featured),
    content: {
      introduction: d.introduction as string,
      sections: sections.map((s) => ({ title: s.title, content: s.content, code: opt(s.code) })),
      conclusion: d.conclusion as string,
    },
    author: { name: author.name, role: author.role, avatar: author.avatar },
    tags: Array.isArray(d.tags) ? (d.tags as string[]) : [],
  };
}

/** Every article, published or scheduled, in list order. Cached; refreshed on edit. */
export const getAllPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const docs = await items("posts", { sort: ["order", "-publishedAt"] });
    return docs.map((d) => toPost(d as unknown as Doc));
  },
  ["content-posts"],
  { tags: ["posts"] },
);

/** Articles whose publication date has come (checked at render time). */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const today = new Date().toISOString().slice(0, 10);
  return (await getAllPosts()).filter((p) => isoOf(p.date) <= today);
}

export async function getPost(slug: string) {
  return (await getAllPosts()).find((p) => p.slug === slug);
}

// Kept local to avoid importing the whole original blog file.
const FR_MONTHS: Record<string, string> = { janvier: "01", février: "02", fevrier: "02", mars: "03", avril: "04", mai: "05", juin: "06", juillet: "07", août: "08", aout: "08", septembre: "09", octobre: "10", novembre: "11", décembre: "12", decembre: "12" };
function isoOf(french: string) {
  const m = french.toLowerCase().match(/(\d{1,2})\s+([a-zàâéèêîôûç]+)\s+(\d{4})/);
  return m ? `${m[3]}-${FR_MONTHS[m[2]] ?? "01"}-${m[1].padStart(2, "0")}` : "9999-12-31";
}

/** Slugify a tag for its URL. */
export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The original tag for a slug (first match among published articles). */
export async function getOriginalTagFromSlug(slug: string): Promise<string | null> {
  for (const post of await getPublishedPosts()) {
    for (const tag of post.tags) if (slugifyTag(tag) === slug) return tag;
  }
  return null;
}

/** Only tags used by 3 articles or more get a page (avoids thin content). */
const MIN_ARTICLES_PER_TAG = 3;

/**
 * Tag slugs worth a page. Counts every article, scheduled ones included,
 * so the routes exist before those articles go live; each page filters by
 * date when it renders.
 */
export async function getIndexableTagSlugs(): Promise<string[]> {
  const counter = new Map<string, number>();
  for (const post of await getAllPosts()) {
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      if (slug) counter.set(slug, (counter.get(slug) ?? 0) + 1);
    }
  }
  return [...counter.entries()].filter(([, n]) => n >= MIN_ARTICLES_PER_TAG).map(([slug]) => slug);
}
