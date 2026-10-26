"use client";

import React, { useState, useMemo } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Search,
  Plus,
  CheckCircle2,
  Pin,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  Code2,
  ChevronUp,
  CornerDownRight,
  Send,
  X,
  Filter,
  ArrowLeft,
  Share2,
  Check,
  Copy,
  Clock,
  User,
  AlertCircle,
  HelpCircle,
  Bookmark,
} from "lucide-react";
import {
  ForumQuestion,
  ForumReply,
  ForumRole,
  getQuestionsForLesson,
  createForumQuestion,
  addForumReply,
  toggleUpvoteQuestion,
  toggleUpvoteReply,
  toggleEndorseReply,
  toggleResolveQuestion,
} from "@/lib/lmsForumStore";
import { LMSUser } from "@/lib/lmsStore";

interface LessonDiscussionForumProps {
  lessonId: string;
  lessonTitle: string;
  currentUser: LMSUser | null;
  onOpenSignInModal?: () => void;
}

const TAG_OPTIONS = [
  "All",
  "Syntax & Bugs",
  "Concept Question",
  "Lab Exercise",
  "Tips & Best Practices",
  "General Q&A",
];

export function LessonDiscussionForum({
  lessonId,
  lessonTitle,
  currentUser,
  onOpenSignInModal,
}: LessonDiscussionForumProps) {
  // Questions list from storage
  const [questions, setQuestions] = useState<ForumQuestion[]>(() =>
    getQuestionsForLesson(lessonId)
  );

  // Active question thread (null = question list view)
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState<"upvotes" | "latest" | "unanswered">("upvotes");

  // "Ask a Question" Modal state
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState<string[]>(["Concept Question"]);
  const [showCodeInputInModal, setShowCodeInputInModal] = useState(false);
  const [newCodeSnippet, setNewCodeSnippet] = useState("");
  const [newCodeLang, setNewCodeLang] = useState("javascript");
  const [askError, setAskError] = useState<string | null>(null);

  // Reply Input state
  const [replyContent, setReplyContent] = useState("");
  const [showCodeInputInReply, setShowCodeInputInReply] = useState(false);
  const [replyCodeSnippet, setReplyCodeSnippet] = useState("");
  const [replyCodeLang, setReplyCodeLang] = useState("javascript");
  const [replyError, setReplyError] = useState<string | null>(null);

  // Copied toast state
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Active question item
  const activeQuestion = useMemo(() => {
    if (!activeQuestionId) return null;
    return questions.find((q) => q.id === activeQuestionId) || null;
  }, [questions, activeQuestionId]);

  // Filtered & Sorted questions
  const filteredQuestions = useMemo(() => {
    let list = [...questions];

    // Filter by tag
    if (selectedTag !== "All") {
      list = list.filter((q) => q.tags.includes(selectedTag));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.content.toLowerCase().includes(q) ||
          item.authorName.toLowerCase().includes(q) ||
          item.replies.some((r) => r.content.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === "upvotes") {
      list.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.upvotes - a.upvotes;
      });
    } else if (sortBy === "latest") {
      list.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    } else if (sortBy === "unanswered") {
      list = list.filter((q) => q.replies.length === 0);
      list.sort((a, b) => b.upvotes - a.upvotes);
    }

    return list;
  }, [questions, selectedTag, searchQuery, sortBy]);

  // Current user ID helper
  const currentUserId = currentUser?.id || "demo-guest";

  // ─── ACTION HANDLERS ────────────────────────────────────────────────────────

  const handleUpvoteQuestion = (qId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const result = toggleUpvoteQuestion(qId, currentUserId);
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              upvotes: result.count,
              upvotedByUserIds: result.upvoted
                ? [...q.upvotedByUserIds, currentUserId]
                : q.upvotedByUserIds.filter((id) => id !== currentUserId),
            }
          : q
      )
    );
  };

  const handleUpvoteReply = (qId: string, replyId: string) => {
    const result = toggleUpvoteReply(qId, replyId, currentUserId);
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        return {
          ...q,
          replies: q.replies.map((r) =>
            r.id === replyId
              ? {
                  ...r,
                  upvotes: result.count,
                  upvotedByUserIds: result.upvoted
                    ? [...r.upvotedByUserIds, currentUserId]
                    : r.upvotedByUserIds.filter((id) => id !== currentUserId),
                }
              : r
          ),
        };
      })
    );
  };

  const handleEndorseReply = (qId: string, replyId: string) => {
    const endorserName = currentUser?.name || "Mentor Kwame";
    const isNowEndorsed = toggleEndorseReply(qId, replyId, endorserName);
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== qId) return q;
        return {
          ...q,
          isResolved: isNowEndorsed ? true : q.isResolved,
          replies: q.replies.map((r) =>
            r.id === replyId
              ? {
                  ...r,
                  isEndorsedByMentor: isNowEndorsed,
                  endorsedByName: isNowEndorsed
                    ? `Verified by ${endorserName}`
                    : undefined,
                }
              : r
          ),
        };
      })
    );
  };

  const handleToggleResolve = (qId: string) => {
    const isResolved = toggleResolveQuestion(qId);
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, isResolved } : q))
    );
  };

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setAskError("Please enter a clear question title.");
      return;
    }
    if (!newContent.trim()) {
      setAskError("Please provide details so peers and mentors can help.");
      return;
    }

    const created = createForumQuestion({
      lessonId,
      title: newTitle,
      content: newContent,
      tags: newTags,
      author: currentUser,
      codeSnippet: showCodeInputInModal ? newCodeSnippet : undefined,
      codeLanguage: newCodeLang,
      topicTitle: lessonTitle,
    });

    setQuestions((prev) => [created, ...prev]);
    setActiveQuestionId(created.id);
    setIsAskModalOpen(false);
    setNewTitle("");
    setNewContent("");
    setNewCodeSnippet("");
    setShowCodeInputInModal(false);
    setAskError(null);
  };

  const handlePostReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuestion) return;
    if (!replyContent.trim()) {
      setReplyError("Please write your answer or tip before submitting.");
      return;
    }

    const newReply = addForumReply({
      questionId: activeQuestion.id,
      content: replyContent,
      author: currentUser,
      codeSnippet: showCodeInputInReply ? replyCodeSnippet : undefined,
      codeLanguage: replyCodeLang,
    });

    if (newReply) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === activeQuestion.id
            ? { ...q, replies: [...q.replies, newReply] }
            : q
        )
      );
      setReplyContent("");
      setReplyCodeSnippet("");
      setShowCodeInputInReply(false);
      setReplyError(null);
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShareThread = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 2) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return "Recently";
    }
  };

  // Helper for role badge render
  const renderRoleBadge = (role: ForumRole, authorTitle?: string) => {
    if (role === "faculty") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 border border-amber-300">
          <ShieldCheck className="w-3 h-3 text-amber-600" />
          <span>Faculty / Lead Mentor</span>
        </span>
      );
    }
    if (role === "mentor") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <GraduationCap className="w-3 h-3 text-indigo-600" />
          <span>Volunteer Mentor</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
        <span>{authorTitle || "Student"}</span>
      </span>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* ─── FORUM TOP BANNER ────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-radial from-blue-500/15 to-transparent blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-white/10 text-sky-300 backdrop-blur-xs">
                <MessageSquare className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                Coursera-Style Q&A Forum
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Live Peer Community
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Lesson Discussion & Mentor Help
            </h2>
            <p className="text-xs text-blue-100/80 max-w-xl leading-relaxed">
              Stuck on a concept, syntax error, or lab challenge? Ask below to get
              answers from cohort peers and verified volunteer mentors.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAskModalOpen(true)}
            className="self-start sm:self-center shrink-0 px-4 py-2.5 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs shadow-md transition flex items-center gap-1.5 border border-white/20 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#0056D2]" />
            <span>Ask a Question</span>
          </button>
        </div>
      </div>

      {/* ─── VIEW 1: SINGLE QUESTION THREAD VIEW ──────────────────────────── */}
      {activeQuestion ? (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between gap-2 p-2 bg-white rounded-2xl border border-neutral-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setActiveQuestionId(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all questions ({questions.length})</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareThread}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition"
                title="Copy thread link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleToggleResolve(activeQuestion.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition border ${
                  activeQuestion.isResolved
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    activeQuestion.isResolved
                      ? "text-emerald-600"
                      : "text-neutral-400"
                  }`}
                />
                <span>
                  {activeQuestion.isResolved ? "Solved" : "Mark Solved"}
                </span>
              </button>
            </div>
          </div>

          {/* Active Question Main Card */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-5 sm:p-6 shadow-2xs space-y-4">
            {/* Tag Pills & Pin Status */}
            <div className="flex flex-wrap items-center gap-2">
              {activeQuestion.isPinned && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  <Pin className="w-3 h-3 text-amber-600" />
                  <span>Pinned by Mentor</span>
                </span>
              )}
              {activeQuestion.isResolved && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Verified Solution</span>
                </span>
              )}
              {activeQuestion.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Question Title */}
            <h1 className="text-base sm:text-xl font-bold text-neutral-900 leading-snug">
              {activeQuestion.title}
            </h1>

            {/* Author Meta Row */}
            <div className="flex items-center gap-3 border-y border-neutral-100 py-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0056D2] to-sky-400 text-white font-bold flex items-center justify-center shrink-0 shadow-2xs text-xs">
                {activeQuestion.authorAvatar ? (
                  <img
                    src={activeQuestion.authorAvatar}
                    alt={activeQuestion.authorName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  activeQuestion.authorName.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-neutral-900 truncate">
                    {activeQuestion.authorName}
                  </span>
                  {renderRoleBadge(
                    activeQuestion.authorRole,
                    activeQuestion.authorTitle
                  )}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatRelativeTime(activeQuestion.createdAt)}
                  </span>
                  <span>•</span>
                  <span>{activeQuestion.viewsCount} views</span>
                </div>
              </div>

              {/* Upvote Pill */}
              <button
                type="button"
                onClick={() => handleUpvoteQuestion(activeQuestion.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                  activeQuestion.upvotedByUserIds.includes(currentUserId)
                    ? "bg-blue-50 text-[#0056D2] border-blue-200 shadow-2xs"
                    : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                }`}
                title="Upvote this question"
              >
                <ThumbsUp
                  className={`w-3.5 h-3.5 ${
                    activeQuestion.upvotedByUserIds.includes(currentUserId)
                      ? "fill-[#0056D2] text-[#0056D2]"
                      : ""
                  }`}
                />
                <span>{activeQuestion.upvotes}</span>
              </button>
            </div>

            {/* Question Body */}
            <div className="text-neutral-700 text-sm leading-relaxed whitespace-pre-line">
              {activeQuestion.content}
            </div>

            {/* Code Snippet Box (if provided) */}
            {activeQuestion.codeSnippet && (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900 text-neutral-100 overflow-hidden text-xs font-mono shadow-md">
                <div className="flex items-center justify-between px-3 py-2 bg-neutral-950 border-b border-neutral-800 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-sky-400" />
                    <span className="uppercase font-semibold tracking-wider">
                      {activeQuestion.codeLanguage || "Code"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyCode(
                        activeQuestion.codeSnippet || "",
                        activeQuestion.id
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                  >
                    {copiedCodeId === activeQuestion.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">
                          Copied
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3.5 overflow-x-auto text-[11.5px] leading-relaxed text-sky-100">
                  <code>{activeQuestion.codeSnippet}</code>
                </pre>
              </div>
            )}
          </div>

          {/* ─── REPLIES LIST ────────────────────────────────────────────── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#0056D2]" />
                <span>
                  {activeQuestion.replies.length}{" "}
                  {activeQuestion.replies.length === 1 ? "Answer" : "Answers"} & Mentorship Tips
                </span>
              </h3>
              <span className="text-[11px] text-neutral-400">
                Staff & Mentor answers appear highlighted
              </span>
            </div>

            {activeQuestion.replies.length === 0 ? (
              <div className="bg-white rounded-3xl border border-neutral-200 p-8 text-center space-y-2 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0056D2] mx-auto flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-neutral-800">
                  No answers yet
                </h4>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Be the first learner or volunteer mentor to share a solution or
                  helpful tip!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Render endorsed/mentor answers first */}
                {[...activeQuestion.replies]
                  .sort((a, b) => {
                    if (a.isEndorsedByMentor && !b.isEndorsedByMentor) return -1;
                    if (!a.isEndorsedByMentor && b.isEndorsedByMentor) return 1;
                    return b.upvotes - a.upvotes;
                  })
                  .map((reply) => {
                    const isMentorReply =
                      reply.authorRole === "mentor" ||
                      reply.authorRole === "faculty";
                    const isEndorsed = reply.isEndorsedByMentor;

                    return (
                      <div
                        key={reply.id}
                        className={`rounded-3xl border p-4 sm:p-5 transition shadow-2xs space-y-3 ${
                          isEndorsed
                            ? "bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 border-emerald-300 ring-1 ring-emerald-300/50"
                            : isMentorReply
                            ? "bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 border-blue-200"
                            : "bg-white border-neutral-200"
                        }`}
                      >
                        {/* Mentor Verified Banner if Endorsed */}
                        {isEndorsed && (
                          <div className="flex items-center justify-between pb-2.5 border-b border-emerald-200/60">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                              <span className="p-1 rounded-lg bg-emerald-600 text-white">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                              <span>
                                {reply.endorsedByName || "Faculty Verified Solution"}
                              </span>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">
                              Endorsed
                            </span>
                          </div>
                        )}

                        {/* Reply Author Header */}
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-800 font-bold flex items-center justify-center shrink-0 text-xs overflow-hidden">
                              {reply.authorAvatar ? (
                                <img
                                  src={reply.authorAvatar}
                                  alt={reply.authorName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                reply.authorName.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-bold text-neutral-900 truncate">
                                  {reply.authorName}
                                </span>
                                {renderRoleBadge(
                                  reply.authorRole,
                                  reply.authorTitle
                                )}
                              </div>
                              <span className="text-[11px] text-neutral-400">
                                {formatRelativeTime(reply.createdAt)}
                              </span>
                            </div>
                          </div>

                          {/* Upvote Pill */}
                          <button
                            type="button"
                            onClick={() =>
                              handleUpvoteReply(activeQuestion.id, reply.id)
                            }
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-bold text-xs transition border cursor-pointer ${
                              reply.upvotedByUserIds.includes(currentUserId)
                                ? "bg-blue-50 text-[#0056D2] border-blue-200 shadow-2xs"
                                : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                            }`}
                            title="Helpful answer"
                          >
                            <ThumbsUp
                              className={`w-3 h-3 ${
                                reply.upvotedByUserIds.includes(currentUserId)
                                  ? "fill-[#0056D2] text-[#0056D2]"
                                  : ""
                              }`}
                            />
                            <span>{reply.upvotes}</span>
                          </button>
                        </div>

                        {/* Reply Body */}
                        <div className="text-neutral-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line pl-9">
                          {reply.content}
                        </div>

                        {/* Code snippet in reply */}
                        {reply.codeSnippet && (
                          <div className="ml-9 rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden text-xs font-mono shadow-md">
                            <div className="flex items-center justify-between px-3 py-1.5 bg-neutral-900 border-b border-neutral-800 text-[10.5px] text-neutral-400">
                              <span className="uppercase font-semibold">
                                {reply.codeLanguage || "Snippet"}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyCode(reply.codeSnippet || "", reply.id)
                                }
                                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
                              >
                                {copiedCodeId === reply.id ? (
                                  <span className="text-emerald-400">Copied</span>
                                ) : (
                                  <span>Copy</span>
                                )}
                              </button>
                            </div>
                            <pre className="p-3 overflow-x-auto text-[11px] leading-relaxed text-emerald-100">
                              <code>{reply.codeSnippet}</code>
                            </pre>
                          </div>
                        )}

                        {/* Endorse action for mentors or question author */}
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleEndorseReply(activeQuestion.id, reply.id)
                            }
                            className="text-[11px] font-semibold text-neutral-500 hover:text-emerald-700 transition flex items-center gap-1 cursor-pointer"
                          >
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>
                              {reply.isEndorsedByMentor
                                ? "Remove Verified Endorsement"
                                : "Mark as Verified Mentor Solution"}
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* ─── POST ANSWER BOX ─────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-4 sm:p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-[#0056D2]" />
                <span className="text-xs font-bold text-neutral-900">
                  Write Your Answer or Mentorship Tip
                </span>
              </div>
              <span className="text-[11px] text-neutral-500">
                Replying as{" "}
                <span className="font-semibold text-neutral-800">
                  {currentUser?.name || "Peer Learner"}
                </span>
              </span>
            </div>

            {replyError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{replyError}</span>
              </div>
            )}

            <form onSubmit={handlePostReplySubmit} className="space-y-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Explain the solution clearly, give an analogy, or point out where the syntax mistake was..."
                rows={3}
                className="w-full p-3 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 transition"
              />

              {showCodeInputInReply && (
                <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-sky-400" />
                      Attach Formatted Code
                    </span>
                    <select
                      value={replyCodeLang}
                      onChange={(e) => setReplyCodeLang(e.target.value)}
                      className="bg-neutral-800 text-neutral-200 text-xs rounded-lg px-2 py-1 border border-neutral-700 focus:outline-none"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="python">Python</option>
                    </select>
                  </div>
                  <textarea
                    value={replyCodeSnippet}
                    onChange={(e) => setReplyCodeSnippet(e.target.value)}
                    placeholder="Paste code snippet here..."
                    rows={4}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 font-mono text-xs text-sky-100 placeholder:text-neutral-600 border border-neutral-800 focus:outline-none focus:border-sky-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setShowCodeInputInReply(!showCodeInputInReply)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-100 text-xs font-semibold transition"
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>
                    {showCodeInputInReply ? "Remove Code" : "+ Add Code Snippet"}
                  </span>
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Answer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* ─── VIEW 2: QUESTIONS LIST / DIRECTORY ────────────────────────── */
        <div className="space-y-4">
          {/* Search, Filter Tags & Sort Bar */}
          <div className="bg-white rounded-3xl border border-neutral-200 p-4 shadow-2xs space-y-3">
            {/* Search and Sort row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions by topic, keyword, or error..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-neutral-200 bg-neutral-50 focus:bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] text-neutral-500 font-medium pl-1">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "upvotes" | "latest" | "unanswered"
                    )
                  }
                  className="px-2.5 py-1.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-700 focus:outline-none"
                >
                  <option value="upvotes">🔥 Top Upvoted</option>
                  <option value="latest">⚡ Newest First</option>
                  <option value="unanswered">❓ Unanswered</option>
                </select>
              </div>
            </div>

            {/* Tag filter chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider shrink-0 pr-1">
                Tags:
              </span>
              {TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition cursor-pointer ${
                    selectedTag === tag
                      ? "bg-[#0056D2] text-white shadow-2xs font-bold"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Question List Count & Fast Status */}
          <div className="flex items-center justify-between px-1 text-xs text-neutral-500">
            <span>
              Showing{" "}
              <strong className="text-neutral-900">
                {filteredQuestions.length}
              </strong>{" "}
              {filteredQuestions.length === 1 ? "question" : "questions"}
            </span>
            <span className="text-[11px]">Click any card to read answers or reply</span>
          </div>

          {/* Question Cards Feed */}
          {filteredQuestions.length === 0 ? (
            <div className="bg-white rounded-3xl border border-neutral-200 p-8 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0056D2] mx-auto flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-neutral-800">
                No questions found
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                {searchQuery
                  ? `No questions matching "${searchQuery}". Try another keyword or clear filters.`
                  : "Have a question about this lesson's concepts or code challenge? Be the first to start a thread!"}
              </p>
              <button
                type="button"
                onClick={() => setIsAskModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0056D2] text-white font-bold text-xs shadow-md transition hover:bg-blue-700 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ask the First Question</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredQuestions.map((q) => {
                const hasMentorAnswer = q.replies.some(
                  (r) =>
                    r.authorRole === "mentor" ||
                    r.authorRole === "faculty" ||
                    r.isEndorsedByMentor
                );

                return (
                  <div
                    key={q.id}
                    onClick={() => setActiveQuestionId(q.id)}
                    className="group bg-white hover:bg-neutral-50/70 rounded-3xl border border-neutral-200 hover:border-blue-300 p-4 sm:p-5 transition shadow-2xs flex items-start gap-3.5 cursor-pointer relative"
                  >
                    {/* Left: Upvote Pill */}
                    <button
                      type="button"
                      onClick={(e) => handleUpvoteQuestion(q.id, e)}
                      className={`flex flex-col items-center justify-center w-11 py-2 rounded-2xl border transition shrink-0 cursor-pointer ${
                        q.upvotedByUserIds.includes(currentUserId)
                          ? "bg-blue-50 text-[#0056D2] border-blue-200 shadow-2xs font-bold"
                          : "bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-200"
                      }`}
                      title="Upvote helpful question"
                    >
                      <ChevronUp
                        className={`w-4 h-4 transition ${
                          q.upvotedByUserIds.includes(currentUserId)
                            ? "text-[#0056D2] stroke-[3]"
                            : "group-hover:-translate-y-0.5"
                        }`}
                      />
                      <span className="text-xs font-bold">{q.upvotes}</span>
                    </button>

                    {/* Center & Right: Content Preview */}
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Status Badges & Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                        {q.isPinned && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <Pin className="w-2.5 h-2.5 text-amber-600" />
                            <span>Pinned</span>
                          </span>
                        )}
                        {q.isResolved && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Solved</span>
                          </span>
                        )}
                        {hasMentorAnswer && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                            <GraduationCap className="w-2.5 h-2.5 text-indigo-600" />
                            <span>Mentor Answered</span>
                          </span>
                        )}
                        {q.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Question Title */}
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#0056D2] transition leading-snug line-clamp-2">
                        {q.title}
                      </h3>

                      {/* Snippet Preview */}
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                        {q.content}
                      </p>

                      {/* Code Indicator Pill if question has code */}
                      {q.codeSnippet && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-mono text-[10.5px]">
                          <Code2 className="w-3 h-3 text-sky-600" />
                          <span>Includes code snippet</span>
                        </div>
                      )}

                      {/* Footer Row: Author, Time & Replies Count */}
                      <div className="flex items-center justify-between pt-1 text-xs text-neutral-500">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-semibold text-neutral-800 truncate">
                            {q.authorName}
                          </span>
                          <span className="hidden sm:inline">
                            {renderRoleBadge(q.authorRole, q.authorTitle)}
                          </span>
                          <span className="text-[11px] text-neutral-400">
                            {formatRelativeTime(q.createdAt)}
                          </span>
                        </div>

                        {/* Reply count pill */}
                        <div
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition shrink-0 ${
                            q.replies.length > 0
                              ? "bg-neutral-100 text-neutral-800 group-hover:bg-blue-100 group-hover:text-blue-800"
                              : "bg-neutral-50 text-neutral-400"
                          }`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>
                            {q.replies.length}{" "}
                            {q.replies.length === 1 ? "answer" : "answers"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── MODAL: ASK A QUESTION ────────────────────────────────────────── */}
      {isAskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-2xl bg-blue-50 text-[#0056D2]">
                  <MessageSquare className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">
                    Ask a Question
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Scoped to: {lessonTitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAskModalOpen(false)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Error Message */}
            {askError && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{askError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleCreateQuestionSubmit} className="space-y-4">
              {/* Question Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-800">
                  Question Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Why does my button overflow when using flex-direction: column?"
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition font-medium"
                />
                <p className="text-[11px] text-neutral-400">
                  Be clear and specific so mentors can pinpoint the problem
                  instantly.
                </p>
              </div>

              {/* Tag Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-800">
                  Select Category Tags
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {TAG_OPTIONS.filter((t) => t !== "All").map((tag) => {
                    const isSelected = newTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setNewTags(newTags.filter((t) => t !== tag));
                          } else {
                            setNewTags([...newTags, tag]);
                          }
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                          isSelected
                            ? "bg-blue-50 text-[#0056D2] border-blue-200 font-bold"
                            : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Content / Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-800">
                  Details & Context <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain what you are trying to accomplish, what error or unexpected behavior you observed, and what you've tried..."
                  rows={4}
                  className="w-full p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white text-xs sm:text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition"
                />
              </div>

              {/* Optional Code Snippet Toggle */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowCodeInputInModal(!showCodeInputInModal)
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0056D2] hover:underline cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>
                    {showCodeInputInModal
                      ? "− Remove Code Snippet"
                      : "+ Include Code Snippet or Error Log"}
                  </span>
                </button>

                {showCodeInputInModal && (
                  <div className="p-3 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-neutral-300 font-semibold">
                        Code Snippet
                      </span>
                      <select
                        value={newCodeLang}
                        onChange={(e) => setNewCodeLang(e.target.value)}
                        className="bg-neutral-800 text-neutral-200 text-xs rounded-lg px-2 py-1 border border-neutral-700 focus:outline-none"
                      >
                        <option value="javascript">JavaScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="python">Python</option>
                      </select>
                    </div>
                    <textarea
                      value={newCodeSnippet}
                      onChange={(e) => setNewCodeSnippet(e.target.value)}
                      placeholder="Paste your code or console error here..."
                      rows={4}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 font-mono text-xs text-sky-100 placeholder:text-neutral-600 border border-neutral-800 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsAskModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-neutral-600 hover:bg-neutral-100 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Question</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
