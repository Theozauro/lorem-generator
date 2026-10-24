import type { AvailableContentLanguage } from "@/lib/languages/registry";

export type LanguagesCopy = {
  title: string;
  intro: string;
  numberLocale: string;
  contentLanguage: string;
  mode: string;
  contentLanguages: Record<AvailableContentLanguage, string>;
  modes: { words: string; characters: string; sentences: string };
  paragraphs: string;
  presets: string;
  output: string;
  outputAria: string;
  emptyState: string;
  generate: string;
  regenerate: string;
  copy: string;
  copied: string;
  copyHtml: string;
  copiedHtml: string;
  invalidAmount: string;
  invalidParagraphs: string;
  unsupportedCombination: string;
  adjustedParagraphs: string;
  copyFailed: string;
  copiedNotice: string;
  copiedHtmlNotice: string;
};

export const italianLanguagesCopy: LanguagesCopy = {
  title: "Generatore di testo segnaposto per lingue asiatiche",
  intro: "Genera testo di prova in giapponese, cinese o coreano per verificare interfacce, layout e prototipi multilingua con conteggi precisi.",
  numberLocale: "it-IT",
  contentLanguage: "Lingua del testo",
  mode: "Modalità",
  contentLanguages: { ja: "Giapponese", "zh-Hans": "Cinese semplificato", "zh-Hant": "Cinese tradizionale", ko: "Coreano" },
  modes: { words: "Parole", characters: "Caratteri", sentences: "Frasi" },
  paragraphs: "Paragrafi",
  presets: "Preset",
  output: "Risultato",
  outputAria: "Testo generato",
  emptyState: "Scegli le impostazioni e genera il testo segnaposto.",
  generate: "Genera",
  regenerate: "Rigenera",
  copy: "Copia",
  copied: "Copiato",
  copyHtml: "Copia HTML",
  copiedHtml: "HTML copiato",
  invalidAmount: "Inserisci una quantità intera tra {min} e {max} per {mode}.",
  invalidParagraphs: "Inserisci un numero intero valido di paragrafi.",
  unsupportedCombination: "Questa combinazione non è disponibile per la lingua selezionata. La quantità richiesta non è stata modificata.",
  adjustedParagraphs: "Paragrafi aggiornati a {paragraphs} per mantenere esatta la quantità richiesta.",
  copyFailed: "Impossibile copiare: controlla i permessi del browser.",
  copiedNotice: "Testo copiato.",
  copiedHtmlNotice: "HTML copiato.",
};

export const englishLanguagesCopy: LanguagesCopy = {
  title: "Asian-Language Placeholder Text Generator",
  intro: "Generate placeholder text in Japanese, Chinese or Korean to test multilingual interfaces, layouts and prototypes. Check visual density, line breaks and spacing with precise counts and copy-ready output.",
  numberLocale: "en-US",
  contentLanguage: "Content language",
  mode: "Mode",
  contentLanguages: { ja: "Japanese", "zh-Hans": "Simplified Chinese", "zh-Hant": "Traditional Chinese", ko: "Korean" },
  modes: { words: "Words", characters: "Characters", sentences: "Sentences" },
  paragraphs: "Paragraphs",
  presets: "Presets",
  output: "Output",
  outputAria: "Generated text",
  emptyState: "Choose your settings and generate placeholder text.",
  generate: "Generate",
  regenerate: "Regenerate",
  copy: "Copy",
  copied: "Copied",
  copyHtml: "Copy HTML",
  copiedHtml: "HTML copied",
  invalidAmount: "Enter a whole-number {mode} count from {min} to {max}.",
  invalidParagraphs: "Enter a valid whole-number paragraph count.",
  unsupportedCombination: "This quantity and paragraph combination is not available for the selected language. Your requested quantity has not been changed.",
  adjustedParagraphs: "Paragraphs changed to {paragraphs} to keep the requested quantity exact.",
  copyFailed: "Copy failed. Check your browser permissions and try again.",
  copiedNotice: "Text copied.",
  copiedHtmlNotice: "HTML copied.",
};

export const spanishLanguagesCopy: LanguagesCopy = {
  title: "Generador de texto en idiomas asiáticos",
  intro: "Genera texto de prueba en japonés, chino o coreano para comprobar interfaces, diseños y prototipos multilingües. Evalúa la densidad visual, los saltos de línea y el espaciado con cantidades exactas y texto listo para copiar.",
  numberLocale: "es-ES",
  contentLanguage: "Idioma del texto",
  mode: "Modo",
  contentLanguages: { ja: "Japonés", "zh-Hans": "Chino simplificado", "zh-Hant": "Chino tradicional", ko: "Coreano" },
  modes: { words: "Palabras", characters: "Caracteres", sentences: "Frases" },
  paragraphs: "Párrafos",
  presets: "Valores rápidos",
  output: "Resultado",
  outputAria: "Texto generado",
  emptyState: "Elige los ajustes y genera texto de prueba.",
  generate: "Generar",
  regenerate: "Regenerar",
  copy: "Copiar",
  copied: "Copiado",
  copyHtml: "Copiar HTML",
  copiedHtml: "HTML copiado",
  invalidAmount: "Introduce una cantidad entera de {mode} entre {min} y {max}.",
  invalidParagraphs: "Introduce un número entero válido de párrafos.",
  unsupportedCombination: "Esta combinación de cantidad y párrafos no está disponible para el idioma seleccionado. No se ha modificado la cantidad solicitada.",
  adjustedParagraphs: "Los párrafos se han ajustado a {paragraphs} para mantener exacta la cantidad solicitada.",
  copyFailed: "No se pudo copiar. Comprueba los permisos del navegador e inténtalo de nuevo.",
  copiedNotice: "Texto copiado.",
  copiedHtmlNotice: "HTML copiado.",
};

export function languageHtml(text: string, language: AvailableContentLanguage): string {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return text.split("\n\n").filter(Boolean).map(paragraph => `<p lang="${language}">${paragraph.replace(/[&<>"']/g, character => entities[character])}</p>`).join("\n");
}

export async function copyLanguage(text: string, language: AvailableContentLanguage, html = false): Promise<void> {
  const markup = html ? languageHtml(text, language) : text;
  if (html && typeof ClipboardItem !== "undefined" && navigator.clipboard?.write) {
    await navigator.clipboard.write([new ClipboardItem({
      "text/html": new Blob([markup], { type: "text/html" }),
      "text/plain": new Blob([text], { type: "text/plain" }),
    })]);
  } else if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(markup);
  } else {
    const field = document.createElement("textarea");
    field.value = markup;
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    if (!copied) throw new Error("Copia non disponibile in questo browser.");
  }
}
