"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Code2,
  Shield,
  CheckCircle2,
  Clock,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import {
  getLessonById,
  getAllLessons,
  markLessonCompleted,
  getLearnerProgress,
  getActiveUser,
  LMSUser,
  Lesson,
} from "@/lib/lmsStore";
import { CodeSandbox } from "@/components/digihub/CodeSandbox";
import { CyberLab } from "@/components/digihub/CyberLab";
import { QuizWidget } from "@/components/digihub/QuizWidget";
import { AuthGate } from "@/components/digihub/AuthGate";

export default function DIGIHubLessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [currentUser, setCurrentUser] = useState<LMSUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activePaneTab, setActivePaneTab] = useState<"content" | "quiz">("content");
  const [mobileActiveView, setMobileActiveView] = useState<"guide" | "lab">("guide");
  const [completionToast, setCompletionToast] = useState(false);

  useEffect(() => {
    const user = getActiveUser();
    setCurrentUser(user);
    setAuthChecked(true);

    if (!lessonId) return;
    const found = getLessonById(lessonId);
    if (found) {
      setLesson(found);
      const progress = getLearnerProgress();
      setIsCompleted(progress.completedLessonIds.includes(found.id));
    }
  }, [lessonId]);

  if (authChecked && !currentUser) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuthGate
            title="Sign in to access this interactive lab"
            subtitle="Please sign in or create your student account to run live code in the sandbox and submit your answers."
            onAuthenticated={(user) => setCurrentUser(user)}
          />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 flex items-center justify-center p-6">
        <div className="text-center max-w-md p-8 bg-white border border-neutral-200 rounded-3xl shadow-xs">
          <BookOpen className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-neutral-900">Module Not Found</h2>
          <p className="text-xs text-neutral-500 mt-2">
            The requested module could not be found or has not been published yet.
          </p>
          <Link
            href="/digihub"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to DIGIHub</span>
          </Link>
        </div>
      </div>
    );
  }

  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleMarkComplete = () => {
    markLessonCompleted(lesson.id, lesson.xpAward);
    setIsCompleted(true);
    setCompletionToast(true);
    setTimeout(() => setCompletionToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col pt-16">
      {/* Top Header */}
      <header className="sticky top-16 z-40 bg-white border-b border-neutral-200 px-3.5 sm:px-6 py-2.5 sm:py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <Link
              href="/digihub"
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition shrink-0"
              title="Return to DIGIHub Overview"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-500 truncate">
                <span className="font-semibold text-brand-blue shrink-0">
                  Mod 0{lesson.moduleNumber}
                </span>
                <span>•</span>
                <span className="truncate">{lesson.moduleTitle}</span>
              </div>
              <h1 className="text-xs sm:text-base font-bold text-neutral-900 truncate">{lesson.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{lesson.durationMinutes} mins</span>
            </div>

            {isCompleted ? (
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden xs:inline">Completed</span>
              </span>
            ) : (
              <button
                onClick={handleMarkComplete}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs shadow-2xs transition active:scale-[0.98]"
              >
                <span>Mark Complete</span>
              </button>
            )}

            {nextLesson && (
              <Link
                href={`/digihub/lesson/${nextLesson.id}`}
                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-xs transition"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Mode Switcher: visible below lg */}
      <div className="lg:hidden bg-white border-b border-neutral-200 px-3.5 py-2">
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setMobileActiveView("guide")}
            className={`flex-1 py-1.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 ${
              mobileActiveView === "guide"
                ? "bg-white text-neutral-900 shadow-2xs font-bold"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guide & Quiz</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileActiveView("lab")}
            className={`flex-1 py-1.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 ${
              mobileActiveView === "lab"
                ? "bg-brand-blue text-white shadow-2xs font-bold"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            {lesson.sandboxConfig ? <Code2 className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
            <span>Interactive Lab</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>
        </div>
      </div>

      {/* Completion Toast Notification */}
      {completionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-neutral-900 text-white font-medium text-xs shadow-xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Module marked as completed!</span>
        </div>
      )}

      {/* Split-Pane Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* LEFT PANE: Theory, Key Takeaways & Quiz */}
        <div
          className={`${
            mobileActiveView === "guide" ? "flex" : "hidden"
          } lg:flex lg:col-span-5 flex-col space-y-4`}
        >
          {/* Sub Navigation */}
          <div className="flex items-center gap-1 p-1 bg-white border border-neutral-200 rounded-2xl shadow-2xs">
            <button
              onClick={() => setActivePaneTab("content")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition ${
                activePaneTab === "content"
                  ? "bg-neutral-100 text-neutral-900 font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Lesson Guide
            </button>
            <button
              onClick={() => setActivePaneTab("quiz")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                activePaneTab === "quiz"
                  ? "bg-neutral-100 text-neutral-900 font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <span>Knowledge Check</span>
              <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-bold flex items-center justify-center">
                {lesson.quiz.length}
              </span>
            </button>
          </div>

          {activePaneTab === "content" ? (
            <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl p-4 sm:p-7 space-y-5 sm:space-y-6 flex-1 shadow-xs">
              {/* Summary card */}
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5 sm:mb-2">
                  <span className="font-semibold text-brand-blue">Module Overview</span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.durationMinutes} mins
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{lesson.summary}</p>
              </div>

              {/* Core Content Markdown renderer */}
              <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {lesson.markdownContent.split("\n\n").map((para, i) => {
                  if (para.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-sm sm:text-base font-bold text-neutral-900 pt-2">
                        {para.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-base sm:text-lg font-bold text-neutral-900 pt-3 border-b border-neutral-100 pb-1">
                        {para.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("- ") || para.startsWith("* ")) {
                    const bullets = para.split("\n");
                    return (
                      <ul key={i} className="list-disc list-inside space-y-1 text-neutral-700 pl-1">
                        {bullets.map((b, bi) => (
                          <li key={bi}>{b.replace(/^[-*]\s+/, "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i}>{para}</p>;
                })}
              </div>

              {/* Key Takeaways */}
              <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-brand-blue-light/40 border border-brand-blue/20 space-y-2.5 sm:space-y-3">
                <h4 className="text-xs font-bold text-brand-blue-dark flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                  <span>Key Takeaways</span>
                </h4>
                <ul className="space-y-2">
                  {lesson.keyTakeaways.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prompts to switch to Quiz or directly jump to Lab on mobile */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="button"
                  onClick={() => setActivePaneTab("quiz")}
                  className="w-full py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  <span>Test Knowledge ({lesson.quiz.length} Questions)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileActiveView("lab");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="lg:hidden w-full py-2.5 rounded-xl bg-brand-blue text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>Open Interactive Lab Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Tab */
            <div className="space-y-3">
              <QuizWidget
                questions={lesson.quiz}
                xpAward={lesson.xpAward}
                onQuizCompleted={(score: number, total: number) => {
                  if (score === total) {
                    handleMarkComplete();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setMobileActiveView("lab");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="lg:hidden w-full py-2.5 rounded-xl bg-brand-blue text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-2xs"
              >
                <span>Jump to Interactive Lab →</span>
              </button>
            </div>
          )}
        </div>

        {/* RIGHT PANE: Interactive Sandbox / Cyber Lab */}
        <div
          className={`${
            mobileActiveView === "lab" ? "flex" : "hidden"
          } lg:flex lg:col-span-7 flex-col space-y-3`}
        >
          {/* Mobile Back Button to Guide */}
          <div className="lg:hidden flex items-center justify-between pb-1">
            <button
              type="button"
              onClick={() => {
                setMobileActiveView("guide");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 text-xs text-brand-blue font-semibold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Lesson Guide</span>
            </button>
            <span className="text-[11px] text-neutral-400">
              Module 0{lesson.moduleNumber} Lab
            </span>
          </div>

          {lesson.sandboxConfig && (
            <CodeSandbox
              config={lesson.sandboxConfig}
              onCodeRun={() => {
                // Handled in sandbox
              }}
            />
          )}

          {lesson.cyberLabConfig && (
            <CyberLab
              config={lesson.cyberLabConfig}
              onLabCompleted={() => {
                handleMarkComplete();
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
