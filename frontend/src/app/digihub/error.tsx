"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  RotateCcw,
  RefreshCw,
  Home,
  AlertOctagon,
  LifeBuoy,
} from "lucide-react";

export default function DigihubError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isResettingStorage, setIsResettingStorage] = useState(false);

  useEffect(() => {
    console.error("DIGIHub LMS error boundary caught:", error);
  }, [error]);

  const handleResetLearningCache = () => {
    setIsResettingStorage(true);
    try {
      if (typeof window !== "undefined") {
        // Clear potential corrupted temporary session cache without deleting certificates
        sessionStorage.clear();
      }
    } catch {
      // Ignore storage errors
    }
    setTimeout(() => {
      reset();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-800/90 border border-neutral-700/80 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-md">
        {/* LMS Icon */}
        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
          <AlertOctagon className="w-7 h-7" />
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
          Classroom Session Interrupted
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
          We couldn&apos;t load the active classroom data. Your completed lessons, badges,
          and earned certificates remain safely archived.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 mb-6">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs sm:text-sm shadow transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Resume Classroom Session</span>
          </button>

          <button
            type="button"
            onClick={handleResetLearningCache}
            disabled={isResettingStorage}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-700/80 hover:bg-neutral-700 text-neutral-200 font-medium text-xs sm:text-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResettingStorage ? "animate-spin" : ""}`} />
            <span>{isResettingStorage ? "Refreshing..." : "Refresh Classroom State"}</span>
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-transparent hover:bg-neutral-700/50 text-neutral-400 hover:text-white font-medium text-xs sm:text-sm transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to DigiConnect Home</span>
          </Link>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-neutral-700/60 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <LifeBuoy className="w-3 h-3 text-[#0056D2]" />
          <span>Need help? Contact support@digiconnectghana.org</span>
        </div>
      </div>
    </div>
  );
}
