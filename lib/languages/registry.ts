import { japaneseEngine, canGenerateJapaneseCharacters, canGenerateJapaneseSentences, canGenerateJapaneseWords } from "./ja/engine";
import { simplifiedChineseEngine, canGenerateSimplifiedChineseCharacters, canGenerateSimplifiedChineseSentences, canGenerateSimplifiedChineseWords } from "./zh-Hans/engine";
import { traditionalChineseEngine, canGenerateTraditionalChineseCharacters, canGenerateTraditionalChineseSentences, canGenerateTraditionalChineseWords } from "./zh-Hant/engine";
import { canGenerateKoreanCharacters, canGenerateKoreanSentences, canGenerateKoreanWords, canGenerateKoreanParagraphs, koreanEngine } from "./ko/engine";
import { modeSettings, type ContentLanguage, type LanguageEngine, type LanguageMode, type LanguageRequest } from "./types";

export type AvailableContentLanguage = ContentLanguage;

export type RegisteredLanguage = {
  id: AvailableContentLanguage;
  label: string;
  engine: LanguageEngine;
  canGenerate(request: LanguageRequest): boolean;
};

export const languages: RegisteredLanguage[] = [
  {
    id: "ja",
    label: "Giapponese — 日本語",
    engine: japaneseEngine,
    canGenerate: ({ mode, amount, paragraphs = 1 }) => mode === "words" ? canGenerateJapaneseWords({ words: amount, paragraphs })
      : mode === "characters" ? canGenerateJapaneseCharacters(amount, paragraphs)
      : mode === "sentences" ? canGenerateJapaneseSentences(amount, paragraphs) : false,
  },
  {
    id: "zh-Hans",
    label: "Cinese semplificato — 简体中文",
    engine: simplifiedChineseEngine,
    canGenerate: ({ mode, amount, paragraphs = 1 }) => mode === "words"
      ? canGenerateSimplifiedChineseWords({ words: amount, paragraphs })
      : mode === "characters" ? canGenerateSimplifiedChineseCharacters(amount, paragraphs)
      : mode === "sentences" ? canGenerateSimplifiedChineseSentences(amount, paragraphs) : false,
  },
  {
    id: "zh-Hant",
    label: "Cinese tradizionale — 繁體中文",
    engine: traditionalChineseEngine,
    canGenerate: ({ mode, amount, paragraphs = 1 }) => mode === "words"
      ? canGenerateTraditionalChineseWords({ words: amount, paragraphs })
      : mode === "characters" ? canGenerateTraditionalChineseCharacters(amount, paragraphs)
      : mode === "sentences" ? canGenerateTraditionalChineseSentences(amount, paragraphs) : false,
  },
  {
    id: "ko",
    label: "Coreano — 한국어",
    engine: koreanEngine,
    canGenerate: ({ mode, amount, paragraphs = 1 }) => mode === "words"
      ? canGenerateKoreanWords({ words: amount, paragraphs })
      : mode === "paragraphs" ? canGenerateKoreanParagraphs(amount)
      : mode === "characters" ? canGenerateKoreanCharacters(amount, paragraphs)
      : mode === "sentences" ? canGenerateKoreanSentences(amount, paragraphs) : false,
  },
];

export function getLanguage(id: AvailableContentLanguage): RegisteredLanguage {
  return languages.find(language => language.id === id)!;
}

export function canGenerateLanguageRequest(language: RegisteredLanguage, request: LanguageRequest): boolean {
  return language.canGenerate(request);
}

export function getLanguageParagraphOptions(language: RegisteredLanguage, mode: LanguageMode, amount: number): number[] {
  if (!Number.isInteger(amount)) return [];
  return Array.from({ length: modeSettings.paragraphs.max }, (_, index) => index + 1)
    .filter(paragraphs => language.canGenerate({ mode, amount, paragraphs }));
}

