import { getSearchIndex } from "@/lib/search-index";

// Rebuilt hourly at most; content edits refresh it through the cache tags
// of the getters it reads.
export const revalidate = 3600;

/** The site search index (JSON), loaded by the ⌘K modal on first open. */
export async function GET() {
  return Response.json(await getSearchIndex());
}
