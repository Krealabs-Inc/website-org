import { renderPageOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "React Native - Krealabs";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderPageOg({
    badge: "Technologie",
    lines: ["React Native :", "iOS & Android, une seule équipe."],
    subtitle: "Performance native, OTA, notifications push",
    path: "/technologies/react-native",
  });
}
