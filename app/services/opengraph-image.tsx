import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Services Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Services",
    lines: ["Cinq expertises,", "un seul interlocuteur."],
    subtitle: "WordPress · Web · Mobile · Design · SEO",
    path: "/services",
  });
}
