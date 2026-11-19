import { getTeam } from "@/lib/content/team";
import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";
import { withTeamCount } from "@/lib/team-count";

export const runtime = "nodejs";
export const alt = "L'équipe Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "L'équipe",
    lines: [withTeamCount("{Nombre} associé{s},", (await getTeam()).length), "zéro intermédiaire."],
    subtitle: "Ceux qui codent vos projets, joignables directement",
    path: "/equipe",
  });
}
