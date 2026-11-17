import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Mentions légales Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Légal",
    lines: ["Mentions légales"],
    subtitle: "Éditeur, hébergeur, propriété intellectuelle",
    path: "/legal/mentions-legales",
  });
}
