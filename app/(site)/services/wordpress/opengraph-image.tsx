import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Agence WordPress à Rouen - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Service",
    lines: ["Agence WordPress", "à Rouen."],
    subtitle: "Création, refonte, WooCommerce, headless",
    path: "/services/wordpress",
  });
}
