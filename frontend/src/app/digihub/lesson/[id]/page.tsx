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
  ChevronDown,
  SlidersHorizontal,
  Maximize2,
  Minimize2,
  GripVertical,
  Volume2,
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
import {
  AudioNarrationPlayer,
  AudioProgressInfo,
} from "@/components/digihub/AudioNarrationPlayer";
import { JargonBusterModal } from "@/components/digihub/JargonBusterModal";
import { ComputerBasicsLab } from "@/components/digihub/ComputerBasicsLab";
import { MovableAICoach } from "@/components/digihub/MovableAICoach";
import { triggerConfetti, playSuccessChime } from "@/lib/confetti";

// DigiConnect Brand Colors for Flashcards with Rich Saturated Themes
export interface FlashcardBrandTheme {
  id: string;
  name: string;
  categoryTag: string;
  frontGradient: string;
  frontBorder: string;
  frontShadow: string;
  frontTextColor: string;
  frontBadgeBg: string;
  frontBadgeText: string;
  frontFlipButtonBg: string;
  backGradient: string;
  backBorder: string;
  backShadow: string;
  backTextColor: string;
  backBadgeBg: string;
  backBadgeText: string;
  analogyCardBg: string;
  analogyCardBorder: string;
  analogyCardText: string;
  accentHex: string;
  dotColor: string;
}

export const FLASHCARD_BRAND_THEMES: FlashcardBrandTheme[] = [
  // 1. DIGICONNECT ROYAL BLUE (#2196D3 / #0056D2)
  {
    id: "blue",
    name: "DigiConnect Royal Blue",
    categoryTag: "CORE FOUNDATION",
    frontGradient: "bg-gradient-to-br from-[#0047BA] via-[#0066FF] to-[#0A84FF]",
    frontBorder: "border-[#38BDF8]/70",
    frontShadow: "shadow-2xl shadow-blue-600/35",
    frontTextColor: "text-white",
    frontBadgeBg: "bg-white/20 backdrop-blur-md border border-white/35 text-white",
    frontBadgeText: "text-white",
    frontFlipButtonBg: "bg-white/20 hover:bg-white/30 text-white border-white/30",
    backGradient: "bg-gradient-to-br from-[#071933] via-[#0B254D] to-[#030E1D]",
    backBorder: "border-sky-400/80",
    backShadow: "shadow-2xl shadow-sky-500/25",
    backTextColor: "text-blue-50",
    backBadgeBg: "bg-sky-500/25 text-sky-200 border border-sky-400/50",
    backBadgeText: "text-sky-200",
    analogyCardBg: "bg-white/10 backdrop-blur-md border border-sky-300/30",
    analogyCardBorder: "border-sky-300/40",
    analogyCardText: "text-amber-300",
    accentHex: "#0056D2",
    dotColor: "bg-[#0056D2]",
  },
  // 2. DIGICONNECT GHANA GOLD / SUN YELLOW (#FFD600 / #F59E0B)
  {
    id: "gold",
    name: "DigiConnect Ghana Gold",
    categoryTag: "KEY INSIGHT",
    frontGradient: "bg-gradient-to-br from-[#B45309] via-[#D97706] to-[#F59E0B]",
    frontBorder: "border-[#FDE68A]/75",
    frontShadow: "shadow-2xl shadow-amber-600/35",
    frontTextColor: "text-white",
    frontBadgeBg: "bg-black/25 backdrop-blur-md border border-white/35 text-white",
    frontBadgeText: "text-white",
    frontFlipButtonBg: "bg-black/25 hover:bg-black/35 text-white border-white/30",
    backGradient: "bg-gradient-to-br from-[#261301] via-[#3B1E03] to-[#120800]",
    backBorder: "border-amber-400/80",
    backShadow: "shadow-2xl shadow-amber-500/25",
    backTextColor: "text-amber-50",
    backBadgeBg: "bg-amber-500/25 text-amber-200 border border-amber-400/50",
    backBadgeText: "text-amber-200",
    analogyCardBg: "bg-white/10 backdrop-blur-md border border-amber-300/30",
    analogyCardBorder: "border-amber-300/40",
    analogyCardText: "text-yellow-200",
    accentHex: "#F59E0B",
    dotColor: "bg-[#F59E0B]",
  },
  // 3. DIGICONNECT AFRICAN EMERALD / GREEN (#006B3F / #10B981)
  {
    id: "green",
    name: "DigiConnect Ghana Green",
    categoryTag: "PRACTICAL MASTERY",
    frontGradient: "bg-gradient-to-br from-[#006B3F] via-[#059669] to-[#044D2D]",
    frontBorder: "border-[#6EE7B7]/75",
    frontShadow: "shadow-2xl shadow-emerald-600/35",
    frontTextColor: "text-white",
    frontBadgeBg: "bg-white/20 backdrop-blur-md border border-white/35 text-white",
    frontBadgeText: "text-white",
    frontFlipButtonBg: "bg-white/20 hover:bg-white/30 text-white border-white/30",
    backGradient: "bg-gradient-to-br from-[#031B10] via-[#072C1A] to-[#010D07]",
    backBorder: "border-emerald-400/80",
    backShadow: "shadow-2xl shadow-emerald-500/25",
    backTextColor: "text-emerald-50",
    backBadgeBg: "bg-emerald-500/25 text-emerald-200 border border-emerald-400/50",
    backBadgeText: "text-emerald-200",
    analogyCardBg: "bg-white/10 backdrop-blur-md border border-emerald-300/30",
    analogyCardBorder: "border-emerald-300/40",
    analogyCardText: "text-amber-200",
    accentHex: "#006B3F",
    dotColor: "bg-[#006B3F]",
  },
  // 4. DIGICONNECT CRIMSON GLORY / RED (#E02629 / #DC2626)
  {
    id: "red",
    name: "DigiConnect Crimson Red",
    categoryTag: "CRITICAL CONCEPT",
    frontGradient: "bg-gradient-to-br from-[#991B1B] via-[#DC2626] to-[#BE123C]",
    frontBorder: "border-[#FDA4AF]/75",
    frontShadow: "shadow-2xl shadow-rose-600/35",
    frontTextColor: "text-white",
    frontBadgeBg: "bg-white/20 backdrop-blur-md border border-white/35 text-white",
    frontBadgeText: "text-white",
    frontFlipButtonBg: "bg-white/20 hover:bg-white/30 text-white border-white/30",
    backGradient: "bg-gradient-to-br from-[#24040A] via-[#380712] to-[#120205]",
    backBorder: "border-rose-400/80",
    backShadow: "shadow-2xl shadow-rose-500/25",
    backTextColor: "text-rose-50",
    backBadgeBg: "bg-rose-500/25 text-rose-200 border border-rose-400/50",
    backBadgeText: "text-rose-200",
    analogyCardBg: "bg-white/10 backdrop-blur-md border border-rose-300/30",
    analogyCardBorder: "border-rose-300/40",
    analogyCardText: "text-amber-200",
    accentHex: "#E02629",
    dotColor: "bg-[#E02629]",
  },
  // 5. DIGICONNECT ELECTRIC INDIGO / TECH PURPLE (#4F46E5 / #6366F1)
  {
    id: "indigo",
    name: "DigiConnect Electric Indigo",
    categoryTag: "SYSTEM ARCHITECTURE",
    frontGradient: "bg-gradient-to-br from-[#3730A3] via-[#4F46E5] to-[#6366F1]",
    frontBorder: "border-[#C7D2FE]/75",
    frontShadow: "shadow-2xl shadow-indigo-600/35",
    frontTextColor: "text-white",
    frontBadgeBg: "bg-white/20 backdrop-blur-md border border-white/35 text-white",
    frontBadgeText: "text-white",
    frontFlipButtonBg: "bg-white/20 hover:bg-white/30 text-white border-white/30",
    backGradient: "bg-gradient-to-br from-[#0F0C2B] via-[#191444] to-[#070517]",
    backBorder: "border-indigo-400/80",
    backShadow: "shadow-2xl shadow-indigo-500/25",
    backTextColor: "text-indigo-50",
    backBadgeBg: "bg-indigo-500/25 text-indigo-200 border border-indigo-400/50",
    backBadgeText: "text-indigo-200",
    analogyCardBg: "bg-white/10 backdrop-blur-md border border-indigo-300/30",
    analogyCardBorder: "border-indigo-300/40",
    analogyCardText: "text-purple-200",
    accentHex: "#4F46E5",
    dotColor: "bg-[#4F46E5]",
  },
];

// Utility to completely strip markdown asterisks from any text
function cleanNoAsterisks(text?: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/\*/g, "");
}

// Word-by-word real-time highlight component when listening to audio
function InteractiveSpokenText({
  targetId,
  text,
  activeTargetId,
  activeWordIndex,
  className = "",
}: {
  targetId: string;
  text?: string;
  activeTargetId: string | null;
  activeWordIndex: number;
  className?: string;
}) {
  if (!text) return null;

  const cleanText = text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*\*(.*?)\*/g, "$1")
    .replace(/\*/g, "")
    .trim();

  const words = cleanText.split(/\s+/);
  const isTargetActive = activeTargetId === targetId;

  return (
    <span className={className}>
      {words.map((word, wIdx) => {
        const isCurrent = isTargetActive && wIdx === activeWordIndex;
        const isPast = isTargetActive && wIdx < activeWordIndex;

        return (
          <span
            key={wIdx}
            className={`inline-block transition-all duration-150 rounded ${
              isCurrent
                ? "bg-amber-300 text-neutral-950 font-extrabold px-1.5 py-0.5 rounded-md shadow-sm ring-2 ring-amber-400 scale-[1.06] z-10 mx-0.5"
                : isPast
                ? "bg-amber-100/90 text-neutral-900 font-medium px-0.5"
                : ""
            }`}
          >
            {word}
            {wIdx < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </span>
  );
}

export default function DIGIHubLessonPage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params?.id as string;

  const [lesson, setLesson] = useState<Lesson | null>(() => {
    if (typeof window !== "undefined" && lessonId) {
      return getLessonById(lessonId) || null;
    }
    return null;
  });
  const [currentUser, setCurrentUser] = useState<LMSUser | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activePaneTab, setActivePaneTab] = useState<"content" | "flashcards" | "quiz">("content");
  const [mobileActiveView, setMobileActiveView] = useState<"guide" | "lab">("guide");
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [completionToast, setCompletionToast] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  // Audio narration real-time word highlight state
  const [audioProgress, setAudioProgress] = useState<AudioProgressInfo>({
    isPlaying: false,
    isPaused: false,
    activeTargetId: null,
    activeWordIndex: -1,
    activeSectionIndex: null,
    currentSentence: "",
    activeWord: "",
  });

  // Drawer & modal states
  const [isCurriculumDrawerOpen, setIsCurriculumDrawerOpen] = useState(false);
  const [coachOpenSignal, setCoachOpenSignal] = useState(0);
  const [isJargonModalOpen, setIsJargonModalOpen] = useState(false);
  const [showBasicsLab, setShowBasicsLab] = useState(false);
  const [isMobileLessonToolsOpen, setIsMobileLessonToolsOpen] = useState(false);

  // Flashcards state
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Flashcards swipe-away physics & pointer drag state
  const [dragDeltaX, setDragDeltaX] = useState<number>(0);
  const [dragDeltaY, setDragDeltaY] = useState<number>(0);
  const [isDraggingCard, setIsDraggingCard] = useState<boolean>(false);
  const [isAnimatingExit, setIsAnimatingExit] = useState<boolean>(false);
  const [swipeExitDirection, setSwipeExitDirection] = useState<"left" | "right" | null>(null);
  const dragStartPos = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Desktop resizable split workspace state (default 42% left, 58% right)
  const [splitRatio, setSplitRatio] = useState<number>(42);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Mobile lab fullscreen focus mode
  const [isMobileLabFullscreen, setIsMobileLabFullscreen] = useState(false);
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  const QUICK_CODE_SYMBOLS = [
    { label: "{ }", insert: "{\n  \n}" },
    { label: "( )", insert: "()" },
    { label: "[ ]", insert: "[]" },
    { label: ";", insert: ";" },
    { label: "=>", insert: " => " },
    { label: "=", insert: " = " },
    { label: '" "', insert: '""' },
    { label: "/", insert: "/" },
    { label: "< >", insert: "<></>" },
    { label: "log", insert: "console.log();" },
    { label: "return", insert: "return " },
    { label: "def", insert: "def " },
  ];

  const handleInsertSymbol = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSymbol(code);
    setTimeout(() => setCopiedSymbol(null), 1500);
  };

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);

    const saved = localStorage.getItem("dcg_lesson_split_ratio");
    if (saved) {
      const val = parseFloat(saved);
      if (!isNaN(val) && val >= 28 && val <= 65) {
        setSplitRatio(val);
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseDownSplit = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingSplit(true);
  };

  useEffect(() => {
    if (!isDraggingSplit) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const container = document.getElementById("dcg-split-container");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const newRatio = Math.min(65, Math.max(28, (mouseX / rect.width) * 100));
      setSplitRatio(newRatio);
      localStorage.setItem("dcg_lesson_split_ratio", newRatio.toFixed(1));
    };

    const handleMouseUp = () => {
      setIsDraggingSplit(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingSplit]);

  // Auto-scroll topic section into view as audio narration speaks it
  useEffect(() => {
    if (audioProgress.isPlaying && audioProgress.activeSectionIndex !== null) {
      const el = document.getElementById(
        `section-card-${audioProgress.activeSectionIndex}`
      );
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [audioProgress.isPlaying, audioProgress.activeSectionIndex]);

  // Physics-based swipe-away animation trigger
  const triggerSwipeAway = (direction: "left" | "right") => {
    if (isAnimatingExit || flashcards.length === 0) return;
    setIsAnimatingExit(true);
    setSwipeExitDirection(direction);

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20);
    }

    setTimeout(() => {
      if (direction === "left") {
        setActiveCardIndex((prev) =>
          prev < flashcards.length - 1 ? prev + 1 : 0
        );
      } else {
        setActiveCardIndex((prev) =>
          prev > 0 ? prev - 1 : flashcards.length - 1
        );
      }
      setIsCardFlipped(false);
      setDragDeltaX(0);
      setDragDeltaY(0);
      setSwipeExitDirection(null);
      setIsAnimatingExit(false);
    }, 300);
  };

  const handleCardPointerDown = (e: React.PointerEvent) => {
    if (isAnimatingExit) return;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    setIsDraggingCard(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch (_) {}
  };

  const handleCardPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingCard || isAnimatingExit) return;
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    setDragDeltaX(dx);
    setDragDeltaY(dy * 0.25);
  };

  const handleCardPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingCard) return;
    setIsDraggingCard(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch (_) {}

    const threshold = 48;
    if (dragDeltaX < -threshold) {
      triggerSwipeAway("left");
    } else if (dragDeltaX > threshold) {
      triggerSwipeAway("right");
    } else {
      // When tapped or slight drag: do NOT flip, smoothly spring back to center
      setDragDeltaX(0);
      setDragDeltaY(0);
    }
  };

  useEffect(() => {
    const user = getActiveUser();
    setCurrentUser(user);
    setAuthChecked(true);

    const targetId = lessonId || "code-101";
    const found = getLessonById(targetId);
    if (found) {
      setLesson(found);
      const progress = getLearnerProgress();
      const safeCompleted = Array.isArray(progress?.completedLessonIds) ? progress.completedLessonIds : [];
      setIsCompleted(safeCompleted.includes(found.id));
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
    const immediateLesson = getLessonById(lessonId || "code-101");
    if (immediateLesson) {
      return null;
    }
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 border-3 border-brand-blue border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-xs font-semibold text-neutral-600">Loading lesson content...</span>
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
    triggerConfetti();
    playSuccessChime();
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
      analogy: topics[idx]?.sections?.[0]?.analogy || "Relate this directly to everyday technology workflows.",
    })),
    ...topics.map((top) => ({
      front: `What is the key insight of "${cleanNoAsterisks(top.title)}"?`,
      back: cleanNoAsterisks(top.summary),
      analogy: top.sections?.[0]?.analogy || "Practice building intuition with real-world examples.",
    })),
  ];

  // Global Keyboard Shortcuts (Space/F = flip, ArrowRight/Left = prev/next card)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      if (activePaneTab === "flashcards") {
        if (e.code === "Space" || e.key.toLowerCase() === "f") {
          e.preventDefault();
          setIsCardFlipped((prev) => !prev);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          triggerSwipeAway("left");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          triggerSwipeAway("right");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePaneTab, flashcards.length]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      {/* ─── STICKY HEADER ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 px-3.5 sm:px-6 py-2.5 sm:py-3.5 shadow-2xs">
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

          {/* Header Action Area */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop / Tablet Inline Tools (sm and up) */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Jargon Buster Quick Dictionary Button */}
              <button
                type="button"
                onClick={() => setIsJargonModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-semibold transition"
                title="Look up tech words in plain English & Ghanaian analogies"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Jargon Buster</span>
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{lesson.durationMinutes} mins</span>
              </div>
            </div>

            {/* DIGIHUB AI Study Coach Button */}
            <button
              type="button"
              onClick={() => setCoachOpenSignal((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 text-[#0056D2] border border-cyan-200 text-xs font-bold transition shadow-xs hover:scale-105 active:scale-95"
              title="Open DIGIHUB AI Study Coach"
            >
              <img
                src="/images/digihub-ai-robot.png"
                alt="DIGIHUB AI"
                width={18}
                height={18}
                className="w-4.5 h-4.5 object-contain"
              />
              <span className="hidden sm:inline">DIGIHUB AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse hidden sm:inline" />
            </button>

            {/* Mobile Secondary Tools Dropdown (< sm) to prevent button crowding */}
            <div className="relative sm:hidden">
              <button
                type="button"
                onClick={() => setIsMobileLessonToolsOpen(!isMobileLessonToolsOpen)}
                className="p-1.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition flex items-center gap-0.5 text-xs font-semibold"
                aria-label="Open Lesson Options Menu"
                aria-expanded={isMobileLessonToolsOpen}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0056D2]" />
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {isMobileLessonToolsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs"
                    onClick={() => setIsMobileLessonToolsOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-neutral-200 p-2 z-50 space-y-1 animate-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileLessonToolsOpen(false);
                        setIsJargonModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-amber-50 hover:text-amber-800 text-left transition"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-600" />
                      <span>Jargon Buster Dictionary</span>
                    </button>

                    <div className="px-3 py-1.5 text-[11px] text-neutral-500 flex items-center gap-1.5 border-t border-neutral-100 mt-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Estimated: {lesson.durationMinutes} mins</span>
                    </div>

                    <Link
                      href="/digihub"
                      onClick={() => setIsMobileLessonToolsOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-neutral-100 text-left transition"
                    >
                      <BookOpen className="w-4 h-4 text-[#0056D2]" />
                      <span>All Academy Courses</span>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Primary Action Button (Mark Complete or Next Module) */}
            {isCompleted ? (
              nextLesson ? (
                <Link
                  href={`/digihub/lesson/${nextLesson.id}`}
                  className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-gold hover:bg-brand-gold-dark text-neutral-900 shadow-2xs transition active:scale-98"
                  title={`Continue to Next Module: ${nextLesson.title}`}
                >
                  <span className="hidden xs:inline">Next Module</span>
                  <span className="xs:hidden">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Done</span>
                </span>
              )
            ) : (
              <button
                onClick={handleMarkComplete}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold text-xs shadow-2xs transition active:scale-[0.98]"
              >
                <span>Complete</span>
              </button>
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
      <main
        id="dcg-split-container"
        className="flex-1 max-w-7xl w-full mx-auto p-3.5 sm:p-6 flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0"
      >
        {/* LEFT PANE: Topics, Relatable Explanations, Flashcards & Quiz */}
        <div
          style={{
            width: isDesktop ? `${splitRatio}%` : "100%",
          }}
          className={`${
            mobileActiveView === "guide" ? "flex" : "hidden"
          } lg:flex flex-col space-y-4 lg:pr-3 shrink-0 transition-[width] duration-75`}
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
              <span>Quiz ({lesson.quiz?.length || 0})</span>
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
                <div key={`topic-${activeTopicIndex}`} className="space-y-4 topic-enter">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-blue tracking-wider">
                      Topic 0{currentTopic.topicNumber}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-900 mt-0.5">
                      {cleanNoAsterisks(currentTopic.title)}
                    </h2>
                    <p
                      className={`text-xs mt-1 leading-relaxed transition-all duration-300 ${
                        audioProgress.isPlaying && audioProgress.activeTargetId === "summary"
                          ? "p-2.5 rounded-xl bg-amber-50/90 border border-amber-300/80 text-neutral-900 font-medium ring-2 ring-amber-400/50 shadow-xs"
                          : "text-neutral-600"
                      }`}
                    >
                      {audioProgress.isPlaying && audioProgress.activeTargetId === "summary" && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 mr-1.5 animate-pulse">
                          <Volume2 className="w-3 h-3 text-amber-600" /> Reading:
                        </span>
                      )}
                      <InteractiveSpokenText
                        targetId="summary"
                        text={currentTopic.summary}
                        activeTargetId={audioProgress.activeTargetId}
                        activeWordIndex={audioProgress.activeWordIndex}
                      />
                    </p>
                  </div>

                  {/* 1. Voice Narration Player for Beginners with Live Progress */}
                  <AudioNarrationPlayer
                    title={cleanNoAsterisks(currentTopic.title)}
                    summary={cleanNoAsterisks(currentTopic.summary)}
                    sections={currentTopic.sections || []}
                    keyTakeaways={currentTopic.keyTakeaways || []}
                    onAudioProgress={(info) => setAudioProgress(info)}
                  />

                  {/* Topic Sections with Analogies and Clean Snippets */}
                  <div className="space-y-4 pt-2">
                    {(currentTopic.sections || []).map((sec, idx) => {
                      const isSectionActive =
                        audioProgress.isPlaying &&
                        (audioProgress.activeTargetId === `sec-${idx}-heading` ||
                          audioProgress.activeTargetId === `sec-${idx}-exp` ||
                          audioProgress.activeTargetId === `sec-${idx}-analogy` ||
                          audioProgress.activeSectionIndex === idx);

                      return (
                        <div
                          key={idx}
                          id={`section-card-${idx}`}
                          className={`p-4 rounded-2xl transition-all duration-300 space-y-2.5 ${
                            isSectionActive
                              ? "bg-blue-50/80 border-2 border-brand-blue/70 ring-2 ring-brand-blue/30 shadow-md scale-[1.008]"
                              : "bg-neutral-50/70 border border-neutral-200/80"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-2">
                              <span
                                className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold transition ${
                                  isSectionActive
                                    ? "bg-brand-blue text-white shadow-2xs"
                                    : "bg-brand-blue-light text-brand-blue"
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <InteractiveSpokenText
                                targetId={`sec-${idx}-heading`}
                                text={cleanNoAsterisks(sec.heading)}
                                activeTargetId={audioProgress.activeTargetId}
                                activeWordIndex={audioProgress.activeWordIndex}
                              />
                            </h3>

                            {isSectionActive && (
                              <span className="px-2 py-0.5 rounded-full bg-brand-blue text-white text-[10px] font-bold flex items-center gap-1 shadow-2xs animate-pulse">
                                <Volume2 className="w-3 h-3" />
                                {audioProgress.activeTargetId === `sec-${idx}-analogy`
                                  ? "Analogy"
                                  : "Speaking"}
                              </span>
                            )}
                          </div>

                          <p
                            className={`text-xs leading-relaxed transition-colors ${
                              isSectionActive
                                ? "text-neutral-900 font-normal"
                                : "text-neutral-700"
                            }`}
                          >
                            <InteractiveSpokenText
                              targetId={`sec-${idx}-exp`}
                              text={sec.explanation}
                              activeTargetId={audioProgress.activeTargetId}
                              activeWordIndex={audioProgress.activeWordIndex}
                            />
                          </p>

                          {/* Real-World Analogy Callout with Ghanaian highlight */}
                          {sec.analogy && (
                            <div
                              className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 transition-all duration-300 ${
                                audioProgress.isPlaying &&
                                audioProgress.activeTargetId === `sec-${idx}-analogy`
                                  ? "bg-amber-100 border-2 border-amber-400 ring-2 ring-amber-300 text-amber-950 shadow-md scale-[1.01]"
                                  : "bg-amber-50/80 border border-amber-200/70 text-amber-950"
                              }`}
                            >
                              <Lightbulb
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  audioProgress.isPlaying &&
                                  audioProgress.activeTargetId === `sec-${idx}-analogy`
                                    ? "text-amber-700 animate-bounce"
                                    : "text-amber-600"
                                }`}
                              />
                              <div className="leading-relaxed">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="font-bold text-amber-900">
                                    Ghanaian Everyday Analogy:{" "}
                                  </span>
                                  {audioProgress.isPlaying &&
                                    audioProgress.activeTargetId === `sec-${idx}-analogy` && (
                                      <span className="text-[9px] bg-amber-600 text-white font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider animate-pulse">
                                        Active Audio
                                      </span>
                                    )}
                                </div>
                                <InteractiveSpokenText
                                  targetId={`sec-${idx}-analogy`}
                                  text={sec.analogy}
                                  activeTargetId={audioProgress.activeTargetId}
                                  activeWordIndex={audioProgress.activeWordIndex}
                                />
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
                      );
                    })}
                  </div>

                  {/* Key Takeaways */}
                  {currentTopic.keyTakeaways && currentTopic.keyTakeaways.length > 0 && (
                    <div
                      className={`p-4 rounded-2xl border space-y-2 transition-all duration-300 ${
                        audioProgress.isPlaying && audioProgress.activeTargetId === "takeaways"
                          ? "bg-blue-100/90 border-2 border-blue-500 ring-2 ring-blue-300 shadow-md scale-[1.01]"
                          : "bg-blue-50/60 border border-blue-200/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                          Quick Bite-Sized Takeaways:
                        </span>
                        {audioProgress.isPlaying &&
                          audioProgress.activeTargetId === "takeaways" && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center gap-1 animate-pulse">
                              <Volume2 className="w-3 h-3" /> Reading Takeaways
                            </span>
                          )}
                      </div>
                      <ul className="space-y-1.5 text-xs text-blue-950">
                        {currentTopic.keyTakeaways.map((takeaway, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <InteractiveSpokenText
                              targetId="takeaways"
                              text={cleanNoAsterisks(takeaway)}
                              activeTargetId={audioProgress.activeTargetId}
                              activeWordIndex={audioProgress.activeWordIndex}
                            />
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
          {activePaneTab === "flashcards" && (() => {
            const currentTheme =
              FLASHCARD_BRAND_THEMES[
                activeCardIndex % FLASHCARD_BRAND_THEMES.length
              ];

            return (
              <div className="bg-white rounded-3xl border border-neutral-200 p-4 sm:p-6 shadow-2xs space-y-4 sm:space-y-5 overflow-hidden">
                {/* Header with Card Count & Active Brand Theme */}
                <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-neutral-900 text-sm">
                      Card {activeCardIndex + 1} of {flashcards.length}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-xs transition-all duration-300 text-white ${currentTheme.dotColor}`}
                    >
                      ● {currentTheme.name}
                    </span>
                  </div>

                  <span className="text-neutral-500 text-[11px] hidden sm:inline">
                    Swipe left/right to change cards • Keys:{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-[10px] text-neutral-700 border border-neutral-300">
                      Space
                    </kbd>
                    /
                    <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-[10px] text-neutral-700 border border-neutral-300">
                      F
                    </kbd>{" "}
                    to flip,{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-[10px] text-neutral-700 border border-neutral-300">
                      ←
                    </kbd>
                    /
                    <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-[10px] text-neutral-700 border border-neutral-300">
                      →
                    </kbd>
                  </span>
                </div>

                {/* Interactive Flashcard Stage with Swipe Away Physics */}
                <div className="relative w-full min-h-[340px] sm:min-h-[320px] h-[340px] sm:h-[320px] select-none">
                  {/* ACTIVE FLASHCARD (Interactive Drag, Tilt, 3D Flip & Fling Physics) */}
                  <div
                    onPointerDown={handleCardPointerDown}
                    onPointerMove={handleCardPointerMove}
                    onPointerUp={handleCardPointerUp}
                    onPointerCancel={handleCardPointerUp}
                    className="cursor-grab active:cursor-grabbing w-full h-full perspective-1000 select-none relative z-10 touch-none group"
                    style={{
                      transform:
                        swipeExitDirection === "left"
                          ? "translateX(-140vw) translateY(-28px) rotate(-24deg)"
                          : swipeExitDirection === "right"
                          ? "translateX(140vw) translateY(-28px) rotate(24deg)"
                          : `translateX(${dragDeltaX}px) translateY(${dragDeltaY}px) rotate(${
                              dragDeltaX * 0.08
                            }deg)`,
                      opacity:
                        swipeExitDirection !== null
                          ? 0
                          : isDraggingCard
                          ? Math.max(0.75, 1 - Math.abs(dragDeltaX) / 450)
                          : 1,
                      transition: isDraggingCard
                        ? "none"
                        : isAnimatingExit
                        ? "transform 300ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 280ms ease-out"
                        : "transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                    }}
                  >
                    {/* Visual Swipe Direction Badges */}
                    {dragDeltaX < -20 && (
                      <div
                        className="absolute top-4 right-4 z-30 px-3.5 py-1.5 rounded-full bg-white text-neutral-950 text-xs font-black shadow-xl flex items-center gap-1.5 pointer-events-none transition-opacity ring-2 ring-black/10 animate-pulse"
                        style={{
                          opacity: Math.min(1, (Math.abs(dragDeltaX) - 15) / 35),
                        }}
                      >
                        <span>NEXT CARD</span>
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                    {dragDeltaX > 20 && (
                      <div
                        className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-full bg-white text-neutral-950 text-xs font-black shadow-xl flex items-center gap-1.5 pointer-events-none transition-opacity ring-2 ring-black/10 animate-pulse"
                        style={{
                          opacity: Math.min(1, (dragDeltaX - 15) / 35),
                        }}
                      >
                        <ChevronLeft className="w-4 h-4 stroke-[3]" />
                        <span>PREVIOUS CARD</span>
                      </div>
                    )}

                    <div
                      className={`relative w-full h-full flashcard-inner rounded-3xl transition-transform duration-500 transform-style-preserve-3d ${
                        isCardFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* FRONT FACE: Vibrant Brand Saturated Gradient with Frosted Badges */}
                      <div
                        className={`absolute inset-0 backface-hidden w-full h-full rounded-3xl p-5 sm:p-7 border-2 ${currentTheme.frontBorder} ${currentTheme.frontGradient} ${currentTheme.frontShadow} flex flex-col justify-between text-center transition-all duration-300 relative overflow-hidden`}
                      >
                        {/* Ambient decorative glow orbs */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-white/20 blur-2xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-black/25 blur-2xl pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] font-bold relative z-10">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${currentTheme.frontBadgeBg}`}
                          >
                            ● {currentTheme.categoryTag}
                          </span>
                          <span className="text-white/80 font-mono text-[11px] bg-black/20 backdrop-blur-sm px-2.5 py-0.5 rounded-md border border-white/20">
                            Card {activeCardIndex + 1}/{flashcards.length}
                          </span>
                        </div>

                        <div className="py-4 text-base sm:text-lg md:text-xl font-black text-white leading-snug tracking-tight my-auto px-2 relative z-10 overflow-y-auto max-h-44">
                          {flashcards[activeCardIndex]?.front}
                        </div>

                        <div className="relative z-10 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCardFlipped(true);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition ${currentTheme.frontFlipButtonBg} shadow-sm backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer`}
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Flip to Reveal Answer</span>
                          </button>
                        </div>
                      </div>

                      {/* BACK FACE: Deep Obsidian / Midnight Contrast Face with Ghanaian Analogy */}
                      <div
                        className={`absolute inset-0 backface-hidden rotate-y-180 w-full h-full rounded-3xl p-5 sm:p-7 border-2 ${currentTheme.backBorder} ${currentTheme.backGradient} ${currentTheme.backShadow} text-white flex flex-col justify-between text-center transition-all duration-300 relative overflow-hidden`}
                      >
                        {/* Ambient decorative glow */}
                        <div className="absolute -top-20 -left-20 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />

                        <div className="flex items-center justify-between text-[11px] font-bold relative z-10">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${currentTheme.backBadgeBg}`}
                          >
                            ✓ ANSWER & INSIGHT
                          </span>
                          <span className="text-white/60 font-mono text-[11px]">
                            {currentTheme.name}
                          </span>
                        </div>

                        <div
                          className={`py-2 text-sm sm:text-base font-bold leading-relaxed overflow-y-auto max-h-32 px-1 relative z-10 ${currentTheme.backTextColor}`}
                        >
                          {flashcards[activeCardIndex]?.back}
                        </div>

                        {flashcards[activeCardIndex]?.analogy && (
                          <div
                            className={`relative z-10 text-xs italic px-3.5 py-2.5 rounded-2xl border max-h-24 overflow-y-auto text-left sm:text-center ${currentTheme.analogyCardBg} ${currentTheme.analogyCardBorder}`}
                          >
                            <span className="font-bold text-amber-300 not-italic">
                              💡 Ghanaian Analogy:{" "}
                            </span>
                            <span className={currentTheme.analogyCardText}>
                              {flashcards[activeCardIndex].analogy}
                            </span>
                          </div>
                        )}

                        <div className="relative z-10 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCardFlipped(false);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition bg-white/15 hover:bg-white/25 border border-white/30 text-white shadow-sm backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Flip Back to Question</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Brand Color Indicators (Click any dot to fling smoothly to that card) */}
                <div className="flex items-center justify-center gap-2 pt-2 flex-wrap">
                  {flashcards.map((_, dotIdx) => {
                    const dotTheme =
                      FLASHCARD_BRAND_THEMES[
                        dotIdx % FLASHCARD_BRAND_THEMES.length
                      ];
                    const isActive = dotIdx === activeCardIndex;

                    return (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => {
                          if (dotIdx !== activeCardIndex && !isAnimatingExit) {
                            triggerSwipeAway(
                              dotIdx > activeCardIndex ? "left" : "right"
                            );
                            setTimeout(() => setActiveCardIndex(dotIdx), 150);
                          }
                        }}
                        className={`transition-all duration-300 rounded-full flex items-center gap-1.5 ${
                          isActive
                            ? `px-3.5 py-1 text-white text-[11px] font-black shadow-md ${dotTheme.dotColor} ring-2 ring-white/70 scale-105`
                            : `w-3 h-3 ${dotTheme.dotColor} opacity-50 hover:opacity-100 hover:scale-125`
                        }`}
                        title={`Go to Card ${dotIdx + 1}: ${dotTheme.name}`}
                      >
                        {isActive && (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>{dotTheme.name}</span>
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Card Controls with Authentic Swipe-Away Physics */}
                <div className="flex items-center justify-between gap-3 pt-2 border-t border-neutral-100">
                  <button
                    type="button"
                    disabled={isAnimatingExit}
                    onClick={() => triggerSwipeAway("right")}
                    className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 active:scale-95 text-xs font-bold text-neutral-700 transition flex items-center gap-1.5 shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4 text-neutral-500" />
                    <span>Previous Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCardFlipped((prev) => !prev)}
                    className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 active:scale-95 text-xs font-bold text-neutral-700 transition flex items-center gap-1.5 shadow-2xs"
                    title="Flip active card"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{isCardFlipped ? "Show Question" : "Reveal Answer"}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isAnimatingExit}
                    onClick={() => triggerSwipeAway("left")}
                    className={`px-5 py-2.5 rounded-xl text-white text-xs font-black transition shadow-md active:scale-95 flex items-center gap-1.5 ${
                      activeCardIndex < flashcards.length - 1
                        ? "bg-[#0056D2] hover:bg-[#00419e]"
                        : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
                  >
                    <span>
                      {activeCardIndex < flashcards.length - 1
                        ? "Next Card"
                        : "Restart Deck"}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          {/* TAB 3: QUIZ */}
          {activePaneTab === "quiz" && (
            <div className="space-y-3">
              <QuizWidget
                questions={lesson.quiz || []}
                xpAward={lesson.xpAward}
                onQuizCompleted={(score: number, total: number) => {
                  if (score === total) {
                    handleMarkComplete();
                  } else {
                    playSuccessChime();
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* DESKTOP DRAGGABLE SPLIT GUTTER */}
        <div
          onMouseDown={handleMouseDownSplit}
          onDoubleClick={() => setSplitRatio(42)}
          title="Drag to resize workspace (Double-click to reset 42/58)"
          className="hidden lg:flex w-4 items-center justify-center cursor-col-resize select-none group relative py-4 hover:bg-neutral-200/50 rounded-full transition mx-1 shrink-0"
        >
          <div
            className={`w-1 rounded-full transition-all duration-150 ${
              isDraggingSplit
                ? "bg-brand-blue h-full shadow-md scale-x-125"
                : "bg-neutral-300 h-28 group-hover:bg-neutral-400 group-hover:h-36"
            }`}
          />
          <div className="absolute opacity-0 group-hover:opacity-100 bg-neutral-900 text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow pointer-events-none transition whitespace-nowrap -top-3">
            {splitRatio}% / {100 - splitRatio}%
          </div>
        </div>

        {/* RIGHT PANE: Interactive Labs & Practice Ground */}
        <div
          style={{
            width: isDesktop ? `${100 - splitRatio}%` : "100%",
          }}
          className={`${
            mobileActiveView === "lab" ? "flex" : "hidden"
          } lg:flex flex-col space-y-3 lg:pl-3 shrink-0 ${
            isMobileLabFullscreen
              ? "fixed inset-0 z-50 bg-neutral-900/95 backdrop-blur-md p-4 overflow-y-auto w-full h-full"
              : ""
          }`}
        >
          {/* Lab View Switcher & Focus Mode Header */}
          <div className="flex items-center justify-between p-2.5 bg-white rounded-2xl border border-neutral-200 shadow-2xs text-xs gap-2">
            <span className="text-neutral-500 font-medium pl-1 text-[11px] truncate">
              {showBasicsLab ? "Showing: Zero-Fear PC & Phone Basics" : "Showing: Interactive Module Workspace"}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setShowBasicsLab(!showBasicsLab)}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0056D2] font-bold text-[11px] transition border border-blue-200"
              >
                {showBasicsLab ? "← Return to Lab" : "🖱️ PC Basics Sandbox"}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileLabFullscreen((prev) => !prev)}
                className="p-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition"
                title={isMobileLabFullscreen ? "Exit Focus Mode" : "Expand Lab Focus Mode"}
              >
                {isMobileLabFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-brand-blue" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-neutral-600" />
                )}
              </button>
            </div>
          </div>

          {/* MOBILE QUICK CODING TOUCH BAR */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin select-none py-1.5 px-2 bg-neutral-900 rounded-2xl border border-neutral-800 text-xs shadow-inner">
            <div className="px-2 py-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider shrink-0">
              ⌨️ Touch Keys:
            </div>
            {QUICK_CODE_SYMBOLS.map((sym) => (
              <button
                key={sym.label}
                type="button"
                onClick={() => handleInsertSymbol(sym.insert)}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:bg-brand-blue text-sky-300 font-mono text-xs font-semibold shrink-0 transition active:scale-95"
              >
                {sym.label}
              </button>
            ))}
            {copiedSymbol && (
              <span className="text-[10px] text-emerald-400 font-medium px-2 py-0.5 rounded-md bg-emerald-950/70 border border-emerald-800 shrink-0">
                Copied &quot;{copiedSymbol}&quot;
              </span>
            )}
          </div>

          {/* 3. Computer & Phone Basics 101 Sandbox */}
          {showBasicsLab ? (
            <ComputerBasicsLab onLabCompleted={handleMarkComplete} />
          ) : (
            <>
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
                <div className="space-y-4">
                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 text-center space-y-2">
                    <BookOpen className="w-8 h-8 text-neutral-400 mx-auto" />
                    <h3 className="text-sm font-bold text-neutral-800">Reading &amp; Conceptual Topic</h3>
                    <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                      Use the voice reader on the left to listen to this topic, or practice your digital foundation skills in the sandbox below:
                    </p>
                  </div>
                  <ComputerBasicsLab onLabCompleted={handleMarkComplete} />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* ─── SLIDE-OUT CURRICULUM DRAWER ─────────────────────────────────── */}
      {isCurriculumDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity drawer-overlay"
            onClick={() => setIsCurriculumDrawerOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 z-10 space-y-4 drawer-panel">
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
                const isModDone = (learnerProgress?.completedLessonIds || []).includes(l.id);

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

      {/* ─── MOVABLE AI STUDY COACH (DRAGGABLE & VIEWPORT-CLAMPED) ──────── */}
      <MovableAICoach
        currentLessonTitle={cleanNoAsterisks(lesson.title)}
        currentModuleTitle={cleanNoAsterisks(lesson.moduleTitle)}
        currentTopicTitle={cleanNoAsterisks(currentTopic?.title)}
        userProgressXp={learnerProgress.xp}
        openSignal={coachOpenSignal}
      />

      {/* ─── JARGON BUSTER PLAIN LANGUAGE MODAL ───────────────────────── */}
      <JargonBusterModal
        isOpen={isJargonModalOpen}
        onClose={() => setIsJargonModalOpen(false)}
      />
    </div>
  );
}
