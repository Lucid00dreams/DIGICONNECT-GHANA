"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Award,
  Sparkles,
  ArrowRight,
  Quote,
  MapPin,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  GraduationCap
} from "lucide-react";

export default function StoriesPage() {
  const { store } = useStore();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const testimonials = store.testimonials || [];

  const filteredTestimonials =
    selectedFilter === "all"
      ? testimonials
      : testimonials.filter((t) =>
          t.program.toLowerCase().includes(selectedFilter.toLowerCase())
        );

  return (
    <main className="min-h-screen bg-neutral-50/50 pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue-50/60 via-white to-neutral-50/50 py-16 lg:py-20 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-100/70 text-brand-blue text-xs font-semibold tracking-wide uppercase mb-5">
            <Award className="w-4 h-4" />
            Alumni Journeys & Success Stories
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Real Ghanaian Youth. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-teal-600">
              Transformative Tech Careers.
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Read inspiring stories of how young Ghanaians gained in-demand software skills, landed remote contracts, and built grassroots community solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === "all"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              All Cohorts
            </button>
            <button
              onClick={() => setSelectedFilter("Coding")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === "Coding"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Code Academy
            </button>
            <button
              onClick={() => setSelectedFilter("Digital Literacy")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === "Digital Literacy"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Digital Literacy
            </button>
            <button
              onClick={() => setSelectedFilter("Career")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedFilter === "Career"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Career & Employability
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-6xl mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-neutral-200/80 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                    <Image
                      src={item.image || "/images/testimonials/participant-1.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">{item.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-lg bg-brand-blue/10 text-brand-blue text-[11px] font-semibold mb-3">
                  {item.program}
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-brand-blue/20 mb-1" />
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50/60 p-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{item.outcome}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8">
            <GraduationCap className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-neutral-800">No stories found for this category</h4>
            <p className="text-xs text-neutral-500 mt-1">Please select another program filter above.</p>
          </div>
        )}
      </section>

      {/* Featured Deep-Dive Case Study */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-brand-blue-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-neutral-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Featured Graduate Spotlight
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            From Zero Coding Background to International Remote Engineer
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Prior to joining DigiConnect Ghana&apos;s 12-week Code Academy cohort in Kumasi, Emmanuel had never written a single line of JavaScript. Through project-based learning, one-on-one mentor code reviews, and remote work preparedness, he built 4 production web applications and was hired as a junior frontend contractor within 2 months of graduation.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-left">
            <div>
              <div className="text-2xl font-bold text-brand-blue">12 Weeks</div>
              <div className="text-xs text-neutral-400">Intensive Bootcamp</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">100% Remote</div>
              <div className="text-xs text-neutral-400">Contract Placement</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">3x</div>
              <div className="text-xs text-neutral-400">Earning Increase</div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-colors shadow-md"
            >
              Start Your Own Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
