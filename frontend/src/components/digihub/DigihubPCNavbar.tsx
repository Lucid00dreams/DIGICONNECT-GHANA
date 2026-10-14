"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  BookOpen,
  Terminal,
  Users,
  Award,
  Search,
  Sun,
  Moon,
  Bell,
  SlidersHorizontal,
  Download,
  Plus,
  Calendar,
  Clock,
  Bookmark,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
  Flame,
  MessageSquare,
  FileCode,
  Compass,
} from "lucide-react";
import { LMSUser, Course, CertificateRecord, MentorshipSession } from "@/lib/lmsStore";
import { DigihubMenuModal } from "./DigihubMenuModal";

export type PCTab = "learning" | "catalog" | "labs" | "mentorship" | "diplomas";

interface DigihubPCNavbarProps {
  activeSection: PCTab;
  onSelectSection: (section: PCTab) => void;
  currentUser: LMSUser;
  courses: Course[];
  certificates: CertificateRecord[];
  sessions?: MentorshipSession[];
  onSignOut: () => void;
  onOpenJargonModal: () => void;
  onOpenQuickHub: () => void;
  onOpenCoach: () => void;
  onOpenCourseModal?: (course: Course) => void;
  onOpenMentorBooking?: () => void;
  onSearchQuery?: (q: string) => void;
  isMenuOpen?: boolean;
  onOpenMenu?: () => void;
  onCloseMenu?: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "success" | "info" | "event";
  unread: boolean;
}

export function DigihubPCNavbar({
  activeSection,
  onSelectSection,
  currentUser,
  courses,
  certificates,
  sessions = [],
  onSignOut,
  onOpenJargonModal,
  onOpenQuickHub,
  onOpenCoach,
  onOpenCourseModal,
  onOpenMentorBooking,
  onSearchQuery,
  isMenuOpen,
  onOpenMenu,
  onCloseMenu,
}: DigihubPCNavbarProps) {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const [searchVal, setSearchVal] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [streakModalOpen, setStreakModalOpen] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);

  const isMenuModalOpen = isMenuOpen !== undefined ? isMenuOpen : internalMenuOpen;
  const handleOpenMenu = onOpenMenu || (() => setInternalMenuOpen(true));
  const handleCloseMenu = onCloseMenu || (() => setInternalMenuOpen(false));

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const input = document.getElementById("digihub-pc-search-input");
        if (input) {
          input.focus();
          setIsSearchFocused(true);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Notifications list
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "Active Learning Streak!",
      description: "You're on a 4-day study streak. Keep going to unlock the DigiChampion badge.",
      time: "20m ago",
      type: "success",
      unread: true,
    },
    {
      id: "2",
      title: "Interactive Python Lab Ready",
      description: "New exercises added to Python Data Foundations lab.",
      time: "2h ago",
      type: "info",
      unread: true,
    },
    {
      id: "3",
      title: "Volunteer Mentorship Available",
      description: "Kwame Mensah & 3 other senior engineers have open slots this week.",
      time: "1d ago",
      type: "event",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Instant search matches
  const filteredSuggestions = searchVal.trim()
    ? courses
        .filter(
          (c) =>
            c.title.toLowerCase().includes(searchVal.toLowerCase()) ||
            c.description.toLowerCase().includes(searchVal.toLowerCase()) ||
            c.skillsGained.some((s) => s.toLowerCase().includes(searchVal.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchQuery) {
      onSearchQuery(searchVal);
    }
    if (activeSection !== "catalog") {
      onSelectSection("catalog");
    }
    setIsSearchFocused(false);
  };

  // Export Learner Transcript & Progress
  const handleExportData = () => {
    setIsExporting(true);
    try {
      const data = {
        student: currentUser.name,
        email: currentUser.email,
        date: new Date().toISOString(),
        enrolledCourses: currentUser.enrolledCourseIds || [],
        completedLessonsCount: currentUser.completedLessonIds?.length || 0,
        certificates: certificates.map((c) => ({
          title: c.courseTitle,
          serial: c.verificationCode || c.id,
          issueDate: c.completionDate,
        })),
        bookedSessions: sessions.map((s) => ({
          mentor: s.mentorName,
          date: s.date,
          status: s.status,
        })),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `DigiConnect_LMS_Transcript_${currentUser.name.replace(/\s+/g, "_")}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setTimeout(() => setIsExporting(false), 800);
    }
  };

  const firstName = currentUser.name.split(" ")[0] || "Learner";

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. TOP HORIZONTAL NAVBAR (Desktop PC View)
          Faithful reproduction of Image 1 Top Bar:
          - Left: Tabs (Dashboard, Courses, Labs, Mentorship, Diplomas)
          - Center: Pill Search Input with '⌘K' command shortcut
          - Right: Light/Dark toggle, Bell with unread counter, Settings gear,
                   Export Data button, and Dark Pill CTA (+ Enroll/Board)
          ───────────────────────────────────────────────────────────── */}
      <header className="hidden lg:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 w-full transition-colors">
        <div className="max-w-[1400px] mx-auto px-4 xl:px-6 h-18 flex items-center justify-between gap-4">
          {/* Left: Brand + Nav Tabs */}
          <div className="flex items-center gap-6 xl:gap-8 shrink-0">
            {/* Brand Logo & Name */}
            <Link href="/digihub" className="flex items-center gap-2.5 shrink-0 group focus:outline-none">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white shadow-2xs border border-blue-100 flex items-center justify-center p-0.5 shrink-0 group-hover:scale-105 transition">
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
                  <span className="text-lg font-bold tracking-tight text-neutral-900 leading-none">
                    DigiConnect
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#5B67E2] text-white tracking-wide">
                    DIGIHub
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                  Campus LMS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Tabs: Minimalist 3-Tab Structure */}
            <nav aria-label="PC Navigation Tabs" className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onSelectSection("learning")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                  activeSection === "learning"
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5 stroke-[2]" />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectSection("catalog")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${
                  activeSection === "catalog"
                    ? "bg-neutral-900 text-white shadow-xs font-bold"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 stroke-[2]" />
                <span>Courses</span>
              </button>

              {/* Dedicated Menu Tab (Explores all features and site pages) */}
              <button
                type="button"
                onClick={handleOpenMenu}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group ${
                  isMenuModalOpen
                    ? "bg-[#5B67E2] text-white shadow-xs font-bold"
                    : "text-neutral-700 hover:text-neutral-900 hover:bg-indigo-50/80"
                }`}
                aria-label="Explore menu, features and pages"
                title="Explore all features, labs, and DigiConnect pages"
              >
                <Compass className={`w-3.5 h-3.5 stroke-[2] transition-transform duration-300 group-hover:rotate-45 ${
                  isMenuModalOpen ? "text-white" : "text-[#5B67E2]"
                }`} />
                <span>Menu</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold transition-colors ${
                  isMenuModalOpen ? "bg-white/20 text-white" : "bg-[#5B67E2]/15 text-[#5B67E2]"
                }`}>
                  Explore
                </span>
              </button>
            </nav>
          </div>

          {/* Center: Search / Command Pill Bar (Styled like Image 1) */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs xl:max-w-sm">
            <form onSubmit={handleSearchSubmit}>
              <div
                className={`w-full bg-[#F3F4F8] hover:bg-[#EBEEF5] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#5B67E2]/30 focus-within:border-[#5B67E2] border border-neutral-200/70 rounded-full px-3.5 py-2 flex items-center gap-2 transition shadow-2xs`}
              >
                <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <input
                  id="digihub-pc-search-input"
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search courses, lessons, topics..."
                  className="w-full bg-transparent border-none text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none"
                />
                <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-white border border-neutral-200 shadow-2xs">
                  ⌘K
                </kbd>
              </div>
            </form>

            {/* Quick Live Search Suggestions Dropdown */}
            {isSearchFocused && searchVal.trim().length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 animate-in zoom-in-95 duration-150">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">
                  Matching Specializations
                </div>
                {filteredSuggestions.length > 0 ? (
                  <div className="space-y-1">
                    {filteredSuggestions.map((course) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => {
                          if (onOpenCourseModal) onOpenCourseModal(course);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-neutral-100 flex items-center justify-between text-xs transition"
                      >
                        <div className="truncate">
                          <span className="font-semibold text-neutral-900 block truncate">
                            {course.title}
                          </span>
                          <span className="text-[10px] text-neutral-500 block truncate">
                            {course.category} • {course.organization}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-neutral-500">
                    No exact course match. Press Enter to search catalog.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Cluster (Exact layout of Image 1) */}
          <div className="flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Theme Toggle Button (Single sleek Sun/Moon button) */}
            <button
              type="button"
              onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
              className="w-9 h-9 rounded-full bg-[#F3F4F8] hover:bg-[#EBEEF5] text-neutral-700 hover:text-neutral-900 border border-neutral-200/70 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 hover:shadow-xs shadow-2xs"
              title={themeMode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle theme mode"
            >
              {themeMode === "light" ? (
                <Moon className="w-4 h-4 text-indigo-500 stroke-[2]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500 stroke-[2]" />
              )}
            </button>

            {/* Notification Bell Button with Unread Badge */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="w-9 h-9 rounded-full bg-[#F3F4F8] hover:bg-[#EBEEF5] text-neutral-700 hover:text-neutral-900 border border-neutral-200/70 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 hover:shadow-xs shadow-2xs relative"
                aria-label="Student notifications"
                aria-expanded={isNotifOpen}
              >
                <Bell className="w-4 h-4 stroke-[2]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#5B67E2] text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 p-3 z-50 animate-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-100">
                    <span className="text-xs font-bold text-neutral-900">Student Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={handleMarkAllRead}
                        className="text-[10px] font-semibold text-[#5B67E2] hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs transition-colors ${
                          n.unread
                            ? "bg-indigo-50/50 border-indigo-100 text-neutral-900"
                            : "bg-neutral-50/50 border-neutral-100 text-neutral-600"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <span className="font-bold">{n.title}</span>
                          <span className="text-[10px] text-neutral-400 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-neutral-600 leading-relaxed">{n.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill & Dropdown Menu */}
            <div ref={userMenuRef} className="relative pl-1">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-neutral-100 transition focus:outline-none"
                aria-label="Student account"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-8 h-8 rounded-full bg-[#5B67E2] text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-200 shadow-2xs">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden xl:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-neutral-900 truncate max-w-[100px]">
                    {firstName}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">Student</span>
                </div>
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Profile Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 animate-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-neutral-100">
                    <p className="text-xs font-bold text-neutral-900 truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-neutral-500 truncate">{currentUser.email}</p>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSection("diplomas");
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <Award className="w-3.5 h-3.5 text-[#5B67E2]" />
                      <span>My Diplomas</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenJargonModal();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                      <span>Jargon Buster</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenCoach();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                      <span>DIGIHUB AI Tutor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStreakModalOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <Flame className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Study Streak (4 Days)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onOpenQuickHub();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Settings &amp; Quick Hub</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleExportData();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-100 text-neutral-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{isExporting ? "Exporting..." : "Export Transcript (.json)"}</span>
                    </button>
                  </div>
                  <div className="pt-1 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-2"
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

      {/* Streak Details Modal */}
      {streakModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-neutral-200 max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Study Streak</h4>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                    PRO Learner Status
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStreakModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-2">
              <span className="text-4xl font-extrabold text-neutral-900 tracking-tight">4 Days</span>
              <p className="text-xs text-neutral-500 mt-1">
                You’ve completed daily lessons 4 days in a row! 3 more days to earn the Weekly Champion diploma seal.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-end">
              <button
                type="button"
                onClick={() => setStreakModalOpen(false)}
                className="px-4 py-2 bg-[#5B67E2] hover:bg-indigo-600 text-white text-xs font-bold rounded-xl transition"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature & Page Explorer Modal */}
      <DigihubMenuModal
        isOpen={isMenuModalOpen}
        onClose={handleCloseMenu}
        onSelectSection={(tab) => {
          onSelectSection(tab);
          handleCloseMenu();
        }}
        onOpenJargonModal={() => {
          handleCloseMenu();
          onOpenJargonModal();
        }}
        onOpenCoach={() => {
          handleCloseMenu();
          onOpenCoach();
        }}
        onOpenQuickHub={() => {
          handleCloseMenu();
          onOpenQuickHub();
        }}
        onOpenExportData={() => {
          handleCloseMenu();
          handleExportData();
        }}
        coursesCount={courses.length}
        certificatesCount={certificates.length}
      />
    </>
  );
}
