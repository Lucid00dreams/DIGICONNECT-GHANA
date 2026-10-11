"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Minimize2,
  Maximize2,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Move,
  Lightbulb,
  Terminal,
  ShieldCheck,
  Briefcase,
  BookOpen,
  Copy,
  Check,
  CornerDownLeft,
} from "lucide-react";

// ─── 3D CYAN ROBOT AVATAR COMPONENT ──────────────────────────────────────────
export function DigiHubBotAvatar({
  size = 38,
  isSpeaking = false,
  isThinking = false,
  className = "",
}: {
  size?: number;
  isSpeaking?: boolean;
  isThinking?: boolean;
  className?: string;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`relative select-none shrink-0 transition-transform duration-300 ${
        isThinking ? "animate-pulse" : ""
      } ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* Soft ambient cyan aura */}
      <div
        className="absolute -inset-0.5 rounded-full bg-cyan-400/25 blur-xs pointer-events-none transition-all duration-300"
        style={{
          transform: isSpeaking ? "scale(1.2)" : "scale(1.04)",
          opacity: isSpeaking ? 0.9 : 0.5,
        }}
      />

      {/* 3D Cyan Robot Mascot matching reference image */}
      {!imageError ? (
        <img
          src="/images/digihub-ai-robot.png"
          alt="DIGIHUB AI"
          width={size}
          height={size}
          className="relative w-full h-full object-contain filter drop-shadow-md transition-transform duration-200 pointer-events-none"
          onError={() => setImageError(true)}
          draggable={false}
        />
      ) : (
        /* Vector SVG Fallback */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="14" r="8" fill="#00A3FF" />
          <circle cx="48" cy="12" r="2.5" fill="#FFFFFF" opacity="0.8" />
          <rect x="47" y="20" width="6" height="8" rx="3" fill="#008AD8" />
          <rect x="8" y="44" width="10" height="26" rx="5" fill="#008AD8" />
          <rect x="82" y="44" width="10" height="26" rx="5" fill="#008AD8" />
          <rect x="14" y="24" width="72" height="66" rx="30" fill="url(#cyanGradFallback)" />
          <rect x="22" y="34" width="56" height="46" rx="20" fill="#0F172A" />
          <circle cx="38" cy="54" r="6" fill="#FFFFFF" />
          <circle cx="62" cy="54" r="6" fill="#FFFFFF" />
          <path d="M40 68 Q50 76 60 68" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="cyanGradFallback" x1="14" y1="24" x2="86" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#0284C7" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}

// ─── TYPES & INTERFACES ──────────────────────────────────────────────────────
interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  analogy?: string;
  hintSteps?: string[];
}

interface MovableAICoachProps {
  currentLessonTitle?: string;
  currentModuleTitle?: string;
  currentTopicTitle?: string;
  userProgressXp?: number;
  openSignal?: number;
}

export function MovableAICoach({
  currentLessonTitle,
  currentModuleTitle,
  currentTopicTitle,
  userProgressXp = 0,
  openSignal,
}: MovableAICoachProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Position state for the CIRCULAR LAUNCHER ICON
  const [launcherPos, setLauncherPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasInteractedLauncher, setHasInteractedLauncher] = useState(false);

  // Position state for the EXPANDED CHAT WINDOW
  const [chatPos, setChatPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasInteractedChat, setHasInteractedChat] = useState(false);

  // Launcher drag tracking refs (Pointer Events for ultra-smooth free movement)
  const isDraggingLauncher = useRef(false);
  const launcherDragStart = useRef({ startX: 0, startY: 0, origX: 0, origY: 0 });
  const hasLauncherMoved = useRef(false);
  const [isDraggingLauncherUI, setIsDraggingLauncherUI] = useState(false);

  // Window drag tracking refs
  const isDraggingChat = useRef(false);
  const chatDragStart = useRef({ startX: 0, startY: 0, origX: 0, origY: 0 });
  const [isDraggingChatUI, setIsDraggingChatUI] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // React to external openSignal (e.g. from top nav button)
  useEffect(() => {
    if (openSignal && openSignal > 0) {
      setIsOpen(true);
      setIsMinimized(false);
    }
  }, [openSignal]);

  // Initial welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Akwaaba! 👋 I am DIGIHUB AI, your study coach. Whether you are learning computer basics or building websites, you can NEVER break the computer here! Ask me anything or tap any quick prompt below.",
      timestamp: "Just now",
      analogy: "Think of me as a patient Ghanaian elder sibling or tech tutor sitting right beside your desk.",
    },
  ]);

  // Set default initial positions on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const defaultLauncherX = Math.max(16, window.innerWidth - 92);
      const defaultLauncherY = Math.max(16, window.innerHeight - 96);
      setLauncherPos({ x: defaultLauncherX, y: defaultLauncherY });

      const defaultChatX = Math.max(16, window.innerWidth - 425);
      const defaultChatY = Math.max(16, window.innerHeight - 580);
      setChatPos({ x: defaultChatX, y: defaultChatY });
    }
  }, []);

  // Screen resize clamping
  useEffect(() => {
    const handleResize = () => {
      setLauncherPos((prev) => ({
        x: Math.min(prev.x, Math.max(10, window.innerWidth - 86)),
        y: Math.min(prev.y, Math.max(10, window.innerHeight - 86)),
      }));
      setChatPos((prev) => ({
        x: Math.min(prev.x, Math.max(10, window.innerWidth - 420)),
        y: Math.min(prev.y, Math.max(10, window.innerHeight - 560)),
      }));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  // ─── FREE DRAGGING FOR CIRCULAR LAUNCHER ICON ──────────────────────────────
  const handleLauncherPointerDown = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    isDraggingLauncher.current = true;
    hasLauncherMoved.current = false;
    setIsDraggingLauncherUI(true);
    setHasInteractedLauncher(true);
    launcherDragStart.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: launcherPos.x,
      origY: launcherPos.y,
    };
  };

  const handleLauncherPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingLauncher.current) return;
    const deltaX = e.clientX - launcherDragStart.current.startX;
    const deltaY = e.clientY - launcherDragStart.current.startY;

    if (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4) {
      hasLauncherMoved.current = true;
    }

    const maxX = Math.max(10, window.innerWidth - 86);
    const maxY = Math.max(10, window.innerHeight - 86);

    const newX = Math.max(10, Math.min(launcherDragStart.current.origX + deltaX, maxX));
    const newY = Math.max(10, Math.min(launcherDragStart.current.origY + deltaY, maxY));

    setLauncherPos({ x: newX, y: newY });
  };

  const handleLauncherPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingLauncher.current) return;
    isDraggingLauncher.current = false;
    setIsDraggingLauncherUI(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // If tapped without moving, open the chat window!
    if (!hasLauncherMoved.current) {
      // Calculate chat window position near launcher if not already dragged
      if (!hasInteractedChat && typeof window !== "undefined") {
        const chatWidth = window.innerWidth < 640 ? window.innerWidth - 24 : 410;
        const candidateX = Math.max(12, Math.min(launcherPos.x - 330, window.innerWidth - chatWidth - 12));
        const candidateY = Math.max(12, Math.min(launcherPos.y - 480, window.innerHeight - 580));
        setChatPos({ x: candidateX, y: candidateY });
      }
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  // ─── FREE DRAGGING FOR EXPANDED CHAT WINDOW HEADER ────────────────────────
  const handleChatPointerDown = (e: React.PointerEvent) => {
    // Exclude clicks on header control buttons
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    isDraggingChat.current = true;
    setIsDraggingChatUI(true);
    setHasInteractedChat(true);
    chatDragStart.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: chatPos.x,
      origY: chatPos.y,
    };
  };

  const handleChatPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingChat.current) return;
    const deltaX = e.clientX - chatDragStart.current.startX;
    const deltaY = e.clientY - chatDragStart.current.startY;

    const chatWidth = window.innerWidth < 640 ? window.innerWidth - 24 : 410;
    const maxX = Math.max(10, window.innerWidth - chatWidth - 10);
    const maxY = Math.max(10, window.innerHeight - 500);

    const newX = Math.max(10, Math.min(chatDragStart.current.origX + deltaX, maxX));
    const newY = Math.max(10, Math.min(chatDragStart.current.origY + deltaY, maxY));

    setChatPos({ x: newX, y: newY });
  };

  const handleChatPointerUp = (e: React.PointerEvent) => {
    if (!isDraggingChat.current) return;
    isDraggingChat.current = false;
    setIsDraggingChatUI(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const snapChatToCorner = () => {
    if (typeof window !== "undefined") {
      const defaultChatX = Math.max(16, window.innerWidth - 425);
      const defaultChatY = Math.max(16, window.innerHeight - 580);
      setChatPos({ x: defaultChatX, y: defaultChatY });
    }
  };

  // ─── AUDIO SPEECH NARRATION ───────────────────────────────────────────────
  const handleSpeak = (msgId: string, text: string, analogy?: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isSpeakingId === msgId) {
        window.speechSynthesis.cancel();
        setIsSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const spokenContent = analogy ? `${text}. Everyday Analogy: ${analogy}` : text;
      const utterance = new SpeechSynthesisUtterance(spokenContent.replace(/[#*•]/g, ""));
      utterance.rate = 0.92;
      utterance.pitch = 1.0;
      utterance.lang = "en-US";
      setIsSpeakingId(msgId);
      utterance.onend = () => setIsSpeakingId(null);
      utterance.onerror = () => setIsSpeakingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ─── AI REASONING ENGINE (GHANAIAN ANALOGIES & STEP GUIDANCE) ─────────────
  const generateBotResponse = (userQuery: string): { text: string; analogy?: string; hintSteps?: string[] } => {
    const q = userQuery.toLowerCase().trim();

    if (q.includes("break") || q.includes("mistake") || q.includes("damage") || q.includes("scared") || q.includes("afraid") || q.includes("wrong")) {
      return {
        text: "You can NEVER permanently break your computer by clicking buttons, typing words, or making a code mistake here! If code doesn't work, we simply press Backspace or refresh the browser. That is how real engineers learn every day.",
        analogy: "Like writing with a pencil on paper. If you write the wrong letter, you just use the eraser and try again. The paper doesn't catch fire!",
        hintSteps: [
          "If you make a typo, press the 'Backspace' key to erase it.",
          "If a page gets stuck, press the circle arrow button (Refresh) in your browser.",
          "Every mistake teaches your brain something new!"
        ],
      };
    }

    if (q.includes("analogy") || q.includes("ghana") || q.includes("simple") || q.includes("explain") || q.includes("like i'm 10") || q.includes("relatable")) {
      const topicContext = currentTopicTitle || currentLessonTitle || "Digital Skills";
      return {
        text: `Here is the simplest way to understand "${topicContext}": In the digital world, every complex screen is just built from 3 simple ideas: the structure (like cement blocks), the look (like wall paint), and the actions (like light switches).`,
        analogy: "Think of preparing Jollof Rice in Ghana: HTML is the rice and tomatoes in the pot; CSS is the aroma, plating, and garnish; JavaScript is the stove flame turning on and off when you turn the knob.",
        hintSteps: [
          "Don't worry about memorizing big definitions right away.",
          "Focus on what the button or tag actually DOES on screen.",
          "Try touching or changing one word at a time in the sandbox to see what happens."
        ],
      };
    }

    if (q.includes("lab") || q.includes("code") || q.includes("solve") || q.includes("exercise") || q.includes("stuck") || q.includes("challenge") || q.includes("how do i")) {
      return {
        text: "To solve this hands-on exercise with zero stress, follow these 3 calm steps:",
        analogy: "Like threading a sewing needle or building with LEGO: do one step at a time rather than rushing to the finish line.",
        hintSteps: [
          "Step 1: Read the Challenge Instructions at the top of the right pane.",
          "Step 2: Look at the sample code provided. Most exercises only need you to edit 1 or 2 words inside the tags.",
          "Step 3: Click 'Run & Preview' or 'Run Tests' to see your live result. If it fails, read the hint box at the bottom!"
        ],
      };
    }

    if (q.includes("job") || q.includes("career") || q.includes("money") || q.includes("income") || q.includes("earn") || q.includes("salary") || q.includes("work")) {
      return {
        text: "Across Ghana (from Accra and Tema to Kumasi and Takoradi), businesses, schools, hospitals, and churches are moving records online. They urgently need young people who know how to protect computers, build clean websites, and manage spreadsheets.",
        analogy: "Having digital skills today is like knowing how to drive a vehicle 30 years ago. It gives you keys to work in almost any business in the country.",
        hintSteps: [
          "Finish your lessons to unlock your verified faculty-signed diploma.",
          "Book a free 1-on-1 session with our DCG mentors (look under the Mentorship tab!).",
          "Save the small web projects you build here to show future employers."
        ],
      };
    }

    if (q.includes("browser") || q.includes("url") || q.includes("html") || q.includes("css") || q.includes("cloud") || q.includes("phishing")) {
      return {
        text: "Great question! We also have a 1-click 'Jargon Buster' dictionary in your top bar that translates these terms into plain language anytime.",
        analogy: "A Browser (like Google Chrome) is like your trotro or taxi car. A URL is the destination house GPS address. The Internet is the highway road.",
        hintSteps: [
          "Click the golden 'Jargon Buster' button in your top navigation anytime to search any tech word with audio pronunciation!"
        ],
      };
    }

    return {
      text: `That's a thoughtful question! When learning ${currentTopicTitle || "digital skills"}, the secret is to be patient with yourself. You are building digital intuition step by step.`,
      analogy: "Learning technology is like learning to ride a bicycle. The first time your hands feel shaky, but after a few practices, your fingers remember naturally.",
      hintSteps: [
        "Read the short guide on the left pane or tap 'Listen' to hear it out loud.",
        "Try the interactive buttons on the right pane.",
        "Remember you can ask me anything anytime—I am always right here on your screen!"
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponseData = generateBotResponse(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botResponseData.text,
        timestamp: "Just now",
        analogy: botResponseData.analogy,
        hintSteps: botResponseData.hintSteps,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick prompt chips with Flat Lucide Icons
  const quickPrompts = [
    { label: "Simple Analogy", icon: Lightbulb, query: "Give me an everyday Ghanaian analogy for this topic" },
    { label: "Lab Challenge Hint", icon: Terminal, query: "How do I solve the lab exercise step by step?" },
    { label: "Can I break anything?", icon: ShieldCheck, query: "Can I break the computer if I make a mistake?" },
    { label: "Tech Jobs in Ghana", icon: Briefcase, query: "How is this skill used for tech jobs in Ghana?" },
  ];

  return (
    <>
      {/* ─── 1. COMPACT CIRCULAR LAUNCHER (FREELY MOVABLE ANYWHERE) ───────── */}
      {!isOpen && (
        <div
          onPointerDown={handleLauncherPointerDown}
          onPointerMove={handleLauncherPointerMove}
          onPointerUp={handleLauncherPointerUp}
          onPointerCancel={handleLauncherPointerUp}
          style={{
            position: "fixed",
            left: `${launcherPos.x}px`,
            top: `${launcherPos.y}px`,
            zIndex: 9999,
            touchAction: "none",
          }}
          className={`select-none transition-shadow ${
            isDraggingLauncherUI ? "cursor-grabbing scale-105" : "cursor-grab"
          }`}
          title="DIGIHUB AI • Drag to move freely, tap to open"
        >
          {/* Circular Button containing ONLY the Mascot Icon & DIGIHUB AI name */}
          <div className="relative group w-[72px] h-[72px] sm:w-[76px] sm:h-[76px] rounded-full bg-white/95 hover:bg-white border-2 border-cyan-400/90 shadow-xl hover:shadow-cyan-500/35 flex flex-col items-center justify-center p-1 backdrop-blur-md active:scale-95 transition-transform duration-150">
            {/* Ambient Cyan Glow Aura */}
            <div className="absolute -inset-1 rounded-full bg-cyan-400/25 blur-xs group-hover:bg-cyan-400/40 transition pointer-events-none" />

            {/* Robot Mascot Head with Breathing Float */}
            <div className="relative bot-float -mt-1 shrink-0">
              <DigiHubBotAvatar size={38} />
            </div>

            {/* DIGIHUB AI Name in Circle */}
            <span className="relative text-[9px] sm:text-[9.5px] font-black tracking-tight text-neutral-900 leading-none mt-0.5 font-digihub group-hover:text-[#0056D2] transition-colors shrink-0">
              DIGIHUB AI
            </span>

            {/* Online Status Green Indicator */}
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-xs animate-pulse" />
          </div>
        </div>
      )}

      {/* ─── 2. EXPANDED MOVABLE CHAT WINDOW ──────────────────────────────── */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            left: `${chatPos.x}px`,
            top: `${chatPos.y}px`,
            zIndex: 9999,
          }}
          className={`w-[calc(100vw-24px)] sm:w-[410px] ${
            isMinimized ? "h-auto" : "h-[560px] max-h-[86vh]"
          } bg-white rounded-3xl shadow-2xl border-2 border-neutral-200/90 flex flex-col overflow-hidden select-none animate-in zoom-in-95 duration-150 ${
            isDraggingChatUI ? "shadow-cyan-500/30 ring-2 ring-cyan-500 cursor-grabbing" : "shadow-2xl"
          }`}
        >
          {/* DRAGGABLE HEADER */}
          <div
            onPointerDown={handleChatPointerDown}
            onPointerMove={handleChatPointerMove}
            onPointerUp={handleChatPointerUp}
            onPointerCancel={handleChatPointerUp}
            style={{ touchAction: "none" }}
            className={`px-4 py-3 bg-gradient-to-r from-[#0056D2] via-blue-600 to-cyan-600 text-white flex items-center justify-between gap-2.5 cursor-grab active:cursor-grabbing border-b border-white/10 ${
              isDraggingChatUI ? "cursor-grabbing" : ""
            }`}
            title="Drag anywhere on this header to move DIGIHUB AI window freely"
          >
            {/* Header Mascot + DIGIHUB AI Name */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative bot-float">
                <DigiHubBotAvatar size={34} isSpeaking={isSpeakingId !== null} isThinking={isTyping} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold tracking-tight font-digihub truncate">
                    DIGIHUB AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-xs animate-pulse" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-blue-100 truncate">
                  <Move className="w-3 h-3 shrink-0 opacity-80" />
                  <span className="truncate">Moveable Study Coach</span>
                </div>
              </div>
            </div>

            {/* Flat Controls from Lucide Icons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={snapChatToCorner}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs"
                title="Reset position to corner"
                aria-label="Reset position"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-xs"
                title={isMinimized ? "Expand window" : "Minimize window"}
                aria-label="Toggle minimize"
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500 text-white transition text-xs"
                title="Close chat"
                aria-label="Close window"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CHAT BODY (Hidden when minimized) */}
          {!isMinimized && (
            <>
              {/* Active Topic Banner */}
              {(currentTopicTitle || currentLessonTitle) && (
                <div className="px-3.5 py-1.5 bg-blue-50/90 border-b border-blue-100 flex items-center justify-between text-[11px] text-neutral-600">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <BookOpen className="w-3 h-3 text-[#0056D2] shrink-0" />
                    <span className="truncate font-semibold text-[#0056D2]">
                      Topic: {currentTopicTitle || currentLessonTitle}
                    </span>
                  </div>
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-md border border-blue-200 text-neutral-500 shrink-0 font-medium">
                    Active Context
                  </span>
                </div>
              )}

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-neutral-50/50 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    } animate-fade-in-up`}
                  >
                    {msg.sender === "bot" && (
                      <div className="mt-1">
                        <DigiHubBotAvatar size={26} isSpeaking={isSpeakingId === msg.id} />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 shadow-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#0056D2] text-white rounded-br-sm"
                          : "bg-white text-neutral-900 border border-neutral-200/90 rounded-bl-sm"
                      }`}
                    >
                      <div className="text-xs">{msg.text}</div>

                      {/* Everyday Ghanaian Analogy Box */}
                      {msg.analogy && (
                        <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-[11px] space-y-1">
                          <span className="font-bold flex items-center gap-1.5 text-amber-900">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            Everyday Ghanaian Analogy:
                          </span>
                          <p className="leading-relaxed">{msg.analogy}</p>
                        </div>
                      )}

                      {/* Step-by-Step Guidance */}
                      {msg.hintSteps && (
                        <div className="space-y-1 pt-1 text-[11px] text-neutral-700 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                          {msg.hintSteps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5">
                              <span className="text-cyan-600 font-bold">•</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Flat Actions for Bot Responses */}
                      {msg.sender === "bot" && (
                        <div className="pt-1.5 flex items-center justify-between border-t border-neutral-100 text-[10px]">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleSpeak(msg.id, msg.text, msg.analogy)}
                              className={`inline-flex items-center gap-1 font-semibold transition ${
                                isSpeakingId === msg.id
                                  ? "text-[#0056D2] font-bold"
                                  : "text-neutral-500 hover:text-neutral-900"
                              }`}
                            >
                              {isSpeakingId === msg.id ? (
                                <>
                                  <VolumeX className="w-3 h-3 text-rose-500" />
                                  <span className="text-rose-600">Stop Voice</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3" />
                                  <span>Listen to answer</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCopy(msg.id, msg.text)}
                              className="inline-flex items-center gap-1 text-neutral-500 hover:text-neutral-900 transition"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-emerald-600 font-semibold">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <span className="text-neutral-400">{msg.timestamp}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2.5 text-neutral-500 text-xs bg-white px-3.5 py-2.5 rounded-2xl border border-neutral-200/90 shadow-xs w-max animate-pulse">
                    <DigiHubBotAvatar size={22} isThinking={true} />
                    <span className="font-medium">DIGIHUB AI is thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Flat Quick Prompt Chips (Lucide Icons) */}
              <div className="p-2 bg-white border-t border-neutral-100 overflow-x-auto flex items-center gap-1.5 text-xs">
                {quickPrompts.map((p, idx) => {
                  const IconComponent = p.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(p.query)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-neutral-100 hover:bg-cyan-50 hover:text-[#0056D2] text-neutral-700 text-[11px] font-semibold shrink-0 transition border border-neutral-200 active:scale-95"
                    >
                      <IconComponent className="w-3 h-3 text-cyan-600 shrink-0" />
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask DIGIHUB AI anything (e.g. 'What is a URL?')..."
                    className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-neutral-200 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/15 text-xs text-neutral-900 outline-none transition"
                  />
                  <CornerDownLeft className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <button
                  type="button"
                  disabled={!inputText.trim()}
                  onClick={() => handleSendMessage()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#0056D2] to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-40 text-white transition shadow-sm active:scale-95 shrink-0"
                  aria-label="Send message to DIGIHUB AI"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
