"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import type { HomepageCopy } from "./homepage-copy";
import type { ThemedPageLocale } from "./themed-copy";

type ThemeChoice = "light" | "dark";
type ExperienceSection = "classic" | "themed";

const localeOptions = [
  ["de", "Deutsch", "/de/"],
  ["en", "English", "/"],
  ["es", "Español", "/es/"],
  ["fr", "Français", "/fr/"],
  ["it", "Italiano", "/it/"],
  ["hu", "Magyar", "/hu/"],
  ["nl", "Nederlands", "/nl/"],
  ["pl", "Polski", "/pl/"],
  ["pt-BR", "Português (Brasil)", "/pt-br/"],
  ["tr", "Türkçe", "/tr/"],
] as const;

const experience = {
  en: {
    homePath: "/",
    themedPath: "/themed-lorem-ipsum/",
    languageName: "English",
    classicLabel: "Lorem Ipsum Generator",
    themedLabel: "Themed Ipsum",
    navLabel: "Lorem Ipsum tools",
    mobileNavLabel: "English navigation",
    openMenuLabel: "Open navigation",
    closeMenuLabel: "Close navigation",
    lightLabel: "Switch to light theme",
    darkLabel: "Switch to dark theme",
  },
  it: {
    homePath: "/it/",
    themedPath: "/it/lorem-ipsum-a-tema/",
    languageName: "Italiano",
    classicLabel: "Generatore Lorem Ipsum",
    themedLabel: "Ipsum tematico",
    navLabel: "Strumenti Lorem Ipsum",
    mobileNavLabel: "Navigazione italiana",
    openMenuLabel: "Apri navigazione",
    closeMenuLabel: "Chiudi navigazione",
    lightLabel: "Passa al tema chiaro",
    darkLabel: "Passa al tema scuro",
  },
} as const;

export function ExperienceHeader({ active, copy, locale }: { active: ExperienceSection; copy: HomepageCopy; locale: ThemedPageLocale }) {
  const [themeChoice, setThemeChoice] = useState<ThemeChoice | null>(null);
  const [systemIsDark, setSystemIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const labels = experience[locale];
  const mobileNavigationId = `${locale}-mobile-navigation`;

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("lorem-theme");
      if (saved === "light" || saved === "dark") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeChoice(saved);
        document.documentElement.dataset.theme = saved;
      }
    } catch { /* The system theme still works when local storage is unavailable. */ }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSystemIsDark(mediaQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => setSystemIsDark(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileMenuOpen(false); };
    const closeOutsideHeader = (event: PointerEvent) => { if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMobileMenuOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutsideHeader);
    return () => { document.removeEventListener("keydown", closeOnEscape); document.removeEventListener("pointerdown", closeOutsideHeader); };
  }, [mobileMenuOpen]);

  function selectTheme(next: ThemeChoice) {
    setThemeChoice(next);
    // eslint-disable-next-line react-hooks/immutability
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem("lorem-theme", next); } catch {}
  }

  function hrefForLocale(code: string, classicHref: string) {
    if (active !== "themed") return classicHref;
    if (code === "en") return experience.en.themedPath;
    if (code === "it") return experience.it.themedPath;
    return classicHref;
  }

  const activeTheme = themeChoice ?? (systemIsDark ? "dark" : "light");
  const currentThemeIsDark = activeTheme === "dark";
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return <header ref={headerRef} className="italian-experience-header">
    <a className="italian-header-logo" href={labels.homePath} aria-label={labels.classicLabel}><span className="italian-header-logo-mark" aria-hidden="true" /></a>
    <nav className="italian-experience-nav" aria-label={labels.navLabel}>
      <a href={labels.homePath} aria-current={active === "classic" ? "page" : undefined}>{labels.classicLabel}</a>
      <a href={labels.themedPath} aria-current={active === "themed" ? "page" : undefined}>{labels.themedLabel}</a>
    </nav>
    <div className="header-actions italian-desktop-actions">
      <details className="language-picker"><summary aria-label={copy.languageLabel}>{labels.languageName}</summary><div className="language-menu">{localeOptions.map(([code, label, href]) => <a key={code} href={hrefForLocale(code, href)} aria-current={code === locale ? "true" : undefined}>{label}</a>)}</div></details>
      <div className="theme-switch" role="group" aria-label={copy.themeLabel}>{(["light", "dark"] as const).map(choice => <button key={choice} type="button" aria-pressed={activeTheme === choice} onClick={() => selectTheme(choice)}>{choice === "light" && <Sun className="theme-icon" aria-hidden="true" />}{choice === "dark" && <Moon className="theme-icon" aria-hidden="true" />}{choice === "light" ? copy.theme.light : copy.theme.dark}</button>)}</div>
    </div>
    <div className="italian-mobile-actions">
      <details className="language-picker"><summary aria-label={copy.languageLabel}>{labels.languageName}</summary><div className="language-menu">{localeOptions.map(([code, label, href]) => <a key={code} href={hrefForLocale(code, href)} aria-current={code === locale ? "true" : undefined}>{label}</a>)}</div></details>
      <button className="italian-mobile-icon-button" type="button" onClick={() => selectTheme(currentThemeIsDark ? "light" : "dark")} aria-label={currentThemeIsDark ? labels.lightLabel : labels.darkLabel}>{currentThemeIsDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}</button>
      <button className="italian-mobile-icon-button" type="button" onClick={() => setMobileMenuOpen(open => !open)} aria-expanded={mobileMenuOpen} aria-controls={mobileNavigationId} aria-label={mobileMenuOpen ? labels.closeMenuLabel : labels.openMenuLabel}>{mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </div>
    <nav id={mobileNavigationId} className="italian-mobile-nav" aria-label={labels.mobileNavLabel} hidden={!mobileMenuOpen}>
      <a href={labels.homePath} aria-current={active === "classic" ? "page" : undefined} onClick={closeMobileMenu}>{labels.classicLabel}</a>
      <a href={labels.themedPath} aria-current={active === "themed" ? "page" : undefined} onClick={closeMobileMenu}>{labels.themedLabel}</a>
    </nav>
  </header>;
}

export function ItalianExperienceHeader({ active, copy }: { active: ExperienceSection; copy: HomepageCopy }) {
  return <ExperienceHeader locale="it" active={active} copy={copy} />;
}
