// Literal cross-runtime expectations; no ICU word-boundary oracle.
export const traditionalChinesePortabilityFixtures = [
  { text: "頁面清楚可見。", words: 3, characters: 7, sentences: 1, paragraphs: 1 },
  { text: "按鈕已經更新。", words: 3, characters: 7, sentences: 1, paragraphs: 1 },
  { text: "數值已經核對。", words: 3, characters: 7, sentences: 1, paragraphs: 1 },
  { text: "文件可以查閱。", words: 3, characters: 7, sentences: 1, paragraphs: 1 },
  { text: "資料可以依日期排序。", words: 5, characters: 10, sentences: 1, paragraphs: 1 },
  { text: "目錄列出各章節及對應頁碼，方便查閱。", words: 9, characters: 18, sentences: 1, paragraphs: 1 },
  { text: "頁面清楚可見。\n\n按鈕已經更新。", words: 6, characters: 16, sentences: 2, paragraphs: 2 },
] as const;
export const traditionalChineseRejectedFixtures = [
  "這是未登錄的句子。", "頁面清楚可見", "頁面清楚可見。。", "頁面 清楚可見。", "頁面清楚可見。\n按鈕已經更新。", "<p>頁面清楚可見。</p>",
] as const;
