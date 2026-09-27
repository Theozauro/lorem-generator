"use client";

import { useEffect } from "react";

const AHREFS_SRC = "https://analytics.ahrefs.com/analytics.js";
const AHREFS_KEY = "NHN9TqQ3aJGiePnIyQ6Tiw";

function loadAhrefs() {
  if (document.querySelector(`script[src="${AHREFS_SRC}"]`)) return;

  const script = document.createElement("script");
  script.src = AHREFS_SRC;
  script.dataset.key = AHREFS_KEY;
  script.async = true;
  document.head.appendChild(script);
}

export function AhrefsAnalytics() {
  useEffect(() => {
    const hasAnalyticsConsent = () => {
      try {
        const saved = window.localStorage.getItem("lorem-consent");
        if (!saved) return false;
        const parsed = JSON.parse(saved) as { analytics?: boolean };
        return parsed.analytics === true;
      } catch {
        return false;
      }
    };

    if (hasAnalyticsConsent()) loadAhrefs();

    const handleConsentChange = (event: Event) => {
      const analytics = (event as CustomEvent<{ analytics?: boolean }>).detail?.analytics === true;
      if (analytics) loadAhrefs();
    };

    window.addEventListener("analytics-consent-changed", handleConsentChange);
    return () => window.removeEventListener("analytics-consent-changed", handleConsentChange);
  }, []);

  return null;
}
