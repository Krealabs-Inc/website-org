import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Blog Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Blog",
    lines: ["Notes & réflexions", "sur le web moderne."],
    subtitle: "Next.js, WordPress, SEO et retours de projets",
    path: "/blog",
  });
}
