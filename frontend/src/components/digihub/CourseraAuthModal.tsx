"use client";

import React, { useState } from "react";
import { X, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithSocialProvider,
  LMSUser,
} from "@/lib/lmsStore";

interface CourseraAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (user: LMSUser, isNewRegistration?: boolean) => void;
  initialEmail?: string;
  defaultMode?: "login" | "signup";
}

export function CourseraAuthModal({
  isOpen,
  onClose,
  onAuthenticated,
  initialEmail = "",
  defaultMode = "signup",
}: CourseraAuthModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState("");
  const [isNewUserStep, setIsNewUserStep] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleContinueWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      // Check if user already exists
      const signInRes = signInWithEmail(trimmedEmail);
      if (signInRes.success && signInRes.user) {
        onAuthenticated(signInRes.user, false);
        onClose();
        return;
      }

      // If user does not exist and we haven't asked for their name yet:
      if (!isNewUserStep) {
        setIsNewUserStep(true);
        setIsLoading(false);
        return;
      }

      // If user submitted name on second step:
      const signUpRes = signUpWithEmail(
        name.trim() || trimmedEmail.split("@")[0],
        trimmedEmail
      );
      if (signUpRes.success && signUpRes.user) {
        onAuthenticated(signUpRes.user, true);
        onClose();
      } else {
        setErrorMessage(signUpRes.error || "Unable to create account. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: "google" | "facebook" | "apple") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user = signInWithSocialProvider(
        provider,
        name.trim() || undefined,
        email.trim() || undefined
      );
      const isNew = !user.onboardingCompleted;
      onAuthenticated(user, isNew);
      onClose();
    } catch {
      setErrorMessage(`${provider.toUpperCase()} login could not be completed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 my-auto border border-neutral-100 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-6">
          <h2
            id="auth-modal-title"
            className="text-2xl font-bold text-neutral-900 tracking-tight"
          >
            {isNewUserStep ? "Create your account" : "Log in or create account"}
          </h2>
          <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
            {isNewUserStep
              ? "Almost there! What name should appear on your verified certificates?"
              : "Join DigiConnect Ghana's free technical learning community: access 12 academy tracks, live browser sandboxes, and earn faculty-verified diplomas."}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleContinueWithEmail} className="space-y-4">
          {isNewUserStep && (
            <div>
              <label
                htmlFor="user-fullname"
                className="block text-xs font-semibold text-neutral-800 mb-1.5"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="user-fullname"
                type="text"
                autoFocus
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ama Mensah or Kwame Boateng"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-neutral-900 text-sm placeholder:text-neutral-400 outline-none transition"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="user-email"
              className="block text-xs font-semibold text-neutral-800 mb-1.5"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="user-email"
              type="email"
              required
              disabled={isNewUserStep}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className={`w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-neutral-900 text-sm placeholder:text-neutral-400 outline-none transition ${
                isNewUserStep ? "bg-neutral-100 text-neutral-600 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-sm transition shadow-sm active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Checking...</span>
            ) : isNewUserStep ? (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </form>

        {/* Divider */}
        {!isNewUserStep && (
          <>
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <span className="relative bg-white px-3 text-xs text-neutral-400 font-medium">
                or continue with
              </span>
            </div>

            {/* Social SSO Buttons */}
            <div className="space-y-2.5">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleSocialAuth("google")}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 rounded-xl text-neutral-800 text-xs sm:text-sm font-semibold transition active:scale-[0.99]"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.99 0 12s.45 3.84 1.24 5.41l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleSocialAuth("facebook")}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 rounded-xl text-neutral-800 text-xs sm:text-sm font-semibold transition active:scale-[0.99]"
              >
                <svg className="w-4 h-4 fill-[#1877F2] shrink-0" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Continue with Facebook</span>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={() => handleSocialAuth("apple")}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 rounded-xl text-neutral-800 text-xs sm:text-sm font-semibold transition active:scale-[0.99]"
              >
                <svg className="w-4 h-4 fill-black shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.84-.98 2.95 1.07.08 2.15-.55 2.79-1.29z" />
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>
          </>
        )}

        {/* Footer links */}
        <div className="mt-6 pt-4 border-t border-neutral-100 text-center space-y-3">
          <a
            href="mailto:contact@digiconnectghana.org?subject=Institutional%20Access%20Inquiry"
            className="text-xs font-semibold text-[#0056D2] hover:underline inline-block"
          >
            Sign up with your organization or school
          </a>

          <p className="text-[11px] text-neutral-500 leading-relaxed">
            I accept DigiConnect&apos;s{" "}
            <a href="#" className="text-[#0056D2] hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#0056D2] hover:underline">
              Privacy Notice
            </a>
            . Having trouble logging in?{" "}
            <a href="#" className="text-[#0056D2] hover:underline">
              Learner help center
            </a>
          </p>

          <p className="text-[10px] text-neutral-400">
            This site is protected by DigiConnect Academic Authority and the DigiConnect Privacy Policy and Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );
}
