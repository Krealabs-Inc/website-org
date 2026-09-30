import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Développement web - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Service",
    lines: ["Sites & applications web,", "propres et performants."],
    subtitle: "Next.js, React, TypeScript, sur mesure",
    path: "/services/developpement-web",
  });
}
