"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Calendar,
  CheckCircle2,
  MapPin,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Rocket,
  Compass,
} from "lucide-react";

const FALLBACK_ICONS = [Compass, Sparkles, Rocket, Award, Calendar];

export default function HistoryPage() {
  const { store } = useStore();
  const milestones = store.historyMilestones && store.historyMilestones.length > 0 
    ? store.historyMilestones 
    : [];

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-semibold mb-3 border border-white/10">
              <Calendar size={13} />
              <span>Our Journey</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Our History & Milestones
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              From a weekend workshop in a modest library room to empowering thousands of young Ghanaians with employable tech skills across all 16 regions.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-24 bg-white relative">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <div className="relative border-l-2 border-neutral-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-16">
            {milestones.map((item, idx) => {
              const Icon = FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
              return (
                <ScrollReveal key={item.id || item.year} delay={idx * 100}>
                  <div className="relative group">
                    {/* Timeline Node */}
                    <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-10 h-10 rounded-2xl bg-white border-2 border-neutral-300 group-hover:border-brand-blue flex items-center justify-center text-brand-blue shadow-md transition-colors">
                      <Icon size={18} />
                    </div>

                    {/* Content Card */}
                    <div className="bg-neutral-50/70 hover:bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200/80 transition-all hover:shadow-lg">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-2xl sm:text-3xl font-extrabold text-brand-blue font-mono tracking-tight">
                          {item.year}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-700 shadow-2xs">
                          {item.badge}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3">
                        {item.title}
                      </h2>
                      <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-600 mb-6">
                        {item.description}
                      </p>

                      {item.achievements && item.achievements.length > 0 && (
                        <div className="pt-4 border-t border-neutral-200/80">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                            Key Achievements
                          </h3>
                          <ul className="space-y-2">
                            {item.achievements.map((ach) => (
                              <li key={ach} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-neutral-900 text-white border-t border-neutral-800">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Be Part of Our Next Chapter
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            Whether you want to learn, mentor, or sponsor our cohorts, your contribution fuels our mission to build Ghana&apos;s digital future.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-all shadow-md"
            >
              <span>Apply to Join</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about/team"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all"
            >
              <span>Meet the Team</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
