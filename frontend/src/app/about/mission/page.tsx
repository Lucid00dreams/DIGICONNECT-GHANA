import Link from "next/link";
import { Metadata } from "next";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { VALUES } from "@/lib/data";
import {
  Target,
  Eye,
  Sparkles,
  Users,
  Lightbulb,
  Shield,
  Handshake,
  TrendingUp,
  Zap,
  ArrowRight,
  Compass,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mission, Vision & Values | DigiConnect Ghana",
  description:
    "Discover the mission, vision, and core values driving DigiConnect Ghana's work in digital literacy and youth technology education.",
};

const valueIcons: Record<string, React.ElementType> = {
  Users,
  Lightbulb,
  Shield,
  Handshake,
  TrendingUp,
  Zap,
};

const STRATEGIC_GOALS_2030 = [
  {
    title: "50,000+ Youth Empowered",
    description: "Equipping young people across all 16 regions with practical, verifiable digital and coding skills.",
  },
  {
    title: "Girls-in-Tech Parity",
    description: "Ensuring at least 50% female participation across all our intensive software engineering cohorts.",
  },
  {
    title: "Community Tech Hubs",
    description: "Establishing physical learning spaces and device access centers in peri-urban and rural districts.",
  },
  {
    title: "Direct Job & Internship Pipelines",
    description: "Partnering with 100+ local and global companies to hire talented Ghanaian youth into remote & local roles.",
  },
];

export default function MissionPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-semibold mb-3 border border-white/10">
              <Target size={13} />
              <span>Purpose & Pillars</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Our Mission, Vision & Values
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              At DigiConnect Ghana, everything we do is anchored in our core ethos: <strong>Tech for Youth. Tech for Good.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Twin Cards */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <ScrollReveal delay={0}>
              <div className="h-full rounded-3xl bg-neutral-50 p-8 sm:p-10 border border-neutral-200/80 hover:border-brand-blue/40 transition-all hover:shadow-xl relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold mb-6">
                  <Target size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue block mb-2">
                  Our Mission
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-4">
                  Democratizing Tech Opportunities for Every Young Person
                </h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">
                  To empower Ghanaian youth through hands-on, accessible digital literacy and software education, equipping them with the tools, community mentorship, and real-world confidence to solve local challenges and thrive in the global digital economy.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="h-full rounded-3xl bg-neutral-50 p-8 sm:p-10 border border-neutral-200/80 hover:border-brand-red/40 transition-all hover:shadow-xl relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center font-bold mb-6">
                  <Eye size={28} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red block mb-2">
                  Our Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark mb-4">
                  A Ghana Where Geography Never Limits Tech Potential
                </h2>
                <p className="text-[15px] leading-relaxed text-neutral-600">
                  A future where every young person in Ghana — regardless of their socioeconomic background, gender, or geographic location — has equal access to technology education, digital capital, and high-impact employment opportunities.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              The Values That Guide Our Work
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              These fundamental commitments shape our workshops, community culture, and donor partnerships.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {VALUES.map((val, idx) => {
              const Icon = valueIcons[val.icon] || Sparkles;
              return (
                <ScrollReveal key={val.title} delay={idx * 80}>
                  <div className="h-full bg-white rounded-3xl p-8 border border-neutral-200 hover:border-brand-blue/30 shadow-xs hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark mb-2">
                      {val.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {val.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Goals 2030 */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
              Vision 2030
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Our Long-Term Strategic Goals
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STRATEGIC_GOALS_2030.map((goal, idx) => (
              <div
                key={goal.title}
                className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/80"
              >
                <div className="text-2xl font-black text-brand-blue font-mono mb-2">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-brand-dark text-base mb-2">{goal.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-600">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Align With Our Mission
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            Join hands with DigiConnect Ghana as an institutional partner, sponsor, or volunteer instructor.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-all shadow-md"
            >
              <span>Partner With Us</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all"
            >
              <span>Explore Programs</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
