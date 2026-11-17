import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Next.js - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Technologie",
    lines: ["Next.js :", "le framework React de production."],
    subtitle: "Server Components, SEO natif, performance",
    path: "/technologies/nextjs",
  });
}
