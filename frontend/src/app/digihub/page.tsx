"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Code2,
  Shield,
  Award,
  Video,
  Flame,
  Zap,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserCheck,
  Star,
  ExternalLink,
  Sparkles,
  Search,
  Lock,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import {
  LEARNING_TRACKS,
  INITIAL_MENTORS,
  getAllLessons,
  getLearnerProgress,
  getBookedSessions,
  saveLearnerProgress,
  Mentor,
  MentorshipSession,
  LearnerProgress,
  Lesson,
} from "@/lib/lmsStore";
import { MentorBookingModal } from "@/components/digihub/MentorBookingModal";
import { CertificateModal } from "@/components/digihub/CertificateModal";

export default function DIGIHubPage() {
  const [activeTab, setActiveTab] = useState<"tracks" | "mentorship" | "achievements">("tracks");
  const [progress, setProgress] = useState<LearnerProgress>(() => getLearnerProgress());
  const [sessions, setSessions] = useState<MentorshipSession[]>(() => getBookedSessions());
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<"all" | "coding" | "cybersecurity">("all");

  const allLessons = getAllLessons();

  // Load latest state and listen for updates
  useEffect(() => {
    setProgress(getLearnerProgress());
    setSessions(getBookedSessions());

    const handleProgressUpdate = () => setProgress(getLearnerProgress());
    const handleSessionsUpdate = () => setSessions(getBookedSessions());

    window.addEventListener("digihub_progress_updated", handleProgressUpdate);
    window.addEventListener("digihub_sessions_updated", handleSessionsUpdate);

    return () => {
      window.removeEventListener("digihub_progress_updated", handleProgressUpdate);
      window.removeEventListener("digihub_sessions_updated", handleSessionsUpdate);
    };
  }, []);

  const totalLessonsCount = allLessons.length;
  const completedCount = progress.completedLessonIds.length;
  const overallPercentage = Math.round((completedCount / totalLessonsCount) * 100) || 0;
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white pt-24 pb-20">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-emerald-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 p-6 md:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                DIGIHub Self-Teaching & 1-on-1 Mentorship Platform
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Learn to Code & <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
                  Defend the Digital Realm.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Step-by-step interactive lessons with real-time in-browser code sandboxes and threat simulations. Stuck or want career guidance? Book live 1-on-1 mentorship with industry pros.
              </p>
            </div>

            {/* Gamification / Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                  <Zap className="w-4 h-4" />
                  XP Earned
                </div>
                <div className="text-2xl font-bold text-white mt-1">{progress.xp}</div>
                <div className="text-[10px] text-slate-400">Total Points</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold">
                  <Flame className="w-4 h-4" />
                  Day Streak
                </div>
                <div className="text-2xl font-bold text-white mt-1">{progress.streakDays}</div>
                <div className="text-[10px] text-slate-400">Days Active</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold">
                  <BookOpen className="w-4 h-4" />
                  Progress
                </div>
                <div className="text-2xl font-bold text-white mt-1">
                  {completedCount}/{totalLessonsCount}
                </div>
                <div className="text-[10px] text-slate-400">{overallPercentage}% Completed</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <Award className="w-4 h-4" />
                  Certificate
                </div>
                {isEligibleForCertificate ? (
                  <button
                    onClick={() => setIsCertificateOpen(true)}
                    className="mt-1 px-2.5 py-1 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg transition text-center"
                  >
                    View & Print
                  </button>
                ) : (
                  <div className="text-xs text-slate-400 mt-1">
                    {4 - completedCount} more needed
                  </div>
                )}
                <div className="text-[10px] text-slate-400">Verified Credential</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Overall Academy Completion</span>
              <span className="font-semibold text-slate-200">{overallPercentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 mt-10 pb-3 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("tracks")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === "tracks"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Learning Tracks
            </button>

            <button
              onClick={() => setActiveTab("mentorship")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === "mentorship"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Video className="w-4 h-4" />
              1-on-1 Mentorship
              {sessions.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                  {sessions.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("achievements")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                activeTab === "achievements"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              <Award className="w-4 h-4" />
              Achievements
            </button>
          </div>

          {activeTab === "tracks" && (
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setSelectedTrackFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedTrackFilter === "all" ? "bg-slate-800 text-white font-medium" : "text-slate-400"
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setSelectedTrackFilter("coding")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedTrackFilter === "coding" ? "bg-blue-600/30 text-blue-300 font-medium" : "text-slate-400"
                }`}
              >
                Coding
              </button>
              <button
                onClick={() => setSelectedTrackFilter("cybersecurity")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedTrackFilter === "cybersecurity" ? "bg-emerald-600/30 text-emerald-300 font-medium" : "text-slate-400"
                }`}
              >
                Cybersecurity
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: LEARNING TRACKS */}
        {activeTab === "tracks" && (
          <div className="mt-8 space-y-12">
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
                  className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm"
                >
                  {/* Track Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                          track.id === "coding"
                            ? "bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/30"
                            : "bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/30"
                        }`}
                      >
                        {track.id === "coding" ? <Code2 className="w-7 h-7" /> : <Shield className="w-7 h-7" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold uppercase px-2.5 py-0.5 rounded-full ${
                              track.id === "coding"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            }`}
                          >
                            {track.badge}
                          </span>
                          <span className="text-xs text-slate-400">• {trackLessons.length} Modules</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mt-1">{track.title}</h2>
                        <p className="text-sm text-slate-400 mt-1 max-w-2xl">{track.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-950/80 px-4 py-3 rounded-2xl border border-slate-800 shrink-0">
                      <div>
                        <div className="text-xs text-slate-400">Track Progress</div>
                        <div className="text-lg font-bold text-white">
                          {trackCompletedCount} / {trackLessons.length} Lessons
                        </div>
                      </div>
                      <div className="w-12 h-12 relative flex items-center justify-center">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-800"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className={track.id === "coding" ? "text-blue-500" : "text-emerald-500"}
                            strokeDasharray={`${trackPercent}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-[11px] font-bold text-white">{trackPercent}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Lessons Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                    {trackLessons.map((lesson) => {
                      const isCompleted = progress.completedLessonIds.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className={`relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                            isCompleted
                              ? "bg-slate-900/90 border-slate-700/80 hover:border-slate-600 shadow-md"
                              : "bg-slate-950/80 border-slate-800/90 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs mb-3">
                              <span className="font-mono text-slate-400">
                                Module 0{lesson.moduleNumber}
                              </span>
                              {isCompleted ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Completed
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                  <Clock className="w-3 h-3" />
                                  {lesson.durationMinutes} mins
                                </span>
                              )}
                            </div>

                            <h3 className="text-base font-bold text-white line-clamp-1">{lesson.title}</h3>
                            <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                              {lesson.summary}
                            </p>
                          </div>

                          <div className="pt-5 mt-4 border-t border-slate-800/70 flex items-center justify-between">
                            <span className="text-xs font-medium text-amber-300 flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              +{lesson.xpAward} XP
                            </span>

                            <Link
                              href={`/digihub/lesson/${lesson.id}`}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                                isCompleted
                                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
                              }`}
                            >
                              {isCompleted ? "Review" : "Start Lab"}
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
          <div className="mt-8 space-y-10">
            {/* My Active Bookings Section */}
            {sessions.length > 0 && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-xl font-bold text-white">Your Scheduled Sessions</h2>
                  </div>
                  <span className="text-xs text-slate-400">
                    {sessions.length} upcoming or past appointment(s)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {sessions.map((sess) => (
                    <div
                      key={sess.id}
                      className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={sess.mentorAvatar}
                            alt={sess.mentorName}
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/20"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-white">{sess.mentorName}</h4>
                            <p className="text-xs text-slate-400">{sess.mentorTitle}</p>
                            <span className="text-[11px] text-blue-400 font-medium capitalize mt-0.5 inline-block">
                              Focus: {sess.trackTopic === "coding" ? "Web & Coding" : "Cyber Defense"}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            sess.status === "confirmed"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : sess.status === "completed"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "bg-red-500/20 text-red-400 border border-red-500/30"
                          }`}
                        >
                          {sess.status}
                        </span>
                      </div>

                      <div className="bg-slate-900/80 p-3 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400">Date:</span>
                          <span className="font-medium">{sess.date}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400">Time:</span>
                          <span className="font-medium">{sess.timeSlot}</span>
                        </div>
                        {sess.notes && (
                          <div className="pt-1 text-slate-400 italic text-[11px]">
                            &ldquo;{sess.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      <a
                        href={sess.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-md shadow-blue-600/20"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Encrypted Video Call
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mentors Directory */}
            <div>
              <div className="max-w-2xl mb-6">
                <h2 className="text-2xl font-bold text-white">Meet Our Expert Mentors</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Connect 1-on-1 with industry practitioners who review your code, troubleshoot roadblocks, and guide your tech career in Ghana and beyond.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {INITIAL_MENTORS.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition"
                  >
                    <div>
                      <div className="relative mb-4">
                        <img
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="w-full h-44 rounded-2xl object-cover shadow-inner"
                        />
                        <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-amber-400 flex items-center gap-1 border border-slate-800">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {mentor.rating}
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-white">{mentor.name}</h3>
                      <p className="text-xs text-blue-400 font-medium">{mentor.title}</p>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {mentor.bio}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {(mentor.specialties || [mentor.specialty]).map((spec: string) => (
                          <span
                            key={spec}
                            className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-medium text-slate-300"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => handleOpenBooking(mentor)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition shadow-md shadow-blue-600/20"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        Book 1-on-1 Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACHIEVEMENTS & CERTIFICATE */}
        {activeTab === "achievements" && (
          <div className="mt-8 space-y-8">
            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-white">Your Milestones & Badges</h2>
              <p className="text-sm text-slate-400 mt-1">
                Collect badges as you code real HTML components and neutralize cyber threats.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div
                  className={`p-5 rounded-2xl border ${
                    progress.xp >= 100
                      ? "bg-blue-600/10 border-blue-500/40 text-blue-200"
                      : "bg-slate-950/50 border-slate-800/80 text-slate-500"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                    <Code2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-sm text-white">First Line of Code</h4>
                  <p className="text-xs text-slate-400 mt-1">Complete your first interactive sandbox lesson.</p>
                  <div className="mt-3 text-[11px] font-semibold">
                    {progress.xp >= 100 ? "✓ Unlocked" : "Locked (Earn 100 XP)"}
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    progress.completedLessonIds.some((id) => id.startsWith("cyber-"))
                      ? "bg-emerald-600/10 border-emerald-500/40 text-emerald-200"
                      : "bg-slate-950/50 border-slate-800/80 text-slate-500"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-3">
                    <Shield className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Cyber Sentinel</h4>
                  <p className="text-xs text-slate-400 mt-1">Unmask a deceptive phishing attempt or crack risk.</p>
                  <div className="mt-3 text-[11px] font-semibold">
                    {progress.completedLessonIds.some((id) => id.startsWith("cyber-"))
                      ? "✓ Unlocked"
                      : "Locked (Finish a Cyber Lab)"}
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    sessions.length > 0
                      ? "bg-indigo-600/10 border-indigo-500/40 text-indigo-200"
                      : "bg-slate-950/50 border-slate-800/80 text-slate-500"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
                    <Video className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Mentorship Seeker</h4>
                  <p className="text-xs text-slate-400 mt-1">Schedule your first 1-on-1 hands-on session.</p>
                  <div className="mt-3 text-[11px] font-semibold">
                    {sessions.length > 0 ? "✓ Unlocked" : "Locked (Book a session)"}
                  </div>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    isEligibleForCertificate
                      ? "bg-amber-600/10 border-amber-500/40 text-amber-200"
                      : "bg-slate-950/50 border-slate-800/80 text-slate-500"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-3">
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-sm text-white">DIGIHub Graduate</h4>
                  <p className="text-xs text-slate-400 mt-1">Complete at least 4 modules to earn your diploma.</p>
                  <div className="mt-3 text-[11px] font-semibold">
                    {isEligibleForCertificate ? "✓ Unlocked" : `${completedCount}/4 Completed`}
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Preview Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950/50 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Verified Credential
                </span>
                <h3 className="text-2xl font-bold text-white">DIGIHub Academy Diploma</h3>
                <p className="text-sm text-slate-400 max-w-xl">
                  {isEligibleForCertificate
                    ? "Congratulations! You have completed sufficient modules to generate your official, printable Digiconnect Ghana certificate."
                    : `Complete at least 4 interactive lessons (currently ${completedCount}/4) to unlock your verified credential.`}
                </p>
              </div>

              <button
                onClick={() => setIsCertificateOpen(true)}
                disabled={!isEligibleForCertificate}
                className="px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:from-amber-400 hover:to-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 transition"
              >
                <Award className="w-4 h-4" />
                {isEligibleForCertificate ? "Generate Certificate" : "Locked (Complete 4 Labs)"}
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
        onBooked={(newSess) => {
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
