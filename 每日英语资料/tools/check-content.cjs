/* 无第三方依赖：从任意目录运行 node tools/check-content.cjs。 */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({window: {}});
for (const name of ['reading-vocabulary.js','reader-lexicon.js','reading-path.js','fluency-library.js','reader-stories.js','reader-long-stories.js','learning-priorities.js','reader-supplements.js','verb-forms-a.js','verb-forms-b.js','verb-forms-life.js','verb-form-plan.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'data', name), 'utf8'), context, {filename: name});
}
const {READING_PATH: lessons, READING_VOCABULARY: words} = context.window;
vm.runInContext(fs.readFileSync(path.join(root,'reader-lookup.js'),'utf8'),context);
vm.runInContext(fs.readFileSync(path.join(root,'reader-verbs.js'),'utf8'),context);
const {FLUENCY_LIBRARY: fluency, READER_STORIES: stories, ReaderLookup: lookup}=context.window;
assert.equal(fluency.length,108);assert.equal(stories.length,11);
assert.equal(new Set(fluency.map(item=>item.id)).size,108);
assert.equal(new Set(stories.map(item=>item.id)).size,11);
for(const lesson of lessons)assert.equal(fluency.filter(item=>item.group===lesson.id).length,6);
for(const story of stories){
  assert.ok(story.sentences.length>=8);assert.ok(story.question&&story.answer);assert.equal(stories.filter(item=>item.pair===story.pair).length,story.level===3?3:2);
  if(story.level===3){
    const count=story.sentences.reduce((sum,item)=>sum+lookup.tokenize(item.text).length,0);
    assert.ok(count>=450&&count<=700,`${story.id}: ${count}`);assert.equal(story.chapters.length,4);assert.equal(story.chapters[0].start,0);assert.equal(story.objectives.length,3);
    story.chapters.forEach((chapter,i)=>{assert.ok(chapter.title&&chapter.titleZh);const end=story.chapters[i+1]?.start??story.sentences.length;assert.ok(end>chapter.start&&end<=story.sentences.length);});
  }
}
vm.runInContext(fs.readFileSync(path.join(root,'reader-core.js'),'utf8'),context);
const material=context.window.ReaderMaterialIndex.materials;
const practice=context.window.ReaderVerbPractice;
assert.equal(practice.problems.length,0,practice.problems.join('\n'));
assert.equal(practice.plan.verbs.length,41);
assert.equal(new Set(practice.plan.verbs.map(item=>item.lemma)).size,41);
assert.equal(new Set(practice.newExamples.map(item=>item.id)).size,practice.newExamples.length,'new example IDs');
assert.equal(new Set(practice.newExamples.map(item=>item.text)).size,practice.newExamples.length,'new example texts');
assert.equal(new Set(material.map(item=>item.text)).size,material.length,'Do not duplicate old sentences as new contexts');
let verifiedForms=0,deferredForms=0;
for(const verb of practice.plan.verbs)for(const form of verb.forms){
  const examples=practice.evidence.get(`${verb.lemma}:${form.form}`)||[];
  if(form.deferred){assert.ok(form.deferred.length>8);deferredForms++;continue;}
  assert.ok(examples.length>=3,`Insufficient actual-use evidence: ${verb.lemma}:${form.form} (${examples.length})`);
  assert.equal(new Set(examples.map(item=>item.sentence.text)).size,examples.length);
  verifiedForms++;
  for(const item of examples){
    const target=item.target,tokens=lookup.tokenize(item.sentence.text).filter(token=>lookup.normalize(token.text)===lookup.normalize(target.surface));
    const token=tokens[target.occurrence??0],result=lookup.resolve(token.text,item.sentence.text,token.start,item.sentence);
    assert.equal(result.hint.lemma,verb.lemma);
    const expected=['am','are'].includes(form.form)?'present':form.form==='is'?'third':['was','were'].includes(form.form)?'past':form.form;
    assert.equal(result.hint.form,expected,`${verb.lemma} ${item.sentence.text}`);
    assert.ok(item.sentence.translation&&item.sentence.note,'Evidence needs translation and explanation');
  }
}
assert.equal(deferredForms,7);assert.equal(verifiedForms,201);
for(const item of practice.newExamples){assert.ok(item.id&&item.translation&&item.note);assert.ok(['life','work','it'].includes(item.scene));assert.ok(item.targets.length>0);}
for(const item of material){
  assert.ok(item.translation, item.text);
  for(const token of lookup.tokenize(item.text)){
    const result=lookup.resolve(token.text,item.text,token.start,{hints:item.hints||{}});
    assert.ok(!result.entry.missing, `Missing: ${token.text} in ${item.text}`);
    assert.ok(!result.entry.legacy, `Legacy fallback: ${token.text}`);
  }
}
for(const word of context.window.LEARNING_PRIORITIES.core){
  assert.ok(context.window.READER_LEXICON.words[word],`Core entry: ${word}`);
  assert.ok((context.window.ReaderMaterialIndex.words.get(word)?.length||0)>=2,`Core recurrence: ${word}`);
}
for(const phrase of context.window.READER_LEXICON.phrases.filter(item=>item.priority===1))assert.ok((context.window.ReaderMaterialIndex.phrases.get(phrase.text)?.length||0)>=2,`Core phrase recurrence: ${phrase.text}`);
for(const [word,base] of [['sent','send'],['bought','buy'],['brought','bring'],['given','give'],['forgotten','forget'],['found','find'],['told','tell'],['took','take']])assert.equal(lookup.resolve(word).entry.word,base);
assert.equal(lookup.resolve('I’d').entry.expansion,'I would / I had');
assert.equal(lookup.resolve('I’d','I’d already told her.',0,{hints:{"i'd":{expansion:'I had'}}}).hint.expansion,'I had');
assert.equal(lookup.phraseHits('I’m getting used to checking it.')[0].phrase.text,'get used to');
assert.equal(lookup.phraseHits("I'd like to leave.")[0].phrase.text,'would like to');
assert.equal(lookup.resolve('hers').entry.pronoun,3);
assert.equal(lookup.resolve('broken').verb.word,'break');
assert.equal(lookup.resolve('saved').verb.word,'save');
assert.equal(lookup.resolve('already').verb,null);
assert.equal(lookup.resolve('zzzzzz').entry.missing,true);
assert.equal(lessons.length, 12);
assert.equal(words.length, 47);
assert.equal(new Set(lessons.map(item => item.id)).size, lessons.length);
assert.equal(new Set(words.map(item => item.word)).size, words.length);
for (const lesson of lessons) {
  assert.equal(lesson.examples.length, 3, lesson.id);
  for (const field of ['id','title','pattern','goal','reminder']) assert.ok(lesson[field], `${lesson.id}: ${field}`);
  assert.ok(lesson.words.length >= 4);
  for (const example of lesson.examples) {
    for (const field of ['translation','spine','note']) assert.ok(example[field], `${lesson.id}: ${field}`);
    assert.ok(example.chunks.some(chunk => chunk.type === 'verb'));
    for (const chunk of example.chunks) {
      assert.ok(['subject','verb','object','modifier'].includes(chunk.type));
      for (const field of ['text','role','explain']) assert.ok(chunk[field]);
    }
  }
  const transfer = lesson.transfer;
  assert.equal(transfer.options.length, 3);
  assert.ok(Number.isInteger(transfer.answer) && transfer.answer >= 0 && transfer.answer < 3);
  for (const field of ['text','words','question','explain','translation']) assert.ok(transfer[field]);
}
for (const item of words) for (const field of ['word','pos','meaning','example','translation','pattern']) assert.ok(item[field]);
for (const file of ['index.html', 'vocabulary.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    const src = match[1].match(/src="([^"]+)"/);
    const code = src ? fs.readFileSync(path.join(root, src[1]), 'utf8') : match[2];
    new vm.Script(code, {filename: src ? src[1] : file});
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${file}: duplicate IDs`);
}
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert.ok(!index.includes('src="data/sentence-library.js"'), '未经逐句校对的模板语料不能回到默认学习流');
assert.ok(!index.includes('已完成 82%') && !index.includes('已完成 68%'));
for(const old of ['data/exam-sentence-library.js','data/article-library.js','data/vocabulary-data.js','data-view-pane="exam"'])assert.ok(!index.includes(old));
assert.ok(index.includes('Daily English · 每日英语资料'));
for(const file of ['index.html','vocabulary.html']){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  assert.ok(!/href="[^\"]*view=(?:exam|practice|articles|sentences)/.test(html));
  for(const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:[?#][^"]*)?"/g)){
    if(/^(?:https?:|mailto:|#)/.test(match[1]))continue;
    assert.ok(fs.existsSync(path.resolve(root,match[1])),`${file}: missing asset ${match[1]}`);
  }
}
// 只验证本地 Markdown 链接；网络来源是否仍有效不在此测试范围。
let links = 0;
function scan(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (file.endsWith('.md')) {
      const content = fs.readFileSync(file, 'utf8');
      for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
        const target = match[1].split(/[?#]/)[0];
        if (!target || /^(?:https?:|mailto:)/.test(target)) continue;
        assert.ok(fs.existsSync(path.resolve(path.dirname(file), decodeURIComponent(target))), `${file}: ${target}`);
        links++;
      }
    }
  }
}
scan(path.resolve(root, '../英语系统入门计划'));
console.log(`PASS: 12 layered groups, 108 fluency variants, 11 stories, ${material.length} annotated/translated items; 41 verbs, ${verifiedForms} priority forms/usages each with >=3 distinct annotated contexts (${deferredForms} explicitly deferred); ${context.window.LEARNING_PRIORITIES.core.length} core entries recur; local meanings, scripts and ${links} links.`);
