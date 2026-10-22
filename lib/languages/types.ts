export type ContentLanguage = "ja" | "zh-Hans" | "zh-Hant" | "ko";
export type LanguageMode = "paragraphs" | "sentences" | "words" | "characters";
export type LanguageStats = Record<LanguageMode, number>;
export interface LanguageRequest { mode: LanguageMode; amount: number; paragraphs?: number; seed?: number }
export interface LanguageEngine { generate(request: LanguageRequest): string; stats(text: string): LanguageStats }

export const modeSettings = {
  paragraphs: { label: "Paragrafi", default: 3, presets: [1, 3, 5], min: 1, max: 30 },
  sentences: { label: "Frasi", default: 5, presets: [2, 5, 10], min: 1, max: 100 },
  words: { label: "Parole", default: 100, presets: [50, 100, 250], min: 1, max: 2000 },
  characters: { label: "Caratteri", default: 300, presets: [150, 300, 500], min: 10, max: 10000 },
} as const;
