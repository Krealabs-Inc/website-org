import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";
import { getPublishedPosts } from "@/lib/blog-data";

export const runtime = "nodejs";
export const alt = "Tag du blog Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Même slugify que app/blog/tag/[slug]/page.tsx */
function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getPublishedPosts().filter((p) =>
    p.tags.some((t) => slugifyTag(t) === slug),
  );
  const tag =
    posts[0]?.tags.find((t) => slugifyTag(t) === slug) ?? "Blog";

  return renderPageOg({
    badge: "Blog",
    lines: ["Articles", tag],
    subtitle: `${posts.length} article${posts.length > 1 ? "s" : ""} de l'équipe Krealabs`,
    path: `/blog/tag/${slug}`,
  });
}
