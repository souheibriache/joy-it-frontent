import { CookiePreferences } from "@/components/CookiesConcent";
import Cookies from "js-cookie";

// Set a cookie only if user has consented to the specific cookie type
export function setConditionalCookie(
  name: string,
  value: string,
  cookieType: keyof CookiePreferences,
  options?: Cookies.CookieAttributes
) {
  const preferences = getCookiePreferences();

  if (preferences && preferences[cookieType]) {
    Cookies.set(name, value, options);
    return true;
  }

  return false;
}

// Get the stored cookie preferences
export function getCookiePreferences(): CookiePreferences | null {
  const savedPreferences = Cookies.get("cookie-preferences");

  if (savedPreferences) {
    try {
      return JSON.parse(savedPreferences);
    } catch (e) {
      return null;
    }
  }

  return null;
}

// Check if user has consented to a specific cookie type
export function hasConsentedTo(cookieType: keyof CookiePreferences): boolean {
  const preferences = getCookiePreferences();

  if (!preferences) return false;
  return preferences[cookieType] === true;
}

// Clear all cookies except necessary ones
export function clearNonEssentialCookies() {
  const essentialCookies = ["cookie-preferences", "cookies-usage", "session"];

  Object.keys(Cookies.get()).forEach((cookie) => {
    if (!essentialCookies.includes(cookie)) {
      Cookies.remove(cookie);
    }
  });
}
