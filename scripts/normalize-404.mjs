import { existsSync, readFileSync, writeFileSync } from "node:fs";

const file = "dist/client/404.html";
if (existsSync(file)) {
  const html = readFileSync(file, "utf8");
  const withoutRobots = html.replace(/<meta name="robots"[^>]*>/g, "");
  writeFileSync(file, withoutRobots.replace("<head>", '<head><meta name="robots" content="noindex, follow"/>'), "utf8");
}
