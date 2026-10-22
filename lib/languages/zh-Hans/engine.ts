import { modeSettings, type LanguageEngine, type LanguageRequest } from "../types";
import { simplifiedChineseStats } from "./counting";
import { canPlanSimplifiedChinese, planSimplifiedChinese, type ChineseCandidate, type ChineseUnit } from "./word-planner";

function randomFor(seed: number) {
  let state = seed >>> 0;
  // Avalanche neighbouring seeds before the first family choice. Small test
  // seeds must exercise all families, not one narrow interval of an LCG.
  state = Math.imul(state ^ (state >>> 16),0x21f0aaad);
  state = Math.imul(state ^ (state >>> 15),0x735a2d97);
  state = (state ^ (state >>> 15)) >>> 0;
  return () => { state = (Math.imul(state,1664525)+1013904223) >>> 0; return state/4294967296; };
}
export function canGenerateSimplifiedChineseWords({ words, paragraphs }: { words: number; paragraphs: number }): boolean {
  return canPlanSimplifiedChinese(words,paragraphs,"words");
}
export function canGenerateSimplifiedChineseCharacters(amount: number, paragraphs = 1): boolean {
  return Number.isInteger(paragraphs) && paragraphs >= 1 && paragraphs <= modeSettings.paragraphs.max
    && canPlanSimplifiedChinese(amount - 2 * (paragraphs - 1),paragraphs,"characters");
}
export function canGenerateSimplifiedChineseSentences(amount: number, paragraphs = 1): boolean {
  return canPlanSimplifiedChinese(amount,paragraphs,"sentences");
}
const sizeOf = (form: ChineseCandidate,unit: ChineseUnit) => unit === "words" ? form.wordCount : unit === "characters" ? form.characters : 1;
type Positions = Map<number,Map<string,number>>;
function stateShape(form: ChineseCandidate): string {
  const id = form.template.split(":")[1];
  if (["short-display","short-current","short-ready"].includes(id)) return "normal-display";
  if (["short-checked","short-information","short-owner"].includes(id)) return "checked-information";
  if (["short-stable","short-consistent"].includes(id)) return "consistent-state";
  return id;
}
function rhythmPenalty(form: ChineseCandidate, history: readonly ChineseCandidate[], position?: number, positions?: Positions): number {
  const recent = history.slice(-6), last = recent.at(-1);
  let score = recent.reduce((sum,item,index) => sum+(item.template === form.template ? (index+1)*3 : 0),0);
  if (recent.length >= 3 && recent.at(-1)?.template === recent.at(-3)?.template && form.template === recent.at(-2)?.template) score += 60;
  if (position !== undefined) score += (positions?.get(position)?.get(form.template) ?? 0)*16;
  if (last?.lexemes.some(word => form.lexemes.includes(word))) score += /short-(owner|information|date)$/.test(form.template) ? 10 : 3;
  if (form.short && last?.short) {
    let run = 0;
    for (let i = recent.length-1; i >= 0 && recent[i].short; i--) run++;
    score += 12+Math.max(0,run-1)*24;
    if (stateShape(last) === stateShape(form)) score += 24;
  }
  return score;
}
function rememberPosition(positions: Positions, position: number, form: ChineseCandidate) {
  const counts = positions.get(position) ?? new Map<string,number>();
  counts.set(form.template,(counts.get(form.template) ?? 0)+1); positions.set(position,counts);
}
function sequencePenalty(items: readonly ChineseCandidate[]): number {
  let score = 0;
  for (let i = 1; i < items.length; i++) {
    if (items[i].template === items[i-1].template) return Infinity;
    if (items[i].lexemes[0] === items[i-1].lexemes[0]) score += 3;
    if (items[i].short && items[i-1].short) score += stateShape(items[i]) === stateShape(items[i-1]) ? 24 : 8;
    if (i >= 3 && items[i].template === items[i-2].template && items[i-1].template === items[i-3].template) score += 40;
  }
  return score;
}
function balancePositions(items: ChineseCandidate[], positions: Positions, previousTemplate?: string, nextTemplate?: string) {
  // Greedy construction can defer an obligatory common frame to the last
  // slot in every paragraph. Two bounded swap passes account for that future
  // positional cost without changing the selected resources or their sums.
  for (let pass = 0; pass < 2; pass++) {
    const oldSequence = sequencePenalty(items);
    let best: { a: number; b: number; delta: number } | undefined, examined = 0;
    for (let a = 0; a < items.length; a++) for (let b = a+1; b < items.length && examined < 128; b++,examined++) {
      const first = items[a], second = items[b];
      const at = (position: number, template: string) => positions.get(position)?.get(template) ?? 0;
      const positionDelta = at(a,second.template)+at(b,first.template)-at(a,first.template)-at(b,second.template)+2;
      [items[a],items[b]] = [second,first];
      const boundaryPenalty = items[0].template === previousTemplate || items.at(-1)!.template === nextTemplate ? Infinity : 0;
      const delta = positionDelta*16+sequencePenalty(items)-oldSequence+boundaryPenalty;
      [items[a],items[b]] = [first,second];
      if (delta < (best?.delta ?? 0)) best = { a,b,delta };
    }
    if (!best) break;
    const { a,b } = best, first = items[a], second = items[b];
    positions.get(a)!.set(first.template,positions.get(a)!.get(first.template)!-1);
    positions.get(b)!.set(second.template,positions.get(b)!.get(second.template)!-1);
    rememberPosition(positions,a,second); rememberPosition(positions,b,first);
    [items[a],items[b]] = [second,first];
  }
}
// Permute only the complete, already reserved forms. All sums and bases stay
// identical. The label-count lookahead prevents a locally attractive choice
// from trapping two identical templates at the end of a paragraph.
function spreadParagraphRhythm(paragraphs: ChineseCandidate[][]): ChineseCandidate[][] {
  if (paragraphs.length === 1) return paragraphs;
  const positions: Positions = new Map(), history: ChineseCandidate[] = [];
  return paragraphs.map((original,index) => {
    const previousTemplate = history.at(-1)?.template, nextTemplate = paragraphs[index+1]?.[0].template;
    const pending = [...original], ordered: ChineseCandidate[] = [], counts = new Map<string,number>();
    for (const form of pending) counts.set(form.template,(counts.get(form.template) ?? 0)+1);
    while (pending.length) {
      const left = pending.length-1;
      const choices = pending.map((form,index) => ({ form,index,score: rhythmPenalty(form,history,ordered.length,positions)
        +(form.template === history.at(-1)?.template ? 1000 : 0) }))
        .filter(({ form }) => form.template !== ordered.at(-1)?.template
          && (ordered.length !== 0 || form.template !== previousTemplate)
          && (left !== 0 || form.template !== nextTemplate) && [...counts].every(([template,n]) =>
          n-Number(template === form.template) <= (template === form.template ? Math.floor(left/2) : Math.ceil(left/2))))
        .sort((a,b) => a.score-b.score || a.index-b.index);
      if (!choices.length) {
        // The boundary-safe original is an exact witness. Undo only this
        // tentative style pass, then retain that witness without retrying seeds.
        for (let j = 0; j < ordered.length; j++) positions.get(j)!.set(ordered[j].template,positions.get(j)!.get(ordered[j].template)!-1);
        history.splice(history.length-ordered.length,ordered.length);
        for (let j = 0; j < original.length; j++) { rememberPosition(positions,j,original[j]); history.push(original[j]); }
        return original;
      }
      const next = choices[0]; pending.splice(next.index,1); counts.set(next.form.template,counts.get(next.form.template)!-1);
      rememberPosition(positions,ordered.length,next.form); ordered.push(next.form); history.push(next.form);
    }
    balancePositions(ordered,positions,previousTemplate,nextTemplate);
    history.splice(history.length-ordered.length,ordered.length,...ordered);
    return ordered;
  });
}
// Singleton paragraphs formerly inherited one witness template even when
// another equal-cost form was available in their own disjoint resource pool.
// Specialize only after boundary ordering; preserve both neighbour labels.
function varySingletonRhythm(paragraphs: ChineseCandidate[][], pools: ReadonlyMap<ChineseCandidate[],readonly ChineseCandidate[]>, unit: ChineseUnit) {
  const used = new Set(paragraphs.flat().map(form => form.baseId)), history: ChineseCandidate[] = [], positions: Positions = new Map();
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    if (paragraph.length === 1) {
      const original = paragraph[0], previous = paragraphs[i-1]?.at(-1), next = paragraphs[i+1]?.[0];
      const choices = (pools.get(paragraph) ?? []).filter(form => sizeOf(form,unit) === sizeOf(original,unit)
        && (!used.has(form.baseId) || form.baseId === original.baseId)
        && form.template !== previous?.template && form.template !== next?.template)
        .map((form,index) => ({ form,index,score:rhythmPenalty(form,history,0,positions) }))
        .sort((a,b) => a.score-b.score || a.index-b.index);
      if (choices.length) { used.delete(original.baseId); paragraph[0] = choices[0].form; used.add(paragraph[0].baseId); }
    }
    for (let j = 0; j < paragraph.length; j++) { rememberPosition(positions,j,paragraph[j]); history.push(paragraph[j]); }
  }
}
function orderNeutralParagraphs(paragraphs: ChineseCandidate[][]): ChineseCandidate[][] {
  // Every form is neutral and every paragraph has the same semantic family.
  // Reordering whole paragraphs therefore changes neither discourse roles nor
  // any count/resource. Start with frequent opening constructions so they do
  // not accumulate at the end (e.g. ten seven-word vs nine eight-word slots).
  for (let offset = 0; offset < paragraphs.length; offset++) {
    const pending = [...paragraphs.slice(offset),...paragraphs.slice(0,offset)], ordered: ChineseCandidate[][] = [];
    while (pending.length) {
      const last = ordered.at(-1)?.at(-1), counts = new Map<string,number>();
      for (const paragraph of pending) counts.set(paragraph[0].template,(counts.get(paragraph[0].template) ?? 0)+1);
      const ranked = pending.map((paragraph,index) => ({ paragraph,index }))
        .filter(({ paragraph }) => paragraph[0].template !== last?.template)
        .sort((a,b) => (counts.get(b.paragraph[0].template) ?? 0)-(counts.get(a.paragraph[0].template) ?? 0)
          || Number(a.paragraph[0].lexemes.some(word => last?.lexemes.includes(word)))-Number(b.paragraph[0].lexemes.some(word => last?.lexemes.includes(word))));
      if (!ranked.length) break;
      const next = ranked[0]; ordered.push(next.paragraph); pending.splice(next.index,1);
    }
    if (!pending.length) return ordered;
  }
  return paragraphs;
}
export function generateSimplifiedChinese({ mode, amount, paragraphs = 1, seed = Math.floor(Math.random()*0xffffffff) }: LanguageRequest): string {
  const settings = modeSettings[mode];
  if (!Number.isInteger(amount) || amount < settings.min || amount > settings.max) throw new Error(`Inserisci un numero intero tra ${settings.min} e ${settings.max}.`);
  if (mode !== "paragraphs" && (!Number.isInteger(paragraphs) || paragraphs < 1 || paragraphs > modeSettings.paragraphs.max)) throw new Error("Numero di paragrafi non valido.");
  const unit = mode === "paragraphs" ? "words" : mode;
  const count = mode === "paragraphs" ? amount : paragraphs;
  const target = mode === "paragraphs" ? amount*40 : mode === "characters" ? amount - 2 * (count - 1) : amount, random = randomFor(seed);
  const plan = planSimplifiedChinese(target,count,unit,random);
  if (!plan) throw new Error("Questa combinazione non è supportata dal corpus cinese canonico.");
  const used = new Set<string>(), full = new Set<string>(), templates = new Map<string,number>(), lexemes = new Map<string,number>();
  const history: ChineseCandidate[] = [];
  let previous: ChineseCandidate | undefined;
  const completed: ChineseCandidate[][] = [];
  for (const slot of plan) {
    const paragraph: ChineseCandidate[] = [];
    for (let i = 0; i < slot.items.length; i++) {
      const original = slot.items[i], next = slot.items[i+1], reserved = new Set(slot.items.slice(i+1).map(form => form.baseId));
      const alternatives = slot.pool.filter(form => sizeOf(form,unit) === sizeOf(original,unit) && !used.has(form.baseId) && !reserved.has(form.baseId)
        && (slot.items.length !== 1 || form.template === original.template)
        && form.template !== paragraph.at(-1)?.template && form.template !== next?.template);
      const differentTemplate = alternatives.filter(form => form.template !== previous?.template);
      const preferredTemplate = differentTemplate.length ? differentTemplate : alternatives;
      const differentLexeme = preferredTemplate.filter(form => !form.lexemes.some(word => previous?.lexemes.includes(word)));
      const preferred = differentLexeme.length ? differentLexeme : preferredTemplate;
      const ranked = preferred.map(form => ({ form, rank: (templates.get(form.template) ?? 0)*5
        + form.lexemes.reduce((n,word) => n+(lexemes.get(word) ?? 0)*3,0)
        + (form.template === previous?.template ? 1000 : 0)
        + (form.lexemes.some(word => previous?.lexemes.includes(word)) ? 100 : 0) + rhythmPenalty(form,history) + random()*4,
      })).sort((a,b) => a.rank-b.rank);
      const chosen = ranked[0]?.form ?? original;
      if (used.has(chosen.baseId) || full.has(chosen.text)) throw new Error("Duplicate Chinese planning resource.");
      used.add(chosen.baseId); full.add(chosen.text); paragraph.push(chosen); previous = chosen; history.push(chosen);
      templates.set(chosen.template,(templates.get(chosen.template) ?? 0)+1);
      for (const word of chosen.lexemes) lexemes.set(word,(lexemes.get(word) ?? 0)+1);
    }
    completed.push(paragraph);
  }
  const originalPools = new Map(completed.map((paragraph,index) => [paragraph,plan[index].pool] as const));
  const boundaryOrdered = orderNeutralParagraphs(completed);
  const ordered = spreadParagraphRhythm(boundaryOrdered);
  const pools = new Map(ordered.map((paragraph,index) => [paragraph,originalPools.get(boundaryOrdered[index])!] as const));
  varySingletonRhythm(ordered,pools,unit);
  const text = ordered.map(items => items.map(form => form.text).join("")).join("\n\n").normalize("NFC");
  const stats = simplifiedChineseStats(text);
  if (stats[mode] !== amount || stats.paragraphs !== count || !text.endsWith("。")) throw new Error("Chinese serialized count validation failed.");
  return text;
}
export const simplifiedChineseEngine: LanguageEngine = { generate: generateSimplifiedChinese, stats: simplifiedChineseStats };
