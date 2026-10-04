"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  BookOpen,
  Code2,
  Shield,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  UserCheck,
  Star,
  ExternalLink,
  Laptop,
  Check,
  Layers,
  FileCode,
} from "lucide-react";
import { Course, getCourseProgress } from "@/lib/lmsStore";

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  isEnrolled: boolean;
  onEnroll: (courseId: string) => void;
  completedLessonIds: string[];
}

export function CourseDetailModal({
  course,
  isOpen,
  onClose,
  isEnrolled,
  onEnroll,
  completedLessonIds,
}: CourseDetailModalProps) {
  if (!isOpen || !course) return null;

  const progress = getCourseProgress(course.id, completedLessonIds);

  // Find next incomplete lesson
  const nextLesson = course.lessons.find((l) => !completedLessonIds.includes(l.id)) || course.lessons[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-100 bg-neutral-50/70">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-blue-light text-brand-blue border border-brand-blue/20">
              {course.category}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs font-semibold text-neutral-600">{course.level} Level</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-neutral-400 hover:text-neutral-700 rounded-xl hover:bg-neutral-100 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-7 space-y-6 sm:space-y-8 flex-1">
          {/* Hero Banner / Course Headline */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
              <span className="text-amber-500 font-bold flex items-center gap-1">
                ★ {course.rating}
              </span>
              <span>•</span>
              <span>{course.reviewsCount} reviews</span>
              <span>•</span>
              <span>{course.enrolledStudentsCount.toLocaleString()}+ students enrolled</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {course.title}
            </h2>

            <p className="text-xs sm:text-base text-neutral-600 leading-relaxed">
              {course.headline}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/80">
            <div className="p-2.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
              <div className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">Duration</div>
              <div className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5">{course.durationWeeks} Weeks</div>
              <div className="text-[10px] text-neutral-500">~{course.estimatedHours} hours total</div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
              <div className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">Format</div>
              <div className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5">100% Online</div>
              <div className="text-[10px] text-neutral-500">Learn at your pace</div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
              <div className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">Modules</div>
              <div className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5">{course.totalModules} Units</div>
              <div className="text-[10px] text-neutral-500">Interactive Labs</div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
              <div className="text-[10px] font-medium text-neutral-400 uppercase tracking-wider">Credential</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">Verified</div>
              <div className="text-[10px] text-emerald-600">Faculty Signed</div>
            </div>
          </div>

          {/* Instructor & Institution Info */}
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200">
            <img
              src={course.instructorAvatar}
              alt={course.instructorName}
              className="w-12 h-12 rounded-xl object-cover border border-neutral-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Course Instructor</div>
              <div className="text-sm font-bold text-neutral-900 truncate">{course.instructorName}</div>
              <div className="text-xs text-neutral-500 truncate">{course.instructorTitle} • {course.organization}</div>
            </div>
          </div>

          {/* Course Description */}
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-blue" />
              <span>About this Course</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Skills Gained */}
          <div className="space-y-2.5">
            <h3 className="text-xs sm:text-sm font-bold text-neutral-900 uppercase tracking-wider text-neutral-500">
              Skills you will gain
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {course.skillsGained.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-lg bg-blue-50/80 text-blue-700 border border-blue-200/80 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Comprehensive Syllabus Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-neutral-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-blue" />
                <span>Syllabus ({course.syllabus.length} Weeks • {course.lessons.length} Modules)</span>
              </h3>
              <span className="text-xs text-neutral-500">Self-Paced Practice</span>
            </div>

            <div className="space-y-3">
              {course.syllabus.map((item, idx) => {
                const lesson = course.lessons[idx];
                const isFinished = lesson ? completedLessonIds.includes(lesson.id) : false;

                return (
                  <div
                    key={item.week}
                    className="p-4 rounded-xl sm:rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 transition space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-bold flex items-center justify-center shrink-0">
                          W{item.week}
                        </span>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900">{item.title}</h4>
                          <span className="text-[11px] text-neutral-400">~{item.hours} hours to complete</span>
                        </div>
                      </div>

                      {isFinished ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-medium">
                          <Clock className="w-3 h-3" />
                          <span>Interactive</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-600 leading-relaxed pl-9">
                      {item.description}
                    </p>

                    {lesson && (
                      <div className="pl-9 pt-1 flex items-center justify-between text-xs">
                        <span className="text-neutral-500 font-medium">
                          Includes hands-on in-browser practice lab & assessment quiz
                        </span>
                        {isEnrolled && (
                          <Link
                            href={`/digihub/lesson/${lesson.id}`}
                            onClick={onClose}
                            className="text-brand-blue hover:underline font-semibold inline-flex items-center gap-1"
                          >
                            <span>{isFinished ? "Review Lab" : "Open Lab"}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificate & Accreditation Notice */}
          <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-start gap-3.5">
            <Award className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-neutral-700">
              <h4 className="font-bold text-neutral-900 text-sm">Official DigiConnect Ghana Certificate</h4>
              <p className="leading-relaxed">
                Graduates receive an authorized, verified completion credential signed by our Academic Faculty with an immutable verification code. Perfect for your CV and LinkedIn profile.
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="w-full sm:w-auto text-center sm:text-left">
            {isEnrolled ? (
              <div>
                <div className="text-xs font-semibold text-neutral-800 flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Enrolled in Course</span>
                </div>
                <div className="text-[11px] text-neutral-500">
                  {progress.completed} of {progress.total} modules finished ({progress.percentage}%)
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xs font-bold text-neutral-900">Free Enrollment</div>
                <div className="text-[11px] text-neutral-500">Full access to sandboxes and quizzes</div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/3 sm:w-auto px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-100 font-semibold text-xs transition"
            >
              Close
            </button>

            {isEnrolled ? (
              <Link
                href={`/digihub/lesson/${nextLesson?.id || course.lessons[0]?.id}`}
                onClick={onClose}
                className="w-2/3 sm:w-auto px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs inline-flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <span>{progress.isCompleted ? "Review Completed Course" : "Resume Learning"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <button
                onClick={() => {
                  onEnroll(course.id);
                  onClose();
                }}
                className="w-2/3 sm:w-auto px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs transition shadow-2xs inline-flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Enroll for Free</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
