"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
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
  const [completionToast, setCompletionToast] = useState(false);

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
      <header className="sticky top-16 z-40 bg-white border-b border-neutral-200 px-4 sm:px-6 py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/digihub"
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition shrink-0"
              title="Return to DIGIHub Overview"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                <span className="font-semibold text-brand-blue">
                  Module {lesson.moduleNumber}: {lesson.moduleTitle}
                </span>
                <span>•</span>
                <span>Lesson {lesson.lessonNumber}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-neutral-900 truncate">{lesson.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{lesson.durationMinutes} mins</span>
            </div>

            {isCompleted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Completed</span>
              </span>
            ) : (
              <button
                onClick={handleMarkComplete}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs shadow-2xs transition"
              >
                Mark Complete
              </button>
            )}

            {nextLesson && (
              <Link
                href={`/digihub/lesson/${nextLesson.id}`}
                className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-xs transition"
              >
                <span>Next Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Completion Toast Notification */}
      {completionToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-neutral-900 text-white font-medium text-xs shadow-xl animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Module marked as completed!</span>
        </div>
      )}

      {/* Split-Pane Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT PANE: Theory, Key Takeaways & Quiz (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
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
              Knowledge Check
              <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-bold flex items-center justify-center">
                {lesson.quiz.length}
              </span>
            </button>
          </div>

          {activePaneTab === "content" ? (
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 space-y-6 flex-1 shadow-xs">
              {/* Summary card */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                  <span className="font-semibold text-brand-blue">Module Overview</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {lesson.durationMinutes} min reading & lab
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">{lesson.summary}</p>
              </div>

              {/* Core Content Markdown renderer */}
              <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
                {lesson.markdownContent.split("\n\n").map((para, i) => {
                  if (para.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-base font-bold text-neutral-900 pt-2">
                        {para.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-lg font-bold text-neutral-900 pt-3 border-b border-neutral-100 pb-1">
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
              <div className="p-5 rounded-2xl bg-brand-blue-light/40 border border-brand-blue/20 space-y-3">
                <h4 className="text-xs font-bold text-brand-blue-dark flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                  Key Takeaways
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

              {/* Switch to Quiz Prompt */}
              <div className="pt-2">
                <button
                  onClick={() => setActivePaneTab("quiz")}
                  className="w-full py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs transition flex items-center justify-center gap-2"
                >
                  <span>Test Knowledge ({lesson.quiz.length} Questions)</span>
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
