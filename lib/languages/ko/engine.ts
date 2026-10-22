import { modeSettings, type LanguageEngine, type LanguageRequest } from "../types";
import { countKoreanCharacters, countKoreanWords, parseKoreanOutput, koreanStats } from "./counting";
import { canPlanKoreanCharacters, canPlanKoreanWords, candidatesForCost, koreanCandidates, koreanPlanSentenceCounts, shuffleKoreanForms, type KoreanCandidate } from "./word-planner";

function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  state = Math.imul(state ^ (state >>> 16), 0x21f0aaad);
  state = Math.imul(state ^ (state >>> 15), 0x735a2d97);
  state = (state ^ (state >>> 15)) >>> 0;
  return () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 4294967296; };
}

export function canGenerateKoreanWords({ words, paragraphs }: { words: number; paragraphs: number }): boolean {
  return canPlanKoreanWords(words, paragraphs);
}
export function canGenerateKoreanCharacters(amount: number, paragraphs = 1): boolean {
  return Number.isInteger(amount) && amount >= modeSettings.characters.min && amount <= modeSettings.characters.max
    && canPlanKoreanCharacters(amount, paragraphs);
}
export function canGenerateKoreanSentences(amount: number, paragraphs = 1): boolean {
  return Number.isInteger(amount) && amount >= modeSettings.sentences.min && amount <= modeSettings.sentences.max
    && Number.isInteger(paragraphs) && paragraphs >= 1 && paragraphs <= Math.min(modeSettings.paragraphs.max, amount)
    && amount <= koreanCandidates().length;
}
export function canGenerateKoreanParagraphs(amount: number): boolean {
  return Number.isInteger(amount) && amount >= modeSettings.paragraphs.min && amount <= modeSettings.paragraphs.max
    && canPlanKoreanWords(amount * 40, amount);
}

function chooseForms(costs: number[], unit: "words" | "characters", random: () => number) {
  const recentlyUsedTemplates: string[] = [];
  const pools = new Map<number, { forms: KoreanCandidate[]; cursor: number }>();
  for (const cost of new Set(costs)) pools.set(cost, { forms: shuffleKoreanForms([...candidatesForCost(unit, cost)], random), cursor: 0 });
  return shuffleKoreanForms(costs, random).map(cost => {
    const pool = pools.get(cost)!;
    const recent = recentlyUsedTemplates.slice(-4);
    let selectedIndex = -1;
    for (let index = pool.cursor; index < pool.forms.length; index++) {
      if (!recent.includes(pool.forms[index].template)) { selectedIndex = index; break; }
    }
    if (selectedIndex < 0) selectedIndex = pool.cursor;
    if (selectedIndex >= pool.forms.length) throw new Error("한국어 문장 재료가 부족합니다.");
    [pool.forms[pool.cursor], pool.forms[selectedIndex]] = [pool.forms[selectedIndex], pool.forms[pool.cursor]];
    const selected = pool.forms[pool.cursor++];
    recentlyUsedTemplates.push(selected.template);
    return selected;
  });
}

function orderForRhythm(forms: readonly KoreanCandidate[]): KoreanCandidate[] {
  const pending = [...forms];
  const ordered: KoreanCandidate[] = [];
  const key = (form: KoreanCandidate) => ({
    subject: form.id.split(":")[1],
    template: form.template,
    predicate: form.template.split(":").at(-1) ?? "",
    opening: form.template.startsWith("context:") ? form.template.slice("context:".length) : "",
  });

  while (pending.length) {
    let bestIndex = 0;
    let bestScore = Infinity;
    for (let index = 0; index < pending.length; index++) {
      const candidate = pending[index];
      const current = key(candidate);
      const previous = ordered.at(-1);
      const beforePrevious = ordered.at(-2);
      const beforeThat = ordered.at(-3);
      let score = 0;

      if (previous) {
        const previousKey = key(previous);
        if (current.subject === previousKey.subject) score += 4;
        if (current.predicate === previousKey.predicate) score += 3;
        if (current.template === previousKey.template) score += 5;
        if (current.opening && current.opening === previousKey.opening) score += 5;
      }
      if (previous && beforePrevious) {
        const previousKey = key(previous);
        const beforePreviousKey = key(beforePrevious);
        if (current.subject === beforePreviousKey.subject && current.subject !== previousKey.subject) score += 6;
        if (current.template === beforePreviousKey.template && current.template !== previousKey.template) score += 6;
      }
      if (previous && beforePrevious && beforeThat && candidate.template === beforePrevious.template && beforeThat.template === previous.template) score += 4;

      // Keep ties stable for a given seeded selection; ordering never changes the selected resources.
      score += index * 1e-7;
      if (score < bestScore) {
        bestIndex = index;
        bestScore = score;
      }
    }
    ordered.push(pending.splice(bestIndex, 1)[0]);
  }
  return ordered;
}

function distribute(forms: ReturnType<typeof chooseForms>, paragraphs: number, random: () => number) {
  if (paragraphs < 1 || forms.length < paragraphs) return null;
  const buckets = Array.from({ length: paragraphs }, () => [] as typeof forms);
  const totals = Array.from({ length: paragraphs }, () => 0);
  const ordered = shuffleKoreanForms(forms, random);
  for (let index = 0; index < paragraphs; index++) {
    buckets[index].push(ordered[index]);
    totals[index] += ordered[index].words;
  }
  for (const sentence of ordered.slice(paragraphs)) {
    const minimum = Math.min(...totals);
    const choices = totals.map((total, index) => ({ total, index })).filter(item => item.total === minimum);
    const { index } = choices[Math.floor(random() * choices.length)];
    buckets[index].push(sentence);
    totals[index] += sentence.words;
  }
  for (let index = 0; index < buckets.length; index++) {
    buckets[index] = orderForRhythm(buckets[index]);
  }
  return buckets;
}

export function generateKorean({ mode, amount, paragraphs = 1, seed = Math.floor(Math.random() * 0xffffffff) }: LanguageRequest): string {
  const settings = modeSettings[mode];
  if (!Number.isInteger(amount) || amount < settings.min || amount > settings.max) throw new Error(`유효한 정수를 입력해 주세요 (${settings.min}–${settings.max}).`);
  const random = seededRandom(seed);
  let result: string;

  if (mode === "sentences") {
    if (!canGenerateKoreanSentences(amount, paragraphs)) throw new Error("요청한 문장 수와 문단 수를 중복 없이 만들 수 없습니다.");
    const pool = shuffleKoreanForms([...koreanCandidates()], random);
    const selected: typeof pool = [];
    const usedTemplates = new Map<string, number>();
    const usedEndings = new Map<string, number>();
    while (selected.length < amount) {
      const recent = selected.slice(-5).map(form => form.template);
      let selectedIndex = 0, selectedScore = Infinity;
      for (let index = 0; index < pool.length; index++) {
        const form = pool[index], ending = form.text.match(/[^ ]+\.$/u)?.[0] ?? "";
        const score = (usedTemplates.get(form.template) ?? 0) * 8 + (usedEndings.get(ending) ?? 0) * 3
          + (recent.includes(form.template) ? 100 : 0) + random();
        if (score < selectedScore) { selectedScore = score; selectedIndex = index; }
      }
      const [form] = pool.splice(selectedIndex, 1);
      selected.push(form);
      usedTemplates.set(form.template, (usedTemplates.get(form.template) ?? 0) + 1);
      const ending = form.text.match(/[^ ]+\.$/u)?.[0] ?? "";
      usedEndings.set(ending, (usedEndings.get(ending) ?? 0) + 1);
    }
    const groups = distribute(selected, paragraphs, random);
    if (!groups) throw new Error("각 문단에 문장을 배정할 수 없습니다.");
    result = groups.map(group => group.map(form => form.text).join(" ")).join("\n\n");
  } else if (mode === "characters") {
    if (!canGenerateKoreanCharacters(amount, paragraphs)) throw new Error("이 글자 수와 문단 수는 완전한 한국어 문장으로 만들 수 없습니다.");
    const plannerAmount = amount - paragraphs + 1;
    const costs = koreanPlanSentenceCounts("characters", plannerAmount, paragraphs, Math.max(paragraphs, Math.round(amount / 40)));
    if (!costs) throw new Error("이 글자 수는 완전한 한국어 문장으로 만들 수 없습니다.");
    const groups = distribute(chooseForms(costs, "characters", random), paragraphs, random);
    if (!groups) throw new Error("각 문단에 문장을 배정할 수 없습니다.");
    result = groups.map(group => group.map(form => form.text).join(" ")).join("\n\n");
  } else {
    const targetWords = mode === "paragraphs" ? amount * 40 : amount;
    const paragraphCount = mode === "paragraphs" ? amount : paragraphs;
    if (!Number.isInteger(paragraphCount) || paragraphCount < 1 || paragraphCount > modeSettings.paragraphs.max || !canPlanKoreanWords(targetWords, paragraphCount)) {
      throw new Error("이 단어 수와 문단 수 조합은 현재 한국어 문장 자료로 만들 수 없습니다.");
    }
    const costs = koreanPlanSentenceCounts("words", targetWords, paragraphCount, Math.max(paragraphCount, Math.round(targetWords / 7)));
    if (!costs) throw new Error("정확한 한국어 문장 구성을 찾을 수 없습니다.");
    const selected = chooseForms(costs, "words", random);
    const groups = distribute(selected, paragraphCount, random);
    if (!groups) throw new Error("각 문단에 문장을 배정할 수 없습니다.");
    result = groups.map(group => group.map(form => form.text).join(" ")).join("\n\n");
  }

  const parsed = parseKoreanOutput(result);
  const sentenceCount = parsed.reduce((total, paragraph) => total + paragraph.length, 0);
  const expected = amount;
  const actual = mode === "characters" ? countKoreanCharacters(result)
    : mode === "sentences" ? sentenceCount
    : countKoreanWords(result);
  if (actual !== expected) throw new Error("한국어 결과의 최종 개수 확인에 실패했습니다.");
  if (mode === "words" && parsed.length !== paragraphs) throw new Error("한국어 문단 수 확인에 실패했습니다.");
  if (mode === "paragraphs" && parsed.length !== amount) throw new Error("한국어 문단 수 확인에 실패했습니다.");
  if ((mode === "characters" || mode === "sentences") && parsed.length !== paragraphs) throw new Error("한국어 문단 수 확인에 실패했습니다.");
  if (new Set(parsed.flat().map(sentence => sentence.text)).size !== sentenceCount) throw new Error("중복된 한국어 문장이 있습니다.");
  return result.normalize("NFC");
}

export const koreanEngine: LanguageEngine = { generate: generateKorean, stats: koreanStats };
