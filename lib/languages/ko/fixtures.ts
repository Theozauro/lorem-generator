import { countKoreanCharacters, countKoreanWords, koreanStats } from "./counting";
import { koreanEngine, canGenerateKoreanCharacters, canGenerateKoreanSentences, canGenerateKoreanWords } from "./engine";
import { objectParticle, subjectParticle, topicParticle } from "./data";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

export function runKoreanFixtures() {
  assert(topicParticle({ id: "vowel", text: "서비스", batchim: "vowel" }) === "는", "은/는 vowel form");
  assert(topicParticle({ id: "consonant", text: "화면", batchim: "consonant" }) === "은", "은/는 consonant form");
  assert(subjectParticle({ id: "vowel", text: "서비스", batchim: "vowel" }) === "가", "이/가 vowel form");
  assert(subjectParticle({ id: "consonant", text: "파일", batchim: "rieul" }) === "이", "이/가 rieul form");
  assert(objectParticle({ id: "vowel", text: "데이터", batchim: "vowel" }) === "를", "을/를 vowel form");
  assert(objectParticle({ id: "consonant", text: "파일", batchim: "rieul" }) === "을", "을/를 rieul form");
  assert(objectParticle({ id: "consonant", text: "기록", batchim: "consonant" }) === "을", "을/를 consonant form");
  assert(countKoreanWords("화면은 변경 사항을 확인합니다.") === 4, "eojeol word count");
  assert(countKoreanCharacters("가") === countKoreanCharacters("가"), "NFC/NFD grapheme equivalence");
  assert(canGenerateKoreanWords({ words: 100, paragraphs: 3 }), "representative word/paragraph feasibility");
  assert(!canGenerateKoreanWords({ words: 2, paragraphs: 1 }), "short complete sentence should be unsupported");
  assert(canGenerateKoreanWords({ words: 3, paragraphs: 1 }), "short complete sentence should be supported");
  assert(canGenerateKoreanWords({ words: 90, paragraphs: 30 }), "minimum 30-paragraph combination");
  assert(canGenerateKoreanSentences(8), "sentence mode feasibility");
  const words = koreanEngine.generate({ mode: "words", amount: 100, paragraphs: 3, seed: 4182 });
  const wordStats = koreanStats(words);
  assert(wordStats.words === 100 && wordStats.paragraphs === 3, "exact word/paragraph generation");
  assert(!/[ \t]{2,}|\s$/u.test(words) && !/\n{3,}/u.test(words), "word mode spacing");
  const sentence = koreanEngine.generate({ mode: "sentences", amount: 8, seed: 4183 });
  assert(koreanStats(sentence).sentences === 8, "exact sentence generation");
  const charsLength = countKoreanCharacters(sentence);
  assert(canGenerateKoreanCharacters(charsLength), "generated character length should be feasible");
  const chars = koreanEngine.generate({ mode: "characters", amount: charsLength, seed: 4184 });
  assert(countKoreanCharacters(chars) === charsLength, "exact character generation");
  return { words: wordStats.words, paragraphs: wordStats.paragraphs, sentences: 8, characters: charsLength };
}
