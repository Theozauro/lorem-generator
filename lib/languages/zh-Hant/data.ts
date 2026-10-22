// Authored Traditional Chinese, not converted from another corpus.
// Editorial judgements are provisional, not Taiwan/Hong Kong native approval.
export const traditionalChineseContractVersion = "zh-Hant-lexical-v1";
export type ChineseFamily = "interfaces" | "dashboards" | "documents";
export const chineseFamilies: readonly ChineseFamily[] = ["interfaces", "dashboards", "documents"];
export type ReviewRating = "NATURAL" | "ACCEPTABLE" | "NEEDS REVISION" | "BAD";
type Kind = "surface" | "control" | "text" | "list" | "presentation" | "quantity" | "metadata" | "criteria" | "sort-rule" | "operation" | "file" | "document" | "section" | "toc" | "index" | "version" | "archive" | "activity";
type Subject = { id: string; words: readonly string[]; kind: Kind; rating: ReviewRating };
type Pattern = { id: string; kinds: readonly Kind[]; render: (s: readonly string[]) => readonly string[]; rating: ReviewRating };
export const chinesePunctuation = new Set(["。", "，", "、", "：", "；"]);
export type ChineseForm = {
  baseId: string; text: string; segmentation: readonly string[]; wordCount: number;
  family: ChineseFamily; template: string; lexemes: readonly string[];
  compatibility: { subjectKind: Kind; acceptedKinds: readonly Kind[] };
  role: "neutral"; short: boolean; contractVersion: string; review: ReviewRating;
};
// Fixed editorial glossary, not random synonym substitutions. Region-sensitive
// choices remain explicit review items even where both audiences understand them.
export const traditionalChineseGlossary = [
  { concept: "software", choice: "omitted", note: "Neither 軟體 nor 軟件 is required in this neutral core." },
  { concept: "settings", choice: "omitted", note: "Do not alternate 設定 and 設置." },
  { concept: "data", choice: "資料", note: "數值 refers only to numerical values; not a synonym rotation." },
  { concept: "filter", choice: "篩選", note: "Criteria, operation and result are distinct; verify with both regional reviewers." },
  { concept: "sort", choice: "排序", note: "Operation, rule and result are separate concepts." },
  { concept: "view", choice: "畫面 / 頁面", note: "No abstract view-object noun. These mean display/page, not arbitrary replacements for a technical view." },
  { concept: "dashboard", choice: "資料總覽", note: "Overview content only; do not assert this names every dashboard product." },
  { concept: "file", choice: "檔案", note: "Saved digital object, distinct from 文件 and document parts." },
  { concept: "archive", choice: "存檔資料", note: "Retained material, not a synonym for the save operation." },
  { concept: "field", choice: "輸入欄位 / 搜尋欄位", note: "Region-sensitive UI wording; explicit Taiwan/Hong Kong review required." },
  { concept: "bars", choice: "工具列 / 導覽列 / 狀態列 / 進度列", note: "One consistent initial UI terminology set; Taiwan/Hong Kong reviewers must assess regional markedness." },
  { concept: "record", choice: "記錄", note: "Use consistently for records and recording; do not rotate with 紀錄." },
  { concept: "date", choice: "日期 / 時段", note: "No regional date formats or administrative calendar assumptions." },
] as const;
export const traditionalChineseSegmentationPolicy = {
  id: traditionalChineseContractVersion,
  compounds: "Reviewed lexical compounds form one unit; never split to fit a target.",
  particles: "Grammatical 的、了、與、及、在、中、後 normally stand separately.",
  verbObject: "Productive verb/object constructions stay separate, e.g. 核對|資料; lexical 存檔 stays one unit.",
  productive: "已|有、如|需、可|供、較|窄 stay separate; word costs are not a reason to merge them.",
  explicit: { 不會: ["不會"], 所需: ["所需"], 所用: ["所用"] },
  punctuation: "Retained in text; excluded from Words. Paragraph LF separators are not Words.",
} as const;
function subjects(kind: Kind, entries: readonly string[]): Subject[] {
  return entries.map(entry => ({ id: entry.replaceAll("|", ""), words: entry.split("|"), kind, rating: "NATURAL" }));
}
const visual: Kind[] = ["surface", "control", "text"];
const interfaceSubjects = [
  ...subjects("surface", ["頁面", "畫面", "面板", "卡片", "圖片", "圖示", "圖例", "工具列", "導覽列", "狀態列", "進度列", "側欄", "區塊", "頁首", "頁尾", "邊框", "對話框", "提示框"]),
  ...subjects("control", ["按鈕", "連結", "輸入|欄位", "搜尋|欄位", "選項", "開關"]),
  ...subjects("text", ["標題", "正文", "提示", "說明", "通知", "註解", "段落"]),
];
const interfacePatterns: Pattern[] = [
  { id: "spacing", kinds: visual, rating: "NATURAL", render: s => [...s,"與","周圍","內容","保有","適當","的","間距","。"] },
  { id: "readability", kinds: ["text"], rating: "NATURAL", render: s => ["閱讀",...s,"時","，","不會","受到","相鄰","內容","的","干擾","。"] },
  { id: "resize", kinds: visual, rating: "NATURAL", render: s => ["尺寸","改變","後","，",...s,"仍","保有","完整","的","顯示","空間","。"] },
  { id: "placement", kinds: visual, rating: "NATURAL", render: s => [...s,"放置","在","容易","辨識","的","位置","。"] },
  { id: "boundary", kinds: ["surface","control"], rating: "NATURAL", render: s => [...s,"的","輪廓","與","背景","可以","清楚","區分","。"] },
  { id: "surroundings", kinds: visual, rating: "NATURAL", render: s => ["檢查",...s,"時","，","也","要","留意","周圍","的","排列","。"] },
  { id: "available-space", kinds: visual, rating: "NATURAL", render: s => ["現有","空間","足以","容納",...s,"，","不會","遮住","其他","內容","。"] },
  { id: "alignment", kinds: visual, rating: "NATURAL", render: s => [...s,"與","相鄰","項目","沿著","同一","基準","對齊","。"] },
  { id: "zoom", kinds: visual, rating: "NATURAL", render: s => ["放大","顯示","後","，","仍","能","辨認",...s,"的","細節","。"] },
  { id: "narrow", kinds: visual, rating: "NATURAL", render: s => ["在","較","窄","的","空間","內","，",...s,"依然","清楚","可見","。"] },
  { id: "compare", kinds: visual, rating: "NATURAL", render: s => ["比較","不同","尺寸","時","，","可以","觀察",...s,"的","變化","。"] },
  { id: "inspection", kinds: visual, rating: "NATURAL", render: s => ["檢查","人員","已","記下",...s,"在","測試","中","的","顯示","情況","。"] },
  { id: "content-change", kinds: visual, rating: "NATURAL", render: s => ["內容","更新","後","，","需要","再次","確認",...s,"是否","完整","呈現","。"] },
  { id: "visibility", kinds: visual, rating: "NATURAL", render: s => [...s,"沒有","被","相鄰","項目","遮擋","，","所需","空間","也","已","預留","。"] },
  { id: "reference", kinds: visual, rating: "ACCEPTABLE", render: s => ["設計","記錄","保留","了",...s,"的","位置","及","尺寸","，","供","後續","比較","。"] },
  { id: "contrast", kinds: ["surface","control"], rating: "NATURAL", render: s => ["背景","調整","後","，","應","確認",...s,"的","輪廓","仍然","清晰","。"] },
  { id: "reflow", kinds: visual, rating: "NATURAL", render: s => ["內容","重新","排列","時","，",...s,"與","其他","項目","之間","仍","有","空白","。"] },
  { id: "sequence", kinds: ["control"], rating: "NATURAL", render: s => ["使用","鍵盤","操作","時","，","可以","依序","移至",...s,"。"] },
  { id: "focus", kinds: ["control"], rating: "NATURAL", render: s => [...s,"取得","焦點","時","，","畫面","會","呈現","清楚","的","提示","。"] },
  { id: "action-notes", kinds: ["control"], rating: "NATURAL", render: s => ["有關",...s,"的","操作","說明","已經","整理","完成","。"] },
  { id: "line-spacing", kinds: ["text"], rating: "NATURAL", render: s => [...s,"的","行距","足以","讓","相鄰","文字","保持","清晰","。"] },
  { id: "font-size", kinds: ["text"], rating: "NATURAL", render: s => ["字體","大小","調整","後","，","應","重新","檢查",...s,"的","斷行","。"] },
  { id: "text-width", kinds: ["text"], rating: "NATURAL", render: s => [...s,"的","寬度","配合","閱讀","需要","安排","，","沒有","超出","可用","空間","。"] },
];
const dashboardSubjects = [
  ...subjects("list", ["資料|清單", "結果|清單", "摘要|清單", "資料表", "明細表", "比較表"]),
  ...subjects("presentation", ["圖表", "報表", "資料|總覽", "查詢|結果", "篩選|結果", "排序|結果"]),
  ...subjects("quantity", ["數值", "比例", "總數", "平均值", "最大值", "最小值", "進度", "數量", "日期", "時段", "區間", "範圍"]),
  ...subjects("metadata", ["名稱", "編號", "標記", "來源", "分類"]),
  ...subjects("criteria", ["篩選|條件"]),
  ...subjects("sort-rule", ["排序|規則"]),
  ...subjects("operation", ["篩選|作業", "排序|作業"]),
];
const displayed: Kind[] = ["list","presentation","quantity","metadata","criteria","sort-rule"];
const dataPatterns: Pattern[] = [
  { id: "display", kinds: displayed, rating: "NATURAL", render: s => ["更新","後","的","畫面","會","呈現",...s,"。"] },
  { id: "explanation", kinds: displayed, rating: "NATURAL", render: s => ["檢查",...s,"時","，","請","一併","核對","相關","說明","。"] },
  { id: "label", kinds: displayed, rating: "NATURAL", render: s => ["有關",...s,"的","標示","保持","清楚","，","方便","查閱","。"] },
  { id: "before-update", kinds: displayed, rating: "NATURAL", render: s => ["更新",...s,"之前","，","應","先","確認","原始","資料","。"] },
  { id: "notes", kinds: displayed, rating: "NATURAL", render: s => ["有關",...s,"的","說明","已","整理","完成","。"] },
  { id: "change-record", kinds: displayed, rating: "NATURAL", render: s => ["檢查","記錄","載有",...s,"的","變更","內容","。"] },
  { id: "compare-record", kinds: displayed, rating: "NATURAL", render: s => ["如","需","對照",...s,"，","可以","參考","先前","的","記錄","。"] },
  { id: "marking", kinds: displayed, rating: "NATURAL", render: s => s[0] === "標記"
    ? [...s,"採用","的","樣式","與","相關","說明","一致","。"]
    : [...s,"所用","的","標記","與","相關","說明","一致","。"] },
  { id: "verify", kinds: displayed, rating: "NATURAL", render: s => ["工作","人員","已","完成","有關",...s,"的","核對","。"] },
  { id: "arrangement", kinds: displayed, rating: "NATURAL", render: s => ["畫面","重新","排列","後","，","仍","能","辨認",...s,"的","位置","。"] },
  { id: "saved-notes", kinds: displayed, rating: "NATURAL", render: s => ["先前","保存","的","說明","可","供","檢查",...s,"時","參考","。"] },
  { id: "visibility", kinds: displayed, rating: "NATURAL", render: s => ["顯示",...s,"時","，","應","避免","遮住","相鄰","的","內容","。"] },
  { id: "review", kinds: displayed, rating: "NATURAL", render: s => ["再次","檢查",...s,"後","，","相關","人員","已","補上","必要","的","說明","。"] },
  { id: "date-record", kinds: displayed, rating: "ACCEPTABLE", render: s => ["相關","記錄","載有",...s,"的","更新","時間","。"] },
  { id: "original", kinds: displayed, rating: "NATURAL", render: s => ["核對",...s,"所需","的","原始","資料","已經","備妥","。"] },
  { id: "detail", kinds: ["list","presentation"], rating: "NATURAL", render: s => ["閱讀",...s,"時","，","可以","對照","原始","資料","查看","細節","。"] },
  { id: "rows", kinds: ["list"], rating: "NATURAL", render: s => [...s,"中","的","項目","依照","同一","規則","排列","，","方便","逐項","查閱","。"] },
  { id: "numeric-format", kinds: ["quantity"], rating: "NATURAL", render: s => [...s,"採用","一致","的","表示","方式","，","便於","前後","比較","。"] },
  { id: "metadata", kinds: ["metadata"], rating: "NATURAL", render: s => ["資料","更新","時","，","也","應","確認",...s,"是否","正確","。"] },
  { id: "criteria-result", kinds: ["criteria"], rating: "NATURAL", render: s => [...s,"改變","後","，","應","重新","核對","顯示","的","資料","。"] },
  { id: "sort-result", kinds: ["sort-rule"], rating: "NATURAL", render: s => ["資料","依照",...s,"排列","後","，","仍","保留","原有","的","內容","。"] },
  { id: "operation-check", kinds: ["operation"], rating: "NATURAL", render: s => [...s,"完成","後","，","需要","檢查","資料","是否","完整","。"] },
  { id: "operation-record", kinds: ["operation"], rating: "NATURAL", render: s => ["開始",...s,"之前","，","已","保存","原始","資料","供","後續","核對","。"] },
  { id: "operation-description", kinds: ["operation"], rating: "NATURAL", render: s => [...s,"的","處理","方式","已","有","清楚","的","說明","。"] },
];
const documentSubjects = [
  ...subjects("file", ["檔案", "附件", "備份"]),
  ...subjects("document", ["文件", "報告", "手冊", "指南", "簡報", "備忘錄", "草稿", "原稿", "清單", "表格"]),
  ...subjects("section", ["段落", "章節", "摘要", "前言", "附註"]),
  ...subjects("toc", ["目錄"]), ...subjects("index", ["索引"]),
  ...subjects("version", ["版本|說明", "修訂|記錄"]),
  ...subjects("archive", ["存檔|資料", "歷年|資料"]),
  ...subjects("activity", ["校對", "審閱", "整理", "檢查", "交接", "登記", "彙整", "排版", "確認", "發布", "準備", "核對"]),
];
const readable: Kind[] = ["document","section","toc","index","version","archive"];
const stored: Kind[] = ["file","document","toc","index","version","archive"];
const material: Kind[] = [...stored,"section"];
const documentPatterns: Pattern[] = [
  { id: "document-review", kinds: material, rating: "NATURAL", render: s => ["檢查",...s,"時","，","應","一併","參考","相關","說明","。"] },
  { id: "share", kinds: material, rating: "NATURAL", render: s => ["提供",...s,"之前","，","應","確認","接收","對象","及","使用","目的","。"] },
  { id: "correction", kinds: material, rating: "NATURAL", render: s => ["若",...s,"需要","修正","，","相關","人員","會","先","記下","修改","原因","。"] },
  { id: "location", kinds: stored, rating: "NATURAL", render: s => [...s,"的","保存","位置","已經","確認","，","方便","日後","查閱","。"] },
  { id: "source", kinds: material, rating: "NATURAL", render: s => ["有關",...s,"的","來源","說明","已","保存","，","可","供","後續","核對","。"] },
  { id: "changes", kinds: material, rating: "NATURAL", render: s => ["檢查","記錄","說明","了",...s,"的","修改","情況","。"] },
  { id: "before-share", kinds: material, rating: "NATURAL", render: s => ["分享",...s,"時","，","應","保留","必要","的","背景","說明","。"] },
  { id: "missing", kinds: readable, rating: "NATURAL", render: s => ["如","需","補充",...s,"，","可以","先","對照","原始","資料","。"] },
  { id: "terms", kinds: readable, rating: "NATURAL", render: s => [...s,"所用","的","詞語","保持","一致","，","讀者","較","容易","理解","。"] },
  { id: "read-again", kinds: readable, rating: "NATURAL", render: s => ["再次","閱讀",...s,"時","，","可以","參考","先前","留下","的","註記","。"] },
  { id: "notes", kinds: material, rating: "NATURAL", render: s => ["相關","人員","已","整理","有關",...s,"的","核對","記錄","。"] },
  { id: "schedule", kinds: stored, rating: "ACCEPTABLE", render: s => ["提供",...s,"的","時間","已經","確認","，","相關","人員","可以","預先","安排","。"] },
  { id: "file-open", kinds: ["file"], rating: "NATURAL", render: s => [...s,"開啟","後","，","應","確認","內容","是否","完整","呈現","。"] },
  { id: "file-save", kinds: ["file"], rating: "NATURAL", render: s => ["保存",...s,"之後","，","原有","的","名稱","與","日期","仍","可","查閱","。"] },
  { id: "purpose", kinds: ["document"], rating: "NATURAL", render: s => [...s,"交代","了","相關","工作","的","目的","及","適用","範圍","。"] },
  { id: "sections", kinds: ["document"], rating: "NATURAL", render: s => [...s,"的","主要","部分","依照","閱讀","需要","安排","。"] },
  { id: "context", kinds: ["section"], rating: "NATURAL", render: s => ["閱讀",...s,"時","，","應","留意","它","與","前後","內容","的","關係","。"] },
  { id: "part", kinds: ["section"], rating: "NATURAL", render: s => [...s,"的","內容","與","所屬","文件","保持","一致","。"] },
  { id: "toc", kinds: ["toc"], rating: "NATURAL", render: s => [...s,"列出","各","章節","及","對應","頁碼","，","方便","查閱","。"] },
  { id: "toc-check", kinds: ["toc"], rating: "NATURAL", render: s => ["更新",...s,"後","，","應","檢查","章節","名稱","與","頁碼","是否","相符","。"] },
  { id: "index", kinds: ["index"], rating: "NATURAL", render: s => [...s,"提供","關鍵","詞語","及","出現","位置","，","方便","查找","相關","內容","。"] },
  { id: "index-check", kinds: ["index"], rating: "NATURAL", render: s => ["檢查",...s,"時","，","需要","確認","各","項目","指向","正確","的","位置","。"] },
  { id: "version", kinds: ["version"], rating: "NATURAL", render: s => [...s,"載明","修改","日期","及","內容","，","方便","比較","前後","差異","。"] },
  { id: "archive", kinds: ["archive"], rating: "NATURAL", render: s => ["查閱",...s,"時","，","仍","可","確認","當時","的","日期","及","來源","。"] },
  { id: "activity-before", kinds: ["activity"], rating: "NATURAL", render: s => ["開始",...s,"之前","，","應","備妥","所需","的","資料","及","說明","。"] },
  { id: "activity-after", kinds: ["activity"], rating: "NATURAL", render: s => [...s,"完成","後","，","相關","記錄","會","保存","供","日後","參考","。"] },
  { id: "activity-time", kinds: ["activity"], rating: "NATURAL", render: s => [...s,"的","時間","已經","安排","，","相關","人員","會","預先","收到","通知","。"] },
  { id: "activity-change", kinds: ["activity"], rating: "NATURAL", render: s => ["若",...s,"的","安排","有","變動","，","應","及時","通知","相關","人員","。"] },
  { id: "activity-record", kinds: ["activity"], rating: "NATURAL", render: s => ["工作","記錄","載明",...s,"的","範圍","及","完成","日期","。"] },
  { id: "activity-details", kinds: ["activity"], rating: "NATURAL", render: s => ["有關",...s,"的","工作","細節","已經","整理","完成","。"] },
  { id: "activity-order", kinds: ["activity"], rating: "NATURAL", render: s => [...s,"與","其他","工作","的","先後","次序","已經","確認","。"] },
  { id: "activity-owner", kinds: ["activity"], rating: "NATURAL", render: s => ["參與",...s,"的","人員","可以","查閱","相關","工作","說明","。"] },
];
const visualShort: Pattern[] = [
  { id: "short-clear", kinds: visual, rating: "NATURAL", render: s => [...s,"清楚","可見","。"] },
  { id: "short-updated", kinds: visual, rating: "NATURAL", render: s => [...s,"已經","更新","。"] },
  { id: "short-ready", kinds: visual, rating: "NATURAL", render: s => [...s,"目前","顯示","正常","。"] },
  { id: "short-position", kinds: visual, rating: "NATURAL", render: s => [...s,"的","位置","已經","確認","。"] },
  { id: "short-space", kinds: visual, rating: "NATURAL", render: s => [...s,"周圍","留有","空白","。"] },
  { id: "short-overlap", kinds: visual, rating: "NATURAL", render: s => [...s,"沒有","遮住","其他","內容","。"] },
];
const dataShort: Pattern[] = [
  { id: "short-updated", kinds: displayed, rating: "NATURAL", render: s => [...s,"已經","更新","。"] },
  { id: "short-checked", kinds: displayed, rating: "NATURAL", render: s => [...s,"已經","核對","。"] },
  { id: "short-visible", kinds: displayed, rating: "NATURAL", render: s => [...s,"可以","查閱","。"] },
  { id: "short-ready", kinds: displayed, rating: "NATURAL", render: s => [...s,"目前","顯示","正常","。"] },
  { id: "short-notes", kinds: displayed, rating: "NATURAL", render: s => [...s,"的","說明","已經","備妥","。"] },
  { id: "short-mark", kinds: displayed, rating: "NATURAL", render: s => [...s,"已","有","清楚","的","標示","。"] },
  { id: "short-completed", kinds: ["operation"], rating: "NATURAL", render: s => [...s,"已經","完成","。"] },
  { id: "short-recorded", kinds: ["operation"], rating: "NATURAL", render: s => [...s,"已","有","完整","的","記錄","。"] },
];
const documentShort: Pattern[] = [
  { id: "short-checked", kinds: material, rating: "NATURAL", render: s => [...s,"已經","核對","。"] },
  { id: "short-ready", kinds: material, rating: "NATURAL", render: s => [...s,"可以","查閱","。"] },
  { id: "short-complete", kinds: material, rating: "NATURAL", render: s => [...s,"的","內容","完整","。"] },
  { id: "short-saved", kinds: material, rating: "NATURAL", render: s => [...s,"已經","保存","。"] },
  { id: "short-notes", kinds: ["file","document","section","toc","index","archive"], rating: "NATURAL", render: s => [...s,"的","說明","已經","備妥","。"] },
  { id: "short-prepared", kinds: ["version"], rating: "NATURAL", render: s => [...s,"已經","備妥","。"] },
  { id: "short-date", kinds: material, rating: "NATURAL", render: s => [...s,"的","日期","已經","核對","。"] },
  { id: "short-completed", kinds: ["activity"], rating: "NATURAL", render: s => [...s,"已經","完成","。"] },
  { id: "short-planned", kinds: ["activity"], rating: "NATURAL", render: s => [...s,"的","時間","已經","確認","。"] },
];
export const traditionalChineseSourceUnits = [
  ...interfaceSubjects, ...dashboardSubjects, ...documentSubjects,
].map(subject => ({ id: "subject:" + subject.id, category: "subject", text: subject.words.join(""), rating: subject.rating })).concat(
  [...interfacePatterns, ...dataPatterns, ...documentPatterns, ...visualShort, ...dataShort, ...documentShort]
    .map((pattern,index) => ({ id: "pattern:" + index + ":" + pattern.id, category: pattern.id.startsWith("short-") ? "short-form" : "template", text: pattern.render(["〈主題〉"]).join(""), rating: pattern.rating })),
);
function expand(family: ChineseFamily, nouns: Subject[], patterns: Pattern[], short = false): ChineseForm[] {
  return nouns.flatMap(noun => patterns.filter(pattern => pattern.kinds.includes(noun.kind)).map(pattern => {
    const segmentation = [...pattern.render(noun.words)];
    return { baseId: "zh-Hant:" + family + ":" + noun.id + ":" + pattern.id,
      text: segmentation.join("").normalize("NFC"), segmentation,
      wordCount: segmentation.filter(token => !chinesePunctuation.has(token)).length,
      family, template: family + ":" + pattern.id, lexemes: [noun.words.join("")],
      compatibility: { subjectKind: noun.kind, acceptedKinds: pattern.kinds },
      role: "neutral" as const, short, contractVersion: traditionalChineseContractVersion,
      review: pattern.rating === "ACCEPTABLE" ? "ACCEPTABLE" as const : noun.rating };
  }));
}
export const traditionalChineseForms: readonly ChineseForm[] = [
  ...expand("interfaces",interfaceSubjects,interfacePatterns),
  ...expand("interfaces",interfaceSubjects,visualShort,true),
  ...expand("dashboards",dashboardSubjects,dataPatterns),
  ...expand("dashboards",dashboardSubjects,dataShort,true),
  ...expand("documents",documentSubjects,documentPatterns),
  ...expand("documents",documentSubjects,documentShort,true),
  { baseId: "zh-Hant:dashboards:sorting:explicit", text: "資料可以依日期排序。", segmentation: ["資料","可以","依","日期","排序","。"], wordCount: 5,
    family: "dashboards", template: "dashboards:sorting-explicit", lexemes: ["資料"],
    compatibility: { subjectKind: "list", acceptedKinds: ["list"] }, role: "neutral", short: true, contractVersion: traditionalChineseContractVersion, review: "NATURAL" },
];
export const traditionalChineseFixedSourceUnits = [
  { id: "fixed:sorting", category: "fixed-form", text: "資料可以依日期排序。", rating: "NATURAL" as const },
];
// No connectors: adjacent neutral statements do not assert causal/temporal links.
