"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  LogOut,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  Target,
  Laptop,
  Shield,
  Code2,
  Terminal,
  Play,
  CheckCircle2,
  Search,
  ExternalLink,
} from "lucide-react";
import {
  LMSUser,
  Course,
  LearnerProgress,
  CertificateRecord,
  getCourseProgress,
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
  const [activeTab, setActiveTab] = useState<"in-progress" | "completed" | "diplomas">("in-progress");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // First name extraction
  const firstName = currentUser.name.split(" ")[0] || "Learner";

  // Time-of-day greeting
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
    : { completed: 0, total: 4, percentage: 25, isCompleted: false };

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
      c.category.toLowerCase().includes(query);
    return !cp.isCompleted && matchesSearch;
  });

  const completedCourses = enrolledCourses.filter((c) => {
    const cp = getCourseProgress(c.id, progress.completedLessonIds);
    const matchesSearch =
      query === "" ||
      c.title.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query);
    return cp.isCompleted && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 font-sans selection:bg-[#0056D2] selection:text-white max-w-full overflow-x-hidden">
      {/* 1. SIMPLE, MINIMALIST HEADER (Guaranteed to fit comfortably on all mobile screens) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-2xs w-full">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2">
          {/* Left: Brand Logo & Title */}
          <Link
            href="/digihub"
            className="flex items-center gap-2 sm:gap-2.5 shrink-0 group focus:outline-none"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-white shadow-2xs border border-blue-100 flex items-center justify-center p-0.5 shrink-0">
              <Image
                src="/logo.png"
                alt="DigiConnect Ghana"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-neutral-900 leading-none">
                  DigiConnect
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-[#0056D2] text-white tracking-wide">
                  DIGIHub
                </span>
              </div>
              <span className="text-[10px] font-bold text-neutral-500 tracking-wider uppercase hidden sm:block">
                Learner Dashboard
              </span>
            </div>
          </Link>

          {/* Right: Minimalist Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Explore Catalog Link */}
            <button
              type="button"
              onClick={onViewPublicLanding}
              className="text-xs font-bold text-neutral-600 hover:text-[#0056D2] px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 transition flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Browse</span>
              <span>Catalog</span>
            </button>

            {/* User Profile Avatar with Clean Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0056D2] text-white font-black text-xs sm:text-sm flex items-center justify-center border-2 border-white shadow-2xs hover:ring-2 hover:ring-[#0056D2]/30 transition"
                aria-label="User profile menu"
              >
                {firstName.charAt(0).toUpperCase()}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <div className="font-extrabold text-sm text-neutral-900 truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-xs text-neutral-500 truncate">{currentUser.email}</div>
                    <div className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#0056D2]">
                      100% Tuition-Free Learner
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenCertificateModal();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl transition text-left"
                    >
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>My Diplomas ({certificates.length})</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onViewPublicLanding();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl transition text-left"
                    >
                      <Sparkles className="w-4 h-4 text-[#0056D2]" />
                      <span>Browse All 12 Curricula</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onRetakeOnboarding();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 rounded-xl transition text-left"
                    >
                      <Target className="w-4 h-4 text-neutral-500" />
                      <span>Career Path Survey</span>
                    </button>
                  </div>

                  <div className="pt-1.5 border-t border-neutral-100">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onSignOut();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition text-left"
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
      </header>

      {/* 2. MAIN CONTENT (Minimalist, uncluttered, effortlessly legible) */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 w-full">
        {/* Welcome Greeting & Active Course Hero Card */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 p-4 sm:p-7 shadow-xs space-y-5">
          {/* Greeting Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-4">
            <div>
              <span className="text-xs font-bold text-[#0056D2] uppercase tracking-wider block">
                {timeGreeting}, {firstName} 👋
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-neutral-900 tracking-tight mt-0.5 break-words">
                {primaryCourse?.title || "Web Engineering & Coding Foundations"}
              </h1>
            </div>
            <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-700 shrink-0">
              {primaryCourse?.organization || "DigiConnect Academy"}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-600">Track Progress</span>
              <span className="font-extrabold text-[#0056D2]">{primaryProgress.percentage}% complete</span>
            </div>
            <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
              <div
                className="h-full bg-[#0056D2] rounded-full transition-all duration-500"
                style={{ width: `${Math.max(primaryProgress.percentage, 15)}%` }}
              />
            </div>
          </div>

          {/* Next Lesson Action Banner */}
          {nextLesson && (
            <div className="p-4 sm:p-5 rounded-xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0056D2] uppercase tracking-wide">
                  <Play className="w-3.5 h-3.5 fill-[#0056D2]" />
                  <span>Up Next</span>
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-neutral-900 leading-snug break-words">
                  {nextLesson.title}
                </h2>
                <p className="text-xs text-neutral-600">
                  In-Browser Interactive Lab • {nextLesson.durationMinutes} min
                </p>
              </div>

              <Link
                href={`/digihub/lesson/${nextLesson.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-extrabold text-xs sm:text-sm shadow-sm transition active:scale-98 shrink-0 text-center"
              >
                <span>Resume Learning</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </section>

        {/* Quick Launch Sandboxes Strip */}
        <section className="space-y-2.5">
          <span className="text-xs font-black text-neutral-500 uppercase tracking-wider block">
            Interactive Learning Workspaces
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            <Link
              href="/digihub/lesson/coding-1"
              className="p-3 sm:p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:shadow-xs transition text-left flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-900 truncate">Web Sandbox</div>
                <div className="text-[10px] text-neutral-500">HTML/CSS/JS</div>
              </div>
            </Link>

            <Link
              href="/digihub/lesson/cyber-1"
              className="p-3 sm:p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:shadow-xs transition text-left flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-900 truncate">Cyber Threat Lab</div>
                <div className="text-[10px] text-neutral-500">Defense &amp; IAM</div>
              </div>
            </Link>

            <Link
              href="/digihub/lesson/py-1"
              className="p-3 sm:p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:shadow-xs transition text-left flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-900 truncate">Python Runner</div>
                <div className="text-[10px] text-neutral-500">Code Shell</div>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => onOpenCertificateModal()}
              className="p-3 sm:p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:shadow-xs transition text-left flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-900 truncate">My Diplomas</div>
                <div className="text-[10px] text-neutral-500">{certificates.length} Verified</div>
              </div>
            </button>
          </div>
        </section>

        {/* Minimalist Segmented Tabs: In Progress, Completed, Diplomas */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab("in-progress")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
                activeTab === "in-progress"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              In Progress ({inProgressCourses.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("completed")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
                activeTab === "completed"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Completed ({completedCourses.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("diplomas")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
                activeTab === "diplomas"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              Diplomas ({certificates.length})
            </button>
          </div>

          {/* TAB 1: In Progress Courses List */}
          {activeTab === "in-progress" && (
            <div className="space-y-3">
              {inProgressCourses.map((course) => {
                const cp = getCourseProgress(course.id, progress.completedLessonIds);
                const currentLesson =
                  course.lessons.find((l) => !progress.completedLessonIds.includes(l.id)) ||
                  course.lessons[0];

                return (
                  <div
                    key={course.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-300 shadow-2xs transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                          {course.organization}
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-neutral-900 leading-snug break-words">
                          {course.title}
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-[#0056D2]">
                        {cp.percentage}% complete
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className="h-full bg-[#0056D2] rounded-full"
                        style={{ width: `${Math.max(cp.percentage, 10)}%` }}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <div className="text-xs text-neutral-600">
                        Next: <span className="font-semibold text-neutral-900">{currentLesson?.title || "Lesson 1"}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenCourseModal(course)}
                          className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-xs"
                        >
                          Syllabus
                        </button>
                        {currentLesson && (
                          <Link
                            href={`/digihub/lesson/${currentLesson.id}`}
                            className="px-4 py-1.5 rounded-lg bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs"
                          >
                            Continue
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add Another Course Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-dashed border-neutral-300 text-center space-y-2">
                <p className="text-xs text-neutral-600">
                  Ready to learn more? Expand your skillset with another 100% tuition-free track.
                </p>
                <button
                  type="button"
                  onClick={onViewPublicLanding}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] text-[#0056D2] font-bold text-xs shadow-2xs transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Browse All 12 Curricula</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Completed Courses */}
          {activeTab === "completed" && (
            <div className="space-y-3">
              {completedCourses.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500 space-y-2">
                  <Award className="w-8 h-8 text-neutral-300 mx-auto" />
                  <p className="font-bold text-neutral-700">No completed courses yet</p>
                  <p>Complete all modules in an academy track to earn your director-signed diploma.</p>
                </div>
              ) : (
                completedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed Track</span>
                      </div>
                      <h4 className="text-sm font-bold text-neutral-900 mt-0.5">{c.title}</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenCertificateModal()}
                      className="px-4 py-2 rounded-xl bg-[#0056D2] text-white text-xs font-bold hover:bg-[#00419e] transition shrink-0"
                    >
                      View Diploma
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Diplomas & Badges */}
          {activeTab === "diplomas" && (
            <div className="space-y-3">
              {certificates.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500 space-y-2">
                  <Award className="w-8 h-8 text-neutral-300 mx-auto" />
                  <p className="font-bold text-neutral-700">No diplomas issued yet</p>
                  <p>Finish any course to unlock your authentic credential with QR validation and shareable LinkedIn link.</p>
                </div>
              ) : (
                certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-2xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
                        <Award className="w-4 h-4" />
                        <span>{cert.courseTitle}</span>
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">
                        Serial: <span className="font-mono font-bold text-neutral-700">{cert.verificationCode}</span> • Issued: {cert.completionDate}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenCertificateModal(cert)}
                      className="px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-bold transition shrink-0"
                    >
                      View &amp; Print
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>

      {/* 3. MINIMALIST FOOTER */}
      <footer className="mt-12 py-8 bg-white border-t border-neutral-200 text-center text-xs text-neutral-500 space-y-2 px-4">
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold text-neutral-700">DigiConnect Ghana DIGIHub</span>
          <span>•</span>
          <span>Tech for Youth. Tech for Good.</span>
        </div>
        <p className="text-[11px] text-neutral-400">
          100% Tuition-Free Educational NGO • Accra, Ghana
        </p>
        <div>
          <Link href="/" className="text-[#0056D2] hover:underline font-bold text-[11px]">
            ← Return to DigiConnect Ghana Main Website
          </Link>
        </div>
      </footer>
    </div>
  );
}
