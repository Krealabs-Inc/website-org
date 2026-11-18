import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Conditions générales de vente Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Légal",
    lines: ["Conditions générales", "de vente"],
    subtitle: "Devis, paiement, délais, propriété intellectuelle",
    path: "/legal/cgv",
  });
}
