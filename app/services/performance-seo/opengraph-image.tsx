import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Performance & SEO - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Service",
    lines: ["Performance", "& SEO local."],
    subtitle: "Core Web Vitals, audit SEO, référencement à Rouen",
    path: "/services/performance-seo",
  });
}
