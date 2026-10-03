"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Users,
  ArrowRight,
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  GraduationCap
} from "lucide-react";

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function TeamPage() {
  const { store } = useStore();
  const teamList = store.team && store.team.length > 0 ? store.team : [];

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-semibold mb-3 border border-white/10">
              <Users size={13} />
              <span>People & Passion</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Our Leadership & Team
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              We are a team of technologists, educators, mentors, and community advocates dedicated to unlocking technological potential in every young Ghanaian.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
              Ecosystem Stewards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Guiding Our Vision Forward ({teamList.length} Leaders & Mentors)
            </h2>
            <p className="text-sm text-neutral-500 mt-2">
              Combining industry software experience with deep commitment to grassroots youth empowerment.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamList.map((member, idx) => (
              <ScrollReveal key={member.id || member.name} delay={idx * 80}>
                <div className="group h-full bg-neutral-50/80 rounded-3xl p-6 border border-neutral-200/80 hover:border-brand-blue/40 transition-all hover:shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 bg-neutral-200 border border-neutral-200">
                      <Image
                        src={member.image || "/images/testimonials/participant-1.jpg"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    {member.department && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue inline-block mb-2">
                        {member.department}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-500 mb-3">
                      {member.role}
                    </p>
                    {member.specialty && (
                      <p className="text-[11px] font-medium text-emerald-600 mb-2">
                        Focus: {member.specialty}
                      </p>
                    )}
                    <p className="text-xs leading-relaxed text-neutral-600">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-neutral-200/60 flex items-center gap-3 text-neutral-400">
                    <a
                      href={member.linkedin || "#"}
                      className="hover:text-brand-blue transition-colors"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <LinkedInIcon size={16} />
                    </a>
                    <a
                      href={member.twitter || "#"}
                      className="hover:text-brand-blue transition-colors"
                      aria-label={`${member.name} Twitter`}
                    >
                      <TwitterIcon size={16} />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Mentor CTA */}
      <section className="py-16 bg-neutral-900 text-white border-t border-neutral-800">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-yellow text-xs font-semibold mb-4">
            <Heart size={14} />
            <span>Join Our Mentor Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Want to Coach Ghana&apos;s Next Generation of Technologists?
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto leading-relaxed">
            We are always looking for passionate engineers, designers, and career coaches who can volunteer 2-3 hours per week to guide young learners.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-involved#volunteer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-6 py-3 text-sm font-semibold text-white hover:bg-brand-blue-dark transition-all shadow-md"
            >
              <span>Apply to Mentor</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-all"
            >
              <span>Contact Secretariat</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
