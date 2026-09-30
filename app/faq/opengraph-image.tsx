import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "FAQ Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "FAQ",
    lines: ["Tout ce qu'il", "faut savoir."],
    subtitle: "Délais, technologies, méthode, maintenance, SEO",
    path: "/faq",
  });
}
