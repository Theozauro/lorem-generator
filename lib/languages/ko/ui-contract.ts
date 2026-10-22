import { modeSettings } from "../types";
import { canGenerateKoreanWords } from "./engine";

/** Returns the exact supported set; callers must not assume it is contiguous. */
export function getKoreanParagraphOptions(words: number) {
  const supported = Array.from({ length: modeSettings.paragraphs.max }, (_, index) => index + 1)
    .filter(paragraphs => canGenerateKoreanWords({ words, paragraphs }));
  return { supported, maximum: supported.at(-1) ?? 0, contiguous: supported.every((value, index) => value === index + 1) };
}
