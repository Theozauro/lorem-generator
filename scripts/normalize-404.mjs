import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { createSitemap } from "../lib/sitemap-data.mjs";

const file = "dist/client/404.html";
if (existsSync(file)) {
  const html = readFileSync(file, "utf8");
  const withoutRobots = html.replace(/<meta name="robots"[^>]*>/g, "");
  writeFileSync(file, withoutRobots.replace("<head>", '<head><meta name="robots" content="noindex, follow"/>'), "utf8");
}

function escapeXml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function sitemapToXml(entries) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  for (const entry of entries) {
    xml += `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n`;
    for (const [language, url] of Object.entries(entry.alternates.languages)) {
      xml += `    <xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(url)}" />\n`;
    }
    xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n    <priority>${entry.priority.toFixed(1)}</priority>\n  </url>\n`;
  }
  return `${xml}</urlset>\n`;
}

writeFileSync("dist/client/sitemap.xml", sitemapToXml(createSitemap(process.env.NEXT_PUBLIC_SITE_URL ?? "https://lorem-generator.com")), "utf8");
