import { generateLayout, generateLorem, stats } from "@/lib/lorem";
import { generateThemedIpsum, type ThemedLanguage, type ThemedMode, type ThemedTheme } from "@/lib/themed-ipsum";

export type EnglishGeneratorMode = "words" | "characters" | "sentences";
export type ParagraphMessages = { invalidParagraphs: string; invalidAmount: string; unsupportedParagraphs: (maximum: number) => string; unsupportedOutput: string };

const englishMessages: ParagraphMessages = {
  invalidParagraphs: "Enter a paragraph count between 1 and 100.",
  invalidAmount: "Enter a valid whole-number quantity.",
  unsupportedParagraphs: maximum => `This quantity supports up to ${maximum} ${maximum === 1 ? "paragraph" : "paragraphs"}. Your requested quantity has not been changed.`,
  unsupportedOutput: "This combination is not available. Your requested quantity and paragraph count have not been changed.",
};
export const spanishParagraphMessages: ParagraphMessages = {
  invalidParagraphs: "Introduce un número de párrafos entre 1 y 100.",
  invalidAmount: "Introduce una cantidad entera válida.",
  unsupportedParagraphs: maximum => `Esta cantidad permite hasta ${maximum} ${maximum === 1 ? "párrafo" : "párrafos"}. No se ha modificado la cantidad solicitada.`,
  unsupportedOutput: "Esta combinación no está disponible. No se han modificado la cantidad ni el número de párrafos solicitados.",
};
export const frenchParagraphMessages: ParagraphMessages = {
  invalidParagraphs: "Saisissez un nombre de paragraphes compris entre 1 et 100.",
  invalidAmount: "Saisissez une quantité entière valide.",
  unsupportedParagraphs: maximum => `Cette quantité permet jusqu’à ${maximum} ${maximum === 1 ? "paragraphe" : "paragraphes"}. La quantité demandée n’a pas été modifiée.`,
  unsupportedOutput: "Cette combinaison n’est pas disponible. La quantité et le nombre de paragraphes demandés n’ont pas été modifiés.",
};
export const germanParagraphMessages: ParagraphMessages = {
  invalidParagraphs: "Gib eine ganze Absatzanzahl zwischen 1 und 100 ein.",
  invalidAmount: "Gib eine gültige ganze Zahl ein.",
  unsupportedParagraphs: maximum => `Für diese Menge sind höchstens ${maximum} ${maximum === 1 ? "Absatz" : "Absätze"} möglich. Die gewünschte Menge wurde nicht geändert.`,
  unsupportedOutput: "Diese Kombination ist nicht verfügbar. Die gewünschte Menge und Absatzanzahl wurden nicht geändert.",
};
export const brazilianPortugueseParagraphMessages: ParagraphMessages = {
  invalidParagraphs: "Informe uma quantidade de parágrafos entre 1 e 100.",
  invalidAmount: "Informe uma quantidade inteira válida.",
  unsupportedParagraphs: maximum => `Essa quantidade permite até ${maximum} ${maximum === 1 ? "parágrafo" : "parágrafos"}. A quantidade solicitada não foi alterada.`,
  unsupportedOutput: "Essa combinação não está disponível. A quantidade solicitada e o número de parágrafos não foram alterados.",
};
export const dutchParagraphMessages: ParagraphMessages = {
  invalidParagraphs: "Voer een aantal alinea’s tussen 1 en 100 in.",
  invalidAmount: "Voer een geldig geheel getal in.",
  unsupportedParagraphs: maximum => `Voor deze hoeveelheid zijn maximaal ${maximum} ${maximum === 1 ? "alinea" : "alinea’s"} mogelijk. De gevraagde hoeveelheid is niet gewijzigd.`,
  unsupportedOutput: "Deze combinatie is niet beschikbaar. De gevraagde hoeveelheid en het aantal alinea’s zijn niet gewijzigd.",
};
export const polishParagraphMessages: ParagraphMessages = {
  invalidParagraphs: "Wpisz liczbę akapitów z zakresu od 1 do 100.",
  invalidAmount: "Wpisz prawidłową liczbę całkowitą.",
  unsupportedParagraphs: maximum => {
    const remainder10 = maximum % 10;
    const remainder100 = maximum % 100;
    const noun = maximum === 1 ? "akapit" : remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 12 || remainder100 > 14) ? "akapity" : "akapitów";
    return `Dla tej wartości można wygenerować najwyżej ${maximum} ${noun}. Żądana wartość nie została zmieniona.`;
  },
  unsupportedOutput: "Ta kombinacja nie jest dostępna. Żądana ilość tekstu ani liczba akapitów nie zostały zmienione.",
};
export const turkishParagraphMessages: ParagraphMessages = {
  invalidParagraphs: "1 ile 100 arasında bir paragraf sayısı girin.",
  invalidAmount: "Geçerli bir tam sayı girin.",
  unsupportedParagraphs: maximum => `Bu miktar için en fazla ${maximum} paragraf oluşturulabilir. İstenen miktar değiştirilmedi.`,
  unsupportedOutput: "Bu birleşim desteklenmiyor. İstenen miktar ve paragraf sayısı değiştirilmedi.",
};
export const hungarianParagraphMessages: ParagraphMessages = {
  invalidParagraphs: "Adj meg 1 és 100 közötti egész bekezdésszámot.",
  invalidAmount: "Adj meg érvényes egész számot.",
  unsupportedParagraphs: maximum => `Ehhez a mennyiséghez legfeljebb ${maximum} bekezdés készíthető. A kért mennyiség nem változott.`,
  unsupportedOutput: "Ez a kombináció nem érhető el. A kért mennyiség és bekezdésszám nem változott.",
};

function distribute(total: number, parts: number): number[] {
  const base = Math.floor(total / parts);
  const remainder = total % parts;
  return Array.from({ length: parts }, (_, index) => base + (index < remainder ? 1 : 0));
}

export function englishParagraphLimit(mode: EnglishGeneratorMode, amount: number): number {
  const contentMinimum = mode === "characters" ? Math.floor((amount + 2) / 3) : amount;
  return Math.max(0, Math.min(100, contentMinimum));
}

export function englishParagraphError(mode: EnglishGeneratorMode, amount: number, paragraphs: number, messages = englishMessages): string {
  if (!Number.isInteger(paragraphs) || paragraphs < 1 || paragraphs > 100) return messages.invalidParagraphs;
  if (!Number.isInteger(amount) || amount < 1) return messages.invalidAmount;
  const maximum = englishParagraphLimit(mode, amount);
  if (paragraphs > maximum) return messages.unsupportedParagraphs(maximum);
  return "";
}

export function generateEnglishClassic({
  mode,
  words,
  amount,
  paragraphs,
  startClassic,
  messages = englishMessages,
}: {
  mode: EnglishGeneratorMode;
  words: number;
  amount: number;
  paragraphs: number;
  startClassic: boolean;
  messages?: ParagraphMessages;
}): { text: string; error: string } {
  const target = mode === "words" ? words : amount;
  const error = englishParagraphError(mode, target, paragraphs, messages);
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
    return { text: "", error: messages.unsupportedOutput };
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
  messages = englishMessages,
}: {
  theme: ThemedTheme;
  language: ThemedLanguage;
  mode: ThemedMode;
  words: number;
  amount: number;
  paragraphs: number;
  variation: number;
  messages?: ParagraphMessages;
}): { text: string; error: string } {
  const target = mode === "layout" ? words : amount;
  const generatorMode: EnglishGeneratorMode = mode === "layout" ? "words" : mode;
  const error = englishParagraphError(generatorMode, target, paragraphs, messages);
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
      if (language === "pl") {
        const generatedSentences = generateThemedIpsum({ theme, language, mode, words, paragraphs: 1, amount, variation })
          .match(/[^.!?]+[.!?]+/gu)?.map(sentence => sentence.trim()) ?? [];
        if (generatedSentences.length !== amount) return { text: "", error: messages.unsupportedOutput };
        let offset = 0;
        text = sentenceCounts.map(count => {
          const paragraph = generatedSentences.slice(offset, offset + count).join(" ");
          offset += count;
          return paragraph;
        }).join("\n\n");
      } else {
        let sentenceIndex = 0;
        text = sentenceCounts.map(count => Array.from({ length: count }, () => {
          const sentence = generateThemedIpsum({
            theme, language, mode, words, paragraphs: 1, amount: 1, variation: variation + sentenceIndex,
          });
          sentenceIndex += 1;
          return sentence;
        }).join(" ")).join("\n\n");
      }
    }
  } catch {
    return { text: "", error: messages.unsupportedOutput };
  }

  const exact = mode === "layout" ? stats(text).words === words : mode === "characters" ? text.length === amount : stats(text).sentences === amount;
  if (!exact || text.split("\n\n").length !== paragraphs || text.split("\n\n").some(paragraph => !paragraph.trim())) {
    return { text: "", error: messages.unsupportedOutput };
  }
  return { text, error: "" };
}
