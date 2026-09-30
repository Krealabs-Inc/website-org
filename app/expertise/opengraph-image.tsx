import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Expertise Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Expertise",
    lines: ["Savoir-faire technique,", "rigueur d'artisan."],
    subtitle: "Architecture, sécurité, performance, accessibilité",
    path: "/expertise",
  });
}
