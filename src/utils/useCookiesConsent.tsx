"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { CookiePreferences } from "@/components/CookiesConcent";

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load cookie preferences
    const savedPreferences = Cookies.get("cookie-preferences");

    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (e) {
        setPreferences(null);
      }
    }

    setIsLoaded(true);
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    Cookies.set("cookie-preferences", JSON.stringify(newPreferences), {
      expires: 365,
      sameSite: "strict",
    });

    // Set legacy cookie for backward compatibility
    Cookies.set("cookies-usage", "true", {
      expires: 365,
      sameSite: "strict",
    });

    setPreferences(newPreferences);
  };

  const resetPreferences = () => {
    Cookies.remove("cookie-preferences");
    Cookies.remove("cookies-usage");
    setPreferences(null);
  };

  const hasConsented = (cookieType: keyof CookiePreferences): boolean => {
    if (!preferences) return false;
    return preferences[cookieType] === true;
  };

  const openSettings = () => {
    // Dispatch a custom event that the CookieManager component will listen for
    window.dispatchEvent(new CustomEvent("open-cookie-settings"));
  };

  return {
    preferences,
    isLoaded,
    updatePreferences,
    resetPreferences,
    hasConsented,
    openSettings,
  };
}
