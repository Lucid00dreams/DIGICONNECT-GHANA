"use client";

import { useCookieConsent } from "@/context/CookieContext";

/**
 * CookieTriggerButton
 * Ensures that the floating cookie button completely disappears once
 * a user accepts or declines cookie preferences. Users can still access
 * cookie preferences at any time via the "Cookie Settings" link in the footer.
 */
export function CookieTriggerButton() {
  const { hasConsented } = useCookieConsent();

  // Once a user has accepted or declined, ensure the floating button is completely removed
  if (hasConsented) {
    return null;
  }

  // Also keep it hidden before consent since the CookieConsentBanner is already active
  return null;
}
