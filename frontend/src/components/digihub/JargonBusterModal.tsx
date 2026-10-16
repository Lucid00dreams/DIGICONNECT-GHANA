"use client";

import React, { useState } from "react";
import {
  X,
  Search,
  BookOpen,
  Lightbulb,
  Sparkles,
  Volume2,
  Check,
  Tag,
  Laptop,
  Globe,
  Shield,
  Code2,
} from "lucide-react";
import { JARGON_TERMS, JargonTerm } from "@/lib/jargonData";

interface JargonBusterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearch?: string;
}

export function JargonBusterModal({
  isOpen,
  onClose,
  initialSearch = "",
}: JargonBusterModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [pronouncingTerm, setPronouncingTerm] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSpeakTerm = (term: string, simpleDef: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${term}. ${simpleDef}`);
      utterance.rate = 0.9;
      setPronouncingTerm(term);
      utterance.onend = () => setPronouncingTerm(null);
      utterance.onerror = () => setPronouncingTerm(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredTerms = JARGON_TERMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.term.toLowerCase().includes(q) ||
      item.simpleDefinition.toLowerCase().includes(q) ||
      item.africanAnalogy.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "All Terms", icon: BookOpen },
    { id: "basics", label: "PC & Phone Basics", icon: Laptop },
    { id: "internet", label: "Web & Internet", icon: Globe },
    { id: "security", label: "Safety & Passwords", icon: Shield },
    { id: "coding", label: "Coding & Apps", icon: Code2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-t-[32px] sm:rounded-3xl shadow-2xl max-h-[88vh] sm:max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-200">
        {/* Mobile pull-down drag handle bar */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto my-2.5 shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-100 bg-neutral-50/70 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-2xs">
              <Lightbulb className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                  DIGIHub Jargon Buster
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                  Plain Language Guide
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Everyday Ghanaian analogies for common digital words so you never feel intimidated.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-neutral-200 text-neutral-500 transition"
            aria-label="Close Jargon Buster"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scary words (e.g. Browser, Cloud, Phishing, HTML, URL...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/15 text-xs sm:text-sm text-neutral-900 outline-none transition"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#0056D2] text-white shadow-2xs font-bold"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Terms List Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <BookOpen className="w-10 h-10 text-neutral-300 mx-auto" />
              <h3 className="text-sm font-bold text-neutral-800">No matching tech words found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try searching a different word or select &quot;All Terms&quot; to browse the whole dictionary.
              </p>
            </div>
          ) : (
            filteredTerms.map((item) => (
              <div
                key={item.term}
                className="p-4 sm:p-5 rounded-2xl border border-neutral-200 hover:border-blue-300 bg-white shadow-2xs space-y-3 transition card-lift"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                      {item.term}
                    </h3>
                    {item.pronunciation && (
                      <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-md">
                        /{item.pronunciation}/
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeakTerm(item.term, item.simpleDefinition)}
                    className={`self-start sm:self-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      pronouncingTerm === item.term
                        ? "bg-blue-600 text-white animate-pulse"
                        : "bg-blue-50 hover:bg-blue-100 text-[#0056D2]"
                    }`}
                    title="Hear pronunciation and definition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{pronouncingTerm === item.term ? "Speaking..." : "Pronounce"}</span>
                  </button>
                </div>

                {/* Plain Definition */}
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
                  {item.simpleDefinition}
                </p>

                {/* Ghanaian Everyday Analogy Box */}
                <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-bold text-amber-900">Everyday Ghanaian Analogy: </span>
                    <span>{item.africanAnalogy}</span>
                  </div>
                </div>

                {/* Example sentence */}
                <div className="text-[11px] text-neutral-500 italic pl-1 border-l-2 border-neutral-200">
                  Example: &quot;{item.exampleInSentence}&quot;
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>{filteredTerms.length} terms available • No internet bundles required</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold transition"
          >
            Close Dictionary
          </button>
        </div>
      </div>
    </div>
  );
}
