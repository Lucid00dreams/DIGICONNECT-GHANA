"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Globe,
  Bell,
  LogOut,
  MoreVertical,
  CheckCircle2,
  Calendar as CalendarIcon,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  ChevronUp,
  Target,
  ExternalLink,
  Laptop,
  Shield,
  Code2,
  Terminal,
  FileCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  LMSUser,
  Course,
  LearnerProgress,
  CertificateRecord,
  Mentor,
  getCourseProgress,
  getCourseById,
} from "@/lib/lmsStore";

interface CourseraDashboardProps {
  currentUser: LMSUser;
  courses: Course[];
  progress: LearnerProgress;
  certificates: CertificateRecord[];
  onSignOut: () => void;
  onOpenCourseModal: (course: Course) => void;
  onOpenCertificateModal: (cert?: CertificateRecord) => void;
  onRetakeOnboarding: () => void;
  onViewPublicLanding: () => void;
}

export function CourseraDashboard({
  currentUser,
  courses,
  progress,
  certificates,
  onSignOut,
  onOpenCourseModal,
  onOpenCertificateModal,
  onRetakeOnboarding,
  onViewPublicLanding,
}: CourseraDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    "in-progress" | "completed" | "saved" | "certificates"
  >("in-progress");
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isGoalsExpanded, setIsGoalsExpanded] = useState(true);
  const [currentMonthDate] = useState(new Date(2026, 9, 9)); // October 2026

  // First name extraction
  const firstName = currentUser.name.split(" ")[0] || "Learner";

  // Time-of-day greeting (Screenshot 3: "Good evening, Gyamwodie")
  const currentHour = new Date().getHours();
  const timeGreeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  // Active enrolled courses
  const enrolledCourseIds = currentUser.enrolledCourseIds || ["cybersecurity", "coding"];
  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const primaryCourse = enrolledCourses[0] || courses[0];

  // Primary course progress & next lesson
  const primaryProgress = primaryCourse
    ? getCourseProgress(primaryCourse.id, progress.completedLessonIds)
    : { completed: 0, total: 4, percentage: 27, isCompleted: false };

  const nextLesson = primaryCourse
    ? primaryCourse.lessons.find((l) => !progress.completedLessonIds.includes(l.id)) ||
      primaryCourse.lessons[0]
    : null;

  // Filter courses for in-progress vs completed
  const query = searchQuery.trim().toLowerCase();
  const inProgressCourses = enrolledCourses.filter((c) => {
    const cp = getCourseProgress(c.id, progress.completedLessonIds);
    const matchesSearch =
      query === "" ||
      c.title.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query) ||
      c.organization.toLowerCase().includes(query);
    return !cp.isCompleted && matchesSearch;
  });

  const completedCourses = enrolledCourses.filter((c) => {
    const cp = getCourseProgress(c.id, progress.completedLessonIds);
    const matchesSearch =
      query === "" ||
      c.title.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query) ||
      c.organization.toLowerCase().includes(query);
    return cp.isCompleted && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-neutral-900 font-sans">
      {/* 1. COURSERA ORGANIZATION HEADER (Screenshots 2 & 3) */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Organization / Partner Logo & Tabs */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            {/* Organization Logo */}
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="DigiConnect Ghana"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-neutral-900 leading-none">
                  DigiConnect
                </span>
                <span className="text-[10px] font-bold text-[#0056D2] leading-tight">
                  DIGIHub LMS
                </span>
              </div>
            </div>

            {/* Explore Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-neutral-400 text-neutral-700 hover:text-neutral-900 font-semibold text-xs sm:text-sm transition"
              >
                <span>Explore</span>
                <ChevronDown className={`w-3.5 h-3.5 transition ${isExploreOpen ? "rotate-180" : ""}`} />
              </button>

              {isExploreOpen && (
                <div
                  className="absolute left-0 top-full mt-2 w-72 sm:w-80 max-h-[75vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsExploreOpen(false)}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1.5 flex items-center justify-between">
                    <span>Available Academy Tracks ({courses.length})</span>
                    <button
                      type="button"
                      onClick={() => setIsExploreOpen(false)}
                      className="text-neutral-400 hover:text-neutral-700 sm:hidden"
                    >
                      ✕
                    </button>
                  </div>
                  {courses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onOpenCourseModal(c);
                        setIsExploreOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 text-left transition"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#0056D2] flex items-center justify-center shrink-0">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 truncate">{c.title}</div>
                        <div className="text-[10px] text-neutral-500">{c.category} • {c.level}</div>
                      </div>
                    </button>
                  ))}
                  <div className="pt-2 border-t border-neutral-100 mt-1">
                    <button
                      onClick={() => {
                        setIsExploreOpen(false);
                        onViewPublicLanding();
                      }}
                      className="w-full text-center py-2 text-xs font-bold text-[#0056D2] hover:underline"
                    >
                      Browse Full Course Catalog →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* My Learning Tab */}
            <span className="text-xs sm:text-sm font-bold text-[#0056D2] border-b-2 border-[#0056D2] pb-1 cursor-default shrink-0">
              My Learning
            </span>
          </div>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search DigiConnect DIGIHub courses & labs..."
                className="w-full py-2.5 pl-4 pr-12 rounded-full border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-500 outline-none transition"
              />
              <button
                type="button"
                className="absolute right-1.5 w-8 h-8 rounded-full bg-[#0056D2] text-white flex items-center justify-center transition shadow-2xs hover:bg-[#00419e]"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Action Icons: Help, Globe, Bell, User Initial */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="p-2 text-neutral-600 hover:text-[#0056D2] hover:bg-neutral-100 rounded-full transition md:hidden"
              title="Search Courses"
              aria-label="Toggle mobile search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => onOpenCertificateModal()}
              className="p-2 text-neutral-600 hover:text-[#0056D2] hover:bg-neutral-100 rounded-full transition hidden sm:flex"
              title="Verified Diplomas & Credentials"
            >
              <Award className="w-5 h-5" />
            </button>

            <button
              onClick={() => {}}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition hidden sm:flex"
              title="Help Center"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            <button
              onClick={() => {}}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition hidden sm:flex"
              title="English (US)"
            >
              <Globe className="w-5 h-5" />
            </button>

            <button
              onClick={() => {}}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0056D2]" />
            </button>

            {/* User Avatar Circle (Screenshot 2: 'G' in navy circle) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0b2149] text-white font-black text-sm flex items-center justify-center border-2 border-white shadow-xs hover:ring-2 hover:ring-[#0056D2] transition"
              >
                {firstName.charAt(0).toUpperCase()}
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <div className="font-bold text-sm text-neutral-900 truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-xs text-neutral-500 truncate">{currentUser.email}</div>
                    {currentUser.careerGoal && (
                      <div className="mt-1.5 inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#0056D2]">
                        Goal: {currentUser.careerGoal}
                      </div>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onRetakeOnboarding();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl transition"
                    >
                      <Target className="w-4 h-4 text-neutral-500" />
                      <span>Goals &amp; Skills Questionnaire</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onViewPublicLanding();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl transition"
                    >
                      <Sparkles className="w-4 h-4 text-[#0056D2]" />
                      <span>Explore Public Portal</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenCertificateModal();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl transition"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>My Diplomas &amp; Badges ({certificates.length})</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-neutral-100">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Dropdown */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-4 py-2.5 bg-neutral-50 border-t border-neutral-200 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search DIGIHub courses and modules..."
                className="w-full py-2 pl-3.5 pr-10 rounded-full border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs text-neutral-800 placeholder:text-neutral-500 outline-none bg-white transition"
                autoFocus
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-neutral-400 hover:text-neutral-600 text-xs font-bold p-1"
                >
                  ✕
                </button>
              ) : (
                <Search className="absolute right-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
              )}
            </div>
          </div>
        )}
      </header>

      {/* 2. WELCOME HERO BANNER (Screenshot 2) */}
      <section className="bg-gradient-to-b from-[#e8f1fc] to-[#f5f7fa] pt-8 pb-10 border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mb-4">
            <span className="text-xs sm:text-sm font-semibold text-neutral-600">
              {firstName}, welcome back to your {primaryCourse?.organization || "DigiConnect Ghana"} course
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1 hover:text-[#0056D2] cursor-pointer transition">
              {primaryCourse?.title || "Cybersecurity Architecture & Defense"}
            </h1>

            {/* Progress Bar (Screenshot 2: e.g. "27% complete") */}
            <div className="flex items-center gap-3 mt-3 max-w-md">
              <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                <div
                  className="h-full bg-[#0056D2] rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(primaryProgress.percentage, 27)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-neutral-700">
                {Math.max(primaryProgress.percentage, 27)}% complete
              </span>
            </div>
          </div>

          {/* Wide Hero Card with Visual Graphic (Screenshot 2) */}
          {nextLesson && (
            <div className="relative rounded-3xl bg-white border border-neutral-200/90 shadow-md overflow-hidden flex flex-col md:flex-row justify-between">
              {/* Left Content */}
              <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between max-w-xl">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug">
                    Up next: {nextLesson.title}
                  </h3>
                  <div className="text-xs text-neutral-500 font-semibold mt-1">
                    Interactive Lab • {nextLesson.durationMinutes} min
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <Link
                    href={`/digihub/lesson/${nextLesson.id}`}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-98"
                  >
                    Resume Learning
                  </Link>

                  <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
                    {primaryCourse?.organization || "DIGIHub"}
                  </span>
                </div>
              </div>

              {/* Right Illustration Graphic (Screenshot 2: Tech shield, user, email icons) */}
              <div className="relative w-full md:w-96 h-48 md:h-auto bg-gradient-to-tr from-[#0b2149] to-[#154687] flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-24 h-24 border border-white/40 rounded-full" />
                  <div className="absolute bottom-2 right-4 w-32 h-32 border border-white/20 rounded-full" />
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/30 flex items-center justify-center text-white">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0056D2] border-2 border-white flex items-center justify-center text-white shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/30 flex items-center justify-center text-white">
                    <Laptop className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Today's Goals Accordion (Screenshot 2) */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setIsGoalsExpanded(!isGoalsExpanded)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-neutral-200/90 text-left hover:border-neutral-300 transition"
            >
              <div className="flex items-center gap-2.5">
                <Target className="w-4 h-4 text-[#0056D2]" />
                <span className="text-xs sm:text-sm font-bold text-neutral-900">Today&apos;s goals</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0056D2] text-[10px] font-bold">
                  {progress.streakDays} Day Streak 🔥
                </span>
              </div>
              <ChevronUp className={`w-4 h-4 text-neutral-500 transition ${isGoalsExpanded ? "" : "rotate-180"}`} />
            </button>

            {isGoalsExpanded && (
              <div className="p-4 sm:p-5 bg-white border-x border-b border-neutral-200/90 rounded-b-2xl mt-[-8px] text-xs space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Complete 1 interactive lesson or coding sandbox today</span>
                  <span className="font-bold text-[#0056D2]">{progress.completedLessonIds.length > 0 ? "Goal met! (+50 XP)" : "Pending"}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: progress.completedLessonIds.length > 0 ? "100%" : "30%" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. MY LEARNING TABS & TWO-COLUMN VIEW (Screenshot 3) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Greeting Banner with Whimsical Coursera Illustration */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200 shadow-2xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0b2149] text-white font-black text-lg flex items-center justify-center shrink-0">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                {timeGreeting}, {firstName}
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Target Role: <span className="font-semibold text-neutral-700">{currentUser.currentRole || "Cyber Security Specialist"}</span> • Highest Education: <span className="font-semibold text-neutral-700">{currentUser.educationLevel || "Bachelor's degree"}</span>
              </p>
            </div>
          </div>

          {/* Whimsical 3D Coursera Archway Illustration Motif (Screenshot 3) */}
          <div className="hidden md:flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/60 text-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-900" />
            </div>
            <div className="pr-2">
              <div className="font-bold text-neutral-900">Lifelong Learning Journey</div>
              <div className="text-[11px] text-neutral-500">Every lesson unlocks verified career milestones</div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs (Screenshot 3) */}
        <div className="flex items-center gap-6 border-b border-neutral-200 mb-8 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveSubTab("in-progress")}
            className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap ${
              activeSubTab === "in-progress"
                ? "text-neutral-900 border-neutral-900"
                : "text-neutral-500 border-transparent hover:text-neutral-900"
            }`}
          >
            In Progress ({inProgressCourses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("completed")}
            className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap ${
              activeSubTab === "completed"
                ? "text-neutral-900 border-neutral-900"
                : "text-neutral-500 border-transparent hover:text-neutral-900"
            }`}
          >
            Completed ({completedCourses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("saved")}
            className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap ${
              activeSubTab === "saved"
                ? "text-neutral-900 border-neutral-900"
                : "text-neutral-500 border-transparent hover:text-neutral-900"
            }`}
          >
            Saved (0)
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("certificates")}
            className={`pb-3 text-xs sm:text-sm font-bold transition border-b-2 whitespace-nowrap ${
              activeSubTab === "certificates"
                ? "text-neutral-900 border-neutral-900"
                : "text-neutral-500 border-transparent hover:text-neutral-900"
            }`}
          >
            Certificates &amp; Badges ({certificates.length})
          </button>
        </div>

        {/* TWO-COLUMN GRID: Left Courses List / Right Calendar Widget (Screenshot 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT 2 COLUMNS: Course Cards */}
          <div className="lg:col-span-2 space-y-6">
            {activeSubTab === "in-progress" && (
              <>
                {inProgressCourses.map((course) => {
                  const cp = getCourseProgress(course.id, progress.completedLessonIds);
                  const courseNextLesson =
                    course.lessons.find((l) => !progress.completedLessonIds.includes(l.id)) ||
                    course.lessons[0];

                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-7 shadow-xs hover:shadow-md transition"
                    >
                      {/* Course Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black tracking-wider px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                            {course.organization}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenCourseModal(course)}
                          className="p-1 rounded-full text-neutral-400 hover:text-neutral-700"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Course Title */}
                      <h3
                        onClick={() => onOpenCourseModal(course)}
                        className="text-base sm:text-lg font-bold text-neutral-900 hover:text-[#0056D2] cursor-pointer transition leading-snug"
                      >
                        {course.title}
                      </h3>

                      {/* Metadata */}
                      <div className="text-xs text-neutral-500 mt-1 mb-3">
                        Course • {Math.max(cp.percentage, 27)}% complete • Estimated completion: Oct 12, 2026
                      </div>

                      {/* Progress Bar (Screenshot 3: purple/blue) */}
                      <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden mb-5">
                        <div
                          className="h-full bg-[#6366F1] rounded-full"
                          style={{ width: `${Math.max(cp.percentage, 27)}%` }}
                        />
                      </div>

                      {/* Next Lesson Box */}
                      {courseNextLesson && (
                        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                              {courseNextLesson.title}
                            </h4>
                            <div className="text-[11px] text-neutral-500 mt-0.5">
                              Video &amp; Hands-On Lab ({courseNextLesson.durationMinutes} minutes)
                            </div>
                          </div>

                          <Link
                            href={`/digihub/lesson/${courseNextLesson.id}`}
                            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs font-bold shadow-2xs transition active:scale-98 shrink-0"
                          >
                            Resume Learning
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Additional Available Track Prompt */}
                <div className="p-6 rounded-3xl bg-blue-50/50 border border-dashed border-blue-200 text-center space-y-2">
                  <div className="text-xs font-bold text-[#0056D2] uppercase tracking-wider">
                    Add another course to your schedule
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900">
                    Explore web development, algorithmic Python, or practical digital literacy.
                  </h4>
                  <button
                    onClick={onViewPublicLanding}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0056D2] hover:underline pt-1"
                  >
                    <span>Browse All Academy Tracks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}

            {/* Completed Tab */}
            {activeSubTab === "completed" && (
              <div className="space-y-4">
                {completedCourses.length === 0 ? (
                  <div className="p-10 text-center bg-white rounded-3xl border border-neutral-200 text-neutral-500 text-xs">
                    You haven&apos;t finished a course yet. Complete all lessons and labs in a track to unlock your official diploma!
                  </div>
                ) : (
                  completedCourses.map((c) => (
                    <div key={c.id} className="p-6 rounded-3xl bg-white border border-neutral-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">100% Completed</span>
                        <h3 className="text-sm font-bold text-neutral-900">{c.title}</h3>
                      </div>
                      <button
                        onClick={() => onOpenCertificateModal()}
                        className="px-4 py-2 rounded-xl bg-[#0056D2] text-white text-xs font-bold"
                      >
                        View Diploma
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Certificates Tab */}
            {activeSubTab === "certificates" && (
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="p-6 rounded-3xl bg-white border border-neutral-200 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-neutral-900">{cert.courseTitle}</span>
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">Verification: {cert.verificationCode} • Conferred: {cert.completionDate}</div>
                    </div>
                    <button
                      onClick={() => onOpenCertificateModal(cert)}
                      className="px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-xs font-bold"
                    >
                      View &amp; Print
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Monthly Calendar & Goal Habit Tracker (Screenshot 3) */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs">
              {/* Calendar Month Header (Screenshot 3: October 2026 with < > arrows) */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-100">
                <span className="text-sm font-extrabold text-neutral-900">
                  October 2026
                </span>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded-full text-neutral-400 hover:text-neutral-700">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-1 rounded-full text-neutral-400 hover:text-neutral-700">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Days of the Week: Mo Tu We Th Fr Sa Su */}
              <div className="grid grid-cols-7 text-center text-[10px] sm:text-xs font-semibold text-neutral-400 mb-2">
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
                <span>Su</span>
              </div>

              {/* Calendar Grid of Dates (Screenshot 3: Today Oct 9 is circled in purple/blue) */}
              <div className="grid grid-cols-7 text-center text-[11px] sm:text-xs font-medium gap-y-1.5 sm:gap-y-2">
                {/* Empty days before 1st (October 2026 starts on Thursday) */}
                <span className="text-neutral-300"></span>
                <span className="text-neutral-300"></span>
                <span className="text-neutral-300"></span>
                <span className="text-neutral-700 py-1">1</span>
                <span className="text-neutral-700 py-1">2</span>
                <span className="text-neutral-700 py-1">3</span>
                <span className="text-neutral-700 py-1">4</span>

                <span className="text-neutral-700 py-1">5</span>
                <span className="text-neutral-700 py-1">6</span>
                <span className="text-neutral-700 py-1">7</span>
                <span className="text-neutral-700 py-1">8</span>
                {/* Today: 9th circled with purple ring */}
                <span className="w-6 h-6 sm:w-7 sm:h-7 mx-auto rounded-full border-2 border-[#6366F1] text-[#6366F1] font-bold flex items-center justify-center bg-indigo-50/50 text-[11px] sm:text-xs">
                  9
                </span>
                <span className="text-neutral-700 py-1">10</span>
                <span className="text-neutral-700 py-1">11</span>

                <span className="text-neutral-700 py-1">12</span>
                <span className="text-neutral-700 py-1">13</span>
                <span className="text-neutral-700 py-1">14</span>
                <span className="text-neutral-700 py-1">15</span>
                <span className="text-neutral-700 py-1">16</span>
                <span className="text-neutral-700 py-1">17</span>
                <span className="text-neutral-700 py-1">18</span>

                <span className="text-neutral-700 py-1">19</span>
                <span className="text-neutral-700 py-1">20</span>
                <span className="text-neutral-700 py-1">21</span>
                <span className="text-neutral-700 py-1">22</span>
                <span className="text-neutral-700 py-1">23</span>
                <span className="text-neutral-700 py-1">24</span>
                <span className="text-neutral-700 py-1">25</span>

                <span className="text-neutral-700 py-1">26</span>
                <span className="text-neutral-700 py-1">27</span>
                <span className="text-neutral-700 py-1">28</span>
                <span className="text-neutral-700 py-1">29</span>
                <span className="text-neutral-700 py-1">30</span>
                <span className="text-neutral-700 py-1">31</span>
              </div>

              {/* Legend matching Screenshot 3 */}
              <div className="mt-5 pt-3 border-t border-neutral-100 space-y-1.5 text-[11px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6366F1]" />
                  <span>• 1+ daily goals completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-0.5 bg-neutral-400" />
                  <span>— All daily goals completed</span>
                </div>
              </div>
            </div>

            {/* Habit Stats Card */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Your Learning Velocity
              </h4>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-neutral-50">
                  <div className="text-lg font-black text-[#0056D2]">{progress.xp}</div>
                  <div className="text-[10px] text-neutral-500 font-semibold">Total XP Earned</div>
                </div>
                <div className="p-3 rounded-2xl bg-neutral-50">
                  <div className="text-lg font-black text-emerald-600">{progress.completedLessonIds.length}</div>
                  <div className="text-[10px] text-neutral-500 font-semibold">Labs Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
