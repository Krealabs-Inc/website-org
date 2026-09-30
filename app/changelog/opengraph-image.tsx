import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Changelog Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Changelog",
    lines: ["Ce qui évolue,", "ce qui s'améliore."],
    subtitle: "Le journal des versions de Krealabs depuis 2020",
    path: "/changelog",
  });
}
