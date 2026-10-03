"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { RESOURCES, RESOURCE_CATEGORIES } from "@/lib/data";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { Search, BookOpen, AlertCircle, ArrowRight } from "lucide-react";

export default function ResourcesPage() {
  const { store } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const allResources = store.resources && store.resources.length > 0 ? store.resources : RESOURCES;

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("skill")) setSelectedCategory("Digital Skills");
      else if (hash.includes("tech")) setSelectedCategory("Artificial Intelligence");
      else if (hash.includes("career")) setSelectedCategory("Career");
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const filteredResources = allResources.filter((res) => {
    const matchesCat =
      selectedCategory === "All" ||
      res.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesType =
      selectedType === "all" || res.type === selectedType;
    const matchesSearch =
      searchQuery.trim() === "" ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesType && matchesSearch;
  });

  const displayedResources = filteredResources.slice(0, visibleCount);

  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Knowledge Matrix & Open Syllabus Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Isometric knowledge blocks / syllabus traces */}
            <path d="M120 40 L 190 80 L 120 120 L 50 80 Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M50 80 V 140 L 120 180 V 120" stroke="currentColor" strokeWidth="1.6" />
            <path d="M190 80 V 140 L 120 180" stroke="currentColor" strokeWidth="1.6" />
            <path d="M120 70 L 160 92 L 120 114 L 80 92 Z" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
            <circle cx="120" cy="40" r="3.5" fill="currentColor" />
            <circle cx="190" cy="80" r="3.5" fill="currentColor" />
            <circle cx="50" cy="80" r="3.5" fill="currentColor" />
            <circle cx="120" cy="180" r="3.5" fill="currentColor" />
            <line x1="20" y1="180" x2="220" y2="180" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 4" />
            <line x1="40" y1="210" x2="200" y2="210" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              Knowledge Hub
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Resources, Guides & Learning Materials
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Free educational content to help you learn digital skills, understand cybersecurity, explore artificial intelligence, and prepare for technology careers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-neutral-50 min-h-[60vh]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Controls: Search and Categories — Matching News Page Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === "All"
                    ? "bg-brand-blue text-white shadow-sm"
                    : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                All Topics
              </button>
              {RESOURCE_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-brand-blue text-white shadow-sm"
                      : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics & guides..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
              />
            </div>
          </div>

          {/* Grid */}
          {displayedResources.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedResources.map((resource) => (
                  <div key={resource.id} className="h-full">
                    <ResourceCard resource={resource} />
                  </div>
                ))}
              </div>

              {filteredResources.length > visibleCount && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="px-8 py-3.5 rounded-full font-bold bg-white border border-neutral-300 text-brand-dark hover:bg-neutral-50 shadow-xs transition-colors text-xs"
                  >
                    Load More Resources
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 max-w-md mx-auto p-8 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-800 mb-2">No Resources Found</h3>
              <p className="text-xs text-neutral-500 mb-6">
                No matching articles or guides found for your query. Try clearing your filters or searching another keyword.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedType("all");
                  setSearchQuery("");
                }}
                className="px-5 py-2.5 rounded-xl font-bold bg-brand-blue text-white text-xs hover:bg-brand-blue-dark transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Bottom Callout Banner — Matching News Page Aesthetic */}
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
                Learn Practical Skills
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Want interactive cohort learning?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Complement self-paced learning guides with hands-on mentoring and code projects in our active training cohorts.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              <Link
                href="/programs"
                className="px-6 py-3 rounded-xl bg-white text-brand-dark text-xs font-bold hover:bg-neutral-100 transition-colors"
              >
                Explore programs
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
    </>
  );
}
