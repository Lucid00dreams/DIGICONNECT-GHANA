import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { DynamicImpactStats } from "@/components/sections/DynamicImpactStats";
import { VALUES } from "@/lib/data";
import {
  Target,
  Eye,
  Users,
  Lightbulb,
  Shield,
  Handshake,
  TrendingUp,
  Zap,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About | DigiConnect Ghana",
  description:
    "Learn about DigiConnect Ghana — our mission, vision, values, and how we are empowering young people through digital skills and technology education.",
};

const valueIcons: Record<string, React.ElementType> = {
  Users,
  Lightbulb,
  Shield,
  Handshake,
  TrendingUp,
  Zap,
};

export default function AboutPage() {
  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Topographic Contour Wave Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M-20 60 C 40 30, 80 110, 150 70 C 220 30, 240 90, 270 60" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M-20 95 C 40 65, 85 145, 155 105 C 225 65, 245 125, 270 95" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M-20 130 C 45 100, 90 180, 160 140 C 230 100, 250 160, 270 130" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M-20 165 C 50 135, 95 215, 165 175 C 235 135, 255 195, 270 165" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M-20 200 C 55 170, 100 250, 170 210 C 240 170, 260 230, 270 200" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" />
            <circle cx="150" cy="70" r="3.5" fill="currentColor" />
            <circle cx="85" cy="145" r="3" fill="currentColor" />
            <circle cx="165" cy="175" r="3.5" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              DigiConnect Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Building a Digitally Empowered Generation
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              DigiConnect Ghana is a youth-focused digital literacy and technology development organization working to ensure every young person has the skills and opportunities to thrive in a digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                <Image
                  src="/images/about/about.jpg"
                  alt="Young people learning together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-brand-dark mb-5">
                  Why DigiConnect Ghana?
                </h2>
                <div className="space-y-4 text-[15px] leading-relaxed text-neutral-600">
                  <p>
                    Across Ghana, many young people lack access to practical
                    digital skills training. While the world becomes increasingly
                    digital, a significant number of young Ghanaians are unable
                    to fully participate in the digital economy — limiting their
                    access to education, employment, and entrepreneurial
                    opportunities.
                  </p>
                  <p>
                    DigiConnect Ghana was created to address this gap. We believe
                    that with the right skills, mentorship, and opportunities,
                    every young person can use technology to create a better
                    future — for themselves and their communities.
                  </p>
                  <p>
                    Our programs are designed to be practical, accessible, and
                    community-driven. We don&apos;t just teach technology — we
                    build confidence, develop problem-solvers, and create
                    pathways to real opportunities.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 lg:p-10">
                <div className="w-14 h-14 rounded-xl bg-brand-blue-light flex items-center justify-center mb-5">
                  <Target size={28} className="text-brand-blue" />
                </div>
                <h2 className="text-2xl font-extrabold text-brand-dark mb-4">
                  Our Mission
                </h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">
                  Empower young people with practical digital skills and
                  opportunities that enable them to thrive in an increasingly
                  digital world. We work to make technology education accessible,
                  practical, and impactful for every young person in Ghana.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 lg:p-10">
                <div className="w-14 h-14 rounded-xl bg-brand-green-light flex items-center justify-center mb-5">
                  <Eye size={28} className="text-brand-green" />
                </div>
                <h2 className="text-2xl font-extrabold text-brand-dark mb-4">
                  Our Vision
                </h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">
                  A digitally empowered generation capable of creating
                  opportunities and solving problems through technology. We
                  envision a Ghana where no young person is left behind in the
                  digital revolution.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark mb-4">
                Our Values
              </h2>
              <p className="text-[15px] text-neutral-600 max-w-xl mx-auto">
                The principles that guide everything we do at DigiConnect Ghana.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((value, i) => {
              const Icon = valueIcons[value.icon] || Lightbulb;
              return (
                <ScrollReveal key={value.title} delay={i * 80}>
                  <div className="bg-neutral-50 rounded-2xl border border-neutral-100 p-6 lg:p-7">
                    <Icon size={24} className="text-brand-blue mb-3" />
                    <h3 className="text-base font-bold text-brand-dark mb-1.5">
                      {value.title}
                    </h3>
                    <p className="text-[13.5px] text-neutral-600">
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 lg:py-20 bg-brand-dark">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white text-center mb-10">
            Our Impact So Far
          </h2>
          <DynamicImpactStats />
          <p className="text-center text-[11px] text-neutral-500 mt-8">
            * Placeholder figures
          </p>
        </div>
      </section>

      {/* CTA Banner — Matching News Page Bottom Callout */}
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
                Join the Movement
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Be part of a digitally empowered generation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Connect with our mentors, apply for upcoming cohorts, or partner with us to expand digital skills across Ghana.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-white text-brand-dark text-xs font-bold hover:bg-neutral-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue-dark transition-colors"
              >
                Join DigiConnect
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
