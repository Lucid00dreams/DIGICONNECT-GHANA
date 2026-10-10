"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Star,
  Shield,
  Code2,
  Terminal,
  BookOpen,
  Users,
  Award,
  Laptop,
  CheckCircle2,
  Layers,
  Flame,
  TrendingUp,
  Globe,
  Lock,
  Cpu,
  Server,
  Play,
  Heart,
  Compass,
  Menu,
  X,
  Filter,
  GraduationCap,
  Check,
  Zap,
} from "lucide-react";
import { Course } from "@/lib/lmsStore";

interface CourseraLandingPageProps {
  courses: Course[];
  onOpenAuth: (mode?: "login" | "signup") => void;
  onOpenCourseModal: (course: Course) => void;
  onSelectCategory?: (category: string) => void;
  onBookMentorClick?: () => void;
}

const COURSE_IMAGES: Record<string, string> = {
  "cybersecurity-architecture": "/images/courses/cyber-arch.jpg",
  "coding": "/images/courses/web-dev.jpg",
  "cybersecurity": "/images/courses/cyber-defense.jpg",
  "data-analytics": "/images/courses/data-analytics.jpg",
  "python": "/images/courses/python.jpg",
  "cloud-devops": "/images/courses/cloud-devops.jpg",
  "machine-learning": "/images/courses/machine-learning.jpg",
  "prompt-engineering": "/images/courses/prompt-ai.jpg",
  "mobile-dev": "/images/courses/mobile-dev.jpg",
  "ethical-hacking": "/images/courses/ethical-hacking.jpg",
  "it-support": "/images/courses/it-support.jpg",
  "digital-literacy": "/images/courses/productivity.jpg",
};

function getCourseImage(courseId: string): string {
  return COURSE_IMAGES[courseId] || "/images/courses/web-dev.jpg";
}

const TICKER_ITEMS = [
  {
    icon: "🇬🇭",
    text: "DigiConnect Ghana NGO — 100% Tuition-Free Technical Education for Youth",
    badge: "Official NGO",
  },
  {
    icon: "✨",
    text: "“Tech for Youth. Tech for Good.” — Bridging Ghana's Digital Divide",
    badge: "Mission",
  },
  {
    icon: "💻",
    text: "Interactive Browser Sandboxes: Practice HTML/CSS, Python & Cyber Defense Live",
    badge: "Zero Installs",
  },
  {
    icon: "🎓",
    text: "Faculty-Verified Diplomas & Shareable LinkedIn Credentials with QR Code Validation",
    badge: "Accredited",
  },
  {
    icon: "🛡️",
    text: "12 Practical Tracks: Cybersecurity Defense, Web Dev, Python Scripting, Cloud & AI",
    badge: "12 Curricula",
  },
  {
    icon: "🤝",
    text: "Free 1-on-1 Mentorship Sessions with Ghanaian Tech Leaders & Senior Engineers",
    badge: "Free Mentorship",
  },
  {
    icon: "🚀",
    text: "Over 1,200 Ghanaian Youth Empowered with Employment-Ready Digital Skills",
    badge: "Impact",
  },
];

export function CourseraLandingPage({
  courses,
  onOpenAuth,
  onOpenCourseModal,
}: CourseraLandingPageProps) {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [heroCarouselIndex, setHeroCarouselIndex] = useState(0);

  const filteredCourses = courses.filter((c) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "coding" && c.category === "Coding & Web") ||
      (selectedFilter === "cybersecurity" && c.category === "Cybersecurity") ||
      (selectedFilter === "data-ai" && c.category === "Data & AI") ||
      (selectedFilter === "cloud" && c.category === "Cloud & DevOps") ||
      (selectedFilter === "mobile" && c.category === "Mobile & Apps") ||
      (selectedFilter === "it" && c.category === "IT & Systems") ||
      (selectedFilter === "python" && (c.category === "Programming" || c.id === "python")) ||
      (selectedFilter === "literacy" && c.category === "Digital Literacy");

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.organization.toLowerCase().includes(q) ||
      c.skillsGained.some((s) => s.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#0056D2] selection:text-white max-w-full overflow-x-hidden">
      {/* 1. AUTO-ROLLING HEADER TICKER (Continuously rolls on its own, no horizontal scrollbars) */}
      <div className="relative w-full bg-[#080e1a] text-neutral-300 text-xs font-semibold border-b border-neutral-800 overflow-hidden select-none py-2.5">
        {/* Left and Right subtle gradient masks so ticker rolls seamlessly in and out */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#080e1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#080e1a] to-transparent z-10 pointer-events-none" />

        <div className="animate-ticker flex items-center gap-8 whitespace-nowrap">
          {/* Loop Set 1 */}
          {TICKER_ITEMS.map((item, idx) => (
            <div key={`ticker-1-${idx}`} className="inline-flex items-center gap-2.5 shrink-0 px-2">
              <span className="text-sm">{item.icon}</span>
              <span className="font-bold text-white tracking-wide">{item.text}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {item.badge}
              </span>
              <span className="text-neutral-600 ml-4 font-bold">•</span>
            </div>
          ))}

          {/* Loop Set 2 (for smooth infinite roll) */}
          {TICKER_ITEMS.map((item, idx) => (
            <div key={`ticker-2-${idx}`} className="inline-flex items-center gap-2.5 shrink-0 px-2">
              <span className="text-sm">{item.icon}</span>
              <span className="font-bold text-white tracking-wide">{item.text}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {item.badge}
              </span>
              <span className="text-neutral-600 ml-4 font-bold">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. DEDICATED DIGIHUB LMS HEADER (Fully optimized for Mobile, Tablet & Desktop) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: DigiConnect DIGIHub Logo */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/digihub"
              className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-white shadow-xs border border-blue-100 flex items-center justify-center p-0.5 group-hover:scale-105 transition shrink-0">
                <Image
                  src="/logo.png"
                  alt="DigiConnect Ghana Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-base sm:text-xl font-black tracking-tight text-neutral-900 leading-none">
                    DigiConnect
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-black bg-[#0056D2] text-white shadow-2xs tracking-wide">
                    DIGIHub
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-neutral-500 tracking-wider uppercase mt-0.5 hidden xs:block">
                  Tuition-Free Tech Academy • Ghana
                </span>
              </div>
            </Link>

            {/* Desktop Explore Button */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#0056D2] text-[#0056D2] hover:bg-blue-50/80 font-bold text-xs sm:text-sm transition shadow-2xs"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Tracks</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition duration-200 ${
                    isExploreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Explore Mega Menu Dropdown */}
              {isExploreOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-h-[82vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
                  <div className="text-[11px] font-black uppercase tracking-wider text-neutral-400 px-3 py-1.5">
                    DigiConnect Ghana Learning Faculties
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setSelectedFilter("cybersecurity");
                        setIsExploreOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 text-left transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-800">Cybersecurity Academy</div>
                        <div className="text-[10px] text-neutral-500">Zero Trust, Cloud IAM, Threat Defense</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFilter("coding");
                        setIsExploreOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 text-left transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-800">Web &amp; Software Lab</div>
                        <div className="text-[10px] text-neutral-500">HTML5, Responsive CSS, JavaScript ES6+</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFilter("data-ai");
                        setIsExploreOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 text-left transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-800">Data &amp; AI Institute</div>
                        <div className="text-[10px] text-neutral-500">Business Intelligence, SQL, Machine Learning</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFilter("cloud");
                        setIsExploreOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 text-left transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-800">Cloud &amp; DevOps Faculty</div>
                        <div className="text-[10px] text-neutral-500">Virtual Compute, Docker, CI/CD Workflows</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFilter("mobile");
                        setIsExploreOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 text-left transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <Laptop className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-800">Mobile Engineering Lab</div>
                        <div className="text-[10px] text-neutral-500">React Native, Mobile Layouts, Device APIs</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedFilter("python");
                        setIsExploreOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 text-left transition"
                    >
                      <div className="w-8 h-8 rounded-lg bg-yellow-50 text-yellow-700 flex items-center justify-center shrink-0">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-800">Python Scripting &amp; Automation</div>
                        <div className="text-[10px] text-neutral-500">Algorithms, control flow, automation scripts</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Desktop Search Bar */}
          <div className="flex-1 max-w-sm lg:max-w-md hidden lg:block">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, courses &amp; labs..."
                className="w-full py-2 pl-3.5 pr-10 rounded-full border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs text-neutral-800 placeholder:text-neutral-500 outline-none transition shadow-2xs"
              />
              <button
                type="button"
                className="absolute right-1 w-7 h-7 rounded-full bg-[#0056D2] hover:bg-[#00419e] text-white flex items-center justify-center shadow-xs transition"
                aria-label="Search courses"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Actions for Desktop & Mobile */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Mobile Search Toggle Icon */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden p-2 text-neutral-600 hover:text-[#0056D2] hover:bg-blue-50 rounded-xl transition"
              aria-label="Toggle mobile search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Desktop Log In */}
            <button
              type="button"
              onClick={() => onOpenAuth("login")}
              className="hidden sm:inline-block text-xs sm:text-sm font-bold text-[#0056D2] hover:text-[#00419e] px-2.5 py-1.5 transition"
            >
              Log In
            </button>

            {/* Join for Free Primary Button */}
            <button
              type="button"
              onClick={() => onOpenAuth("signup")}
              className="py-1.5 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-black text-xs sm:text-sm shadow-sm transition active:scale-[0.99] whitespace-nowrap"
            >
              Join Free
            </button>

            {/* Mobile Hamburger Drawer Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:text-[#0056D2] hover:bg-neutral-100 rounded-xl transition"
              aria-label="Toggle mobile navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown Input (Smooth Slide Down) */}
        {isMobileSearchOpen && (
          <div className="lg:hidden px-3 sm:px-6 pb-3 pt-1 border-t border-neutral-100 bg-neutral-50/90 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="relative flex items-center">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search DigiConnect courses, labs &amp; tracks..."
                className="w-full py-2 pl-3.5 pr-10 rounded-full border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs text-neutral-800 placeholder:text-neutral-500 outline-none bg-white transition shadow-2xs"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 w-6 h-6 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-xs font-bold"
                >
                  ✕
                </button>
              ) : (
                <button
                  type="button"
                  className="absolute right-1.5 w-7 h-7 rounded-full bg-[#0056D2] text-white flex items-center justify-center shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200 px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth("signup");
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0056D2] text-white font-black text-xs text-center shadow-xs"
              >
                Join for Free
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth("login");
                }}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-neutral-800 font-bold text-xs text-center hover:bg-neutral-50"
              >
                Log In
              </button>
            </div>

            {/* Learning Domains Grid */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-2">
                Explore Learning Faculties
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setSelectedFilter("cybersecurity");
                    setIsMobileMenuOpen(false);
                    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-left hover:border-[#0056D2] transition"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-0.5">
                    <Shield className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Cyber Academy</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">Defense &amp; IAM</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedFilter("coding");
                    setIsMobileMenuOpen(false);
                    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-left hover:border-[#0056D2] transition"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-0.5">
                    <Code2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>Web Software</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">HTML, CSS &amp; JS</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedFilter("data-ai");
                    setIsMobileMenuOpen(false);
                    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-left hover:border-[#0056D2] transition"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>Data &amp; AI</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">SQL &amp; Machine Learning</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedFilter("cloud");
                    setIsMobileMenuOpen(false);
                    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-left hover:border-[#0056D2] transition"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900 mb-0.5">
                    <Layers className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>Cloud DevOps</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">Compute &amp; Docker</span>
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-2 border-t border-neutral-100 space-y-2 text-xs font-semibold">
              <button
                onClick={() => {
                  setSelectedFilter("all");
                  setIsMobileMenuOpen(false);
                  document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full text-left py-1 text-neutral-700 hover:text-[#0056D2] flex items-center justify-between"
              >
                <span>Browse All 12 Curricula</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth("signup");
                }}
                className="w-full text-left py-1 text-neutral-700 hover:text-[#0056D2] flex items-center justify-between"
              >
                <span>In-Browser Live Sandboxes</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenAuth("signup");
                }}
                className="w-full text-left py-1 text-neutral-700 hover:text-[#0056D2] flex items-center justify-between"
              >
                <span>Free 1-on-1 Mentorship Booking</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <Link
                href="/"
                className="w-full text-left py-1 text-[#0056D2] font-bold flex items-center justify-between"
              >
                <span>← Back to DigiConnect Ghana Home</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 3. DUAL HERO PROMO BANNERS WITH AUTHENTIC LOCAL IMAGES & PATTERNS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Card 1: Left Dark Banner - DigiConnect Ghana NGO Flagship */}
          <div className="relative rounded-3xl bg-[#091224] text-white p-6 sm:p-8 lg:p-10 overflow-hidden flex flex-col justify-between shadow-xl border border-blue-900/40 bg-dark-grid">
            {/* Glowing gradient orbs */}
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-500/25 blur-3xl pointer-events-none" />
            <div className="absolute right-8 bottom-0 w-48 h-48 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                  DigiConnect Ghana NGO Initiative
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  100% Tuition-Free
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-3">
                Practical Tech Mastery for Ghanaian Youth
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
                Hands-on training in Web Engineering, Cybersecurity Defense, Data Analytics, Cloud DevOps, and Python Scripting. Built 100% tuition-free by Ghanaian tech educators to bridge the digital divide.
              </p>

              {/* Authentic Photo Showcase with Glassmorphic Badge */}
              <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-white/15 shadow-lg group">
                <Image
                  src="/images/hero/hero.jpg"
                  alt="DigiConnect Ghana students learning technology"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091224] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white font-bold">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Accra Innovation Center • 1,200+ Youth Trained</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/80 text-white text-[10px] font-bold hidden sm:inline">
                    Live Workshop
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenAuth("signup")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-[#0056D2] font-black text-xs sm:text-sm shadow-md transition active:scale-98"
                >
                  <span>Explore Academy Tracks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("catalog-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/20 transition"
                >
                  <span>Browse 12 Curricula</span>
                </button>
              </div>
            </div>

            {/* Bottom impact credential badge */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-bold">Faculty-Verified Diplomas with QR Code Validation</span>
              </div>
              <span className="text-[11px] font-extrabold text-blue-300">Zero Tuition • Open to All</span>
            </div>
          </div>

          {/* Card 2: Right Light Banner - In-Browser Hands-On Labs Showcase */}
          <div className="relative rounded-3xl bg-[#f7faff] border border-blue-200/80 p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-md overflow-hidden bg-tech-grid">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide bg-blue-100 text-[#0056D2] border border-blue-200">
                  <Play className="w-3 h-3 fill-[#0056D2]" />
                  In-Browser Interactive Labs
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Zero Setup Required
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight leading-snug mb-3">
                Practice in Live Interactive Workspaces
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5">
                Don&apos;t just watch video lectures — write live HTML/CSS/JS in our code sandbox, inspect phishing emails, evaluate password strength, audit cloud IAM permissions, and run Python algorithms right in your browser.
              </p>

              {/* Authentic Photo of Live Coding on Laptops */}
              <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden mb-6 border border-blue-200 shadow-md group">
                <Image
                  src="/images/programs/coding-technology.jpg"
                  alt="Students coding in DigiConnect Technology Lab"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 font-bold">
                    <Laptop className="w-3.5 h-3.5 text-blue-400" />
                    <span>Hands-On Sandbox Lab • Live Practice</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-black hidden sm:inline">
                    Interactive
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenAuth("signup")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-black text-xs sm:text-sm shadow-md transition active:scale-98"
              >
                <span>Start Interactive Practice Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Included Interactive Tools Strip */}
            <div className="relative z-10 mt-6 pt-4 border-t border-blue-200/80">
              <span className="text-[11px] font-black text-neutral-600 uppercase tracking-wider block mb-2">
                Included Hands-on Workspaces:
              </span>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-xs font-bold text-neutral-800 shadow-2xs">
                  <Code2 className="w-3.5 h-3.5 text-blue-600" />
                  Web Code Sandbox
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-xs font-bold text-neutral-800 shadow-2xs">
                  <Shield className="w-3.5 h-3.5 text-red-600" />
                  Cyber Threat Lab
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-xs font-bold text-neutral-800 shadow-2xs">
                  <Terminal className="w-3.5 h-3.5 text-amber-600" />
                  Python Runner
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-xs font-bold text-neutral-800 shadow-2xs">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  Office Suite Sim
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <button
            onClick={() => setHeroCarouselIndex(0)}
            className={`h-2 rounded-full transition-all ${
              heroCarouselIndex === 0 ? "w-6 bg-[#0056D2]" : "w-2 bg-neutral-300"
            }`}
            aria-label="Slide 1"
          />
          <button
            onClick={() => setHeroCarouselIndex(1)}
            className={`h-2 rounded-full transition-all ${
              heroCarouselIndex === 1 ? "w-6 bg-[#0056D2]" : "w-2 bg-neutral-300"
            }`}
            aria-label="Slide 2"
          />
          <button
            onClick={() => setHeroCarouselIndex(2)}
            className={`h-2 rounded-full transition-all ${
              heroCarouselIndex === 2 ? "w-6 bg-[#0056D2]" : "w-2 bg-neutral-300"
            }`}
            aria-label="Slide 3"
          />
        </div>
      </section>

      {/* 4. "NEW AND POPULAR" SECTION WITH COURSE THUMBNAILS & FACULTY BRANDING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-neutral-200/80 bg-dot-pattern">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-black text-[#0056D2] uppercase tracking-wider">
              Faculty Highlights
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-0.5">
              New and popular academy tracks
            </h2>
          </div>
          <p className="text-xs text-neutral-500">
            Verified by DigiConnect Ghana Technical Faculty • Complete in 3–5 weeks
          </p>
        </div>

        {/* 3 Columns / Category Subheaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* Column 1: Most Popular */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-neutral-900">Most popular</h3>
              </div>
              <button
                onClick={() => setSelectedFilter("coding")}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Course Card 1: Web Development with technical cover */}
            {courses.find((c) => c.id === "coding") && (
              <div
                onClick={() => onOpenCourseModal(courses.find((c) => c.id === "coding")!)}
                className="rounded-2xl border border-neutral-200/90 bg-white hover:border-[#0056D2] hover:shadow-lg transition cursor-pointer group overflow-hidden"
              >
                <div className="relative w-full h-32 overflow-hidden">
                  <Image
                    src={getCourseImage("coding")}
                    alt="Web Development Track"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-blue-600 text-white font-black text-[10px] shadow-sm">
                    DCG Web Engineering Certificate
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-neutral-600">DigiConnect Software Lab</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#0056D2] transition leading-snug">
                    Foundations of Web Development &amp; Basic Coding
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                    <span className="text-[11px] text-neutral-500">~6h total • Beginner</span>
                    <div className="flex items-center gap-1 text-neutral-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Course Card 2: Data Analytics with technical cover */}
            {courses.find((c) => c.id === "data-analytics") && (
              <div
                onClick={() => onOpenCourseModal(courses.find((c) => c.id === "data-analytics")!)}
                className="rounded-2xl border border-neutral-200/90 bg-white hover:border-[#0056D2] hover:shadow-lg transition cursor-pointer group overflow-hidden"
              >
                <div className="relative w-full h-32 overflow-hidden">
                  <Image
                    src={getCourseImage("data-analytics")}
                    alt="Data Analytics Track"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-indigo-600 text-white font-black text-[10px] shadow-sm">
                    DCG Data &amp; BI Diploma
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-neutral-600">DigiConnect Data Labs</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#0056D2] transition leading-snug">
                    Data Analytics &amp; Business Intelligence
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                    <span className="text-[11px] text-neutral-500">~8h total • Beginner</span>
                    <div className="flex items-center gap-1 text-neutral-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Hot New Releases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0056D2]" />
                <h3 className="text-sm font-bold text-neutral-900">Hot new releases</h3>
              </div>
              <button
                onClick={() => setSelectedFilter("cybersecurity")}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Course Card 3: Cybersecurity Architecture with technical cover */}
            {courses.find((c) => c.id === "cybersecurity-architecture") && (
              <div
                onClick={() => onOpenCourseModal(courses.find((c) => c.id === "cybersecurity-architecture")!)}
                className="rounded-2xl border border-neutral-200/90 bg-white hover:border-[#0056D2] hover:shadow-lg transition cursor-pointer group overflow-hidden"
              >
                <div className="relative w-full h-32 overflow-hidden">
                  <Image
                    src={getCourseImage("cybersecurity-architecture")}
                    alt="Cybersecurity Architecture Track"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-blue-700 text-white font-black text-[10px] shadow-sm">
                    DCG Cyber Architecture Diploma
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-neutral-600">DigiConnect Cyber Academy</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#0056D2] transition leading-snug">
                    Cybersecurity Architecture &amp; IAM Defense
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                    <span className="text-[11px] text-neutral-500">~8h total • Zero Trust</span>
                    <div className="flex items-center gap-1 text-neutral-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Course Card 4: Cloud Architecture with technical cover */}
            {courses.find((c) => c.id === "cloud-devops") && (
              <div
                onClick={() => onOpenCourseModal(courses.find((c) => c.id === "cloud-devops")!)}
                className="rounded-2xl border border-neutral-200/90 bg-white hover:border-[#0056D2] hover:shadow-lg transition cursor-pointer group overflow-hidden"
              >
                <div className="relative w-full h-32 overflow-hidden">
                  <Image
                    src={getCourseImage("cloud-devops")}
                    alt="Cloud Architecture Track"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-amber-600 text-white font-black text-[10px] shadow-sm">
                    DCG Cloud Architecture Certificate
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-neutral-600">DigiConnect Cloud Academy</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#0056D2] transition leading-snug">
                    Cloud Architecture &amp; DevOps Deployment
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                    <span className="text-[11px] text-neutral-500">~8h total • Docker &amp; CI/CD</span>
                    <div className="flex items-center gap-1 text-neutral-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Column 3: Trending AI & Mentorship */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-neutral-900">Trending AI &amp; Mentorship</h3>
              </div>
              <button
                onClick={() => setSelectedFilter("data-ai")}
                className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Course Card 5: Prompt Engineering with technical cover */}
            {courses.find((c) => c.id === "prompt-engineering") && (
              <div
                onClick={() => onOpenCourseModal(courses.find((c) => c.id === "prompt-engineering")!)}
                className="rounded-2xl border border-neutral-200/90 bg-white hover:border-[#0056D2] hover:shadow-lg transition cursor-pointer group overflow-hidden"
              >
                <div className="relative w-full h-32 overflow-hidden">
                  <Image
                    src={getCourseImage("prompt-engineering")}
                    alt="Prompt Engineering Track"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded bg-purple-600 text-white font-black text-[10px] shadow-sm">
                    DCG Generative AI Credential
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-neutral-600">DigiConnect AI Institute</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 group-hover:text-[#0056D2] transition leading-snug">
                    Generative AI Prompt Engineering for Professionals
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                    <span className="text-[11px] text-neutral-500">~5h total • LLMs &amp; JSON</span>
                    <div className="flex items-center gap-1 text-neutral-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Free Mentorship Booking Card with real mentor picture */}
            <div
              onClick={() => onOpenAuth("signup")}
              className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/70 hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <Image
                      src="/images/testimonials/participant-1.jpg"
                      alt="Tech Mentor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#0056D2] block">
                      Free 1-on-1 Mentorship
                    </span>
                    <span className="text-[11px] text-neutral-600">With Senior Ghanaian Tech Leads</span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                  Book a live 1-on-1 video guidance session to review code, prepare for tech job interviews, and get direct career advice.
                </h4>
              </div>

              <span className="text-[11px] font-black text-[#0056D2] mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition">
                <span>Free for all registered students →</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULL CATALOG EXPLORER GRID WITH REAL COURSE IMAGES */}
      <section
        id="catalog-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-neutral-200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-black text-[#0056D2] uppercase tracking-wider">
              Comprehensive Curriculum
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-0.5">
              Explore All Courses &amp; Certifications
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              {courses.length} practical curricula spanning cybersecurity, data analytics, web coding, cloud DevOps, and AI.
            </p>
          </div>

          {/* Filter Pills with touch scrolling */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 py-1.5">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "all"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              All Tracks ({courses.length})
            </button>
            <button
              onClick={() => setSelectedFilter("cybersecurity")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "cybersecurity"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              Cybersecurity
            </button>
            <button
              onClick={() => setSelectedFilter("coding")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "coding"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              Coding &amp; Web
            </button>
            <button
              onClick={() => setSelectedFilter("data-ai")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "data-ai"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              Data &amp; AI
            </button>
            <button
              onClick={() => setSelectedFilter("cloud")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "cloud"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              Cloud &amp; DevOps
            </button>
            <button
              onClick={() => setSelectedFilter("mobile")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "mobile"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              Mobile Apps
            </button>
            <button
              onClick={() => setSelectedFilter("python")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "python"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setSelectedFilter("it")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "it"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              IT Systems
            </button>
            <button
              onClick={() => setSelectedFilter("literacy")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap shrink-0 ${
                selectedFilter === "literacy"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
              }`}
            >
              Digital Literacy
            </button>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-neutral-200 bg-white hover:border-[#0056D2] hover:shadow-xl transition flex flex-col justify-between overflow-hidden group"
            >
              {/* Card visual banner with authentic program photo */}
              <div className="relative w-full h-36 overflow-hidden">
                <Image
                  src={getCourseImage(course.id)}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
                  <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold">
                    ~{course.estimatedHours}h
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <h3 className="font-black text-sm leading-snug line-clamp-2 drop-shadow-sm">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-neutral-700 truncate max-w-[170px]">{course.organization}</span>
                    <div className="flex items-center gap-1 font-bold text-neutral-800 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-neutral-400 font-normal">({course.reviewsCount})</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {course.headline}
                  </p>
                </div>

                {/* Skills Preview */}
                <div>
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider block mb-1">
                    Skills you&apos;ll gain:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {course.skillsGained.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] font-semibold text-neutral-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenCourseModal(course)}
                    className="flex-1 py-2 px-3 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-bold text-xs transition"
                  >
                    Syllabus
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth("signup")}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs transition shadow-2xs"
                  >
                    Enroll Free
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. WHY DIGICONNECT LMS / NGO MISSION TRUST PILLARS WITH PATTERNS */}
      <section className="bg-neutral-50 py-16 border-t border-neutral-200 bg-tech-grid relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black text-[#0056D2] uppercase tracking-wider">
              Educational Quality &amp; Accessibility
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-1">
              Everything you need to master digital technology
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Built specifically by DigiConnect Ghana to empower students, job seekers, and youth across all regions of Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-4">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Browser Sandboxes</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Code HTML, CSS, JavaScript, and run live Python terminals right inside your browser without any complicated installs or high-spec hardware.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Realistic Cyber Labs</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Analyze real phishing headers, evaluate password entropy, and test defensive countermeasures in controlled hands-on environments.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">1-on-1 Mentorship</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Book free 1-on-1 video guidance with volunteer tech leads, software engineers, and career advisors dedicated to youth success.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">Verified Diplomas</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Earn authentic digital credentials with unique verification serials, director signatures, and QR codes for LinkedIn and resumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION BANNER WITH AUTHENTIC BACKGROUND IMAGE */}
      <section className="relative text-white py-16 overflow-hidden">
        {/* Background Image of students learning */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero.jpg"
            alt="DigiConnect Ghana Youth"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003780]/95 via-[#004bb8]/90 to-[#0056D2]/95 backdrop-blur-2xs" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20">
            <span>🇬🇭 Empowering the next generation of Ghanaian tech leaders</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            Start learning today with DigiConnect Ghana
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of youth and students accelerating their careers. Completely free, self-paced, and certified.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenAuth("signup")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-[#0056D2] font-black text-sm shadow-lg transition active:scale-98"
            >
              Join for Free Today
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 transition"
            >
              ← Back to DigiConnect Ghana Main Website
            </Link>
          </div>
        </div>
      </section>

      {/* 8. DEDICATED DIGIHUB LMS FOOTER */}
      <footer className="bg-[#080e1a] text-neutral-400 text-xs border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white p-0.5 shrink-0">
                  <Image
                    src="/logo.png"
                    alt="DigiConnect Ghana"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-base font-black text-white tracking-tight">
                    DigiConnect DIGIHub
                  </span>
                  <span className="block text-[11px] text-neutral-400 font-medium">
                    Learning Management System
                  </span>
                </div>
              </div>

              <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                DigiConnect Ghana is a registered non-profit educational NGO dedicated to bridging the digital divide for youth through free, high-caliber technical education, live interactive browser sandboxes, and verified credentials.
              </p>

              <div className="text-[11px] text-neutral-500 space-y-1">
                <div>📍 Accra, Ghana • Registered NGO</div>
                <div className="text-blue-400 font-semibold">Tech for Youth. Tech for Good.</div>
              </div>
            </div>

            {/* Column 2: Academy Tracks */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Academy Tracks
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setSelectedFilter("cybersecurity");
                      document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition text-left"
                  >
                    Cybersecurity Academy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedFilter("coding");
                      document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition text-left"
                  >
                    Web &amp; Software Lab
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedFilter("data-ai");
                      document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition text-left"
                  >
                    Data Analytics &amp; AI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedFilter("cloud");
                      document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition text-left"
                  >
                    Cloud &amp; DevOps Faculty
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedFilter("python");
                      document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-white transition text-left"
                  >
                    Python Automation
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Student Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Interactive Labs
              </h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    Web Code Sandbox
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    Cyber Threat Defense Lab
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    Python Terminal Shell
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    Digital Office Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    1-on-1 Mentorship Booking
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: NGO Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                NGO Portal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-white transition flex items-center gap-1 text-[#4285F4]">
                    <span>← Main DigiConnect Site</span>
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About DigiConnect Ghana
                  </Link>
                </li>
                <li>
                  <Link href="/programs" className="hover:text-white transition">
                    Community Programs
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-white transition">
                    Verify a Credential
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Contact &amp; Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>
              © 2026 DigiConnect Ghana (DCG). All rights reserved. 100% Tuition-Free Educational NGO.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-neutral-400">Accra, Ghana</span>
              <span>•</span>
              <span className="text-emerald-400">Zero Commercial Ads</span>
              <span>•</span>
              <Link href="/" className="text-neutral-300 hover:text-white transition underline">
                digiconnectghana.org
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
