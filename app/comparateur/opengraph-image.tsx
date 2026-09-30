import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Comparateurs techniques Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Comparateurs",
    lines: ["Comparer deux stacks,", "choisir la bonne."],
    subtitle: "WordPress, Webflow, Shopify, Next.js, Flutter…",
    path: "/comparateur",
  });
}
