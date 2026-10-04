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
  ChevronLeft,
  GraduationCap,
  Sparkles,
  Lightbulb,
  Check,
  Copy,
  Layers,
  Award,
  Terminal,
} from "lucide-react";
import {
  getLessonById,
  getAllLessons,
  markLessonCompleted,
  getLearnerProgress,
  getActiveUser,
  LMSUser,
  Lesson,
  Topic,
} from "@/lib/lmsStore";
import { CodeSandbox } from "@/components/digihub/CodeSandbox";
import { CyberLab } from "@/components/digihub/CyberLab";
import { QuizWidget } from "@/components/digihub/QuizWidget";
import { AuthGate } from "@/components/digihub/AuthGate";

// Utility to completely strip markdown asterisks from any text
function cleanNoAsterisks(text?: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\*/g, "");
}

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
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [completionToast, setCompletionToast] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

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
      setActiveTopicIndex(0);
      setActivePaneTab("content");
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
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const topics: Topic[] = lesson.topics && lesson.topics.length > 0 ? lesson.topics : [];
  const currentTopic = topics[activeTopicIndex] || null;

  // Active lab config: preference for topic lab, fallback to lesson lab
  const activeSandbox = currentTopic?.sandboxConfig || lesson.sandboxConfig;
  const activeCyberLab = currentTopic?.cyberLabConfig || lesson.cyberLabConfig;
  const currentHasLab = !!(activeSandbox || activeCyberLab);

  const handleMarkComplete = () => {
    markLessonCompleted(lesson.id, lesson.xpAward);
    setIsCompleted(true);
    setCompletionToast(true);
    setTimeout(() => setCompletionToast(false), 5000);
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleNextTopic = () => {
    if (activeTopicIndex < topics.length - 1) {
      setActiveTopicIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Reached end of topics -> switch to Knowledge Check quiz
      setActivePaneTab("quiz");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevTopic = () => {
    if (activeTopicIndex > 0) {
      setActiveTopicIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
                <span className="truncate">{cleanNoAsterisks(lesson.moduleTitle)}</span>
              </div>
              <h1 className="text-xs sm:text-base font-bold text-neutral-900 truncate">
                {cleanNoAsterisks(lesson.title)}
              </h1>
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

            {/* NEXT MODULE BUTTON: ALWAYS VISIBLE ON PC AND MOBILE */}
            {nextLesson ? (
              <Link
                href={`/digihub/lesson/${nextLesson.id}`}
                className={`inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs ${
                  isCompleted
                    ? "bg-brand-gold hover:bg-brand-gold-dark text-neutral-900 animate-pulse"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200"
                }`}
                title={`Continue to Next Module: ${nextLesson.title}`}
              >
                <span>Next Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                href="/digihub"
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition"
              >
                <span>All Courses</span>
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
            {activeSandbox ? <Code2 className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
            <span>Interactive Lab</span>
            {currentHasLab && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>
        </div>
      </div>

      {/* Completion Toast Notification with direct Next Button */}
      {completionToast && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 px-4 sm:px-5 py-3.5 rounded-2xl bg-neutral-900 text-white font-medium text-xs shadow-2xl animate-in slide-in-from-bottom duration-200 max-w-[92vw]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="flex items-center gap-3 flex-wrap">
            <span>Module Completed! (+{lesson.xpAward} XP)</span>
            {nextLesson && (
              <Link
                href={`/digihub/lesson/${nextLesson.id}`}
                className="px-3 py-1 rounded-lg bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs inline-flex items-center gap-1"
              >
                <span>Next Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Split-Pane Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* LEFT PANE: Topics, Relatable Explanations & Quiz */}
        <div
          className={`${
            mobileActiveView === "guide" ? "flex" : "hidden"
          } lg:flex lg:col-span-5 flex-col space-y-4`}
        >
          {/* Sub Navigation (Guide vs Quiz) */}
          <div className="flex items-center gap-1 p-1 bg-white border border-neutral-200 rounded-2xl shadow-2xs">
            <button
              onClick={() => setActivePaneTab("content")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition ${
                activePaneTab === "content"
                  ? "bg-neutral-100 text-neutral-900 font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Step-by-Step Topics
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
            <div className="bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1 shadow-xs">
              {/* TOPIC SELECTOR STEPPER (Topic-by-Topic structure) */}
              {topics.length > 0 && (
                <div className="space-y-2.5 pb-2 border-b border-neutral-100">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="font-bold text-neutral-800 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Module Topics</span>
                    </span>
                    <span className="text-[11px] font-medium text-neutral-500">
                      Topic {activeTopicIndex + 1} of {topics.length}
                    </span>
                  </div>

                  {/* Horizontal Scrollable Topic Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                    {topics.map((t, idx) => {
                      const isActive = idx === activeTopicIndex;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setActiveTopicIndex(idx);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                            isActive
                              ? "bg-brand-blue text-white shadow-2xs font-bold"
                              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                              isActive ? "bg-white text-brand-blue" : "bg-neutral-200 text-neutral-700"
                            }`}
                          >
                            {t.topicNumber}
                          </span>
                          <span className="max-w-[130px] sm:max-w-[160px] truncate">{cleanNoAsterisks(t.title)}</span>
                          {t.hasLab && (
                            <span
                              className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase tracking-wider ${
                                isActive ? "bg-white/20 text-white" : "bg-brand-blue/10 text-brand-blue"
                              }`}
                            >
                              Lab
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ACTIVE TOPIC CONTENT */}
              {currentTopic ? (
                <div className="space-y-5">
                  {/* Topic Title & Duration Header */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span className="font-semibold text-brand-blue uppercase tracking-wider text-[11px]">
                        Topic {currentTopic.topicNumber} of {topics.length}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-neutral-400">
                        <Clock className="w-3.5 h-3.5" />
                        {currentTopic.durationMinutes} mins
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                      {cleanNoAsterisks(currentTopic.title)}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                      {cleanNoAsterisks(currentTopic.summary)}
                    </p>
                  </div>

                  {/* Topic Sections with Everyday Relatable Analogies */}
                  <div className="space-y-5">
                    {currentTopic.sections.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-3.5">
                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 pt-2 border-t border-neutral-100 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                          <span>{cleanNoAsterisks(section.heading)}</span>
                        </h3>

                        {/* Relatable Analogy Card (Easy to understand!) */}
                        {section.analogy && (
                          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1.5">
                            <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
                              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                              <span>Everyday Analogy (Easy to Understand)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                              {cleanNoAsterisks(section.analogy)}
                            </p>
                          </div>
                        )}

                        {/* Clear Pedagogical Explanation (No asterisks) */}
                        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                          {cleanNoAsterisks(section.explanation)}
                        </p>

                        {/* Key Bullet Points */}
                        {section.keyPoints && section.keyPoints.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            {section.keyPoints.map((pt, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{cleanNoAsterisks(pt)}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Syntax Code Snippet */}
                        {section.codeSnippet && (
                          <div className="rounded-xl overflow-hidden bg-neutral-900 text-neutral-100 border border-neutral-800 shadow-2xs">
                            <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-800/80 border-b border-neutral-700 text-xs">
                              <span className="font-mono text-neutral-400 text-[11px]">
                                {section.codeSnippet.title || section.codeSnippet.language}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyCode(
                                    section.codeSnippet!.code,
                                    `snip-${sIdx}`
                                  )
                                }
                                className="inline-flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white transition"
                              >
                                {copiedSnippetId === `snip-${sIdx}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-3.5 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-neutral-200">
                              <code>{cleanNoAsterisks(section.codeSnippet.code)}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Topic Key Takeaways */}
                  {currentTopic.keyTakeaways && currentTopic.keyTakeaways.length > 0 && (
                    <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-brand-blue-light/40 border border-brand-blue/20 space-y-2">
                      <h4 className="text-xs font-bold text-brand-blue-dark flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                        <span>Topic Takeaways</span>
                      </h4>
                      <ul className="space-y-1.5">
                        {currentTopic.keyTakeaways.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-neutral-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0" />
                            <span>{cleanNoAsterisks(point)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Topic Stepper Bottom Action Buttons */}
                  <div className="pt-2 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      {activeTopicIndex > 0 && (
                        <button
                          type="button"
                          onClick={handlePrevTopic}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous Topic</span>
                        </button>
                      )}

                      {activeTopicIndex < topics.length - 1 ? (
                        <button
                          type="button"
                          onClick={handleNextTopic}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <span>Next Topic: {cleanNoAsterisks(topics[activeTopicIndex + 1]?.title)}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setActivePaneTab("quiz");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-neutral-900 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
                        >
                          <span>Knowledge Check Quiz</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Mobile button to switch to Lab */}
                    {currentHasLab && (
                      <button
                        type="button"
                        onClick={() => {
                          setMobileActiveView("lab");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="lg:hidden w-full py-2.5 rounded-xl bg-neutral-900 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-2xs"
                      >
                        {activeSandbox ? <Code2 className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                        <span>Open Topic Lab Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Fallback if module has no topics array */
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {cleanNoAsterisks(lesson.summary)}
                    </p>
                  </div>
                  {lesson.markdownContent && (
                    <div className="space-y-3 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {lesson.markdownContent.split("\n\n").map((para, i) => (
                        <p key={i}>{cleanNoAsterisks(para)}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* CELEBRATORY CARD WITH PROMINENT NEXT MODULE BUTTON AFTER COMPLETION */}
              {isCompleted && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">
                        Module Completed! (+{lesson.xpAward} XP Earned)
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Excellent progress. Continue immediately to the next lesson or track your certificate progress.
                      </p>
                    </div>
                  </div>

                  {nextLesson ? (
                    <Link
                      href={`/digihub/lesson/${nextLesson.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                    >
                      <span>Continue to Next Module: {cleanNoAsterisks(nextLesson.title)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/digihub"
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                    >
                      <span>All Modules Finished! View Certificate in DIGIHub</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
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

              {/* Post Quiz Next Lesson Flow */}
              {isCompleted && nextLesson && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2.5">
                  <p className="text-xs font-semibold text-emerald-900">
                    Ready for the next lesson?
                  </p>
                  <Link
                    href={`/digihub/lesson/${nextLesson.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition"
                  >
                    <span>Continue to Next Module: {cleanNoAsterisks(nextLesson.title)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {currentHasLab && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileActiveView("lab");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="lg:hidden w-full py-2.5 rounded-xl bg-brand-blue text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>Jump to Topic Lab →</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT PANE: Interactive Sandbox / Cyber Lab per Topic */}
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
              <span>Back to Topics Guide</span>
            </button>
            <span className="text-[11px] text-neutral-500 font-medium">
              Topic {activeTopicIndex + 1} Lab
            </span>
          </div>

          {/* Active Sandbox Lab for Current Topic */}
          {activeSandbox && (
            <CodeSandbox
              key={`sandbox-${currentTopic?.id || lesson.id}-${activeTopicIndex}`}
              config={activeSandbox}
              onCodeRun={() => {
                // Handled in sandbox
              }}
            />
          )}

          {/* Active Cyber Lab for Current Topic */}
          {activeCyberLab && (
            <CyberLab
              key={`cyberlab-${currentTopic?.id || lesson.id}-${activeTopicIndex}`}
              config={activeCyberLab}
              onLabCompleted={() => {
                handleMarkComplete();
              }}
            />
          )}

          {!activeSandbox && !activeCyberLab && (
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-neutral-400 mx-auto" />
              <h3 className="text-sm font-bold text-neutral-800">Reading & Conceptual Topic</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                This topic covers foundational theory and workplace best practices. Read through the guide on the left and test your knowledge in the quiz.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
