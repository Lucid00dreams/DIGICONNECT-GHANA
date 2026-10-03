"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { BlogPostCard } from "@/components/ui/BlogPostCard";
import { ArticleReaderModal } from "@/components/ui/ArticleReaderModal";
import { NewsPost } from "@/lib/store";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const CATEGORIES = ["All", "Bootcamps", "Community", "Innovation", "Partnerships"];

export default function NewsPage() {
  const { store } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<NewsPost | null>(null);

  const newsList = store.news || [];

  const filteredNews = newsList.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Broadcast Waves & Story Pulse Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M40 180 C 80 120, 160 120, 200 180" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M60 180 C 90 135, 150 135, 180 180" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 3" strokeLinecap="round" />
            <path d="M80 180 C 100 150, 140 150, 160 180" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M10 80 C 70 50, 140 110, 210 60" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" />
            <path d="M20 110 C 80 80, 150 140, 220 90" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="120" cy="180" r="4.5" fill="currentColor" />
            <circle cx="120" cy="130" r="3.5" fill="currentColor" />
            <circle cx="70" cy="50" r="3" fill="currentColor" />
            <circle cx="140" cy="110" r="3.5" fill="currentColor" />
            <circle cx="210" cy="60" r="4" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              DigiConnect Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              News & Community Stories
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Explore the latest updates, announcements, and inspiring stories from our digital skills cohorts, community bootcamps, and partners across Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-neutral-50 min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Controls: Search and Categories */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-brand-blue text-white shadow-sm"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles & stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filteredNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((post, idx) => (
                <ScrollReveal key={post.id} delay={idx * 80}>
                  <BlogPostCard post={post} onSelect={(p) => setActiveArticle(p)} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 p-8 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-800 mb-2">No stories found</h3>
              <p className="text-xs text-neutral-500 mb-6">
                No articles matched your selected filter or search term. Try resetting your search filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Join Callout banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-brand-dark text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-neutral-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:16px_16px]" />
              <svg
                className="absolute -right-10 -bottom-10 w-72 h-72 text-white/[0.05] pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="2" />
                <circle cx="100" cy="100" r="110" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
              </svg>
            </div>
            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-semibold text-brand-green mb-2 block">
                Stay Connected
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Have a story or partnership to share?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Connect with our editorial and communications team or join our upcoming cohorts to write your own tech success story.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white text-brand-dark text-xs font-bold hover:bg-neutral-100 transition-colors"
              >
                Contact media team
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors"
              >
                Join a cohort
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Reader Modal */}
      <ArticleReaderModal
        post={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </>
  );
}
