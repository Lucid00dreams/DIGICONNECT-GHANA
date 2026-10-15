"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  LayoutGrid,
  BookOpen,
  Terminal,
  Users,
  Award,
  Lightbulb,
  Bot,
  Laptop,
  Flame,
  Download,
  Info,
  Rocket,
  Globe,
  Calendar,
  ImageIcon,
  TrendingUp,
  FileText,
  Newspaper,
  Handshake,
  Heart,
  Phone,
  ExternalLink,
  ChevronRight,
  Search,
  Sparkles,
  Shield,
  Code2,
  CheckCircle2,
} from "lucide-react";
import { PCTab } from "./DigihubPCNavbar";

interface DigihubMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (section: PCTab) => void;
  onOpenJargonModal: () => void;
  onOpenCoach: () => void;
  onOpenQuickHub: () => void;
  onOpenExportData: () => void;
  coursesCount?: number;
  certificatesCount?: number;
}

export function DigihubMenuModal({
  isOpen,
  onClose,
  onSelectSection,
  onOpenJargonModal,
  onOpenCoach,
  onOpenQuickHub,
  onOpenExportData,
  coursesCount = 12,
  certificatesCount = 0,
}: DigihubMenuModalProps) {
  const [filterQuery, setFilterQuery] = useState("");

  if (!isOpen) return null;

  const handleSelectTab = (tab: PCTab) => {
    onSelectSection(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto bg-neutral-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-neutral-200/90 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 slide-in-from-top-3 duration-200 ease-out"
        role="dialog"
        aria-modal="true"
        aria-labelledby="explore-menu-title"
      >
        {/* 1. MODAL HEADER */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-neutral-900 via-neutral-800 to-indigo-950 text-white flex items-center justify-between shrink-0 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xs">
              <LayoutGrid className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 id="explore-menu-title" className="text-sm sm:text-base font-bold tracking-tight">
                  DigiConnect Hub Explorer
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#5B67E2] text-white uppercase tracking-wider">
                  Menu
                </span>
              </div>
              <p className="text-[11px] text-neutral-300">
                Explore learning tracks, interactive labs, verified certificates, and portals
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. SEARCH / FILTER BAR */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-50/80 border-b border-neutral-200/70 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Quick search any feature, tool, or website page..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5B67E2]/30 focus:border-[#5B67E2] transition"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 3. SCROLLABLE FEATURE DIRECTORY */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4 text-neutral-900">
          {/* SECTION A: DIGIHUB LMS CORE PORTALS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B67E2] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Digihub LMS Portals</span>
              </span>
              <span className="text-[10px] font-medium text-neutral-400">Click to switch section</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* My Learning */}
              <button
                type="button"
                onClick={() => handleSelectTab("learning")}
                className="text-left p-3.5 rounded-2xl border border-neutral-200/80 bg-white hover:bg-neutral-50/80 hover:border-neutral-300 hover:shadow-xs transition group flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-[#5B67E2] flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <LayoutGrid className="w-4.5 h-4.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-[#5B67E2] transition flex items-center gap-1">
                    <span>Dashboard / My Learning</span>
                    <ChevronRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition" />
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    Resume in-progress courses, view daily study streaks and next lesson
                  </p>
                </div>
              </button>

              {/* Course Catalog */}
              <button
                type="button"
                onClick={() => handleSelectTab("catalog")}
                className="text-left p-3.5 rounded-2xl border border-neutral-200/80 bg-white hover:bg-neutral-50/80 hover:border-neutral-300 hover:shadow-xs transition group flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <BookOpen className="w-4.5 h-4.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 transition flex items-center gap-1">
                    <span>Course Catalog ({coursesCount})</span>
                    <ChevronRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition" />
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    Explore all 12 specializations: Web Dev, Cyber, Cloud, Python, AI
                  </p>
                </div>
              </button>

              {/* Browser Labs */}
              <button
                type="button"
                onClick={() => handleSelectTab("labs")}
                className="text-left p-3.5 rounded-2xl border border-neutral-200/80 bg-white hover:bg-neutral-50/80 hover:border-neutral-300 hover:shadow-xs transition group flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <Terminal className="w-4.5 h-4.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-emerald-600 transition flex items-center gap-1">
                    <span>Browser Coding Labs</span>
                    <ChevronRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition" />
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    5 in-browser sandboxes: Python Shell, Cyber Defense, HTML/CSS, Literacy
                  </p>
                </div>
              </button>

              {/* Mentorship */}
              <button
                type="button"
                onClick={() => handleSelectTab("mentorship")}
                className="text-left p-3.5 rounded-2xl border border-neutral-200/80 bg-white hover:bg-neutral-50/80 hover:border-neutral-300 hover:shadow-xs transition group flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <Users className="w-4.5 h-4.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-purple-600 transition flex items-center gap-1">
                    <span>1-on-1 Mentorship</span>
                    <ChevronRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition" />
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    Schedule free 1-on-1 code reviews with senior engineering mentors
                  </p>
                </div>
              </button>

              {/* Certificates */}
              <button
                type="button"
                onClick={() => handleSelectTab("diplomas")}
                className="text-left p-3.5 rounded-2xl border border-neutral-200/80 bg-white hover:bg-neutral-50/80 hover:border-neutral-300 hover:shadow-xs transition group flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                  <Award className="w-4.5 h-4.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 group-hover:text-amber-600 transition flex items-center gap-1">
                    <span>Certificates & Profile ({certificatesCount})</span>
                    <ChevronRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition" />
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">
                    View verified certificates with QR verification & LinkedIn sharing
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION B: INTERACTIVE TOOLS & UTILITIES */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Interactive Learning Utilities</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {/* Jargon Buster */}
              <button
                type="button"
                onClick={() => {
                  onOpenJargonModal();
                  onClose();
                }}
                className="text-left p-3 rounded-2xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 transition group flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 leading-none">Jargon Buster</h5>
                  <p className="text-[10px] text-neutral-500 mt-1">Plain-English tech terms</p>
                </div>
              </button>

              {/* AI Study Coach */}
              <button
                type="button"
                onClick={() => {
                  onOpenCoach();
                  onClose();
                }}
                className="text-left p-3 rounded-2xl border border-cyan-200/80 bg-cyan-50/40 hover:bg-cyan-50 transition group flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 leading-none">DIGIHUB AI Tutor</h5>
                  <p className="text-[10px] text-neutral-500 mt-1">24/7 personal tutor</p>
                </div>
              </button>

              {/* Quick Hub Settings */}
              <button
                type="button"
                onClick={() => {
                  onOpenQuickHub();
                  onClose();
                }}
                className="text-left p-3 rounded-2xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 transition group flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-neutral-200 text-neutral-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 leading-none">Quick Hub Drawer</h5>
                  <p className="text-[10px] text-neutral-500 mt-1">Progress & quick actions</p>
                </div>
              </button>

              {/* Export Data */}
              <button
                type="button"
                onClick={() => {
                  onOpenExportData();
                  onClose();
                }}
                className="text-left p-3 rounded-2xl border border-indigo-200/80 bg-indigo-50/40 hover:bg-indigo-50 transition group flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-[#5B67E2] flex items-center justify-center shrink-0">
                  <Download className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-neutral-900 leading-none">Export Transcript</h5>
                  <p className="text-[10px] text-neutral-500 mt-1">Download JSON record</p>
                </div>
              </button>
            </div>
          </div>

          {/* SECTION C: MAIN DIGICONNECT GHANA WEBSITE PAGES */}
          <div className="pt-2 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>DigiConnect Ghana Pages (Website Directory)</span>
              </span>
              <span className="text-[11px] font-medium text-neutral-400">Direct Navigation</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              <Link
                href="/about"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>About DigiConnect</span>
              </Link>

              <Link
                href="/about/mission"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Rocket className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mission & Vision</span>
              </Link>

              <Link
                href="/about/team"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Users className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Our Team & Board</span>
              </Link>

              <Link
                href="/programs"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Code2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Empowerment Programs</span>
              </Link>

              <Link
                href="/connecthub"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Globe className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>ConnectHub Portal</span>
              </Link>

              <Link
                href="/events"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Events & Bootcamps</span>
              </Link>

              <Link
                href="/impact"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Impact & Statistics</span>
              </Link>

              <Link
                href="/impact/stories"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Newspaper className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Student Stories</span>
              </Link>

              <Link
                href="/resources"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Learning Resources</span>
              </Link>

              <Link
                href="/gallery"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <ImageIcon className="w-4 h-4 text-violet-600 shrink-0" />
                <span>Photo Gallery</span>
              </Link>

              <Link
                href="/get-involved"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Handshake className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Get Involved / Volunteer</span>
              </Link>

              <Link
                href="/donate"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Heart className="w-4 h-4 text-red-500 shrink-0" />
                <span>Support / Donate</span>
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Contact Headquarters</span>
              </Link>

              <Link
                href="/news"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Newspaper className="w-4 h-4 text-blue-600 shrink-0" />
                <span>News & Press</span>
              </Link>

              <Link
                href="/brand"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Brand Identity</span>
              </Link>

              <Link
                href="/join"
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-neutral-100 flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition"
              >
                <Rocket className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Join Community</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4. MODAL FOOTER */}
        <div className="px-5 py-3 sm:px-8 bg-neutral-100/80 border-t border-neutral-200/80 flex items-center justify-between text-xs text-neutral-500 shrink-0">
          <span>DigiConnect Ghana • Empowering Youth with Modern Tech Skills</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-800 font-bold transition shadow-2xs"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
}
