import { revalidateTag } from "next/cache";

/**
 * Expires a content tag after an edit in the admin: the next visit
 * renders fresh content (no stale copy served while it refreshes).
 * Outside a request (migrations, seeds) there is nothing to revalidate,
 * so errors are ignored.
 */
export function revalidateContent(tag: string) {
  try {
    revalidateTag(tag, { expire: 0 });
  } catch {
    // Not in a Next.js request context.
  }
}
