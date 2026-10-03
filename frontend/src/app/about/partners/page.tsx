"use client";

import Link from 'next/link';
import { useStore } from "@/context/StoreContext";
import {
  Handshake,
  Building2,
  GraduationCap,
  Globe2,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Award,
  Sparkles,
  Users2,
  Laptop
} from 'lucide-react';

const CATEGORY_META: Record<string, { title: string; description: string; icon: any; color: string }> = {
  Tech: {
    title: 'Technology & Cloud Alliances',
    description: 'Tech companies and developer communities providing developer tooling, cloud credits, and technical mentors.',
    icon: Cpu,
    color: 'from-blue-500 to-indigo-600',
  },
  Education: {
    title: 'Academic & Secondary Schools',
    description: 'Public high schools and tertiary institutions integrating DigiConnect digital literacy and robotics clubs.',
    icon: GraduationCap,
    color: 'from-amber-500 to-orange-600',
  },
  Community: {
    title: 'Civil Society & NGOs',
    description: 'Youth development advocates and community leaders ensuring no child is left offline.',
    icon: Globe2,
    color: 'from-emerald-500 to-teal-600',
  },
  Corporate: {
    title: 'Corporate Social Responsibility (CSR)',
    description: 'Financial institutions, telecoms, and enterprises funding computer laboratories and student scholarships.',
    icon: Building2,
    color: 'from-purple-500 to-pink-600',
  },
};

const COLLABORATION_MODELS = [
  {
    icon: Laptop,
    title: 'Hardware & Device Donation',
    text: 'Sponsor refurbished laptops, tablets, and solar generators for rural school computer laboratories.',
  },
  {
    icon: Users2,
    title: 'Corporate Mentorship',
    text: 'Engage your software engineers, UX designers, and managers to mentor cohorts of DigiConnect learners.',
  },
  {
    icon: Award,
    title: 'Apprenticeship & Internships',
    text: 'Hire DigiConnect boot camp graduates for entry-level tech support, web development, and digital marketing roles.',
  },
  {
    icon: Sparkles,
    title: 'Challenge Sponsorships',
    text: 'Sponsor hackathons, demo days, and STEM innovation challenges with cash prizes and project grants.',
  },
];

export default function PartnersPage() {
  const { store } = useStore();
  const partnersList = store.partners && store.partners.length > 0 ? store.partners : [];

  // Group partners by category
  const categories = ['Tech', 'Education', 'Community', 'Corporate'];
  // Also collect any custom categories
  partnersList.forEach((p) => {
    if (p.category && !categories.includes(p.category)) {
      categories.push(p.category);
    }
  });

  return (
    <main className="min-h-screen bg-neutral-50/50 pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue-50/60 via-white to-neutral-50/50 py-16 lg:py-24 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-100/70 text-brand-blue text-xs font-semibold tracking-wide uppercase mb-5">
            <Handshake className="w-4 h-4" />
            Strategic Alliances
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Powering Youth Innovation <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-teal-600">
              Through Purposeful Partnerships
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            DigiConnect Ghana works shoulder-to-shoulder with forward-thinking tech hubs, corporate sponsors, public schools, and community leaders to eradicate digital poverty across Ghana.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-involved#partner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-blue text-white font-semibold text-sm shadow-md hover:bg-brand-blue-dark transition-all"
            >
              Become a Partner
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-semibold text-sm hover:bg-neutral-50 transition-all"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Grid Section */}
      <section className="max-w-6xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">Our Ecosystem Network ({partnersList.length} Partners)</h2>
          <p className="mt-3 text-neutral-600">
            Collaborating with key players across education, industry, civil society, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((catKey) => {
            const meta = CATEGORY_META[catKey] || {
              title: `${catKey} Alliances`,
              description: 'Key community and institutional partners supporting our mission.',
              icon: Building2,
              color: 'from-neutral-700 to-neutral-900',
            };
            const Icon = meta.icon;
            const categoryPartners = partnersList.filter(
              (p) => (p.category || 'Tech').toLowerCase() === catKey.toLowerCase()
            );

            if (categoryPartners.length === 0) return null;

            return (
              <div
                key={catKey}
                className="bg-white rounded-3xl p-8 shadow-xs border border-neutral-200/80 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{meta.title}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Ecosystem Collaborator</p>
                  </div>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  {meta.description}
                </p>

                <div className="space-y-3 border-t border-neutral-100 pt-5">
                  {categoryPartners.map((partner) => (
                    <div
                      key={partner.id || partner.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-neutral-50/80 hover:bg-neutral-100/80 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">{partner.name}</div>
                        <div className="text-xs text-neutral-500">{partner.role}</div>
                      </div>
                      <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-600 shadow-2xs">
                        {partner.location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Collaboration Modes */}
      <section className="bg-white border-y border-neutral-200/80 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">How We Can Work Together</h2>
            <p className="mt-3 text-neutral-600">
              Tailored partnership frameworks designed to deliver measurable, sustainable youth impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLABORATION_MODELS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-neutral-50/80 p-6 rounded-2xl border border-neutral-200/70 hover:border-brand-blue/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.text}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-brand-blue text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Active Program</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 rounded-3xl p-8 sm:p-12 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Ready to make an impact?</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-2">Partner with DigiConnect Ghana</h3>
            <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
              Whether you represent an institution, a corporate foundation, or a tech enterprise, we invite you to build Ghana&apos;s digital future together.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-sm transition-all shadow-md"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
