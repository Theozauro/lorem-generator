# zh-Hant — prima implementazione: campioni per la revisione linguistica

Contratto: `zh-Hant-lexical-v1`. Motore locale, **non collegato alla UI**.
Japanese resta attivo; zh-Hans, zh-Hant e ko restano disabilitati.

## Ambito e provenienza

Tradizionale scritto contemporaneo con lessico comune dove possibile. Il corpus
è stato scritto per zh-Hant: nessuna conversione, mappa di caratteri o import
dei testi/segmentazioni zh-Hans. Le tre famiglie sono concetti, non traduzioni
uno-a-uno. Le classificazioni sono una prima revisione editoriale assistita,
non un'approvazione madrelingua o una certificazione di neutralità regionale.

Serve una revisione competente sia nell'uso tradizionale di Taiwan sia nel
cinese scritto standard di Hong Kong prima dell'approvazione linguistica.
Controllare in particolare 輸入欄位、搜尋欄位 e la serie 工具列、導覽列、
狀態列、進度列. Non alternare sinonimi regionali per varietà. Il glossario
editoriale esplicito si trova in `data.ts`.

## Segmentazione e compatibilità

- Particelle grammaticali separate; composti lessicali revisionati non spezzati
  in base al numero di caratteri. `已|有`, `如|需`, `可|供`, `較|窄`
  restano costruzioni produttive distinte.
- Convenzioni esplicite: `不會`, `所需`, `所用` ciascuno come una unità.
- Punteggiatura esclusa da Words, inclusa in Characters; NFC, non NFKC.
- Characters conta grafemi sul testo semplice; niente HTML, padding o troncamento.
  I separatori LF di paragrafo contano nelle statistiche Characters del testo.
- Una risorsa è una frase completa terminata da 。. Nessun connettore esterno.
- Distinti file, documento, sezione, indice, sommario, versione, materiale
  conservato e attività. Distinte operazioni/condizioni/risultati di filtro
  e operazioni/regole/risultati di ordinamento.
- La fattibilità è calcolata sul corpus zh-Hant, mai con soglie zh-Hans hardcoded.

## Prima revisione del corpus

203 unità sorgente: 100 sostituzioni lessicali, 79 template ordinari,
23 forme brevi e una forma fissa; connettori esterni: 0.
NATURAL 200; ACCEPTABLE 3; NEEDS REVISION 0; BAD 0.

| Famiglia | Forme | NATURAL | ACCEPTABLE | NEEDS REVISION | BAD |
|---|---:|---:|---:|---:|---:|
| Interfaces | 714 | 683 | 31 | 0 | 0 |
| Dashboard | 699 | 668 | 31 | 0 | 0 |
| Documents | 577 | 558 | 19 | 0 | 0 |

Classificazione provvisoria delle realizzazioni espanse basata sulla revisione
dei template, dei lessici e dell'intera matrice di compatibilità; ricerca
automatica su tutte le forme di terminologia vietata, ripetizioni e tautologie.
Il riesame dei campioni ha eliminato le costruzioni 說明的說明,
比較比較表 e 日期的更新日期 prima del congelamento di questa versione.

## Tipografia futura, non applicata

`lang="zh-Hant"`; "PingFang TC", "Microsoft JhengHei", "Noto Sans CJK TC",
system-ui, sans-serif; line-height 1.8, letter-spacing normal, word-break normal,
line-break strict. Nessuna modifica CSS o React eseguita.

## Audit tecnico finale

Comando riproducibile: `node lib/languages/zh-Hant/audit.mjs`.
Node 24.21.0; nessuna verifica cross-browser eseguita.

- 60.000 coppie Words/paragrafi: 58.635 SUPPORTED, 1.365 STRUCTURALLY UNSUPPORTED.
- Per P=1…30 i minimi misurati sono: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90.
  Supporto contiguo dal minimo a 2.000, senza buchi. Il risultato coincide con
  3P ma non è hardcoded: deriva dalle frasi complete e dai test sull'inventario.
- 155 casi limite × 50 seed: 6.250 generazioni supportate riuscite;
  1.500 rifiuti sotto il minimo corretti. Zero fallimenti seed/search.
- Characters: tutti i 9.991 target 10…10.000 generati esattamente;
  altri 270 test di confine multi-seed. Nessun buco.
- Sentences: 1…100 × 10 seed = 1.000 output esatti.
  Un ulteriore riesame degli stessi 1.000 casi misura catena breve massima 1,
  zero catene >=4. Il contatore Characters rifiuta esplicitamente input HTML.
- Audit finale: 77.260 output; tutte le 1.990 risorse esercitate.
  Zero conteggi errati, forme sconosciute, basi/frasi duplicate, famiglie miste,
  spazi artificiali, punteggiatura malformata o template identici consecutivi
  anche tra paragrafi.
- 408 prove aggiuntive sui casi di confine fra paragrafi: tutte riuscite.
  Il planner usa una banda iniziale morbida di due parole, e l'ordinamento
  può permutare frasi complete preservando tutte le somme e risorse.
- 7/7 fixture positive e 6/6 negative; Words indipendente da Intl.Segmenter.
  La mancanza del segmentatore di grafemi produce un errore esplicito.
- Regressioni protette: Japanese 12/12, zh-Hans 12/12, fixture Words zh-Hans 6/6.
- UI, registro delle lingue, CSS, SEO, sitemap e lingue completate invariati.

### Ritmo: 1.000 output rappresentativi

| Indicatore | Risultato |
|---|---:|
| Adiacenze dello stesso soggetto | 311 / 65776 transizioni |
| Finestre A-B-A-B | 19 |
| Concentrazioni template/posizione >=50%, almeno 5 paragrafi | 15 |
| Catena massima locale di forme brevi Words / Characters / Sentences | 3 / 3 / 1 |
| Output con catene >=4 nella matrice rappresentativa | 0 |

Le concentrazioni residue sono nei budget Words 139/19 e 142/19 della famiglia
Documents. Il campione 6 mostra chiaramente il ricorrere di dichiarazioni di
completezza in fine paragrafo: **NEEDS REVISION per il ritmo**, non un errore
di conteggio o una frase incompleta. È un punto esplicito per la prima revisione
linguistica, non una neutralità o naturalezza certificata dai test.

### Prestazioni

Primo utilizzo in processi nuovi (cold generation, escluso caricamento e
traspilazione dei moduli). Warm: 30 esecuzioni, tempi in millisecondi.

| Richiesta | Cold | Warm mediana | Warm p95 |
|---|---:|---:|---:|
| Words 2000/30 | 52.56 | 1.54 | 4.13 |
| Characters 10000 | 268.06 | 11.33 | 12.41 |
| Sentences 100 | 102.71 | 19.04 | 24.75 |

Massimo osservato nell'audit principale: 152.69 ms,
sentences 100, seed 100191.
Cache per corpus/candidati, costi e fattibilità; fino a 9 profili completi in LRU.
La casualità sceglie solo piani esatti già fattibili.

## 24 campioni

Prima classificazione: NATURAL 5, ACCEPTABLE 18, NEEDS REVISION 1 (campione 6,
ritmo), BAD 0. La revisione madrelingua rimane necessaria.

### 1. words — 3 / 1 paragrafi — interfaces

Seed: 20000. Words: 3; grafemi: 7; frasi: 1; paragrafi: 1.

Valutazione: NATURAL.

頁面清楚可見。

### 2. words — 8 / 1 paragrafi — dashboards

Seed: 20002. Words: 8; grafemi: 14; frasi: 1; paragrafi: 1.

Valutazione: NATURAL.

更新後的畫面會呈現資料清單。

### 3. words — 15 / 2 paragrafi — documents

Seed: 20005. Words: 15; grafemi: 34; frasi: 3; paragrafi: 2.

Valutazione: ACCEPTABLE.

檢查檔案時，應一併參考相關說明。

備忘錄可以查閱。前言的內容完整。

### 4. words — 40 / 3 paragrafi — interfaces

Seed: 20006. Words: 40; grafemi: 78; frasi: 4; paragrafi: 3.

Valutazione: ACCEPTABLE.

設計記錄保留了搜尋欄位的位置及尺寸，供後續比較。

說明已經更新。檢查人員已記下註解在測試中的顯示情況。

內容重新排列時，搜尋欄位與其他項目之間仍有空白。

### 5. words — 100 / 5 paragrafi — dashboards

Seed: 20004. Words: 100; grafemi: 205; frasi: 10; paragrafi: 5.

Valutazione: ACCEPTABLE.

檢查名稱時，請一併核對相關說明。再次檢查排序規則後，相關人員已補上必要的說明。

有關總數的標示保持清楚，方便查閱。資料清單中的項目依照同一規則排列，方便逐項查閱。

再次檢查篩選結果後，相關人員已補上必要的說明。檢查記錄載有篩選條件的變更內容。

摘要清單中的項目依照同一規則排列，方便逐項查閱。工作人員已完成有關圖表的核對。

核對編號所需的原始資料已經備妥。再次檢查摘要清單後，相關人員已補上必要的說明。

### 6. words — 139 / 19 paragrafi — documents

Seed: 20005. Words: 139; grafemi: 337; frasi: 35; paragrafi: 19.

Valutazione: NEEDS REVISION — ritmo.

章節已經核對。段落的內容完整。

檔案已經保存。摘要的內容完整。

附件已經核對。目錄的內容完整。

備份已經保存。檔案的內容完整。

前言可以查閱。章節的內容完整。

排版已經完成。附註的內容完整。

手冊已經核對。報告的內容完整。

手冊已經保存。手冊的內容完整。

準備已經完成。附件的內容完整。

報告可以查閱。文件的內容完整。

版本說明可以查閱。簡報已經保存。

草稿已經核對。修訂記錄可以查閱。

檢查文件時，應一併參考相關說明。

備份的內容完整。核對已經完成。

備忘錄可以查閱。版本說明已經核對。

表格的保存位置已經確認，方便日後查閱。

版本說明已經備妥。原稿已經保存。

修訂記錄已經備妥。表格已經核對。

提供附註之前，應確認接收對象及使用目的。

### 7. words — 300 / 30 paragrafi — interfaces

Seed: 20006. Words: 300; grafemi: 633; frasi: 30; paragrafi: 30.

Valutazione: ACCEPTABLE.

檢查段落時，也要留意周圍的排列。

尺寸改變後，頁面仍保有完整的顯示空間。

檢查人員已記下正文在測試中的顯示情況。

圖片與周圍內容保有適當的間距。

設計記錄保留了標題的位置及尺寸，供後續比較。

現有空間足以容納卡片，不會遮住其他內容。

在較窄的空間內，段落依然清楚可見。

說明沒有被相鄰項目遮擋，所需空間也已預留。

導覽列的輪廓與背景可以清楚區分。

內容重新排列時，段落與其他項目之間仍有空白。

放大顯示後，仍能辨認工具列的細節。

字體大小調整後，應重新檢查標題的斷行。

通知的寬度配合閱讀需要安排，沒有超出可用空間。

進度列與相鄰項目沿著同一基準對齊。

設計記錄保留了圖示的位置及尺寸，供後續比較。

比較不同尺寸時，可以觀察進度列的變化。

內容更新後，需要再次確認圖例是否完整呈現。

檢查人員已記下進度列在測試中的顯示情況。

有關開關的操作說明已經整理完成。

內容重新排列時，工具列與其他項目之間仍有空白。

檢查選項時，也要留意周圍的排列。

背景調整後，應確認對話框的輪廓仍然清晰。

註解沒有被相鄰項目遮擋，所需空間也已預留。

尺寸改變後，標題仍保有完整的顯示空間。

內容重新排列時，註解與其他項目之間仍有空白。

說明與周圍內容保有適當的間距。

檢查人員已記下對話框在測試中的顯示情況。

設計記錄保留了頁尾的位置及尺寸，供後續比較。

現有空間足以容納正文，不會遮住其他內容。

正文與相鄰項目沿著同一基準對齊。

### 8. words — 1000 / 25 paragrafi — dashboards

Seed: 20007. Words: 1000; grafemi: 2004; frasi: 115; paragrafi: 25.

Valutazione: ACCEPTABLE.

更新後的畫面會呈現結果清單。檢查資料清單時，請一併核對相關說明。有關總數的標示保持清楚，方便查閱。檢查記錄載有報表的變更內容。更新比例之前，應先確認原始資料。

工作人員已完成有關資料表的核對。更新數值之前，應先確認原始資料。查詢結果已有清楚的標示。如需對照比較表，可以參考先前的記錄。核對標記所需的原始資料已經備妥。

更新資料清單之前，應先確認原始資料。更新後的畫面會呈現資料總覽。數值的說明已經備妥。有關結果清單的標示保持清楚，方便查閱。顯示資料表時，應避免遮住相鄰的內容。

總數採用一致的表示方式，便於前後比較。有關篩選條件的說明已整理完成。檢查記錄載有排序結果的變更內容。篩選條件改變後，應重新核對顯示的資料。日期的說明已經備妥。

圖表所用的標記與相關說明一致。如需對照報表，可以參考先前的記錄。檢查結果清單時，請一併核對相關說明。排序結果已有清楚的標示。有關比例的說明已整理完成。

顯示明細表時，應避免遮住相鄰的內容。工作人員已完成有關報表的核對。進度已經更新。再次檢查資料表後，相關人員已補上必要的說明。檢查資料總覽時，請一併核對相關說明。

如需對照總數，可以參考先前的記錄。日期已經核對。更新後的畫面會呈現篩選結果。更新摘要清單之前，應先確認原始資料。再次檢查明細表後，相關人員已補上必要的說明。

畫面重新排列後，仍能辨認資料清單的位置。數值採用一致的表示方式，便於前後比較。摘要清單所用的標記與相關說明一致。明細表中的項目依照同一規則排列，方便逐項查閱。

核對比例所需的原始資料已經備妥。先前保存的說明可供檢查最小值時參考。工作人員已完成有關數量的核對。標記可以查閱。資料依照排序規則排列後，仍保留原有的內容。

再次檢查數量後，相關人員已補上必要的說明。如需對照編號，可以參考先前的記錄。數量採用一致的表示方式，便於前後比較。先前保存的說明可供檢查排序結果時參考。

閱讀摘要清單時，可以對照原始資料查看細節。畫面重新排列後，仍能辨認排序規則的位置。先前保存的說明可供檢查篩選條件時參考。相關記錄載有查詢結果的更新時間。

摘要清單中的項目依照同一規則排列，方便逐項查閱。再次檢查時段後，相關人員已補上必要的說明。顯示篩選條件時，應避免遮住相鄰的內容。檢查記錄載有分類的變更內容。

有關數量的標示保持清楚，方便查閱。顯示圖表時，應避免遮住相鄰的內容。再次檢查比較表後，相關人員已補上必要的說明。檢查篩選結果時，請一併核對相關說明。日期可以查閱。

時段已經更新。平均值所用的標記與相關說明一致。如需對照最大值，可以參考先前的記錄。閱讀資料表時，可以對照原始資料查看細節。再次檢查圖表後，相關人員已補上必要的說明。

有關查詢結果的說明已整理完成。資料表中的項目依照同一規則排列，方便逐項查閱。範圍已經核對。工作人員已完成有關資料清單的核對。閱讀明細表時，可以對照原始資料查看細節。

先前保存的說明可供檢查資料清單時參考。有關排序規則的標示保持清楚，方便查閱。畫面重新排列後，仍能辨認結果清單的位置。資料更新時，也應確認名稱是否正確。

排序作業完成後，需要檢查資料是否完整。資料更新時，也應確認分類是否正確。如需對照排序規則，可以參考先前的記錄。再次檢查摘要清單後，相關人員已補上必要的說明。

相關記錄載有資料清單的更新時間。先前保存的說明可供檢查資料總覽時參考。畫面重新排列後，仍能辨認查詢結果的位置。顯示摘要清單時，應避免遮住相鄰的內容。

開始排序作業之前，已保存原始資料供後續核對。核對結果清單所需的原始資料已經備妥。進度採用一致的表示方式，便於前後比較。畫面重新排列後，仍能辨認排序結果的位置。

再次檢查排序規則後，相關人員已補上必要的說明。相關記錄載有篩選條件的更新時間。再次檢查範圍後，相關人員已補上必要的說明。範圍採用一致的表示方式，便於前後比較。

畫面重新排列後，仍能辨認編號的位置。閱讀查詢結果時，可以對照原始資料查看細節。再次檢查篩選條件後，相關人員已補上必要的說明。來源所用的標記與相關說明一致。

工作人員已完成有關分類的核對。總數已經更新。閱讀排序結果時，可以對照原始資料查看細節。顯示編號時，應避免遮住相鄰的內容。先前保存的說明可供檢查標記時參考。

檢查報表時，請一併核對相關說明。更新比較表之前，應先確認原始資料。相關記錄載有名稱的更新時間。核對排序規則所需的原始資料已經備妥。有關圖表的標示保持清楚，方便查閱。

檢查數值時，請一併核對相關說明。顯示來源時，應避免遮住相鄰的內容。核對名稱所需的原始資料已經備妥。更新後的畫面會呈現比例。有關報表的標示保持清楚，方便查閱。

資料總覽已有清楚的標示。核對編號所需的原始資料已經備妥。更新報表之前，應先確認原始資料。如需對照明細表，可以參考先前的記錄。資料表所用的標記與相關說明一致。

### 9. characters — 10 — interfaces

Seed: 20000. Words: 5; grafemi: 10; frasi: 1; paragrafi: 1.

Valutazione: NATURAL.

頁面的位置已經確認。

### 10. characters — 20 — dashboards

Seed: 20002. Words: 11; grafemi: 20; frasi: 1; paragrafi: 1.

Valutazione: NATURAL.

畫面重新排列後，仍能辨認資料清單的位置。

### 11. characters — 35 — documents

Seed: 20005. Words: 18; grafemi: 35; frasi: 2; paragrafi: 1.

Valutazione: ACCEPTABLE.

文件的主要部分依照閱讀需要安排。整理完成後，相關記錄會保存供日後參考。

### 12. characters — 80 — interfaces

Seed: 20006. Words: 41; grafemi: 80; frasi: 4; paragrafi: 1.

Valutazione: ACCEPTABLE.

區塊的輪廓與背景可以清楚區分。尺寸改變後，通知仍保有完整的顯示空間。內容更新後，需要再次確認對話框是否完整呈現。設計記錄保留了輸入欄位的位置及尺寸，供後續比較。

### 13. characters — 150 — dashboards

Seed: 20004. Words: 76; grafemi: 150; frasi: 9; paragrafi: 1.

Valutazione: ACCEPTABLE.

更新後的畫面會呈現篩選條件。如需對照資料表，可以參考先前的記錄。比例採用一致的表示方式，便於前後比較。核對資料總覽所需的原始資料已經備妥。報表所用的標記與相關說明一致。更新編號之前，應先確認原始資料。畫面重新排列後，仍能辨認最大值的位置。圖表可以查閱。結果清單中的項目依照同一規則排列，方便逐項查閱。

### 14. characters — 251 — documents

Seed: 20005. Words: 130; grafemi: 251; frasi: 13; paragrafi: 1.

Valutazione: ACCEPTABLE.

文件的主要部分依照閱讀需要安排。再次閱讀摘要時，可以參考先前留下的註記。更新目錄後，應檢查章節名稱與頁碼是否相符。開始檢查之前，應備妥所需的資料及說明。若整理的安排有變動，應及時通知相關人員。檢查記錄說明了簡報的修改情況。如需補充附註，可以先對照原始資料。工作記錄載明發布的範圍及完成日期。提供指南的時間已經確認，相關人員可以預先安排。分享備份時，應保留必要的背景說明。有關索引的來源說明已保存，可供後續核對。若表格需要修正，相關人員會先記下修改原因。提供歷年資料的時間已經確認，相關人員可以預先安排。

### 15. characters — 500 — interfaces

Seed: 20006. Words: 259; grafemi: 500; frasi: 28; paragrafi: 1.

Valutazione: ACCEPTABLE.

頁尾的輪廓與背景可以清楚區分。尺寸改變後，段落仍保有完整的顯示空間。面板放置在容易辨識的位置。區塊與周圍內容保有適當的間距。頁面與相鄰項目沿著同一基準對齊。背景調整後，應確認導覽列的輪廓仍然清晰。檢查畫面時，也要留意周圍的排列。放大顯示後，仍能辨認卡片的細節。使用鍵盤操作時，可以依序移至開關。比較不同尺寸時，可以觀察說明的變化。檢查人員已記下正文在測試中的顯示情況。內容更新後，需要再次確認提示是否完整呈現。現有空間足以容納提示框，不會遮住其他內容。內容重新排列時，註解與其他項目之間仍有空白。按鈕取得焦點時，畫面會呈現清楚的提示。設計記錄保留了邊框的位置及尺寸，供後續比較。在較窄的空間內，搜尋欄位依然清楚可見。選項沒有被相鄰項目遮擋，所需空間也已預留。有關輸入欄位的操作說明已經整理完成。通知的行距足以讓相鄰文字保持清晰。字體大小調整後，應重新檢查說明的斷行。標題的寬度配合閱讀需要安排，沒有超出可用空間。工具列的輪廓與背景可以清楚區分。頁首清楚可見。圖示與周圍內容保有適當的間距。圖例周圍留有空白。設計記錄保留了進度列的位置及尺寸，供後續比較。內容重新排列時，輸入欄位與其他項目之間仍有空白。

### 16. characters — 1000 — dashboards

Seed: 20007. Words: 507; grafemi: 1000; frasi: 63; paragrafi: 1.

Valutazione: ACCEPTABLE.

相關記錄載有來源的更新時間。顯示最大值時，應避免遮住相鄰的內容。如需對照排序規則，可以參考先前的記錄。畫面重新排列後，仍能辨認數量的位置。工作人員已完成有關比例的核對。更新報表之前，應先確認原始資料。有關篩選結果的標示保持清楚，方便查閱。先前保存的說明可供檢查標記時參考。檢查明細表時，請一併核對相關說明。區間採用一致的表示方式，便於前後比較。核對查詢結果所需的原始資料已經備妥。顯示資料表時，應避免遮住相鄰的內容。再次檢查最小值後，相關人員已補上必要的說明。總數所用的標記與相關說明一致。資料更新時，也應確認分類是否正確。閱讀圖表時，可以對照原始資料查看細節。如需對照資料清單，可以參考先前的記錄。排序作業的處理方式已有清楚的說明。篩選作業完成後，需要檢查資料是否完整。開始排序作業之前，已保存原始資料供後續核對。摘要清單中的項目依照同一規則排列，方便逐項查閱。篩選條件改變後，應重新核對顯示的資料。再次檢查進度後，相關人員已補上必要的說明。工作人員已完成有關結果清單的核對。範圍已經核對。更新後的畫面會呈現編號。時段可以查閱。檢查記錄載有資料總覽的變更內容。排序結果已經更新。檢查平均值時，請一併核對相關說明。數值的說明已經備妥。核對日期所需的原始資料已經備妥。名稱已有清楚的標示。有關報表的說明已整理完成。分類已經核對。相關記錄載有編號的更新時間。比較表目前顯示正常。有關數量的標示保持清楚，方便查閱。篩選作業已經完成。排序規則所用的標記與相關說明一致。先前保存的說明可供檢查時段時參考。閱讀明細表時，可以對照原始資料查看細節。畫面重新排列後，仍能辨認比較表的位置。進度採用一致的表示方式，便於前後比較。資料表中的項目依照同一規則排列，方便逐項查閱。有關摘要清單的說明已整理完成。更新最大值之前，應先確認原始資料。畫面重新排列後，仍能辨認資料總覽的位置。先前保存的說明可供檢查查詢結果時參考。資料更新時，也應確認名稱是否正確。排序作業已有完整的記錄。資料清單中的項目依照同一規則排列，方便逐項查閱。圖表已經更新。比例採用一致的表示方式，便於前後比較。平均值可以查閱。更新後的畫面會呈現最小值。明細表已經核對。檢查記錄載有篩選條件的變更內容。範圍目前顯示正常。篩選作業的處理方式已有清楚的說明。資料可以依日期排序。核對篩選結果所需的原始資料已經備妥。再次檢查結果清單後，相關人員已補上必要的說明。

### 17. sentences — 1 — interfaces

Seed: 20000. Words: 8; grafemi: 15; frasi: 1; paragrafi: 1.

Valutazione: NATURAL.

頁面與周圍內容保有適當的間距。

### 18. sentences — 2 — dashboards

Seed: 20002. Words: 15; grafemi: 30; frasi: 2; paragrafi: 1.

Valutazione: ACCEPTABLE.

檢查記錄載有數值的變更內容。最小值所用的標記與相關說明一致。

### 19. sentences — 3 — documents

Seed: 20005. Words: 28; grafemi: 56; frasi: 3; paragrafi: 1.

Valutazione: ACCEPTABLE.

分享表格時，應保留必要的背景說明。提供指南的時間已經確認，相關人員可以預先安排。有關審閱的工作細節已經整理完成。

### 20. sentences — 5 — interfaces

Seed: 20006. Words: 33; grafemi: 67; frasi: 5; paragrafi: 1.

Valutazione: ACCEPTABLE.

連結已經更新。比較不同尺寸時，可以觀察卡片的變化。區塊與相鄰項目沿著同一基準對齊。輸入欄位放置在容易辨識的位置。導覽列的位置已經確認。

### 21. sentences — 10 — dashboards

Seed: 20004. Words: 79; grafemi: 152; frasi: 10; paragrafi: 1.

Valutazione: ACCEPTABLE.

相關記錄載有明細表的更新時間。比較表目前顯示正常。檢查篩選結果時，請一併核對相關說明。排序結果已經更新。畫面重新排列後，仍能辨認區間的位置。資料總覽所用的標記與相關說明一致。範圍已有清楚的標示。顯示名稱時，應避免遮住相鄰的內容。先前保存的說明可供檢查總數時參考。再次檢查進度後，相關人員已補上必要的說明。

### 22. sentences — 25 — documents

Seed: 20005. Words: 212; grafemi: 413; frasi: 25; paragrafi: 1.

Valutazione: ACCEPTABLE.

分享附註時，應保留必要的背景說明。檢查備忘錄時，應一併參考相關說明。附件的內容完整。相關人員已整理有關段落的核對記錄。文件已經核對。整理完成後，相關記錄會保存供日後參考。草稿的日期已經核對。再次閱讀目錄時，可以參考先前留下的註記。若發布的安排有變動，應及時通知相關人員。校對與其他工作的先後次序已經確認。章節的說明已經備妥。有關檢查的工作細節已經整理完成。若索引需要修正，相關人員會先記下修改原因。提供表格之前，應確認接收對象及使用目的。提供歷年資料的時間已經確認，相關人員可以預先安排。簡報可以查閱。檢查記錄說明了備份的修改情況。核對的時間已經安排，相關人員會預先收到通知。閱讀前言時，應留意它與前後內容的關係。開始確認之前，應備妥所需的資料及說明。指南的保存位置已經確認，方便日後查閱。摘要的內容與所屬文件保持一致。手冊交代了相關工作的目的及適用範圍。參與準備的人員可以查閱相關工作說明。工作記錄載明登記的範圍及完成日期。

### 23. sentences — 50 — interfaces

Seed: 20006. Words: 416; grafemi: 816; frasi: 50; paragrafi: 1.

Valutazione: ACCEPTABLE.

註解目前顯示正常。內容更新後，需要再次確認面板是否完整呈現。比較不同尺寸時，可以觀察頁尾的變化。在較窄的空間內，圖例依然清楚可見。檢查人員已記下選項在測試中的顯示情況。邊框與周圍內容保有適當的間距。連結周圍留有空白。背景調整後，應確認圖片的輪廓仍然清晰。導覽列已經更新。尺寸改變後，工具列仍保有完整的顯示空間。按鈕的輪廓與背景可以清楚區分。放大顯示後，仍能辨認輸入欄位的細節。提示框與相鄰項目沿著同一基準對齊。設計記錄保留了卡片的位置及尺寸，供後續比較。正文清楚可見。畫面沒有被相鄰項目遮擋，所需空間也已預留。狀態列沒有遮住其他內容。說明放置在容易辨識的位置。內容重新排列時，提示與其他項目之間仍有空白。現有空間足以容納進度列，不會遮住其他內容。檢查圖示時，也要留意周圍的排列。有關開關的操作說明已經整理完成。通知的行距足以讓相鄰文字保持清晰。對話框的位置已經確認。閱讀標題時，不會受到相鄰內容的干擾。段落的寬度配合閱讀需要安排，沒有超出可用空間。使用鍵盤操作時，可以依序移至搜尋欄位。開關取得焦點時，畫面會呈現清楚的提示。字體大小調整後，應重新檢查註解的斷行。內容重新排列時，頁首與其他項目之間仍有空白。區塊沒有遮住其他內容。設計記錄保留了頁面的位置及尺寸，供後續比較。檢查人員已記下側欄在測試中的顯示情況。搜尋欄位的輪廓與背景可以清楚區分。比較不同尺寸時，可以觀察按鈕的變化。區塊與相鄰項目沿著同一基準對齊。邊框周圍留有空白。標題與周圍內容保有適當的間距。說明清楚可見。尺寸改變後，連結仍保有完整的顯示空間。放大顯示後，仍能辨認頁尾的細節。現有空間足以容納提示，不會遮住其他內容。頁首的位置已經確認。檢查通知時，也要留意周圍的排列。內容更新後，需要再次確認導覽列是否完整呈現。背景調整後，應確認提示框的輪廓仍然清晰。輸入欄位沒有被相鄰項目遮擋，所需空間也已預留。圖片目前顯示正常。在較窄的空間內，頁面依然清楚可見。面板已經更新。

### 24. sentences — 100 — dashboards

Seed: 20007. Words: 779; grafemi: 1536; frasi: 100; paragrafi: 1.

Valutazione: ACCEPTABLE.

日期採用一致的表示方式，便於前後比較。如需對照標記，可以參考先前的記錄。更新後的畫面會呈現篩選結果。編號目前顯示正常。最小值所用的標記與相關說明一致。核對比例所需的原始資料已經備妥。有關數量的說明已整理完成。資料表已經更新。相關記錄載有總數的更新時間。資料清單已有清楚的標示。再次檢查資料總覽後，相關人員已補上必要的說明。檢查明細表時，請一併核對相關說明。資料更新時，也應確認來源是否正確。畫面重新排列後，仍能辨認排序規則的位置。結果清單可以查閱。有關查詢結果的標示保持清楚，方便查閱。檢查記錄載有比較表的變更內容。進度的說明已經備妥。先前保存的說明可供檢查名稱時參考。時段已經核對。顯示分類時，應避免遮住相鄰的內容。更新區間之前，應先確認原始資料。工作人員已完成有關最大值的核對。篩選條件改變後，應重新核對顯示的資料。摘要清單中的項目依照同一規則排列，方便逐項查閱。篩選作業完成後，需要檢查資料是否完整。閱讀排序結果時，可以對照原始資料查看細節。開始排序作業之前，已保存原始資料供後續核對。資料依照排序規則排列後，仍保留原有的內容。篩選作業已經完成。再次檢查平均值後，相關人員已補上必要的說明。檢查記錄載有範圍的變更內容。排序作業已有完整的記錄。報表所用的標記與相關說明一致。相關記錄載有圖表的更新時間。檢查數值時，請一併核對相關說明。資料可以依日期排序。工作人員已完成有關比例的核對。篩選作業的處理方式已有清楚的說明。分類的說明已經備妥。更新後的畫面會呈現報表。區間已有清楚的標示。有關資料總覽的標示保持清楚，方便查閱。如需對照圖表，可以參考先前的記錄。先前保存的說明可供檢查標記時參考。更新資料表之前，應先確認原始資料。核對來源所需的原始資料已經備妥。數值可以查閱。最大值採用一致的表示方式，便於前後比較。有關篩選條件的說明已整理完成。平均值已經更新。顯示查詢結果時，應避免遮住相鄰的內容。結果清單已經核對。資料更新時，也應確認編號是否正確。畫面重新排列後，仍能辨認篩選結果的位置。資料清單中的項目依照同一規則排列，方便逐項查閱。最小值目前顯示正常。閱讀比較表時，可以對照原始資料查看細節。檢查記錄載有總數的變更內容。排序作業已經完成。先前保存的說明可供檢查時段時參考。畫面重新排列後，仍能辨認日期的位置。數量已經更新。更新後的畫面會呈現排序結果。有關摘要清單的標示保持清楚，方便查閱。顯示範圍時，應避免遮住相鄰的內容。工作人員已完成有關明細表的核對。再次檢查名稱後，相關人員已補上必要的說明。進度所用的標記與相關說明一致。篩選作業已有完整的記錄。如需對照時段，可以參考先前的記錄。排序作業的處理方式已有清楚的說明。核對篩選條件所需的原始資料已經備妥。檢查名稱時，請一併核對相關說明。篩選結果的說明已經備妥。相關記錄載有日期的更新時間。更新最小值之前，應先確認原始資料。圖表已有清楚的標示。資料表中的項目依照同一規則排列，方便逐項查閱。平均值已經核對。閱讀資料總覽時，可以對照原始資料查看細節。資料清單可以查閱。有關最大值的說明已整理完成。範圍目前顯示正常。數值採用一致的表示方式，便於前後比較。資料更新時，也應確認標記是否正確。開始篩選作業之前，已保存原始資料供後續核對。排序作業完成後，需要檢查資料是否完整。核對區間所需的原始資料已經備妥。更新後的畫面會呈現編號。有關分類的標示保持清楚，方便查閱。摘要清單目前顯示正常。畫面重新排列後，仍能辨認比例的位置。工作人員已完成有關來源的核對。相關記錄載有排序結果的更新時間。檢查比較表時，請一併核對相關說明。結果清單的說明已經備妥。查詢結果所用的標記與相關說明一致。排序規則可以查閱。如需對照總數，可以參考先前的記錄。
