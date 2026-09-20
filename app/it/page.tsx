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
const formatCount = (count: number) => new Intl.NumberFormat("it-IT").format(count);
const faqItems = [
  ["Cos’è un generatore Lorem Ipsum?", "Un generatore Lorem Ipsum crea testo segnaposto temporaneo per valutare gerarchia, spaziatura, lunghezza delle righe e layout prima che il contenuto finale sia pronto."],
  ["Posso generare un numero esatto di parole e paragrafi?", "Sì. Imposta insieme parole e paragrafi. Il generatore mantiene esatto il conteggio totale distribuendo il testo in paragrafi naturalmente variati."],
  ["Posso usare Lorem Ipsum in un progetto commerciale?", "Lorem Ipsum è testo segnaposto. Sostituiscilo con il testo finale approvato prima di pubblicare o distribuire un prodotto finito."],
  ["Questo generatore Lorem Ipsum salva il mio testo?", "Il generatore funziona nel browser. Il testo inserito negli strumenti locali non viene inviato a un server. La preferenza del tema viene salvata localmente quando scegli un tema manuale."],
];

function ActionCopy({ text, compact = false }: { text: string; compact?: boolean }) {
  const [copied, setCopiato] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    if (!text) return;
    try { await navigator.clipboard.writeText(text); }
    catch { const field = document.createElement("textarea"); field.value = text; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove(); }
    setCopiato(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiato(false), 1800);
  }
  return <Button type="button" variant="outline" className={`action-button primary-copy${compact ? " compact-copy" : ""}`} onClick={copy} disabled={!text}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}{copied ? "Copiato" : "Copia"}</Button>;
}
function htmlForCopy(text: string) {
  const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
  return text.split(/\n\n+/).filter(Boolean).map(paragraph => `<p>${escape(paragraph).replace(/\n/g, "<br />")}</p>`).join("\n");
}
function ActionCopyHtml({ text }: { text: string }) {
  const [copied, setCopiato] = useState(false);
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
    setCopiato(true); window.setTimeout(() => setCopiato(false), 1800);
  }
  return <Button type="button" variant="outline" className="action-button secondary-action" onClick={copyHtml} disabled={!text}>{copied ? <Check aria-hidden="true" /> : <Code2 aria-hidden="true" />}{copied ? "Copiato" : "Copia HTML"}</Button>;
}
function StatStrip({ text }: { text: string }) {
  const s = stats(text);
  return <dl className="stat-strip compact-stats"><div><dt>parole</dt><dd>{formatCount(s.words)}</dd></div><div><dt>caratteri</dt><dd>{formatCount(s.characters)}</dd></div><div><dt>senza spazi</dt><dd>{formatCount(s.charactersNoSpaces)}</dd></div><div><dt>frasi</dt><dd>{formatCount(s.sentences)}</dd></div><div><dt>paragrafi</dt><dd>{formatCount(s.paragraphs)}</dd></div></dl>;
}
function ToolHead({ title, note }: { title: string; note: string }) {
  return <div className="tool-head"><div><h3>{title}</h3><p>{note}</p></div></div>;
}
function FaqSection() {
  return <section className="faq-section" aria-labelledby="faq-title"><div className="faq-heading"><span className="eyebrow">RISPOSTE PER DESIGNER</span><h2 id="faq-title">FAQ del generatore Lorem Ipsum</h2><p>Risposte chiare su testo segnaposto, conteggi, privacy e utilizzo pratico.</p></div><div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} /></section>;
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
  return <aside className="consent-banner" aria-label="Avviso su privacy e cookie"><div className="consent-copy"><strong>Preferenze privacy</strong><p>Usiamo l’archiviazione locale solo per le preferenze essenziali. Analytics e pubblicità restano disattivati finché non li abiliti.</p>{customize && <div className="consent-options"><label><input type="checkbox" checked disabled /> <span><b>Necessari</b><small>Tema e preferenze del consenso.</small></span></label><label><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /> <span><b>Analytics</b><small>Statistiche anonime sull’utilizzo del prodotto.</small></span></label><label><input type="checkbox" checked={advertising} onChange={event => setAdvertising(event.target.checked)} /> <span><b>Pubblicità</b><small>Erogazione e misurazione degli annunci.</small></span></label></div>}</div><div className="consent-actions">{customize ? <><Button type="button" variant="outline" onClick={() => save(analytics, advertising)}>Salva preferenze</Button></> : <><Button type="button" variant="outline" onClick={() => save(false, false)}>Rifiuta opzionali</Button><Button type="button" variant="outline" onClick={() => setCustomize(true)}>Personalizza</Button><Button type="button" onClick={() => save(true, true)}>Accetta tutto</Button></>}</div></aside>;
}
function MatchTool() {
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");
  const s = stats(source);
  function match(unit: Unit) { if (source.trim()) setResult(generateLorem(unit, unit === "characters" ? s.characters : unit === "words" ? s.words : s.paragraphs, false)); }
  return <article className="tool-card"><ToolHead title="Abbina testo esistente" note="Sostituisci il testo mantenendo lo stesso ingombro." />
    <label className="field-label" htmlFor="match-source">Testo sorgente</label><Textarea id="match-source" className="tool-textarea" placeholder="Incolla il testo da misurare…" value={source} onChange={e => setSource(e.target.value)} />
    <div className="mini-stats"><span>{s.words} parole</span><span>{s.characters} caratteri</span><span>{s.paragraphs} paragrafi</span></div>
    <div className="tool-actions"><Button variant="outline" disabled={!source.trim()} onClick={() => match("characters")}>Stessi caratteri</Button><Button variant="outline" disabled={!source.trim()} onClick={() => match("words")}>Stesse parole</Button><Button variant="outline" disabled={!source.trim()} onClick={() => match("paragraphs")}>Stessi paragrafi</Button></div>
    {result && <div className="tool-output"><div className="output-top"><span>Testo abbinato</span><ActionCopy text={result} compact /></div><p>{result}</p></div>}
  </article>;
}
function ExpansionTool() {
  const [source, setSource] = useState("");
  const [scale, setScale] = useState(0);
  const [result, setResult] = useState("");
  const target = Math.max(1, Math.round(source.length * (1 + scale / 100)));
  return <article className="tool-card"><ToolHead title="Espansione testo" note="Verifica come reagisce un layout con più o meno testo." />
    <label className="field-label" htmlFor="expand-source">Testo sorgente</label><Textarea id="expand-source" className="tool-textarea" placeholder="Incolla un testo di riferimento…" value={source} onChange={e => setSource(e.target.value)} />
    <div className="scale-controls"><div className="scale-list" aria-label="Regolazione lunghezza">{[-40, -20, -10, 10, 20, 40].map(value => <Button key={value} type="button" variant={scale === value ? "default" : "outline"} className="scale-button" aria-pressed={scale === value} onClick={() => setScale(value)}>{`${value > 0 ? "+" : ""}${value}%`}</Button>)}</div><label className="custom-scale"><span>Percentuale</span><div className="range-row custom-scale-row"><Slider aria-label="Percentuale personalizzata" value={[Math.max(-100, Math.min(100, scale))]} min={-100} max={100} step={1} onValueChange={values => setScale(values[0])} /><div className="custom-scale-number"><Input type="number" min={-100} step={1} value={scale} onChange={event => setScale(Math.max(-100, Number(event.target.value) || 0))} /><em>%</em></div></div></label></div>
    <div className="target-row"><span>Lunghezza obiettivo</span><strong>{source ? formatCount(target) : 0} caratteri</strong></div>
    <Button className="tool-generate" disabled={!source.trim()} onClick={() => setResult(generateLorem("characters", target, false))}>Genera variazione <ArrowUpRight aria-hidden="true" /></Button>
    {result && <div className="tool-output"><div className="output-top"><span>{stats(result).characters} caratteri</span><ActionCopy text={result} compact /></div><p>{result}</p></div>}
  </article>;
}
function FitTool() {
  const [width, setWidth] = useState(340), [height, setHeight] = useState(220), [fontSize, setFontSize] = useState(16), [lineHeight, setLineHeight] = useState(1.5), [padding, setPadding] = useState(20);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Adattato");
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
    const fitted = sample.slice(0, best).join(" "); el.textContent = fitted;
    const range = document.createRange(); range.selectNodeContents(el);
    const contentHeight = range.getBoundingClientRect().height;
    setText(fitted); setStatus(el.scrollHeight > height ? "Fuoriuscita" : contentHeight < height - padding * 2 - fontSize * lineHeight * 1.5 ? "Spazio libero" : "Adattato");
  }, [width, height, fontSize, lineHeight, padding]);
  const dimensions = { width, height, padding, fontSize, lineHeight };
  return <article className="tool-card fit-card"><ToolHead title="Adatta al riquadro" note="Verifica quanto testo entra in un riquadro." />
    <div className="fit-workspace"><div className="fit-controls"><div className="fit-fields">
      <div ref={widthControl} className="fit-field fit-range"><span id="fit-width-label">Larghezza</span><div className="range-row"><Slider aria-labelledby="fit-width-label" value={[width]} min={150} max={1200} step={10} onValueChange={values => setWidth(values[0])} /><output>{width} px</output></div></div>
      <div ref={heightControl} className="fit-field fit-range"><span id="fit-height-label">Altezza</span><div className="range-row"><Slider aria-labelledby="fit-height-label" value={[height]} min={80} max={800} step={10} onValueChange={values => setHeight(values[0])} /><output>{height} px</output></div></div>
      {([["Dimensione carattere", fontSize, setFontSize, 10, 48, "px"], ["Interlinea", lineHeight, setLineHeight, 1, 2.5, "×"], ["Spaziatura interna", padding, setPadding, 0, 80, "px"]] as const).map(([label, value, setter, min, max, suffix]) => <label key={label} className="fit-field fit-number"><span>{label}</span><span className="fit-input"><Input type="number" min={min} max={max} step={label === "Interlinea" ? .1 : 1} value={value} onChange={e => setter(Math.max(min, Math.min(max, Number(e.target.value) || min)))} /><em>{suffix}</em></span></label>)}
    </div></div><div className="fit-preview-column"><div className="fit-preview-wrap"><div className="fit-meta"><span>Anteprima</span><span className={`fit-status ${status.toLowerCase()}`}>{status}</span></div><div className="fit-preview-scroll"><div className="fit-preview" style={dimensions}>{text}</div></div></div>
    <div className="fit-footer"><span>Adattamento approssimativo · {stats(text).words} parole</span><ActionCopy text={text} compact /></div></div></div>
    <div ref={measure} aria-hidden="true" className="fit-measure" style={dimensions} />
  </article>;
}
export default function Home() {
  useEffect(() => { document.documentElement.lang = "it"; return () => { document.documentElement.lang = "en"; }; }, []);
  const [mode, setMode] = useState<MainMode>("layout");
  const [words, setWords] = useState(250);
  const [paragraphs, setParagraphs] = useState(3);
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
      : previous.mode === mode && previous.startClassic === startClassic
        ? resizeLorem(current, mode, previous.amount, amount, startClassic)
        : generateLorem(mode, amount, startClassic));
    previousSettings.current = { mode, words, paragraphs, amount, startClassic, sentenceLength };
  }, [mode, words, paragraphs, amount, startClassic, sentenceLength]);
  function selectMode(next: MainMode) { setMode(next); if (next !== "layout") setAmount(defaults[next]); }
  function regenerate() { setResult(mode === "layout" ? generateLayout(words, paragraphs, startClassic, Math.random, sentenceLength) : generateLorem(mode, amount, startClassic)); }
  return <main className="site-shell" lang="it">
    <div className="page-content">
      <section className="main-section" aria-labelledby="page-title"><div className="utility-row"><div className="header-actions"><label className="language-picker"><span className="sr-only">Lingua</span><select aria-label="Lingua" value="/it" onChange={event => window.location.assign(event.target.value)}><option value="/">English</option><option value="/it">Italiano</option></select></label><div className="theme-switch" role="group" aria-label="Tema colore">{(["system", "light", "dark"] as const).map(choice => <button key={choice} type="button" aria-pressed={themeChoice === choice} onClick={() => selectTheme(choice)}>{choice === "light" && <Sun className="theme-icon" aria-hidden="true" />}{choice === "dark" && <Moon className="theme-icon" aria-hidden="true" />}{choice === "system" ? "Auto" : choice === "light" ? "Chiaro" : "Scuro"}</button>)}</div></div></div><div className="title-row"><div className="brand-lockup"><h1 id="page-title">Genera testo segnaposto<span className="desktop-break"><br /></span> con il generatore Lorem Ipsum</h1></div></div>
        <p className="seo-intro">Genera parole, paragrafi, frasi o caratteri per layout, prototipi e progetti di design.</p>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [
          { "@type": "WebSite", name: "lorem-generator.com", url: "https://lorem-generator.com/it/", inLanguage: "it" },
          { "@type": "WebApplication", name: "lorem-generator.com", url: "https://lorem-generator.com/it/", applicationCategory: "DesignApplication", operatingSystem: "Any", description: "Un generatore Lorem Ipsum nel browser per parole, paragrafi, frasi e caratteri esatti.", isAccessibleForFree: true, featureList: ["Conteggio esatto di parole e paragrafi", "Generazione di caratteri e frasi", "Anteprima Adatta al riquadro", "Generazione nel browser"] }
        ] }) }} />
        <div className="generator-panel generator-module">
          <div className={`controls-grid ${mode === "layout" ? "layout-mode" : "precision-mode"}`}>
            <div className="unit-control"><span className="field-label">Modalità</span><Tabs value={mode} onValueChange={value => selectMode(value as MainMode)}><TabsList className="unit-tabs" aria-label="Modalità di generazione">{modes.map(item => <TabsTrigger key={item} value={item} className="unit-tab">{item === "layout" ? "Parole + paragrafi" : item === "characters" ? "Caratteri" : "Frasi"}</TabsTrigger>)}</TabsList></Tabs></div>
            {mode === "layout" ? <div className="layout-amounts">
              <div className="amount-control words-control"><label className="field-label" htmlFor="word-amount">Parole</label><Input id="word-amount" type="number" min={paragraphs} max={4000} value={words} onChange={e => setWords(Math.max(paragraphs, Math.min(4000, Number(e.target.value) || paragraphs)))} /></div>
              <div className="amount-control paragraphs-control"><label className="field-label" htmlFor="paragraph-amount">Paragrafi</label><Input id="paragraph-amount" type="number" min={1} max={Math.min(100, words)} value={paragraphs} onChange={e => setParagraphs(Math.max(1, Math.min(100, words, Number(e.target.value) || 1)))} /></div>
            </div> : <div className="amount-control precision-amount"><label className="field-label" htmlFor="amount">{mode === "characters" ? "Caratteri" : "Frasi"}</label><Input id="amount" type="number" min="1" max={mode === "characters" ? 20000 : 100} value={amount} onChange={e => setAmount(Math.max(1, Math.min(mode === "characters" ? 20000 : 100, Number(e.target.value) || 1)))} /></div>}
            <div className="presets"><span className="field-label">{mode === "layout" ? "Valori parole" : "Valori predefiniti"}</span><div className="preset-buttons">{presets[mode].map(value => <Button type="button" key={value} variant="outline" className="preset-button" aria-pressed={(mode === "layout" ? words : amount) === value} onClick={() => mode === "layout" ? setWords(Math.max(paragraphs, value)) : setAmount(value)}>{value}</Button>)}</div></div>
            <div className="option-cell"><span className="field-label">Opzioni</span><div className="option-content"><label className="check-option classic-option"><Checkbox checked={startClassic} onCheckedChange={checked => setStartClassic(checked === true)} /><span>Inizia con “Lorem ipsum…”</span></label><div className="sentence-length-control"><span className="sentence-length-label">Lunghezza frasi</span><div className="sentence-length-options">{(["short", "mixed", "long"] as const).map(value => <button key={value} type="button" className={sentenceLength === value ? "is-active" : ""} aria-pressed={sentenceLength === value} onClick={() => setSentenceLength(value)}>{value === "short" ? "brevi" : value === "mixed" ? "miste" : "lunghe"}</button>)}</div></div></div></div>
          </div>
          <div className="output-panel"><span className="field-label">Risultato</span><div className="reading-area" role="region" aria-label="Testo Lorem Ipsum generato">{result.split("\n\n").map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></div>
          <div className="module-footer"><StatStrip text={result} /><div className="result-actions"><ActionCopy text={result} /><ActionCopyHtml text={result} /><Button type="button" variant="outline" className="action-button secondary-action" onClick={regenerate}><RefreshCw aria-hidden="true" /> Rigenera</Button></div></div>
        </div>
      </section>
      <section className="designer-section" aria-label="Adatta al riquadro"><FitTool /></section>
      <section className="remaining-tools" aria-label="Altri strumenti"><div className="tool-grid"><MatchTool /><ExpansionTool /></div></section>
      <section className="about-section" aria-labelledby="about-title"><div><span className="eyebrow">UNA NOTA SUL TESTO SEGNAPOSTO</span><h2 id="about-title">Una bozza per ogni layout.</h2></div><div className="about-copy"><p>Lorem Ipsum è un testo segnaposto derivato dal latino classico. I designer lo usano per valutare gerarchia, ritmo, lunghezza delle righe e spaziatura prima che il testo finale sia pronto.</p><p>Imposta insieme parole e paragrafi per controllare densità e ritmo del layout, oppure passa a caratteri o frasi quando serve una lunghezza precisa.</p></div></section>
      <section className="seo-content" aria-labelledby="why-title"><div className="seo-content-heading"><span className="eyebrow">PENSATO PER LAYOUT REALI</span><h2 id="why-title">Un generatore Lorem Ipsum per designer e sviluppatori.</h2></div><div className="seo-content-grid"><article><h3>Mantieni fedele il layout.</h3><p>Genera Lorem Ipsum con parole e paragrafi esatti insieme, poi regola la densità senza ricreare le impostazioni. Usa caratteri o frasi quando un componente, un titolo o un blocco richiede un ingombro preciso.</p><p>Generate Lorem è pensato per wireframe, layout editoriali, prototipi di interfacce e studi tipografici. Adatta al riquadro aiuta a verificare il comportamento del testo prima che arrivi il contenuto definitivo.</p></article><article><h3>Copia il formato che ti serve.</h3><p>Copia testo semplice per note e bozze, oppure usa <strong>Copia HTML</strong> quando inserisci il testo segnaposto in una pagina o componente. Passa da un formato all’altro mentre il layout passa dall’esplorazione all’implementazione.</p><p>Usa il risultato come contenuto temporaneo durante il design. Sostituiscilo con il testo finale approvato prima di pubblicare il progetto.</p></article></div></section>
      <section className="guide-section" aria-labelledby="guide-title"><div className="guide-heading"><span className="eyebrow">GUIDA BREVE AL LOREM IPSUM</span><h2 id="guide-title">Perché il testo segnaposto è ancora utile.</h2></div><div className="guide-grid"><article><h3>Cos’è il Lorem Ipsum</h3><p>Il Lorem Ipsum è un testo temporaneo usato per provare una pagina prima che le parole definitive siano disponibili. Ricorda una lingua ma non comunica un messaggio immediato: permette di valutare gerarchia, lunghezza delle righe, dimensione dei caratteri, spaziatura ed equilibrio visivo.</p></article><article><h3>Da dove proviene</h3><p>L’incipit conosciuto deriva da un passaggio del <em>De finibus bonorum et malorum</em> di Cicerone. Nel tempo il testo latino è stato abbreviato e riorganizzato, fino a diventare il contenuto neutro usato dagli strumenti di progettazione grafica e digitale.</p></article><article><h3>Quando usarlo</h3><p>Il Lorem Ipsum è utile per wireframe, primi prototipi, impaginazione editoriale, brochure, packaging e studi tipografici. Mantiene l’attenzione sulla struttura quando le decisioni sui contenuti sono ancora aperte.</p></article><article><h3>Quando sostituirlo</h3><p>Il testo segnaposto va rimosso prima della pubblicazione di un sito, di un documento o di un progetto stampato. Il contenuto reale serve per verificare tono, accessibilità, significato, visibilità sui motori di ricerca e reale esperienza di lettura.</p></article></div></section>
      <FaqSection />
    </div><footer className="site-footer"><div className="footer-brand"><span>lorem-generator.com © 2026</span><p>Testo segnaposto per layout curati.</p></div><nav className="footer-links" aria-label="Informazioni legali"><a href="#privacy-policy">Informativa privacy</a><a href="#cookie-policy">Cookie policy</a><button type="button" onClick={() => window.dispatchEvent(new Event("open-privacy"))}>Gestisci privacy</button></nav></footer><ConsentBanner />
  </main>;
}
