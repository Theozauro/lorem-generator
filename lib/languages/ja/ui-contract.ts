import { canGenerateJapaneseWords } from "./engine";
import { modeSettings } from "../types";

// Keep UI constraints tied to the engine's repertoire, not a parallel formula.
export function getJapaneseParagraphMaximum(words: number): number {
  if (!Number.isInteger(words) || words < modeSettings.words.min || words > modeSettings.words.max) return 0;
  for (let paragraphs = modeSettings.paragraphs.max; paragraphs >= 1; paragraphs--) {
    if (canGenerateJapaneseWords({ words, paragraphs })) return paragraphs;
  }
  return 0;
}
