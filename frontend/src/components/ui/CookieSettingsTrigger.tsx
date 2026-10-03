"use client";

import React from "react";
import { Sliders } from "lucide-react";
import { useCookieConsent } from "@/context/CookieContext";

export function CookieSettingsTrigger({ className = "" }: { className?: string }) {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue font-semibold text-sm transition-colors cursor-pointer ${className}`}
    >
      <Sliders size={16} />
      <span>Open Cookie Settings</span>
    </button>
  );
}
