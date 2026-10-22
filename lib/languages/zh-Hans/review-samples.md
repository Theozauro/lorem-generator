# zh-Hans — seconda revisione linguistica: 24 nuovi campioni

Contratto: `zh-Hans-lexical-v1`. Il motore resta locale e **disabilitato nella UI**.

Questi campioni sono destinati alla seconda revisione linguistica. Il superamento dei controlli tecnici non costituisce approvazione madrelingua o autorizzazione all’attivazione.

## Correzioni e verifica tecnica

- Inventario: 2.992 → 2.992 forme; 73 realizzazioni corrette, con basi conservate.
- 29 correzioni condivise del contrasto; 44 associazioni soggetto/template sostituite da varianti specifiche. Nessun riempitivo o nuovo frammento.
- 42 forme cambiano conteggio Words; 41 cambiano grafemi. Nessuna cambia numero di frasi.
- Conservate le convenzioni di `不会`, `所需`, `所用`; niente segmentazione ICU delle parole.
- 60.000 coppie Words/paragrafi: 58.635 supportate, 1.365 strutturalmente impossibili. Ogni coppia supportata è stata generata.
- Minimi ricalcolati per P=1…30: 3, 6, 9, …, 90. Nessun buco sopra il minimo fino a 2.000 parole. La UI interroga la fattibilità reale, non una soglia hardcoded.
- 154 casi limite × 50 seed: 6.200 generazioni supportate riuscite e 1.500 rifiuti strutturali corretti.
- Characters: tutti i 9.991 target 10…10.000 generati, più 1.525 prove dense/multi-seed; nessun buco.
- Sentences: 1…100 × 10 seed; conteggi e dedupe esatti.
- Audit principale: 78.847 output controllati; zero errori di conteggio, frasi sconosciute, basi/frasi duplicate, template identici consecutivi anche tra paragrafi, famiglie miste, spazi artificiali o punteggiatura malformata.
- 73/73 fixture delle sostituzioni approvate verificate. Le vecchie stringhe sono conservate soltanto nelle fixture negative, non nell’inventario attivo.
- Regressione giapponese mirata: 35/35. Giapponese e UI non modificati.

### Passaggio finale mirato dopo la seconda revisione

Tre ulteriori varianti Dashboard corrette: `范围:short-adjustable`, `记录:dated`, `视图:related`. Le 73 correzioni e l'audit esaustivo sopra descritti restano la verifica precedente; questo passaggio non li riesegue.

- Inventario e identità delle risorse invariati: 2.992 forme. Solo tre testi/segmentazioni cambiano; Words/grafemi/frasi restano rispettivamente 8/16/1, 10/21/1 e 8/17/1. Contratto `zh-Hans-lexical-v1` invariato.
- 76 fixture delle sostituzioni verificate; nuove stringhe registrate una sola volta, vecchie stringhe assenti dal corpus attivo.
- 90 generazioni mirate (30 seed × Words 2.000/30, Characters 10.000, Sentences 100): tutte passano; ciascuna delle tre risorse viene esercitata in ciascuna modalità.
- Ricontrollati Words 142/19 seed 401002 e Characters 251/2000/10000 seed 402806/403104/403402: tutti ACCEPTABLE, conteggi invariati, vecchie formulazioni assenti.
- 18 nuovi campioni Dashboard (6 per modalità): NATURAL 3, ACCEPTABLE 15, QUESTIONABLE 0, BAD 0.
- 40 generazioni di fattibilità mirata e 15 rifiuti sotto il minimo corretti; smoke giapponese 4/4. Nessuna modifica a planner, ritmo, giapponese o UI.
- Nei campioni esistenti 8 e 16 sono aggiornate soltanto le due formulazioni interessate; seed e statistiche rimangono invariati.

## Confronto del ritmo

Stesse 1.000 richieste stratificate prima/dopo:

| Indicatore | Prima | Dopo |
|---|---:|---:|
| Vecchie forme difettose negli output | 1843 | 0 |
| Finestre di template A–B–A–B | 1226 | 256 |
| Concentrazioni template/posizione ≥50% e almeno 5 paragrafi | 76 | 7 |
| Adiacenze dello stesso soggetto | 42 | 78 |

L’adiacenza dello stesso soggetto non è vietata: può mantenere una continuità naturale. Nel confronto, le coppie brevi equivalenti con lo stesso soggetto restano 0 → 0. Le preferenze restano morbide e subordinate alla fattibilità.

Nel caso 1.000 parole / 25 paragrafi, seed 10044, `edge` passa da 25/25 nella terza posizione a una distribuzione 6/6/6/7 nelle quattro posizioni.

Su 1.000 richieste Sentences (1…100 × 10 seed), la catena massima di frasi brevi passa da 7 a 2; gli output con almeno quattro frasi brevi consecutive passano da 167 a 0. I paragrafi brevi richiesti da budget minimi Words restano consentiti.

## Prestazioni

Confronto warm nello stesso processo, snapshot originale verificato tramite SHA-256, 30 esecuzioni per richiesta. Tempi in millisecondi; mediana prima/dopo e p95 dopo.

| Richiesta | Mediana prima | Mediana dopo | p95 dopo |
|---|---:|---:|---:|
| 2.000 parole / 30 paragrafi | 1.01 | 1.90 | 3.21 |
| 10.000 caratteri | 14.37 | 15.12 | 16.06 |
| 100 frasi | 26.41 | 31.09 | 33.69 |

## Campioni

### 1. Parole — 3 — interfaces

Seed: 20000. Parole canoniche: 3; grafemi: 7; frasi: 1; paragrafi: 1.

徽标已经更新。

### 2. Parole — 8 — dashboards

Seed: 20002. Parole canoniche: 8; grafemi: 16; frasi: 1; paragrafi: 1.

当前页面按照统一的规则展示数据。

### 3. Parole — 15 — documents

Seed: 20005. Parole canoniche: 15; grafemi: 31; frasi: 2; paragrafi: 2.

负责人已经核对了文件中的信息。

目录列出了主要章节及其位置。

### 4. Parole — 40 — interfaces

Seed: 20006. Parole canoniche: 40; grafemi: 84; frasi: 6; paragrafi: 3.

标签已经更新。页面采用清晰的层级，便于识别按钮的位置。

列表显示正常。面板的显示状态会随页面内容一起更新。

通知已经显示。布局调整后，复选框与页面边缘之间仍有空白。

### 5. Parole — 100 — dashboards

Seed: 20004. Parole canoniche: 100; grafemi: 202; frasi: 10; paragrafi: 5.

比例的显示结果与当前筛选条件保持一致。相关说明列出了分组的来源和更新时间。

区间在不同视图中采用相同的标记方式。为便于比较，页面使用一致的格式展示记录。

在整理记录时，需要统一统计的显示格式。页面提供了列表的说明，以便理解当前数据。

摘要的相关记录按照日期排列，便于后续核查。数据更新后，系统会重新检查结果是否正确。

保存筛选条件后，可以再次查看对应的结果。名称的显示结果与当前筛选条件保持一致。

### 6. Parole — 139 — documents

Seed: 20005. Parole canoniche: 139; grafemi: 304; frasi: 19; paragrafi: 19.

负责人已经核对了版本中的信息。

文件的更新日期已经完成核对。

负责人已经核对了索引中的信息。

记录的更新日期已经完成核对。

负责人已经核对了简报中的信息。

报告的更新日期已经完成核对。

负责人已经核对了备忘录中的信息。

目录的更新日期已经完成核对。

负责人已经核对了指南中的信息。

草稿的更新日期已经完成核对。

负责人已经核对了档案中的信息。

附件的更新日期已经完成核对。

正文中的信息已经核对。

摘要的更新日期已经完成核对。

负责人已经核对了正文中的信息。

段落介绍了当前工作的目的。

正文的更新日期已经完成核对。

负责人已经核对了摘要中的信息。

版本中的信息已经核对。

### 7. Parole — 300 — interfaces

Seed: 20006. Parole canoniche: 300; grafemi: 647; frasi: 30; paragrafi: 30.

页面采用清晰的层级，便于识别分页器的位置。

徽标与周围元素之间的间距保持一致。

开关的边界与背景之间有足够的对比度。

布局调整后，分页器与页面边缘之间仍有空白。

复选框的显示状态会随页面内容一起更新。

在不同屏幕上，弹窗都能清晰显示。

页面中的搜索框与其他元素之间没有重叠。

布局调整后，滑块与页面边缘之间仍有空白。

检查对话框时，需要同时观察周围内容的变化。

布局调整后，徽标与页面边缘之间仍有空白。

对话框的位置调整不会改变页面的基本结构。

窗口大小变化时，侧边栏仍然位于预定区域。

通过比较不同视图，可以确认复选框是否清晰可见。

测试结果表明，导航栏在窄屏上仍然可见。

页面采用清晰的层级，便于识别进度条的位置。

布局调整后，侧边栏与页面边缘之间仍有空白。

容器的边界与背景之间有足够的对比度。

页面放大后，侧边栏的显示比例保持协调。

状态栏的显示状态会随页面内容一起更新。

布局调整后，进度条与页面边缘之间仍有空白。

页面中的工具栏与其他元素之间没有重叠。

布局调整后，模块与页面边缘之间仍有空白。

检查状态栏时，需要同时观察周围内容的变化。

菜单的排列方式与相邻元素保持一致。

状态栏的位置调整不会改变页面的基本结构。

当前布局能够完整显示导航栏以及相关信息。

布局调整后，控件与页面边缘之间仍有空白。

通过比较不同视图，可以确认导航栏是否清晰可见。

页面为模块预留了足够的显示空间。

布局调整后，导航与页面边缘之间仍有空白。

### 8. Parole — 1000 — dashboards

Seed: 20007. Parole canoniche: 1000; grafemi: 1986; frasi: 100; paragrafi: 25.

名称的相关记录按照日期排列，便于后续核查。明细中的条目按照选定顺序排列，便于逐项检查。查看计数时，需要确认所用的时间范围。指标在不同视图中采用相同的标记方式。

相关说明列出了样本的来源和更新时间。数据更新后，系统会重新检查标签的显示结果。页面提供了趋势的说明，以便理解当前数据。状态的变化可以通过相关记录进行核对。

数据的显示结果与当前筛选条件保持一致。核对完成后，系统会保留记录对应的处理记录。在整理记录时，需要统一汇总的显示格式。系统保留了与数量相关的原始记录。

分类中的条目按照选定顺序排列，便于逐项检查。系统保留了与时段相关的原始记录。为便于比较，页面使用一致的格式展示日期。分布的相关记录按照日期排列，便于后续核查。

数据更新后，系统会重新检查比例的显示结果。相关说明列出了数量的来源和更新时间。进度的显示方式可以根据查看需要调整。页面提供了分布的说明，以便理解当前数据。

行号的变化可以通过相关记录进行核对。区间的显示结果与当前筛选条件保持一致。数值的相关记录按照日期排列，便于后续核查。保存筛选条件后，可以再次查看范围的显示结果。

编号的显示方式可以根据查看需要调整。页面提供了数量的说明，以便理解当前数据。相关说明列出了时段的来源和更新时间。数据更新后，系统会重新检查排序的显示结果。

保存筛选条件后，可以再次查看时段的显示结果。结果的变化可以通过相关记录进行核对。统计的显示结果与当前筛选条件保持一致。相关说明列出了状态的来源和更新时间。

为便于比较，页面使用一致的格式展示范围。日期的显示方式可以根据查看需要调整。展示数值时，相关说明会标明采用的表示方式。图表的显示结果与当前筛选条件保持一致。

在整理记录时，需要统一分组的显示格式。保存筛选条件后，可以再次查看指标的显示结果。来源在不同视图中采用相同的标记方式。查看列表时，需要确认所用的时间范围。

展示编号时，相关说明会标明采用的表示方式。状态的相关记录按照日期排列，便于后续核查。总量的显示方式可以根据查看需要调整。为便于比较，页面使用一致的格式展示维度。

查看样本时，需要确认所用的时间范围。展示维度时，相关说明会标明采用的表示方式。相关说明列出了图表的来源和更新时间。数据的相关记录按照日期排列，便于后续核查。

页面提供了数据的说明，以便理解当前数据。指标的显示结果与当前筛选条件保持一致。数据更新后，系统会重新检查分布的显示结果。筛选的显示方式可以根据查看需要调整。

进度在不同视图中采用相同的标记方式。查看明细时，需要确认所用的时间范围。为便于比较，页面使用一致的格式展示进度。核对完成后，系统会保留样本对应的处理记录。

系统保留了与报表相关的原始记录。列表在不同视图中采用相同的标记方式。展示计数时，相关说明会标明采用的表示方式。在整理记录时，需要统一范围的显示格式。

报表的相关记录按照日期排列，便于后续核查。为便于比较，页面使用一致的格式展示筛选。系统保留了与名称相关的原始记录。数据更新后，系统会重新检查数值的显示结果。

比例在不同视图中采用相同的标记方式。页面提供了状态的说明，以便理解当前数据。保存筛选条件后，可以再次查看标签的显示结果。系统保留了与结果相关的原始记录。

来源的显示结果与当前筛选条件保持一致。在整理记录时，需要统一报表的显示格式。数据中的条目按照选定顺序排列，便于逐项检查。查看范围时，需要确认所用的时间范围。

相关说明列出了摘要的来源和更新时间。保存筛选条件后，可以再次查看排序的显示结果。系统保留了与分类相关的原始记录。页面提供了明细的说明，以便理解当前数据。

核对完成后，系统会保留数量对应的处理记录。为便于比较，页面使用一致的格式展示行号。摘要的变化可以通过相关记录进行核对。在整理记录时，需要统一来源的显示格式。

页面提供了行号的说明，以便理解当前数据。统计在不同视图中采用相同的标记方式。核对完成后，系统会保留计数对应的处理记录。分组的显示方式可以根据查看需要调整。

展示总量时，相关说明会标明采用的表示方式。分类的变化可以通过相关记录进行核对。在整理记录时，需要统一计数的显示格式。相关说明列出了视图的来源和更新时间。

在整理记录时，需要统一比例的显示格式。保存的相关记录按照日期排列，便于后续核查。查看时段时，需要确认所用的时间范围。图表中的条目按照选定顺序排列，便于逐项检查。

核对完成后，系统会保留视图对应的处理记录。数据更新后，系统会重新检查结果是否正确。范围的变化可以通过相关记录进行核对。相关说明列出了统计的来源和更新时间。

数值的显示方式可以根据查看需要调整。视图中的条目按照选定顺序排列，便于逐项检查。进度的显示结果与当前筛选条件保持一致。保存筛选条件后，可以再次查看对应的结果。

### 9. Caratteri — 10 — interfaces

Seed: 20000. Parole canoniche: 4; grafemi: 10; frasi: 1; paragrafi: 1.

工具栏目前显示正常。

### 10. Caratteri — 20 — dashboards

Seed: 20002. Parole canoniche: 10; grafemi: 20; frasi: 1; paragrafi: 1.

为便于比较，页面使用一致的格式展示数据。

### 11. Caratteri — 35 — documents

Seed: 20005. Parole canoniche: 19; grafemi: 35; frasi: 2; paragrafi: 1.

指南说明了当前工作的目的和适用范围。清单的结构与实际阅读顺序保持一致。

### 12. Caratteri — 80 — interfaces

Seed: 20006. Parole canoniche: 39; grafemi: 80; frasi: 4; paragrafi: 1.

滑块可以在多个布局方案中使用。菜单与周围元素之间的间距保持一致。通过比较不同视图，可以确认容器是否清晰可见。测试人员可以通过键盘访问输入框，并检查焦点是否清晰。

### 13. Caratteri — 150 — dashboards

Seed: 20004. Parole canoniche: 78; grafemi: 150; frasi: 8; paragrafi: 1.

汇总的显示结果与当前筛选条件保持一致。核对完成后，系统会保留列表对应的处理记录。相关说明列出了总量的来源和更新时间。查看日期时，需要确认所用的时间范围。系统保留了与比例相关的原始记录。保存筛选条件后，可以再次查看维度的显示结果。在整理记录时，需要统一趋势的显示格式。当前视图能够显示来源以及相关记录。

### 14. Caratteri — 251 — documents

Seed: 20005. Parole canoniche: 125; grafemi: 251; frasi: 13; paragrafi: 1.

指南说明了当前工作的目的和适用范围。存放简报的位置已经明确，便于相关人员查阅。摘要采用清晰的层级，便于查找所需信息。共享原稿时，应当确认接收范围和使用目的。负责人已经记录了与整理相关的日期和要求。对照原始材料阅读档案，可以检查信息是否一致。信息的结构与实际阅读顺序保持一致。整理资料时，需要统一相关术语和格式。修改索引后，负责人会记录更新日期和版本。正文保留了必要的来源说明，便于后续核查。表格中的修改已经记录，相关人员可以查看变更情况。方案已经更新。标题按照内容类型组织，相关部分之间具有清晰的联系。

### 15. Caratteri — 500 — interfaces

Seed: 20006. Parole canoniche: 258; grafemi: 500; frasi: 27; paragrafi: 1.

正文可以在多个布局方案中使用。控件与周围元素之间的间距保持一致。工具栏的显示区域留有适当的空白。测试结果表明，侧边栏在窄屏上仍然可见。布局调整后，表单与页面边缘之间仍有空白。搜索框的排列方式与相邻元素保持一致。卡片的显示状态会随页面内容一起更新。页面中的容器与其他元素之间没有重叠。在不同屏幕上，分页器都能清晰显示。页面采用清晰的层级，便于识别选项的位置。设计人员记录了导航在不同尺寸下的显示情况。页面放大后，链接的显示比例保持协调。面板的边界与背景之间有足够的对比度。检查标签时，需要同时观察周围内容的变化。每次更新后，测试人员都会复核说明的显示效果。窗口大小变化时，模块仍然位于预定区域。页面为通知预留了足够的显示空间。列表可以在多个布局方案中使用。当前布局能够完整显示按钮以及相关信息。通过比较不同视图，可以确认开关是否清晰可见。测试人员可以通过键盘访问对话框，并检查焦点是否清晰。调整字号后，需要重新检查标题的可读性。提示的显示区域留有适当的空白。复选框的显示范围可以根据需要调整。页面为图例预留了足够的显示空间。图片与周围元素之间的间距保持一致。每次更新后，测试人员都会复核弹窗的显示效果。

### 16. Caratteri — 1000 — dashboards

Seed: 20007. Parole canoniche: 516; grafemi: 1000; frasi: 51; paragrafi: 1.

在整理记录时，需要统一数量的显示格式。数据更新后，系统会重新检查计数的显示结果。相关说明列出了摘要的来源和更新时间。分组在不同视图中采用相同的标记方式。显示的数值范围可以根据需要调整。结果中的条目按照选定顺序排列，便于逐项检查。查看视图时，需要确认所用的时间范围。系统保留了与日期相关的原始记录。为便于比较，页面使用一致的格式展示数值。明细的变化可以通过相关记录进行核对。查看汇总信息时，还可以检查区间对应的详细记录。每次刷新后，页面都会核对图表与原始数据是否一致。统计的显示方式可以根据查看需要调整。筛选条件变化后，与记录相关的信息会同步更新。核对完成后，系统会保留样本对应的处理记录。页面提供了排序的说明，以便理解当前数据。比例的显示结果与当前筛选条件保持一致。当前视图能够显示状态以及相关记录。名称的相关记录按照日期排列，便于后续核查。展示时段时，相关说明会标明采用的表示方式。保存筛选条件后，可以再次查看总量的显示结果。在整理记录时，需要统一筛选的显示格式。数据更新后，系统会重新检查编号的显示结果。报表的显示方式可以根据查看需要调整。相关说明列出了行号的来源和更新时间。当前页面按照统一的规则展示列表。筛选条件变化后，与标签相关的信息会同步更新。来源的变化可以通过相关记录进行核对。趋势的显示范围可以根据需要调整。页面提供了分类的说明，以便理解当前数据。查看分布时，需要确认所用的时间范围。查看汇总信息时，还可以检查数据对应的详细记录。每次刷新后，页面都会核对汇总与原始数据是否一致。进度在不同视图中采用相同的标记方式。保存筛选条件后，可以再次查看维度的显示结果。指标的相关记录按照日期排列，便于后续核查。为便于比较，页面使用一致的格式展示名称。区间的显示结果与当前筛选条件保持一致。当前视图能够显示数值以及相关记录。展示进度时，相关说明会标明采用的表示方式。样本中的条目按照选定顺序排列，便于逐项检查。核对完成后，系统会保留状态对应的处理记录。在整理记录时，需要统一编号的显示格式。数据更新后，系统会重新检查分类的显示结果。结果的显示方式可以根据查看需要调整。指标的变化可以通过相关记录进行核对。系统保留了与统计相关的原始记录。记录中的条目按照选定顺序排列，便于逐项检查。相关说明列出了标签的来源和更新时间。数据的显示结果与当前筛选条件保持一致。总量的相关记录按照日期排列，便于后续核查。

### 17. Frasi — 1 — interfaces

Seed: 20000. Parole canoniche: 8; grafemi: 15; frasi: 1; paragrafi: 1.

徽标的显示区域留有适当的空白。

### 18. Frasi — 2 — dashboards

Seed: 20002. Parole canoniche: 14; grafemi: 27; frasi: 2; paragrafi: 1.

分类目前显示正常。来源在不同视图中采用相同的标记方式。

### 19. Frasi — 3 — documents

Seed: 20005. Parole canoniche: 22; grafemi: 46; frasi: 3; paragrafi: 1.

方案保持一致。如果汇总需要调整，负责人会及时通知相关人员。文件的结构与实际阅读顺序保持一致。

### 20. Frasi — 5 — interfaces

Seed: 20006. Parole canoniche: 42; grafemi: 83; frasi: 5; paragrafi: 1.

图例可以在多个布局方案中使用。检查说明时，需要同时观察周围内容的变化。在不同屏幕上，侧边栏都能清晰显示。标签的显示状态已经确认。当前布局能够完整显示开关以及相关信息。

### 21. Frasi — 10 — dashboards

Seed: 20004. Parole canoniche: 86; grafemi: 171; frasi: 10; paragrafi: 1.

查看汇总信息时，还可以检查时段对应的详细记录。状态在不同视图中采用相同的标记方式。保存筛选条件后，可以再次查看排序的显示结果。分类的相关记录按照日期排列，便于后续核查。页面提供了数据的说明，以便理解当前数据。数量可以查看。指标的显示方式可以根据查看需要调整。显示的结果与当前筛选条件保持一致。总量的变化可以通过相关记录进行核对。样本已经更新。

### 22. Frasi — 25 — documents

Seed: 20005. Parole canoniche: 218; grafemi: 443; frasi: 25; paragrafi: 1.

索引可以查看。负责人已经记录了与备忘录相关的日期和要求。内容中的信息已经核对。准备结束后，相关记录会整理保存，供后续参考。开始登记之前，应当确认所需材料是否齐备。负责人已经核对了记录中的信息。简报按照内容类型组织，相关部分之间具有清晰的联系。版本内容的结构与实际阅读顺序保持一致。整理通知时，需要统一相关术语和格式。确认完成后，条目会按照约定方式分类保存。如果报告存在遗漏，需要对照原始记录补充信息。如果排版需要调整，负责人会及时通知相关人员。共享摘要时，应当确认接收范围和使用目的。原稿的内容完整。发布的时间已经列入日程，相关人员可以提前准备。负责人已经明确整理涉及的主要环节和完成要求。清单已经确认。段落介绍了当前工作的目的。存放文档的位置已经明确，便于相关人员查阅。共享说明之前，需要先核对其中的日期和内容。标题中的修改已经记录，相关人员可以查看变更情况。提纲保持一致。修改草稿后，负责人会记录更新日期和版本。校对需要与其他工作协调，避免出现时间冲突。指南的更新日期已经完成核对。

### 23. Frasi — 50 — interfaces

Seed: 20006. Parole canoniche: 423; grafemi: 838; frasi: 50; paragrafi: 1.

当前布局能够完整显示模块以及相关信息。页面为徽标预留了足够的显示空间。页面采用清晰的层级，便于识别标题的位置。页面中的状态栏与其他元素之间没有重叠。开关已经显示。工具栏可以在多个布局方案中使用。检查正文时，需要同时观察周围内容的变化。图标的显示区域留有适当的空白。在不同屏幕上，菜单都能清晰显示。按钮的排列方式与相邻元素保持一致。导航的位置调整不会改变页面的基本结构。容器目前显示正常。选择框与周围元素之间的间距保持一致。选项在不同页面上保持一致。测试结果表明，说明在窄屏上仍然可见。图片显示正常。页面放大后，提示的显示比例保持协调。测试人员可以通过键盘访问搜索框，并检查焦点是否清晰。面板的显示状态已经确认。表单的边界与背景之间有足够的对比度。对话框保持稳定。布局调整后，复选框与页面边缘之间仍有空白。进度条目前可以正常显示。每次更新后，测试人员都会复核弹窗的显示效果。调整字号后，需要重新检查标签的可读性。分页器已经更新。侧边栏的显示状态会随页面内容一起更新。通过比较不同视图，可以确认通知是否清晰可见。链接的显示范围可以根据需要调整。设计人员记录了图例在不同尺寸下的显示情况。窗口大小变化时，控件仍然位于预定区域。列表在不同页面上保持一致。测试人员可以通过键盘访问输入框，并检查焦点是否清晰。导航栏保持稳定。卡片与周围元素之间的间距保持一致。滑块的显示区域留有适当的空白。设计人员记录了按钮在不同尺寸下的显示情况。复选框的显示状态已经确认。页面中的滑块与其他元素之间没有重叠。测试结果表明，通知在窄屏上仍然可见。检查弹窗时，需要同时观察周围内容的变化。开关目前显示正常。页面放大后，进度条的显示比例保持协调。当前布局能够完整显示图片以及相关信息。图标的位置调整不会改变页面的基本结构。说明的显示状态会随页面内容一起更新。在不同屏幕上，输入框都能清晰显示。布局调整后，选项与页面边缘之间仍有空白。页面采用清晰的层级，便于识别导航栏的位置。面板的排列方式与相邻元素保持一致。

### 24. Frasi — 100 — dashboards

Seed: 20007. Parole canoniche: 856; grafemi: 1685; frasi: 100; paragrafi: 1.

汇总可以查看。展示来源时，相关说明会标明采用的表示方式。比例已经更新。进度的相关记录按照日期排列，便于后续核查。报表在不同页面上保持一致。系统保留了与数量相关的原始记录。当前视图能够显示指标以及相关记录。分组中的条目按照选定顺序排列，便于逐项检查。日期的显示方式可以根据查看需要调整。记录在不同视图中采用相同的标记方式。状态的显示范围可以根据需要调整。核对完成后，系统会保留排序对应的处理记录。编号显示正常。保存筛选条件后，可以再次查看分类的显示结果。数据更新后，系统会重新检查维度的显示结果。统计保持稳定。名称的显示结果与当前筛选条件保持一致。相关说明列出了行号的来源和更新时间。时段的变化可以通过相关记录进行核对。图表目前显示正常。为便于比较，页面使用一致的格式展示数据。每次刷新后，页面都会核对结果与原始数据是否一致。在整理记录时，需要统一样本的显示格式。页面提供了总量的说明，以便理解当前数据。区间的显示状态已经确认。查看摘要时，需要确认所用的时间范围。筛选条件变化后，与范围相关的信息会同步更新。当前页面按照统一的规则展示明细。分布目前可以正常显示。查看汇总信息时，还可以检查数值对应的详细记录。筛选结果保持稳定。系统保留了与列表相关的原始记录。在整理记录时，需要统一标签的显示格式。查看视图时，需要确认所用的时间范围。筛选条件变化后，与计数相关的信息会同步更新。趋势在不同视图中采用相同的标记方式。当前视图能够显示排序以及相关记录。为便于比较，页面使用一致的格式展示比例。名称目前可以正常显示。当前页面按照统一的规则展示数据。页面提供了维度的说明，以便理解当前数据。计数目前显示正常。行号的相关记录按照日期排列，便于后续核查。核对完成后，系统会保留分组对应的处理记录。时段的显示范围可以根据需要调整。明细中的条目按照选定顺序排列，便于逐项检查。分类的变化可以通过相关记录进行核对。进度的显示结果与当前筛选条件保持一致。数值显示正常。数据更新后，系统会重新检查标签的显示结果。每次刷新后，页面都会核对区间与原始数据是否一致。趋势的显示方式可以根据查看需要调整。相关说明列出了数据来源及其更新时间。图表在不同页面上保持一致。展示范围时，相关说明会标明采用的表示方式。编号的显示状态已经确认。查看汇总信息时，还可以检查筛选对应的详细记录。结果可以查看。保存筛选条件后，可以再次查看日期的显示结果。样本已经更新。当前页面按照统一的规则展示状态。数量的显示范围可以根据需要调整。为便于比较，页面使用一致的格式展示列表。当前视图能够显示总量以及相关记录。汇总的显示结果与当前筛选条件保持一致。指标的相关记录按照日期排列，便于后续核查。记录的显示状态已经确认。在整理记录时，需要统一视图的显示格式。系统保留了与报表相关的原始记录。摘要在不同视图中采用相同的标记方式。分布保持稳定。筛选条件变化后，与统计相关的信息会同步更新。分布已经更新。相关说明列出了汇总的来源和更新时间。查看汇总信息时，还可以检查计数对应的详细记录。摘要在不同页面上保持一致。页面提供了列表的说明，以便理解当前数据。数量目前显示正常。报表的显示方式可以根据查看需要调整。保存筛选条件后，可以再次查看趋势的显示结果。来源的变化可以通过相关记录进行核对。数据更新后，系统会重新检查编号的显示结果。查看标签时，需要确认对应的记录。数据目前可以正常显示。每次刷新后，页面都会核对排序与原始数据是否一致。核对完成后，系统会保留明细对应的处理记录。进度可以查看。展示名称时，相关说明会标明采用的表示方式。图表中的条目按照选定顺序排列，便于逐项检查。行号显示正常。页面提供了记录的说明，以便理解当前数据。分组的显示范围可以根据需要调整。为便于比较，页面使用一致的格式展示筛选。区间的变化可以通过相关记录进行核对。数值的显示状态已经确认。当前页面按照统一的规则展示维度。分类的相关记录按照日期排列，便于后续核查。总量的显示结果与当前筛选条件保持一致。列表支持按日期排序。每次刷新后，页面都会核对范围与原始数据是否一致。
