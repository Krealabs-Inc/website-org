// Development-only Payload tools, run from inside the dev server because
// the Payload CLI crashes on Node 26 (its TS loader trips on undici).
//   GET /cms-dev/import-map        → regenerates app/(payload)/cms/importMap.js
//   GET /cms-dev/migration?name=x  → writes a migration in payload/migrations
//   GET /cms-dev/seed              → imports the original content (skips existing)
// Run them after changing collections or fields, then commit the result.
// Returns 404 outside `next dev`.
import config from "@payload-config";
import { generateImportMap, getPayload } from "payload";

import { seedAll } from "@/payload/seed";

export async function GET(req: Request, { params }: { params: Promise<{ task: string }> }) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  const { task } = await params;
  if (task === "import-map") {
    await generateImportMap(await config, { force: true, log: true });
    return new Response("import-map: done");
  }
  if (task === "migration") {
    const name = new URL(req.url).searchParams.get("name") ?? "change";
    const payload = await getPayload({ config });
    await payload.db.createMigration({ migrationName: name, payload, forceAcceptWarning: true, skipEmpty: true });
    return new Response(`migration "${name}": done`);
  }
  if (task === "seed") {
    const payload = await getPayload({ config });
    await seedAll(payload);
    return new Response("seed: done");
  }
  return new Response("Unknown task", { status: 404 });
}
