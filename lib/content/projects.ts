import { unstable_cache } from "next/cache";

import { items, mediaUrl } from "@/lib/directus";
import type { Project } from "@/lib/projects";

type Doc = Record<string, unknown>;
const opt = (v: unknown) => (typeof v === "string" && v ? v : undefined);

function toProject(d: Doc): Project {
  const src = mediaUrl(d.video) ?? opt(d.videoPath);
  const poster = mediaUrl(d.poster) ?? opt(d.posterPath);
  return {
    slug: d.slug as string,
    name: d.name as string,
    sector: d.sector as string,
    format: d.format as string,
    url: opt(d.url),
    domain: opt(d.domain),
    title: d.title as string,
    summary: d.summary as string,
    situation: d.situation as string,
    work: d.work as string,
    result: d.result as string,
    highlights: Array.isArray(d.highlights) ? (d.highlights as string[]) : [],
    video: src && poster ? { src, poster, transcript: opt(d.transcript) ?? "" } : undefined,
  };
}

/** Projects in display order. Cached; refreshed when edited in Directus. */
export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const docs = await items("projects", { sort: "order" });
    return docs.map((d) => toProject(d as unknown as Doc));
  },
  ["content-projects"],
  { tags: ["projects"] },
);
