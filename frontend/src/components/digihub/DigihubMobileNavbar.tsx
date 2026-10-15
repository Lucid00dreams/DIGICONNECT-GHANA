"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  BookOpen,
  Terminal,
  Users,
  Award,
  Sparkles,
  Search,
  Bell,
  X,
  ExternalLink,
  CheckCircle2,
  Compass,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LMSUser, CertificateRecord, MentorshipSession } from "@/lib/lmsStore";
import { DigihubUserMenuDropdown } from "./DigihubUserMenuDropdown";

export type MobileTab = "learning" | "catalog" | "labs" | "mentorship" | "diplomas";

interface DigihubMobileNavbarProps {
  activeSection: MobileTab;
  onSelectSection: (section: MobileTab) => void;
  currentUser?: LMSUser | null;
  unreadNotificationsCount?: number;
  onOpenNotifications?: () => void;
  onOpenSearch?: () => void;
  onOpenCoach?: () => void;
  onOpenProfile?: () => void;
  onOpenMenu?: () => void;
  onSignOut?: () => void;
  onOpenJargonModal?: () => void;
  onOpenQuickHub?: () => void;
  onOpenStreak?: () => void;
  onExportData?: () => void;
  isExporting?: boolean;
}

interface NavItemConfig {
  id: MobileTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "learning", label: "Home", icon: LayoutGrid },
  { id: "catalog", label: "Courses", icon: BookOpen },
  { id: "mentorship", label: "Mentors", icon: Users },
  { id: "diplomas", label: "Diplomas", icon: Award },
];

export function DigihubMobileNavbar({
  activeSection,
  onSelectSection,
  currentUser,
  unreadNotificationsCount = 2,
  onOpenNotifications,
  onOpenSearch,
  onOpenCoach,
  onOpenProfile,
  onOpenMenu,
  onSignOut,
  onOpenJargonModal,
  onOpenQuickHub,
  onOpenStreak,
  onExportData,
  isExporting = false,
}: DigihubMobileNavbarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeSection)
  );

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. COMPACT MOBILE TOP APP BAR (< lg)
          Clean, distraction-free header replacing the clunky dropdown switcher
          ───────────────────────────────────────────────────────────── */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-3.5 py-2.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
          {/* Brand Logo & DIGIHub Badge */}
          <Link href="/digihub" className="flex items-center gap-2 shrink-0 group focus:outline-none">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-white shadow-2xs border border-blue-100 flex items-center justify-center p-0.5 shrink-0">
              <Image
                src="/logo.png"
                alt="DigiConnect Ghana"
                width={32}
                height={32}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-neutral-900 leading-none">
                DIGIHub
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#5B67E2] text-white tracking-wide uppercase">
                LMS
              </span>
            </div>
          </Link>

          {/* Streamlined Mobile Header Actions (Clean, minimal, zero crowding) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Explore Menu Button */}
            {onOpenMenu && (
              <button
                type="button"
                onClick={onOpenMenu}
                className="px-3 py-1.5 rounded-full bg-indigo-50/90 hover:bg-indigo-100 border border-indigo-200/90 text-[#5B67E2] text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:scale-105 active:scale-95 transition-all duration-200"
                title="Explore Menu & All Pages"
                aria-label="Explore Menu"
              >
                <Compass className="w-3.5 h-3.5 stroke-[2] text-[#5B67E2]" />
                <span className="text-[11px]">Menu</span>
              </button>
            )}

            {/* User Avatar with Profile Dropdown Menu */}
            {currentUser && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-8 h-8 rounded-full bg-[#5B67E2] text-white text-xs font-bold flex items-center justify-center ring-2 ring-indigo-100 shadow-2xs hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label="Student account & profile"
                  aria-expanded={isUserMenuOpen}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </button>

                {/* Compact User Menu Card on Mobile View */}
                {isUserMenuOpen && (
                  <DigihubUserMenuDropdown
                    currentUser={currentUser}
                    onSelectSection={(sec) => {
                      onSelectSection(sec);
                      setIsUserMenuOpen(false);
                    }}
                    onOpenJargonModal={() => {
                      if (onOpenJargonModal) onOpenJargonModal();
                      setIsUserMenuOpen(false);
                    }}
                    onOpenCoach={() => {
                      if (onOpenCoach) onOpenCoach();
                      setIsUserMenuOpen(false);
                    }}
                    onOpenStreak={() => {
                      if (onOpenStreak) onOpenStreak();
                      setIsUserMenuOpen(false);
                    }}
                    onOpenQuickHub={() => {
                      if (onOpenQuickHub) onOpenQuickHub();
                      setIsUserMenuOpen(false);
                    }}
                    onExportData={() => {
                      if (onExportData) onExportData();
                      setIsUserMenuOpen(false);
                    }}
                    isExporting={isExporting}
                    onSignOut={() => {
                      if (onSignOut) onSignOut();
                      setIsUserMenuOpen(false);
                    }}
                    onClose={() => setIsUserMenuOpen(false)}
                    className="absolute right-0 top-full mt-2"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. FLOATING SCOOPED BOTTOM NAVIGATION BAR (< lg)
          Faithful reproduction of Image 2 (Mobile Navigation Bar)
          Features:
          - Floating white container with large pill corners
          - Dynamic sliding white dome notch
          - Elevated circular badge with vibrant indigo outline & soft fill
          - Bold active label
          - iOS home indicator bar
          ───────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] left-3 right-3 sm:bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:left-6 sm:right-6 z-50 max-w-md mx-auto select-none pointer-events-auto"
      >
        <div className="relative bg-white/98 backdrop-blur-lg rounded-[28px] sm:rounded-[32px] shadow-[0_12px_40px_rgba(25,20,90,0.18)] border border-neutral-200/80 pt-1.5 pb-2 px-1">
          {/* Dynamic Sliding Dome Notch + Elevated Circular Active Indicator */}
          <div
            className="absolute -top-[20px] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              left: `${activeIndex * 25}%`,
              width: "25%",
            }}
          >
            <div className="relative w-full flex flex-col items-center">
              {/* White Scooped Dome Contour (seamlessly extends the white bar upward) */}
              <svg
                width="84"
                height="24"
                viewBox="0 0 84 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-[1px] text-white"
                style={{
                  filter: "drop-shadow(0 -3px 3px rgba(0, 0, 0, 0.03))",
                }}
              >
                <path
                  d="M 0 24 C 18 24 22 1 42 1 C 62 1 66 24 84 24 Z"
                  fill="white"
                />
                <path
                  d="M 0 24 C 18 24 22 1 42 1 C 62 1 66 24 84 24"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>

              {/* Elevated Circular Badge with periwinkle/indigo border & soft fill */}
              <div className="relative z-10 w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#EEF2FF] border-[2.5px] border-[#5B67E2] shadow-[0_8px_18px_rgba(91,103,226,0.38)] flex items-center justify-center text-[#5B67E2] animate-in zoom-in-75 duration-200">
                {NAV_ITEMS[activeIndex] &&
                  React.createElement(NAV_ITEMS[activeIndex].icon, {
                    className: "w-6 h-6 stroke-[2.2] text-[#5B67E2]",
                  })}
              </div>
            </div>
          </div>

          {/* 4 Navigation Item Slots */}
          <div className="relative z-10 grid grid-cols-4 items-end">
            {NAV_ITEMS.map((item, index) => {
              const isActive = index === activeIndex;
              const IconComponent = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSection(item.id)}
                  className="flex flex-col items-center justify-end h-[52px] sm:h-[56px] pb-1 pt-1 group focus:outline-none transition-all duration-150 active:scale-90"
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Icon for inactive state (hidden when elevated circle is active in this slot) */}
                  <div
                    className={`transition-all duration-200 ${
                      isActive
                        ? "opacity-0 scale-75 -translate-y-2 pointer-events-none h-4"
                        : "opacity-100 scale-100 group-hover:scale-110 text-neutral-400 group-hover:text-neutral-700"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  {/* Label (Bold when active, subtle medium when inactive) */}
                  <span
                    className={`text-[11px] tracking-tight leading-tight transition-all duration-200 ${
                      isActive
                        ? "font-bold text-neutral-900 mt-1 scale-105"
                        : "font-medium text-neutral-500 group-hover:text-neutral-800 mt-1"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* iOS Style Home Indicator Bar */}
          <div className="w-24 sm:w-28 h-1 bg-neutral-300 rounded-full mx-auto mt-1 mb-0.5" />
        </div>
      </nav>
    </>
  );
}
