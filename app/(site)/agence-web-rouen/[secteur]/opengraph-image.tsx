import { renderSectorOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-renderers";

export const runtime = "nodejs";
export const alt = "Agence web pour secteur à Rouen";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ secteur: string }>;
}) {
  const { secteur } = await params;
  return renderSectorOg(secteur);
}
