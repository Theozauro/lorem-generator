// Local only: no app imports this helper, and it never writes repository files.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url), ts = require("typescript"), cache = new Map();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../../..");
function load(relative) {
  let file = path.resolve(root,relative); if (!path.extname(file)) file += ".ts";
  if (cache.has(file)) return cache.get(file).exports;
  const loaded = { exports: {} }; cache.set(file,loaded);
  const code = ts.transpileModule(fs.readFileSync(file,"utf8"),{ compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  new Function("require","module","exports",code)(name => name.startsWith(".") ? load(path.resolve(path.dirname(file),name)) : require(name),loaded,loaded.exports);
  return loaded.exports;
}
const { generateSimplifiedChinese, canGenerateSimplifiedChineseWords, canGenerateSimplifiedChineseCharacters, canGenerateSimplifiedChineseSentences } = load("lib/languages/zh-Hans/engine.ts");
const { simplifiedChineseForms: corpus, chineseFamilies, simplifiedChineseContractVersion: version } = load("lib/languages/zh-Hans/data.ts");
const { simplifiedChineseStats, countSimplifiedChineseWords } = load("lib/languages/zh-Hans/counting.ts");
const { getSimplifiedChineseParagraphOptions } = load("lib/languages/zh-Hans/ui-contract.ts");
const { simplifiedChinesePortabilityFixtures: fixtures, simplifiedChineseRejectedFixtures: rejected, simplifiedChineseReviewedReplacements: reviewed } = load("lib/languages/zh-Hans/fixtures.ts");
const cold = process.argv.find(arg => arg.startsWith("--cold="));
if (cold) {
  const kind = cold.slice(7), request = kind === "words" ? { mode: "words", amount: 2000, paragraphs: 30 } : kind === "characters" ? { mode: "characters", amount: 10000 } : { mode: "sentences", amount: 100 };
  const start = performance.now(), text = generateSimplifiedChinese({ ...request, seed: 1 });
  console.log(JSON.stringify({ cold: kind, ms: performance.now()-start, stats: simplifiedChineseStats(text) }));
  process.exit(0);
}
const lookup = new Map(corpus.map(form => [form.text,form]));
const punctuation = new Set(["。","，","、","：","；"]);
const metrics = { outputs: 0, unknown: 0, duplicateBase: 0, duplicateSentence: 0, templateAdjacent: 0, crossParagraphTemplateAdjacent: 0, adjacentLexeme: 0, mixedFamily: 0, invalidText: 0, wrongCount: 0, emptyParagraph: 0, failures: 0 };
const failures = [], observedFamilies = new Set();
let worst = { ms: 0, request: null };
function failure(kind,detail) { metrics[kind]++; if (failures.length < 20) failures.push({ kind,...detail }); }
function inspect(text,request) {
  metrics.outputs++;
  if (!text || text.trim() !== text || text.normalize("NFC") !== text || !text.isWellFormed() || /[ \t\r\u200B\uFEFF\uFFFD]|[。；：，、]{2}/u.test(text)) failure("invalidText",{ request });
  const paragraphs = text.split("\n\n"), bases = new Set(), sentences = new Set(), families = new Set();
  let wordCount = 0, sentenceCount = 0, previous;
  for (const paragraph of paragraphs) {
    if (!paragraph) failure("emptyParagraph",{ request });
    const parts = paragraph.match(/[^。]+。/gu) ?? [];
    if (parts.join("") !== paragraph) failure("invalidText",{ request });
    let localPrevious;
    for (const sentence of parts) {
      const form = lookup.get(sentence);
      if (!form) { failure("unknown",{ sentence }); continue; }
      // Count from literal canonical segmentation, not the engine's cached count.
      wordCount += form.segmentation.filter(segment => !punctuation.has(segment)).length; sentenceCount++;
      if (bases.has(form.baseId)) failure("duplicateBase",{ request, baseId: form.baseId }); bases.add(form.baseId);
      if (sentences.has(sentence)) failure("duplicateSentence",{ request }); sentences.add(sentence);
      if (localPrevious?.template === form.template) failure("templateAdjacent",{ request });
      if (!localPrevious && previous?.template === form.template) metrics.crossParagraphTemplateAdjacent++;
      if (previous?.lexemes.some(word => form.lexemes.includes(word))) metrics.adjacentLexeme++;
      families.add(form.family); observedFamilies.add(form.family); previous = form; localPrevious = form;
    }
  }
  if (families.size !== 1) failure("mixedFamily",{ request });
  // For the initial BMP-only corpus, scalar count is an independent grapheme
  // oracle, including punctuation and paragraph LF separators.
  const independent = { words: wordCount, characters: [...text].length, sentences: sentenceCount, paragraphs: paragraphs.length };
  const stats = simplifiedChineseStats(text);
  if (independent[request.mode] !== request.amount || (request.mode === "words" && independent.paragraphs !== request.paragraphs)
    || Object.keys(independent).some(key => independent[key] !== stats[key])) failure("wrongCount",{ request, independent,stats });
  return independent;
}
function generate(request) {
  const start = performance.now();
  try {
    const text = generateSimplifiedChinese(request), ms = performance.now()-start;
    if (ms > worst.ms) worst = { ms,request };
    inspect(text,request); return text;
  } catch (error) { failure("failures",{ request,error:error.message }); return null; }
}
let fixturePass = 0, rejectionPass = 0;
for (const fixture of fixtures) {
  const actual = simplifiedChineseStats(fixture.text);
  if (["words","characters","sentences","paragraphs"].every(key => actual[key] === fixture[key])) fixturePass++;
  else failure("wrongCount",{ fixture,actual });
}
for (const text of rejected) { try { countSimplifiedChineseWords(text); failure("unknown",{ acceptedInvalid:text }); } catch { rejectionPass++; } }
const originalSegmenter = Intl.Segmenter;
let wordsIndependentOfIntl = false;
try {
  Intl.Segmenter = undefined;
  wordsIndependentOfIntl = fixtures.every(fixture => countSimplifiedChineseWords(fixture.text) === fixture.words);
} finally { Intl.Segmenter = originalSegmenter; }
const byBase = new Map(corpus.map(form => [form.baseId,form]));
let correctionPass = 0;
for (const item of reviewed) {
  const form = byBase.get(item.baseId);
  if (form?.text === item.text && form.segmentation.join("") === item.text && form.wordCount === item.words
    && form.segmentation.filter(token => !punctuation.has(token)).length === item.words
    && simplifiedChineseStats(item.text).characters === item.characters && simplifiedChineseStats(item.text).sentences === 1
    && corpus.filter(candidate => candidate.text === item.text).length === 1 && !lookup.has(item.oldText)) correctionPass++;
  else failure("wrongCount",{ reviewed:item.baseId });
}
const correctionSummary = { reviewed:reviewed.length,pass:correctionPass,wordsChanged:reviewed.filter(item => item.oldWords !== item.words).length,charactersChanged:reviewed.filter(item => item.oldCharacters !== item.characters).length };
const started = performance.now(), full = !process.argv.includes("--quick");
let pairs = 0, supported = 0, unsupported = 0, classificationMismatch = 0;
const minimumByParagraph = [];
if (full) for (let p = 1; p <= 30; p++) {
  let first = 0;
  // The bound is independently derived from unique complete corpus resources.
  const lowerBound = Math.min(...chineseFamilies.map(family => corpus.filter(form => form.family === family)
    .map(form => form.segmentation.filter(token => !punctuation.has(token)).length).sort((a,b) => a-b).slice(0,p).reduce((a,b) => a+b,0)));
  for (let words = 1; words <= 2000; words++) {
    pairs++; const can = canGenerateSimplifiedChineseWords({ words,paragraphs:p });
    if (can !== (words >= lowerBound)) classificationMismatch++;
    if (!can) {
      unsupported++;
      try { generateSimplifiedChinese({ mode:"words",amount:words,paragraphs:p,seed:1 }); failure("failures",{ unexpectedSupport:{words,p} }); } catch { /* Expected structural rejection. */ }
      continue;
    }
    if (!first) first = words; supported++;
    generate({ mode:"words",amount:words,paragraphs:p,seed:(Math.imul(words,1597334677)+p) >>> 0 });
  }
  minimumByParagraph.push({ paragraphs:p,minimum:first,lowerBound });
  console.log(JSON.stringify({ progress:p,pairs,failures:metrics.failures,wrongCount:metrics.wrongCount,classificationMismatch,ms:performance.now()-started }));
}
const boundaryResults = [];
const auditedMinimums = full ? minimumByParagraph : Array.from({length:30},(_,i) => {
  const paragraphs = i+1;
  return {paragraphs,minimum:Array.from({length:2000},(_,j) => j+1).find(words => canGenerateSimplifiedChineseWords({words,paragraphs}))};
});
const boundaryCases = [...new Map([
  ...auditedMinimums.flatMap(({paragraphs,minimum}) => [minimum-1,minimum,minimum+1,minimum+2,2000].filter(n => n > 0).map(n => [n,paragraphs])),
  [4,1],[5,1],[6,2],[8,2],[9,3],[10,3],[12,4],[139,19],[142,19],[275,28],[300,30],[2000,30],
].map(pair => [pair.join(":"),pair])).values()];
for (const [amount,paragraphs] of boundaryCases) {
  const supported = canGenerateSimplifiedChineseWords({words:amount,paragraphs});
  let pass = 0;
  for (let seed = 1; seed <= 50; seed++) {
    if (supported) { if (generate({mode:"words",amount,paragraphs,seed})) pass++; }
    else { try { generateSimplifiedChinese({mode:"words",amount,paragraphs,seed}); failure("failures",{unexpectedBoundary:{amount,paragraphs,seed}}); } catch { pass++; } }
  }
  boundaryResults.push({amount,paragraphs,supported,pass,seeds:50});
}
const characterHoles = [];
for (let amount = 10; amount <= 10000; amount++) {
  if (!canGenerateSimplifiedChineseCharacters(amount)) characterHoles.push(amount);
  else if (full) generate({mode:"characters",amount,seed:Math.imul(amount,2654435761) >>> 0});
  if (full && amount%1000 === 0) console.log(JSON.stringify({characterProgress:amount,failures:metrics.failures,wrongCount:metrics.wrongCount}));
}
const characterTargets = [...new Set([...Array.from({ length:291 },(_,i) => i+10), 499,500,501,999,1000,1001,1999,2000,2001,4999,5000,5001,9999,10000])];
for (const amount of characterTargets) for (let seed = 1; seed <= 5; seed++) generate({ mode:"characters",amount,seed });
for (let amount = 1; amount <= 100; amount++) {
  if (!canGenerateSimplifiedChineseSentences(amount)) failure("failures",{ sentenceHole:amount });
  for (let seed = 1; seed <= 10; seed++) generate({ mode:"sentences",amount,seed });
}
// Additional representative samples, independent of the exhaustive word sweep.
for (let i = 0; i < 400; i++) {
  const amount = [12,20,50,100,250,500,1000,2000][i%8], paragraphs = [1,2,3][Math.floor(i/8)%3];
  generate({ mode:"words",amount,paragraphs,seed:10000+i });
}
// Same 1,000 stratified requests used for the pre-change comparison.
const retired = new Set(reviewed.map(item => item.oldText));
function linguisticInspect(text,request) {
  const paragraphs = text.split("\n\n").map(paragraph => (paragraph.match(/[^。]+。/gu) ?? []).map(sentence => lookup.get(sentence)));
  const forms = paragraphs.flat();
  let adjacency = 0, abab = 0, run = 0, maxShort = 0, maxLocalShort = 0, oldDefects = 0;
  for (let i = 0; i < forms.length; i++) {
    if (i && forms[i].lexemes[0] === forms[i-1].lexemes[0]) adjacency++;
    run = forms[i].short ? run+1 : 0; maxShort = Math.max(maxShort,run);
    if (i >= 3 && forms[i].template === forms[i-2].template && forms[i-1].template === forms[i-3].template) abab++;
    if (retired.has(forms[i].text)) oldDefects++;
  }
  for (const paragraph of paragraphs) { let local = 0; for (const form of paragraph) { local = form.short ? local+1 : 0; maxLocalShort = Math.max(maxLocalShort,local); } }
  const positions = [];
  for (let j = 0; j < Math.max(...paragraphs.map(paragraph => paragraph.length)); j++) {
    const labels = paragraphs.map(paragraph => paragraph[j]?.template).filter(Boolean);
    if (labels.length >= 5) for (const template of new Set(labels)) {
      const count = labels.filter(label => label === template).length;
      if (count >= 5 && count/labels.length >= .5) positions.push({position:j+1,template,count,total:labels.length});
    }
  }
  return {request,adjacency,transitions:Math.max(0,forms.length-1),abab,maxShort,maxLocalShort,positions,oldDefects,text};
}
const linguistic = {outputs:0,adjacency:0,transitions:0,abab:0,maxShort:0,longShortRuns:0,positionalPathologies:0,oldDefects:0,byMode:{}};
const wordCases = [[12,1],[20,2],[50,3],[100,5],[139,19],[142,19],[275,28],[300,30],[500,15],[1000,25],[2000,30]];
for (let i = 0; i < 1000; i++) {
  const mode = ["words","characters","sentences"][i%3], request = {mode,seed:100000+i};
  if (mode === "words") [request.amount,request.paragraphs] = wordCases[Math.floor(i/3)%wordCases.length];
  else { const targets = mode === "characters" ? [10,80,150,251,500,1000,10000] : [5,25,50,100]; request.amount = targets[Math.floor(i/3)%targets.length]; }
  const text = generate(request); if (!text) continue;
  const item = linguisticInspect(text,request), modeStats = linguistic.byMode[mode] ??= {outputs:0,maxLocalShort:0};
  linguistic.outputs++; modeStats.outputs++; modeStats.maxLocalShort = Math.max(modeStats.maxLocalShort,item.maxLocalShort);
  linguistic.adjacency += item.adjacency; linguistic.transitions += item.transitions; linguistic.abab += item.abab;
  linguistic.maxShort = Math.max(linguistic.maxShort,item.maxShort); linguistic.longShortRuns += Number(item.maxShort >= 4);
  linguistic.positionalPathologies += item.positions.length; linguistic.oldDefects += item.oldDefects;
}
const regressionCases = [
  {mode:"words",amount:125,paragraphs:1,seed:10021}, {mode:"words",amount:2000,paragraphs:30,seed:10035},
  {mode:"characters",amount:80,seed:10056}, {mode:"sentences",amount:5,seed:10075},
  {mode:"sentences",amount:25,seed:10083}, {mode:"words",amount:1000,paragraphs:25,seed:10044},
].map(request => { const text = generate(request); return text ? linguisticInspect(text,request) : {request,failed:true}; });
if (linguistic.oldDefects || regressionCases.some(item => item.oldDefects || item.failed)) failure("invalidText",{retiredFormsSurvived:true});
let uiContractMismatch = 0;
for (let words = 1; words <= 2000; words++) {
  const { supported:counts,maximum,contiguous } = getSimplifiedChineseParagraphOptions(words);
  const actual = Array.from({ length:30 },(_,i) => i+1).filter(paragraphs => canGenerateSimplifiedChineseWords({ words,paragraphs }));
  if (JSON.stringify(counts) !== JSON.stringify(actual) || maximum !== (actual.at(-1) ?? 0) || !contiguous) uiContractMismatch++;
}
const timings = [];
for (const request of [{ mode:"words",amount:2000,paragraphs:30 },{ mode:"characters",amount:10000 },{ mode:"sentences",amount:100 }]) {
  generateSimplifiedChinese({ ...request,seed:0 });
  const times = [];
  for (let seed = 1; seed <= 30; seed++) {
    const actual = { ...request,seed }, t = performance.now(), text = generateSimplifiedChinese(actual);
    times.push(performance.now()-t); inspect(text,actual);
  }
  times.sort((a,b) => a-b); timings.push({ request,median:times[15],p95:times[28],maximum:times.at(-1),includesIndependentAudit:false });
}
const samples = [];
for (const mode of ["words","characters","sentences"]) for (let i = 0; i < 8; i++) {
  const family = chineseFamilies[i%3], amount = (mode === "words" ? [3,8,15,40,100,139,300,1000] : mode === "characters" ? [10,20,35,80,150,251,500,1000] : [1,2,3,5,10,25,50,100])[i];
  for (let seed = 20000+i; seed <= 20100+i; seed++) {
    const request = { mode,amount,paragraphs:mode === "words" ? [1,1,2,3,5,19,30,25][i] : 1,seed }, text = generateSimplifiedChinese(request);
    if (lookup.get(text.match(/[^。]+。/u)[0]).family !== family) continue;
    samples.push({ mode,amount,family,seed,stats:simplifiedChineseStats(text),text }); break;
  }
}
const { generateJapanese,canGenerateJapaneseWords } = load("lib/languages/ja/engine.ts"), { japaneseStats } = load("lib/languages/counting.ts");
let japanesePassed = 0;
const japaneseCases = [{ mode:"words",amount:100,paragraphs:3 },{ mode:"words",amount:300,paragraphs:30 },{ mode:"words",amount:139,paragraphs:19 },{ mode:"characters",amount:251 },{ mode:"characters",amount:10000 },{ mode:"sentences",amount:7 },{ mode:"sentences",amount:100 }];
for (const request of japaneseCases) for (let seed = 1; seed <= 5; seed++) {
  const text = generateJapanese({ ...request,seed }), stats = japaneseStats(text);
  if (stats[request.mode] === request.amount && (request.mode !== "words" || (stats.paragraphs === request.paragraphs && canGenerateJapaneseWords({ words:request.amount,paragraphs:request.paragraphs })))) japanesePassed++;
}
const report = { correctionSummary,linguistic,regressionCases,version,inventory:corpus.length,families:chineseFamilies.map(family => ({ family,forms:corpus.filter(form => form.family === family).length,short:corpus.filter(form => form.family === family && form.short).length,templates:new Set(corpus.filter(form => form.family === family).map(form => form.template)).size })),lexicalInventory:new Set(corpus.flatMap(form => form.segmentation.filter(token => !punctuation.has(token)))).size,fixturePass,rejectionPass,wordsIndependentOfIntl,pairs,supported,unsupported,classificationMismatch,minimumByParagraph,boundaryResults,characterHoles,uiContractMismatch,metrics,observedFamilies:[...observedFamilies],worst,timings,japanesePassed,japaneseTotal:japaneseCases.length*5,failures,samples,ms:performance.now()-started };
console.log(JSON.stringify(report));
if (correctionPass !== reviewed.length || metrics.crossParagraphTemplateAdjacent || failures.length || !wordsIndependentOfIntl || classificationMismatch || characterHoles.length || uiContractMismatch || fixturePass !== fixtures.length || rejectionPass !== rejected.length || samples.length !== 24 || japanesePassed !== japaneseCases.length*5) process.exitCode = 1;
