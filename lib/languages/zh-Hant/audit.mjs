// Local audit only. No app imports and no repository writes.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url), ts = require("typescript"), cache = new Map();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
function load(relative) {
  let file = path.resolve(root, relative); if (!path.extname(file)) file += ".ts";
  if (cache.has(file)) return cache.get(file).exports;
  const mod = { exports: {} }; cache.set(file, mod);
  const code = ts.transpileModule(fs.readFileSync(file,"utf8"), { compilerOptions: { module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022 } }).outputText;
  new Function("require","module","exports",code)(name => name.startsWith(".") ? load(path.resolve(path.dirname(file),name)) : require(name),mod,mod.exports);
  return mod.exports;
}
const { generateTraditionalChinese:generate,canGenerateTraditionalChineseWords:canWords,canGenerateTraditionalChineseCharacters:canCharacters,canGenerateTraditionalChineseSentences:canSentences } = load("lib/languages/zh-Hant/engine.ts");
const { traditionalChineseForms:corpus,chineseFamilies,traditionalChineseContractVersion:version,traditionalChineseSourceUnits,traditionalChineseFixedSourceUnits } = load("lib/languages/zh-Hant/data.ts");
const { parseTraditionalChinese:parse,traditionalChineseStats:stats,countTraditionalChineseWords:countWords,countTraditionalChineseCharacters:countCharacters } = load("lib/languages/zh-Hant/counting.ts");
const { traditionalChinesePortabilityFixtures:fixtures,traditionalChineseRejectedFixtures:rejected } = load("lib/languages/zh-Hant/fixtures.ts");
const { getTraditionalChineseParagraphOptions:paragraphOptions } = load("lib/languages/zh-Hant/ui-contract.ts");
const cold = process.argv.find(s => s.startsWith("--cold="));
if (cold) {
  const mode = cold.slice(7), r = {mode,amount:mode==="words"?2000:mode==="characters"?10000:100,paragraphs:mode==="words"?30:1,seed:1};
  const t = performance.now(), text = generate(r);
  console.log(JSON.stringify({request:r,ms:performance.now()-t,stats:stats(text)}));process.exit(0);
}
const full = !process.argv.includes("--quick"), start = performance.now();
const punctuation = new Set(["。","，","、","：","；"]), failures = [], exposures = new Set();
const metrics = {outputs:0,wrongCount:0,unknown:0,duplicateBase:0,duplicateSentence:0,familyMix:0,malformed:0,templateAdjacent:0,crossParagraphTemplateAdjacent:0,failures:0};
let worst = {ms:0,request:null};
function fail(kind,detail) { metrics[kind]++;if(failures.length<25)failures.push({kind,...detail}); }
function inspect(text,r) {
  metrics.outputs++;
  if (!text || text!==text.trim() || text!==text.normalize("NFC") || !text.isWellFormed() || /[ \t\r\u200B\uFEFF\uFFFD]|[。；：，、]{2}/u.test(text)) fail("malformed",{r});
  let pp;
  try { pp=parse(text); } catch(error) {fail("unknown",{r,error:error.message});return null;}
  const ff=pp.flat(),bases=new Set(),sentences=new Set(),families=new Set();
  for(const f of ff){if(bases.has(f.baseId))fail("duplicateBase",{r,id:f.baseId});bases.add(f.baseId);if(sentences.has(f.text))fail("duplicateSentence",{r});sentences.add(f.text);families.add(f.family);exposures.add(f.baseId);}
  if(families.size!==1)fail("familyMix",{r});
  for(const p of pp)for(let i=1;i<p.length;i++)if(p[i].template===p[i-1].template)fail("templateAdjacent",{r});
  for(let i=1;i<pp.length;i++)if(pp[i][0].template===pp[i-1].at(-1).template)fail("crossParagraphTemplateAdjacent",{r});
  const independent={words:ff.reduce((n,f)=>n+f.segmentation.filter(s=>!punctuation.has(s)).length,0),characters:[...text].length,sentences:ff.length,paragraphs:pp.length};
  const actual=stats(text);
  if(independent[r.mode]!==r.amount || (r.mode==="words"&&pp.length!==(r.paragraphs??1)) || Object.keys(independent).some(k=>actual[k]!==independent[k]))fail("wrongCount",{r,actual,independent});
  return {pp,ff,stats:actual};
}
function run(r){const t=performance.now();try{const text=generate(r),ms=performance.now()-t;if(ms>worst.ms)worst={ms,request:r};inspect(text,r);return text;}catch(error){fail("failures",{r,error:error.message});return null;}}
const source = [...traditionalChineseSourceUnits,...traditionalChineseFixedSourceUnits];
const tally=items=>items.reduce((r,item)=>(r[item.rating||item.review]=(r[item.rating||item.review]||0)+1,r),{NATURAL:0,ACCEPTABLE:0,"NEEDS REVISION":0,BAD:0});
const sourceReview={total:source.length,ratings:tally(source),categories:source.reduce((r,s)=>(r[s.category]=(r[s.category]||0)+1,r),{})};
const sourceBad=source.filter(s=>["BAD","NEEDS REVISION"].includes(s.rating));if(sourceBad.length)fail("malformed",{sourceBad});
const regionalPattern=/[这为与页显数据档检对条筛选备统图录关间预读记阅态边宽]|軟體|軟件|設置|設定|數據|過濾|視圖|控件|用戶/u;
const regionalLeaks=corpus.filter(f=>regionalPattern.test(f.text)), invalidPairs=corpus.filter(f=>!f.compatibility.acceptedKinds.includes(f.compatibility.subjectKind));
const tautologies=corpus.filter(f=>/(.{2,4})的\1|結果的顯示結果|視圖顯示視圖|說明說明|比較比較|日期的更新日期/.test(f.text));
if(regionalLeaks.length||invalidPairs.length||tautologies.length)fail("malformed",{regionalLeaks:regionalLeaks.slice(0,3),invalidPairs:invalidPairs.length,tautologies:tautologies.slice(0,3)});
const expandedReview=chineseFamilies.map(family=>{const items=corpus.filter(f=>f.family===family);return{family,forms:items.length,templates:new Set(items.map(f=>f.template)).size,ratings:tally(items)};});
let fixturePass=0,rejectionPass=0;
for(const fixture of fixtures){const actual=stats(fixture.text);if(Object.keys(actual).every(k=>actual[k]===fixture[k]))fixturePass++;else fail("wrongCount",{fixture,actual});}
for(const text of rejected){try{countWords(text);fail("unknown",{acceptedInvalid:text});}catch{rejectionPass++;}}
const Original=Intl.Segmenter;let wordsIndependentOfIntl=false,missingGraphemesRejected=false;
try{Intl.Segmenter=undefined;wordsIndependentOfIntl=fixtures.every(f=>countWords(f.text)===f.words);try{countCharacters("頁面清楚可見。");}catch{missingGraphemesRejected=true;}}finally{Intl.Segmenter=Original;}
if(!wordsIndependentOfIntl||!missingGraphemesRejected)fail("malformed",{portability:true});
let supported=0,unsupported=0,classificationMismatch=0;const minimumByParagraph=[];
for(let p=1;p<=30;p++){
  const lower=Math.min(...chineseFamilies.map(family=>corpus.filter(f=>f.family===family).map(f=>f.wordCount).sort((a,b)=>a-b).slice(0,p).reduce((a,b)=>a+b,0)));
  let min=0;const holes=[];
  for(let w=1;w<=2000;w++){
    const supportedNow=canWords({words:w,paragraphs:p});
    if(!supportedNow){if(w>=lower){classificationMismatch++;holes.push(w);}unsupported++;continue;}
    if(!min)min=w;supported++;
    if(full)run({mode:"words",amount:w,paragraphs:p,seed:(Math.imul(w,1597334677)+p)>>>0});
  }
  minimumByParagraph.push({paragraphs:p,lowerBound:lower,minimum:min,contiguous:holes.length===0,holes});
  console.log(JSON.stringify({progress:p,supported,unsupported,classificationMismatch,failures:metrics.failures,ms:performance.now()-start}));
}
const boundaryRequests=[...new Map(minimumByParagraph.flatMap(({paragraphs,minimum})=>[minimum-1,minimum,minimum+1,minimum+2,2000].filter(n=>n>0).map(n=>[[n,paragraphs].join(":"),{mode:"words",amount:n,paragraphs}])).concat(
  [[139,19],[142,19],[275,28],[300,30],[1000,25],[2000,30]].map(([amount,paragraphs])=>[[amount,paragraphs].join(":"),{mode:"words",amount,paragraphs}])
)).values()];
const boundaryResults=[];
for(const r of boundaryRequests){const ok=canWords({words:r.amount,paragraphs:r.paragraphs});let pass=0;for(let seed=1;seed<=50;seed++){if(ok){if(run({...r,seed}))pass++;}else{try{generate({...r,seed});fail("failures",{unexpectedSupport:r});}catch{pass++;}}}boundaryResults.push({...r,supported:ok,pass,seeds:50});}
const characterHoles=[];let characterGenerated=0;
for(let amount=10;amount<=10000;amount++){if(!canCharacters(amount)){characterHoles.push(amount);continue;}if(full){run({mode:"characters",amount,seed:Math.imul(amount,2654435761)>>>0});characterGenerated++;}if(amount%1000===0)console.log(JSON.stringify({characterProgress:amount,failures:metrics.failures,ms:performance.now()-start}));}
for(const amount of [10,11,12,13,19,20,21,99,100,101,250,251,252,499,500,501,999,1000,1001,1999,2000,2001,4999,5000,5001,9999,10000])for(let seed=1;seed<=10;seed++)if(canCharacters(amount))run({mode:"characters",amount,seed});
const sentenceHoles=[];let sentenceGenerated=0;
for(let amount=1;amount<=100;amount++){if(!canSentences(amount)){sentenceHoles.push(amount);continue;}for(let seed=1;seed<=10;seed++){run({mode:"sentences",amount,seed});sentenceGenerated++;}}
function rhythm(text,r){
  const pp=parse(text),ff=pp.flat();let adj=0,abab=0,maxShort=0,run=0,positions=0,maxFrame=0;
  for(let i=0;i<ff.length;i++){if(i&&ff[i].lexemes[0]===ff[i-1].lexemes[0])adj++;if(i>=3&&ff[i].template===ff[i-2].template&&ff[i-1].template===ff[i-3].template)abab++;}
  for(const p of pp){run=0;for(const f of p){run=f.short?run+1:0;maxShort=Math.max(maxShort,run);}}
  const frameCounts=new Map();for(const f of ff)frameCounts.set(f.template,(frameCounts.get(f.template)||0)+1);
  maxFrame=Math.max(...frameCounts.values())/ff.length;
  for(let j=0;j<Math.max(...pp.map(p=>p.length));j++){const at=pp.map(p=>p[j]?.template).filter(Boolean);if(at.length>=5)for(const t of new Set(at)){const n=at.filter(x=>x===t).length;if(n>=5&&n/at.length>=.5)positions++;}}
  return {request:r,family:ff[0].family,adj,abab,maxShort,positions,maxFrame,transitions:ff.length-1};
}
const representative={outputs:0,adj:0,abab:0,positions:0,transitions:0,maxShort:0,byMode:{},cases:[]};
const wordCases=[[12,1],[20,2],[50,3],[100,5],[139,19],[142,19],[275,28],[300,30],[500,15],[1000,25],[2000,30]];
for(let i=0;i<1000;i++){
  const mode=["words","characters","sentences"][i%3],r={mode,seed:100000+i},n=Math.floor(i/3);
  if(mode==="words")[r.amount,r.paragraphs]=wordCases[n%wordCases.length];else r.amount=(mode==="characters"?[10,80,150,251,500,1000,10000]:[5,25,50,100])[n%(mode==="characters"?7:4)];
  if(mode==="words"&&!canWords({words:r.amount,paragraphs:r.paragraphs}))continue;
  const text=run(r);if(!text)continue;const m=rhythm(text,r),b=representative.byMode[mode]??={outputs:0,maxShort:0,chains4:0};
  representative.outputs++;b.outputs++;b.maxShort=Math.max(b.maxShort,m.maxShort);b.chains4+=Number(m.maxShort>=4);
  for(const k of ["adj","abab","positions","transitions"])representative[k]+=m[k];representative.maxShort=Math.max(representative.maxShort,m.maxShort);
  if(m.positions||m.abab||m.maxShort>=4)representative.cases.push(m);
}
let uiContractMismatch=0;
for(let w=1;w<=2000;w++){const x=paragraphOptions(w),actual=Array.from({length:30},(_,i)=>i+1).filter(p=>canWords({words:w,paragraphs:p}));if(JSON.stringify(x.supported)!==JSON.stringify(actual)||x.maximum!==(actual.at(-1)||0)||x.contiguous!==actual.every((p,i)=>p===i+1))uiContractMismatch++;}
const samples=[];
for(const mode of ["words","characters","sentences"])for(let i=0;i<8;i++){
  const family=chineseFamilies[i%3],amount=(mode==="words"?[3,8,15,40,100,139,300,1000]:mode==="characters"?[10,20,35,80,150,251,500,1000]:[1,2,3,5,10,25,50,100])[i];
  const paragraphs=mode==="words"?[1,1,2,3,5,19,30,25][i]:1;
  for(let seed=20000+i;seed<20200+i;seed++){let text;try{text=generate({mode,amount,paragraphs,seed});}catch{break;}if(parse(text)[0][0].family!==family)continue;inspect(text,{mode,amount,paragraphs,seed});samples.push({mode,amount,paragraphs,family,seed,stats:stats(text),text,rhythm:rhythm(text,{mode,amount,paragraphs,seed})});break;}
}
const timings=[];
for(const r of [{mode:"words",amount:2000,paragraphs:30},{mode:"characters",amount:10000},{mode:"sentences",amount:100}]){
  generate({...r,seed:0});const times=[];for(let seed=1;seed<=30;seed++){const t=performance.now(),text=generate({...r,seed});times.push(performance.now()-t);inspect(text,{...r,seed});}times.sort((a,b)=>a-b);timings.push({request:r,median:times[15],p95:times[28],maximum:times.at(-1)});
}
const regressions={japanese:{pass:0,total:0},simplified:{pass:0,total:0}};
for(const [key,engine]of [["japanese",load("lib/languages/ja/engine.ts").japaneseEngine],["simplified",load("lib/languages/zh-Hans/engine.ts").simplifiedChineseEngine]]){
  for(const r of [{mode:"words",amount:100,paragraphs:3},{mode:"words",amount:300,paragraphs:30},{mode:"characters",amount:251},{mode:"sentences",amount:7}])for(let seed=1;seed<=3;seed++){regressions[key].total++;const text=engine.generate({...r,seed}),s=engine.stats(text);if(s[r.mode]===r.amount&&(r.mode!=="words"||s.paragraphs===r.paragraphs))regressions[key].pass++;}
}
const hansCount=load("lib/languages/zh-Hans/counting.ts").countSimplifiedChineseWords;const hansFixtures=load("lib/languages/zh-Hans/fixtures.ts").simplifiedChinesePortabilityFixtures;
const hansFixturePass=hansFixtures.filter(f=>hansCount(f.text)===f.words).length;
const report={version,sourceReview,expandedReview,inventory:corpus.length,exercisedResources:exposures.size,fixturePass,fixtureTotal:fixtures.length,rejectionPass,rejectionTotal:rejected.length,wordsIndependentOfIntl,missingGraphemesRejected,pairs:60000,supported,unsupported,classificationMismatch,minimumByParagraph,boundaryResults,characterHoles,characterGenerated,sentenceHoles,sentenceGenerated,representative,uiContractMismatch,samples,timings,worst,regressions,hansFixturePass,hansFixtureTotal:hansFixtures.length,metrics,failures,ms:performance.now()-start};
console.log("REPORT"+JSON.stringify(report));
if(failures.length||classificationMismatch||uiContractMismatch||fixturePass!==fixtures.length||rejectionPass!==rejected.length||!wordsIndependentOfIntl||!missingGraphemesRejected||samples.length!==24||Object.values(regressions).some(r=>r.pass!==r.total)||hansFixturePass!==hansFixtures.length)process.exitCode=1;
