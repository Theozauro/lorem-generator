"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Code2, Copy, Moon, RefreshCw, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { generateLayout, generateLorem, initialLayoutText, resizeLorem, stats, type SentenceLength, type Unit } from "@/lib/lorem";
import { homepageCopy, type HomepageCopy, type HomepageLocale } from "./homepage-copy";

type MainMode = "layout" | "characters" | "sentences";
type ThemeChoice = "system" | "light" | "dark";
const modes: MainMode[] = ["layout", "characters", "sentences"];
const presets: Record<MainMode, number[]> = { layout: [50, 100, 250, 500], characters: [150, 300, 500, 1000], sentences: [2, 5, 10, 20] };
const defaults: Record<MainMode, number> = { layout: 250, characters: 300, sentences: 5 };
const formatCount = (count: number, locale = "en-US") => new Intl.NumberFormat(locale).format(count);

function ActionCopy({ text, copy, compact = false }: { text: string; copy: HomepageCopy; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copyText() {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); }
    catch { const field = document.createElement("textarea"); field.value = text; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove(); }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }
  return <Button type="button" variant="outline" className={`action-button primary-copy${compact ? " compact-copy" : ""}`} onClick={copyText} disabled={!text}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? copy.generator.copied : copy.generator.copy}</Button>;
}
function htmlForCopy(text: string) {
  const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
  return text.split(/\n\n+/).filter(Boolean).map(paragraph => `<p>${escape(paragraph).replace(/\n/g, "<br />")}</p>`).join("\n");
}
function ActionCopyHtml({ text, copy }: { text: string; copy: HomepageCopy }) {
  const [copied, setCopied] = useState(false);
  async function copyHtml() {
    if (!text) return;
    const html = htmlForCopy(text);
    try {
      if ("ClipboardItem" in window && navigator.clipboard?.write) await navigator.clipboard.write([new ClipboardItem({ "text/html": new Blob([html], { type: "text/html" }), "text/plain": new Blob([text], { type: "text/plain" }) })]);
      else await navigator.clipboard.writeText(html);
    } catch {
      try { await navigator.clipboard.writeText(html); }
      catch { const field = document.createElement("textarea"); field.value = html; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove(); }
    }
    setCopied(true); window.setTimeout(() => setCopied(false), 1800);
  }
  return <Button type="button" variant="outline" className="action-button secondary-action" onClick={copyHtml} disabled={!text}>{copied ? <Check aria-hidden="true" /> : <Code2 aria-hidden="true" />}{copied ? copy.generator.copied : copy.generator.copyHtml}</Button>;
}
function StatStrip({ text, copy }: { text: string; copy: HomepageCopy }) {
  const s = stats(text);
  return <dl className="stat-strip compact-stats"><div><dt>{copy.generator.stats.words}</dt><dd>{formatCount(s.words, copy.numberLocale)}</dd></div><div><dt>{copy.generator.stats.characters}</dt><dd>{formatCount(s.characters, copy.numberLocale)}</dd></div><div><dt>{copy.generator.stats.withoutSpaces}</dt><dd>{formatCount(s.charactersNoSpaces, copy.numberLocale)}</dd></div><div><dt>{copy.generator.stats.sentences}</dt><dd>{formatCount(s.sentences, copy.numberLocale)}</dd></div><div><dt>{copy.generator.stats.paragraphs}</dt><dd>{formatCount(s.paragraphs, copy.numberLocale)}</dd></div></dl>;
}
function ToolHead({ title, note }: { title: string; note: string }) {
  return <div className="tool-head"><div><h3>{title}</h3><p>{note}</p></div></div>;
}
function FaqSection({ copy }: { copy: HomepageCopy }) {
  return <section className="faq-section" aria-labelledby="faq-title"><div className="faq-heading"><span className="eyebrow">{copy.faq.eyebrow}</span><h2 id="faq-title">{copy.faq.title}</h2><p>{copy.faq.intro}</p></div><div className="faq-list">{copy.faq.items.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faq.items.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} /></section>;
}
function ConsentBanner({ copy }: { copy: HomepageCopy }) {
  const [visible, setVisible] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  useEffect(() => {
    const openPrivacy = () => { setCustomize(true); setVisible(true); };
    window.addEventListener("open-privacy", openPrivacy);
    try {
      const saved = window.localStorage.getItem("lorem-consent");
      // Hydrate the banner from the browser-only consent store.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!saved) setVisible(true);
      else { const parsed = JSON.parse(saved) as { analytics?: boolean; advertising?: boolean }; setAnalytics(parsed.analytics === true); setAdvertising(parsed.advertising === true); }
    } catch { setVisible(false); }
    return () => window.removeEventListener("open-privacy", openPrivacy);
  }, []);
  function save(nextAnalytics: boolean, nextAdvertising: boolean) {
    try { window.localStorage.setItem("lorem-consent", JSON.stringify({ necessary: true, preferences: true, analytics: nextAnalytics, advertising: nextAdvertising, version: "1.0", updatedAt: new Date().toISOString() })); } catch {}
    setAnalytics(nextAnalytics); setAdvertising(nextAdvertising); setVisible(false); setCustomize(false);
  }
  if (!visible) return null;
  return <aside className="consent-banner" aria-label={copy.consent.aria}><div className="consent-copy"><strong>{copy.consent.title}</strong><p>{copy.consent.intro}</p>{customize && <div className="consent-options"><label><input type="checkbox" checked disabled /> <span><b>{copy.consent.necessary}</b><small>{copy.consent.necessaryNote}</small></span></label><label><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /> <span><b>{copy.consent.analytics}</b><small>{copy.consent.analyticsNote}</small></span></label><label><input type="checkbox" checked={advertising} onChange={event => setAdvertising(event.target.checked)} /> <span><b>{copy.consent.advertising}</b><small>{copy.consent.advertisingNote}</small></span></label></div>}</div><div className="consent-actions">{customize ? <><Button type="button" variant="outline" onClick={() => save(analytics, advertising)}>{copy.consent.save}</Button></> : <><Button type="button" onClick={() => save(true, true)}>{copy.consent.accept}</Button><Button type="button" variant="outline" onClick={() => save(false, false)}>{copy.consent.reject}</Button><Button type="button" variant="outline" onClick={() => setCustomize(true)}>{copy.consent.customize}</Button></>}</div></aside>;
}
function MatchTool({ copy }: { copy: HomepageCopy }) {
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");
  const s = stats(source);
  function match(unit: Unit) { if (source.trim()) setResult(generateLorem(unit, unit === "characters" ? s.characters : unit === "words" ? s.words : s.paragraphs, false)); }
  return <article className="tool-card"><ToolHead title={copy.match.title} note={copy.match.note} />
    <label className="field-label" htmlFor="match-source">{copy.match.source}</label><Textarea id="match-source" className="tool-textarea" placeholder={copy.match.placeholder} value={source} onChange={e => setSource(e.target.value)} />
    <div className="mini-stats"><span>{s.words} {copy.generator.stats.words}</span><span>{s.characters} {copy.generator.stats.characters}</span><span>{s.paragraphs} {copy.generator.stats.paragraphs}</span></div>
    <div className="tool-actions"><Button variant="outline" disabled={!source.trim()} onClick={() => match("characters")}>{copy.match.characters}</Button><Button variant="outline" disabled={!source.trim()} onClick={() => match("words")}>{copy.match.words}</Button><Button variant="outline" disabled={!source.trim()} onClick={() => match("paragraphs")}>{copy.match.paragraphs}</Button></div>
    {result && <div className="tool-output"><div className="output-top"><span>{copy.match.matched}</span><ActionCopy text={result} copy={copy} compact /></div><p>{result}</p></div>}
  </article>;
}
function ExpansionTool({ copy }: { copy: HomepageCopy }) {
  const [source, setSource] = useState("");
  const [scale, setScale] = useState(0);
  const [result, setResult] = useState("");
  const target = Math.max(1, Math.round(source.length * (1 + scale / 100)));
  return <article className="tool-card"><ToolHead title={copy.expansion.title} note={copy.expansion.note} />
    <label className="field-label" htmlFor="expand-source">{copy.expansion.source}</label><Textarea id="expand-source" className="tool-textarea" placeholder={copy.expansion.placeholder} value={source} onChange={e => setSource(e.target.value)} />
    <div className="scale-controls"><div className="scale-list" aria-label={copy.expansion.adjustment}>{[-40, -20, -10, 10, 20, 40].map(value => <Button key={value} type="button" variant={scale === value ? "default" : "outline"} className="scale-button" aria-pressed={scale === value} onClick={() => setScale(value)}>{`${value > 0 ? "+" : ""}${value}%`}</Button>)}</div><label className="custom-scale"><span>{copy.expansion.custom}</span><div className="range-row custom-scale-row"><Slider aria-label={copy.expansion.percentage} value={[Math.max(-100, Math.min(100, scale))]} min={-100} max={100} step={1} onValueChange={values => setScale(values[0])} /><div className="custom-scale-number"><Input type="number" min={-100} step={1} value={scale} onChange={event => setScale(Math.max(-100, Number(event.target.value) || 0))} /><em>%</em></div></div></label></div>
    <div className="target-row"><span>{copy.expansion.target}</span><strong>{source ? formatCount(target) : 0} {copy.expansion.characters}</strong></div>
    <Button className="tool-generate" disabled={!source.trim()} onClick={() => setResult(generateLorem("characters", target, false))}>{copy.expansion.generate} <ArrowUpRight aria-hidden="true" /></Button>
    {result && <div className="tool-output"><div className="output-top"><span>{stats(result).characters} {copy.expansion.characters}</span><ActionCopy text={result} copy={copy} compact /></div><p>{result}</p></div>}
  </article>;
}
function FitTool({ copy }: { copy: HomepageCopy }) {
  const [width, setWidth] = useState(340), [height, setHeight] = useState(220), [fontSize, setFontSize] = useState(16), [lineHeight, setLineHeight] = useState(1.5), [padding, setPadding] = useState(20);
  const [text, setText] = useState("");
  const [variation, setVariation] = useState(0);
  const measure = useRef<HTMLDivElement>(null);
  const widthControl = useRef<HTMLDivElement>(null);
  const heightControl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    widthControl.current?.querySelector('[role="slider"]')?.setAttribute("aria-labelledby", "fit-width-label");
    heightControl.current?.querySelector('[role="slider"]')?.setAttribute("aria-labelledby", "fit-height-label");
  }, []);
  useEffect(() => {
    const el = measure.current; if (!el) return;
    const sample = generateLorem("words", 500, true).split(" ");
    let low = 1, high = sample.length, best = 1;
    while (low <= high) { const mid = Math.floor((low + high) / 2); el.textContent = sample.slice(0, mid).join(" "); if (el.scrollHeight <= height) { best = mid; low = mid + 1; } else high = mid - 1; }
    const fitted = sample.slice(0, best).join(" ");
    setText(fitted);
  }, [width, height, fontSize, lineHeight, padding, variation]);
  const dimensions = { width, height, padding, fontSize, lineHeight };
  return <article className="tool-card fit-card"><ToolHead title={copy.fit.title} note={copy.fit.note} />
    <div className="fit-workspace"><div className="fit-controls"><div className="fit-fields">
      <div ref={widthControl} className="fit-field fit-range"><span id="fit-width-label">{copy.fit.width}</span><div className="range-row"><Slider aria-labelledby="fit-width-label" value={[width]} min={150} max={1200} step={10} onValueChange={values => setWidth(values[0])} /><output>{width} px</output></div></div>
      <div ref={heightControl} className="fit-field fit-range"><span id="fit-height-label">{copy.fit.height}</span><div className="range-row"><Slider aria-labelledby="fit-height-label" value={[height]} min={80} max={800} step={10} onValueChange={values => setHeight(values[0])} /><output>{height} px</output></div></div>
      {([[copy.fit.fontSize, fontSize, setFontSize, 10, 48, "px"], [copy.fit.lineHeight, lineHeight, setLineHeight, 1, 2.5, "×"], [copy.fit.padding, padding, setPadding, 0, 80, "px"]] as const).map(([label, value, setter, min, max, suffix]) => <label key={label} className="fit-field fit-number"><span>{label}</span><span className="fit-input"><Input type="number" min={min} max={max} step={suffix === "×" ? .1 : 1} value={value} onChange={e => setter(Math.max(min, Math.min(max, Number(e.target.value) || min)))} /><em>{suffix}</em></span></label>)}
    </div></div><div className="fit-preview-column"><div className="fit-preview-wrap"><div className="fit-meta"><span>{copy.fit.preview}</span></div><div className="fit-preview-scroll"><div className="fit-preview" style={dimensions}>{text}</div></div></div></div></div>
    <div className="fit-footer"><dl className="fit-footer-stats"><div><dt>{copy.fit.approximate}</dt><dd>{formatCount(stats(text).words, copy.numberLocale)} {copy.generator.stats.words}</dd></div><div><dt>{copy.fit.box}</dt><dd>{width} × {height} px</dd></div></dl><div className="fit-actions"><ActionCopy text={text} copy={copy} /><ActionCopyHtml text={text} copy={copy} /><Button type="button" variant="outline" className="action-button secondary-action" onClick={() => setVariation(current => current + 1)}><RefreshCw aria-hidden="true" /> {copy.generator.regenerate}</Button></div></div>
    <div ref={measure} aria-hidden="true" className="fit-measure" style={dimensions} />
  </article>;
}
export default function Home({ locale }: { locale: HomepageLocale }) {
  const copy = homepageCopy[locale];
  const localePath = locale === "it" ? "/it/" : locale === "es" ? "/es/" : locale === "fr" ? "/fr/" : locale === "de" ? "/de/" : "/";
  useEffect(() => {
    document.documentElement.lang = locale;
    return () => { document.documentElement.lang = "en"; };
  }, [locale]);
  const [mode, setMode] = useState<MainMode>("layout");
  const [words, setWords] = useState(250);
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsInput, setWordsInput] = useState("250");
  const [paragraphsInput, setParagraphsInput] = useState("3");
  const [amount, setAmount] = useState(300);
  const [startClassic, setStartClassic] = useState(true);
  const [sentenceLength, setSentenceLength] = useState<SentenceLength>("mixed");
  const [result, setResult] = useState(initialLayoutText);
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>("system");
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
  function selectTheme(next: ThemeChoice) {
    setThemeChoice(next);
    if (next === "system") {
      // eslint-disable-next-line react-hooks/immutability
      delete document.documentElement.dataset.theme;
      try { window.localStorage.removeItem("lorem-theme"); } catch {}
    } else {
      // eslint-disable-next-line react-hooks/immutability
      document.documentElement.dataset.theme = next;
      try { window.localStorage.setItem("lorem-theme", next); } catch {}
    }
  }
  const previousSettings = useRef({ mode, words, paragraphs, amount, startClassic, sentenceLength });
  useEffect(() => {
    const previous = previousSettings.current;
    if (previous.mode === mode && previous.words === words && previous.paragraphs === paragraphs && previous.amount === amount && previous.startClassic === startClassic && previous.sentenceLength === sentenceLength) return;
    setResult(current => mode === "layout" ? generateLayout(words, paragraphs, startClassic, Math.random, sentenceLength)
      : previous.mode === mode && previous.startClassic === startClassic && previous.sentenceLength === sentenceLength
        ? resizeLorem(current, mode, previous.amount, amount, startClassic, sentenceLength)
        : generateLorem(mode, amount, startClassic, sentenceLength));
    previousSettings.current = { mode, words, paragraphs, amount, startClassic, sentenceLength };
  }, [mode, words, paragraphs, amount, startClassic, sentenceLength]);
  function selectMode(next: MainMode) { setMode(next); if (next !== "layout") setAmount(defaults[next]); }
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
  function regenerate() { setResult(mode === "layout" ? generateLayout(words, paragraphs, startClassic, Math.random, sentenceLength) : generateLorem(mode, amount, startClassic, sentenceLength)); }
  return <main className="site-shell" lang={copy.locale}>
    <div className="page-content">
      <section className="main-section" aria-labelledby="page-title"><div className="utility-row"><div className="header-actions"><label className="language-picker"><span className="sr-only">{copy.languageLabel}</span><select aria-label={copy.languageLabel} value={locale === "it" ? "/it/" : locale === "es" ? "/es/" : locale === "fr" ? "/fr/" : locale === "de" ? "/de/" : "/"} onChange={event => window.location.assign(event.target.value)}><option value="/">English</option><option value="/it/">Italiano</option><option value="/es/">Español</option><option value="/fr/">Français</option><option value="/de/">Deutsch</option></select></label><div className="theme-switch" role="group" aria-label={copy.themeLabel}>{(["system", "light", "dark"] as const).map(choice => <button key={choice} type="button" aria-pressed={themeChoice === choice} onClick={() => selectTheme(choice)}>{choice === "light" && <Sun className="theme-icon" aria-hidden="true" />}{choice === "dark" && <Moon className="theme-icon" aria-hidden="true" />}{choice === "system" ? copy.theme.system : choice === "light" ? copy.theme.light : copy.theme.dark}</button>)}</div></div></div><div className="title-row"><div className="brand-lockup"><h1 id="page-title">{copy.title}<span className="desktop-break"><br /></span> {copy.titleAfterBreak}</h1></div></div>
        <h2 className="seo-intro">{copy.intro}</h2>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [
          { "@type": "WebSite", name: "lorem-generator.com", url: `https://lorem-generator.com${localePath}`, inLanguage: locale },
          { "@type": "WebApplication", name: "lorem-generator.com", url: `https://lorem-generator.com${localePath}`, applicationCategory: "DesignApplication", operatingSystem: "Any", description: copy.schema.description, isAccessibleForFree: true, featureList: copy.schema.featureList }
        ] }) }} />
        <div className="generator-panel generator-module">
          <div className={`controls-grid ${mode === "layout" ? "layout-mode" : "precision-mode"}`}>
            <div className="unit-control"><span className="field-label">{copy.generator.mode}</span><Tabs value={mode} onValueChange={value => selectMode(value as MainMode)}><TabsList className="unit-tabs" aria-label={copy.generator.modeLabel}>{modes.map(item => <TabsTrigger key={item} value={item} className="unit-tab">{item === "layout" ? copy.generator.layout : item === "characters" ? copy.generator.characters : copy.generator.sentences}</TabsTrigger>)}</TabsList></Tabs></div>
            {mode === "layout" ? <div className="layout-amounts">
              <div className="amount-control words-control"><label className="field-label" htmlFor="word-amount">{copy.generator.words}</label><Input id="word-amount" type="number" min={paragraphs} max={4000} value={wordsInput} onChange={e => updateWords(e.target.value)} onBlur={commitWords} /></div>
              <div className="amount-control paragraphs-control"><label className="field-label" htmlFor="paragraph-amount">{copy.generator.paragraphs}</label><Input id="paragraph-amount" type="number" min={1} max={Math.min(100, words)} value={paragraphsInput} onChange={e => updateParagraphs(e.target.value)} onBlur={commitParagraphs} /></div>
            </div> : <div className="amount-control precision-amount"><label className="field-label" htmlFor="amount">{mode === "characters" ? copy.generator.characters : copy.generator.sentences}</label><Input id="amount" type="number" min="1" max={mode === "characters" ? 20000 : 100} value={amount} onChange={e => setAmount(Math.max(1, Math.min(mode === "characters" ? 20000 : 100, Number(e.target.value) || 1)))} /></div>}
            <div className="presets"><span className="field-label">{mode === "layout" ? copy.generator.quickWords : copy.generator.presets}</span><div className="preset-buttons">{presets[mode].map(value => <Button type="button" key={value} variant="outline" className="preset-button" aria-pressed={(mode === "layout" ? words : amount) === value} onClick={() => mode === "layout" ? setPresetWords(value) : setAmount(value)}>{value}</Button>)}</div></div>
            <div className="option-cell"><span className="field-label">{copy.generator.options}</span><div className="option-content"><label className="check-option classic-option"><Checkbox checked={startClassic} onCheckedChange={checked => setStartClassic(checked === true)} /><span>{copy.generator.startClassic}</span></label><div className="sentence-length-control"><span className="sentence-length-label">{copy.generator.sentenceLength}</span><div className="sentence-length-options">{(["short", "mixed", "long"] as const).map(value => <button key={value} type="button" className={sentenceLength === value ? "is-active" : ""} aria-pressed={sentenceLength === value} onClick={() => setSentenceLength(value)}>{value === "short" ? copy.generator.short : value === "mixed" ? copy.generator.mixed : copy.generator.long}</button>)}</div></div></div></div>
          </div>
          <div className="output-panel"><span className="field-label">{copy.generator.output}</span><div className="reading-area" role="region" aria-label={copy.generator.outputAria}>{result.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div>
          <div className="module-footer"><StatStrip text={result} copy={copy} /><div className="result-actions"><ActionCopy text={result} copy={copy} /><ActionCopyHtml text={result} copy={copy} /><Button type="button" variant="outline" className="action-button secondary-action" onClick={regenerate}><RefreshCw aria-hidden="true" /> {copy.generator.regenerate}</Button></div></div>
        </div>
      </section>
      <section className="designer-section" aria-label={copy.fit.aria}><FitTool copy={copy} /></section>
      <section className="remaining-tools" aria-label={copy.sections.remainingTools}><div className="tool-grid"><MatchTool copy={copy} /><ExpansionTool copy={copy} /></div></section>
      <section className="about-section" aria-labelledby="about-title"><div><span className="eyebrow">{copy.sections.aboutEyebrow}</span><h2 id="about-title">{copy.sections.aboutTitle}</h2></div><div className="about-copy"><p>{copy.sections.aboutOne}</p><p>{copy.sections.aboutTwo}</p></div></section>
      <section className="seo-content" aria-labelledby="why-title"><div className="seo-content-heading"><span className="eyebrow">{copy.sections.seoEyebrow}</span><h2 id="why-title">{copy.sections.seoTitle}</h2></div><div className="seo-content-grid"><article><h3>{copy.sections.seoOneTitle}</h3><p>{copy.sections.seoOneA}</p><p>{copy.sections.seoOneB}</p></article><article><h3>{copy.sections.seoTwoTitle}</h3><p>{copy.sections.seoTwoA}</p><p>{copy.sections.seoTwoB}</p></article></div></section>
      <section className="guide-section" aria-labelledby="guide-title"><div className="guide-heading"><span className="eyebrow">{copy.sections.guideEyebrow}</span><h2 id="guide-title">{copy.sections.guideTitle}</h2></div><div className="guide-grid">{copy.sections.guide.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <FaqSection copy={copy} />
    </div><footer className="site-footer"><div className="footer-brand"><span>lorem-generator.com © 2026</span><p>{copy.footer.description}</p></div><nav className="footer-links" aria-label={copy.footer.aria}><a href={copy.footer.privacyHref}>{copy.footer.privacy}</a><a href={copy.footer.cookiesHref}>{copy.footer.cookies}</a><button type="button" onClick={() => window.dispatchEvent(new Event("open-privacy"))}>{copy.footer.manage}</button></nav></footer><ConsentBanner copy={copy} />
  </main>;
}
