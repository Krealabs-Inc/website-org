import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";
import { getPublishedPosts } from "@/lib/blog-data";

export const runtime = "nodejs";
export const alt = "Catégorie du blog Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getPublishedPosts().filter(
    (p) => p.category.toLowerCase() === slug,
  );
  const name = posts[0]?.category ?? "Blog";

  return renderPageOg({
    badge: "Blog",
    lines: ["Articles", name],
    subtitle: `${posts.length} article${posts.length > 1 ? "s" : ""} de l'équipe Krealabs`,
    path: `/blog/category/${slug}`,
  });
}
