"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, Check, ShieldCheck, BarChart3, Sliders, Share2, Info } from "lucide-react";
import { useCookieConsent } from "@/context/CookieContext";
import { useToast } from "@/context/ToastContext";

export function CookiePreferencesModal() {
  const {
    preferences,
    showPreferencesModal,
    closePreferences,
    saveCustomPreferences,
    acceptAll,
    rejectNonEssential,
  } = useCookieConsent();
  const { showToast } = useToast();

  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [functional, setFunctional] = useState(preferences.functional);
  const [marketing, setMarketing] = useState(preferences.marketing);

  // Sync state whenever modal opens or preferences update
  useEffect(() => {
    setAnalytics(preferences.analytics);
    setFunctional(preferences.functional);
    setMarketing(preferences.marketing);
  }, [preferences, showPreferencesModal]);

  if (!showPreferencesModal) return null;

  const handleSave = () => {
    saveCustomPreferences({
      analytics,
      functional,
      marketing,
    });
    showToast("Cookie preferences updated successfully", "success");
    closePreferences();
  };

  const handleAcceptAll = () => {
    acceptAll();
    showToast("All cookies accepted", "success");
    closePreferences();
  };

  const handleRejectNonEssential = () => {
    rejectNonEssential();
    showToast("Non-essential cookies declined", "info");
    closePreferences();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-neutral-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">
              <Sliders size={20} />
            </div>
            <div>
              <h2 id="cookie-modal-title" className="text-lg font-bold text-brand-dark">
                Cookie Preferences
              </h2>
              <p className="text-xs text-neutral-500">
                Manage how DigiConnect Ghana uses cookies on your device
              </p>
            </div>
          </div>
          <button
            onClick={closePreferences}
            className="w-9 h-9 rounded-full hover:bg-neutral-200/70 text-neutral-400 hover:text-neutral-700 flex items-center justify-center transition-colors"
            aria-label="Close cookie modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-neutral-600">
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/80 flex gap-3 text-xs leading-relaxed text-blue-900">
            <Info size={18} className="shrink-0 text-brand-blue mt-0.5" />
            <p>
              We respect your right to privacy. You can choose not to allow some types of cookies. Click on the different category headings below to learn more and customize your preferences. For more details, see our{" "}
              <Link
                href="/privacy"
                onClick={closePreferences}
                className="underline font-semibold hover:text-brand-blue"
              >
                Privacy & Cookie Policy
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4">
            {/* 1. Necessary Cookies */}
            <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-brand-dark text-sm">
                        Strictly Necessary Cookies
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700">
                        Always Active
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Essential for security, basic navigation, session management, and storing your consent preferences. These cannot be disabled.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 pt-1">
                  <div className="w-11 h-6 rounded-full bg-emerald-500 flex items-center px-1 cursor-not-allowed opacity-90">
                    <div className="w-4 h-4 rounded-full bg-white ml-auto flex items-center justify-center shadow-xs">
                      <Check size={10} className="text-emerald-600 font-bold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Analytics Cookies */}
            <div className="p-4 rounded-2xl border border-neutral-200 bg-white hover:border-brand-blue/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                    <BarChart3 size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">
                      Analytics & Performance Cookies
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Allow us to count visits and traffic sources so we can measure and improve program engagement, popular learning guides, and platform performance.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analytics}
                    onClick={() => setAnalytics(!analytics)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 ${
                      analytics ? "bg-brand-blue" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform shadow-xs ${
                        analytics ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Functional Cookies */}
            <div className="p-4 rounded-2xl border border-neutral-200 bg-white hover:border-brand-blue/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <Sliders size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">
                      Functional & Experience Cookies
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Enable enhanced functionality and personalization, such as remembering your form input drafts, language, or accessibility preferences.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={functional}
                    onClick={() => setFunctional(!functional)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 ${
                      functional ? "bg-brand-blue" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform shadow-xs ${
                        functional ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Marketing / Media Cookies */}
            <div className="p-4 rounded-2xl border border-neutral-200 bg-white hover:border-brand-blue/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 w-8 h-8 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0">
                    <Share2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-sm">
                      Community & Social Media Cookies
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Enable interactive community video embeds, social sharing buttons, and tracking for impact awareness campaigns across Ghana.
                    </p>
                  </div>
                </div>
                <div className="shrink-0 pt-1">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={marketing}
                    onClick={() => setMarketing(!marketing)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-1 focus:outline-none focus:ring-2 focus:ring-brand-blue/40 ${
                      marketing ? "bg-brand-blue" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white transition-transform shadow-xs ${
                        marketing ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRejectNonEssential}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            Reject Non-Essential
          </button>
          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-brand-blue text-brand-blue bg-white hover:bg-blue-50 text-xs font-semibold transition-colors"
            >
              Save Preferences
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-semibold transition-colors shadow-xs"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
