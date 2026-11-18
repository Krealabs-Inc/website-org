import type { Payload, PayloadRequest } from "payload";

import { PROJECTS } from "../../lib/projects";

/** Imports the projects from lib/projects.ts (original content), once per slug. */
export async function seedProjects(payload: Payload, req?: PayloadRequest) {
  for (const [i, p] of PROJECTS.entries()) {
    const existing = await payload.find({ collection: "projects", where: { slug: { equals: p.slug } }, limit: 1, req });
    if (existing.docs.length) continue;
    await payload.create({
      req,
      collection: "projects",
      data: {
        name: p.name,
        slug: p.slug,
        order: i,
        sector: p.sector,
        format: p.format,
        url: p.url,
        domain: p.domain,
        title: p.title,
        summary: p.summary,
        situation: p.situation,
        work: p.work,
        result: p.result,
        highlights: p.highlights,
        videoPath: p.video?.src,
        posterPath: p.video?.poster,
        transcript: p.video?.transcript,
      },
    });
  }
}
