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
  Layers,
  Users,
  MoreHorizontal,
  X,
  Clock,
  GraduationCap,
  Star,
  Check,
  Calendar,
  Compass,
  FileCheck,
  User,
  Info,
  HelpCircle,
  Edit2,
  RotateCcw,
  Video,
  CheckCircle,
  SlidersHorizontal,
} from "lucide-react";
import {
  LMSUser,
  Course,
  LearnerProgress,
  CertificateRecord,
  Mentor,
  MentorshipSession,
  getCourseProgress,
} from "@/lib/lmsStore";

interface CourseraDashboardProps {
  currentUser: LMSUser;
  courses: Course[];
  progress: LearnerProgress;
  certificates: CertificateRecord[];
  mentors?: Mentor[];
  sessions?: MentorshipSession[];
  onSignOut: () => void;
  onOpenCourseModal: (course: Course) => void;
  onOpenCertificateModal: (cert?: CertificateRecord) => void;
  onOpenMentorBooking?: (mentor?: Mentor) => void;
  onEnrollCourse?: (courseId: string) => void;
  onRetakeOnboarding: () => void;
  onUpdateStudentName?: (name: string) => void;
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

type DashboardSection = "learning" | "catalog" | "labs" | "diplomas" | "mentorship";

export function CourseraDashboard({
  currentUser,
  courses,
  progress,
  certificates,
  mentors = [],
  sessions = [],
  onSignOut,
  onOpenCourseModal,
  onOpenCertificateModal,
  onOpenMentorBooking,
  onEnrollCourse,
  onRetakeOnboarding,
  onUpdateStudentName,
}: CourseraDashboardProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>("learning");
  const [learningTab, setLearningTab] = useState<"in-progress" | "completed">("in-progress");
  const [catalogFilter, setCatalogFilter] = useState<string>("all");
  const [catalogSearch, setCatalogSearch] = useState<string>("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isQuickDashboardOpen, setIsQuickDashboardOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(progress.studentName || currentUser.name);

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
  const inProgressCourses = enrolledCourses.filter((c) => {
    const cp = getCourseProgress(c.id, progress.completedLessonIds);
    return !cp.isCompleted;
  });

  const completedCourses = enrolledCourses.filter((c) => {
    const cp = getCourseProgress(c.id, progress.completedLessonIds);
    return cp.isCompleted;
  });

  // Filter courses for catalog
  const filteredCatalogCourses = courses.filter((c) => {
    const matchesFilter =
      catalogFilter === "all" ||
      (catalogFilter === "coding" && c.category === "Coding & Web") ||
      (catalogFilter === "cybersecurity" && c.category === "Cybersecurity") ||
      (catalogFilter === "data-ai" && c.category === "Data & AI") ||
      (catalogFilter === "cloud" && c.category === "Cloud & DevOps") ||
      (catalogFilter === "mobile" && c.category === "Mobile & Apps") ||
      (catalogFilter === "it" && c.category === "IT & Systems") ||
      (catalogFilter === "python" && (c.category === "Programming" || c.id === "python")) ||
      (catalogFilter === "literacy" && c.category === "Digital Literacy");

    const q = catalogSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.organization.toLowerCase().includes(q) ||
      c.skillsGained.some((s) => s.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  const handleSaveStudentName = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedName.trim() && onUpdateStudentName) {
      onUpdateStudentName(editedName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 font-digihub selection:bg-[#0056D2] selection:text-white max-w-full overflow-x-hidden pb-24 md:pb-8">
      {/* 1. TOP STUDENT HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-2xs w-full">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3">
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
                <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 leading-none">
                  DigiConnect
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#0056D2] text-white tracking-wide">
                  DIGIHub
                </span>
              </div>
              <span className="text-[10px] font-medium text-neutral-500 tracking-wider uppercase hidden sm:block">
                Learner Portal
              </span>
            </div>
          </Link>

          {/* Center (Desktop Navigation Tabs) */}
          <nav aria-label="Desktop Dashboard Navigation" className="hidden lg:flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveSection("learning")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                activeSection === "learning"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>My Learning</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("catalog")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                activeSection === "catalog"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explore Curricula</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("labs")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                activeSection === "labs"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Browser Labs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("diplomas")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                activeSection === "diplomas"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Diplomas ({certificates.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("mentorship")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                activeSection === "mentorship"
                  ? "bg-[#0056D2] text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Mentorship</span>
            </button>
          </nav>

          {/* Right: Quick Hub & Profile Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Quick Hub Drawer Button */}
            <button
              type="button"
              onClick={() => setIsQuickDashboardOpen(true)}
              className="px-2.5 py-1.5 rounded-xl border border-neutral-200 hover:border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition flex items-center gap-1.5"
              aria-label="Open Quick Dashboard Hub"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0056D2]" />
              <span className="hidden sm:inline">Quick Hub</span>
            </button>

            {/* User Profile Avatar with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0056D2] text-white font-bold text-xs sm:text-sm flex items-center justify-center border-2 border-white shadow-2xs hover:ring-2 hover:ring-[#0056D2]/30 transition"
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
                    <div className="text-xs font-bold text-neutral-900 truncate">
                      {progress.studentName || currentUser.name}
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate">{currentUser.email}</div>
                    <div className="mt-1 text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Free Scholar Account</span>
                    </div>
                  </div>

                  <div className="py-1 text-xs space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSection("catalog");
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 text-neutral-700 font-medium flex items-center gap-2"
                    >
                      <Layers className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Browse Curricula</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveSection("labs");
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 text-neutral-700 font-medium flex items-center gap-2"
                    >
                      <Terminal className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Interactive Browser Labs</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveSection("mentorship");
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 text-neutral-700 font-medium flex items-center gap-2"
                    >
                      <Users className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Book Faculty Mentor</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingName(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 text-neutral-700 font-medium flex items-center gap-2"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Update Certificate Name</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onRetakeOnboarding();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 text-neutral-700 font-medium flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Retake Onboarding</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-semibold text-xs flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. DEDICATED SECTION CONTENT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-8">
        {/* ─── SECTION 1: MY LEARNING ────────────────────────────────────── */}
        {activeSection === "learning" && (
          <div className="space-y-8">
            {/* Greeting & Active Course Hero */}
            <section className="p-5 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#0056D2] uppercase tracking-wider block">
                    {timeGreeting}, {firstName} 👋
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight mt-0.5 break-words">
                    {primaryCourse?.title || "Web Engineering & Coding Foundations"}
                  </h1>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0056D2] shrink-0 border border-blue-100">
                  {primaryCourse?.organization || "DigiConnect Academy"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-600">Curriculum Progress</span>
                  <span className="font-bold text-[#0056D2]">{primaryProgress.percentage}% complete</span>
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
                    <h2 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug break-words">
                      {nextLesson.title}
                    </h2>
                    <p className="text-xs text-neutral-600">
                      In-Browser Interactive Lab • {nextLesson.durationMinutes} min
                    </p>
                  </div>

                  <Link
                    href={`/digihub/lesson/${nextLesson.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs sm:text-sm shadow-sm transition active:scale-98 shrink-0 text-center"
                  >
                    <span>Resume Learning</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </section>

            {/* Quick Launch Interactive Workspaces Strip */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                  Interactive Browser Workspaces
                </span>
                <button
                  type="button"
                  onClick={() => setActiveSection("labs")}
                  className="text-xs font-semibold text-[#0056D2] hover:underline"
                >
                  View All Labs →
                </button>
              </div>

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
                    <div className="text-[10px] text-neutral-500">Live HTML/JS</div>
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
                    <div className="text-xs font-bold text-neutral-900 truncate">Cyber Incident Lab</div>
                    <div className="text-[10px] text-neutral-500">Defense &amp; Phishing</div>
                  </div>
                </Link>

                <Link
                  href="/digihub/lesson/py-1"
                  className="p-3 sm:p-3.5 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:shadow-xs transition text-left flex items-center gap-2.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-neutral-900 truncate">Python Shell</div>
                    <div className="text-[10px] text-neutral-500">Code Runner</div>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setActiveSection("diplomas")}
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

            {/* In Progress vs Completed Segmented Tabs */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
                <button
                  type="button"
                  onClick={() => setLearningTab("in-progress")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    learningTab === "in-progress"
                      ? "bg-[#0056D2] text-white shadow-2xs"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  Active Tracks ({inProgressCourses.length})
                </button>

                <button
                  type="button"
                  onClick={() => setLearningTab("completed")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                    learningTab === "completed"
                      ? "bg-[#0056D2] text-white shadow-2xs"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  Completed Tracks ({completedCourses.length})
                </button>
              </div>

              {/* In Progress List */}
              {learningTab === "in-progress" && (
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
                            <h3 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug break-words">
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
                              className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs"
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

                  {/* Clean Discover Tracks Card */}
                  <div className="p-5 rounded-2xl bg-white border border-dashed border-neutral-300 text-center space-y-2.5">
                    <p className="text-xs text-neutral-600 font-medium">
                      Want to study something new? Discover all 12 tuition-free technical tracks right inside DIGIHub.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveSection("catalog")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs transition"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Explore 12 Curricula</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Completed List */}
              {learningTab === "completed" && (
                <div className="space-y-3">
                  {completedCourses.length === 0 ? (
                    <div className="p-8 text-center bg-white rounded-2xl border border-neutral-200 text-xs text-neutral-500 space-y-2">
                      <Award className="w-8 h-8 text-neutral-300 mx-auto" />
                      <p className="font-bold text-neutral-700">No completed courses yet</p>
                      <p>Complete all modules in an academy track to earn your official diploma.</p>
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
                          onClick={() => setActiveSection("diplomas")}
                          className="px-4 py-2 rounded-xl bg-[#0056D2] text-white text-xs font-bold hover:bg-[#00419e] transition shrink-0"
                        >
                          View Diploma
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ─── SECTION 2: DEDICATED COURSE CATALOG ───────────────────────── */}
        {activeSection === "catalog" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  DIGIHub Curricula Catalog
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl font-normal">
                  12 structured career tracks. Instant enrollment with 100% tuition-free access.
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Search courses or skills..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition bg-white"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
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
                  onClick={() => setCatalogFilter(pill.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    catalogFilter === pill.id
                      ? "bg-[#0056D2] text-white shadow-2xs"
                      : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filteredCatalogCourses.map((course) => {
                const isEnrolled = enrolledCourseIds.includes(course.id);
                const cp = getCourseProgress(course.id, progress.completedLessonIds);

                return (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-neutral-200 bg-white hover:border-[#0056D2] hover:shadow-md transition flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Visual Banner */}
                    <div className="relative w-full h-32 overflow-hidden">
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
                        {isEnrolled ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold">
                            <Check className="w-2.5 h-2.5" />
                            Enrolled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-500/90 text-white text-[10px] font-bold">
                            Free Track
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                        <h3 className="font-bold text-xs leading-snug line-clamp-2 drop-shadow-sm">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-neutral-600 truncate max-w-[160px] text-[11px]">
                            {course.organization}
                          </span>
                          <div className="flex items-center gap-1 font-bold text-neutral-800 text-[11px] shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                          {course.headline}
                        </p>
                      </div>

                      {/* Course Meta Info */}
                      <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-medium">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3 h-3 text-neutral-400" />
                          <span>{course.level}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-400" />
                          <span>{course.durationWeeks} Wks</span>
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2.5 border-t border-neutral-100 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenCourseModal(course)}
                          className="flex-1 py-1.5 px-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs transition text-center"
                        >
                          Syllabus
                        </button>
                        {isEnrolled ? (
                          <Link
                            href={`/digihub/lesson/${course.lessons[0]?.id || "coding-1"}`}
                            className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs transition shadow-2xs text-center"
                          >
                            Continue
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onEnrollCourse && onEnrollCourse(course.id)}
                            className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-2xs text-center"
                          >
                            Enroll Free
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── SECTION 3: DEDICATED BROWSER LABS ─────────────────────────── */}
        {activeSection === "labs" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Interactive Browser Workspaces
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl font-normal">
                Full client-side development environments with zero local setup. Practice on any standard PC, laptop, or community center workstation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Lab 1 */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-neutral-900">Web Dev Code Sandbox</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Complete HTML5, modern CSS, and JavaScript editor with real-time DOM rendering, error highlighting, and automated challenge verification.
                  </p>
                  <div className="text-[11px] text-neutral-500 space-y-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <div>• Instant live DOM preview window</div>
                    <div>• Automated keyword and syntax checks</div>
                    <div>• Local storage autosave for your project code</div>
                  </div>
                </div>
                <Link
                  href="/digihub/lesson/coding-1"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs transition"
                >
                  <span>Launch Web Sandbox</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Lab 2 */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-neutral-900">Cyber Incident Simulator</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Real-world threat analysis suite covering spoofed email headers, dictionary brute-force crack tests, SHA-256 digests, and SQL injection sanitization.
                  </p>
                  <div className="text-[11px] text-neutral-500 space-y-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <div>• Realistic phishing header parser</div>
                    <div>• Password entropy &amp; brute-force time calculator</div>
                    <div>• Interactive database injection defense testbed</div>
                  </div>
                </div>
                <Link
                  href="/digihub/lesson/cyber-1"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-2xs transition"
                >
                  <span>Launch Cyber Defense Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Lab 3 */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-neutral-900">Python Terminal Shell</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Interactive Python environment executing standard loops, mathematical formulas, data filters, and string algorithms without local interpreter installations.
                  </p>
                  <div className="text-[11px] text-neutral-500 space-y-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <div>• Standard output streaming and runtime logs</div>
                    <div>• Variable state inspections</div>
                    <div>• Built-in practice challenges and test assertions</div>
                  </div>
                </div>
                <Link
                  href="/digihub/lesson/py-1"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition"
                >
                  <span>Launch Python Runner</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Lab 4 */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-neutral-900">Digital Office Simulator</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    Interactive workplace productivity challenge evaluating spreadsheet formulas, budget calculations, and cloud file permission auditing.
                  </p>
                  <div className="text-[11px] text-neutral-500 space-y-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <div>• Live spreadsheet formula calculation engine</div>
                    <div>• Enterprise cloud permission safety audits</div>
                    <div>• Essential workplace digital literacy scenarios</div>
                  </div>
                </div>
                <Link
                  href="/digihub/lesson/literacy-1"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-2xs transition"
                >
                  <span>Launch Office Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ─── SECTION 4: DEDICATED DIPLOMAS & CERTIFICATES ─────────────── */}
        {activeSection === "diplomas" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  Verified Diplomas &amp; Academic Credentials
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl font-normal">
                  Official certificates issued by DigiConnect Ghana NGO. Equipped with unique cryptographic serials and live QR validation records.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="self-start sm:self-auto px-3.5 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#0056D2]" />
                <span>Verify Legal Name</span>
              </button>
            </div>

            {/* Diplomas List */}
            {certificates.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-neutral-200 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-800 text-sm sm:text-base">
                  No Diplomas Issued Yet
                </h3>
                <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                  Complete all module quizzes and hands-on lab challenges in any of our 12 tracks to automatically unlock your faculty-signed certificate.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveSection("learning")}
                    className="px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs transition"
                  >
                    Resume Active Track
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                          Verified Credential
                        </span>
                        <h4 className="font-bold text-base text-neutral-900 mt-0.5">
                          {cert.courseTitle}
                        </h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 text-[11px] text-neutral-600 space-y-1">
                      <div>Issued to: <strong className="text-neutral-900">{cert.studentName}</strong></div>
                      <div>Serial: <span className="font-mono font-bold text-[#0056D2]">{cert.verificationCode}</span></div>
                      <div>Date: {cert.completionDate}</div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onOpenCertificateModal(cert)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs transition text-center"
                      >
                        View &amp; Print Diploma
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── SECTION 5: DEDICATED MENTORSHIP ───────────────────────────── */}
        {activeSection === "mentorship" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                1-on-1 Faculty Mentorship
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl font-normal">
                Schedule free virtual 1-on-1 sessions with volunteer Ghanaian senior developers and cybersecurity specialists.
              </p>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-100 relative shrink-0 border border-neutral-200">
                        <Image
                          src={mentor.avatar || "/images/team/team-1.jpg"}
                          alt={mentor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-neutral-900">{mentor.name}</h3>
                        <p className="text-xs text-neutral-600">{mentor.role}</p>
                        <span className="text-[11px] font-semibold text-[#0056D2]">{mentor.companyOrOrg}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {mentor.bio}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {mentor.specialties?.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 rounded bg-neutral-100 text-[10px] font-medium text-neutral-700"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenMentorBooking && onOpenMentorBooking(mentor)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs transition flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule 1-on-1 Session</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Booked Sessions */}
            {sessions.length > 0 && (
              <div className="pt-4 border-t border-neutral-200 space-y-3">
                <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
                  Your Booked Sessions
                </h3>
                <div className="space-y-2.5">
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-4 rounded-xl bg-white border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-neutral-900">
                          Session with {sess.mentorName}
                        </div>
                        <div className="text-neutral-500">
                          {sess.date} at {sess.timeSlot}
                        </div>
                      </div>
                      {sess.meetingLink && (
                        <a
                          href={sess.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-1.5 shrink-0"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Join Meeting</span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 3. MOBILE BOTTOM NAVIGATION DOCK (Appears ONLY after login) */}
      <nav
        aria-label="Student Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-2 flex items-center justify-around font-digihub"
      >
        <button
          type="button"
          onClick={() => setActiveSection("learning")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 transition text-[10px] font-semibold active:scale-95 ${
            activeSection === "learning" ? "text-[#0056D2]" : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Learning</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("catalog")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 transition text-[10px] font-semibold active:scale-95 ${
            activeSection === "catalog" ? "text-[#0056D2]" : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Catalog</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("labs")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 transition text-[10px] font-semibold active:scale-95 ${
            activeSection === "labs" ? "text-[#0056D2]" : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Labs</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection("diplomas")}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 transition text-[10px] font-semibold active:scale-95 ${
            activeSection === "diplomas" ? "text-[#0056D2]" : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Diplomas</span>
        </button>

        {/* Three Dots ("More" / Quick Dashboard Popup Trigger) */}
        <button
          type="button"
          onClick={() => setIsQuickDashboardOpen(true)}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 transition text-[10px] font-bold active:scale-95 ${
            isQuickDashboardOpen ? "text-[#0056D2]" : "text-neutral-700 hover:text-neutral-950"
          }`}
          aria-label="Open Quick Dashboard controls"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span>More</span>
        </button>
      </nav>

      {/* 4. POPUP QUICK DASHBOARD DRAWER (Triggered by the Three Dots "...") */}
      {isQuickDashboardOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-neutral-200 p-5 sm:p-6 space-y-5 animate-in slide-in-from-bottom-5 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header with Drag Pill */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-1.5 rounded-full bg-neutral-200 mb-3 sm:hidden" />
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0056D2] flex items-center justify-center">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900">Student Quick Hub</h3>
                    <span className="text-[10px] text-neutral-500">Fast Controls &amp; Settings</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuickDashboardOpen(false)}
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition"
                  aria-label="Close Quick Hub"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Student Snapshot Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#0056D2] text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                {firstName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-neutral-900 truncate">
                  {progress.studentName || currentUser.name}
                </div>
                <div className="text-xs text-neutral-500 truncate">{currentUser.email}</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                  ID: DCG-STU-{currentUser.id.slice(0, 8).toUpperCase()}
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                <div className="text-lg font-bold text-[#0056D2]">{inProgressCourses.length}</div>
                <div className="text-[10px] font-semibold text-neutral-600">Active Tracks</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <div className="text-lg font-bold text-emerald-600">{progress.completedLessonIds.length}</div>
                <div className="text-[10px] font-semibold text-neutral-600">Completed Labs</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="text-lg font-bold text-amber-600">{certificates.length}</div>
                <div className="text-[10px] font-semibold text-neutral-600">Diplomas Earned</div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <div className="text-lg font-bold text-purple-600">
                  {progress.completedLessonIds.length * 50} XP
                </div>
                <div className="text-[10px] font-semibold text-neutral-600">Scholar Score</div>
              </div>
            </div>

            {/* Navigation Shortcuts */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block px-1">
                Quick Shortcuts
              </span>

              <button
                type="button"
                onClick={() => {
                  setActiveSection("mentorship");
                  setIsQuickDashboardOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:bg-blue-50/30 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#0056D2]" />
                  <span className="font-semibold text-neutral-800">1-on-1 Faculty Mentorship</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsQuickDashboardOpen(false);
                  setIsEditingName(true);
                }}
                className="w-full text-left p-3 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:bg-blue-50/30 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Edit2 className="w-4 h-4 text-[#0056D2]" />
                  <span className="font-semibold text-neutral-800">Update Diploma Legal Name</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsQuickDashboardOpen(false);
                  onRetakeOnboarding();
                }}
                className="w-full text-left p-3 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:bg-blue-50/30 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#0056D2]" />
                  <span className="font-semibold text-neutral-800">Retake Onboarding Questionnaire</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              <Link
                href="/"
                className="w-full text-left p-3 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-neutral-500" />
                  <span className="font-semibold text-neutral-800">DigiConnect Ghana Main Website</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
            </div>

            {/* Sign Out Action */}
            <div className="pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => {
                  setIsQuickDashboardOpen(false);
                  onSignOut();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-red-200 bg-red-50/70 hover:bg-red-100/70 text-red-600 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of DIGIHub</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. EDIT LEGAL CERTIFICATE NAME MODAL */}
      {isEditingName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-neutral-900">
                Update Legal Certificate Name
              </h3>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-normal">
              Enter your official full name as recognized on your Ghanaian passport, Ghana Card, or academic records. This will be printed on all your verified diplomas.
            </p>

            <form onSubmit={handleSaveStudentName} className="space-y-4 pt-1">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="e.g. Kwame Mensah Boateng"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs sm:text-sm text-neutral-900 outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditingName(false)}
                  className="flex-1 py-2 px-3 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-xs hover:bg-neutral-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs transition"
                >
                  Save Name
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
