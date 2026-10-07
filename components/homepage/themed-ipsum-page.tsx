"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BrainCircuit, Briefcase, Check, Code2, Copy, Cpu, Handbag, Palette, RefreshCw, Skull, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stats } from "@/lib/lorem";
import { generateThemedIpsum, type ThemedLanguage, type ThemedMode, type ThemedTheme } from "@/lib/themed-ipsum";
import type { HomepageCopy } from "./homepage-copy";
import { ExperienceHeader } from "./italian-experience-header";
import type { ThemedPageConfig } from "./themed-copy";
import { HomepageFooter } from "./home-page";

type MainMode = ThemedMode;
type ThemedTopic = ThemedTheme;

const modes: MainMode[] = ["layout", "characters", "sentences"];
const presets: Record<MainMode, number[]> = { layout: [50, 100, 250], characters: [100, 250, 500], sentences: [2, 5, 10] };
const defaults: Record<MainMode, number> = { layout: 250, characters: 300, sentences: 5 };

const themedTopics: Array<{ id: ThemedTopic; label: string; icon: LucideIcon }> = [
  { id: "corporate", label: "Corporate", icon: Briefcase },
  { id: "tech", label: "Tech", icon: Cpu },
  { id: "ai", label: "AI", icon: BrainCircuit },
  { id: "design", label: "Design", icon: Palette },
  { id: "fashion", label: "Fashion", icon: Handbag },
  { id: "zombie", label: "Zombie", icon: Skull },
];

function htmlForCopy(text: string) {
  const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
  return text.split(/\n\n+/).filter(Boolean).map(paragraph => `<p>${escape(paragraph).replace(/\n/g, "<br />")}</p>`).join("\n");
}

function ThemedCopyActions({ text, onRegenerate, copy }: { text: string; onRegenerate: () => void; copy: HomepageCopy }) {
  const [copied, setCopied] = useState<"text" | "html" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copyValue(kind: "text" | "html") {
    const value = kind === "text" ? text : htmlForCopy(text);
    try { await navigator.clipboard.writeText(value); }
    catch { const field = document.createElement("textarea"); field.value = value; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove(); }
    setCopied(kind);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1800);
  }

  return <div className="result-actions">
    <Button type="button" variant="outline" className="action-button primary-copy" onClick={() => copyValue("text")}>{copied === "text" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied === "text" ? copy.generator.copied : copy.generator.copy}</Button>
    <Button type="button" variant="outline" className="action-button secondary-action" onClick={() => copyValue("html")}>{copied === "html" ? <Check aria-hidden="true" /> : <Code2 aria-hidden="true" />}{copied === "html" ? copy.generator.copied : copy.generator.copyHtml}</Button>
    <Button type="button" variant="outline" className="action-button secondary-action" onClick={onRegenerate}><RefreshCw aria-hidden="true" /> {copy.generator.regenerate}</Button>
  </div>;
}

export function ThemedIpsumPage({ config }: { config: ThemedPageConfig }) {
  const copy = config.copy;
  const [topic, setTopic] = useState<ThemedTopic>("corporate");
  const [contentLanguage, setContentLanguage] = useState<ThemedLanguage>(config.defaultContentLanguage);
  const [mode, setMode] = useState<MainMode>("layout");
  const [words, setWords] = useState(250);
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsInput, setWordsInput] = useState("250");
  const [paragraphsInput, setParagraphsInput] = useState("3");
  const [amount, setAmount] = useState(300);
  const [variation, setVariation] = useState(0);

  useEffect(() => {
    document.documentElement.lang = config.locale;
    return () => { document.documentElement.lang = "en"; };
  }, [config.locale]);

  const result = useMemo(() => generateThemedIpsum({ theme: topic, language: contentLanguage, mode, words, paragraphs, amount, variation }), [topic, contentLanguage, mode, words, paragraphs, amount, variation]);
  const resultStats = stats(result);

  function selectMode(next: MainMode) {
    setMode(next);
    if (next !== "layout") setAmount(defaults[next]);
  }
  function updateWords(value: string) {
    setWordsInput(value);
    if (value === "") return;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) setWords(Math.max(paragraphs, Math.min(4000, parsed)));
  }
  function commitWords() {
    const parsed = Number(wordsInput);
    const next = Number.isFinite(parsed) && parsed > 0 ? Math.max(paragraphs, Math.min(4000, parsed)) : words;
    setWords(next); setWordsInput(String(next));
  }
  function updateParagraphs(value: string) {
    setParagraphsInput(value);
    if (value === "") return;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) setParagraphs(Math.max(1, Math.min(100, words, parsed)));
  }
  function commitParagraphs() {
    const parsed = Number(paragraphsInput);
    const next = Number.isFinite(parsed) && parsed > 0 ? Math.max(1, Math.min(100, words, parsed)) : paragraphs;
    setParagraphs(next); setParagraphsInput(String(next));
  }
  function setPresetWords(value: number) {
    const next = Math.max(paragraphs, value);
    setWords(next); setWordsInput(String(next));
  }
  function exploreTopic(next: ThemedTopic) {
    setTopic(next);
    setVariation(current => current + 1);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  return <main className="site-shell themed-site-shell" lang={config.locale}>
    <div className="page-content italian-experience-page">
      <ExperienceHeader locale={config.locale} active="themed" copy={copy} />
      <section className="main-section themed-main-section" aria-labelledby="themed-page-title">
        <div className="title-row"><div className="brand-lockup"><h1 id="themed-page-title">{config.title}<span className="title-period">.</span></h1></div></div>
        <p className="seo-intro">{config.intro}</p>

        <div className="themed-topic-selector" aria-labelledby="themed-topic-label">
          <span className="field-label" id="themed-topic-label">{config.topicLabel}</span>
          <div className="themed-topic-scroll"><div className="themed-topic-list">{themedTopics.map(({ id, label, icon: Icon }) => <button key={id} type="button" className="themed-topic-button" aria-pressed={topic === id} onClick={() => setTopic(id)}><Icon aria-hidden="true" /><span>{config.themeLabels[id] ?? label}</span></button>)}</div></div>
        </div>

        <div className="generator-panel generator-module themed-generator-panel" id="themed-generator">
          <div className={`controls-grid themed-controls-grid${config.showContentLanguageSelector ? "" : " themed-controls-grid-no-language"}`}>
            {config.showContentLanguageSelector && <div className="themed-language-selector" aria-labelledby="themed-language-label">
              <span className="field-label" id="themed-language-label">{config.contentLanguageLabel}</span>
              <div className="themed-language-list" role="group" aria-label={config.contentLanguageLabel}>
                <button type="button" className="themed-language-button" aria-label={config.contentLanguageNames.primary} aria-pressed={contentLanguage === config.defaultContentLanguage} onClick={() => setContentLanguage(config.defaultContentLanguage)}>{config.locale === "it" ? "IT" : config.locale === "es" ? "ES" : "EN"}</button>
                <button type="button" className="themed-language-button" aria-label={config.contentLanguageNames.secondary} aria-pressed={contentLanguage !== config.defaultContentLanguage} onClick={() => setContentLanguage(config.defaultContentLanguage === "en" ? "it" : "en")}>EN</button>
              </div>
            </div>}
            <div className="unit-control"><span className="field-label">{copy.generator.mode}</span><Tabs value={mode} onValueChange={value => selectMode(value as MainMode)}><TabsList className="unit-tabs" aria-label={copy.generator.modeLabel}>{modes.map(item => <TabsTrigger key={item} value={item} className="unit-tab">{item === "layout" ? copy.generator.layout : item === "characters" ? copy.generator.characters : copy.generator.sentences}</TabsTrigger>)}</TabsList>{modes.map(item => <TabsContent key={item} value={item} hidden aria-hidden="true" />)}</Tabs></div>
            {mode === "layout" ? <div className="layout-amounts">
              <div className="amount-control words-control"><label className="field-label" htmlFor="themed-word-amount">{copy.generator.words}</label><Input id="themed-word-amount" type="number" min={paragraphs} max={4000} value={wordsInput} onChange={event => updateWords(event.target.value)} onBlur={commitWords} /></div>
              <div className="amount-control paragraphs-control"><label className="field-label" htmlFor="themed-paragraph-amount">{copy.generator.paragraphs}</label><Input id="themed-paragraph-amount" type="number" min={1} max={Math.min(100, words)} value={paragraphsInput} onChange={event => updateParagraphs(event.target.value)} onBlur={commitParagraphs} /></div>
            </div> : <div className="amount-control precision-amount"><label className="field-label" htmlFor="themed-amount">{mode === "characters" ? copy.generator.characters : copy.generator.sentences}</label><Input id="themed-amount" type="number" min="1" max={mode === "characters" ? 20000 : 100} value={amount} onChange={event => setAmount(Math.max(1, Math.min(mode === "characters" ? 20000 : 100, Number(event.target.value) || 1)))} /></div>}
            <div className="presets"><span className="field-label">{mode === "layout" ? copy.generator.quickWords : copy.generator.presets}</span><div className="preset-buttons">{presets[mode].map(value => <Button type="button" key={value} variant="outline" className="preset-button" aria-pressed={(mode === "layout" ? words : amount) === value} onClick={() => mode === "layout" ? setPresetWords(value) : setAmount(value)}>{value}</Button>)}</div></div>
          </div>
          <div className="output-panel"><span className="field-label">{copy.generator.output}</span><div className="reading-area" role="region" aria-label={copy.generator.outputAria}>{result.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div>
          <div className="module-footer"><dl className="stat-strip compact-stats"><div><dt>{copy.generator.stats.words}</dt><dd>{resultStats.words}</dd></div><div><dt>{copy.generator.stats.characters}</dt><dd>{resultStats.characters}</dd></div><div><dt>{copy.generator.stats.withoutSpaces}</dt><dd>{resultStats.charactersNoSpaces}</dd></div><div><dt>{copy.generator.stats.sentences}</dt><dd>{resultStats.sentences}</dd></div></dl><ThemedCopyActions text={result} copy={copy} onRegenerate={() => setVariation(current => current + 1)} /></div>
        </div>
      </section>
      <section className="themed-explore-section" aria-labelledby="themed-explore-title">
        <h2 id="themed-explore-title">{config.exploreTitle}</h2>
        <div className="themed-explore-grid">{config.cards.map(({ id, title, description, action }) => { const Icon = themedTopics.find(topicItem => topicItem.id === id)?.icon ?? Briefcase; return <article className="themed-explore-card" key={id}><Icon aria-hidden="true" /><h3>{title}</h3><p>{description}</p><Button type="button" variant="outline" className="themed-explore-action" onClick={() => exploreTopic(id)}>{action}</Button></article>; })}</div>
      </section>
    </div><HomepageFooter copy={copy} />
  </main>;
}
