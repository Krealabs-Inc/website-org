import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Cas clients Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Cas clients",
    lines: ["Trois histoires,", "dites en clair."],
    subtitle: "Contexte, choix technique et résultat de nos projets",
    path: "/clients",
  });
}
