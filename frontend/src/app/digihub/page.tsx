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
} from "lucide-react";
import {
  LEARNING_TRACKS,
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
} from "@/lib/lmsStore";
import { MentorBookingModal } from "@/components/digihub/MentorBookingModal";
import { CertificateModal } from "@/components/digihub/CertificateModal";
import { AuthGate } from "@/components/digihub/AuthGate";

export default function DIGIHubPage() {
  const [activeTab, setActiveTab] = useState<"tracks" | "mentorship" | "certificate">("tracks");
  const [progress, setProgress] = useState<LearnerProgress>(() => getLearnerProgress());
  const [sessions, setSessions] = useState<MentorshipSession[]>(() => getBookedSessions());
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<"all" | "coding" | "cybersecurity">("all");

  const [currentUser, setCurrentUser] = useState<LMSUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const allLessons = getAllLessons();

  useEffect(() => {
    const user = getActiveUser();
    setCurrentUser(user);
    setAuthChecked(true);

    setProgress(getLearnerProgress());
    setSessions(getBookedSessions());

    const handleProgressUpdate = () => setProgress(getLearnerProgress());
    const handleSessionsUpdate = () => setSessions(getBookedSessions());
    const handleAuthChange = () => {
      const u = getActiveUser();
      setCurrentUser(u);
      setProgress(getLearnerProgress());
    };

    window.addEventListener("digihub_progress_updated", handleProgressUpdate);
    window.addEventListener("digihub_sessions_updated", handleSessionsUpdate);
    window.addEventListener("digihub_auth_changed", handleAuthChange);

    return () => {
      window.removeEventListener("digihub_progress_updated", handleProgressUpdate);
      window.removeEventListener("digihub_sessions_updated", handleSessionsUpdate);
      window.removeEventListener("digihub_auth_changed", handleAuthChange);
    };
  }, []);

  const totalLessonsCount = allLessons.length;
  const completedCount = progress.completedLessonIds.length;
  const completionPercentage = Math.round((completedCount / totalLessonsCount) * 100) || 0;
  const isEligibleForCertificate = completedCount >= 4;

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

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <section className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-10 shadow-xs mb-8">
          {/* Active Student Bar */}
          {currentUser && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-5 mb-6">
              <div className="flex items-center gap-3">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-2xs"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-blue-light text-brand-blue font-bold text-xs flex items-center justify-center border border-brand-blue/20">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                    <span>{currentUser.name}</span>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      {currentUser.provider === "google" ? "Google Account" : "Student"}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500">{currentUser.email}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  signOutLMS();
                  setCurrentUser(null);
                }}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 text-xs font-semibold transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-blue-light text-brand-blue">
                <GraduationCap className="w-4 h-4" />
                DigiConnect Ghana Learning Platform
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
                DIGIHub
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Self-paced technical curriculum combined with individual mentorship. Build practical skills in basic web coding and applied cybersecurity defense with in-browser practice labs and personal coaching.
              </p>
            </div>

            {/* Academic Overview Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
              <div className="p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                <div className="text-xs font-medium text-neutral-500">Modules Completed</div>
                <div className="text-2xl font-bold text-neutral-900 mt-1">
                  {completedCount} <span className="text-xs font-normal text-neutral-500">of {totalLessonsCount}</span>
                </div>
                <div className="text-[11px] text-brand-blue font-medium mt-0.5">{completionPercentage}% progress</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs">
                <div className="text-xs font-medium text-neutral-500">Mentorship Sessions</div>
                <div className="text-2xl font-bold text-neutral-900 mt-1">{sessions.length}</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Scheduled calls</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs col-span-2 sm:col-span-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-medium text-neutral-500">Completion Certificate</div>
                  <div className="text-xs font-semibold text-neutral-800 mt-1">
                    {isEligibleForCertificate ? "Ready to view" : `${4 - completedCount} modules left`}
                  </div>
                </div>
                {isEligibleForCertificate ? (
                  <button
                    onClick={() => setIsCertificateOpen(true)}
                    className="mt-2 w-full py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                  >
                    View Certificate
                  </button>
                ) : (
                  <div className="text-[11px] text-neutral-400 mt-1">Unlocks at 4 modules</div>
                )}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span>Overall Curriculum Completion</span>
              <span className="font-semibold text-neutral-700">{completionPercentage}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-blue rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </section>

        {/* Tab Controls */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("tracks")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "tracks"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Curriculum Tracks
            </button>

            <button
              onClick={() => setActiveTab("mentorship")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "mentorship"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <Video className="w-4 h-4" />
              1-on-1 Mentorship
              {sessions.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-bold flex items-center justify-center">
                  {sessions.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("certificate")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "certificate"
                  ? "bg-brand-blue text-white shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <Award className="w-4 h-4" />
              Certificate
            </button>
          </div>

          {activeTab === "tracks" && (
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-neutral-200 text-xs">
              <button
                onClick={() => setSelectedTrackFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  selectedTrackFilter === "all" ? "bg-neutral-100 text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                All Tracks
              </button>
              <button
                onClick={() => setSelectedTrackFilter("coding")}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  selectedTrackFilter === "coding" ? "bg-neutral-100 text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                Basic Coding
              </button>
              <button
                onClick={() => setSelectedTrackFilter("cybersecurity")}
                className={`px-3 py-1.5 rounded-lg transition font-medium ${
                  selectedTrackFilter === "cybersecurity" ? "bg-neutral-100 text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                Cybersecurity
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: CURRICULUM TRACKS */}
        {activeTab === "tracks" && (
          <div className="space-y-8">
            {LEARNING_TRACKS.filter(
              (t) => selectedTrackFilter === "all" || t.id === selectedTrackFilter
            ).map((track) => {
              const trackLessons = allLessons.filter((l) => l.trackId === track.id);
              const trackCompletedCount = trackLessons.filter((l) =>
                progress.completedLessonIds.includes(l.id)
              ).length;
              const trackPercent = Math.round((trackCompletedCount / trackLessons.length) * 100) || 0;

              return (
                <div
                  key={track.id}
                  className="bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-xs"
                >
                  {/* Track Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-blue-light text-brand-blue flex items-center justify-center shrink-0">
                        {track.id === "coding" ? <Code2 className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-neutral-500">
                            {track.badge}
                          </span>
                          <span className="text-xs text-neutral-400">• {trackLessons.length} Modules</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-0.5">{track.title}</h2>
                        <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl leading-relaxed">{track.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-neutral-50 px-4 py-2.5 rounded-2xl border border-neutral-200/80 shrink-0 self-start md:self-auto">
                      <div>
                        <div className="text-[11px] text-neutral-500">Track Progress</div>
                        <div className="text-sm font-bold text-neutral-900">
                          {trackCompletedCount} of {trackLessons.length} Modules ({trackPercent}%)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modules Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                    {trackLessons.map((lesson) => {
                      const isCompleted = progress.completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className="bg-white rounded-2xl p-5 border border-neutral-200 hover:border-brand-blue transition flex flex-col justify-between shadow-2xs"
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs mb-3">
                              <span className="text-neutral-500 font-medium">
                                Module {lesson.moduleNumber}
                              </span>
                              {isCompleted ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Completed
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                                  <Clock className="w-3 h-3" />
                                  {lesson.durationMinutes} mins
                                </span>
                              )}
                            </div>

                            <h3 className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-1">{lesson.title}</h3>
                            <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                              {lesson.summary}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                            <span className="text-xs text-neutral-500 font-medium">
                              Level: {lesson.level}
                            </span>

                            <Link
                              href={`/digihub/lesson/${lesson.id}`}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                                isCompleted
                                  ? "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                                  : "bg-brand-blue hover:bg-brand-blue-dark text-white"
                              }`}
                            >
                              <span>{isCompleted ? "Review Lab" : "Start Lab"}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: 1-ON-1 MENTORSHIP */}
        {activeTab === "mentorship" && (
          <div className="space-y-8">
            {/* My Active Bookings Section */}
            {sessions.length > 0 && (
              <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-brand-blue" />
                    <h2 className="text-lg sm:text-xl font-bold text-neutral-900">Your Scheduled Sessions</h2>
                  </div>
                  <span className="text-xs text-neutral-500">
                    {sessions.length} appointment(s)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={sess.mentorAvatar || "/images/testimonials/participant-1.jpg"}
                            alt={sess.mentorName}
                            className="w-12 h-12 rounded-xl object-cover border border-neutral-200"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-neutral-900">{sess.mentorName}</h4>
                            <p className="text-xs text-neutral-500">{sess.mentorTitle}</p>
                            <span className="text-[11px] text-brand-blue font-semibold capitalize mt-0.5 inline-block">
                              Topic: {sess.trackTopic === "coding" ? "Web Coding" : "Cybersecurity"}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
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
                          <div className="pt-1 text-neutral-600 text-[11px]">
                            Focus: &ldquo;{sess.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      <a
                        href={sess.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs"
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
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs">
              <div className="max-w-2xl mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">Faculty Mentors</h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                  Schedule individual coaching sessions with Ghanaian engineers and security practitioners to review code and discuss career direction.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {INITIAL_MENTORS.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-300 transition"
                  >
                    <div>
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-full h-40 rounded-xl object-cover border border-neutral-200 mb-3"
                      />

                      <h3 className="text-base font-bold text-neutral-900">{mentor.name}</h3>
                      <p className="text-xs text-brand-blue font-medium">{mentor.title}</p>
                      <p className="text-xs text-neutral-600 mt-2 line-clamp-3 leading-relaxed">
                        {mentor.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
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

                    <div className="pt-5 mt-4 border-t border-neutral-200">
                      <button
                        onClick={() => handleOpenBooking(mentor)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs"
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

        {/* TAB 3: CERTIFICATE */}
        {activeTab === "certificate" && (
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Academic Credential
                </span>
                <h3 className="text-2xl font-bold text-neutral-900">Certificate of Completion</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {isEligibleForCertificate
                    ? "You have completed the required curriculum modules. You can view, personalize, and save your official DigiConnect Ghana certificate."
                    : `Complete at least 4 practical modules (currently ${completedCount} of 4) to qualify for your verified certificate of achievement.`}
                </p>
              </div>

              <button
                onClick={() => setIsCertificateOpen(true)}
                disabled={!isEligibleForCertificate}
                className="px-6 py-3 rounded-xl font-semibold text-xs flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white disabled:opacity-40 disabled:cursor-not-allowed transition shadow-2xs shrink-0"
              >
                <Award className="w-4 h-4" />
                <span>{isEligibleForCertificate ? "View Certificate" : "Locked (Complete 4 Modules)"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <MentorBookingModal
        mentor={selectedMentor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBooked={() => {
          setSessions(getBookedSessions());
        }}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        progress={progress}
        onUpdateName={handleUpdateStudentName}
      />
    </div>
  );
}
