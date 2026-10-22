import { countJapaneseCharacters, countJapaneseWords, japaneseStats } from "../counting";
import { modeSettings, type LanguageEngine, type LanguageRequest } from "../types";
import { connectors, sentenceForms, type ConnectorRole, type Topic } from "./data";
import { createWordPlanner } from "./word-planner";

type Candidate = {
  text: string; base: string; topic: Topic; template: string; lexemes: readonly string[];
  words: number; characters: number; connector: string; role: ConnectorRole | "neutral"; short: boolean;
};
type Frequencies = { templates: Map<string, number>; lexemes: Map<string, number> };
type ParagraphState = { items: Candidate[]; bases: Set<string>; connectors: Set<string>; closed: boolean; frequency: Frequencies };
type History = { sentences: Set<string>; bases: Set<string>; templates: string[]; lexemes: string[][]; connectors: string[]; lastParagraphOpener: string; frequency: Frequencies };
type Unit = "words" | "characters";
let inventory: Candidate[] | undefined;
function candidates(): Candidate[] {
  // Lazy: initial rendering still does no generation or segmentation work.
  return inventory ??= sentenceForms.flatMap(form => [
    { text: "", role: "neutral" as const }, ...(form.procedural ? connectors : []),
  ].map(prefix => {
    const text = `${prefix.text}${form.text}`.normalize("NFC");
    return { text, base: form.text, topic: form.topic, template: form.template, lexemes: form.lexemes,
      words: countJapaneseWords(text), characters: countJapaneseCharacters(text),
      connector: prefix.text, role: prefix.role, short: !!form.short };
  }));
}
function randomFor(seed: number) {
  let state = seed >>> 0;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
}
function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
}

function allowed(item: Candidate, state: ParagraphState, history: History, final: boolean): boolean {
  if (state.closed || history.bases.has(item.base) || history.sentences.has(item.text) || state.bases.has(item.base)) return false;
  // Changing only the noun is not sufficient structural variety. Keep three
  // other sentences between recurring full-size constructions in a paragraph.
  if (!item.short && state.items.slice(-3).some(previous => previous.template === item.template)) return false;
  // Cool down meaningful noun slots, not Japanese particles or inflections.
  // The same subject can recur later, but not in mechanically adjacent forms.
  if (item.lexemes.some(lexeme => state.items.at(-1)?.lexemes.includes(lexeme))) return false;
  if (item.role === "neutral") return true;
  if (state.connectors.has(item.connector)) return false;
  const recent = [...history.connectors.slice(-4), ...state.items.slice(-4).map(previous => previous.connector)].slice(-4);
  if (recent.includes(item.connector)) return false;
  if (item.role === "opening") return state.items.length === 0 && item.connector !== history.lastParagraphOpener;
  if (item.role === "closing") return final && state.items.length >= 2;
  return state.items.length > 0;
}
function append(state: ParagraphState, item: Candidate): ParagraphState {
  const frequency = { templates: new Map(state.frequency.templates), lexemes: new Map(state.frequency.lexemes) };
  frequency.templates.set(item.template, (frequency.templates.get(item.template) ?? 0) + 1);
  for (const lexeme of item.lexemes) frequency.lexemes.set(lexeme, (frequency.lexemes.get(lexeme) ?? 0) + 1);
  return { items: [...state.items, item], bases: new Set([...state.bases, item.base]),
    connectors: new Set([...state.connectors, ...(item.connector ? [item.connector] : [])]), closed: item.role === "closing", frequency };
}
function score(item: Candidate, state: ParagraphState, history: History, desired: number, unit: Unit, connectorWanted: boolean): number {
  const templates = [...history.templates.slice(-3), ...state.items.slice(-3).map(previous => previous.template)].slice(-3);
  const lexemes = [...history.lexemes.slice(-2), ...state.items.slice(-2).map(previous => [...previous.lexemes])].slice(-2).flat();
  return Math.abs(item[unit] - desired) * 0.2
    + templates.filter(template => template === item.template).length * 16
    + item.lexemes.filter(lexeme => lexemes.includes(lexeme)).length * 18
    + ((history.frequency.templates.get(item.template) ?? 0) + (state.frequency.templates.get(item.template) ?? 0)) * 3
    + item.lexemes.reduce((total, lexeme) => total + ((history.frequency.lexemes.get(lexeme) ?? 0) + (state.frequency.lexemes.get(lexeme) ?? 0)) * 4, 0)
    + (item.short ? 12 : 0)
    + (item.role === "neutral" ? (connectorWanted ? 3 : 0) : (connectorWanted ? 0 : 8));
}

// Rebuild the complete tail, never a fragment. Search every available sentence
// size with alternative base clauses, backtracking over up to four sentences.
function tail(pool: Candidate[], state: ParagraphState, history: History, budget: number, unit: Unit, count: number, connectorWanted: boolean): Candidate[] | null {
  if (count === 0) return budget === 0 ? [] : null;
  const ranked = pool.filter(item => item[unit] <= budget && (count !== 1 || item[unit] === budget) && allowed(item, state, history, count === 1))
    .map((item, index) => ({ item, rank: score(item, state, history, budget / count, unit, connectorWanted) + index / pool.length }))
    .sort((a, b) => a.rank - b.rank);
  const bySize = new Map<number, Candidate[]>();
  for (const { item } of ranked) {
    const bucket = bySize.get(item[unit]) ?? [];
    // Prefix variants must not crowd out different base clauses.
    if (bucket.length < 4 && !bucket.some(other => other.base === item.base)) bucket.push(item);
    bySize.set(item[unit], bucket);
  }
  const preferred = new Set([...bySize.values()].flat());
  for (const { item } of ranked) {
    if (!preferred.has(item)) continue;
    const rest = tail(pool, append(state, item), history, budget - item[unit], unit, count - 1, false);
    if (rest) return [item, ...rest];
  }
  return null;
}
function paragraph(pool: Candidate[], history: History, random: () => number, amount: number, unit?: Unit): Candidate[] | null {
  let state: ParagraphState = { items: [], bases: new Set(), connectors: new Set(), closed: false, frequency: { templates: new Map(), lexemes: new Map() } };
  let remaining = amount;
  const typical = unit === "characters" ? 38 : 18;
  while (remaining > 0) {
    const connectorWanted = random() < 0.18;
    if (unit && remaining <= typical * 3) {
      const preferred = Math.max(1, Math.min(3, Math.round(remaining / typical)));
      let best: Candidate[] | null = null;
      let bestScore = Infinity;
      for (const count of [...new Set([preferred, 1, 2, 3])]) {
        const result = tail(pool, state, history, remaining, unit, count, connectorWanted);
        if (!result) continue;
        let trial = state;
        let quality = count * 2;
        for (const item of result) {
          quality += score(item, trial, history, typical, unit, connectorWanted);
          trial = append(trial, item);
        }
        if (quality < bestScore) { best = result; bestScore = quality; }
      }
      // Longer reviewed forms can leave a budget that three distinct
      // constructions cannot fill. Rebuild it with four complete clauses only
      // when the existing one-to-three-clause search has no exact solution.
      if (!best && unit === "characters") best = tail(pool, state, history, remaining, unit, 4, connectorWanted);
      return best ? [...state.items, ...best] : null;
    }
    const ranked = pool.filter(item => allowed(item, state, history, !unit && remaining === 1)
      && (!unit || (item[unit] <= remaining - typical && !item.short)))
      .map((item, index) => ({ item, rank: score(item, state, history, typical, unit ?? "words", connectorWanted) + index / pool.length }))
      .sort((a, b) => a.rank - b.rank);
    if (!ranked.length) return null;
    const item = ranked[0].item;
    state = append(state, item);
    remaining -= unit ? item[unit] : 1;
  }
  return state.items;
}
function remember(items: Candidate[], history: History) {
  for (const item of items) {
    history.sentences.add(item.text); history.bases.add(item.base);
    history.templates.push(item.template); history.lexemes.push([...item.lexemes]); history.connectors.push(item.connector);
    history.frequency.templates.set(item.template, (history.frequency.templates.get(item.template) ?? 0) + 1);
    for (const lexeme of item.lexemes) history.frequency.lexemes.set(lexeme, (history.frequency.lexemes.get(lexeme) ?? 0) + 1);
  }
  history.lastParagraphOpener = items[0]?.connector ?? "";
}

function emptyHistory(): History {
  return { sentences: new Set(), bases: new Set(), templates: [], lexemes: [], connectors: [], lastParagraphOpener: "", frequency: { templates: new Map(), lexemes: new Map() } };
}
function emptyParagraph(): ParagraphState {
  return { items: [], bases: new Set(), connectors: new Set(), closed: false, frequency: { templates: new Map(), lexemes: new Map() } };
}
function wordOptions(pool: Candidate[], maximum: number): Map<number, readonly Candidate[]> {
  const options = new Map<number, readonly Candidate[]>(), history = emptyHistory();
  let state = emptyParagraph(), total = 0;
  function save(amount: number, tail: Candidate[]) {
    if (amount > 0 && amount <= maximum && !options.has(amount)) options.set(amount, [...state.items, ...tail]);
  }
  while (total <= maximum) {
    save(total, []);
    const available = pool.filter(item => total + item.words <= maximum && allowed(item, state, history, false));
    const buckets = new Map<number, Candidate[]>();
    for (const item of available) {
      save(total + item.words, [item]);
      const bucket = buckets.get(item.words) ?? []; if (bucket.length < 4) bucket.push(item); buckets.set(item.words, bucket);
    }
    for (const first of [...buckets.values()].flat()) {
      const trial = append(state, first);
      for (const second of available) if (total + first.words + second.words <= maximum && allowed(second, trial, history, true)) {
        save(total + first.words + second.words, [first, second]);
      }
    }
    const next = available.filter(item => !item.short).map((item, index) => ({ item, rank: score(item, state, history, 18, "words", false) + index / pool.length }))
      .sort((a, b) => a.rank - b.rank)[0]?.item;
    if (!next) break;
    state = append(state, next); total += next.words;
  }
  return options;
}
let wordsPlanner: ReturnType<typeof createWordPlanner<Candidate>> | undefined;
function wordPlanner() { return wordsPlanner ??= createWordPlanner(candidates(), wordOptions); }

export function canGenerateJapaneseWords({ words, paragraphs }: { words: number; paragraphs: number }): boolean {
  return wordPlanner().canGenerate(words, paragraphs);
}

function characterAllocations(total: number, paragraphs: number, attempt: number): number[] {
  const base = Math.floor(total / paragraphs), remainder = total % paragraphs;
  const allocation = Array.from({ length: paragraphs }, (_, index) => base + Number(index < remainder));
  if (paragraphs < 2 || attempt === 0) return allocation;
  const donor = (attempt * 7) % paragraphs;
  const receiver = (donor + 1 + Math.floor(attempt / paragraphs)) % paragraphs;
  const delta = 1 + Math.floor((attempt - 1) / 2) % 12;
  const from = attempt % 2 ? donor : receiver;
  const to = attempt % 2 ? receiver : donor;
  const transferable = Math.min(delta, allocation[from] - 1);
  allocation[from] -= transferable;
  allocation[to] += transferable;
  return allocation;
}

function generateJapaneseCounted(mode: "characters" | "sentences", amount: number, paragraphs: number, seed: number): string | null {
  const serializedCharacters = mode === "characters" ? amount - 2 * (paragraphs - 1) : amount;
  if (serializedCharacters < paragraphs) return null;
  for (let allocationAttempt = 0; allocationAttempt < (mode === "characters" ? 25 : 1); allocationAttempt++) {
    const random = randomFor((seed + Math.imul(allocationAttempt, 0x9e3779b9)) >>> 0);
    const sizes = mode === "characters"
      ? characterAllocations(serializedCharacters, paragraphs, allocationAttempt)
      : Array.from({ length: paragraphs }, (_, index) => Math.floor(amount / paragraphs) + Number(index < amount % paragraphs));
    const history = emptyHistory(), result: string[] = [];
    const topics = shuffled<Topic>(["interface", "documents", "planning"], random);
    let failed = false;
    for (let index = 0; index < paragraphs; index++) {
      const topicOrder: Topic[] = [...topics.slice(index % topics.length), ...topics.slice(0, index % topics.length)];
      let selected: Candidate[] | null = null;
      for (const topic of topicOrder) {
        const pool = shuffled(candidates().filter(item => item.topic === topic), random);
        selected = paragraph(pool, history, random, sizes[index], mode === "characters" ? "characters" : undefined);
        if (selected) break;
      }
      if (!selected) { failed = true; break; }
      remember(selected, history);
      result.push(selected.map(item => item.text).join(""));
    }
    if (failed) continue;
    const output = result.join("\n\n").normalize("NFC");
    const stats = japaneseStats(output);
    if (result.length === paragraphs && stats[mode] === amount && stats.paragraphs === paragraphs && output.endsWith("。")) return output;
  }
  return null;
}

const japaneseCharacterFeasibility = new Map<string, boolean>();
const japaneseSentenceFeasibility = new Map<string, boolean>();
export function canGenerateJapaneseCharacters(amount: number, paragraphs = 1): boolean {
  if (!Number.isInteger(amount) || amount < modeSettings.characters.min || amount > modeSettings.characters.max
    || !Number.isInteger(paragraphs) || paragraphs < 1 || paragraphs > modeSettings.paragraphs.max) return false;
  const shortestSentence = Math.min(...sentenceForms.map(form => countJapaneseCharacters(form.text.normalize("NFC"))));
  if (amount - 2 * (paragraphs - 1) < paragraphs * shortestSentence) return false;
  const key = `${amount}:${paragraphs}`;
  const cached = japaneseCharacterFeasibility.get(key);
  if (cached !== undefined) return cached;
  const supported = [0x1234, 0x5eed].some(seed => generateJapaneseCounted("characters", amount, paragraphs, seed) !== null);
  japaneseCharacterFeasibility.set(key, supported);
  if (japaneseCharacterFeasibility.size > 512) japaneseCharacterFeasibility.delete(japaneseCharacterFeasibility.keys().next().value!);
  return supported;
}

export function canGenerateJapaneseSentences(amount: number, paragraphs = 1): boolean {
  if (!Number.isInteger(amount) || amount < modeSettings.sentences.min || amount > modeSettings.sentences.max
    || !Number.isInteger(paragraphs) || paragraphs < 1 || paragraphs > Math.min(amount, modeSettings.paragraphs.max)) return false;
  const key = `${amount}:${paragraphs}`;
  const cached = japaneseSentenceFeasibility.get(key);
  if (cached !== undefined) return cached;
  const supported = [0x1234, 0x5eed].some(seed => generateJapaneseCounted("sentences", amount, paragraphs, seed) !== null);
  japaneseSentenceFeasibility.set(key, supported);
  if (japaneseSentenceFeasibility.size > 512) japaneseSentenceFeasibility.delete(japaneseSentenceFeasibility.keys().next().value!);
  return supported;
}

function generateWords(amount: number, paragraphs: number, random: () => number): string {
  const planned = wordPlanner().plan(amount, paragraphs, random);
  if (!planned) throw new Error("Questa combinazione non è supportata dal repertorio di frasi complete senza ripetizioni.");
  const history = emptyHistory(), completed: Candidate[][] = [];
  for (const slot of planned) {
    let state = emptyParagraph();
    for (let i = 0; i < slot.items.length; i++) {
      const original = slot.items[i], reserved = new Set(slot.items.slice(i + 1).map(item => item.base));
      const alternatives = shuffled(slot.pool.filter(item => item.words === original.words && !reserved.has(item.base)), random).slice(0, 12)
        .map(item => ({ item, rank: score(item, state, history, 18, "words", random() < .18) }))
        .sort((a, b) => a.rank - b.rank);
      let chosen = original;
      for (const { item } of alternatives) {
        if (!allowed(item, state, history, i === slot.items.length - 1)) continue;
        let future = append(state, item), compatible = true;
        for (const next of slot.items.slice(i + 1, i + 4)) {
          if (!allowed(next, future, history, false)) { compatible = false; break; }
          future = append(future, next);
        }
        if (compatible) { chosen = item; break; }
      }
      state = append(state, chosen);
    }
    remember(state.items, history); completed.push(state.items);
  }
  const output = completed.map(items => items.map(item => item.text).join("")).join("\n\n").normalize("NFC");
  const stats = japaneseStats(output);
  if (stats.words !== amount || stats.paragraphs !== paragraphs) throw new Error("Il piano globale non rispetta i conteggi richiesti.");
  return output;
}

export function generateJapanese({ mode, amount, paragraphs = 1, seed = Math.floor(Math.random() * 0xffffffff) }: LanguageRequest): string {
  const limits = modeSettings[mode];
  if (!Number.isInteger(amount) || amount < limits.min || amount > limits.max) throw new Error(`Inserisci un numero intero tra ${limits.min} e ${limits.max}.`);
  if (mode !== "paragraphs" && (!Number.isInteger(paragraphs) || paragraphs < 1 || paragraphs > modeSettings.paragraphs.max)) throw new Error("Numero di paragrafi non valido.");
  const random = randomFor(seed);
  if (mode === "words") return generateWords(amount, paragraphs, random);
  if (mode === "characters" || mode === "sentences") {
    const output = generateJapaneseCounted(mode, amount, paragraphs, seed)
      ?? [0x1234, 0x5eed].map(fallback => generateJapaneseCounted(mode, amount, paragraphs, fallback)).find(Boolean);
    if (output) return output;
    throw new Error("Questa combinazione di quantità e paragrafi non è raggiungibile con frasi complete.");
  }
  for (let attempt = 0; attempt < 6; attempt++) {
    const history: History = { sentences: new Set(), bases: new Set(), templates: [], lexemes: [], connectors: [], lastParagraphOpener: "", frequency: { templates: new Map(), lexemes: new Map() } };
    const topics = shuffled<Topic>(["interface", "documents", "planning"], random);
    const count = mode === "paragraphs" ? amount : 1;
    const result: string[] = [];
    for (let index = 0; index < count; index++) {
      const target = mode === "paragraphs" ? 2 + Math.floor(random() * 4) : amount;
      const topicOrder: Topic[] = [...topics.slice(index % topics.length), ...topics.slice(0, index % topics.length)];
      let selected: Candidate[] | null = null;
      for (const topic of topicOrder) {
        const pool = shuffled(candidates().filter(item => item.topic === topic), random);
        selected = paragraph(pool, history, random, target);
        if (selected) break;
      }
      if (!selected) break;
      remember(selected, history);
      result.push(selected.map(item => item.text).join(""));
    }
    const output = result.join("\n\n").normalize("NFC");
    // Recount the complete serialized output. No truncation, padding, weakened
    // counts, or punctuation repair of an incomplete sentence.
    const stats = japaneseStats(output);
    if (result.length === count && stats[mode] === amount && output.endsWith("。")) return output;
  }
  throw new Error("Questo valore non è raggiungibile con il piccolo repertorio del prototipo. Prova un valore rapido diverso.");
}

export const japaneseEngine: LanguageEngine = { generate: generateJapanese, stats: japaneseStats };
