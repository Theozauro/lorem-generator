import { writeFileSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { modeSettings } from "../types.ts";
import { koreanStats, countKoreanCharacters, countKoreanWords, parseKoreanOutput } from "./counting.ts";
import { koreanEngine, canGenerateKoreanCharacters, canGenerateKoreanSentences, canGenerateKoreanWords } from "./engine.ts";
import { koreanSentences } from "./data.ts";
import { getKoreanParagraphOptions } from "./ui-contract.ts";
import { japaneseEngine } from "../ja/engine.ts";
import { simplifiedChineseEngine } from "../zh-Hans/engine.ts";
import { traditionalChineseEngine } from "../zh-Hant/engine.ts";

const started = performance.now();
const fail = (message) => { throw new Error(message); };
const check = (condition, message) => { if (!condition) fail(message); };
let matrixSupported = 0, matrixUnsupported = 0, matrixFailures = 0;
const matrixByParagraph = [];
const boundarySeeds = [];

for (let paragraphs = 1; paragraphs <= 30; paragraphs++) {
  const supported = [];
  for (let words = 1; words <= 2000; words++) {
    if (!canGenerateKoreanWords({ words, paragraphs })) continue;
    supported.push(words);
    matrixSupported++;
    try {
      const text = koreanEngine.generate({ mode: "words", amount: words, paragraphs, seed: ((paragraphs * 7919 + words * 104729) >>> 0) });
      const parsed = parseKoreanOutput(text);
      check(countKoreanWords(text) === words && parsed.length === paragraphs, `word matrix mismatch: ${words}/${paragraphs}`);
    } catch (error) {
      matrixFailures++;
      fail(`supported word pair failed ${words}/${paragraphs}: ${error.message}`);
    }
  }
  matrixUnsupported += 2000 - supported.length;
  const min = supported[0] ?? null;
  const holes = [];
  for (let i = 1; i < supported.length; i++) if (supported[i] !== supported[i - 1] + 1) holes.push([supported[i - 1] + 1, supported[i] - 1]);
  matrixByParagraph.push({ paragraphs, min, max: supported.at(-1) ?? null, holes });
  boundarySeeds.push({ paragraphs, min, max: supported.at(-1) ?? null });
}

// 50 deterministic seeds at structural minima, near minima, and high totals.
let boundarySeedChecks = 0;
for (const boundary of boundarySeeds.filter(item => item.min !== null && [1, 2, 3, 10, 20, 30].includes(item.paragraphs))) {
  const targets = new Set([boundary.min, Math.min(2000, boundary.min + 1), Math.min(2000, boundary.min + 7), 2000]);
  for (const words of targets) {
    if (!canGenerateKoreanWords({ words, paragraphs: boundary.paragraphs })) continue;
    for (let seed = 0; seed < 50; seed++) {
      const text = koreanEngine.generate({ mode: "words", amount: words, paragraphs: boundary.paragraphs, seed });
      const parsed = parseKoreanOutput(text);
      check(countKoreanWords(text) === words && parsed.length === boundary.paragraphs, `seed failure ${words}/${boundary.paragraphs}/${seed}`);
      boundarySeedChecks++;
    }
  }
}

// Check each amount in the advertised character range that the corpus claims is feasible.
let characterSupported = 0, characterUnsupported = 0;
const characterUnsupportedValues = [];
for (let amount = modeSettings.characters.min; amount <= modeSettings.characters.max; amount++) {
  if (!canGenerateKoreanCharacters(amount)) { characterUnsupported++; characterUnsupportedValues.push(amount); continue; }
  const text = koreanEngine.generate({ mode: "characters", amount, seed: amount * 31 });
  check(countKoreanCharacters(text) === amount, `character count mismatch: ${amount}`);
  characterSupported++;
}

let characterBoundarySeedChecks = 0;
const supportedCharacterTargets = [];
for (let amount = modeSettings.characters.min; amount <= modeSettings.characters.max; amount++) if (canGenerateKoreanCharacters(amount)) supportedCharacterTargets.push(amount);
for (const amount of new Set([supportedCharacterTargets[0], supportedCharacterTargets[0] + 1, 100, 500, 10000])) {
  if (!amount || !canGenerateKoreanCharacters(amount)) continue;
  for (let seed = 0; seed < 50; seed++) {
    const text = koreanEngine.generate({ mode: "characters", amount, seed: seed + 70000 });
    check(countKoreanCharacters(text) === amount, `character seed failure ${amount}/${seed}`);
    characterBoundarySeedChecks++;
  }
}

let sentenceChecks = 0;
for (let amount = modeSettings.sentences.min; amount <= modeSettings.sentences.max; amount++) {
  check(canGenerateKoreanSentences(amount), `sentence count unexpectedly unsupported: ${amount}`);
  for (let seed = 0; seed < 5; seed++) {
    const text = koreanEngine.generate({ mode: "sentences", amount, seed });
  check(parseKoreanOutput(text).flat().length === amount, `sentence count mismatch: ${amount}/${seed}`);
    sentenceChecks++;
  }
}

// A thousand deterministic outputs for structural, spacing, duplicate and rhythm checks.
const rhythm = { outputs: 0, adjacentTemplateRepeats: 0, endingVariety: new Set() };
for (let i = 0; i < 1000; i++) {
  const mode = i % 4;
  let text;
  if (mode === 0) {
    const p = 1 + (i % 30), options = getKoreanParagraphOptions(120 + (i % 31)).supported;
    const supportedP = options.includes(p) ? p : options.at(-1);
    const count = supportedP ? 120 + (i % 31) : 0;
    if (!count) continue;
    text = koreanEngine.generate({ mode: "words", amount: count, paragraphs: supportedP, seed: i + 20000 });
  } else if (mode === 1) {
    const sentences = 1 + (i % 20);
    text = koreanEngine.generate({ mode: "sentences", amount: sentences, seed: i + 30000 });
  } else if (mode === 2) {
    const candidate = koreanSentences[(i * 37) % koreanSentences.length];
    const amount = countKoreanCharacters(candidate.text);
    text = koreanEngine.generate({ mode: "characters", amount, seed: i + 40000 });
  } else {
    const words = 80 + (i % 40), p = 1 + (i % 5);
    if (!canGenerateKoreanWords({ words, paragraphs: p })) continue;
    text = koreanEngine.generate({ mode: "words", amount: words, paragraphs: p, seed: i + 50000 });
  }
  const stats = koreanStats(text);
  check(text === text.normalize("NFC") && !/[ \t]{2,}|\s$/u.test(text) && !/\n{3,}/u.test(text), `spacing/NFC output ${i}`);
  const forms = text.split(/(?<=\.)\s+/u);
  check(forms.length === stats.sentences && new Set(forms).size === forms.length, `duplicate sentence ${i}`);
  for (const paragraph of text.split("\n\n")) {
    const paragraphForms = paragraph.split(/(?<=\.) /u);
    const sourceTemplates = paragraphForms.map(form => koreanSentences.find(item => item.text === form)?.template);
    for (let j = 1; j < sourceTemplates.length; j++) {
      if (sourceTemplates[j] === sourceTemplates[j - 1]) rhythm.adjacentTemplateRepeats++;
    }
  }
  for (const form of forms) rhythm.endingVariety.add(form.match(/[^ ]+\.$/u)?.[0] ?? "");
  rhythm.outputs++;
}

const review = [];
for (let i = 0; i < 8; i++) {
  const words = [80, 100, 125, 150, 175, 200, 250, 300][i];
  const options = getKoreanParagraphOptions(words).supported;
  const paragraphs = options.includes(3) ? 3 : options.at(-1);
  review.push(`# Words + Paragraphs ${i + 1}\n\nTarget: ${words} eojeol / ${paragraphs} paragraphs\n\n${koreanEngine.generate({ mode: "words", amount: words, paragraphs, seed: 8100 + i })}`);
}
for (let i = 0; i < 8; i++) {
  const form = koreanSentences[(i * 43) % koreanSentences.length];
  const amount = countKoreanCharacters(form.text);
  review.push(`# Characters ${i + 1}\n\nTarget: ${amount} grapheme clusters\n\n${koreanEngine.generate({ mode: "characters", amount, seed: 8200 + i })}`);
}
for (let i = 0; i < 8; i++) {
  const amount = [1, 2, 3, 5, 8, 10, 15, 20][i];
  review.push(`# Sentences ${i + 1}\n\nTarget: ${amount} complete sentences\n\n${koreanEngine.generate({ mode: "sentences", amount, seed: 8300 + i })}`);
}
writeFileSync(new URL("./review-samples.md", import.meta.url), `# Korean engine review samples\n\nGenerated reproducibly from the current local corpus. These are implementation review material, not native-speaker approval.\n\n${review.join("\n\n---\n\n")}\n`);

// Existing engines are smoke-tested only; no implementation changes are made to them.
const regression = [
  ["ja", japaneseEngine, { mode: "words", amount: 100, paragraphs: 3 }],
  ["zh-Hans", simplifiedChineseEngine, { mode: "sentences", amount: 5 }],
  ["zh-Hant", traditionalChineseEngine, { mode: "sentences", amount: 5 }],
];
for (const [name, engine, request] of regression) {
  const text = engine.generate({ ...request, seed: 926 });
  check(engine.stats(text)[request.mode] === request.amount, `${name} smoke regression`);
}

const largest = [];
for (const request of [
  { mode: "words", amount: 2000, paragraphs: 1, seed: 9001 },
  { mode: "words", amount: 2000, paragraphs: 30, seed: 9002 },
  { mode: "characters", amount: 10000, seed: 9003 },
]) {
  if (!koreanEngine.stats) continue;
  const start = performance.now();
  if ((request.mode === "words" && !canGenerateKoreanWords({ words: request.amount, paragraphs: request.paragraphs }))
    || (request.mode === "characters" && !canGenerateKoreanCharacters(request.amount))) {
    largest.push({ request, supported: false, ms: Math.round(performance.now() - start) });
    continue;
  }
  const text = koreanEngine.generate(request);
  largest.push({ request, supported: true, ms: Math.round(performance.now() - start), chars: countKoreanCharacters(text) });
}

console.log(JSON.stringify({
  corpusSentences: koreanSentences.length,
  wordsParagraphMatrix: { checkedPairs: 60000, supported: matrixSupported, unsupported: matrixUnsupported, failures: matrixFailures, byParagraph: matrixByParagraph },
  boundarySeedChecks,
  characters: { range: [10, 10000], supported: characterSupported, unsupported: characterUnsupported, unsupportedValues: characterUnsupportedValues },
  characterBoundarySeedChecks,
  sentenceChecks,
  representativeOutputs: { ...rhythm, endingVariety: rhythm.endingVariety.size },
  largest,
  elapsedSeconds: Math.round((performance.now() - started) / 1000),
  reviewSamples: 24,
}));
