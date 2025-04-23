"use client";

import CookieConsent from "@/components/CookiesConcent";
import CookieManager from "@/components/CookiesManager";
import { useCookieConsent } from "@/utils/useCookiesConsent";
import { useEffect } from "react";

export default function PageWithCookies() {
  const { preferences, isLoaded, updatePreferences, hasConsented } =
    useCookieConsent();

  useEffect(() => {
    if (isLoaded && preferences) {
      // Example: Load analytics if user has consented
      if (hasConsented("analytics")) {
        console.log("Loading analytics...");
        // Initialize analytics here
      }

      // Example: Load marketing pixels if user has consented
      if (hasConsented("marketing")) {
        console.log("Loading marketing pixels...");
        // Initialize marketing pixels here
      }
    }
  }, [isLoaded, preferences, hasConsented]);

  return (
    <div>
      <h1>Page with Cookie Management</h1>

      {/* Show the cookie banner only if no preferences are set yet */}
      {isLoaded && !preferences && (
        <CookieConsent onAccept={updatePreferences} />
      )}

      {/* Always include the cookie manager for the settings button */}
      <CookieManager />

      {/* Rest of your page content */}
    </div>
  );
}
