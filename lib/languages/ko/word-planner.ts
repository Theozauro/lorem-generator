import { modeSettings } from "../types";
import { koreanGraphemeSegmenter } from "./counting";
import { koreanSentences, type KoreanSentence } from "./data";

export type KoreanUnit = "words" | "characters";
export type KoreanCandidate = KoreanSentence & { words: number; characters: number };
type Candidate = KoreanCandidate;
type Chunk = { cost: number; count: number; forms: Candidate[] };
type Reachability = {
  cap: number;
  previousSum: Int16Array;
  previousCount: Uint8Array;
  previousChunk: Int16Array;
  chunks: Chunk[];
  available: boolean;
};

let candidates: Candidate[] | undefined;
const costIndexes = new Map<KoreanUnit, Map<number, Candidate[]>>();
const planners = new Map<KoreanUnit, Reachability>();
const WIDTH = 31;

function forms(): Candidate[] {
  return candidates ??= koreanSentences.map(sentence => ({
    ...sentence,
    words: sentence.text.trim().split(/\s+/u).length,
    characters: [...koreanGraphemeSegmenter().segment(sentence.text)].length,
  }));
}

function makeChunks(unit: KoreanUnit, cap: number): Chunk[] {
  const byCost = new Map<number, Candidate[]>();
  for (const form of forms()) {
    const cost = unit === "words" ? form.words : form.characters + 1;
    if (cost > cap) continue;
    const bucket = byCost.get(cost) ?? [];
    bucket.push(form);
    byCost.set(cost, bucket);
  }
  const chunks: Chunk[] = [];
  for (const [cost, bucket] of byCost) {
    let offset = 0, remaining = bucket.length, power = 1;
    while (remaining > 0) {
      const count = Math.min(power, remaining);
      chunks.push({ cost, count, forms: bucket.slice(offset, offset + count) });
      offset += count;
      remaining -= count;
      power *= 2;
    }
  }
  return chunks;
}

function build(unit: KoreanUnit): Reachability {
  const cap = unit === "words" ? modeSettings.words.max : modeSettings.characters.max + 1;
  const chunks = makeChunks(unit, cap);
  const cells = (cap + 1) * WIDTH;
  const previousSum = new Int16Array(cells).fill(-1);
  const previousCount = new Uint8Array(cells);
  const previousChunk = new Int16Array(cells).fill(-1);
  previousSum[0] = 0;
  for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
    const chunk = chunks[chunkIndex];
    const weight = chunk.cost * chunk.count;
    if (weight > cap) continue;
    for (let sum = cap - weight; sum >= 0; sum--) {
      const nextSum = sum + weight;
      for (let count = 0; count < WIDTH; count++) {
        const source = sum * WIDTH + count;
        if (previousSum[source] < 0) continue;
        const nextCount = Math.min(30, count + chunk.count);
        const target = nextSum * WIDTH + nextCount;
        if (previousSum[target] >= 0) continue;
        previousSum[target] = sum;
        previousCount[target] = count;
        previousChunk[target] = chunkIndex;
      }
    }
  }
  return { cap, previousSum, previousCount, previousChunk, chunks, available: chunks.length > 0 };
}

function planner(unit: KoreanUnit): Reachability {
  let value = planners.get(unit);
  if (!value) { value = build(unit); planners.set(unit, value); }
  return value;
}

function targetAndCap(unit: KoreanUnit, amount: number): number {
  return unit === "characters" ? amount + 1 : amount;
}

function reachable(unit: KoreanUnit, amount: number, minimumSentences: number): boolean {
  const settings = unit === "words" ? modeSettings.words : modeSettings.characters;
  const minimum = unit === "characters" ? 1 : settings.min;
  if (!Number.isInteger(amount) || amount < minimum || amount > settings.max || !Number.isInteger(minimumSentences) || minimumSentences < 1 || minimumSentences > 30) return false;
  const table = planner(unit), target = targetAndCap(unit, amount);
  if (target > table.cap) return false;
  const row = target * WIDTH;
  for (let count = minimumSentences; count < WIDTH; count++) if (table.previousSum[row + count] >= 0) return true;
  return false;
}

export function canPlanKoreanWords(words: number, paragraphs: number): boolean {
  return Number.isInteger(paragraphs) && paragraphs >= 1 && paragraphs <= modeSettings.paragraphs.max && reachable("words", words, paragraphs);
}

export function canPlanKoreanCharacters(characters: number, paragraphs = 1): boolean {
  return Number.isInteger(paragraphs) && paragraphs >= 1 && paragraphs <= modeSettings.paragraphs.max
    && reachable("characters", characters - paragraphs + 1, paragraphs);
}

export function koreanPlanSentenceCounts(unit: KoreanUnit, amount: number, minimumSentences: number, preferredSentences = minimumSentences): number[] | null {
  if (!reachable(unit, amount, minimumSentences)) return null;
  const table = planner(unit), target = targetAndCap(unit, amount);
  const desired = Math.max(minimumSentences, Math.min(30, Math.round(preferredSentences)));
  let stateCount = -1, bestDistance = Infinity;
  for (let count = minimumSentences; count < WIDTH; count++) {
    if (table.previousSum[target * WIDTH + count] < 0) continue;
    const distance = Math.abs(count - desired);
    if (distance < bestDistance) { stateCount = count; bestDistance = distance; }
  }
  if (stateCount < 0) return null;
  const counts: number[] = [];
  let sum = target, count = stateCount;
  while (sum > 0) {
    const cell = sum * WIDTH + count, chunkIndex = table.previousChunk[cell];
    if (chunkIndex < 0) return null;
    const chunk = table.chunks[chunkIndex];
    for (let i = 0; i < chunk.count; i++) counts.push(chunk.cost);
    const previousSum = table.previousSum[cell];
    count = table.previousCount[cell];
    sum = previousSum;
  }
  if (unit === "characters") counts.forEach((cost, index) => { counts[index] = cost - 1; });
  return counts;
}

export function getKoreanParagraphOptions(words: number): number[] {
  return Array.from({ length: modeSettings.paragraphs.max }, (_, index) => index + 1)
    .filter(paragraphs => canPlanKoreanWords(words, paragraphs));
}

export function koreanFeasibilitySummary() {
  const wordTable = planner("words");
  const characterTable = planner("characters");
  return { corpusSize: forms().length, wordCosts: wordTable.chunks.map(chunk => chunk.cost), characterCosts: characterTable.chunks.map(chunk => chunk.cost - 1) };
}

export function koreanCandidates(): readonly Candidate[] { return forms(); }

export function candidatesForCost(unit: KoreanUnit, cost: number): readonly Candidate[] {
  let index = costIndexes.get(unit);
  if (!index) {
    index = new Map<number, Candidate[]>();
    for (const form of forms()) {
      const amount = unit === "words" ? form.words : form.characters;
      const bucket = index.get(amount) ?? [];
      bucket.push(form);
      index.set(amount, bucket);
    }
    costIndexes.set(unit, index);
  }
  return index.get(cost) ?? [];
}

export function shuffleKoreanForms<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
