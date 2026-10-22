import type { AvailableContentLanguage } from "@/lib/languages/registry";

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
