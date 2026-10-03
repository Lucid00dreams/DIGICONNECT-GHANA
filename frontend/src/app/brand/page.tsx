import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Award, Shirt, CreditCard, Book, Flag, ArrowRight, Download, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Identity & Showcase | DigiConnect Ghana",
  description:
    "Explore the DigiConnect Ghana brand guidelines, official visual identity, colors, and physical merchandise mockups.",
};

const BRAND_COLORS = [
  { name: "Cyan / Tech Blue", hex: "#2196D3", role: "Primary brand, CTAs, technology & innovation" },
  { name: "Energy Red", hex: "#E02629", role: "Action, highlights, youth energy" },
  { name: "Optimism Yellow", hex: "#FFD600", role: "Opportunity, youth optimism, accents" },
  { name: "Growth Green", hex: "#00A859", role: "Community, growth, sustainability" },
  { name: "Dark Charcoal", hex: "#1A1A1A", role: "Headlines, body text, high-contrast structure" },
  { name: "Clean White", hex: "#FFFFFF", role: "Primary background, breathing space" },
];

export default function BrandShowcasePage() {
  return (
    <>
      {/* Header — Matching News Page Aesthetic */}
      <section className="pt-28 pb-16 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-neutral-950 to-neutral-950 opacity-95" />

        {/* Decorative Background Pattern Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px]" />
          {/* Precision Design Grid & Geometry Vectors */}
          <svg
            className="absolute -right-16 -top-10 md:right-8 md:top-1/2 md:-translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 text-white/[0.08] pointer-events-none"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="120" cy="120" r="40" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="120" cy="120" r="70" stroke="currentColor" strokeWidth="1.6" strokeDasharray="4 4" />
            <circle cx="120" cy="120" r="100" stroke="currentColor" strokeWidth="1.6" />
            <rect x="50" y="50" width="140" height="140" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
            <line x1="50" y1="50" x2="190" y2="190" stroke="currentColor" strokeWidth="1.4" />
            <line x1="50" y1="190" x2="190" y2="50" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="50" cy="50" r="3.5" fill="currentColor" />
            <circle cx="190" cy="50" r="3.5" fill="currentColor" />
            <circle cx="50" cy="190" r="3.5" fill="currentColor" />
            <circle cx="190" cy="190" r="3.5" fill="currentColor" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-yellow/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold text-brand-yellow mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
              Brand Identity Case Study
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              DigiConnect Ghana Brand Showcase
            </h1>
            <p className="text-base text-neutral-300 leading-relaxed">
              Designed around our official identity: Tech for Youth. Tech for Good. Discover how the brand extends from the digital portal into physical community materials, certificates, and merchandise.
            </p>
          </div>
        </div>
      </section>

      {/* Official Logo & Core Identity */}
      <section className="py-20 bg-white border-b border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
                Official Visual Anchor
              </span>
              <h2 className="text-3xl font-extrabold text-brand-dark mb-5">
                The DigiConnect Ghana Mark
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6 text-sm lg:text-base">
                The official logo integrates our core purpose: connecting African youth with transformative technology opportunities. The vibrant four-color spectrum symbolizes technology, energy, opportunity, and community growth.
              </p>

              <div className="space-y-3 text-sm text-neutral-700 mb-8">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  <span>Unmodified official vector mark & aspect ratio</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  <span>Integrated with clean, modern Poppins typography</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  <span>High-contrast legibility across dark and light surfaces</span>
                </div>
              </div>

              <a
                href="/logo.png"
                download="DigiConnect-Ghana-Logo.png"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold bg-neutral-900 text-white hover:bg-neutral-800 text-xs transition-colors"
              >
                <Download className="w-4 h-4" /> Download Official Logo (PNG)
              </a>
            </div>

            <div className="p-12 rounded-3xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shadow-inner">
              <div className="relative w-72 h-36">
                <Image
                  src="/logo.png"
                  alt="Official DigiConnect Ghana Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Color Palette */}
      <section className="py-20 bg-neutral-50/50 border-b border-neutral-200/60">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
              Color Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-brand-dark">
              Harmonious Brand Palette
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Extracted directly from the official logo to ensure intentional, disciplined color application.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRAND_COLORS.map((c) => (
              <div key={c.name} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                <div className="h-28 w-full" style={{ backgroundColor: c.hex }} />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-brand-dark text-sm">{c.name}</h3>
                    <code className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                      {c.hex}
                    </code>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Merchandise & Brand Collateral Showcase */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-2 block">
              Physical Applications
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-dark">
              Brand Mockup Suite
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Professional merchandise and event collateral designed for cohorts, mentors, and community hackathons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* T-Shirt Mockup */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col">
              <div className="h-64 bg-gradient-to-br from-blue-600 to-blue-800 p-8 flex flex-col items-center justify-center relative">
                <div className="w-36 h-40 bg-blue-700/80 rounded-2xl shadow-xl border border-blue-400/30 flex flex-col items-center justify-center p-4 text-center">
                  <div className="relative w-20 h-10 mb-2">
                    <Image src="/logo.png" alt="Logo on shirt" fill className="object-contain brightness-0 invert" />
                  </div>
                  <span className="text-[9px] text-white/90 font-bold uppercase tracking-wider">
                    TECH FOR YOUTH. TECH FOR GOOD.
                  </span>
                </div>
                <span className="absolute bottom-3 right-4 text-[10px] text-white/60 font-mono">Cohort Edition</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-sm">
                  <Shirt className="w-4 h-4" /> Branded Community T-Shirt
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Tech blue cotton crewneck with official DigiConnect mark printed on chest and the motto across the shoulder.
                </p>
              </div>
            </div>

            {/* ID Badge Mockup */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col">
              <div className="h-64 bg-neutral-800 p-8 flex items-center justify-center relative">
                <div className="w-36 h-52 bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 flex flex-col items-center justify-between text-center">
                  <div className="relative w-16 h-8">
                    <Image src="/logo.png" alt="Logo on ID" fill className="object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-neutral-200 overflow-hidden border-2 border-brand-blue">
                    <Image src="/images/testimonials/participant-1.jpg" alt="User" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-brand-dark leading-tight">Participant Pass</span>
                    <span className="block text-[9px] text-brand-blue font-bold uppercase tracking-wider">Code Academy</span>
                  </div>
                  <div className="w-full h-1 bg-brand-blue rounded-full"></div>
                </div>
                <span className="absolute bottom-3 right-4 text-[10px] text-neutral-400 font-mono">Staff & Cohort ID</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-sm">
                  <CreditCard className="w-4 h-4" /> Participant & Staff ID Badge
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Professional lanyard ID pass featuring QR verification, cohort role, and verified credential security strip.
                </p>
              </div>
            </div>

            {/* Certificate Mockup */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col">
              <div className="h-64 bg-amber-50/50 p-6 flex items-center justify-center relative border-b border-neutral-200">
                <div className="w-56 h-40 bg-white rounded-lg shadow-xl border-4 border-amber-400/40 p-3 flex flex-col justify-between text-center relative">
                  <div className="border border-neutral-200 h-full p-2 flex flex-col justify-between">
                    <div className="relative w-14 h-6 mx-auto">
                      <Image src="/logo.png" alt="Logo on Cert" fill className="object-contain" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-serif font-bold text-neutral-800 uppercase tracking-widest">
                        Certificate of Completion
                      </span>
                      <span className="block text-[7px] text-neutral-500 italic mt-0.5">
                        This certifies successful cohort graduation
                      </span>
                    </div>
                    <div className="flex justify-between items-end text-[7px] text-neutral-400 pt-1 border-t border-neutral-100">
                      <span>Accra, Ghana</span>
                      <span className="font-bold text-brand-blue">TECH FOR GOOD</span>
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-3 right-4 text-[10px] text-neutral-400 font-mono">Verified Credential</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-sm">
                  <Award className="w-4 h-4" /> Verified Completion Certificate
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Official graduation diploma presented to participants fulfilling the hands-on project and attendance requirements.
                </p>
              </div>
            </div>

            {/* Hardcover Notebook Mockup */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col">
              <div className="h-64 bg-neutral-900 p-8 flex items-center justify-center relative">
                <div className="w-36 h-48 bg-neutral-800 rounded-r-xl rounded-l-xs shadow-2xl border-l-4 border-neutral-700 p-4 flex flex-col justify-center items-center text-center">
                  <div className="relative w-20 h-10 mb-2 opacity-90">
                    <Image src="/logo.png" alt="Logo on Notebook" fill className="object-contain brightness-0 invert" />
                  </div>
                  <span className="text-[8px] text-neutral-400 uppercase tracking-widest">
                    Field Journal
                  </span>
                </div>
                <span className="absolute bottom-3 right-4 text-[10px] text-neutral-500 font-mono">Learner Journal</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-sm">
                  <Book className="w-4 h-4" /> Premium Hardcover Notebook
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Embossed matte black notebook provided in welcome kit for notes, software blueprints, and goal setting.
                </p>
              </div>
            </div>

            {/* Roll-Up Banner Mockup */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col">
              <div className="h-64 bg-neutral-100 p-6 flex items-center justify-center relative">
                <div className="w-24 h-52 bg-white rounded-t-sm shadow-2xl border border-neutral-300 flex flex-col justify-between p-2 text-center">
                  <div className="relative w-16 h-8 mx-auto mt-1">
                    <Image src="/logo.png" alt="Logo on Banner" fill className="object-contain" />
                  </div>
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-brand-blue"></div>
                    <div className="w-full h-1 bg-brand-red"></div>
                    <div className="w-full h-1 bg-brand-yellow"></div>
                    <div className="w-full h-1 bg-brand-green"></div>
                  </div>
                  <div>
                    <span className="block text-[7px] font-extrabold text-brand-dark leading-tight">
                      EMPOWERING YOUTH THROUGH TECH
                    </span>
                    <span className="block text-[6px] text-brand-blue font-bold mt-1">
                      www.digiconnectghana.org
                    </span>
                  </div>
                </div>
                <span className="absolute bottom-3 right-4 text-[10px] text-neutral-500 font-mono">Event Banner</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-sm">
                  <Flag className="w-4 h-4" /> Roll-Up Event Banner
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  85x200cm professional roll-up banner utilized at workshops, high school outreach, and university conferences.
                </p>
              </div>
            </div>

            {/* Hub Workspace Station */}
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden shadow-xs flex flex-col">
              <div className="h-64 bg-neutral-800 p-6 flex items-center justify-center relative">
                <div className="w-48 h-32 bg-neutral-900 rounded-lg shadow-2xl border border-neutral-700 p-2 flex flex-col justify-between">
                  <div className="w-full h-full bg-neutral-950 rounded flex items-center justify-center p-2">
                    <div className="relative w-24 h-12">
                      <Image src="/logo.png" alt="Workstation" fill className="object-contain" />
                    </div>
                  </div>
                  <div className="w-12 h-1 bg-neutral-600 mx-auto mt-1 rounded-full"></div>
                </div>
                <span className="absolute bottom-3 right-4 text-[10px] text-neutral-400 font-mono">Workstation Mockup</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2 text-brand-blue font-bold text-sm">
                  <ArrowRight className="w-4 h-4" /> Lab Workspace Display
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Dual-monitor setup configured in community hubs with curated development and design tooling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
