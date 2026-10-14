import React from "react";
import Link from "next/link";
import {
  Home,
  GraduationCap,
  Compass,
  ArrowLeft,
  Search,
  BookOpen,
  LifeBuoy,
  FileQuestion,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      {/* Top Background Glow */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-100/50 via-sky-50/30 to-transparent pointer-events-none -z-10" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-20 sm:py-28 flex flex-col items-center justify-center text-center">
        {/* Error Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0056D2] text-xs sm:text-sm font-bold mb-6 shadow-2xs">
          <FileQuestion className="w-4 h-4 text-[#0056D2]" />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* Big Glitch / Glow Number */}
        <div className="relative mb-4">
          <span className="text-7xl sm:text-9xl font-black tracking-tight text-neutral-900 select-none">
            4<span className="text-[#0056D2]">0</span>4
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-[#0056D2] to-transparent rounded-full opacity-60" />
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-3">
          Lost in the Digital Landscape?
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto mb-8 leading-relaxed">
          The page or digital module you are searching for may have been moved, updated,
          or temporarily disconnected. Let&apos;s get you back on track.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-sm shadow-sm hover:shadow transition transform hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/digihub"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 font-semibold text-sm shadow-2xs transition transform hover:-translate-y-0.5"
          >
            <GraduationCap className="w-4 h-4 text-[#0056D2]" />
            <span>Open DIGIHub Academy</span>
          </Link>
        </div>

        {/* Quick Route Shortcuts */}
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-2xs text-left">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0056D2]" />
            <span>Explore Popular Destinations</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/programs"
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/60 border border-transparent hover:border-blue-100 transition group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#0056D2] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 group-hover:text-[#0056D2] transition">
                  Our Programs
                </p>
                <p className="text-xs text-neutral-500">
                  Bootcamps, workshops, and digital literacy.
                </p>
              </div>
            </Link>

            <Link
              href="/impact"
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-50/60 border border-transparent hover:border-emerald-100 transition group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 group-hover:text-emerald-700 transition">
                  Our Impact
                </p>
                <p className="text-xs text-neutral-500">
                  Over 10,000 Ghanaian youths empowered.
                </p>
              </div>
            </Link>

            <Link
              href="/about"
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-purple-50/60 border border-transparent hover:border-purple-100 transition group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 group-hover:text-purple-700 transition">
                  About DigiConnect
                </p>
                <p className="text-xs text-neutral-500">
                  Mission, leadership, and community story.
                </p>
              </div>
            </Link>

            <Link
              href="/contact"
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50/60 border border-transparent hover:border-amber-100 transition group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                <LifeBuoy className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900 group-hover:text-amber-700 transition">
                  Contact & Support
                </p>
                <p className="text-xs text-neutral-500">
                  Reach our team in Accra or via email.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
