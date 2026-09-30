import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "React - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Technologie",
    lines: ["React :", "la bibliothèque qui a tout changé."],
    subtitle: "La base de nos applications web et mobiles",
    path: "/technologies/react",
  });
}
