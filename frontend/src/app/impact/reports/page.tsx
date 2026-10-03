"use client";

import Link from "next/link";
import {
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building,
  ArrowRight,
  PieChart,
  BarChart2
} from "lucide-react";

const REPORTS = [
  {
    year: "2024",
    title: "Annual Impact & Transparency Report 2024",
    subtitle: "Accelerating Nationwide Digital Skills and Youth Employment Across 16 Regions",
    date: "January 2025",
    pages: "38 pages",
    highlights: [
      "2,500+ youth trained across 4 regional community hubs",
      "58% female participation across introductory digital courses",
      "100+ refurbished laptops distributed to rural learners",
      "Over 75% employment and freelance contract conversion rate",
    ],
    fileSize: "4.2 MB",
  },
  {
    year: "2023",
    title: "Annual Impact & Growth Report 2023",
    subtitle: "From Grassroots Workshops to Institutional NGO: Building the Code Academy Foundation",
    date: "January 2024",
    pages: "26 pages",
    highlights: [
      "400+ graduates from foundational web development cohorts",
      "Hosted First Annual Tech for Youth Hackathon in Accra",
      "Launched Girls-in-Tech dedicated mentorship track",
      "Secured partnerships with 3 leading tertiary institutions",
    ],
    fileSize: "3.1 MB",
  },
  {
    year: "2022",
    title: "Inception Milestone & Pilot Briefing 2022",
    subtitle: "Testing Community Coding Sessions in Greater Accra Local Libraries",
    date: "December 2022",
    pages: "16 pages",
    highlights: [
      "First pilot cohort of 35 youth trained in basic computer skills",
      "Validated curriculum frameworks for Ghanaian high school leavers",
      "Formulation of the 'Tech for Youth. Tech for Good.' charter",
    ],
    fileSize: "2.0 MB",
  },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-neutral-50/50 pt-24 pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue-50/60 via-white to-neutral-50/50 py-16 lg:py-20 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue-100/70 text-brand-blue text-xs font-semibold tracking-wide uppercase mb-5">
            <FileText className="w-4 h-4" />
            Governance & Transparency
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Accountability, Metrics, and <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-teal-600">
              Verified Annual Reports
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            As a nonprofit organization, we publish comprehensive annual reports detailing beneficiary impact, financial allocation, and curriculum outcomes.
          </p>
        </div>
      </section>

      {/* Reports Listing */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-16 space-y-8">
        {REPORTS.map((report) => (
          <div
            key={report.year}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-xs font-mono">
                  {report.year} REPORT
                </span>
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Published {report.date}
                </span>
                <span className="text-xs text-neutral-400 font-mono">/ {report.pages}</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">{report.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed">
                  {report.subtitle}
                </p>
              </div>

              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                  Key Document Highlights
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {report.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading ${report.title} (${report.fileSize})`);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-all shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Report PDF ({report.fileSize})</span>
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 text-xs font-semibold hover:bg-neutral-50 transition-all text-center"
              >
                Learn About Our Model
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Governance & Ethics Box */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 mt-4">
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              Audited Governance
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">Have Questions About Our Audit & Metrics?</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              We welcome independent scrutiny and partner inquiries. Contact our secretariat to request full data sheets or discuss grant allocations.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue text-white text-xs font-semibold hover:bg-brand-blue-dark transition-all shadow-md"
          >
            Contact Secretariat <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
