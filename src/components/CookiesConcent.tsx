"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
  functional: false,
  analytics: false,
  marketing: false,
};

interface CookieConsentProps {
  onAccept?: (preferences: CookiePreferences) => void;
  cookieDuration?: number; // in days
}

export default function CookieConsent({
  onAccept,
  cookieDuration = 365,
}: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    // Check if user has already set cookie preferences
    const savedPreferences = Cookies.get("cookie-preferences");

    if (!savedPreferences) {
      // Show banner after a short delay if no preferences are saved
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      try {
        // Parse saved preferences
        setPreferences(JSON.parse(savedPreferences));
      } catch (e) {
        // If parsing fails, reset to defaults
        setPreferences(defaultPreferences);
        setVisible(true);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    // Save preferences to cookie
    Cookies.set("cookie-preferences", JSON.stringify(prefs), {
      expires: cookieDuration,
      sameSite: "strict",
    });

    // Set legacy cookie for backward compatibility
    Cookies.set("cookies-usage", "true", {
      expires: cookieDuration,
      sameSite: "strict",
    });

    // Call onAccept callback if provided
    if (onAccept) {
      onAccept(prefs);
    }

    setVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };

    setPreferences(allAccepted);
    savePreferences(allAccepted);
  };

  const handleAcceptSelected = () => {
    savePreferences(preferences);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      ...defaultPreferences,
      necessary: true,
    };

    setPreferences(onlyNecessary);
    savePreferences(onlyNecessary);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return; // Cannot toggle necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      {/* Main Cookie Banner */}
      {visible && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary p-4 shadow-lg animate-in slide-in-from-bottom duration-300">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-white max-w-3xl">
              <h2 className="text-xl font-bold mb-2">
                Nous utilisons des cookies
              </h2>
              <p className="text-sm md:text-base">
                Chez Joy‑It, nous utilisons des cookies pour améliorer votre
                expérience de navigation, mémoriser vos préférences et analyser
                le trafic de notre site. Vous pouvez accepter tous les cookies,
                les refuser ou personnaliser vos préférences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-primary"
                onClick={() => setShowSettings(true)}
              >
                Personnaliser
              </Button>
              <Button
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-primary"
                onClick={handleRejectAll}
              >
                Refuser tout
              </Button>
              <Button
                className="bg-secondary hover:bg-secondary/90 text-white"
                onClick={handleAcceptAll}
              >
                Tout accepter
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Paramètres des cookies</DialogTitle>
            <DialogDescription>
              Personnalisez vos préférences de cookies. Les cookies nécessaires
              sont toujours activés.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="all">Tous les cookies</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cookies nécessaires</h3>
                    <p className="text-sm text-muted-foreground">
                      Ces cookies sont essentiels au fonctionnement du site.
                    </p>
                  </div>
                  <Switch checked={preferences.necessary} disabled />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cookies fonctionnels</h3>
                    <p className="text-sm text-muted-foreground">
                      Ces cookies permettent des fonctionnalités personnalisées.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.functional}
                    onCheckedChange={() => togglePreference("functional")}
                    id="functional-cookie"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cookies analytiques</h3>
                    <p className="text-sm text-muted-foreground">
                      Ces cookies nous aident à comprendre comment vous utilisez
                      notre site.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.analytics}
                    onCheckedChange={() => togglePreference("analytics")}
                    id="analytics-cookie"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Cookies marketing</h3>
                    <p className="text-sm text-muted-foreground">
                      Ces cookies sont utilisés pour vous montrer des publicités
                      pertinentes.
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketing}
                    onCheckedChange={() => togglePreference("marketing")}
                    id="marketing-cookie"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Cookies nécessaires</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ces cookies sont essentiels au fonctionnement du site et ne
                    peuvent pas être désactivés.
                  </p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>
                      cookies-usage - Enregistre vos préférences de cookies
                    </li>
                    <li>
                      cookie-preferences - Stocke vos paramètres de cookies
                      détaillés
                    </li>
                    <li>session - Maintient votre session connectée</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Cookies fonctionnels</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ces cookies permettent au site de se souvenir de vos choix
                    et préférences.
                  </p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>ui-theme - Enregistre vos préférences d'affichage</li>
                    <li>language - Mémorise votre choix de langue</li>
                    <li>
                      recent-views - Garde une trace des éléments récemment
                      consultés
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Cookies analytiques</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ces cookies nous aident à améliorer notre site en collectant
                    des informations sur son utilisation.
                  </p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>_ga, _gid - Google Analytics</li>
                    <li>_hjid - Hotjar</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Cookies marketing</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Ces cookies sont utilisés pour suivre les visiteurs sur les
                    sites web afin d'afficher des publicités pertinentes.
                  </p>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li>_fbp - Facebook Pixel</li>
                    <li>ads/ga-audiences - Google Ads</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              variant="outline"
              onClick={handleRejectAll}
              className="sm:order-1"
            >
              Refuser tout
            </Button>
            <Button
              variant="outline"
              onClick={handleAcceptSelected}
              className="sm:order-2"
            >
              Accepter la sélection
            </Button>
            <Button onClick={handleAcceptAll} className="sm:order-3">
              Tout accepter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
