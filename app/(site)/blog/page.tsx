import { BlogIndex } from "@/components/blog/blog-index";
import { getPublishedPosts } from "@/lib/content/posts";

// Scheduled articles appear on their date: the page re-renders hourly.
export const revalidate = 3600;

export default async function BlogPage() {
  return <BlogIndex published={await getPublishedPosts()} />;
}
