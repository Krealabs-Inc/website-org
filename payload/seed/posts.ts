import type { Payload, PayloadRequest } from "payload";

import { blogPosts, frenchDateToISO } from "../../lib/blog-data";

/** Imports the blog from lib/blog-data.ts (original content), once per slug. */
export async function seedPosts(payload: Payload, req?: PayloadRequest) {
  for (const [i, p] of blogPosts.entries()) {
    const existing = await payload.find({ collection: "posts", where: { slug: { equals: p.slug } }, limit: 1, req });
    if (existing.docs.length) continue;
    await payload.create({
      req,
      collection: "posts",
      data: {
        title: p.title,
        slug: p.slug,
        category: p.category as "Web",
        featured: p.featured,
        // Keeps the hand-curated order of the original file.
        order: i,
        // Noon UTC so the calendar day never shifts with time zones.
        publishedAt: `${frenchDateToISO(p.date)}T12:00:00.000Z`,
        updatedOn: p.updatedAt ? `${frenchDateToISO(p.updatedAt)}T12:00:00.000Z` : undefined,
        readTime: p.readTime,
        excerpt: p.excerpt,
        imagePath: p.image,
        introduction: p.content.introduction,
        sections: p.content.sections.map((s) => ({ title: s.title, content: s.content, code: s.code })),
        conclusion: p.content.conclusion,
        tags: p.tags,
        author: { name: p.author.name, role: p.author.role, avatar: p.author.avatar },
      },
    });
  }
}
