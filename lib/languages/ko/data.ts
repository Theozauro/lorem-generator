/**
 * Korean source material for the local Languages prototype.
 * Sentences are assembled only from reviewed, typed slots: subjects and objects
 * carry the final-consonant class needed for particle selection, while each
 * predicate is an authored formal-polite form. No general conjugator is used.
 */
export type BatchimClass = "vowel" | "consonant" | "rieul";
export type KoreanNoun = { id: string; text: string; batchim: BatchimClass };
export type KoreanSentence = {
  id: string;
  template: string;
  family: string;
  text: string;
};

const subjects: KoreanNoun[] = [
  { id: "system", text: "시스템", batchim: "consonant" },
  { id: "file", text: "파일", batchim: "rieul" },
  { id: "service", text: "서비스", batchim: "vowel" },
  { id: "screen", text: "화면", batchim: "consonant" },
  { id: "dashboard", text: "대시보드", batchim: "vowel" },
  { id: "report", text: "보고서", batchim: "vowel" },
  { id: "data", text: "데이터", batchim: "vowel" },
  { id: "setting", text: "설정", batchim: "consonant" },
  { id: "schedule", text: "일정", batchim: "consonant" },
  { id: "record", text: "기록", batchim: "consonant" },
  { id: "content", text: "콘텐츠", batchim: "vowel" },
  { id: "request", text: "요청", batchim: "consonant" },
  { id: "team", text: "팀", batchim: "consonant" },
  { id: "workflow", text: "작업 흐름", batchim: "consonant" },
  { id: "result", text: "결과", batchim: "vowel" },
  { id: "notification", text: "알림", batchim: "consonant" },
  { id: "item", text: "항목", batchim: "consonant" },
  { id: "form", text: "양식", batchim: "consonant" },
  { id: "project", text: "프로젝트", batchim: "vowel" },
  { id: "owner", text: "담당자", batchim: "vowel" },
  { id: "user", text: "사용자", batchim: "vowel" },
  { id: "tool", text: "도구", batchim: "vowel" },
  { id: "platform", text: "플랫폼", batchim: "consonant" },
];
const actors = subjects.filter(noun => ["system", "service", "dashboard", "team", "project", "owner", "user", "tool", "platform"].includes(noun.id));
const stateSubjects = subjects.filter(noun => noun.id !== "team" && noun.id !== "owner" && noun.id !== "user" && noun.id !== "tool" && noun.id !== "platform");
const shortStateSubjects = subjects.filter(noun => ["data", "schedule", "record", "content", "request", "result", "notification", "item", "form", "setting", "file"].includes(noun.id));

const objects: KoreanNoun[] = [
  { id: "change", text: "변경 사항", batchim: "consonant" },
  { id: "input", text: "입력값", batchim: "consonant" },
  { id: "progress", text: "진행 상황", batchim: "consonant" },
  { id: "key-info", text: "핵심 정보", batchim: "vowel" },
  { id: "request-details", text: "요청 내용", batchim: "consonant" },
  { id: "result-data", text: "결과 데이터", batchim: "vowel" },
  { id: "work-status", text: "작업 상태", batchim: "vowel" },
  { id: "schedule-info", text: "일정 정보", batchim: "vowel" },
  { id: "document", text: "문서 내용", batchim: "consonant" },
  { id: "user-feedback", text: "사용자 의견", batchim: "consonant" },
  { id: "priority", text: "우선순위", batchim: "vowel" },
  { id: "history", text: "처리 기록", batchim: "consonant" },
  { id: "display-order", text: "표시 순서", batchim: "vowel" },
  { id: "summary", text: "요약 정보", batchim: "vowel" },
  { id: "next-step", text: "다음 단계", batchim: "vowel" },
  { id: "shared-standard", text: "공통 기준", batchim: "consonant" },
];

const transitivePredicates = [
  { id: "organize", text: "일관된 기준에 따라 정리합니다." },
  { id: "manage", text: "필요한 기준에 맞춰 관리합니다." },
  { id: "check", text: "정해진 절차에 따라 확인합니다." },
  { id: "record", text: "꾸준히 기록합니다." },
  { id: "reflect", text: "현재 상태에 맞게 반영합니다." },
  { id: "share", text: "담당자와 명확하게 공유합니다." },
  { id: "review", text: "업무 흐름에 맞춰 검토합니다." },
  { id: "present", text: "읽기 쉽게 표시합니다." },
  { id: "update", text: "최신 내용으로 꾸준히 갱신합니다." },
  { id: "compare", text: "이전 기록과 함께 비교합니다." },
  { id: "preserve", text: "맥락에 맞게 유지합니다." },
  { id: "classify", text: "사용 목적에 따라 분류합니다." },
];

const intransitivePredicates = [
  { id: "remain", text: "여러 화면에서 일관되게 유지됩니다." },
  { id: "appear", text: "필요한 위치에 자연스럽게 표시됩니다." },
  { id: "change", text: "작업 진행에 따라 순차적으로 바뀝니다." },
  { id: "continue", text: "다음 단계까지 안정적으로 이어집니다." },
  { id: "load", text: "현재 설정에 맞춰 빠르게 불러와집니다." },
  { id: "accumulate", text: "관련 항목과 함께 차곡차곡 쌓입니다." },
];
const accumulateReplacements: Record<string, string> = {
  system: "관련 업무 항목을 안정적으로 처리합니다.",
  service: "여러 화면에 걸쳐 안정적으로 제공됩니다.",
  screen: "필요한 위치에 자연스럽고 명확하게 표시됩니다.",
  dashboard: "필요한 위치에 자연스럽고 명확하게 표시됩니다.",
  setting: "현재 상태에 맞게 안정적으로 유지됩니다.",
  workflow: "관련 단계를 거쳐 자연스럽게 이어집니다.",
};
const shortPredicates = [
  { id: "save", text: "정상적으로 저장됩니다." },
  { id: "organize", text: "순서대로 정리됩니다." },
  { id: "preserve", text: "안전하게 보관됩니다." },
];

const openings = [
  { id: "context", text: "프로젝트의 현재 흐름을 고려해" },
  { id: "review", text: "정기적인 검토 과정에서" },
  { id: "handoff", text: "팀 간 업무를 연결할 때" },
  { id: "planning", text: "작업을 계획하는 단계에서" },
  { id: "shared", text: "여러 담당자가 함께 확인할 때" },
  { id: "change", text: "관련 내용이 바뀌는 경우에는" },
  { id: "daily", text: "일상적인 업무 환경에서는" },
  { id: "history", text: "이전 기록을 참고할 때는" },
];

const adverbs = [
  { id: "clearly", text: "명확하게" },
  { id: "consistently", text: "일관되게" },
  { id: "carefully", text: "세심하게" },
  { id: "efficiently", text: "효율적으로" },
  { id: "reliably", text: "안정적으로" },
  { id: "gradually", text: "단계별로" },
];

export function topicParticle(noun: KoreanNoun): string {
  return noun.batchim === "vowel" ? "는" : "은";
}
export function subjectParticle(noun: KoreanNoun): string {
  return noun.batchim === "vowel" ? "가" : "이";
}
export function objectParticle(noun: KoreanNoun): string {
  return noun.batchim === "vowel" ? "를" : "을";
}

function actualBatchim(noun: KoreanNoun): BatchimClass {
  const last = noun.text.at(-1) ?? "";
  const code = last.codePointAt(0) ?? 0;
  if (code < 0xac00 || code > 0xd7a3) throw new Error(`Korean noun must end in a Hangul syllable: ${noun.id}`);
  const jongseong = (code - 0xac00) % 28;
  return jongseong === 0 ? "vowel" : jongseong === 8 ? "rieul" : "consonant";
}

function assemble(): KoreanSentence[] {
  for (const noun of [...subjects, ...objects]) if (actualBatchim(noun) !== noun.batchim) throw new Error(`Incorrect final-consonant metadata: ${noun.id}`);
  const forms: KoreanSentence[] = [];
  const add = (id: string, template: string, family: string, text: string) => {
    const normalized = text.normalize("NFC");
    if (!normalized.endsWith(".")) throw new Error(`Korean sentence lacks terminal punctuation: ${id}`);
    forms.push({ id, template, family, text: normalized });
  };

  for (const subject of actors) for (const object of objects) for (const predicate of transitivePredicates) {
    const id = `transitive:${subject.id}:${object.id}:${predicate.id}`;
    const replacement = object.id === "display-order" && predicate.id === "present"
      ? "읽기 쉽게 구성합니다."
      : object.id === "history" && predicate.id === "record"
        ? "안전하게 보관합니다."
        : object.id === "shared-standard" && predicate.id === "manage"
          ? "업무 상황에 맞춰 관리합니다."
          : object.id === "shared-standard" && predicate.id === "organize"
            ? "업무 전반에 일관되게 적용합니다."
            : object.id === "display-order" && predicate.id === "update"
              ? "필요한 기준에 맞춰 조정합니다."
              : subject.id === "owner" && predicate.id === "share"
                ? "관련자와 명확하게 공유합니다."
        : predicate.text;
    add(id, `transitive:${predicate.id}`, "workflow", `${subject.text}${topicParticle(subject)} ${object.text}${objectParticle(object)} ${replacement}`);
  }

  for (const subject of stateSubjects) for (const predicate of intransitivePredicates) {
    const id = `state:${subject.id}:${predicate.id}`;
    const replacement = predicate.id === "accumulate" ? accumulateReplacements[subject.id] : undefined;
    add(id, `state:${replacement ? `${predicate.id}:${subject.id}` : predicate.id}`, "interface", `${subject.text}${subjectParticle(subject)} ${replacement ?? predicate.text}`);
  }

  for (const subject of shortStateSubjects) for (const predicate of shortPredicates) {
    const id = `short-state:${subject.id}:${predicate.id}`;
    add(id, `short-state:${predicate.id}`, "interface", `${subject.text}${subjectParticle(subject)} ${predicate.text}`);
  }

  for (const opening of openings) for (const object of objects) for (const adverb of adverbs) {
    const id = `context:${opening.id}:${object.id}:${adverb.id}`;
    add(id, `context:${opening.id}`, "collaboration", `${opening.text} ${object.text}${objectParticle(object)} ${adverb.text} 정리합니다.`);
  }

  const unique = new Set<string>();
  for (const form of forms) {
    if (unique.has(form.text) || form.text !== form.text.normalize("NFC")) throw new Error(`Duplicate or non-NFC Korean sentence: ${form.id}`);
    unique.add(form.text);
  }
  return forms;
}

export const koreanSentences = assemble();
