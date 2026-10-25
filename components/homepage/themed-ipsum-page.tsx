"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BrainCircuit, Briefcase, Check, Code2, Copy, Cpu, Handbag, Palette, RefreshCw, Shirt, Skull, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stats } from "@/lib/lorem";
import { generateThemedIpsum, type ThemedLanguage, type ThemedMode, type ThemedTheme } from "@/lib/themed-ipsum";
import type { HomepageCopy } from "./homepage-copy";
import { ExperienceHeader } from "./italian-experience-header";
import type { ThemedPageConfig } from "./themed-copy";
import { HomepageFooter } from "./home-page";
import { PolishThemedEditorial } from "./polish-themed-editorial";
import { DutchThemedEditorial } from "./dutch-polish-editorial";
import { ItalianThemedEditorial } from "./italian-editorial";
import { TurkishThemedEditorial } from "./turkish-themed-editorial";
import { HungarianThemedEditorial } from "./hungarian-themed-editorial";
import { EnglishThemedEditorial } from "./english-editorial";
import { GermanThemedEditorial, SpanishThemedEditorial } from "./spanish-german-editorial";
import { BrazilianPortugueseThemedEditorial, FrenchThemedEditorial } from "./french-portuguese-editorial";
import { generateItalianThemedIpsum, italianParagraphLimit } from "./italian-generator-paragraphs";
import { englishParagraphLimit, frenchParagraphMessages, generateEnglishThemed, germanParagraphMessages, spanishParagraphMessages, brazilianPortugueseParagraphMessages, dutchParagraphMessages, polishParagraphMessages, turkishParagraphMessages, hungarianParagraphMessages } from "./english-generator-paragraphs";

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

function htmlForCopy(text: string, language?: string) {
  const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
  const lang = language ? ` lang="${language}"` : "";
  return text.split(/\n\n+/).filter(Boolean).map(paragraph => `<p${lang}>${escape(paragraph).replace(/\n/g, "<br />")}</p>`).join("\n");
}

function ThemedCopyActions({ text, onRegenerate, copy, italianFeedback = false, contentLanguage = "en" }: { text: string; onRegenerate: () => void; copy: HomepageCopy; italianFeedback?: boolean; contentLanguage?: string }) {
  const [copied, setCopied] = useState<"text" | "html" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copyValue(kind: "text" | "html") {
    const value = kind === "text" ? text : htmlForCopy(text, italianFeedback ? contentLanguage : undefined);
    try {
      if (kind === "html" && italianFeedback && "ClipboardItem" in window && navigator.clipboard?.write) {
        await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([value], { type: "text/html" }), "text/plain": new Blob([text], { type: "text/plain" }) })]);
      } else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement("textarea"); field.value = value; document.body.appendChild(field); field.select();
        const copiedSuccessfully = document.execCommand("copy"); field.remove();
        if (italianFeedback && !copiedSuccessfully) throw new Error("Copia non disponibile.");
      }
    } catch {
      if (italianFeedback) {
        try {
          const field = document.createElement("textarea"); field.value = value; document.body.appendChild(field); field.select();
          const copiedSuccessfully = document.execCommand("copy"); field.remove();
          if (!copiedSuccessfully) return;
        } catch { return; }
      } else {
        const field = document.createElement("textarea"); field.value = value; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove();
      }
    }
    setCopied(kind);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(null), 1800);
  }

  const copyLabel = italianFeedback ? <span className="italian-copy-label italian-copy-text-label"><span>{copied === "text" ? copy.generator.copied : copy.generator.copy}</span></span> : copied === "text" ? copy.generator.copied : copy.generator.copy;
  const htmlLabel = italianFeedback ? <span className="italian-copy-label italian-copy-html-label"><span>{copied === "html" ? (copy.locale === "en" ? "HTML copied" : copy.locale === "es" || copy.locale === "pt-BR" ? "HTML copiado" : copy.locale === "fr" ? "HTML copié" : copy.locale === "de" ? "HTML kopiert" : copy.locale === "nl-NL" ? "HTML gekopieerd" : copy.locale === "pl" ? "Skopiowano HTML" : copy.locale === "tr" ? "HTML kopyalandı" : copy.locale === "hu" ? "HTML másolva" : "HTML copiato") : copy.generator.copyHtml}</span></span> : copied === "html" ? copy.generator.copied : copy.generator.copyHtml;
  return <div className="result-actions">
    <Button type="button" variant="outline" className={`action-button primary-copy${italianFeedback && copied === "text" ? " italian-copy-success" : ""}`} onClick={() => copyValue("text")}>{copied === "text" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copyLabel}</Button>
    <Button type="button" variant="outline" className={`action-button secondary-action${italianFeedback && copied === "html" ? " italian-copy-html-success" : ""}`} onClick={() => copyValue("html")}>{copied === "html" ? <Check aria-hidden="true" /> : <Code2 aria-hidden="true" />}{htmlLabel}</Button>
    <Button type="button" variant="outline" className="action-button secondary-action" onClick={onRegenerate}><RefreshCw aria-hidden="true" /> {copy.generator.regenerate}</Button>
  </div>;
}

export function ThemedIpsumPage({ config }: { config: ThemedPageConfig }) {
  const copy = config.copy;
  const paragraphControls = config.locale === "it" || config.locale === "en" || config.locale === "es" || config.locale === "fr" || config.locale === "de" || config.locale === "pt-BR" || config.locale === "nl" || config.locale === "pl" || config.locale === "tr" || config.locale === "hu";
  const editorialStandard = config.locale === "en" || config.locale === "it" || config.locale === "es" || config.locale === "de" || config.locale === "fr" || config.locale === "pt-BR" || config.locale === "nl" || config.locale === "pl" || config.locale === "tr" || config.locale === "hu";
  const [topic, setTopic] = useState<ThemedTopic>("corporate");
  const [contentLanguage, setContentLanguage] = useState<ThemedLanguage>(config.defaultContentLanguage);
  const [mode, setMode] = useState<MainMode>("layout");
  const [words, setWords] = useState(250);
  const [paragraphs, setParagraphs] = useState(paragraphControls ? 1 : 3);
  const [wordsInput, setWordsInput] = useState("250");
  const [paragraphsInput, setParagraphsInput] = useState(paragraphControls ? "1" : "3");
  const [amount, setAmount] = useState(300);
  const [variation, setVariation] = useState(0);

  useEffect(() => {
    document.documentElement.lang = config.locale;
    return () => { document.documentElement.lang = "en"; };
  }, [config.locale]);

  const generated = useMemo(() => config.locale === "it"
    ? generateItalianThemedIpsum({ theme: topic, language: contentLanguage, mode, words, paragraphs, amount, variation })
      : config.locale === "en" || config.locale === "es" || config.locale === "fr" || config.locale === "de" || config.locale === "pt-BR" || config.locale === "nl" || config.locale === "pl" || config.locale === "tr" || config.locale === "hu"
      ? generateEnglishThemed({ theme: topic, language: contentLanguage, mode, words, paragraphs, amount, variation, ...(config.locale === "es" ? { messages: spanishParagraphMessages } : config.locale === "fr" ? { messages: frenchParagraphMessages } : config.locale === "de" ? { messages: germanParagraphMessages } : config.locale === "pt-BR" ? { messages: brazilianPortugueseParagraphMessages } : config.locale === "nl" ? { messages: dutchParagraphMessages } : config.locale === "pl" ? { messages: polishParagraphMessages } : config.locale === "tr" ? { messages: turkishParagraphMessages } : config.locale === "hu" ? { messages: hungarianParagraphMessages } : {}) })
      : { text: generateThemedIpsum({ theme: topic, language: contentLanguage, mode, words, paragraphs, amount, variation }), error: "" },
  [config.locale, topic, contentLanguage, mode, words, paragraphs, amount, variation]);
  const result = generated.text;
  const generationError = generated.error;
  const resultStats = stats(result);

  function selectMode(next: MainMode) {
    setMode(next);
    if (next !== "layout") setAmount(defaults[next]);
  }
  function updateWords(value: string) {
    setWordsInput(value);
    if (value === "") return;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) setWords(paragraphControls ? Math.max(1, Math.min(4000, parsed)) : Math.max(paragraphs, Math.min(4000, parsed)));
  }
  function commitWords() {
    const parsed = Number(wordsInput);
    const next = Number.isFinite(parsed) && parsed > 0 ? (paragraphControls ? Math.max(1, Math.min(4000, parsed)) : Math.max(paragraphs, Math.min(4000, parsed))) : words;
    setWords(next); setWordsInput(String(next));
  }
  function updateParagraphs(value: string) {
    setParagraphsInput(value);
    if (value === "") return;
    const parsed = Number(value);
    if (Number.isFinite(parsed)) setParagraphs(paragraphControls ? Math.max(1, Math.min(100, parsed)) : Math.max(1, Math.min(100, words, parsed)));
  }
  function commitParagraphs() {
    const parsed = Number(paragraphsInput);
    const next = Number.isFinite(parsed) && parsed > 0 ? (paragraphControls ? Math.max(1, Math.min(100, parsed)) : Math.max(1, Math.min(100, words, parsed))) : paragraphs;
    setParagraphs(next); setParagraphsInput(String(next));
  }
  function setPresetWords(value: number) {
    const next = paragraphControls ? value : Math.max(paragraphs, value);
    setWords(next); setWordsInput(String(next));
  }
  function exploreTopic(next: ThemedTopic) {
    setTopic(next);
    setVariation(current => current + 1);
    window.requestAnimationFrame(() => {
      if (config.locale === "fr" || config.locale === "pt-BR" || config.locale === "nl" || config.locale === "tr" || config.locale === "hu") document.getElementById("themed-generator")?.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  return <main className={`site-shell themed-site-shell${editorialStandard ? " themed-editorial-standard" : ""}`} lang={config.locale}>
    <div className="page-content italian-experience-page">
      <ExperienceHeader locale={config.locale} active="themed" copy={copy} />
      <section className="main-section themed-main-section" aria-labelledby="themed-page-title">
        <div className="title-row"><div className="brand-lockup"><h1 id="themed-page-title">{config.title}{config.locale !== "fr" && config.locale !== "pt-BR" && config.locale !== "pl" && config.locale !== "tr" && config.locale !== "hu" && <span className="title-period">.</span>}</h1></div></div>
        <p className="seo-intro">{config.intro}</p>

        <div className="themed-topic-selector" aria-labelledby="themed-topic-label">
          <span className="field-label" id="themed-topic-label">{config.topicLabel}</span>
          <div className="themed-topic-scroll"><div className="themed-topic-list">{themedTopics.map(({ id, label, icon }) => { const Icon = id === "fashion" && (config.locale === "fr" || config.locale === "pt-BR" || config.locale === "nl" || config.locale === "pl" || config.locale === "tr") ? Shirt : icon; return <button key={id} type="button" className="themed-topic-button" aria-pressed={topic === id} onClick={() => setTopic(id)}><Icon aria-hidden="true" /><span>{config.themeLabels[id] ?? label}</span></button>; })}</div></div>
        </div>

        <div className="generator-panel generator-module themed-generator-panel" id="themed-generator">
          <div className={`controls-grid themed-controls-grid${config.showContentLanguageSelector ? "" : " themed-controls-grid-no-language"}`}>
            {config.showContentLanguageSelector && <div className="themed-language-selector" aria-labelledby="themed-language-label">
              <span className="field-label" id="themed-language-label">{config.contentLanguageLabel}</span>
              <div className="themed-language-list" role="group" aria-label={config.contentLanguageLabel}>
                <button type="button" className="themed-language-button" aria-label={config.contentLanguageNames.primary} aria-pressed={contentLanguage === config.defaultContentLanguage} onClick={() => setContentLanguage(config.defaultContentLanguage)}>{config.locale === "it" ? "IT" : config.locale === "es" ? "ES" : config.locale === "de" ? "DE" : config.locale === "fr" ? "FR" : config.locale === "pt-BR" ? "PT-BR" : config.locale === "nl" ? "NL" : config.locale === "pl" ? "PL" : config.locale === "tr" ? "TR" : config.locale === "hu" ? "HU" : "EN"}</button>
                <button type="button" className="themed-language-button" aria-label={config.contentLanguageNames.secondary} aria-pressed={contentLanguage !== config.defaultContentLanguage} onClick={() => setContentLanguage(config.defaultContentLanguage === "en" ? "it" : "en")}>EN</button>
              </div>
            </div>}
            <div className="unit-control"><span className="field-label">{copy.generator.mode}</span><Tabs value={mode} onValueChange={value => selectMode(value as MainMode)}><TabsList className="unit-tabs" aria-label={copy.generator.modeLabel}>{modes.map(item => <TabsTrigger key={item} value={item} className="unit-tab">{item === "layout" ? copy.generator.layout : item === "characters" ? copy.generator.characters : copy.generator.sentences}</TabsTrigger>)}</TabsList>{modes.map(item => <TabsContent key={item} value={item} hidden aria-hidden="true" />)}</Tabs></div>
            {paragraphControls ? <div className="layout-amounts italian-generator-amounts">
              <div className="amount-control">
                <label className="field-label" htmlFor={mode === "layout" ? "themed-word-amount" : "themed-amount"}>{mode === "layout" ? copy.generator.words : mode === "characters" ? copy.generator.characters : copy.generator.sentences}</label>
                {mode === "layout"
                  ? <Input id="themed-word-amount" type="number" min={1} max={4000} value={wordsInput} onChange={event => updateWords(event.target.value)} onBlur={commitWords} />
                  : <Input id="themed-amount" type="number" min={1} max={mode === "characters" ? 20000 : 100} value={amount} onChange={event => setAmount(Math.max(1, Math.min(mode === "characters" ? 20000 : 100, Number(event.target.value) || 1)))} />}
              </div>
              <div className="amount-control paragraphs-control"><label className="field-label" htmlFor="themed-paragraph-amount">{copy.generator.paragraphs}</label><Input id="themed-paragraph-amount" type="number" min={1} max={config.locale === "it" ? italianParagraphLimit(mode === "layout" ? "words" : mode, mode === "layout" ? words : amount) : englishParagraphLimit(mode === "layout" ? "words" : mode, mode === "layout" ? words : amount)} value={paragraphsInput} onChange={event => updateParagraphs(event.target.value)} onBlur={commitParagraphs} /></div>
            </div> : mode === "layout" ? <div className="layout-amounts">
              <div className="amount-control words-control"><label className="field-label" htmlFor="themed-word-amount">{copy.generator.words}</label><Input id="themed-word-amount" type="number" min={paragraphs} max={4000} value={wordsInput} onChange={event => updateWords(event.target.value)} onBlur={commitWords} /></div>
              <div className="amount-control paragraphs-control"><label className="field-label" htmlFor="themed-paragraph-amount">{copy.generator.paragraphs}</label><Input id="themed-paragraph-amount" type="number" min={1} max={Math.min(100, words)} value={paragraphsInput} onChange={event => updateParagraphs(event.target.value)} onBlur={commitParagraphs} /></div>
            </div> : <div className="amount-control precision-amount"><label className="field-label" htmlFor="themed-amount">{mode === "characters" ? copy.generator.characters : copy.generator.sentences}</label><Input id="themed-amount" type="number" min="1" max={mode === "characters" ? 20000 : 100} value={amount} onChange={event => setAmount(Math.max(1, Math.min(mode === "characters" ? 20000 : 100, Number(event.target.value) || 1)))} /></div>}
            <div className="presets"><span className="field-label">{mode === "layout" ? copy.generator.quickWords : copy.generator.presets}</span><div className="preset-buttons">{presets[mode].map(value => <Button type="button" key={value} variant="outline" className="preset-button" aria-pressed={(mode === "layout" ? words : amount) === value} onClick={() => mode === "layout" ? setPresetWords(value) : setAmount(value)}>{value}</Button>)}</div></div>
          </div>
          <div className="output-panel"><span className="field-label">{copy.generator.output}</span><div className="reading-area" lang={paragraphControls ? contentLanguage : undefined} role="region" aria-label={copy.generator.outputAria}>{result.split("\n\n").map((paragraph, index) => <p key={index} lang={paragraphControls ? contentLanguage : undefined}>{paragraph}</p>)}</div>{paragraphControls && generationError && <p className="italian-generation-error" role="alert">{generationError}</p>}</div>
          <div className="module-footer"><dl className="stat-strip compact-stats"><div><dt>{copy.generator.stats.words}</dt><dd>{resultStats.words}</dd></div><div><dt>{copy.generator.stats.characters}</dt><dd>{resultStats.characters}</dd></div><div><dt>{copy.generator.stats.withoutSpaces}</dt><dd>{resultStats.charactersNoSpaces}</dd></div><div><dt>{copy.generator.stats.sentences}</dt><dd>{resultStats.sentences}</dd></div></dl><ThemedCopyActions key={`${variation}-${topic}-${contentLanguage}-${mode}-${words}-${paragraphs}-${amount}-${result}`} text={result} copy={copy} onRegenerate={() => setVariation(current => current + 1)} italianFeedback={paragraphControls} contentLanguage={contentLanguage} /></div>
        </div>
      </section>
      <section className="themed-explore-section" aria-labelledby="themed-explore-title">
        <h2 id="themed-explore-title">{config.exploreTitle}</h2>
        <div className="themed-explore-grid">{config.cards.map(({ id, title, description, action }) => { const topicIcon = themedTopics.find(topicItem => topicItem.id === id)?.icon ?? Briefcase; const Icon = id === "fashion" && (config.locale === "fr" || config.locale === "pt-BR" || config.locale === "nl" || config.locale === "pl" || config.locale === "tr") ? Shirt : topicIcon; return <article className="themed-explore-card" key={id}>{!editorialStandard && <Icon aria-hidden="true" />}<h3>{editorialStandard && <Icon aria-hidden="true" />}{title}</h3><p>{description}</p><Button type="button" variant="outline" className="themed-explore-action" onClick={() => exploreTopic(id)}>{action}</Button></article>; })}</div>
      </section>
      {config.locale === "it" && <ItalianThemedEditorial />}
      {config.locale === "pl" && <PolishThemedEditorial />}
      {config.locale === "nl" && <DutchThemedEditorial />}
      {config.locale === "tr" && <TurkishThemedEditorial />}
      {config.locale === "hu" && <HungarianThemedEditorial />}
      {config.locale === "en" && <EnglishThemedEditorial />}
      {config.locale === "es" && <SpanishThemedEditorial />}
      {config.locale === "de" && <GermanThemedEditorial />}
      {config.locale === "fr" && <FrenchThemedEditorial />}
      {config.locale === "pt-BR" && <BrazilianPortugueseThemedEditorial />}
    </div><HomepageFooter copy={copy} />
  </main>;
}
