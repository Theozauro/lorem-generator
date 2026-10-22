import type { LanguageStats } from "./types";

let words: Intl.Segmenter | undefined;
let graphemes: Intl.Segmenter | undefined;

export function japaneseSegmenters() {
  if (typeof Intl.Segmenter !== "function" || !Intl.Segmenter.supportedLocalesOf(["ja"]).includes("ja")) {
    throw new Error("Questo browser non supporta la segmentazione giapponese. Aggiornalo per usare il generatore.");
  }
  words ??= new Intl.Segmenter("ja", { granularity: "word" });
  graphemes ??= new Intl.Segmenter("ja", { granularity: "grapheme" });
  return { words, graphemes };
}

export function countJapaneseWords(text: string): number {
  let count = 0;
  for (const segment of japaneseSegmenters().words.segment(text.normalize("NFC"))) if (segment.isWordLike) count++;
  return count;
}

export function countJapaneseCharacters(text: string): number {
  let count = 0;
  for (const segment of japaneseSegmenters().graphemes.segment(text.normalize("NFC"))) { void segment; count++; }
  return count;
}

export function japaneseStats(text: string): LanguageStats {
  return { words: countJapaneseWords(text), characters: countJapaneseCharacters(text), sentences: (text.match(/。/gu) ?? []).length, paragraphs: text ? text.split("\n\n").filter(Boolean).length : 0 };
}
