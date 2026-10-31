import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Recrutement Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Recrutement",
    lines: ["Aucun poste ouvert,", "pour le moment."],
    subtitle: "Candidatures spontanées bienvenues",
    path: "/recrutement",
  });
}
