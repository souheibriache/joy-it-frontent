"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CookieConsent, { CookiePreferences } from "./CookiesConcent";
import { useCookieConsent } from "@/utils/useCookiesConsent";

export default function CookieManager() {
  const [showBanner, setShowBanner] = useState(false);
  const { updatePreferences } = useCookieConsent();

  useEffect(() => {
    // Listen for the custom event to open cookie settings
    const handleOpenSettings = () => {
      setShowBanner(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);

    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const handleAccept = (newPreferences: CookiePreferences) => {
    updatePreferences(newPreferences);
    setShowBanner(false);

    // Apply cookie preferences
    applyPreferences(newPreferences);
  };

  const applyPreferences = (prefs: CookiePreferences) => {
    // Example: Conditionally load analytics scripts based on preferences
    if (prefs.analytics) {
      // Initialize analytics
      console.log(
        "Analytics cookies enabled - would initialize analytics here"
      );
    }

    if (prefs.marketing) {
      // Initialize marketing pixels
      console.log(
        "Marketing cookies enabled - would initialize marketing pixels here"
      );
    }
  };

  return (
    <>
      {/* Only show the banner when explicitly triggered */}
      {showBanner && (
        <CookieConsent onAccept={handleAccept} cookieDuration={365} />
      )}

      {/* This button can be placed in your footer or privacy policy page */}
      <Button
        variant="link"
        size="sm"
        onClick={() => setShowBanner(true)}
        className="text-xs text-muted-foreground"
      >
        Paramètres des cookies
      </Button>
    </>
  );
}
