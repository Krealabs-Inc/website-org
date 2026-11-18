import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Notre histoire - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Notre histoire",
    lines: ["Une agence artisanale,", "ancrée en Normandie."],
    subtitle: "Fondée à Rouen en 2020",
    path: "/notre-histoire",
  });
}
