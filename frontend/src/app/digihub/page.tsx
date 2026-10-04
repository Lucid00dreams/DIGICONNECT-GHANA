"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Code2,
  Shield,
  Award,
  Video,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  Star,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Calendar,
  FileCheck,
  LogOut,
  User,
  Search,
  Filter,
  Sparkles,
  Check,
  Laptop,
  FileCode,
  Lock,
  Layers,
  AlertCircle,
  Download,
  Info,
  ChevronDown,
  Printer,
  Compass,
} from "lucide-react";
import {
  getAllCourses,
  getCourseById,
  getEnrolledCourses,
  isEnrolledInCourse,
  enrollInCourse,
  unenrollFromCourse,
  getCourseProgress,
  requestCourseCertificate,
  getCertificatesForStudent,
  getCertificateForCourse,
  getAllCertificates,
  getCertificateSettings,
  INITIAL_MENTORS,
  getAllLessons,
  getLearnerProgress,
  getBookedSessions,
  saveLearnerProgress,
  getActiveUser,
  signOutLMS,
  Mentor,
  MentorshipSession,
  LearnerProgress,
  Lesson,
  LMSUser,
  Course,
  CertificateRecord,
} from "@/lib/lmsStore";
import { MentorBookingModal } from "@/components/digihub/MentorBookingModal";
import { CertificateModal } from "@/components/digihub/CertificateModal";
import { CourseDetailModal } from "@/components/digihub/CourseDetailModal";
import { AuthGate } from "@/components/digihub/AuthGate";

export default function DIGIHubPage() {
  const [activeTab, setActiveTab] = useState<"my-learning" | "catalog" | "certificates" | "mentorship">("my-learning");
  const [progress, setProgress] = useState<LearnerProgress>(() => getLearnerProgress());
  const [sessions, setSessions] = useState<MentorshipSession[]>(() => getBookedSessions());
  const [currentUser, setCurrentUser] = useState<LMSUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Course discovery & enrollment state
  const [courses, setCourses] = useState<Course[]>(() => getAllCourses());
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<string>("all");
  const [catalogSearchQuery, setCatalogSearchQuery] = useState("");
  const [enrollToast, setEnrollToast] = useState<string | null>(null);

  // Mentorship state
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Certificate modal state
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateRecord | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  const allLessons = getAllLessons();

  const syncData = () => {
    const user = getActiveUser();
    setCurrentUser(user);
    setProgress(getLearnerProgress());
    setSessions(getBookedSessions());
    setCourses(getAllCourses());
  };

  useEffect(() => {
    syncData();
    setAuthChecked(true);

    const handleProgressUpdate = () => syncData();
    const handleSessionsUpdate = () => syncData();
    const handleAuthChange = () => syncData();
    const handleEnrollmentUpdate = () => syncData();
    const handleCertsUpdate = () => syncData();

    window.addEventListener("digihub_progress_updated", handleProgressUpdate);
    window.addEventListener("digihub_sessions_updated", handleSessionsUpdate);
    window.addEventListener("digihub_auth_changed", handleAuthChange);
    window.addEventListener("digihub_enrollment_updated", handleEnrollmentUpdate);
    window.addEventListener("digihub_certificates_updated", handleCertsUpdate);

    return () => {
      window.removeEventListener("digihub_progress_updated", handleProgressUpdate);
      window.removeEventListener("digihub_sessions_updated", handleSessionsUpdate);
      window.removeEventListener("digihub_auth_changed", handleAuthChange);
      window.removeEventListener("digihub_enrollment_updated", handleEnrollmentUpdate);
      window.removeEventListener("digihub_certificates_updated", handleCertsUpdate);
    };
  }, []);

  const enrolledCourses = getEnrolledCourses(currentUser);
  const studentCerts = currentUser ? getCertificatesForStudent(currentUser.id) : [];

  // Overall metric computations
  const totalLessonsCount = allLessons.length;
  const completedCount = progress.completedLessonIds.length;
  const completionPercentage = Math.round((completedCount / totalLessonsCount) * 100) || 0;

  const triggerToast = (msg: string) => {
    setEnrollToast(msg);
    setTimeout(() => setEnrollToast(null), 4000);
  };

  const handleEnroll = (courseId: string) => {
    const success = enrollInCourse(courseId, currentUser);
    if (success) {
      const course = getCourseById(courseId);
      triggerToast(`Enrolled successfully in "${course?.title || courseId}"!`);
      syncData();
      setActiveTab("my-learning");
    }
  };

  const handleUnenroll = (courseId: string, courseTitle: string) => {
    if (window.confirm(`Are you sure you want to unenroll from "${courseTitle}"? Your completed module history will be preserved.`)) {
      unenrollFromCourse(courseId, currentUser);
      triggerToast(`Unenrolled from "${courseTitle}"`);
      syncData();
    }
  };

  const handleOpenCourseModal = (course: Course) => {
    setSelectedCourseForModal(course);
    setIsCourseModalOpen(true);
  };

  const handleOpenCertificate = (cert: CertificateRecord) => {
    setSelectedCertificate(cert);
    setIsCertificateOpen(true);
  };

  const handleOpenGenericCertificate = () => {
    setSelectedCertificate(null);
    setIsCertificateOpen(true);
  };

  const handleOpenBooking = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsBookingOpen(true);
  };

  const handleUpdateStudentName = (newName: string) => {
    const updated = { ...progress, studentName: newName };
    saveLearnerProgress(updated);
    setProgress(updated);
  };

  // If user is not yet logged in, render the AuthGate
  if (authChecked && !currentUser) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthGate onAuthenticated={(user) => setCurrentUser(user)} />
        </div>
      </div>
    );
  }

  // Filter courses for catalog
  const filteredCatalogCourses = courses.filter((c) => {
    const matchesCategory = catalogCategory === "all" || c.category === catalogCategory;
    const q = catalogSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.skillsGained.some((s) => s.toLowerCase().includes(q)) ||
      c.instructorName.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pt-20 sm:pt-24 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Floating Toast Notification */}
        {enrollToast && (
          <div className="fixed top-20 right-4 sm:right-8 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-neutral-700 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{enrollToast}</span>
          </div>
        )}

        {/* Header Section */}
        <section className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 p-4 sm:p-8 lg:p-10 shadow-xs mb-6 sm:mb-8">
          {/* Active Student Bar */}
          {currentUser && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4 mb-5 sm:mb-6">
              <div className="flex items-center gap-3 min-w-0">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-2xs shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-blue-light text-brand-blue font-bold text-xs flex items-center justify-center border border-brand-blue/20 shrink-0">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-2 flex-wrap">
                    <span className="truncate">{currentUser.name}</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 shrink-0">
                      {currentUser.provider === "google" ? "Google SSO" : "Student"}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 truncate">{currentUser.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    signOutLMS();
                    setCurrentUser(null);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 text-xs font-semibold transition active:scale-[0.98]"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl space-y-2 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue-light text-brand-blue">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>Coursera-Style Digital Academy • DigiConnect Ghana</span>
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                DIGIHub Learning Center
              </h1>
              <p className="text-xs sm:text-base text-neutral-600 leading-relaxed">
                Browse our university-standard course catalog, enroll in specialized tracks for free, practice inside interactive browser code sandboxes and defensive cyber labs, and earn authorized faculty-signed certificates.
              </p>
            </div>

            {/* Academic Overview Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 bg-neutral-50 p-3 sm:p-4 rounded-2xl border border-neutral-200/80">
              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                <div className="text-[11px] sm:text-xs font-medium text-neutral-500">Enrolled Courses</div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5 sm:mt-1">
                  {enrolledCourses.length} <span className="text-xs font-normal text-neutral-500">active</span>
                </div>
                <div className="text-[11px] text-brand-blue font-medium mt-0.5">
                  {completedCount} of {totalLessonsCount} modules done
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                <div className="text-[11px] sm:text-xs font-medium text-neutral-500">Verified Credentials</div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-0.5 sm:mt-1">
                  {studentCerts.filter((c) => c.status === "approved").length}
                </div>
                <div className="text-[11px] text-neutral-500 mt-0.5">
                  {studentCerts.filter((c) => c.status === "pending_approval").length} awaiting sign-off
                </div>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs sm:col-span-2 lg:col-span-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] sm:text-xs font-medium text-neutral-500">Mentorship Sessions</div>
                  <div className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5 sm:mt-1">
                    {sessions.length}
                  </div>
                </div>
                <div className="text-[11px] text-brand-blue font-semibold mt-1">1-on-1 Faculty Coaching</div>
              </div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-neutral-100">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span>Curriculum Mastery Progress</span>
              <span className="font-semibold text-neutral-700">{completionPercentage}% Completed</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-blue rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </section>

        {/* Top Coursera-Like Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 sm:pb-4 mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1 shrink-0">
            <button
              onClick={() => setActiveTab("my-learning")}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                activeTab === "my-learning"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>My Learning</span>
              {enrolledCourses.length > 0 && (
                <span
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 ${
                    activeTab === "my-learning" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {enrolledCourses.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("catalog")}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                activeTab === "catalog"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>
                <span className="sm:hidden">Courses</span>
                <span className="hidden sm:inline">Explore Courses</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("certificates")}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                activeTab === "certificates"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>
                <span className="sm:hidden">Certificates</span>
                <span className="hidden sm:inline">Certificates & Credentials</span>
              </span>
              {studentCerts.length > 0 && (
                <span
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 ${
                    activeTab === "certificates" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {studentCerts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("mentorship")}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                activeTab === "mentorship"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>
                <span className="sm:hidden">Mentorship</span>
                <span className="hidden sm:inline">1-on-1 Mentorship</span>
              </span>
              {sessions.length > 0 && (
                <span
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 ${
                    activeTab === "mentorship" ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {sessions.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ─── TAB 1: MY LEARNING (ENROLLED COURSES) ────────────────── */}
        {activeTab === "my-learning" && (
          <div className="space-y-6">
            {enrolledCourses.length === 0 ? (
              <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center mx-auto">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  Start Your Learning Journey
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
                  You are not currently enrolled in any courses. Browse our Coursera-style curriculum covering Basic Web Coding, Cybersecurity Defense, Digital Workplace Productivity, and Python Automation.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab("catalog")}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Browse Course Catalog</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => {
                  const courseProgress = getCourseProgress(course.id, progress.completedLessonIds);
                  const nextLesson =
                    course.lessons.find((l) => !progress.completedLessonIds.includes(l.id)) || course.lessons[0];
                  const cert = getCertificateForCourse(currentUser?.id || "", course.id);

                  return (
                    <div
                      key={course.id}
                      className="bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition space-y-5"
                    >
                      <div className="space-y-4">
                        {/* Course Category & Level */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-blue-light text-brand-blue border border-brand-blue/20">
                            {course.category}
                          </span>
                          <span className="text-xs text-neutral-500 font-medium">
                            {course.durationWeeks} Weeks • {course.lessons.length} Modules
                          </span>
                        </div>

                        {/* Title & Instructor */}
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-neutral-900">{course.title}</h3>
                          <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                            {course.headline}
                          </p>

                          <div className="flex items-center gap-2.5 mt-3">
                            <img
                              src={course.instructorAvatar}
                              alt={course.instructorName}
                              className="w-7 h-7 rounded-lg object-cover border border-neutral-200 shrink-0"
                            />
                            <span className="text-xs text-neutral-600 font-medium">
                              Taught by {course.instructorName} ({course.organization})
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                            <span className="text-neutral-700">
                              {courseProgress.completed} of {courseProgress.total} Modules Completed
                            </span>
                            <span className="text-brand-blue font-bold">{courseProgress.percentage}%</span>
                          </div>
                          <div className="w-full h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                courseProgress.isCompleted ? "bg-emerald-500" : "bg-brand-blue"
                              }`}
                              style={{ width: `${courseProgress.percentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Course Completion Status Card */}
                        {courseProgress.isCompleted ? (
                          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-2 text-emerald-900">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="font-semibold">Course 100% Completed! 🎉</span>
                            </div>
                            {cert?.status === "approved" ? (
                              <button
                                onClick={() => handleOpenCertificate(cert)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition shadow-2xs inline-flex items-center gap-1 text-[11px]"
                              >
                                <Award className="w-3.5 h-3.5" />
                                <span>View Signed Certificate</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  // Request certificate if not generated yet
                                  const c = requestCourseCertificate(course.id, currentUser);
                                  handleOpenCertificate(c);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold hover:bg-amber-700 transition shadow-2xs inline-flex items-center gap-1 text-[11px]"
                              >
                                <Clock className="w-3.5 h-3.5" />
                                <span>Awaiting Faculty Sign-off</span>
                              </button>
                            )}
                          </div>
                        ) : nextLesson ? (
                          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
                            <div className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                              Up Next in Module 0{nextLesson.moduleNumber}
                            </div>
                            <div className="font-bold text-neutral-900 mt-0.5 truncate">{nextLesson.title}</div>
                            <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{nextLesson.durationMinutes} mins • {nextLesson.level} Level</span>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenCourseModal(course)}
                            className="px-3 py-2 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-semibold text-xs transition"
                          >
                            View Syllabus
                          </button>
                          <button
                            onClick={() => handleUnenroll(course.id, course.title)}
                            className="px-2.5 py-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 text-xs font-medium transition"
                            title="Unenroll from course"
                          >
                            Unenroll
                          </button>
                        </div>

                        {nextLesson && (
                          <Link
                            href={`/digihub/lesson/${nextLesson.id}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs active:scale-[0.98]"
                          >
                            <span>{courseProgress.isCompleted ? "Review Lab" : "Resume Course"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 2: EXPLORE COURSES (COURSERA-STYLE CATALOG) ─────── */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            {/* Search & Filter Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search courses, skills (HTML, Cybersecurity, Spreadsheets, Python)..."
                    value={catalogSearchQuery}
                    onChange={(e) => setCatalogSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:ring-2 focus:ring-brand-blue focus:outline-none bg-neutral-50/50"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                  {[
                    { id: "all", label: "All Specializations" },
                    { id: "Coding & Web", label: "Coding & Web" },
                    { id: "Cybersecurity", label: "Cybersecurity" },
                    { id: "Digital Literacy", label: "Digital Workplace" },
                    { id: "Programming", label: "Python & Automation" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCatalogCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                        catalogCategory === cat.id
                          ? "bg-brand-blue text-white shadow-2xs"
                          : "bg-neutral-100 text-neutral-600 hover:text-neutral-900"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredCatalogCourses.map((course) => {
                const enrolled = isEnrolledInCourse(course.id, currentUser);
                const courseProg = getCourseProgress(course.id, progress.completedLessonIds);

                return (
                  <div
                    key={course.id}
                    className="bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition space-y-5"
                  >
                    <div className="space-y-3.5">
                      {/* Course Badge & Rating */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-blue-light text-brand-blue border border-brand-blue/20">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1 font-semibold text-neutral-700">
                          <span className="text-amber-500 font-bold">★ {course.rating}</span>
                          <span className="text-neutral-400">({course.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Course Title & Headline */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900">{course.title}</h3>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-2 leading-relaxed">
                          {course.headline}
                        </p>
                      </div>

                      {/* Instructor Info */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <img
                          src={course.instructorAvatar}
                          alt={course.instructorName}
                          className="w-8 h-8 rounded-xl object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-neutral-900 truncate">{course.instructorName}</div>
                          <div className="text-[11px] text-neutral-500 truncate">{course.instructorTitle}</div>
                        </div>
                      </div>

                      {/* Key Skills Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {course.skillsGained.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Meta Information */}
                      <div className="pt-2 text-xs text-neutral-500 flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{course.durationWeeks} Weeks (~{course.estimatedHours} hrs)</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Verified Certificate</span>
                        </span>
                        <span>•</span>
                        <span className="capitalize">{course.level} Level</span>
                      </div>
                    </div>

                    {/* Bottom CTA Buttons */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => handleOpenCourseModal(course)}
                        className="text-xs font-semibold text-neutral-700 hover:text-brand-blue transition underline"
                      >
                        Course Details & Syllabus
                      </button>

                      {enrolled ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Enrolled ({courseProg.percentage}%)</span>
                          </span>
                          <button
                            onClick={() => {
                              setActiveTab("my-learning");
                            }}
                            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition"
                          >
                            Go to Course
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs active:scale-[0.98]"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Enroll for Free</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── TAB 3: CERTIFICATES & CREDENTIALS ────────────────────── */}
        {activeTab === "certificates" && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Academic Accreditation
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                    Official DigiConnect Ghana Credentials
                  </h2>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-3xl">
                Upon completing 100% of all required lessons, interactive code sandboxes, and quizzes in an enrolled course, your transcript is submitted to the ConnectHub Academic Board for faculty review. Once approved, your certificate is affixed with the official executive signature and made available for instant download and verification.
              </p>
            </div>

            {/* Enrolled Courses Credential Status List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => {
                const enrolled = isEnrolledInCourse(course.id, currentUser);
                const prog = getCourseProgress(course.id, progress.completedLessonIds);
                const cert = getCertificateForCourse(currentUser?.id || "", course.id);

                return (
                  <div
                    key={course.id}
                    className="bg-white border border-neutral-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700">
                          {course.category}
                        </span>

                        {cert?.status === "approved" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Verified & Signed</span>
                          </span>
                        ) : cert?.status === "pending_approval" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Pending Faculty Sign-off</span>
                          </span>
                        ) : prog.isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>Ready to Claim</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-neutral-400">
                            {prog.completed} of {prog.total} modules done
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-neutral-900">{course.title}</h3>
                      <p className="text-xs text-neutral-500 mt-1">{course.headline}</p>

                      {cert && (
                        <div className="mt-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-1">
                          <div className="flex items-center justify-between text-neutral-600">
                            <span>Credential ID:</span>
                            <span className="font-mono font-bold text-neutral-900">{cert.id}</span>
                          </div>
                          {cert.approvedDate && (
                            <div className="flex items-center justify-between text-neutral-600">
                              <span>Conferred Date:</span>
                              <span className="font-semibold text-neutral-800">{cert.approvedDate}</span>
                            </div>
                          )}
                          {cert.signerName && (
                            <div className="flex items-center justify-between text-neutral-600">
                              <span>Executive Signatory:</span>
                              <span className="font-semibold text-neutral-800">{cert.signerName}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                      <span className="text-xs text-neutral-500">
                        {enrolled ? "Currently Enrolled" : "Not Enrolled"}
                      </span>

                      {cert?.status === "approved" ? (
                        <button
                          onClick={() => handleOpenCertificate(cert)}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition shadow-2xs inline-flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Signed Certificate</span>
                        </button>
                      ) : cert?.status === "pending_approval" ? (
                        <button
                          onClick={() => handleOpenCertificate(cert)}
                          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition shadow-2xs inline-flex items-center gap-1.5"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Preview Status</span>
                        </button>
                      ) : prog.isCompleted ? (
                        <button
                          onClick={() => {
                            const newCert = requestCourseCertificate(course.id, currentUser);
                            handleOpenCertificate(newCert);
                          }}
                          className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs inline-flex items-center gap-1.5"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Request Certificate</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (!enrolled) {
                              handleEnroll(course.id);
                            } else {
                              setActiveTab("my-learning");
                            }
                          }}
                          className="px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 font-semibold text-xs transition"
                        >
                          {enrolled ? "Continue Course" : "Enroll to Earn"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── TAB 4: 1-ON-1 MENTORSHIP ────────────────────────────── */}
        {activeTab === "mentorship" && (
          <div className="space-y-6 sm:space-y-8">
            {/* My Active Bookings Section */}
            {sessions.length > 0 && (
              <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-brand-blue" />
                    <h2 className="text-base sm:text-xl font-bold text-neutral-900">Your Scheduled Sessions</h2>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {sessions.length} appointment(s)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-4 sm:p-5 bg-neutral-50 border border-neutral-200 rounded-xl sm:rounded-2xl flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={sess.mentorAvatar || "/images/testimonials/participant-1.jpg"}
                            alt={sess.mentorName}
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-xs sm:text-sm text-neutral-900 truncate">{sess.mentorName}</h4>
                            <p className="text-[11px] sm:text-xs text-neutral-500 truncate">{sess.mentorTitle}</p>
                            <span className="text-[10px] text-brand-blue font-semibold capitalize mt-0.5 inline-block">
                              Topic: {sess.trackTopic === "coding" ? "Web Coding" : "Cybersecurity"}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
                            sess.status === "confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : sess.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-neutral-200 text-neutral-700"
                          }`}
                        >
                          {sess.status}
                        </span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-neutral-200 text-xs space-y-1">
                        <div className="flex items-center justify-between text-neutral-700">
                          <span className="text-neutral-500">Date:</span>
                          <span className="font-medium">{sess.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-700">
                          <span className="text-neutral-500">Time:</span>
                          <span className="font-medium">{sess.timeSlot}</span>
                        </div>
                        {sess.notes && (
                          <div className="pt-1 text-neutral-600 text-[11px] line-clamp-2">
                            Focus: &ldquo;{sess.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      <a
                        href={sess.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs active:scale-[0.98]"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Meeting Room</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mentors Directory */}
            <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 shadow-xs">
              <div className="max-w-2xl mb-5 sm:mb-6">
                <h2 className="text-lg sm:text-2xl font-bold text-neutral-900">Faculty Mentors</h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                  Schedule individual coaching sessions with Ghanaian engineers and security practitioners to review code and discuss career direction.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {INITIAL_MENTORS.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-neutral-300 transition"
                  >
                    <div>
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-full h-44 sm:h-40 rounded-xl object-cover border border-neutral-200 mb-3"
                      />

                      <h3 className="text-sm sm:text-base font-bold text-neutral-900">{mentor.name}</h3>
                      <p className="text-xs text-brand-blue font-medium">{mentor.title}</p>
                      <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                        {mentor.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3.5">
                        {(mentor.specialties || [mentor.specialty]).map((spec: string) => (
                          <span
                            key={spec}
                            className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-[10px] font-medium text-neutral-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-200">
                      <button
                        onClick={() => handleOpenBooking(mentor)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs active:scale-[0.98]"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Schedule 1-on-1 Session</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course Detail / Syllabus Modal */}
      <CourseDetailModal
        course={selectedCourseForModal}
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
        isEnrolled={selectedCourseForModal ? isEnrolledInCourse(selectedCourseForModal.id, currentUser) : false}
        onEnroll={handleEnroll}
        completedLessonIds={progress.completedLessonIds}
      />

      {/* Booking Modal */}
      <MentorBookingModal
        mentor={selectedMentor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBooked={() => {
          setSessions(getBookedSessions());
        }}
      />

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        certificate={selectedCertificate}
        progress={progress}
        onUpdateName={handleUpdateStudentName}
      />
    </div>
  );
}
