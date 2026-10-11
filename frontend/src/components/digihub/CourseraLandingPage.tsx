"use client";

import React, { useState, useEffect } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
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
  Lock,
  Compass,
  Info,
  HelpCircle,
  LogIn,
  Check,
  Clock,
  Layers,
  GraduationCap,
  ExternalLink,
  Cpu,
  Globe2,
  Menu,
  X,
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

const FAQ_ITEMS = [
  {
    q: "What is DIGIHub and who can join?",
    a: "DIGIHub is DigiConnect Ghana's proprietary virtual technical academy and learning management system. It provides tuition-free, self-paced technical education in Web Development, Cybersecurity, Python, Cloud DevOps, and Data Analytics. Any Ghanaian youth, secondary student, university graduate, or job seeker across all 16 regions of Ghana can join with zero financial barrier.",
  },
  {
    q: "Is DIGIHub really 100% free with no hidden charges?",
    a: "Yes, completely free. DIGIHub is operated by DigiConnect Ghana, a registered non-profit educational NGO. There are no tuition fees, no subscription tiers, no examination charges, and no paywalled features for any of our 12 career tracks, interactive browser labs, or verified diplomas.",
  },
  {
    q: "Do I need a high-end laptop or expensive software to learn?",
    a: "No. All interactive coding environments, Python shells, data query simulators, and cyber defense exercises run directly inside your modern web browser. You do not need to install complex local compilers, virtualization software, or own an expensive computer. A standard laptop, desktop computer, or basic internet cafe workstation is completely sufficient.",
  },
  {
    q: "Why do I need to sign in before accessing courses and labs?",
    a: "Creating a free account allows DIGIHub to securely save your coding exercises, persist your browser sandbox projects, record chapter quiz grades, track your pathway completion, and issue officially verified certificates in your legal name.",
  },
  {
    q: "Are the certificates verified and shareable on LinkedIn and CVs?",
    a: "Yes. Every diploma issued by DIGIHub includes a unique cryptographic verification serial number and a live verification QR code that links directly to DigiConnect Ghana's official academic registry. Employers and universities can instantly confirm your credential authenticity.",
  },
  {
    q: "How does the free 1-on-1 mentorship work?",
    a: "Once signed into your free student dashboard, you can visit the Mentorship portal to schedule 1-on-1 virtual sessions with volunteer senior software engineers, cybersecurity specialists, and tech leaders from Ghana and abroad. Mentors provide code reviews, career roadmap advice, and CV feedback.",
  },
  {
    q: "Can I learn on a smartphone or mobile tablet?",
    a: "Yes. DIGIHub is fully responsive. You can read lesson materials, complete chapter quizzes, review code examples, and track your progress on any smartphone or tablet. For hands-on typing in the interactive code sandbox and terminal labs, we recommend using a laptop or physical keyboard when available.",
  },
  {
    q: "How long does each curriculum take to complete?",
    a: "Our programs are completely self-paced. Most tracks are structured across 4 to 8 weeks when dedicating 4 to 6 hours per week. Because there are no rigid deadlines, you can learn according to your own work, school, or personal schedule.",
  },
  {
    q: "How can schools, community hubs, or youth centers partner with DIGIHub?",
    a: "DigiConnect Ghana actively collaborates with secondary schools, universities, community ICT centers, and youth organizations to bring digital literacy and engineering workshops to local communities. Reach out through our main contact portal or email us to explore educational partnerships.",
  },
];

export function CourseraLandingPage({
  courses,
  onOpenAuth,
  onOpenCourseModal,
}: CourseraLandingPageProps) {
  const [showExploreCatalog, setShowExploreCatalog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize scroll-triggered reveal animations
  useScrollReveal();

  // Re-observe when catalog view toggles
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-scale, .reveal-left, .reveal-right").forEach((el) => {
        if (!el.classList.contains("visible")) {
          el.classList.remove("visible");
        }
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [showExploreCatalog]);

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

  const handleOpenExplore = (categoryFilter?: string) => {
    if (categoryFilter) {
      setSelectedFilter(categoryFilter);
    }
    setShowExploreCatalog(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToOverview = (targetId?: string) => {
    setShowExploreCatalog(false);
    if (targetId) {
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-digihub selection:bg-[#0056D2] selection:text-white max-w-full overflow-x-hidden">
      {/* 1. QUIET TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#080e1a] text-neutral-300 text-xs py-2 px-3 sm:px-6 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-semibold text-white">DIGIHub by DigiConnect Ghana</span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-neutral-300">Open-Access Technical Learning Academy</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-[11px] text-neutral-400">
            <span className="hidden md:inline">Accra Innovation Campus</span>
            <span className="hidden md:inline text-neutral-600">•</span>
            <span className="text-amber-400 font-medium">Zero Installs Required</span>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED DIGIHUB LMS HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: DigiConnect DIGIHub Logo */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link
              href="/digihub"
              onClick={(e) => {
                if (showExploreCatalog) {
                  e.preventDefault();
                  handleBackToOverview();
                }
              }}
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
                  <span className="text-base sm:text-xl font-bold tracking-tight text-neutral-900 leading-none">
                    DigiConnect
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] sm:text-[11px] font-bold bg-[#0056D2] text-white shadow-2xs tracking-wide">
                    DIGIHub
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-medium text-neutral-500 tracking-wider uppercase mt-0.5 hidden xs:block">
                  Virtual Tech Campus • Ghana
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 ml-6 text-xs font-semibold text-neutral-700">
              <button
                type="button"
                onClick={() => handleBackToOverview("about-digihub")}
                className="hover:text-[#0056D2] transition"
              >
                About DIGIHub
              </button>
              <button
                type="button"
                onClick={() => handleBackToOverview("how-it-works")}
                className="hover:text-[#0056D2] transition"
              >
                How It Works
              </button>
              <button
                type="button"
                onClick={() => handleBackToOverview("labs-section")}
                className="hover:text-[#0056D2] transition"
              >
                Browser Labs
              </button>
              <button
                type="button"
                onClick={() => handleBackToOverview("faq-section")}
                className="hover:text-[#0056D2] transition"
              >
                FAQ
              </button>
            </nav>
          </div>

          {/* Right: Desktop Actions & Mobile Action / Dropdown Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Actions (md and up) */}
            <div className="hidden md:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  if (showExploreCatalog) {
                    handleBackToOverview();
                  } else {
                    handleOpenExplore();
                  }
                }}
                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shadow-2xs active:scale-98 ${
                  showExploreCatalog
                    ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300"
                    : "bg-blue-50 hover:bg-blue-100 text-[#0056D2] border border-blue-200"
                }`}
                aria-label={showExploreCatalog ? "Back to Overview" : "Explore Courses"}
              >
                <Compass className="w-4 h-4 text-[#0056D2]" />
                <span>{showExploreCatalog ? "← Overview" : "Explore Courses"}</span>
                {!showExploreCatalog && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] bg-[#0056D2] text-white font-bold">
                    {courses.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => onOpenAuth("login")}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-neutral-700 hover:text-neutral-900 font-semibold text-xs sm:text-sm hover:bg-neutral-100 transition"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth("signup")}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-98"
              >
                Join Free
              </button>
            </div>

            {/* Mobile Actions (< md): Quick CTA + Dropdown Menu Toggle */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => onOpenAuth("signup")}
                className="px-3 py-1.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-xs transition active:scale-95"
              >
                Join Free
              </button>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-xl border transition ${
                  isMobileMenuOpen
                    ? "bg-neutral-100 border-neutral-300 text-neutral-900"
                    : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                }`}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-neutral-800" />
                ) : (
                  <Menu className="w-5 h-5 text-neutral-800" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 top-[65px] bg-black/40 backdrop-blur-xs z-40 transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="md:hidden relative z-50 bg-white border-b border-neutral-200 shadow-2xl p-4 sm:p-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
              {/* Primary Navigation Buttons */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (showExploreCatalog) {
                      handleBackToOverview();
                    } else {
                      handleOpenExplore();
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 text-[#0056D2] font-bold text-xs border border-blue-100 transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#0056D2]" />
                    <span>{showExploreCatalog ? "← Back to Overview" : "Explore All Courses"}</span>
                  </div>
                  {!showExploreCatalog && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#0056D2] text-white font-bold">
                      {courses.length} Tracks
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleBackToOverview("labs-section");
                  }}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl hover:bg-neutral-100 text-neutral-800 font-semibold text-xs transition text-left"
                >
                  <Terminal className="w-4 h-4 text-emerald-600" />
                  <span>Interactive Browser Labs</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleBackToOverview("about-digihub");
                  }}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl hover:bg-neutral-100 text-neutral-800 font-semibold text-xs transition text-left"
                >
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>About DIGIHub Ghana</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleBackToOverview("how-it-works");
                  }}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl hover:bg-neutral-100 text-neutral-800 font-semibold text-xs transition text-left"
                >
                  <Cpu className="w-4 h-4 text-amber-600" />
                  <span>How It Works</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleBackToOverview("faq-section");
                  }}
                  className="w-full flex items-center gap-2.5 p-3 rounded-xl hover:bg-neutral-100 text-neutral-800 font-semibold text-xs transition text-left"
                >
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  <span>Frequently Asked Questions</span>
                </button>
              </div>

              {/* Authentication Divider & Buttons */}
              <div className="pt-3 border-t border-neutral-100 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth("login");
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold text-xs transition text-center flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Sign In to Existing Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAuth("signup");
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-md transition text-center flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Create Free Scholar Account</span>
                </button>
              </div>
            </div>
          </>
        )}
      </header>

      {/* ───────────────────────────────────────────────────────────────── */}
      {/* CONDITIONAL BODY: DEDICATED CATALOG VIEW OR ACADEMY OVERVIEW      */}
      {/* ───────────────────────────────────────────────────────────────── */}
      {showExploreCatalog ? (
        /* DEDICATED FULL CATALOG VIEW (Courses cleanly placed here) */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
          {/* Top Breadcrumb & Header Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-neutral-200">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleBackToOverview()}
                  className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1 group"
                >
                  <span className="group-hover:-translate-x-0.5 transition">←</span>
                  <span>Back to Academy Overview</span>
                </button>
                <span className="text-neutral-300">•</span>
                <span className="text-xs text-neutral-500 font-medium">100% Tuition-Free</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
                Explore All DIGIHub Courses
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-2xl font-normal">
                12 comprehensive technical tracks with in-browser coding sandboxes, real threat defense simulators, and verified completion diplomas. Create a free scholar account to enroll.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, skills, tools..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter: Mobile Dropdown & Desktop Pills */}
          <div className="space-y-2">
            {/* Mobile Dropdown Selector (< sm) to prevent clutter and horizontal overflow */}
            <div className="sm:hidden">
              <label htmlFor="mobile-category-select" className="sr-only">
                Filter by Category
              </label>
              <div className="relative">
                <select
                  id="mobile-category-select"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full py-2.5 pl-3.5 pr-9 rounded-xl border border-neutral-300 bg-white text-xs font-bold text-neutral-800 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 appearance-none shadow-xs outline-none"
                >
                  <option value="all">📚 All Tracks ({courses.length})</option>
                  <option value="cybersecurity">🛡️ Cybersecurity</option>
                  <option value="coding">💻 Coding &amp; Web</option>
                  <option value="data-ai">📊 Data &amp; AI</option>
                  <option value="cloud">☁️ Cloud &amp; DevOps</option>
                  <option value="mobile">📱 Mobile Apps</option>
                  <option value="python">🐍 Python</option>
                  <option value="it">🖥️ IT Systems</option>
                  <option value="literacy">⚡ Digital Literacy</option>
                </select>
                <ChevronDown className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Desktop / Tablet Scrollable Filter Pills */}
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
              {[
                { id: "all", label: `All Tracks (${courses.length})` },
                { id: "cybersecurity", label: "Cybersecurity" },
                { id: "coding", label: "Coding & Web" },
                { id: "data-ai", label: "Data & AI" },
                { id: "cloud", label: "Cloud & DevOps" },
                { id: "mobile", label: "Mobile Apps" },
                { id: "python", label: "Python" },
                { id: "it", label: "IT Systems" },
                { id: "literacy", label: "Digital Literacy" },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedFilter(pill.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                    selectedFilter === pill.id
                      ? "bg-[#0056D2] text-white shadow-2xs"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
            <span>
              Showing <strong className="text-neutral-900">{filteredCourses.length}</strong> {filteredCourses.length === 1 ? "track" : "tracks"}
              {selectedFilter !== "all" && ` in selected category`}
            </span>
            {(searchQuery || selectedFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="text-[#0056D2] hover:underline font-semibold"
              >
                Reset all filters
              </button>
            )}
          </div>

          {/* Course Cards Grid */}
          {filteredCourses.length === 0 ? (
            <div className="p-12 text-center bg-neutral-50 rounded-3xl border border-dashed border-neutral-300 space-y-3">
              <Search className="w-8 h-8 text-neutral-400 mx-auto" />
              <h3 className="text-sm font-bold text-neutral-800">
                No courses found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try searching for keywords like &ldquo;Python&rdquo;, &ldquo;Security&rdquo;, or reset the active filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="px-4 py-2 rounded-xl bg-[#0056D2] text-white text-xs font-bold hover:bg-[#00419e] transition"
              >
                View All Tracks
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredCourses.map((course, courseIndex) => (
                <div
                  key={course.id}
                  onClick={() => onOpenAuth("signup")}
                  className="rounded-2xl border border-neutral-200 bg-white hover:border-[#0056D2] hover:shadow-lg card-lift flex flex-col justify-between overflow-hidden group cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(courseIndex * 60, 400)}ms` }}
                >
                  {/* Card Technical Cover */}
                  <div className="relative w-full h-36 overflow-hidden">
                    <Image
                      src={getCourseImage(course.id)}
                      alt={course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                        {course.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/90 text-neutral-950 text-[10px] font-semibold">
                        <Lock className="w-2.5 h-2.5" />
                        Sign In
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <h3 className="font-bold text-sm leading-snug line-clamp-2 drop-shadow-sm">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-neutral-700 truncate max-w-[170px]">{course.organization}</span>
                        <div className="flex items-center gap-1 font-semibold text-neutral-800 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{course.rating}</span>
                          <span className="text-neutral-400 font-normal">({course.reviewsCount})</span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {course.headline}
                      </p>
                    </div>

                    {/* Level and Duration info */}
                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-medium pt-1">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{course.level}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{course.durationWeeks} Weeks</span>
                      </span>
                    </div>

                    {/* Skills Preview */}
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                        Skills you&apos;ll gain:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {course.skillsGained.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] font-medium text-neutral-700"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAuth("login");
                        }}
                        className="flex-1 py-2 px-3 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs transition"
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAuth("signup");
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs transition shadow-2xs flex items-center justify-center gap-1"
                      >
                        <span>Enroll Free</span>
                        <Lock className="w-3 h-3 ml-0.5 opacity-80" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Return Banner */}
          <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
            <div>
              <h3 className="font-bold text-sm text-neutral-900">Want to learn more about how DIGIHub works?</h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                Explore our in-browser coding workspaces, mission, and official diploma verification on the academy overview.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleBackToOverview()}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-bold text-xs transition shrink-0 self-start sm:self-auto"
            >
              ← Back to Overview
            </button>
          </div>
        </main>
      ) : (
        <>
          {/* 3. FULL-BLEED IMMERSIVE HERO */}
          <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden bg-black text-white pb-28 sm:pb-20" id="hero-section">
        {/* Background Cover Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/digihub-hero-cover.jpg"
            alt="Young Ghanaian students learning technology on laptops at DIGIHub"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Soft Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35 sm:to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24 w-full">
          <div className="max-w-2xl space-y-5 sm:space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/10 text-amber-300 border border-white/20 backdrop-blur-md animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-float shrink-0" />
              <span className="truncate">Interactive Tech Academy • 100% Tuition-Free</span>
            </div>

            <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.18] sm:leading-[1.15] drop-shadow-md animate-fade-in-up break-words" style={{ animationDelay: '200ms' }}>
              Learn to Code, Defend Systems, and Launch Your Tech Career
            </h1>

            <p className="text-sm sm:text-lg text-neutral-200 leading-relaxed font-normal max-w-xl drop-shadow-sm animate-fade-in-up break-words" style={{ animationDelay: '300ms' }}>
              Practice software development, cybersecurity, and cloud engineering directly inside your browser. Complete self-paced curricula, build real-world portfolios, and earn verified diplomas at zero cost.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <button
                type="button"
                onClick={() => handleOpenExplore()}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm shadow-xl transition active:scale-98 text-center"
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onOpenAuth("signup")}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/25 transition backdrop-blur-sm text-center"
              >
                <LogIn className="w-4 h-4 shrink-0" />
                <span>Sign In to Access</span>
              </button>
            </div>

            {/* Impact Feature Line */}
            <div className="pt-6 sm:pt-8 border-t border-white/15 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-y-2 sm:gap-x-6 text-[11px] sm:text-xs text-neutral-300 font-medium animate-fade-in-up" style={{ animationDelay: '550ms' }}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>12 Curricula</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
                <span>In-Browser Labs</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
                <span>Verified Diplomas</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 shrink-0" />
                <span>1-on-1 Mentors</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT DIGIHUB SECTION */}
      <section id="about-digihub" className="py-16 sm:py-20 bg-neutral-50 border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Context & Mission */}
            <div className="lg:col-span-6 space-y-4 reveal-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
                What is DIGIHub?
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                DIGIHub is DigiConnect Ghana&apos;s open-access virtual technical campus. We engineered it specifically to eliminate economic and technological barriers for youth, secondary school graduates, university students, and career transitioners throughout Ghana.
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                Rather than passive video viewing, DIGIHub provides interactive sandbox environments where you write code in live browser runtimes, analyze realistic cybersecurity threat scenarios, evaluate algorithms, and assemble real-world portfolio deliverables.
              </p>

              {/* Regional Access Callout */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-neutral-700 space-y-1.5">
                <div className="font-semibold text-[#0056D2] flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4" />
                  <span>Pan-Ghana Digital Accessibility</span>
                </div>
                <p className="leading-relaxed">
                  Engineered to run seamlessly on standard laptops, community computer labs, and mobile devices without heavy software downloads or high-spec hardware requirements.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenAuth("signup")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs sm:text-sm shadow-sm transition active:scale-98"
                >
                  <span>Create Free Account to Learn</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Key Pillars Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-right">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs card-lift">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-3">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1.5">Browser Sandboxes</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Write HTML5, modern CSS, JavaScript, and run Python algorithms right in your browser with zero local software setup.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1.5">Realistic Cyber Labs</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Inspect suspicious phishing headers, audit password entropy, test SQL injections, and deploy defensive countermeasures in guided simulations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1.5">1-on-1 Mentorship</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Connect with volunteer Ghanaian tech leaders and senior software engineers for free 1-on-1 video guidance, code reviews, and career coaching.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1.5">Verified Diplomas</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Graduate with digital certificates carrying unique cryptographic serial numbers and QR codes verified on our public academic registry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              How DIGIHub Works
            </h2>
            <p className="text-sm text-neutral-600 mt-2 font-normal">
              Four structured steps to go from introductory concepts to certified technical proficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative reveal">
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 relative card-lift">
              <span className="w-8 h-8 rounded-full bg-[#0056D2] text-white font-bold text-sm flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="font-bold text-base text-neutral-900 mb-2">Create Free Account</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Register in 30 seconds with your email or social profile. No tuition fees, subscriptions, or credit cards are ever requested.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 relative">
              <span className="w-8 h-8 rounded-full bg-[#0056D2] text-white font-bold text-sm flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="font-bold text-base text-neutral-900 mb-2">Select Your Track</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Choose from 12 specialized curricula in Web Engineering, Cybersecurity, Data Analytics, Python Automation, or Cloud DevOps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 relative">
              <span className="w-8 h-8 rounded-full bg-[#0056D2] text-white font-bold text-sm flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="font-bold text-base text-neutral-900 mb-2">Practice in Browser Labs</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Write real code, solve interactive challenges, and test live security defenses directly in your browser with instant automated evaluation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/90 relative">
              <span className="w-8 h-8 rounded-full bg-[#0056D2] text-white font-bold text-sm flex items-center justify-center mb-4">
                4
              </span>
              <h3 className="font-bold text-base text-neutral-900 mb-2">Earn Verified Diplomas</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Graduate with tamper-proof certificates featuring official QR verification for your CV, job applications, and LinkedIn profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE BROWSER WORKSPACES SHOWCASE */}
      <section id="labs-section" className="py-16 sm:py-20 bg-neutral-50 border-t border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Interactive Browser Workspaces
            </h2>
            <p className="text-sm text-neutral-600 mt-2 font-normal">
              Zero installation required. Launch fully functional development environments, security testbeds, and terminals with a single click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between card-lift">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center mb-3">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1.5">Web Code Sandbox</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Real-time HTML5, CSS3, and JavaScript editor with instant live DOM preview, syntax validation, and modular challenge tests.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 mt-4 text-[11px] font-semibold text-[#0056D2] flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Unlocked with Free Account</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1.5">Cyber Incident Simulator</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Analyze real email headers, detect deceptive social engineering attacks, test password crack resistance, and apply sanitization defenses.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 mt-4 text-[11px] font-semibold text-red-600 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Unlocked with Free Account</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1.5">Python Terminal Shell</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  In-browser Python environment supporting list comprehensions, data transformation, string parsing, and automated scripts without local Python install.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 mt-4 text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Unlocked with Free Account</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-neutral-900 text-sm mb-1.5">Digital Office Simulator</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Interactive spreadsheet formula evaluator, cloud access permission audits, and workplace digital productivity challenges.
                </p>
              </div>
              <div className="pt-4 border-t border-neutral-100 mt-4 text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Unlocked with Free Account</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMPREHENSIVE FAQ SECTION */}
      <section id="faq-section" className="py-16 sm:py-20 bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-600 mt-2 font-normal">
              Practical answers to help you start your learning journey on DIGIHub.
            </p>
          </div>

          <div className="space-y-3 reveal">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-neutral-200 bg-white overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-neutral-900 hover:text-[#0056D2] transition"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 shrink-0 transition duration-200 ${
                        isOpen ? "rotate-180 text-[#0056D2]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                      <p className="pt-3">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION BANNER */}
      <section className="relative text-white py-16 sm:py-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/digihub-hero-cover.jpg"
            alt="Young Ghanaian youth learning technology"
            fill
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00224d]/95 via-[#003882]/90 to-[#0056D2]/95" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-5 relative z-10 reveal">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Launch your technical journey on DIGIHub today
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed font-normal">
            Enroll in hands-on courses, practice in live browser sandboxes, and graduate with verified diplomas. 100% tuition-free for all Ghanaian youth.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenExplore()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm shadow-lg transition active:scale-98 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Courses</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth("signup")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/30 transition"
            >
              Sign In to Access
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white font-medium text-xs transition"
            >
              ← DigiConnect NGO Home
            </Link>
          </div>
        </div>
      </section>
        </>
      )}

      {/* 10. DEDICATED DIGIHUB LMS FOOTER */}
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
                  <span className="text-base font-bold text-white tracking-tight">
                    DigiConnect DIGIHub
                  </span>
                  <span className="block text-[11px] text-neutral-400 font-normal">
                    Virtual Technical Campus
                  </span>
                </div>
              </div>

              <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                DigiConnect Ghana is a registered non-profit educational NGO dedicated to bridging the digital divide for youth through free, high-caliber technical education, live interactive browser sandboxes, and verified credentials.
              </p>

              <div className="text-[11px] text-neutral-500 space-y-1">
                <div>📍 Accra, Ghana • Registered Educational NGO</div>
                <div className="text-amber-400 font-medium">Tech for Youth. Tech for Good.</div>
              </div>
            </div>

            {/* Column 2: Academy Tracks */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Academy Tracks
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenExplore("cybersecurity")}
                    className="hover:text-white transition text-left"
                  >
                    Cybersecurity Academy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenExplore("coding")}
                    className="hover:text-white transition text-left"
                  >
                    Web &amp; Software Lab
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenExplore("data-ai")}
                    className="hover:text-white transition text-left"
                  >
                    Data Analytics &amp; AI
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenExplore("cloud")}
                    className="hover:text-white transition text-left"
                  >
                    Cloud &amp; DevOps Faculty
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenExplore("python")}
                    className="hover:text-white transition text-left"
                  >
                    Python Automation
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Student Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                Interactive Labs
              </h4>
              <ul className="space-y-2">
                <li>
                  <button type="button" onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    Web Code Sandbox
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    Cyber Incident Simulator
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    Python Terminal Shell
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    Digital Office Simulator
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onOpenAuth("signup")} className="hover:text-white transition text-left">
                    1-on-1 Mentorship Booking
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: NGO Links */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
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
