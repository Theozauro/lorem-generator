"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import type { HomepageCopy } from "./homepage-copy";
import type { ThemedPageLocale } from "./themed-copy";

type ThemeChoice = "light" | "dark";
type ExperienceSection = "classic" | "themed" | "languages";

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
  es: {
    homePath: "/es/",
    themedPath: "/es/lorem-ipsum-tematico/",
    languageName: "Español",
    classicLabel: "Generador de Lorem Ipsum",
    themedLabel: "Ipsum temático",
    navLabel: "Herramientas Lorem Ipsum",
    mobileNavLabel: "Navegación en español",
    openMenuLabel: "Abrir navegación",
    closeMenuLabel: "Cerrar navegación",
    lightLabel: "Cambiar al tema claro",
    darkLabel: "Cambiar al tema oscuro",
  },
  de: {
    homePath: "/de/",
    themedPath: "/de/lorem-ipsum-nach-themen/",
    languageName: "Deutsch",
    classicLabel: "Lorem-Ipsum-Generator",
    themedLabel: "Themen-Ipsum",
    navLabel: "Lorem-Ipsum-Werkzeuge",
    mobileNavLabel: "Deutsche Navigation",
    openMenuLabel: "Navigation öffnen",
    closeMenuLabel: "Navigation schließen",
    lightLabel: "Helles Design aktivieren",
    darkLabel: "Dunkles Design aktivieren",
  },
  fr: {
    homePath: "/fr/",
    themedPath: "/fr/lorem-ipsum-thematique/",
    languageName: "Français",
    classicLabel: "Générateur de Lorem Ipsum",
    themedLabel: "Ipsum thématique",
    navLabel: "Outils Lorem Ipsum",
    mobileNavLabel: "Navigation française",
    openMenuLabel: "Ouvrir la navigation",
    closeMenuLabel: "Fermer la navigation",
    lightLabel: "Passer au thème clair",
    darkLabel: "Passer au thème sombre",
  },
  "pt-BR": {
    homePath: "/pt-br/",
    themedPath: "/pt-br/lorem-ipsum-tematico/",
    languageName: "Português (Brasil)",
    classicLabel: "Gerador de Lorem Ipsum",
    themedLabel: "Ipsum temático",
    navLabel: "Ferramentas de Lorem Ipsum",
    mobileNavLabel: "Navegação em português do Brasil",
    openMenuLabel: "Abrir navegação",
    closeMenuLabel: "Fechar navegação",
    lightLabel: "Ativar tema claro",
    darkLabel: "Ativar tema escuro",
  },
  pl: {
    homePath: "/pl/",
    themedPath: "/pl/lorem-ipsum-tematyczny/",
    languageName: "Polski",
    classicLabel: "Generator Lorem Ipsum",
    themedLabel: "Ipsum tematyczny",
    navLabel: "Narzędzia Lorem Ipsum",
    mobileNavLabel: "Nawigacja po polsku",
    openMenuLabel: "Otwórz nawigację",
    closeMenuLabel: "Zamknij nawigację",
    lightLabel: "Włącz jasny motyw",
    darkLabel: "Włącz ciemny motyw",
  },
  nl: {
    homePath: "/nl/",
    themedPath: "/nl/lorem-ipsum-op-thema/",
    languageName: "Nederlands",
    classicLabel: "Lorem Ipsum-generator",
    themedLabel: "Ipsum op thema",
    navLabel: "Lorem Ipsum-tools",
    mobileNavLabel: "Nederlandse navigatie",
    openMenuLabel: "Navigatie openen",
    closeMenuLabel: "Navigatie sluiten",
    lightLabel: "Licht thema inschakelen",
    darkLabel: "Donker thema inschakelen",
  },
  tr: {
    homePath: "/tr/",
    themedPath: "/tr/tematik-lorem-ipsum/",
    languageName: "Türkçe",
    classicLabel: "Lorem Ipsum Oluşturucu",
    themedLabel: "Tematik Ipsum",
    navLabel: "Lorem Ipsum araçları",
    mobileNavLabel: "Türkçe gezinme",
    openMenuLabel: "Gezinmeyi aç",
    closeMenuLabel: "Gezinmeyi kapat",
    lightLabel: "Açık temaya geç",
    darkLabel: "Koyu temaya geç",
  },
  hu: {
    homePath: "/hu/",
    themedPath: "/hu/tematikus-lorem-ipsum/",
    languageName: "Magyar",
    classicLabel: "Lorem Ipsum generátor",
    themedLabel: "Tematikus Ipsum",
    navLabel: "Lorem Ipsum-eszközök",
    mobileNavLabel: "Magyar navigáció",
    openMenuLabel: "Navigáció megnyitása",
    closeMenuLabel: "Navigáció bezárása",
    lightLabel: "Világos téma bekapcsolása",
    darkLabel: "Sötét téma bekapcsolása",
  },
} as const;

export function ExperienceHeader({ active, copy, locale }: { active: ExperienceSection; copy: HomepageCopy; locale: ThemedPageLocale }) {
  const [themeChoice, setThemeChoice] = useState<ThemeChoice | null>(null);
  const [systemIsDark, setSystemIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const labels = experience[locale];
  const destinations: { section: ExperienceSection; href: string; label: string }[] = [
    { section: "classic", href: labels.homePath, label: locale === "it" ? "Lorem Ipsum" : labels.classicLabel },
    { section: "themed", href: labels.themedPath, label: labels.themedLabel },
    ...(locale === "it" ? [{ section: "languages" as const, href: "/it/testo-segnaposto-lingue/", label: "Lingue asiatiche" }] : []),
  ];
  const availableLocales = active === "languages" ? localeOptions.filter(([code]) => code === "it") : localeOptions;
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
    if (active === "languages") return "/it/testo-segnaposto-lingue/";
    if (active !== "themed") return classicHref;
    if (code === "en") return experience.en.themedPath;
    if (code === "it") return experience.it.themedPath;
    if (code === "es") return experience.es.themedPath;
    if (code === "de") return experience.de.themedPath;
    if (code === "fr") return experience.fr.themedPath;
    if (code === "pt-BR") return experience["pt-BR"].themedPath;
    if (code === "pl") return experience.pl.themedPath;
    if (code === "nl") return experience.nl.themedPath;
    if (code === "tr") return experience.tr.themedPath;
    if (code === "hu") return experience.hu.themedPath;
    return classicHref;
  }

  const activeTheme = themeChoice ?? (systemIsDark ? "dark" : "light");
  const currentThemeIsDark = activeTheme === "dark";
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return <header ref={headerRef} className="italian-experience-header">
    <a className="italian-header-logo" href={labels.homePath} aria-label={labels.classicLabel}><span className="italian-header-logo-mark" aria-hidden="true" /></a>
    <nav className="italian-experience-nav" aria-label={labels.navLabel}>
      {destinations.map(item => <a key={item.section} href={item.href} aria-current={active === item.section ? "page" : undefined}>{item.label}</a>)}
    </nav>
    <div className="header-actions italian-desktop-actions">
      <details className="language-picker"><summary aria-label={copy.languageLabel}>{labels.languageName}</summary><div className="language-menu">{availableLocales.map(([code, label, href]) => <a key={code} href={hrefForLocale(code, href)} aria-current={code === locale ? "true" : undefined}>{label}</a>)}</div></details>
      <div className="theme-switch" role="group" aria-label={copy.themeLabel}>{(["light", "dark"] as const).map(choice => <button key={choice} type="button" aria-pressed={activeTheme === choice} onClick={() => selectTheme(choice)}>{choice === "light" && <Sun className="theme-icon" aria-hidden="true" />}{choice === "dark" && <Moon className="theme-icon" aria-hidden="true" />}{choice === "light" ? copy.theme.light : copy.theme.dark}</button>)}</div>
    </div>
    <div className="italian-mobile-actions">
      <details className="language-picker"><summary aria-label={copy.languageLabel}>{labels.languageName}</summary><div className="language-menu">{availableLocales.map(([code, label, href]) => <a key={code} href={hrefForLocale(code, href)} aria-current={code === locale ? "true" : undefined}>{label}</a>)}</div></details>
      <button className="italian-mobile-icon-button" type="button" onClick={() => selectTheme(currentThemeIsDark ? "light" : "dark")} aria-label={currentThemeIsDark ? labels.lightLabel : labels.darkLabel}>{currentThemeIsDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}</button>
      <button className="italian-mobile-icon-button" type="button" onClick={() => setMobileMenuOpen(open => !open)} aria-expanded={mobileMenuOpen} aria-controls={mobileNavigationId} aria-label={mobileMenuOpen ? labels.closeMenuLabel : labels.openMenuLabel}>{mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    </div>
    <nav id={mobileNavigationId} className="italian-mobile-nav" aria-label={labels.mobileNavLabel} hidden={!mobileMenuOpen}>
      {destinations.map(item => <a key={item.section} href={item.href} aria-current={active === item.section ? "page" : undefined} onClick={closeMobileMenu}>{item.label}</a>)}
    </nav>
  </header>;
}

export function ItalianExperienceHeader({ active, copy }: { active: ExperienceSection; copy: HomepageCopy }) {
  return <ExperienceHeader locale="it" active={active} copy={copy} />;
}
