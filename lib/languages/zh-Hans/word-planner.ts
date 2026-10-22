import { modeSettings } from "../types";
import { chineseFamilies, type ChineseFamily, type ChineseForm } from "./data";
import { canonicalChineseCorpus, countSimplifiedChineseCharacters } from "./counting";

export type ChineseCandidate = ChineseForm & { characters: number };
export type ChineseUnit = "words" | "characters" | "sentences";
type Witness = { prefixLength: number; tail: ChineseCandidate[] };
type Slot = { pool: ChineseCandidate[]; prefix: ChineseCandidate[]; options: Map<number,Witness> };
type Profile = { family: ChineseFamily; slots: Slot[]; suffix: Uint32Array[] };
export type ChinesePlan = { pool: readonly ChineseCandidate[]; items: readonly ChineseCandidate[] }[];
let inventory: ChineseCandidate[] | undefined;
const profiles = new Map<string,Profile>();
const reachability = new Map<string,Uint32Array>();
const resources = new Map<string,{ material: ChineseCandidate[]; minimum: number[] }>();
const MAX_CACHED_PROFILES = 9;
export function chineseCandidates(): readonly ChineseCandidate[] {
  return inventory ??= [...canonicalChineseCorpus().values()].map(form => ({ ...form, characters: countSimplifiedChineseCharacters(form.text) }));
}
const cost = (form: ChineseCandidate, unit: ChineseUnit) => unit === "words" ? form.wordCount : unit === "characters" ? form.characters : 1;
function familyResources(family: ChineseFamily, unit: ChineseUnit) {
  const key = `${family}:${unit}`, cached = resources.get(key);
  if (cached) return cached;
  const material = chineseCandidates().filter(form => form.family === family);
  const cheapest = material.map(form => cost(form,unit)).sort((a,b) => a-b), minimum = [0];
  for (let i = 0; i < modeSettings.paragraphs.max; i++) minimum.push(minimum[i]+cheapest[i]);
  const result = { material, minimum }; resources.set(key,result); return result;
}
function has(bits: Uint32Array, value: number, maximum: number): boolean {
  return value >= 0 && value <= maximum && !!(bits[value >>> 5] & (1 << (value & 31)));
}
function shiftInto(target: Uint32Array, source: Uint32Array, shift: number) {
  const whole = shift >>> 5, part = shift & 31;
  for (let i = 0; i + whole < target.length; i++) {
    target[i + whole] |= source[i] << part;
    if (part && i + whole + 1 < target.length) target[i + whole + 1] |= source[i] >>> (32-part);
  }
}
function paragraphOptions(pool: ChineseCandidate[], unit: ChineseUnit, maximum: number): Slot {
  const prefix: ChineseCandidate[] = [], used = new Set<string>(), options = new Map<number,Witness>();
  const templates = new Map<string,number>(), lexemes = new Map<string,number>();
  let total = 0;
  const save = (amount: number, tail: ChineseCandidate[]) => {
    if (amount > 0 && amount <= maximum && !options.has(amount)) options.set(amount,{ prefixLength: prefix.length, tail });
  };
  while (total <= maximum) {
    save(total,[]);
    const last = prefix.at(-1);
    const available = pool.filter(form => !used.has(form.baseId) && form.template !== last?.template && total + cost(form,unit) <= maximum);
    const buckets = new Map<number,ChineseCandidate[]>();
    for (const form of available) {
      const size = cost(form,unit), bucket = buckets.get(size) ?? [];
      bucket.push(form); buckets.set(size,bucket); save(total+size,[form]);
    }
    for (const [firstSize,firsts] of buckets) for (const [secondSize,seconds] of buckets) {
      const amount = total+firstSize+secondSize;
      if (amount > maximum || options.has(amount)) continue;
      let pair: ChineseCandidate[] | undefined;
      for (const first of firsts) {
        const second = seconds.find(form => form.baseId !== first.baseId && form.template !== first.template);
        if (second) { pair = [first,second]; break; }
      }
      if (pair) save(amount,pair);
    }
    // One deterministic bulk path plus complete one/two-sentence tails.
    // Witnesses share the prefix instead of duplicating long arrays per sum.
    const ranked = available.filter(form => !form.short).map((form,index) => ({ form, rank:
      (templates.get(form.template) ?? 0)*5 + form.lexemes.reduce((n,word) => n+(lexemes.get(word) ?? 0)*4,0)
      + (prefix.slice(-3).some(item => item.template === form.template) ? 15 : 0)
      + (last?.lexemes.some(word => form.lexemes.includes(word)) ? 24 : 0) + index/pool.length,
    })).sort((a,b) => a.rank-b.rank);
    const next = ranked[0]?.form;
    if (!next) break;
    prefix.push(next); used.add(next.baseId); total += cost(next,unit);
    templates.set(next.template,(templates.get(next.template) ?? 0)+1);
    for (const word of next.lexemes) lexemes.set(word,(lexemes.get(word) ?? 0)+1);
  }
  return { pool, prefix, options };
}
function profile(family: ChineseFamily, count: number, unit: ChineseUnit): Profile {
  const key = `${family}:${count}:${unit}`, cached = profiles.get(key);
  if (cached) { profiles.delete(key); profiles.set(key,cached); return cached; }
  const maximum = modeSettings[unit].max, { material } = familyResources(family,unit);
  const ordered = [...material].sort((a,b) => cost(a,unit)-cost(b,unit));
  const anchors: ChineseCandidate[] = [], owned = new Set<string>();
  const frequency = new Map<string,number>();
  for (let i = 0; i < count; i++) {
    const cheapest = ordered.find(form => !owned.has(form.baseId))!;
    const sameSize = ordered.filter(form => !owned.has(form.baseId) && cost(form,unit) === cost(cheapest,unit));
    sameSize.sort((a,b) => (frequency.get(a.template) ?? 0)-(frequency.get(b.template) ?? 0)
      || Number(a.lexemes[0] === anchors.at(-1)?.lexemes[0])-Number(b.lexemes[0] === anchors.at(-1)?.lexemes[0]));
    const chosen = sameSize[0]; anchors.push(chosen); owned.add(chosen.baseId);
    frequency.set(chosen.template,(frequency.get(chosen.template) ?? 0)+1);
  }
  const pools = anchors.map(anchor => [anchor]);
  const buckets = new Map<string,ChineseCandidate[]>();
  for (const form of material) if (!owned.has(form.baseId)) {
    const k = `${cost(form,unit)}:${form.template}`, bucket = buckets.get(k) ?? [];
    bucket.push(form); buckets.set(k,bucket);
  }
  let offset = 0;
  for (const bucket of buckets.values()) {
    for (let i = 0; i < bucket.length; i++) pools[(i+offset)%count].push(bucket[i]);
    offset = (offset+1)%count;
  }
  const largest = Math.max(...material.map(form => cost(form,unit)));
  const cap = Math.min(maximum,Math.ceil(maximum/count)+2*largest);
  const slots = pools.map(pool => paragraphOptions(pool,unit,cap));
  const suffix = Array.from({ length: count+1 },() => new Uint32Array(Math.ceil((maximum+1)/32)));
  suffix[count][0] = 1;
  for (let i = count-1; i >= 0; i--) for (const amount of slots[i].options.keys()) shiftInto(suffix[i],suffix[i+1],amount);
  const result = { family, slots, suffix }; profiles.set(key,result);
  reachability.set(key,suffix[0]);
  if (profiles.size > MAX_CACHED_PROFILES) profiles.delete(profiles.keys().next().value!);
  return result;
}
function feasible(amount: number, paragraphs: number, unit: ChineseUnit): ChineseFamily[] {
  const settings = modeSettings[unit];
  const minimum = unit === "characters" ? 1 : settings.min;
  if (!Number.isInteger(amount) || amount < minimum || amount > settings.max || !Number.isInteger(paragraphs)
    || paragraphs < 1 || paragraphs > modeSettings.paragraphs.max) return [];
  const found: ChineseFamily[] = [];
  for (const family of chineseFamilies) {
    if (amount < familyResources(family,unit).minimum[paragraphs]) continue;
    const key = `${family}:${paragraphs}:${unit}`;
    const bits = reachability.get(key) ?? profile(family,paragraphs,unit).suffix[0];
    if (has(bits,amount,settings.max)) found.push(family);
  }
  return found;
}
export function canPlanSimplifiedChinese(amount: number, paragraphs: number, unit: ChineseUnit): boolean {
  return feasible(amount,paragraphs,unit).length > 0;
}
export function planSimplifiedChinese(amount: number, paragraphs: number, unit: ChineseUnit, random: () => number): ChinesePlan | null {
  const choices = feasible(amount,paragraphs,unit);
  if (!choices.length) return null;
  const selected = profile(choices[Math.floor(random()*choices.length)],paragraphs,unit), maximum = modeSettings[unit].max;
  let suffix = selected.suffix, lower = 1;
  let upper: number = maximum;
  // Prefer a balanced band only if the exact global sum remains reachable.
  if (paragraphs > 1) for (const deviation of [1,2,4,8,16]) {
    const lo = Math.max(1,Math.floor(amount/paragraphs-deviation)), hi = Math.ceil(amount/paragraphs+deviation);
    const trial = Array.from({ length: paragraphs+1 },() => new Uint32Array(suffix[0].length)); trial[paragraphs][0] = 1;
    for (let i = paragraphs-1; i >= 0; i--) for (const size of selected.slots[i].options.keys()) if (size >= lo && size <= hi) shiftInto(trial[i],trial[i+1],size);
    if (has(trial[0],amount,maximum)) { suffix = trial; lower = lo; upper = hi; break; }
  }
  let remaining = amount;
  let previousTemplate: string | undefined;
  return selected.slots.map((slot,index) => {
    const desired = remaining/(paragraphs-index);
    const sizes = [...slot.options.keys()].filter(size => size >= lower && size <= upper && has(suffix[index+1],remaining-size,maximum))
      .map(size => {
        const witness = slot.options.get(size)!;
        const first = witness.prefixLength ? slot.prefix[0] : witness.tail[0];
        const last = witness.tail.at(-1) ?? slot.prefix[witness.prefixLength-1];
        let trappedEnding = false;
        if (index === paragraphs-2) {
          const nextSlot = selected.slots[index+1], nextWitness = nextSlot.options.get(remaining-size)!;
          const nextItems = [...nextSlot.prefix.slice(0,nextWitness.prefixLength),...nextWitness.tail];
          const reserved = new Set(nextItems.slice(1).map(form => form.baseId));
          trappedEnding = nextItems.length === 1 ? nextItems[0].template === last.template
            : !nextSlot.pool.some(form => cost(form,unit) === cost(nextItems[0],unit)
              && form.template !== last.template && form.template !== nextItems[1]?.template && !reserved.has(form.baseId));
        }
        return { size, rank: Math.abs(size-desired)+(first.template === previousTemplate ? 20 : 0)+(trappedEnding ? 100 : 0)+random()*.75 };
      }).sort((a,b) => a.rank-b.rank);
    const size = sizes[0].size, witness = slot.options.get(size)!; remaining -= size;
    const items = [...slot.prefix.slice(0,witness.prefixLength),...witness.tail];
    previousTemplate = items.at(-1)?.template;
    return { pool: slot.pool, items };
  });
}
