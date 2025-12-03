"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { useState } from "react";
import NewsletterSignup from "@/components/blocks/newsletter-signup";
import { BlogHero } from "@/components/blocks/blog-hero";

const categories = ["Tous", "Developpement", "Design", "Performance", "Mobile", "IA"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured || post !== featuredPost);

  const filteredPosts = selectedCategory === "Tous"
    ? otherPosts
    : otherPosts.filter(post => post.category === selectedCategory);

  return (
    <main className="min-h-screen bg-white dark:bg-[#030303] transition-colors pt-20">
      {/* Hero Section */}
      <BlogHero />

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#A543F1]" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40 font-[family-name:var(--font-heading)]">
              Catégories
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full border transition-all font-medium text-sm font-[family-name:var(--font-heading)] ${
                  selectedCategory === category
                    ? "bg-[#A543F1] border-[#A543F1] text-white shadow-lg shadow-[#A543F1]/25"
                    : "border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1] hover:bg-[#A543F1]/10 text-gray-700 dark:text-white/70 hover:text-[#A543F1]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "Tous" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-[#A543F1]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40 font-[family-name:var(--font-heading)]">
                Article en vedette
              </h2>
            </div>

            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group relative overflow-hidden rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08] hover:border-[#A543F1]/50 transition-all hover:shadow-xl hover:shadow-[#A543F1]/10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#A543F1]/5 to-[#c5cbf9]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#A543F1] text-white border-0 shadow-lg font-[family-name:var(--font-heading)]">
                        <Sparkles className="w-3 h-3 mr-1" />
                        En vedette
                      </Badge>
                    </div>
                  </div>

                  <div className="relative p-6 md:p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-3 bg-[#A543F1]/10 text-[#A543F1] border border-[#A543F1]/20 font-[family-name:var(--font-heading)]">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-[#A543F1] transition-colors font-[family-name:var(--font-heading)]">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 dark:text-white/60 mb-4 leading-relaxed font-[family-name:var(--font-sans)]">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-white/40 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-[family-name:var(--font-sans)]">{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-[family-name:var(--font-sans)]">{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[#A543F1] font-medium group-hover:gap-3 transition-all font-[family-name:var(--font-heading)]">
                      Lire l'article
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-[#A543F1]" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-white/40 font-[family-name:var(--font-heading)]">
              {selectedCategory === "Tous" ? "Derniers articles" : `Articles ${selectedCategory}`}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <article className="group h-full flex flex-col bg-gray-50 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.08] overflow-hidden hover:border-[#A543F1]/50 transition-all hover:shadow-lg hover:shadow-[#A543F1]/10">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <Badge className="w-fit mb-2 bg-[#A543F1]/10 text-[#A543F1] border border-[#A543F1]/20 text-xs font-[family-name:var(--font-heading)]">
                        {post.category}
                      </Badge>

                      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-[#A543F1] transition-colors line-clamp-2 font-[family-name:var(--font-heading)]">
                        {post.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-white/60 mb-3 line-clamp-3 flex-1 font-[family-name:var(--font-sans)]">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-white/[0.08]">
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-white/40">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="font-[family-name:var(--font-sans)]">{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="font-[family-name:var(--font-sans)]">{post.readTime}</span>
                          </div>
                        </div>

                        <ArrowRight className="w-5 h-5 text-[#A543F1] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-white/40 font-[family-name:var(--font-sans)]">
                Aucun article trouvé dans cette catégorie.
              </p>
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12"
        >
          <NewsletterSignup />
        </motion.div>
      </div>
    </main>
  );
}
