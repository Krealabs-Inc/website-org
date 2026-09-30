import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Design UI/UX - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Service",
    lines: ["Des interfaces qui", "se distinguent."],
    subtitle: "Wireframes, maquettes Figma, design system",
    path: "/services/design-uiux",
  });
}
