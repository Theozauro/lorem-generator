import { generateLayout, generateLorem, stats } from "@/lib/lorem";
import { generateThemedIpsum, type ThemedLanguage, type ThemedMode, type ThemedTheme } from "@/lib/themed-ipsum";

export type EnglishGeneratorMode = "words" | "characters" | "sentences";

function distribute(total: number, parts: number): number[] {
  const base = Math.floor(total / parts);
  const remainder = total % parts;
  return Array.from({ length: parts }, (_, index) => base + (index < remainder ? 1 : 0));
}

export function englishParagraphLimit(mode: EnglishGeneratorMode, amount: number): number {
  const contentMinimum = mode === "characters" ? Math.floor((amount + 2) / 3) : amount;
  return Math.max(0, Math.min(100, contentMinimum));
}

export function englishParagraphError(mode: EnglishGeneratorMode, amount: number, paragraphs: number): string {
  if (!Number.isInteger(paragraphs) || paragraphs < 1 || paragraphs > 100) return "Enter a paragraph count between 1 and 100.";
  if (!Number.isInteger(amount) || amount < 1) return "Enter a valid whole-number quantity.";
  const maximum = englishParagraphLimit(mode, amount);
  if (paragraphs > maximum) return `This quantity supports up to ${maximum} ${maximum === 1 ? "paragraph" : "paragraphs"}. Your requested quantity has not been changed.`;
  return "";
}

export function generateEnglishClassic({
  mode,
  words,
  amount,
  paragraphs,
  startClassic,
}: {
  mode: EnglishGeneratorMode;
  words: number;
  amount: number;
  paragraphs: number;
  startClassic: boolean;
}): { text: string; error: string } {
  const target = mode === "words" ? words : amount;
  const error = englishParagraphError(mode, target, paragraphs);
  if (error) return { text: "", error };

  let text = "";
  if (mode === "words") {
    text = generateLayout(words, paragraphs, startClassic);
  } else if (mode === "characters") {
    const lengths = distribute(amount - 2 * (paragraphs - 1), paragraphs);
    text = lengths.map((length, index) => generateLorem("characters", length, startClassic && index === 0)).join("\n\n");
  } else {
    const sentenceCounts = distribute(amount, paragraphs);
    let sentenceIndex = 0;
    text = sentenceCounts.map(count => Array.from({ length: count }, () => {
      const sentence = generateLorem("sentences", 1, startClassic && sentenceIndex === 0);
      sentenceIndex += 1;
      return sentence;
    }).join(" ")).join("\n\n");
  }

  const exact = mode === "words" ? stats(text).words === words : mode === "characters" ? text.length === amount : stats(text).sentences === amount;
  if (!exact || text.split("\n\n").length !== paragraphs || text.split("\n\n").some(paragraph => !paragraph.trim())) {
    return { text: "", error: "This combination is not available. Your requested quantity and paragraph count have not been changed." };
  }
  return { text, error: "" };
}

export function generateEnglishThemed({
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
}): { text: string; error: string } {
  const target = mode === "layout" ? words : amount;
  const generatorMode: EnglishGeneratorMode = mode === "layout" ? "words" : mode;
  const error = englishParagraphError(generatorMode, target, paragraphs);
  if (error) return { text: "", error };

  let text = "";
  try {
    if (mode === "layout") {
      text = generateThemedIpsum({ theme, language, mode, words, paragraphs, amount, variation });
    } else if (mode === "characters") {
      const lengths = distribute(amount - 2 * (paragraphs - 1), paragraphs);
      text = lengths.map((length, index) => generateThemedIpsum({
        theme, language, mode, words, paragraphs: 1, amount: length, variation: variation + index,
      })).join("\n\n");
    } else {
      const sentenceCounts = distribute(amount, paragraphs);
      let sentenceIndex = 0;
      text = sentenceCounts.map(count => Array.from({ length: count }, () => {
        const sentence = generateThemedIpsum({
          theme, language, mode, words, paragraphs: 1, amount: 1, variation: variation + sentenceIndex,
        });
        sentenceIndex += 1;
        return sentence;
      }).join(" ")).join("\n\n");
    }
  } catch {
    return { text: "", error: "This quantity and paragraph combination is not available. Your requested quantity and paragraph count have not been changed." };
  }

  const exact = mode === "layout" ? stats(text).words === words : mode === "characters" ? text.length === amount : stats(text).sentences === amount;
  if (!exact || text.split("\n\n").length !== paragraphs || text.split("\n\n").some(paragraph => !paragraph.trim())) {
    return { text: "", error: "This combination is not available. Your requested quantity and paragraph count have not been changed." };
  }
  return { text, error: "" };
}
