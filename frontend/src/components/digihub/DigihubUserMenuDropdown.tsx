"use client";

import React, { useRef, useEffect } from "react";
import {
  Award,
  Bookmark,
  Sparkles,
  Flame,
  SlidersHorizontal,
  Download,
  LogOut,
  User,
  ShieldCheck,
} from "lucide-react";
import { LMSUser } from "@/lib/lmsStore";

interface DigihubUserMenuDropdownProps {
  currentUser: LMSUser;
  streakDays?: number;
  onSelectSection: (section: any) => void;
  onOpenJargonModal: () => void;
  onOpenCoach: () => void;
  onOpenStreak: () => void;
  onOpenQuickHub: () => void;
  onExportData: () => void;
  isExporting?: boolean;
  onSignOut: () => void;
  onClose: () => void;
  className?: string;
}

export function DigihubUserMenuDropdown({
  currentUser,
  streakDays = 1,
  onSelectSection,
  onOpenJargonModal,
  onOpenCoach,
  onOpenStreak,
  onOpenQuickHub,
  onExportData,
  isExporting = false,
  onSignOut,
  onClose,
  className = "",
}: DigihubUserMenuDropdownProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape or click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      {/* Invisible backdrop for mobile tap dismissal */}
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Compact, smaller menu card */}
      <div
        ref={menuRef}
        className={`w-48 sm:w-52 bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-neutral-200/90 p-1.5 z-50 animate-in zoom-in-95 duration-150 select-none ${className}`}
        role="menu"
        aria-orientation="vertical"
      >
        {/* Compact User Header */}
        <div className="px-2.5 py-1.5 border-b border-neutral-100 bg-neutral-50/70 rounded-xl mb-1">
          <div className="flex items-center justify-between gap-1">
            <p className="text-[11px] font-bold text-neutral-900 truncate leading-tight">
              {currentUser.name}
            </p>
            <span className="px-1 py-0.2 rounded text-[8px] font-bold bg-indigo-50 text-[#5B67E2] uppercase">
              Student
            </span>
          </div>
          <p className="text-[9.5px] text-neutral-400 truncate mt-0.5 font-mono">
            {currentUser.email}
          </p>
        </div>

        {/* Compact Navigation Actions */}
        <div className="space-y-0.5">
          <button
            type="button"
            onClick={() => {
              onSelectSection("diplomas");
              onClose();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/90 text-neutral-700 hover:text-neutral-900 text-[11px] font-medium flex items-center gap-2 transition active:scale-98"
            role="menuitem"
          >
            <Award className="w-3.5 h-3.5 text-[#5B67E2] shrink-0" />
            <span className="truncate">My Certificates</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenJargonModal();
              onClose();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/90 text-neutral-700 hover:text-neutral-900 text-[11px] font-medium flex items-center gap-2 transition active:scale-98"
            role="menuitem"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">Jargon Buster</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenCoach();
              onClose();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/90 text-neutral-700 hover:text-neutral-900 text-[11px] font-medium flex items-center gap-2 transition active:scale-98"
            role="menuitem"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
            <span className="truncate">DIGIHUB AI Tutor</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenStreak();
              onClose();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/90 text-neutral-700 hover:text-neutral-900 text-[11px] font-medium flex items-center gap-2 transition active:scale-98"
            role="menuitem"
          >
            <Flame className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="truncate">Study Streak ({streakDays}d)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenQuickHub();
              onClose();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/90 text-neutral-700 hover:text-neutral-900 text-[11px] font-medium flex items-center gap-2 transition active:scale-98"
            role="menuitem"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
            <span className="truncate">Settings &amp; Quick Hub</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onExportData();
              onClose();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-neutral-100/90 text-neutral-700 hover:text-neutral-900 text-[11px] font-medium flex items-center gap-2 transition active:scale-98"
            role="menuitem"
          >
            <Download className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="truncate">
              {isExporting ? "Exporting..." : "Export Transcript (.json)"}
            </span>
          </button>
        </div>

        {/* Sign Out Action */}
        <div className="pt-1 mt-1 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-50 text-red-600 text-[11px] font-semibold flex items-center gap-2 transition active:scale-98"
            role="menuitem"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
