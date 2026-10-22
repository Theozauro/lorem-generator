// Global resource ownership makes paragraph reachability composable: every base
// belongs to exactly one slot. A suffix sum table therefore proves a complete
// output, not merely a sum that would reuse the same sentence in several slots.
export type WordMaterial = { base: string; topic: string; words: number; connector: string };
type Options<T> = Map<number, readonly T[]>;
type Slot<T> = { pool: T[]; options: Options<T> };
type Profile<T> = { slots: Slot<T>[]; suffix: Uint32Array[] };
export type WordPlan<T> = { pool: readonly T[]; items: readonly T[] }[];
const MAX_WORDS = 2000;
const MAX_PARAGRAPHS = 30;
const TOPICS = ["interface", "documents", "planning"];
const WIDTH = Math.ceil((MAX_WORDS + 1) / 32);
function has(bits: Uint32Array, amount: number) {
  return amount >= 0 && amount <= MAX_WORDS && !!(bits[amount >>> 5] & (1 << (amount & 31)));
}
function addShift(destination: Uint32Array, source: Uint32Array, shift: number) {
  const whole = shift >>> 5, part = shift & 31;
  for (let i = 0; i + whole < WIDTH; i++) {
    destination[i + whole] |= source[i] << part;
    if (part && i + whole + 1 < WIDTH) destination[i + whole + 1] |= source[i] >>> (32 - part);
  }
}

export function createWordPlanner<T extends WordMaterial>(
  inventory: readonly T[],
  makeOptions: (neutralPool: T[], maximum: number) => Options<T>,
) {
  const neutral = inventory.filter(item => !item.connector);
  const weather = neutral.filter(item => item.topic === "conditions" && item.words === 1);
  const ordinary = neutral.filter(item => item.topic !== "conditions");
  const shortest = [...neutral].sort((a, b) => a.words - b.words);
  const profiles = new Map<string, Profile<T>>();
  const ordinaryShortest = [...ordinary].sort((a, b) => a.words - b.words);
  function profile(count: number, balanced: boolean, ceiling: number): Profile<T> {
    const key = `${count}:${balanced}:${ceiling}`;
    const cached = profiles.get(key);
    if (cached) return cached;
    const families = TOPICS.map(topic => ordinary.filter(item => item.topic === topic).sort((a, b) => a.words - b.words));
    const anchors: T[] = [];
    if (balanced) {
      for (let i = 0; i < count; i++) anchors.push(families[i % TOPICS.length][Math.floor(i / TOPICS.length)]);
    } else {
      const offsets = [0, 0, 0];
      while (anchors.length < count) {
        const available = families.map((family, i) => ({ item: family[offsets[i]], i })).filter(entry => entry.item);
        available.sort((a, b) => a.item.words - b.item.words || offsets[a.i] - offsets[b.i] || a.i - b.i);
        const chosen = available[0];
        anchors.push(chosen.item); offsets[chosen.i]++;
      }
    }
    const pools = anchors.map(anchor => [anchor]);
    const owned = new Set(anchors.map(item => item.base));
    // Round-robin each length bucket separately. In particular, short and
    // eleven-word resources must not all end up in the same few paragraph slots.
    for (const topic of TOPICS) {
      const indices = anchors.flatMap((anchor, i) => anchor.topic === topic ? [i] : []);
      if (!indices.length) continue;
      const buckets = new Map<number, T[]>();
      for (const item of ordinary) if (item.topic === topic && !owned.has(item.base)) {
        const bucket = buckets.get(item.words) ?? []; bucket.push(item); buckets.set(item.words, bucket);
      }
      let cursor = 0;
      for (const [, bucket] of [...buckets].sort(([a], [b]) => a - b)) {
        for (const item of bucket) pools[indices[cursor++ % indices.length]].push(item);
      }
    }
    const maximum = Math.min(MAX_WORDS, Math.ceil(ceiling / count) + 40);
    const slots = pools.map(pool => {
      const bases = new Set(pool.map(item => item.base));
      return { pool: inventory.filter(item => bases.has(item.base)), options: makeOptions(pool, maximum) };
    });
    const suffix = Array.from({ length: count + 1 }, () => new Uint32Array(WIDTH));
    suffix[count][0] = 1;
    for (let i = count - 1; i >= 0; i--) for (const amount of slots[i].options.keys()) addShift(suffix[i], suffix[i + 1], amount);
    const result = { slots, suffix }; profiles.set(key, result); return result;
  }
  function valid(words: number, paragraphs: number) {
    return Number.isInteger(words) && words >= 1 && words <= MAX_WORDS
      && Number.isInteger(paragraphs) && paragraphs >= 1 && paragraphs <= Math.min(words, MAX_PARAGRAPHS);
  }
  function minimum(paragraphs: number) {
    // Every non-empty paragraph consumes at least one distinct complete base.
    return shortest.slice(0, paragraphs).reduce((sum, item) => sum + item.words, 0);
  }
  function find(words: number, paragraphs: number) {
    if (!valid(words, paragraphs) || words < minimum(paragraphs)) return null;
    for (let conditions = 0; conditions <= Math.min(weather.length, paragraphs); conditions++) {
      const count = paragraphs - conditions, target = words - conditions;
      if (!count) { if (!target) return { conditions, profile: null }; continue; }
      if (target < ordinaryShortest.slice(0, count).reduce((sum, item) => sum + item.words, 0)) continue;
      const ceiling = Math.min(MAX_WORDS, Math.max(128, 2 ** Math.ceil(Math.log2(words))));
      for (const balanced of [true, false]) {
        const candidate = profile(count, balanced, ceiling);
        if (has(candidate.suffix[0], target)) return { conditions, profile: candidate };
      }
    }
    return null;
  }
  function plan(words: number, paragraphs: number, random: () => number): WordPlan<T> | null {
    const found = find(words, paragraphs);
    if (!found) return null;
    const result: WordPlan<T> = [];
    let remaining = words - found.conditions;
    if (found.profile) {
      const { slots } = found.profile;
      let suffix = found.profile.suffix, low = 1, high = MAX_WORDS;
      // Balance is a soft objective. Tighten the budget band only when a
      // complete resource-disjoint plan still exists inside it.
      for (const deviation of [1, 2, 4, 8]) {
        const lower = Math.max(1, Math.floor(remaining / slots.length - deviation));
        const upper = Math.ceil(remaining / slots.length + deviation);
        const trial = Array.from({ length: slots.length + 1 }, () => new Uint32Array(WIDTH));
        trial[slots.length][0] = 1;
        for (let i = slots.length - 1; i >= 0; i--) for (const amount of slots[i].options.keys()) {
          if (amount >= lower && amount <= upper) addShift(trial[i], trial[i + 1], amount);
        }
        if (has(trial[0], remaining)) { suffix = trial; low = lower; high = upper; break; }
      }
      for (let i = 0; i < slots.length; i++) {
        const desired = remaining / (slots.length - i);
        const amounts = [...slots[i].options.keys()].filter(amount => amount >= low && amount <= high && has(suffix[i + 1], remaining - amount))
          .map(amount => ({ amount, rank: Math.abs(amount - desired) + random() * .5 }))
          .sort((a, b) => a.rank - b.rank);
        const amount = amounts[0].amount;
        result.push({ pool: slots[i].pool, items: slots[i].options.get(amount)! }); remaining -= amount;
      }
    }
    const shuffledWeather = [...weather];
    for (let i = shuffledWeather.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1)); [shuffledWeather[i], shuffledWeather[j]] = [shuffledWeather[j], shuffledWeather[i]];
    }
    for (const item of shuffledWeather.slice(0, found.conditions)) result.push({ pool: [item], items: [item] });
    return result;
  }
  return { canGenerate: (words: number, paragraphs: number) => !!find(words, paragraphs), plan, minimum };
}
