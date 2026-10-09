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
  Bot,
  X,
  RotateCw,
  Folder,
  Menu,
  HelpCircle,
  Brain,
  MessageCircle,
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
import { PythonLab } from "@/components/digihub/PythonLab";
import { DigitalLiteracyLab } from "@/components/digihub/DigitalLiteracyLab";
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
  const [activePaneTab, setActivePaneTab] = useState<"content" | "flashcards" | "quiz">("content");
  const [mobileActiveView, setMobileActiveView] = useState<"guide" | "lab">("guide");
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [completionToast, setCompletionToast] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Drawer states
  const [isCurriculumDrawerOpen, setIsCurriculumDrawerOpen] = useState(false);
  const [isCoachDrawerOpen, setIsCoachDrawerOpen] = useState(false);
  const [coachActiveTopic, setCoachActiveTopic] = useState<string | null>(null);

  // Flashcards state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

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
      setActiveCardIndex(0);
      setIsCardFlipped(false);
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
  const trackLessons = allLessons.filter((l) => l.trackId === lesson.trackId);
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const topics: Topic[] = lesson.topics && lesson.topics.length > 0 ? lesson.topics : [];
  const currentTopic = topics[activeTopicIndex] || null;

  // Active lab config
  const activeSandbox = currentTopic?.sandboxConfig || lesson.sandboxConfig;
  const activeCyberLab = currentTopic?.cyberLabConfig || lesson.cyberLabConfig;
  const activePythonLab = currentTopic?.pythonLabConfig || lesson.pythonLabConfig;
  const activeDigitalLiteracyLab = currentTopic?.digitalLiteracyLabConfig || lesson.digitalLiteracyLabConfig;

  const currentHasLab = !!(
    activeSandbox ||
    activeCyberLab ||
    activePythonLab ||
    activeDigitalLiteracyLab
  );

  const learnerProgress = getLearnerProgress();

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

  // Generate flashcards from lesson takeaways and topic summaries
  const flashcards = [
    ...(lesson.keyTakeaways || []).map((t, idx) => ({
      front: `Core Principle 0${idx + 1}: ${cleanNoAsterisks(lesson.title)}`,
      back: cleanNoAsterisks(t),
      analogy: topics[idx]?.sections[0]?.analogy || "Relate this directly to everyday technology workflows.",
    })),
    ...topics.map((top) => ({
      front: `What is the key insight of "${cleanNoAsterisks(top.title)}"?`,
      back: cleanNoAsterisks(top.summary),
      analogy: top.sections[0]?.analogy || "Practice building intuition with real-world examples.",
    })),
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col pt-16">
      {/* ─── STICKY HEADER ──────────────────────────────────────────────── */}
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

            <button
              type="button"
              onClick={() => setIsCurriculumDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold shrink-0 transition"
              title="View all course modules"
            >
              <Menu className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Curriculum</span>
            </button>

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
            {/* Ask AI Study Coach Button */}
            <button
              type="button"
              onClick={() => setIsCoachDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Study Coach</span>
            </button>

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

      {/* ─── MOBILE MODE SWITCHER ────────────────────────────────────────── */}
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
            {activeSandbox ? (
              <Code2 className="w-3.5 h-3.5" />
            ) : activePythonLab ? (
              <Terminal className="w-3.5 h-3.5" />
            ) : activeDigitalLiteracyLab ? (
              <Folder className="w-3.5 h-3.5" />
            ) : (
              <Shield className="w-3.5 h-3.5" />
            )}
            <span>Interactive Lab</span>
            {currentHasLab && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>
        </div>
      </div>

      {/* ─── COMPLETION TOAST NOTIFICATION ───────────────────────────────── */}
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

      {/* ─── SPLIT-PANE WORKSPACE ────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* LEFT PANE: Topics, Relatable Explanations, Flashcards & Quiz */}
        <div
          className={`${
            mobileActiveView === "guide" ? "flex" : "hidden"
          } lg:flex lg:col-span-5 flex-col space-y-4`}
        >
          {/* Sub Navigation (Guide vs Flashcards vs Quiz) */}
          <div className="flex items-center gap-1 p-1 bg-white border border-neutral-200 rounded-2xl shadow-2xs">
            <button
              onClick={() => setActivePaneTab("content")}
              className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition ${
                activePaneTab === "content"
                  ? "bg-neutral-100 text-neutral-900 font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Topics Guide
            </button>

            <button
              onClick={() => setActivePaneTab("flashcards")}
              className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 ${
                activePaneTab === "flashcards"
                  ? "bg-neutral-100 text-neutral-900 font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-indigo-600" />
              <span>Flashcards</span>
            </button>

            <button
              onClick={() => setActivePaneTab("quiz")}
              className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1 ${
                activePaneTab === "quiz"
                  ? "bg-neutral-100 text-neutral-900 font-bold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <span>Quiz ({lesson.quiz.length})</span>
            </button>
          </div>

          {/* TAB 1: TOPICS GUIDE */}
          {activePaneTab === "content" && (
            <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-6 shadow-2xs space-y-5">
              {/* Topic Stepper Header */}
              {topics.length > 1 && (
                <div className="border-b border-neutral-100 pb-3.5">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                    <span className="font-semibold text-neutral-800">
                      Topic {activeTopicIndex + 1} of {topics.length}
                    </span>
                    <span>{currentTopic?.durationMinutes || 5} mins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {topics.map((t, i) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setActiveTopicIndex(i);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={`flex-1 h-2 rounded-full transition-all ${
                          i === activeTopicIndex
                            ? "bg-brand-blue"
                            : i < activeTopicIndex
                            ? "bg-emerald-500"
                            : "bg-neutral-200"
                        }`}
                        title={`Jump to Topic ${i + 1}: ${t.title}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Active Topic Content */}
              {currentTopic ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-blue tracking-wider">
                      Topic 0{currentTopic.topicNumber}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5">
                      {cleanNoAsterisks(currentTopic.title)}
                    </h2>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                      {cleanNoAsterisks(currentTopic.summary)}
                    </p>
                  </div>

                  {/* Topic Sections with Analogies and Clean Snippets */}
                  <div className="space-y-4 pt-2">
                    {currentTopic.sections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/80 space-y-2.5"
                      >
                        <h3 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-brand-blue-light text-brand-blue flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </span>
                          <span>{cleanNoAsterisks(sec.heading)}</span>
                        </h3>

                        <p className="text-xs text-neutral-700 leading-relaxed">
                          {cleanNoAsterisks(sec.explanation)}
                        </p>

                        {/* Real-World Analogy Callout */}
                        {sec.analogy && (
                          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2.5">
                            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div className="leading-relaxed">
                              <span className="font-bold text-amber-900">Ghanaian Everyday Analogy: </span>
                              {cleanNoAsterisks(sec.analogy)}
                            </div>
                          </div>
                        )}

                        {/* Code Snippet Box */}
                        {sec.codeSnippet && (
                          <div className="mt-2 rounded-xl bg-neutral-950 text-neutral-100 p-3 font-mono text-xs overflow-hidden">
                            <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800 text-[11px] text-neutral-400">
                              <span>{sec.codeSnippet.title || sec.codeSnippet.language}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyCode(sec.codeSnippet!.code, `snip-${idx}`)
                                }
                                className="hover:text-white transition flex items-center gap-1"
                              >
                                {copiedSnippetId === `snip-${idx}` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                                <span>{copiedSnippetId === `snip-${idx}` ? "Copied" : "Copy"}</span>
                              </button>
                            </div>
                            <pre className="pt-2 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed">
                              <code>{sec.codeSnippet.code}</code>
                            </pre>
                          </div>
                        )}

                        {/* Bullet takeaways */}
                        {sec.keyPoints && sec.keyPoints.length > 0 && (
                          <ul className="space-y-1 text-xs text-neutral-600 pt-1">
                            {sec.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-1.5">
                                <span className="text-brand-blue font-bold">•</span>
                                <span>{cleanNoAsterisks(pt)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Key Takeaways */}
                  {currentTopic.keyTakeaways && currentTopic.keyTakeaways.length > 0 && (
                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 space-y-2">
                      <span className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        Quick Bite-Sized Takeaways:
                      </span>
                      <ul className="space-y-1 text-xs text-blue-950">
                        {currentTopic.keyTakeaways.map((takeaway, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span>{cleanNoAsterisks(takeaway)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Navigation Footer */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2.5">
                    {activeTopicIndex > 0 ? (
                      <button
                        type="button"
                        onClick={handlePrevTopic}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous Topic</span>
                      </button>
                    ) : (
                      <div className="flex-1" />
                    )}

                    {activeTopicIndex < topics.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextTopic}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <span>Next Topic</span>
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
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 2: INTERACTIVE FLASHCARDS */}
          {activePaneTab === "flashcards" && (
            <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-800">
                  Card {activeCardIndex + 1} of {flashcards.length}
                </span>
                <span className="text-neutral-500">Tap card to flip</span>
              </div>

              {/* 3D Flip Flashcard */}
              <div
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="cursor-pointer min-h-[220px] rounded-3xl p-6 border-2 transition-all duration-300 flex flex-col justify-between select-none shadow-xs text-center"
                style={{
                  backgroundColor: isCardFlipped ? "#0f172a" : "#f8fafc",
                  color: isCardFlipped ? "#f8fafc" : "#0f172a",
                  borderColor: isCardFlipped ? "#38bdf8" : "#cbd5e1",
                }}
              >
                <div className="text-[11px] uppercase font-bold tracking-wider opacity-60">
                  {isCardFlipped ? "✓ Answer & Explanation" : "? Question / Concept"}
                </div>

                <div className="py-4 text-sm sm:text-base font-bold leading-relaxed">
                  {isCardFlipped
                    ? flashcards[activeCardIndex]?.back
                    : flashcards[activeCardIndex]?.front}
                </div>

                {isCardFlipped && flashcards[activeCardIndex]?.analogy && (
                  <div className="text-xs text-amber-300 italic">
                    💡 Analogy: {flashcards[activeCardIndex].analogy}
                  </div>
                )}

                <div className="text-[11px] opacity-50 flex items-center justify-center gap-1">
                  <RotateCw className="w-3 h-3" />
                  <span>Click to flip card</span>
                </div>
              </div>

              {/* Card Controls */}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={activeCardIndex === 0}
                  onClick={() => {
                    setActiveCardIndex((prev) => Math.max(0, prev - 1));
                    setIsCardFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 disabled:opacity-40 text-xs font-semibold text-neutral-700 transition"
                >
                  Previous Card
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (activeCardIndex < flashcards.length - 1) {
                      setActiveCardIndex((prev) => prev + 1);
                      setIsCardFlipped(false);
                    } else {
                      setActiveCardIndex(0);
                      setIsCardFlipped(false);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold transition shadow-2xs"
                >
                  {activeCardIndex < flashcards.length - 1 ? "Next Card" : "Restart Deck"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: QUIZ */}
          {activePaneTab === "quiz" && (
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
            </div>
          )}
        </div>

        {/* RIGHT PANE: Interactive Labs */}
        <div
          className={`${
            mobileActiveView === "lab" ? "flex" : "hidden"
          } lg:flex lg:col-span-7 flex-col space-y-3`}
        >
          {/* Active Sandbox Lab (Web Development) */}
          {activeSandbox && (
            <CodeSandbox
              key={`sandbox-${currentTopic?.id || lesson.id}-${activeTopicIndex}`}
              config={activeSandbox}
              onLabCompleted={handleMarkComplete}
            />
          )}

          {/* Active Cyber Lab (Cybersecurity) */}
          {activeCyberLab && (
            <CyberLab
              key={`cyberlab-${currentTopic?.id || lesson.id}-${activeTopicIndex}`}
              config={activeCyberLab}
              onLabCompleted={handleMarkComplete}
            />
          )}

          {/* Active Python Lab (Programming & Automation) */}
          {activePythonLab && (
            <PythonLab
              key={`pythonlab-${currentTopic?.id || lesson.id}-${activeTopicIndex}`}
              config={activePythonLab}
              onLabCompleted={handleMarkComplete}
            />
          )}

          {/* Active Digital Literacy Lab (Workplace & Spreadsheets) */}
          {activeDigitalLiteracyLab && (
            <DigitalLiteracyLab
              key={`digitallab-${currentTopic?.id || lesson.id}-${activeTopicIndex}`}
              config={activeDigitalLiteracyLab}
              onLabCompleted={handleMarkComplete}
            />
          )}

          {!currentHasLab && (
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-neutral-400 mx-auto" />
              <h3 className="text-sm font-bold text-neutral-800">Reading & Conceptual Topic</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                This topic covers foundational workplace knowledge. Read through the guide on the left and test your knowledge in the quiz.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ─── SLIDE-OUT CURRICULUM DRAWER ─────────────────────────────────── */}
      {isCurriculumDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCurriculumDrawerOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <h3 className="font-bold text-base text-neutral-900">Course Curriculum</h3>
                <span className="text-xs text-neutral-500">
                  {trackLessons.length} Modules in this track
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCurriculumDrawerOpen(false)}
                className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {trackLessons.map((l) => {
                const isCurrent = l.id === lesson.id;
                const isModDone = learnerProgress.completedLessonIds.includes(l.id);

                return (
                  <Link
                    key={l.id}
                    href={`/digihub/lesson/${l.id}`}
                    onClick={() => setIsCurriculumDrawerOpen(false)}
                    className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                      isCurrent
                        ? "border-brand-blue bg-blue-50/50"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                          isModDone
                            ? "bg-emerald-100 text-emerald-700"
                            : isCurrent
                            ? "bg-brand-blue text-white"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {isModDone ? "✓" : l.moduleNumber}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-neutral-900 truncate">
                          {cleanNoAsterisks(l.title)}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {l.durationMinutes} mins • {l.xpAward} XP
                        </div>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-bold text-brand-blue shrink-0">
                        Active
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── SLIDE-OUT AI STUDY COACH DRAWER ─────────────────────────────── */}
      {isCoachDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCoachDrawerOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-900">DIGI Tutor AI Coach</h3>
                  <span className="text-[11px] text-neutral-500">
                    Friendly 24/7 academic coach for {cleanNoAsterisks(lesson.title)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCoachDrawerOpen(false)}
                className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 leading-relaxed">
                Hello! I am your DIGI Tutor. I am here to make learning this module easy and fun. Click any prompt below or ask for guidance!
              </div>

              <div className="space-y-2">
                <span className="font-bold text-neutral-800 block text-[11px] uppercase tracking-wider">
                  Quick Study Prompts:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCoachActiveTopic(
                      currentTopic?.sections[0]?.analogy ||
                        "Every web concept starts with real-world foundation: HTML is the structure, CSS is the style, and JS is the interactivity."
                    )
                  }
                  className="w-full text-left p-3 rounded-xl border border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition text-neutral-800 font-medium"
                >
                  💡 Give me an everyday African analogy for this topic!
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCoachActiveTopic(
                      currentTopic?.hasLab
                        ? "For this lab: make sure you read the instructions carefully, check your syntax, and look at the simulated browser output on the right pane."
                        : "Focus on understanding the key takeaways first, then test yourself in the Flashcards tab!"
                    )
                  }
                  className="w-full text-left p-3 rounded-xl border border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition text-neutral-800 font-medium"
                >
                  🎯 How do I pass the interactive lab challenge?
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCoachActiveTopic(
                      "In Ghana's burgeoning digital ecosystem, employers look for practical problem solvers who understand both defensive cyber hygiene and clean code architecture."
                    )
                  }
                  className="w-full text-left p-3 rounded-xl border border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition text-neutral-800 font-medium"
                >
                  🚀 How is this skill applied in Ghanaian tech jobs?
                </button>
              </div>

              {coachActiveTopic && (
                <div className="p-4 rounded-2xl bg-neutral-900 text-neutral-100 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>DIGI Tutor Guidance:</span>
                  </div>
                  <p className="leading-relaxed text-xs">{coachActiveTopic}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
