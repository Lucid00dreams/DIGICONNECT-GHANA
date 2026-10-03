"use client";

import React from "react";
import Link from "next/link";
import { Cookie, Settings2, Check, X } from "lucide-react";
import { useCookieConsent } from "@/context/CookieContext";
import { useToast } from "@/context/ToastContext";

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();
  const { showToast } = useToast();

  if (!showBanner) return null;

  const handleAcceptAll = () => {
    acceptAll();
    showToast("Cookies accepted. Thank you!", "success");
  };

  const handleRejectNonEssential = () => {
    rejectNonEssential();
    showToast("Non-essential cookies declined.", "info");
  };

  return (
    <aside
      aria-label="Cookie consent notice"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-[90] animate-slideUp"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-neutral-200/90 text-neutral-700">
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Cookie size={22} className="animate-spin-slow" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-brand-dark flex items-center gap-2">
              We Value Your Privacy
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              DigiConnect Ghana uses cookies to ensure security, personalize your learning experience, and evaluate how our technology programs create measurable impact. See our{" "}
              <Link
                href="/privacy"
                className="underline font-semibold text-brand-blue hover:text-brand-blue-dark"
              >
                Cookie & Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={openPreferences}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center gap-1.5 transition-colors order-3 sm:order-1"
          >
            <Settings2 size={14} />
            Preferences
          </button>
          <div className="w-full sm:w-auto flex items-center gap-2 sm:ml-auto order-1 sm:order-2">
            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              Reject Non-Essential
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold transition-colors shadow-xs flex items-center justify-center gap-1.5"
            >
              <Check size={14} />
              Accept All
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
