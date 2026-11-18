import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate  { "collection": "posts" }
 *
 * Called by a Directus Flow after every create/update/delete, with the
 * header `x-revalidate-secret`. Refreshes the cache tag the site reads that
 * collection under: the change is online on the next visit.
 */
const TAGS: Record<string, string> = {
  team: "team",
  projects: "projects",
  posts: "posts",
  faq: "faq",
  glossary: "glossary",
  cities: "cities",
  sectors: "sectors",
};

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { collection } = (await request.json().catch(() => ({}))) as { collection?: string };
  if (!collection) return NextResponse.json({ error: "collection manquante" }, { status: 400 });

  // Page texts live in singletons named page_<slug>; the site tags them page-<slug>.
  const tag = collection.startsWith("page_") ? `page-${collection.slice(5).replace(/_/g, "-")}` : TAGS[collection];
  if (!tag) return NextResponse.json({ ignored: collection });
  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: tag });
}
