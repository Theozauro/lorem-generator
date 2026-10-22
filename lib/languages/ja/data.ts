// Complete plain-register forms. Substitution is limited to compatible noun
// phrases in fixed constructions: no conjugator or random particle assembly.
export type Topic = "interface" | "documents" | "planning" | "conditions";
export type ConnectorRole = "opening" | "continuation" | "optional" | "closing";
export const connectors: readonly { text: string; role: ConnectorRole }[] = [
  { text: "まず、", role: "opening" }, { text: "はじめに、", role: "opening" },
  { text: "次に、", role: "continuation" }, { text: "その後、", role: "continuation" },
  { text: "必要に応じて、", role: "optional" }, { text: "最後に、", role: "closing" },
];
export type SentenceForm = {
  text: string; topic: Topic; template: string; lexemes: readonly string[];
  procedural: boolean; short?: boolean;
};
type Pattern = { id: string; procedural: boolean; render: (subject: string) => string };
function family(topic: Topic, subjects: readonly string[], patterns: readonly Pattern[]): SentenceForm[] {
  return subjects.flatMap(subject => patterns.map(pattern => ({
    text: pattern.render(subject), topic, template: `${topic}:${pattern.id}`,
    lexemes: [subject], procedural: pattern.procedural,
  })));
}
const textualInterfaceSubjects = new Set([
  "見出し", "本文", "案内文", "説明文", "補足情報", "注意事項", "項目名", "ラベル", "リンク", "ページ番号", "連絡先",
]);
const interfaceForms = family("interface", [
  "見出し", "本文", "案内文", "説明文", "補足情報", "注意事項", "一覧", "項目名",
  "操作メニュー", "検索欄", "入力欄", "確認メッセージ", "設定項目", "検索結果", "画像", "図",
  "ラベル", "リンク", "ボタン", "選択肢", "通知", "エラーメッセージ", "ページ番号", "連絡先",
], [
  { id: "topic-position", procedural: true, render: s => `${s}は、ページ内で見つけやすい位置に配置する。` },
  { id: "stable-layout", procedural: false, render: s => `${s}${s === "ページ番号" ? "" : "の内容"}が変わっても、周囲の配置は安定している。` },
  { id: "width-check", procedural: true, render: s => `画面幅を変えながら、${s}の表示を確かめる。` },
  { id: "purpose", procedural: true, render: s => `利用者が迷わないように、${s}の役割を明確にする。` },
  { id: "location", procedural: false, render: s => `この画面では、${s}と周囲の要素の間に適度な余白がある。` },
  { id: "conditional", procedural: false, render: s => `${s}が見つけにくい場合は、配置と余白を見直す。` },
  { id: "before-release", procedural: false, render: s => `公開する前に、${s}が意図した場所にあるか確認する。` },
  { id: "visual-hierarchy", procedural: false, render: s => `${s}の見せ方によって、ページ全体の印象も変わる。` },
  { id: "context", procedural: true, render: s => `実際の利用場面を想定し、${s}の分かりやすさを検討する。` },
  { id: "comparison", procedural: false, render: s => `異なる端末で比較すると、${s}の配置の違いを確認できる。` },
  { id: "surroundings", procedural: false, render: s => `${s}だけでなく、隣接する要素との関係も重要だ。` },
  { id: "resize", procedural: false, render: s => `表示領域が狭くなると、${s}の周囲の余白も変化する。` },
  { id: "consistent", procedural: false, render: s => `ページを切り替えても、${s}の扱いが一貫しているか確かめる。` },
  { id: "workflow", procedural: true, render: s => `操作の流れに沿って画面をたどり、${s}の位置を見直す。` },
  { id: "region", procedural: false, render: s => `${s}を含む領域は、十分な余白を確保して読み取りやすくする。` },
  { id: "prototype", procedural: false, render: s => `試作段階では、${s}の位置を変えながら画面のバランスを検討する。` },
  { id: "boundary", procedural: false, render: s => textualInterfaceSubjects.has(s)
    ? `${s}と背景に十分なコントラストがあると、内容を読み取りやすい。`
    : `${s}と背景の境界がはっきりしていると、全体の構造も把握しやすい。` },
]);
const documentForms = family("documents", [
  "議事録", "報告書", "案内資料", "説明資料", "手順書", "予定表", "記録一覧", "配布資料",
  "参考資料", "申込書", "連絡文", "作業メモ", "調査記録", "確認用の資料", "印刷用の原稿",
  "保存用の記録", "共有用の文書", "会議の資料", "受付の記録", "作業の記録", "見直し用の原稿",
  "提出用の書類", "内容一覧", "項目別の記録",
], [
  { id: "topic-scope", procedural: true, render: s => `${s}は、読む人に必要な情報が伝わるようにまとめる。` },
  { id: "location", procedural: false, render: s => `共有の保管場所には、更新した${s}が置かれている。` },
  { id: "purpose", procedural: true, render: s => `必要な情報を探しやすくするため、${s}に見出しを付ける。` },
  { id: "conditional", procedural: false, render: s => `${s}に不足があれば、元の情報を確かめて補う。` },
  { id: "before-share", procedural: false, render: s => `共有する前に、${s}の日付と内容を読み直す。` },
  { id: "description", procedural: false, render: s => `${s}には、作成の目的と対象となる範囲が記されている。` },
  { id: "context", procedural: true, render: s => `変更の経緯が分かるように、${s}の更新日を記録する。` },
  { id: "comparison", procedural: true, render: s => `元の資料と${s}を比べ、記載内容の違いを確かめる。` },
  { id: "hierarchy", procedural: false, render: s => `${s}の構成が明確なら、読み手は必要な箇所を探しやすい。` },
  { id: "read-through", procedural: true, render: s => `全体の流れを意識しながら、${s}を通して読む。` },
  { id: "retention", procedural: true, render: s => `後から確認できるように、${s}を分類して保存する。` },
  { id: "audience", procedural: false, render: s => `${s}の詳しさは、利用する人や場面によって異なる。` },
  { id: "review", procedural: true, render: s => `定期的な見直しでは、${s}が現状と合っているか確認する。` },
  { id: "access", procedural: true, render: s => `担当者と相談し、${s}の共有範囲を決める。` },
  { id: "reading", procedural: false, render: s => `${s}を読む際には、見出しだけでなく本文のつながりにも注意する。` },
  { id: "mark-review", procedural: false, render: s => `確認が終わった${s}には、見直した箇所が分かるように印を付ける。` },
  { id: "terminology", procedural: false, render: s => `${s}の表現がそろっていると、複数の資料を比較するときにも読み取りやすい。` },
]);
const confirmationSubjects = new Set(["月末の確認", "備品の確認", "予定の確認", "事前の確認", "作業後の確認"]);
const planningForms = family("planning", [
  "朝の作業", "午後の作業", "翌日の準備", "会議の準備", "移動の準備", "週末の準備",
  "片付け", "一日の作業", "今週の作業", "月末の確認", "連絡作業", "受付の準備",
  "資料の準備", "道具の準備", "備品の確認", "予定の確認", "次回の準備", "当日の作業",
  "会場の準備", "共同作業", "定期的な作業", "事前の確認", "作業後の確認", "翌週の準備",
], [
  { id: "topic-scope", procedural: true, render: s => `${s}は、無理のない範囲で進められるように計画する。` },
  { id: "context", procedural: true, render: s => `全体の見通しを立てるため、${s}に必要な時間を考える。` },
  { id: "location", procedural: false, render: s => `手元の一覧には、${s}についてのメモがある。` },
  { id: "conditional", procedural: false, render: s => `${s}に変更があれば、関係する人に早めに伝える。` },
  { id: "before-start", procedural: false, render: s => confirmationSubjects.has(s)
    ? `一日の始まりに、${s}の手順を確かめる。`
    : `一日の始まりに、${s}の内容を確認する。` },
  { id: "description", procedural: false, render: s => `${s}に余裕があると、急な変更にも対応しやすい。` },
  { id: "purpose", procedural: true, render: s => s === "予定の確認"
    ? "予定の重複を避けるため、予定表で日時を照合する。"
    : `予定の重複を避けるため、${s}を一覧に書き入れる。` },
  { id: "comparison", procedural: true, render: s => `前回の記録を参考にしながら、${s}の進め方を見直す。` },
  { id: "dependencies", procedural: false, render: s => confirmationSubjects.has(s) || s === "連絡作業"
    ? `${s}の日時を決める際には、ほかの予定との重なりにも注意する。`
    : `${s}を考える際には、ほかの予定との関係も大切だ。` },
  { id: "review", procedural: true, render: s => `週ごとの見直しでは、${s}に無理がないか確かめる。` },
  { id: "shared", procedural: true, render: s => `担当者と相談し、${s}についての認識をそろえる。` },
  { id: "record", procedural: true, render: s => `後から振り返れるように、${s}の結果を記録する。` },
  { id: "priority", procedural: false, render: s => `${s}の優先度は、その日の状況によって変わる。` },
  { id: "prepare", procedural: true, render: s => `${s}に取りかかる前に、必要な物と情報をそろえる。` },
  { id: "information", procedural: false, render: s => `${s}を進めるうえで必要な情報は、事前に担当者と共有しておく。` },
  { id: "outlook", procedural: false, render: s => `${s}${confirmationSubjects.has(s) ? "にかかる時間" : ""}の見通しが立てば、ほかの作業に使える時間も把握しやすい。` },
  { id: "adaptation", procedural: false, render: s => `状況に合わせて${s}の計画を調整し、変更した点を記録に残す。` },
]);
// These are complete clauses, searched together with normal forms rather than
// appended as residual padding. They have explicit objects/topics.
const smallForms: Record<Exclude<Topic, "conditions">, readonly string[]> = {
  interface: [
    // Specific intransitive UI operations also cover two-segment requests;
    // unlike 戻る / 始める they identify an operation, not an unknown referent.
    "ログインする。", "ログアウトする。", "スクロールする。", "ズームする。", "再起動する。", "同期する。",
    "文字が見える。", "画面は明るい。", "表示は鮮明だ。", "文字は大きい。", "画像は鮮明だ。",
    "設定を保存する。", "表示を確認する。", "画像を選ぶ。", "画面を開く。", "項目を選ぶ。",
    "文字を拡大する。", "余白を調整する。", "配置を見直す。", "画面の幅を変える。",
    "文字の色を選ぶ。", "画像の位置を確認する。", "操作の手順を確かめる。",
    "一覧から項目を選ぶ。", "画面全体の配置を確認する。", "表示する順序を見直す。",
  ],
  documents: [
    "資料がある。", "記録は正確だ。", "情報は新しい。", "内容は明確だ。", "資料は詳しい。",
    "内容を整理する。", "順序を見直す。", "資料を読む。", "記録を残す。", "日付を記す。",
    "記録を確かめる。", "資料を分類する。", "原稿を保存する。", "資料の順序を変える。",
    "見出しを付ける。", "内容の違いを確かめる。", "記録の日付を確認する。",
    "用紙に日付を記入する。", "関連する資料をまとめる。", "項目ごとの情報を整理する。",
  ],
  planning: [
    "時間がある。", "予定は明確だ。", "準備は十分だ。", "手順は簡単だ。", "時間は十分だ。",
    "予定を確認する。", "手順を見直す。", "予定を立てる。", "時間を計る。", "道具をそろえる。",
    "予定を書き留める。", "時間を確保する。", "準備を進める。", "必要な物をそろえる。",
    "作業の順番を決める。", "休憩の時間を設ける。", "一日の予定を確かめる。",
    "作業の結果を記録する。", "翌日の準備を整える。", "担当者に予定を伝える。",
  ],
};
export const sentenceForms: readonly SentenceForm[] = [
  ...interfaceForms, ...documentForms, ...planningForms,
  // Japanese allows complete impersonal weather predicates in a single word.
  // Reserved for one-word paragraphs; never mixed into other topic families.
  ...["晴れる。", "曇る。", "蒸し暑い。", "肌寒い。", "暖かい。", "涼しい。"].map(text => ({
    text, topic: "conditions" as const, template: "conditions:impersonal",
    lexemes: [], procedural: false, short: true,
  })),
  ...Object.entries(smallForms).flatMap(([topic, forms]) => forms.map((text, index) => ({
    text, topic: topic as Topic, template: `${topic}:short-${index % 5}`,
    lexemes: [], procedural: false, short: true,
  }))),
];
