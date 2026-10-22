// Closed, original placeholder corpus. Lexical boundaries are product data,
// not character boundaries or ICU word guesses. Native review is still required.
export const simplifiedChineseContractVersion = "zh-Hans-lexical-v1";
export type ChineseFamily = "interfaces" | "dashboards" | "documents";
export const chineseFamilies: readonly ChineseFamily[] = ["interfaces", "dashboards", "documents"];
type Kind = "surface" | "interactive" | "text" | "metric" | "collection" | "document" | "activity";
type Subject = { id: string; words: readonly string[]; kind: Kind };
type Pattern = { id: string; kinds: readonly Kind[]; render: (subject: readonly string[]) => string[]; variants?: Readonly<Record<string, readonly string[]>> };
export type ChineseForm = {
  baseId: string; text: string; segmentation: readonly string[]; wordCount: number;
  family: ChineseFamily; template: string; lexemes: readonly string[];
  role: "neutral"; short: boolean; contractVersion: string;
};
export const chinesePunctuation = new Set(["。", "，", "、", "：", "；"]);
const subjects = (kind: Kind, names: readonly string[]): Subject[] => names.map(name => ({ id: name, words: name.split("|"), kind }));
function forms(family: ChineseFamily, nouns: Subject[], patterns: Pattern[], short = false): ChineseForm[] {
  return nouns.flatMap(noun => patterns.filter(pattern => pattern.kinds.includes(noun.kind)).map(pattern => {
    // A subject specialization excludes that noun from the generic realization.
    // It replaces one existing resource; it never adds a second base/sentence.
    const segmentation = [...(pattern.variants?.[noun.id] ?? pattern.render(noun.words))];
    return { baseId: `${family}:${noun.id}:${pattern.id}`, text: segmentation.join("").normalize("NFC"), segmentation,
      wordCount: segmentation.filter(word => !chinesePunctuation.has(word)).length,
      family, template: `${family}:${pattern.id}`, lexemes: [noun.words.join("")], role: "neutral" as const,
      short, contractVersion: simplifiedChineseContractVersion };
  }));
}
const visualKinds: Kind[] = ["surface", "interactive", "text"];
const interfaceSubjects = [
  ...subjects("surface", ["徽标", "弹窗", "面板", "图标", "图片", "卡片", "工具栏", "导航栏", "侧边栏", "状态栏", "进度条", "容器", "模块", "图例"]),
  ...subjects("interactive", ["按钮", "菜单", "表单", "选项", "控件", "链接", "导航", "输入框", "选择框", "复选框", "搜索框", "对话框", "分页器", "开关", "滑块"]),
  ...subjects("text", ["标题", "正文", "提示", "标签", "通知", "列表", "说明"]),
];
const interfacePatterns: Pattern[] = [
  { id: "display-space", kinds: visualKinds, render: s => [...s,"的","显示","区域","留有","适当","的","空白","。"] },
  { id: "spacing", kinds: visualKinds, render: s => [...s,"与","周围","元素","之间","的","间距","保持","一致","。"] },
  { id: "screens", kinds: visualKinds, render: s => ["在","不同","屏幕","上","，",...s,"都","能","清晰","显示","。"] },
  { id: "window", kinds: visualKinds, render: s => ["窗口","大小","变化","时","，",...s,"仍然","位于","预定","区域","。"] },
  { id: "hierarchy", kinds: visualKinds, render: s => ["页面","采用","清晰","的","层级","，","便于","识别",...s,"的","位置","。"] },
  { id: "contrast", kinds: ["surface", "interactive"], render: s => [...s,"的","边界","与","背景","之间","有","足够","的","对比度","。"] },
  { id: "narrow", kinds: visualKinds, render: s => ["测试","结果","表明","，",...s,"在","窄屏","上","仍然","可见","。"] },
  { id: "zoom", kinds: visualKinds, render: s => ["页面","放大","后","，",...s,"的","显示","比例","保持","协调","。"] },
  { id: "arrangement", kinds: visualKinds, render: s => [...s,"的","排列","方式","与","相邻","元素","保持","一致","。"] },
  { id: "edge", kinds: visualKinds, render: s => ["布局","调整","后","，",...s,"与","页面","边缘","之间","仍","有","空白","。"] },
  { id: "test-record", kinds: visualKinds, render: s => ["设计","人员","记录","了",...s,"在","不同","尺寸","下","的","显示","情况","。"] },
  { id: "state", kinds: visualKinds, render: s => [...s,"的","显示","状态","会","随","页面","内容","一起","更新","。"] },
  { id: "overlap", kinds: visualKinds, render: s => ["页面","中","的",...s,"与","其他","元素","之间","没有","重叠","。"] },
  { id: "context", kinds: visualKinds, render: s => ["检查",...s,"时","，","需要","同时","观察","周围","内容","的","变化","。"] },
  { id: "recheck", kinds: visualKinds, render: s => ["每次","更新","后","，","测试","人员","都","会","复核",...s,"的","显示","效果","。"] },
  { id: "structure", kinds: visualKinds, render: s => [...s,"的","位置","调整","不会","改变","页面","的","基本","结构","。"] },
  { id: "reserved", kinds: visualKinds, render: s => ["页面","为",...s,"预留","了","足够","的","显示","空间","。"] },
  { id: "alternatives", kinds: visualKinds, render: s => [...s,"可以","在","多个","布局","方案","中","使用","。"] },
  { id: "complete", kinds: visualKinds, render: s => ["当前","布局","能够","完整","显示",...s,"以及","相关","信息","。"] },
  { id: "compare", kinds: visualKinds, render: s => ["通过","比较","不同","视图","，","可以","确认",...s,"是否","清晰","可见","。"] },
  { id: "keyboard", kinds: ["interactive"], render: s => ["测试","人员","可以","通过","键盘","访问",...s,"，","并","检查","焦点","是否","清晰","。"] },
  { id: "readability", kinds: ["text"], render: s => ["调整","字号","后","，","需要","重新","检查",...s,"的","可读性","。"] },
];
const dashboardSubjects = [
  ...subjects("collection", ["数据", "列表", "图表", "报表", "视图", "明细", "结果", "记录", "摘要", "汇总", "统计", "趋势", "分组", "分类", "样本", "分布"]),
  ...subjects("metric", ["指标", "数值", "数量", "范围", "来源", "日期", "时段", "状态", "进度", "计数", "标签", "编号", "行号", "维度", "比例", "总量", "区间", "排序", "筛选", "名称"]),
];
const dataKinds: Kind[] = ["collection", "metric"];
const dashboardPatterns: Pattern[] = [
  { id: "filter", kinds: dataKinds, render: s => [...s,"的","显示","结果","与","当前","筛选","条件","保持","一致","。"], variants: {"结果":["显示","的","结果","与","当前","筛选","条件","保持","一致","。"],"筛选":["筛选","结果","与","当前","筛选","条件","保持","一致","。"]} },
  { id: "refresh", kinds: dataKinds, render: s => ["数据","更新","后","，","系统","会","重新","检查",...s,"的","显示","结果","。"], variants: {"结果":["数据","更新","后","，","系统","会","重新","检查","结果","是否","正确","。"]} },
  { id: "time-range", kinds: dataKinds, render: s => ["查看",...s,"时","，","需要","确认","所用","的","时间","范围","。"], variants: {"分组":["查看","分组","时","，","需要","确认","对应","的","记录","。"],"分类":["查看","分类","时","，","需要","确认","对应","的","记录","。"],"来源":["查看","来源","时","，","需要","确认","对应","的","记录","。"],"标签":["查看","标签","时","，","需要","确认","对应","的","记录","。"],"编号":["查看","编号","时","，","需要","确认","对应","的","记录","。"],"行号":["查看","行号","时","，","需要","确认","对应","的","记录","。"],"排序":["查看","排序","时","，","需要","确认","对应","的","记录","。"],"筛选":["查看","筛选","时","，","需要","确认","对应","的","记录","。"],"名称":["查看","名称","时","，","需要","确认","对应","的","记录","。"]} },
  { id: "trace", kinds: dataKinds, render: s => [...s,"的","变化","可以","通过","相关","记录","进行","核对","。"] },
  { id: "rules", kinds: dataKinds, render: s => ["当前","页面","按照","统一","的","规则","展示",...s,"。"] },
  { id: "sync", kinds: dataKinds, render: s => ["筛选","条件","变化","后","，","与",...s,"相关","的","信息","会","同步","更新","。"] },
  { id: "display", kinds: dataKinds, render: s => [...s,"的","显示","方式","可以","根据","查看","需要","调整","。"] },
  { id: "original", kinds: dataKinds, render: s => ["系统","保留","了","与",...s,"相关","的","原始","记录","。"] },
  { id: "format", kinds: dataKinds, render: s => ["为","便于","比较","，","页面","使用","一致","的","格式","展示",...s,"。"] },
  { id: "marking", kinds: dataKinds, render: s => [...s,"在","不同","视图","中","采用","相同","的","标记","方式","。"], variants: {"视图":["同一","视图","中","的","标记","方式","保持","一致","。"]} },
  { id: "detail", kinds: dataKinds, render: s => ["查看","汇总","信息","时","，","还","可以","检查",...s,"对应","的","详细","记录","。"] },
  { id: "reconcile", kinds: dataKinds, render: s => ["每次","刷新","后","，","页面","都","会","核对",...s,"与","原始","数据","是否","一致","。"] },
  { id: "explanation", kinds: dataKinds, render: s => ["相关","说明","列出","了",...s,"的","来源","和","更新","时间","。"], variants: {"来源":["相关","说明","列出","了","数据","来源","及其","更新","时间","。"]} },
  { id: "saved-filter", kinds: dataKinds, render: s => ["保存","筛选","条件","后","，","可以","再次","查看",...s,"的","显示","结果","。"], variants: {"结果":["保存","筛选","条件","后","，","可以","再次","查看","对应","的","结果","。"]} },
  { id: "dated", kinds: dataKinds, render: s => [...s,"的","相关","记录","按照","日期","排列","，","便于","后续","核查","。"], variants: {"记录":["保存","的","相关","记录","按照","日期","排列","，","便于","后续","核查","。"]} },
  { id: "help", kinds: dataKinds, render: s => ["页面","提供","了",...s,"的","说明","，","以便","理解","当前","数据","。"] },
  { id: "organize", kinds: dataKinds, render: s => ["在","整理","记录","时","，","需要","统一",...s,"的","显示","格式","。"] },
  { id: "related", kinds: dataKinds, render: s => ["当前","视图","能够","显示",...s,"以及","相关","记录","。"], variants: {"视图":["当前","页面","能够","显示","视图","以及","相关","记录","。"]} },
  { id: "processing", kinds: dataKinds, render: s => ["核对","完成","后","，","系统","会","保留",...s,"对应","的","处理","记录","。"] },
  { id: "collection-order", kinds: ["collection"], render: s => [...s,"中","的","条目","按照","选定","顺序","排列","，","便于","逐项","检查","。"], variants: {"汇总":["汇总","所","依据","的","记录","按照","选定","顺序","排列","，","便于","逐项","检查","。"],"统计":["统计","所","依据","的","记录","按照","选定","顺序","排列","，","便于","逐项","检查","。"],"趋势":["趋势","所","依据","的","记录","按照","选定","顺序","排列","，","便于","逐项","检查","。"],"分布":["分布","所","依据","的","记录","按照","选定","顺序","排列","，","便于","逐项","检查","。"]} },
  { id: "metric-unit", kinds: ["metric"], render: s => ["展示",...s,"时","，","相关","说明","会","标明","采用","的","表示","方式","。"], variants: {"排序":["展示","排序","结果","时","，","相关","说明","会","标明","采用","的","排序","规则","。"],"筛选":["展示","筛选","结果","时","，","相关","说明","会","标明","采用","的","筛选","条件","。"]} },
];
const documentSubjects = [
  ...subjects("document", ["文档", "文件", "资料", "记录", "说明", "报告", "清单", "目录", "表格", "草稿", "原稿", "附件", "条目", "正文", "标题", "摘要", "备注", "内容", "信息", "版本", "段落", "索引", "手册", "简报", "提纲", "备忘录", "通知", "指南", "方案", "档案"]),
  ...subjects("activity", ["准备", "检查", "整理", "审核", "登记", "归档", "核对", "汇总", "排版", "校对", "发布", "交接"]),
];
const documentKinds: Kind[] = ["document", "activity"];
const documentPatterns: Pattern[] = [
  { id: "purpose", kinds: ["document"], render: s => [...s,"说明","了","当前","工作","的","目的","和","适用","范围","。"], variants: {"说明":["说明","介绍","了","当前","工作","的","目的","和","适用","范围","。"],"目录":["目录","列出","了","主要","章节","及其","位置","。"],"条目":["条目","说明","了","相关","事项","的","具体","要求","。"],"标题":["标题","概括","了","文档","的","主要","内容","。"],"备注":["备注","补充","了","与","当前","工作","相关","的","信息","。"],"版本":["版本","的","适用","范围","已经","说明","。"],"段落":["段落","介绍","了","当前","工作","的","目的","。"],"索引":["索引","列出","了","主要","条目","及其","位置","。"]} },
  { id: "review", kinds: ["document"], render: s => ["共享",...s,"之前","，","需要","先","核对","其中","的","日期","和","内容","。"] },
  { id: "headings", kinds: ["document"], render: s => [...s,"采用","清晰","的","层级","，","便于","查找","所需","信息","。"], variants: {"版本":["版本","信息","采用","清晰","的","层级","，","便于","查找","所需","信息","。"]} },
  { id: "version", kinds: ["document"], render: s => ["修改",...s,"后","，","负责人","会","记录","更新","日期","和","版本","。"], variants: {"版本":["修改","版本","内容","后","，","负责人","会","记录","更新","日期","和","版本号","。"]} },
  { id: "archive", kinds: ["document"], render: s => ["确认","完成","后","，",...s,"会","按照","约定","方式","分类","保存","。"] },
  { id: "missing", kinds: ["document"], render: s => ["如果",...s,"存在","遗漏","，","需要","对照","原始","记录","补充","信息","。"] },
  { id: "structure", kinds: ["document"], render: s => [...s,"的","结构","与","实际","阅读","顺序","保持","一致","。"], variants: {"版本":["版本","内容","的","结构","与","实际","阅读","顺序","保持","一致","。"]} },
  { id: "terminology", kinds: ["document"], render: s => ["整理",...s,"时","，","需要","统一","相关","术语","和","格式","。"] },
  { id: "source", kinds: ["document"], render: s => [...s,"保留","了","必要","的","来源","说明","，","便于","后续","核查","。"] },
  { id: "sharing", kinds: ["document"], render: s => ["共享",...s,"时","，","应当","确认","接收","范围","和","使用","目的","。"] },
  { id: "changes", kinds: ["document"], render: s => [...s,"中","的","修改","已经","记录","，","相关","人员","可以","查看","变更","情况","。"] },
  { id: "compare", kinds: ["document"], render: s => ["对照","原始","材料","阅读",...s,"，","可以","检查","信息","是否","一致","。"] },
  { id: "read-through", kinds: ["document"], render: s => ["阅读",...s,"时","，","需要","同时","注意","标题","与","正文","之间","的","联系","。"], variants: {"目录":["阅读","目录","时","，","需要","检查","章节","与","页码","是否","对应","。"],"条目":["阅读","条目","时","，","需要","检查","相关","信息","是否","完整","。"],"备注":["阅读","备注","时","，","需要","检查","其","与","相关","内容","是否","一致","。"],"段落":["阅读","段落","时","，","需要","注意","上下文","之间","的","联系","。"],"索引":["阅读","索引","时","，","需要","检查","条目","与","正文","位置","是否","对应","。"]} },
  { id: "organization", kinds: ["document"], render: s => [...s,"按照","内容","类型","组织","，","相关","部分","之间","具有","清晰","的","联系","。"], variants: {"版本":["不同","版本","按照","发布","日期","排列","，","便于","查找","。"]} },
  { id: "access", kinds: ["document"], render: s => ["存放",...s,"的","位置","已经","明确","，","便于","相关","人员","查阅","。"] },
  { id: "record-date", kinds: documentKinds, render: s => ["负责人","已经","记录","了","与",...s,"相关","的","日期","和","要求","。"] },
  { id: "related", kinds: documentKinds, render: s => ["与",...s,"相关","的","信息","已经","整理","，","可以","在","需要","时","查看","。"] },
  { id: "coordination", kinds: ["activity"], render: s => [...s,"需要","与","其他","工作","协调","，","避免","出现","时间","冲突","。"] },
  { id: "before-start", kinds: ["activity"], render: s => ["开始",...s,"之前","，","应当","确认","所需","材料","是否","齐备","。"] },
  { id: "time", kinds: ["activity"], render: s => [...s,"的","时间","已经","列入","日程","，","相关","人员","可以","提前","准备","。"], variants: {"准备":["准备","工作","的","时间","已经","列入","日程","，","相关","人员","可以","提前","安排","。"]} },
  { id: "adjust", kinds: ["activity"], render: s => ["如果",...s,"需要","调整","，","负责人","会","及时","通知","相关","人员","。"] },
  { id: "follow-up", kinds: ["activity"], render: s => [...s,"结束","后","，","相关","记录","会","整理","保存","，","供","后续","参考","。"] },
  { id: "steps", kinds: ["activity"], render: s => ["负责人","已经","明确",...s,"涉及","的","主要","环节","和","完成","要求","。"] },
  { id: "priority", kinds: ["activity"], render: s => [...s,"的","优先级","需要","结合","当前","工作","情况","确定","。"] },
];
// Short forms are complete reviewed-style statements, not numerical tail text.
const visualShort: Pattern[] = [
  { id: "short-updated", kinds: [...visualKinds,...dataKinds], render: s => [...s,"已经","更新","。"] },
  { id: "short-display", kinds: [...visualKinds,...dataKinds], render: s => [...s,"显示","正常","。"] },
  { id: "short-stable", kinds: [...visualKinds,...dataKinds], render: s => [...s,"保持","稳定","。"], variants: {"筛选":["筛选","结果","保持","稳定","。"]} },
  { id: "short-visible", kinds: visualKinds, render: s => [...s,"已经","显示","。"] },
  { id: "short-visible", kinds: dataKinds, render: s => [...s,"可以","查看","。"] },
  { id: "short-current", kinds: [...visualKinds,...dataKinds], render: s => [...s,"目前","显示","正常","。"] },
  { id: "short-ready", kinds: [...visualKinds,...dataKinds], render: s => [...s,"目前","可以","正常","显示","。"] },
  { id: "short-state", kinds: [...visualKinds,...dataKinds], render: s => [...s,"的","显示","状态","已经","确认","。"] },
  { id: "short-consistent", kinds: [...visualKinds,...dataKinds], render: s => [...s,"在","不同","页面","上","保持","一致","。"] },
  { id: "short-adjustable", kinds: [...visualKinds,...dataKinds], render: s => [...s,"的","显示","范围","可以","根据","需要","调整","。"], variants: {"范围":["显示","的","数值","范围","可以","根据","需要","调整","。"]} },
];
const documentShort: Pattern[] = [
  { id: "short-confirmed", kinds: ["document"], render: s => [...s,"已经","确认","。"] },
  { id: "short-completed", kinds: ["activity"], render: s => [...s,"已经","完成","。"] },
  { id: "short-updated", kinds: ["document"], render: s => [...s,"已经","更新","。"] },
  { id: "short-consistent", kinds: ["document"], render: s => [...s,"保持","一致","。"] },
  { id: "short-viewable", kinds: ["document"], render: s => [...s,"可以","查看","。"] },
  { id: "short-content", kinds: ["document"], render: s => [...s,"的","内容","完整","。"], variants: {"内容":["内容","完整","且","清晰","。"]} },
  { id: "short-checked", kinds: ["document"], render: s => [...s,"的","内容","已经","核对","。"], variants: {"内容":["相关","内容","已经","核对","。"]} },
  { id: "short-information", kinds: ["document"], render: s => [...s,"中","的","信息","已经","核对","。"], variants: {"信息":["相关","信息","已经","核对","。"]} },
  { id: "short-date", kinds: ["document"], render: s => [...s,"的","更新","日期","已经","完成","核对","。"] },
  { id: "short-owner", kinds: ["document"], render: s => ["负责人","已经","核对","了",...s,"中","的","信息","。"], variants: {"信息":["负责人","已经","核对","了","相关","信息","。"]} },
  { id: "short-task-time", kinds: ["activity"], render: s => [...s,"的","时间","已经","确定","。"] },
];
const preparedForms: readonly ChineseForm[] = [
  { baseId: "dashboards:sorting:explicit", text: "列表支持按日期排序。", segmentation: ["列表","支持","按","日期","排序","。"], wordCount: 5,
    family: "dashboards", template: "dashboards:sorting-explicit", lexemes: ["列表"], role: "neutral", short: true, contractVersion: simplifiedChineseContractVersion },
  ...forms("interfaces",interfaceSubjects,interfacePatterns),
  ...forms("dashboards",dashboardSubjects,dashboardPatterns),
  ...forms("documents",documentSubjects,documentPatterns),
  ...forms("interfaces",interfaceSubjects,visualShort,true),
  ...forms("dashboards",dashboardSubjects,visualShort,true),
  ...forms("documents",documentSubjects,documentShort,true),
];
// A statement shared by subject inventories is one resource, not two bases.
// Give identical surface text a single, stable semantic owner.
const ownedText = new Set<string>();
export const simplifiedChineseForms: readonly ChineseForm[] = preparedForms.filter(form => {
  if (ownedText.has(form.text)) return false;
  ownedText.add(form.text); return true;
});
