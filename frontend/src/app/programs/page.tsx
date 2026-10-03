"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { DynamicProgramsTable } from "@/components/sections/DynamicProgramsList";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Search, ArrowRight, BookOpen, Clock, Users } from "lucide-react";

const CATEGORIES = [
  "All",
  "Digital Literacy",
  "Code Academy",
  "Careers",
  "Entrepreneurship",
  "Innovation",
];

const getProgramAnchorId = (slug: string) => {
  if (slug.includes("digital-literacy")) return "digital-literacy";
  if (slug.includes("coding")) return "coding";
  if (slug.includes("career")) return "career";
  if (slug.includes("entrepreneurship")) return "entrepreneurship";
  if (slug.includes("community")) return "community";
  return slug;
};

export default function ProgramsPage() {
  const { store } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace("#", "");
      if (!hash) return;
      if (hash === "digital-literacy") setSelectedCategory("Digital Literacy");
      else if (hash === "coding") setSelectedCategory("Code Academy");
      else if (hash === "career") setSelectedCategory("Careers");
      else if (hash === "entrepreneurship") setSelectedCategory("Entrepreneurship");
      else if (hash === "community") setSelectedCategory("Innovation");
      else setSelectedCategory("All");

      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const programs = store.programs || [];

  const filteredPrograms = programs.filter((prog) => {
    const matchesCategory =
      selectedCategory === "All" ||
      prog.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      prog.shortTitle.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      (selectedCategory === "Careers" &&
        (prog.slug.includes("career") || prog.title.toLowerCase().includes("employability"))) ||
      (selectedCategory === "Innovation" &&
        (prog.slug.includes("innovation") || prog.title.toLowerCase().includes("community")));

    const matchesSearch =
      prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prog.audience.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Circuit Bus & Skill Stack Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 180 H 90 L 130 140 H 220" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M40 210 H 110 L 150 170 H 240" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" />
            <path d="M0 130 H 60 L 100 90 V 30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M80 70 L 120 30 H 200" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="90" cy="180" r="3.5" fill="currentColor" />
            <circle cx="220" cy="140" r="4" fill="currentColor" />
            <circle cx="60" cy="130" r="3.5" fill="currentColor" />
            <circle cx="100" cy="30" r="3.5" fill="currentColor" />
            <circle cx="200" cy="30" r="3.5" fill="currentColor" />
            <circle cx="150" cy="170" r="3" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              DigiConnect Pathways
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Empowering Youth With Practical Digital Skills
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Explore our hands-on, cohort-based technology programs tailored to young Ghanaians. Whether starting your journey or advancing towards tech careers and entrepreneurship, there is a pathway for you.
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
                placeholder="Search programs & skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
              />
            </div>
          </div>

          {/* Program Cards Grid */}
          {filteredPrograms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, idx) => (
                <div key={program.slug} id={getProgramAnchorId(program.slug)} className="scroll-mt-28">
                  <ScrollReveal delay={idx * 80}>
                    <ProgramCard program={program} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200 p-8 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-neutral-800 mb-2">No programs found</h3>
              <p className="text-xs text-neutral-500 mb-6">
                No programs matched your selected filter or search term. Try resetting your search filters.
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

          {/* Program Matrix / Overview Table */}
          <div className="mt-20">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-semibold text-brand-blue mb-2 block uppercase tracking-wider">
                Program Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
                Find the Right Program For Your Goals
              </h2>
            </div>

            <div className="overflow-x-auto bg-white rounded-2xl border border-neutral-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-100/70 border-b border-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-600">
                    <th className="py-4 px-6">Program</th>
                    <th className="py-4 px-6">Duration</th>
                    <th className="py-4 px-6">Target Audience</th>
                    <th className="py-4 px-6">Key Focus</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <DynamicProgramsTable />
              </table>
            </div>
          </div>

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
                Enroll Today
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Ready to build your digital skills?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Applications for our upcoming cohorts are currently open. Take the first step towards expanding your digital opportunities.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white text-brand-dark text-xs font-bold hover:bg-neutral-100 transition-colors"
              >
                Contact program team
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors"
              >
                Apply to a program
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
