import { modeSettings } from "../types";
import { canGenerateSimplifiedChineseWords } from "./engine";

// Deliberately not connected to the UI/registry. Return the actual supported
// set; callers must not assume that a future corpus still has no holes.
export function getSimplifiedChineseParagraphOptions(words: number) {
  const supported = Array.from({ length: modeSettings.paragraphs.max },(_,i) => i+1)
    .filter(paragraphs => canGenerateSimplifiedChineseWords({ words,paragraphs }));
  return { supported, maximum: supported.at(-1) ?? 0, contiguous: supported.every((value,index) => value === index+1) };
}
