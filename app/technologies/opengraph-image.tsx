import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Technologies Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Technologies",
    lines: ["Les outils sur lesquels", "nous misons."],
    subtitle: "Next.js · React · React Native · TypeScript",
    path: "/technologies",
  });
}
