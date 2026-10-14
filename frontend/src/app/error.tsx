"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  LifeBuoy,
} from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to console or error reporting service
    console.error("Global application error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center items-center px-4 py-16">
      {/* Background Accent */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-rose-100/40 via-neutral-50/50 to-transparent pointer-events-none -z-10" />

      <div className="max-w-lg w-full bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 text-center">
        {/* Warning Icon Badge */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-2xs">
          <AlertTriangle className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mb-2">
          Something went wrong
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 mb-6 leading-relaxed">
          An unexpected issue prevented this page from loading properly. Your session
          and stored progress are completely safe.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 mb-6">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs sm:text-sm shadow-sm transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs sm:text-sm transition"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>

        {/* Support Link */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <Link
            href="/contact"
            className="hover:text-[#0056D2] flex items-center gap-1.5 transition font-medium"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Report issue to support</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-neutral-400 hover:text-neutral-600 flex items-center gap-1 transition"
          >
            <span>{showDetails ? "Hide technical info" : "Technical info"}</span>
            {showDetails ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Collapsible Error Details for Troubleshooting */}
        {showDetails && (
          <div className="mt-4 p-3 bg-neutral-900 text-neutral-200 rounded-xl text-left text-[11px] font-mono overflow-x-auto max-h-48 leading-relaxed">
            <p className="text-rose-400 font-bold mb-1">
              {error.name || "Error"}: {error.message || "Unknown error"}
            </p>
            {error.digest && (
              <p className="text-neutral-400 text-[10px]">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
