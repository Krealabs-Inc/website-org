import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "L'équipe Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "L'équipe",
    lines: ["Trois associés,", "zéro intermédiaire."],
    subtitle: "Ceux qui codent vos projets, joignables directement",
    path: "/equipe",
  });
}
