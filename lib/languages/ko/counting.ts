import type { LanguageStats } from "../types";
import { koreanSentences, type KoreanSentence } from "./data";

let graphemes: Intl.Segmenter | undefined;
let registry: Map<string, KoreanSentence> | undefined;

export function koreanGraphemeSegmenter(): Intl.Segmenter {
  if (typeof Intl.Segmenter !== "function" || !Intl.Segmenter.supportedLocalesOf(["ko"]).includes("ko")) {
    throw new Error("이 브라우저에서는 한국어 문자 수를 계산할 수 없습니다. 최신 브라우저를 사용해 주세요.");
  }
  return graphemes ??= new Intl.Segmenter("ko", { granularity: "grapheme" });
}

export function canonicalKoreanSentences(): ReadonlyMap<string, KoreanSentence> {
  if (!registry) registry = new Map(koreanSentences.map(sentence => [sentence.text, sentence]));
  return registry;
}

export function parseKoreanOutput(text: string): KoreanSentence[][] {
  const normalized = text.normalize("NFC");
  if (!normalized) return [];
  if (normalized.trim() !== normalized || /[^\S \n]|\n{3,}|(?<!\n)\n(?!\n)/u.test(normalized)) {
    throw new Error("한국어 결과의 공백 형식이 올바르지 않습니다.");
  }
  if (/ {2,}/u.test(normalized)) throw new Error("한국어 결과에 중복 공백이 있습니다.");
  const sentences = canonicalKoreanSentences();
  return normalized.split("\n\n").map(paragraph => {
    if (!paragraph) throw new Error("한국어 결과에 빈 문단이 있습니다.");
    const forms = paragraph.split(/(?<=\.) /u);
    if (forms.join(" ") !== paragraph || forms.some(form => !form.endsWith("."))) throw new Error("한국어 문장 경계를 확인할 수 없습니다.");
    return forms.map(form => {
      const sentence = sentences.get(form);
      if (!sentence) throw new Error(`등록되지 않은 한국어 문장입니다: ${form}`);
      return sentence;
    });
  });
}

export function countKoreanWords(text: string): number {
  const normalized = text.normalize("NFC");
  return normalized.trim() ? normalized.trim().split(/\s+/u).length : 0;
}

export function countKoreanCharacters(text: string): number {
  let count = 0;
  for (const segment of koreanGraphemeSegmenter().segment(text.normalize("NFC"))) { void segment; count++; }
  return count;
}

export function koreanStats(text: string): LanguageStats {
  const paragraphs = parseKoreanOutput(text);
  return {
    words: countKoreanWords(text),
    characters: countKoreanCharacters(text),
    sentences: paragraphs.reduce((count, paragraph) => count + paragraph.length, 0),
    paragraphs: paragraphs.length,
  };
}
