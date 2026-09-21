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

type MainMode = "layout" | "characters" | "sentences";
type ThemeChoice = "system" | "light" | "dark";
const modes: MainMode[] = ["layout", "characters", "sentences"];
const presets: Record<MainMode, number[]> = { layout: [50, 100, 250, 500], characters: [150, 300, 500, 1000], sentences: [2, 5, 10, 20] };
const defaults: Record<MainMode, number> = { layout: 250, characters: 300, sentences: 5 };
const formatCount = (count: number) => new Intl.NumberFormat("en-US").format(count);
const faqItems = [
  ["What is a Lorem Ipsum generator?", "A Lorem Ipsum generator creates temporary placeholder copy so you can evaluate hierarchy, spacing, line length, and layout before final content is ready."],
  ["Can I generate an exact number of words and paragraphs?", "Yes. Set Words and Paragraphs together. The generator keeps the total word count exact while distributing the copy across naturally varied paragraphs."],
  ["Can I use generated Lorem Ipsum in a commercial project?", "Lorem Ipsum is placeholder text. Replace it with approved final copy before publishing or shipping a finished product, and check any project-specific content requirements."],
  ["Does this Lorem Ipsum generator store my text?", "The generator runs in your browser. Text entered into the local tools is not sent to a server by this page. Theme preference is stored locally when you choose a manual theme."],
];

function ActionCopy({ text, compact = false }: { text: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); }
    catch { const field = document.createElement("textarea"); field.value = text; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove(); }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }
  return <Button type="button" variant="outline" className={`action-button primary-copy${compact ? " compact-copy" : ""}`} onClick={copy} disabled={!text}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? "Copied" : "Copy"}</Button>;
}
function htmlForCopy(text: string) {
  const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
  return text.split(/\n\n+/).filter(Boolean).map(paragraph => `<p>${escape(paragraph).replace(/\n/g, "<br />")}</p>`).join("\n");
}
function ActionCopyHtml({ text }: { text: string }) {
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
  return <Button type="button" variant="outline" className="action-button secondary-action" onClick={copyHtml} disabled={!text}>{copied ? <Check aria-hidden="true" /> : <Code2 aria-hidden="true" />}{copied ? "Copied" : "Copy HTML"}</Button>;
}
function StatStrip({ text }: { text: string }) {
  const s = stats(text);
  return <dl className="stat-strip compact-stats"><div><dt>words</dt><dd>{formatCount(s.words)}</dd></div><div><dt>characters</dt><dd>{formatCount(s.characters)}</dd></div><div><dt>without spaces</dt><dd>{formatCount(s.charactersNoSpaces)}</dd></div><div><dt>sentences</dt><dd>{formatCount(s.sentences)}</dd></div><div><dt>paragraphs</dt><dd>{formatCount(s.paragraphs)}</dd></div></dl>;
}
function ToolHead({ title, note }: { title: string; note: string }) {
  return <div className="tool-head"><div><h3>{title}</h3><p>{note}</p></div></div>;
}
function FaqSection() {
  return <section className="faq-section" aria-labelledby="faq-title"><div className="faq-heading"><span className="eyebrow">ANSWERS FOR DESIGNERS</span><h2 id="faq-title">Lorem Ipsum generator FAQ</h2><p>Clear answers about placeholder text, word counts, privacy, and practical use.</p></div><div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} /></section>;
}
function ConsentBanner() {
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
  return <aside className="consent-banner" aria-label="Privacy and cookie notice"><div className="consent-copy"><strong>Privacy choices</strong><p>We use local storage for essential preferences. Optional analytics and advertising remain off until you choose them.</p>{customize && <div className="consent-options"><label><input type="checkbox" checked disabled /> <span><b>Necessary</b><small>Theme and consent preferences.</small></span></label><label><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /> <span><b>Analytics</b><small>Anonymous product usage insights.</small></span></label><label><input type="checkbox" checked={advertising} onChange={event => setAdvertising(event.target.checked)} /> <span><b>Advertising</b><small>Ad delivery and measurement.</small></span></label></div>}</div><div className="consent-actions">{customize ? <><Button type="button" variant="outline" onClick={() => save(analytics, advertising)}>Save choices</Button></> : <><Button type="button" variant="outline" onClick={() => save(false, false)}>Reject optional</Button><Button type="button" variant="outline" onClick={() => setCustomize(true)}>Customize</Button><Button type="button" onClick={() => save(true, true)}>Accept all</Button></>}</div></aside>;
}
function MatchTool() {
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");
  const s = stats(source);
  function match(unit: Unit) { if (source.trim()) setResult(generateLorem(unit, unit === "characters" ? s.characters : unit === "words" ? s.words : s.paragraphs, false)); }
  return <article className="tool-card"><ToolHead title="Match existing text" note="Replace real copy while keeping its footprint." />
    <label className="field-label" htmlFor="match-source">Source text</label><Textarea id="match-source" className="tool-textarea" placeholder="Paste text to measure…" value={source} onChange={e => setSource(e.target.value)} />
    <div className="mini-stats"><span>{s.words} words</span><span>{s.characters} characters</span><span>{s.paragraphs} paragraphs</span></div>
    <div className="tool-actions"><Button variant="outline" disabled={!source.trim()} onClick={() => match("characters")}>Same characters</Button><Button variant="outline" disabled={!source.trim()} onClick={() => match("words")}>Same words</Button><Button variant="outline" disabled={!source.trim()} onClick={() => match("paragraphs")}>Same paragraphs</Button></div>
    {result && <div className="tool-output"><div className="output-top"><span>Matched text</span><ActionCopy text={result} compact /></div><p>{result}</p></div>}
  </article>;
}
function ExpansionTool() {
  const [source, setSource] = useState("");
  const [scale, setScale] = useState(0);
  const [result, setResult] = useState("");
  const target = Math.max(1, Math.round(source.length * (1 + scale / 100)));
  return <article className="tool-card"><ToolHead title="Text expansion" note="See how a layout behaves with more or less copy." />
    <label className="field-label" htmlFor="expand-source">Source text</label><Textarea id="expand-source" className="tool-textarea" placeholder="Paste a baseline passage…" value={source} onChange={e => setSource(e.target.value)} />
    <div className="scale-controls"><div className="scale-list" aria-label="Length adjustment">{[-40, -20, -10, 10, 20, 40].map(value => <Button key={value} type="button" variant={scale === value ? "default" : "outline"} className="scale-button" aria-pressed={scale === value} onClick={() => setScale(value)}>{`${value > 0 ? "+" : ""}${value}%`}</Button>)}</div><label className="custom-scale"><span>Custom %</span><div className="range-row custom-scale-row"><Slider aria-label="Custom percentage" value={[Math.max(-100, Math.min(100, scale))]} min={-100} max={100} step={1} onValueChange={values => setScale(values[0])} /><div className="custom-scale-number"><Input type="number" min={-100} step={1} value={scale} onChange={event => setScale(Math.max(-100, Number(event.target.value) || 0))} /><em>%</em></div></div></label></div>
    <div className="target-row"><span>Target length</span><strong>{source ? formatCount(target) : 0} characters</strong></div>
    <Button className="tool-generate" disabled={!source.trim()} onClick={() => setResult(generateLorem("characters", target, false))}>Generate variation <ArrowUpRight aria-hidden="true" /></Button>
    {result && <div className="tool-output"><div className="output-top"><span>{stats(result).characters} characters</span><ActionCopy text={result} compact /></div><p>{result}</p></div>}
  </article>;
}
function FitTool() {
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
  return <article className="tool-card fit-card"><ToolHead title="Fit to Box" note="Test how much text fits in a fixed-size box." />
    <div className="fit-workspace"><div className="fit-controls"><div className="fit-fields">
      <div ref={widthControl} className="fit-field fit-range"><span id="fit-width-label">Width</span><div className="range-row"><Slider aria-labelledby="fit-width-label" value={[width]} min={150} max={1200} step={10} onValueChange={values => setWidth(values[0])} /><output>{width} px</output></div></div>
      <div ref={heightControl} className="fit-field fit-range"><span id="fit-height-label">Height</span><div className="range-row"><Slider aria-labelledby="fit-height-label" value={[height]} min={80} max={800} step={10} onValueChange={values => setHeight(values[0])} /><output>{height} px</output></div></div>
      {([["Font size", fontSize, setFontSize, 10, 48, "px"], ["Line height", lineHeight, setLineHeight, 1, 2.5, "×"], ["Padding", padding, setPadding, 0, 80, "px"]] as const).map(([label, value, setter, min, max, suffix]) => <label key={label} className="fit-field fit-number"><span>{label}</span><span className="fit-input"><Input type="number" min={min} max={max} step={label === "Line height" ? .1 : 1} value={value} onChange={e => setter(Math.max(min, Math.min(max, Number(e.target.value) || min)))} /><em>{suffix}</em></span></label>)}
    </div></div><div className="fit-preview-column"><div className="fit-preview-wrap"><div className="fit-meta"><span>Preview</span></div><div className="fit-preview-scroll"><div className="fit-preview" style={dimensions}>{text}</div></div></div></div></div>
    <div className="fit-footer"><dl className="fit-footer-stats"><div><dt>approximate fit</dt><dd>{formatCount(stats(text).words)} words</dd></div><div><dt>box</dt><dd>{width} × {height} px</dd></div></dl><div className="fit-actions"><ActionCopy text={text} /><ActionCopyHtml text={text} /><Button type="button" variant="outline" className="action-button secondary-action" onClick={() => setVariation(current => current + 1)}><RefreshCw aria-hidden="true" /> Regenerate</Button></div></div>
    <div ref={measure} aria-hidden="true" className="fit-measure" style={dimensions} />
  </article>;
}
export default function Home() {
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
  return <main className="site-shell" lang="en">
    <div className="page-content">
      <section className="main-section" aria-labelledby="page-title"><div className="utility-row"><div className="header-actions"><label className="language-picker"><span className="sr-only">Language</span><select aria-label="Language" value="/" onChange={event => window.location.assign(event.target.value)}><option value="/">English</option><option value="/it">Italiano</option></select></label><div className="theme-switch" role="group" aria-label="Color theme">{(["system", "light", "dark"] as const).map(choice => <button key={choice} type="button" aria-pressed={themeChoice === choice} onClick={() => selectTheme(choice)}>{choice === "light" && <Sun className="theme-icon" aria-hidden="true" />}{choice === "dark" && <Moon className="theme-icon" aria-hidden="true" />}{choice === "system" ? "Auto" : choice}</button>)}</div></div></div><div className="title-row"><div className="brand-lockup"><h1 id="page-title">Generate clean placeholder text<span className="desktop-break"><br /></span> with the Lorem Ipsum Generator</h1></div></div>
        <h2 className="seo-intro">Generate exact words, paragraphs, sentences, or characters for layouts, prototypes, and design work.</h2>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [
          { "@type": "WebSite", name: "lorem-generator.com", url: "https://lorem-generator.com/", inLanguage: "en" },
          { "@type": "WebApplication", name: "lorem-generator.com", url: "https://lorem-generator.com/", applicationCategory: "DesignApplication", operatingSystem: "Any", description: "A browser-based Lorem Ipsum generator for exact words, paragraphs, sentences, and characters.", isAccessibleForFree: true, featureList: ["Exact word and paragraph counts", "Character and sentence generation", "Fit to Box preview", "Browser-local generation"] }
        ] }) }} />
        <div className="generator-panel generator-module">
          <div className={`controls-grid ${mode === "layout" ? "layout-mode" : "precision-mode"}`}>
            <div className="unit-control"><span className="field-label">Mode</span><Tabs value={mode} onValueChange={value => selectMode(value as MainMode)}><TabsList className="unit-tabs" aria-label="Generation mode">{modes.map(item => <TabsTrigger key={item} value={item} className="unit-tab">{item === "layout" ? "Words + paragraphs" : item[0].toUpperCase() + item.slice(1)}</TabsTrigger>)}</TabsList></Tabs></div>
            {mode === "layout" ? <div className="layout-amounts">
              <div className="amount-control words-control"><label className="field-label" htmlFor="word-amount">Words</label><Input id="word-amount" type="number" min={paragraphs} max={4000} value={wordsInput} onChange={e => updateWords(e.target.value)} onBlur={commitWords} /></div>
              <div className="amount-control paragraphs-control"><label className="field-label" htmlFor="paragraph-amount">Paragraphs</label><Input id="paragraph-amount" type="number" min={1} max={Math.min(100, words)} value={paragraphsInput} onChange={e => updateParagraphs(e.target.value)} onBlur={commitParagraphs} /></div>
            </div> : <div className="amount-control precision-amount"><label className="field-label" htmlFor="amount">{mode === "characters" ? "Characters" : "Sentences"}</label><Input id="amount" type="number" min="1" max={mode === "characters" ? 20000 : 100} value={amount} onChange={e => setAmount(Math.max(1, Math.min(mode === "characters" ? 20000 : 100, Number(e.target.value) || 1)))} /></div>}
            <div className="presets"><span className="field-label">{mode === "layout" ? "Word presets" : "Presets"}</span><div className="preset-buttons">{presets[mode].map(value => <Button type="button" key={value} variant="outline" className="preset-button" aria-pressed={(mode === "layout" ? words : amount) === value} onClick={() => mode === "layout" ? setPresetWords(value) : setAmount(value)}>{value}</Button>)}</div></div>
            <div className="option-cell"><span className="field-label">Options</span><div className="option-content"><label className="check-option classic-option"><Checkbox checked={startClassic} onCheckedChange={checked => setStartClassic(checked === true)} /><span>Start with “Lorem ipsum…”</span></label><div className="sentence-length-control"><span className="sentence-length-label">Sentence length</span><div className="sentence-length-options">{(["short", "mixed", "long"] as const).map(value => <button key={value} type="button" className={sentenceLength === value ? "is-active" : ""} aria-pressed={sentenceLength === value} onClick={() => setSentenceLength(value)}>{value}</button>)}</div></div></div></div>
          </div>
          <div className="output-panel"><span className="field-label">Output</span><div className="reading-area" role="region" aria-label="Generated Lorem Ipsum">{result.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div>
          <div className="module-footer"><StatStrip text={result} /><div className="result-actions"><ActionCopy text={result} /><ActionCopyHtml text={result} /><Button type="button" variant="outline" className="action-button secondary-action" onClick={regenerate}><RefreshCw aria-hidden="true" /> Regenerate</Button></div></div>
        </div>
      </section>
      <section className="designer-section" aria-label="Fit to Box"><FitTool /></section>
      <section className="remaining-tools" aria-label="More Designer Tools"><div className="tool-grid"><MatchTool /><ExpansionTool /></div></section>
      <section className="about-section" aria-labelledby="about-title"><div><span className="eyebrow">A NOTE ON PLACEHOLDER TEXT</span><h2 id="about-title">A working draft for every layout.</h2></div><div className="about-copy"><p>Lorem Ipsum is familiar placeholder text derived from classical Latin. Designers use it to judge hierarchy, rhythm, line length, and spacing before final copy is ready.</p><p>Set words and paragraphs together to match a layout&apos;s density and rhythm, or switch to characters or sentences when a precise length matters.</p></div></section>
      <section className="seo-content" aria-labelledby="why-title"><div className="seo-content-heading"><span className="eyebrow">BUILT FOR REAL LAYOUTS</span><h2 id="why-title">A Lorem Ipsum Generator for designers and developers.</h2></div><div className="seo-content-grid"><article><h3>Keep the layout honest.</h3><p>Generate Lorem Ipsum with exact words and paragraphs together, then adjust the density without rebuilding your settings. Use Characters or Sentences when a component, headline, or text block needs a precise footprint.</p><p>Generate Lorem is made for wireframes, editorial layouts, interface prototypes, and type studies. Fit to Box helps you test how copy behaves before final content arrives.</p></article><article><h3>Copy the format your workflow needs.</h3><p>Copy plain text for notes and drafts, or use <strong>Copy HTML</strong> when you are moving placeholder content into a page or component. Switch formats as your layout moves from exploration to implementation.</p><p>Use the result as temporary content during design. Replace it with approved final copy before publishing a finished project.</p></article></div></section>
      <section className="guide-section" aria-labelledby="guide-title"><div className="guide-heading"><span className="eyebrow">A SHORT GUIDE TO LOREM IPSUM</span><h2 id="guide-title">Why placeholder text still matters.</h2></div><div className="guide-grid"><article><h3>What Lorem Ipsum is</h3><p>Lorem Ipsum is temporary copy used to test a page before the final words are ready. Because it looks like a language without delivering a message, it lets a designer judge hierarchy, line length, type size, spacing, and the balance between text and other elements.</p></article><article><h3>Where it comes from</h3><p>The familiar opening is adapted from a passage in Cicero’s <em>De finibus bonorum et malorum</em>. Over time, the original Latin was shortened and rearranged into the neutral placeholder text used by print and digital design tools today.</p></article><article><h3>When to use it</h3><p>Use Lorem Ipsum for wireframes, early interface prototypes, editorial layouts, brochures, packaging, and type studies. It keeps attention on the structure while content decisions are still in progress.</p></article><article><h3>When to replace it</h3><p>Placeholder copy should disappear before a website, document, or printed project is final. Real content is needed to review tone, accessibility, meaning, search visibility, and the actual reading experience.</p></article></div></section>
      <FaqSection />
    </div><footer className="site-footer"><div className="footer-brand"><span>lorem-generator.com © 2026</span><p>Placeholder copy for thoughtful layouts.</p></div><nav className="footer-links" aria-label="Legal information"><a href="/privacy-policy/">Privacy Policy</a><a href="/cookie-policy/">Cookie Policy</a><button type="button" onClick={() => window.dispatchEvent(new Event("open-privacy"))}>Manage privacy</button></nav></footer><ConsentBanner />
  </main>;
}
