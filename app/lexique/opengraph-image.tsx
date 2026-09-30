import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Lexique du web Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Lexique",
    lines: ["Le web technique", "en clair."],
    subtitle: "Définitions claires des termes du web",
    path: "/lexique",
  });
}
