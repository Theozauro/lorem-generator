import { generateLayout, generateLorem, stats } from "@/lib/lorem";
import { generateThemedIpsum, type ThemedLanguage, type ThemedMode, type ThemedTheme } from "@/lib/themed-ipsum";

export type ItalianGeneratorMode = "words" | "characters" | "sentences";

function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function italianParagraphLimit(mode: ItalianGeneratorMode, amount: number): number {
  const contentMinimum = mode === "characters" ? Math.floor((amount + 2) / 3) : amount;
  return Math.max(0, Math.min(100, contentMinimum));
}

export function italianParagraphError(mode: ItalianGeneratorMode, amount: number, paragraphs: number): string {
  if (!Number.isInteger(paragraphs) || paragraphs < 1 || paragraphs > 100) return "Inserisci un numero di paragrafi compreso tra 1 e 100.";
  if (!Number.isInteger(amount) || amount < 1) return "Inserisci una quantità intera valida.";
  const maximum = italianParagraphLimit(mode, amount);
  if (paragraphs > maximum) return `Con questa quantità puoi generare al massimo ${maximum} ${maximum === 1 ? "paragrafo" : "paragrafi"}. La quantità richiesta non è stata modificata.`;
  return "";
}

function distribute(total: number, parts: number): number[] {
  const base = Math.floor(total / parts);
  const remainder = total % parts;
  return Array.from({ length: parts }, (_, index) => base + (index < remainder ? 1 : 0));
}

export function generateItalianClassic({
  mode,
  words,
  amount,
  paragraphs,
  startClassic,
  variation = 0,
}: {
  mode: ItalianGeneratorMode;
  words: number;
  amount: number;
  paragraphs: number;
  startClassic: boolean;
  variation?: number;
}): string {
  const target = mode === "words" ? words : amount;
  const error = italianParagraphError(mode, target, paragraphs);
  if (error) throw new Error(error);
  const random = seededRandom(variation);

  if (mode === "words") {
    const text = generateLayout(words, paragraphs, startClassic, random);
    if (stats(text).words !== words || text.split("\n\n").length !== paragraphs) throw new Error("Impossibile generare esattamente questa combinazione di parole e paragrafi.");
    return text;
  }

  if (mode === "characters") {
    const paragraphCharacterTotal = amount - 2 * (paragraphs - 1);
    const lengths = distribute(paragraphCharacterTotal, paragraphs);
    const text = lengths.map((length, index) => generateLorem("characters", length, startClassic && index === 0, "mixed", random)).join("\n\n");
    if (text.length !== amount || text.split("\n\n").some(paragraph => !paragraph)) throw new Error("Impossibile generare esattamente questa combinazione di caratteri e paragrafi.");
    return text;
  }

  const sentenceCounts = distribute(amount, paragraphs);
  let sentenceIndex = 0;
  const text = sentenceCounts.map(count => Array.from({ length: count }, () => {
    const sentence = generateLorem("sentences", 1, startClassic && sentenceIndex === 0, "mixed", random);
    sentenceIndex += 1;
    return sentence;
  }).join(" ")).join("\n\n");
  if (stats(text).sentences !== amount || text.split("\n\n").length !== paragraphs) throw new Error("Impossibile generare esattamente questa combinazione di frasi e paragrafi.");
  return text;
}

function generateItalianThemed({
  theme,
  language,
  mode,
  words,
  amount,
  paragraphs,
  variation,
}: {
  theme: ThemedTheme;
  language: ThemedLanguage;
  mode: ThemedMode;
  words: number;
  amount: number;
  paragraphs: number;
  variation: number;
}): string {
  const target = mode === "layout" ? words : amount;
  const italianMode: ItalianGeneratorMode = mode === "layout" ? "words" : mode;
  const error = italianParagraphError(italianMode, target, paragraphs);
  if (error) return "";

  if (mode === "layout") {
    const text = generateThemedIpsum({ theme, language, mode, words, paragraphs, amount, variation });
    return stats(text).words === words && text.split("\n\n").length === paragraphs ? text : "";
  }

  if (mode === "characters") {
    const paragraphCharacterTotal = amount - 2 * (paragraphs - 1);
    const lengths = distribute(paragraphCharacterTotal, paragraphs);
    const generated = lengths.map((length, index) => generateThemedIpsum({
      theme, language, mode, words, paragraphs: 1, amount: length, variation: variation + index,
    }));
    const text = generated.join("\n\n");
    return text.length === amount && generated.every(paragraph => paragraph.length > 0) ? text : "";
  }

  const sentenceCounts = distribute(amount, paragraphs);
  let sentenceIndex = 0;
  const generated = sentenceCounts.map(count => Array.from({ length: count }, () => {
    const sentence = generateThemedIpsum({
      theme, language, mode, words, paragraphs: 1, amount: 1, variation: variation + sentenceIndex,
    });
    sentenceIndex += 1;
    return sentence;
  }).join(" "));
  const text = generated.join("\n\n");
  return stats(text).sentences === amount && generated.every(paragraph => paragraph.length > 0) ? text : "";
}

export function generateItalianThemedIpsum(options: {
  theme: ThemedTheme;
  language: ThemedLanguage;
  mode: ThemedMode;
  words: number;
  paragraphs: number;
  amount: number;
  variation: number;
}): { text: string; error: string } {
  const target = options.mode === "layout" ? options.words : options.amount;
  const mode: ItalianGeneratorMode = options.mode === "layout" ? "words" : options.mode;
  const error = italianParagraphError(mode, target, options.paragraphs);
  if (error) return { text: "", error };
  try {
    const text = generateItalianThemed(options);
    if (!text) return { text: "", error: "La combinazione richiesta non è disponibile. La quantità e il numero di paragrafi non sono stati modificati." };
    return { text, error: "" };
  } catch {
    return { text: "", error: "La combinazione richiesta non è disponibile. La quantità e il numero di paragrafi non sono stati modificati." };
  }
}
