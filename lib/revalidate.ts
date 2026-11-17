import { revalidateTag } from "next/cache";

/**
 * Marks a content tag stale after an edit in the admin; pages using it
 * refresh on their next visit. Outside a request (migrations, seeds) there
 * is nothing to revalidate, so errors are ignored.
 */
export function revalidateContent(tag: string) {
  try {
    revalidateTag(tag, "max");
  } catch {
    // Not in a Next.js request context.
  }
}
