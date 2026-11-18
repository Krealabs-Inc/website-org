import { BlogIndex } from "@/components/blog/blog-index";
import { getPublishedPosts } from "@/lib/content/posts";
import { getPageTexts } from "@/lib/content/pages";
import { BLOG_PAGE } from "@/lib/page-texts/blog-page";

// Scheduled articles appear on their date: the page re-renders hourly.
export const revalidate = 3600;

export default async function BlogPage() {
  const [published, t] = await Promise.all([getPublishedPosts(), getPageTexts(BLOG_PAGE)]);
  return <BlogIndex published={published} t={t} />;
}
