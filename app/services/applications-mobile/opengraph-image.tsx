import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Applications mobiles - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Service",
    lines: ["Applications mobiles", "iOS & Android."],
    subtitle: "React Native : une base de code, deux App Stores",
    path: "/services/applications-mobile",
  });
}
