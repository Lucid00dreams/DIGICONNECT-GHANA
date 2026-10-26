"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, AlertCircle, ArrowRight } from "lucide-react";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithSocialProvider,
  LMSUser,
} from "@/lib/lmsStore";
import {
  executeSocialLogin,
  SocialProvider,
} from "@/lib/socialAuth";

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
  const [socialLoading, setSocialLoading] = useState<SocialProvider | null>(null);

  // Complete reset of form state
  const resetFormState = useCallback(() => {
    setEmail(initialEmail || "");
    setName("");
    setIsNewUserStep(false);
    setErrorMessage("");
    setIsLoading(false);
    setSocialLoading(null);
  }, [initialEmail]);

  // Handle closing modal and wiping all progress to restart fresh next time
  const handleClose = useCallback(() => {
    resetFormState();
    onClose();
  }, [resetFormState, onClose]);

  // When modal is opened or closed, always reset to fresh state
  useEffect(() => {
    if (isOpen) {
      resetFormState();
    }
  }, [isOpen, resetFormState]);

  // Allow closing via Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

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
        handleClose();
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
        handleClose();
      } else {
        setErrorMessage(signUpRes.error || "Unable to create account. Please try again.");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: SocialProvider) => {
    setSocialLoading(provider);
    setErrorMessage("");

    try {
      const profile = await executeSocialLogin(provider);
      const user = signInWithSocialProvider(
        profile.provider,
        profile.name,
        profile.email,
        profile.avatar,
        profile.id
      );
      const isNew = !user.onboardingCompleted;
      onAuthenticated(user, isNew);
      handleClose();
    } catch (err: any) {
      const msg = err?.message || "";
      if (
        msg.toLowerCase().includes("closed") ||
        msg.toLowerCase().includes("cancel") ||
        msg.toLowerCase().includes("user_cancel")
      ) {
        // User voluntarily dismissed popup
        setErrorMessage("");
      } else {
        setErrorMessage(
          msg || "Google Sign-In could not be completed. Please try again or use email."
        );
      }
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        // If user clicks on empty backdrop outside the card, close and reset completely
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[390px] bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 my-auto border border-neutral-100 animate-in zoom-in-95 duration-200 select-text"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-4 pr-6">
          <h2
            id="auth-modal-title"
            className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight"
          >
            {isNewUserStep
              ? "Complete your registration"
              : defaultMode === "login"
              ? "Sign In to DIGIHub"
              : "Join DIGIHub Free"}
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-snug">
            {isNewUserStep
              ? "Enter your full name to appear on verified certificates."
              : defaultMode === "login"
              ? "Sign in with Google or your email to resume your learning."
              : "Tuition-free tech tracks, browser labs, and certificates."}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-700">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}


        {/* Google SSO Button (First for quick seamless access) */}
        {!isNewUserStep && (
          <>
            <button
              type="button"
              onClick={() => handleSocialAuth("google")}
              disabled={isLoading || socialLoading !== null}
              className="w-full flex items-center justify-center gap-2.5 py-2.5 px-3.5 bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 rounded-xl text-neutral-800 text-xs sm:text-sm font-semibold transition active:scale-[0.99] disabled:opacity-60 shadow-2xs"
            >
              {socialLoading === "google" ? (
                <div className="w-4 h-4 border-2 border-neutral-500 border-t-transparent rounded-full animate-spin" />
              ) : (
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
              )}
              <span>
                {socialLoading === "google" ? "Connecting to Google..." : "Continue with Google"}
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-3 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <span className="relative bg-white px-2.5 text-[11px] text-neutral-400 font-medium">
                or continue with email
              </span>
            </div>
          </>
        )}

        {/* Email Form */}
        <form onSubmit={handleContinueWithEmail} className="space-y-3">
          {isNewUserStep && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="user-fullname"
                  className="block text-xs font-semibold text-neutral-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewUserStep(false);
                    setName("");
                    setErrorMessage("");
                  }}
                  className="text-[11px] text-[#0056D2] hover:underline font-medium"
                >
                  Change email
                </button>
              </div>
              <input
                id="user-fullname"
                type="text"
                autoFocus
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ama Mensah"
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-neutral-900 text-xs sm:text-sm placeholder:text-neutral-400 outline-none transition"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="user-email"
              className="block text-xs font-semibold text-neutral-700 mb-1"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="user-email"
              type="email"
              required
              disabled={isNewUserStep}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className={`w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-[#0056D2] focus:ring-2 focus:ring-[#0056D2]/20 text-neutral-900 text-xs sm:text-sm placeholder:text-neutral-400 outline-none transition ${
                isNewUserStep ? "bg-neutral-100 text-neutral-600 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-[#0056D2] hover:bg-[#00419e] text-white font-semibold text-xs sm:text-sm transition shadow-2xs active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            {isLoading ? (
              <span>Checking...</span>
            ) : isNewUserStep ? (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-3.5 pt-2.5 border-t border-neutral-100 text-center">
          <p className="text-[10px] text-neutral-400 leading-snug">
            By continuing, you agree to DigiConnect&apos;s{" "}
            <a href="/terms" className="text-[#0056D2] hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#0056D2] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
