"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  Lightbulb,
  MousePointer,
  Bot,
  Menu,
  Flame,
} from "lucide-react";
import { JargonBusterModal } from "./JargonBusterModal";
import { ComputerBasicsLab } from "./ComputerBasicsLab";
import { MovableAICoach } from "./MovableAICoach";
import { DigihubPCNavbar } from "./DigihubPCNavbar";
import { DigihubMobileNavbar } from "./DigihubMobileNavbar";
import {
  LMSUser,
  Course,
  LearnerProgress,
  CertificateRecord,
  Mentor,
  MentorshipSession,
  getCourseProgress,
  INITIAL_LESSONS,
} from "@/lib/lmsStore";

interface DigihubDashboardProps {
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

export function DigihubDashboard({
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
}: DigihubDashboardProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<DashboardSection>("learning");
  const [catalogFilter, setCatalogFilter] = useState<string>("all");
  const [catalogSearch, setCatalogSearch] = useState<string>("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isQuickDashboardOpen, setIsQuickDashboardOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(progress.studentName || currentUser.name);
  const [isJargonModalOpen, setIsJargonModalOpen] = useState(false);
  const [isBasicsLabOpen, setIsBasicsLabOpen] = useState(false);
  const [coachOpenSignal, setCoachOpenSignal] = useState(0);
  const [isMobileSectionMenuOpen, setIsMobileSectionMenuOpen] = useState(false);
  const [isQuickToolsOpen, setIsQuickToolsOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

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

  // Safe progress completedLessonIds fallback
  const safeCompletedIds = Array.isArray(progress?.completedLessonIds) ? progress.completedLessonIds : [];

  // Active enrolled courses
  const enrolledCourseIds = currentUser.enrolledCourseIds || ["cybersecurity", "coding"];
  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const primaryCourse = enrolledCourses[0] || courses[0];

  // Primary course progress & next lesson
  const primaryProgress = primaryCourse
    ? getCourseProgress(primaryCourse.id, safeCompletedIds)
    : { completed: 0, total: 4, percentage: 25, isCompleted: false };

  const primaryLessons = primaryCourse?.lessons && primaryCourse.lessons.length > 0
    ? primaryCourse.lessons
    : (INITIAL_LESSONS.filter((l) => l.trackId === primaryCourse?.id) || []);

  const nextLesson = primaryLessons.length > 0
    ? primaryLessons.find((l) => !safeCompletedIds.includes(l.id)) || primaryLessons[0]
    : null;

  // Filter courses for in-progress vs completed
  const inProgressCourses = enrolledCourses.filter((c) => {
    const cp = getCourseProgress(c.id, safeCompletedIds);
    return !cp.isCompleted;
  });

  const completedCourses = enrolledCourses.filter((c) => {
    const cp = getCourseProgress(c.id, safeCompletedIds);
    return cp.isCompleted;
  });

  // Ensure dashboard grid displays at least 4 courses to match the 2x2 grid in Image 2
  const dashboardGridCourses = [...inProgressCourses];
  if (dashboardGridCourses.length < 4) {
    const additional = courses.filter((c) => !dashboardGridCourses.some((dc) => dc.id === c.id));
    dashboardGridCourses.push(...additional.slice(0, 4 - dashboardGridCourses.length));
  }

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

  const handleExportData = () => {
    try {
      const data = {
        student: currentUser.name,
        email: currentUser.email,
        date: new Date().toISOString(),
        certificates: certificates,
        sessions: sessions,
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `digiconnect-transcript-${currentUser.id || "student"}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-neutral-900 font-digihub selection:bg-[#0056D2] selection:text-white max-w-full overflow-x-clip pb-[calc(10.5rem+env(safe-area-inset-bottom,0px))] sm:pb-24 md:pb-12">
      {/* 1. PC VIEW NAVBAR (Image 1 top horizontal bar + left docked icon rail) */}
      <DigihubPCNavbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        currentUser={currentUser}
        courses={courses}
        certificates={certificates}
        sessions={sessions}
        onSignOut={onSignOut}
        onOpenJargonModal={() => setIsJargonModalOpen(true)}
        onOpenQuickHub={() => setIsQuickDashboardOpen(true)}
        onOpenCoach={() => setCoachOpenSignal((prev) => prev + 1)}
        onOpenCourseModal={onOpenCourseModal}
        onOpenMentorBooking={() => {
          if (onOpenMentorBooking) {
            onOpenMentorBooking(mentors[0] || undefined);
          }
        }}
        onSearchQuery={(q) => {
          setCatalogSearch(q);
          setActiveSection('catalog');
        }}
        isMenuOpen={isMenuModalOpen}
        onOpenMenu={() => setIsMenuModalOpen(true)}
        onCloseMenu={() => setIsMenuModalOpen(false)}
      />

      {/* 1.5 MOBILE VIEW NAVBAR (Image 2 top compact bar + floating scooped bottom nav) */}
      <DigihubMobileNavbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        currentUser={currentUser}
        unreadNotificationsCount={2}
        onOpenNotifications={() => {}}
        onOpenSearch={() => {
          setActiveSection("catalog");
        }}
        onOpenCoach={() => setCoachOpenSignal((prev) => prev + 1)}
        onOpenProfile={() => setActiveSection("diplomas")}
        onOpenMenu={() => setIsMenuModalOpen(true)}
        onSignOut={onSignOut}
        onOpenJargonModal={() => setIsJargonModalOpen(true)}
        onOpenQuickHub={() => setIsQuickDashboardOpen(true)}
        onExportData={handleExportData}
      />

      {/* 2. DEDICATED SECTION CONTENT */}
      <main className="max-w-[1400px] mx-auto px-2.5 sm:px-6 lg:px-8 pt-2 sm:pt-8 pb-[calc(10.5rem+env(safe-area-inset-bottom,0px))] sm:pb-24 space-y-4 sm:space-y-8">
        {/* ─── SECTION 1: MY LEARNING ────────────────────────────────────── */}
        {activeSection === "learning" && (
          <div className="space-y-6 sm:space-y-8 tab-content-enter" key="learning">
            {/* Greeting & Active Course Hero with 7-Day Streak & Time Remaining */}
            <section className="p-3.5 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs space-y-3.5 sm:space-y-5 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] sm:text-xs font-semibold text-[#0056D2] uppercase tracking-wider block">
                    {timeGreeting}, {firstName} 👋
                  </span>
                  <h1 className="text-base sm:text-2xl font-bold text-neutral-900 tracking-tight mt-0.5 break-words">
                    {primaryCourse?.title || "Web Engineering & Coding Foundations"}
                  </h1>
                  {nextLesson && (
                    <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5 truncate">
                      <span className="font-semibold text-neutral-600 shrink-0">Up Next:</span>
                      <span className="text-neutral-800 font-medium truncate">{nextLesson.title}</span>
                    </p>
                  )}
                </div>

                {/* Mobile: Wrapped CTA row so 7-day streak never gets clipped on right edge */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto pt-1 sm:pt-0">
                  {/* Primary Resume Lesson CTA */}
                  {nextLesson && (
                    <Link
                      href={`/digihub/lesson/${nextLesson.id}`}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white text-xs sm:text-sm font-bold shadow-2xs hover:shadow transition transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Resume Lesson</span>
                    </Link>
                  )}

                  {/* 7-Day Study Streak Indicator (Compact dots that fit perfectly on all mobile viewports) */}
                  <div className="flex items-center gap-1.5 sm:gap-2.5 bg-neutral-50 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-neutral-200/80 shadow-2xs shrink-0 max-w-full">
                    <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-emerald-600 shrink-0">
                      <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-500 text-emerald-500" />
                      <span>4d</span>
                    </div>
                    <div className="h-3 w-px bg-neutral-200" />
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[
                        { day: "M", done: true },
                        { day: "T", done: true },
                        { day: "W", done: true },
                        { day: "T", done: true },
                        { day: "F", done: false },
                        { day: "S", done: false },
                        { day: "S", done: false },
                      ].map((d, i) => (
                        <div
                          key={i}
                          className={`w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[8.5px] sm:text-[10px] font-bold transition ${
                            d.done
                              ? "bg-emerald-500 text-white shadow-2xs"
                              : "bg-neutral-200/80 text-neutral-500"
                          }`}
                          title={`${d.day}: ${d.done ? "Active study day completed" : "Upcoming study day"}`}
                        >
                          {d.day}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar & Time Remaining Badge */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-semibold text-neutral-600 text-[11px] sm:text-xs">Curriculum Progress</span>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-blue-50 text-[#0056D2] border border-blue-100 font-bold text-[9px] sm:text-[10px]">
                      ~2.5 hrs to Certificate
                    </span>
                  </div>
                  <span className="font-bold text-[#0056D2] text-[11px] sm:text-xs">{primaryProgress.percentage}% complete</span>
                </div>
                <div className="w-full h-1.5 sm:h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-[#0056D2] rounded-full progress-animated progress-shimmer"
                    style={{ width: `${Math.max(primaryProgress.percentage, 15)}%` }}
                  />
                </div>
              </div>
            </section>

            {/* Clean, Minimalist Enrolled Courses (2x2 Card Grid faithfully reproducing Image 2) */}
            <section className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                    My Enrolled Courses
                  </h2>
                  <span
                    className="text-neutral-400 hover:text-neutral-600 transition cursor-help"
                    title="Track your curriculum progress and earn verified certificates."
                  >
                    <Info className="w-3.5 h-3.5" />
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection("catalog")}
                  className="text-xs font-semibold text-[#0056D2] hover:underline flex items-center gap-1 group"
                >
                  <span>Explore All ({courses.length})</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </button>
              </div>

              {/* 2x2 Grid of Course Cards (Image 2 sketch reproduction with Full-Card Tap Targets) */}
              <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2.5 sm:gap-4">
                {dashboardGridCourses.map((course) => {
                  const isEnrolled = enrolledCourseIds.includes(course.id);
                  const isPrimaryTrack = primaryCourse?.id === course.id;
                  const cp = getCourseProgress(course.id, safeCompletedIds);
                  const courseLessons = course.lessons && course.lessons.length > 0
                    ? course.lessons
                    : (INITIAL_LESSONS.filter((l) => l.trackId === course.id) || []);
                  const currentLesson =
                    courseLessons.find((l) => !safeCompletedIds.includes(l.id)) ||
                    courseLessons[0];
                  const hoursLeft = Math.max(1, (courseLessons.length - (isEnrolled ? cp.completed : 0)) * 0.75).toFixed(1);

                  const handleCardClick = () => {
                    if (isEnrolled && currentLesson) {
                      router.push(`/digihub/lesson/${currentLesson.id}`);
                    } else if (onEnrollCourse) {
                      onEnrollCourse(course.id);
                    } else {
                      onOpenCourseModal(course);
                    }
                  };

                  return (
                    <div
                      key={course.id}
                      onClick={handleCardClick}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleCardClick();
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open course: ${course.title}`}
                      className="flex flex-col justify-between p-2.5 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 hover:border-[#0056D2]/60 shadow-2xs hover:shadow-md card-lift transition-all duration-200 min-h-[195px] sm:min-h-[235px] cursor-pointer active:scale-[0.985] group select-none text-left"
                    >
                      {/* Top Meta: Category + Hours left (never truncates into DIGICONNECT S...) */}
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1 sm:mb-2">
                          <span className="text-[9.5px] sm:text-[10px] font-bold text-[#0056D2] uppercase tracking-wider truncate max-w-[65%]">
                            {course.category ? course.category.replace("-", " ") : "DigiConnect"}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-[#0056D2] border border-blue-100 font-bold text-[8px] sm:text-[9px] shrink-0">
                            ~{hoursLeft} hrs
                          </span>
                        </div>

                        {/* Title (optimized font size for mobile 2-column fit) */}
                        <h3 className="text-[12px] sm:text-base font-bold text-neutral-900 group-hover:text-[#0056D2] leading-snug line-clamp-2 min-h-[2.1rem] sm:min-h-[2.5rem] break-words transition-colors">
                          {course.title}
                        </h3>

                        {/* Progress */}
                        <div className="mt-1.5 sm:mt-2.5 space-y-1">
                          <div className="flex items-center justify-between text-[10px] sm:text-xs">
                            <span className="text-neutral-500 font-medium">Curriculum</span>
                            <span className="font-bold text-[#0056D2]">
                              {isEnrolled ? `${cp.percentage}%` : "Ready"}
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                            <div
                              className="h-full bg-[#0056D2] rounded-full progress-animated"
                              style={{ width: `${isEnrolled ? Math.max(cp.percentage, 8) : 5}%` }}
                            />
                          </div>
                        </div>

                        {/* Next lesson info */}
                        <div className="text-[9.5px] sm:text-xs text-neutral-500 truncate mt-1.5 sm:mt-2">
                          <span className="text-neutral-400">Next:</span>{" "}
                          <span className="font-semibold text-neutral-800">
                            {currentLesson?.title || "Lesson 1"}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Action Buttons: Perfectly sized without '...' truncation */}
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5 mt-auto pt-2.5 border-t border-neutral-100">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenCourseModal(course);
                          }}
                          className="w-full py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-xl border border-neutral-200/90 hover:bg-neutral-50 text-neutral-700 font-semibold text-[10px] sm:text-xs transition flex items-center justify-center gap-1 shadow-2xs active:scale-95 text-center truncate"
                          title="View course syllabus"
                        >
                          <BookOpen className="w-3 h-3 text-neutral-400 shrink-0 hidden min-[380px]:inline" />
                          <span className="truncate">Syllabus</span>
                        </button>

                        {isEnrolled && currentLesson ? (
                          isPrimaryTrack ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/digihub/lesson/${currentLesson.id}`);
                              }}
                              className="w-full py-1.5 sm:py-2 px-1 sm:px-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0056D2] border border-blue-100 font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1 text-center truncate active:scale-95 transition"
                              title="Currently active track on your hero banner - tap to resume"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0056D2] animate-pulse shrink-0" />
                              <span className="truncate sm:hidden">Active</span>
                              <span className="truncate hidden sm:inline">Active Track</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/digihub/lesson/${currentLesson.id}`);
                              }}
                              className="w-full py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-[10px] sm:text-xs shadow-2xs transition flex items-center justify-center gap-1 active:scale-95 text-center truncate"
                              title="Switch to this track"
                            >
                              <span className="truncate sm:hidden">Resume</span>
                              <span className="truncate hidden sm:inline">Switch Track</span>
                              <ArrowRight className="w-3 h-3 shrink-0" />
                            </button>
                          )
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onEnrollCourse) {
                                onEnrollCourse(course.id);
                              } else {
                                onOpenCourseModal(course);
                              }
                            }}
                            className="w-full py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-[10px] sm:text-xs shadow-2xs transition flex items-center justify-center gap-1 active:scale-95 text-center truncate"
                            title="Enroll in this course track"
                          >
                            <span className="truncate">Enroll</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* If user has any completed courses, show them cleanly */}
              {completedCourses.length > 0 && (
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                    Completed Certificates
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {completedCourses.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 sm:p-4 rounded-2xl bg-white border border-neutral-200/90 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Completed Track</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5 truncate">{c.title}</h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveSection("diplomas")}
                          className="px-3 py-1.5 rounded-xl bg-[#0056D2] text-white text-xs font-bold hover:bg-[#00419e] transition shrink-0"
                        >
                          Certificate
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ─── SECTION 2: DEDICATED COURSE CATALOG ───────────────────────── */}
        {activeSection === "catalog" && (
          <div className="space-y-6 tab-content-enter" key="catalog">
            {/* Top Back Navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveSection("learning")}
                className="text-xs font-bold text-[#0056D2] hover:underline flex items-center gap-1 group"
              >
                <span className="group-hover:-translate-x-0.5 transition">←</span>
                <span>Back to My Learning</span>
              </button>
              <div className="sm:hidden flex items-center gap-1.5 text-neutral-500 text-[11px] font-semibold">
                <span>{courses.length} Career Tracks</span>
              </div>
            </div>

            {/* Beginner Clinic 101 Sandbox Banner */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-amber-50/80 border border-blue-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0056D2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <MousePointer className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0056D2] text-[9px] font-bold uppercase tracking-wider">
                      Beginner Clinic
                    </span>
                    <span className="text-[9px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                      Zero Fear
                    </span>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-neutral-900 mt-0.5">
                    Computer &amp; Phone Basics: Click, Copy-Paste, &amp; Typing Clinic
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBasicsLabOpen(true)}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs transition flex items-center gap-1.5 active:scale-95 shrink-0"
              >
                <MousePointer className="w-3.5 h-3.5" />
                <span>Launch Clinic</span>
              </button>
            </div>

            {/* STICKY QUICK SEARCH & CATEGORY FILTERS (Item 7) */}
            <div className="sticky top-[52px] sm:top-0 z-30 -mx-3 px-3 sm:mx-0 sm:px-0 py-2.5 sm:py-0 bg-[#f8fafc]/95 sm:bg-transparent backdrop-blur-md border-b border-neutral-200/80 sm:border-0 space-y-2.5">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
                <div className="hidden sm:block">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                      Course Catalog
                    </h2>
                    <span
                      className="text-neutral-400 hover:text-neutral-600 transition cursor-help"
                      title="12 structured career tracks with 100% tuition-free enrollment."
                    >
                      <Info className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Search Box with Instant Clear Button */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder="Search 12 tracks or skills..."
                    className="w-full pl-9 pr-9 py-2 sm:py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition bg-white shadow-2xs"
                  />
                  {catalogSearch && (
                    <button
                      type="button"
                      onClick={() => setCatalogSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-600 flex items-center justify-center transition active:scale-95"
                      aria-label="Clear search query"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 pt-0.5 -mx-1 px-1">
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
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition active:scale-95 ${
                      catalogFilter === pill.id
                        ? "bg-[#0056D2] text-white shadow-2xs"
                        : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-2xs"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Cards Grid */}
            {filteredCatalogCourses.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-neutral-200/90 shadow-2xs space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-800 text-sm sm:text-base">
                  No Courses Found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  We couldn&apos;t find any curriculum matching &ldquo;{catalogSearch || catalogFilter}&rdquo;. Try clearing filters or searching for terms like &ldquo;coding&rdquo;, &ldquo;python&rdquo;, or &ldquo;cyber&rdquo;.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCatalogSearch("");
                      setCatalogFilter("all");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs shadow-2xs transition"
                  >
                    Reset Search &amp; Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredCatalogCourses.map((course) => {
                  const isEnrolled = enrolledCourseIds.includes(course.id);
                  const cp = getCourseProgress(course.id, progress.completedLessonIds);

                  return (
                    <div
                      key={course.id}
                      onClick={() => onOpenCourseModal(course)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onOpenCourseModal(course);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View syllabus for ${course.title}`}
                      className="rounded-2xl border border-neutral-200 bg-white hover:border-[#0056D2] hover:shadow-md card-lift flex flex-col justify-between overflow-hidden group animate-fade-in-up cursor-pointer active:scale-[0.99] transition select-none text-left"
                      style={{ animationDelay: `${Math.min(filteredCatalogCourses.indexOf(course) * 50, 350)}ms` }}
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
                          <h3 className="font-bold text-xs leading-snug line-clamp-2 drop-shadow-sm group-hover:text-blue-200 transition-colors">
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
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenCourseModal(course);
                            }}
                            className="flex-1 py-1.5 px-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs transition text-center active:scale-95"
                          >
                            Syllabus
                          </button>
                          {isEnrolled ? (
                            (() => {
                              const catalogLessons = course.lessons && course.lessons.length > 0
                                ? course.lessons
                                : (INITIAL_LESSONS.filter((l) => l.trackId === course.id) || []);
                              const targetLessonId = catalogLessons[0]?.id || "code-101";
                              return (
                                <Link
                                  href={`/digihub/lesson/${targetLessonId}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs transition shadow-2xs text-center active:scale-95"
                                >
                                  Continue
                                </Link>
                              );
                            })()
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onEnrollCourse) onEnrollCourse(course.id);
                              }}
                              className="flex-1 py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-2xs text-center active:scale-95"
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
            )}
          </div>
        )}

        {/* ─── SECTION 3: CERTIFICATES ─────────────── */}
        {activeSection === "diplomas" && (
          <div className="space-y-6 tab-content-enter" key="diplomas">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  My Certificates
                </h2>
                <span
                  className="text-neutral-400 hover:text-neutral-600 transition cursor-help"
                  title="Official certificates issued with verifiable cryptographic serials and live QR validation records."
                >
                  <Info className="w-4 h-4" />
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                className="self-start sm:self-auto px-3.5 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-700 transition flex items-center gap-1.5 active:scale-95"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#0056D2]" />
                <span>Verify Legal Name</span>
              </button>
            </div>

            {/* Certificates List */}
            {certificates.length === 0 ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-neutral-200 space-y-3 animate-fade-in-up">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-neutral-800 text-sm sm:text-base">
                  No Certificates Issued Yet
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
                {certificates.map((cert, certIdx) => (
                  <div
                    key={cert.id}
                    className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4 card-lift animate-fade-in-up"
                    style={{ animationDelay: `${certIdx * 80}ms` }}
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
                        View &amp; Print Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── SECTION 4: 1-ON-1 FACULTY MENTORSHIP ─────────────────────── */}
        {activeSection === "mentorship" && (
          <div className="space-y-6 tab-content-enter" key="mentorship">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                1-on-1 Faculty Mentorship
              </h2>
              <span
                className="text-neutral-400 hover:text-neutral-600 transition cursor-help"
                title="Schedule free virtual 1-on-1 sessions with volunteer Ghanaian senior developers and cybersecurity specialists."
              >
                <Info className="w-4 h-4" />
              </span>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mentors.map((mentor, mentorIdx) => (
                <div
                  key={mentor.id}
                  className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between space-y-4 card-lift animate-fade-in-up"
                  style={{ animationDelay: `${mentorIdx * 70}ms` }}
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
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-bold text-xs shadow-2xs transition flex items-center justify-center gap-1.5 active:scale-98"
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

      {/* 4. POPUP QUICK DASHBOARD DRAWER (Triggered by the Three Dots "...") */}
      {isQuickDashboardOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-neutral-200 p-5 sm:p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] space-y-5 animate-in slide-in-from-bottom-5 duration-200 max-h-[90vh] overflow-y-auto"
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
                <div className="text-lg font-bold text-emerald-600">{safeCompletedIds.length}</div>
                <div className="text-[10px] font-semibold text-neutral-600">Completed Labs</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="text-lg font-bold text-amber-600">{certificates.length}</div>
                <div className="text-[10px] font-semibold text-neutral-600">Certificates Earned</div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <div className="text-lg font-bold text-purple-600">
                  {safeCompletedIds.length * 50} XP
                </div>
                <div className="text-[10px] font-semibold text-neutral-600">Scholar Score</div>
              </div>
            </div>

            {/* Navigation Shortcuts */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block px-1">
                Quick Shortcuts
              </span>

              {/* Jargon Buster Shortcut */}
              <button
                type="button"
                onClick={() => {
                  setIsQuickDashboardOpen(false);
                  setIsJargonModalOpen(true);
                }}
                className="w-full text-left p-3 rounded-xl bg-amber-50/70 border border-amber-200 hover:border-amber-300 hover:bg-amber-100/60 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-amber-950">Jargon Buster Tech Dictionary</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
              </button>

              {/* Computer Basics Shortcut */}
              <button
                type="button"
                onClick={() => {
                  setIsQuickDashboardOpen(false);
                  setIsBasicsLabOpen(true);
                }}
                className="w-full text-left p-3 rounded-xl bg-blue-50/70 border border-blue-200 hover:border-[#0056D2] hover:bg-blue-100/60 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <MousePointer className="w-4 h-4 text-[#0056D2]" />
                  <span className="font-semibold text-blue-950">Computer Basics 101 Clinic</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#0056D2]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveSection("catalog");
                  setIsQuickDashboardOpen(false);
                }}
                className="w-full text-left p-3 rounded-xl bg-white border border-neutral-200 hover:border-[#0056D2] hover:bg-blue-50/30 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-[#0056D2]" />
                  <span className="font-semibold text-neutral-800">Explore All 12 Courses</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </button>

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
                  <span className="font-semibold text-neutral-800">Update Certificate Legal Name</span>
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
              Enter your official full name as recognized on your Ghanaian passport, Ghana Card, or academic records. This will be printed on all your verified certificates.
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

      {/* 6. JARGON BUSTER MODAL */}
      <JargonBusterModal
        isOpen={isJargonModalOpen}
        onClose={() => setIsJargonModalOpen(false)}
      />

      {/* 7. COMPUTER & PHONE BASICS CLINIC MODAL */}
      {isBasicsLabOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-6 my-auto">
            <button
              onClick={() => setIsBasicsLabOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 rounded-xl hover:bg-neutral-100 transition z-10"
              aria-label="Close Basics Lab"
            >
              <X className="w-5 h-5" />
            </button>
            <ComputerBasicsLab
              onLabCompleted={() => {
                setTimeout(() => setIsBasicsLabOpen(false), 2000);
              }}
            />
          </div>
        </div>
      )}
      {/* 8. MOVABLE AI STUDY COACH (DRAGGABLE & VIEWPORT-CLAMPED) */}
      <MovableAICoach
        currentLessonTitle={nextLesson?.title || primaryCourse?.title}
        currentModuleTitle={primaryCourse?.title}
        userProgressXp={progress.xp}
        openSignal={coachOpenSignal}
      />
    </div>
  );
}

export { DigihubDashboard as CourseraDashboard };

