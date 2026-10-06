"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import type { HomepageCopy } from "./homepage-copy";

type ThemeChoice = "light" | "dark";
type ItalianSection = "classic" | "themed";

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

export function ItalianExperienceHeader({ active, copy }: { active: ItalianSection; copy: HomepageCopy }) {
  const [themeChoice, setThemeChoice] = useState<ThemeChoice | null>(null);
  const [systemIsDark, setSystemIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    const closeOutsideHeader = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMobileMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutsideHeader);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutsideHeader);
    };
  }, [mobileMenuOpen]);

  function selectTheme(next: ThemeChoice) {
    setThemeChoice(next);
    // eslint-disable-next-line react-hooks/immutability
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem("lorem-theme", next); } catch {}
  }

  const activeTheme = themeChoice ?? (systemIsDark ? "dark" : "light");
  const currentThemeIsDark = activeTheme === "dark";
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return <header ref={headerRef} className="italian-experience-header">
    <a className="italian-header-logo" href="/it/" aria-label="Generatore Lorem Ipsum">
      <span className="italian-header-logo-mark" aria-hidden="true" />
    </a>
    <nav className="italian-experience-nav" aria-label="Strumenti Lorem Ipsum">
      <a href="/it/" aria-current={active === "classic" ? "page" : undefined}>Generatore Lorem Ipsum</a>
      <a href="/it/lorem-ipsum-a-tema/" aria-current={active === "themed" ? "page" : undefined}>Ipsum tematico</a>
    </nav>
    <div className="header-actions italian-desktop-actions">
      <details className="language-picker">
        <summary aria-label={copy.languageLabel}>Italiano</summary>
        <div className="language-menu">{localeOptions.map(([code, label, href]) => <a key={code} href={href} aria-current={code === "it" ? "true" : undefined}>{label}</a>)}</div>
      </details>
      <div className="theme-switch" role="group" aria-label={copy.themeLabel}>{(["light", "dark"] as const).map(choice => <button key={choice} type="button" aria-pressed={activeTheme === choice} onClick={() => selectTheme(choice)}>{choice === "light" && <Sun className="theme-icon" aria-hidden="true" />}{choice === "dark" && <Moon className="theme-icon" aria-hidden="true" />}{choice === "light" ? copy.theme.light : copy.theme.dark}</button>)}</div>
    </div>
    <div className="italian-mobile-actions">
      <details className="language-picker">
        <summary aria-label={copy.languageLabel}>Italiano</summary>
        <div className="language-menu">{localeOptions.map(([code, label, href]) => <a key={code} href={href} aria-current={code === "it" ? "true" : undefined}>{label}</a>)}</div>
      </details>
      <button className="italian-mobile-icon-button" type="button" onClick={() => selectTheme(currentThemeIsDark ? "light" : "dark")} aria-label={currentThemeIsDark ? "Passa al tema chiaro" : "Passa al tema scuro"}>
        {currentThemeIsDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </button>
      <button className="italian-mobile-icon-button" type="button" onClick={() => setMobileMenuOpen(open => !open)} aria-expanded={mobileMenuOpen} aria-controls="italian-mobile-navigation" aria-label={mobileMenuOpen ? "Chiudi navigazione" : "Apri navigazione"}>
        {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </div>
    <nav id="italian-mobile-navigation" className="italian-mobile-nav" aria-label="Navigazione italiana" hidden={!mobileMenuOpen}>
      <a href="/it/" aria-current={active === "classic" ? "page" : undefined} onClick={closeMobileMenu}>Generatore Lorem Ipsum</a>
      <a href="/it/lorem-ipsum-a-tema/" aria-current={active === "themed" ? "page" : undefined} onClick={closeMobileMenu}>Ipsum tematico</a>
    </nav>
  </header>;
}
