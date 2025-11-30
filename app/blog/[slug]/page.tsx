import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import Image from "next/image";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors pt-20">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Link>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Badge className="mb-4 bg-[#A543F1] text-white border-0">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-12 pb-8 border-b border-gray-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                {post.author.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-white/60">
                {post.author.role}
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1] hover:bg-[#A543F1]/10 transition-colors text-sm font-medium text-gray-700 dark:text-white/70">
            <Share2 className="w-4 h-4" />
            Partager
          </button>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <p className="text-xl text-gray-700 dark:text-white/70 leading-relaxed mb-8 font-[family-name:var(--font-sans)]">
            {post.content.introduction}
          </p>

          {/* Sections */}
          {post.content.sections.map((section, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 font-[family-name:var(--font-heading)]">
                {section.title}
              </h2>
              <p className="text-gray-700 dark:text-white/70 leading-relaxed mb-6 font-[family-name:var(--font-sans)]">
                {section.content}
              </p>
              {section.code && (
                <div className="relative rounded-xl overflow-hidden bg-gray-900 dark:bg-black border border-gray-700 dark:border-white/[0.08] p-6 mb-6">
                  <pre className="overflow-x-auto">
                    <code className="text-sm text-gray-100 font-[family-name:var(--font-mono)]">
                      {section.code}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <div className="mt-12 p-6 bg-[#A543F1]/10 border-l-4 border-[#A543F1] rounded-r-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-[family-name:var(--font-heading)]">
              Conclusion
            </h3>
            <p className="text-gray-700 dark:text-white/70 leading-relaxed font-[family-name:var(--font-sans)]">
              {post.content.conclusion}
            </p>
          </div>
        </article>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-3 flex-wrap">
            <Tag className="w-5 h-5 text-gray-400" />
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-gray-100 dark:bg-white/[0.05] text-gray-700 dark:text-white/70 border-0 hover:bg-[#A543F1]/20 hover:text-[#A543F1] transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-white/[0.08]">
            <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
              Articles similaires
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="h-full bg-gray-50 dark:bg-white/[0.02] rounded-xl border border-gray-200 dark:border-white/[0.08] overflow-hidden hover:border-[#A543F1]/50 transition-all">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <Badge className="mb-2 bg-gray-200 dark:bg-white/[0.08] text-gray-700 dark:text-white/70 border-0 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#A543F1] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 dark:text-white/40">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {relatedPost.readTime}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#A543F1] to-[#c5cbf9] p-8 md:p-12 rounded-2xl text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Besoin d'aide pour votre projet ?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Notre equipe d'experts est la pour transformer vos idees en realite.
            Contactez-nous pour discuter de votre projet.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#A543F1] rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
