"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Bot,
  X,
  Minimize2,
  Maximize2,
  Send,
  Sparkles,
  Volume2,
  RotateCcw,
  Move,
  Lightbulb,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  Shield,
  Code2,
  User,
} from "lucide-react";

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

  // Dragging state
  // Start near bottom-right on desktop
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasInteractedWithPosition, setHasInteractedWithPosition] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number }>({
    mouseX: 0,
    mouseY: 0,
    posX: 0,
    posY: 0,
  });

  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // React to external openSignal (e.g. user clicked "Study Coach" button in header)
  useEffect(() => {
    if (openSignal && openSignal > 0) {
      setIsOpen(true);
      setIsMinimized(false);
    }
  }, [openSignal]);

  // Initialize initial welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: `Akwaaba! 👋 I am your DIGI AI Study Coach. Whether you are holding a mouse for the very first time or writing your first line of code, remember: you can NEVER break the computer here! Ask me anything, or tap any quick prompt below.`,
      timestamp: "Just now",
      analogy: "Think of me as a patient elder sibling or tech tutor sitting right beside your desk in Accra.",
    },
  ]);

  // Center or default position on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const defaultRight = Math.max(20, window.innerWidth - 420);
      const defaultBottom = Math.max(20, window.innerHeight - 560);
      setPosition({ x: defaultRight, y: defaultBottom });
    }
  }, []);

  // Clamping to screen boundaries during resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, Math.max(10, window.innerWidth - 400)),
        y: Math.min(prev.y, Math.max(10, window.innerHeight - 520)),
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

  // ─── DRAG LOGIC (MOUSE & TOUCH) ──────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag from header handle, not buttons inside header
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) {
      return;
    }
    setIsDragging(true);
    setHasInteractedWithPosition(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: position.x,
      posY: position.y,
    };
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) {
      return;
    }
    const touch = e.touches[0];
    setIsDragging(true);
    setHasInteractedWithPosition(true);
    dragStartRef.current = {
      mouseX: touch.clientX,
      mouseY: touch.clientY,
      posX: position.x,
      posY: position.y,
    };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartRef.current.mouseX;
      const deltaY = e.clientY - dragStartRef.current.mouseY;

      const maxX = Math.max(10, window.innerWidth - 380);
      const maxY = Math.max(10, window.innerHeight - 480);

      const newX = Math.max(10, Math.min(dragStartRef.current.posX + deltaX, maxX));
      const newY = Math.max(10, Math.min(dragStartRef.current.posY + deltaY, maxY));

      setPosition({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartRef.current.mouseX;
      const deltaY = touch.clientY - dragStartRef.current.mouseY;

      const maxX = Math.max(10, window.innerWidth - 360);
      const maxY = Math.max(10, window.innerHeight - 440);

      const newX = Math.max(10, Math.min(dragStartRef.current.posX + deltaX, maxX));
      const newY = Math.max(10, Math.min(dragStartRef.current.posY + deltaY, maxY));

      setPosition({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleEndDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleEndDrag);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleEndDrag);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEndDrag);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEndDrag);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleEndDrag]);

  const snapToCorner = () => {
    if (typeof window !== "undefined") {
      const defaultRight = Math.max(20, window.innerWidth - 410);
      const defaultBottom = Math.max(20, window.innerHeight - 560);
      setPosition({ x: defaultRight, y: defaultBottom });
    }
  };

  // ─── AUDIO SPEECH FOR CHAT MESSAGES ──────────────────────────────────
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

  // ─── INTELLIGENT BEGINNER REASONING ENGINE ────────────────────────────
  const generateBotResponse = (userQuery: string): { text: string; analogy?: string; hintSteps?: string[] } => {
    const q = userQuery.toLowerCase().trim();

    // 1. Fear of breaking the computer
    if (q.includes("break") || q.includes("mistake") || q.includes("damage") || q.includes("scared") || q.includes("afraid") || q.includes("wrong")) {
      return {
        text: "You can NEVER permanently break your computer by clicking buttons, typing words, or making a code mistake in this academy! If code doesn't work, we simply press Backspace or refresh the browser. That is how real software engineers learn every single day.",
        analogy: "Like writing with a pencil on paper. If you write the wrong letter, you just use the eraser and try again. The paper doesn't catch fire!",
        hintSteps: [
          "1. If you make a typo, press the 'Backspace' key on your keyboard to erase it.",
          "2. If a page gets stuck, press the circle arrow button (Refresh) in your browser.",
          "3. Take a deep breath: every mistake teaches your brain something new!"
        ],
      };
    }

    // 2. Analogy request
    if (q.includes("analogy") || q.includes("ghana") || q.includes("simple") || q.includes("explain") || q.includes("like i'm 10") || q.includes("relatable")) {
      const topicContext = currentTopicTitle || currentLessonTitle || "Web Technology";
      return {
        text: `Here is the simplest way to understand "${topicContext}": In the digital world, every complex screen is just built from 3 simple ideas: the structure (like cement blocks), the look (like wall paint), and the actions (like light switches).`,
        analogy: "Think of preparing a delicious pot of Jollof Rice in Ghana: HTML is the rice and tomatoes in the pot; CSS is the aroma, plating, and garnish; JavaScript is the stove flame turning on and off when you turn the knob.",
        hintSteps: [
          "Don't worry about memorizing big definitions right away.",
          "Focus on what the button or tag actually DOES on the screen.",
          "Try touching or changing one word at a time in the sandbox to see what happens."
        ],
      };
    }

    // 3. Lab exercise help / hints
    if (q.includes("lab") || q.includes("code") || q.includes("solve") || q.includes("exercise") || q.includes("stuck") || q.includes("challenge") || q.includes("how do i")) {
      return {
        text: `To solve this hands-on exercise with zero stress, follow these 3 calm steps:`,
        analogy: "Like building a LEGO toy or threading a sewing needle: do one step at a time rather than rushing to the finish line.",
        hintSteps: [
          "Step 1: Read the yellow/blue 'Challenge Instructions' at the top of the right pane.",
          "Step 2: Look at the sample code already written for you. Most exercises only need you to edit 1 or 2 words inside the tags.",
          "Step 3: Click 'Run & Preview' or 'Run Tests' to see your live result. If it fails, read the green/red hint box at the bottom!"
        ],
      };
    }

    // 4. Tech job / earning income in Ghana
    if (q.includes("job") || q.includes("career") || q.includes("money") || q.includes("income") || q.includes("earn") || q.includes("salary") || q.includes("work")) {
      return {
        text: "Across Ghana (from Accra and Tema to Kumasi and Takoradi), companies, schools, hospitals, and churches are moving their records online. They urgently need young people who know how to protect computers from scams, create simple websites, and manage digital spreadsheets.",
        analogy: "Having digital skills today is like knowing how to drive a vehicle 30 years ago. It gives you keys to work in almost any business in the country.",
        hintSteps: [
          "1. Finish your lessons to unlock your verified faculty-signed diploma.",
          "2. Book a free 1-on-1 session with our DCG mentors (look under the Mentorship tab!).",
          "3. Save the small web projects you build here to show future employers."
        ],
      };
    }

    // 5. What is a browser / HTML / URL
    if (q.includes("browser") || q.includes("url") || q.includes("html") || q.includes("css") || q.includes("cloud") || q.includes("phishing")) {
      return {
        text: `Great question! We also have a 1-click 'Jargon Buster' dictionary at the top of your screen that translates these terms into plain language anytime.`,
        analogy: "A Browser (like Google Chrome) is like your trotro or taxi car. A URL is the destination house GPS address. The Internet is the highway road.",
        hintSteps: [
          "Click the golden 'Jargon Buster' button in your top navigation anytime to search any tech word with audio pronunciation!"
        ],
      };
    }

    // 6. Default encouraging coach response
    return {
      text: `That's a thoughtful question! When learning ${currentTopicTitle || "digital skills"}, the secret is to be patient with yourself. You are building digital intuition step-by-step.`,
      analogy: "Learning technology is like learning to ride a bicycle. The first time your hands feel shaky, but after a few practices, your fingers remember naturally.",
      hintSteps: [
        "1. Read the short guide on the left pane or tap 'Listen' to hear it out loud.",
        "2. Try the interactive buttons on the right pane.",
        "3. Remember you can ask me anything anytime—I am always right here on your screen!"
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

    // Simulate thoughtful typing response
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

  const quickPrompts = [
    { label: "💡 Simple Analogy", query: "Give me an everyday Ghanaian analogy for this topic" },
    { label: "💻 Lab Challenge Hint", query: "How do I solve the lab exercise step by step?" },
    { label: "🛡️ Can I break anything?", query: "Can I break the computer if I make a mistake?" },
    { label: "🚀 Tech Jobs in Ghana", query: "How is this skill used for tech jobs in Ghana?" },
  ];

  return (
    <>
      {/* ─── FLOATING MINIMIZED LAUNCHER BADGE ────────────────────────────── */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            left: hasInteractedWithPosition ? `${position.x}px` : undefined,
            top: hasInteractedWithPosition ? `${position.y}px` : undefined,
            right: hasInteractedWithPosition ? undefined : "24px",
            bottom: hasInteractedWithPosition ? undefined : "24px",
            zIndex: 9999,
          }}
          className="animate-in fade-in zoom-in duration-300"
        >
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#0056D2] via-indigo-600 to-[#00419e] text-white shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 select-none cursor-pointer"
            aria-label="Open AI Study Coach"
          >
            {/* Soft pulsing glow ring */}
            <span className="absolute -inset-1 rounded-full bg-blue-500/30 blur-sm group-hover:bg-blue-500/50 transition" />

            <div className="relative w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0056D2]" />
            </div>

            <div className="relative text-left pr-1">
              <div className="text-xs font-extrabold tracking-tight leading-tight flex items-center gap-1.5">
                <span>DIGI AI Coach</span>
                <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded-md font-bold">
                  24/7 Help
                </span>
              </div>
              <span className="text-[10px] text-blue-100 font-medium block">
                Tap to ask anything • Move anywhere
              </span>
            </div>
          </button>
        </div>
      )}

      {/* ─── EXPANDED / MOVABLE CHAT WINDOW ──────────────────────────────── */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          style={{
            position: "fixed",
            left: `${position.x}px`,
            top: `${position.y}px`,
            zIndex: 9999,
          }}
          className={`w-[94vw] sm:w-[390px] ${
            isMinimized ? "h-auto" : "h-[540px] max-h-[85vh]"
          } bg-white rounded-3xl shadow-2xl border-2 border-neutral-200/90 flex flex-col overflow-hidden transition-shadow select-none animate-in zoom-in-95 duration-200 ${
            isDragging ? "shadow-indigo-500/25 ring-2 ring-[#0056D2] cursor-grabbing" : "shadow-2xl"
          }`}
        >
          {/* DRAGGABLE HEADER */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className={`px-4 py-3 bg-gradient-to-r from-[#0056D2] via-indigo-600 to-[#00419e] text-white flex items-center justify-between gap-2.5 cursor-grab active:cursor-grabbing border-b border-white/10 ${
              isDragging ? "cursor-grabbing" : ""
            }`}
            title="Click & drag anywhere on this header to reposition the coach window"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold truncate">DIGI AI Study Coach</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-blue-100 truncate">
                  <Move className="w-3 h-3 shrink-0 opacity-70" />
                  <span className="truncate">Drag me anywhere on your screen</span>
                </div>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Reset/Snap Button */}
              <button
                type="button"
                onClick={snapToCorner}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-[10px]"
                title="Reset position to bottom-right"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              {/* Minimize/Expand Toggle */}
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition text-[10px]"
                title={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/80 text-white transition text-[10px]"
                title="Close chat bubble"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CHAT BODY (Hidden when minimized) */}
          {!isMinimized && (
            <>
              {/* Context bar if on a lesson */}
              {(currentTopicTitle || currentLessonTitle) && (
                <div className="px-3.5 py-1.5 bg-blue-50/90 border-b border-blue-100 flex items-center justify-between text-[11px] text-neutral-600">
                  <span className="truncate font-semibold text-[#0056D2]">
                    Topic: {currentTopicTitle || currentLessonTitle}
                  </span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-blue-200 text-neutral-500 shrink-0">
                    Active Coach Context
                  </span>
                </div>
              )}

              {/* Messages Scroll Area */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-neutral-50/50 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    } animate-fade-in-up`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-3.5 space-y-2 shadow-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#0056D2] text-white rounded-br-sm"
                          : "bg-white text-neutral-900 border border-neutral-200/90 rounded-bl-sm"
                      }`}
                    >
                      <div className="text-xs">{msg.text}</div>

                      {/* Ghanaian Everyday Analogy Box */}
                      {msg.analogy && (
                        <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-[11px] space-y-1">
                          <span className="font-bold flex items-center gap-1 text-amber-900">
                            <Lightbulb className="w-3 h-3 text-amber-600 shrink-0" />
                            Ghanaian Everyday Analogy:
                          </span>
                          <p>{msg.analogy}</p>
                        </div>
                      )}

                      {/* Step-by-step guidance list */}
                      {msg.hintSteps && (
                        <div className="space-y-1 pt-1 text-[11px] text-neutral-700 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                          {msg.hintSteps.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5">
                              <span className="text-[#0056D2] font-bold">•</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Bot Audio Read-Aloud Button */}
                      {msg.sender === "bot" && (
                        <div className="pt-1 flex items-center justify-between border-t border-neutral-100 text-[10px]">
                          <button
                            type="button"
                            onClick={() => handleSpeak(msg.id, msg.text, msg.analogy)}
                            className={`inline-flex items-center gap-1 font-semibold transition ${
                              isSpeakingId === msg.id
                                ? "text-[#0056D2] animate-pulse font-bold"
                                : "text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>{isSpeakingId === msg.id ? "Speaking answer..." : "Listen to answer"}</span>
                          </button>
                          <span className="text-neutral-400">{msg.timestamp}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-neutral-400 text-xs italic bg-white p-2.5 rounded-2xl border border-neutral-200 w-max animate-pulse">
                    <Bot className="w-3.5 h-3.5 text-[#0056D2]" />
                    <span>Coach is thinking...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Chips */}
              <div className="p-2 bg-white border-t border-neutral-100 overflow-x-auto flex items-center gap-1.5 text-xs">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(p.query)}
                    className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-blue-50 hover:text-[#0056D2] text-neutral-700 text-[11px] font-semibold shrink-0 transition border border-neutral-200 active:scale-95"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* CHAT INPUT BAR */}
              <div className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask any question (e.g., 'What does URL mean?')..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/15 text-xs text-neutral-900 outline-none transition"
                />
                <button
                  type="button"
                  disabled={!inputText.trim()}
                  onClick={() => handleSendMessage()}
                  className="p-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] disabled:opacity-40 text-white transition shadow-sm active:scale-95 shrink-0"
                  aria-label="Send message to AI Coach"
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
