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
  Target,
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
  syncLMSWithBackendServer,
} from "@/lib/lmsStore";
import { MentorBookingModal } from "@/components/digihub/MentorBookingModal";
import { CertificateModal } from "@/components/digihub/CertificateModal";
import { CourseDetailModal } from "@/components/digihub/CourseDetailModal";
import { CourseraLandingPage } from "@/components/digihub/CourseraLandingPage";
import { CourseraAuthModal } from "@/components/digihub/CourseraAuthModal";
import { OnboardingWizard } from "@/components/digihub/OnboardingWizard";
import { CourseraDashboard } from "@/components/digihub/CourseraDashboard";

export default function DIGIHubPage() {
  const [activeTab, setActiveTab] = useState<"my-learning" | "catalog" | "certificates" | "mentorship">("my-learning");
  const [progress, setProgress] = useState<LearnerProgress>(() => getLearnerProgress());
  const [sessions, setSessions] = useState<MentorshipSession[]>(() => getBookedSessions());
  const [currentUser, setCurrentUser] = useState<LMSUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup" | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [viewLandingMode, setViewLandingMode] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<string>("Checking cloud sync...");
  const [isSyncing, setIsSyncing] = useState(false);

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

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setCloudSyncStatus("Synchronizing with DIGIHub Cloud Engine...");
    try {
      const res = await syncLMSWithBackendServer();
      setCloudSyncStatus(res.message);
      syncData();
    } catch {
      setCloudSyncStatus("Working in offline mode (local cache active)");
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncData();
    setAuthChecked(true);

    // Run non-blocking background sync with backend server
    syncLMSWithBackendServer()
      .then((res) => {
        setCloudSyncStatus(res.message);
        syncData();
      })
      .catch(() => {
        setCloudSyncStatus("Local cache active (offline ready)");
      });

    const handleProgressUpdate = () => syncData();
    const handleSessionsUpdate = () => syncData();
    const handleAuthChange = () => syncData();
    const handleEnrollmentUpdate = () => syncData();
    const handleCertsUpdate = () => syncData();
    const handleCloudSynced = (e: Event) => {
      syncData();
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.message) {
        setCloudSyncStatus(customEvent.detail.message);
      }
    };

    window.addEventListener("digihub_progress_updated", handleProgressUpdate);
    window.addEventListener("digihub_sessions_updated", handleSessionsUpdate);
    window.addEventListener("digihub_auth_changed", handleAuthChange);
    window.addEventListener("digihub_enrollment_updated", handleEnrollmentUpdate);
    window.addEventListener("digihub_certificates_updated", handleCertsUpdate);
    window.addEventListener("digihub_cloud_synced", handleCloudSynced);

    return () => {
      window.removeEventListener("digihub_progress_updated", handleProgressUpdate);
      window.removeEventListener("digihub_sessions_updated", handleSessionsUpdate);
      window.removeEventListener("digihub_auth_changed", handleAuthChange);
      window.removeEventListener("digihub_enrollment_updated", handleEnrollmentUpdate);
      window.removeEventListener("digihub_certificates_updated", handleCertsUpdate);
      window.removeEventListener("digihub_cloud_synced", handleCloudSynced);
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
    if (!currentUser) {
      setAuthModalMode("signup");
      return;
    }
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

  // 1. If active user is undergoing the 4-Step Onboarding Questionnaire (Screenshots 3, 4, 5)
  if (currentUser && showOnboarding) {
    return (
      <OnboardingWizard
        currentUser={currentUser}
        onComplete={() => {
          setShowOnboarding(false);
          syncData();
          setActiveTab("my-learning");
        }}
        onExit={() => {
          setShowOnboarding(false);
          syncData();
        }}
      />
    );
  }

  // 2. If visitor is not logged in OR logged-in user wants to view the public Coursera landing (Screenshot 1)
  if (!currentUser || viewLandingMode) {
    return (
      <>
        {currentUser && viewLandingMode && (
          <div className="bg-[#0056D2] text-white px-3 sm:px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-semibold sticky top-0 z-50 shadow-sm">
            <span className="truncate">Viewing Public Portal as {currentUser.name}</span>
            <button
              onClick={() => setViewLandingMode(false)}
              className="px-3 py-1 bg-white text-[#0056D2] rounded-lg font-bold hover:bg-neutral-100 transition self-start sm:self-auto shrink-0"
            >
              Back to My Dashboard →
            </button>
          </div>
        )}

        <CourseraLandingPage
          courses={courses}
          onOpenAuth={(mode) => setAuthModalMode(mode || "signup")}
          onOpenCourseModal={(course) => handleOpenCourseModal(course)}
        />

        {/* Coursera Login / Signup Modal (Screenshot 2) */}
        <CourseraAuthModal
          isOpen={authModalMode !== null}
          defaultMode={authModalMode || "signup"}
          onClose={() => setAuthModalMode(null)}
          onAuthenticated={(user, isNewRegistration) => {
            setCurrentUser(user);
            syncData();
            setAuthModalMode(null);
            setViewLandingMode(false);
            if (isNewRegistration || !user.onboardingCompleted) {
              setShowOnboarding(true);
            }
          }}
        />

        {/* Course Syllabus Preview Modal */}
        <CourseDetailModal
          course={selectedCourseForModal}
          isOpen={isCourseModalOpen}
          onClose={() => setIsCourseModalOpen(false)}
          isEnrolled={selectedCourseForModal ? isEnrolledInCourse(selectedCourseForModal.id, currentUser) : false}
          onEnroll={(courseId) => {
            if (!currentUser) {
              setIsCourseModalOpen(false);
              setAuthModalMode("signup");
            } else {
              handleEnroll(courseId);
              setIsCourseModalOpen(false);
            }
          }}
          completedLessonIds={progress.completedLessonIds}
        />
      </>
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
    <>
      {enrollToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-neutral-700 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{enrollToast}</span>
        </div>
      )}

      <CourseraDashboard
        currentUser={currentUser}
        courses={courses}
        progress={progress}
        certificates={studentCerts}
        onSignOut={() => {
          signOutLMS();
          setCurrentUser(null);
        }}
        onOpenCourseModal={handleOpenCourseModal}
        onOpenCertificateModal={(cert) => {
          setSelectedCertificate(cert || null);
          setIsCertificateOpen(true);
        }}
        onRetakeOnboarding={() => setShowOnboarding(true)}
        onViewPublicLanding={() => setViewLandingMode(true)}
      />

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
    </>
  );
}
