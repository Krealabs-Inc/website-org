import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "KreaStudio : une maquette gratuite de votre site en quelques minutes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "KreaStudio",
    lines: ["Voyez votre site", "avant de le commander."],
    subtitle: "Décrivez votre projet, recevez une maquette gratuite en quelques minutes.",
    path: "/studio",
  });
}
