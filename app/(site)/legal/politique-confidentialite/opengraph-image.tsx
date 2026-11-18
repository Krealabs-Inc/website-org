import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Politique de confidentialité Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Légal",
    lines: ["Politique de", "confidentialité"],
    subtitle: "Vos données personnelles et vos droits RGPD",
    path: "/legal/politique-confidentialite",
  });
}
