import type { LanguageStats } from "../types";
import { chinesePunctuation, simplifiedChineseForms, type ChineseForm } from "./data";

let registered: Map<string, ChineseForm> | undefined;
let graphemes: Intl.Segmenter | undefined;
export function canonicalChineseCorpus(): ReadonlyMap<string, ChineseForm> {
  if (registered) return registered;
  const result = new Map<string, ChineseForm>(), ids = new Set<string>();
  for (const form of simplifiedChineseForms) {
    if (result.has(form.text) || ids.has(form.baseId)) throw new Error(`Duplicate Chinese corpus form: ${form.baseId}`);
    if (form.segmentation.join("") !== form.text || form.wordCount !== form.segmentation.filter(s => !chinesePunctuation.has(s)).length
      || form.wordCount < 1 || !/^[\p{Script=Han}，、：；]+。$/u.test(form.text)
      || form.text !== form.text.normalize("NFC")) throw new Error(`Invalid Chinese corpus form: ${form.baseId}`);
    result.set(form.text,form); ids.add(form.baseId);
  }
  registered = result; return result;
}
// Parse the final plain string afresh. There is no last-result metadata cache,
// no character-as-word fallback, and no runtime word segmentation.
export function parseSimplifiedChinese(text: string): ChineseForm[][] {
  const normalized = text.normalize("NFC");
  if (!normalized) return [];
  if (normalized.trim() !== normalized || /[^\S\n]|\n{3,}|(?<!\n)\n(?!\n)/u.test(normalized)) throw new Error("Invalid Chinese output spacing.");
  const corpus = canonicalChineseCorpus();
  return normalized.split("\n\n").map(paragraph => {
    const sentences = paragraph.match(/[^。]+。/gu);
    if (!sentences || sentences.join("") !== paragraph) throw new Error("Invalid Chinese sentence boundary.");
    return sentences.map(sentence => {
      const form = corpus.get(sentence);
      if (!form) throw new Error(`Unknown canonical Chinese sentence: ${sentence}`);
      return form;
    });
  });
}
export function countSimplifiedChineseWords(text: string): number {
  return parseSimplifiedChinese(text).flat().reduce((sum,form) => sum + form.wordCount,0);
}
export function countSimplifiedChineseCharacters(text: string): number {
  if (typeof Intl.Segmenter !== "function" || !Intl.Segmenter.supportedLocalesOf(["zh-Hans"]).length) throw new Error("Chinese grapheme segmentation is unavailable.");
  graphemes ??= new Intl.Segmenter("zh-Hans",{ granularity: "grapheme" });
  let count = 0;
  for (const segment of graphemes.segment(text.normalize("NFC"))) { void segment; count++; }
  return count;
}
export function simplifiedChineseStats(text: string): LanguageStats {
  const paragraphs = parseSimplifiedChinese(text), forms = paragraphs.flat();
  return { words: forms.reduce((sum,form) => sum + form.wordCount,0), characters: countSimplifiedChineseCharacters(text), sentences: forms.length, paragraphs: paragraphs.length };
}
