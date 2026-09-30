import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Contacter Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Contact",
    lines: ["Décrivez-nous", "votre besoin."],
    subtitle: "Devis gratuit · Réponse sous 24h · Basés à Rouen",
    path: "/contact",
  });
}
