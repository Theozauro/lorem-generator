export type Unit = "paragraphs" | "words" | "characters" | "sentences";
export type SentenceLength = "short" | "mixed" | "long";

export const classic = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const vocabulary = (`sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum integer posuere erat a ante venenatis dapibus posuere velit aliquet curabitur blandit tempus porttitor donec ullamcorper nulla non metus auctor fringilla praesent commodo cursus magna vel scelerisque nisl consectetur et vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor maecenas sed diam eget risus varius blandit sit amet non magna aenean lacinia bibendum nulla sed consectetur`).split(" ");
const opening = classic.replace(/[.,]/g, "").toLowerCase().split(" ");

function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function layoutParagraph(wordCount: number, start: boolean, random: () => number, sentenceLength: SentenceLength = "mixed") {
  const sentences: string[] = [];
  let remaining = wordCount;
  if (start && remaining >= opening.length) {
    sentences.push(classic);
    remaining -= opening.length;
  } else if (start) {
    sentences.push(opening.slice(0, remaining).join(" ").replace(/^l/, "L") + ".");
    remaining = 0;
  }
  while (remaining > 0) {
    const ranges = { short: [5, 11], mixed: [9, 20], long: [16, 30] } as const;
    const [minimum, maximum] = ranges[sentenceLength];
    const length = Math.min(remaining, minimum + Math.floor(random() * (maximum - minimum + 1)));
    const words = Array.from({ length }, () => vocabulary[Math.floor(random() * vocabulary.length)]);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    if (length > 10 && random() > .55) words[Math.floor(length / 2)] += ",";
    sentences.push(words.join(" ") + ".");
    remaining -= length;
  }
  return sentences.join(" ");
}

export function generateLayout(words: number, paragraphs: number, start = true, random: () => number = Math.random, sentenceLength: SentenceLength = "mixed"): string {
  const wordCount = Math.max(1, Math.min(4000, Math.floor(words || 1)));
  const paragraphCount = Math.max(1, Math.min(100, wordCount, Math.floor(paragraphs || 1)));
  const weights = Array.from({ length: paragraphCount }, () => .7 + random() * .6);
  const weightTotal = weights.reduce((sum, weight) => sum + weight, 0);
  const remainder = wordCount - paragraphCount;
  const shares = weights.map(weight => remainder * weight / weightTotal);
  const counts = shares.map(share => 1 + Math.floor(share));
  const unallocated = wordCount - counts.reduce((sum, count) => sum + count, 0);
  const fractionalOrder = shares.map((share, index) => ({ index, fraction: share % 1 }))
    .sort((a, b) => b.fraction - a.fraction);
  for (let i = 0; i < unallocated; i++) counts[fractionalOrder[i % paragraphCount].index]++;
  return counts.map((count, index) => layoutParagraph(count, start && index === 0, random, sentenceLength)).join("\n\n");
}

export const initialLayoutText = generateLayout(250, 3, true, seededRandom(2026));

function pick<T>(items: T[]): T { return items[Math.floor(Math.random() * items.length)]; }
function nextWord() { return pick(vocabulary); }
function sentence(wordCount = 10 + Math.floor(Math.random() * 11)) {
  const words = Array.from({ length: wordCount }, nextWord);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  if (words.length > 10 && Math.random() > .45) words[Math.floor(words.length / 2)] += ",";
  return words.join(" ") + ".";
}
function paragraph() { return Array.from({ length: 3 + Math.floor(Math.random() * 4) }, () => sentence()).join(" "); }
function withOpening(text: string, start: boolean) { return start ? `${classic} ${text}`.trim() : text; }

export function generateLorem(unit: Unit, amount: number, start = true): string {
  const count = Math.max(1, Math.min(Math.floor(amount || 1), unit === "characters" ? 20000 : unit === "words" ? 4000 : 100));
  if (unit === "paragraphs") {
    const paragraphs = Array.from({ length: count }, paragraph);
    if (start) paragraphs[0] = withOpening(paragraphs[0], true);
    return paragraphs.join("\n\n");
  }
  if (unit === "sentences") {
    const sentences = Array.from({ length: count }, () => sentence());
    if (start) sentences[0] = classic;
    const groups: string[] = [];
    for (let i = 0; i < sentences.length; i += 4) groups.push(sentences.slice(i, i + 4).join(" "));
    return groups.join("\n\n");
  }
  if (unit === "words") {
    const sentences: string[] = [];
    let remaining = count;
    if (start && count >= opening.length) { sentences.push(classic); remaining -= opening.length; }
    while (remaining > 0) {
      const length = Math.min(remaining, 9 + Math.floor(Math.random() * 10));
      const words = Array.from({ length }, nextWord);
      words[0] = words[0][0].toUpperCase() + words[0].slice(1);
      sentences.push(words.join(" ") + ".");
      remaining -= length;
    }
    const groups: string[] = [];
    for (let i = 0; i < sentences.length; i += 4) groups.push(sentences.slice(i, i + 4).join(" "));
    return groups.join("\n\n");
  }
  // Choose complete words using reachable remaining lengths, preserving the exact target.
  const short: Record<number, string> = { 1: "A", 2: "Ut", 3: "Sed", 4: "Sed.", 5: "Lorem", 6: "Lorem.", 7: "Aliquam", 8: "Aliquam." };
  if (count <= 8) return short[count];
  let result = start && count >= classic.length ? classic : start ? "Lorem" : "Aliquam";
  const remaining = count - result.length;
  const reachable = Array(remaining + 1).fill(false);
  reachable[0] = true;
  reachable[1] = true; // Final full stop.
  for (let n = 2; n <= remaining; n++) reachable[n] = vocabulary.some(w => n >= w.length + 1 && reachable[n - w.length - 1]);
  let left = remaining;
  while (left > 1) {
    const options = vocabulary.filter(w => left >= w.length + 1 && reachable[left - w.length - 1]);
    if (!options.length) break;
    const word = pick(options);
    result += " " + word;
    left -= word.length + 1;
  }
  if (left === 1) result += ".";
  return result;
}

export function resizeLorem(text: string, unit: Unit, oldAmount: number, newAmount: number, start: boolean): string {
  if (newAmount === oldAmount) return text;
  if (unit === "paragraphs") {
    const paragraphs = text.split("\n\n");
    return newAmount < oldAmount
      ? paragraphs.slice(0, newAmount).join("\n\n")
      : [...paragraphs, ...generateLorem("paragraphs", newAmount - oldAmount, false).split("\n\n")].join("\n\n");
  }
  if (unit === "sentences") {
    const matches = [...text.matchAll(/[.!?](?=\s|$)/g)];
    if (newAmount < oldAmount) return text.slice(0, (matches[newAmount - 1]?.index ?? text.length) + 1).trimEnd();
    const added = generateLorem("sentences", newAmount - oldAmount, false).match(/[^.!?]+[.!?]/g) ?? [];
    return added.reduce((current, sentence, index) =>
      current + ((oldAmount + index) % 4 === 0 ? "\n\n" : " ") + sentence.trim(), text);
  }
  if (unit === "words") {
    if (newAmount > oldAmount) return text + "\n\n" + generateLorem("words", newAmount - oldAmount, false);
    const words = [...text.matchAll(/\S+/g)];
    const last = words[newAmount - 1];
    if (!last) return generateLorem(unit, newAmount, start);
    const end = (last.index ?? 0) + last[0].length;
    const trimmed = text.slice(0, end).trimEnd();
    return /[.!?]$/.test(trimmed) ? trimmed : trimmed + ".";
  }
  if (newAmount > oldAmount && newAmount - oldAmount > 8) {
    const additional = generateLorem("characters", newAmount - oldAmount - 1, false);
    if (additional.length === newAmount - oldAmount - 1) return text + " " + additional;
  }
  return generateLorem(unit, newAmount, start);
}

export function stats(text: string) {
  const trimmed = text.trim();
  return {
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    sentences: (trimmed.match(/[.!?](?=\s|$)/g) || []).length,
    paragraphs: trimmed ? trimmed.split(/\n\s*\n/).length : 0,
  };
}
