import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { createSitemap } from "../lib/sitemap-data.mjs";

const file = "dist/client/404.html";
if (existsSync(file)) {
  const html = readFileSync(file, "utf8");
  const withoutRobots = html.replace(/<meta name="robots"[^>]*>/g, "");
  writeFileSync(file, withoutRobots.replace("<head>", '<head><meta name="robots" content="noindex, follow"/>'), "utf8");
}

const localizedLanguages = { de: "de", es: "es", fr: "fr", it: "it", nl: "nl", "pt-br": "pt-BR", tr: "tr" };
function htmlLanguage(relativePath) {
  const firstSegment = relativePath.split("/")[0].replace(/\.html$/, "");
  return localizedLanguages[firstSegment] ?? "en";
}
function updateHtmlLanguages(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) updateHtmlLanguages(path);
    else if (entry.endsWith(".html")) {
      const relativePath = relative("dist/client", path).split("\\").join("/");
      const html = readFileSync(path, "utf8");
      const expected = htmlLanguage(relativePath);
      const updated = html.replace(/<html lang="[^"]+">/, `<html lang="${expected}">`);
      if (updated !== html) writeFileSync(path, updated, "utf8");
    }
  }
}
updateHtmlLanguages("dist/client");

function escapeXml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function sitemapToXml(entries) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const entry of entries) {
    xml += `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n  </url>\n`;
  }
  return `${xml}</urlset>\n`;
}

writeFileSync("dist/client/sitemap.xml", sitemapToXml(createSitemap()), "utf8");
