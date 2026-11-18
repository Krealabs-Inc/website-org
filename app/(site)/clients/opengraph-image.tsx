import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Réalisations Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Réalisations",
    lines: ["Des besoins différents.", "Des réponses concrètes."],
    subtitle: "Réalisations, boutiques et concepts interactifs",
    path: "/clients",
  });
}
