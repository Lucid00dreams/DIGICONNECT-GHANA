import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { TESTIMONIALS } from "@/lib/data";
import { DynamicImpactStats } from "@/components/sections/DynamicImpactStats";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import {
  TrendingUp,
  Award,
  Globe2,
  Users2,
  CheckCircle,
  Lightbulb,
  ArrowRight,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Impact | DigiConnect Ghana",
  description:
    "Discover how DigiConnect Ghana is transforming youth futures through technology skills, employment pathways, and community-led innovation.",
};

export default function ImpactPage() {
  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Growth Trajectory & Milestone Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 200 L 70 160 L 120 170 L 180 90 L 220 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M20 220 L 70 180 L 120 190 L 180 110 L 220 70" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" />
            <line x1="20" y1="200" x2="220" y2="200" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="70" cy="160" r="4" fill="currentColor" />
            <circle cx="120" cy="170" r="4" fill="currentColor" />
            <circle cx="180" cy="90" r="4.5" fill="currentColor" />
            <circle cx="220" cy="50" r="5" fill="currentColor" />
            <circle cx="220" cy="50" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-green/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              Measurable Impact
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Creating Impact Through Technology
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Every number represents a young Ghanaian who gained the skills, confidence, and tools to shape their future. Here is how our programs translate into community transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Key Numbers Strip */}
      <section className="py-16 bg-white border-b border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <DynamicImpactStats />
          <div className="mt-8 text-center">
            <span className="text-xs text-neutral-500 italic">
              * Figures represent cumulative milestones across active community cohorts. Data regularly updated.
            </span>
          </div>
        </div>
      </section>

      {/* Core Impact Pillars */}
      <section className="py-20 lg:py-28 bg-neutral-50/50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
              Four Dimensions of Transformation
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark">
              How We Measure Long-Term Change
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">1. Digital Skills</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Foundational and advanced technology competencies that prepare youth for digital citizenship and modern workforce demands.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">2. Career & Income</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Connecting graduates with internships, entry-level digital jobs, freelance clients, and online micro-task platforms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/20 text-yellow-700 flex items-center justify-center mb-5">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">3. Youth Innovation</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Encouraging young problem-solvers to invent local apps, community portals, and sustainable tech ventures.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-5">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-2">4. Community Reach</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Partnering with neighborhood hubs and schools to ensure equal gender representation and geographic inclusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Reach & Hubs */}
      <section className="py-20 bg-white border-t border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
                Geographic Presence
              </span>
              <h2 className="text-3xl font-extrabold text-brand-dark mb-6">
                Active Hubs & Partner Communities
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6 text-sm lg:text-base">
                Our outreach initiatives currently span Greater Accra, Ashanti, and Northern regions, partnering with municipal libraries, community centers, and local tech spaces.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50">
                  <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-brand-dark">Greater Accra Region</h4>
                    <p className="text-xs text-neutral-600">Central learning labs in Accra, Madina, and Tema facilitating daily hands-on bootcamps.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50">
                  <MapPin className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-brand-dark">Ashanti Region (Kumasi)</h4>
                    <p className="text-xs text-neutral-600">Youth entrepreneurship programs and coding workshops hosted in collaboration with local hubs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-200 bg-neutral-50">
                  <MapPin className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-brand-dark">Northern Region (Tamale)</h4>
                    <p className="text-xs text-neutral-600">Outreach cohorts expanding digital access to young women and underserved rural youth.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] border border-neutral-200">
              <Image
                src="/images/about/about.jpg"
                alt="DigiConnect training session"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Success Stories */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
              Alumni Voices
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark">
              Stories From Our Participants
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Callout Banner — Matching News Page Aesthetic */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-brand-dark text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-neutral-800 relative overflow-hidden">
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
                Expand Our Reach
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Partner with us to expand digital skills
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                We are actively looking for program partners, corporate sponsors, and mentors to bring digital literacy to 5,000 more young Ghanaians this year.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white text-brand-dark text-xs font-bold hover:bg-neutral-100 transition-colors"
              >
                Contact impact team
              </Link>
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors"
              >
                Get involved
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
