"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { Check, Code2, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { canGenerateLanguageRequest, getLanguage, type AvailableContentLanguage } from "@/lib/languages/registry";
import { modeSettings } from "@/lib/languages/types";
import { copyLanguage } from "./copy";
import styles from "./languages-generator.module.css";

type GeneratorMode = "words" | "characters" | "sentences";
const modes: GeneratorMode[] = ["words", "characters", "sentences"];
const generatorModes = { words: { ...modeSettings.words, label: "Parole" }, characters: modeSettings.characters, sentences: modeSettings.sentences };
const zeroStats = { words: 0, characters: 0, sentences: 0, paragraphs: 0 };
const languageChoices = [
  { id: "ja", label: "Giapponese", nativeName: "日本語" },
  { id: "zh-Hans", label: "Cinese semplificato", nativeName: "简体中文" },
  { id: "zh-Hant", label: "Cinese tradizionale", nativeName: "繁體中文" },
  { id: "ko", label: "Coreano", nativeName: "한국어" },
] as const;

export function LanguagesGenerator() {
  const [languageId, setLanguageId] = useState<AvailableContentLanguage>("ja");
  const [mode, setMode] = useState<GeneratorMode>("words");
  const [amount, setAmount] = useState(String(modeSettings.words.default));
  const [paragraphs, setParagraphs] = useState("1");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copyConfirmation, setCopyConfirmation] = useState<"text" | "html" | null>(null);
  const copyConfirmationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyEpoch = useRef(0);
  const lastGenerated = useRef<{ language: AvailableContentLanguage; mode: GeneratorMode; amount: number; paragraphs: number } | null>(null);
  const language = getLanguage(languageId);
  const settings = generatorModes[mode];
  const stats = useMemo(() => result ? language.engine.stats(result) : zeroStats, [result, language]);

  function clearCopyConfirmation() {
    copyEpoch.current += 1;
    if (copyConfirmationTimer.current) clearTimeout(copyConfirmationTimer.current);
    copyConfirmationTimer.current = null;
    setCopyConfirmation(null);
  }

  useEffect(() => () => {
    if (copyConfirmationTimer.current) clearTimeout(copyConfirmationTimer.current);
  }, []);

  function generate(nextMode = mode, nextAmount = amount, nextParagraphs = paragraphs, nextLanguageId = languageId, deduplicate = false) {
    clearCopyConfirmation();
    const nextLanguage = getLanguage(nextLanguageId);
    const requestedAmount = Number(nextAmount);
    const limits = generatorModes[nextMode];
    if (!nextAmount.trim() || !Number.isInteger(requestedAmount) || requestedAmount < limits.min || requestedAmount > limits.max) {
      setError(`Inserisci una quantità intera tra ${limits.min} e ${limits.max} per ${limits.label.toLowerCase()}.`);
      return;
    }
    const requestedParagraphs = Number(nextParagraphs);
    if (!nextParagraphs.trim() || !Number.isInteger(requestedParagraphs) || requestedParagraphs < 1) return;
    let paragraphCount = requestedParagraphs;
    let paragraphsAdjusted = false;
    if (!canGenerateLanguageRequest(nextLanguage, { mode: nextMode, amount: requestedAmount, paragraphs: requestedParagraphs })) {
      let adjusted: number | undefined;
      for (let candidate = requestedParagraphs - 1; candidate >= 1; candidate--) {
        if (canGenerateLanguageRequest(nextLanguage, { mode: nextMode, amount: requestedAmount, paragraphs: candidate })) {
          adjusted = candidate;
          break;
        }
      }
      if (adjusted === undefined) for (let candidate = requestedParagraphs + 1; candidate <= modeSettings.paragraphs.max; candidate++) {
        if (canGenerateLanguageRequest(nextLanguage, { mode: nextMode, amount: requestedAmount, paragraphs: candidate })) {
          adjusted = candidate;
          break;
        }
      }
      if (adjusted === undefined) {
        setResult(""); lastGenerated.current = null;
        setError("Questa combinazione di quantità e paragrafi non è disponibile per la lingua selezionata.");
        return;
      }
      paragraphCount = adjusted;
      paragraphsAdjusted = true;
      setParagraphs(String(adjusted));
    }
    if (deduplicate && lastGenerated.current?.language === nextLanguageId && lastGenerated.current.mode === nextMode && lastGenerated.current.amount === requestedAmount && lastGenerated.current.paragraphs === paragraphCount) return;
    setError(""); setNotice("");
    try {
      setResult(nextLanguage.engine.generate({ mode: nextMode, amount: requestedAmount, paragraphs: paragraphCount }));
      lastGenerated.current = { language: nextLanguageId, mode: nextMode, amount: requestedAmount, paragraphs: paragraphCount };
      if (paragraphsAdjusted) setNotice(`Paragrafi aggiornati a ${paragraphCount} per mantenere esatta la quantità richiesta.`);
    }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Generazione non disponibile."); }
  }
  function commitAmount(value: string, nextParagraphs = paragraphs) {
    generate(mode, value, nextParagraphs, languageId, true);
  }
  function changeAmount(event: ChangeEvent<HTMLInputElement>, field: "amount" | "paragraphs" = "amount") {
    const value = event.currentTarget.value;
    if (field === "paragraphs") setParagraphs(value);
    else setAmount(value);
    // Native number steps emit an input event without a text-edit inputType.
    // Typing, deletion and paste carry an inputType and stay as drafts until
    // Enter/blur. Pass the event value directly, not the previous React state.
    const native = event.nativeEvent;
    if (!(native instanceof InputEvent) || !native.inputType) {
      if (field === "paragraphs") commitAmount(amount, value);
      else commitAmount(value);
    }
  }
  function selectMode(next: GeneratorMode) {
    if (next === mode) return;
    setMode(next);
    generate(next, amount, paragraphs, languageId);
  }
  function selectLanguage(nextLanguageId: AvailableContentLanguage) {
    clearCopyConfirmation();
    setLanguageId(nextLanguageId);
    setError(""); setNotice("");
    if (result) {
      setResult("");
      lastGenerated.current = null;
    }
    generate(mode, amount, paragraphs, nextLanguageId);
  }
  async function copy(html: boolean) {
    clearCopyConfirmation();
    const requestEpoch = copyEpoch.current;
    try {
      await copyLanguage(result, languageId, html);
      if (requestEpoch !== copyEpoch.current) return;
      const confirmation = html ? "html" : "text";
      const confirmationNotice = html ? "HTML copiato." : "Testo copiato.";
      setNotice(confirmationNotice);
      setCopyConfirmation(confirmation);
      copyConfirmationTimer.current = setTimeout(() => {
        setCopyConfirmation(current => current === confirmation ? null : current);
        setNotice(current => current === confirmationNotice ? "" : current);
        copyConfirmationTimer.current = null;
      }, 1800);
    } catch {
      if (requestEpoch === copyEpoch.current) setNotice("Impossibile copiare: controlla i permessi del browser.");
    }
  }
  return <div className={`generator-panel generator-module ${styles.generator}`} id="languages-generator">
    <div className={styles.language}>
      <span className="field-label" id="languages-content-language-label">LINGUA DEL TESTO</span>
      <div className={styles.languageScroll} role="group" aria-labelledby="languages-content-language-label" tabIndex={0}>
        <div className={styles.languageStrip}>{languageChoices.map(choice => <button key={choice.id} type="button" className={styles.languageOption} aria-pressed={choice.id === languageId} onClick={() => selectLanguage(choice.id)}>
          <span>{choice.label}</span><span className={styles.nativeName} lang={choice.id}>{choice.nativeName}</span>
        </button>)}</div>
      </div>
    </div>
    <div className={styles.controls}>
      <div className={styles.control}><span className="field-label" id="languages-mode-label">MODALITÀ</span><div className={styles.modes} role="group" aria-labelledby="languages-mode-label">{modes.map(item => <button key={item} type="button" aria-pressed={mode === item} onClick={() => selectMode(item)}>{generatorModes[item].label}</button>)}</div></div>
      <div className={`${styles.control} ${styles.amounts}`}>
        <div><label className="field-label" htmlFor="languages-amount">{settings.label}</label><Input id="languages-amount" type="number" min={settings.min} max={settings.max} step={1} value={amount} onChange={event => changeAmount(event)} onBlur={event => commitAmount(event.currentTarget.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); commitAmount(event.currentTarget.value); } }} /></div>
        <div><label className="field-label" htmlFor="languages-paragraphs">Paragrafi</label><Input id="languages-paragraphs" type="number" min={1} max={modeSettings.paragraphs.max} step={1} value={paragraphs} onChange={event => changeAmount(event, "paragraphs")} onBlur={event => commitAmount(amount, event.currentTarget.value)} onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); commitAmount(amount, event.currentTarget.value); } }} /></div>
      </div>
      <div className={styles.control}><span className="field-label" id="languages-presets-label">PRESET</span><div className={styles.presets} role="group" aria-labelledby="languages-presets-label">{settings.presets.map(value => <button key={value} type="button" aria-pressed={Number(amount) === value} onClick={() => { setAmount(String(value)); generate(mode, String(value)); }}>{value}</button>)}</div></div>
    </div>
    <div className="output-panel"><span className="field-label">RISULTATO</span>
      {result ? <div className={`reading-area ${styles.output} ${styles[`output-${languageId}`]}`} lang={languageId} role="region" aria-label="Testo generato" tabIndex={0}>{result.split("\n\n").map((paragraph, index) => <p key={index} lang={languageId}>{paragraph}</p>)}</div> : <div className={`reading-area ${styles.empty}`}>Scegli le impostazioni e genera il testo segnaposto.</div>}
      {error && <p role="alert" className={styles.error}>{error}</p>}
    </div>
    <div className={`module-footer ${styles.footer}`}>
      <dl className={`stat-strip compact-stats ${styles.stats}`}>{(["words", "characters", "sentences"] as const).map(item => <div key={item}><dt>{modeSettings[item].label}</dt><dd>{stats[item].toLocaleString("it-IT")}</dd></div>)}</dl>
      <div className="result-actions">
        <Button type="button" variant="outline" className={`action-button primary-copy ${styles.copyAction}${copyConfirmation === "text" ? ` ${styles.copySuccess}` : ""}`} disabled={!result} onClick={() => copy(false)}>{copyConfirmation === "text" ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}<span className={`${styles.copyLabel} ${styles.copyTextLabel}`}><span>{copyConfirmation === "text" ? "Copiato" : "Copia"}</span></span></Button>
        <Button type="button" variant="outline" className={`action-button secondary-action ${styles.copyAction} ${styles.copyHtmlAction}${copyConfirmation === "html" ? ` ${styles.copySuccess}` : ""}`} disabled={!result} onClick={() => copy(true)}>{copyConfirmation === "html" ? <Check aria-hidden="true" /> : <Code2 aria-hidden="true" />}<span className={`${styles.copyLabel} ${styles.copyHtmlLabel}`}><span>{copyConfirmation === "html" ? "HTML copiato" : "Copia HTML"}</span></span></Button>
        <Button type="button" variant="outline" className={`action-button${result ? "" : " initial-generate"}`} onClick={() => generate()}><RefreshCw aria-hidden="true" />{result ? "Rigenera" : "Genera"}</Button>
      </div>
    </div>
    <p role="status" className={styles.status}>{notice}</p>
  </div>;
}
