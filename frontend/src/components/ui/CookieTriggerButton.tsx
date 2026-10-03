"use client";

import React from "react";
import { Cookie } from "lucide-react";
import { useCookieConsent } from "@/context/CookieContext";
import { usePathname } from "next/navigation";

export function CookieTriggerButton() {
  const { openPreferences, showBanner, isHydrated } = useCookieConsent();
  const pathname = usePathname();

  // Hide on admin connecthub or while initial banner is showing
  if (!isHydrated || showBanner || pathname.startsWith("/connecthub")) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={openPreferences}
      aria-label="Manage cookie settings"
      title="Cookie Settings"
      className="fixed bottom-4 left-4 z-40 group flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-brand-dark shadow-md hover:shadow-lg border border-neutral-200/80 backdrop-blur-xs transition-all duration-200 text-xs font-medium"
    >
      <Cookie size={16} className="text-amber-500 group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline">Cookie Settings</span>
    </button>
  );
}
