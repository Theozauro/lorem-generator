import { modeSettings } from "../types";
import { canGenerateTraditionalChineseWords } from "./engine";

// Deliberately not connected to the UI/registry. Return the actual supported
// set; callers must not assume that a future corpus still has no holes.
export function getTraditionalChineseParagraphOptions(words: number) {
  const supported = Array.from({ length: modeSettings.paragraphs.max },(_,i) => i+1)
    .filter(paragraphs => canGenerateTraditionalChineseWords({ words,paragraphs }));
  return { supported, maximum: supported.at(-1) ?? 0, contiguous: supported.every((value,index) => value === index+1) };
}
