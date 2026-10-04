"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Shield,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Award,
  Video,
  ExternalLink,
} from "lucide-react";
import {
  getLessonById,
  getAllLessons,
  markLessonCompleted,
  getLearnerProgress,
  Lesson,
} from "@/lib/lmsStore";
import { CodeSandbox } from "@/components/digihub/CodeSandbox";
import { CyberLab } from "@/components/digihub/CyberLab";
import { QuizWidget } from "@/components/digihub/QuizWidget";

export default function DIGIHubLessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id as string;

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activePaneTab, setActivePaneTab] = useState<"content" | "quiz">("content");
  const [earnedXpToast, setEarnedXpToast] = useState(false);

  useEffect(() => {
    if (!lessonId) return;
    const found = getLessonById(lessonId);
    if (found) {
      setLesson(found);
      const progress = getLearnerProgress();
      setIsCompleted(progress.completedLessonIds.includes(found.id));
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="text-center max-w-md p-8 bg-slate-900 border border-slate-800 rounded-3xl">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white">Lesson Not Found</h2>
          <p className="text-xs text-slate-400 mt-2">
            The requested module could not be found or has not been unlocked yet.
          </p>
          <Link
            href="/digihub"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to DIGIHub
          </Link>
        </div>
      </div>
    );
  }

  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleMarkComplete = () => {
    const updated = markLessonCompleted(lesson.id, lesson.xpAward);
    setIsCompleted(true);
    setEarnedXpToast(true);
    setTimeout(() => setEarnedXpToast(false), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pt-16">
      {/* Top Sticky Header */}
      <header className="sticky top-16 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/digihub"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition shrink-0"
              title="Return to DIGIHub Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="font-semibold text-blue-400 uppercase tracking-wider">
                  Module 0{lesson.moduleNumber}: {lesson.moduleTitle}
                </span>
                <span>•</span>
                <span>Lesson {lesson.lessonNumber}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white truncate">{lesson.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              +{lesson.xpAward} XP
            </div>

            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </span>
            ) : (
              <button
                onClick={handleMarkComplete}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition"
              >
                Mark Finished
              </button>
            )}

            {nextLesson && (
              <Link
                href={`/digihub/lesson/${nextLesson.id}`}
                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition"
              >
                Next Lab
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Floating XP Toast */}
      {earnedXpToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-2xl animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>+{lesson.xpAward} XP Earned! Great job!</span>
        </div>
      )}

      {/* Main Split-Pane Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT PANE: Theory, Key Takeaways & Quiz (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Sub Navigation */}
          <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl">
            <button
              onClick={() => setActivePaneTab("content")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition ${
                activePaneTab === "content"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              📖 Lesson Concept
            </button>
            <button
              onClick={() => setActivePaneTab("quiz")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                activePaneTab === "quiz"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🎯 Knowledge Check
              <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-400 text-[10px] flex items-center justify-center">
                {lesson.quiz.length}
              </span>
            </button>
          </div>

          {activePaneTab === "content" ? (
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 flex-1">
              {/* Summary card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-blue-400">Concept Overview</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.durationMinutes} min read & lab
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{lesson.summary}</p>
              </div>

              {/* Core Content Markdown-style renderer */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {lesson.markdownContent.split("\n\n").map((para, i) => {
                  if (para.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-base font-bold text-white pt-2">
                        {para.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-lg font-bold text-white pt-3 border-b border-slate-800 pb-1">
                        {para.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("- ") || para.startsWith("* ")) {
                    const bullets = para.split("\n");
                    return (
                      <ul key={i} className="list-disc list-inside space-y-1 text-slate-300 pl-1">
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
              <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Key Takeaways
                </h4>
                <ul className="space-y-2">
                  {lesson.keyTakeaways.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Switch to Quiz Prompt */}
              <div className="pt-2">
                <button
                  onClick={() => setActivePaneTab("quiz")}
                  className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  Ready for the Quiz? Test Knowledge ({lesson.quiz.length} Questions)
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Quiz Tab */
            <QuizWidget
              questions={lesson.quiz}
              xpAward={lesson.xpAward}
              onQuizCompleted={(score: number, total: number) => {
                if (score === total) {
                  handleMarkComplete();
                }
              }}
            />
          )}
        </div>

        {/* RIGHT PANE: Interactive Sandbox / Cyber Lab (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col">
          {lesson.sandboxConfig && (
            <CodeSandbox
              config={lesson.sandboxConfig}
              onCodeRun={() => {
                // Auto mark complete or encourage progress
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
